import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Activity } from "lucide-react"
import type { Metadata } from "next"
import { FAQAccordion } from "@/components/faq-accordion"

export const metadata: Metadata = {
  title: "Renal Dosing Calculator | Cockcroft-Gault CrCl",
  description: "Cockcroft-Gault creatinine clearance calculator for renal dosing checks, with µmol/L and mg/dL serum creatinine support.",
  keywords: ["creatinine clearance calculator", "Cockcroft-Gault calculator", "CrCl calculator", "renal dosing calculator"],
  authors: [{ name: "George Lambroglou, RN", url: "https://www.medmaths.com/about" }],
  creator: "George Lambroglou, RN",
  publisher: "MedMaths",
  alternates: { canonical: "https://www.medmaths.com/calculator/renal-function" },
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
    title: "Renal Dosing Calculator | Cockcroft-Gault CrCl",
    description: "Cockcroft-Gault creatinine clearance calculator for renal dosing checks, with µmol/L and mg/dL serum creatinine support.",
    url: "https://www.medmaths.com/calculator/renal-function",
    siteName: "MedMaths",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary",
    title: "Renal Dosing Calculator | Cockcroft-Gault CrCl",
    description: "Cockcroft-Gault creatinine clearance calculator for renal dosing checks, with µmol/L and mg/dL serum creatinine support.",
  },
}

export default function RenalFunctionCategoryPage() {
  const calculators = [
    {
      title: "Creatinine Clearance (CrCl)",
      slug: "creatinine-clearance",
      description: "Estimate creatinine clearance using Cockcroft-Gault for medication dosing context.",
    },
  ]

  const faqItems = [
    {
      question: "Why is creatinine clearance used in medication dosing?",
      quickAnswer:
        "Some medicines are adjusted based on kidney function, and Cockcroft-Gault creatinine clearance is still commonly used in renal dosing guidance.",
      details: [
        "Creatinine clearance estimates renal drug clearance context.",
        "Some medication references specify Cockcroft-Gault CrCl rather than eGFR.",
        "Always follow the medication reference, product information, pharmacy guidance, or local policy.",
      ],
      relatedCalculators: [{ name: "Creatinine Clearance", href: "/calculator/renal-function/creatinine-clearance" }],
    },
    {
      question: "Which creatinine unit should I use?",
      quickAnswer: "Use the unit the calculator asks for and convert first if needed.",
      details: [
        "Australian labs commonly report creatinine in micromol/L (µmol/L).",
        "Some Cockcroft-Gault equations use mg/dL.",
        "Entering the wrong creatinine unit can produce a clinically misleading result.",
      ],
      relatedCalculators: [{ name: "Creatinine Clearance", href: "/calculator/renal-function/creatinine-clearance" }],
    },
    {
      question: "Which body weight should I enter?",
      quickAnswer: "Use the weight type required by the renal dosing guidance you are following.",
      details: [
        "Actual or ideal body weight may be used in different situations, depending on the dosing reference.",
        "The correct choice depends on the medication, protocol, and pharmacy guidance.",
        "If the required weight is unclear, check with pharmacy or a senior clinician.",
      ],
      relatedCalculators: [{ name: "Dosing Body Measures", href: "/calculator/body-composition" }],
    },
  ]

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Renal Dosing Support Calculators",
    description: "Creatinine clearance calculator for renal dosing context.",
    url: "https://www.medmaths.com/calculator/renal-function",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: calculators.map((calc, index) => ({
        "@type": "WebApplication",
        position: index + 1,
        name: calc.title,
        url: `https://www.medmaths.com/calculator/renal-function/${calc.slug}`,
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
            <Link href="/" className="hover:text-gray-900">
              Home
            </Link>
            {" / "}
            <Link href="/calculators" className="hover:text-gray-900">
              Calculators
            </Link>
            {" / "}
            <span className="text-gray-900">Renal Dosing Support</span>
          </nav>

          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold text-blue-700">Renal Dosing Support</h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-700">
              A focused creatinine clearance calculator for medication dosing context.
            </p>
          </div>

          <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {calculators.map((calc) => (
              <Link
                key={calc.slug}
                href={`/calculator/renal-function/${calc.slug}`}
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-lg"
              >
                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 p-3">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <h2 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-blue-700">{calc.title}</h2>
                <p className="text-sm text-gray-600">{calc.description}</p>
              </Link>
            ))}
          </div>

          <section className="mx-auto mb-12 max-w-3xl">
            <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">How renal dosing support works</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Renal function can affect medicine clearance. Some medicines need dose adjustment or closer monitoring when kidney function is reduced.
              </p>
              <p>
                This category is intentionally narrow. It keeps the focus on creatinine clearance because that is commonly used in medication dosing references.
              </p>
              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-900">
                <span className="font-semibold">Safety note:</span> Always confirm the renal dosing method required by the specific medication reference, pharmacy guidance, or local protocol.
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-3xl" id="faqs">
            <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <FAQAccordion items={faqItems} />
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
