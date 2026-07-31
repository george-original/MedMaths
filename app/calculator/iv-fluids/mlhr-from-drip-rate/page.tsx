import type { Metadata } from "next"
import Link from "next/link"
import { AlertTriangle, CheckCircle2 } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RelatedCalculators } from "@/components/related-calculators"
import { getCalculatorNetworkItems } from "@/lib/calculator-network"
import { CalculatorContentDisclosure, CalculatorTrustBlock } from "@/components/calculator"
import { JsonLdSchema, generateBreadcrumbSchema } from "@/components/json-ld-schema"
import MlHrFromDripRateClient from "./mlhr-from-drip-rate-client"

const CANONICAL = "https://www.medmaths.com/calculator/iv-fluids/mlhr-from-drip-rate"
const UPDATED_DATE_ISO = "2026-07-30"
const UPDATED_DATE_HUMAN = "30 Jul 2026"

const seoKeywords = [
  "gtt/min to mL/hr calculator",
  "drops per minute to mL per hour",
  "drip rate to mL/hr",
  "IV drip rate converter",
  "gravity drip rate calculator",
  "mL/hr from drip rate",
  "drop factor calculator",
  "20 gtt/min to mL/hr",
  "25 gtt/min to mL/hr",
  "40 gtt/min to mL/hr",
  "60 gtt/min to mL/hr",
  "macrodrip to mL/hr",
  "microdrip to mL/hr",
  "nursing IV calculation",
]

export const metadata: Metadata = {
  title: "gtt/min to mL/hr Calculator | IV Drip Rate Converter - MedMaths",
  description:
    "Convert a gravity IV drip rate in gtt/min back to mL/hr. Enter the observed drops per minute and your giving set drop factor to get the hourly infusion rate.",
  keywords: seoKeywords,
  authors: [{ name: "George Lambroglou, RN", url: "https://www.medmaths.com/about" }],
  creator: "George Lambroglou, RN",
  publisher: "MedMaths",
  alternates: { canonical: CANONICAL },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    title: "gtt/min to mL/hr Calculator | MedMaths",
    description: "Convert drops per minute to an hourly IV infusion rate.",
    url: CANONICAL,
    siteName: "MedMaths",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary",
    title: "gtt/min to mL/hr Calculator | MedMaths",
    description: "Convert drops per minute to an hourly IV infusion rate.",
  },
}

const faqItems = [
  {
    question: "How do you convert gtt/min to mL/hr?",
    answer:
      "Multiply the observed drops per minute by 60, then divide by the giving-set drop factor in gtt/mL. The formula is mL/hr = (gtt/min × 60) ÷ drop factor.",
  },
  {
    question: "What does drop factor mean?",
    answer:
      "Drop factor is the number of drops that equal 1 mL for a specific IV giving set. It is written as gtt/mL and must be checked on the tubing packet or label.",
  },
  {
    question: "Should I use 10, 15, 20, or 60 gtt/mL?",
    answer:
      "Use the exact drop factor printed on the giving set in front of you. Macrodrip sets commonly use 10, 15, or 20 gtt/mL, while microdrip sets commonly use 60 gtt/mL.",
  },
  {
    question: "Why does a 60 gtt/mL microdrip set give the same number in mL/hr?",
    answer:
      "With a confirmed 60 gtt/mL set, multiplying by 60 minutes and dividing by 60 gtt/mL cancel out. For example, 50 gtt/min estimates 50 mL/hr.",
  },
  {
    question: "Can this result be used as an IV pump setting?",
    answer:
      "Do not use the reverse-conversion result as an unverified pump setting. Check the original order, patient context, pump instructions, and local policy before programming a pump.",
  },
  {
    question: "Why might the calculated mL/hr differ from the actual infusion rate?",
    answer:
      "Gravity flow can change with bag height, clamp position, patient movement, tubing resistance, pressure, and counting error. The result is an arithmetic estimate and the infusion still requires direct checking.",
  },
  {
    question: "Do gtt/min and gtts/min mean the same thing?",
    answer:
      "Yes. Both are used to mean drops per minute. In clinical calculations, gtt is the standard abbreviation for drops, while some questions use the informal plural spelling gtts.",
  },
  {
    question: "Why can the result include a decimal mL/hr value?",
    answer:
      "The reverse calculation converts an observed whole-drop count into an estimated hourly volume, which may not be a whole number. Keeping the decimal avoids losing information before the result is checked against the order and delivery method.",
  },
]

const commonExamples = [
  { drips: "20 gtt/min", dropFactor: "20 gtt/mL", result: "60 mL/hr" },
  { drips: "25 gtt/min", dropFactor: "20 gtt/mL", result: "75 mL/hr" },
  { drips: "40 gtt/min", dropFactor: "20 gtt/mL", result: "120 mL/hr" },
  { drips: "25 gtt/min", dropFactor: "15 gtt/mL", result: "100 mL/hr" },
  { drips: "50 gtt/min", dropFactor: "60 gtt/mL", result: "50 mL/hr" },
  { drips: "21 gtt/min", dropFactor: "10 gtt/mL", result: "126 mL/hr" },
]

const practiceQuestions = [
  {
    question: "Observed drip rate: 40 gtt/min. Drop factor: 20 gtt/mL. What is the estimated mL/hr rate?",
    answer: "(40 × 60) ÷ 20 = 120 mL/hr.",
  },
  {
    question: "Observed drip rate: 25 gtt/min. Drop factor: 15 gtt/mL. What is the estimated mL/hr rate?",
    answer: "(25 × 60) ÷ 15 = 100 mL/hr.",
  },
  {
    question: "Observed drip rate: 50 gtt/min. Drop factor: 60 gtt/mL. What is the estimated mL/hr rate?",
    answer: "(50 × 60) ÷ 60 = 50 mL/hr.",
  },
]

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://www.medmaths.com" },
  { name: "Calculators", url: "https://www.medmaths.com/calculators" },
  { name: "IV Fluids", url: "https://www.medmaths.com/calculator/iv-fluids" },
  { name: "gtt/min to mL/hr", url: CANONICAL },
])

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "gtt/min to mL/hr Calculator",
  description:
    "Calculate an estimated IV infusion rate in mL/hr from an observed gravity drip rate in gtt/min and the IV giving set drop factor in gtt/mL.",
  url: CANONICAL,
  applicationCategory: "MedicalApplication",
  applicationSubCategory: "IV drip rate converter",
  operatingSystem: "Any",
  browserRequirements: "Modern web browser",
  isAccessibleForFree: true,
  inLanguage: "en-AU",
  dateModified: UPDATED_DATE_ISO,
  keywords: seoKeywords.join(", "),
  author: {
    "@type": "Person",
    name: "George Lambroglou",
    jobTitle: "Registered Nurse",
    url: "https://www.medmaths.com/about",
  },
  publisher: {
    "@type": "Organization",
    name: "MedMaths",
    url: "https://www.medmaths.com",
    logo: "https://www.medmaths.com/medmaths-logo.png",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "AUD",
    availability: "https://schema.org/InStock",
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
      text: item.answer,
    },
  })),
}

export default function MlHrFromDripRatePage() {
  return (
    <>
      <JsonLdSchema schema={breadcrumbSchema} />
      <JsonLdSchema schema={calculatorSchema} />
      <JsonLdSchema schema={faqSchema} />
      <SiteHeader />
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-3xl px-4 pb-12 pt-4 sm:px-6 sm:py-12 lg:px-8 lg:pt-10">
          <nav className="mb-4 hidden text-sm text-gray-500 sm:block" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-gray-900">
              Home
            </Link>
            {" / "}
            <Link href="/calculators" className="hover:text-gray-900">
              Calculators
            </Link>
            {" / "}
            <Link href="/calculator/iv-fluids" className="hover:text-gray-900">
              IV Fluids
            </Link>
            {" / "}
            <span className="text-gray-900">gtt/min to mL/hr</span>
          </nav>

          <h1 className="mb-3 text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            gtt/min to mL/hr Calculator
          </h1>

          <section id="calculator" className="mb-8 scroll-mt-24">
            <MlHrFromDripRateClient />
          </section>

          <p className="mb-8 text-center text-lg leading-7 text-gray-600">
            Convert an observed gravity drip rate in <strong>drops per minute</strong> (gtt/min, sometimes written gtts/min) to an estimated infusion rate in <strong>mL/hr</strong> using the exact giving-set drop factor.
          </p>

          <CalculatorContentDisclosure
            id="learning-guide"
            theme="iv"
            title="Reverse drip-rate formula, examples and safety guidance"
            summary="Review the reverse drip-rate formula, giving-set checks, one worked example, three practice questions, and focused FAQs."
          >
          <section className="mb-10 rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6">
            <h2 className="mb-3 text-2xl font-bold text-gray-900">How to convert gtt/min to mL/hr</h2>
            <p className="mb-4 text-gray-700">
              Multiply the observed drops per minute by 60 minutes, then divide by the drop factor printed on the IV giving set. This converts a per-minute drop count into an estimated hourly volume.
            </p>
            <div className="rounded-xl border border-gray-200 bg-white p-4 text-center font-mono text-sm text-gray-800 sm:text-base">
              mL/hr = (gtt/min × 60) ÷ drop factor
            </div>
            <p className="mt-4 text-sm text-gray-600">
              The answer is an estimate of gravity flow. It does not replace the prescribed order, direct observation, pump programming instructions, or local IV policy.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Worked example: 40 gtt/min to mL/hr</h2>
            <div className="space-y-3 rounded-2xl border border-teal-200 bg-teal-50 p-5">
              <p className="font-semibold text-gray-900">
                Question: An IV is observed at 40 gtt/min using a 20 gtt/mL giving set. What is the estimated hourly rate?
              </p>
              <div className="rounded-lg bg-white p-4 font-mono text-sm text-gray-700">
                <div>mL/hr = (40 × 60) ÷ 20</div>
                <div>mL/hr = 2400 ÷ 20</div>
                <div>mL/hr = 120</div>
              </div>
              <div className="rounded-lg border border-teal-200 bg-white p-3 text-sm font-semibold text-teal-800">
                Answer: 120 mL/hr
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Common gtt/min to mL/hr examples</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {commonExamples.map((example) => (
                <div key={`${example.drips}-${example.dropFactor}`} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-gray-900">{example.drips}</p>
                  <p className="text-xs text-gray-500">Drop factor: {example.dropFactor}</p>
                  <p className="mt-2 text-lg font-bold text-teal-700">{example.result}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Step-by-step reverse drip-rate method</h2>
            <div className="space-y-3">
              {[
                "Count or confirm the observed gravity drip rate in drops per minute.",
                "Read the exact drop factor from the IV giving-set packet or label.",
                "Multiply the drops per minute by 60.",
                "Divide by the giving-set drop factor to estimate mL/hr.",
                "Compare the result with the order and recheck the actual drip chamber flow.",
              ].map((step, index) => (
                <div key={step} className="flex gap-3 rounded-lg border border-gray-200 bg-white p-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-600 text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <p className="text-gray-700">{step}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10 rounded-2xl border border-yellow-200 bg-yellow-50 p-5 sm:p-6">
            <div className="mb-3 flex items-start gap-2">
              <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-yellow-700" />
              <h2 className="text-2xl font-bold text-gray-900">Common reverse drip-rate mistakes</h2>
            </div>
            <ul className="space-y-2 text-sm text-yellow-950">
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Guessing the drop factor instead of checking the giving-set packet or label.</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Confusing an observed gravity drip count with a prescribed or programmed pump rate.</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Rounding the calculated mL/hr without considering the original order and intended delivery method.</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Assuming gravity flow remains constant after patient movement, bag-height changes, pressure changes, or clamp movement.</span>
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Practice questions</h2>
            <div className="space-y-3">
              {practiceQuestions.map((item, index) => (
                <details key={item.question} className="rounded-lg border border-gray-200 bg-white p-4">
                  <summary className="cursor-pointer font-semibold text-gray-900">
                    {index + 1}. {item.question}
                  </summary>
                  <p className="mt-3 text-sm text-gray-700">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">gtt/min to mL/hr FAQ</h2>
            <div className="space-y-3">
              {faqItems.map((item) => (
                <details key={item.question} className="rounded-lg border border-gray-200 bg-white p-4">
                  <summary className="cursor-pointer font-semibold text-gray-900">{item.question}</summary>
                  <p className="mt-3 text-sm leading-relaxed text-gray-700">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
          </CalculatorContentDisclosure>

          <RelatedCalculators
            theme="iv"
            title="Related IV and medication maths calculators"
            description="Use these tools for the forward IV conversion, infusion time, bag preparation, and dose-volume calculations."
            items={getCalculatorNetworkItems("/calculator/iv-fluids/mlhr-from-drip-rate")}
          />

          <CalculatorTrustBlock
            theme="iv"
            author={{ name: "George Lambroglou", credentials: "RN", href: "/about" }}
            lastReviewed={{ iso: UPDATED_DATE_ISO, label: UPDATED_DATE_HUMAN }}
            note="This calculator supports gravity IV flow-rate checking and education. It does not replace the fluid or medication order, giving-set label, patient assessment, pump or gravity-infusion policy, or clinical judgement."
            className="mb-10"
          />

          <CalculatorContentDisclosure
            id="references"
            theme="iv"
            title="References and sources"
            summary="Open the formula, educational, and safety sources used for this calculator."
            className="mb-12"
          >
<section className="mb-10 rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6">
<ul className="space-y-2 text-sm text-gray-700">
              <li>
                <a className="font-medium text-teal-700 hover:text-teal-900" href="https://openstax.org/books/clinical-nursing-skills/pages/13-3-intravenous-infusion" target="_blank" rel="noopener noreferrer">
                  OpenStax Clinical Nursing Skills — Intravenous Infusion
                </a>
                : gravity IV flow rate and drop-factor calculations.
              </li>
              <li>
                <a className="font-medium text-teal-700 hover:text-teal-900" href="https://learninglab.rmit.edu.au/nursing/flow-rate-formula/converting-flow-rates-between-mlhr-and-dpm/" target="_blank" rel="noopener noreferrer">
                  RMIT Learning Lab — Converting flow rates between mL/hr and drops per minute
                </a>
                : nursing calculation method for converting flow rates in both directions.
              </li>
            </ul>
          </section>
          </CalculatorContentDisclosure>

          
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
