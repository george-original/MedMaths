import fs from "node:fs"
import path from "node:path"
import process from "node:process"
import { fileURLToPath } from "node:url"
import {
  centimetresToFeetAndInches,
  feetAndInchesToCentimetres,
  kilogramsToPounds,
  poundsToKilograms,
} from "../lib/measurement-conversions.ts"

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

function assertEqual(label, actual, expected) {
  if (actual !== expected) fail(`${label}: expected ${expected}, received ${actual}`)
}

const heightCm = feetAndInchesToCentimetres(5, 7)
const weightKg = poundsToKilograms(154)
assertClose("5 ft 7 in to cm", heightCm, 170.18, 1e-12)
assertClose("154 lb to kg", weightKg, 69.85322498, 1e-12)
assertClose("70 kg to lb", kilogramsToPounds(70), 154.3235835294143, 1e-10)

const roundTripHeight = centimetresToFeetAndInches(170.18)
assertEqual("round-trip feet", roundTripHeight.feet, 5)
assertClose("round-trip inches", roundTripHeight.inches, 7, 1e-12)

const nearTwelveInches = centimetresToFeetAndInches(182.88)
assertEqual("six-foot boundary feet", nearTwelveInches.feet, 6)
assertClose("six-foot boundary inches", nearTwelveInches.inches, 0, 1e-12)

const mostellerImperial = Math.sqrt((heightCm * weightKg) / 3600)
assertClose("imperial Mosteller BSA", mostellerImperial, 1.8171728520406212, 1e-12)

const pageText = fs.readFileSync(path.join(root, "app/calculator/body-composition/bsa/page.tsx"), "utf8")
const clientText = fs.readFileSync(path.join(root, "app/calculator/body-composition/bsa/bsa-client.tsx"), "utf8")
const registryText = fs.readFileSync(path.join(root, "lib/seo-registry.json"), "utf8")
const catalogText = fs.readFileSync(path.join(root, "lib/calculator-catalog.ts"), "utf8")

for (const required of [
  "BSA Calculator | Height, Weight & 4 Formulas",
  "BSA Calculator — Body Surface Area from Height and Weight",
  "Can I calculate BSA using feet, inches and pounds?",
  "Mosteller imperial practice",
]) {
  if (!pageText.includes(required)) fail(`BSA page missing: ${required}`)
}

for (const required of [
  'id="bsa-measurement-system"',
  'id="bsa-height-feet"',
  'id="bsa-height-inches"',
  'id="bsa-weight-lb"',
  "feetAndInchesToCentimetres",
  "poundsToKilograms",
  "Imperial measurements converted",
]) {
  if (!clientText.includes(required)) fail(`BSA client missing: ${required}`)
}

if (!registryText.includes('"title": "BSA Calculator | Height, Weight & 4 Formulas"')) {
  fail("SEO registry does not match the BSA title")
}
if (!catalogText.includes("metric or imperial height and weight")) {
  fail("Calculator catalogue does not describe metric and imperial BSA inputs")
}

const faqBlock = pageText.slice(pageText.indexOf("const faqItems = ["), pageText.indexOf("type PracticeItem"))
const faqCount = (faqBlock.match(/question:/g) ?? []).length
assertEqual("focused BSA FAQ count", faqCount, 12)

if (failures.length) {
  console.error("BSA regression failed:\n")
  failures.forEach((message) => console.error(`- ${message}`))
  process.exitCode = 1
} else {
  console.log("BSA regression passed: 7 conversion/arithmetic checks and calculator/SEO protections verified.")
}
