export type DilutionVariable = "V1" | "V2" | "C1" | "C2"

export type DilutionResult = {
  solving: DilutionVariable
  value: number
  c1: number
  v1: number
  c2: number
  v2: number
  diluentDifference: number
}

export type DilutionInputs =
  | { solving: "V1"; c1: number; c2: number; v2: number }
  | { solving: "V2"; c1: number; v1: number; c2: number }
  | { solving: "C1"; v1: number; c2: number; v2: number }
  | { solving: "C2"; c1: number; v1: number; v2: number }

function requirePositiveFinite(value: number, label: string) {
  if (!Number.isFinite(value) || value <= 0) {
    throw new RangeError(`${label} must be a positive finite number.`)
  }
}

export function calculateMedicationDilution(inputs: DilutionInputs): DilutionResult {
  let c1: number
  let v1: number
  let c2: number
  let v2: number
  let value: number

  if (inputs.solving === "V1") {
    requirePositiveFinite(inputs.c1, "starting concentration")
    requirePositiveFinite(inputs.c2, "target concentration")
    requirePositiveFinite(inputs.v2, "final total volume")

    c1 = inputs.c1
    c2 = inputs.c2
    v2 = inputs.v2
    v1 = (c2 * v2) / c1
    value = v1
  } else if (inputs.solving === "V2") {
    requirePositiveFinite(inputs.c1, "starting concentration")
    requirePositiveFinite(inputs.v1, "stock volume")
    requirePositiveFinite(inputs.c2, "target concentration")

    c1 = inputs.c1
    v1 = inputs.v1
    c2 = inputs.c2
    v2 = (c1 * v1) / c2
    value = v2
  } else if (inputs.solving === "C1") {
    requirePositiveFinite(inputs.v1, "stock volume")
    requirePositiveFinite(inputs.c2, "target concentration")
    requirePositiveFinite(inputs.v2, "final total volume")

    v1 = inputs.v1
    c2 = inputs.c2
    v2 = inputs.v2
    c1 = (c2 * v2) / v1
    value = c1
  } else {
    requirePositiveFinite(inputs.c1, "starting concentration")
    requirePositiveFinite(inputs.v1, "stock volume")
    requirePositiveFinite(inputs.v2, "final total volume")

    c1 = inputs.c1
    v1 = inputs.v1
    v2 = inputs.v2
    c2 = (c1 * v1) / v2
    value = c2
  }

  if (!Number.isFinite(value) || value <= 0) {
    throw new RangeError("The dilution result must be a positive finite number.")
  }

  return {
    solving: inputs.solving,
    value,
    c1,
    v1,
    c2,
    v2,
    diluentDifference: v2 - v1,
  }
}
