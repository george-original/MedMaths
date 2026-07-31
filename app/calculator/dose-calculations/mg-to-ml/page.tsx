import type { Metadata } from "next"
import Link from "next/link"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FAQAccordion } from "@/components/faq-accordion"
import { RelatedCalculators } from "@/components/related-calculators"
import { getCalculatorNetworkItems } from "@/lib/calculator-network"
import { CalculatorContentDisclosure, CalculatorEquation, CalculatorTrustBlock, SimpleFormulaAnswer } from "@/components/calculator"

import MgToMlClient from "./mg-to-ml-client"

const CANONICAL = "https://www.medmaths.com/calculator/dose-calculations/mg-to-ml"
const UPDATED_DATE_ISO = "2026-07-30"
const UPDATED_DATE_HUMAN = "30 Jul 2026"

export const metadata: Metadata = {
  title: "mg to mL Calculator for Medicine | Dose & Syringe",
  description: "Convert mg to mL from a medicine label using mg/mL or mg per 5 mL. Shows the formula, syringe-volume examples, and why concentration matters.",
  keywords: ["mg to mL calculator", "mg to ml drug conversion", "mg to ml medicine", "mg to ml syringe", "mg per 5 ml calculator", "dose to volume calculator", "mg/mL calculator", "2.5 mg to ml", "how many mg in 1 ml", "is mg the same as ml", "liquid medicine dose calculator", "antibiotic dose in mL", "injection volume calculator", "mg to mL", "mg/ml", "dose volume", "syringe volume", "medicine concentration"],
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
      question: "How do you convert mg to mL for medicine?",
      quickAnswer: "Divide the required dose in mg by the medicine concentration in mg/mL.",
      details: [
        "Use the dose from the medication order, prescription, or study question",
        "Use the concentration from the exact product label",
        "If the label is already in mg/mL, divide the dose by that concentration",
        "If the label is written as mg per X mL, enter both label values and let the calculator convert them first",
      ],
      microExample: "500 mg ÷ 50 mg/mL = 10 mL.",
    },
    {
      question: "What does D/H × Q mean in medication calculations?",
      quickAnswer: "It means desired dose divided by dose on hand, multiplied by the quantity containing the dose on hand.",
      details: [
        "D is the desired, ordered, or required dose",
        "H is the dose on hand or supplied dose",
        "Q is the supplied quantity, such as 5 mL",
        "Required dose over supplied dose and stock required over stock supplied describe the same method",
      ],
      microExample: "500 mg ÷ 250 mg × 5 mL = 10 mL.",
    },
    {
      question: "What does mg/mL mean on a medication label?",
      quickAnswer: "mg/mL is the concentration: how many milligrams of medication are in each 1 mL.",
      details: [
        "50 mg/mL means each 1 mL contains 50 mg",
        "To find mL from mg, divide by the concentration",
        "To find mg from mL, multiply by the concentration",
        "A concentration is not a dose by itself",
      ],
      microExample: "250 mg/5 mL is equivalent to 50 mg/mL.",
    },
    {
      question: "What if the label says 250 mg/5 mL or mg per X mL?",
      quickAnswer: "Enter the label amount and label volume so the calculator can convert the strength to mg/mL first.",
      details: [
        "Example label: 250 mg per 5 mL",
        "The concentration is 250 ÷ 5 = 50 mg/mL",
        "The same input path can be used for a reconstituted vial when the verified final vial volume is known",
        "Do not assume the amount of diluent added equals the final vial volume",
      ],
      microExample: "400 mg in a final volume of 8 mL = 50 mg/mL.",
    },
    {
      question: "Can I calculate a dose from a reconstituted vial?",
      quickAnswer: "Yes, when the total drug amount and verified final vial volume are already known.",
      details: [
        "Use the final vial volume stated in the product information or pharmacy instructions",
        "Powder displacement can make the final vial volume different from the diluent volume added",
        "The calculator can check the dose-to-volume arithmetic but cannot choose a diluent or reconstitution procedure",
        "If the ordered dose exceeds the total amount entered for one vial, check whether multiple vials are intended",
      ],
      microExample: "500 mg in a final vial volume of 10 mL = 50 mg/mL; a 75 mg dose is 1.5 mL.",
    },
    {
      question: "Is mg the same as mL?",
      quickAnswer: "No. mg measures medication mass and mL measures liquid volume.",
      details: [
        "They are different units",
        "They can only be connected when the concentration is known",
        "Do not assume 1 mg equals 1 mL",
        "Different concentrations give different volumes for the same dose",
      ],
      microExample: "At 5 mg/mL, 5 mg = 1 mL. At 50 mg/mL, 5 mg = 0.1 mL.",
    },
    {
      question: "How many mg are in 1 mL?",
      quickAnswer: "It depends on the concentration printed on the medicine label.",
      details: [
        "At 5 mg/mL, 1 mL contains 5 mg",
        "At 50 mg/mL, 1 mL contains 50 mg",
        "At 250 mg/5 mL, 1 mL contains 50 mg",
        "The product strength must be checked before calculating",
      ],
      microExample: "250 mg/5 mL = 50 mg/mL, so 1 mL contains 50 mg.",
    },
    {
      question: "How do you convert mL to mg?",
      quickAnswer: "Multiply the volume in mL by the concentration in mg/mL.",
      details: [
        "Formula: mg = mL × mg/mL",
        "Use this when the measured volume and product concentration are known",
        "This is the reverse of mg to mL",
        "Select the mL → mg mode at the top of the calculator",
      ],
      microExample: "2 mL × 50 mg/mL = 100 mg.",
    },
    {
      question: "How do you calculate mL for a liquid antibiotic?",
      quickAnswer: "Use the prescribed dose and the concentration on the supplied bottle label.",
      details: [
        "Liquid antibiotics are often labelled as mg per 5 mL",
        "Enter the label amount and volume exactly as supplied",
        "Use only the prescribed dose and the concentration of the product being administered",
        "This calculator does not recommend an antibiotic or decide the dose",
      ],
      microExample: "250 mg from 125 mg/5 mL: 125 ÷ 5 = 25 mg/mL, then 250 ÷ 25 = 10 mL.",
    },
    {
      question: "Can this calculator be used for injections or syringe volumes?",
      quickAnswer: "It can check the arithmetic when the prescribed dose and exact product concentration are already known.",
      details: [
        "Use the concentration printed on the vial, ampoule, prefilled syringe, or medicine label",
        "The result is a calculated volume, not a recommendation for a particular syringe or administration route",
        "Very small volumes may not be measurable with the available device",
        "High-risk medicines require the medication order, product information, local policy, and clinical judgement",
      ],
      microExample: "10 mg from a 5 mg/mL injection = 2 mL.",
    },
    {
      question: "Can I use this calculator for insulin?",
      quickAnswer: "Usually no. Insulin is commonly prescribed in units rather than milligrams.",
      details: [
        "Insulin labels are usually written as units/mL",
        "Do not substitute an mg-to-mL calculation for a units-based medicine order",
        "Use the Units to mL calculator only when prescribed units and the exact units/mL concentration are known",
        "Follow the medicine order, device instructions, and local policy",
      ],
      microExample: "U-100 insulin is 100 units/mL, not 100 mg/mL.",
    },
    {
      question: "Why might my result differ from another calculator?",
      quickAnswer: "Common reasons are different rounding, a different label format, or using density instead of medicine concentration.",
      details: [
        "Check whether the concentration was entered as mg/mL or mg per X mL",
        "Check whether the other result was rounded to fewer decimal places",
        "This page uses medicine concentration and is not a density conversion for water, food, or chemicals",
        "If results differ significantly, verify the product label and repeat the calculation manually",
      ],
      microExample: "3.125 mL may display as 3.13 mL or 3.1 mL depending on the chosen display precision.",
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
      steps: ["Step 1: 250 ÷ 5 = 50 mg/mL", "Step 2: mL = 125 ÷ 50", "mL = 2.5"],
      answer: "2.5 mL",
    },
    {
      q: "Practice 3: A reconstituted vial contains 500 mg in a verified final volume of 10 mL. The order is 75 mg. How many mL is required?",
      steps: ["Step 1: 500 ÷ 10 = 50 mg/mL", "Step 2: mL = 75 ÷ 50", "mL = 1.5"],
      answer: "1.5 mL",
    },
    {
      q: "Practice 4: A liquid antibiotic label says 125 mg/5 mL. The ordered dose is 250 mg. How many mL is required?",
      steps: ["Step 1: 125 ÷ 5 = 25 mg/mL", "Step 2: mL = 250 ÷ 25", "mL = 10"],
      answer: "10 mL",
    },
    {
      q: "Practice 5: You draw up 2 mL from a 50 mg/mL solution. How many mg is that?",
      steps: ["mg = mL × (mg/mL)", "mg = 2 × 50", "mg = 100"],
      answer: "100 mg",
    },
    {
      q: "Practice 6: Order is 125 mg. Stock is 40 mg/mL. What is the volume to 2 decimals?",
      steps: ["mL = 125 ÷ 40", "mL = 3.125", "Displayed to 2 decimals = 3.13 mL"],
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
          <section id="calculator" className="mb-8 scroll-mt-24">
            <MgToMlClient />
          </section>

          <SimpleFormulaAnswer
            id="simple-mg-to-ml-answer"
            theme="dose"
            title="How do you convert mg to mL?"
            lead={<>Divide the dose you need in mg by the medicine concentration in mg/mL.</>}
            equation="Volume (mL) = Dose (mg) ÷ Concentration (mg/mL)"
            spokenEquation="Volume in millilitres equals dose in milligrams divided by concentration in milligrams per millilitre."
            example={<>500 mg ÷ 50 mg/mL = <strong>10 mL</strong></>}
            note={<>The concentration must come from the actual medicine label. For example, <strong>50 mg/mL</strong> means that each 1 mL contains 50 mg.</>}
            className="mb-8"
          />

          <section className="mb-8 grid gap-4 sm:grid-cols-2" aria-label="mg to mL meaning and result">
            <div className="rounded-2xl border border-cyan-200 bg-cyan-50/60 p-5">
              <h2 className="text-xl font-bold text-gray-950">What does mg/mL mean?</h2>
              <p className="mt-2 text-sm leading-6 text-gray-700">
                <strong>mg/mL means milligrams in each 1 mL.</strong> A strength of 50 mg/mL means 1 mL contains 50 mg of medicine.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
              <h2 className="text-xl font-bold text-gray-950">What does this calculator do?</h2>
              <p className="mt-2 text-sm leading-6 text-gray-700">
                It tells you how many mL contain the dose you need. A result of 10 mL means that dose is contained in 10 mL of that specific medicine strength. A different concentration can give a different volume.
              </p>
            </div>
          </section>

          <section id="reconstituted-vial" className="mb-8 scroll-mt-24 rounded-2xl border border-cyan-200 bg-cyan-50/60 p-5 sm:p-6">
            <h2 className="text-xl font-bold text-gray-950">Using a reconstituted vial</h2>
            <p className="mt-2 text-sm leading-6 text-gray-700">
              Select <strong>My label says mg per X mL</strong>, then enter the total drug amount and the <strong>verified final vial volume</strong>. The final vial volume can differ from the amount of diluent added because powder displacement may occur.
            </p>
            <p className="mt-2 text-sm leading-6 text-gray-700">
              This calculator checks dose-to-volume arithmetic only. It does not choose the diluent, reconstitution method, route, compatibility, stability, or number of vials required.
            </p>
          </section>

          <CalculatorContentDisclosure
            id="learning-guide"
            theme="dose"
            title="Formula, examples and safety guidance"
            summary="Review the method, label conversion, worked examples, practice questions, and clinical checks."
          >
          {/* How it works */}
          <section id="how-it-works" className="mb-12">
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">How the mg to mL calculation works</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <ol className="list-decimal space-y-3 pl-6">
                <li>Find the dose needed in <strong>mg</strong>.</li>
                <li>Find the medicine strength on the label, such as <strong>50 mg/mL</strong>.</li>
                <li>Divide the dose by the concentration to get the volume in <strong>mL</strong>.</li>
              </ol>
              <p>
                When the label says <strong>250 mg in 5 mL</strong>, you can use the nursing formula directly: dose needed ÷ dose on the label × label volume.
              </p>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Check before using the answer:</span> Make sure the dose and label strength use matching units, and make sure the concentration came from the correct product.
                </p>
              </div>
            </div>
          </section>

          {/* Formula */}
          <section id="formula" className="mb-12">
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">The mg to mL formulas</h2>
            <div className="space-y-5">
              <CalculatorEquation
                id="mg-to-ml-formula"
                theme="dose"
                title="mg to mL formula using concentration"
                equation="Volume (mL) = required dose (mg) ÷ concentration (mg/mL)"
                spokenEquation="Volume in millilitres equals the required dose in milligrams divided by the concentration in milligrams per millilitre."
                plainEnglish="Divide the dose you need by how many milligrams are in 1 mL."
                variables={[
                  { symbol: "Dose needed", meaning: "the ordered or prescribed amount in mg" },
                  { symbol: "Concentration", meaning: "how many mg are in 1 mL" },
                  { symbol: "Volume", meaning: "the answer in mL" },
                ]}
              />

              <CalculatorEquation
                id="required-over-supplied-formula"
                theme="dose"
                title="Required dose over supplied dose formula"
                equation="Volume (mL) = required dose (mg) ÷ supplied dose (mg) × supplied volume (mL)"
                spokenEquation="Volume in millilitres equals required dose divided by supplied dose, multiplied by supplied volume."
                plainEnglish="Divide the dose you need by the dose on the label, then multiply by the label volume. This is the same as D/H × Q."
                variables={[
                  { symbol: "D", meaning: "the dose needed" },
                  { symbol: "H", meaning: "the dose printed on the label" },
                  { symbol: "Q", meaning: "the label volume, such as 5 mL" },
                ]}
              />

              <CalculatorEquation
                id="ml-to-mg-formula"
                theme="dose"
                title="mL to mg formula"
                equation="Dose (mg) = volume (mL) × concentration (mg/mL)"
                spokenEquation="Dose in milligrams equals volume in millilitres multiplied by concentration in milligrams per millilitre."
                plainEnglish="Multiply the measured mL by how many milligrams are in 1 mL."
                variables={[
                  { symbol: "Volume", meaning: "the measured liquid amount in mL" },
                  { symbol: "Concentration", meaning: "how many mg are in 1 mL" },
                  { symbol: "Dose", meaning: "the calculated amount in mg" },
                ]}
              />
            </div>

            <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-5 text-sm leading-6 text-gray-700">
              <h3 className="font-bold text-gray-950">Common nursing wording for the same formula</h3>
              <ul className="mt-2 space-y-1">
                <li><strong>Required dose ÷ supplied dose × supplied volume or form</strong></li>
                <li><strong>Desired dose ÷ dose on hand × quantity</strong></li>
                <li><strong>D/H × Q</strong></li>
                <li><strong>Stock required over stock supplied, then multiply by the supplied volume or form</strong></li>
              </ul>
              <p className="mt-3">The wording changes, but the arithmetic is the same. Write the full equation and match the units before calculating.</p>
            </div>

            <div className="mt-5 rounded-xl border border-cyan-200 bg-cyan-50 p-5 text-sm leading-6 text-gray-800">
              <h3 className="font-bold text-gray-950">How to check the units</h3>
              <p className="mt-2 font-mono">500 mg ÷ 250 mg × 5 mL = 2 × 5 mL = 10 mL</p>
              <p className="mt-2">The mg units match on both sides of the division, so the answer is left in mL.</p>
            </div>
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
                { label: "0.25 mg to mL", dose: "0.25", conc: "1", result: "0.25 mL" },
                { label: "0.5 mg to mL", dose: "0.5", conc: "1", result: "0.5 mL" },
                { label: "1 mg to mL", dose: "1", conc: "5", result: "0.2 mL" },
                { label: "2 mg to mL", dose: "2", conc: "5", result: "0.4 mL" },
                { label: "2.5 mg to mL syringe", dose: "2.5", conc: "5", result: "0.5 mL" },
                { label: "5 mg to mL", dose: "5", conc: "5", result: "1 mL" },
                { label: "10 mg to mL", dose: "10", conc: "5", result: "2 mL" },
                { label: "12.5 mg to mL", dose: "12.5", conc: "5", result: "2.5 mL" },
                { label: "25 mg to mL", dose: "25", conc: "5", result: "5 mL" },
                { label: "50 mg to mL", dose: "50", conc: "50", result: "1 mL" },
                { label: "100 mg to mL", dose: "100", conc: "50", result: "2 mL" },
                { label: "250 mg to mL", dose: "250", conc: "50", result: "5 mL" },
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
                <span className="text-gray-700">Converting “mg per X mL” labels and verified reconstituted-vial final volumes into mg/mL</span>
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

          {/* FAQs */}
          <section id="faqs" className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">Frequently Asked Questions</h2>
            <FAQAccordion items={faqItems} />
          </section>

          {/* References (university + textbook authority) */}
          </CalculatorContentDisclosure>

          <RelatedCalculators
            theme="dose"
            title="More medication maths calculators"
            description="These tools continue from dose-to-volume maths into dilution, tablet, renal, and IV calculation pathways."
            items={getCalculatorNetworkItems("/calculator/dose-calculations/mg-to-ml")}
          />

          <CalculatorTrustBlock
            theme="dose"
            author={{ name: "George Lambroglou", credentials: "RN", href: "/about" }}
            lastReviewed={{ iso: UPDATED_DATE_ISO, label: UPDATED_DATE_HUMAN }}
            note={
              <>
                Formula and worked examples checked against the references listed below. MedMaths supports calculation checking and does not replace the medication order, product information, local policy, pharmacy guidance, or clinical judgement.
              </>
            }
            className="mb-12"
          />

          <CalculatorContentDisclosure
            id="references"
            theme="dose"
            title="References and sources"
            summary="Open the formula, educational, and safety sources used for this calculator."
            className="mb-12"
          >
<section className="mb-12">
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
          </CalculatorContentDisclosure>

          
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
