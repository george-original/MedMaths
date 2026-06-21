import type { Metadata } from "next"
// app/calculator/dose-calculations/mgkg-to-ml-dose/page.tsx
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FAQAccordion } from "@/components/faq-accordion"
import MgKgToMlDoseClient from "./mgkg-to-ml-dose-client"

export const metadata: Metadata = {
  title: "mg/kg to mL Calculator | Weight-Based Liquid Dose",
  description: "Convert a mg/kg medicine order into total mg and mL using patient weight and medication concentration. Includes formula and worked examples.",
  keywords: ["mg/kg to mL calculator", "mg per kg to ml calculator", "weight based dose calculator", "paediatric dose calculator", "liquid medicine dose calculator", "mg/kg dose volume", "mg/kg", "mg per kg", "weight based", "dose volume", "liquid dose"],
  authors: [{ name: "George Lambroglou, RN", url: "https://www.medmaths.com/about" }],
  creator: "George Lambroglou, RN",
  publisher: "MedMaths",
  alternates: { canonical: "https://www.medmaths.com/calculator/dose-calculations/mgkg-to-ml-dose" },
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
    title: "mg/kg to mL Calculator | Weight-Based Liquid Dose",
    description: "Convert a mg/kg medicine order into total mg and mL using patient weight and medication concentration. Includes formula and worked examples.",
    url: "https://www.medmaths.com/calculator/dose-calculations/mgkg-to-ml-dose",
    siteName: "MedMaths",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary",
    title: "mg/kg to mL Calculator | Weight-Based Liquid Dose",
    description: "Convert a mg/kg medicine order into total mg and mL using patient weight and medication concentration. Includes formula and worked examples.",
  },
}

export default function MgKgToMlDosePage() {
  const faqItems = [
    {
      question: "What does mg/kg mean?",
      quickAnswer: "mg/kg means milligrams of medication per kilogram of body weight.",
      details: [
        "It is a weight-based dosing method (common in paediatrics and some adult meds).",
        "The ordered number is multiplied by the patient’s weight (kg) to get total mg.",
        "Example: 10 mg/kg for a 70 kg patient = 700 mg total dose.",
      ],
      microExample: "10 mg/kg × 18 kg = 180 mg",
    },
    {
      question: "How do I convert mg/kg to mL?",
      quickAnswer: "Convert mg/kg → total mg, then divide by concentration (mg/mL).",
      details: [
        "Step 1: Total dose (mg) = (mg/kg) × weight (kg).",
        "Step 2: Volume (mL) = total mg ÷ (mg/mL).",
        "This calculator does both steps automatically.",
      ],
      microExample: "(10 mg/kg × 70 kg) ÷ 50 mg/mL = 14 mL",
    },
    {
      question: "What if the label says mg per 5 mL?",
      quickAnswer: "Convert it to mg/mL first by dividing mg by the volume (mL).",
      details: [
        "Example label: 250 mg in 5 mL.",
        "Convert: 250 ÷ 5 = 50 mg/mL.",
        "Then use 50 mg/mL for the dose-to-volume step.",
      ],
      microExample: "400 mg in 8 mL → 400 ÷ 8 = 50 mg/mL",
    },
    {
      question: "Should I round the final mL?",
      quickAnswer: "Round to your syringe/administration device markings and local policy.",
      details: [
        "For small volumes, rounding can meaningfully change the dose delivered.",
        "A 1 mL syringe may be marked in 0.01–0.1 mL increments depending on type.",
        "Use the rounding selector to match your required precision.",
      ],
      microExample: "1.125 mL → 1.13 mL (2 decimals) or 1.1 mL (1 decimal)",
    },
    {
      question: "Why is mg/kg used so often in paediatrics?",
      quickAnswer: "Because children’s dosing often scales with body size to improve safety and accuracy.",
      details: [
        "Many paediatric doses are prescribed per kg to individualise dosing.",
        "Always confirm the patient weight is current and in kilograms.",
        "Check maximum dose limits where applicable.",
      ],
      microExample: "Dose ordered: 0.2 mg/kg with a max 10 mg total",
    },
    {
      question: "Why might my answer differ from another calculator?",
      quickAnswer: "Differences usually come from rounding, units, or whether the tool includes the mg/kg step.",
      details: [
        "Ensure weight is entered in kg (not lb).",
        "Verify the concentration is in mg/mL (not mg per 5 mL).",
        "Compare rounding settings across tools.",
      ],
      microExample: "14.0 mL vs 13.98 mL (rounding differences)",
    },
  ]

  const breadcrumbs = [
    { name: "Home", url: "https://www.medmaths.com" },
    { name: "Calculators", url: "https://www.medmaths.com/calculators" },
    { name: "Dose Calculations", url: "https://www.medmaths.com/calculator/dose-calculations" },
    { name: "mg/kg to mL", url: "https://www.medmaths.com/calculator/dose-calculations/mgkg-to-ml-dose" },
  ]

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: [item.quickAnswer, ...(item.details ?? []).map((d) => `• ${d}`)].join("\n"),
      },
    })),
  }

  return (
    <>
      {/* Breadcrumb schema */}
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

      {/* FAQ schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* WebApplication schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "mg/kg to mL Calculator (per dose)",
            description:
              "Convert a weight-based dose (mg/kg) into millilitres (mL) using medication concentration (mg/mL).",
            applicationCategory: "MedicalApplication",
            operatingSystem: "Web",
            url: "https://www.medmaths.com/calculator/dose-calculations/mgkg-to-ml-dose",
          }),
        }}
      />

      <SiteHeader />

      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-3xl px-4 pb-12 pt-4 sm:px-6 sm:py-12 lg:px-8 lg:pt-10">
          {/* Breadcrumb navigation */}
          <nav className="mb-4 hidden text-sm text-gray-500 sm:block">
            <Link href="/" className="hover:text-gray-700">
              Home
            </Link>
            {" / "}
            <Link href="/calculators" className="hover:text-gray-700">
              Calculators
            </Link>
            {" / "}
            <Link href="/calculator/dose-calculations" className="hover:text-gray-700">
              Dose Calculations
            </Link>
            {" / "}
            <span className="text-gray-900">mg/kg to mL</span>
          </nav>

          <h1 className="mb-2 text-3xl font-bold sm:text-4xl tracking-tight text-gray-900 text-center">mg/kg to mL Calculator</h1>

          {/* Calculator */}
          <section id="calculator" className="calculator-tool mb-8 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-8">
            <MgKgToMlDoseClient />
          </section>
          <p className="mb-4 text-center text-xs text-gray-500">
            Written by <span className="font-semibold text-gray-700">George Lambroglou, RN</span> • Formula checked against listed references • Last reviewed 21 Jun 2026
          </p>
          <p className="mb-8 text-lg text-gray-600 text-center">
            Convert an ordered dose in <span className="font-medium text-gray-900">mg/kg</span> into a measurable volume
            in <span className="font-medium text-gray-900">mL</span> using medication concentration (mg/mL).
          </p>

          <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
            <span className="text-sm text-gray-600">Jump to:</span>
            <a href="#calculator" className="text-cyan-600 hover:text-cyan-700 font-medium text-sm">
              Calculator
            </a>
            <span className="text-gray-300">|</span>
            <a href="#how-it-works" className="text-cyan-600 hover:text-cyan-700 font-medium text-sm">
              How it works
            </a>
            <span className="text-gray-300">|</span>
            <a href="#formula" className="text-cyan-600 hover:text-cyan-700 font-medium text-sm">
              Formula
            </a>
            <span className="text-gray-300">|</span>
            <a href="#examples" className="text-cyan-600 hover:text-cyan-700 font-medium text-sm">
              Examples
            </a>
            <span className="text-gray-300">|</span>
            <a href="#faqs" className="text-cyan-600 hover:text-cyan-700 font-medium text-sm">
              FAQs
            </a>
            <span className="text-gray-300">|</span>
            <a href="#references" className="text-cyan-600 hover:text-cyan-700 font-medium text-sm">
              References & Sources
            </a>
          </div>

          {/* Calculator (client only) */}
          

          {/* How it works */}
          <section id="how-it-works" className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">How mg/kg to mL Conversion Works</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                A <span className="font-medium text-gray-900">mg/kg</span> order means the dose depends on patient
                weight. First, multiply the ordered dose (mg/kg) by the patient’s weight (kg) to calculate the{" "}
                <span className="font-medium text-gray-900">total dose in mg</span>.
              </p>
              <p>
                Once you know the total mg, you convert it to a measurable volume by dividing by the medication
                concentration (<span className="font-medium text-gray-900">mg/mL</span>). If the label is written as{" "}
                “mg per X mL” (e.g., 250 mg per 5 mL), convert it to mg/mL first by dividing mg by mL.
              </p>
            </div>
          </section>

          {/* Formula */}
          <section id="formula" className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">Formula</h2>

            <div className="space-y-3">
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-700 text-center">
                <div>Total mg = (mg/kg) × kg</div>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-700 text-center">
                <div>mL = Total mg ÷ (mg/mL)</div>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-700 text-center">
                <div>mL = (mg/kg × kg) ÷ (mg/mL)</div>
              </div>
            </div>
          </section>

          {/* Worked examples */}
          <section id="examples" className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">Worked Examples</h2>

            <div className="space-y-6">
              {/* Example 1 */}
              <div>
                <div className="mb-4 rounded-lg border-l-4 border-cyan-500 bg-amber-50 p-4">
                  <p className="font-semibold text-gray-900">
                    Example 1: Order 10 mg/kg. Weight 70 kg. Concentration 50 mg/mL. How many mL?
                  </p>
                </div>

                <div className="mb-3 rounded-lg bg-gray-50 p-4 font-mono text-sm text-gray-700 text-center">
                  Total mg = 10 × 70 = 700 mg
                  <br />
                  mL = 700 ÷ 50 = 14 mL
                </div>

                <div className="space-y-2">
                  <div className="flex gap-3">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-cyan-600 text-sm font-bold text-white">
                      1
                    </div>
                    <p className="text-sm font-semibold text-gray-900">Total dose = 10 mg/kg × 70 kg = 700 mg</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-cyan-600 text-sm font-bold text-white">
                      2
                    </div>
                    <p className="text-sm font-semibold text-gray-900">Volume = 700 mg ÷ 50 mg/mL = 14 mL</p>
                  </div>
                </div>

                <div className="mt-3 rounded-lg bg-cyan-50 p-3 text-sm font-semibold text-gray-900 text-center">
                  Answer: 14 mL
                </div>
              </div>

              {/* Example 2 */}
              <div>
                <div className="mb-4 rounded-lg border-l-4 border-cyan-500 bg-amber-50 p-4">
                  <p className="font-semibold text-gray-900">
                    Example 2: Order 15 mg/kg. Weight 18 kg. Label 250 mg in 5 mL. How many mL?
                  </p>
                </div>

                <div className="mb-3 rounded-lg bg-gray-50 p-4 font-mono text-sm text-gray-700 text-center">
                  Convert label: 250 ÷ 5 = 50 mg/mL
                  <br />
                  Total mg = 15 × 18 = 270 mg
                  <br />
                  mL = 270 ÷ 50 = 5.4 mL
                </div>

                <div className="space-y-2">
                  <div className="flex gap-3">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-cyan-600 text-sm font-bold text-white">
                      1
                    </div>
                    <p className="text-sm font-semibold text-gray-900">Concentration = 250 mg ÷ 5 mL = 50 mg/mL</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-cyan-600 text-sm font-bold text-white">
                      2
                    </div>
                    <p className="text-sm font-semibold text-gray-900">Total dose = 15 mg/kg × 18 kg = 270 mg</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-cyan-600 text-sm font-bold text-white">
                      3
                    </div>
                    <p className="text-sm font-semibold text-gray-900">Volume = 270 mg ÷ 50 mg/mL = 5.4 mL</p>
                  </div>
                </div>

                <div className="mt-3 rounded-lg bg-cyan-50 p-3 text-sm font-semibold text-gray-900 text-center">
                  Answer: 5.4 mL
                </div>
              </div>

              {/* Example 3 */}
              <div>
                <div className="mb-4 rounded-lg border-l-4 border-cyan-500 bg-amber-50 p-4">
                  <p className="font-semibold text-gray-900">
                    Example 3: Order 2.5 mg/kg. Weight 18 kg. Concentration 40 mg/mL. How many mL?
                  </p>
                </div>

                <div className="mb-3 rounded-lg bg-gray-50 p-4 font-mono text-sm text-gray-700 text-center">
                  Total mg = 2.5 × 18 = 45 mg
                  <br />
                  mL = 45 ÷ 40 = 1.125 mL
                  <br />
                  Rounded (2 decimals) = 1.13 mL
                </div>

                <div className="space-y-2">
                  <div className="flex gap-3">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-cyan-600 text-sm font-bold text-white">
                      1
                    </div>
                    <p className="text-sm font-semibold text-gray-900">Total dose = 2.5 mg/kg × 18 kg = 45 mg</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-cyan-600 text-sm font-bold text-white">
                      2
                    </div>
                    <p className="text-sm font-semibold text-gray-900">Volume = 45 mg ÷ 40 mg/mL = 1.125 mL</p>
                  </div>
                </div>

                <div className="mt-3 rounded-lg bg-cyan-50 p-3 text-sm font-semibold text-gray-900 text-center">
                  Answer: 1.13 mL (rounded)
                </div>
              </div>
            </div>
          </section>

          {/* When used */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">When This Calculator Is Used</h2>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-cyan-600 font-bold mt-1">•</span>
                <span className="text-gray-700">Weight-based dosing (mg/kg), especially paediatrics</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-600 font-bold mt-1">•</span>
                <span className="text-gray-700">Converting a total calculated dose (mg) to a measurable volume (mL)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-600 font-bold mt-1">•</span>
                <span className="text-gray-700">Converting “mg per X mL” labels into mg/mL before calculation</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-600 font-bold mt-1">•</span>
                <span className="text-gray-700">Medication preparation checks and double-checking arithmetic</span>
              </li>
            </ul>
          </section>

          {/* Safety note */}
          <section className="mb-12 rounded-lg border border-yellow-200 bg-yellow-50 p-6">
            <p className="text-sm text-gray-800">
              <span className="font-semibold">Clinical safety note:</span> Always confirm the ordered dose, patient weight
              (kg), product concentration, and local protocols. This calculator supports calculation checking but does
              not replace clinical judgement.
            </p>
          </section>

          {/* Related calculators */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">Related Calculators</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              <Link
                href="/calculator/dose-calculations/mg-to-ml"
                className="rounded-lg border border-gray-200 bg-white p-4 hover:border-cyan-300 hover:bg-cyan-50 transition-colors"
              >
                <p className="font-medium text-gray-900 hover:text-cyan-600">mg to mL</p>
                <p className="text-xs text-gray-500 mt-1">Dose (mg) to volume conversion</p>
              </Link>

              <Link
                href="/calculator/dose-calculations/units-to-ml"
                className="rounded-lg border border-gray-200 bg-white p-4 hover:border-cyan-300 hover:bg-cyan-50 transition-colors"
              >
                <p className="font-medium text-gray-900 hover:text-cyan-600">Units to mL</p>
                <p className="text-xs text-gray-500 mt-1">Convert ordered units to liquid volume.</p>
              </Link>

              <Link
                href="/calculator/tablet-dosing/mg-to-tablets"
                className="rounded-lg border border-gray-200 bg-white p-4 hover:border-cyan-300 hover:bg-cyan-50 transition-colors"
              >
                <p className="font-medium text-gray-900 hover:text-cyan-600">mg to Tablets</p>
                <p className="text-xs text-gray-500 mt-1">Convert an ordered dose to tablet count.</p>
              </Link>
            </div>
          </section>

          {/* FAQs */}
          <section id="faqs" className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">Frequently Asked Questions</h2>
            <FAQAccordion items={faqItems} />
          </section>

          {/* References — GOLDEN STANDARD LAYOUT */}
          <section id="references" className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">References & Sources</h2>
            <p className="mb-8 text-gray-600 text-center text-sm">
              This calculator follows standard medication calculation methods used in nursing and prescribing education,
              including weight-based dosing (mg/kg) and dose-to-volume conversion (mg/mL).
            </p>

            {/* International Standards */}
            <div className="mb-8">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">International Standards</h3>
              <div className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition-shadow">
                <a
                  href="https://www.bipm.org/en/publications/si-brochure"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start justify-between gap-4 group"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 group-hover:text-cyan-600">
                      The International System of Units (SI) – SI Brochure{" "}
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded ml-2">BIPM</span>
                    </p>
                    <p className="text-sm text-gray-600 mt-1">BIPM (Bureau International des Poids et Mesures)</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Authoritative reference for SI units and prefixes used in clinical calculations.
                    </p>
                  </div>
                  <span className="text-gray-400 group-hover:text-cyan-600 text-lg mt-1">↗</span>
                </a>
              </div>
            </div>

            {/* Australia Resources */}
            <div className="mb-8">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Australia Resources</h3>
              <div className="space-y-3">
                <div className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition-shadow">
                  <a
                    href="https://students.flinders.edu.au/content/dam/student/slss/numeracy/drug-calcs.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between gap-4 group"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 group-hover:text-cyan-600">
                        Drug Calculations{" "}
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded ml-2">PDF</span>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">Flinders University – Student Learning Support Service</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Covers dose calculation methods and dose-to-volume style questions used in nursing education.
                      </p>
                    </div>
                    <span className="text-gray-400 group-hover:text-cyan-600 text-lg mt-1">↗</span>
                  </a>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition-shadow">
                  <a
                    href="https://i.unisa.edu.au/siteassets/students/student-support-services/health/learning-support/dosage-calculations-worksheet.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between gap-4 group"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 group-hover:text-cyan-600">
                        Dosage calculations worksheet{" "}
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded ml-2">PDF</span>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">University of South Australia (UniSA)</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Includes weight-based dosing examples (mg/kg) and calculation practice.
                      </p>
                    </div>
                    <span className="text-gray-400 group-hover:text-cyan-600 text-lg mt-1">↗</span>
                  </a>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition-shadow">
                  <a
                    href="https://learninglab.rmit.edu.au/nursing/finding-volume-required/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between gap-4 group"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 group-hover:text-cyan-600">
                        Finding the volume required{" "}
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded ml-2">Web page</span>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">RMIT Learning Lab (Nursing)</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Explains stock strength/stock volume concepts behind dose-to-volume calculations.
                      </p>
                    </div>
                    <span className="text-gray-400 group-hover:text-cyan-600 text-lg mt-1">↗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* United Kingdom Resources */}
            <div className="mb-8">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">United Kingdom Resources</h3>
              <div className="space-y-3">
                <div className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition-shadow">
                  <a
                    href="https://www.gloshospitals.nhs.uk/documents/2446/IV_Drug_Calculation_Test_practice_papers.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between gap-4 group"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 group-hover:text-cyan-600">
                        IV Drug & Fluid Administration Training: Calculation Practice{" "}
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded ml-2">PDF</span>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">Gloucestershire Hospitals NHS Foundation Trust</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Practice papers covering common calculation patterns used in medication administration.
                      </p>
                    </div>
                    <span className="text-gray-400 group-hover:text-cyan-600 text-lg mt-1">↗</span>
                  </a>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition-shadow">
                  <a
                    href="https://londonprofessionaldevelopment.hee.nhs.uk/sites/default/files/prescribing-workbook-final.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between gap-4 group"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 group-hover:text-cyan-600">
                        Prescribing & Drug Calculations: Self-review workbook{" "}
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded ml-2">PDF</span>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">Health Education England (London)</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Calculation practice including weight-based and dose conversion style questions.
                      </p>
                    </div>
                    <span className="text-gray-400 group-hover:text-cyan-600 text-lg mt-1">↗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* United States Resources */}
            <div className="mb-8">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">United States Resources</h3>
              <div className="space-y-3">
                <div className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition-shadow">
                  <a
                    href="https://www.upstate.edu/hr/document/med_calculations.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between gap-4 group"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 group-hover:text-cyan-600">
                        Medication calculations{" "}
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded ml-2">PDF</span>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">SUNY Upstate Medical University</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Covers calculation structures consistent with dosage and dose-to-volume conversions.
                      </p>
                    </div>
                    <span className="text-gray-400 group-hover:text-cyan-600 text-lg mt-1">↗</span>
                  </a>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition-shadow">
                  <a
                    href="https://www.ncbi.nlm.nih.gov/books/NBK560924/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between gap-4 group"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 group-hover:text-cyan-600">
                        Pharmacy Calculations{" "}
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded ml-2">Web page</span>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">NCBI Bookshelf (StatPearls Publishing)</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Discusses calculation patterns consistent with mixtures/solutions and dose conversions.
                      </p>
                    </div>
                    <span className="text-gray-400 group-hover:text-cyan-600 text-lg mt-1">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
