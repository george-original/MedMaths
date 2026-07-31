import fs from "node:fs"
import path from "node:path"
import process from "node:process"
import { fileURLToPath } from "node:url"
import { calculateFixedTabletDose, calculateWeightBasedTabletDose } from "../lib/tablet-dose-formulas.ts"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const failures = []

function fail(message) {
  failures.push(message)
}

function assertClose(label, actual, expected, tolerance = 1e-9) {
  if (!Number.isFinite(actual) || Math.abs(actual - expected) > tolerance) {
    fail(`${label}: expected ${expected}, received ${actual}`)
  }
}

const fixed = calculateFixedTabletDose(500, 250)
assertClose("fixed-dose tablets", fixed.tablets, 2)
assertClose("half-tablet result", calculateFixedTabletDose(125, 250).tablets, 0.5)
assertClose("awkward fixed result", calculateFixedTabletDose(300, 250).tablets, 1.2)

const weightBased = calculateWeightBasedTabletDose(25, 15, 250)
assertClose("weight-based total dose", weightBased.totalDoseMg, 375)
assertClose("weight-based tablets", weightBased.tablets, 1.5)
assertClose("weight-based whole tablet", calculateWeightBasedTabletDose(30, 5, 150).tablets, 1)
assertClose("weight-based awkward result", calculateWeightBasedTabletDose(18, 12.5, 250).tablets, 0.9)

for (const [label, fn] of [
  ["zero dose", () => calculateFixedTabletDose(0, 250)],
  ["zero strength", () => calculateFixedTabletDose(500, 0)],
  ["zero weight", () => calculateWeightBasedTabletDose(0, 10, 100)],
  ["negative mg/kg", () => calculateWeightBasedTabletDose(20, -10, 100)],
]) {
  try {
    fn()
    fail(`${label}: expected RangeError`)
  } catch (error) {
    if (!(error instanceof RangeError)) fail(`${label}: expected RangeError, received ${error?.constructor?.name ?? typeof error}`)
  }
}

const pageText = fs.readFileSync(path.join(root, "app/calculator/tablet-dosing/page.tsx"), "utf8")
const clientText = fs.readFileSync(path.join(root, "app/calculator/tablet-dosing/tablet-dose-client.tsx"), "utf8")
const configText = fs.readFileSync(path.join(root, "next.config.mjs"), "utf8")
const registryText = fs.readFileSync(path.join(root, "lib/seo-registry.json"), "utf8")
const catalogText = fs.readFileSync(path.join(root, "lib/calculator-catalog.ts"), "utf8")

for (const required of [
  "Tablet Dosing Calculators | mg to Tablets & mg/kg - MedMaths",
  "Tablet Dosing Calculators",
  "<TabletDoseClient />",
  'id="references"',
]) {
  if (!pageText.includes(required)) fail(`tablet page missing protected content: ${required}`)
}
for (const required of [
  'value: "fixed"',
  'value: "weightBased"',
  'id="fixed-dose"',
  'id="weight-based"',
  "calculateFixedTabletDose",
  "calculateWeightBasedTabletDose",
]) {
  if (!clientText.includes(required)) fail(`tablet client missing combined-mode control: ${required}`)
}
for (const [source, destination] of [
  ["/calculator/tablet-dosing/mg-to-tablets", "/calculator/tablet-dosing#fixed-dose"],
  ["/calculator/tablet-dosing/mgkg-to-tablets", "/calculator/tablet-dosing#weight-based"],
]) {
  if (!configText.includes(`source: "${source}"`) || !configText.includes(`destination: "${destination}"`)) {
    fail(`missing redirect ${source} -> ${destination}`)
  }
  if (registryText.includes(`https://www.medmaths.com${source}`)) fail(`retired URL remains in SEO registry: ${source}`)
  if (catalogText.includes(`href: "${source}"`)) fail(`retired URL remains in calculator catalogue: ${source}`)
}

if (failures.length) {
  console.error("Tablet dose regression failed:\n")
  failures.forEach((message) => console.error(`- ${message}`))
  process.exitCode = 1
} else {
  console.log("Tablet dose regression passed: 11 arithmetic/validation checks and consolidated route protections verified.")
}
