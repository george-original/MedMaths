import fs from "node:fs"
import path from "node:path"
import process from "node:process"
import { fileURLToPath } from "node:url"
import {
  calculateDripRateFromHourlyRate,
  calculateDripRateFromVolumeTime,
} from "../lib/iv-drip-rate-formulas.ts"

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

let result = calculateDripRateFromHourlyRate(120, 20)
close("120 mL/hr exact", result.exactDropsPerMinute, 40)
equal("120 mL/hr rounded", result.roundedDropsPerMinute, 40)

result = calculateDripRateFromHourlyRate(80, 10)
close("80 mL/hr exact", result.exactDropsPerMinute, 13.333333333333334)
equal("80 mL/hr rounded", result.roundedDropsPerMinute, 13)

result = calculateDripRateFromHourlyRate(50, 60)
close("microdrip equality", result.exactDropsPerMinute, 50)

let volumeResult = calculateDripRateFromVolumeTime(1000, 480, 15)
close("1000 mL over 8 h mL/hr", volumeResult.mlPerHour, 125)
close("1000 mL over 8 h exact gtt/min", volumeResult.exactDropsPerMinute, 31.25)
equal("1000 mL over 8 h rounded", volumeResult.roundedDropsPerMinute, 31)

volumeResult = calculateDripRateFromVolumeTime(250, 120, 20)
close("250 mL over 2 h mL/hr", volumeResult.mlPerHour, 125)
close("250 mL over 2 h exact gtt/min", volumeResult.exactDropsPerMinute, 41.666666666666664)
equal("250 mL over 2 h rounded", volumeResult.roundedDropsPerMinute, 42)

volumeResult = calculateDripRateFromVolumeTime(100, 90, 60)
close("100 mL over 90 min mL/hr", volumeResult.mlPerHour, 66.66666666666667)
close("100 mL over 90 min gtt/min", volumeResult.exactDropsPerMinute, 66.66666666666667)

for (const [label, fn] of [
  ["zero hourly rate", () => calculateDripRateFromHourlyRate(0, 20)],
  ["zero drop factor", () => calculateDripRateFromHourlyRate(100, 0)],
  ["zero volume", () => calculateDripRateFromVolumeTime(0, 60, 20)],
  ["zero duration", () => calculateDripRateFromVolumeTime(100, 0, 20)],
]) {
  try {
    fn()
    fail(`${label}: expected RangeError`)
  } catch (error) {
    if (!(error instanceof RangeError)) fail(`${label}: expected RangeError, received ${error}`)
  }
}

const pageSource = fs.readFileSync(path.join(root, "app/calculator/iv-fluids/drip-rate-mlhr-to-gttmin/page.tsx"), "utf8")
const clientSource = fs.readFileSync(path.join(root, "app/calculator/iv-fluids/drip-rate-mlhr-to-gttmin/drip-rate-mlhr-to-gttmin-client.tsx"), "utf8")
const registrySource = fs.readFileSync(path.join(root, "lib/seo-registry.json"), "utf8")
const catalogSource = fs.readFileSync(path.join(root, "lib/calculator-catalog.ts"), "utf8")

for (const required of [
  'title: "IV Drip Rate Calculator | mL/hr or Volume & Time"',
  "IV Drip Rate Calculator",
  "How do you calculate gtt/min from total volume and time?",
  "1000 mL over 8 hours",
]) includes("page content", pageSource, required)

for (const required of [
  'value: "hourlyRate"',
  'value: "volumeTime"',
  'id="iv-total-volume"',
  'id="iv-time-hours"',
  'id="iv-time-minutes"',
  "calculateDripRateFromHourlyRate",
  "calculateDripRateFromVolumeTime",
  "Calculated hourly infusion rate",
]) includes("client capability", clientSource, required)

includes("registry title", registrySource, '"title": "IV Drip Rate Calculator | mL/hr or Volume & Time"')
includes("catalog capability", catalogSource, "from mL/hr or from total volume and infusion time")

const faqBlock = pageSource.slice(pageSource.indexOf("const faqItems = ["), pageSource.indexOf("const commonExamples = ["))
const practiceBlock = pageSource.slice(pageSource.indexOf("const practiceQuestions = ["), pageSource.indexOf("const breadcrumbSchema"))
equal("focused FAQ count", (faqBlock.match(/question:/g) ?? []).length, 8)
equal("practice question count", (practiceBlock.match(/question:/g) ?? []).length, 4)

if (failures.length) {
  console.error("IV drip rate regression failed:\n")
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log("IV drip rate regression passed: 20 arithmetic, validation, UI, SEO, and content checks verified.")
