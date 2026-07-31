export type FixedTabletDoseResult = {
  doseMg: number
  strengthMg: number
  tablets: number
}

export type WeightBasedTabletDoseResult = {
  weightKg: number
  dosePerKg: number
  strengthMg: number
  totalDoseMg: number
  tablets: number
}

function requirePositiveFinite(value: number, label: string) {
  if (!Number.isFinite(value) || value <= 0) {
    throw new RangeError(`${label} must be a positive finite number.`)
  }
}

export function calculateFixedTabletDose(doseMg: number, strengthMg: number): FixedTabletDoseResult {
  requirePositiveFinite(doseMg, "Dose")
  requirePositiveFinite(strengthMg, "Tablet strength")

  return {
    doseMg,
    strengthMg,
    tablets: doseMg / strengthMg,
  }
}

export function calculateWeightBasedTabletDose(
  weightKg: number,
  dosePerKg: number,
  strengthMg: number,
): WeightBasedTabletDoseResult {
  requirePositiveFinite(weightKg, "Weight")
  requirePositiveFinite(dosePerKg, "Dose per kilogram")
  requirePositiveFinite(strengthMg, "Tablet strength")

  const totalDoseMg = weightKg * dosePerKg

  return {
    weightKg,
    dosePerKg,
    strengthMg,
    totalDoseMg,
    tablets: totalDoseMg / strengthMg,
  }
}
