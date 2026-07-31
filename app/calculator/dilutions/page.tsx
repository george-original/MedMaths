import type { Metadata } from "next"
import { Beaker, BookOpen, HelpCircle, Library, ListChecks, ShieldCheck } from "lucide-react"
import {
  CalculatorCategoryLayout,
  CalculatorNotice,
  CalculatorSection,
  CategoryFaqList,
} from "@/components/calculator"

export const metadata: Metadata = {
  title: "Medication Dilution & IV Concentration Calculators",
  description:
    "Browse medication dilution and final IV concentration calculators. Use verified product inputs and choose the tool that matches the unknown value.",
  keywords: [
    "dilution calculator",
    "C1V1 C2V2 calculator",
    "C1V1 formula",
    "reconstitution calculator",
    "final concentration calculator",
    "medication dilution calculator",
    "nursing dilution calculator",
    "drug reconstitution calculator",
  ],
  authors: [{ name: "George Lambroglou, RN", url: "https://www.medmaths.com/about" }],
  creator: "George Lambroglou, RN",
  publisher: "MedMaths",
  alternates: { canonical: "https://www.medmaths.com/calculator/dilutions" },
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
    title: "Medication Dilution & IV Concentration Calculators",
    description:
      "Medication dilution calculators for C1V1=C2V2 and final IV bag concentration after vial reconstitution and transfer.",
    url: "https://www.medmaths.com/calculator/dilutions",
    siteName: "MedMaths",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary",
    title: "Medication Dilution & IV Concentration Calculators",
    description:
      "Calculate C1V1 dilutions and final IV bag concentrations after vial reconstitution and transfer.",
  },
}

const calculators = [
  {
    title: "Medication Dilution Calculator",
    slug: "c1v1-c2v2-basic",
    description: "Solve C1V1=C2V2 for medication stock volume, final concentration, or final total volume.",
    bestFor: "Checking a verified medication-dilution setup with matching concentration and volume units.",
    formula: "C1 × V1 = C2 × V2",
  },
  {
    title: "Final IV Bag Concentration Calculator",
    slug: "reconstitute-to-bag",
    description: "Check final IV concentration after verified vial reconstitution and medicine-solution transfer.",
    bestFor: "Checking final concentration when the per-vial concentration, transfer volume, and final total volume are already verified.",
    formula: "Final concentration = amount transferred ÷ verified final total volume",
  },
]

const faqItems = [
  {
    question: "What is a dilution calculator used for?",
    quickAnswer:
      "A dilution calculator helps work out the starting volume, final volume, or final concentration when a solution is diluted.",
    details: [
      "Use it when the amount of drug or solute stays the same but the volume changes.",
      "The concentration usually decreases when more diluent is added.",
      "For medication preparation, always check product information and local policy before using the result.",
    ],
    microExample: "A 100 mg drug in 10 mL is 10 mg/mL. If diluted to 100 mL, the final concentration is 1 mg/mL.",
    relatedCalculators: [{ name: "C1V1 calculator", href: "/calculator/dilutions/c1v1-c2v2-basic" }],
  },
  {
    question: "What does C1V1 = C2V2 mean?",
    quickAnswer:
      "It means the starting concentration times the starting volume equals the final concentration times the final volume.",
    details: [
      "C1 = starting concentration.",
      "V1 = starting volume.",
      "C2 = target concentration.",
      "V2 = final volume.",
      "The total amount stays the same while the concentration and volume change.",
    ],
    microExample: "50 mg/mL × 2 mL = 10 mg/mL × 10 mL",
    relatedCalculators: [{ name: "C1V1 calculator", href: "/calculator/dilutions/c1v1-c2v2-basic" }],
  },
  {
    question: "How do you calculate how much stock solution to use?",
    quickAnswer: "Rearrange the formula to V1 = (C2 × V2) ÷ C1.",
    details: [
      "Use the target concentration as C2.",
      "Use the final volume you want as V2.",
      "Use the starting concentration as C1.",
      "The answer is the volume of starting solution to take before adding diluent.",
    ],
    microExample: "To make 100 mL of 5 mg/mL from 50 mg/mL stock: V1 = 5 × 100 ÷ 50 = 10 mL.",
    relatedCalculators: [{ name: "C1V1 calculator", href: "/calculator/dilutions/c1v1-c2v2-basic" }],
  },
  {
    question: "What is the difference between final volume and diluent volume?",
    quickAnswer: "Final volume is the total volume after mixing. Diluent volume is only the extra fluid added.",
    details: [
      "This is one of the most common dilution mistakes.",
      "If 10 mL of stock is diluted to a final volume of 100 mL, the added diluent is usually 90 mL, not 100 mL.",
      "Some medication products have displacement volume or preparation instructions that change the final volume.",
    ],
    microExample: "10 mL stock + 90 mL diluent = 100 mL final volume.",
    relatedCalculators: [{ name: "C1V1 calculator", href: "/calculator/dilutions/c1v1-c2v2-basic" }],
  },
  {
    question: "When do I use a reconstitution calculator?",
    quickAnswer: "Use it when a powder or vial is mixed with diluent and then checked as a final concentration or final bag concentration.",
    details: [
      "Use the total drug amount in the vial.",
      "Use the final volume after mixing or transfer.",
      "Do not confuse the reconstitution diluent volume with the final IV bag volume.",
      "Check whether the product label states the final concentration after reconstitution.",
    ],
    microExample: "1000 mg added to a 250 mL bag gives 4 mg/mL if the final volume is 250 mL.",
    relatedCalculators: [{ name: "Reconstitute to bag", href: "/calculator/dilutions/reconstitute-to-bag" }],
  },
  {
    question: "How do I calculate mL from a vial concentration?",
    quickAnswer: "Divide the ordered dose by the vial concentration in mg/mL.",
    details: [
      "Formula: mL = ordered dose ÷ concentration.",
      "Use the concentration after reconstitution if the vial has been mixed.",
      "Confirm whether the label shows mg/mL, mg per vial, or mg per total volume.",
    ],
    microExample: "75 mg ÷ 50 mg/mL = 1.5 mL",
    relatedCalculators: [{ name: "mg to mL for a reconstituted vial", href: "/calculator/dose-calculations/mg-to-ml#reconstituted-vial" }],
  },
  {
    question: "How do you calculate final concentration after adding a drug to an IV bag?",
    quickAnswer: "Divide the total amount of drug by the final volume in the bag.",
    details: [
      "Use the same units for the drug amount and the final concentration.",
      "If the drug is in mg and the final volume is in mL, the result is mg/mL.",
      "Follow pharmacy or product guidance if the bag volume, vial volume, or displacement volume matters clinically.",
    ],
    microExample: "500 mg in 100 mL = 5 mg/mL.",
    relatedCalculators: [{ name: "Reconstitute to bag", href: "/calculator/dilutions/reconstitute-to-bag" }],
  },
  {
    question: "Can I use dilution calculators for high-risk medicines?",
    quickAnswer:
      "Only as an arithmetic check. High-risk medicine preparation must be checked against the order, product information, pharmacy guidance, and local policy.",
    details: [
      "The calculator does not confirm compatibility, stability, route, rate, or dose appropriateness.",
      "High-risk medicines often require independent checking and local preparation standards.",
      "Do not use a dilution calculator to invent or change a medication order.",
    ],
    microExample: "Use the calculator to check the maths, not to decide whether a preparation is clinically appropriate.",
    relatedCalculators: [{ name: "Dilution calculators", href: "/calculator/dilutions" }],
  },
]

const formulaCards = [
  {
    title: "C1V1 dilution formula",
    formula: "C1 × V1 = C2 × V2",
    description:
      "Use this when a starting concentration is diluted to a target concentration and the total amount remains unchanged.",
  },
  {
    title: "Stock volume needed",
    formula: "V1 = (C2 × V2) ÷ C1",
    description:
      "Use this to calculate how much stock solution to take before adding diluent to reach the final volume.",
  },
  {
    title: "Final concentration",
    formula: "Concentration = total drug ÷ final volume",
    description:
      "Use this after reconstitution or transfer into a bag when the total drug amount and final volume are known.",
  },
  {
    title: "Vial draw-up volume",
    formula: "mL = ordered dose ÷ concentration",
    description:
      "Use this when the vial concentration is known and you need to calculate the volume to draw up.",
  },
]

const commonExamples = [
  {
    question: "How much 50 mg/mL stock is needed to make 100 mL of 5 mg/mL?",
    answer: "V1 = 5 × 100 ÷ 50 = 10 mL of stock solution.",
  },
  {
    question: "What is the final concentration of 500 mg in 100 mL?",
    answer: "500 mg ÷ 100 mL = 5 mg/mL.",
  },
  {
    question: "How many mL are needed for a 75 mg dose from 50 mg/mL?",
    answer: "75 mg ÷ 50 mg/mL = 1.5 mL.",
  },
  {
    question: "If 2 mL of 100 mg/mL is diluted to 20 mL, what is the final concentration?",
    answer: "100 × 2 ÷ 20 = 10 mg/mL.",
  },
]

export default function DilutionsCategory() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Medication Dilution and IV Concentration Calculators",
    description:
      "Medication dilution calculators for C1V1=C2V2 and final IV bag concentration after vial reconstitution and transfer.",
    url: "https://www.medmaths.com/calculator/dilutions",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: calculators.map((calculator, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "WebApplication",
          name: calculator.title,
          url: `https://www.medmaths.com/calculator/dilutions/${calculator.slug}`,
          applicationCategory: "MedicalCalculator",
          operatingSystem: "Any",
        },
      })),
    },
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: [item.quickAnswer, ...item.details, item.microExample].join(" "),
      },
    })),
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.medmaths.com" },
      { "@type": "ListItem", position: 2, name: "Calculators", item: "https://www.medmaths.com/calculators" },
      { "@type": "ListItem", position: 3, name: "Dilutions", item: "https://www.medmaths.com/calculator/dilutions" },
    ],
  }

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Calculators", href: "/calculators" },
    { name: "Dilutions", href: "/calculator/dilutions" },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <CalculatorCategoryLayout
        theme="dilution"
        breadcrumbs={breadcrumbs}
        eyebrow="Medication dilution and concentration maths"
        title="Medication Dilution and IV Concentration Calculators"
        description="Calculate stock-solution dilutions, reconstitution concentrations, and final IV bag concentrations. For vial withdrawal volume, use the mg-to-mL calculator with the verified final vial concentration."
        icon={<Beaker className="size-6" aria-hidden="true" />}
        calculators={calculators.map((calculator) => ({
          title: calculator.title,
          href: `/calculator/dilutions/${calculator.slug}`,
          description: calculator.description,
          bestFor: calculator.bestFor,
          formula: calculator.formula,
          icon: <Beaker className="size-5" aria-hidden="true" />,
        }))}
        lastReviewed={{ iso: "2026-07-30", label: "30 July 2026" }}
        quickGuide={
          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-2xl border p-5 [border-color:var(--calculator-border)] [background-color:var(--calculator-softer)]">
              <h2 className="font-bold text-gray-950">Choose by the unknown value</h2>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-gray-700">
                <li><strong>Medication dilution:</strong> use C1V1=C2V2 for stock volume, final total volume, or concentration.</li>
                <li><strong>Vial withdrawal volume:</strong> use the mg-to-mL calculator with the verified final vial concentration.</li>
                <li><strong>Final IV concentration:</strong> check the amount transferred and final concentration after verified vial reconstitution.</li>
              </ul>
            </div>
            <CalculatorNotice variant="warning" title="Maths does not confirm preparation safety">
              Check product information, displacement, final volume, diluent, compatibility, stability, route, aseptic process, storage, infusion instructions, pharmacy guidance, and local policy.
            </CalculatorNotice>
          </div>
        }
        references={
          <CalculatorSection
            title="References"
            summary="Sources supporting dilution, proportionality, and dose-to-volume calculations."
            icon={<Library className="size-5" aria-hidden="true" />}
          >
            <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-gray-700">
              <li>OpenStax Pharmacology for Nurses: dosage calculation methods and desired-dose / dose-on-hand principles.</li>
              <li>RMIT Learning Lab: liquid medication volume and proportionality calculations.</li>
              <li>The Pharmaceutical Journal: medication maths dilution guidance for C1V1 = C2V2 and dilution-factor concepts.</li>
            </ul>
          </CalculatorSection>
        }
      >
        <CalculatorSection
          title="Main dilution formulas"
          summary="The four formula patterns used across this topic."
          icon={<ListChecks className="size-5" aria-hidden="true" />}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {formulaCards.map((card) => (
              <article key={card.title} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <h3 className="font-semibold text-gray-950">{card.title}</h3>
                <p className="mt-3 rounded-lg bg-white p-3 font-mono text-xs [color:var(--calculator-strong-text)]">{card.formula}</p>
                <p className="mt-3 text-sm leading-6 text-gray-700">{card.description}</p>
              </article>
            ))}
          </div>
        </CalculatorSection>

        <CalculatorSection
          title="How to approach a dilution calculation"
          summary="Identify the starting product, keep units consistent, and separate final volume from added diluent."
          icon={<BookOpen className="size-5" aria-hidden="true" />}
        >
          <ol className="grid gap-3 md:grid-cols-2">
            <li className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm leading-6 text-gray-700"><strong className="text-gray-950">1. Identify what is being diluted.</strong><br />Find the starting concentration, starting volume, target concentration, final volume, or total drug amount.</li>
            <li className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm leading-6 text-gray-700"><strong className="text-gray-950">2. Keep units consistent.</strong><br />Do not mix mg/mL, micrograms/mL, percentages, or units/mL without converting first.</li>
            <li className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm leading-6 text-gray-700"><strong className="text-gray-950">3. Separate final volume from added diluent.</strong><br />Final volume is the total after mixing. Diluent is only the additional fluid.</li>
            <li className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm leading-6 text-gray-700"><strong className="text-gray-950">4. Check preparation rules.</strong><br />Reconstitution and dilution also depend on product instructions, compatibility, stability, route, and local standards.</li>
          </ol>
        </CalculatorSection>

        <CalculatorSection
          title="Common dilution examples and mistakes"
          summary="Worked long-tail examples followed by the most common setup errors."
          icon={<ShieldCheck className="size-5" aria-hidden="true" />}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {commonExamples.map((example) => (
              <article key={example.question} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <h3 className="text-sm font-semibold text-gray-950">{example.question}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-700">{example.answer}</p>
              </article>
            ))}
          </div>
          <ul className="mt-4 list-disc space-y-2 rounded-xl border border-red-100 bg-red-50 p-5 pl-9 text-sm leading-6 text-red-900">
            <li>Using added diluent volume when the formula requires final total volume.</li>
            <li>Treating the powder amount in a vial as if it were already a concentration.</li>
            <li>Mixing mg/mL, micrograms/mL, percentage strength, or units/mL without converting.</li>
            <li>Ignoring displacement, bag overfill, or product-specific final-volume instructions.</li>
            <li>Using a maths result without checking compatibility, stability, route, and infusion instructions.</li>
          </ul>
        </CalculatorSection>

        <CalculatorSection
          title="Dilution calculator FAQs"
          summary="Answers about C1V1, stock volume, final volume, reconstitution, and vial withdrawal."
          icon={<HelpCircle className="size-5" aria-hidden="true" />}
        >
          <CategoryFaqList items={faqItems} />
        </CalculatorSection>
      </CalculatorCategoryLayout>
    </>
  )
}
