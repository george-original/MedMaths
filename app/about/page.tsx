import type { Metadata } from "next"
import Link from "next/link"
import { BookOpenCheck, Calculator, ShieldCheck, UserRound } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "About MedMaths | Med Maths Medication Calculators",
  description: "Learn about MedMaths, also searched as Med Maths, a medication maths calculator library for dose conversions, tablets, IV rates, dilutions, BSA, IBW, and CrCl.",
  keywords: ["MedMaths", "Med Maths", "medication calculation website", "medical maths calculators"],
  authors: [{ name: "George Lambroglou, RN", url: "https://www.medmaths.com/about" }],
  creator: "George Lambroglou, RN",
  publisher: "MedMaths",
  alternates: { canonical: "https://www.medmaths.com/about" },
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
    title: "About MedMaths | Med Maths Medication Calculators",
    description: "Learn about MedMaths, also searched as Med Maths, a medication maths calculator library for dose conversions, tablets, IV rates, dilutions, BSA, IBW, and CrCl.",
    url: "https://www.medmaths.com/about",
    siteName: "MedMaths",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary",
    title: "About MedMaths | Med Maths Medication Calculators",
    description: "Learn about MedMaths, also searched as Med Maths, a medication maths calculator library for dose conversions, tablets, IV rates, dilutions, BSA, IBW, and CrCl.",
  },
}


const profileSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "About MedMaths",
  url: "https://www.medmaths.com/about",
  mainEntity: {
    "@type": "Person",
    name: "George Lambroglou",
    jobTitle: "Registered Nurse",
    url: "https://www.medmaths.com/about",
    worksFor: {
      "@type": "Organization",
      name: "MedMaths",
      url: "https://www.medmaths.com",
    },
    knowsAbout: [
      "Medication calculations",
      "Nursing medication safety",
      "Dose-to-volume calculations",
      "IV flow-rate calculations",
      "Dilution calculations",
    ],
  },
}

const principles = [
  {
    icon: Calculator,
    title: "Arithmetic first",
    description: "Each calculator focuses on a defined formula and shows the inputs, result, and working without presenting the result as a prescribing decision.",
  },
  {
    icon: BookOpenCheck,
    title: "Sources shown",
    description: "Recognised formulas and educational methods are linked to supporting references where practical so users can check the method directly.",
  },
  {
    icon: ShieldCheck,
    title: "Limits made visible",
    description: "Safety prompts explain what the calculator does not check, including medicine suitability, dose limits, compatibility, local policy, and patient-specific risk.",
  },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }} />
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
          <header className="rounded-3xl border border-cyan-100 bg-cyan-50/60 px-5 py-8 sm:px-8 sm:py-10">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-700">About the project</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl">About MedMaths</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-700">
              MedMaths is a focused medication-maths calculator library built to make common dose, tablet, IV, dilution, body-measure, and renal calculations easier to check.
            </p>
          </header>

          <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 sm:p-7">
            <div className="flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
                <UserRound className="size-5" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-950">Who writes MedMaths</h2>
                <p className="mt-3 leading-7 text-gray-700">
                  MedMaths is created and written by <strong>George Lambroglou, RN</strong>, an Australian registered nurse with clinical experience across oncology, haematology, and critical care. The site grew from the need for medication calculations that are fast to use but still show the formula, working, and important limitations.
                </p>
                <p className="mt-3 leading-7 text-gray-700">
                  A page only names a separate clinical reviewer when an independent review has actually occurred. Otherwise, the page identifies its author and review date without implying an additional reviewer.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold text-gray-950">How the calculator library is designed</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {principles.map(({ icon: Icon, title, description }) => (
                <div key={title} className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  <Icon className="size-5 text-cyan-700" aria-hidden="true" />
                  <h3 className="mt-4 font-bold text-gray-950">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-700">{description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10 space-y-4 text-gray-700">
            <h2 className="text-2xl font-bold text-gray-950">What MedMaths covers</h2>
            <p>
              The library is intentionally narrower than a general medical-calculator directory. It concentrates on medication calculation search intent where the input units, arithmetic, and output can be explained clearly.
            </p>
            <ul className="grid gap-2 sm:grid-cols-2">
              <li className="rounded-xl border border-gray-200 bg-white px-4 py-3">Dose-to-volume conversions</li>
              <li className="rounded-xl border border-gray-200 bg-white px-4 py-3">Tablet and weight-based tablet dosing</li>
              <li className="rounded-xl border border-gray-200 bg-white px-4 py-3">IV flow rates and infusion duration</li>
              <li className="rounded-xl border border-gray-200 bg-white px-4 py-3">Dilution and reconstitution arithmetic</li>
              <li className="rounded-xl border border-gray-200 bg-white px-4 py-3">BSA and ideal body weight</li>
              <li className="rounded-xl border border-gray-200 bg-white px-4 py-3">Cockcroft-Gault creatinine clearance</li>
            </ul>
          </section>

          <section className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
            <h2 className="text-xl font-bold text-amber-950">What the calculators do not do</h2>
            <p className="mt-3 text-sm leading-6 text-amber-950">
              MedMaths calculates arithmetic. It does not prescribe, confirm that a dose is clinically appropriate, identify contraindications, verify compatibility, replace product information, or override local medication policy and independent-check requirements.
            </p>
          </section>

          <section className="mt-10 grid gap-4 sm:grid-cols-3">
            <Link href="/calculators" className="rounded-2xl border border-cyan-200 bg-cyan-50 p-5 font-semibold text-cyan-800 hover:border-cyan-400">
              Browse calculators
              <span className="mt-2 block text-sm font-normal leading-6 text-gray-700">Choose from the full medication-maths directory.</span>
            </Link>
            <Link href="/editorial-policy" className="rounded-2xl border border-gray-200 bg-white p-5 font-semibold text-gray-950 hover:border-gray-400">
              Editorial policy
              <span className="mt-2 block text-sm font-normal leading-6 text-gray-700">Read how pages are sourced, reviewed, corrected, and dated.</span>
            </Link>
            <Link href="/contact" className="rounded-2xl border border-gray-200 bg-white p-5 font-semibold text-gray-950 hover:border-gray-400">
              Report an issue
              <span className="mt-2 block text-sm font-normal leading-6 text-gray-700">Send a formula correction, broken link, or safety concern.</span>
            </Link>
          </section>

          <p className="mt-8 text-sm leading-6 text-gray-600">
            Calculator inputs are processed in the browser and are not intended to be entered as identifiable patient information. Read the <Link href="/privacy" className="font-semibold text-cyan-700 hover:underline">privacy policy</Link> and <Link href="/disclaimer" className="font-semibold text-cyan-700 hover:underline">medical disclaimer</Link> for more detail.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
