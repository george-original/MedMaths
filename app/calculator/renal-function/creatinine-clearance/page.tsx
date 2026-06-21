import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FAQAccordion } from "@/components/faq-accordion"
import CreatinineClearanceClient from "./creatinine-clearance-client"

const CANONICAL = "https://www.medmaths.com/calculator/renal-function/creatinine-clearance"

export const metadata: Metadata = {
  title: "Creatinine Clearance Calculator | Cockcroft-Gault",
  description: "Estimate Cockcroft-Gault creatinine clearance for medication dosing using age, weight, sex, and serum creatinine in µmol/L or mg/dL.",
  keywords: ["creatinine clearance calculator", "Cockcroft-Gault calculator", "CrCl calculator", "creatinine clearance µmol/L", "creatinine clearance mg/dL", "renal dosing calculator", "crcl", "cockcroft gault", "creatinine clearance", "ml/min", "µmol/L", "umol/L", "mg/dL", "renal dosing"],
  authors: [{ name: "George Lambroglou, RN", url: "https://www.medmaths.com/about" }],
  creator: "George Lambroglou, RN",
  publisher: "MedMaths",
  alternates: { canonical: "https://www.medmaths.com/calculator/renal-function/creatinine-clearance" },
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
    title: "Creatinine Clearance Calculator | Cockcroft-Gault",
    description: "Estimate Cockcroft-Gault creatinine clearance for medication dosing using age, weight, sex, and serum creatinine in µmol/L or mg/dL.",
    url: "https://www.medmaths.com/calculator/renal-function/creatinine-clearance",
    siteName: "MedMaths",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary",
    title: "Creatinine Clearance Calculator | Cockcroft-Gault",
    description: "Estimate Cockcroft-Gault creatinine clearance for medication dosing using age, weight, sex, and serum creatinine in µmol/L or mg/dL.",
  },
}

export default function CreatinineClearancePage() {
  const faqItems = [
    {
      question: "What formula does this creatinine clearance calculator use?",
      quickAnswer: "It uses the Cockcroft-Gault equation to estimate creatinine clearance in mL/min.",
      details: [
        "SI units: CrCl = ((140 − age) × weight × sex factor) ÷ (0.814 × serum creatinine in µmol/L).",
        "US units: CrCl = ((140 − age) × weight × sex factor) ÷ (72 × serum creatinine in mg/dL).",
        "Sex factor is 1.0 for male and 0.85 for female in the equation.",
      ],
      microExample: "70 years, 80 kg, male, creatinine 120 µmol/L gives about 57 mL/min.",
    },
    {
      question: "Should I enter creatinine in µmol/L or mg/dL?",
      quickAnswer: "Use the unit shown on the pathology result. This calculator supports both µmol/L and mg/dL.",
      details: [
        "Australian pathology commonly reports serum creatinine in µmol/L.",
        "Some international references and drug resources use mg/dL.",
        "Entering the right unit is critical because the result changes dramatically if the wrong unit is selected.",
      ],
      microExample: "90 µmol/L is about 1.02 mg/dL, not 90 mg/dL.",
    },
    {
      question: "Is CrCl the same as eGFR?",
      quickAnswer: "No. CrCl and eGFR are related kidney function estimates, but they are not the same calculation.",
      details: [
        "Creatinine clearance by Cockcroft-Gault includes age, weight, sex factor, and serum creatinine.",
        "eGFR is commonly reported by laboratories and is usually indexed to body surface area.",
        "Medicine-specific dosing references may state which renal function estimate to use.",
      ],
      microExample: "A drug monograph may give dose adjustment bands by CrCl, not eGFR.",
    },
    {
      question: "Can this result decide a renal dose by itself?",
      quickAnswer: "No. Use the result as a calculation support tool, then check the drug-specific dosing reference and local policy.",
      details: [
        "Acute kidney injury, rapidly changing creatinine, extremes of body weight, and low muscle mass can make estimates less reliable.",
        "Some medicines require therapeutic drug monitoring or specialist advice.",
        "Always confirm the current renal trend and clinical context before acting on dose changes.",
      ],
      microExample: "A CrCl result may support checking the renal dose band, but it does not replace prescribing guidance.",
    },
  ]

  const breadcrumbs = [
    { name: "Home", url: "https://www.medmaths.com" },
    { name: "Calculators", url: "https://www.medmaths.com/calculators" },
    { name: "Renal Function", url: "https://www.medmaths.com/calculator/renal-function" },
    { name: "Creatinine Clearance", url: CANONICAL },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: breadcrumbs.map((b, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: b.name,
              item: b.url,
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.quickAnswer,
              },
            })),
          }),
        }}
      />
      <SiteHeader />
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-3xl px-4 pb-12 pt-4 sm:px-6 sm:py-12 lg:px-8 lg:pt-10">
          <nav className="mb-4 hidden text-sm text-gray-500 sm:block">
            <Link href="/" className="hover:text-gray-700">
              Home
            </Link>
            {" / "}
            <Link href="/calculators" className="hover:text-gray-700">
              Calculators
            </Link>
            {" / "}
            <Link href="/calculator/renal-function" className="hover:text-gray-700">
              Renal Function
            </Link>
            {" / "}
            <span className="text-gray-900">Creatinine Clearance</span>
          </nav>

          <h1 className="mb-3 text-center text-3xl font-bold sm:text-4xl tracking-tight text-gray-900">
            Creatinine Clearance Calculator
          </h1>

          {/* Calculator */}
          <section id="calculator" className="calculator-tool mb-8 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-8">
            <CreatinineClearanceClient />
          </section>
          <p className="mb-4 text-center text-xs text-gray-500">
            Written by <span className="font-semibold text-gray-700">George Lambroglou, RN</span> • Formula checked against listed references • Last reviewed 21 Jun 2026
          </p>
          <p className="mb-8 text-lg leading-relaxed text-gray-600">
            Estimate creatinine clearance (CrCl) with the Cockcroft-Gault equation for medication dosing support. Enter serum creatinine in either Australian-style µmol/L or mg/dL.
          </p>

          <section className="mb-8 rounded-lg border border-yellow-200 bg-yellow-50 p-5 text-sm leading-relaxed text-gray-800">
            <span className="font-semibold">Safety note:</span> CrCl is an estimate, not a prescribing instruction. Check the current pathology unit, renal trend, body-weight choice, acute kidney injury status, medicine-specific dosing reference, and local policy.
          </section>


          <section id="formula" className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Cockcroft-Gault formula</h2>
            <div className="space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-700">
              <p>CrCl = ((140 − age) × weight × sex factor) ÷ (72 × serum creatinine in mg/dL)</p>
              <p>CrCl = ((140 − age) × weight × sex factor) ÷ (0.814 × serum creatinine in µmol/L)</p>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              The calculator uses the SI-unit version internally when creatinine is entered in µmol/L, and converts mg/dL to µmol/L when needed. The result is shown in mL/min.
            </p>
          </section>

          <section id="examples" className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Worked examples</h2>
            <div className="space-y-5">
              <div className="rounded-lg border border-gray-200 bg-white p-5">
                <h3 className="mb-2 font-semibold text-gray-900">Example 1: µmol/L result</h3>
                <p className="text-sm leading-relaxed text-gray-700">
                  70-year-old male, 80 kg, serum creatinine 120 µmol/L: ((140 − 70) × 80 × 1.0) ÷ (0.814 × 120) = <strong>57.3 mL/min</strong>.
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-5">
                <h3 className="mb-2 font-semibold text-gray-900">Example 2: mg/dL result</h3>
                <p className="text-sm leading-relaxed text-gray-700">
                  65-year-old female, 70 kg, serum creatinine 1.2 mg/dL: ((140 − 65) × 70 × 0.85) ÷ (72 × 1.2) = <strong>51.6 mL/min</strong>.
                </p>
              </div>
            </div>
          </section>

          <section id="faqs" className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Frequently asked questions</h2>
            <FAQAccordion items={faqItems} />
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Related calculators</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              <Link href="/calculator/body-composition/ideal-body-weight" className="rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-green-300 hover:bg-green-50">
                <p className="font-medium text-gray-900">Ideal Body Weight</p>
                <p className="mt-1 text-xs text-gray-500">IBW for dosing context</p>
              </Link>
              <Link href="/calculator/body-composition/bsa" className="rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-green-300 hover:bg-green-50">
                <p className="font-medium text-gray-900">BSA Calculator</p>
                <p className="mt-1 text-xs text-gray-500">Body surface area for dosing</p>
              </Link>
              <Link href="/calculator/dose-calculations/mg-to-ml" className="rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-green-300 hover:bg-green-50">
                <p className="font-medium text-gray-900">mg to mL</p>
                <p className="mt-1 text-xs text-gray-500">Dose to liquid volume</p>
              </Link>
            </div>
          </section>

          <section id="references" className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">References</h2>
            <div className="space-y-3 text-sm leading-relaxed text-gray-700">
              <p>
                Cockcroft DW, Gault MH. Prediction of creatinine clearance from serum creatinine. Nephron. 1976;16(1):31–41.
              </p>
              <p>
                RCPA Manual. Creatinine clearance estimated: eGFR. Includes Cockcroft-Gault equation with serum creatinine in µmol/L.
              </p>
              <p>
                eviQ. Creatinine Clearance Calculator. Includes Cockcroft-Gault estimates using actual, ideal, and adjusted body weight contexts.
              </p>
              <p>
                BNF/NICE. Prescribing in renal impairment. Recommends estimating creatinine clearance for many medicine dosing decisions.
              </p>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
