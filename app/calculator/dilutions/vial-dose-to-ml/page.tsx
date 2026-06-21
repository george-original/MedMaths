import type { Metadata } from "next"
import Link from "next/link"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FAQAccordion } from "@/components/faq-accordion"

import VialDoseToMlClient from "./vial-dose-to-ml-client"

const CANONICAL = "https://www.medmaths.com/calculator/dilutions/vial-dose-to-ml"

export const metadata: Metadata = {
  title: "Vial Dose to mL Calculator | Draw-Up Volume",
  description: "Convert an ordered vial dose in mg to draw-up volume in mL using vial concentration. Shows dose ÷ concentration formula and examples.",
  keywords: ["vial dose to mL calculator", "dose to volume calculator", "vial concentration calculator", "draw up volume calculator", "mg to mL vial dose", "dose to ml", "dose to mL", "vial dose", "draw up volume", "volume"],
  authors: [{ name: "George Lambroglou, RN", url: "https://www.medmaths.com/about" }],
  creator: "George Lambroglou, RN",
  publisher: "MedMaths",
  alternates: { canonical: "https://www.medmaths.com/calculator/dilutions/vial-dose-to-ml" },
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
    title: "Vial Dose to mL Calculator | Draw-Up Volume",
    description: "Convert an ordered vial dose in mg to draw-up volume in mL using vial concentration. Shows dose ÷ concentration formula and examples.",
    url: "https://www.medmaths.com/calculator/dilutions/vial-dose-to-ml",
    siteName: "MedMaths",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary",
    title: "Vial Dose to mL Calculator | Draw-Up Volume",
    description: "Convert an ordered vial dose in mg to draw-up volume in mL using vial concentration. Shows dose ÷ concentration formula and examples.",
  },
}

export default function Page() {
  const faqItems = [
    {
      question: "What if the volume is very small (e.g., 0.01 mL)?",
      quickAnswer: "Use the smallest appropriate syringe (or pharmacy preparation) for accuracy.",
      details: [
        "Very small volumes are hard to measure accurately with standard syringes.",
        "Consider a 1 mL (tuberculin) syringe for small volumes.",
        "If the volume is impractically small, confirm if the medication should be diluted or prepared by pharmacy.",
      ],
    },
    {
      question: "Can I round the volume?",
      quickAnswer: "Round only to what you can measure safely with your device and policy.",
      details: [
        "Match rounding to syringe graduations (e.g., 0.01 mL on a 1 mL syringe).",
        "Avoid rounding that changes the dose meaningfully.",
      ],
    },
    {
      question: "What if my concentration is in micrograms (mcg/mL)?",
      quickAnswer: "Make sure dose and concentration are in the same units before calculating.",
      details: ["Convert units as needed (1 mg = 1000 mcg).", "Then use Volume = Dose ÷ Concentration."],
    },
    {
      question: "Is this used for IM, IV, and SC routes?",
      quickAnswer: "Yes—the calculation is the same for any route; only the administration limits differ.",
      details: ["Always confirm route and maximum volumes per local protocol.", "Verify the vial label concentration."],
    },
    {
      question: "How do I double-check the answer quickly?",
      quickAnswer: "Multiply your calculated volume by the concentration—this should return the dose.",
      details: ["Check: Volume × Concentration = Dose.", "If it doesn’t match, re-check units and decimal places."],
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
    name: "Vial Dose to mL Calculator",
    description: "Convert an ordered vial dose in mg to draw-up volume in mL using vial concentration.",
    url: "https://www.medmaths.com/calculator/dilutions/vial-dose-to-ml",
    applicationCategory: "MedicalApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    author: { "@type": "Person", name: "George Lambroglou", jobTitle: "Registered Nurse" },
    publisher: { "@type": "Organization", name: "MedMaths", url: "https://www.medmaths.com" },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SiteHeader />

      <main className="min-h-screen bg-background">
        <div className="container mx-auto max-w-4xl px-4 pb-12 pt-4 sm:py-8 lg:pt-10">
          {/* Breadcrumb */}
          <nav className="mb-4 hidden flex-wrap items-center gap-2 text-sm text-muted-foreground sm:flex">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span>/</span>
            <Link href="/calculators" className="hover:text-foreground">
              Calculators
            </Link>
            <span>/</span>
            <Link href="/calculator/dilutions" className="hover:text-foreground">
              Dilutions
            </Link>
            <span>/</span>
            <span className="text-foreground">Vial Dose to mL</span>
          </nav>

          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="mb-3 text-3xl font-bold sm:text-4xl text-foreground">Vial Dose to mL</h1>

          {/* Calculator */}
          <section id="calculator" className="calculator-tool mb-8 rounded-2xl border border-border bg-card p-4 shadow-sm scroll-mt-24 sm:p-8">
            <VialDoseToMlClient />
          </section>
          <p className="mb-4 text-center text-xs text-gray-500">
            Written by <span className="font-semibold text-gray-700">George Lambroglou, RN</span> • Formula checked against listed references • Last reviewed 21 Jun 2026
          </p>
            <p className="text-lg text-muted-foreground">
              Convert a prescribed dose (mg) into the volume (mL) to withdraw from a vial using the vial concentration
              (mg/mL).
            </p>
          </div>

          {/* Jump to Navigation */}
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {[
              ["#calculator", "Calculator"],
              ["#how-it-works", "How It Works"],
              ["#formula", "Formula"],
              ["#examples", "Examples"],
              ["#when-used", "When Used"],
              ["#faqs", "FAQs"],
              ["#references", "References"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700 hover:bg-purple-200"
              >
                {label}
              </a>
            ))}
          </div>

          {/* How It Works */}
          <section id="how-it-works" className="mb-12 scroll-mt-24">
            <h2 className="mb-4 text-2xl font-bold text-foreground text-center">How it works</h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                If a vial concentration is given as <span className="font-semibold text-foreground">mg/mL</span> and a
                dose is prescribed in <span className="font-semibold text-foreground">mg</span>, you can calculate the
                volume to draw in mL by dividing dose by concentration.
              </p>
              <p>
                This is the same principle used across injections and infusions:{" "}
                <span className="font-semibold text-foreground">amount = concentration × volume</span>.
              </p>
            </div>
          </section>

          {/* Formula */}
          <section id="formula" className="mb-12 scroll-mt-24">
            <h2 className="mb-4 text-2xl font-bold text-foreground text-center">Formula</h2>
            <div className="rounded-xl border border-border bg-muted/50 p-6 font-mono text-sm text-foreground">
              <div>Volume (mL) = Dose (mg) ÷ Concentration (mg/mL)</div>
            </div>
          </section>

          {/* Worked Examples */}
          <section id="examples" className="mb-12 scroll-mt-24">
            <h2 className="mb-6 text-2xl font-bold text-foreground text-center">Worked examples</h2>

            <div className="space-y-6">
              {[
                {
                  title: "Example 1: Standard IV injection",
                  scenario: "Morphine 10 mg/mL. Dose 5 mg. How many mL?",
                  lines: ["Volume = 5 ÷ 10 = 0.5 mL"],
                  answer: "Answer: 0.5 mL",
                },
                {
                  title: "Example 2: Paediatric dosing",
                  scenario: "Furosemide 20 mg/mL. Dose 4 mg. How many mL?",
                  lines: ["Volume = 4 ÷ 20 = 0.2 mL"],
                  answer: "Answer: 0.2 mL",
                },
                {
                  title: "Example 3: High concentration (small volumes)",
                  scenario: "Atropine 100 mg/mL. Dose 1 mg. How many mL?",
                  lines: ["Volume = 1 ÷ 100 = 0.01 mL", "Use an appropriate device (e.g., 1 mL syringe)."],
                  answer: "Answer: 0.01 mL",
                },
              ].map((ex) => (
                <div key={ex.title} className="rounded-xl border border-border bg-card p-6 shadow-sm border-l-4 border-purple-500">
                  <p className="font-semibold text-foreground">{ex.title}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{ex.scenario}</p>
                  <div className="mt-3 rounded-lg bg-muted/50 p-4 font-mono text-sm text-foreground">
                    {ex.lines.map((l) => (
                      <div key={l}>{l}</div>
                    ))}
                  </div>
                  <div className="mt-3 rounded-lg bg-purple-50 border border-purple-200 p-3 text-sm font-semibold text-foreground text-center">
                    {ex.answer}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* When This Is Used */}
          <section id="when-used" className="mb-12 scroll-mt-24">
            <h2 className="mb-4 text-2xl font-bold text-foreground">When this calculator is used</h2>
            <ul className="space-y-2 text-muted-foreground">
              {[
                "Converting a prescribed dose (mg) into a withdraw volume (mL)",
                "IV/IM/SC medication preparation from vials",
                "Paediatric or neonatal dosing where small volumes matter",
                "Rapid checks in emergency/critical care",
                "Second-check verification of manual calculations",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Safety Note */}
          <section className="mb-12 rounded-xl border border-yellow-200 bg-yellow-50 p-6">
            <p className="text-sm text-yellow-900">
              <span className="font-semibold">Clinical safety reminder:</span> Always verify the vial label concentration and perform an independent check.
              Use the smallest appropriate syringe for accuracy, especially for very small volumes.
            </p>
          </section>

          {/* Related Calculators */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-foreground text-center">Related calculators</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { title: "C1V1 = C2V2", href: "/calculator/dilutions/c1v1-c2v2-basic" },
                { title: "Stock + Volume", href: "/calculator/dilutions/vial-dose-to-ml" },
                { title: "mg to mL", href: "/calculator/dose-calculations/mg-to-ml" },
              ].map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="rounded-xl border border-border bg-card p-4 hover:border-purple-300 hover:bg-purple-50 transition-colors"
                >
                  <p className="font-medium text-foreground hover:text-purple-600">{c.title}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQs */}
          <section id="faqs" className="mb-12 scroll-mt-24">
            <h2 className="mb-6 text-2xl font-bold text-foreground text-center">Frequently asked questions</h2>
            <FAQAccordion items={faqItems} accentColor="purple" />
          </section>

          {/* References */}
          <section id="references" className="mb-12 scroll-mt-24">
            <h2 className="mb-6 text-2xl font-bold text-foreground text-center">References & sources</h2>
            <div className="space-y-3">
              {[
                {
                  title: "Institute for Safe Medication Practices (ISMP)",
                  desc: "Medication safety guidance and error prevention",
                  href: "https://www.ismp.org/",
                },
                {
                  title: "WHO Medication Safety",
                  desc: "Global medication safety initiatives and guidance",
                  href: "https://www.who.int/teams/integrated-health-services/medication-safety",
                },
                {
                  title: "ACSQHC Medication Safety Standard (NSQHS)",
                  desc: "Australian medication safety standard",
                  href: "https://www.safetyandquality.gov.au/standards/nsqhs-standards/medication-safety-standard",
                },
              ].map((r) => (
                <a
                  key={r.href}
                  href={r.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start justify-between gap-4 rounded-xl border border-border bg-card p-4 hover:border-purple-300 hover:bg-purple-50 transition-colors"
                >
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-purple-600">{r.title}</p>
                    <p className="text-sm text-muted-foreground">{r.desc}</p>
                  </div>
                  <span className="text-muted-foreground group-hover:text-purple-600">↗</span>
                </a>
              ))}
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
              <strong>Clinical disclaimer:</strong> Educational use only. Verify labels and calculations per policy.
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
