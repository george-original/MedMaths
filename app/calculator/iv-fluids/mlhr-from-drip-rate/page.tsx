import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import MlHrFromDripRateClient from "./mlhr-from-drip-rate-client"

const CANONICAL = "https://www.medmaths.com/calculator/iv-fluids/mlhr-from-drip-rate"
const UPDATED_DATE_HUMAN = "21 Jun 2026"

export const metadata: Metadata = {
  title: "gtt/min to mL/hr Calculator | IV Drip Rate Converter - MedMaths",
  description:
    "Convert a gravity IV drip rate in gtt/min back to mL/hr. Enter the observed drops per minute and your giving set drop factor to get the hourly infusion rate.",
  keywords: [
    "gtt/min to mL/hr",
    "drip rate to mL/hr",
    "drops per minute to mL/hr",
    "IV rate calculator",
    "gravity drip rate calculator",
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
    title: "gtt/min to mL/hr Calculator | MedMaths",
    description: "Convert drops per minute to an hourly IV infusion rate.",
    url: CANONICAL,
    siteName: "MedMaths",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary",
    title: "gtt/min to mL/hr Calculator | MedMaths",
    description: "Convert drops per minute to an hourly IV infusion rate.",
  },
}

export default function MlHrFromDripRatePage() {
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
            <span className="text-gray-900">gtt/min to mL/hr</span>
          </nav>

          <h1 className="mb-2 text-3xl font-bold sm:text-4xl tracking-tight text-gray-900 text-center">
            gtt/min to mL/hr Calculator
          </h1>

          <section className="calculator-tool mb-8 rounded-2xl border border-cyan-200 bg-white p-4 shadow-sm sm:p-8 mt-6">
            <MlHrFromDripRateClient />
          </section>

          <p className="text-sm text-gray-500 text-center mb-3">
            Written by <span className="font-semibold text-gray-700">George Lambroglou, RN</span> • Last reviewed {UPDATED_DATE_HUMAN}
          </p>

          <p className="mb-8 text-lg text-gray-600 text-center">
            Convert an observed gravity drip rate in drops per minute (gtt/min) back to the equivalent hourly infusion rate in mL/hr.
          </p>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 text-center">Formula</h2>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-700 text-center">
              <div>mL/hr = (gtt/min ÷ drop factor) × 60</div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 text-center">Worked Example</h2>
            <div className="rounded-lg border-l-4 border-cyan-500 bg-gray-50 p-4 mb-3">
              <p className="font-semibold text-gray-900">Observed drip rate: 40 gtt/min. Drop factor: 20 gtt/mL. What is the rate in mL/hr?</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4 font-mono text-sm text-gray-700 text-center mb-3">
              mL/min = 40 ÷ 20 = 2 mL/min<br />
              mL/hr = 2 × 60 = 120 mL/hr
            </div>
            <div className="rounded-lg bg-cyan-50 p-3 text-sm font-semibold text-gray-900 text-center">
              Answer: 120 mL/hr
            </div>
          </section>

          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-900 mb-8">
            <span className="font-semibold">Safety note:</span> Always confirm the drop factor printed on your giving set before converting. Using the wrong drop factor will give an incorrect result.
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
