import type { Metadata } from "next"
import Link from "next/link"
import { Weight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FAQAccordion } from "@/components/faq-accordion"

export const metadata: Metadata = {
  title: "Dosing Weight Calculators | BSA & Ideal Body Weight",
  description: "Dosing body measure calculators for body surface area (BSA) and ideal body weight (IBW) used in medication dosing context.",
  keywords: ["dosing body measure calculators", "BSA calculator", "ideal body weight calculator", "IBW calculator", "body surface area calculator", "body surface area", "ideal body weight", "IBW", "BSA"],
  authors: [{ name: "George Lambroglou, RN", url: "https://www.medmaths.com/about" }],
  creator: "George Lambroglou, RN",
  publisher: "MedMaths",
  alternates: { canonical: "https://www.medmaths.com/calculator/body-composition" },
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
    title: "Dosing Weight Calculators | BSA & Ideal Body Weight",
    description: "Dosing body measure calculators for body surface area (BSA) and ideal body weight (IBW) used in medication dosing context.",
    url: "https://www.medmaths.com/calculator/body-composition",
    siteName: "MedMaths",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary",
    title: "Dosing Weight Calculators | BSA & Ideal Body Weight",
    description: "Dosing body measure calculators for body surface area (BSA) and ideal body weight (IBW) used in medication dosing context.",
  },
}

const calculators = [
  {
    title: "Body Surface Area (BSA) Calculator",
    slug: "bsa",
    description: "Calculate BSA for medication dosing context using common formulas.",
  },
  {
    title: "Ideal Body Weight (IBW) Calculator",
    slug: "ideal-body-weight",
    description: "Calculate ideal body weight when a dosing reference weight is required.",
  },
]

const faqItems = [
  {
    question: "Why do medication calculations sometimes use BSA?",
    quickAnswer: "BSA estimates body surface area in square metres and is used in some medication dosing contexts.",
    details: [
      "BSA is commonly calculated from height and weight.",
      "Some medicines, especially in oncology contexts, may be dosed per square metre.",
      "Always use the formula and rounding approach required by the protocol or prescriber.",
    ],
    relatedCalculators: [{ name: "BSA Calculator", href: "/calculator/body-composition/bsa" }],
  },
  {
    question: "When is ideal body weight used?",
    quickAnswer: "IBW estimates a dosing weight based on height and sex when actual weight is not the intended dosing reference.",
    details: [
      "IBW is often used as a dosing reference in specific protocols.",
      "It should not be substituted into a formula unless the protocol asks for it.",
      "Document which weight was used when it affects a medication calculation.",
    ],
    relatedCalculators: [{ name: "IBW Calculator", href: "/calculator/body-composition/ideal-body-weight" }],
  },
  {
    question: "Should I use actual weight, BSA, or ideal body weight?",
    quickAnswer: "Use the measure specified by the medication protocol, prescriber, pharmacy guidance, or local policy.",
    details: [
      "Different medicines use different dosing measures.",
      "The wrong measure can meaningfully change the dose.",
      "Escalate to pharmacy or a senior clinician if the required measure is unclear.",
    ],
    relatedCalculators: [{ name: "Dose Calculations", href: "/calculator/dose-calculations" }],
  },
]

export default function BodyCompositionCategoryPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Dosing Body Measure Calculators",
    description: "Dosing body measure calculators for body surface area and ideal body weight.",
    url: "https://www.medmaths.com/calculator/body-composition",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: calculators.map((calc, index) => ({
        "@type": "WebApplication",
        position: index + 1,
        name: calc.title,
        url: `https://www.medmaths.com/calculator/body-composition/${calc.slug}`,
      })),
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <SiteHeader />
      <main className="min-h-screen bg-white pt-20">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <nav className="mb-6 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            {" / "}
            <Link href="/calculators" className="hover:text-gray-900">Calculators</Link>
            {" / "}
            <span className="text-gray-900">Dosing Body Measures</span>
          </nav>

          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold text-emerald-700">Dosing Body Measure Calculators</h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-700">
              Focused body-measure calculators used as medication dosing support: BSA and ideal body weight.
            </p>
          </div>

          <div className="mb-12 grid gap-6 sm:grid-cols-2">
            {calculators.map((calc) => (
              <Link
                key={calc.slug}
                href={`/calculator/body-composition/${calc.slug}`}
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-emerald-300 hover:shadow-lg"
              >
                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 p-3">
                  <Weight className="h-6 w-6 text-white" />
                </div>
                <h2 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-emerald-700">{calc.title}</h2>
                <p className="text-sm text-gray-600">{calc.description}</p>
              </Link>
            ))}
          </div>

          <section className="mx-auto mb-12 max-w-3xl">
            <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">How dosing body measures work</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Some medication calculations require a body measure rather than a simple actual weight. BSA and ideal body weight are common examples.
              </p>
              <p>
                The calculator result is only one part of the decision. The key safety step is confirming which body measure the medication protocol actually requires.
              </p>
              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-900">
                <span className="font-semibold">Safety note:</span> Do not swap actual weight, ideal body weight, or BSA unless the order, protocol, or pharmacy guidance supports it.
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-3xl" id="faq">
            <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <FAQAccordion items={faqItems} />
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
