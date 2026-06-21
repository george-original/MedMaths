// app/calculator/body-composition/ideal-body-weight/page.tsx
import type { Metadata } from "next"
import Link from "next/link"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FAQAccordion } from "@/components/faq-accordion"

import IdealBodyWeightClient from "./ideal-body-weight-client"

const CANONICAL = "https://www.medmaths.com/calculator/body-composition/ideal-body-weight"
const UPDATED_DATE_ISO = "2026-06-21"
const UPDATED_DATE_HUMAN = "21 Jun 2026"

export const metadata: Metadata = {
  title: "Ideal Body Weight Calculator | Devine Formula",
  description: "Calculate ideal body weight in kg using the Devine formula for medication dosing, ventilation reference weight, and clinical checking.",
  keywords: ["ideal body weight calculator", "IBW calculator", "Devine formula calculator", "ideal body weight for dosing", "IBW kg", "predicted body weight calculator", "ibw", "ideal body weight", "devine", "predicted body weight"],
  authors: [{ name: "George Lambroglou, RN", url: "https://www.medmaths.com/about" }],
  creator: "George Lambroglou, RN",
  publisher: "MedMaths",
  alternates: { canonical: "https://www.medmaths.com/calculator/body-composition/ideal-body-weight" },
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
    title: "Ideal Body Weight Calculator | Devine Formula",
    description: "Calculate ideal body weight in kg using the Devine formula for medication dosing, ventilation reference weight, and clinical checking.",
    url: "https://www.medmaths.com/calculator/body-composition/ideal-body-weight",
    siteName: "MedMaths",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary",
    title: "Ideal Body Weight Calculator | Devine Formula",
    description: "Calculate ideal body weight in kg using the Devine formula for medication dosing, ventilation reference weight, and clinical checking.",
  },
}

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Calculators", href: "/calculators" },
  { name: "Body Composition", href: "/calculator/body-composition" },
  { name: "Ideal Body Weight (IBW)", href: "/calculator/body-composition/ideal-body-weight" },
]

const faqItems = [
  {
    question: "What is ideal body weight (IBW)?",
    quickAnswer:
      "Ideal body weight (IBW) is a height-based estimate used in some clinical calculations and dosing guidance.",
    details: [
      "IBW is derived from a height-based equation (it is not a direct measurement of body fat or body composition).",
      "IBW is commonly referenced in ICU contexts (e.g., predicted body weight for ventilation) and some dosing protocols.",
      "Always follow local protocol for whether to use actual body weight, ideal body weight, or adjusted body weight.",
    ],
    microExample: "Two people of the same height can have the same IBW even if their actual weights differ.",
  },
  {
    question: "Which formula does this IBW calculator use?",
    quickAnswer:
      "This calculator uses the Devine equation: base weight + 2.3 kg for every inch over 5 feet (60 inches).",
    details: [
      "Convert height from cm to inches: inches = cm ÷ 2.54.",
      "Calculate inches over 60: (height in) − 60.",
      "Use the male or female Devine equation.",
    ],
    microExample: "175 cm → 68.90 in → inches over 60 = 8.90.",
  },
  {
    question: "What is the IBW formula for females?",
    quickAnswer: "Female Devine IBW: 45.5 + 2.3 × (height in inches − 60).",
    details: [
      "First convert height from centimeters to inches using: inches = cm ÷ 2.54.",
      "Then subtract 60 inches and multiply by 2.3, and add 45.5 kg.",
      "Small differences between calculators can occur due to rounding at different steps.",
    ],
    microExample: "160 cm → 62.99 in → IBW = 45.5 + 2.3×2.99 = 52.4 kg.",
  },
  {
    question: "Can I calculate IBW using centimeters (cm) instead of inches?",
    quickAnswer:
      "Yes—use the standard Devine method (cm → inches), or use an approximate cm-formula for quick estimates.",
    details: [
      "Exact method: convert cm to inches first (cm ÷ 2.54), then apply Devine.",
      "Approximate shortcut (derived from Devine): Male ≈ 0.9055×cm − 88; Female ≈ 0.9055×cm − 92.5.",
      "Use the exact method when your protocol requires precise rounding rules.",
    ],
    microExample: "Male 175 cm: 0.9055×175 − 88 = 70.5 kg (approx).",
  },
  {
    question: "What is predicted body weight (PBW) and how is it related to IBW?",
    quickAnswer:
      "PBW is a height-based weight estimate used in some ventilation protocols; it is closely related to IBW but may use a different coefficient in cm-based formulas.",
    details: [
      "Some ARDS ventilation protocols use PBW formulas in centimeters (cm) rather than inches-based Devine.",
      "PBW is often used to set lung-protective tidal volumes.",
      "If your ICU protocol specifies PBW, follow that formula (and local rules for patients < 5 feet).",
    ],
    microExample: "PBW formulas often look like: base + 0.91×(cm − 152.4).",
  },
  {
    question: "Why do different IBW calculators give slightly different results?",
    quickAnswer: "Differences are usually due to rounding or using a different equation labeled as “IBW.”",
    details: [
      "Some calculators round the cm→in conversion earlier, which changes the final kg slightly.",
      "Some tools use alternative IBW equations (e.g., Robinson, Miller, Hamwi) but still label the output as IBW.",
      "If your workplace specifies a method, use that method consistently.",
    ],
    microExample: "68.9 inches vs 69 inches can change IBW by a small amount.",
  },
  {
    question: "When should I use adjusted body weight (AdjBW) instead of IBW?",
    quickAnswer:
      "Some drug protocols use adjusted body weight in obesity for selected medications—follow local guidance.",
    details: [
      "AdjBW accounts for partial drug distribution into adipose tissue.",
      "Drug-specific recommendations vary between protocols.",
      "If unsure, confirm with a pharmacist or local dosing policy.",
    ],
    microExample: "Some aminoglycoside protocols specify AdjBW rather than IBW.",
  },
  {
    question: "Is this the same as MDCalc / ClinCalc?",
    quickAnswer:
      "This page uses the Devine IBW equation; MDCalc and ClinCalc may show the same equation but can differ in rounding or may offer alternative IBW formulas.",
    details: [
      "If you are comparing results, ensure you are using the same sex selection and the same height conversion/rounding.",
      "Some calculators include multiple IBW equations and let you choose between them.",
      "For clinical work, follow your local protocol’s specified method.",
    ],
    microExample: "Rounding inches at 1 decimal vs 2 decimals can shift IBW by ~0.1–0.3 kg.",
  },
]

const practiceQuestions = [
  {
    q: "Practice 1: Male, height 175 cm. What is IBW (kg) using Devine (to 1 decimal)?",
    steps: [
      "Convert height (in): 175 ÷ 2.54 = 68.90",
      "Inches over 60: 68.90 − 60 = 8.90",
      "IBW: 50 + 2.3 × 8.90 = 70.47",
      "Rounded: 70.5 kg",
    ],
    answer: "70.5 kg",
  },
  {
    q: "Practice 2: Female, height 160 cm. What is IBW (kg) using Devine (to 1 decimal)?",
    steps: [
      "Convert height (in): 160 ÷ 2.54 = 62.99",
      "Inches over 60: 62.99 − 60 = 2.99",
      "IBW: 45.5 + 2.3 × 2.99 = 52.38",
      "Rounded: 52.4 kg",
    ],
    answer: "52.4 kg",
  },
  {
    q: "Practice 3: Male, height 190 cm. What is IBW (kg) using Devine (to 1 decimal)?",
    steps: [
      "Convert height (in): 190 ÷ 2.54 = 74.80",
      "Inches over 60: 74.80 − 60 = 14.80",
      "IBW: 50 + 2.3 × 14.80 = 84.04",
      "Rounded: 84.0 kg",
    ],
    answer: "84.0 kg",
  },
  {
    q: "Practice 4: Female, height 182 cm. What is IBW (kg) using Devine (to 1 decimal)?",
    steps: [
      "Convert height (in): 182 ÷ 2.54 = 71.65",
      "Inches over 60: 71.65 − 60 = 11.65",
      "IBW: 45.5 + 2.3 × 11.65 = 72.30",
      "Rounded: 72.3 kg",
    ],
    answer: "72.3 kg",
  },
  {
    q: "Practice 5: Female, height 150 cm. What happens with Devine when height is under 60 inches?",
    steps: [
      "Convert height (in): 150 ÷ 2.54 = 59.06",
      "Inches over 60: 59.06 − 60 = −0.94 (negative)",
      "IBW: 45.5 + 2.3 × (−0.94) = 45.5 − 2.16 = 43.34",
      "Rounded: 43.3 kg",
    ],
    answer: "43.3 kg",
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
  // For schema safety: keep answers short and consistent
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
    name: "IBW Calculator (Ideal Body Weight) – Devine Formula",
    description:
      "Calculate ideal body weight (IBW) in kg using the Devine formula for men and women. Includes worked examples, practice questions, FAQs, and references.",
    url: CANONICAL,
    applicationCategory: "MedicalApplication",
    operatingSystem: "All",
    author: {
      "@type": "Person",
      name: "George Lambroglou",
      jobTitle: "Registered Nurse",
    },
  }
}

function jsonLdMedicalWebPage() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "IBW Calculator (Ideal Body Weight) – Devine Formula",
    url: CANONICAL,
    dateModified: UPDATED_DATE_ISO,
    about: [{ "@type": "MedicalEntity", name: "Ideal body weight" }],
    author: { "@type": "Person", name: "George Lambroglou", jobTitle: "Registered Nurse" },
    reviewedBy: { "@type": "Person", name: "George Lambroglou", jobTitle: "Registered Nurse" },
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
    heading: "Primary & historical context",
    items: [
      {
        title: "Pai MP, Paloucek FP — The origin of the “ideal” body weight equations",
        badge: "PubMed",
        org: "Ann Pharmacother (2000)",
        description: "Historical perspective on where common IBW equations came from and why sources differ.",
        href: "https://pubmed.ncbi.nlm.nih.gov/10981254/",
      },
      {
        title: "Peterson CM et al. — Universal equation for estimating ideal body weight",
        badge: "PMC",
        org: "Am J Clin Nutr (2016)",
        description: "Compares multiple IBW equations (including Devine) and provides broader context.",
        href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4841935/",
      },
    ],
  },
  {
    heading: "Clinical use (ventilation / PBW)",
    items: [
      {
        title: "ARDSNet trial — Lower tidal volume ventilation (PBW formula in methods)",
        badge: "Journal",
        org: "NEJM (2000)",
        description: "Landmark ARDS ventilation strategy paper that defines PBW using height-based formulas.",
        href: "https://www.nejm.org/doi/full/10.1056/NEJM200005043421801",
      },
      {
        title: "MPOG chart — IBW / tidal volume chart (PBW formula, cm-based)",
        badge: "PDF",
        org: "Michigan Program on Value Enhancement",
        description: "Quick reference chart showing PBW formulas in cm and guidance for patients < 5 feet.",
        href: "https://mpog.org/files/quality/toolkit/ibw_tv_chart1.pdf",
      },
    ],
  },
  {
    heading: "Bedside calculators & summaries",
    items: [
      {
        title: "MDCalc — Ideal Body Weight & Adjusted Body Weight",
        badge: "Clinical",
        org: "MDCalc",
        description: "Widely used bedside reference summarizing IBW/AdjBW equations and common use-cases.",
        href: "https://www.mdcalc.com/calc/68/ideal-body-weight-adjusted-body-weight",
      },
      {
        title: "ClinCalc — Ideal, Adjusted, and Nutritional Body Weight",
        badge: "Clinical",
        org: "ClinCalc.com",
        description: "Clear explanation of IBW and related weight metrics (including adjusted approaches).",
        href: "https://clincalc.com/kinetics/idealbw.aspx",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdMedicalWebPage()) }} />

      <SiteHeader />

      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-3xl px-4 pb-12 pt-4 sm:px-6 sm:py-12 lg:px-8 lg:pt-10">
          {/* Breadcrumb nav (MANDATORY) */}
          <nav aria-label="Breadcrumb" className="mb-4 hidden text-sm text-gray-600 sm:block">
            <ol className="flex flex-wrap items-center gap-2">
              {breadcrumbs.map((b, idx) => {
                const isLast = idx === breadcrumbs.length - 1
                return (
                  <li key={b.href} className="flex items-center gap-2">
                    {idx > 0 && <span className="text-gray-300">/</span>}
                    {isLast ? (
                      <span className="font-medium text-gray-900">{b.name}</span>
                    ) : (
                      <Link href={b.href} className="hover:text-emerald-700">
                        {b.name}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ol>
          </nav>

          {/* H1 + subtitle (MANDATORY) */}
          <header className="mb-8">
            <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ideal Body Weight (IBW) Calculator
            </h1>

          {/* Calculator */}
          <section id="calculator" className="calculator-tool mb-8 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-8">
            <IdealBodyWeightClient />
          </section>

            {/* Reviewed pills (MATCH ABW STYLE) */}
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700">
                Reviewed by George Lambroglou, RN
              </span>
              <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700">
                Last updated {UPDATED_DATE_HUMAN}
              </span>
            </div>

            <p className="mt-4 text-center text-base text-gray-600 sm:text-lg">
              Calculate IBW in kilograms using the <strong>Devine formula</strong> (male/female) with worked examples,
              practice questions, FAQs, and references.
            </p>
          </header>

          {/* Intent clarification (KEEP + OPTIMIZE) */}
          <section className="mb-10 rounded-xl border border-gray-200 bg-gray-50 p-5">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Important:</span> This is a{" "}
              <span className="font-semibold">clinical IBW</span> calculator (a height-based estimate used in some ICU
              and dosing contexts). It is <span className="font-semibold">not</span> a “healthy target weight” tool and
              does not measure body fat. Follow local protocol for which weight metric to use (Actual, IBW, or Adjusted).
            </p>
          </section>

          {/* Jump-to nav (MANDATORY) */}
          <div className="mb-10 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
            <Link href="#calculator" className="text-emerald-600 hover:text-emerald-700">
              Calculator
            </Link>
            <Link href="#how-it-works" className="text-emerald-600 hover:text-emerald-700">
              How it works
            </Link>
            <Link href="#formula" className="text-emerald-600 hover:text-emerald-700">
              Formula
            </Link>
            <Link href="#examples" className="text-emerald-600 hover:text-emerald-700">
              Examples
            </Link>
            <Link href="#practice" className="text-emerald-600 hover:text-emerald-700">
              Practice questions
            </Link>
            <Link href="#faqs" className="text-emerald-600 hover:text-emerald-700">
              FAQs
            </Link>
            <Link href="#references" className="text-emerald-600 hover:text-emerald-700">
              References
            </Link>
          </div>

          {/* Calculator section card (MANDATORY) */}
          

          {/* How it works (MANDATORY) */}
          <section id="how-it-works" className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900">How to calculate IBW</h2>

            <div className="mt-4 space-y-4 text-gray-700">
              <p>
                Ideal body weight (IBW) is a <strong>height-based estimate</strong>. In practice, it’s used when a
                protocol asks for a standardized weight that is less influenced by adipose mass than total body weight
                (TBW). Examples include some drug-dosing guidance and some ICU workflows.
              </p>

              <p>
                This page uses the <strong>Devine equation</strong>. To compute it reliably:
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Step 1:</strong> Convert height from <strong>cm → inches</strong> using{" "}
                  <span className="font-mono">in = cm ÷ 2.54</span>
                </li>
                <li>
                  <strong>Step 2:</strong> Compute <strong>inches over 60</strong>:{" "}
                  <span className="font-mono">(in − 60)</span>
                </li>
                <li>
                  <strong>Step 3:</strong> Apply the Devine formula for <strong>male</strong> or{" "}
                  <strong>female</strong>.
                </li>
                <li>
                  <strong>Step 4:</strong> Follow your workplace’s <strong>rounding policy</strong> (e.g., 0.1 kg or 0.5
                  kg).
                </li>
              </ul>

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Quick note on common queries:</span> “Female IBW” uses the same
                  structure, but the base constant changes (45.5 kg). “Predicted body weight (PBW)” in ventilation
                  protocols is also height-based and may use a cm-based coefficient.
                </p>
              </div>
            </div>
          </section>

          {/* Formula (MANDATORY) */}
          <section id="formula" className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900">Formula</h2>

            <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-900">
              <div>Convert: height (in) = height (cm) ÷ 2.54</div>
              <div className="mt-2">Male: IBW (kg) = 50 + 2.3 × (height in − 60)</div>
              <div>Female: IBW (kg) = 45.5 + 2.3 × (height in − 60)</div>
            </div>

            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5">
              <h3 className="text-sm font-semibold text-gray-900">IBW formula in cm (quick estimate)</h3>
              <p className="mt-2 text-sm text-gray-700">
                Some people search for “ideal body weight formula in cm”. You can derive an approximate cm-form from
                Devine (because <span className="font-mono">2.3 ÷ 2.54 ≈ 0.9055</span>):
              </p>

              <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-900">
                <div>Male (approx): IBW (kg) ≈ 0.9055 × height(cm) − 88</div>
                <div>Female (approx): IBW (kg) ≈ 0.9055 × height(cm) − 92.5</div>
              </div>

              <p className="mt-3 text-xs text-gray-600">
                Use the cm→inches method for exact consistency with protocols. Shortcut formulas can differ slightly due
                to rounding.
              </p>
            </div>

            <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
              <h3 className="text-sm font-semibold text-emerald-900">Predicted Body Weight (PBW) note (ventilation)</h3>
              <p className="mt-2 text-sm text-emerald-900">
                If your search is about “predicted body weight”, many ventilation protocols use a cm-based PBW formula.
                Always follow your ICU guideline (especially for patients &lt; 5 feet).
              </p>
              <div className="mt-3 rounded-lg border border-emerald-200 bg-white p-4 font-mono text-sm text-gray-900">
                <div>PBW (male): 50 + 0.91 × (height(cm) − 152.4)</div>
                <div>PBW (female): 45.5 + 0.91 × (height(cm) − 152.4)</div>
              </div>
            </div>
          </section>

          {/* Worked examples (MANDATORY) */}
          <section id="examples" className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900">Worked examples</h2>

            <div className="mt-4 space-y-6">
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm border-l-4 border-emerald-500">
                <p className="font-medium text-gray-900">Example 1 (Male): Height 175 cm</p>
                <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-900">
                  <div>Height (in) = 175 ÷ 2.54 = 68.90</div>
                  <div>Inches over 60 = 68.90 − 60 = 8.90</div>
                  <div>IBW = 50 + 2.3 × 8.90 = 70.47</div>
                  <div>IBW = 70.5 kg (rounded)</div>
                </div>
                <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                  <p className="text-sm font-semibold text-emerald-900">Answer: 70.5 kg</p>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm border-l-4 border-emerald-500">
                <p className="font-medium text-gray-900">Example 2 (Female): Height 160 cm</p>
                <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-900">
                  <div>Height (in) = 160 ÷ 2.54 = 62.99</div>
                  <div>Inches over 60 = 62.99 − 60 = 2.99</div>
                  <div>IBW = 45.5 + 2.3 × 2.99 = 52.38</div>
                  <div>IBW = 52.4 kg (rounded)</div>
                </div>
                <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                  <p className="text-sm font-semibold text-emerald-900">Answer: 52.4 kg</p>
                </div>
              </div>
            </div>
          </section>

          {/* Practice questions (MANDATORY) */}
          <section id="practice" className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900">Practice questions</h2>
            <p className="mt-2 text-sm text-gray-700">
              Designed for student nurses, junior doctors, and pharmacists who want to verify their steps. Try it first,
              then reveal the answer and working.
            </p>

            <div className="mt-4 space-y-4">
              {practiceQuestions.map((pq) => (
                <details key={pq.q} className="group rounded-xl border border-emerald-200 bg-white p-4 shadow-sm">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                    <p className="font-semibold text-gray-900">{pq.q}</p>

                    <span className="shrink-0 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white group-open:hidden">
                      Show answer + working
                    </span>
                    <span className="shrink-0 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hidden group-open:inline">
                      Hide
                    </span>
                  </summary>

                  <div className="mt-4 space-y-3">
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-900">
                      {pq.steps.map((s) => (
                        <div key={s}>{s}</div>
                      ))}
                    </div>

                    <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                      <p className="text-sm font-semibold text-emerald-900">Answer: {pq.answer}</p>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Clinical safety note (MANDATORY) */}
          <section className="mb-12">
            <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-5">
              <h2 className="text-base font-semibold text-yellow-900">Clinical safety note</h2>
              <p className="mt-2 text-sm text-yellow-900">
                IBW is an estimate used in some protocols. Always confirm which weight metric your guideline requires
                (actual, ideal, adjusted, or PBW) and follow local pharmacy/ICU protocols, including rounding rules.
              </p>
            </div>
          </section>

          {/* Related calculators (RULES: hardcode Next/Link only, omit unknown routes) */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900">Related calculators</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <Link
                href="/calculator/body-composition/bsa"
                className="group rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50"
              >
                <p className="font-medium text-gray-900 group-hover:text-emerald-600">Body Surface Area (BSA)</p>
                <p className="mt-1 text-sm text-gray-600">Commonly used for chemotherapy dosing support.</p>
              </Link>

              <Link
                href="/calculator/renal-function/creatinine-clearance"
                className="group rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50"
              >
                <p className="font-medium text-gray-900 group-hover:text-emerald-600">Creatinine Clearance</p>
                <p className="mt-1 text-sm text-gray-600">Renal function estimate used in medication dosing support.</p>
              </Link>

              <Link
                href="/calculator/dose-calculations/mgkg-to-ml-dose"
                className="group rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50"
              >
                <p className="font-medium text-gray-900 group-hover:text-emerald-600">mg/kg to mL Dose</p>
                <p className="mt-1 text-sm text-gray-600">Convert a weight-based dose into a liquid volume.</p>
              </Link>
            </div>
          </section>

          {/* FAQs (MANDATORY) */}
          <section id="faqs" className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900">FAQs</h2>
            <div className="mt-4">
              <FAQAccordion items={faqItems} />
            </div>
          </section>

          {/* References (MANDATORY) */}
          <section id="references" className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900">References &amp; Sources</h2>

            <div className="mt-6 space-y-8">
              {referenceGroups.map((group) => (
                <div key={group.heading}>
                  <h3 className="text-sm font-semibold text-gray-700">{group.heading}</h3>

                  <div className="mt-3 space-y-3">
                    {group.items.map((r) => (
                      <a
                        key={r.href}
                        href={r.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-start justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50"
                      >
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-medium text-gray-900 transition group-hover:text-emerald-600">
                              {r.title}
                            </p>
                            <span className="rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs text-gray-700">
                              {r.badge}
                            </span>
                          </div>

                          <p className="mt-1 text-sm text-gray-600">{r.org}</p>
                          <p className="mt-1 text-sm text-gray-700">{r.description}</p>
                        </div>

                        <ExternalLinkIcon />
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-5 text-sm text-gray-600">
              References are provided for education. Always follow local protocol and pharmacist/ICU guidance.
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
