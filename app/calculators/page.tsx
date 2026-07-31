import type { Metadata } from "next"
import Link from "next/link"
import {
  Activity,
  ArrowRight,
  Beaker,
  Calculator,
  Droplet,
  Pill,
  Search,
  ShieldCheck,
  Syringe,
  Weight,
  type LucideIcon,
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CalculatorSearch } from "@/components/calculator-search"
import {
  CalculatorDirectory,
  CalculatorTopicGrid,
  CalculatorTrustBlock,
  DirectoryDisclosure,
} from "@/components/calculator"
import { getCalculatorThemeStyle, type CalculatorThemeKey } from "@/lib/calculator-themes"
import { allCalculatorCatalogItems, calculatorCatalog } from "@/lib/calculator-catalog"

const CANONICAL = "https://www.medmaths.com/calculators"

export const metadata: Metadata = {
  title: "Medical Maths Calculators | Medication, IV & Dosing Tools",
  description:
    "Browse MedMaths medical maths calculators for mg to mL, tablet dosing, mg/kg doses, IV drip rates, dilutions, BSA, ideal body weight, and creatinine clearance.",
  keywords: [
    "medical maths calculators",
    "med maths calculators",
    "medication maths calculators",
    "nursing calculation calculators",
    "drug calculation calculator",
    "mg to mL calculator",
    "tablet dose calculator",
    "IV drip rate calculator",
    "dilution calculator",
    "BSA calculator",
    "ideal body weight calculator",
    "creatinine clearance calculator",
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
    title: "Medical Maths Calculators | Medication, IV & Dosing Tools",
    description:
      "Choose the right MedMaths calculator for medication doses, tablets, IV drip rates, dilutions, BSA, IBW, and renal dosing support.",
    url: CANONICAL,
    siteName: "MedMaths",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary",
    title: "Medical Maths Calculators | Medication, IV & Dosing Tools",
    description:
      "A clear index of medication maths calculators with formulas, worked examples, and safe calculation reminders.",
  },
}

type QuickChoice = {
  question: string
  answer: string
  href: string
  theme: Exclude<CalculatorThemeKey, "neutral">
  icon: LucideIcon
}

const quickChoices: QuickChoice[] = [
  {
    question: "I have a dose in mg and a liquid strength.",
    answer: "Use the mg to mL calculator.",
    href: "/calculator/dose-calculations/mg-to-ml",
    theme: "dose",
    icon: Syringe,
  },
  {
    question: "I have a weight-based dose in mg/kg.",
    answer: "Use mg/kg to mL for liquid medicine.",
    href: "/calculator/dose-calculations/mgkg-to-ml-dose",
    theme: "dose",
    icon: Weight,
  },
  {
    question: "I need the number of tablets to give.",
    answer: "Use a tablet calculator that matches a fixed or weight-based dose.",
    href: "/calculator/tablet-dosing",
    theme: "tablet",
    icon: Pill,
  },
  {
    question: "I need drops per minute or mL per hour.",
    answer: "Use the IV fluids calculators and enter the giving-set drop factor.",
    href: "/calculator/iv-fluids",
    theme: "iv",
    icon: Droplet,
  },
  {
    question: "I need medication dilution or a final IV concentration check.",
    answer: "Use the medication dilution or final IV concentration calculator.",
    href: "/calculator/dilutions",
    theme: "dilution",
    icon: Beaker,
  },
  {
    question: "The medicine reference requires creatinine clearance.",
    answer: "Open the Cockcroft-Gault creatinine clearance calculator directly.",
    href: "/calculator/renal-function/creatinine-clearance",
    theme: "renal",
    icon: Activity,
  },
]

const searchIntentBlocks = [
  {
    heading: "Medication dose calculations",
    body: "Use these when a medication order must be converted into a measurable amount, such as mL, tablets, or units.",
    examples: ["mg to mL", "mg/kg to mL", "units to mL", "mg to tablets"],
  },
  {
    heading: "IV fluid and drip rate calculations",
    body: "Use these when the question involves mL/hr, drops per minute, drop factor, or the time left for an IV bag.",
    examples: ["mL/hr to gtt/min", "gtt/min to mL/hr", "IV time to finish"],
  },
  {
    heading: "Medication dilution and IV concentration calculations",
    body: "Use these when the problem involves stock concentration, final total volume, or a final IV concentration check. Use mg to mL for vial withdrawal volume.",
    examples: ["C1V1 = C2V2", "reconstituted vial", "final bag concentration"],
  },
  {
    heading: "Dosing body measures and renal support",
    body: "Use these when a medicine calculation or reference specifically requires BSA, ideal body weight, or Cockcroft-Gault creatinine clearance.",
    examples: ["BSA", "IBW", "Cockcroft-Gault CrCl"],
  },
]

const faqItems = [
  {
    question: "What is MedMaths?",
    quickAnswer:
      "MedMaths is a medical maths calculator website for medication calculations, IV fluid maths, dilutions, body measure calculations, and renal dosing support.",
    details: [
      "It is designed to show the formula, calculation steps, and answer clearly.",
      "The calculators are educational arithmetic tools and do not decide whether a dose is clinically appropriate.",
      "The name may also be searched as Med Maths, medical maths, or medication maths calculators.",
    ],
    microExample: "A typical MedMaths calculation is 250 mg ÷ 50 mg/mL = 5 mL.",
  },
  {
    question: "Which medical maths calculator should I use?",
    quickAnswer:
      "Choose the calculator that matches the units in the question: mg/mL for liquid doses, mg/kg for weight-based doses, gtt/min for drops, and C1V1 for dilution arithmetic.",
    details: [
      "If the order is in mg and the label is in mg/mL, use mg to mL.",
      "If the order is in mg/kg, calculate the total dose from weight first.",
      "If the problem mentions drop factor, drops per minute, or mL/hr, use an IV calculator.",
    ],
    microExample: "500 mg ordered with 250 mg tablets uses mg to tablets, not mg to mL.",
  },
  {
    question: "What calculators are included on MedMaths?",
    quickAnswer:
      "MedMaths includes calculators for dose calculations, tablet dosing, IV fluids, dilutions, BSA, ideal body weight, and creatinine clearance.",
    details: [
      "Dose calculators include mg to mL, mg/kg to mL, and units to mL.",
      "IV calculators include mL/hr to gtt/min, gtt/min to mL/hr, and infusion time.",
      "Dilution calculators include C1V1=C2V2 and reconstitution to IV bag. Vial withdrawal volume is handled by the mg-to-mL calculator.",
    ],
    microExample: `There are ${allCalculatorCatalogItems.length} calculator pages across ${calculatorCatalog.length} medical maths topics.`,
  },
  {
    question: "Are MedMaths calculators for nurses and students?",
    quickAnswer:
      "Yes. The calculators are written for medication maths practice, nursing calculation revision, and clinical arithmetic support.",
    details: [
      "The pages include formulas, worked examples, FAQs, and practice questions.",
      "They are useful for checking calculation logic, but they do not replace local medication policy or clinical judgement.",
      "High-risk medicines should still be checked according to local requirements.",
    ],
    microExample: "For an IV rate problem, the page shows both the formula and the worked calculation.",
  },
  {
    question: "Are these calculators medical advice?",
    quickAnswer: "No. MedMaths calculators are arithmetic and education tools only.",
    details: [
      "They do not prescribe, recommend, or validate medication doses.",
      "Always check the order, product label, route, patient factors, maximum dose limits, compatibility, and local policy.",
      "If the answer looks unexpected, stop and recheck the units before using the result.",
    ],
    microExample:
      "The calculator can show 20 units ÷ 100 units/mL = 0.2 mL, but it cannot decide whether 20 units is the correct dose.",
  },
]

export default function CalculatorsPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://www.medmaths.com" },
    { name: "Calculators", url: CANONICAL },
  ]

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Medical Maths Calculators",
    alternateName: ["MedMaths calculators", "Med Maths calculators", "Medication maths calculators"],
    description:
      "A collection of medical maths calculators for medication doses, tablets, IV fluids, dilutions, BSA, ideal body weight, and creatinine clearance.",
    url: CANONICAL,
    publisher: {
      "@type": "Organization",
      name: "MedMaths",
      url: "https://www.medmaths.com",
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: allCalculatorCatalogItems.length,
      itemListElement: allCalculatorCatalogItems.map((calculator, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "WebApplication",
          name: calculator.title,
          applicationCategory: "MedicalApplication",
          operatingSystem: "Web browser",
          url: `https://www.medmaths.com${calculator.href}`,
          description: calculator.intent,
        },
      })),
    },
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: [item.quickAnswer, ...item.details].join(" "),
      },
    })),
  }

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <main className="pt-20">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <nav className="mb-6 text-sm text-gray-600" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-gray-950 hover:underline hover:underline-offset-4">
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span aria-current="page" className="font-medium text-gray-900">
              Calculators
            </span>
          </nav>

          <header className="rounded-3xl border border-cyan-200 bg-cyan-50/60 px-5 py-8 text-center sm:px-8 sm:py-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white px-3.5 py-2 text-xs font-bold uppercase tracking-[0.12em] text-cyan-800">
              <Calculator className="size-4" aria-hidden="true" />
              {allCalculatorCatalogItems.length} calculators across {calculatorCatalog.length} topics
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
              Medical Maths Calculators
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg">
              Browse calculators for medication doses, tablet quantities, IV drip rates, infusion time, dilutions, reconstitution, BSA, ideal body weight, and creatinine clearance.
            </p>

            <div className="mx-auto mt-7 max-w-2xl rounded-2xl border border-cyan-200 bg-white p-3 text-left shadow-sm sm:p-4">
              <div className="mb-2 flex items-center gap-2 px-1 text-sm font-semibold text-cyan-900">
                <Search className="size-4" aria-hidden="true" />
                Search the calculator directory
              </div>
              <CalculatorSearch />
            </div>
          </header>

          <section className="mt-10" aria-labelledby="quick-choice-heading">
            <div className="mb-6 max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-700">Quick choice</p>
              <h2 id="quick-choice-heading" className="mt-2 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
                Match the calculator to what you have
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                The units in the order and on the product label usually identify the correct calculation type.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {quickChoices.map((choice) => {
                const Icon = choice.icon
                return (
                  <Link
                    key={choice.question}
                    href={choice.href}
                    style={getCalculatorThemeStyle(choice.theme)}
                    className="group flex h-full flex-col rounded-2xl border bg-white p-5 shadow-sm transition [border-color:var(--calculator-border)] hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:[--tw-ring-color:var(--calculator-focus)]"
                  >
                    <div className="flex size-10 items-center justify-center rounded-xl [background-color:var(--calculator-soft)] [color:var(--calculator-text)]">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 text-sm font-bold leading-6 text-gray-950">{choice.question}</h3>
                    <p className="mt-1 text-sm leading-6 text-gray-600">{choice.answer}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold [color:var(--calculator-text)]">
                      Open <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </Link>
                )
              })}
            </div>
          </section>

          <section className="mt-12" aria-labelledby="topics-heading">
            <div className="mb-6 max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-700">Browse by topic</p>
              <h2 id="topics-heading" className="mt-2 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
                Six focused medical maths topics
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Open a topic guide for calculator selection, formulas, worked examples, safety reminders, and FAQs.
              </p>
            </div>
            <CalculatorTopicGrid />
          </section>

          <section className="mt-12" aria-labelledby="all-calculators-heading">
            <div className="mb-6 max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-700">Full directory</p>
              <h2 id="all-calculators-heading" className="mt-2 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
                All medical maths calculators
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Open a calculator directly. Formula cards retain the colour of their dose, tablet, IV, dilution, body measure, or renal topic.
              </p>
            </div>
            <CalculatorDirectory />
          </section>

          <section className="mt-10 rounded-3xl border border-amber-200 bg-amber-50 p-5 sm:p-7">
            <div className="flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white">
                <ShieldCheck className="size-5" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-amber-950">Calculation safety reminder</h2>
                <p className="mt-2 text-sm leading-6 text-amber-950">
                  MedMaths shows arithmetic. It does not prescribe doses, validate orders, check contraindications, or replace local policy. Confirm the medication order, product strength, units, route, frequency, patient factors, maximum dose limits, compatibility, and independent-check requirements where relevant.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-10 space-y-3" aria-label="Calculator directory information">
            <DirectoryDisclosure title="Common calculation types" icon={<Calculator className="size-5" aria-hidden="true" />}>
              <div className="grid gap-5 md:grid-cols-2">
                {searchIntentBlocks.map((block) => (
                  <div key={block.heading}>
                    <h3 className="font-semibold text-gray-950">{block.heading}</h3>
                    <p className="mt-1">{block.body}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {block.examples.map((example) => (
                        <span key={example} className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-800">
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </DirectoryDisclosure>

            <DirectoryDisclosure title="Medical maths calculator FAQs" icon={<Search className="size-5" aria-hidden="true" />}>
              <div className="space-y-6">
                {faqItems.map((item) => (
                  <div key={item.question}>
                    <h3 className="font-semibold text-gray-950">{item.question}</h3>
                    <p className="mt-1 font-medium text-gray-800">{item.quickAnswer}</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5">
                      {item.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                    <p className="mt-2 rounded-lg bg-gray-50 px-3 py-2 font-mono text-xs text-gray-700">{item.microExample}</p>
                  </div>
                ))}
              </div>
            </DirectoryDisclosure>
          </section>

          <CalculatorTrustBlock
            theme="neutral"
            className="mt-8"
            author={{ name: "George Lambroglou", credentials: "RN", href: "/about" }}
            lastReviewed={{ iso: "2026-07-11", label: "11 July 2026" }}
            note="The directory helps users choose an arithmetic tool. It does not determine whether a medicine dose, route, preparation, or administration plan is clinically appropriate."
          />
        </div>
      </main>

      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  )
}
