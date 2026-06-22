import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import DripRateMlHrToGttMinClient from "./drip-rate-mlhr-to-gttmin-client"

const CANONICAL = "https://www.medmaths.com/calculator/iv-fluids/drip-rate-mlhr-to-gttmin"
const UPDATED_DATE_HUMAN = "21 Jun 2026"

export const metadata: Metadata = {
  title: "Drip Rate Calculator: mL/hr to gtt/min | IV Infusion Rate Converter - MedMaths",
  description:
    "Convert IV infusion rate from mL/hr to gravity drip rate (gtt/min). Supports all drop factors: 10, 15, 20, 60 gtt/mL. Shows step-by-step working.",
  keywords: [
    "drip rate calculator",
    "IV drip rate",
    "mL/hr to gtt/min",
    "infusion rate calculator",
    "gravity drip calculator",
    "drop factor calculator",
    "IV rate conversion",
    "drops per minute calculator",
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
    title: "Drip Rate Calculator: mL/hr to gtt/min | MedMaths",
    description: "Convert IV infusion rates to gravity drip rates. Free calculator for healthcare professionals.",
    url: CANONICAL,
    siteName: "MedMaths",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary",
    title: "Drip Rate Calculator: mL/hr to gtt/min | MedMaths",
    description: "Convert IV infusion rates to gravity drip rates. Free calculator for healthcare professionals.",
  },
}

export default function DripRateMlHrToGttMinPage() {
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
            <span className="text-gray-900">mL/hr to gtt/min</span>
          </nav>

          <h1 className="mb-2 text-3xl font-bold sm:text-4xl tracking-tight text-gray-900 text-center">
            Drip Rate Calculator: mL/hr to gtt/min
          </h1>

          <section className="calculator-tool mb-8 rounded-2xl border border-cyan-200 bg-white p-4 shadow-sm sm:p-8 mt-6">
            <DripRateMlHrToGttMinClient />
          </section>

          <p className="text-sm text-gray-500 text-center mb-3">
            Written by <span className="font-semibold text-gray-700">George Lambroglou, RN</span> • Last reviewed {UPDATED_DATE_HUMAN}
          </p>

          <p className="mb-8 text-lg text-gray-600 text-center">
            Convert an IV infusion rate in mL/hr into a gravity drip rate in drops per minute (gtt/min). Enter the rate and select your giving set drop factor.
          </p>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 text-center">Formula</h2>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-700 text-center">
              <div>gtt/min = (mL/hr ÷ 60) × drop factor</div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 text-center">Worked Example</h2>
            <div className="rounded-lg border-l-4 border-cyan-500 bg-gray-50 p-4 mb-3">
              <p className="font-semibold text-gray-900">Order: 120 mL/hr. Drop factor: 20 gtt/mL. What is the drip rate?</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4 font-mono text-sm text-gray-700 text-center mb-3">
              mL/min = 120 ÷ 60 = 2 mL/min<br />
              gtt/min = 2 × 20 = 40 gtt/min
            </div>
            <div className="rounded-lg bg-cyan-50 p-3 text-sm font-semibold text-gray-900 text-center">
              Answer: 40 gtt/min
            </div>
          </section>

          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-900 mb-8">
            <span className="font-semibold">Safety note:</span> Always confirm the drop factor printed on your giving set, the IV order, and local protocol before adjusting a gravity infusion.
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
