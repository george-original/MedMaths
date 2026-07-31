import fs from "node:fs"
import path from "node:path"
import process from "node:process"
import { fileURLToPath } from "node:url"
import {
  ADJUSTED_BODY_WEIGHT_FACTOR,
  buildWeightContext,
  calculateAdjustedBodyWeight,
  calculateCockcroftGaultCore,
  calculateCockcroftGaultValue,
  calculateCockcroftGaultWeightCandidates,
  getWeightFromCandidates,
} from "../lib/creatinine-clearance-core.ts"

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

close("direct male µmol/L", calculateCockcroftGaultValue(70, 80, "male", 120, "umol"), 57.33005733005733, 1e-12)
close("direct female mg/dL", calculateCockcroftGaultValue(65, 70, "female", 1.2, "mgdl"), 51.64930555555556, 1e-12)
equal("adjusted factor", ADJUSTED_BODY_WEIGHT_FACTOR, 0.4)
close("adjusted weight", calculateAdjustedBodyWeight(100, 70), 82)

const maleCandidates = calculateCockcroftGaultWeightCandidates(100, 175, "male")
close("male helper actual", maleCandidates.actualWeightKg, 100)
close("male helper IBW", maleCandidates.idealWeightKg, 70.46456692913387, 1e-12)
close("male helper adjusted", maleCandidates.adjustedWeightKg, 82.27874015748031, 1e-12)
close("candidate actual selection", getWeightFromCandidates(maleCandidates, "actual"), 100)
close("candidate ideal selection", getWeightFromCandidates(maleCandidates, "ideal"), maleCandidates.idealWeightKg)
close("candidate adjusted selection", getWeightFromCandidates(maleCandidates, "adjusted"), maleCandidates.adjustedWeightKg)

const femaleCandidates = calculateCockcroftGaultWeightCandidates(90, 165, "female")
close("female helper IBW", femaleCandidates.idealWeightKg, 56.90944881889763, 1e-12)
close("female helper adjusted", femaleCandidates.adjustedWeightKg, 70.14566929133858, 1e-12)

const actualContext = buildWeightContext("actual", maleCandidates)
const idealContext = buildWeightContext("ideal", maleCandidates)
const adjustedContext = buildWeightContext("adjusted", maleCandidates)
const actualResult = calculateCockcroftGaultCore(60, maleCandidates.actualWeightKg, "male", 100, "umol", actualContext)
const idealResult = calculateCockcroftGaultCore(60, maleCandidates.idealWeightKg, "male", 100, "umol", idealContext)
const adjustedResult = calculateCockcroftGaultCore(60, maleCandidates.adjustedWeightKg, "male", 100, "umol", adjustedContext)
close("actual-weight CrCl", actualResult.crcl, ((140 - 60) * 100) / (0.814 * 100), 1e-12)
close("ideal-weight CrCl", idealResult.crcl, ((140 - 60) * maleCandidates.idealWeightKg) / (0.814 * 100), 1e-12)
close("adjusted-weight CrCl", adjustedResult.crcl, ((140 - 60) * maleCandidates.adjustedWeightKg) / (0.814 * 100), 1e-12)
equal("result records actual method", actualResult.weightContext.method, "actual")
equal("result records ideal method", idealResult.weightContext.method, "ideal")
equal("result records adjusted method", adjustedResult.weightContext.method, "adjusted")

const formulaSource = fs.readFileSync(path.join(root, "lib/creatinine-clearance-formulas.ts"), "utf8")
includes("adjusted working formula", formulaSource, "Adjusted weight = IBW +")
includes("working records final CrCl", formulaSource, "CrCl =")

const pageSource = fs.readFileSync(path.join(root, "app/calculator/renal-function/creatinine-clearance/page.tsx"), "utf8")
const clientSource = fs.readFileSync(path.join(root, "app/calculator/renal-function/creatinine-clearance/creatinine-clearance-client.tsx"), "utf8")
const registry = JSON.parse(fs.readFileSync(path.join(root, "lib/seo-registry.json"), "utf8"))

for (const required of [
  'title: "Creatinine Clearance Calculator | Cockcroft-Gault CrCl"',
  "explicit actual, Devine ideal, adjusted, or protocol-selected weight",
  "CrCl and eGFR are different estimates",
  "Newer eGFR methods may be appropriate for many medicines",
  "Why the weight method matters",
  "When to pause before using the estimate",
]) includes("page capability", pageSource, required)

for (const required of [
  '{ value: "helper", label: "Compare weight methods" }',
  'id="crcl-actual-weight-kg"',
  'id="crcl-actual-weight-lb"',
  'id="crcl-height-cm"',
  'id="crcl-height-feet"',
  "calculateCockcroftGaultWeightCandidates",
  "Select the weight method required by the reference",
  "Adjusted weight uses a 0.4 factor",
  'status="default"',
]) includes("client capability", clientSource, required)

const faqBlock = pageSource.match(/const faqItems = \[(.*?)\n\]/s)?.[1] ?? ""
const practiceBlock = pageSource.match(/const practiceQuestions = \[(.*?)\n\]/s)?.[1] ?? ""
equal("focused FAQ count", (faqBlock.match(/question:/g) ?? []).length, 8)
equal("focused practice count", (practiceBlock.match(/question:/g) ?? []).length, 3)

for (const required of [
  "one for the other automatically",
  "Use the renal estimate named by the current medicine",
  "do not decide which method is clinically correct",
]) includes("CrCl/eGFR and weight boundary", pageSource, required)

for (const forbidden of [
  "What is the definition of creatinine clearance?",
  "What does mL/min mean in a creatinine clearance result?",
  "renal dosing bands by CrCl",
  "kidney function calculator for dosing",
  "Common calculation examples",
]) {
  if (pageSource.includes(forbidden)) fail(`over-expanded or broad content remains: ${forbidden}`)
}

for (const forbidden of [
  'status={resultStatus}',
  'variant="danger"',
  "Very low estimated clearance",
  "Low estimated clearance",
]) {
  if (clientSource.includes(forbidden)) fail(`diagnostic-looking result treatment remains: ${forbidden}`)
}

const crclRegistry = registry.pages.find((item) => item.url === "https://www.medmaths.com/calculator/renal-function/creatinine-clearance")
equal("registry title", crclRegistry?.title, "Creatinine Clearance Calculator | Cockcroft-Gault CrCl")
equal("registry review date", crclRegistry?.lastReviewed, "2026-07-30")
includes("registry CrCl/eGFR positioning", JSON.stringify(crclRegistry), "CrCl vs eGFR")

if (failures.length) {
  console.error("Creatinine clearance regression failed:\n")
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log("Creatinine clearance regression passed: 42 formula, weight-method, UI, metadata, content-focus, and CrCl/eGFR boundary checks verified.")
