import type { Metadata } from "next"
import Link from "next/link"
import { AlertTriangle, CheckCircle2, Pill } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RelatedCalculators } from "@/components/related-calculators"
import { getCalculatorNetworkItems } from "@/lib/calculator-network"
import { JsonLdSchema, generateBreadcrumbSchema } from "@/components/json-ld-schema"
import { CalculatorContentDisclosure, CalculatorTrustBlock } from "@/components/calculator"
import TabletDoseClient from "./tablet-dose-client"

const CANONICAL = "https://www.medmaths.com/calculator/tablet-dosing"
const UPDATED_DATE_ISO = "2026-07-30"
const UPDATED_DATE_HUMAN = "30 Jul 2026"

const seoKeywords = [
  "tablet dosing calculator",
  "mg to tablets calculator",
  "how many tablets to give",
  "tablet dosage calculator",
  "mg per kg to tablets",
  "weight based tablet calculator",
  "tablet calculation nursing",
  "oral medication calculator",
  "dose divided by tablet strength",
]

export const metadata: Metadata = {
  title: "Tablet Dosing Calculators | mg to Tablets & mg/kg - MedMaths",
  description:
    "Tablet dosing calculators for nurses and students. Convert a prescribed dose in mg to number of tablets, or calculate tablets from a weight-based mg/kg dose.",
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
    title: "Tablet Dosing Calculators | MedMaths",
    description: "Convert prescribed doses in mg or mg/kg to number of tablets.",
    url: CANONICAL,
    siteName: "MedMaths",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary",
    title: "Tablet Dosing Calculators | MedMaths",
    description: "Convert prescribed doses in mg or mg/kg to number of tablets.",
  },
}

const faqItems = [
  {
    question: "How do you calculate how many tablets to give?",
    answer:
      "Divide the dose ordered in milligrams by the tablet strength in milligrams per tablet. For example, 500 mg ordered and 250 mg tablets gives 500 ÷ 250 = 2 tablets.",
  },
  {
    question: "How do you calculate tablets from an mg/kg dose?",
    answer:
      "First calculate the total dose: weight in kg × dose in mg/kg. Then divide the total dose in mg by the tablet strength in mg per tablet.",
  },
  {
    question: "What is the difference between mg/kg per dose and mg/kg/day?",
    answer:
      "mg/kg per dose means each dose is calculated from weight. mg/kg/day means the total daily amount is calculated from weight and may need to be divided into the prescribed number of doses. The weight-based mode on this page expects mg/kg per dose.",
  },
  {
    question: "Can I enter weight in pounds?",
    answer:
      "The weight-based mode currently accepts kilograms. Convert pounds to kilograms by dividing the weight in pounds by 2.2 before calculating.",
  },
  {
    question: "Can a tablet calculation answer be a decimal?",
    answer:
      "Yes. The exact mathematical answer can be a decimal such as 1.5 tablets. Whether that amount is practical depends on the medicine, tablet design, product information, and local policy.",
  },
  {
    question: "What if the answer is 1.3 tablets?",
    answer:
      "A result such as 1.3 tablets is usually not a practical administration amount. Do not round it automatically. Check whether a different strength, liquid formulation, or reviewed order is required.",
  },
  {
    question: "Can all tablets be split in half?",
    answer:
      "No. Some tablets should not be split, crushed, or opened, especially modified-release, enteric-coated, unscored, combination, or dose-critical medicines. Check the product information and local policy.",
  },
  {
    question: "Should tablet calculations be rounded up or down?",
    answer:
      "Do not choose a direction simply to make the number convenient. Any rounding or formulation change should follow the prescription, available strengths, product information, pharmacist advice, and local medication policy.",
  },
]

const examples = [
  { label: "Fixed dose", calculation: "500 mg ÷ 250 mg/tablet", result: "2 tablets" },
  { label: "Fixed dose", calculation: "375 mg ÷ 250 mg/tablet", result: "1.5 tablets" },
  { label: "Fixed dose", calculation: "300 mg ÷ 250 mg/tablet", result: "1.2 tablets — awkward amount" },
  { label: "Weight based", calculation: "20 kg × 10 mg/kg = 200 mg; 200 ÷ 100", result: "2 tablets" },
  { label: "Weight based", calculation: "25 kg × 15 mg/kg = 375 mg; 375 ÷ 250", result: "1.5 tablets" },
  { label: "Weight based", calculation: "18 kg × 12.5 mg/kg = 225 mg; 225 ÷ 250", result: "0.9 tablet — awkward amount" },
]

const practiceQuestions = [
  {
    question: "Order: 750 mg. Available: 250 mg tablets. How many tablets are required?",
    answer: "750 ÷ 250 = 3 tablets.",
  },
  {
    question: "Order: 125 mg. Available: 250 mg tablets. What is the mathematical answer?",
    answer: "125 ÷ 250 = 0.5 tablet. Check whether the specific tablet can be safely split.",
  },
  {
    question: "Weight: 30 kg. Dose: 5 mg/kg per dose. Available: 150 mg tablets. How many tablets?",
    answer: "Total dose = 30 × 5 = 150 mg. Tablets = 150 ÷ 150 = 1 tablet.",
  },
  {
    question: "Weight: 18 kg. Dose: 12.5 mg/kg per dose. Available: 250 mg tablets. What issue does the result create?",
    answer: "Total dose = 225 mg. Tablets = 225 ÷ 250 = 0.9 tablet, which is an awkward amount and should not be rounded automatically.",
  },
]

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://www.medmaths.com" },
  { name: "Calculators", url: "https://www.medmaths.com/calculators" },
  { name: "Tablet Dosing", url: CANONICAL },
])

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Tablet Dosing Calculator",
  description:
    "Calculate tablet quantity from a prescribed dose in milligrams or from a weight-based mg/kg dose and tablet strength.",
  url: CANONICAL,
  applicationCategory: "MedicalApplication",
  applicationSubCategory: "Tablet dose calculator",
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

export default function TabletDosingPage() {
  return (
    <>
      <JsonLdSchema schema={breadcrumbSchema} />
      <JsonLdSchema schema={calculatorSchema} />
      <JsonLdSchema schema={faqSchema} />
      <SiteHeader />
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-3xl px-4 pb-12 pt-4 sm:px-6 sm:py-12 lg:px-8 lg:pt-10">
          <nav className="mb-4 hidden text-sm text-gray-500 sm:block" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            {" / "}
            <Link href="/calculators" className="hover:text-gray-900">Calculators</Link>
            {" / "}
            <span className="text-gray-900">Tablet Dosing</span>
          </nav>

          <h1 className="mb-3 text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Tablet Dosing Calculators
          </h1>

          <section id="calculator" className="mb-8 scroll-mt-24">
            <TabletDoseClient />
          </section>

          <p className="mb-8 text-center text-lg leading-7 text-gray-600">
            Calculate the exact tablet count from a dose already written in milligrams or from a weight-based mg/kg dose. The result includes a tablet-fraction check and does not automatically round awkward amounts.
          </p>

          <CalculatorContentDisclosure
            id="learning-guide"
            theme="tablet"
            title="Tablet formulas, examples and safety guidance"
            summary="Review fixed-dose and weight-based formulas, worked examples, tablet-splitting checks, practice questions, and FAQs."
          >
            <section className="mb-10 rounded-2xl border border-orange-100 bg-orange-50 p-6 sm:p-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">How tablet dose calculations work</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <article className="rounded-xl bg-white p-4 text-sm leading-6 text-gray-700">
                  <h3 className="font-semibold text-gray-950">Dose already in mg</h3>
                  <p className="mt-3 font-mono text-xs text-gray-800">Tablets = dose ordered (mg) ÷ tablet strength (mg/tablet)</p>
                  <p className="mt-3">Example: 750 mg ÷ 250 mg/tablet = 3 tablets.</p>
                </article>
                <article className="rounded-xl bg-white p-4 text-sm leading-6 text-gray-700">
                  <h3 className="font-semibold text-gray-950">Dose written as mg/kg</h3>
                  <div className="mt-3 space-y-1 font-mono text-xs text-gray-800">
                    <p>Total dose = weight (kg) × dose (mg/kg per dose)</p>
                    <p>Tablets = total dose ÷ tablet strength</p>
                  </div>
                  <p className="mt-3">Example: 30 kg × 10 mg/kg = 300 mg; 300 ÷ 150 = 2 tablets.</p>
                </article>
              </div>
            </section>

            <section className="mb-10 grid gap-5 md:grid-cols-3">
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <CheckCircle2 className="mb-3 h-6 w-6 text-emerald-600" />
                <h3 className="mb-2 font-semibold text-gray-900">1. Check the order</h3>
                <p className="text-sm text-gray-700">Confirm whether the dose is already in mg or written as mg/kg per dose. Do not enter an undivided mg/kg/day amount.</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <CheckCircle2 className="mb-3 h-6 w-6 text-emerald-600" />
                <h3 className="mb-2 font-semibold text-gray-900">2. Check one-tablet strength</h3>
                <p className="text-sm text-gray-700">Use the amount in one tablet, not the total amount in the packet, bottle, or blister strip.</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <CheckCircle2 className="mb-3 h-6 w-6 text-emerald-600" />
                <h3 className="mb-2 font-semibold text-gray-900">3. Check practicality</h3>
                <p className="text-sm text-gray-700">Whole, half, and quarter-tablet arithmetic still requires product and policy checks. Awkward decimals should not be rounded automatically.</p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="mb-5 text-center text-2xl font-bold text-gray-900">Common tablet calculation examples</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {examples.map((example) => (
                  <article key={`${example.label}-${example.calculation}`} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-900">
                      <Pill className="h-4 w-4 text-orange-600" />
                      {example.label}
                    </div>
                    <p className="text-sm text-gray-600">{example.calculation}</p>
                    <p className="mt-2 rounded-lg bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900">{example.result}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="mb-10 rounded-2xl border border-yellow-200 bg-yellow-50 p-6 sm:p-8">
              <div className="mb-3 flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-yellow-700" />
                <h2 className="text-2xl font-bold text-yellow-950">Tablet splitting and rounding checks</h2>
              </div>
              <div className="space-y-3 text-sm leading-relaxed text-yellow-950">
                <p>
                  The calculator shows exact arithmetic. It does not decide whether a tablet can be split, crushed, dispersed, or substituted with another formulation.
                </p>
                <p>
                  Be especially cautious with modified-release, enteric-coated, unscored, combination, friable, and dose-critical tablets. Check the product information, pharmacist advice, and local medication policy.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="mb-5 text-center text-2xl font-bold text-gray-900">Practice questions</h2>
              <div className="space-y-4">
                {practiceQuestions.map((item, index) => (
                  <details key={item.question} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <summary className="cursor-pointer font-semibold text-gray-900">{index + 1}. {item.question}</summary>
                    <p className="mt-3 text-sm leading-relaxed text-gray-700">{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <section className="mb-10">
              <h2 className="mb-5 text-center text-2xl font-bold text-gray-900">Common tablet dose questions</h2>
              <div className="space-y-4">
                {faqItems.map((item) => (
                  <article key={item.question} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <h3 className="mb-2 font-semibold text-gray-900">{item.question}</h3>
                    <p className="text-sm leading-relaxed text-gray-700">{item.answer}</p>
                  </article>
                ))}
              </div>
            </section>
          </CalculatorContentDisclosure>

          <RelatedCalculators
            theme="tablet"
            title="Related medication calculators"
            description="Use these tools when the medicine is supplied as a liquid, the order is unit based, or a body-size calculation is specifically required."
            items={getCalculatorNetworkItems("/calculator/tablet-dosing")}
          />

          <CalculatorTrustBlock
            theme="tablet"
            author={{ name: "George Lambroglou", credentials: "RN", href: "/about" }}
            lastReviewed={{ iso: UPDATED_DATE_ISO, label: UPDATED_DATE_HUMAN }}
            note="Calculator outputs support medication maths education and checking. They do not replace the medication order, maximum-dose review, product information, pharmacist advice, or local medication policy."
            className="mt-8"
          />

          <CalculatorContentDisclosure
            id="references"
            theme="tablet"
            title="References and sources"
            summary="Open the formula, educational, and tablet-safety sources used for this calculator."
            className="mb-12"
          >
            <section className="rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
              <ul className="space-y-3 text-sm leading-6 text-gray-700">
                <li>
                  <a href="https://openstax.org/books/pharmacology/pages/2-4-dosage-calculations" className="font-medium text-orange-700 hover:text-orange-900">
                    OpenStax Pharmacology for Nurses: Dosage Calculations
                  </a>{" "}
                  — desired dose, dose on hand, weight-based dosing, and amount-to-administer methods.
                </li>
                <li>
                  <a href="https://learninglab.rmit.edu.au/nursing/" className="font-medium text-orange-700 hover:text-orange-900">
                    RMIT Learning Lab: Nursing calculations
                  </a>{" "}
                  — introductory medication calculation resources.
                </li>
                <li>
                  <a href="https://australianprescriber.tg.org.au/articles/splitting-tablets-1.html" className="font-medium text-orange-700 hover:text-orange-900">
                    Australian Prescriber: Splitting tablets
                  </a>{" "}
                  — practical cautions and the need to check product information.
                </li>
                <li>
                  <a href="https://www.sps.nhs.uk/articles/checking-if-tablets-can-be-crushed-or-capsules-opened/" className="font-medium text-orange-700 hover:text-orange-900">
                    NHS Specialist Pharmacy Service: Checking if tablets can be crushed or capsules opened
                  </a>{" "}
                  — formulation checks for modified-release and other solid oral medicines.
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
