import type { Metadata } from "next"
import Link from "next/link"
import { AlertTriangle, CheckCircle2 } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RelatedCalculators } from "@/components/related-calculators"
import { getCalculatorNetworkItems } from "@/lib/calculator-network"
import { CalculatorContentDisclosure, CalculatorTrustBlock } from "@/components/calculator"
import { JsonLdSchema, generateBreadcrumbSchema } from "@/components/json-ld-schema"
import MLPerHourTimeClient from "./ml-per-hour-time-client"

const CANONICAL = "https://www.medmaths.com/calculator/iv-fluids/ml-per-hour-to-time-to-finish"
const UPDATED_DATE_ISO = "2026-07-30"
const UPDATED_DATE_HUMAN = "30 Jul 2026"

const seoKeywords = [
  "IV infusion time calculator",
  "mL/hr to time calculator",
  "time to finish IV bag",
  "IV clock finish time calculator",
  "infusion completion time calculator",
  "IV bag finish time calculator",
  "infusion duration calculator",
  "mL per hour to hours calculator",
  "volume divided by rate calculator",
  "VTBI time remaining calculator",
  "500 mL at 125 mL/hr",
  "1000 mL at 125 mL/hr",
  "how long will an IV take to finish",
  "nursing IV time calculation",
]

export const metadata: Metadata = {
  title: "IV Infusion Time Calculator | Duration & Finish Time",
  description:
    "Calculate IV infusion duration from remaining volume and mL/hr, with optional clock finish time from a start time. Includes formula, examples, and safety guidance.",
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
    title: "IV Infusion Time Calculator | Duration & Finish Time",
    description: "Calculate IV infusion duration and optional clock finish time from remaining volume, mL/hr, and a start time.",
    url: CANONICAL,
    siteName: "MedMaths",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary",
    title: "IV Infusion Time Calculator | Duration & Finish Time",
    description: "Calculate IV infusion duration and optional clock completion from volume, rate, and a start time.",
  },
}

const faqItems = [
  {
    question: "How do you calculate how long an IV infusion will take?",
    answer:
      "Divide the remaining volume in mL by the infusion rate in mL/hr. The formula is time in hours = volume in mL ÷ rate in mL/hr.",
  },
  {
    question: "How do you calculate the clock finish time for an IV infusion?",
    answer:
      "First calculate the remaining duration using volume ÷ rate, then add that duration to the start time. This calculator can do that second step when you enter a 24-hour start time.",
  },
  {
    question: "What happens if the IV finish time crosses midnight?",
    answer:
      "The calculator carries the time into the next day and labels the result as tomorrow or, for longer durations, the relevant number of days later.",
  },
  {
    question: "How long will 500 mL take at 125 mL/hr?",
    answer:
      "500 mL ÷ 125 mL/hr = 4 hours. If the estimate starts at 18:30 and the rate does not change, the clock completion is approximately 22:30.",
  },
  {
    question: "Should I use the original bag size or the remaining volume?",
    answer:
      "Use the remaining volume that is still to infuse. If the bag started at 1000 mL but only 400 mL remains, use 400 mL for the calculation.",
  },
  {
    question: "What does VTBI mean on an IV pump?",
    answer:
      "VTBI means volume to be infused. If the pump VTBI is accurate, it is usually the best value to use as the remaining volume.",
  },
  {
    question: "How do you convert decimal hours to hours and minutes?",
    answer:
      "Keep the whole number as hours, then multiply the decimal part by 60. For example, 2.5 hours is 2 hours plus 0.5 × 60 minutes, which equals 2 hours 30 minutes.",
  },
  {
    question: "Why might the actual IV completion time be different?",
    answer:
      "The actual time changes if the rate is altered, the infusion is paused, the IV occludes, the pump is reprogrammed, or the remaining-volume estimate is inaccurate. The calculator does not assess whether the rate is clinically appropriate.",
  },
]

const commonExamples = [
  { volume: "100 mL", rate: "25 mL/hr", result: "4h 0m" },
  { volume: "250 mL", rate: "100 mL/hr", result: "2h 30m" },
  { volume: "500 mL", rate: "125 mL/hr", result: "4h 0m" },
  { volume: "1000 mL", rate: "80 mL/hr", result: "12h 30m" },
]

const practiceQuestions = [
  {
    question: "500 mL remains at 125 mL/hr. How long until finished?",
    answer: "500 ÷ 125 = 4 hours, so the estimated remaining duration is 4h 0m.",
  },
  {
    question: "250 mL remains at 100 mL/hr. How long until finished?",
    answer: "250 ÷ 100 = 2.5 hours. 0.5 hours × 60 = 30 minutes, so the answer is 2h 30m.",
  },
  {
    question: "An estimate starts at 21:45 and the remaining duration is 4 hours. What is the clock finish time?",
    answer: "21:45 + 4 hours = 01:45 tomorrow.",
  },
  {
    question: "750 mL remains at 100 mL/hr, starting at 08:15. What are the duration and finish time?",
    answer: "750 ÷ 100 = 7.5 hours, or 7h 30m. 08:15 + 7h 30m = 15:45 today.",
  },
]

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://www.medmaths.com" },
  { name: "Calculators", url: "https://www.medmaths.com/calculators" },
  { name: "IV Fluids", url: "https://www.medmaths.com/calculator/iv-fluids" },
  { name: "IV Infusion Time", url: CANONICAL },
])

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "IV Infusion Time Calculator",
  description:
    "Calculate IV infusion duration from remaining volume and mL/hr, with an optional clock completion estimate from a start time.",
  url: CANONICAL,
  applicationCategory: "MedicalApplication",
  applicationSubCategory: "IV infusion time calculator",
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

export default function MLPerHourToTimeToFinishPage() {
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
            <span className="text-gray-900">IV Infusion Time</span>
          </nav>

          <h1 className="mb-3 text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            IV Infusion Time Calculator
          </h1>

          <section id="calculator" className="mb-8 scroll-mt-24">
            <MLPerHourTimeClient />
          </section>

          <p className="mb-8 text-center text-lg leading-7 text-gray-600">
            Calculate the <strong>remaining infusion duration</strong> from volume and mL/hr, then optionally add a start time to estimate the <strong>clock completion</strong>.
          </p>

          <CalculatorContentDisclosure
            id="learning-guide"
            theme="iv"
            title="Infusion-duration and finish-time formula, examples and safety guidance"
            summary="Review volume ÷ rate, adding duration to a start time, worked examples, common mistakes, practice questions, and FAQs."
          >
          <section className="mb-10 rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6">
            <h2 className="mb-3 text-2xl font-bold text-gray-900">How to calculate IV duration and clock finish time</h2>
            <p className="mb-4 text-gray-700">
              Divide the volume still to be infused by the current hourly rate. This gives the estimated remaining duration. To estimate a clock completion, add that duration to the time the estimate starts.
            </p>
            <div className="rounded-xl border border-gray-200 bg-white p-4 text-center font-mono text-sm text-gray-800 sm:text-base">
              Time (hours) = remaining volume (mL) ÷ infusion rate (mL/hr)
              <br />
              Clock finish time = start time + remaining duration
            </div>
            <p className="mt-4 text-sm text-gray-600">
              To convert decimal hours into minutes, multiply the decimal part by 60. For example, 2.5 hours is 2 hours and 30 minutes. Clock completion is rounded to the nearest minute.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Worked example: 500 mL at 125 mL/hr from 18:30</h2>
            <div className="space-y-3 rounded-2xl border border-teal-200 bg-teal-50 p-5">
              <p className="font-semibold text-gray-900">
                Question: 500 mL remains and the infusion is running at 125 mL/hr. If the estimate starts at 18:30, what are the duration and clock finish time?
              </p>
              <div className="rounded-lg bg-white p-4 font-mono text-sm text-gray-700">
                <div>Time = volume ÷ rate</div>
                <div>Time = 500 ÷ 125</div>
                <div>Time = 4 hours</div>
                <div>Clock finish = 18:30 + 4 hours = 22:30</div>
              </div>
              <div className="rounded-lg border border-teal-200 bg-white p-3 text-sm font-semibold text-teal-800">
                Answer: approximately 4 hours, finishing at 22:30 today if the rate remains unchanged
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Common IV duration examples</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {commonExamples.map((example) => (
                <div key={`${example.volume}-${example.rate}`} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-gray-900">{example.volume} remaining</p>
                  <p className="text-xs text-gray-500">Rate: {example.rate}</p>
                  <p className="mt-2 text-lg font-bold text-teal-700">{example.result}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10 rounded-2xl border border-yellow-200 bg-yellow-50 p-5 sm:p-6">
            <div className="mb-3 flex items-start gap-2">
              <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-yellow-700" />
              <h2 className="text-2xl font-bold text-gray-900">Common infusion-time mistakes</h2>
            </div>
            <ul className="space-y-2 text-sm text-yellow-950">
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Using the original bag size instead of the volume still to be infused.</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Entering drops per minute instead of the current mL/hr rate.</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Adding the duration to the scheduled bag time instead of the time the remaining-volume estimate actually starts.</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Forgetting that pauses, occlusions, disconnections, and rate changes alter the actual completion time.</span>
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
            <h2 className="mb-4 text-2xl font-bold text-gray-900">IV infusion time FAQ</h2>
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
            title="Related IV and dilution calculators"
            description="Use these tools when infusion duration connects to drip-rate conversion, bag preparation, or dose-volume calculations."
            items={getCalculatorNetworkItems("/calculator/iv-fluids/ml-per-hour-to-time-to-finish")}
          />

          <CalculatorTrustBlock
            theme="iv"
            author={{ name: "George Lambroglou", credentials: "RN", href: "/about" }}
            lastReviewed={{ iso: UPDATED_DATE_ISO, label: UPDATED_DATE_HUMAN }}
            note="This calculator estimates infusion duration and optional clock completion from volume, rate, and start time. It does not replace the fluid or medication order, pump checks, patient assessment, local IV policy, or clinical judgement."
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
                <a
                  href="https://openstax.org/books/clinical-nursing-skills/pages/13-3-intravenous-infusion"
                  className="font-medium text-teal-700 hover:text-teal-900"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  OpenStax Clinical Nursing Skills — Intravenous Infusion
                </a>
                : IV infusion rates, pump programming, and gravity-infusion context.
              </li>
              <li>
                <a
                  href="https://learninglab.rmit.edu.au/nursing/flow-rate-formula/"
                  className="font-medium text-teal-700 hover:text-teal-900"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  RMIT Learning Lab — The flow rate formula
                </a>
                : rearranging volume, rate, and time calculations.
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
