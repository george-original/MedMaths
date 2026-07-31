import type { Metadata } from "next"
// app/calculator/dose-calculations/mgkg-to-ml-dose/page.tsx
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FAQAccordion } from "@/components/faq-accordion"
import { RelatedCalculators } from "@/components/related-calculators"
import { getCalculatorNetworkItems } from "@/lib/calculator-network"
import { CalculatorContentDisclosure, CalculatorTrustBlock } from "@/components/calculator"
import MgKgToMlDoseClient from "./mgkg-to-ml-dose-client"

const UPDATED_DATE_ISO = "2026-07-30"
const UPDATED_DATE_HUMAN = "30 July 2026"

export const metadata: Metadata = {
  title: "mg/kg to mL Calculator | Per Dose or Per Day",
  description: "Calculate mg/kg to total mg and mL using kg or lb. Supports mg/kg per dose and mg/kg/day with divided doses, plus mg/mL or mg per X mL labels.",
  keywords: ["mg/kg to mL calculator", "mg per kg to ml calculator", "weight based dose calculator", "paediatric dose calculator", "pediatric dose calculator", "liquid medicine dose calculator", "mg/kg dose formula", "mg/kg to mL formula", "mg/kg per dose", "mg/kg/day", "dose volume", "oral syringe calculation"],
  authors: [{ name: "George Lambroglou, RN", url: "https://www.medmaths.com/about" }],
  creator: "George Lambroglou, RN",
  publisher: "MedMaths",
  alternates: { canonical: "https://www.medmaths.com/calculator/dose-calculations/mgkg-to-ml-dose" },
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
    title: "mg/kg to mL Calculator | Per Dose or Per Day",
    description: "Calculate mg/kg to total mg and mL using kg or lb. Supports mg/kg per dose and mg/kg/day with divided doses, plus mg/mL or mg per X mL labels.",
    url: "https://www.medmaths.com/calculator/dose-calculations/mgkg-to-ml-dose",
    siteName: "MedMaths",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary",
    title: "mg/kg to mL Calculator | Per Dose or Per Day",
    description: "Calculate mg/kg to total mg and mL using kg or lb. Supports mg/kg per dose and mg/kg/day with divided doses, plus mg/mL or mg per X mL labels.",
  },
}

export default function MgKgToMlDosePage() {
  const faqItems = [
    {
      question: "What does mg/kg mean?",
      quickAnswer: "mg/kg means milligrams of medicine for each kilogram of the medication weight.",
      details: [
        "For an order written per dose, multiply mg/kg by weight in kg to calculate mg for one administration.",
        "For an order written per day, multiply mg/kg/day by weight in kg to calculate the total daily mg before dividing it into the prescribed number of doses.",
      ],
      microExample: "10 mg/kg × 20 kg = 200 mg per dose",
    },
    {
      question: "What is the difference between mg/kg per dose and mg/kg/day?",
      quickAnswer: "Per-dose orders calculate one administration directly; per-day orders calculate a daily total that must be divided by the prescribed number of doses.",
      details: [
        "Do not treat mg/kg/day as though it were mg/kg per dose.",
        "Use the mode that matches the medication order exactly.",
      ],
      microExample: "20 mg/kg/day in 4 doses = 5 mg/kg per dose",
    },
    {
      question: "How do I convert mg/kg to mL?",
      quickAnswer: "Calculate mg per dose, then divide by the medicine concentration in mg/mL.",
      details: [
        "Per dose: mg per dose = mg/kg × weight in kg.",
        "Per day: daily mg = mg/kg/day × weight in kg, then daily mg ÷ doses per day = mg per dose.",
        "Finally: mL per dose = mg per dose ÷ mg/mL.",
      ],
      microExample: "(10 mg/kg × 20 kg) ÷ 50 mg/mL = 4 mL",
    },
    {
      question: "Can I enter weight in pounds?",
      quickAnswer: "Yes. The calculator converts pounds to kilograms before applying the mg/kg formula.",
      details: [
        "The exact conversion used is 1 lb = 0.45359237 kg.",
        "The converted kilogram value is shown in the result working.",
        "Use the medication weight required by the order or clinical reference.",
      ],
      microExample: "44 lb × 0.45359237 = 19.96 kg",
    },
    {
      question: "What if the label says mg per 5 mL?",
      quickAnswer: "Enter the label amount and volume, and the calculator converts them to mg/mL.",
      details: [
        "Example label: 250 mg in 5 mL.",
        "Concentration = 250 ÷ 5 = 50 mg/mL.",
      ],
      microExample: "125 mg/5 mL = 25 mg/mL",
    },
    {
      question: "How are divided daily doses calculated?",
      quickAnswer: "The total daily mg is divided evenly by the number of prescribed administrations per day.",
      details: [
        "The number of doses must come from the medication order or an approved clinical reference.",
        "The calculator does not choose the frequency or determine whether equal division is clinically appropriate.",
      ],
      microExample: "600 mg/day ÷ 3 doses/day = 200 mg per dose",
    },
    {
      question: "Should I use actual, ideal, or adjusted body weight?",
      quickAnswer: "Use the weight method required by the medicine order, local guideline, or clinical reference.",
      details: [
        "This calculator converts the weight entered but does not decide which clinical weight method is appropriate.",
        "Do not substitute ideal or adjusted body weight unless the relevant reference requires it.",
      ],
      microExample: "Enter the documented dosing weight, not an assumed replacement.",
    },
    {
      question: "Does the calculator check maximum doses?",
      quickAnswer: "No. It performs arithmetic only.",
      details: [
        "Check maximum single dose, maximum daily dose, route, frequency, patient factors, and local policy separately.",
        "A mathematically correct result can still be clinically inappropriate.",
      ],
      microExample: "Compare the calculated mg and mL with the medication order and approved reference.",
    },
    {
      question: "Should I round the final mL?",
      quickAnswer: "Use the precision required by the prescribed device and local medication policy.",
      details: [
        "Display rounding does not make a volume clinically measurable or safe.",
        "Small non-zero values retain enough decimals to remain visible.",
      ],
      microExample: "0.025 mL must not be displayed as 0 mL.",
    },
    {
      question: "Why might my answer differ from another calculator?",
      quickAnswer: "Check the order basis, weight unit, divided-dose count, concentration format, and rounding.",
      details: [
        "A per-day order entered as per dose can multiply the result by the number of daily administrations.",
        "Using lb as though it were kg also produces a major error.",
      ],
      microExample: "20 mg/kg/day in 4 doses is not 20 mg/kg per dose.",
    },
  ]

  const commonExamples = [
    {
      question: "10 mg/kg per dose for 20 kg at 50 mg/mL",
      working: ["Dose = 10 × 20 = 200 mg per dose", "Volume = 200 ÷ 50 = 4 mL per dose"],
      answer: "4 mL per dose",
    },
    {
      question: "15 mg/kg per dose for 18 kg when the label says 250 mg/5 mL",
      working: ["Concentration = 250 ÷ 5 = 50 mg/mL", "Dose = 15 × 18 = 270 mg", "Volume = 270 ÷ 50 = 5.4 mL"],
      answer: "5.4 mL per dose",
    },
    {
      question: "20 mg/kg/day for 20 kg in 4 doses at 25 mg/mL",
      working: ["Daily dose = 20 × 20 = 400 mg/day", "Per dose = 400 ÷ 4 = 100 mg", "Volume = 100 ÷ 25 = 4 mL"],
      answer: "4 mL per dose",
    },
    {
      question: "10 mg/kg per dose for 44 lb at 50 mg/mL",
      working: ["Weight = 44 × 0.45359237 = 19.9581 kg", "Dose = 10 × 19.9581 = 199.581 mg", "Volume = 199.581 ÷ 50 = 3.9916 mL"],
      answer: "Approximately 3.99 mL per dose",
    },
  ]

  const practiceQuestions = [
    {
      question: "Order: 8 mg/kg per dose. Weight: 25 kg. Concentration: 40 mg/mL. How many mL per dose?",
      answer: "8 × 25 = 200 mg. 200 ÷ 40 = 5 mL per dose.",
    },
    {
      question: "Order: 30 mg/kg/day. Weight: 12 kg. Give in 3 divided doses. Concentration: 20 mg/mL. How many mL per dose?",
      answer: "30 × 12 = 360 mg/day. 360 ÷ 3 = 120 mg per dose. 120 ÷ 20 = 6 mL per dose.",
    },
    {
      question: "Order: 5 mg/kg per dose. Weight: 66 lb. Concentration: 25 mg/mL. How many mL per dose?",
      answer: "66 lb × 0.45359237 = 29.94 kg. 5 × 29.94 = 149.69 mg. 149.69 ÷ 25 = approximately 5.99 mL per dose.",
    },
    {
      question: "Label: 125 mg/5 mL. What concentration is used in the calculator?",
      answer: "125 ÷ 5 = 25 mg/mL.",
    },
  ]

  const breadcrumbs = [
    { name: "Home", url: "https://www.medmaths.com" },
    { name: "Calculators", url: "https://www.medmaths.com/calculators" },
    { name: "Dose Calculations", url: "https://www.medmaths.com/calculator/dose-calculations" },
    { name: "mg/kg to mL", url: "https://www.medmaths.com/calculator/dose-calculations/mgkg-to-ml-dose" },
  ]

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: [item.quickAnswer, ...(item.details ?? []).map((d) => `• ${d}`)].join("\n"),
      },
    })),
  }

  return (
    <>
      {/* Breadcrumb schema */}
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

      {/* FAQ schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* WebApplication schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "mg/kg to mL Calculator (per dose or per day)",
            description:
              "Convert an mg/kg per-dose or mg/kg/day order into millilitres using kg or lb, divided doses, and medication concentration.",
            applicationCategory: "MedicalApplication",
            operatingSystem: "Web",
            url: "https://www.medmaths.com/calculator/dose-calculations/mgkg-to-ml-dose",
          }),
        }}
      />

      <SiteHeader />

      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-3xl px-4 pb-12 pt-4 sm:px-6 sm:py-12 lg:px-8 lg:pt-10">
          {/* Breadcrumb navigation */}
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
            <span className="text-gray-900">mg/kg to mL</span>
          </nav>

          <h1 className="mb-2 text-3xl font-bold sm:text-4xl tracking-tight text-gray-900 text-center">mg/kg to mL Calculator</h1>

          {/* Calculator */}
          <section id="calculator" className="mb-8 scroll-mt-24">
            <MgKgToMlDoseClient />
          </section>

          <p className="mb-8 text-lg text-gray-600 text-center">
            Calculate a liquid medicine volume from an <span className="font-medium text-gray-900">mg/kg per-dose</span> or
            <span className="font-medium text-gray-900"> mg/kg/day</span> order, using weight in kg or lb and the exact product concentration.
          </p>

          
          <CalculatorContentDisclosure
            id="learning-guide"
            theme="dose"
            title="Weight-based formula, examples and safety guidance"
            summary="Review per-dose and per-day formulas, pounds-to-kilograms conversion, worked examples, and safety checks."
          >
          {/* How it works */}
          <section id="how-it-works" className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">How to Calculate mg/kg to mL</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                First match the calculator mode to the order. A per-dose order gives the weight-based amount for one administration.
                A per-day order gives a daily total that must be divided by the prescribed number of administrations.
              </p>
              <div className="rounded-xl border border-cyan-100 bg-cyan-50 p-4">
                <ol className="space-y-3 text-sm text-gray-800">
                  <li><span className="font-semibold">Step 1:</span> Enter the order as mg/kg per dose or mg/kg/day.</li>
                  <li><span className="font-semibold">Step 2:</span> Enter the medication weight in kg or lb. Pounds are converted to kg.</li>
                  <li><span className="font-semibold">Step 3:</span> For a daily order, divide total daily mg by the prescribed doses per day.</li>
                  <li><span className="font-semibold">Step 4:</span> Divide mg per dose by the concentration in mg/mL to calculate mL per dose.</li>
                </ol>
              </div>
              <p>
                If the label is written as <span className="font-medium text-gray-900">mg per 5 mL</span> or mg per another volume,
                enter both label values. The calculator converts the label to mg/mL before calculating the dose volume.
              </p>
            </div>
          </section>

          {/* Formula */}
          <section id="formula" className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">mg/kg to mL Formulas</h2>
            <div className="space-y-3">
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-700 text-center">
                Per dose: mg per dose = mg/kg per dose × weight (kg)
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-700 text-center">
                Per day: daily mg = mg/kg/day × weight (kg)
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-700 text-center">
                mg per dose = daily mg ÷ doses per day
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-700 text-center">
                mL per dose = mg per dose ÷ concentration (mg/mL)
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-700 text-center">
                Weight conversion: kg = lb × 0.45359237
              </div>
            </div>
          </section>

          {/* Worked examples */}
          <section id="examples" className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">Worked Examples</h2>
            <div className="space-y-6">
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="font-semibold text-gray-900">Per-dose order</h3>
                <p className="mt-2 text-sm text-gray-700">Order 10 mg/kg per dose, weight 20 kg, concentration 50 mg/mL.</p>
                <div className="mt-3 rounded-lg bg-gray-50 p-4 font-mono text-sm text-gray-700">
                  10 × 20 = 200 mg per dose<br />
                  200 ÷ 50 = 4 mL per dose
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="font-semibold text-gray-900">Daily order in divided doses</h3>
                <p className="mt-2 text-sm text-gray-700">Order 20 mg/kg/day, weight 20 kg, four divided doses, concentration 25 mg/mL.</p>
                <div className="mt-3 rounded-lg bg-gray-50 p-4 font-mono text-sm text-gray-700">
                  20 × 20 = 400 mg/day<br />
                  400 ÷ 4 = 100 mg per dose<br />
                  100 ÷ 25 = 4 mL per dose
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="font-semibold text-gray-900">Weight entered in pounds</h3>
                <p className="mt-2 text-sm text-gray-700">Order 10 mg/kg per dose, weight 44 lb, concentration 50 mg/mL.</p>
                <div className="mt-3 rounded-lg bg-gray-50 p-4 font-mono text-sm text-gray-700">
                  44 × 0.45359237 = 19.9581 kg<br />
                  10 × 19.9581 = 199.581 mg per dose<br />
                  199.581 ÷ 50 = 3.9916 mL per dose
                </div>
              </div>
            </div>
          </section>

          {/* Common examples */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">Common mg/kg to mL Examples</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {commonExamples.map((example) => (
                <div key={example.question} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                  <h3 className="mb-3 text-sm font-semibold text-gray-900">{example.question}</h3>
                  <div className="space-y-1 rounded-lg bg-gray-50 p-3 font-mono text-xs text-gray-700">
                    {example.working.map((line) => (
                      <div key={line}>{line}</div>
                    ))}
                  </div>
                  <p className="mt-3 text-sm font-semibold text-cyan-700">Answer: {example.answer}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-gray-500">
              These are arithmetic examples only. They are not dose recommendations. Always check the ordered medicine, patient weight, concentration, frequency, and maximum dose limits.
            </p>
          </section>

          {/* Practice questions */}
          <section id="practice" className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">Practice Questions</h2>
            <div className="space-y-4">
              {practiceQuestions.map((item, index) => (
                <details key={item.question} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                  <summary className="cursor-pointer font-semibold text-gray-900">
                    Question {index + 1}: {item.question}
                  </summary>
                  <p className="mt-3 rounded-lg bg-cyan-50 p-3 text-sm text-gray-800">
                    <span className="font-semibold">Answer:</span> {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>


          {/* When used */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">When This Calculator Is Used</h2>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-cyan-600 font-bold mt-1">•</span>
                <span className="text-gray-700">Weight-based liquid dosing written per dose or per day</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-600 font-bold mt-1">•</span>
                <span className="text-gray-700">Converting kg or lb into the kilogram weight required by an mg/kg formula</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-600 font-bold mt-1">•</span>
                <span className="text-gray-700">Dividing an mg/kg/day order into the prescribed number of doses</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-600 font-bold mt-1">•</span>
                <span className="text-gray-700">Converting a calculated mg amount into mL using mg/mL or mg per X mL labels</span>
              </li>
            </ul>
          </section>

          {/* Safety note */}
          <section className="mb-12 rounded-lg border border-yellow-200 bg-yellow-50 p-6">
            <p className="text-sm text-gray-800">
              <span className="font-semibold">Clinical safety note:</span> Always confirm whether the order is written per dose or per day, the prescribed number of divided doses, the required medication weight, product concentration, maximum-dose limits, route, and local protocols.
              This calculator supports calculation checking but does not recommend doses or replace clinical judgement.
            </p>
          </section>

          {/* FAQs */}
          <section id="faqs" className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">Frequently Asked Questions</h2>
            <FAQAccordion items={faqItems} />
          </section>

          {/* References — GOLDEN STANDARD LAYOUT */}
          </CalculatorContentDisclosure>

          <RelatedCalculators
            theme="dose"
            title="Related weight-based dose calculators"
            description="Use these calculators when a weight-based dose needs another dosing check, body-size estimate, or route conversion."
            items={getCalculatorNetworkItems("/calculator/dose-calculations/mgkg-to-ml-dose")}
          />

          <CalculatorTrustBlock
            theme="dose"
            author={{ name: "George Lambroglou", credentials: "RN", href: "/about" }}
            lastReviewed={{ iso: UPDATED_DATE_ISO, label: UPDATED_DATE_HUMAN }}
            note={
              <>
                Formula and worked examples checked against the references listed below. MedMaths supports calculation checking and does not replace the medication order, product information, maximum-dose checks, local policy, pharmacy guidance, or clinical judgement.
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
<p className="mb-8 text-gray-600 text-center text-sm">
              This calculator follows standard medication calculation methods used in nursing and prescribing education,
              including weight-based dosing (mg/kg) and dose-to-volume conversion (mg/mL).
            </p>

            {/* International Standards */}
            <div className="mb-8">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">International Standards</h3>
              <div className="space-y-3">
                <div className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition-shadow">
                  <a
                    href="https://www.bipm.org/en/publications/si-brochure"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between gap-4 group"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 group-hover:text-cyan-600">
                        The International System of Units (SI) – SI Brochure{" "}
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded ml-2">BIPM</span>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">BIPM (Bureau International des Poids et Mesures)</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Authoritative reference for SI units and prefixes used in clinical calculations.
                      </p>
                    </div>
                    <span className="text-gray-400 group-hover:text-cyan-600 text-lg mt-1">↗</span>
                  </a>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition-shadow">
                  <a
                    href="https://openstax.org/books/pharmacology/pages/2-4-dosage-calculations"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between gap-4 group"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 group-hover:text-cyan-600">
                        Dosage Calculations – Pharmacology for Nurses{" "}
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded ml-2">OpenStax</span>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">OpenStax</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Explains the desired dose, dose on hand, and quantity method used in medication calculation education.
                      </p>
                    </div>
                    <span className="text-gray-400 group-hover:text-cyan-600 text-lg mt-1">↗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Australia Resources */}
            <div className="mb-8">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Australia Resources</h3>
              <div className="space-y-3">
                <div className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition-shadow">
                  <a
                    href="https://students.flinders.edu.au/content/dam/student/slss/numeracy/drug-calcs.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between gap-4 group"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 group-hover:text-cyan-600">
                        Drug Calculations{" "}
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded ml-2">PDF</span>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">Flinders University – Student Learning Support Service</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Covers dose calculation methods and dose-to-volume style questions used in nursing education.
                      </p>
                    </div>
                    <span className="text-gray-400 group-hover:text-cyan-600 text-lg mt-1">↗</span>
                  </a>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition-shadow">
                  <a
                    href="https://i.unisa.edu.au/siteassets/students/student-support-services/health/learning-support/dosage-calculations-worksheet.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between gap-4 group"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 group-hover:text-cyan-600">
                        Dosage calculations worksheet{" "}
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded ml-2">PDF</span>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">University of South Australia (UniSA)</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Includes weight-based dosing examples (mg/kg) and calculation practice.
                      </p>
                    </div>
                    <span className="text-gray-400 group-hover:text-cyan-600 text-lg mt-1">↗</span>
                  </a>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition-shadow">
                  <a
                    href="https://learninglab.rmit.edu.au/nursing/finding-volume-required/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between gap-4 group"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 group-hover:text-cyan-600">
                        Finding the volume required{" "}
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded ml-2">Web page</span>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">RMIT Learning Lab (Nursing)</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Explains stock strength/stock volume concepts behind dose-to-volume calculations.
                      </p>
                    </div>
                    <span className="text-gray-400 group-hover:text-cyan-600 text-lg mt-1">↗</span>
                  </a>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition-shadow">
                  <a
                    href="https://www.safetyandquality.gov.au/clinical-topics/medicines-safety-and-quality/high-risk-medicines-and-systems"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between gap-4 group"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 group-hover:text-cyan-600">
                        High risk medicines and systems{" "}
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded ml-2">Web page</span>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">Australian Commission on Safety and Quality in Health Care</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Australian medication safety reference for high-risk medicine systems and APINCHS classification.
                      </p>
                    </div>
                    <span className="text-gray-400 group-hover:text-cyan-600 text-lg mt-1">↗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* United Kingdom Resources */}
            <div className="mb-8">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">United Kingdom Resources</h3>
              <div className="space-y-3">
                <div className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition-shadow">
                  <a
                    href="https://www.gloshospitals.nhs.uk/documents/2446/IV_Drug_Calculation_Test_practice_papers.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between gap-4 group"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 group-hover:text-cyan-600">
                        IV Drug & Fluid Administration Training: Calculation Practice{" "}
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded ml-2">PDF</span>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">Gloucestershire Hospitals NHS Foundation Trust</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Practice papers covering common calculation patterns used in medication administration.
                      </p>
                    </div>
                    <span className="text-gray-400 group-hover:text-cyan-600 text-lg mt-1">↗</span>
                  </a>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition-shadow">
                  <a
                    href="https://londonprofessionaldevelopment.hee.nhs.uk/sites/default/files/prescribing-workbook-final.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between gap-4 group"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 group-hover:text-cyan-600">
                        Prescribing & Drug Calculations: Self-review workbook{" "}
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded ml-2">PDF</span>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">Health Education England (London)</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Calculation practice including weight-based and dose conversion style questions.
                      </p>
                    </div>
                    <span className="text-gray-400 group-hover:text-cyan-600 text-lg mt-1">↗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* United States Resources */}
            <div className="mb-8">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">United States Resources</h3>
              <div className="space-y-3">
                <div className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition-shadow">
                  <a
                    href="https://www.upstate.edu/hr/document/med_calculations.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between gap-4 group"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 group-hover:text-cyan-600">
                        Medication calculations{" "}
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded ml-2">PDF</span>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">SUNY Upstate Medical University</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Covers calculation structures consistent with dosage and dose-to-volume conversions.
                      </p>
                    </div>
                    <span className="text-gray-400 group-hover:text-cyan-600 text-lg mt-1">↗</span>
                  </a>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition-shadow">
                  <a
                    href="https://www.ncbi.nlm.nih.gov/books/NBK560924/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between gap-4 group"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 group-hover:text-cyan-600">
                        Pharmacy Calculations{" "}
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded ml-2">Web page</span>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">NCBI Bookshelf (StatPearls Publishing)</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Discusses calculation patterns consistent with mixtures/solutions and dose conversions.
                      </p>
                    </div>
                    <span className="text-gray-400 group-hover:text-cyan-600 text-lg mt-1">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
          </CalculatorContentDisclosure>

          
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
