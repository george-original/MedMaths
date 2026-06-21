import type { Metadata } from "next"
import Link from "next/link"
import { Beaker } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FAQAccordion } from "@/components/faq-accordion"

export const metadata: Metadata = {
  title: "Dilution Calculators | C1V1, Vial & Reconstitution",
  description: "Medication dilution calculators for C1V1=C2V2, vial dose to mL, and reconstitution to final IV bag concentration.",
  keywords: ["dilution calculator", "C1V1 C2V2 calculator", "reconstitution calculator", "vial dose to mL calculator", "dilution formula calculator"],
  authors: [{ name: "George Lambroglou, RN", url: "https://www.medmaths.com/about" }],
  creator: "George Lambroglou, RN",
  publisher: "MedMaths",
  alternates: { canonical: "https://www.medmaths.com/calculator/dilutions" },
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
    title: "Dilution Calculators | C1V1, Vial & Reconstitution",
    description: "Medication dilution calculators for C1V1=C2V2, vial dose to mL, and reconstitution to final IV bag concentration.",
    url: "https://www.medmaths.com/calculator/dilutions",
    siteName: "MedMaths",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary",
    title: "Dilution Calculators | C1V1, Vial & Reconstitution",
    description: "Medication dilution calculators for C1V1=C2V2, vial dose to mL, and reconstitution to final IV bag concentration.",
  },
}

const calculators = [
  {
    title: "C1V1 = C2V2 Calculator",
    slug: "c1v1-c2v2-basic",
    description: "Calculate dilution volumes using the standard concentration equation.",
  },
  {
    title: "Reconstitute to Bag Calculator",
    slug: "reconstitute-to-bag",
    description: "Calculate final bag concentration after vial reconstitution and transfer.",
  },
  {
    title: "Vial Dose to mL Calculator",
    slug: "vial-dose-to-ml",
    description: "Convert an ordered dose to draw-up volume using vial concentration.",
  },
]

const faqItems = [
  {
    question: "What does C1V1 = C2V2 mean?",
    quickAnswer: "It means concentration multiplied by volume before dilution equals concentration multiplied by volume after dilution.",
    details: [
      "C1 = starting concentration.",
      "V1 = starting volume.",
      "C2 = target concentration.",
      "V2 = final volume.",
      "The total amount of drug stays the same while volume and concentration change.",
    ],
    microExample: "50 mg/mL × 2 mL = 10 mg/mL × 10 mL",
    relatedCalculators: [{ name: "C1V1 calculator", href: "/calculator/dilutions/c1v1-c2v2-basic" }],
  },
  {
    question: "When do I use a reconstitution calculator?",
    quickAnswer: "Use it when a powder or vial is mixed with diluent and then added to a bag or final volume.",
    details: [
      "Use the total drug amount and the final volume after mixing.",
      "Do not confuse diluent volume with final volume.",
      "Check product information and pharmacy guidance for preparation rules.",
    ],
    microExample: "1000 mg added to a 250 mL bag gives 4 mg/mL if final volume is 250 mL.",
    relatedCalculators: [{ name: "Reconstitute to bag", href: "/calculator/dilutions/reconstitute-to-bag" }],
  },
  {
    question: "How do I calculate mL from a vial concentration?",
    quickAnswer: "Divide the ordered dose by the vial concentration.",
    details: [
      "Formula: mL = ordered dose ÷ concentration.",
      "Use the concentration after reconstitution if the vial has been mixed.",
      "Confirm whether the label shows mg/mL or mg per total vial.",
    ],
    microExample: "75 mg ÷ 50 mg/mL = 1.5 mL",
    relatedCalculators: [{ name: "Vial dose to mL", href: "/calculator/dilutions/vial-dose-to-ml" }],
  },
]

export default function DilutionsCategory() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Dilution and Reconstitution Calculators",
    description: "Medication dilution calculators for C1V1=C2V2, reconstitution, and vial dose to mL.",
    url: "https://www.medmaths.com/calculator/dilutions",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: calculators.map((calc, index) => ({
        "@type": "WebApplication",
        position: index + 1,
        name: calc.title,
        url: `https://www.medmaths.com/calculator/dilutions/${calc.slug}`,
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
            <span className="text-gray-900">Dilutions</span>
          </nav>

          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold text-purple-700">Dilution and Reconstitution Calculators</h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-700">
              Focused medication preparation maths for C1V1=C2V2, reconstitution, and vial dose-to-volume checks.
            </p>
          </div>

          <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {calculators.map((calc) => (
              <Link
                key={calc.slug}
                href={`/calculator/dilutions/${calc.slug}`}
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-purple-300 hover:shadow-lg"
              >
                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 p-3">
                  <Beaker className="h-6 w-6 text-white" />
                </div>
                <h2 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-purple-700">{calc.title}</h2>
                <p className="text-sm text-gray-600">{calc.description}</p>
              </Link>
            ))}
          </div>

          <section className="mx-auto mb-12 max-w-3xl">
            <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">How dilution calculations work</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Dilution and reconstitution calculations are concentration checks. The central question is how much drug is present and what final volume it is in.
              </p>
              <p>
                For medication preparation, use the exact product information, final volume, diluent instructions, and local policy. Do not assume powder volume, bag overfill, or final concentration.
              </p>
              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-900">
                <span className="font-semibold">Safety note:</span> Medication preparation can be high-risk. Use these calculators for arithmetic checking only and verify against pharmacy or local guidance.
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
