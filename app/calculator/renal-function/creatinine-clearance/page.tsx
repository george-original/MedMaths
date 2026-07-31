import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RelatedCalculators } from "@/components/related-calculators"
import { getCalculatorNetworkItems } from "@/lib/calculator-network"
import { CalculatorEquation, CalculatorTrustBlock } from "@/components/calculator"
import {
  buildCockcroftGaultWorking,
  calculateCockcroftGaultValue,
  calculateCockcroftGaultWeightCandidates,
  cockcroftGaultFormulaDefinitions,
  formatCockcroftGaultNumber,
} from "@/lib/creatinine-clearance-formulas"
import CreatinineClearanceClient from "./creatinine-clearance-client"

const CANONICAL = "https://www.medmaths.com/calculator/renal-function/creatinine-clearance"
const UPDATED_DATE = "2026-07-30"
const UPDATED_DATE_HUMAN = "30 July 2026"

export const metadata: Metadata = {
  title: "Creatinine Clearance Calculator | Cockcroft-Gault CrCl",
  description:
    "Estimate adult Cockcroft-Gault CrCl in mL/min using µmol/L or mg/dL, with explicit actual, Devine ideal, adjusted, or protocol-selected weight.",
  keywords: [
    "creatinine clearance calculator",
    "Cockcroft-Gault calculator",
    "Cockcroft Gault formula",
    "CrCl calculator",
    "CrCl formula",
    "creatinine clearance mL/min",
    "creatinine clearance µmol/L",
    "creatinine clearance mg/dL",
    "serum creatinine µmol/L to mg/dL",
    "eGFR vs creatinine clearance",
    "which weight for Cockcroft-Gault",
  ],
  authors: [{ name: "George Lambroglou, RN", url: "https://www.medmaths.com/about" }],
  creator: "George Lambroglou, RN",
  publisher: "MedMaths",
  alternates: { canonical: CANONICAL },
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
    title: "Creatinine Clearance Calculator | Cockcroft-Gault CrCl",
    description:
      "Estimate adult Cockcroft-Gault CrCl with µmol/L or mg/dL and record the selected actual, Devine ideal, adjusted, or protocol-specified weight.",
    url: CANONICAL,
    siteName: "MedMaths",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary",
    title: "Creatinine Clearance Calculator | Cockcroft-Gault CrCl",
    description:
      "Estimate adult Cockcroft-Gault CrCl with dual creatinine units, explicit weight selection, and clear CrCl-versus-eGFR boundaries.",
  },
}

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Calculators", href: "/calculators" },
  { name: "Creatinine Clearance", href: "/calculator/renal-function/creatinine-clearance" },
]

const faqItems = [
  {
    question: "What does a Cockcroft-Gault CrCl result mean?",
    quickAnswer:
      "It is an estimated creatinine clearance in mL/min calculated from age, selected weight, serum creatinine, and the Cockcroft-Gault sex factor.",
    details: [
      "The result is an estimate rather than a timed urine measurement or directly measured GFR.",
      "It is not a diagnosis, CKD stage, medication dose, or universal dosing category.",
      "Use it only when the current medicine label, dosing reference, pharmacist, prescriber, or local protocol requires Cockcroft-Gault CrCl.",
    ],
    microExample: "A result of 57.3 mL/min is the calculator estimate produced from the entered values and selected weight method.",
  },
  {
    question: "What formula does this calculator use?",
    quickAnswer: "It uses the adult Cockcroft-Gault equation and reports estimated creatinine clearance in mL/min.",
    details: [
      "Using mg/dL: CrCl = [(140 − age) × weight kg × sex factor] ÷ [72 × serum creatinine mg/dL].",
      "Using µmol/L: CrCl = [(140 − age) × weight kg × sex factor] ÷ [0.814 × serum creatinine µmol/L].",
      "The equation uses a factor of 1.0 for male and 0.85 for female.",
    ],
    microExample: "70 years, 80 kg, male, SCr 120 µmol/L → about 57.3 mL/min.",
  },
  {
    question: "Should I enter serum creatinine in µmol/L or mg/dL?",
    quickAnswer: "Use the unit shown on the pathology result. The calculator supports both units and changes the equation automatically.",
    details: [
      "Australian pathology commonly reports serum creatinine in µmol/L, while many international references use mg/dL.",
      "Choosing the wrong unit can create a major calculation error.",
      "For a rough check only, serum creatinine in mg/dL is approximately µmol/L divided by 88.4.",
    ],
    microExample: "106 µmol/L is approximately 1.20 mg/dL, not 106 mg/dL.",
  },
  {
    question: "Is Cockcroft-Gault CrCl the same as eGFR?",
    quickAnswer: "No. They are different estimates and should not be substituted automatically.",
    details: [
      "Cockcroft-Gault estimates creatinine clearance as an absolute mL/min value and includes a selected weight.",
      "Laboratory eGFR is commonly reported in mL/min/1.73 m² and is calculated with a different equation.",
      "Newer eGFR methods may be appropriate for many medicines, while some labels and references still specify Cockcroft-Gault CrCl. Use the method named by the current source.",
    ],
    microExample: "If a medicine monograph specifies Cockcroft-Gault CrCl, do not replace it with the laboratory eGFR without checking the guidance.",
  },
  {
    question: "Which weight should I use for Cockcroft-Gault?",
    quickAnswer:
      "Use the weight method required by the current medicine reference or local protocol. The calculator shows options but does not choose the clinically correct one.",
    details: [
      "You can enter a protocol-selected kilogram weight directly or compare actual, Devine ideal, and adjusted weight.",
      "The adjusted option uses IBW + 0.4 × (actual weight − IBW); the factor and method are not universal.",
      "The result records the selected method so the calculation can be checked.",
    ],
  },
  {
    question: "Can this calculator choose a renal medication dose?",
    quickAnswer: "No. It calculates arithmetic only and does not select a medicine, dose, interval, threshold, or dialysis adjustment.",
    details: [
      "A medicine reference may use CrCl bands, but those bands and actions are product-specific.",
      "The final decision may also depend on indication, renal trend, toxicity, therapeutic drug monitoring, dialysis, and clinical context.",
      "Use the exact renal estimate and thresholds stated in the current medicine source.",
    ],
  },
  {
    question: "When may Cockcroft-Gault be unreliable?",
    quickAnswer:
      "Be cautious when serum creatinine is changing rapidly or when creatinine does not reliably reflect filtration.",
    details: [
      "Examples include acute kidney injury, dialysis, pregnancy, severe frailty, low muscle mass, and extremes of body size.",
      "A single creatinine-based estimate can lag behind rapid renal change.",
      "Measured clearance, measured GFR, cystatin C, or another estimate may be needed depending on the clinical question.",
    ],
  },
  {
    question: "Why can two CrCl calculators give different answers?",
    quickAnswer:
      "They may use different creatinine units, weight methods, rounding rules, height formulas, or automatic assumptions.",
    details: [
      "Actual, ideal, adjusted, and directly entered protocol weights can produce different estimates.",
      "Some calculators round intermediate values while others round only the final result.",
      "Compare the equation, creatinine unit, selected weight, sex factor, and rounding before comparing outputs.",
    ],
  },
]

const umolWorkedExample = {
  age: 70,
  weightKg: 80,
  sexFactor: "male" as const,
  serumCreatinine: 120,
  unit: "umol" as const,
  value: calculateCockcroftGaultValue(70, 80, "male", 120, "umol"),
  working: buildCockcroftGaultWorking(70, 80, "male", 120, "umol"),
}

const mgdlWorkedExample = {
  age: 65,
  weightKg: 70,
  sexFactor: "female" as const,
  serumCreatinine: 1.2,
  unit: "mgdl" as const,
  value: calculateCockcroftGaultValue(65, 70, "female", 1.2, "mgdl"),
  working: buildCockcroftGaultWorking(65, 70, "female", 1.2, "mgdl"),
}

const weightMethodCandidates = calculateCockcroftGaultWeightCandidates(100, 175, "male")

const weightMethodExample = [
  {
    label: "Actual body weight",
    weightKg: weightMethodCandidates.actualWeightKg,
    crcl: calculateCockcroftGaultValue(60, weightMethodCandidates.actualWeightKg, "male", 100, "umol"),
  },
  {
    label: "Devine ideal body weight",
    weightKg: weightMethodCandidates.idealWeightKg,
    crcl: calculateCockcroftGaultValue(60, weightMethodCandidates.idealWeightKg, "male", 100, "umol"),
  },
  {
    label: "Adjusted body weight (0.4 factor)",
    weightKg: weightMethodCandidates.adjustedWeightKg,
    crcl: calculateCockcroftGaultValue(60, weightMethodCandidates.adjustedWeightKg, "male", 100, "umol"),
  },
]

const practiceQuestions = [
  {
    question: "A 70-year-old male uses a protocol-selected weight of 80 kg and has SCr 120 µmol/L. What is the estimated CrCl?",
    answer: "About 57.3 mL/min.",
    working: "[(140 − 70) × 80 × 1] ÷ (0.814 × 120) = 5600 ÷ 97.68 = 57.3 mL/min.",
  },
  {
    question: "A 65-year-old female uses a protocol-selected weight of 70 kg and has SCr 1.2 mg/dL. What is the estimated CrCl?",
    answer: "About 51.6 mL/min.",
    working: "[(140 − 65) × 70 × 0.85] ÷ (72 × 1.2) = 4462.5 ÷ 86.4 = 51.6 mL/min.",
  },
  {
    question: "A medicine reference specifies adjusted weight for a 60-year-old male who weighs 100 kg, is 175 cm tall, and has SCr 100 µmol/L. What estimate does the 0.4-factor helper produce?",
    answer: "Adjusted weight about 82.28 kg and CrCl about 80.9 mL/min.",
    working: "IBW 70.46 kg; adjusted weight = 70.46 + 0.4 × (100 − 70.46) = 82.28 kg; CrCl = [(140 − 60) × 82.28] ÷ (0.814 × 100) = 80.9 mL/min.",
  },
]

const commonMistakes = [
  "Entering a µmol/L creatinine value while the mg/dL equation is selected, or vice versa.",
  "Using laboratory eGFR when the current medicine source specifically requires Cockcroft-Gault CrCl.",
  "Allowing a calculator to choose actual, ideal, or adjusted weight without checking the dosing reference.",
  "Treating one CrCl value as a diagnosis or universal dose band without reviewing renal trend and medicine-specific guidance.",
]

function breadcrumbJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `https://www.medmaths.com${crumb.href}`,
    })),
  }
}

function faqJsonLd() {
  return {
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
  }
}

function webApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Creatinine Clearance Calculator",
    url: CANONICAL,
    applicationCategory: "HealthApplication",
    operatingSystem: "Any",
    description:
      "Estimate adult Cockcroft-Gault CrCl in mL/min using age, serum creatinine, and an explicitly selected actual, ideal, adjusted, or protocol-specified weight.",
    author: {
      "@type": "Person",
      name: "George Lambroglou, RN",
      url: "https://www.medmaths.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "MedMaths",
      url: "https://www.medmaths.com",
    },
    dateModified: UPDATED_DATE,
  }
}

export default function CreatinineClearancePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd()) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationJsonLd()) }}
      />

      <SiteHeader />

      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-3xl px-4 pb-12 pt-4 sm:px-6 sm:py-12 lg:px-8 lg:pt-10">
          <nav aria-label="Breadcrumb" className="mb-4 hidden text-sm text-gray-600 sm:block">
            <ol className="flex flex-wrap items-center gap-2">
              {breadcrumbs.map((breadcrumb, index) => {
                const isLast = index === breadcrumbs.length - 1
                return (
                  <li key={breadcrumb.href} className="flex items-center gap-2">
                    {index > 0 && <span className="text-gray-300">/</span>}
                    {isLast ? (
                      <span className="font-medium text-gray-900">{breadcrumb.name}</span>
                    ) : (
                      <Link href={breadcrumb.href} className="hover:text-blue-700">
                        {breadcrumb.name}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ol>
          </nav>

          <h1 className="mb-3 text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Creatinine Clearance Calculator — Cockcroft-Gault CrCl
          </h1>

          <section id="calculator" className="mb-8 scroll-mt-24">
            <CreatinineClearanceClient />
          </section>

          <section id="crcl-meaning" className="mb-8 grid gap-4 sm:grid-cols-2">
            <article className="rounded-2xl border border-blue-200 bg-blue-50 p-5 sm:p-6">
              <h2 className="text-xl font-bold text-gray-950">Cockcroft-Gault CrCl at a glance</h2>
              <p className="mt-2 text-sm leading-6 text-gray-700">
                This calculator estimates adult creatinine clearance in <strong>mL/min</strong> from age, serum creatinine, the Cockcroft-Gault sex factor, and an explicitly selected weight. It is an estimate, not a measured clearance, diagnosis, CKD stage, or medication dose.
              </p>
            </article>
            <article className="rounded-2xl border border-yellow-200 bg-yellow-50 p-5 sm:p-6">
              <h2 className="text-xl font-bold text-yellow-950">CrCl and eGFR are different estimates</h2>
              <p className="mt-2 text-sm leading-6 text-yellow-950">
                Use the renal estimate named by the current medicine label, dosing reference, pharmacist, prescriber, or local protocol. Newer eGFR methods may be appropriate for many medicines, while some sources still specify Cockcroft-Gault CrCl. Do not substitute one for the other automatically.
              </p>
            </article>
          </section>

          <section id="formula" className="mb-10">
            <div className="mb-5">
              <h2 className="text-2xl font-bold text-gray-900">How is creatinine clearance calculated?</h2>
              <p className="mt-2 text-sm leading-6 text-gray-700">
                Cockcroft-Gault subtracts age from 140, multiplies by the selected weight and sex factor, then divides by a serum-creatinine denominator. The denominator changes with the creatinine unit.
              </p>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <CalculatorEquation
                id="cockcroft-gault-umol-formula"
                title={cockcroftGaultFormulaDefinitions.umol.heading}
                equation={cockcroftGaultFormulaDefinitions.umol.equation}
                spokenEquation={cockcroftGaultFormulaDefinitions.umol.spokenEquation}
                plainEnglish={cockcroftGaultFormulaDefinitions.umol.plainEnglish}
                variables={[
                  { symbol: "CrCl", meaning: "estimated creatinine clearance in mL/min" },
                  { symbol: "weight", meaning: "the kilogram weight required by the dosing reference" },
                  { symbol: "sex factor", meaning: "1.0 for male or 0.85 for female in this equation" },
                  { symbol: "SCr", meaning: "serum creatinine in µmol/L" },
                ]}
                theme="renal"
                headingLevel="h3"
              />
              <CalculatorEquation
                id="cockcroft-gault-mgdl-formula"
                title={cockcroftGaultFormulaDefinitions.mgdl.heading}
                equation={cockcroftGaultFormulaDefinitions.mgdl.equation}
                spokenEquation={cockcroftGaultFormulaDefinitions.mgdl.spokenEquation}
                plainEnglish={cockcroftGaultFormulaDefinitions.mgdl.plainEnglish}
                variables={[
                  { symbol: "CrCl", meaning: "estimated creatinine clearance in mL/min" },
                  { symbol: "weight", meaning: "the kilogram weight required by the dosing reference" },
                  { symbol: "sex factor", meaning: "1.0 for male or 0.85 for female in this equation" },
                  { symbol: "SCr", meaning: "serum creatinine in mg/dL" },
                ]}
                theme="renal"
                headingLevel="h3"
              />
            </div>
            <p className="mt-4 text-sm leading-6 text-gray-600">
              The mg/dL equation uses 72 in the denominator. The equivalent µmol/L equation uses 0.814 after unit conversion. A value in µmol/L must never be entered into the mg/dL equation.
            </p>
          </section>

          <section id="worked-example" className="mb-10">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Cockcroft-Gault worked examples</h2>
            <div className="grid gap-4 lg:grid-cols-2">
              {[
                { title: "Example using µmol/L", example: umolWorkedExample },
                { title: "Example using mg/dL", example: mgdlWorkedExample },
              ].map(({ title, example }) => (
                <article key={title} className="space-y-3 rounded-2xl border border-blue-200 bg-blue-50 p-5">
                  <h3 className="font-semibold text-gray-950">{title}</h3>
                  <p className="text-sm leading-6 text-gray-700">
                    Age {example.age} years, weight {example.weightKg} kg, {example.sexFactor === "female" ? "female factor 0.85" : "male factor 1.0"}, serum creatinine {example.serumCreatinine} {example.unit === "umol" ? "µmol/L" : "mg/dL"}.
                  </p>
                  <div className="rounded-xl bg-white p-4 font-mono text-xs leading-6 text-gray-700 sm:text-sm">
                    {example.working.map((line) => <div key={line}>{line}</div>)}
                  </div>
                  <div className="rounded-xl border border-blue-200 bg-white p-3 text-sm font-semibold text-blue-950">
                    Exact result: {formatCockcroftGaultNumber(example.value, 4)} mL/min. Displayed to one decimal place: {formatCockcroftGaultNumber(example.value, 1)} mL/min.
                  </div>
                </article>
              ))}
            </div>
          </section>

          <details className="group mb-6 overflow-hidden rounded-2xl border border-blue-200 bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-gray-900 [&::-webkit-details-marker]:hidden">
              How to use the calculator and compare weight methods
              <span className="text-sm font-medium text-blue-700 group-open:hidden">Show</span>
              <span className="hidden text-sm font-medium text-blue-700 group-open:inline">Hide</span>
            </summary>
            <div className="space-y-6 border-t border-blue-200 p-5">
              <ol className="space-y-3 text-sm leading-6 text-gray-700">
                <li><span className="font-semibold text-gray-900">1. Select the Cockcroft-Gault sex factor and enter adult age.</span></li>
                <li><span className="font-semibold text-gray-900">2. Use the weight method specified by the current medicine source.</span> Enter that kilogram value directly, or compare actual, Devine ideal, and adjusted weight in the helper.</li>
                <li><span className="font-semibold text-gray-900">3. Choose the serum creatinine unit shown on the pathology result.</span> Changing the unit clears the field to prevent accidental carry-over.</li>
                <li><span className="font-semibold text-gray-900">4. Calculate and record the selected weight method with the CrCl result.</span></li>
                <li><span className="font-semibold text-gray-900">5. Apply only the thresholds and actions written in the current medicine guidance.</span></li>
              </ol>

              <div>
                <h3 className="font-semibold text-gray-900">Why the weight method matters</h3>
                <p className="mt-2 text-sm leading-6 text-gray-700">
                  For the same 60-year-old male, 100 kg actual weight, 175 cm height, and SCr 100 µmol/L, the arithmetic changes when a different weight is selected. These values demonstrate the difference only; they do not decide which method is clinically correct.
                </p>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {weightMethodExample.map((example) => (
                    <div key={example.label} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                      <p className="text-sm font-semibold text-gray-900">{example.label}</p>
                      <p className="mt-2 text-sm text-gray-600">Weight: {formatCockcroftGaultNumber(example.weightKg, 2)} kg</p>
                      <p className="mt-1 text-lg font-bold text-blue-700">CrCl {formatCockcroftGaultNumber(example.crcl, 1)} mL/min</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </details>

          <section id="clinical-notes" className="mb-10 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-2xl font-bold text-gray-900">When to pause before using the estimate</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-gray-700">
              <li><strong>The renal estimate is not specified:</strong> confirm whether the medicine guidance requires Cockcroft-Gault CrCl, eGFR, BSA-adjusted eGFR, measured clearance, or another method.</li>
              <li><strong>Serum creatinine is changing or may be misleading:</strong> acute kidney injury, dialysis, pregnancy, severe frailty, low muscle mass, and body-size extremes can reduce reliability.</li>
              <li><strong>The weight method is unclear:</strong> do not let the calculator choose actual, ideal, adjusted, or another weight by default.</li>
              <li><strong>The result is close to a dose threshold:</strong> recheck units, selected weight, trend, and the exact medicine-specific source before acting.</li>
            </ul>
          </section>

          <details id="common-mistakes" className="group mb-6 scroll-mt-24 overflow-hidden rounded-2xl border border-blue-200 bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-gray-900 [&::-webkit-details-marker]:hidden">
              Common mistakes to avoid
              <span className="text-sm font-medium text-blue-700 group-open:hidden">Show</span>
              <span className="hidden text-sm font-medium text-blue-700 group-open:inline">Hide</span>
            </summary>
            <div className="border-t border-blue-200 p-5">
              <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-gray-700">
                {commonMistakes.map((mistake) => <li key={mistake}>{mistake}</li>)}
              </ul>
            </div>
          </details>

          <details id="practice-questions" className="group mb-6 scroll-mt-24 overflow-hidden rounded-2xl border border-blue-200 bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-gray-900 [&::-webkit-details-marker]:hidden">
              Practice questions with working
              <span className="text-sm font-medium text-blue-700 group-open:hidden">Show</span>
              <span className="hidden text-sm font-medium text-blue-700 group-open:inline">Hide</span>
            </summary>
            <div className="space-y-3 border-t border-blue-200 p-5">
              {practiceQuestions.map((item, index) => (
                <details key={item.question} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <summary className="cursor-pointer font-semibold text-gray-900">Question {index + 1}: {item.question}</summary>
                  <div className="mt-3 space-y-2 text-sm leading-6 text-gray-700">
                    <p><span className="font-semibold">Answer:</span> {item.answer}</p>
                    <p className="font-mono text-xs text-gray-600">{item.working}</p>
                  </div>
                </details>
              ))}
            </div>
          </details>

          <details id="faqs" className="group mb-10 scroll-mt-24 overflow-hidden rounded-2xl border border-blue-200 bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-gray-900 [&::-webkit-details-marker]:hidden">
              Creatinine clearance FAQ
              <span className="text-sm font-medium text-blue-700 group-open:hidden">Show</span>
              <span className="hidden text-sm font-medium text-blue-700 group-open:inline">Hide</span>
            </summary>
            <div className="space-y-3 border-t border-blue-200 p-5">
              {faqItems.map((item) => (
                <details key={item.question} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <summary className="cursor-pointer font-semibold text-gray-900">{item.question}</summary>
                  <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
                    <p className="font-medium text-gray-900">{item.quickAnswer}</p>
                    {item.details.length > 0 && (
                      <ul className="list-disc space-y-1 pl-5">
                        {item.details.map((detail) => <li key={detail}>{detail}</li>)}
                      </ul>
                    )}
                    {item.microExample && <p className="rounded-lg border border-blue-100 bg-blue-50 p-3 text-xs text-blue-950">{item.microExample}</p>}
                  </div>
                </details>
              ))}
            </div>
          </details>

          <RelatedCalculators
            theme="renal"
            title="Related renal dosing calculators"
            description="Use these calculators when renal function connects to dosing weight, liquid dosing, tablet dosing, or body-size calculations."
            items={getCalculatorNetworkItems("/calculator/renal-function/creatinine-clearance")}
          />

          <CalculatorTrustBlock
            theme="renal"
            className="mt-10"
            author={{ name: "George Lambroglou", credentials: "RN", href: "/about" }}
            lastReviewed={{ iso: UPDATED_DATE, label: UPDATED_DATE_HUMAN }}
            note="Formula and educational content checked against the listed references. This calculator does not replace medicine-specific renal dosing guidance, pharmacy review, or clinical judgement."
          />

          <details id="references" className="group mt-6 overflow-hidden rounded-2xl border border-blue-200 bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-gray-900 [&::-webkit-details-marker]:hidden">
              References
              <span className="text-sm font-medium text-blue-700 group-open:hidden">Show</span>
              <span className="hidden text-sm font-medium text-blue-700 group-open:inline">Hide</span>
            </summary>
            <div className="space-y-4 border-t border-blue-200 p-5 text-sm leading-6 text-gray-700">
              <p>
                <a href="https://pubmed.ncbi.nlm.nih.gov/1244564/" target="_blank" rel="noreferrer" className="font-medium text-blue-700 underline">
                  Cockcroft DW, Gault MH — Prediction of creatinine clearance from serum creatinine
                </a>
                . Original 1976 publication of the Cockcroft-Gault equation.
              </p>
              <p>
                <a href="https://www.rcpa.edu.au/Manuals/RCPA-Manual/Pathology-Tests/C/Creatinine-clearance-estimated-eGFR" target="_blank" rel="noreferrer" className="font-medium text-blue-700 underline">
                  RCPA Manual — Creatinine clearance estimated: eGFR
                </a>
                . Australian pathology guidance noting Cockcroft-Gault use for assisting drug-dosing decisions in renal impairment.
              </p>
              <p>
                <a href="https://www.eviq.org.au/clinical-resources/eviq-calculators/3200-creatinine-clearance-calculator" target="_blank" rel="noreferrer" className="font-medium text-blue-700 underline">
                  eviQ — Creatinine Clearance Calculator
                </a>
                . Cockcroft-Gault formula, practice points, limitations, and oncology context.
              </p>
              <p>
                <a href="https://www.niddk.nih.gov/research-funding/research-programs/kidney-clinical-research-epidemiology/laboratory/ckd-drug-dosing-providers" target="_blank" rel="noreferrer" className="font-medium text-blue-700 underline">
                  NIDDK — Determining Drug Dosing in Adults with Chronic Kidney Disease
                </a>
                . Guidance on matching kidney-function estimates to medicine-specific dosing information and recognising limitations of serum-creatinine equations.
              </p>
              <p>
                <a href="https://bnf.nice.org.uk/medicines-guidance/prescribing-in-renal-impairment/" target="_blank" rel="noreferrer" className="font-medium text-blue-700 underline">
                  BNF/NICE — Prescribing in renal impairment
                </a>
                . Guidance on renal-function estimates for dose adjustment, including body-size extremes.
              </p>
            </div>
          </details>
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
