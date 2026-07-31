// app/calculator/body-composition/bsa/page.tsx
import Link from "next/link"
import type { Metadata } from "next"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RelatedCalculators } from "@/components/related-calculators"
import { getCalculatorNetworkItems } from "@/lib/calculator-network"
import {
  CalculatorContentDisclosure,
  CalculatorEquation,
  CalculatorTrustBlock,
  CalculatorWorking,
} from "@/components/calculator"
import {
  bsaFormulaDefinitions,
  bsaFormulaOrder,
  buildBsaWorking,
  calculateBsaValue,
  formatBsaNumber,
  type BsaFormulaKey,
} from "@/lib/bsa-formulas"
import { feetAndInchesToCentimetres, poundsToKilograms } from "@/lib/measurement-conversions"

import BSAClient from "./bsa-client"

const CANONICAL_URL = "https://www.medmaths.com/calculator/body-composition/bsa"
const LAST_UPDATED_ISO = "2026-07-30"
const LAST_UPDATED_HUMAN = "30 Jul 2026"
const EXAMPLE_HEIGHT_CM = 170
const EXAMPLE_WEIGHT_KG = 70

export const metadata: Metadata = {
  title: "BSA Calculator | Height, Weight & 4 Formulas",
  description:
    "Calculate body surface area in m² from metric or imperial height and weight. Compare Mosteller, Du Bois, Haycock and Gehan formulas with step-by-step working.",
  keywords: [
    "BSA calculator",
    "body surface area calculator",
    "BSA meaning",
    "BSA definition",
    "what does BSA mean",
    "what does BSA result mean",
    "BSA formula",
    "how to calculate BSA",
    "Mosteller formula",
    "Mosteller BSA calculator",
    "Du Bois BSA formula",
    "Haycock BSA formula",
    "Gehan and George formula",
    "body surface area formula",
    "BSA m2 calculator",
    "BSA m² calculator",
    "BSA calculator feet inches pounds",
    "BSA calculator lb",
    "BSA medication calculation",
    "BSA for medication dosing",
    "BSA for chemotherapy dosing",
    "mg/m2 dose calculation",
    "mg/m² dose calculation",
  ],
  authors: [{ name: "George Lambroglou, RN", url: "https://www.medmaths.com/about" }],
  creator: "George Lambroglou, RN",
  publisher: "MedMaths",
  alternates: { canonical: CANONICAL_URL },
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
    title: "BSA Calculator: Height, Weight & Four Formulas",
    description:
      "Calculate BSA in m² from metric or imperial height and weight, compare four formulas and see the arithmetic.",
    url: CANONICAL_URL,
    siteName: "MedMaths",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary",
    title: "BSA Calculator | Height, Weight & 4 Formulas",
    description:
      "Calculate body surface area from metric or imperial height and weight and compare four published formulas.",
  },
}

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Calculators", href: "/calculators" },
  { name: "Body Composition", href: "/calculator/body-composition" },
  { name: "Body Surface Area (BSA)", href: "/calculator/body-composition/bsa" },
]

const faqItems = [
  {
    question: "What does BSA mean?",
    quickAnswer:
      "BSA means body surface area. It is an estimate of the total outside surface area of a person's body and is expressed in square metres (m²).",
    details: [
      "A BSA calculator estimates this surface area from height and weight because direct measurement is not practical in routine care.",
      "BSA is different from body weight, BMI and medication dose.",
    ],
  },
  {
    question: "What does a BSA result mean?",
    quickAnswer:
      "A BSA result such as 1.82 m² means the estimated body surface area is 1.82 square metres.",
    details: [
      "The number is not a medication dose by itself.",
      "For an order written in mg/m², the prescribed dose per square metre must still be multiplied by the BSA.",
    ],
  },
  {
    question: "How is BSA calculated?",
    quickAnswer:
      "BSA is estimated from height and weight using a published equation such as Mosteller, Du Bois and Du Bois, Haycock, or Gehan and George.",
    details: [
      "Mosteller uses a square-root equation, while the other formulas use different constants and mathematical powers.",
      "Use the exact equation specified by the relevant protocol or clinical reference.",
    ],
  },
  {
    question: "Can I calculate BSA using feet, inches and pounds?",
    quickAnswer:
      "Yes. Select imperial inputs and enter height in feet and inches and weight in pounds.",
    details: [
      "The calculator converts height to centimetres and weight to kilograms before applying the selected published equation.",
      "The conversion steps and converted values are shown in the result working.",
    ],
  },
  {
    question: "Which BSA formula should I use?",
    quickAnswer:
      "Use the formula specified by the medication protocol, clinical reference or local policy.",
    details: [
      "The calculator offers four published equations so the arithmetic can match the required method.",
      "Do not switch formulas merely because another method gives a preferred number.",
    ],
  },
  {
    question: "Why do BSA formulas give different results?",
    quickAnswer:
      "The formulas use different constants, mathematical powers and source datasets, so small differences are expected.",
    details: [
      "Rounding height, weight or the final BSA at different stages can also change the displayed result.",
      "Use one formula consistently and follow the formula and rounding rules named by the protocol.",
    ],
  },
  {
    question: "What does m² mean in a BSA result?",
    quickAnswer: "m² means square metres, the unit used to report estimated body surface area.",
    details: [
      "The superscript 2 means area rather than length.",
      "In an mg/m² prescription, the m² in the prescribed dose cancels with the patient's BSA unit, leaving a total dose in mg.",
    ],
  },
  {
    question: "How is BSA used in medication calculations?",
    quickAnswer:
      "For a dose written in mg/m², multiply the prescribed dose per square metre by the patient's BSA in square metres.",
    details: [
      "Example: 100 mg/m² × 1.82 m² = 182 mg.",
      "The protocol may still require maximum-dose checks, organ-function adjustments, dose reductions and specific rounding.",
    ],
  },
  {
    question: "How is BSA used for chemotherapy dosing?",
    quickAnswer:
      "Some chemotherapy regimens prescribe a medicine amount per square metre, written as mg/m², which is multiplied by the patient's BSA.",
    details: [
      "BSA is only one part of the regimen calculation.",
      "Treatment protocols may also specify dose caps, organ-function changes, toxicity reductions and pharmacy verification.",
    ],
  },
  {
    question: "Is there a normal BSA?",
    quickAnswer:
      "There is no single BSA value that should be assumed for medication dosing. BSA varies with the person's height and weight.",
    details: [
      "Use the patient's measured height and the weight method required by the protocol.",
      "An example or standard BSA used in teaching is not a substitute for a patient-specific calculation.",
    ],
  },
  {
    question: "Is BSA the same as BMI?",
    quickAnswer: "No. BMI is a weight-to-height ratio, while BSA estimates body surface area in square metres.",
    details: [
      "The two calculations have different equations, units and purposes.",
      "They should not be substituted for one another.",
    ],
  },
  {
    question: "Can this BSA calculator be used for children?",
    quickAnswer:
      "The calculator can show the arithmetic for the available formulas, but paediatric dosing must follow the relevant paediatric protocol.",
    details: [
      "The Haycock publication validated its height-weight formula across infants, children and adults.",
      "That does not mean every paediatric medicine should use Haycock or BSA-based dosing.",
    ],
  },
]

type PracticeItem = {
  title: string
  prompt: string
  answerLine: string
  working: string[]
}

const IMPERIAL_EXAMPLE_HEIGHT_CM = feetAndInchesToCentimetres(5, 7)
const IMPERIAL_EXAMPLE_WEIGHT_KG = poundsToKilograms(154)

const practiceItems: PracticeItem[] = [
  {
    title: "Mosteller metric practice",
    prompt: "Height 170 cm and weight 70 kg. Calculate BSA using Mosteller.",
    answerLine: "Displayed to two decimal places: 1.82 m²",
    working: buildBsaWorking(170, 70, "mosteller"),
  },
  {
    title: "Mosteller imperial practice",
    prompt: "Height 5 ft 7 in and weight 154 lb. Convert the measurements and calculate BSA using Mosteller.",
    answerLine: `Displayed to two decimal places: ${formatBsaNumber(calculateBsaValue(IMPERIAL_EXAMPLE_HEIGHT_CM, IMPERIAL_EXAMPLE_WEIGHT_KG, "mosteller"), 2)} m²`,
    working: [
      `Height = (5 × 30.48) + (7 × 2.54) = ${formatBsaNumber(IMPERIAL_EXAMPLE_HEIGHT_CM, 2)} cm`,
      `Weight = 154 × 0.45359237 = ${formatBsaNumber(IMPERIAL_EXAMPLE_WEIGHT_KG, 2)} kg`,
      ...buildBsaWorking(IMPERIAL_EXAMPLE_HEIGHT_CM, IMPERIAL_EXAMPLE_WEIGHT_KG, "mosteller"),
    ],
  },
  {
    title: "Formula comparison practice",
    prompt: "Height 170 cm and weight 70 kg. Compare the displayed BSA using Mosteller and Haycock.",
    answerLine: "Mosteller: 1.82 m². Haycock: 1.83 m².",
    working: [
      ...buildBsaWorking(170, 70, "mosteller"),
      ...buildBsaWorking(170, 70, "haycock"),
    ],
  },
  {
    title: "Medication calculation practice",
    prompt: "A hypothetical order is 100 mg/m² and the calculated BSA is 1.82 m². Calculate the total amount before protocol-specific rounding.",
    answerLine: "Arithmetic result: 182 mg",
    working: [
      "Total amount (mg) = prescribed amount (mg/m²) × BSA (m²)",
      "Total amount = 100 mg/m² × 1.82 m²",
      "The m² units cancel, leaving mg",
      "Total amount = 182 mg",
    ],
  },
]

function jsonLdBreadcrumbList() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: breadcrumb.name,
      item: `https://www.medmaths.com${breadcrumb.href}`,
    })),
  }
}

function jsonLdFAQPage() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: `${item.quickAnswer} ${item.details.join(" ")}`,
      },
    })),
  }
}

function jsonLdWebApplication() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "BSA Calculator",
    alternateName: "Body Surface Area Calculator",
    description:
      "Calculate body surface area from metric or imperial height and weight using Mosteller, Du Bois and Du Bois, Haycock, or Gehan and George. Includes conversions, formula comparison and step-by-step arithmetic.",
    url: CANONICAL_URL,
    applicationCategory: "HealthApplication",
    operatingSystem: "All",
    author: {
      "@type": "Person",
      name: "George Lambroglou, RN",
      url: "https://www.medmaths.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "MedMaths",
      url: "https://www.medmaths.com",
    },
  }
}

function ExternalLinkIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 text-gray-400 transition group-hover:text-emerald-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17L17 7" />
      <path d="M10 7h7v7" />
    </svg>
  )
}

type RefItem = {
  title: string
  badge: string
  organisation: string
  description: string
  href: string
}

const referenceGroups: Array<{ heading: string; items: RefItem[] }> = [
  {
    heading: "Original formula publications",
    items: [
      {
        title: bsaFormulaDefinitions.mosteller.sourceTitle,
        badge: "PubMed",
        organisation: "New England Journal of Medicine (1987)",
        description: "Original publication of the simplified Mosteller body-surface-area calculation.",
        href: bsaFormulaDefinitions.mosteller.sourceUrl,
      },
      {
        title: bsaFormulaDefinitions.dubois.sourceTitle,
        badge: "Original article",
        organisation: "Archives of Internal Medicine (1916)",
        description: "Original Du Bois and Du Bois height-weight surface-area equation.",
        href: bsaFormulaDefinitions.dubois.sourceUrl,
      },
      {
        title: bsaFormulaDefinitions.haycock.sourceTitle,
        badge: "PubMed",
        organisation: "Journal of Pediatrics (1978)",
        description: "Original Haycock height-weight equation validated in infants, children and adults.",
        href: bsaFormulaDefinitions.haycock.sourceUrl,
      },
      {
        title: bsaFormulaDefinitions.gehan.sourceTitle,
        badge: "PubMed",
        organisation: "Cancer Chemotherapy Reports (1970)",
        description: "Original Gehan and George publication estimating body surface area from height and weight.",
        href: bsaFormulaDefinitions.gehan.sourceUrl,
      },
    ],
  },
  {
    heading: "Clinical context",
    items: [
      {
        title: "eviQ — Body Surface Area Calculator",
        badge: "Australian oncology",
        organisation: "Cancer Institute NSW / eviQ",
        description: "Australian clinical calculator and formula-reference page for body surface area.",
        href: "https://www.eviq.org.au/clinical-resources/eviq-calculators/3198-body-surface-area-calculator",
      },
      {
        title: "StatPearls — Body Surface Area",
        badge: "Clinical overview",
        organisation: "NCBI Bookshelf",
        description: "Overview of BSA equations, clinical applications and limitations.",
        href: "https://www.ncbi.nlm.nih.gov/books/NBK559005/",
      },
    ],
  },
]

function FormulaExplanation({ formulaKey }: { formulaKey: BsaFormulaKey }) {
  const formula = bsaFormulaDefinitions[formulaKey]
  const result = calculateBsaValue(EXAMPLE_HEIGHT_CM, EXAMPLE_WEIGHT_KG, formulaKey)
  const anchorIds: Record<BsaFormulaKey, string> = {
    mosteller: "mosteller-bsa-formula",
    dubois: "du-bois-bsa-formula",
    haycock: "haycock-bsa-formula",
    gehan: "gehan-george-bsa-formula",
  }

  return (
    <article id={anchorIds[formulaKey]} className="scroll-mt-24 space-y-4 rounded-2xl border border-emerald-200 bg-white p-4 sm:p-5">
      <CalculatorEquation
        title={formula.heading}
        equation={formula.equation}
        spokenEquation={formula.spokenEquation}
        plainEnglish={formula.plainEnglish}
        variables={[
          { symbol: "BSA", meaning: "body surface area in square metres (m²)" },
          { symbol: "height", meaning: "height in centimetres (cm)" },
          { symbol: "weight", meaning: "weight in kilograms (kg)" },
        ]}
        theme="body"
        headingLevel="h3"
        className="border-0 p-0"
      />

      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
        <h4 className="font-semibold text-gray-950">How this formula differs</h4>
        <p className="mt-2 text-sm leading-6 text-gray-700">{formula.difference}</p>
      </div>

      <CalculatorWorking
        title={`Worked example: ${EXAMPLE_HEIGHT_CM} cm and ${EXAMPLE_WEIGHT_KG} kg`}
        lines={buildBsaWorking(EXAMPLE_HEIGHT_CM, EXAMPLE_WEIGHT_KG, formulaKey)}
      />

      <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-950">
        Result: {formatBsaNumber(result, 4)} m². Displayed to two decimal places: {formatBsaNumber(result, 2)} m².
      </p>
    </article>
  )
}

export default function Page() {
  const comparisonRows = bsaFormulaOrder.map((key) => ({
    key,
    name: bsaFormulaDefinitions[key].name,
    result: calculateBsaValue(EXAMPLE_HEIGHT_CM, EXAMPLE_WEIGHT_KG, key),
  }))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbList()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQPage()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebApplication()) }} />

      <SiteHeader />

      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-3xl px-4 pb-12 pt-4 sm:px-6 sm:py-12 lg:px-8 lg:pt-10">
          <nav aria-label="Breadcrumb" className="mb-4 hidden text-sm text-gray-600 sm:block">
            <ol className="flex flex-wrap items-center gap-2">
              {breadcrumbs.map((breadcrumb, index) => {
                const isLast = index === breadcrumbs.length - 1
                return (
                  <li key={breadcrumb.href} className="flex items-center gap-2">
                    {index > 0 && <span className="text-gray-300">/</span>}
                    {isLast ? (
                      <span className="font-medium text-gray-900">{breadcrumb.name}</span>
                    ) : (
                      <Link href={breadcrumb.href} className="hover:text-emerald-700">
                        {breadcrumb.name}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ol>
          </nav>

          <h1 className="mb-3 text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            BSA Calculator — Body Surface Area from Height and Weight
          </h1>

          <section id="calculator" className="mb-8 scroll-mt-24">
            <BSAClient />
          </section>

          <section id="bsa-meaning" className="mb-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6">
            <h2 className="text-2xl font-bold text-gray-950">What does BSA mean?</h2>
            <p className="mt-3 text-base leading-7 text-gray-800">
              <strong>BSA means body surface area.</strong> It is an estimate of the total outside surface area of a person's body. BSA is usually expressed in square metres, written as <strong>m²</strong>.
            </p>

            <h3 className="mt-6 text-lg font-bold text-gray-950">What is the definition of body surface area?</h3>
            <p className="mt-2 text-sm leading-6 text-gray-700">
              Body surface area is the estimated external area of the body. A BSA calculator uses height and weight to estimate this area because direct measurement is not practical in routine clinical care.
            </p>

            <h3 className="mt-6 text-lg font-bold text-gray-950">What does a BSA result mean?</h3>
            <p className="mt-2 text-sm leading-6 text-gray-700">
              A result of 1.82 m² means the person's estimated body surface area is 1.82 square metres. It is not the person's weight, BMI, medication dose or medicine volume.
            </p>
          </section>

          <section className="mb-8 rounded-2xl border border-yellow-200 bg-yellow-50 p-5 sm:p-6">
            <h2 className="text-xl font-bold text-yellow-950">A BSA result is not the final medication dose</h2>
            <p className="mt-2 text-sm leading-6 text-yellow-950">
              If an order is written in mg/m², the prescribed amount per square metre must still be multiplied by the BSA. The relevant protocol may then require maximum-dose checks, organ-function adjustments, dose reductions, independent verification and specific rounding.
            </p>
          </section>

          <section id="how-bsa-is-calculated" className="mb-8">
            <h2 className="text-2xl font-bold text-gray-950">How is BSA calculated?</h2>
            <p className="mt-3 text-base leading-7 text-gray-700">
              BSA is estimated from height and weight using a published mathematical equation. The Mosteller formula uses a square root. Du Bois and Du Bois, Haycock, and Gehan and George use different constants and mathematical powers, so the same measurements can produce slightly different results.
            </p>

            <CalculatorEquation
              title="Mosteller BSA formula"
              equation={bsaFormulaDefinitions.mosteller.equation}
              spokenEquation={bsaFormulaDefinitions.mosteller.spokenEquation}
              plainEnglish={bsaFormulaDefinitions.mosteller.plainEnglish}
              variables={[
                { symbol: "BSA", meaning: "body surface area in square metres (m²)" },
                { symbol: "height", meaning: "height in centimetres (cm)" },
                { symbol: "weight", meaning: "weight in kilograms (kg)" },
              ]}
              theme="body"
              id="mosteller-formula-summary"
              headingLevel="h3"
              className="mt-5"
            />
          </section>

          <CalculatorContentDisclosure
            id="all-bsa-formulas"
            title="All four BSA formulas explained"
            summary="See each equation, what its symbols mean, how it differs and the complete arithmetic for the same height and weight."
            theme="body"
          >
            <div className="space-y-5">
              {bsaFormulaOrder.map((formulaKey) => (
                <FormulaExplanation key={formulaKey} formulaKey={formulaKey} />
              ))}
            </div>
          </CalculatorContentDisclosure>

          <section id="why-bsa-results-differ" className="mb-8 rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6">
            <h2 className="text-2xl font-bold text-gray-950">Why can BSA calculations give different results?</h2>
            <p className="mt-3 text-sm leading-6 text-gray-700">
              The equations apply height and weight differently. They use different constants, powers and source datasets. Differences can also occur when height, weight or the final result is rounded at a different stage.
            </p>

            <div className="mt-5 overflow-hidden rounded-xl border border-gray-200 bg-white">
              <table className="w-full text-left text-sm">
                <caption className="border-b border-gray-200 bg-white px-4 py-3 text-left font-semibold text-gray-950">
                  Example comparison using 170 cm and 70 kg
                </caption>
                <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                  <tr>
                    <th scope="col" className="px-4 py-2 font-semibold">Formula</th>
                    <th scope="col" className="px-4 py-2 text-right font-semibold">Exact estimate</th>
                    <th scope="col" className="px-4 py-2 text-right font-semibold">Two decimals</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {comparisonRows.map((row) => (
                    <tr key={row.key}>
                      <th scope="row" className="px-4 py-3 font-medium text-gray-900">{row.name}</th>
                      <td className="px-4 py-3 text-right font-mono text-gray-700">{formatBsaNumber(row.result, 4)} m²</td>
                      <td className="px-4 py-3 text-right font-semibold text-emerald-800">{formatBsaNumber(row.result, 2)} m²</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-sm font-medium leading-6 text-gray-900">
              Use the formula specified by the medication protocol, clinical reference or local policy. Do not change formulas merely to obtain a preferred result.
            </p>
          </section>

          <section id="bsa-medication-calculation" className="mb-8">
            <h2 className="text-2xl font-bold text-gray-950">How is BSA used in medication calculations?</h2>
            <p className="mt-3 text-base leading-7 text-gray-700">
              When a prescribed amount is written as milligrams per square metre, multiply the prescribed amount by the patient's BSA.
            </p>

            <CalculatorEquation
              title="BSA-based medication calculation"
              equation="Total amount (mg) = prescribed amount (mg/m²) × BSA (m²)"
              spokenEquation="Total amount in milligrams equals the prescribed amount in milligrams per square metre multiplied by body surface area in square metres."
              plainEnglish="Multiply the medicine amount prescribed for each square metre by the patient's calculated body surface area."
              variables={[
                { symbol: "mg/m²", meaning: "milligrams prescribed for each square metre" },
                { symbol: "BSA", meaning: "the patient's calculated body surface area in m²" },
                { symbol: "mg", meaning: "the resulting total medicine amount before protocol-specific adjustments" },
              ]}
              theme="body"
              headingLevel="h3"
              className="mt-5"
            />

            <CalculatorWorking
              title="Worked arithmetic example"
              className="mt-4"
              lines={[
                "Prescribed amount = 100 mg/m²",
                "BSA = 1.82 m²",
                "Total amount = 100 mg/m² × 1.82 m²",
                "The m² units cancel, leaving mg",
                "Total amount = 182 mg",
              ]}
            />

            <p className="mt-4 rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-sm leading-6 text-yellow-950">
              This example demonstrates arithmetic only. It does not select a medicine, regimen, dose, dose cap, organ-function adjustment or final rounding method.
            </p>
          </section>

          <CalculatorContentDisclosure
            id="practice-questions"
            title="BSA practice questions with working"
            summary="Practise each formula and a simple mg/m² multiplication example."
            theme="body"
          >
            <div className="space-y-3">
              {practiceItems.map((item) => (
                <details key={item.title} className="rounded-xl border border-gray-200 bg-white p-4">
                  <summary className="cursor-pointer font-semibold text-gray-950">
                    {item.title}: {item.prompt}
                  </summary>
                  <div className="mt-4 space-y-3">
                    <CalculatorWorking lines={item.working} />
                    <p className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-950">
                      {item.answerLine}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </CalculatorContentDisclosure>

          <CalculatorContentDisclosure
            id="faqs"
            title="BSA meaning, formulas and result FAQ"
            summary="Direct answers to common body surface area searches and calculation questions."
            theme="body"
            className="mb-10"
          >
            <div className="space-y-3">
              {faqItems.map((item) => (
                <details key={item.question} className="rounded-xl border border-gray-200 bg-white p-4">
                  <summary className="cursor-pointer font-semibold text-gray-950">{item.question}</summary>
                  <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
                    <p className="font-medium text-gray-950">{item.quickAnswer}</p>
                    <ul className="list-disc space-y-1 pl-5">
                      {item.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </details>
              ))}
            </div>
          </CalculatorContentDisclosure>

          <RelatedCalculators
            theme="body"
            title="Related body-size and dosing calculators"
            description="Use these tools when body surface area connects to dosing weight, renal function, liquid dosing, or dilution calculations."
            items={getCalculatorNetworkItems("/calculator/body-composition/bsa")}
          />

          <CalculatorTrustBlock
            theme="body"
            author={{ name: "George Lambroglou", credentials: "RN", href: "/about" }}
            lastReviewed={{ iso: LAST_UPDATED_ISO, label: LAST_UPDATED_HUMAN }}
            note="This calculator estimates body surface area from height and weight. It does not select a medicine regimen, formula, dosing weight, dose cap or rounding rule."
            className="mb-10"
          />

          <details id="references" className="group mb-10 scroll-mt-24 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-xl font-bold text-gray-900 [&::-webkit-details-marker]:hidden">
              References and formula sources
              <span className="text-sm font-medium text-emerald-700 group-open:hidden">Show</span>
              <span className="hidden text-sm font-medium text-emerald-700 group-open:inline">Hide</span>
            </summary>
            <div className="space-y-8 border-t border-gray-200 p-5">
              {referenceGroups.map((group) => (
                <div key={group.heading}>
                  <h3 className="text-sm font-semibold text-gray-700">{group.heading}</h3>
                  <div className="mt-3 space-y-3">
                    {group.items.map((reference) => (
                      <a
                        key={reference.href}
                        href={reference.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-start justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50"
                      >
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-medium text-gray-900 transition group-hover:text-emerald-700">{reference.title}</p>
                            <span className="rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs text-gray-700">{reference.badge}</span>
                          </div>
                          <p className="mt-1 text-sm text-gray-600">{reference.organisation}</p>
                          <p className="mt-1 text-sm leading-6 text-gray-700">{reference.description}</p>
                        </div>
                        <ExternalLinkIcon />
                      </a>
                    ))}
                  </div>
                </div>
              ))}
              <p className="text-sm text-gray-600">
                References are provided for education and transparency. For clinical dosing, follow the medication order, regimen, local protocol and pharmacist or specialist guidance.
              </p>
            </div>
          </details>
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
