import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FAQAccordion } from "@/components/faq-accordion"
import UnitsToMlClient from "./units-to-ml-client"

const CANONICAL = "https://www.medmaths.com/calculator/dose-calculations/units-to-ml"

export const metadata: Metadata = {
  title: "Units to mL Calculator | Unit Dose Volume",
  description: "Convert unit-based medicine doses to mL using units/mL concentration. Useful for checking insulin, heparin, and other unit-dose labels.",
  keywords: ["units to mL calculator", "convert units to mL", "units per mL calculator", "insulin units to mL", "heparin units to mL", "unit dose volume", "units to ml", "units to mL", "units/mL", "units per mL", "unit dose"],
  authors: [{ name: "George Lambroglou, RN", url: "https://www.medmaths.com/about" }],
  creator: "George Lambroglou, RN",
  publisher: "MedMaths",
  alternates: { canonical: "https://www.medmaths.com/calculator/dose-calculations/units-to-ml" },
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
    title: "Units to mL Calculator | Unit Dose Volume",
    description: "Convert unit-based medicine doses to mL using units/mL concentration. Useful for checking insulin, heparin, and other unit-dose labels.",
    url: "https://www.medmaths.com/calculator/dose-calculations/units-to-ml",
    siteName: "MedMaths",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary",
    title: "Units to mL Calculator | Unit Dose Volume",
    description: "Convert unit-based medicine doses to mL using units/mL concentration. Useful for checking insulin, heparin, and other unit-dose labels.",
  },
}

export default function UnitsToMlPage() {
  const faqItems = [
    {
      question: "How do I convert units to mL?",
      quickAnswer: "Divide the dose (units) by the concentration (units/mL) to get volume in mL.",
      details: [
        "Formula: mL = units ÷ (units/mL)",
        "Confirm the concentration from the label (e.g., insulin U-100 = 100 units/mL)",
        "Use an appropriate syringe/device for small volumes",
        "Follow local checking policies for high-risk medications",
      ],
      microExample: "25 units ÷ 100 units/mL = 0.25 mL",
    },
    {
      question: "What’s the difference between U-100 and U-40 insulin for volume?",
      quickAnswer:
        "With U-100, each mL contains more units than U-40, so the same unit dose uses less volume with U-100.",
      details: [
        "U-100 = 100 units/mL (more concentrated)",
        "U-40 = 40 units/mL (less concentrated)",
        "Never substitute concentrations or devices without confirming",
      ],
      microExample: "20 units: U-100 = 0.2 mL; U-40 = 0.5 mL",
    },
    {
      question: "Can I use this for heparin?",
      quickAnswer: "Yes. Heparin vials are commonly labeled in units/mL, so the same division applies.",
      details: [
        "Heparin strengths vary widely (read the vial carefully)",
        "High-alert medication: follow independent double-check policy",
        "Document both dose (units) and volume (mL) as required",
      ],
      microExample: "3,000 units ÷ 5,000 units/mL = 0.6 mL",
    },
    {
      question: "Why might my answer differ from another calculator?",
      quickAnswer: "Differences are usually rounding or incorrect concentration entry (especially insulin U-100 vs U-40).",
      details: [
        "Recheck units/mL concentration (not units per vial)",
        "Check decimals and commas",
        "Compare rounding settings (mL precision can vary)",
      ],
      microExample: "0.33 vs 0.333 mL are the same value with different display precision",
    },
    {
      question: "Should I round the mL?",
      quickAnswer: "Round to what you can accurately measure with your syringe/device and follow local protocols.",
      details: [
        "Small volumes may need a 1 mL syringe for accuracy",
        "Avoid rounding that exceeds device precision",
        "If unsure, get an independent check",
      ],
      microExample: "0.246 mL might be rounded to 0.25 mL depending on device markings",
    },
    {
      question: "Is this used for subcutaneous injections?",
      quickAnswer: "Yes. The calculation is the same for any route when the medicine is labeled in units/mL.",
      details: [
        "The math is route-independent",
        "Route affects maximum volumes, technique, and device choice",
        "Always confirm route-specific protocols",
      ],
      microExample: "Insulin SC 18 units ÷ 100 = 0.18 mL",
    },
  ]

  const breadcrumbs = [
    { name: "Home", url: "https://www.medmaths.com" },
    { name: "Calculators", url: "https://www.medmaths.com/calculators" },
    { name: "Dose Calculations", url: "https://www.medmaths.com/calculator/dose-calculations" },
    { name: "Units to mL", url: CANONICAL },
  ]

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: [item.quickAnswer, ...(item.details || []).map((d) => `• ${d}`)].join("\n"),
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
            name: "Units to mL Calculator",
            description: "Convert a dose in units (U) into a measurable volume (mL) using units per mL concentration.",
            applicationCategory: "MedicalApplication",
            operatingSystem: "Web",
            url: CANONICAL,
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
            <span className="text-gray-900">Units to mL</span>
          </nav>

          <h1 className="mb-2 text-3xl font-bold sm:text-4xl tracking-tight text-gray-900 text-center">Units to mL Calculator</h1>

          {/* Calculator */}
          <section id="calculator" className="calculator-tool mb-8 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-8">
            <UnitsToMlClient />
          </section>
          <p className="mb-4 text-center text-xs text-gray-500">
            Written by <span className="font-semibold text-gray-700">George Lambroglou, RN</span> • Formula checked against listed references • Last reviewed 21 Jun 2026
          </p>
          <p className="mb-8 text-lg text-gray-600 text-center">
            Convert a dose in international units (U) to a measurable volume in millilitres (mL) using the medication
            concentration (units/mL). Common for insulin and heparin.
          </p>

          {/* Jump links */}
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
            <a href="#when-used" className="text-cyan-600 hover:text-cyan-700 font-medium text-sm">
              When used
            </a>
            <span className="text-gray-300">|</span>
            <a href="#faqs" className="text-cyan-600 hover:text-cyan-700 font-medium text-sm">
              FAQs
            </a>
            <span className="text-gray-300">|</span>
            <a href="#references" className="text-cyan-600 hover:text-cyan-700 font-medium text-sm">
              References
            </a>
          </div>

          {/* How it works */}
          <section id="how-it-works" className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">How Units to mL Conversion Works</h2>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                If a medication is prescribed in <strong>units</strong> (U) but the product is supplied as a liquid with
                a labeled concentration in <strong>units per mL</strong>, you need to calculate the volume to draw up.
              </p>

              <p>
                The conversion is a simple division:
                <br />
                <span className="font-semibold text-gray-900">mL = units ÷ (units/mL)</span>
              </p>

              <p>
                This is commonly used for <strong>insulin</strong> (U-100 and U-40) and <strong>heparin</strong> (various
                units/mL). Because these are high-risk medicines, always confirm concentration and follow local
                independent double-check policies.
              </p>

              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                <p className="text-sm text-amber-900">
                  <span className="font-semibold">Quick sanity check:</span> Higher concentration (more units per mL)
                  should give a <strong>smaller</strong> mL volume for the same unit dose.
                </p>
              </div>
            </div>
          </section>

          {/* Formula */}
          <section id="formula" className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">Formula</h2>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-700 text-center">
              <div>Volume (mL) = Dose (units) ÷ Concentration (units/mL)</div>
            </div>

            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-semibold text-gray-900">Dose (units):</span> prescribed units to administer
              </p>
              <p>
                <span className="font-semibold text-gray-900">Concentration (units/mL):</span> from the vial/pen label
                (e.g., U-100 insulin = 100 units/mL)
              </p>
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
                    Example 1: U-100 insulin. Ordered dose: 25 units. What volume (mL) is required?
                  </p>
                </div>

                <div className="mb-3 rounded-lg bg-gray-50 p-4 font-mono text-sm text-gray-700 text-center">
                  mL = 25 units ÷ 100 units/mL
                </div>

                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <span className="font-semibold">Step 1:</span> Dose = 25 units
                  </p>
                  <p>
                    <span className="font-semibold">Step 2:</span> Concentration = 100 units/mL
                  </p>
                  <p>
                    <span className="font-semibold">Step 3:</span> mL = 25 ÷ 100 = 0.25 mL
                  </p>
                </div>

                <div className="mt-3 rounded-lg bg-cyan-50 p-3 text-sm font-semibold text-gray-900 text-center">
                  Answer: 0.25 mL
                </div>
              </div>

              {/* Example 2 */}
              <div>
                <div className="mb-4 rounded-lg border-l-4 border-cyan-500 bg-amber-50 p-4">
                  <p className="font-semibold text-gray-900">
                    Example 2: Heparin 5,000 units/mL. Ordered dose: 3,000 units. What volume (mL)?
                  </p>
                </div>

                <div className="mb-3 rounded-lg bg-gray-50 p-4 font-mono text-sm text-gray-700 text-center">
                  mL = 3,000 ÷ 5,000
                </div>

                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <span className="font-semibold">Step 1:</span> mL = 3000 ÷ 5000 = 0.6 mL
                  </p>
                </div>

                <div className="mt-3 rounded-lg bg-cyan-50 p-3 text-sm font-semibold text-gray-900 text-center">
                  Answer: 0.6 mL
                </div>
              </div>

              {/* Example 3 */}
              <div>
                <div className="mb-4 rounded-lg border-l-4 border-cyan-500 bg-amber-50 p-4">
                  <p className="font-semibold text-gray-900">
                    Example 3: U-40 insulin. Ordered dose: 20 units. What volume (mL)?
                  </p>
                </div>

                <div className="mb-3 rounded-lg bg-gray-50 p-4 font-mono text-sm text-gray-700 text-center">
                  mL = 20 ÷ 40
                </div>

                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <span className="font-semibold">Step 1:</span> mL = 20 ÷ 40 = 0.5 mL
                  </p>
                </div>

                <div className="mt-3 rounded-lg bg-cyan-50 p-3 text-sm font-semibold text-gray-900 text-center">
                  Answer: 0.5 mL
                </div>
              </div>
            </div>
          </section>

          {/* When used */}
          <section id="when-used" className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">When This Calculator Is Used</h2>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-cyan-600 font-bold mt-1">•</span>
                <span className="text-gray-700">Drawing up insulin doses prescribed in units (U)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-600 font-bold mt-1">•</span>
                <span className="text-gray-700">Preparing heparin doses when the vial is labeled units/mL</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-600 font-bold mt-1">•</span>
                <span className="text-gray-700">Double-checking volume calculations prior to administration</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-600 font-bold mt-1">•</span>
                <span className="text-gray-700">Education: linking “units ordered” to “mL measured”</span>
              </li>
            </ul>
          </section>

          {/* Safety note */}
          <section className="mb-12 rounded-lg border border-yellow-200 bg-yellow-50 p-6">
            <p className="text-sm text-gray-800">
              <span className="font-semibold">Clinical safety note:</span> Units-based medicines are high-risk. Always
              confirm the concentration on the product (especially insulin U-100 vs U-40) and follow local protocols for
              independent double-checks and device selection.
            </p>
          </section>

          {/* Related calculators */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">Related Calculators</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              <Link
                href="/calculator/dose-calculations/units-to-ml"
                className="rounded-lg border border-gray-200 bg-white p-4 hover:border-cyan-300 hover:bg-cyan-50 transition-colors"
              >
                <p className="font-medium text-gray-900 hover:text-cyan-600">mL to units</p>
                <p className="text-xs text-gray-500 mt-1">Convert volume to a unit dose</p>
              </Link>

              <Link
                href="/calculator/dose-calculations/mg-to-ml"
                className="rounded-lg border border-gray-200 bg-white p-4 hover:border-cyan-300 hover:bg-cyan-50 transition-colors"
              >
                <p className="font-medium text-gray-900 hover:text-cyan-600">mg to mL</p>
                <p className="text-xs text-gray-500 mt-1">Dose-to-volume for mg/mL medicines</p>
              </Link>

              <Link
                href="/calculator/dose-calculations/mg-to-ml#calculator"
                className="rounded-lg border border-gray-200 bg-white p-4 hover:border-cyan-300 hover:bg-cyan-50 transition-colors"
              >
                <p className="font-medium text-gray-900 hover:text-cyan-600">mL to mg</p>
                <p className="text-xs text-gray-500 mt-1">Convert volume back to mg</p>
              </Link>
            </div>
          </section>

          {/* FAQs */}
          <section id="faqs" className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">Frequently Asked Questions</h2>
            <FAQAccordion items={faqItems} />
          </section>

          {/* References */}
          <section id="references" className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">References & Sources</h2>
            <p className="mb-8 text-gray-600 text-center text-sm">
              References support concentration-based dose calculations and high-risk medication safety principles used in
              unit-based medicines like insulin and heparin.
            </p>

            {/* International */}
            <div className="mb-8">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">International</h3>

              <div className="space-y-3">
                <div className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition-shadow">
                  <a
                    href="https://www.ismp.org/resources/high-alert-medications-acute-list"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between gap-4 group"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 group-hover:text-cyan-600">
                        ISMP High-Alert Medications (acute care list)
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded ml-2">Web</span>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">Institute for Safe Medication Practices (ISMP)</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Highlights high-risk medicines (including insulin/heparin) and reinforces checking processes.
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
                        Pharmacy Calculations (StatPearls / NCBI Bookshelf)
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded ml-2">Web</span>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">NCBI Bookshelf</p>
                      <p className="text-xs text-gray-500 mt-2">
                        General framework for concentration-based dose calculations consistent with units/mL methods.
                      </p>
                    </div>
                    <span className="text-gray-400 group-hover:text-cyan-600 text-lg mt-1">↗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Australia */}
            <div className="mb-8">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Australia</h3>
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
                        Drug Calculations (student learning support)
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded ml-2">PDF</span>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">Flinders University</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Explains medication calculation patterns used across dose and concentration problems.
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
                        Finding the volume required (nursing)
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded ml-2">Web</span>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">RMIT Learning Lab</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Reinforces the relationship between dose, concentration, and measurable volume.
                      </p>
                    </div>
                    <span className="text-gray-400 group-hover:text-cyan-600 text-lg mt-1">↗</span>
                  </a>
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              <strong>Clinical Disclaimer:</strong> Always verify product labeling and local protocols before preparing
              or administering medications. This calculator is for educational checking only.
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
