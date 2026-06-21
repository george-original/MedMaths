import type { Metadata } from "next"
import Link from "next/link"
import { Syringe } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FAQAccordion } from "@/components/faq-accordion"

export const metadata: Metadata = {
  title: "Dose Calculation Calculators | mg to mL & mg/kg",
  description: "Dose calculation calculators for medicine volume, mg to mL, mg/kg to mL, and units to mL conversions with formulas and worked examples.",
  keywords: ["dose calculation calculators", "mg to mL calculator", "mg/kg to mL calculator", "units to mL calculator", "dose to volume calculator"],
  authors: [{ name: "George Lambroglou, RN", url: "https://www.medmaths.com/about" }],
  creator: "George Lambroglou, RN",
  publisher: "MedMaths",
  alternates: { canonical: "https://www.medmaths.com/calculator/dose-calculations" },
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
    title: "Dose Calculation Calculators | mg to mL & mg/kg",
    description: "Dose calculation calculators for medicine volume, mg to mL, mg/kg to mL, and units to mL conversions with formulas and worked examples.",
    url: "https://www.medmaths.com/calculator/dose-calculations",
    siteName: "MedMaths",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary",
    title: "Dose Calculation Calculators | mg to mL & mg/kg",
    description: "Dose calculation calculators for medicine volume, mg to mL, mg/kg to mL, and units to mL conversions with formulas and worked examples.",
  },
}

const calculators = [
  {
    title: "mg to mL Calculator",
    slug: "mg-to-ml",
    description: "Convert a medicine dose in mg to a measurable mL volume using concentration.",
  },
  {
    title: "mg/kg to mL Dose Calculator",
    slug: "mgkg-to-ml-dose",
    description: "Convert a weight-based dose into total mg and liquid volume per dose.",
  },
  {
    title: "Units to mL Calculator",
    slug: "units-to-ml",
    description: "Convert unit-based medicine orders into mL using units/mL concentration.",
  },
]

const faqItems = [
  {
    question: "How do I convert mg to mL?",
    quickAnswer: "Divide the ordered dose in mg by the medication concentration in mg/mL.",
    details: [
      "Formula: mL = dose (mg) ÷ concentration (mg/mL).",
      "The ordered dose comes from the prescription or medication order.",
      "The concentration comes from the vial, ampoule, bottle, or bag label.",
    ],
    microExample: "250 mg ÷ 50 mg/mL = 5 mL",
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
    microExample: "8 mg/kg × 25 kg = 200 mg; 200 mg ÷ 50 mg/mL = 4 mL",
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
    microExample: "25 units ÷ 100 units/mL = 0.25 mL",
    relatedCalculators: [{ name: "Units to mL calculator", href: "/calculator/dose-calculations/units-to-ml" }],
  },
  {
    question: "What is the safest way to use dose calculators?",
    quickAnswer: "Use the calculator to check arithmetic, then verify the order, product, units, route, and local policy.",
    details: [
      "Check for mg vs mcg errors.",
      "Confirm whether the label is written as mg/mL or mg per X mL.",
      "Use independent double checks for high-risk medicines where required.",
    ],
    microExample: "A mg/mcg unit mistake can cause a 1000-fold error.",
  },
]

export default function DoseCalculationsPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Dose Calculation Calculators",
    description: "Medication dose calculators for mg to mL, mg/kg to mL, and units to mL.",
    url: "https://www.medmaths.com/calculator/dose-calculations",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: calculators.map((calc, index) => ({
        "@type": "WebApplication",
        position: index + 1,
        name: calc.title,
        url: `https://www.medmaths.com/calculator/dose-calculations/${calc.slug}`,
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
            <span className="text-gray-900">Dose Calculations</span>
          </nav>

          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold text-cyan-700">Dose Calculation Calculators</h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-700">
              Focused medication dose tools for converting orders into measurable amounts: mg to mL, mg/kg to mL, and units to mL.
            </p>
          </div>

          <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {calculators.map((calc) => (
              <Link
                key={calc.slug}
                href={`/calculator/dose-calculations/${calc.slug}`}
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-cyan-300 hover:shadow-lg"
              >
                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 p-3">
                  <Syringe className="h-6 w-6 text-white" />
                </div>
                <h2 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-cyan-700">{calc.title}</h2>
                <p className="text-sm text-gray-600">{calc.description}</p>
              </Link>
            ))}
          </div>

          <section className="mx-auto mb-12 max-w-3xl">
            <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">How dose calculations work</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Dose calculations convert the ordered amount into a measurable amount to prepare or administer. The key is matching the order units to the product strength on the label.
              </p>
              <p>
                For liquid medicines, the most common bridge is concentration. If the order is in mg and the label is in mg/mL, divide the dose by the concentration. If the order is in units and the label is in units/mL, use the same principle with units.
              </p>
              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-900">
                <span className="font-semibold">Safety note:</span> These calculators support arithmetic checking only. Always verify the medication order, product label, route, concentration, patient factors, and local policy.
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-3xl" id="faq">
            <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <FAQAccordion items={faqItems} showProtocolNote={false} />
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
