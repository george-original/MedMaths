import type { Metadata } from "next"
import Link from "next/link"
import { AlertTriangle, CheckCircle2 } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RelatedCalculators } from "@/components/related-calculators"
import { getCalculatorNetworkItems } from "@/lib/calculator-network"
import { JsonLdSchema, generateBreadcrumbSchema } from "@/components/json-ld-schema"
import { CalculatorContentDisclosure, CalculatorTrustBlock } from "@/components/calculator"
import DripRateMlHrToGttMinClient from "./drip-rate-mlhr-to-gttmin-client"

const CANONICAL = "https://www.medmaths.com/calculator/iv-fluids/drip-rate-mlhr-to-gttmin"
const UPDATED_DATE_ISO = "2026-07-30"
const UPDATED_DATE_HUMAN = "30 Jul 2026"

const seoKeywords = [
  "drip rate calculator",
  "mL/hr to gtt/min calculator",
  "mL per hour to drops per minute",
  "IV drip rate calculator",
  "drops per minute calculator",
  "drop factor calculator",
  "gtt per minute formula",
  "IV flow rate calculator",
  "gravity drip calculator",
  "microdrip calculator 60 gtt/mL",
  "macrodrip calculator 10 15 20 gtt/mL",
  "120 mL/hr to gtt/min",
  "75 mL/hr to gtt/min",
  "1000 mL over 8 hours drip rate",
  "volume time drop factor calculator",
]

export const metadata: Metadata = {
  title: "IV Drip Rate Calculator | mL/hr or Volume & Time",
  description:
    "Calculate gtt/min from an mL/hr rate or from total volume and infusion time. Uses the confirmed IV giving-set drop factor and shows the calculated mL/hr rate.",
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
    title: "IV Drip Rate Calculator | mL/hr or Volume & Time",
    description: "Calculate gravity IV drops per minute from mL/hr or from total volume and infusion time.",
    url: CANONICAL,
    siteName: "MedMaths",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary",
    title: "IV Drip Rate Calculator | mL/hr or Volume & Time",
    description: "Calculate gravity IV drip rate from mL/hr or from volume and infusion time.",
  },
}

const faqItems = [
  {
    question: "How do you convert mL/hr to gtt/min?",
    answer:
      "Multiply the infusion rate in mL/hr by the drop factor in gtt/mL, then divide by 60. The formula is gtt/min = (mL/hr × drop factor) ÷ 60.",
  },
  {
    question: "How do you calculate gtt/min from total volume and time?",
    answer:
      "Multiply the total volume in mL by the giving-set drop factor, then divide by the infusion time in minutes. The formula is gtt/min = (volume mL × drop factor) ÷ time in minutes.",
  },
  {
    question: "Does the calculator also show mL/hr from volume and time?",
    answer:
      "Yes. In volume-and-time mode it calculates mL/hr as (volume × 60) ÷ total time in minutes, then calculates the gravity drip rate in gtt/min.",
  },
  {
    question: "What does drop factor mean?",
    answer:
      "Drop factor means how many drops make 1 mL for that IV giving set. It is written as gtt/mL and should be confirmed from the tubing packet or label.",
  },
  {
    question: "What is the difference between macrodrip and microdrip tubing?",
    answer:
      "Macrodrip tubing commonly uses lower drop factors such as 10, 15, or 20 gtt/mL. Microdrip tubing commonly uses 60 gtt/mL. Always use the exact value printed on the set.",
  },
  {
    question: "How many gtt/min is 120 mL/hr with a 20 gtt/mL set?",
    answer:
      "120 mL/hr × 20 gtt/mL ÷ 60 = 40 gtt/min.",
  },
  {
    question: "How many gtt/min is 1000 mL over 8 hours with a 15 gtt/mL set?",
    answer:
      "Eight hours is 480 minutes. (1000 mL × 15 gtt/mL) ÷ 480 minutes = 31.25 gtt/min, usually displayed as 31 whole drops per minute. The calculated hourly rate is 125 mL/hr.",
  },
  {
    question: "Do you round gtt/min to a whole number?",
    answer:
      "Drops per minute are generally displayed as whole drops because partial drops cannot be counted. The exact arithmetic remains visible, and the actual chamber flow should be checked after adjustment.",
  },
]

const commonExamples = [
  { rate: "60 mL/hr", dropFactor: "20 gtt/mL", result: "20 gtt/min" },
  { rate: "75 mL/hr", dropFactor: "20 gtt/mL", result: "25 gtt/min" },
  { rate: "100 mL/hr", dropFactor: "15 gtt/mL", result: "25 gtt/min" },
  { rate: "120 mL/hr", dropFactor: "20 gtt/mL", result: "40 gtt/min" },
  { rate: "50 mL/hr", dropFactor: "60 gtt/mL", result: "50 gtt/min" },
  { rate: "125 mL/hr", dropFactor: "10 gtt/mL", result: "21 gtt/min" },
]

const practiceQuestions = [
  {
    question: "Order: 120 mL/hr. Drop factor: 20 gtt/mL. What is the drip rate?",
    answer: "(120 × 20) ÷ 60 = 40 gtt/min.",
  },
  {
    question: "Infuse 1000 mL over 8 hours using 15 gtt/mL tubing. What are the mL/hr and gtt/min rates?",
    answer: "1000 ÷ 8 = 125 mL/hr. (1000 × 15) ÷ 480 = 31.25, displayed as 31 gtt/min.",
  },
  {
    question: "Infuse 250 mL over 2 hours using 20 gtt/mL tubing. What are the mL/hr and gtt/min rates?",
    answer: "250 ÷ 2 = 125 mL/hr. (250 × 20) ÷ 120 = 41.67, displayed as 42 gtt/min.",
  },
  {
    question: "Order: 50 mL/hr. Drop factor: 60 gtt/mL. What is the drip rate?",
    answer: "(50 × 60) ÷ 60 = 50 gtt/min.",
  },
]

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://www.medmaths.com" },
  { name: "Calculators", url: "https://www.medmaths.com/calculators" },
  { name: "IV Fluids", url: "https://www.medmaths.com/calculator/iv-fluids" },
  { name: "mL/hr to gtt/min", url: CANONICAL },
])

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "IV Drip Rate Calculator",
  description:
    "Calculate gravity IV drip rate in drops per minute from a known mL/hr rate or from total volume and infusion time, using the giving-set drop factor.",
  url: CANONICAL,
  applicationCategory: "MedicalApplication",
  applicationSubCategory: "IV drip rate calculator",
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

export default function DripRateMlHrToGttMinPage() {
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
            <span className="text-gray-900">mL/hr to gtt/min</span>
          </nav>

          <h1 className="mb-3 text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            IV Drip Rate Calculator
          </h1>

          <section id="calculator" className="mb-8 scroll-mt-24">
            <DripRateMlHrToGttMinClient />
          </section>

          <p className="mb-8 text-center text-lg leading-7 text-gray-600">
            Calculate a gravity IV drip rate from a known <strong>mL/hr</strong> rate or from <strong>total volume and infusion time</strong>. Both pathways use the confirmed giving-set drop factor.
          </p>

          <CalculatorContentDisclosure
            id="learning-guide"
            theme="iv"
            title="IV drip-rate formulas, examples and safety guidance"
            summary="Review both input methods, giving-set checks, worked examples, common mistakes, practice questions, and FAQs."
          >
          <section className="mb-10 rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6">
            <h2 className="mb-3 text-2xl font-bold text-gray-900">Two ways to calculate an IV gravity drip rate</h2>
            <p className="mb-4 text-gray-700">
              Use the pathway that matches the order or study question. Both require the exact giving-set drop factor in <strong>gtt/mL</strong>.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <h3 className="mb-2 font-bold text-gray-900">If mL/hr is known</h3>
                <div className="font-mono text-sm text-gray-800">gtt/min = (mL/hr × drop factor) ÷ 60</div>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <h3 className="mb-2 font-bold text-gray-900">If volume and time are known</h3>
                <div className="font-mono text-sm text-gray-800">gtt/min = (volume mL × drop factor) ÷ time in minutes</div>
              </div>
            </div>
          </section>

          <section className="mb-10 grid gap-5 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Example: rate already in mL/hr</h2>
              <div className="space-y-3 rounded-2xl border border-teal-200 bg-teal-50 p-5">
                <p className="font-semibold text-gray-900">120 mL/hr using a 20 gtt/mL set</p>
                <div className="rounded-lg bg-white p-4 font-mono text-sm text-gray-700">
                  <div>gtt/min = (120 × 20) ÷ 60</div>
                  <div>gtt/min = 40</div>
                </div>
                <div className="rounded-lg border border-teal-200 bg-white p-3 text-sm font-semibold text-teal-800">Answer: 40 gtt/min</div>
              </div>
            </div>
            <div>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Example: volume and time known</h2>
              <div className="space-y-3 rounded-2xl border border-teal-200 bg-teal-50 p-5">
                <p className="font-semibold text-gray-900">1000 mL over 8 hours using a 15 gtt/mL set</p>
                <div className="rounded-lg bg-white p-4 font-mono text-sm text-gray-700">
                  <div>Time = 480 minutes</div>
                  <div>mL/hr = 1000 ÷ 8 = 125</div>
                  <div>gtt/min = (1000 × 15) ÷ 480 = 31.25</div>
                </div>
                <div className="rounded-lg border border-teal-200 bg-white p-3 text-sm font-semibold text-teal-800">Answer: 125 mL/hr and 31 gtt/min</div>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Common IV drip-rate examples</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {commonExamples.map((item) => (
                <div key={`${item.rate}-${item.dropFactor}`} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-gray-900">{item.rate}</p>
                  <p className="text-xs text-gray-500">Drop factor: {item.dropFactor}</p>
                  <p className="mt-2 text-lg font-bold text-teal-700">{item.result}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Step-by-step IV drip rate method</h2>
            <div className="space-y-3">
              {[
                "Choose the input method that matches the information provided: mL/hr, or total volume and infusion time.",
                "Confirm the drop factor on the IV giving set, written as gtt/mL.",
                "If using volume and time, convert the full duration to minutes and calculate the equivalent mL/hr rate.",
                "Apply the matching gtt/min formula and keep the exact arithmetic visible.",
                "Display whole drops per minute, then check the actual chamber flow after adjustment.",
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
              <h2 className="text-2xl font-bold text-gray-900">Common drip rate mistakes</h2>
            </div>
            <ul className="space-y-2 text-sm text-yellow-950">
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Using the wrong drop factor. A 10 gtt/mL set and a 60 gtt/mL set produce very different drip rates.</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Using hours instead of minutes in the volume-and-time formula, or forgetting to divide by 60 when converting from mL/hr.</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Confusing total bag volume with an hourly rate. In volume-and-time mode, the calculator derives mL/hr before displaying gtt/min.</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Relying on the initial clamp position without checking the drip chamber again after the flow settles.</span>
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
            <h2 className="mb-4 text-2xl font-bold text-gray-900">IV drip-rate FAQ</h2>
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
            description="Use these tools for reverse IV rate checks, infusion time, bag preparation, and dose-volume calculations."
            items={getCalculatorNetworkItems("/calculator/iv-fluids/drip-rate-mlhr-to-gttmin")}
          />

          <CalculatorTrustBlock
            theme="iv"
            author={{ name: "George Lambroglou", credentials: "RN", href: "/about" }}
            lastReviewed={{ iso: UPDATED_DATE_ISO, label: UPDATED_DATE_HUMAN }}
            note="This calculator supports IV flow-rate checking and education. It does not replace the medication or fluid order, the giving-set label, pump or gravity-infusion policy, patient assessment, or clinical judgement."
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
                : gravity IV flow rate and drop factor calculation.
              </li>
              <li>
                <a className="font-medium text-teal-700 hover:text-teal-900" href="https://learninglab.rmit.edu.au/nursing/flow-rate-formula/converting-flow-rates-between-mlhr-and-dpm/" target="_blank" rel="noopener noreferrer">
                  RMIT Learning Lab — Converting flow rates between mL/hr and drops per minute
                </a>
                : nursing calculation method for converting flow rates.
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
