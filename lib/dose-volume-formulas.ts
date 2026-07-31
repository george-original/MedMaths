import { formatSafeNumber } from "./safe-number-format"

export type MgMlMode = "mgToMl" | "mlToMg"
export type MgMlInputMethod = "concentration" | "label"
export type UnitsMlMode = "unitsToMl" | "mlToUnits"

export type FormulaDefinition = {
  heading: string
  equation: string
  spokenEquation: string
  plainEnglish: string
  variables: Array<{ symbol: string; meaning: string }>
}

export const mgMlFormulaDefinitions: Record<MgMlMode, FormulaDefinition> = {
  mgToMl: {
    heading: "mg to mL formula",
    equation: "Volume (mL) = dose needed (mg) ÷ concentration (mg/mL)",
    spokenEquation:
      "Volume in millilitres equals the dose needed in milligrams divided by the concentration in milligrams per millilitre.",
    plainEnglish: "Divide the dose you need by how many milligrams are in 1 mL.",
    variables: [
      { symbol: "Dose needed", meaning: "the ordered or prescribed amount in mg" },
      { symbol: "Concentration", meaning: "how many mg are in 1 mL" },
      { symbol: "Volume", meaning: "the answer in mL" },
    ],
  },
  mlToMg: {
    heading: "mL to mg formula",
    equation: "Dose (mg) = volume (mL) × concentration (mg/mL)",
    spokenEquation:
      "Dose in milligrams equals volume in millilitres multiplied by concentration in milligrams per millilitre.",
    plainEnglish: "Multiply the mL by how many milligrams are in 1 mL.",
    variables: [
      { symbol: "Volume", meaning: "the measured amount in mL" },
      { symbol: "Concentration", meaning: "how many mg are in 1 mL" },
      { symbol: "Dose", meaning: "the answer in mg" },
    ],
  },
}

export const mgMlLabelFormulaDefinition: FormulaDefinition = {
  heading: "mg per X mL formula",
  equation: "Volume (mL) = dose needed (mg) ÷ dose on label (mg) × label volume (mL)",
  spokenEquation:
    "Volume in millilitres equals the required dose in milligrams divided by the supplied dose in milligrams, multiplied by the supplied volume in millilitres.",
  plainEnglish:
    "Divide the dose you need by the dose on the label, then multiply by the label volume. This is also written as D/H × Q.",
  variables: [
    { symbol: "Dose needed (D)", meaning: "the ordered or prescribed dose in mg" },
    { symbol: "Dose on label (H)", meaning: "the mg amount printed on the label" },
    { symbol: "Label volume (Q)", meaning: "the mL containing the label dose" },
    { symbol: "Volume", meaning: "the answer in mL" },
  ],
}

export const unitsMlFormulaDefinitions: Record<UnitsMlMode, FormulaDefinition> = {
  unitsToMl: {
    heading: "Units to mL formula",
    equation: "Volume (mL) = dose (units) ÷ concentration (units/mL)",
    spokenEquation:
      "Volume in millilitres equals the ordered dose in units divided by the concentration in units per millilitre.",
    plainEnglish: "Divide the ordered units by how many units are in 1 mL.",
    variables: [
      { symbol: "Dose", meaning: "the ordered amount in units" },
      { symbol: "Concentration", meaning: "how many units are in 1 mL" },
      { symbol: "Volume", meaning: "the answer in mL" },
    ],
  },
  mlToUnits: {
    heading: "mL to units formula",
    equation: "Dose (units) = volume (mL) × concentration (units/mL)",
    spokenEquation:
      "Dose in units equals volume in millilitres multiplied by concentration in units per millilitre.",
    plainEnglish: "Multiply the mL by how many units are in 1 mL.",
    variables: [
      { symbol: "Volume", meaning: "the measured amount in mL" },
      { symbol: "Concentration", meaning: "how many units are in 1 mL" },
      { symbol: "Dose", meaning: "the answer in units" },
    ],
  },
}

export function calculateMgMl(primary: number, concentration: number, mode: MgMlMode): number {
  return mode === "mgToMl" ? primary / concentration : primary * concentration
}

export function calculateMgMlFromLabel(requiredDoseMg: number, suppliedDoseMg: number, suppliedVolumeMl: number): number {
  return (requiredDoseMg / suppliedDoseMg) * suppliedVolumeMl
}

export function calculateUnitsMl(primary: number, concentration: number, mode: UnitsMlMode): number {
  return mode === "unitsToMl" ? primary / concentration : primary * concentration
}

export function formatFormulaNumber(value: number, decimals = 6): string {
  return formatSafeNumber(value, decimals, { maxDecimals: 12 })
}
