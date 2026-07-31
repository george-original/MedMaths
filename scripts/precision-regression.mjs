import process from "node:process"
import {
  didAutoPreserveNonZero,
  formatSafeNumber,
  precisionNeededForNonZero,
} from "../lib/safe-number-format.ts"

const failures = []

function expectEqual(label, actual, expected) {
  if (actual !== expected) failures.push(`${label}: expected ${expected}, received ${actual}`)
}

function expect(label, condition) {
  if (!condition) failures.push(label)
}

expectEqual("quarter mL at whole-number preference", formatSafeNumber(0.25, 0), "0.25")
expectEqual("small volume at whole-number preference", formatSafeNumber(0.025, 0), "0.025")
expectEqual("small volume at one-decimal preference", formatSafeNumber(0.04, 1), "0.04")
expectEqual("small concentration at two-decimal preference", formatSafeNumber(0.0049, 2), "0.0049")
expectEqual("ordinary whole-number rounding remains ordinary", formatSafeNumber(5.4, 0), "5")
expectEqual("zero remains zero", formatSafeNumber(0, 0), "0")
expectEqual("negative non-zero values remain visible", formatSafeNumber(-0.25, 0), "-0.25")
expectEqual("units-to-mL small result", formatSafeNumber(25 / 100, 0), "0.25")
expectEqual("mg/kg-to-mL very small result", formatSafeNumber((0.1 * 5) / 100, 0), "0.005")
expectEqual("vial draw-up small result", formatSafeNumber(0.25 / 10, 0), "0.025")
expectEqual("reconstitution final concentration", formatSafeNumber(((1 / 10) * 0.1) / 100, 0), "0.0001")
expectEqual("C1V1 small stock volume", formatSafeNumber((0.1 * 1) / 100, 0), "0.001")
expect("non-finite values return an em dash", formatSafeNumber(Number.NaN, 2) === "—")
expect("precision helper recognises 0.025", precisionNeededForNonZero(0.025) === 3)
expect("auto-preservation is reported", didAutoPreserveNonZero(0.25, 0))
expect("ordinary values do not report auto-preservation", !didAutoPreserveNonZero(5.4, 0))

const tiny = formatSafeNumber(1e-13, 0)
expect("extremely small values never display as zero", tiny !== "0" && Number(tiny) !== 0)

if (failures.length) {
  console.error("Precision regression failed:\n")
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log("17 safe-number precision regression cases passed")
