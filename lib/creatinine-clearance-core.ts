export type CockcroftGaultSexFactor = "male" | "female"
export type SerumCreatinineUnit = "umol" | "mgdl"
export type CockcroftGaultWeightMethod = "direct" | "actual" | "ideal" | "adjusted"
export type CockcroftGaultHelperWeightMethod = Exclude<CockcroftGaultWeightMethod, "direct">

export type CockcroftGaultWeightCandidates = {
  actualWeightKg: number
  heightCm: number
  idealWeightKg: number
  adjustedWeightKg: number
  adjustmentFactor: number
}

export type CockcroftGaultWeightContext = {
  method: CockcroftGaultWeightMethod
  label: string
  actualWeightKg?: number
  heightCm?: number
  idealWeightKg?: number
  adjustedWeightKg?: number
  adjustmentFactor?: number
}

export type CockcroftGaultCoreCalculation = {
  crcl: number
  age: number
  weightKg: number
  weightContext: CockcroftGaultWeightContext
  sexFactor: CockcroftGaultSexFactor
  sexMultiplier: number
  serumCreatinine: number
  unit: SerumCreatinineUnit
  numerator: number
  denominator: number
}

export const ADJUSTED_BODY_WEIGHT_FACTOR = 0.4
export const COCKCROFT_GAULT_DEVINE_MIN_HEIGHT_CM = 152.4
export const COCKCROFT_GAULT_DEVINE_MAX_HEIGHT_CM = 250

export function getCockcroftGaultSexMultiplier(sexFactor: CockcroftGaultSexFactor): number {
  return sexFactor === "female" ? 0.85 : 1
}

export function getCockcroftGaultWeightMethodLabel(method: CockcroftGaultWeightMethod): string {
  switch (method) {
    case "actual":
      return "Actual body weight"
    case "ideal":
      return "Devine ideal body weight"
    case "adjusted":
      return "Adjusted body weight (0.4 factor)"
    default:
      return "Protocol-selected weight entered directly"
  }
}

export function calculateCockcroftGaultDevineIbw(
  heightCm: number,
  sexFactor: CockcroftGaultSexFactor,
): number {
  if (
    !Number.isFinite(heightCm) ||
    heightCm < COCKCROFT_GAULT_DEVINE_MIN_HEIGHT_CM ||
    heightCm > COCKCROFT_GAULT_DEVINE_MAX_HEIGHT_CM
  ) {
    throw new RangeError(
      `Devine IBW helper requires an adult height from ${COCKCROFT_GAULT_DEVINE_MIN_HEIGHT_CM} to ${COCKCROFT_GAULT_DEVINE_MAX_HEIGHT_CM} cm.`,
    )
  }

  const heightInches = heightCm / 2.54
  const baseKg = sexFactor === "female" ? 45.5 : 50
  return baseKg + 2.3 * (heightInches - 60)
}

export function calculateAdjustedBodyWeight(
  actualWeightKg: number,
  idealWeightKg: number,
  adjustmentFactor = ADJUSTED_BODY_WEIGHT_FACTOR,
): number {
  return idealWeightKg + adjustmentFactor * (actualWeightKg - idealWeightKg)
}

export function calculateCockcroftGaultWeightCandidates(
  actualWeightKg: number,
  heightCm: number,
  sexFactor: CockcroftGaultSexFactor,
): CockcroftGaultWeightCandidates {
  const idealWeightKg = calculateCockcroftGaultDevineIbw(heightCm, sexFactor)
  const adjustedWeightKg = calculateAdjustedBodyWeight(actualWeightKg, idealWeightKg)

  return {
    actualWeightKg,
    heightCm,
    idealWeightKg,
    adjustedWeightKg,
    adjustmentFactor: ADJUSTED_BODY_WEIGHT_FACTOR,
  }
}

export function getWeightFromCandidates(
  candidates: CockcroftGaultWeightCandidates,
  method: CockcroftGaultHelperWeightMethod,
): number {
  if (method === "ideal") return candidates.idealWeightKg
  if (method === "adjusted") return candidates.adjustedWeightKg
  return candidates.actualWeightKg
}

export function buildWeightContext(
  method: CockcroftGaultWeightMethod,
  candidates?: CockcroftGaultWeightCandidates,
): CockcroftGaultWeightContext {
  if (!candidates || method === "direct") {
    return { method: "direct", label: getCockcroftGaultWeightMethodLabel("direct") }
  }

  return {
    method,
    label: getCockcroftGaultWeightMethodLabel(method),
    actualWeightKg: candidates.actualWeightKg,
    heightCm: candidates.heightCm,
    idealWeightKg: candidates.idealWeightKg,
    adjustedWeightKg: candidates.adjustedWeightKg,
    adjustmentFactor: candidates.adjustmentFactor,
  }
}

export function calculateCockcroftGaultValue(
  age: number,
  weightKg: number,
  sexFactor: CockcroftGaultSexFactor,
  serumCreatinine: number,
  unit: SerumCreatinineUnit,
): number {
  const sexMultiplier = getCockcroftGaultSexMultiplier(sexFactor)
  const numerator = (140 - age) * weightKg * sexMultiplier
  const denominator = unit === "umol" ? 0.814 * serumCreatinine : 72 * serumCreatinine
  return numerator / denominator
}

export function calculateCockcroftGaultCore(
  age: number,
  weightKg: number,
  sexFactor: CockcroftGaultSexFactor,
  serumCreatinine: number,
  unit: SerumCreatinineUnit,
  weightContext: CockcroftGaultWeightContext = buildWeightContext("direct"),
): CockcroftGaultCoreCalculation {
  const sexMultiplier = getCockcroftGaultSexMultiplier(sexFactor)
  const numerator = (140 - age) * weightKg * sexMultiplier
  const denominator = unit === "umol" ? 0.814 * serumCreatinine : 72 * serumCreatinine
  const crcl = numerator / denominator

  return {
    crcl,
    age,
    weightKg,
    weightContext,
    sexFactor,
    sexMultiplier,
    serumCreatinine,
    unit,
    numerator,
    denominator,
  }
}
