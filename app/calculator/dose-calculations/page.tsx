import type { Metadata } from "next"
import { BookOpen, HelpCircle, Library, ListChecks, ShieldCheck, Syringe } from "lucide-react"
import {
  CalculatorCategoryLayout,
  CalculatorNotice,
  CalculatorSection,
  CategoryFaqList,
} from "@/components/calculator"

const CANONICAL = "https://www.medmaths.com/calculator/dose-calculations"

export const metadata: Metadata = {
  title: "Medication Dose Calculators | Liquid Dose & Units",
  description:
    "Browse medication dose calculators for mg to mL, mg/kg to mL, and units to mL. Choose the tool that matches the order and product-label units.",
  keywords: [
    "dose calculation calculators",
    "medication maths calculators",
    "medicine dose calculator",
    "drug calculation calculator",
    "mg to mL calculator",
    "mg/kg to mL calculator",
    "units to mL calculator",
    "dose to volume calculator",
    "nursing drug calculations",
    "medication calculation formulas",
  ],
  authors: [{ name: "George Lambroglou, RN", url: "https://www.medmaths.com/about" }],
  creator: "George Lambroglou, RN",
  publisher: "MedMaths",
  alternates: { canonical: CANONICAL },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Medication Dose Calculators | Liquid Dose & Units",
    description:
      "Choose the right medication maths calculator for mg to mL, mg/kg to mL, and units to mL dose-volume calculations.",
    url: CANONICAL,
    siteName: "MedMaths",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary",
    title: "Medication Dose Calculators | Liquid Dose & Units",
    description:
      "Medication dose calculation calculators with formulas, worked examples, label checks, and safe arithmetic guidance.",
  },
}

const calculators = [
  {
    title: "mg to mL Calculator",
    slug: "mg-to-ml",
    description: "Convert a medicine dose in mg to a measurable mL volume using concentration.",
    bestFor: "Liquid medicines labelled as mg/mL or mg per X mL",
    formula: "mL = dose in mg ÷ concentration in mg/mL",
  },
  {
    title: "mg/kg to mL Dose Calculator",
    slug: "mgkg-to-ml-dose",
    description: "Convert a weight-based dose into total mg and liquid volume per dose.",
    bestFor: "Weight-based doses, including many paediatric medication maths questions",
    formula: "mL = (mg/kg × weight in kg) ÷ concentration in mg/mL",
  },
  {
    title: "Units to mL Calculator",
    slug: "units-to-ml",
    description: "Convert unit-based medicine orders into mL using units/mL concentration.",
    bestFor: "Medicines ordered in units, such as insulin or heparin arithmetic checks",
    formula: "mL = ordered units ÷ concentration in units/mL",
  },
]

const calculationSteps = [
  {
    title: "1. Read the order",
    body: "Identify the dose that has been prescribed or provided in the question. Check whether it is written in mg, micrograms, mg/kg, units, or another unit.",
  },
  {
    title: "2. Read the product strength",
    body: "Find the liquid strength on the label. Common formats include mg/mL, mg per 5 mL, or units/mL.",
  },
  {
    title: "3. Match the units",
    body: "Make sure the dose unit and label unit belong to the same system before dividing. Convert grams to milligrams, micrograms to milligrams, or pounds to kilograms when needed.",
  },
  {
    title: "4. Calculate the amount to give",
    body: "Use the matching formula to convert the ordered dose into a liquid volume in mL.",
  },
  {
    title: "5. Check whether the answer makes sense",
    body: "Re-check very small, very large, or unexpected answers. Confirm dose frequency, maximum dose limits, route, patient factors, and local policy.",
  },
]

const commonMethods = [
  {
    heading: "Dose to liquid volume",
    formula: "Volume (mL) = dose required ÷ concentration",
    example: "250 mg ÷ 50 mg/mL = 5 mL",
  },
  {
    heading: "Weight-based dose to liquid volume",
    formula: "Volume (mL) = (mg/kg × weight kg) ÷ concentration",
    example: "8 mg/kg × 25 kg = 200 mg; 200 mg ÷ 50 mg/mL = 4 mL",
  },
  {
    heading: "Units to liquid volume",
    formula: "Volume (mL) = ordered units ÷ units/mL",
    example: "25 units ÷ 100 units/mL = 0.25 mL",
  },
]

const safetyChecks = [
  "Do not convert mg to mL without a concentration.",
  "Check whether the label says mg/mL or mg per X mL.",
  "Check mg vs micrograms because this can create a 1000-fold error.",
  "Check whether a mg/kg order is written per dose, per day, or per hour.",
  "Check whether the medicine has a maximum single dose or maximum daily dose.",
  "Use local independent-check requirements for high-risk medicines.",
]

const faqItems = [
  {
    question: "What is a dose calculation calculator?",
    quickAnswer:
      "A medication dose calculator converts an ordered medicine amount into a liquid volume in mL using the product concentration.",
    details: [
      "The calculation depends on the way the order is written and the way the product is supplied.",
      "For liquid medicines, the key number is usually the concentration, such as mg/mL or units/mL.",
      "For weight-based doses, the patient weight is used before converting the dose to a measurable volume.",
    ],
    microExample: "A 250 mg dose with a 50 mg/mL liquid strength gives 250 ÷ 50 = 5 mL.",
  },
  {
    question: "How do I know which dose calculator to use?",
    quickAnswer:
      "Choose the calculator that matches the order unit and the product label. Use mg to mL for mg/mL labels, mg/kg to mL for weight-based doses, and units to mL for units/mL labels.",
    details: [
      "If the question gives a dose in mg and a concentration in mg/mL, use the mg to mL calculator.",
      "If the question gives mg/kg and patient weight, use the mg/kg to mL calculator.",
      "If the question gives units and units/mL, use the units to mL calculator.",
    ],
    microExample: "20 units of U-100 insulin uses units to mL, not mg to mL.",
  },
  {
    question: "What is the basic dose calculation formula?",
    quickAnswer:
      "A common formula is amount to give = desired dose ÷ dose on hand × quantity. For many liquid medicines, this simplifies to mL = dose ÷ concentration.",
    details: [
      "Desired dose means the dose ordered or required.",
      "Dose on hand means the available strength or concentration.",
      "Quantity means the amount of product that contains the dose on hand, such as 1 mL, 5 mL, or 1 tablet.",
    ],
    microExample: "60 mg ÷ 20 mg × 5 mL = 15 mL.",
  },
  {
    question: "How do I convert mg to mL?",
    quickAnswer: "Divide the ordered dose in mg by the medication concentration in mg/mL.",
    details: [
      "Formula: mL = dose (mg) ÷ concentration (mg/mL).",
      "The ordered dose comes from the prescription or medication order.",
      "The concentration comes from the vial, ampoule, bottle, or bag label.",
    ],
    microExample: "250 mg ÷ 50 mg/mL = 5 mL.",
    relatedCalculators: [{ name: "mg to mL calculator", href: "/calculator/dose-calculations/mg-to-ml" }],
  },
  {
    question: "How do I calculate a weight-based dose?",
    quickAnswer: "Multiply the dose per kg by the patient weight in kg, then convert to mL if the medicine is liquid.",
    details: [
      "Formula: total dose (mg) = mg/kg × weight (kg).",
      "Then use mL = total mg ÷ concentration (mg/mL).",
      "Confirm whether a maximum dose cap applies before administration.",
    ],
    microExample: "8 mg/kg × 25 kg = 200 mg; 200 mg ÷ 50 mg/mL = 4 mL.",
    relatedCalculators: [{ name: "mg/kg to mL calculator", href: "/calculator/dose-calculations/mgkg-to-ml-dose" }],
  },
  {
    question: "When do I use units to mL instead of mg to mL?",
    quickAnswer: "Use units to mL when the order is written in units and the product strength is in units/mL.",
    details: [
      "Some medicines use units rather than milligrams.",
      "Formula: mL = ordered units ÷ concentration (units/mL).",
      "Always use the exact concentration printed on the product label.",
    ],
    microExample: "25 units ÷ 100 units/mL = 0.25 mL.",
    relatedCalculators: [{ name: "Units to mL calculator", href: "/calculator/dose-calculations/units-to-ml" }],
  },
  {
    question: "What does concentration mean in dose calculations?",
    quickAnswer:
      "Concentration tells you how much medicine is contained in a measured amount of liquid, such as 50 mg/mL or 250 mg per 5 mL.",
    details: [
      "A stronger concentration means more medicine is contained in each mL.",
      "For the same dose, a stronger concentration gives a smaller mL volume.",
      "You cannot safely calculate a dose volume unless the concentration is known.",
    ],
    microExample: "250 mg per 5 mL is the same as 50 mg/mL.",
  },
  {
    question: "What are common medication calculation mistakes?",
    quickAnswer:
      "Common mistakes include using the wrong concentration, mixing up mg and micrograms, missing a weight conversion, and confusing per-dose with per-day instructions.",
    details: [
      "Read the order and the product label separately before calculating.",
      "Convert units before using the formula.",
      "Re-check answers that are unexpectedly tiny, large, or hard to measure.",
    ],
    microExample: "A dose written as 50 micrograms is not the same as 50 mg.",
  },
  {
    question: "Are these dose calculators medical advice?",
    quickAnswer:
      "No. These calculators are arithmetic tools. They do not prescribe, recommend, or validate a medicine dose.",
    details: [
      "Always check the medication order, product label, patient factors, route, frequency, allergies, maximum dose limits, and local policy.",
      "High-risk medicines may require an independent double check.",
      "If a result conflicts with the order or clinical judgement, stop and clarify before using it.",
    ],
    microExample: "The calculator can check 250 mg ÷ 50 mg/mL = 5 mL, but it cannot decide whether 250 mg is the correct dose.",
  },
]

export default function DoseCalculationsPage() {
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Calculators", href: "/calculators" },
    { name: "Dose Calculations", href: "/calculator/dose-calculations" },
  ]

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Medication Dose Calculators",
    description: "Medication dose calculators for mg to mL, mg/kg to mL, and units to mL.",
    url: CANONICAL,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: calculators.map((calc, index) => ({
        "@type": "WebApplication",
        position: index + 1,
        name: calc.title,
        applicationCategory: "MedicalApplication",
        operatingSystem: "Web browser",
        url: `https://www.medmaths.com/calculator/dose-calculations/${calc.slug}`,
        description: calc.description,
      })),
    },
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: [item.quickAnswer, ...(item.details || []).map((detail) => `• ${detail}`)].join("\n"),
      },
    })),
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: breadcrumb.name,
      item: `https://www.medmaths.com${breadcrumb.href}`,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <CalculatorCategoryLayout
        theme="dose"
        breadcrumbs={breadcrumbs}
        eyebrow="Liquid medication dose calculators"
        title="Medication Dose Calculators"
        description="Choose the right calculator for mg to mL, weight-based mg/kg to mL, or units to mL. Each tool puts the calculator first, shows the working, and keeps the main safety checks close to the result."
        icon={<Syringe className="size-6" aria-hidden="true" />}
        calculators={calculators.map((calculator) => ({
          title: calculator.title,
          href: `/calculator/dose-calculations/${calculator.slug}`,
          description: calculator.description,
          bestFor: calculator.bestFor,
          formula: calculator.formula,
          icon: <Syringe className="size-5" aria-hidden="true" />,
        }))}
        lastReviewed={{ iso: "2026-07-10", label: "10 July 2026" }}
        quickGuide={
          <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
            <CalculatorNotice variant="warning" title="Arithmetic support only">
              Confirm the medication order, product label, route, concentration, patient factors, frequency, maximum-dose limits, and local independent-check requirements before using a result.
            </CalculatorNotice>
            <div className="rounded-2xl border p-5 [border-color:var(--calculator-border)] [background-color:var(--calculator-softer)]">
              <h2 className="font-bold text-gray-950">Choose by the units in the order</h2>
              <ul className="mt-3 grid gap-2 text-sm leading-6 text-gray-700 sm:grid-cols-3">
                <li><strong>mg + mg/mL:</strong> use mg to mL.</li>
                <li><strong>mg/kg + weight:</strong> use mg/kg to mL.</li>
                <li><strong>units + units/mL:</strong> use units to mL.</li>
              </ul>
            </div>
          </div>
        }
        references={
          <CalculatorSection
            title="References"
            summary="Sources supporting the calculation method and medication-safety wording."
            icon={<Library className="size-5" aria-hidden="true" />}
          >
            <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-gray-700">
              <li>OpenStax Pharmacology for Nurses: dosage calculations and the desired dose, dose on hand, quantity method.</li>
              <li>RMIT Learning Lab Nursing: calculating liquid medication volume from labels using proportionality.</li>
              <li>Australian Commission on Safety and Quality in Health Care: APINCHS high-risk medicines and systems.</li>
            </ul>
          </CalculatorSection>
        }
      >
        <CalculatorSection
          title="How dose calculations work"
          summary="A five-step method for moving from the medication order to a measurable amount."
          icon={<BookOpen className="size-5" aria-hidden="true" />}
        >
          <div className="space-y-4 text-sm leading-6 text-gray-700">
            <p>
              Dose calculations convert an ordered medicine amount into something measurable. The practical question is usually how many mL, tablets, or units the order requires.
            </p>
            <div className="grid gap-3 md:grid-cols-5">
              {calculationSteps.map((step) => (
                <article key={step.title} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <h3 className="font-bold [color:var(--calculator-text)]">{step.title}</h3>
                  <p className="mt-2">{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </CalculatorSection>

        <CalculatorSection
          title="Common medication maths formulas"
          summary="The three formula patterns used by the calculators in this topic."
          icon={<ListChecks className="size-5" aria-hidden="true" />}
        >
          <div className="grid gap-4 md:grid-cols-3">
            {commonMethods.map((method) => (
              <article key={method.heading} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <h3 className="font-semibold text-gray-950">{method.heading}</h3>
                <p className="mt-3 rounded-lg bg-white p-3 font-mono text-xs [color:var(--calculator-strong-text)]">{method.formula}</p>
                <p className="mt-3 text-sm leading-6 text-gray-700">{method.example}</p>
              </article>
            ))}
          </div>
        </CalculatorSection>

        <CalculatorSection
          title="Dose calculation safety checks"
          summary="Common unit, concentration, frequency, and maximum-dose checks."
          icon={<ShieldCheck className="size-5" aria-hidden="true" />}
        >
          <ul className="grid gap-3 md:grid-cols-2">
            {safetyChecks.map((check) => (
              <li key={check} className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm leading-6 text-gray-700">
                {check}
              </li>
            ))}
          </ul>
        </CalculatorSection>

        <CalculatorSection
          title="Dose calculation FAQs"
          summary="Answers to common questions about dose, concentration, weight-based orders, and unit errors."
          icon={<HelpCircle className="size-5" aria-hidden="true" />}
        >
          <CategoryFaqList items={faqItems} />
        </CalculatorSection>
      </CalculatorCategoryLayout>
    </>
  )
}
