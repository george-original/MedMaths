import fs from "node:fs"
import path from "node:path"
import process from "node:process"
import { fileURLToPath } from "node:url"
import {
  calculateWeightBasedLiquidDose,
  normaliseWeightToKilograms,
} from "../lib/weight-based-liquid-formulas.ts"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const failures = []

function fail(message) { failures.push(message) }
function assertClose(label, actual, expected, tolerance = 1e-9) {
  if (!Number.isFinite(actual) || Math.abs(actual - expected) > tolerance) {
    fail(`${label}: expected ${expected}, received ${actual}`)
  }
}
function assertEqual(label, actual, expected) {
  if (actual !== expected) fail(`${label}: expected ${expected}, received ${actual}`)
}

const perDose = calculateWeightBasedLiquidDose({
  doseMgPerKg: 10, weight: 20, weightUnit: "kg", doseBasis: "perDose", concentrationMgPerMl: 50,
})
assertClose("per-dose mg", perDose.perDoseMg, 200)
assertClose("per-dose volume", perDose.volumePerDoseMl, 4)
assertEqual("per-dose daily total", perDose.dailyDoseMg, null)

const perDay = calculateWeightBasedLiquidDose({
  doseMgPerKg: 20, weight: 20, weightUnit: "kg", doseBasis: "perDay", dosesPerDay: 4, concentrationMgPerMl: 25,
})
assertClose("daily total mg", perDay.dailyDoseMg, 400)
assertClose("daily order per-dose mg", perDay.perDoseMg, 100)
assertClose("daily order per-dose equivalent", perDay.perDoseMgPerKg, 5)
assertClose("daily order volume", perDay.volumePerDoseMl, 4)

assertClose("44 lb to kg", normaliseWeightToKilograms(44, "lb"), 19.95806428, 1e-12)
const pounds = calculateWeightBasedLiquidDose({
  doseMgPerKg: 10, weight: 44, weightUnit: "lb", doseBasis: "perDose", concentrationMgPerMl: 50,
})
assertClose("pounds dose mg", pounds.perDoseMg, 199.5806428, 1e-10)
assertClose("pounds volume", pounds.volumePerDoseMl, 3.991612856, 1e-10)

for (const [label, input] of [
  ["zero weight", { doseMgPerKg: 10, weight: 0, weightUnit: "kg", doseBasis: "perDose", concentrationMgPerMl: 50 }],
  ["zero dose", { doseMgPerKg: 0, weight: 20, weightUnit: "kg", doseBasis: "perDose", concentrationMgPerMl: 50 }],
  ["zero concentration", { doseMgPerKg: 10, weight: 20, weightUnit: "kg", doseBasis: "perDose", concentrationMgPerMl: 0 }],
]) {
  try { calculateWeightBasedLiquidDose(input); fail(`${label}: expected error`) } catch {}
}
try {
  calculateWeightBasedLiquidDose({ doseMgPerKg: 20, weight: 20, weightUnit: "kg", doseBasis: "perDay", dosesPerDay: 2.5, concentrationMgPerMl: 25 })
  fail("fractional doses/day: expected error")
} catch {}

const pageText = fs.readFileSync(path.join(root, "app/calculator/dose-calculations/mgkg-to-ml-dose/page.tsx"), "utf8")
const clientText = fs.readFileSync(path.join(root, "app/calculator/dose-calculations/mgkg-to-ml-dose/mgkg-to-ml-dose-client.tsx"), "utf8")
const registryText = fs.readFileSync(path.join(root, "lib/seo-registry.json"), "utf8")
const catalogText = fs.readFileSync(path.join(root, "lib/calculator-catalog.ts"), "utf8")

for (const required of [
  "mg/kg to mL Calculator | Per Dose or Per Day",
  "Can I enter weight in pounds?",
  "What is the difference between mg/kg per dose and mg/kg/day?",
  "Weight conversion: kg = lb × 0.45359237",
]) if (!pageText.includes(required)) fail(`page missing: ${required}`)

for (const required of [
  'value: "perDose"', 'value: "perDay"', 'id="mgkg-doses-per-day"',
  'id="mgkg-weight-unit"', "calculateWeightBasedLiquidDose", "poundsToKilograms",
]) if (!clientText.includes(required)) fail(`client missing: ${required}`)

if (!registryText.includes('"title": "mg/kg to mL Calculator | Per Dose or Per Day"')) fail("registry title mismatch")
if (!catalogText.includes("mg/kg per-dose or per-day orders using kg or lb")) fail("catalogue scope mismatch")

const faqBlock = pageText.slice(pageText.indexOf("const faqItems = ["), pageText.indexOf("const commonExamples = ["))
assertEqual("focused FAQ count", (faqBlock.match(/question:/g) ?? []).length, 10)

if (failures.length) {
  console.error("mg/kg to mL regression failed:\n")
  failures.forEach((message) => console.error(`- ${message}`))
  process.exitCode = 1
} else {
  console.log("mg/kg to mL regression passed: 16 arithmetic, validation, UI, and SEO protections verified.")
}
