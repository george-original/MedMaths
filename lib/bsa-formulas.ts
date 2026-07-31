import { formatSafeNumber } from "./safe-number-format"
import type { MeasurementSystem } from "./measurement-conversions"

export type BsaFormulaKey = "mosteller" | "dubois" | "haycock" | "gehan"

export type BsaFormulaDefinition = {
  key: BsaFormulaKey
  name: string
  shortName: string
  heading: string
  equation: string
  spokenEquation: string
  plainEnglish: string
  difference: string
  sourceTitle: string
  sourceUrl: string
}

export type BsaCalculation = {
  bsa: number
  formulaKey: BsaFormulaKey
  formulaName: string
  heightCm: number
  weightKg: number
  measurementSystem: MeasurementSystem
  inputSummary: string
  metricInputSummary: string
  working: string[]
}

export type BsaCalculationOptions = {
  measurementSystem?: MeasurementSystem
  inputSummary?: string
  conversionWorking?: string[]
}

export const bsaFormulaOrder: BsaFormulaKey[] = ["mosteller", "dubois", "haycock", "gehan"]

export const bsaFormulaDefinitions: Record<BsaFormulaKey, BsaFormulaDefinition> = {
  mosteller: {
    key: "mosteller",
    name: "Mosteller",
    shortName: "Mosteller",
    heading: "Mosteller BSA formula",
    equation: "BSA (m²) = √[(height (cm) × weight (kg)) ÷ 3600]",
    spokenEquation:
      "Body surface area in square metres equals the square root of height in centimetres multiplied by weight in kilograms, divided by 3600.",
    plainEnglish:
      "Multiply height in centimetres by weight in kilograms, divide by 3600, then calculate the square root.",
    difference:
      "Mosteller uses a simplified square-root equation. It is easier to calculate manually than the exponent-based formulas, but it can return a slightly different estimate.",
    sourceTitle: "Mosteller RD — Simplified calculation of body-surface area",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/3657876/",
  },
  dubois: {
    key: "dubois",
    name: "Du Bois & Du Bois",
    shortName: "Du Bois",
    heading: "Du Bois and Du Bois BSA formula",
    equation: "BSA (m²) = 0.007184 × height(cm)^0.725 × weight(kg)^0.425",
    spokenEquation:
      "Body surface area in square metres equals 0.007184 multiplied by height in centimetres to the power of 0.725, multiplied by weight in kilograms to the power of 0.425.",
    plainEnglish:
      "Raise height and weight to the powers shown, multiply those values together, then multiply by 0.007184.",
    difference:
      "Du Bois and Du Bois is an older exponent-based equation. It applies different powers to height and weight rather than using the Mosteller square-root method.",
    sourceTitle: "Du Bois D & Du Bois EF — A formula to estimate surface area from height and weight",
    sourceUrl: "https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/654069",
  },
  haycock: {
    key: "haycock",
    name: "Haycock",
    shortName: "Haycock",
    heading: "Haycock BSA formula",
    equation: "BSA (m²) = 0.024265 × height(cm)^0.3964 × weight(kg)^0.5378",
    spokenEquation:
      "Body surface area in square metres equals 0.024265 multiplied by height in centimetres to the power of 0.3964, multiplied by weight in kilograms to the power of 0.5378.",
    plainEnglish:
      "Raise height and weight to the powers shown, multiply the results together, then multiply by 0.024265.",
    difference:
      "Haycock uses coefficients derived from measurements across infants, children, and adults. It weights height and weight differently from Mosteller and Du Bois.",
    sourceTitle: "Haycock GB, Schwartz GJ, Wisotsky DH — Geometric method for measuring body surface area",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/650346/",
  },
  gehan: {
    key: "gehan",
    name: "Gehan & George",
    shortName: "Gehan & George",
    heading: "Gehan and George BSA formula",
    equation: "BSA (m²) = 0.0235 × height(cm)^0.42246 × weight(kg)^0.51456",
    spokenEquation:
      "Body surface area in square metres equals 0.0235 multiplied by height in centimetres to the power of 0.42246, multiplied by weight in kilograms to the power of 0.51456.",
    plainEnglish:
      "Raise height and weight to the powers shown, multiply the results together, then multiply by 0.0235.",
    difference:
      "Gehan and George is another exponent-based equation. Its constants and powers differ from Du Bois and Haycock, so the same height and weight can produce a slightly different BSA.",
    sourceTitle: "Gehan EA, George SL — Estimation of human body surface area from height and weight",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/5527019/",
  },
}

export function formatBsaNumber(value: number, decimals: number): string {
  return formatSafeNumber(value, decimals, { maxDecimals: 12 })
}

export function calculateBsaValue(heightCm: number, weightKg: number, formula: BsaFormulaKey): number {
  switch (formula) {
    case "mosteller":
      return Math.sqrt((heightCm * weightKg) / 3600)
    case "dubois":
      return 0.007184 * Math.pow(heightCm, 0.725) * Math.pow(weightKg, 0.425)
    case "haycock":
      return 0.024265 * Math.pow(heightCm, 0.3964) * Math.pow(weightKg, 0.5378)
    case "gehan":
      return 0.0235 * Math.pow(heightCm, 0.42246) * Math.pow(weightKg, 0.51456)
  }
}

export function buildBsaWorking(
  heightCm: number,
  weightKg: number,
  formula: BsaFormulaKey,
): string[] {
  const bsa = calculateBsaValue(heightCm, weightKg, formula)

  if (formula === "mosteller") {
    const product = heightCm * weightKg
    const quotient = product / 3600
    return [
      bsaFormulaDefinitions.mosteller.equation,
      `BSA = √[(${formatBsaNumber(heightCm, 2)} × ${formatBsaNumber(weightKg, 2)}) ÷ 3600]`,
      `BSA = √(${formatBsaNumber(product, 4)} ÷ 3600)`,
      `BSA = √${formatBsaNumber(quotient, 6)}`,
      `BSA = ${formatBsaNumber(bsa, 4)} m²`,
    ]
  }

  const definition = bsaFormulaDefinitions[formula]
  const configuration = {
    dubois: { coefficient: 0.007184, heightPower: 0.725, weightPower: 0.425 },
    haycock: { coefficient: 0.024265, heightPower: 0.3964, weightPower: 0.5378 },
    gehan: { coefficient: 0.0235, heightPower: 0.42246, weightPower: 0.51456 },
  }[formula]

  const heightPowerResult = Math.pow(heightCm, configuration.heightPower)
  const weightPowerResult = Math.pow(weightKg, configuration.weightPower)

  return [
    definition.equation,
    `BSA = ${configuration.coefficient} × ${formatBsaNumber(heightCm, 2)}^${configuration.heightPower} × ${formatBsaNumber(weightKg, 2)}^${configuration.weightPower}`,
    `BSA = ${configuration.coefficient} × ${formatBsaNumber(heightPowerResult, 4)} × ${formatBsaNumber(weightPowerResult, 4)}`,
    `BSA = ${formatBsaNumber(bsa, 4)} m²`,
  ]
}

export function calculateBsa(
  heightCm: number,
  weightKg: number,
  formula: BsaFormulaKey,
  options: BsaCalculationOptions = {},
): BsaCalculation {
  const measurementSystem = options.measurementSystem ?? "metric"
  const metricInputSummary = `${formatBsaNumber(heightCm, 2)} cm and ${formatBsaNumber(weightKg, 2)} kg`

  return {
    bsa: calculateBsaValue(heightCm, weightKg, formula),
    formulaKey: formula,
    formulaName: bsaFormulaDefinitions[formula].name,
    heightCm,
    weightKg,
    measurementSystem,
    inputSummary: options.inputSummary ?? metricInputSummary,
    metricInputSummary,
    working: [...(options.conversionWorking ?? []), ...buildBsaWorking(heightCm, weightKg, formula)],
  }
}
