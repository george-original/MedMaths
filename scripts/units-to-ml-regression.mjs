import fs from "node:fs"
import path from "node:path"
import process from "node:process"
import { fileURLToPath } from "node:url"
import { calculateUnitsVolume } from "../lib/units-volume-formulas.ts"
import { formatSafeNumber } from "../lib/safe-number-format.ts"

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

assertClose("25 units at 100 units/mL", calculateUnitsVolume(25, 100, "unitsToMl"), 0.25)
assertClose("2500 units at 5000 units/mL", calculateUnitsVolume(2500, 5000, "unitsToMl"), 0.5)
assertClose("12 units at 40 units/mL", calculateUnitsVolume(12, 40, "unitsToMl"), 0.3)
assertClose("0.3 mL at 100 units/mL", calculateUnitsVolume(0.3, 100, "mlToUnits"), 30)
assertClose("0.75 mL at 1000 units/mL", calculateUnitsVolume(0.75, 1000, "mlToUnits"), 750)
assertEqual("small result remains non-zero", formatSafeNumber(0.025, 0, { maxDecimals: 12 }), "0.025")

const pageText = fs.readFileSync(path.join(root, "app/calculator/dose-calculations/units-to-ml/page.tsx"), "utf8")
const clientText = fs.readFileSync(path.join(root, "app/calculator/dose-calculations/units-to-ml/units-to-ml-client.tsx"), "utf8")
const guideText = fs.readFileSync(path.join(root, "components/calculator/units-measurement-guide.tsx"), "utf8")
const registryText = fs.readFileSync(path.join(root, "lib/seo-registry.json"), "utf8")

for (const required of [
  "Units to mL Calculator | Dose Volume Conversion",
  "The calculator deliberately does not display or select an insulin syringe scale.",
  "Example presets on this page are typing aids only, not product recommendations.",
  "Can an insulin syringe be used for every medicine measured in units?",
]) if (!pageText.includes(required)) fail(`page missing: ${required}`)

for (const required of [
  'label: "Enter concentration from product label"',
  'label: "Example only: insulin U-100 (100 units/mL)"',
  "presetConfirmed",
  "I confirmed this exact concentration on the product label.",
  "does not select a syringe, pen, pump, preparation, or dose",
]) if (!clientText.includes(required)) fail(`client missing: ${required}`)

for (const forbidden of [
  "matched-syringe",
  "Illustrative matched",
  "ZoomIn",
  "ZoomOut",
  "CalculatorSegmentedControl",
  "VolumeMeasurementGuide",
  "syringe scale is shown",
]) if (guideText.includes(forbidden)) fail(`insulin syringe visual remains: ${forbidden}`)

for (const required of [
  "This calculator shows the arithmetic only. It does not select or illustrate a syringe",
  "Do not choose a device from this mL result",
  "Use the route-appropriate mL-marked device",
  "No syringe or device visual is provided for a custom concentration.",
]) if (!guideText.includes(required)) fail(`measurement guide missing: ${required}`)

if (!registryText.includes('"title": "Units to mL Calculator | Dose Volume Conversion"')) fail("registry title mismatch")
if (!registryText.includes('"lastReviewed": "2026-07-30"')) fail("registry review date mismatch")

const faqBlock = pageText.slice(pageText.indexOf("const faqItems = ["), pageText.indexOf("const commonExamples = ["))
const practiceBlock = pageText.slice(pageText.indexOf("const practiceQuestions = ["), pageText.indexOf("export default function"))
assertEqual("focused FAQ count", (faqBlock.match(/question:/g) ?? []).length, 9)
assertEqual("practice question count", (practiceBlock.match(/question:/g) ?? []).length, 4)

if (failures.length) {
  console.error("Units to mL regression failed:\n")
  failures.forEach((message) => console.error(`- ${message}`))
  process.exitCode = 1
} else {
  console.log("Units to mL regression passed: 6 arithmetic/precision checks and 20 safety, content, and metadata protections verified.")
}
