import type { Metadata } from "next"
import Link from "next/link"
import { AlertTriangle, CircleCheck, ExternalLink } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Medical Disclaimer | MedMaths Calculators",
  description: "Medical disclaimer for MedMaths medication maths calculators. Use for education and arithmetic support only, not as a substitute for clinical judgement.",
  keywords: ["MedMaths medical disclaimer"],
  authors: [{ name: "George Lambroglou, RN", url: "https://www.medmaths.com/about" }],
  creator: "George Lambroglou, RN",
  publisher: "MedMaths",
  alternates: { canonical: "https://www.medmaths.com/disclaimer" },
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
    title: "Medical Disclaimer | MedMaths Calculators",
    description: "Medical disclaimer for MedMaths medication maths calculators. Use for education and arithmetic support only, not as a substitute for clinical judgement.",
    url: "https://www.medmaths.com/disclaimer",
    siteName: "MedMaths",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary",
    title: "Medical Disclaimer | MedMaths Calculators",
    description: "Medical disclaimer for MedMaths medication maths calculators. Use for education and arithmetic support only, not as a substitute for clinical judgement.",
  },
}

const mustCheck = [
  "The original medication or fluid order",
  "The medicine name, formulation, concentration, and product label",
  "Patient-specific factors, contraindications, allergies, and current clinical status",
  "Maximum doses, dose frequency, renal or hepatic guidance, and protocol-specific limits",
  "Compatibility, stability, route, device, preparation technique, and administration requirements",
  "Local policy, independent double-check requirements, and escalation pathways",
]

export default function DisclaimerPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
          <header>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-red-700">Important safety information</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl">Medical Disclaimer</h1>
            <p className="mt-4 text-sm font-semibold text-gray-600">Last reviewed: 11 July 2026</p>
          </header>

          <section className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 sm:p-7">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 size-6 shrink-0 text-red-700" aria-hidden="true" />
              <div>
                <h2 className="text-xl font-bold text-red-950">Do not use a calculator result as the sole basis for patient care</h2>
                <p className="mt-3 leading-7 text-red-950">
                  MedMaths calculators provide arithmetic support and educational working. They do not provide medical advice, prescribe or validate a dose, confirm that a medicine is appropriate, or replace assessment by a qualified health professional.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 sm:p-7">
            <h2 className="text-2xl font-bold text-gray-950">Before acting on any result</h2>
            <ul className="mt-4 space-y-3">
              {mustCheck.map((item) => (
                <li key={item} className="flex gap-3 text-gray-700">
                  <CircleCheck className="mt-0.5 size-5 shrink-0 text-cyan-700" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <section className="rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6">
              <h2 className="text-xl font-bold text-gray-950">Accuracy and limitations</h2>
              <p className="mt-3 text-sm leading-6 text-gray-700">
                Reasonable care is taken when building and checking calculators, but software defects, transcription errors, outdated links, misunderstood inputs, and inappropriate application of a formula can still occur. Results must be independently verified against current authoritative guidance.
              </p>
            </section>
            <section className="rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6">
              <h2 className="text-xl font-bold text-gray-950">Population formulas</h2>
              <p className="mt-3 text-sm leading-6 text-gray-700">
                Formulas such as body surface area, ideal body weight, and Cockcroft-Gault creatinine clearance are estimates. They may be unsuitable or require modified interpretation for particular patients, body sizes, ages, pregnancies, dialysis states, or rapidly changing clinical conditions.
              </p>
            </section>
            <section className="rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6">
              <h2 className="text-xl font-bold text-gray-950">External resources</h2>
              <p className="mt-3 text-sm leading-6 text-gray-700">
                External links are provided for transparency and education. MedMaths does not control their availability, updates, or clinical governance and does not endorse every statement on a linked website.
              </p>
            </section>
            <section className="rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6">
              <h2 className="text-xl font-bold text-gray-950">Use and responsibility</h2>
              <p className="mt-3 text-sm leading-6 text-gray-700">
                Users remain responsible for checking inputs, units, results, and clinical applicability. To the extent permitted by law, MedMaths does not accept liability for loss or harm arising from reliance on, misuse of, or inability to access the site.
              </p>
            </section>
          </div>

          <section className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
            <h2 className="text-xl font-bold text-amber-950">Medical emergency</h2>
            <p className="mt-3 text-sm leading-6 text-amber-950">
              Do not use MedMaths for emergency assessment or treatment. In Australia, call <strong>Triple Zero (000)</strong> for a serious or urgent emergency, or attend the nearest emergency department. Outside Australia, use your local emergency number.
            </p>
            <a
              href="https://www.healthdirect.gov.au/calling-triple-zero"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-950 underline underline-offset-4"
            >
              Healthdirect guidance on calling Triple Zero <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
          </section>

          <section className="mt-8 text-sm leading-6 text-gray-700">
            <h2 className="text-xl font-bold text-gray-950">Corrections and contact</h2>
            <p className="mt-3">
              Report an incorrect result, unclear warning, broken reference, or other safety concern through the <Link href="/contact" className="font-semibold text-cyan-700 hover:underline">contact page</Link> or email <a href="mailto:medmaths.calc@gmail.com" className="font-semibold text-cyan-700 hover:underline">medmaths.calc@gmail.com</a>.
            </p>
            <p className="mt-3">This disclaimer may be updated as the site, calculator library, or legal requirements change.</p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
