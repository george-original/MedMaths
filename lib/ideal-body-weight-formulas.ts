import { formatSafeNumber } from "./safe-number-format"
import {
  DEVINE_MAX_HEIGHT_CM,
  DEVINE_MIN_HEIGHT_CM,
  calculateDevineCore,
  cmToFeetInches,
  feetInchesToCm,
  isSupportedDevineHeight,
  type DevineSex,
  type FeetInches,
} from "./ideal-body-weight-core"

export {
  DEVINE_MAX_HEIGHT_CM,
  DEVINE_MIN_HEIGHT_CM,
  cmToFeetInches,
  feetInchesToCm,
  isSupportedDevineHeight,
}
export type { DevineSex, FeetInches }

export type DevineFormulaDefinition = {
  sex: DevineSex
  name: string
  heading: string
  equation: string
  spokenEquation: string
  plainEnglish: string
  baseKg: number
}

export type DevineCalculation = {
  sex: DevineSex
  heightCm: number
  heightInches: number
  inchesAboveFiveFeet: number
  baseKg: number
  ibwKg: number
  working: string[]
}

export const devineFormulaDefinitions: Record<DevineSex, DevineFormulaDefinition> = {
  male: {
    sex: "male",
    name: "Male Devine",
    heading: "Male Devine ideal body weight formula",
    equation: "IBW (kg) = 50 + 2.3 × [height (inches) − 60]",
    spokenEquation:
      "Ideal body weight in kilograms equals 50 plus 2.3 multiplied by height in inches minus 60.",
    plainEnglish:
      "Convert height to inches, subtract 60 inches (5 feet), multiply the inches above 5 feet by 2.3 kg, then add 50 kg.",
    baseKg: 50,
  },
  female: {
    sex: "female",
    name: "Female Devine",
    heading: "Female Devine ideal body weight formula",
    equation: "IBW (kg) = 45.5 + 2.3 × [height (inches) − 60]",
    spokenEquation:
      "Ideal body weight in kilograms equals 45.5 plus 2.3 multiplied by height in inches minus 60.",
    plainEnglish:
      "Convert height to inches, subtract 60 inches (5 feet), multiply the inches above 5 feet by 2.3 kg, then add 45.5 kg.",
    baseKg: 45.5,
  },
}

export function formatDevineNumber(value: number, decimals = 1): string {
  return formatSafeNumber(value, decimals, { maxDecimals: 12 })
}

export function calculateDevineValue(heightCm: number, sex: DevineSex): number {
  return calculateDevineCore(heightCm, sex).ibwKg
}

export function buildDevineWorking(heightCm: number, sex: DevineSex): string[] {
  const calculation = calculateDevineCore(heightCm, sex)
  const definition = devineFormulaDefinitions[sex]
  const increment = 2.3 * calculation.inchesAboveFiveFeet

  return [
    "Height (inches) = height (cm) ÷ 2.54",
    `Height = ${formatDevineNumber(heightCm, 2)} ÷ 2.54 = ${formatDevineNumber(calculation.heightInches, 4)} inches`,
    `Inches above 5 feet = ${formatDevineNumber(calculation.heightInches, 4)} − 60 = ${formatDevineNumber(calculation.inchesAboveFiveFeet, 4)}`,
    definition.equation,
    `IBW = ${formatDevineNumber(definition.baseKg, 1)} + 2.3 × ${formatDevineNumber(calculation.inchesAboveFiveFeet, 4)}`,
    `IBW = ${formatDevineNumber(definition.baseKg, 1)} + ${formatDevineNumber(increment, 4)}`,
    `IBW = ${formatDevineNumber(calculation.ibwKg, 4)} kg`,
  ]
}

export function calculateDevineIbw(heightCm: number, sex: DevineSex): DevineCalculation {
  const calculation = calculateDevineCore(heightCm, sex)
  return {
    ...calculation,
    working: buildDevineWorking(heightCm, sex),
  }
}
