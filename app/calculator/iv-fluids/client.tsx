"use client"

import Link from "next/link"
import { Droplet } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FAQAccordion } from "@/components/faq-accordion"

const calculators = [
  {
    title: "mL/hr to gtt/min Calculator",
    slug: "drip-rate-mlhr-to-gttmin",
    description: "Convert an IV pump rate into manual drops per minute using drop factor.",
  },
  {
    title: "gtt/min to mL/hr Calculator",
    slug: "mlhr-from-drip-rate",
    description: "Convert a manual drip count back into an hourly IV rate.",
  },
  {
    title: "Infusion Time Calculator",
    slug: "ml-per-hour-to-time-to-finish",
    description: "Calculate time to finish from remaining volume and mL/hr rate.",
  },
]

const faqItems = [
  {
    question: "How do I convert mL/hr to gtt/min?",
    quickAnswer: "Divide mL/hr by 60, then multiply by the drop factor in gtt/mL.",
    details: [
      "Formula: gtt/min = (mL/hr ÷ 60) × drop factor.",
      "The drop factor is printed on the giving set, such as 10, 15, 20, or 60 gtt/mL.",
      "This is used for gravity infusions when drops are counted manually.",
    ],
    microExample: "120 mL/hr ÷ 60 = 2 mL/min; 2 × 20 gtt/mL = 40 gtt/min",
    relatedCalculators: [{ name: "mL/hr to gtt/min", href: "/calculator/iv-fluids/drip-rate-mlhr-to-gttmin" }],
  },
  {
    question: "How do I convert gtt/min to mL/hr?",
    quickAnswer: "Divide gtt/min by drop factor, then multiply by 60.",
    details: [
      "Formula: mL/hr = (gtt/min ÷ drop factor) × 60.",
      "This can help check what hourly rate a manual drip count represents.",
      "Always confirm the drop factor before converting.",
    ],
    microExample: "40 gtt/min ÷ 20 gtt/mL = 2 mL/min; 2 × 60 = 120 mL/hr",
    relatedCalculators: [{ name: "gtt/min to mL/hr", href: "/calculator/iv-fluids/mlhr-from-drip-rate" }],
  },
  {
    question: "How do I calculate infusion time?",
    quickAnswer: "Divide the remaining volume in mL by the rate in mL/hr.",
    details: [
      "Formula: time (hours) = volume remaining (mL) ÷ rate (mL/hr).",
      "Use the actual remaining volume if checking time to finish.",
      "Convert decimal hours to hours and minutes where needed.",
    ],
    microExample: "600 mL ÷ 150 mL/hr = 4 hours",
    relatedCalculators: [{ name: "Infusion time", href: "/calculator/iv-fluids/ml-per-hour-to-time-to-finish" }],
  },
]

export function IVFluidsCategoryClient() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "IV Fluids and Infusion Calculators",
    description: "Focused IV calculators for mL/hr, gtt/min, and infusion time.",
    url: "https://www.medmaths.com/calculator/iv-fluids",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: calculators.map((calc, index) => ({
        "@type": "WebApplication",
        position: index + 1,
        name: calc.title,
        url: `https://www.medmaths.com/calculator/iv-fluids/${calc.slug}`,
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
            <span className="text-gray-900">IV Fluids</span>
          </nav>

          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold text-blue-700">IV Fluids and Infusion Calculators</h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-700">
              Focused IV maths tools for converting mL/hr, drops per minute, and infusion time.
            </p>
          </div>

          <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {calculators.map((calc) => (
              <Link
                key={calc.slug}
                href={`/calculator/iv-fluids/${calc.slug}`}
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-lg"
              >
                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 p-3">
                  <Droplet className="h-6 w-6 text-white" />
                </div>
                <h2 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-blue-700">{calc.title}</h2>
                <p className="text-sm text-gray-600">{calc.description}</p>
              </Link>
            ))}
          </div>

          <section className="mx-auto mb-12 max-w-3xl">
            <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">How IV fluid calculations work</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                IV calculations usually connect three variables: volume, time, and rate. Pump calculations use mL/hr. Gravity calculations use drops per minute and the giving set drop factor.
              </p>
              <p>
                The most common safety issue is using the wrong drop factor. Always check the giving set, pump order, fluid order, and local policy before making changes.
              </p>
              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-900">
                <span className="font-semibold">Safety note:</span> IV rate changes can be clinically significant. These calculators support arithmetic checking only.
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
