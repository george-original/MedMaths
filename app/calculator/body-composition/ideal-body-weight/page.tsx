// app/calculator/body-composition/ideal-body-weight/page.tsx
import type { Metadata } from "next"
import Link from "next/link"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RelatedCalculators } from "@/components/related-calculators"
import { getCalculatorNetworkItems } from "@/lib/calculator-network"
import { CalculatorEquation, CalculatorTrustBlock } from "@/components/calculator"

import {
  buildDevineWorking,
  calculateDevineValue,
  devineFormulaDefinitions,
  formatDevineNumber,
} from "@/lib/ideal-body-weight-formulas"

import IdealBodyWeightClient from "./ideal-body-weight-client"

const CANONICAL = "https://www.medmaths.com/calculator/body-composition/ideal-body-weight"
const UPDATED_DATE_ISO = "2026-07-30"
const UPDATED_DATE_HUMAN = "30 Jul 2026"

export const metadata: Metadata = {
  title: "Clinical Ideal Body Weight Calculator | Devine IBW",
  description:
    "Calculate adult Devine ideal body weight (IBW) from height in cm or feet and inches. Clinical reference weight only—not a healthy target or dosing decision.",
  keywords: [
    "clinical ideal body weight calculator",
    "ideal body weight calculator",
    "IBW calculator",
    "Devine formula calculator",
    "Devine formula in kg",
    "male Devine formula",
    "female Devine formula",
    "ideal body weight formula in cm",
    "ideal body weight for medication dosing",
    "adult IBW calculator",
  ],
  authors: [{ name: "George Lambroglou, RN", url: "https://www.medmaths.com/about" }],
  creator: "George Lambroglou, RN",
  publisher: "MedMaths",
  alternates: { canonical: "https://www.medmaths.com/calculator/body-composition/ideal-body-weight" },
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
    title: "Clinical Ideal Body Weight Calculator | Devine IBW",
    description:
      "Calculate adult Devine ideal body weight (IBW) from height in cm or feet and inches. Clinical reference weight only—not a healthy target or dosing decision.",
    url: "https://www.medmaths.com/calculator/body-composition/ideal-body-weight",
    siteName: "MedMaths",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary",
    title: "Clinical Ideal Body Weight Calculator | Devine IBW",
    description:
      "Calculate adult Devine ideal body weight (IBW) from height in cm or feet and inches. Clinical reference weight only—not a healthy target or dosing decision.",
  },
}

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Calculators", href: "/calculators" },
  { name: "Body Composition", href: "/calculator/body-composition" },
  { name: "Ideal Body Weight (IBW)", href: "/calculator/body-composition/ideal-body-weight" },
]

const faqItems = [
  {
    question: "What does IBW mean, and what does the result represent?",
    quickAnswer:
      "IBW means ideal body weight. Here it is the adult reference weight returned by the selected Devine equation from height and sex.",
    details: [
      "The result is reported in kilograms.",
      "It is not measured body weight, a healthy-weight target, or a direct body-composition measurement.",
      "Use it only when the medication reference or clinical protocol specifically requires Devine IBW.",
    ],
    microExample: "A 175 cm male adult has a Devine IBW of about 70.5 kg.",
  },
  {
    question: "Which ideal body weight formula does this calculator use?",
    quickAnswer:
      "It uses the adult male and female Devine equations: a base weight at 5 feet plus 2.3 kg for each inch above 5 feet.",
    details: [
      "Male: 50 + 2.3 × (height in inches − 60).",
      "Female: 45.5 + 2.3 × (height in inches − 60).",
      "The male and female equations differ by their 5-foot base weight.",
    ],
    microExample: "Male 5 ft 10 in: 50 + 2.3×10 = 73 kg.",
  },
  {
    question: "Can I calculate Devine IBW using centimetres or feet and inches?",
    quickAnswer:
      "Yes. The calculator accepts either system and converts centimetres to inches using 1 inch = 2.54 cm before applying Devine.",
    details: [
      "The measurement-system switch converts a valid entered height.",
      "The formula is then applied using the full, unrounded height conversion.",
      "The step-by-step working shows the conversion used.",
    ],
    microExample: "175 cm ÷ 2.54 = 68.8976 inches before the Devine equation is applied.",
  },
  {
    question: "Why can two IBW calculators give different results?",
    quickAnswer:
      "They may use a different equation or round height at a different stage.",
    details: [
      "Devine, Robinson, Miller, and Hamwi are different equations and are not interchangeable.",
      "Rounding centimetres-to-inches before the final step can slightly change the result.",
      "Use the named method required by the relevant clinical reference.",
    ],
    microExample: "Rounding 68.8976 inches to 69 inches before calculating changes the displayed result slightly.",
  },
  {
    question: "When should ideal body weight be used for medication calculations?",
    quickAnswer:
      "Only when the medicine information, prescription, pharmacist, or local protocol specifies ideal body weight or the Devine method.",
    details: [
      "Many medicines use actual body weight instead.",
      "Some medicine-specific protocols use adjusted body weight.",
      "This calculator does not select the correct body-weight measure for a medicine.",
    ],
    microExample: "Do not replace a prescribed actual-weight calculation with IBW simply because IBW is available.",
  },
  {
    question: "Why does this calculator stop below 5 feet (152.4 cm)?",
    quickAnswer:
      "The Devine equations use 5 feet as their reference point, and this clinical calculator does not extrapolate them below that height.",
    details: [
      "Some clinical tools and protocols restrict Devine IBW to people at least 60 inches tall.",
      "Short-stature policies can differ between organisations and calculations.",
      "Use the method explicitly specified by the applicable protocol.",
    ],
    microExample: "A height of 150 cm is below this calculator's supported Devine range.",
  },
  {
    question: "Is Devine IBW the same as actual, adjusted, or predicted body weight?",
    quickAnswer:
      "No. These are separate body-weight measures and may use different inputs and equations.",
    details: [
      "Actual body weight is measured on a scale.",
      "Adjusted body weight is a separate medicine-specific calculation that uses actual weight and IBW.",
      "Ventilation predicted body weight uses a protocol-specific PBW equation and is not calculated here.",
    ],
    microExample: "A Devine IBW result should not be copied into a ventilation PBW field unless the protocol explicitly says to do so.",
  },
  {
    question: "Can this adult Devine calculator be used for children?",
    quickAnswer:
      "No. It is an adult clinical IBW calculator and is not a paediatric growth or dosing tool.",
    details: [
      "Children and adolescents require age- and growth-specific methods.",
      "Do not substitute adult Devine IBW for a paediatric dosing policy.",
      "Follow the prescription, product information, and local paediatric protocol.",
    ],
    microExample: "A paediatric mg/kg order normally begins with the prescribed paediatric weight method, not adult Devine IBW.",
  },
]

const practiceQuestions = [
  {
    q: "Practice 1: Male, height 175 cm. What is Devine IBW to 1 decimal place?",
    steps: [
      "Convert height: 175 ÷ 2.54 = 68.8976 inches",
      "Inches above 5 feet: 68.8976 − 60 = 8.8976",
      "IBW: 50 + 2.3 × 8.8976 = 70.4646",
      "Displayed to 1 decimal place: 70.5 kg",
    ],
    answer: "70.5 kg",
  },
  {
    q: "Practice 2: Female, height 160 cm. What is Devine IBW to 1 decimal place?",
    steps: [
      "Convert height: 160 ÷ 2.54 = 62.9921 inches",
      "Inches above 5 feet: 62.9921 − 60 = 2.9921",
      "IBW: 45.5 + 2.3 × 2.9921 = 52.3819",
      "Displayed to 1 decimal place: 52.4 kg",
    ],
    answer: "52.4 kg",
  },
  {
    q: "Practice 3: Male, height 5 feet 10 inches. What is Devine IBW?",
    steps: [
      "Total height: 5 feet 10 inches = 70 inches",
      "Inches above 5 feet: 70 − 60 = 10",
      "IBW: 50 + 2.3 × 10 = 73",
    ],
    answer: "73 kg",
  },
]

const maleWorkedExample = {
  heightCm: 175,
  exact: calculateDevineValue(175, "male"),
  working: buildDevineWorking(175, "male"),
}

const femaleWorkedExample = {
  heightCm: 160,
  exact: calculateDevineValue(160, "female"),
  working: buildDevineWorking(160, "female"),
}

const commonExamples = [
  { label: "Male 170 cm", working: "170 ÷ 2.54 = 66.93 in; 50 + 2.3×6.93", answer: "65.9 kg" },
  { label: "Male 180 cm", working: "180 ÷ 2.54 = 70.87 in; 50 + 2.3×10.87", answer: "75.0 kg" },
  { label: "Female 155 cm", working: "155 ÷ 2.54 = 61.02 in; 45.5 + 2.3×1.02", answer: "47.9 kg" },
  { label: "Female 165 cm", working: "165 ÷ 2.54 = 64.96 in; 45.5 + 2.3×4.96", answer: "56.9 kg" },
]

function jsonLdBreadcrumbList() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((b, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: b.name,
      item: `https://www.medmaths.com${b.href}`,
    })),
  }
}

function jsonLdFAQPage() {
  // For schema safety: keep answers short and consistent
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.quickAnswer },
    })),
  }
}

function jsonLdWebApplication() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Clinical Ideal Body Weight Calculator – Devine IBW",
    description:
      "Calculate adult clinical ideal body weight in kilograms using the male or female Devine equation, with metric or imperial height entry and transparent working.",
    url: CANONICAL,
    applicationCategory: "MedicalApplication",
    operatingSystem: "All",
    author: {
      "@type": "Person",
      name: "George Lambroglou",
      jobTitle: "Registered Nurse",
    },
  }
}

function jsonLdMedicalWebPage() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Clinical Ideal Body Weight Calculator – Devine IBW",
    url: CANONICAL,
    dateModified: UPDATED_DATE_ISO,
    about: [{ "@type": "MedicalEntity", name: "Ideal body weight" }],
    author: { "@type": "Person", name: "George Lambroglou", jobTitle: "Registered Nurse" },
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
  org: string
  description: string
  href: string
}

const referenceGroups: Array<{ heading: string; items: RefItem[] }> = [
  {
    heading: "Formula and historical context",
    items: [
      {
        title: "Pai MP, Paloucek FP — The origin of the ideal body weight equations",
        badge: "PubMed",
        org: "Ann Pharmacother (2000)",
        description: "Historical review of common ideal body weight equations and their clinical origins.",
        href: "https://pubmed.ncbi.nlm.nih.gov/10981254/",
      },
      {
        title: "Chichester & Holmes — Ideal body weight: a commentary",
        badge: "PMC",
        org: "Clin Nutr ESPEN (2021)",
        description: "Clinical commentary summarising commonly used IBW equations, including Devine.",
        href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8646317/",
      },
      {
        title: "eviQ Body Surface Area Calculator — IBW and adjusted-weight formulas",
        badge: "Clinical",
        org: "Cancer Institute NSW",
        description: "Australian clinical calculator documenting Devine IBW and a lower-height calculation limit.",
        href: "https://www.eviq.org.au/clinical-resources/eviq-calculators/3198-body-surface-area-calculator",
      },
    ],
  },
  {
    heading: "Important scope distinction",
    items: [
      {
        title: "Low-Tidal-Volume Ventilation facilitator guide",
        badge: "Government",
        org: "Agency for Healthcare Research and Quality",
        description: "Explains that ventilation predicted body weight is a protocol-specific measure and is not ideal or actual body weight.",
        href: "https://www.ahrq.gov/hai/tools/mvp/modules/technical/ltvv-intro-fac-guide.html",
      },
    ],
  },
]

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbList()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQPage()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebApplication()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdMedicalWebPage()) }} />

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
            Clinical Ideal Body Weight (IBW) Calculator
          </h1>

          <section id="calculator" className="mb-8 scroll-mt-24">
            <IdealBodyWeightClient />
          </section>

          <section id="ibw-meaning" className="mb-8 grid gap-4 sm:grid-cols-2">
            <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6">
              <h2 className="text-xl font-bold text-gray-950">What this calculator returns</h2>
              <p className="mt-2 text-sm leading-6 text-gray-700">
                <strong>IBW means ideal body weight.</strong> This page returns the adult clinical reference weight produced by the selected male or female Devine equation from height.
              </p>
            </article>
            <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-xl font-bold text-gray-950">What it does not return</h2>
              <p className="mt-2 text-sm leading-6 text-gray-700">
                It does not calculate a healthy target weight, adjusted body weight, measured actual weight, or ventilation predicted body weight. Those are separate clinical or consumer calculations.
              </p>
            </article>
          </section>

          <section className="mb-8 rounded-2xl border border-yellow-200 bg-yellow-50 p-5 sm:p-6">
            <h2 className="text-xl font-bold text-yellow-950">Clinical interpretation</h2>
            <p className="mt-2 text-sm leading-6 text-yellow-950">
              A result such as 70.5 kg means only that the selected Devine equation returned 70.5 kg for the entered adult height. Use that number only when the medication reference or protocol specifically requires Devine IBW.
            </p>
          </section>

          <section id="formula" className="mb-10">
            <div className="mb-5">
              <h2 className="text-2xl font-bold text-gray-900">How is ideal body weight calculated?</h2>
              <p className="mt-2 text-sm leading-6 text-gray-700">
                Height in centimetres is divided by 2.54 to convert it to inches. For adults at least 5 feet tall, the equation subtracts 60 inches, multiplies the inches above 5 feet by 2.3 kg, and adds the selected base weight.
              </p>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <CalculatorEquation
                id="male-devine-formula"
                title={devineFormulaDefinitions.male.heading}
                equation={devineFormulaDefinitions.male.equation}
                spokenEquation={devineFormulaDefinitions.male.spokenEquation}
                plainEnglish={devineFormulaDefinitions.male.plainEnglish}
                variables={[
                  { symbol: "IBW", meaning: "ideal body weight in kilograms" },
                  { symbol: "height", meaning: "height in inches; divide centimetres by 2.54 first" },
                  { symbol: "60", meaning: "60 inches, equal to 5 feet" },
                ]}
                theme="body"
                headingLevel="h3"
              />
              <CalculatorEquation
                id="female-devine-formula"
                title={devineFormulaDefinitions.female.heading}
                equation={devineFormulaDefinitions.female.equation}
                spokenEquation={devineFormulaDefinitions.female.spokenEquation}
                plainEnglish={devineFormulaDefinitions.female.plainEnglish}
                variables={[
                  { symbol: "IBW", meaning: "ideal body weight in kilograms" },
                  { symbol: "height", meaning: "height in inches; divide centimetres by 2.54 first" },
                  { symbol: "60", meaning: "60 inches, equal to 5 feet" },
                ]}
                theme="body"
                headingLevel="h3"
              />
            </div>
            <p className="mt-4 text-sm leading-6 text-gray-600">
              Both equations use 2.3 kg for each inch above 5 feet. The male base is 50 kg and the female base is 45.5 kg, so the same height produces results that differ by 4.5 kg. Other IBW equations use different constants and can return different estimates.
            </p>
          </section>

          <section id="examples" className="mb-10">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Devine formula worked examples</h2>
            <div className="grid gap-4 lg:grid-cols-2">
              {[
                { title: "Male example: 175 cm", example: maleWorkedExample },
                { title: "Female example: 160 cm", example: femaleWorkedExample },
              ].map(({ title, example }) => (
                <article key={title} className="space-y-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                  <h3 className="font-semibold text-gray-950">{title}</h3>
                  <div className="rounded-xl bg-white p-4 font-mono text-xs leading-6 text-gray-700 sm:text-sm">
                    {example.working.map((line) => <div key={line}>{line}</div>)}
                  </div>
                  <div className="rounded-xl border border-emerald-200 bg-white p-3 text-sm font-semibold text-emerald-900">
                    Exact result: {formatDevineNumber(example.exact, 4)} kg. Displayed to one decimal place: {formatDevineNumber(example.exact, 1)} kg.
                  </div>
                </article>
              ))}
            </div>
          </section>

          <details className="group mb-6 overflow-hidden rounded-2xl border border-emerald-200 bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-gray-900 [&::-webkit-details-marker]:hidden">
              Common ideal body weight examples
              <span className="text-sm font-medium text-emerald-700 group-open:hidden">Show</span>
              <span className="hidden text-sm font-medium text-emerald-700 group-open:inline">Hide</span>
            </summary>
            <div className="border-t border-emerald-200 p-5">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {commonExamples.map((example) => (
                  <div key={example.label} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <p className="text-sm font-semibold text-gray-900">{example.label}</p>
                    <p className="mt-1 text-xs leading-5 text-gray-600">{example.working}</p>
                    <p className="mt-2 text-lg font-bold text-emerald-700">{example.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </details>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Which body-weight measure does this page calculate?</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
                <h3 className="font-semibold text-gray-900">Devine IBW</h3>
                <p className="mt-2 text-sm leading-6 text-gray-700">This is the only body-weight measure calculated on this page. Use it when the clinical reference explicitly requires Devine ideal body weight.</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="font-semibold text-gray-900">Actual or adjusted weight</h3>
                <p className="mt-2 text-sm leading-6 text-gray-700">Actual weight is measured. Adjusted weight is a separate formula that uses actual weight and IBW. Neither is calculated here.</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="font-semibold text-gray-900">Ventilation PBW</h3>
                <p className="mt-2 text-sm leading-6 text-gray-700">Predicted body weight for ventilation is a separate protocol-specific calculation. Do not substitute Devine IBW automatically.</p>
              </div>
            </div>
          </section>

          <details id="practice" className="group mb-6 scroll-mt-24 overflow-hidden rounded-2xl border border-emerald-200 bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-gray-900 [&::-webkit-details-marker]:hidden">
              Practice questions with working
              <span className="text-sm font-medium text-emerald-700 group-open:hidden">Show</span>
              <span className="hidden text-sm font-medium text-emerald-700 group-open:inline">Hide</span>
            </summary>
            <div className="space-y-3 border-t border-emerald-200 p-5">
              {practiceQuestions.map((item) => (
                <details key={item.q} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <summary className="cursor-pointer font-semibold text-gray-900">{item.q}</summary>
                  <div className="mt-4 space-y-3">
                    <div className="rounded-lg border border-gray-200 bg-white p-4 font-mono text-sm text-gray-700">
                      {item.steps.map((step) => (
                        <div key={step}>{step}</div>
                      ))}
                    </div>
                    <p className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-900">
                      Answer: {item.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </details>

          <details id="faqs" className="group mb-10 scroll-mt-24 overflow-hidden rounded-2xl border border-emerald-200 bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-gray-900 [&::-webkit-details-marker]:hidden">
              Ideal body weight FAQ
              <span className="text-sm font-medium text-emerald-700 group-open:hidden">Show</span>
              <span className="hidden text-sm font-medium text-emerald-700 group-open:inline">Hide</span>
            </summary>
            <div className="space-y-3 border-t border-emerald-200 p-5">
              {faqItems.map((item) => (
                <details key={item.question} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <summary className="cursor-pointer font-semibold text-gray-900">{item.question}</summary>
                  <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
                    <p className="font-medium text-gray-900">{item.quickAnswer}</p>
                    {item.details.length > 0 && (
                      <ul className="list-disc space-y-1 pl-5">
                        {item.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
                    )}
                    {item.microExample && <p className="rounded-lg bg-white p-3 font-mono text-xs text-gray-600">{item.microExample}</p>}
                  </div>
                </details>
              ))}
            </div>
          </details>

          <RelatedCalculators
            theme="body"
            title="Related dosing weight calculators"
            description="Use these calculators when ideal body weight connects to BSA, renal dosing, or weight-based medication maths."
            items={getCalculatorNetworkItems("/calculator/body-composition/ideal-body-weight")}
          />

          <CalculatorTrustBlock
            theme="body"
            author={{ name: "George Lambroglou", credentials: "RN", href: "/about" }}
            lastReviewed={{ iso: UPDATED_DATE_ISO, label: UPDATED_DATE_HUMAN }}
            note="This calculator estimates adult Devine ideal body weight only for heights of at least 5 feet. It does not choose a medication dosing weight or calculate adjusted weight or ventilation predicted body weight."
            className="mb-10"
          />

          <details id="references" className="group mb-10 scroll-mt-24 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-xl font-bold text-gray-900 [&::-webkit-details-marker]:hidden">
              References and sources
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
                          <p className="mt-1 text-sm text-gray-600">{reference.org}</p>
                          <p className="mt-1 text-sm leading-6 text-gray-700">{reference.description}</p>
                        </div>
                        <ExternalLinkIcon />
                      </a>
                    ))}
                  </div>
                </div>
              ))}
              <p className="text-sm text-gray-600">References are provided for education. Follow the medication reference, pharmacist guidance, and local clinical protocol.</p>
            </div>
          </details>
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
