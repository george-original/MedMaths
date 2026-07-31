import type { Metadata } from "next"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RelatedCalculators } from "@/components/related-calculators"
import { getCalculatorNetworkItems } from "@/lib/calculator-network"
import { CalculatorTrustBlock } from "@/components/calculator"

import C1V1C2V2BasicClient from "./c1v1-c2v2-basic-client"

const CANONICAL_URL = "https://www.medmaths.com/calculator/dilutions/c1v1-c2v2-basic"
const LAST_UPDATED_ISO = "2026-07-30"
const LAST_UPDATED_HUMAN = "30 Jul 2026"

export const metadata: Metadata = {
  title: "Medication Dilution Calculator | C1V1=C2V2",
  description:
    "Use C1V1=C2V2 to calculate medication stock volume, final concentration, starting concentration, or final total volume. Shows unit checks and the arithmetic diluent difference.",
  keywords: [
    "medication dilution calculator",
    "drug dilution calculator",
    "C1V1 C2V2 calculator",
    "C1V1 C2V2 formula",
    "stock volume calculator",
    "final concentration calculator",
    "final volume calculator",
    "diluent volume calculator",
    "nursing dilution calculator",
  ],
  authors: [{ name: "George Lambroglou, RN", url: "https://www.medmaths.com/about" }],
  creator: "George Lambroglou, RN",
  publisher: "MedMaths",
  alternates: { canonical: CANONICAL_URL },
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
    title: "Medication Dilution Calculator | C1V1=C2V2",
    description:
      "Calculate medication stock volume, final concentration, starting concentration, or final total volume with C1V1=C2V2.",
    url: CANONICAL_URL,
    siteName: "MedMaths",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary",
    title: "Medication Dilution Calculator | C1V1=C2V2",
    description: "Solve C1V1=C2V2 for medication stock volume, final total volume, or concentration.",
  },
}

const faqItems = [
  {
    question: "What does C1V1 = C2V2 mean?",
    quickAnswer:
      "C1V1 = C2V2 is a concentration-volume equation. It states that the amount represented by concentration multiplied by volume is the same before and after a dilution.",
    details: [
      "C1 is the starting or stock concentration",
      "V1 is the stock-solution volume used",
      "C2 is the intended final concentration",
      "V2 is the final total volume after preparation",
      "C1 and C2 must describe the same medicine or solute using the same concentration basis",
    ],
    microExample: "A 10 mg/mL medicine diluted to 1 mg/mL has the same drug amount spread through a larger final volume.",
  },
  {
    question: "Can C1V1 = C2V2 be used for medication dilution?",
    quickAnswer:
      "Yes, it can check medication-dilution arithmetic when the verified starting concentration, intended final concentration, and final total volume are known. It does not decide whether or how a medicine should be diluted.",
    details: [
      "Use the medication order, product label or monograph, pharmacy guidance, and local policy to obtain the permitted preparation",
      "The calculator does not select the diluent, route, concentration, stability period, or aseptic method",
      "Product-specific instructions override generic arithmetic",
      "High-risk preparations may require an independent check",
    ],
    microExample: "The equation can calculate a stock volume, but the medicine source still controls the permitted diluent and final concentration.",
  },
  {
    question: "Which value can the medication dilution calculator solve?",
    quickAnswer: "It can solve for V1, V2, C1, or C2 when the other three positive values are known.",
    details: [
      "Solve V1 to find the stock-solution volume",
      "Solve V2 to find the final total volume",
      "Solve C1 to find the implied starting concentration",
      "Solve C2 to find the final concentration",
    ],
    microExample: "If C1, C2, and V2 are known, select V1 to calculate the stock volume required.",
  },
  {
    question: "Is V2 the final volume or the amount of diluent added?",
    quickAnswer: "V2 is the final total volume. It is not only the amount of diluent added.",
    details: [
      "V2 includes the stock solution within the final prepared volume",
      "The arithmetic difference V2 − V1 may be shown separately",
      "Do not automatically treat V2 − V1 as a preparation instruction",
      "Some products require making up to final volume or accounting for displacement",
    ],
    microExample: "If 5 mL of stock is made up to 50 mL, V2 is 50 mL and the arithmetic difference is 45 mL.",
  },
  {
    question: "How do I calculate stock volume V1 and the diluent difference?",
    quickAnswer: "Calculate V1 with V1 = (C2 × V2) ÷ C1. The arithmetic difference is then V2 − V1.",
    details: [
      "V1 is the volume withdrawn from the starting solution",
      "Use the verified final total volume as V2",
      "For a standard dilution, C2 is usually lower than C1 and V1 is smaller than V2",
      "Preparation instructions may not equal simple volume addition",
    ],
    microExample: "For 10 mg/mL to 1 mg/mL in a final 50 mL: V1 = 5 mL and V2 − V1 = 45 mL.",
  },
  {
    question: "Do C1 and C2 need matching units?",
    quickAnswer: "Yes. C1 and C2 must use matching concentration units and definitions, while V1 and V2 must use matching volume units.",
    details: [
      "Convert mg/L and mg/mL before using them together",
      "For percentages, confirm the same basis, such as both % w/v",
      "A matching symbol alone does not prove two percentage definitions are equivalent",
      "Unit mismatch can produce a plausible-looking but incorrect result",
    ],
    microExample: "Do not combine C1 in mg/mL with C2 in mcg/mL until one concentration has been converted.",
  },
  {
    question: "Is medication dilution the same as reconstitution?",
    quickAnswer:
      "No. Dilution starts with a known concentration and reduces or changes that concentration. Reconstitution usually creates a liquid concentration from a powder using product-specific instructions.",
    details: [
      "Use C1V1=C2V2 when a starting concentration already exists",
      "Use the product label or monograph to establish a reconstituted final concentration",
      "The volume of diluent added may differ from the final vial volume",
      "After reconstitution, a separate dose-to-volume or final-bag calculation may be required",
    ],
    microExample: "A powder vial reconstituted to 100 mg/mL first creates C1; a later dilution may then use C1V1=C2V2.",
  },
  {
    question: "What if the target concentration is higher than the stock concentration?",
    quickAnswer:
      "Adding diluent cannot create a stronger concentration. A target C2 above C1, or a calculated V1 above V2, does not describe a standard dilution by adding diluent.",
    details: [
      "Recheck that C1 and C2 were not swapped",
      "Confirm concentration units and percentage basis",
      "Confirm that V2 is the final total volume",
      "Use a different verified starting concentration or preparation instruction if a stronger solution is required",
    ],
    microExample: "A 1 mg/mL stock cannot be diluted with fluid to make 10 mg/mL.",
  },
]

const breadcrumbs = [
  { name: "Home", href: "/", url: "https://www.medmaths.com" },
  { name: "Calculators", href: "/calculators", url: "https://www.medmaths.com/calculators" },
  { name: "Dilutions", href: "/calculator/dilutions", url: "https://www.medmaths.com/calculator/dilutions" },
  { name: "Medication Dilution", href: "/calculator/dilutions/c1v1-c2v2-basic", url: CANONICAL_URL },
]

const workedExamples = [
  {
    title: "Find V1: dilute 10 mg/mL to 1 mg/mL in a final 50 mL",
    working: ["V1 = (C2 × V2) ÷ C1", "V1 = (1 × 50) ÷ 10", "V1 = 5 mL", "Arithmetic difference = 50 − 5 = 45 mL"],
    answer: "Stock solution volume: 5 mL. The verified preparation instruction determines how the final 50 mL is made.",
  },
  {
    title: "Find C2: 20 mL of 5 mg/mL made up to a final 100 mL",
    working: ["C2 = (C1 × V1) ÷ V2", "C2 = (5 × 20) ÷ 100", "C2 = 1 mg/mL"],
    answer: "Final concentration: 1 mg/mL.",
  },
  {
    title: "Find V2: 10 mL of 8 mg/mL diluted to 2 mg/mL",
    working: ["V2 = (C1 × V1) ÷ C2", "V2 = (8 × 10) ÷ 2", "V2 = 40 mL", "Arithmetic difference = 40 − 10 = 30 mL"],
    answer: "Final total volume: 40 mL.",
  },
]

const practiceItems = [
  { q: "If C1 = 20 mg/mL, C2 = 5 mg/mL, and V2 = 60 mL, what is V1?", a: "V1 = (5 × 60) ÷ 20 = 15 mL." },
  { q: "If C1 = 8 mg/mL, V1 = 10 mL, and V2 = 40 mL, what is C2?", a: "C2 = (8 × 10) ÷ 40 = 2 mg/mL." },
  { q: "If 5 mL of stock is made up to a final 50 mL, what is V2 and what is the arithmetic difference?", a: "V2 is 50 mL. The arithmetic difference V2 − V1 is 45 mL, but the medicine source determines the actual preparation sequence." },
  { q: "Can a 2 mg/mL stock be diluted with fluid to make 10 mg/mL?", a: "No. Adding diluent cannot create a stronger concentration. Recheck the inputs and use the verified product-specific preparation." },
]

const references = [
  {
    title: "Molarity and the Dilution Equation",
    organisation: "OpenStax Chemistry 2e",
    href: "https://openstax.org/books/chemistry-2e/pages/3-3-molarity",
    description: "Explains conservation of solute amount and the stock-to-final dilution relationship.",
    badge: "Web",
  },
  {
    title: "Dosage Calculations",
    organisation: "OpenStax Pharmacology for Nurses",
    href: "https://openstax.org/books/pharmacology/pages/2-4-dosage-calculations",
    description: "Nursing guidance on medication calculation setup, volume, concentration, and unit consistency.",
    badge: "Web",
  },
  {
    title: "Preparing Unit-Dose Packaged Medications",
    organisation: "OpenStax Clinical Nursing Skills",
    href: "https://openstax.org/books/clinical-nursing-skills/pages/12-3-preparing-unit-dose-packaged-medications",
    description: "States that reconstitution diluent type and amount should come from the label, package insert, or medication record.",
    badge: "Web",
  },
  {
    title: "Safety Considerations for Container Labels and Carton Labeling",
    organisation: "U.S. Food and Drug Administration",
    href: "https://www.fda.gov/media/158522/download?attachment=",
    description: "FDA guidance on clearly presenting reconstitution instructions, diluent volume, and resulting concentration.",
    badge: "PDF",
  },
  {
    title: "High Risk Medicines and Systems",
    organisation: "Australian Commission on Safety and Quality in Health Care",
    href: "https://www.safetyandquality.gov.au/clinical-topics/medicines-safety-and-quality/high-risk-medicines-and-systems",
    description: "Australian medication-safety guidance on concentrated medicines, dilution controls, and independent checks.",
    badge: "Web",
  },
]

export default function C1V1C2V2Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: breadcrumbs.map((breadcrumb, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: breadcrumb.name,
              item: breadcrumb.url,
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.quickAnswer },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Medication Dilution Calculator (C1V1 = C2V2)",
            description: "Solve C1V1=C2V2 for medication stock volume, starting concentration, final concentration, or final total volume.",
            applicationCategory: "HealthApplication",
            operatingSystem: "All",
            url: CANONICAL_URL,
            dateModified: LAST_UPDATED_ISO,
          }),
        }}
      />

      <SiteHeader />

      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-3xl px-4 pb-12 pt-4 sm:px-6 sm:py-12 lg:px-8 lg:pt-10">
          <nav aria-label="Breadcrumb" className="mb-4 hidden text-sm text-gray-500 sm:block">
            {breadcrumbs.map((breadcrumb, index) => (
              <span key={breadcrumb.href}>
                {index > 0 && <span aria-hidden="true"> / </span>}
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-gray-900">{breadcrumb.name}</span>
                ) : (
                  <Link href={breadcrumb.href} className="hover:text-purple-700">
                    {breadcrumb.name}
                  </Link>
                )}
              </span>
            ))}
          </nav>

          <header className="mb-6 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">Medication Dilution Calculator (C1V1 = C2V2)</h1>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
              Calculate stock solution volume, final concentration, starting concentration, or final total volume for a verified medication-dilution setup.
            </p>
          </header>

          <C1V1C2V2BasicClient />

          <section id="how-it-works" className="mb-8 mt-10">
            <h2 className="text-2xl font-bold text-gray-900">How C1V1 = C2V2 works for medication dilution</h2>
            <div className="mt-4 space-y-4 text-sm leading-6 text-gray-700 sm:text-base">
              <p>
                <strong>C1 × V1 = C2 × V2</strong> links the verified starting medicine concentration and stock volume with the intended final concentration and final total volume. The arithmetic assumes the same medicine or solute is represented on both sides and that concentration × volume is conserved.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-purple-200 bg-purple-50 p-4">
                  <h3 className="font-semibold text-purple-950">Match medicine and concentration basis</h3>
                  <p className="mt-2 text-sm text-purple-900">C1 and C2 must describe the same medicine or solute and use the same concentration unit and basis. V1 and V2 must use the same volume unit.</p>
                </div>
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <h3 className="font-semibold text-amber-950">Use final total volume for V2</h3>
                  <p className="mt-2 text-sm text-amber-900">V2 is the total volume after preparation. It is not merely the amount of diluent added.</p>
                </div>
              </div>
            </div>
          </section>

          <details id="formula" className="group mb-6 scroll-mt-24 overflow-hidden rounded-2xl border border-purple-200 bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-gray-900 [&::-webkit-details-marker]:hidden">
              Medication dilution formula and rearranged equations
              <span className="text-sm font-medium text-purple-700 group-open:hidden">Show</span>
              <span className="hidden text-sm font-medium text-purple-700 group-open:inline">Hide</span>
            </summary>
            <div className="border-t border-purple-200 p-5">
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center font-mono text-sm text-gray-800">C1 × V1 = C2 × V2</div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  ["Find V1 stock volume", "V1 = (C2 × V2) ÷ C1"],
                  ["Find V2 final total volume", "V2 = (C1 × V1) ÷ C2"],
                  ["Find C1 starting concentration", "C1 = (C2 × V2) ÷ V1"],
                  ["Find C2 final concentration", "C2 = (C1 × V1) ÷ V2"],
                ].map(([title, formula]) => (
                  <div key={title} className="rounded-xl border border-gray-200 bg-white p-4">
                    <h3 className="font-semibold text-gray-900">{title}</h3>
                    <p className="mt-2 font-mono text-sm text-gray-700">{formula}</p>
                  </div>
                ))}
              </div>
            </div>
          </details>

          <details id="examples" className="group mb-6 scroll-mt-24 overflow-hidden rounded-2xl border border-purple-200 bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-gray-900 [&::-webkit-details-marker]:hidden">
              Worked medication-dilution examples
              <span className="text-sm font-medium text-purple-700 group-open:hidden">Show</span>
              <span className="hidden text-sm font-medium text-purple-700 group-open:inline">Hide</span>
            </summary>
            <div className="space-y-4 border-t border-purple-200 p-5">
              {workedExamples.map((example) => (
                <div key={example.title} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <h3 className="font-semibold text-gray-900">{example.title}</h3>
                  <div className="mt-3 space-y-1 rounded-lg border border-gray-200 bg-white p-4 font-mono text-sm text-gray-700">
                    {example.working.map((line) => <p key={line}>{line}</p>)}
                  </div>
                  <p className="mt-3 rounded-lg border border-purple-200 bg-purple-50 p-3 text-sm font-semibold text-purple-950">{example.answer}</p>
                </div>
              ))}
            </div>
          </details>

          <section id="safety" className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Medication dilution safety checks</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {[
                ["Same medicine and basis", "Confirm C1 and C2 refer to the same medicine or solute and use matching concentration units and definitions."],
                ["Concentration direction", "For a standard dilution by adding diluent, C2 should be lower than C1. A stronger target cannot be made by adding diluent alone."],
                ["Final total volume", "Confirm whether the medicine source says add a stated diluent volume or make up to a stated final volume. Those are not always the same."],
                ["Product-specific requirements", "Check the permitted diluent, compatibility, route, final concentration, stability, aseptic process, and required independent check."],
              ].map(([title, body]) => (
                <div key={title} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                  <h3 className="font-semibold text-gray-900">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-700">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <details id="practice-questions" className="group mb-6 scroll-mt-24 overflow-hidden rounded-2xl border border-purple-200 bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-gray-900 [&::-webkit-details-marker]:hidden">
              Practice questions with answers
              <span className="text-sm font-medium text-purple-700 group-open:hidden">Show</span>
              <span className="hidden text-sm font-medium text-purple-700 group-open:inline">Hide</span>
            </summary>
            <div className="space-y-3 border-t border-purple-200 p-5">
              {practiceItems.map((item, index) => (
                <details key={item.q} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <summary className="cursor-pointer font-semibold text-gray-900">{index + 1}. {item.q}</summary>
                  <p className="mt-3 rounded-lg border border-purple-200 bg-purple-50 p-3 text-sm text-purple-950"><strong>Answer:</strong> {item.a}</p>
                </details>
              ))}
            </div>
          </details>

          <details id="faqs" className="group mb-10 scroll-mt-24 overflow-hidden rounded-2xl border border-purple-200 bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-gray-900 [&::-webkit-details-marker]:hidden">
              Medication dilution and C1V1 = C2V2 FAQ
              <span className="text-sm font-medium text-purple-700 group-open:hidden">Show</span>
              <span className="hidden text-sm font-medium text-purple-700 group-open:inline">Hide</span>
            </summary>
            <div className="space-y-3 border-t border-purple-200 p-5">
              {faqItems.map((item) => (
                <details key={item.question} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <summary className="cursor-pointer font-semibold text-gray-900">{item.question}</summary>
                  <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
                    <p className="font-medium text-gray-900">{item.quickAnswer}</p>
                    <ul className="list-disc space-y-1 pl-5">
                      {item.details.map((detail) => <li key={detail}>{detail}</li>)}
                    </ul>
                    <p className="rounded-lg border border-purple-200 bg-purple-50 p-3 text-purple-950"><strong>Example:</strong> {item.microExample}</p>
                  </div>
                </details>
              ))}
            </div>
          </details>

          <RelatedCalculators
            theme="dilution"
            title="Related dilution and dose-volume calculators"
            description="Use these tools when medication-dilution arithmetic connects to reconstituted vials, final IV bag concentration, or dose-to-volume conversion."
            items={getCalculatorNetworkItems("/calculator/dilutions/c1v1-c2v2-basic")}
          />

          <CalculatorTrustBlock
            theme="dilution"
            author={{ name: "George Lambroglou", credentials: "RN", href: "/about" }}
            lastReviewed={{ iso: LAST_UPDATED_ISO, label: LAST_UPDATED_HUMAN }}
            note="This calculator checks medication concentration-volume arithmetic only. It does not select a medicine, diluent, route, final concentration, preparation technique, stability period, or administration plan."
            className="mb-10"
          />

          <details id="references" className="group mb-10 scroll-mt-24 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-xl font-bold text-gray-900 [&::-webkit-details-marker]:hidden">
              References and sources
              <span className="text-sm font-medium text-purple-700 group-open:hidden">Show</span>
              <span className="hidden text-sm font-medium text-purple-700 group-open:inline">Hide</span>
            </summary>
            <div className="space-y-3 border-t border-gray-200 p-5">
              {references.map((reference) => (
                <a
                  key={reference.href}
                  href={reference.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-purple-300 hover:bg-purple-50"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium text-gray-900 transition group-hover:text-purple-700">{reference.title}</p>
                      <span className="rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs text-gray-700">{reference.badge}</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{reference.organisation}</p>
                    <p className="mt-1 text-sm leading-6 text-gray-700">{reference.description}</p>
                  </div>
                  <ExternalLink className="mt-1 size-4 shrink-0 text-gray-400 transition group-hover:text-purple-700" aria-hidden="true" />
                </a>
              ))}
              <p className="text-sm leading-6 text-gray-600">References support the dilution equation, medication-calculation principles, and safety boundaries. The current product label or monograph, pharmacy guidance, medication order, and local policy control real preparation.</p>
            </div>
          </details>
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
