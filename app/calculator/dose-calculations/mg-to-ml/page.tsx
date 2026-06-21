import type { Metadata } from "next"
import Link from "next/link"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FAQAccordion } from "@/components/faq-accordion"

import MgToMlClient from "./mg-to-ml-client"

const CANONICAL = "https://www.medmaths.com/calculator/dose-calculations/mg-to-ml"
const UPDATED_DATE_ISO = "2026-06-21"
const UPDATED_DATE_HUMAN = "21 Jun 2026"

export const metadata: Metadata = {
  title: "mg to mL Calculator for Medicine | Dose & Syringe",
  description: "Convert mg to mL from a medicine label using mg/mL or mg per 5 mL. Shows the formula, syringe-volume examples, and why concentration matters.",
  keywords: ["mg to mL calculator", "mg to ml drug conversion", "mg to ml medicine", "mg to ml syringe", "mg per 5 ml calculator", "dose to volume calculator", "mg/mL calculator", "2.5 mg to ml", "mg to ml", "mg to mL", "mg/ml", "mg/mL", "dose volume", "syringe volume", "medicine concentration"],
  authors: [{ name: "George Lambroglou, RN", url: "https://www.medmaths.com/about" }],
  creator: "George Lambroglou, RN",
  publisher: "MedMaths",
  alternates: { canonical: "https://www.medmaths.com/calculator/dose-calculations/mg-to-ml" },
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
    title: "mg to mL Calculator for Medicine | Dose & Syringe",
    description: "Convert mg to mL from a medicine label using mg/mL or mg per 5 mL. Shows the formula, syringe-volume examples, and why concentration matters.",
    url: "https://www.medmaths.com/calculator/dose-calculations/mg-to-ml",
    siteName: "MedMaths",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary",
    title: "mg to mL Calculator for Medicine | Dose & Syringe",
    description: "Convert mg to mL from a medicine label using mg/mL or mg per 5 mL. Shows the formula, syringe-volume examples, and why concentration matters.",
  },
}

export default function MgToMlPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://www.medmaths.com" },
    { name: "Calculators", url: "https://www.medmaths.com/calculators" },
    { name: "Dose Calculations", url: "https://www.medmaths.com/calculator/dose-calculations" },
    { name: "mg to mL", url: CANONICAL },
  ]

  const faqItems = [
    {
      question: "What does mg/mL mean?",
      quickAnswer: "mg/mL is the concentration: how many milligrams of medication are in each millilitre of solution.",
      details: [
        "Abbreviation: mg/mL = milligrams per millilitre",
        "Example: 50 mg/mL means 50 mg of drug is dissolved in 1 mL of liquid",
        "Medication labels often show it directly as mg/mL or indirectly as mg per X mL",
        "Getting mg/mL right is essential for safe dose-to-volume calculations",
      ],
      microExample: "A label reading 250 mg/5 mL is equivalent to 50 mg/mL.",
    },
    {
      question: "How do I convert mg to mL?",
      quickAnswer: "Divide the dose (mg) by the concentration (mg/mL) to get the volume in mL.",
      details: [
        "Formula: mL = mg ÷ (mg/mL)",
        "Dose (mg) comes from the order/prescription",
        "Concentration (mg/mL) comes from the vial/ampoule/bag label",
        "Always confirm your units match before calculating",
      ],
      microExample: "500 mg ÷ 50 mg/mL = 10 mL",
    },
    {
      question: "What if the label says mg per 5 mL (or per X mL)?",
      quickAnswer: "Convert it to mg/mL first by dividing the label mg by the label mL, then do mg ÷ (mg/mL).",
      details: [
        "Example label: 250 mg per 5 mL",
        "Convert: 250 ÷ 5 = 50 mg/mL",
        "Then calculate volume: dose ÷ 50",
        "Use the calculator’s label-format option to do this quickly",
      ],
      microExample: "400 mg in 8 mL → 400 ÷ 8 = 50 mg/mL",
    },
    {
      question: "Is mg → mL always possible?",
      quickAnswer:
        "Only if you know the concentration (mg/mL) or density. For medication dosing, you usually use mg/mL from the label.",
      details: [
        "Medication dosing conversions require the product concentration (mg/mL)",
        "Some general conversion sites use density (e.g., water-like density) — that’s not the same as medication concentration",
        "If you’re dosing a medication, use the vial/ampoule/bag label concentration",
        "If unsure, don’t guess — confirm the concentration/source",
      ],
      microExample: "Dose-to-volume: 10 mg ÷ 5 mg/mL = 2 mL (medication label).",
    },
    {
      question: "Why does rounding change the final mL?",
      quickAnswer: "Different rounding levels give slightly different results; round to what you can safely measure.",
      details: [
        "Rounding to 2 decimals is common (e.g., 3.13 mL)",
        "Syringe markings (0.1 mL, 0.2 mL, 0.5 mL) determine what’s measurable",
        "For very small volumes, consider an appropriate device (per local policy)",
        "If your setting requires exact rounding rules, follow local guidance",
      ],
      microExample: "3.125 mL rounds to 3.13 mL (2 decimals) or 3.1 mL (1 decimal).",
    },
    {
      question: "Can I use this for IV medications and IV bags?",
      quickAnswer: "Yes — the formula is the same. Always confirm the label concentration and local IV prep policy.",
      details: [
        "Oral liquids, injections, IV syringes, and IV bags all follow the same dose-to-volume logic",
        "IV preparations often involve dilution in a defined bag size (e.g., 100 mL, 250 mL, 1 L)",
        "This calculator helps check the arithmetic — it does not replace policy/protocol",
        "Double-check inputs before administration",
      ],
      microExample: "Morphine 10 mg ÷ 5 mg/mL = 2 mL.",
    },
    {
      question: "Why might my answer differ from another calculator?",
      quickAnswer: "Usually rounding, or the other tool is doing density-based conversion instead of mg/mL concentration.",
      details: [
        "Check your inputs (dose and concentration)",
        "Ensure units are truly mg/mL (not mg/5 mL left unconverted)",
        "Different tools round differently",
        "If results differ a lot, recalc manually or confirm label concentration",
      ],
      microExample: "3.13 mL vs 3.1 mL can both be correct depending on rounding.",
    },
  ]

  const practiceQuestions = [
    {
      q: "Practice 1: Order is 500 mg. Stock concentration is 50 mg/mL. How many mL will you administer?",
      steps: ["mL = mg ÷ (mg/mL)", "mL = 500 ÷ 50", "mL = 10"],
      answer: "10 mL",
    },
    {
      q: "Practice 2: Label reads 250 mg/5 mL. Order is 125 mg. How many mL is the dose?",
      steps: ["Step 1 (convert): 250 ÷ 5 = 50 mg/mL", "Step 2 (dose): mL = 125 ÷ 50", "mL = 2.5"],
      answer: "2.5 mL",
    },
    {
      q: "Practice 3: Order is 2 mg. Stock is 50 mg/mL. What mL does the calculator produce (before rounding)?",
      steps: ["mL = 2 ÷ 50", "mL = 0.04"],
      answer: "0.04 mL",
    },
    {
      q: "Practice 4: Order is 125 mg. Stock is 40 mg/mL. What is the volume (to 2 decimals)?",
      steps: ["mL = 125 ÷ 40", "mL = 3.125", "Rounded to 2 decimals = 3.13 mL"],
      answer: "3.13 mL",
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
        text: [item.quickAnswer, ...item.details.map((d) => `• ${d}`)].join("\n"),
      },
    })),
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.name,
      item: b.url,
    })),
  }

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "mg to mL Calculator for Medicine",
    description: "Convert milligrams (mg) to millilitres (mL) using medication concentration (mg/mL).",
    applicationCategory: "MedicalApplication",
    operatingSystem: "Web",
    url: CANONICAL,
    author: {
      "@type": "Person",
      name: "George Lambroglou",
      jobTitle: "Registered Nurse",
    },
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "mg to mL Calculator for Medicine",
    url: CANONICAL,
    dateModified: UPDATED_DATE_ISO,
    about: [{ "@type": "MedicalEntity", name: "Medication dosage calculations" }],
    author: { "@type": "Person", name: "George Lambroglou", jobTitle: "Registered Nurse" },
  }

  return (
    <>
      {/* Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

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
            <span className="text-gray-900">mg to mL</span>
          </nav>

          <h1 className="mb-2 text-3xl font-bold sm:text-4xl tracking-tight text-gray-900 text-center">mg to mL Calculator for Medicine</h1>

          {/* Calculator */}
          <section id="calculator" className="calculator-tool mb-8 rounded-2xl border border-cyan-200 bg-white p-4 shadow-sm sm:p-8">
            <MgToMlClient />
          </section>

          {/* Authority / reviewer line */}
          <p className="text-sm text-gray-500 text-center mb-3">
            Written by <span className="font-semibold text-gray-700">George Lambroglou, RN</span> • Formula checked against listed references • Last reviewed {UPDATED_DATE_HUMAN}
          </p>

          <p className="mb-8 text-lg text-gray-600 text-center">
            Convert a medicine dose in milligrams (mg) to a measurable volume in millilitres (mL). You need the medication concentration, usually written as mg/mL or mg per 5 mL on the label.
          </p>

          {/* Intent clarification (helps SEO + user trust) */}
          <section className="mb-8 rounded-lg border border-gray-200 bg-gray-50 p-5">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Important:</span> mg cannot be converted to mL safely without concentration. For medicine, use the product label concentration, such as <span className="font-semibold">5 mg/mL</span> or <span className="font-semibold">250 mg per 5 mL</span>. This page is for medication dose-to-volume maths, not density-based food or chemistry conversion.
            </p>
          </section>

          {/* Jump links */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
            <span className="text-sm text-gray-600">Jump to:</span>
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
            <a href="#common-dose-examples" className="text-cyan-600 hover:text-cyan-700 font-medium text-sm">
              Common searches
            </a>
            <span className="text-gray-300">|</span>
            <a href="#practice" className="text-cyan-600 hover:text-cyan-700 font-medium text-sm">
              Practice questions
            </a>
            <span className="text-gray-300">|</span>
            <a href="#faqs" className="text-cyan-600 hover:text-cyan-700 font-medium text-sm">
              FAQs
            </a>
          </div>

          {/* How it works */}
          <section id="how-it-works" className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">How mg to mL Conversion Works</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                A medication order is often written as a dose in <strong>milligrams (mg)</strong>, but you administer a{" "}
                <strong>volume (mL)</strong>. The bridge between those is the concentration on the label:{" "}
                <strong>mg per mL (mg/mL)</strong>.
              </p>
              <p>
                If you know the concentration, the conversion is straightforward: divide the dose (mg) by how many mg are in each mL (mg/mL).
                That gives you the volume to draw up or prepare.
              </p>
              <p>
                Many labels aren’t written as mg/mL — they’re written as <strong>mg per X mL</strong> (e.g.,{" "}
                <strong>250 mg/5 mL</strong>). You can convert that label format into mg/mL by dividing the label mg by the label mL, then use the
                standard formula.
              </p>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Quick checklist:</span> Confirm (1) ordered dose (mg), (2) product concentration (mg/mL or mg per X mL),
                  (3) you’re using the right product/strength, and (4) your result is practical and measurable according to your local policy.
                </p>
              </div>
            </div>
          </section>

          {/* Formula */}
          <section id="formula" className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">Formula</h2>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-700 text-center">
              <div>mL = mg ÷ (mg/mL)</div>
            </div>
            <p className="mt-4 text-sm text-gray-600 text-center">
              If the label is in <strong>mg per X mL</strong>, convert first: <strong>mg/mL = mg ÷ mL</strong>.
            </p>
          </section>

          {/* Worked examples */}
          <section id="examples" className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">Worked Examples</h2>

            <div className="space-y-6">
              <div>
                <div className="mb-4 rounded-lg border-l-4 border-cyan-500 bg-gray-50 p-4">
                  <p className="font-semibold text-gray-900">
                    Example 1: A patient is prescribed 500 mg. The solution is 50 mg/mL. How many mL do you give?
                  </p>
                </div>

                <div className="mb-3 rounded-lg bg-gray-50 p-4 font-mono text-sm text-gray-700 text-center">
                  mL = mg ÷ (mg/mL)
                  <br />
                  mL = 500 ÷ 50
                </div>

                <div className="mt-3 rounded-lg bg-cyan-50 p-3 text-sm font-semibold text-gray-900 text-center">Answer: 10 mL</div>
              </div>

              <div>
                <div className="mb-4 rounded-lg border-l-4 border-cyan-500 bg-gray-50 p-4">
                  <p className="font-semibold text-gray-900">
                    Example 2: The label reads 250 mg in 5 mL. The dose is 125 mg. How many mL is the dose?
                  </p>
                </div>

                <div className="mb-3 rounded-lg bg-gray-50 p-4 font-mono text-sm text-gray-700 text-center">
                  Step 1: Convert to mg/mL: 250 ÷ 5 = 50 mg/mL
                  <br />
                  Step 2: mL = 125 ÷ 50 = 2.5
                </div>

                <div className="mt-3 rounded-lg bg-cyan-50 p-3 text-sm font-semibold text-gray-900 text-center">Answer: 2.5 mL</div>
              </div>

              <div>
                <div className="mb-4 rounded-lg border-l-4 border-cyan-500 bg-gray-50 p-4">
                  <p className="font-semibold text-gray-900">
                    Example 3: Dose is 125 mg. Concentration is 40 mg/mL. What is the volume to 2 decimals?
                  </p>
                </div>

                <div className="mb-3 rounded-lg bg-gray-50 p-4 font-mono text-sm text-gray-700 text-center">
                  mL = 125 ÷ 40 = 3.125 → 3.13 mL
                </div>

                <div className="mt-3 rounded-lg bg-cyan-50 p-3 text-sm font-semibold text-gray-900 text-center">Answer: 3.13 mL</div>
              </div>
            </div>
          </section>

          <section id="common-dose-examples" className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">Common mg to mL Examples</h2>
            <div className="mb-5 rounded-lg border border-cyan-200 bg-cyan-50 p-5">
              <p className="text-sm text-gray-800">
                These examples show why concentration matters. The same mg dose gives a different mL answer when the medicine strength changes.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: "1 mg to mL", dose: "1", conc: "5", result: "0.2 mL" },
                { label: "2 mg to mL", dose: "2", conc: "5", result: "0.4 mL" },
                { label: "2.5 mg to mL", dose: "2.5", conc: "5", result: "0.5 mL" },
                { label: "5 mg to mL", dose: "5", conc: "5", result: "1 mL" },
                { label: "10 mg to mL", dose: "10", conc: "5", result: "2 mL" },
                { label: "500 mg to mL", dose: "500", conc: "50", result: "10 mL" },
              ].map((example) => (
                <div key={example.label} className="rounded-xl border border-gray-200 bg-white p-4">
                  <h3 className="mb-2 font-semibold text-gray-900">{example.label} example</h3>
                  <p className="mb-3 text-sm text-gray-600">
                    If the concentration is <span className="font-semibold">{example.conc} mg/mL</span>:
                  </p>
                  <div className="rounded-lg bg-gray-50 p-3 font-mono text-sm text-gray-700">
                    {example.dose} mg ÷ {example.conc} mg/mL = {example.result}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Practice questions (GREEN + Show answer button) */}
          <section id="practice" className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">Practice Questions (with Answers)</h2>

            <div className="mb-5 rounded-lg border border-emerald-200 bg-emerald-50 p-5">
              <p className="text-sm text-gray-800">
                Use these to check your understanding. Click <span className="font-semibold">Show answer</span> to reveal the working out.
              </p>
            </div>

            <div className="space-y-4">
              {practiceQuestions.map((pq) => (
                <details key={pq.q} className="group rounded-xl border border-emerald-200 bg-white p-4">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                    <p className="font-semibold text-gray-900">{pq.q}</p>

                    <span className="shrink-0 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 group-open:hidden">
                      Show answer
                    </span>
                    <span className="shrink-0 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 hidden group-open:inline">
                      Hide answer
                    </span>
                  </summary>

                  <div className="mt-4 space-y-3">
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-700">
                      {pq.steps.map((s) => (
                        <div key={s}>{s}</div>
                      ))}
                    </div>
                    <div className="rounded-lg bg-emerald-50 p-3 text-sm font-semibold text-gray-900 text-center">
                      Answer: {pq.answer}
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* When used */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">When This Calculator Is Used</h2>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-cyan-600 font-bold mt-1">•</span>
                <span className="text-gray-700">Converting a prescribed dose (mg) into a measurable volume (mL)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-600 font-bold mt-1">•</span>
                <span className="text-gray-700">Converting “mg per X mL” labels (e.g., 250 mg/5 mL) into mg/mL</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-600 font-bold mt-1">•</span>
                <span className="text-gray-700">Double-checking arithmetic during medication prep and documentation</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-600 font-bold mt-1">•</span>
                <span className="text-gray-700">Study and exam practice for nursing, pharmacy, and junior medical staff</span>
              </li>
            </ul>
          </section>

          {/* Clinical reminder (keep your consistent disclaimer placement) */}
          <section className="mb-12 rounded-lg border border-yellow-200 bg-yellow-50 p-6">
            <p className="text-sm text-gray-800">
              <span className="font-semibold">Clinical reminder:</span> Always confirm the ordered dose, product concentration, and local policies. This
              calculator supports calculation checking but does not replace clinical judgement.
            </p>
          </section>

          {/* Related calculators */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">Related Calculators</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              <Link
                href="/calculator/dose-calculations/mg-to-ml#calculator"
                className="rounded-lg border border-gray-200 bg-white p-4 hover:border-cyan-300 hover:bg-cyan-50 transition-colors"
              >
                <p className="font-medium text-gray-900 hover:text-cyan-600">mL to mg mode</p>
                <p className="text-xs text-gray-500 mt-1">Convert volume back to dose</p>
              </Link>

              <Link
                href="/calculator/dose-calculations/units-to-ml"
                className="rounded-lg border border-gray-200 bg-white p-4 hover:border-cyan-300 hover:bg-cyan-50 transition-colors"
              >
                <p className="font-medium text-gray-900 hover:text-cyan-600">Units to mL</p>
                <p className="text-xs text-gray-500 mt-1">Unit-based medicine volume</p>
              </Link>

              <Link
                href="/calculator/dose-calculations/mgkg-to-ml-dose"
                className="rounded-lg border border-gray-200 bg-white p-4 hover:border-cyan-300 hover:bg-cyan-50 transition-colors"
              >
                <p className="font-medium text-gray-900 hover:text-cyan-600">mg/kg to mL</p>
                <p className="text-xs text-gray-500 mt-1">Weight-based dosing to volume</p>
              </Link>
            </div>
          </section>

          {/* FAQs */}
          <section id="faqs" className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">Frequently Asked Questions</h2>
            <FAQAccordion items={faqItems} />
          </section>

          {/* References (university + textbook authority) */}
          <section id="references" className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">References &amp; Study Sources</h2>
            <p className="mb-8 text-gray-600 text-center text-sm">
              These references support the core dose calculation method and medication math practice used on this page.
            </p>

            <div className="space-y-3">
              {[
                {
                  title: "OpenStax – Pharmacology for Nurses (Dosage Calculations)",
                  desc: "Drug calculation methods and unit consistency (open textbook).",
                  href: "https://openstax.org/books/pharmacology/pages/2-4-dosage-calculations",
                },
                {
                  title: "University of South Australia – Dosage Calculation Worksheet (PDF)",
                  desc: "Worked practice approach to medication dosage calculations (worksheet).",
                  href: "https://lo.unisa.edu.au/mod/resource/view.php?id=1342842",
                },
                {
                  title: "University of South Australia – Worksheet Answers (PDF)",
                  desc: "Answer key with worked solutions (supports verification).",
                  href: "https://lo.unisa.edu.au/mod/resource/view.php?id=1342574",
                },
                {
                  title: "York St John University – Nursing Formula Sheet (PDF)",
                  desc: "Quick guide formulas for dosage calculations.",
                  href: "https://www.yorksj.ac.uk/media/content-assets/study-skills/maths-and-statistics/nursing-maths/Nursing-Formula-Sheet.pdf",
                },
                {
                  title: "Flinders University – Drug Calculations (PDF)",
                  desc: "Academic numeracy guide covering core medication maths.",
                  href: "https://students.flinders.edu.au/content/dam/student/slss/numeracy/drug-calcs.pdf",
                },
              ].map((r) => (
                <a
                  key={r.href}
                  href={r.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 hover:border-cyan-300 hover:bg-cyan-50 transition-colors"
                >
                  <div>
                    <p className="font-semibold text-gray-900 group-hover:text-cyan-600">{r.title}</p>
                    <p className="text-sm text-gray-600">{r.desc}</p>
                  </div>
                  <span className="text-gray-400 group-hover:text-cyan-600">↗</span>
                </a>
              ))}
            </div>

            <p className="mt-6 text-xs text-gray-500">
              <strong>Clinical Disclaimer:</strong> Always verify vial labels, prescriptions, and local policy. Educational use only.
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
