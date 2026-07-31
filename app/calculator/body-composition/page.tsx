import type { Metadata } from "next"
import { BookOpen, Calculator, HelpCircle, Library, Ruler, ShieldCheck, Weight } from "lucide-react"
import {
  CalculatorCategoryLayout,
  CalculatorNotice,
  CalculatorSection,
  CategoryFaqList,
} from "@/components/calculator"

const CANONICAL = "https://www.medmaths.com/calculator/body-composition"
const UPDATED_DATE = "2026-07-10"

export const metadata: Metadata = {
  title: "Dosing Body Measure Calculators | BSA & Devine IBW",
  description:
    "Browse clinical body-measure calculators for body surface area and adult Devine ideal body weight when a medicine reference or protocol requires them.",
  keywords: [
    "body composition calculator",
    "BSA calculator",
    "body surface area calculator",
    "ideal body weight calculator",
    "IBW calculator",
    "Devine formula calculator",
    "dosing weight calculator",
    "medication dosing weight",
    "Mosteller formula",
    "BSA formula",
    "ideal body weight formula",
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
    title: "Dosing Body Measure Calculators | BSA & Devine IBW",
    description:
      "Browse BSA and adult Devine IBW calculators for medicine references and clinical calculation practice.",
    url: CANONICAL,
    siteName: "MedMaths",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary",
    title: "Dosing Body Measure Calculators | BSA & Devine IBW",
    description:
      "Browse BSA and adult Devine IBW calculators for medicine references and clinical calculation practice.",
  },
}

const calculators = [
  {
    title: "Body Surface Area (BSA) Calculator",
    href: "/calculator/body-composition/bsa",
    description:
      "Calculate BSA in m² from height and weight using common formulas, including Mosteller, Du Bois, Haycock, and Gehan & George.",
    searchIntent: "Best for BSA formula, m² dosing, chemotherapy calculation practice, and height-weight BSA questions.",
    icon: Calculator,
  },
  {
    title: "Ideal Body Weight (IBW) Calculator",
    href: "/calculator/body-composition/ideal-body-weight",
    description:
      "Calculate ideal body weight in kg using the Devine formula for adult medication dosing checks and reference-weight calculations.",
    searchIntent: "Best for Devine formula, IBW in kg, dosing weight checks, and ideal body weight examples.",
    icon: Ruler,
  },
]

const formulaCards = [
  {
    title: "BSA using the Mosteller formula",
    formula: "BSA (m²) = √[(height cm × weight kg) ÷ 3600]",
    example: "Example: 170 cm and 70 kg → √[(170 × 70) ÷ 3600] = 1.82 m²",
  },
  {
    title: "Male ideal body weight using Devine",
    formula: "IBW (kg) = 50 + 2.3 × each inch over 5 feet",
    example: "Example: 5 ft 10 in male → 50 + (2.3 × 10) = 73 kg",
  },
  {
    title: "Female ideal body weight using Devine",
    formula: "IBW (kg) = 45.5 + 2.3 × each inch over 5 feet",
    example: "Example: 5 ft 4 in female → 45.5 + (2.3 × 4) = 54.7 kg",
  },
]

const safetyChecks = [
  "Confirm whether the order asks for actual body weight, ideal body weight, adjusted body weight, or BSA.",
  "Check height and weight units before calculating. Mixing cm, inches, kg, and lb is a common source of large errors.",
  "Do not use IBW or BSA just because it looks more clinically tidy. Use the measure required by the protocol or prescriber.",
  "For medication dosing, document the body measure used when it affects the final dose calculation.",
]

const faqItems = [
  {
    question: "What is a body composition calculator used for in medication maths?",
    quickAnswer:
      "It helps calculate body measures such as body surface area (BSA) and ideal body weight (IBW), which some medication calculations use instead of actual weight alone.",
    details: [
      "BSA is usually expressed in square metres (m²).",
      "IBW is usually expressed in kilograms (kg).",
      "The calculated body measure is not the final medication dose unless the formula or protocol says how to use it.",
    ],
  },
  {
    question: "What is the difference between BSA and ideal body weight?",
    quickAnswer:
      "BSA estimates body surface area from height and weight, while ideal body weight estimates a reference weight mainly from height and sex using a formula such as Devine.",
    details: [
      "BSA is commonly used in mg/m² dosing and physiological indexing.",
      "IBW is commonly used when actual body weight is not the intended dosing reference.",
      "They answer different calculation questions and should not be swapped without a protocol reason.",
    ],
  },
  {
    question: "How do you calculate BSA from height and weight?",
    quickAnswer:
      "A common method is the Mosteller formula: BSA in m² equals the square root of height in cm multiplied by weight in kg, divided by 3600.",
    details: [
      "Formula: BSA (m²) = √[(height cm × weight kg) ÷ 3600].",
      "Example: 170 cm and 70 kg gives approximately 1.82 m².",
      "Some protocols specify a different formula, so use the required formula when it matters clinically.",
    ],
    relatedCalculators: [{ name: "BSA Calculator", href: "/calculator/body-composition/bsa" }],
  },
  {
    question: "What is the Devine formula for ideal body weight?",
    quickAnswer:
      "The adult Devine formula estimates IBW as 50 kg plus 2.3 kg per inch over 5 feet for males, and 45.5 kg plus 2.3 kg per inch over 5 feet for females.",
    details: [
      "Male: IBW = 50 + 2.3 × inches over 5 feet.",
      "Female: IBW = 45.5 + 2.3 × inches over 5 feet.",
      "This is a reference-weight formula, not a judgment about a person's healthy or preferred body weight.",
    ],
    relatedCalculators: [{ name: "Ideal Body Weight Calculator", href: "/calculator/body-composition/ideal-body-weight" }],
  },
  {
    question: "Should I use actual weight, ideal body weight, adjusted body weight, or BSA?",
    quickAnswer:
      "Use the body measure specified by the medication order, product information, protocol, prescriber, pharmacist, or local policy.",
    details: [
      "Different medicines use different dosing measures.",
      "Using the wrong body measure can meaningfully change the calculated dose.",
      "If the required measure is unclear, escalate before calculating or administering a medicine.",
    ],
  },
  {
    question: "Is BSA the same as BMI?",
    quickAnswer: "No. BMI is a weight-to-height ratio, while BSA estimates external body surface area in m².",
    details: [
      "BMI is usually used for weight classification and screening.",
      "BSA is used in some medication dosing and physiological calculations.",
      "A BMI result cannot be used as a BSA result.",
    ],
  },
  {
    question: "Can BSA or IBW calculate the final medicine dose by itself?",
    quickAnswer:
      "No. BSA and IBW are body-measure inputs. The final dose still depends on the medication order, dose unit, concentration, protocol limits, and rounding rules.",
    details: [
      "For BSA dosing, a common pattern is total dose = prescribed mg/m² × BSA m².",
      "For IBW dosing, the medicine protocol must say that IBW is the correct weight to use.",
      "MedMaths calculators show the maths; they do not recommend medicine doses.",
    ],
  },
]

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Calculators", href: "/calculators" },
  { name: "Body Composition", href: "/calculator/body-composition" },
]

function jsonLdBreadcrumbList() {
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

function jsonLdFAQPage() {
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

function jsonLdCollectionPage() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Dosing Body Measure Calculators",
    description:
      "Body composition and dosing-weight calculators for body surface area, ideal body weight, Devine formula examples, and clinical calculation practice.",
    url: CANONICAL,
    dateModified: UPDATED_DATE,
    author: { "@type": "Person", name: "George Lambroglou", jobTitle: "Registered Nurse" },
    publisher: { "@type": "Organization", name: "MedMaths", url: "https://www.medmaths.com" },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: calculators.map((calculator, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "WebApplication",
          name: calculator.title,
          url: `https://www.medmaths.com${calculator.href}`,
          applicationCategory: "MedicalApplication",
          operatingSystem: "All",
        },
      })),
    },
  }
}

const references = [
  {
    title: "Mosteller RD — Simplified calculation of body-surface area",
    org: "PubMed / N Engl J Med",
    href: "https://pubmed.ncbi.nlm.nih.gov/3657876/",
    description: "Original publication for the commonly used simplified BSA formula.",
  },
  {
    title: "eviQ Body Surface Area Calculator",
    org: "Cancer Institute NSW",
    href: "https://www.eviq.org.au/clinical-resources/eviq-calculators/3198-body-surface-area-calculator",
    description: "Australian oncology calculator page listing BSA equations and formula references.",
  },
  {
    title: "Evaluation of Different Methods Used to Calculate Ideal Body Weight in the Paediatric Population",
    org: "PMC / Journal article",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6782117/",
    description: "Discusses the Devine method and its adult IBW formula background.",
  },
  {
    title: "Body Surface Area",
    org: "NCBI Bookshelf / StatPearls",
    href: "https://www.ncbi.nlm.nih.gov/books/NBK559005/",
    description: "Clinical overview of BSA and its use in pharmacological therapies and physiological indexing.",
  },
]

export default function BodyCompositionCategoryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdCollectionPage()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbList()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQPage()) }} />

      <CalculatorCategoryLayout
        theme="body"
        breadcrumbs={breadcrumbs}
        eyebrow="Clinical body measures for dosing calculations"
        title="Dosing Body Measure Calculators"
        description="Calculate body surface area and ideal body weight using recognised formulas. These tools provide body-measure inputs for calculation practice; they do not decide whether BSA, actual weight, ideal weight, adjusted weight, or predicted weight is correct for a specific medicine or protocol."
        icon={<Weight className="size-6" aria-hidden="true" />}
        calculators={calculators.map((calculator) => {
          const Icon = calculator.icon
          return {
            title: calculator.title,
            href: calculator.href,
            description: calculator.description,
            bestFor: calculator.searchIntent.replace(/^Best for\s*/i, ""),
            icon: <Icon className="size-5" aria-hidden="true" />,
          }
        })}
        lastReviewed={{ iso: UPDATED_DATE, label: "10 July 2026" }}
        quickGuide={
          <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-2xl border p-5 [border-color:var(--calculator-border)] [background-color:var(--calculator-softer)]">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 [color:var(--calculator-text)]" aria-hidden="true" />
                <div>
                  <h2 className="font-bold text-gray-950">Choose the measure named in the protocol</h2>
                  <p className="mt-2 text-sm leading-6 text-gray-700">
                    BSA and IBW answer different questions. Use the exact measure and formula required by the medication order, protocol, prescriber, pharmacist, or local policy.
                  </p>
                </div>
              </div>
            </div>
            <CalculatorNotice variant="warning" title="Do not substitute body measures">
              A more familiar or visually plausible number is not automatically the correct dosing input. Document the measure used when it affects the calculated dose.
            </CalculatorNotice>
          </div>
        }
        references={
          <CalculatorSection
            title="References"
            summary="Formula sources and clinical context for BSA and ideal body weight."
            icon={<Library className="size-5" aria-hidden="true" />}
          >
            <div className="grid gap-3 md:grid-cols-2">
              {references.map((reference) => (
                <a
                  key={reference.href}
                  href={reference.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-gray-200 bg-gray-50 p-4 transition hover:[border-color:var(--calculator-border)] hover:bg-white"
                >
                  <h3 className="text-sm font-semibold text-gray-950">{reference.title}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide [color:var(--calculator-text)]">{reference.org}</p>
                  <p className="mt-2 text-xs leading-5 text-gray-600">{reference.description}</p>
                </a>
              ))}
            </div>
          </CalculatorSection>
        }
      >
        <CalculatorSection
          title="Common body composition formulas"
          summary="Mosteller BSA and Devine ideal body weight formulas with worked examples."
          icon={<Calculator className="size-5" aria-hidden="true" />}
        >
          <div className="grid gap-4 lg:grid-cols-3">
            {formulaCards.map((card) => (
              <article key={card.title} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <h3 className="font-semibold text-gray-950">{card.title}</h3>
                <p className="mt-3 rounded-lg bg-white p-3 font-mono text-xs [color:var(--calculator-strong-text)]">{card.formula}</p>
                <p className="mt-3 text-sm leading-6 text-gray-700">{card.example}</p>
              </article>
            ))}
          </div>
        </CalculatorSection>

        <CalculatorSection
          title="How BSA and IBW are used in calculations"
          summary="How the calculated body measure becomes an input into a second formula."
          icon={<BookOpen className="size-5" aria-hidden="true" />}
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <article className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm leading-6 text-gray-700">
              <h3 className="font-semibold text-gray-950">BSA-based dose practice</h3>
              <p className="mt-2">A common pattern is total dose = prescribed mg/m² × BSA m².</p>
              <p className="mt-2">Example: 100 mg/m² × 1.82 m² = 182 mg before protocol-specific caps, adjustments, and rounding.</p>
            </article>
            <article className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm leading-6 text-gray-700">
              <h3 className="font-semibold text-gray-950">IBW-based dose practice</h3>
              <p className="mt-2">First calculate IBW, then use it only when the medicine or protocol specifies IBW as the dosing weight.</p>
              <p className="mt-2">The correct weight may instead be actual, adjusted, predicted, or another protocol-defined value.</p>
            </article>
          </div>
          <ol className="mt-4 grid gap-3 md:grid-cols-2">
            {safetyChecks.map((check, index) => (
              <li key={check} className="rounded-xl border border-gray-200 bg-white p-4 text-sm leading-6 text-gray-700">
                <span className="font-bold [color:var(--calculator-text)]">{index + 1}.</span> {check}
              </li>
            ))}
          </ol>
        </CalculatorSection>

        <CalculatorSection
          title="Body composition calculator FAQs"
          summary="Answers about BSA, IBW, BMI, and dosing-weight selection."
          icon={<HelpCircle className="size-5" aria-hidden="true" />}
        >
          <CategoryFaqList items={faqItems} />
        </CalculatorSection>
      </CalculatorCategoryLayout>
    </>
  )
}
