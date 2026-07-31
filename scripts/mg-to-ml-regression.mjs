import fs from "node:fs"
import path from "node:path"
import process from "node:process"
import { fileURLToPath } from "node:url"
import { formatSafeNumber } from "../lib/safe-number-format.ts"

const failures = []
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const formulaSource = fs.readFileSync(path.join(root, "lib/dose-volume-formulas.ts"), "utf8")

function close(label, actual, expected, tolerance = 1e-10) {
  if (!Number.isFinite(actual) || Math.abs(actual - expected) > tolerance) {
    failures.push(`${label}: expected ${expected}, received ${actual}`)
  }
}

function equal(label, actual, expected) {
  if (actual !== expected) failures.push(`${label}: expected ${expected}, received ${actual}`)
}

if (!formulaSource.includes('return mode === "mgToMl" ? primary / concentration : primary * concentration')) {
  failures.push("calculateMgMl implementation changed unexpectedly")
}
if (!formulaSource.includes("return (requiredDoseMg / suppliedDoseMg) * suppliedVolumeMl")) {
  failures.push("calculateMgMlFromLabel implementation changed unexpectedly")
}

close("direct mg to mL", 500 / 50, 10)
close("label-format mg to mL", (125 / 250) * 5, 2.5)
close("reconstituted vial final-volume path", (75 / 500) * 10, 1.5)
close("tiny volume", 0.25 / 10, 0.025)
equal("tiny volume remains visible", formatSafeNumber(0.25 / 10, 0), "0.025")
close("reverse mL to mg", 2.5 * 50, 125)
close("reverse from mg per X mL concentration", 2.5 * (250 / 5), 125)
close("decimal concentration", 1.5 / 0.75, 2)

if (failures.length) {
  console.error("mg-to-mL regression failed:\n")
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log("8 mg-to-mL protected regression cases passed")
