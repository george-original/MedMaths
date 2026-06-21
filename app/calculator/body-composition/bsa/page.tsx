// app/calculator/body-composition/bsa/page.tsx
import Link from "next/link"
import type { Metadata } from "next"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FAQAccordion } from "@/components/faq-accordion"

import BSAClient from "./bsa-client"

const CANONICAL_URL = "https://www.medmaths.com/calculator/body-composition/bsa"

// Reviewed + updated (match ABW pill style)
const REVIEWED_BY_NAME = "George Lambroglou"
const REVIEWED_BY_CREDENTIALS = "RN"
const LAST_UPDATED_ISO = "2026-06-21"

export const metadata: Metadata = {
  title: "BSA Calculator | Body Surface Area for Dosing",
  description: "Calculate body surface area in m² for medication dosing using Mosteller, Du Bois, Haycock, and Gehan & George formulas.",
  keywords: ["BSA calculator", "body surface area calculator", "BSA m2 calculator", "Mosteller BSA calculator", "Du Bois BSA calculator", "BSA for chemotherapy dosing", "bsa", "body surface area", "m2", "m²", "mosteller", "dubois"],
  authors: [{ name: "George Lambroglou, RN", url: "https://www.medmaths.com/about" }],
  creator: "George Lambroglou, RN",
  publisher: "MedMaths",
  alternates: { canonical: "https://www.medmaths.com/calculator/body-composition/bsa" },
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
    title: "BSA Calculator | Body Surface Area for Dosing",
    description: "Calculate body surface area in m² for medication dosing using Mosteller, Du Bois, Haycock, and Gehan & George formulas.",
    url: "https://www.medmaths.com/calculator/body-composition/bsa",
    siteName: "MedMaths",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary",
    title: "BSA Calculator | Body Surface Area for Dosing",
    description: "Calculate body surface area in m² for medication dosing using Mosteller, Du Bois, Haycock, and Gehan & George formulas.",
  },
}

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Calculators", href: "/calculators" },
  { name: "Body Composition", href: "/calculator/body-composition" },
  { name: "Body Surface Area (BSA)", href: "/calculator/body-composition/bsa" },
]

const faqItems = [
  {
    question: "What is body surface area (BSA)?",
    quickAnswer:
      "Body surface area (BSA) estimates the total external surface area of the body and is expressed in square meters (m²).",
    details: [
      "BSA is widely used in clinical dosing—especially chemotherapy regimens prescribed as mg/m².",
      "It’s also used for physiological indexing (e.g., cardiac index = cardiac output ÷ BSA).",
      "BSA is an estimate—different validated formulas can produce slightly different values.",
    ],
  },
  {
    question: "Which BSA formula should I use?",
    quickAnswer:
      "Mosteller is most common in day-to-day clinical use due to simplicity, but protocols may specify another formula.",
    details: [
      "Mosteller: simple and widely used in many oncology workflows.",
      "DuBois & DuBois: historically important and still referenced in some systems.",
      "Haycock: commonly referenced in pediatric contexts.",
      "Gehan & George: an alternative validated approach used in some tools.",
    ],
  },
  {
    question: "Why do different BSA calculators give different results?",
    quickAnswer:
      "Different formulas use different constants/exponents, and rounding at different steps can change the final value.",
    details: [
      "Some calculators round inputs or outputs differently (e.g., BSA to 2 decimals), which can slightly shift results.",
      "Differences are usually small, but oncology dose rounding or capped BSA rules can make them more meaningful.",
      "Use the equation and rounding rules specified by your local protocol/pharmacy guidance.",
    ],
  },
  {
    question: "How is BSA used for chemotherapy dosing?",
    quickAnswer:
      "Many chemotherapy regimens are prescribed as mg/m², so the total dose is calculated by multiplying the regimen dose by BSA.",
    details: [
      "Typical approach: Dose (mg) = regimen dose (mg/m²) × BSA (m²).",
      "Protocols often include rounding rules and may include caps depending on the regimen.",
      "Always follow your local protocol and pharmacist/oncologist direction—BSA is only one part of safe dosing.",
    ],
  },
  {
    question: "Is BSA the same as BMI?",
    quickAnswer: "No. BMI is a weight-to-height ratio, while BSA estimates surface area in m².",
    details: [
      "BMI is used for weight classification and screening.",
      "BSA is used for dosing and physiological indexing.",
      "They measure different things and are not interchangeable.",
    ],
  },
  {
    question: "What units should I enter?",
    quickAnswer: "Enter height in centimeters (cm) and weight in kilograms (kg) to calculate BSA in m².",
    details: [
      "If you have pounds or inches/feet, convert first (or use a calculator with unit toggles).",
      "Unit errors can significantly change BSA and dosing outputs.",
      "If dosing medication, double-check units and follow local protocol.",
    ],
  },
]

type PracticeItem = {
  title: string
  prompt: string
  answerLine: string
  working: string
}

const practiceItems: PracticeItem[] = [
  {
    title: "Practice 1",
    prompt: "Height 170 cm, weight 70 kg. What is BSA (Mosteller)?",
    answerLine: "Answer: 1.82 m²",
    working: `BSA = √[(Height × Weight) / 3600]
BSA = √[(170 × 70) / 3600]
BSA = √(11900 / 3600)
BSA = √3.305556
BSA = 1.82 m²`,
  },
  {
    title: "Practice 2",
    prompt: "Height 165 cm, weight 95 kg. What is BSA (Mosteller)?",
    answerLine: "Answer: 2.09 m²",
    working: `BSA = √[(165 × 95) / 3600]
BSA = √(15675 / 3600)
BSA = √4.354167
BSA = 2.09 m²`,
  },
  {
    title: "Practice 3",
    prompt: "Height 110 cm, weight 18 kg. What is BSA (Mosteller)?",
    answerLine: "Answer: 0.74 m²",
    working: `BSA = √[(110 × 18) / 3600]
BSA = √(1980 / 3600)
BSA = √0.55
BSA = 0.74 m²`,
  },
]

function jsonLdBreadcrumbList() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((b, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: b.name,
      item: `https://www.medmaths.com${b.href}`,
    })),
  }
}

function jsonLdFAQPage() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.quickAnswer },
    })),
  }
}

function jsonLdWebApplication() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Body Surface Area (BSA) Calculator",
    description:
      "Calculate Body Surface Area (BSA) using Mosteller, DuBois, Haycock, or Gehan & George formulas. Includes clinical context, worked examples, practice questions, FAQs, and references.",
    url: CANONICAL_URL,
    applicationCategory: "HealthApplication",
    operatingSystem: "All",
  }
}

function ExternalLinkIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 text-gray-400 transition group-hover:text-emerald-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17L17 7" />
      <path d="M10 7h7v7" />
    </svg>
  )
}

type RefItem = {
  title: string
  badge: string
  org: string
  description: string
  href: string
}

const referenceGroups: Array<{ heading: string; items: RefItem[] }> = [
  {
    heading: "Key publications (original formula sources)",
    items: [
      {
        title: "Mosteller RD — Simplified calculation of body-surface area",
        badge: "PubMed",
        org: "N Engl J Med (1987)",
        description: "Classic simplified formula widely adopted in clinical calculators and dosing workflows.",
        href: "https://pubmed.ncbi.nlm.nih.gov/3657876/",
      },
      {
        title: "Du Bois D & Du Bois EF — A formula to estimate surface area from height and weight",
        badge: "Journal",
        org: "Arch Intern Med (1916)",
        description: "Historic BSA equation still referenced by many systems and tools.",
        href: "https://jamanetwork.com/journals/jamainternalmedicine/article-abstract/546302",
      },
      {
        title: "Haycock GB, Schwartz GJ, Wisotsky DH — Height–weight formula validated across ages",
        badge: "PubMed",
        org: "J Pediatr (1978)",
        description: "Validated BSA equation commonly referenced in pediatric and general contexts.",
        href: "https://pubmed.ncbi.nlm.nih.gov/650346/",
      },
      {
        title: "Gehan EA, George SL — Estimation of human body surface area from height and weight",
        badge: "Summary",
        org: "Cancer Chemother Rep (1970)",
        description: "Alternative validated BSA approach used in some calculators.",
        href: "https://www.semanticscholar.org/paper/Estimation-of-human-body-surface-area-from-height-Gehan-George/9318ca32d1628c19d2f4f20db74b118b001b041e",
      },
    ],
  },
  {
    heading: "Clinical tools & protocol-style resources",
    items: [
      {
        title: "eviQ — Body Surface Area (BSA) calculator",
        badge: "Protocol",
        org: "eviQ (Cancer Institute NSW)",
        description: "Protocol-style calculator resource with references and version history (widely used in AU oncology).",
        href: "https://www.eviq.org.au/clinical-resources/eviq-calculators/3198-body-surface-area-calculator",
      },
      {
        title: "Medscape — Body Surface Area Based Dosing",
        badge: "Clinical",
        org: "Medscape / QxMD tool",
        description: "Clinical tool summary for BSA-based dosing (commonly cites Mosteller).",
        href: "https://reference.medscape.com/calculator/692/body-surface-area-based-dosing",
      },
      {
        title: "Calculator.net — Body Surface Area Calculator",
        badge: "Reference",
        org: "Calculator.net",
        description: "Example of how common tools present multiple BSA formulas and background context.",
        href: "https://www.calculator.net/body-surface-area-calculator.html",
      },
    ],
  },
]

export default function Page() {
  return (
    <>
      {/* JSON-LD (MANDATORY) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbList()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQPage()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebApplication()) }} />

      <SiteHeader />

      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-3xl px-4 pb-12 pt-4 sm:px-6 sm:py-12 lg:px-8 lg:pt-10">
          {/* Breadcrumbs */}
          <nav className="mb-4 hidden text-sm text-gray-500 sm:block">
            <Link href="/" className="hover:text-gray-700">
              Home
            </Link>
            {" / "}
            <Link href="/calculators" className="hover:text-gray-700">
              Calculators
            </Link>
            {" / "}
            <Link href="/calculator/body-composition" className="hover:text-gray-700">
              Body Composition
            </Link>
            {" / "}
            <span className="text-gray-900">Body Surface Area (BSA)</span>
          </nav>

          <h1 className="mb-2 text-3xl font-bold sm:text-4xl tracking-tight text-gray-900 text-center">
            Body Surface Area (BSA) Calculator
          </h1>

          {/* Calculator */}
          <section id="calculator" className="calculator-tool mb-8 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-8">
            <BSAClient />
          </section>

          {/* Reviewed pills (match ABW style) */}
          <div className="mb-4 flex flex-wrap justify-center gap-2">
            <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-700 shadow-sm">
              Reviewed by {REVIEWED_BY_NAME}, {REVIEWED_BY_CREDENTIALS}
            </span>
            <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-700 shadow-sm">
              Last updated {LAST_UPDATED_ISO}
            </span>
          </div>

          <p className="mb-8 text-lg text-gray-600 text-center">
            Calculate BSA using common clinical formulas (Mosteller, DuBois, Haycock, Gehan &amp; George) with clear
            working, dosing context, practice questions, FAQs, and references.
          </p>

          <div className="mb-8 flex flex-wrap gap-3 justify-center">
            <span className="text-sm text-gray-600">Jump to:</span>
            <a href="#calculator" className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
              Calculator
            </a>
            <span className="text-gray-300">|</span>
            <a href="#how-it-works" className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
              How it works
            </a>
            <span className="text-gray-300">|</span>
            <a href="#formula" className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
              Formula
            </a>
            <span className="text-gray-300">|</span>
            <a href="#examples" className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
              Examples
            </a>
            <span className="text-gray-300">|</span>
            <a href="#practice-questions" className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
              Practice questions
            </a>
            <span className="text-gray-300">|</span>
            <a href="#clinical-notes" className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
              Clinical notes
            </a>
            <span className="text-gray-300">|</span>
            <a href="#faqs" className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
              FAQs
            </a>
            <span className="text-gray-300">|</span>
            <a href="#references" className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
              References
            </a>
          </div>


          <section id="how-it-works" className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 text-center">How it works</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Body Surface Area (BSA) is an estimate of the body’s external surface area and is expressed in square
                meters (m²). In healthcare, BSA is frequently used to scale doses—especially chemotherapy regimens
                prescribed as <span className="font-semibold text-gray-700">mg/m²</span>—and to index certain
                physiological measurements (for example, cardiac index).
              </p>

              <p>
                Because directly measuring surface area is impractical, BSA is calculated from height and weight using
                validated equations. Different formulas were derived from different datasets and methods, so outputs can
                vary slightly. Those differences are usually small, but they can matter when protocols include dose
                rounding rules or BSA caps—so always follow your local protocol.
              </p>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                <p className="font-semibold text-gray-900 mb-2">Common clinical uses</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Chemotherapy dosing (mg/m² → mg)</li>
                  <li>Indexing cardiac output (cardiac index)</li>
                  <li>Some high-risk or narrow-therapeutic medications (protocol dependent)</li>
                  <li>Research/physiology calculations where body size scaling is needed</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="formula" className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">Formula</h2>

            <div className="space-y-4">
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-700">
                <div className="font-semibold text-gray-800 mb-2">Mosteller (commonly used)</div>
                <div>BSA (m²) = √[(Height (cm) × Weight (kg)) / 3600]</div>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-700">
                <div className="font-semibold text-gray-800 mb-2">DuBois &amp; DuBois (historic)</div>
                <div>BSA (m²) = 0.007184 × Height(cm)^0.725 × Weight(kg)^0.425</div>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-700">
                <div className="font-semibold text-gray-800 mb-2">Haycock (often referenced in pediatrics)</div>
                <div>BSA (m²) = 0.024265 × Height(cm)^0.3964 × Weight(kg)^0.5378</div>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-700">
                <div className="font-semibold text-gray-800 mb-2">Gehan &amp; George (alternative validated)</div>
                <div>BSA (m²) = 0.0235 × Height(cm)^0.42246 × Weight(kg)^0.51456</div>
              </div>
            </div>

            <div className="mt-6 rounded-lg border border-gray-200 bg-white p-5">
              <p className="font-semibold text-gray-900 mb-2">How to apply BSA to a prescribed dose (mg/m²)</p>
              <p className="text-gray-600">
                If a regimen dose is prescribed as <span className="font-semibold text-gray-700">mg/m²</span>, the total
                dose is typically calculated as:
              </p>
              <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-700">
                <div>Total dose (mg) = regimen dose (mg/m²) × BSA (m²)</div>
              </div>
              <p className="mt-3 text-gray-600">
                After calculation, protocols often apply rounding rules (e.g., vial sizes) and may include additional
                clinical constraints (renal/hepatic function, intent of treatment, toxicity history).
              </p>
            </div>
          </section>

          {/* Worked examples (keep ABW-style emerald scheme; do not change layout) */}
          <section id="examples" className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">Worked examples</h2>

            <div className="mt-4 space-y-6">
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm border-l-4 border-emerald-500">
                <p className="font-medium text-gray-900">Example 1 (Mosteller): Height 170 cm, weight 70 kg</p>
                <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-900">
                  <div>BSA = √[(170 × 70) / 3600]</div>
                  <div>BSA = √[11900 / 3600]</div>
                  <div>BSA = √3.305556</div>
                  <div>BSA = 1.82 m²</div>
                </div>
                <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                  <p className="text-sm font-semibold text-emerald-900">Answer: 1.82 m²</p>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm border-l-4 border-emerald-500">
                <p className="font-medium text-gray-900">Example 2 (Mosteller): Height 160 cm, weight 55 kg</p>
                <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-900">
                  <div>BSA = √[(160 × 55) / 3600]</div>
                  <div>BSA = √[8800 / 3600]</div>
                  <div>BSA = √2.444444</div>
                  <div>BSA = 1.56 m²</div>
                </div>
                <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                  <p className="text-sm font-semibold text-emerald-900">Answer: 1.56 m²</p>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm border-l-4 border-emerald-500">
                <p className="font-medium text-gray-900">Example 3 (DuBois): Height 180 cm, weight 90 kg</p>
                <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-900">
                  <div>BSA = 0.007184 × 180^0.725 × 90^0.425</div>
                  <div>BSA ≈ 2.11 m²</div>
                </div>
                <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                  <p className="text-sm font-semibold text-emerald-900">Answer: 2.11 m²</p>
                </div>
              </div>
            </div>
          </section>

          {/* Practice questions (match ABW layout + button wording) */}
          <section id="practice-questions" className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900">Practice questions</h2>
            <p className="mt-2 text-sm text-gray-600">
              Designed for student nurses, junior doctors, and pharmacists who want to verify their steps.
              <br />
              Try it first, then reveal the answer and working.
            </p>

            <div className="mt-6 space-y-5">
              {practiceItems.map((q) => (
                <div key={q.title} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                  <p className="text-sm font-semibold text-gray-900">
                    {q.title}: {q.prompt}
                  </p>

                  <details className="mt-4">
                    <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                      <span className="inline-flex items-center rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700">
                        Show answer + working
                      </span>
                    </summary>

                    <div className="mt-4 space-y-3">
                      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                        <p className="text-sm font-semibold text-emerald-900">{q.answerLine}</p>
                      </div>

                      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-900 whitespace-pre-wrap">
                        {q.working}
                      </div>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </section>

          <section id="clinical-notes" className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">Clinical notes</h2>

            <div className="space-y-6 text-gray-600 leading-relaxed">
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Dose rounding and capped BSA</h3>
                <p>
                  Many chemotherapy protocols include dose rounding (e.g., vial-size practicality) and may include rules
                  for capped BSA in selected regimens. These policies are protocol-specific and vary by institution, drug,
                  and treatment intent.
                </p>
                <p className="mt-3">
                  If you are calculating chemotherapy doses, use your local regimen reference and pharmacist guidance for
                  rounding thresholds, maximum doses, capped BSA rules, and adjustments for toxicity or organ function.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Obesity and dosing considerations</h3>
                <p>
                  BSA-based dosing in obesity can be complex and may involve protocol-specific guidance, clinical
                  judgement, and pharmacist oversight. Some regimens specify full weight-based BSA, while others define
                  alternative approaches depending on the drug and indication.
                </p>
                <p className="mt-3">
                  Don’t substitute IBW/AdjBW into a BSA equation unless your protocol explicitly directs you to do so.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Pediatrics</h3>
                <p>
                  Some formulas (e.g., Haycock) are frequently cited in pediatric contexts, but the correct approach
                  depends on your pediatric oncology or pharmacy protocol. Always use the regimen’s specified method and
                  rounding policy.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12 rounded-lg border border-yellow-200 bg-yellow-50 p-6">
            <p className="text-sm text-gray-800">
              <span className="font-semibold">Clinical safety note:</span> BSA is an estimate used in dosing and indexing.
              If you are using BSA to calculate medication doses (especially chemotherapy), always follow your local
              protocol for the required formula, rounding rules, and any caps or dose limits. Confirm units and seek
              pharmacist/oncologist guidance when unsure.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">Related calculators</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              <Link
                href="/calculator/body-composition/ideal-body-weight"
                className="rounded-lg border border-gray-200 bg-white p-4 hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
              >
                <p className="font-medium text-gray-900 hover:text-emerald-600">Ideal Body Weight (IBW)</p>
                <p className="text-xs text-gray-500 mt-1">Height-based dosing weight support</p>
              </Link>

              <Link
                href="/calculator/renal-function/creatinine-clearance"
                className="rounded-lg border border-gray-200 bg-white p-4 hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
              >
                <p className="font-medium text-gray-900 hover:text-emerald-600">Creatinine Clearance</p>
                <p className="text-xs text-gray-500 mt-1">Renal dosing support</p>
              </Link>

              <Link
                href="/calculator/dose-calculations/mgkg-to-ml-dose"
                className="rounded-lg border border-gray-200 bg-white p-4 hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
              >
                <p className="font-medium text-gray-900 hover:text-emerald-600">mg/kg to mL Dose</p>
                <p className="text-xs text-gray-500 mt-1">Weight-based liquid dosing</p>
              </Link>
            </div>
          </section>

          <section id="faqs" className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">Frequently asked questions</h2>
            <FAQAccordion items={faqItems} />
          </section>

          <section id="references" className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">References &amp; Sources</h2>

            <div className="space-y-8">
              {referenceGroups.map((group) => (
                <div key={group.heading}>
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">{group.heading}</h3>

                  <div className="space-y-4">
                    {group.items.map((r) => (
                      <a
                        key={r.href}
                        href={r.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start justify-between gap-4 rounded-lg border border-gray-200 bg-white p-4 hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
                      >
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="font-semibold text-gray-900 group-hover:text-emerald-600">{r.title}</h4>
                            <span className="inline-flex items-center rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs text-gray-700">
                              {r.badge}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-gray-600">{r.org}</p>
                          <p className="mt-2 text-sm text-gray-700">{r.description}</p>
                        </div>

                        <ExternalLinkIcon />
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm text-gray-600">
              References are provided for education and transparency. For clinical dosing decisions—especially
              chemotherapy—always follow your local protocol and pharmacist/oncologist guidance.
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
