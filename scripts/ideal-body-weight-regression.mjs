import fs from "node:fs"
import path from "node:path"
import process from "node:process"
import { fileURLToPath } from "node:url"
import {
  DEVINE_MAX_HEIGHT_CM,
  DEVINE_MIN_HEIGHT_CM,
  calculateDevineCore,
  cmToFeetInches,
  feetInchesToCm,
  isSupportedDevineHeight,
} from "../lib/ideal-body-weight-core.ts"

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

close("male 5 foot baseline", calculateDevineCore(152.4, "male").ibwKg, 50)
close("female 5 foot baseline", calculateDevineCore(152.4, "female").ibwKg, 45.5)
close("male 5 foot 10", calculateDevineCore(feetInchesToCm(5, 10), "male").ibwKg, 73)
close("female 5 foot 10", calculateDevineCore(feetInchesToCm(5, 10), "female").ibwKg, 68.5)
close("male 175 cm", calculateDevineCore(175, "male").ibwKg, 70.46456692913387, 1e-12)
close("female 160 cm", calculateDevineCore(160, "female").ibwKg, 52.38188976377952, 1e-12)

const converted = cmToFeetInches(175)
equal("175 cm feet", converted.feet, 5)
close("175 cm remaining inches", converted.inches, 8.897637795275585, 1e-12)
close("feet and inches round trip", feetInchesToCm(converted.feet, converted.inches), 175, 1e-12)
equal("minimum supported", isSupportedDevineHeight(DEVINE_MIN_HEIGHT_CM), true)
equal("below minimum rejected", isSupportedDevineHeight(DEVINE_MIN_HEIGHT_CM - 0.01), false)
equal("maximum supported", isSupportedDevineHeight(DEVINE_MAX_HEIGHT_CM), true)
equal("above maximum rejected", isSupportedDevineHeight(DEVINE_MAX_HEIGHT_CM + 0.01), false)

const male = calculateDevineCore(175, "male")
equal("calculation field renamed", "inchesAboveFiveFeet" in male, true)

for (const [label, fn] of [
  ["height below five feet", () => calculateDevineCore(150, "female")],
  ["height above maximum", () => calculateDevineCore(251, "male")],
]) {
  try {
    fn()
    fail(`${label}: expected RangeError`)
  } catch (error) {
    if (!(error instanceof RangeError)) fail(`${label}: expected RangeError, received ${error}`)
  }
}

const pageSource = fs.readFileSync(path.join(root, "app/calculator/body-composition/ideal-body-weight/page.tsx"), "utf8")
const clientSource = fs.readFileSync(path.join(root, "app/calculator/body-composition/ideal-body-weight/ideal-body-weight-client.tsx"), "utf8")
const registry = JSON.parse(fs.readFileSync(path.join(root, "lib/seo-registry.json"), "utf8"))
const catalogSource = fs.readFileSync(path.join(root, "lib/calculator-catalog.ts"), "utf8")

for (const required of [
  'title: "Clinical Ideal Body Weight Calculator | Devine IBW"',
  "Clinical Ideal Body Weight (IBW) Calculator",
  "Why does this calculator stop below 5 feet (152.4 cm)?",
  "Which body-weight measure does this page calculate?",
]) includes("page content", pageSource, required)

for (const required of [
  "DEVINE_MIN_HEIGHT_CM",
  "This calculator does not extrapolate the Devine equation below 5 feet",
  "feetInchesToCm",
  "cmToFeetInches",
  "Clinical ideal body weight (Devine)",
]) includes("client capability", clientSource, required)

for (const forbidden of [
  "Optional actual-weight comparison",
  "actualWeight",
  "predicted body weight calculator",
  '"PBW calculator"',
  "Height is below 5 feet",
  "creating a negative height difference",
]) {
  if (pageSource.includes(forbidden) || clientSource.includes(forbidden)) {
    fail(`removed or mistargeted IBW content remains: ${forbidden}`)
  }
}

const ibwRegistry = registry.pages.find((item) => item.url === "https://www.medmaths.com/calculator/body-composition/ideal-body-weight")
equal("registry title", ibwRegistry?.title, "Clinical Ideal Body Weight Calculator | Devine IBW")
equal("registry primary keyword", ibwRegistry?.primaryKeyword, "clinical ideal body weight calculator")
equal("registry excludes PBW keyword", JSON.stringify(ibwRegistry).includes("predicted body weight calculator"), false)
includes("catalog clinical Devine scope", catalogSource, "adult Devine ideal body weight")

const faqBlock = pageSource.slice(pageSource.indexOf("const faqItems = ["), pageSource.indexOf("const practiceQuestions = ["))
const practiceBlock = pageSource.slice(pageSource.indexOf("const practiceQuestions = ["), pageSource.indexOf("const maleWorkedExample"))
equal("focused FAQ count", (faqBlock.match(/question:/g) ?? []).length, 8)
equal("practice question count", (practiceBlock.match(/q:/g) ?? []).length, 3)

if (failures.length) {
  console.error("Ideal body weight regression failed:\n")
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log("Ideal body weight regression passed: 34 formula, height-limit, conversion, UI, SEO, and content checks verified.")
