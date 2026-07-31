import type { CalculatorThemeKey } from "@/lib/calculator-themes"

export type CalculatorCatalogIconKey =
  | "syringe"
  | "pill"
  | "droplet"
  | "beaker"
  | "weight"
  | "activity"

export type CalculatorCatalogItem = {
  title: string
  shortTitle?: string
  href: string
  description: string
  intent: string
  formula: string
  categoryName: string
  categoryShortName: string
  categoryHref: string
  theme: Exclude<CalculatorThemeKey, "neutral">
  icon: CalculatorCatalogIconKey
}

export type CalculatorCatalogCategory = {
  name: string
  shortName: string
  slug: string
  href: string
  description: string
  theme: Exclude<CalculatorThemeKey, "neutral">
  icon: CalculatorCatalogIconKey
  calculators: CalculatorCatalogItem[]
}

type CalculatorInput = Omit<CalculatorCatalogItem, "categoryName" | "categoryShortName" | "categoryHref" | "theme" | "icon">

type CategoryInput = Omit<CalculatorCatalogCategory, "calculators"> & {
  calculators: CalculatorInput[]
}

const rawCategories: CategoryInput[] = [
  {
    name: "Dose Calculations",
    shortName: "Dose",
    slug: "dose-calculations",
    href: "/calculator/dose-calculations",
    description: "Convert ordered doses into measurable liquid volumes using concentration, patient weight, or units/mL.",
    theme: "dose",
    icon: "syringe",
    calculators: [
      {
        title: "mg to mL Calculator",
        href: "/calculator/dose-calculations/mg-to-ml",
        description: "Convert a medicine dose in milligrams to mL using the supplied concentration.",
        intent: "Use when the order is in mg and the liquid strength is in mg/mL or mg per X mL.",
        formula: "mL = dose in mg ÷ concentration in mg/mL",
      },
      {
        title: "mg/kg to mL Dose Calculator",
        shortTitle: "mg/kg to mL",
        href: "/calculator/dose-calculations/mgkg-to-ml-dose",
        description: "Calculate mg/kg per-dose or per-day orders using kg or lb, divided doses, and liquid concentration.",
        intent: "Use when a liquid medicine order is written in mg/kg per dose or mg/kg/day and weight is documented in kg or lb.",
        formula: "mL/dose = mg per dose ÷ concentration; daily orders are divided by doses/day",
      },
      {
        title: "Units to mL Calculator",
        href: "/calculator/dose-calculations/units-to-ml",
        description: "Convert a unit-based medicine order into mL using units/mL.",
        intent: "Use when both the order and product strength are expressed in units.",
        formula: "mL = ordered units ÷ units/mL",
      },
    ],
  },
  {
    name: "Tablet & Oral Dosing",
    shortName: "Tablet",
    slug: "tablet-dosing",
    href: "/calculator/tablet-dosing",
    description: "Calculate tablets from a fixed mg dose or an optional weight-based mg/kg dose.",
    theme: "tablet",
    icon: "pill",
    calculators: [
      {
        title: "Tablet Dosing Calculator",
        shortTitle: "Tablet Dosage Calculator",
        href: "/calculator/tablet-dosing",
        description: "Calculate tablet quantity from a dose in mg or from a weight-based mg/kg dose.",
        intent: "Use when the final medicine amount must be converted into tablets using mg per tablet.",
        formula: "tablets = dose in mg ÷ tablet strength",
      },
    ],
  },
  {
    name: "IV Fluids & Infusions",
    shortName: "IV",
    slug: "iv-fluids",
    href: "/calculator/iv-fluids",
    description: "Convert between mL/hr, gtt/min, giving-set drop factor, and infusion duration.",
    theme: "iv",
    icon: "droplet",
    calculators: [
      {
        title: "IV Drip Rate Calculator",
        shortTitle: "IV Drip Rate",
        href: "/calculator/iv-fluids/drip-rate-mlhr-to-gttmin",
        description: "Calculate drops per minute from mL/hr or from total volume and infusion time.",
        intent: "Use when the giving-set drop factor is known and the order provides either mL/hr or total volume and time.",
        formula: "gtt/min = (mL/hr × drop factor) ÷ 60 or (volume × drop factor) ÷ time minutes",
      },
      {
        title: "gtt/min to mL/hr Calculator",
        shortTitle: "gtt/min to mL/hr",
        href: "/calculator/iv-fluids/mlhr-from-drip-rate",
        description: "Convert an observed gravity drip count into an estimated hourly IV rate.",
        intent: "Use when drops per minute and the giving-set drop factor are known.",
        formula: "mL/hr = (gtt/min × 60) ÷ drop factor",
      },
      {
        title: "IV Infusion Time Calculator",
        shortTitle: "Infusion Time Calculator",
        href: "/calculator/iv-fluids/ml-per-hour-to-time-to-finish",
        description: "Calculate infusion duration and optional clock completion from remaining volume, rate, and start time.",
        intent: "Use when remaining volume and mL/hr are known; add a start time when a clock completion estimate is also needed.",
        formula: "time hours = volume mL ÷ rate mL/hr; clock finish = start time + duration",
      },
    ],
  },
  {
    name: "Dilutions & Reconstitution",
    shortName: "Dilution",
    slug: "dilutions",
    href: "/calculator/dilutions",
    description: "Work through stock dilution and final IV bag concentration calculations. Use mg to mL for vial withdrawal volume.",
    theme: "dilution",
    icon: "beaker",
    calculators: [
      {
        title: "Medication Dilution Calculator",
        href: "/calculator/dilutions/c1v1-c2v2-basic",
        description: "Solve C1V1=C2V2 for medication stock volume, final total volume, or concentration.",
        intent: "Use for verified medication-dilution arithmetic where the same medicine and matching concentration and volume units are used.",
        formula: "C1 × V1 = C2 × V2",
      },
      {
        title: "Final IV Bag Concentration Calculator",
        shortTitle: "Final IV Concentration",
        href: "/calculator/dilutions/reconstitute-to-bag",
        description: "Check vial concentration, amount transferred, and final IV concentration from verified inputs.",
        intent: "Use after product- or pharmacy-specific reconstitution and transfer values are already verified.",
        formula: "final concentration = amount transferred ÷ verified final total volume",
      },
    ],
  },
  {
    name: "Dosing Body Measures",
    shortName: "Body",
    slug: "body-composition",
    href: "/calculator/body-composition",
    description: "Calculate body surface area and ideal body weight for medication maths context.",
    theme: "body",
    icon: "weight",
    calculators: [
      {
        title: "BSA Calculator",
        href: "/calculator/body-composition/bsa",
        description: "Calculate body surface area from metric or imperial height and weight using four published formulas.",
        intent: "Use when a protocol or calculation requires body surface area in m² and a named BSA equation.",
        formula: "Mosteller, Du Bois, Haycock, or Gehan & George",
      },
      {
        title: "Ideal Body Weight Calculator",
        shortTitle: "Ideal Body Weight",
        href: "/calculator/body-composition/ideal-body-weight",
        description: "Calculate adult clinical ideal body weight using the Devine formula in cm or feet and inches.",
        intent: "Use when a medicine reference or protocol specifically requires adult Devine ideal body weight.",
        formula: "IBW = base weight + 2.3 kg per inch over 5 feet",
      },
    ],
  },
  {
    name: "Renal Dosing Support",
    shortName: "Renal",
    slug: "renal-function",
    href: "/calculator/renal-function/creatinine-clearance",
    description: "Estimate Cockcroft-Gault creatinine clearance with explicit weight-method selection.",
    theme: "renal",
    icon: "activity",
    calculators: [
      {
        title: "Creatinine Clearance Calculator",
        shortTitle: "Creatinine Clearance",
        href: "/calculator/renal-function/creatinine-clearance",
        description: "Estimate adult Cockcroft-Gault CrCl using an explicitly selected weight, with µmol/L or mg/dL serum creatinine.",
        intent: "Use when a medicine reference specifically requires Cockcroft-Gault CrCl and states the appropriate weight method.",
        formula: "CrCl = [(140 − age) × weight × sex factor] ÷ creatinine factor",
      },
    ],
  },
]

export const calculatorCatalog: CalculatorCatalogCategory[] = rawCategories.map((category) => ({
  ...category,
  calculators: category.calculators.map((calculator) => ({
    ...calculator,
    categoryName: category.name,
    categoryShortName: category.shortName,
    categoryHref: category.href,
    theme: category.theme,
    icon: category.icon,
  })),
}))

export const allCalculatorCatalogItems = calculatorCatalog.flatMap((category) => category.calculators)

export const popularCalculatorHrefs = [
  "/calculator/dose-calculations/mg-to-ml",
  "/calculator/tablet-dosing",
  "/calculator/iv-fluids/mlhr-from-drip-rate",
  "/calculator/body-composition/ideal-body-weight",
  "/calculator/body-composition/bsa",
  "/calculator/dose-calculations/mgkg-to-ml-dose",
  "/calculator/iv-fluids/drip-rate-mlhr-to-gttmin",
  "/calculator/renal-function/creatinine-clearance",
] as const

export const popularCalculatorCatalogItems = popularCalculatorHrefs
  .map((href) => allCalculatorCatalogItems.find((calculator) => calculator.href === href))
  .filter((calculator): calculator is CalculatorCatalogItem => Boolean(calculator))

export function getCalculatorCatalogItem(href: string) {
  const route = href.split(/[?#]/, 1)[0]
  return allCalculatorCatalogItems.find((calculator) => calculator.href === route)
}
