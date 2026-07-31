import fs from "node:fs"
import path from "node:path"
import process from "node:process"
import { fileURLToPath } from "node:url"
import { calculateFinalIvConcentration } from "../lib/final-iv-concentration-formulas.ts"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const failures = []

function fail(message) {
  failures.push(message)
}

function close(label, actual, expected, tolerance = 1e-10) {
  if (!Number.isFinite(actual) || Math.abs(actual - expected) > tolerance) {
    fail(`${label}: expected ${expected}, received ${actual}`)
  }
}

function equal(label, actual, expected) {
  if (actual !== expected) fail(`${label}: expected ${expected}, received ${actual}`)
}

function includes(label, source, expected) {
  if (!source.includes(expected)) fail(`${label}: missing ${expected}`)
}

let result = calculateFinalIvConcentration({
  drugAmountPerVialMg: 1000,
  finalVialVolumePerVialMl: 10,
  transferVolumeMl: 5,
  finalTotalVolumeMl: 250,
})
close("partial-transfer vial concentration", result.vialConcentrationMgPerMl, 100)
close("partial-transfer amount", result.amountTransferredMg, 500)
close("partial-transfer final concentration", result.finalConcentrationMgPerMl, 2)
close("partial-transfer vial equivalents", result.vialEquivalentsTransferred, 0.5)
close("partial-transfer reverse check", result.reverseCheckAmountMg, 500)

result = calculateFinalIvConcentration({
  drugAmountPerVialMg: 1000,
  finalVialVolumePerVialMl: 10,
  transferVolumeMl: 10,
  finalTotalVolumeMl: 250,
})
close("whole-vial final concentration", result.finalConcentrationMgPerMl, 4)
close("whole-vial equivalent", result.vialEquivalentsTransferred, 1)

result = calculateFinalIvConcentration({
  drugAmountPerVialMg: 500,
  finalVialVolumePerVialMl: 10,
  transferVolumeMl: 20,
  finalTotalVolumeMl: 250,
})
close("multiple-vial amount", result.amountTransferredMg, 1000)
close("multiple-vial equivalents", result.vialEquivalentsTransferred, 2)
close("multiple-vial concentration", result.finalConcentrationMgPerMl, 4)

result = calculateFinalIvConcentration({
  drugAmountPerVialMg: 500,
  finalVialVolumePerVialMl: 10,
  transferVolumeMl: 10,
  finalTotalVolumeMl: 110,
})
close("verified final volume concentration", result.finalConcentrationMgPerMl, 500 / 110)

result = calculateFinalIvConcentration({
  drugAmountPerVialMg: 1,
  finalVialVolumePerVialMl: 100,
  transferVolumeMl: 0.01,
  finalTotalVolumeMl: 1000,
})
close("small non-zero final concentration", result.finalConcentrationMgPerMl, 0.0000001, 1e-15)
equal("small non-zero stays positive", result.finalConcentrationMgPerMl > 0, true)

for (const [label, fn] of [
  ["zero drug amount", () => calculateFinalIvConcentration({ drugAmountPerVialMg: 0, finalVialVolumePerVialMl: 10, transferVolumeMl: 5, finalTotalVolumeMl: 250 })],
  ["negative vial volume", () => calculateFinalIvConcentration({ drugAmountPerVialMg: 1000, finalVialVolumePerVialMl: -10, transferVolumeMl: 5, finalTotalVolumeMl: 250 })],
  ["zero transfer volume", () => calculateFinalIvConcentration({ drugAmountPerVialMg: 1000, finalVialVolumePerVialMl: 10, transferVolumeMl: 0, finalTotalVolumeMl: 250 })],
  ["non-finite final volume", () => calculateFinalIvConcentration({ drugAmountPerVialMg: 1000, finalVialVolumePerVialMl: 10, transferVolumeMl: 5, finalTotalVolumeMl: Number.NaN })],
  ["final volume smaller than transfer", () => calculateFinalIvConcentration({ drugAmountPerVialMg: 1000, finalVialVolumePerVialMl: 10, transferVolumeMl: 20, finalTotalVolumeMl: 10 })],
]) {
  try {
    fn()
    fail(`${label}: expected RangeError`)
  } catch (error) {
    if (!(error instanceof RangeError)) fail(`${label}: expected RangeError, received ${error}`)
  }
}

const pageSource = fs.readFileSync(path.join(root, "app/calculator/dilutions/reconstitute-to-bag/page.tsx"), "utf8")
const clientSource = fs.readFileSync(path.join(root, "app/calculator/dilutions/reconstitute-to-bag/reconstitute-to-bag-client.tsx"), "utf8")
const registrySource = fs.readFileSync(path.join(root, "lib/seo-registry.json"), "utf8")
const catalogSource = fs.readFileSync(path.join(root, "lib/calculator-catalog.ts"), "utf8")
const categorySource = fs.readFileSync(path.join(root, "app/calculator/dilutions/page.tsx"), "utf8")

for (const required of [
  'title: "Final IV Bag Concentration Calculator | Reconstituted Vial"',
  "Final IV Bag Concentration Calculator",
  "Verified-input concentration checker",
  "What this calculator does not decide",
  "final vial volume the same as the diluent added",
  "verified final total preparation volume",
  "final IV concentration the same as infusion rate",
]) includes("page content", pageSource, required)

for (const forbidden of [
  "Reconstitution to IV Bag Calculator",
  "Can this calculator be used for antibiotics?",
  "Can this calculator be used for chemotherapy",
  "Worked examples and common results",
]) {
  if (pageSource.includes(forbidden)) fail(`overbroad or repetitive page content remains: ${forbidden}`)
}

for (const required of [
  "calculateFinalIvConcentration",
  'title="Check final IV concentration after vial reconstitution"',
  "Drug amount per vial",
  "Verified final volume per reconstituted vial",
  "Medicine-solution volume transferred",
  "Verified final total preparation volume",
  "Calculation checker only",
  "This is an arithmetic screening prompt, not a universal preparation threshold",
]) includes("client capability", clientSource, required)

for (const forbidden of [
  "VolumeMeasurementGuide",
  'variant="danger"',
  "largeWithdrawal",
  "extremelyLowFinalConcentration",
]) {
  if (clientSource.includes(forbidden)) fail(`unsafe or overreaching client feature remains: ${forbidden}`)
}

includes("registry title", registrySource, '"title": "Final IV Bag Concentration Calculator | Reconstituted Vial"')
includes("registry intent", registrySource, '"primaryKeyword": "final IV bag concentration calculator"')
includes("catalog title", catalogSource, 'title: "Final IV Bag Concentration Calculator"')
includes("category card", categorySource, 'title: "Final IV Bag Concentration Calculator"')

const faqBlock = pageSource.slice(pageSource.indexOf("const faqItems = ["), pageSource.indexOf("const workedExamples = ["))
const exampleBlock = pageSource.slice(pageSource.indexOf("const workedExamples = ["), pageSource.indexOf("const practiceItems = ["))
const practiceBlock = pageSource.slice(pageSource.indexOf("const practiceItems = ["), pageSource.indexOf("const references = ["))
equal("focused FAQ count", (faqBlock.match(/question:/g) ?? []).length, 8)
equal("worked example count", (exampleBlock.match(/title:/g) ?? []).length, 3)
equal("practice question count", (practiceBlock.match(/q:/g) ?? []).length, 3)

if (failures.length) {
  console.error("Final IV concentration regression failed:\n")
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log("Final IV concentration regression passed: 38 arithmetic, validation, safety-boundary, UI, SEO, and content checks verified.")
