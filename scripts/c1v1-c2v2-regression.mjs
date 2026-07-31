import fs from "node:fs"
import path from "node:path"
import process from "node:process"
import { fileURLToPath } from "node:url"
import { calculateMedicationDilution } from "../lib/c1v1-c2v2-formulas.ts"

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

let result = calculateMedicationDilution({ solving: "V1", c1: 10, c2: 1, v2: 50 })
close("V1 stock volume", result.value, 5)
close("V1 diluent difference", result.diluentDifference, 45)
close("V1 conservation left", result.c1 * result.v1, 50)
close("V1 conservation right", result.c2 * result.v2, 50)

result = calculateMedicationDilution({ solving: "V2", c1: 8, v1: 10, c2: 2 })
close("V2 final total volume", result.value, 40)
close("V2 diluent difference", result.diluentDifference, 30)

result = calculateMedicationDilution({ solving: "C1", v1: 15, c2: 5, v2: 60 })
close("C1 starting concentration", result.value, 20)

result = calculateMedicationDilution({ solving: "C2", c1: 5, v1: 20, v2: 100 })
close("C2 final concentration", result.value, 1)

result = calculateMedicationDilution({ solving: "V1", c1: 1, c2: 10, v2: 20 })
close("stronger target arithmetic", result.value, 200)
equal("stronger target negative difference", result.diluentDifference < 0, true)

result = calculateMedicationDilution({ solving: "V1", c1: 5, c2: 5, v2: 50 })
close("same concentration volume", result.value, 50)
close("same concentration difference", result.diluentDifference, 0)

result = calculateMedicationDilution({ solving: "V1", c1: 1000, c2: 1, v2: 1 })
close("small stock volume", result.value, 0.001)

for (const [label, fn] of [
  ["zero starting concentration", () => calculateMedicationDilution({ solving: "V1", c1: 0, c2: 1, v2: 50 })],
  ["negative stock volume", () => calculateMedicationDilution({ solving: "C2", c1: 10, v1: -1, v2: 50 })],
  ["zero final volume", () => calculateMedicationDilution({ solving: "C1", v1: 5, c2: 1, v2: 0 })],
  ["non-finite target", () => calculateMedicationDilution({ solving: "V2", c1: 10, v1: 5, c2: Number.NaN })],
]) {
  try {
    fn()
    fail(`${label}: expected RangeError`)
  } catch (error) {
    if (!(error instanceof RangeError)) fail(`${label}: expected RangeError, received ${error}`)
  }
}

const pageSource = fs.readFileSync(path.join(root, "app/calculator/dilutions/c1v1-c2v2-basic/page.tsx"), "utf8")
const clientSource = fs.readFileSync(path.join(root, "app/calculator/dilutions/c1v1-c2v2-basic/c1v1-c2v2-basic-client.tsx"), "utf8")
const registrySource = fs.readFileSync(path.join(root, "lib/seo-registry.json"), "utf8")
const catalogSource = fs.readFileSync(path.join(root, "lib/calculator-catalog.ts"), "utf8")
const categorySource = fs.readFileSync(path.join(root, "app/calculator/dilutions/page.tsx"), "utf8")

for (const required of [
  'title: "Medication Dilution Calculator | C1V1=C2V2"',
  "Medication Dilution Calculator (C1V1 = C2V2)",
  "Is V2 the final volume or the amount of diluent added?",
  "Can C1V1 = C2V2 be used for medication dilution?",
  "same medicine or solute",
  "product label or monograph",
]) includes("page content", pageSource, required)

for (const forbidden of [
  "Does temperature or density matter?",
  "strict chemistry",
  "laboratory or product-specific preparation",
]) {
  if (pageSource.includes(forbidden)) fail(`generic chemistry drift remains: ${forbidden}`)
}

for (const required of [
  "calculateMedicationDilution",
  'title="Calculate a medication dilution"',
  "C1 — stock medicine concentration",
  "V1 — stock solution volume",
  "V2 — verified final total volume",
  "Medication dilution arithmetic only",
  "Do not treat it as an instruction to add that exact amount",
]) includes("client capability", clientSource, required)

includes("registry title", registrySource, '"title": "Medication Dilution Calculator | C1V1=C2V2"')
includes("registry intent", registrySource, '"primaryKeyword": "medication dilution calculator"')
includes("catalog title", catalogSource, 'title: "Medication Dilution Calculator"')
includes("category card", categorySource, 'title: "Medication Dilution Calculator"')

const faqBlock = pageSource.slice(pageSource.indexOf("const faqItems = ["), pageSource.indexOf("const breadcrumbs = ["))
const exampleBlock = pageSource.slice(pageSource.indexOf("const workedExamples = ["), pageSource.indexOf("const practiceItems = ["))
const practiceBlock = pageSource.slice(pageSource.indexOf("const practiceItems = ["), pageSource.indexOf("const references = ["))
equal("focused FAQ count", (faqBlock.match(/question:/g) ?? []).length, 8)
equal("worked example count", (exampleBlock.match(/title:/g) ?? []).length, 3)
equal("practice question count", (practiceBlock.match(/q:/g) ?? []).length, 4)

if (failures.length) {
  console.error("C1V1=C2V2 medication dilution regression failed:\n")
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log("C1V1=C2V2 medication dilution regression passed: 33 arithmetic, validation, UI, SEO, and content checks verified.")
