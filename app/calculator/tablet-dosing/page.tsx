import type { Metadata } from "next"
import Link from "next/link"
import { Pill } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const CANONICAL = "https://www.medmaths.com/calculator/tablet-dosing"

export const metadata: Metadata = {
  title: "Tablet Dosing Calculators | mg to Tablets & mg/kg - MedMaths",
  description:
    "Tablet dosing calculators for nurses and students. Convert a prescribed dose in mg to number of tablets, or calculate tablets from a weight-based mg/kg dose.",
  keywords: [
    "tablet dosing calculator",
    "mg to tablets",
    "mg per kg to tablets",
    "tablet calculation nursing",
    "oral medication calculator",
  ],
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

const calculators = [
  {
    title: "mg to Tablets Calculator",
    slug: "mg-to-tablets",
    description: "Convert a flat prescribed dose in mg into the number of tablets using tablet strength.",
  },
  {
    title: "mg/kg to Tablets Calculator",
    slug: "mgkg-to-tablets",
    description: "Calculate tablets from a weight-based dose (mg/kg) and patient weight.",
  },
]

export default function TabletDosingPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-white pt-20">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <nav className="mb-6 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            {" / "}
            <Link href="/calculators" className="hover:text-gray-900">Calculators</Link>
            {" / "}
            <span className="text-gray-900">Tablet Dosing</span>
          </nav>

          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold text-orange-600">Tablet Dosing Calculators</h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-700">
              Calculate the number of tablets to give from a prescribed dose in mg or a weight-based dose in mg/kg.
            </p>
          </div>

          <div className="mb-12 grid gap-6 sm:grid-cols-2">
            {calculators.map((calc) => (
              <Link
                key={calc.slug}
                href={`/calculator/tablet-dosing/${calc.slug}`}
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-orange-300 hover:shadow-lg"
              >
                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 to-amber-600 p-3">
                  <Pill className="h-6 w-6 text-white" />
                </div>
                <h2 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-orange-600">{calc.title}</h2>
                <p className="text-sm text-gray-600">{calc.description}</p>
              </Link>
            ))}
          </div>

          <section className="mx-auto mb-12 max-w-3xl">
            <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">How tablet dosing calculations work</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Tablet calculations follow a simple formula: divide the prescribed dose (mg) by the tablet strength (mg/tablet). The result tells you how many tablets to give.
              </p>
              <p>
                For weight-based doses, first multiply the patient weight (kg) by the dose per kilogram (mg/kg) to get the total dose in mg, then divide by tablet strength.
              </p>
              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-900">
                <span className="font-semibold">Safety note:</span> The mathematical result may not always be a whole or half tablet. Always check local policy on allowable rounding and whether a liquid formulation is more appropriate.
              </div>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
