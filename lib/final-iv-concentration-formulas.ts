export type FinalIvConcentrationInputs = {
  drugAmountPerVialMg: number
  finalVialVolumePerVialMl: number
  transferVolumeMl: number
  finalTotalVolumeMl: number
}

export type FinalIvConcentrationResult = FinalIvConcentrationInputs & {
  vialConcentrationMgPerMl: number
  amountTransferredMg: number
  finalConcentrationMgPerMl: number
  vialEquivalentsTransferred: number
  reverseCheckAmountMg: number
}

function requirePositiveFinite(value: number, label: string) {
  if (!Number.isFinite(value) || value <= 0) {
    throw new RangeError(`${label} must be a positive finite number.`)
  }
}

export function calculateFinalIvConcentration(
  inputs: FinalIvConcentrationInputs,
): FinalIvConcentrationResult {
  requirePositiveFinite(inputs.drugAmountPerVialMg, "drug amount per vial")
  requirePositiveFinite(inputs.finalVialVolumePerVialMl, "final vial volume per vial")
  requirePositiveFinite(inputs.transferVolumeMl, "transfer volume")
  requirePositiveFinite(inputs.finalTotalVolumeMl, "final total preparation volume")

  if (inputs.finalTotalVolumeMl + 1e-10 < inputs.transferVolumeMl) {
    throw new RangeError(
      "Final total preparation volume cannot be smaller than the medicine-solution volume transferred.",
    )
  }

  const vialConcentrationMgPerMl =
    inputs.drugAmountPerVialMg / inputs.finalVialVolumePerVialMl
  const amountTransferredMg = vialConcentrationMgPerMl * inputs.transferVolumeMl
  const finalConcentrationMgPerMl = amountTransferredMg / inputs.finalTotalVolumeMl
  const vialEquivalentsTransferred =
    inputs.transferVolumeMl / inputs.finalVialVolumePerVialMl
  const reverseCheckAmountMg =
    finalConcentrationMgPerMl * inputs.finalTotalVolumeMl

  for (const [label, value] of [
    ["vial concentration", vialConcentrationMgPerMl],
    ["amount transferred", amountTransferredMg],
    ["final concentration", finalConcentrationMgPerMl],
    ["vial equivalents transferred", vialEquivalentsTransferred],
    ["reverse-check amount", reverseCheckAmountMg],
  ] as const) {
    if (!Number.isFinite(value) || value <= 0) {
      throw new RangeError(`${label} must be a positive finite number.`)
    }
  }

  return {
    ...inputs,
    vialConcentrationMgPerMl,
    amountTransferredMg,
    finalConcentrationMgPerMl,
    vialEquivalentsTransferred,
    reverseCheckAmountMg,
  }
}
