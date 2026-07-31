import fs from "node:fs"
import path from "node:path"
import process from "node:process"
import { fileURLToPath } from "node:url"
import {
  calculateInfusionCompletion,
  calculateInfusionDuration,
} from "../lib/iv-infusion-time-formulas.ts"

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

let duration = calculateInfusionDuration(500, 125)
close("500 mL at 125 mL/hr hours", duration.hours, 4)
close("500 mL at 125 mL/hr minutes", duration.minutes, 240)

duration = calculateInfusionDuration(250, 100)
close("250 mL at 100 mL/hr hours", duration.hours, 2.5)
close("250 mL at 100 mL/hr minutes", duration.minutes, 150)

duration = calculateInfusionDuration(100, 75)
close("decimal duration hours", duration.hours, 4 / 3)
close("decimal duration minutes", duration.minutes, 80)

let completion = calculateInfusionCompletion(18 * 60 + 30, 240)
equal("same-day finish time", completion.displayTime24Hour, "22:30")
equal("same-day offset", completion.dayOffset, 0)

completion = calculateInfusionCompletion(21 * 60 + 45, 240)
equal("midnight rollover time", completion.displayTime24Hour, "01:45")
equal("midnight rollover offset", completion.dayOffset, 1)

completion = calculateInfusionCompletion(23 * 60 + 50, 20)
equal("short midnight rollover", completion.displayTime24Hour, "00:10")
equal("short midnight offset", completion.dayOffset, 1)

completion = calculateInfusionCompletion(8 * 60, 3000)
equal("multi-day finish time", completion.displayTime24Hour, "10:00")
equal("multi-day offset", completion.dayOffset, 2)

completion = calculateInfusionCompletion(10 * 60, 30.4)
equal("nearest-minute rounding", completion.displayTime24Hour, "10:30")

for (const [label, fn] of [
  ["zero volume", () => calculateInfusionDuration(0, 125)],
  ["zero rate", () => calculateInfusionDuration(500, 0)],
  ["negative start", () => calculateInfusionCompletion(-1, 60)],
  ["start after day", () => calculateInfusionCompletion(1440, 60)],
  ["zero duration", () => calculateInfusionCompletion(600, 0)],
]) {
  try {
    fn()
    fail(`${label}: expected RangeError`)
  } catch (error) {
    if (!(error instanceof RangeError)) fail(`${label}: expected RangeError, received ${error}`)
  }
}

const pageSource = fs.readFileSync(path.join(root, "app/calculator/iv-fluids/ml-per-hour-to-time-to-finish/page.tsx"), "utf8")
const clientSource = fs.readFileSync(path.join(root, "app/calculator/iv-fluids/ml-per-hour-to-time-to-finish/ml-per-hour-time-client.tsx"), "utf8")
const registrySource = fs.readFileSync(path.join(root, "lib/seo-registry.json"), "utf8")
const catalogSource = fs.readFileSync(path.join(root, "lib/calculator-catalog.ts"), "utf8")

for (const required of [
  'title: "IV Infusion Time Calculator | Duration & Finish Time"',
  "How do you calculate the clock finish time for an IV infusion?",
  "What happens if the IV finish time crosses midnight?",
  "Clock finish time = start time + remaining duration",
]) includes("page content", pageSource, required)

for (const required of [
  'id="include-clock-finish-time"',
  'id="iv-start-time"',
  'type="time"',
  "Use current time",
  "calculateInfusionDuration",
  "calculateInfusionCompletion",
  "Estimated clock completion",
  "getDayLabel",
]) includes("client capability", clientSource, required)

for (const forbidden of [
  'variant="danger"',
  "isVeryShort",
  "isVeryLong",
  "resultStatus",
  "duration over 72 hours",
]) {
  if (clientSource.includes(forbidden)) fail(`unsupported threshold styling remains: ${forbidden}`)
}

includes("registry title", registrySource, '"title": "IV Infusion Time Calculator | Duration & Finish Time"')
includes("catalog completion support", catalogSource, "optional clock completion")

const faqBlock = pageSource.slice(pageSource.indexOf("const faqItems = ["), pageSource.indexOf("const commonExamples = ["))
const practiceBlock = pageSource.slice(pageSource.indexOf("const practiceQuestions = ["), pageSource.indexOf("const breadcrumbSchema"))
equal("focused FAQ count", (faqBlock.match(/question:/g) ?? []).length, 8)
equal("practice question count", (practiceBlock.match(/question:/g) ?? []).length, 4)

if (failures.length) {
  console.error("IV infusion time regression failed:\n")
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log("IV infusion time regression passed: 26 arithmetic, rollover, validation, UI, SEO, and content checks verified.")
