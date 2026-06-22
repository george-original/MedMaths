import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import MgToTabletsClient from "./mg-to-tablets-simple-client"

const CANONICAL = "https://www.medmaths.com/calculator/tablet-dosing/mg-to-tablets"
const UPDATED_DATE_HUMAN = "21 Jun 2026"

export const metadata: Metadata = {
  title: "mg to Tablets Calculator | Oral Dose to Tablet Count - MedMaths",
  description:
    "Convert a prescribed dose in mg to the number of tablets using tablet strength (mg/tablet). Shows step-by-step working for nursing and student medication calculations.",
  keywords: [
    "mg to tablets calculator",
    "tablet calculation",
    "oral dose calculator",
    "tablet strength calculator",
    "nursing medication calculator",
    "dose to tablets",
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
    title: "mg to Tablets Calculator | MedMaths",
    description: "Convert a prescribed dose in mg to number of tablets.",
    url: CANONICAL,
    siteName: "MedMaths",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary",
    title: "mg to Tablets Calculator | MedMaths",
    description: "Convert a prescribed dose in mg to number of tablets.",
  },
}

export default function MgToTabletsPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-3xl px-4 pb-12 pt-4 sm:px-6 sm:py-12 lg:px-8 lg:pt-10">
          <nav className="mb-4 hidden text-sm text-gray-500 sm:block">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            {" / "}
            <Link href="/calculators" className="hover:text-gray-700">Calculators</Link>
            {" / "}
            <Link href="/calculator/tablet-dosing" className="hover:text-gray-700">Tablet Dosing</Link>
            {" / "}
            <span className="text-gray-900">mg to Tablets</span>
          </nav>

          <h1 className="mb-2 text-3xl font-bold sm:text-4xl tracking-tight text-gray-900 text-center">
            mg to Tablets Calculator
          </h1>

          <section className="calculator-tool mb-8 rounded-2xl border border-orange-200 bg-white p-4 shadow-sm sm:p-8 mt-6">
            <MgToTabletsClient />
          </section>

          <p className="text-sm text-gray-500 text-center mb-3">
            Written by <span className="font-semibold text-gray-700">George Lambroglou, RN</span> • Last reviewed {UPDATED_DATE_HUMAN}
          </p>

          <p className="mb-8 text-lg text-gray-600 text-center">
            Convert a prescribed dose in milligrams (mg) to the number of tablets to give, using the tablet strength printed on the packaging.
          </p>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 text-center">Formula</h2>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-700 text-center">
              <div>Tablets = Prescribed dose (mg) ÷ Tablet strength (mg/tablet)</div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 text-center">Worked Example</h2>
            <div className="rounded-lg border-l-4 border-orange-400 bg-gray-50 p-4 mb-3">
              <p className="font-semibold text-gray-900">Order: 500 mg. Tablet strength: 250 mg/tablet. How many tablets?</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4 font-mono text-sm text-gray-700 text-center mb-3">
              Tablets = 500 ÷ 250 = 2 tablets
            </div>
            <div className="rounded-lg bg-orange-50 p-3 text-sm font-semibold text-gray-900 text-center">
              Answer: 2 tablets
            </div>
          </section>

          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-900 mb-8">
            <span className="font-semibold">Note:</span> Round only per local policy. If the result is not a practical tablet count (e.g., 1.3), consider an alternative formulation or strength.
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
