import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FAQAccordion } from "@/components/faq-accordion"
import { RelatedCalculators } from "@/components/related-calculators"
import { getCalculatorNetworkItems } from "@/lib/calculator-network"
import { CalculatorContentDisclosure, CalculatorEquation, CalculatorTrustBlock, SimpleFormulaAnswer } from "@/components/calculator"
import UnitsToMlClient from "./units-to-ml-client"

const CANONICAL = "https://www.medmaths.com/calculator/dose-calculations/units-to-ml"
const UPDATED_DATE_ISO = "2026-07-30"
const UPDATED_DATE_HUMAN = "30 July 2026"

export const metadata: Metadata = {
  title: "Units to mL Calculator | Dose Volume Conversion",
  description:
    "Convert units to mL or mL back to units using the exact units/mL concentration from the product label. Includes formulas, examples, and high-risk medicine safety checks.",
  keywords: [
    "units to mL calculator",
    "mL to units calculator",
    "convert units to mL",
    "units per mL calculator",
    "unit dose volume",
    "insulin units to mL",
    "heparin units to mL",
    "how many units in 1 mL",
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
    title: "Units to mL Calculator | Dose Volume Conversion",
    description:
      "Convert units and mL using the exact units/mL concentration from the product label, with formulas and high-risk medicine safety checks.",
    url: CANONICAL,
    siteName: "MedMaths",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary",
    title: "Units to mL Calculator | Dose Volume Conversion",
    description:
      "Convert units to mL or mL back to units using the exact product concentration, with clear formulas and safety checks.",
  },
}

const faqItems = [
  {
    question: "How do you convert units to mL?",
    quickAnswer: "Divide the ordered dose in units by the concentration in units/mL.",
    details: [
      "Formula: mL = units ÷ units/mL.",
      "Use the exact concentration printed on the product label.",
      "The calculator does not select a medicine, dose, route, or device.",
    ],
    microExample: "25 units ÷ 100 units/mL = 0.25 mL.",
  },
  {
    question: "How do you convert mL back to units?",
    quickAnswer: "Multiply the measured volume in mL by the concentration in units/mL.",
    details: [
      "Formula: units = mL × units/mL.",
      "This can check how many units are contained in a measured volume.",
      "The exact product concentration must still be known.",
    ],
    microExample: "0.25 mL × 100 units/mL = 25 units.",
  },
  {
    question: "What does units/mL mean?",
    quickAnswer: "Units/mL tells you how many units of the product are contained in each 1 mL.",
    details: [
      "Units are product-specific and are not interchangeable with milligrams.",
      "A higher units/mL concentration gives a smaller mL volume for the same unit dose.",
      "Use the unit system and concentration printed on the exact product label.",
    ],
    microExample: "5,000 units/mL means 1 mL contains 5,000 units.",
  },
  {
    question: "How many units are in 1 mL?",
    quickAnswer: "It depends entirely on the product concentration.",
    details: [
      "At 100 units/mL, 1 mL contains 100 units.",
      "At 5,000 units/mL, 1 mL contains 5,000 units.",
      "There is no universal units-to-mL conversion without the concentration.",
    ],
    microExample: "1 mL × 100 units/mL = 100 units.",
  },
  {
    question: "Can this calculator be used for insulin?",
    quickAnswer: "It can check arithmetic only when the prescribed units and exact insulin concentration are already known.",
    details: [
      "Confirm the insulin name, concentration, route, and prescribed delivery device.",
      "Do not use the mL result to program a pen or pump.",
      "The calculator deliberately does not display or select an insulin syringe scale.",
    ],
    microExample: "18 units at 100 units/mL: 18 ÷ 100 = 0.18 mL.",
  },
  {
    question: "Can this calculator be used for heparin?",
    quickAnswer: "It can check the units-to-volume arithmetic when the prescribed dose and exact units/mL concentration are known.",
    details: [
      "Heparin concentrations vary, so use the actual vial or syringe label.",
      "Measure the result with the route-appropriate mL-marked device required by local policy.",
      "Do not interpret heparin units as insulin-syringe markings.",
    ],
    microExample: "3,000 units ÷ 5,000 units/mL = 0.6 mL.",
  },
  {
    question: "Why must the product concentration be checked?",
    quickAnswer: "The same unit dose can produce a very different mL volume at another concentration.",
    details: [
      "Selecting the wrong concentration can produce a major calculation error.",
      "Example presets on this page are typing aids only, not product recommendations.",
      "The calculator requires confirmation when an example concentration is selected.",
    ],
    microExample: "20 ÷ 100 = 0.2 mL, while 20 ÷ 40 = 0.5 mL.",
  },
  {
    question: "Should I round the mL result?",
    quickAnswer: "Do not round automatically; use the exact result and the measuring precision authorised for the product and route.",
    details: [
      "The main result preserves small non-zero values instead of displaying them as zero.",
      "A mathematically rounded result is not automatically measurable or clinically acceptable.",
      "Recheck unusually small or large volumes and follow local high-risk medicine processes.",
    ],
    microExample: "An exact result of 0.025 mL remains visible rather than displaying as 0 mL.",
  },
  {
    question: "Can an insulin syringe be used for every medicine measured in units?",
    quickAnswer: "No. The device must match the medicine, concentration, route, and product instructions.",
    details: [
      "Insulin syringe markings are product-concentration specific and are not a universal unit scale.",
      "Other units-based medicines may require an mL-marked syringe or another product-specific device.",
      "This calculator does not choose or illustrate a syringe.",
    ],
    microExample: "A heparin concentration in units/mL must not be read as insulin-syringe units.",
  },
]

const commonExamples = [
  { label: "10 units at 100 units/mL", formula: "10 ÷ 100", answer: "0.1 mL" },
  { label: "20 units at 40 units/mL", formula: "20 ÷ 40", answer: "0.5 mL" },
  { label: "3,000 units at 5,000 units/mL", formula: "3,000 ÷ 5,000", answer: "0.6 mL" },
  { label: "750 units in 0.75 mL", formula: "0.75 × 1,000", answer: "750 units" },
]

const practiceQuestions = [
  {
    question: "A dose is ordered as 12 units. The concentration is 100 units/mL. What volume is required?",
    working: "mL = 12 ÷ 100 = 0.12 mL",
    answer: "0.12 mL",
  },
  {
    question: "A heparin dose is ordered as 2,500 units. The vial is 5,000 units/mL. What volume is required?",
    working: "mL = 2,500 ÷ 5,000 = 0.5 mL",
    answer: "0.5 mL",
  },
  {
    question: "A measured volume is 0.3 mL and the product contains 100 units/mL. How many units are present?",
    working: "units = 0.3 × 100 = 30 units",
    answer: "30 units",
  },
  {
    question: "A product contains 1,000 units/mL. How many units are in 0.75 mL?",
    working: "units = 0.75 × 1,000 = 750 units",
    answer: "750 units",
  },
]

export default function UnitsToMlPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://www.medmaths.com" },
    { name: "Calculators", url: "https://www.medmaths.com/calculators" },
    { name: "Dose Calculations", url: "https://www.medmaths.com/calculator/dose-calculations" },
    { name: "Units to mL", url: CANONICAL },
  ]

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: [item.quickAnswer, ...(item.details || []).map((d) => `• ${d}`)].join("\n"),
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: breadcrumbs.map((b, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: b.name,
              item: b.url,
            })),
          }),
        }}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Units to mL Calculator",
            description:
              "Convert a dose in units into mL, or convert mL back to units, using the concentration in units per mL.",
            applicationCategory: "MedicalApplication",
            operatingSystem: "Web",
            url: CANONICAL,
            author: {
              "@type": "Person",
              name: "George Lambroglou, RN",
              url: "https://www.medmaths.com/about",
            },
          }),
        }}
      />

      <SiteHeader />

      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-3xl px-4 pb-12 pt-4 sm:px-6 sm:py-12 lg:px-8 lg:pt-10">
          <nav className="mb-4 hidden text-sm text-gray-500 sm:block">
            <Link href="/" className="hover:text-gray-700">
              Home
            </Link>
            {" / "}
            <Link href="/calculators" className="hover:text-gray-700">
              Calculators
            </Link>
            {" / "}
            <Link href="/calculator/dose-calculations" className="hover:text-gray-700">
              Dose Calculations
            </Link>
            {" / "}
            <span className="text-gray-900">Units to mL</span>
          </nav>

          <h1 className="mb-2 text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Units to mL Calculator
          </h1>

          <section id="calculator" className="mb-8 scroll-mt-24">
            <UnitsToMlClient />
          </section>

          <SimpleFormulaAnswer
            id="simple-units-to-ml-answer"
            theme="dose"
            title="How do you convert units to mL?"
            lead={<>Divide the ordered dose in units by the medicine concentration in units/mL.</>}
            equation="Volume (mL) = Dose (units) ÷ Concentration (units/mL)"
            spokenEquation="Volume in millilitres equals dose in units divided by concentration in units per millilitre."
            example={<>3,000 units ÷ 5,000 units/mL = <strong>0.6 mL</strong></>}
            note={<>The concentration must come from the actual product label. For example, <strong>5,000 units/mL</strong> means that each 1 mL contains 5,000 units.</>}
            className="mb-8"
          />

          <section className="mb-8 grid gap-4 sm:grid-cols-2" aria-label="Units per mL meaning and result">
            <div className="rounded-2xl border border-cyan-200 bg-cyan-50/60 p-5">
              <h2 className="text-xl font-bold text-gray-950">What does units/mL mean?</h2>
              <p className="mt-2 text-sm leading-6 text-gray-700">
                <strong>Units/mL means units in each 1 mL.</strong> A concentration of 5,000 units/mL means 1 mL contains 5,000 units.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
              <h2 className="text-xl font-bold text-gray-950">What does this calculator do?</h2>
              <p className="mt-2 text-sm leading-6 text-gray-700">
                It tells you how many mL contain the ordered dose in units. A result of 0.6 mL means that dose is contained in 0.6 mL of that specific product concentration.
              </p>
            </div>
          </section>

          
          <CalculatorContentDisclosure
            id="learning-guide"
            theme="dose"
            title="Units-to-volume method, examples and safety guidance"
            summary="Review the formula, product-label checks, insulin and heparin safety boundaries, practice questions, and FAQs."
          >
          <section id="instructions" className="mb-12">
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">How to Use the Units to mL Calculator</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Use this calculator when a medicine dose is written in <strong>units</strong> and the product concentration is written as <strong>units per mL</strong>. This is common with insulin and heparin, but the same arithmetic applies to any medicine labelled this way.
              </p>
              <ol className="list-decimal space-y-3 pl-6">
                <li>Choose <strong>units → mL</strong> if you know the ordered units and need the volume to draw up.</li>
                <li>Choose <strong>mL → units</strong> if you know the volume and want to check how many units it contains.</li>
                <li>Enter the product concentration exactly as units/mL. For example, U-100 insulin is 100 units/mL.</li>
                <li>Read the working shown under the answer and check whether the result makes sense for the concentration used.</li>
              </ol>
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                <span className="font-semibold">Safety check:</span> Higher concentration means more units in each mL. For the same unit dose, a higher concentration should give a smaller mL volume.
              </div>
            </div>
          </section>

          <section id="formula" className="mb-12">
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">The units to mL formulas</h2>
            <div className="space-y-5">
              <CalculatorEquation
                id="units-to-ml-formula"
                theme="dose"
                title="Units to mL formula"
                equation="Volume (mL) = ordered dose (units) ÷ concentration (units/mL)"
                spokenEquation="Volume in millilitres equals the ordered dose in units divided by the concentration in units per millilitre."
                plainEnglish="Divide the dose in units by how many units are in 1 mL."
                variables={[
                  { symbol: "Dose", meaning: "the ordered amount in units" },
                  { symbol: "Concentration", meaning: "how many units are in 1 mL" },
                  { symbol: "Volume", meaning: "the answer in mL" },
                ]}
              />
              <CalculatorEquation
                id="ml-to-units-formula"
                theme="dose"
                title="mL to units formula"
                equation="Dose (units) = volume (mL) × concentration (units/mL)"
                spokenEquation="Dose in units equals volume in millilitres multiplied by concentration in units per millilitre."
                plainEnglish="Multiply the measured mL by how many units are in 1 mL."
                variables={[
                  { symbol: "Volume", meaning: "the measured liquid amount in mL" },
                  { symbol: "Concentration", meaning: "how many units are in 1 mL" },
                  { symbol: "Dose", meaning: "the calculated amount in units" },
                ]}
              />
            </div>
            <div className="mt-5 rounded-xl border border-cyan-200 bg-cyan-50 p-5 text-sm leading-6 text-gray-800">
              <h3 className="font-bold text-gray-950">Why concentration changes the volume</h3>
              <p className="mt-2">For the same ordered dose, a higher units/mL concentration gives a smaller mL volume because more units are contained in each millilitre.</p>
              <p className="mt-2 font-mono">20 units ÷ 100 units/mL = 0.2 mL</p>
              <p className="font-mono">20 units ÷ 40 units/mL = 0.5 mL</p>
            </div>
          </section>

          <section id="examples" className="mb-12">
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">Worked Examples</h2>

            <div className="space-y-8">
              <div>
                <div className="mb-4 rounded-lg border-l-4 border-cyan-500 bg-amber-50 p-4">
                  <p className="font-semibold text-gray-900">Example 1: U-100 insulin. Ordered dose: 25 units. What volume is required?</p>
                </div>
                <div className="mb-3 rounded-lg bg-gray-50 p-4 text-center font-mono text-sm text-gray-700">mL = 25 units ÷ 100 units/mL</div>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><span className="font-semibold">Step 1:</span> Dose = 25 units.</p>
                  <p><span className="font-semibold">Step 2:</span> U-100 insulin = 100 units/mL.</p>
                  <p><span className="font-semibold">Step 3:</span> 25 ÷ 100 = 0.25 mL.</p>
                </div>
                <div className="mt-3 rounded-lg bg-cyan-50 p-3 text-center text-sm font-semibold text-gray-900">Answer: 0.25 mL</div>
              </div>

              <div>
                <div className="mb-4 rounded-lg border-l-4 border-cyan-500 bg-amber-50 p-4">
                  <p className="font-semibold text-gray-900">Example 2: Heparin 5,000 units/mL. Ordered dose: 3,000 units. What volume is required?</p>
                </div>
                <div className="mb-3 rounded-lg bg-gray-50 p-4 text-center font-mono text-sm text-gray-700">mL = 3,000 units ÷ 5,000 units/mL</div>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><span className="font-semibold">Step 1:</span> Dose = 3,000 units.</p>
                  <p><span className="font-semibold">Step 2:</span> Concentration = 5,000 units/mL.</p>
                  <p><span className="font-semibold">Step 3:</span> 3,000 ÷ 5,000 = 0.6 mL.</p>
                </div>
                <div className="mt-3 rounded-lg bg-cyan-50 p-3 text-center text-sm font-semibold text-gray-900">Answer: 0.6 mL</div>
              </div>

              <div>
                <div className="mb-4 rounded-lg border-l-4 border-cyan-500 bg-amber-50 p-4">
                  <p className="font-semibold text-gray-900">Example 3: A volume of 0.2 mL is drawn from a U-100 insulin product. How many units is this?</p>
                </div>
                <div className="mb-3 rounded-lg bg-gray-50 p-4 text-center font-mono text-sm text-gray-700">units = 0.2 mL × 100 units/mL</div>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><span className="font-semibold">Step 1:</span> Volume = 0.2 mL.</p>
                  <p><span className="font-semibold">Step 2:</span> Concentration = 100 units/mL.</p>
                  <p><span className="font-semibold">Step 3:</span> 0.2 × 100 = 20 units.</p>
                </div>
                <div className="mt-3 rounded-lg bg-cyan-50 p-3 text-center text-sm font-semibold text-gray-900">Answer: 20 units</div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">Common Units to mL Examples</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {commonExamples.map((example) => (
                <div key={example.label} className="rounded-lg border border-gray-200 bg-white p-4">
                  <p className="font-semibold text-gray-900">{example.label}</p>
                  <p className="mt-1 font-mono text-xs text-gray-600">{example.formula}</p>
                  <p className="mt-2 text-sm font-semibold text-cyan-700">{example.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12 rounded-lg border border-yellow-200 bg-yellow-50 p-6">
            <h2 className="mb-3 text-xl font-bold text-gray-900">Important Safety Notes</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm text-gray-800">
              <li>This calculator does not recommend insulin, heparin, or any other dose.</li>
              <li>Use the concentration from the actual product label, not from memory.</li>
              <li>Do not treat units/mL as the same thing as mg/mL.</li>
              <li>This calculator does not select or illustrate a syringe, pen, pump, or preparation device.</li>
              <li>Follow local high-risk medicine and independent-check processes for insulin, heparin, and other units-based medicines.</li>
            </ul>
          </section>

          <section id="practice" className="mb-12">
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">Practice Questions</h2>
            <div className="space-y-4">
              {practiceQuestions.map((item, index) => (
                <details key={item.question} className="rounded-lg border border-gray-200 bg-white p-4">
                  <summary className="cursor-pointer font-semibold text-gray-900">
                    Question {index + 1}: {item.question}
                  </summary>
                  <div className="mt-3 space-y-2 text-sm text-gray-700">
                    <p className="font-mono">{item.working}</p>
                    <p className="font-semibold text-cyan-700">Answer: {item.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>

          <section id="faqs" className="mb-12">
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <FAQAccordion items={faqItems} />
          </section>
          </CalculatorContentDisclosure>

          <RelatedCalculators
            theme="dose"
            title="Related unit and volume calculators"
            description="Use these tools when a unit-based dose needs to be checked against concentration, dilution, or another dosage form."
            items={getCalculatorNetworkItems("/calculator/dose-calculations/units-to-ml")}
          />

          <CalculatorTrustBlock
            theme="dose"
            author={{ name: "George Lambroglou", credentials: "RN", href: "/about" }}
            lastReviewed={{ iso: UPDATED_DATE_ISO, label: UPDATED_DATE_HUMAN }}
            note={
              <>
                Formula and worked examples checked against the references listed below. MedMaths supports calculation checking and does not replace the medication order, product information, matched delivery device, local high-risk medicine procedures, pharmacy guidance, or clinical judgement.
              </>
            }
            className="mb-12"
          />

          <CalculatorContentDisclosure
            id="references"
            theme="dose"
            title="References and sources"
            summary="Open the formula, educational, and safety sources used for this calculator."
            className="mb-12"
          >
<section className="mb-12">
<p className="mb-8 text-center text-sm text-gray-600">
              References support concentration-based dose-volume calculations and high-risk medicine safety principles.
            </p>

            <div className="space-y-3">
              <div className="rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md">
                <a href="https://learninglab.rmit.edu.au/nursing/finding-volume-required/" target="_blank" rel="noopener noreferrer" className="flex items-start justify-between gap-4 group">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 group-hover:text-cyan-600">Finding the volume required <span className="ml-2 rounded bg-gray-100 px-2 py-1 text-xs">Web</span></p>
                    <p className="mt-1 text-sm text-gray-600">RMIT Learning Lab</p>
                    <p className="mt-2 text-xs text-gray-500">Supports dose, stock strength, and volume calculation logic.</p>
                  </div>
                  <span className="mt-1 text-lg text-gray-400 group-hover:text-cyan-600">↗</span>
                </a>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md">
                <a href="https://www.safetyandquality.gov.au/clinical-topics/medicines-safety-and-quality/high-risk-medicines-and-systems" target="_blank" rel="noopener noreferrer" className="flex items-start justify-between gap-4 group">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 group-hover:text-cyan-600">High risk medicines and systems <span className="ml-2 rounded bg-gray-100 px-2 py-1 text-xs">Web</span></p>
                    <p className="mt-1 text-sm text-gray-600">Australian Commission on Safety and Quality in Health Care</p>
                    <p className="mt-2 text-xs text-gray-500">Explains APINCHS high-risk medicine groups, including insulin and heparin/anticoagulants.</p>
                  </div>
                  <span className="mt-1 text-lg text-gray-400 group-hover:text-cyan-600">↗</span>
                </a>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md">
                <a href="https://www.ismp.org/sites/default/files/attachments/2018-08/highAlert2018-Acute-Final.pdf" target="_blank" rel="noopener noreferrer" className="flex items-start justify-between gap-4 group">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 group-hover:text-cyan-600">ISMP List of High-Alert Medications in Acute Care Settings <span className="ml-2 rounded bg-gray-100 px-2 py-1 text-xs">PDF</span></p>
                    <p className="mt-1 text-sm text-gray-600">Institute for Safe Medication Practices</p>
                    <p className="mt-2 text-xs text-gray-500">Lists insulin and heparin as high-alert medicines requiring added caution.</p>
                  </div>
                  <span className="mt-1 text-lg text-gray-400 group-hover:text-cyan-600">↗</span>
                </a>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md">
                <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC5687105/" target="_blank" rel="noopener noreferrer" className="flex items-start justify-between gap-4 group">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 group-hover:text-cyan-600">Clinical Challenges With Concentrated Insulins <span className="ml-2 rounded bg-gray-100 px-2 py-1 text-xs">Web</span></p>
                    <p className="mt-1 text-sm text-gray-600">Clinical Diabetes / PubMed Central</p>
                    <p className="mt-2 text-xs text-gray-500">Explains insulin concentration wording such as U-100, U-200, U-300, and U-500.</p>
                  </div>
                  <span className="mt-1 text-lg text-gray-400 group-hover:text-cyan-600">↗</span>
                </a>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md">
                <a href="https://www.fda.gov/regulatory-information/search-fda-guidance-documents/guidance-content-premarket-notification-510k-submissions-piston-syringes" target="_blank" rel="noopener noreferrer" className="flex items-start justify-between gap-4 group">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 group-hover:text-cyan-600">Guidance for piston and insulin syringe labelling <span className="ml-2 rounded bg-gray-100 px-2 py-1 text-xs">Web</span></p>
                    <p className="mt-1 text-sm text-gray-600">US Food and Drug Administration</p>
                    <p className="mt-2 text-xs text-gray-500">Explains that insulin syringes use insulin-unit scales and concentration-specific labelling rather than a universal units scale.</p>
                  </div>
                  <span className="mt-1 text-lg text-gray-400 group-hover:text-cyan-600">↗</span>
                </a>
              </div>
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
              <strong>Clinical Disclaimer:</strong> Always verify product labelling and local protocols before preparing or administering medications. This calculator is for educational checking only and does not recommend a dose.
            </p>
          </section>
          </CalculatorContentDisclosure>

          
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
