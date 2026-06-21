import type { Metadata } from "next"
import Link from "next/link"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FAQAccordion } from "@/components/faq-accordion"

import ReconstituteToFinalBagClient from "./reconstitute-to-bag-client"

const CANONICAL = "https://www.medmaths.com/calculator/dilutions/reconstitute-to-bag"

export const metadata: Metadata = {
  title: "Reconstitution Calculator | Vial to IV Bag",
  description: "Calculate final IV bag concentration after reconstituting a vial and transferring a dose volume. Includes vial concentration and bag dilution steps.",
  keywords: ["reconstitution calculator", "vial to bag calculator", "reconstitute vial calculator", "final bag concentration calculator", "IV bag dilution calculator", "reconstitute", "vial to bag", "iv bag", "final concentration"],
  authors: [{ name: "George Lambroglou, RN", url: "https://www.medmaths.com/about" }],
  creator: "George Lambroglou, RN",
  publisher: "MedMaths",
  alternates: { canonical: "https://www.medmaths.com/calculator/dilutions/reconstitute-to-bag" },
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
    title: "Reconstitution Calculator | Vial to IV Bag",
    description: "Calculate final IV bag concentration after reconstituting a vial and transferring a dose volume. Includes vial concentration and bag dilution steps.",
    url: "https://www.medmaths.com/calculator/dilutions/reconstitute-to-bag",
    siteName: "MedMaths",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary",
    title: "Reconstitution Calculator | Vial to IV Bag",
    description: "Calculate final IV bag concentration after reconstituting a vial and transferring a dose volume. Includes vial concentration and bag dilution steps.",
  },
}

export default function ReconstituteToFinalBagPage() {
  const faqItems = [
    {
      question: "What does reconstitution mean?",
      quickAnswer: "Mixing a powder medication with a specified diluent to create a usable solution with a known concentration.",
      details: [
        "Reconstitution converts dry powder medications into liquid solutions.",
        "The diluent and volume are specified on the vial label or product information.",
        "The final vial volume may differ from the diluent volume due to displacement.",
      ],
      microExample: "1000 mg reconstituted to 10 mL → 100 mg/mL",
    },
    {
      question: "How do I calculate the final bag concentration?",
      quickAnswer: "Calculate the vial concentration (mg/mL), then calculate mg withdrawn, then divide by the bag volume.",
      details: [
        "Step 1: C(vial) = mg in vial ÷ final vial volume (mL)",
        "Step 2: mg added = C(vial) × mL withdrawn",
        "Step 3: C(final) = mg added ÷ bag volume (mL)",
        "Keep units consistent throughout.",
      ],
      microExample: "100 mg/mL × 5 mL = 500 mg; 500 mg ÷ 250 mL = 2 mg/mL",
    },
    {
      question: "What if my vial label shows mg per X mL?",
      quickAnswer: "Convert to mg/mL first by dividing mg by the stated mL.",
      details: ["Example: 250 mg per 5 mL → 250 ÷ 5 = 50 mg/mL", "Use mg/mL for the rest of the calculation."],
      microExample: "500 mg in 20 mL → 25 mg/mL",
    },
    {
      question: "Why is this important for patient safety?",
      quickAnswer: "Incorrect final concentrations can cause underdosing or overdosing, especially with high-risk IV drugs.",
      details: ["Two-stage dilution errors are common.", "Small arithmetic mistakes can create large concentration errors.", "Always double-check per policy."],
      microExample: "A 10× concentration error can deliver 10× the intended dose.",
    },
    {
      question: "What diluent should I use?",
      quickAnswer: "Always use the diluent and volume specified on the product label/monograph or local protocol.",
      details: ["Wrong diluent can cause precipitation or instability.", "If unsure, confirm with pharmacy/product information."],
      microExample: "Follow label instructions: ‘Reconstitute with X mL of [diluent]’",
    },
  ]


  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: [item.quickAnswer, ...item.details].join("\n"),
      },
    })),
  }

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Reconstitution Calculator | Vial to IV Bag",
    description: "Calculate final IV bag concentration after reconstituting a vial and transferring a dose volume.",
    url: "https://www.medmaths.com/calculator/dilutions/reconstitute-to-bag",
    applicationCategory: "MedicalApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    author: { "@type": "Person", name: "George Lambroglou", jobTitle: "Registered Nurse" },
    publisher: { "@type": "Organization", name: "MedMaths", url: "https://www.medmaths.com" },
  }

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Calculators", href: "/calculators" },
    { name: "Dilutions", href: "/calculator/dilutions" },
    { name: "Reconstitute to Final Bag", href: "/calculator/dilutions/reconstitute-to-bag" },
  ]

  const relatedCalcs = [
    { title: "C1V1 = C2V2 Basic", href: "/calculator/dilutions/c1v1-c2v2-basic" },
    { title: "Serial 2-Step Dilution", href: "/calculator/dilutions/c1v1-c2v2-basic" },
    { title: "C1 to C2 Final Volume", href: "/calculator/dilutions/c1v1-c2v2-basic" },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SiteHeader />

      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-4xl px-4 pb-12 pt-4 sm:px-6 sm:py-12 lg:px-8 lg:pt-10">
          {/* Breadcrumbs */}
          <nav className="mb-4 hidden text-sm text-gray-500 sm:block">
            {breadcrumbs.map((b, i) => (
              <span key={b.href}>
                {i > 0 && " / "}
                {i === breadcrumbs.length - 1 ? (
                  <span className="text-gray-900">{b.name}</span>
                ) : (
                  <Link href={b.href} className="hover:text-purple-700">
                    {b.name}
                  </Link>
                )}
              </span>
            ))}
          </nav>

          {/* Title */}
          <h1 className="mb-2 text-3xl font-bold sm:text-4xl tracking-tight text-gray-900 text-center">Reconstitute to Final Bag</h1>

          {/* Calculator */}
          <section id="calculator" className="calculator-tool mb-8 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-8">
            <ReconstituteToFinalBagClient />
          </section>
          <p className="mb-4 text-center text-xs text-gray-500">
            Written by <span className="font-semibold text-gray-700">George Lambroglou, RN</span> • Formula checked against listed references • Last reviewed 21 Jun 2026
          </p>
          <p className="mb-8 text-lg text-gray-600 text-center">
            Calculate final bag concentration after reconstituting a vial and adding part of the solution to an infusion bag.
          </p>

          {/* Jump links */}
          <div className="mb-10 flex flex-wrap gap-3 justify-center text-sm">
            {[
              ["#calculator", "Calculator"],
              ["#how-it-works", "How it works"],
              ["#formula", "Formula"],
              ["#worked-examples", "Worked examples"],
              ["#when-used", "When used"],
              ["#faqs", "FAQs"],
              ["#references", "References"],
            ].map(([href, label]) => (
              <a key={href} href={href} className="text-purple-600 hover:text-purple-700 font-medium">
                {label}
              </a>
            ))}
          </div>

          {/* How it works */}
          <section id="how-it-works" className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 text-center">How it works</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                This is a <span className="font-semibold">two-stage</span> process: first you reconstitute the vial to obtain a vial concentration
                (mg/mL). Then you withdraw a volume from the vial and add it to an infusion bag.
              </p>
              <p>
                The calculator performs three steps: (1) vial concentration, (2) mg withdrawn/added, (3) final bag concentration (mg/mL).
              </p>
            </div>
          </section>

          {/* Formula */}
          <section id="formula" className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 text-center">Formula</h2>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 font-mono text-sm text-gray-900">
              <div>C(vial) = mg in vial ÷ final vial volume (mL)</div>
              <div className="mt-2">mg added = C(vial) × mL withdrawn</div>
              <div className="mt-2">C(final) = mg added ÷ bag volume (mL)</div>
            </div>
          </section>

          {/* Worked examples */}
          <section id="worked-examples" className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">Worked examples</h2>

            <div className="space-y-6">
              {[
                {
                  title:
                    "Example 1: 1000 mg vial, reconstitute to 10 mL, withdraw 5 mL, add to 250 mL bag",
                  lines: ["C(vial) = 1000 ÷ 10 = 100 mg/mL", "mg added = 100 × 5 = 500 mg", "C(final) = 500 ÷ 250 = 2 mg/mL"],
                  answer: "Answer: 2 mg/mL",
                },
                {
                  title:
                    "Example 2: 500 mg vial, reconstitute to 5 mL, withdraw 2 mL, add to 100 mL bag",
                  lines: ["C(vial) = 500 ÷ 5 = 100 mg/mL", "mg added = 100 × 2 = 200 mg", "C(final) = 200 ÷ 100 = 2 mg/mL"],
                  answer: "Answer: 2 mg/mL",
                },
                {
                  title:
                    "Example 3: 750 mg vial, reconstitute to 15 mL, withdraw 6 mL, add to 500 mL bag",
                  lines: ["C(vial) = 750 ÷ 15 = 50 mg/mL", "mg added = 50 × 6 = 300 mg", "C(final) = 300 ÷ 500 = 0.6 mg/mL"],
                  answer: "Answer: 0.6 mg/mL",
                },
              ].map((ex) => (
                <div key={ex.title} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm border-l-4 border-purple-500">
                  <p className="font-semibold text-gray-900">{ex.title}</p>
                  <div className="mt-3 rounded-lg bg-gray-50 p-4 font-mono text-sm text-gray-900">
                    {ex.lines.map((l) => (
                      <div key={l}>{l}</div>
                    ))}
                  </div>
                  <div className="mt-3 rounded-lg bg-purple-50 border border-purple-200 p-3 text-sm font-semibold text-gray-900 text-center">
                    {ex.answer}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* When used */}
          <section id="when-used" className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">When this calculator is used</h2>
            <ul className="space-y-2 text-gray-700">
              {[
                "Reconstituting powder vials (e.g., antibiotics, chemo) and adding to infusion bags",
                "Two-stage dilution checks prior to administration",
                "Standardizing final infusion concentrations for protocols",
                "Education/training and double-checking calculations",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Safety note */}
          <section className="mb-12 rounded-xl border border-yellow-200 bg-yellow-50 p-6">
            <p className="text-sm text-yellow-900">
              <span className="font-semibold">Clinical safety note:</span> Use the diluent and volumes specified on product information and follow local policy.
              Always verify final concentration before administration.
            </p>
          </section>

          {/* Related calculators */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">Related calculators</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {relatedCalcs.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="rounded-xl border border-gray-200 bg-white p-4 hover:border-purple-300 hover:bg-purple-50 transition-colors"
                >
                  <p className="font-medium text-gray-900 hover:text-purple-600">{c.title}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQs */}
          <section id="faqs" className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">Frequently asked questions</h2>
            <FAQAccordion items={faqItems} />
          </section>

          {/* References */}
          <section id="references" className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">References & sources</h2>
            <div className="space-y-3">
              {[
                {
                  title: "Institute for Safe Medication Practices (ISMP)",
                  desc: "Medication safety guidance and error prevention",
                  href: "https://www.ismp.org/",
                },
                {
                  title: "ACSQHC Medication Safety Standard (NSQHS)",
                  desc: "Australian medication safety standard",
                  href: "https://www.safetyandquality.gov.au/standards/nsqhs-standards/medication-safety-standard",
                },
                {
                  title: "SI Prefixes (milli-, micro-, etc.)",
                  desc: "BIPM metric prefixes reference",
                  href: "https://www.bipm.org/documents/20126/54630884/SI-Prefixes.pdf",
                },
              ].map((r) => (
                <a
                  key={r.href}
                  href={r.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 hover:border-purple-300 hover:bg-purple-50 transition-colors"
                >
                  <div>
                    <p className="font-semibold text-gray-900 group-hover:text-purple-600">{r.title}</p>
                    <p className="text-sm text-gray-600">{r.desc}</p>
                  </div>
                  <span className="text-gray-400 group-hover:text-purple-600">↗</span>
                </a>
              ))}
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
