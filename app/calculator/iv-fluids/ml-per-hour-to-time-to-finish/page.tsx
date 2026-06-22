import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import MLPerHourTimeClient from "./ml-per-hour-time-client"

const CANONICAL = "https://www.medmaths.com/calculator/iv-fluids/ml-per-hour-to-time-to-finish"
const UPDATED_DATE_HUMAN = "21 Jun 2026"

export const metadata: Metadata = {
  title: "IV Infusion Time Calculator: Volume ÷ mL/hr | MedMaths",
  description:
    "Calculate how long an IV infusion will take to finish. Enter the remaining volume in mL and the infusion rate in mL/hr to get time in hours and minutes.",
  keywords: [
    "infusion time calculator",
    "IV time to finish",
    "mL/hr to time",
    "IV bag finish time",
    "infusion duration calculator",
    "nursing IV calculator",
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
    title: "IV Infusion Time Calculator | MedMaths",
    description: "Calculate how long an IV infusion will take from volume and rate.",
    url: CANONICAL,
    siteName: "MedMaths",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary",
    title: "IV Infusion Time Calculator | MedMaths",
    description: "Calculate how long an IV infusion will take from volume and rate.",
  },
}

export default function MLPerHourToTimeToFinishPage() {
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
            <Link href="/calculator/iv-fluids" className="hover:text-gray-700">IV Fluids</Link>
            {" / "}
            <span className="text-gray-900">Infusion Time</span>
          </nav>

          <h1 className="mb-2 text-3xl font-bold sm:text-4xl tracking-tight text-gray-900 text-center">
            IV Infusion Time Calculator
          </h1>

          <section className="calculator-tool mb-8 rounded-2xl border border-cyan-200 bg-white p-4 shadow-sm sm:p-8 mt-6">
            <MLPerHourTimeClient />
          </section>

          <p className="text-sm text-gray-500 text-center mb-3">
            Written by <span className="font-semibold text-gray-700">George Lambroglou, RN</span> • Last reviewed {UPDATED_DATE_HUMAN}
          </p>

          <p className="mb-8 text-lg text-gray-600 text-center">
            Calculate how long an IV infusion will take to finish. Enter the remaining volume in mL and the infusion rate in mL/hr.
          </p>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 text-center">Formula</h2>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-700 text-center">
              <div>Time (hours) = Volume (mL) ÷ Rate (mL/hr)</div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 text-center">Worked Example</h2>
            <div className="rounded-lg border-l-4 border-cyan-500 bg-gray-50 p-4 mb-3">
              <p className="font-semibold text-gray-900">500 mL remaining at 125 mL/hr. How long until finished?</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4 font-mono text-sm text-gray-700 text-center mb-3">
              Time = 500 ÷ 125 = 4.0 hours = 4h 0m
            </div>
            <div className="rounded-lg bg-cyan-50 p-3 text-sm font-semibold text-gray-900 text-center">
              Answer: 4 hours 0 minutes
            </div>
          </section>

          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-900 mb-8">
            <span className="font-semibold">Note:</span> Use the actual remaining volume in the bag, not the original bag size, for an accurate finish time.
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
