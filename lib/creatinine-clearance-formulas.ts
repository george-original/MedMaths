import { formatSafeNumber } from "./safe-number-format"
import {
  ADJUSTED_BODY_WEIGHT_FACTOR,
  COCKCROFT_GAULT_DEVINE_MAX_HEIGHT_CM,
  COCKCROFT_GAULT_DEVINE_MIN_HEIGHT_CM,
  buildWeightContext,
  calculateAdjustedBodyWeight,
  calculateCockcroftGaultCore,
  calculateCockcroftGaultDevineIbw,
  calculateCockcroftGaultValue,
  calculateCockcroftGaultWeightCandidates,
  getCockcroftGaultSexMultiplier,
  getCockcroftGaultWeightMethodLabel,
  getWeightFromCandidates,
  type CockcroftGaultCoreCalculation,
  type CockcroftGaultHelperWeightMethod,
  type CockcroftGaultSexFactor,
  type CockcroftGaultWeightCandidates,
  type CockcroftGaultWeightContext,
  type CockcroftGaultWeightMethod,
  type SerumCreatinineUnit,
} from "./creatinine-clearance-core"

export {
  ADJUSTED_BODY_WEIGHT_FACTOR,
  COCKCROFT_GAULT_DEVINE_MAX_HEIGHT_CM,
  COCKCROFT_GAULT_DEVINE_MIN_HEIGHT_CM,
  buildWeightContext,
  calculateAdjustedBodyWeight,
  calculateCockcroftGaultDevineIbw,
  calculateCockcroftGaultValue,
  calculateCockcroftGaultWeightCandidates,
  getCockcroftGaultSexMultiplier,
  getCockcroftGaultWeightMethodLabel,
  getWeightFromCandidates,
}
export type {
  CockcroftGaultHelperWeightMethod,
  CockcroftGaultSexFactor,
  CockcroftGaultWeightCandidates,
  CockcroftGaultWeightContext,
  CockcroftGaultWeightMethod,
  SerumCreatinineUnit,
}

export type CockcroftGaultFormulaDefinition = {
  unit: SerumCreatinineUnit
  heading: string
  equation: string
  spokenEquation: string
  plainEnglish: string
  denominatorLabel: string
}

export type CockcroftGaultCalculation = CockcroftGaultCoreCalculation & {
  working: string[]
}

export const cockcroftGaultFormulaDefinitions: Record<SerumCreatinineUnit, CockcroftGaultFormulaDefinition> = {
  umol: {
    unit: "umol",
    heading: "Cockcroft-Gault formula using serum creatinine in µmol/L",
    equation:
      "CrCl (mL/min) = [(140 − age) × weight (kg) × sex factor] ÷ [0.814 × SCr (µmol/L)]",
    spokenEquation:
      "Creatinine clearance in millilitres per minute equals 140 minus age, multiplied by weight in kilograms and the sex factor, divided by 0.814 multiplied by serum creatinine in micromoles per litre.",
    plainEnglish:
      "Subtract age from 140. Multiply by the selected weight in kilograms and the sex factor. Divide by 0.814 multiplied by serum creatinine in micromoles per litre.",
    denominatorLabel: "0.814 × serum creatinine in µmol/L",
  },
  mgdl: {
    unit: "mgdl",
    heading: "Cockcroft-Gault formula using serum creatinine in mg/dL",
    equation:
      "CrCl (mL/min) = [(140 − age) × weight (kg) × sex factor] ÷ [72 × SCr (mg/dL)]",
    spokenEquation:
      "Creatinine clearance in millilitres per minute equals 140 minus age, multiplied by weight in kilograms and the sex factor, divided by 72 multiplied by serum creatinine in milligrams per decilitre.",
    plainEnglish:
      "Subtract age from 140. Multiply by the selected weight in kilograms and the sex factor. Divide by 72 multiplied by serum creatinine in milligrams per decilitre.",
    denominatorLabel: "72 × serum creatinine in mg/dL",
  },
}

export function formatCockcroftGaultNumber(value: number, decimals = 1): string {
  return formatSafeNumber(value, decimals, { maxDecimals: 12 })
}

export function buildCockcroftGaultWorking(
  age: number,
  weightKg: number,
  sexFactor: CockcroftGaultSexFactor,
  serumCreatinine: number,
  unit: SerumCreatinineUnit,
  weightContext: CockcroftGaultWeightContext = buildWeightContext("direct"),
): string[] {
  const definition = cockcroftGaultFormulaDefinitions[unit]
  const calculation = calculateCockcroftGaultCore(age, weightKg, sexFactor, serumCreatinine, unit, weightContext)
  const serumCreatinineUnit = unit === "umol" ? "µmol/L" : "mg/dL"
  const denominatorConstant = unit === "umol" ? "0.814" : "72"
  const weightLines: string[] = []

  if (weightContext.method === "ideal" && weightContext.idealWeightKg !== undefined) {
    weightLines.push(
      `Selected weight method = Devine ideal body weight = ${formatCockcroftGaultNumber(weightContext.idealWeightKg, 4)} kg`,
    )
  } else if (weightContext.method === "adjusted" && weightContext.adjustedWeightKg !== undefined) {
    weightLines.push(
      `Adjusted weight = IBW + ${formatCockcroftGaultNumber(weightContext.adjustmentFactor ?? ADJUSTED_BODY_WEIGHT_FACTOR, 1)} × (actual weight − IBW)`,
      `Adjusted weight = ${formatCockcroftGaultNumber(weightContext.idealWeightKg ?? 0, 4)} + ${formatCockcroftGaultNumber(weightContext.adjustmentFactor ?? ADJUSTED_BODY_WEIGHT_FACTOR, 1)} × (${formatCockcroftGaultNumber(weightContext.actualWeightKg ?? 0, 4)} − ${formatCockcroftGaultNumber(weightContext.idealWeightKg ?? 0, 4)}) = ${formatCockcroftGaultNumber(weightContext.adjustedWeightKg, 4)} kg`,
    )
  } else if (weightContext.method === "actual") {
    weightLines.push(`Selected weight method = Actual body weight = ${formatCockcroftGaultNumber(weightKg, 4)} kg`)
  } else {
    weightLines.push(`Selected weight entered directly = ${formatCockcroftGaultNumber(weightKg, 4)} kg`)
  }

  return [
    ...weightLines,
    definition.equation,
    `CrCl = [(140 − ${formatCockcroftGaultNumber(age, 1)}) × ${formatCockcroftGaultNumber(weightKg, 4)} × ${formatCockcroftGaultNumber(calculation.sexMultiplier, 2)}] ÷ [${denominatorConstant} × ${formatCockcroftGaultNumber(serumCreatinine, unit === "umol" ? 2 : 3)} ${serumCreatinineUnit}]`,
    `Numerator = ${formatCockcroftGaultNumber(calculation.numerator, 4)}`,
    `Denominator = ${formatCockcroftGaultNumber(calculation.denominator, 4)}`,
    `CrCl = ${formatCockcroftGaultNumber(calculation.numerator, 4)} ÷ ${formatCockcroftGaultNumber(calculation.denominator, 4)}`,
    `CrCl = ${formatCockcroftGaultNumber(calculation.crcl, 4)} mL/min`,
  ]
}

export function calculateCockcroftGault(
  age: number,
  weightKg: number,
  sexFactor: CockcroftGaultSexFactor,
  serumCreatinine: number,
  unit: SerumCreatinineUnit,
  weightContext: CockcroftGaultWeightContext = buildWeightContext("direct"),
): CockcroftGaultCalculation {
  const calculation = calculateCockcroftGaultCore(age, weightKg, sexFactor, serumCreatinine, unit, weightContext)
  return {
    ...calculation,
    working: buildCockcroftGaultWorking(age, weightKg, sexFactor, serumCreatinine, unit, weightContext),
  }
}
