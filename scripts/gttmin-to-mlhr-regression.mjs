import fs from "node:fs"
import path from "node:path"
import process from "node:process"
import { fileURLToPath } from "node:url"

const failures = []
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const pageSource = fs.readFileSync(path.join(root, "app/calculator/iv-fluids/mlhr-from-drip-rate/page.tsx"), "utf8")
const clientSource = fs.readFileSync(path.join(root, "app/calculator/iv-fluids/mlhr-from-drip-rate/mlhr-from-drip-rate-client.tsx"), "utf8")

function close(label, actual, expected, tolerance = 1e-10) {
  if (!Number.isFinite(actual) || Math.abs(actual - expected) > tolerance) {
    failures.push(`${label}: expected ${expected}, received ${actual}`)
  }
}

function includes(label, source, expected) {
  if (!source.includes(expected)) failures.push(`${label}: missing ${expected}`)
}

close("40 gtt/min at 20 gtt/mL", (40 * 60) / 20, 120)
close("25 gtt/min at 20 gtt/mL", (25 * 60) / 20, 75)
close("25 gtt/min at 15 gtt/mL", (25 * 60) / 15, 100)
close("50 gtt/min microdrip", (50 * 60) / 60, 50)
close("1 gtt/min microdrip", (1 * 60) / 60, 1)
close("decimal observed rate", (12.5 * 60) / 20, 37.5)
close("custom 30 gtt/mL set", (15 * 60) / 30, 30)
close("small estimated rate", (0.5 * 60) / 60, 0.5)

includes("protected title", pageSource, 'title: "gtt/min to mL/hr Calculator | IV Drip Rate Converter - MedMaths"')
includes("protected description", pageSource, 'Convert a gravity IV drip rate in gtt/min back to mL/hr. Enter the observed drops per minute and your giving set drop factor to get the hourly infusion rate.')
includes("protected H1", pageSource, "gtt/min to mL/hr Calculator")
includes("formula implementation", clientSource, "setRawResult((drips * 60) / selectedDropFactor)")
includes("custom set warning", clientSource, "Custom giving-set value")
includes("pump-setting warning", clientSource, "Do not use this estimate as a pump setting")

const questionCount = (pageSource.match(/question: "/g) || []).length
if (questionCount !== 11) failures.push(`Expected 8 FAQs plus 3 practice questions, found ${questionCount} question entries`)

if (failures.length) {
  console.error("gtt/min to mL/hr regression failed:\n")
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log("14 gtt/min to mL/hr protected regression checks passed")
