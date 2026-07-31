const KILOGRAMS_PER_POUND = 0.45359237

export type WeightUnit = "kg" | "lb"
export type WeightBasedDoseBasis = "perDose" | "perDay"

export type WeightBasedLiquidDoseInput = {
  doseMgPerKg: number
  weight: number
  weightUnit: WeightUnit
  doseBasis: WeightBasedDoseBasis
  dosesPerDay?: number
  concentrationMgPerMl: number
}

export type WeightBasedLiquidDoseResult = {
  doseBasis: WeightBasedDoseBasis
  orderedDoseMgPerKg: number
  weightInput: number
  weightUnit: WeightUnit
  weightKg: number
  dosesPerDay: number | null
  dailyDoseMg: number | null
  perDoseMgPerKg: number
  perDoseMg: number
  concentrationMgPerMl: number
  volumePerDoseMl: number
}

function requirePositiveFinite(value: number, label: string) {
  if (!Number.isFinite(value) || value <= 0) {
    throw new RangeError(`${label} must be a positive finite number.`)
  }
}

export function normaliseWeightToKilograms(weight: number, unit: WeightUnit): number {
  requirePositiveFinite(weight, "Weight")
  return unit === "kg" ? weight : weight * KILOGRAMS_PER_POUND
}

export function calculateWeightBasedLiquidDose(
  input: WeightBasedLiquidDoseInput,
): WeightBasedLiquidDoseResult {
  requirePositiveFinite(input.doseMgPerKg, "Dose per kilogram")
  requirePositiveFinite(input.concentrationMgPerMl, "Concentration")
  const weightKg = normaliseWeightToKilograms(input.weight, input.weightUnit)

  if (input.doseBasis === "perDay") {
    const dosesPerDay = input.dosesPerDay
    if (typeof dosesPerDay !== "number" || !Number.isInteger(dosesPerDay) || dosesPerDay <= 0) {
      throw new Error("A positive whole number of doses per day is required for a daily order.")
    }

    const dailyDoseMg = input.doseMgPerKg * weightKg
    const perDoseMg = dailyDoseMg / dosesPerDay
    const perDoseMgPerKg = input.doseMgPerKg / dosesPerDay

    return {
      doseBasis: input.doseBasis,
      orderedDoseMgPerKg: input.doseMgPerKg,
      weightInput: input.weight,
      weightUnit: input.weightUnit,
      weightKg,
      dosesPerDay,
      dailyDoseMg,
      perDoseMgPerKg,
      perDoseMg,
      concentrationMgPerMl: input.concentrationMgPerMl,
      volumePerDoseMl: perDoseMg / input.concentrationMgPerMl,
    }
  }

  const perDoseMg = input.doseMgPerKg * weightKg

  return {
    doseBasis: input.doseBasis,
    orderedDoseMgPerKg: input.doseMgPerKg,
    weightInput: input.weight,
    weightUnit: input.weightUnit,
    weightKg,
    dosesPerDay: null,
    dailyDoseMg: null,
    perDoseMgPerKg: input.doseMgPerKg,
    perDoseMg,
    concentrationMgPerMl: input.concentrationMgPerMl,
    volumePerDoseMl: perDoseMg / input.concentrationMgPerMl,
  }
}
