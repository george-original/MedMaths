import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import MgKgToTabletsClient from "./mgkg-to-tablets-client"

const CANONICAL = "https://www.medmaths.com/calculator/tablet-dosing/mgkg-to-tablets"
const UPDATED_DATE_HUMAN = "21 Jun 2026"

export const metadata: Metadata = {
  title: "mg/kg to Tablets Calculator | Weight-Based Oral Dose - MedMaths",
  description:
    "Calculate the number of tablets from a weight-based dose (mg/kg). Enter patient weight, dose in mg/kg, and tablet strength to get both total dose and tablet count.",
  keywords: [
    "mg/kg to tablets",
    "weight based tablet calculator",
    "mg per kg oral dose",
    "paediatric tablet calculator",
    "nursing weight based dose",
    "mg kg calculator tablets",
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
    title: "mg/kg to Tablets Calculator | MedMaths",
    description: "Calculate tablets from a weight-based mg/kg dose.",
    url: CANONICAL,
    siteName: "MedMaths",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary",
    title: "mg/kg to Tablets Calculator | MedMaths",
    description: "Calculate tablets from a weight-based mg/kg dose.",
  },
}

export default function MgKgToTabletsPage() {
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
            <span className="text-gray-900">mg/kg to Tablets</span>
          </nav>

          <h1 className="mb-2 text-3xl font-bold sm:text-4xl tracking-tight text-gray-900 text-center">
            mg/kg to Tablets Calculator
          </h1>

          <section className="calculator-tool mb-8 rounded-2xl border border-orange-200 bg-white p-4 shadow-sm sm:p-8 mt-6">
            <MgKgToTabletsClient />
          </section>

          <p className="text-sm text-gray-500 text-center mb-3">
            Written by <span className="font-semibold text-gray-700">George Lambroglou, RN</span> • Last reviewed {UPDATED_DATE_HUMAN}
          </p>

          <p className="mb-8 text-lg text-gray-600 text-center">
            Calculate tablets from a weight-based oral dose. Enter the patient weight, prescribed dose in mg/kg, and tablet strength to get the total dose and tablet count.
          </p>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 text-center">Formula</h2>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-700 text-center space-y-1">
              <div>Total dose (mg) = Weight (kg) × Dose (mg/kg)</div>
              <div>Tablets = Total dose (mg) ÷ Tablet strength (mg/tablet)</div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 text-center">Worked Example</h2>
            <div className="rounded-lg border-l-4 border-orange-400 bg-gray-50 p-4 mb-3">
              <p className="font-semibold text-gray-900">Weight: 25 kg. Dose: 15 mg/kg. Tablet strength: 250 mg/tablet. How many tablets?</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4 font-mono text-sm text-gray-700 text-center mb-3">
              Total dose = 25 × 15 = 375 mg<br />
              Tablets = 375 ÷ 250 = 1.5 tablets
            </div>
            <div className="rounded-lg bg-orange-50 p-3 text-sm font-semibold text-gray-900 text-center">
              Answer: 1.5 tablets (check local policy for rounding)
            </div>
          </section>

          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-900 mb-8">
            <span className="font-semibold">Note:</span> Always check maximum dose limits for the specific drug and patient. If the result is not a practical tablet count, consider a liquid formulation.
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
