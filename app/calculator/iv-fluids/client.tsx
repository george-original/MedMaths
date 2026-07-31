import {
  CalculatorCategoryLayout,
  CalculatorNotice,
  CalculatorSection,
  CategoryFaqList,
} from "@/components/calculator"
import { BookOpen, Droplet, Gauge, HelpCircle, Library, ShieldCheck } from "lucide-react"

const calculators = [
  {
    title: "mL/hr to gtt/min Calculator",
    slug: "drip-rate-mlhr-to-gttmin",
    description: "Convert a pump rate in mL/hr into manual drops per minute using the IV giving set drop factor.",
    useWhen: "Use when the order or pump rate is in mL/hr but the gravity drip needs to be counted as drops per minute.",
    formula: "gtt/min = (mL/hr × drop factor) ÷ 60",
  },
  {
    title: "gtt/min to mL/hr Calculator",
    slug: "mlhr-from-drip-rate",
    description: "Convert a manual drip count in gtt/min back into the equivalent hourly IV rate in mL/hr.",
    useWhen: "Use when you counted drops per minute and need to check what mL/hr rate that drip count represents.",
    formula: "mL/hr = (gtt/min ÷ drop factor) × 60",
  },
  {
    title: "Infusion Time Calculator",
    slug: "ml-per-hour-to-time-to-finish",
    description: "Calculate remaining infusion duration and optional clock completion from volume, mL/hr, and a start time.",
    useWhen: "Use when you know the remaining volume and mL/hr and need either the duration or an estimated clock finish time.",
    formula: "time (hours) = volume (mL) ÷ rate (mL/hr); finish = start time + duration",
  },
]

const formulaCards = [
  {
    title: "mL/hr to gtt/min",
    formula: "gtt/min = (mL/hr × drop factor) ÷ 60",
    example: "120 mL/hr with a 20 gtt/mL set: (120 × 20) ÷ 60 = 40 gtt/min",
  },
  {
    title: "gtt/min to mL/hr",
    formula: "mL/hr = (gtt/min ÷ drop factor) × 60",
    example: "40 gtt/min with a 20 gtt/mL set: (40 ÷ 20) × 60 = 120 mL/hr",
  },
  {
    title: "Volume and time to mL/hr",
    formula: "mL/hr = volume (mL) ÷ time (hr)",
    example: "1,000 mL over 8 hours: 1,000 ÷ 8 = 125 mL/hr",
  },
  {
    title: "mL/hr to infusion time",
    formula: "time (hr) = volume (mL) ÷ rate (mL/hr)",
    example: "600 mL at 150 mL/hr: 600 ÷ 150 = 4 hours",
  },
]

const commonExamples = [
  {
    question: "How many gtt/min is 120 mL/hr with a 20 gtt/mL set?",
    answer: "40 gtt/min. Multiply 120 by 20, then divide by 60.",
  },
  {
    question: "How many mL/hr is 40 gtt/min with a 20 gtt/mL set?",
    answer: "120 mL/hr. Divide 40 by 20, then multiply by 60.",
  },
  {
    question: "How long will 1,000 mL take at 125 mL/hr?",
    answer: "8 hours. Divide 1,000 mL by 125 mL/hr.",
  },
  {
    question: "How many gtt/min is 100 mL over 30 minutes with a 15 gtt/mL set?",
    answer: "50 gtt/min. Divide 100 mL by 30 minutes, then multiply by 15 gtt/mL.",
  },
]

const faqItems = [
  {
    question: "What is an IV drip rate calculator?",
    quickAnswer: "An IV drip rate calculator helps convert between volume, time, hourly rate, drops per minute, and drop factor.",
    details: [
      "Pump infusions are usually set in mL/hr.",
      "Gravity infusions are often checked in drops per minute, written as gtt/min.",
      "The drop factor, written as gtt/mL, must match the IV giving set being used.",
    ],
    microExample: "A rate of 120 mL/hr with 20 gtt/mL tubing equals 40 gtt/min.",
  },
  {
    question: "How do I convert mL/hr to gtt/min?",
    quickAnswer: "Multiply mL/hr by the drop factor, then divide by 60.",
    details: [
      "Formula: gtt/min = (mL/hr × drop factor) ÷ 60.",
      "Use the drop factor printed on the giving set, such as 10, 15, 20, or 60 gtt/mL.",
      "This conversion is used when a gravity infusion needs to be counted manually.",
    ],
    microExample: "120 mL/hr × 20 gtt/mL ÷ 60 = 40 gtt/min",
    relatedCalculators: [{ name: "mL/hr to gtt/min", href: "/calculator/iv-fluids/drip-rate-mlhr-to-gttmin" }],
  },
  {
    question: "How do I convert gtt/min to mL/hr?",
    quickAnswer: "Divide gtt/min by the drop factor, then multiply by 60.",
    details: [
      "Formula: mL/hr = (gtt/min ÷ drop factor) × 60.",
      "This can help check what hourly rate a manual drip count represents.",
      "Always confirm the drop factor before converting because a different giving set changes the answer.",
    ],
    microExample: "40 gtt/min ÷ 20 gtt/mL × 60 = 120 mL/hr",
    relatedCalculators: [{ name: "gtt/min to mL/hr", href: "/calculator/iv-fluids/mlhr-from-drip-rate" }],
  },
  {
    question: "What does drop factor mean?",
    quickAnswer: "Drop factor means the number of drops needed to make 1 mL of fluid through a specific IV giving set.",
    details: [
      "Drop factor is written as gtt/mL.",
      "Common examples include 10, 15, 20, and 60 gtt/mL.",
      "Microdrip tubing is commonly 60 gtt/mL, while macrodrip tubing varies by set.",
    ],
    microExample: "A 20 gtt/mL set means 20 drops equal 1 mL through that tubing.",
  },
  {
    question: "How do I calculate infusion time?",
    quickAnswer: "Divide the remaining volume in mL by the rate in mL/hr.",
    details: [
      "Formula: time (hours) = volume remaining (mL) ÷ rate (mL/hr).",
      "Use the actual remaining volume if checking time to finish.",
      "Convert decimal hours into hours and minutes when needed.",
    ],
    microExample: "600 mL ÷ 150 mL/hr = 4 hours",
    relatedCalculators: [{ name: "Infusion time", href: "/calculator/iv-fluids/ml-per-hour-to-time-to-finish" }],
  },
  {
    question: "What is the formula for drops per minute?",
    quickAnswer: "For a gravity infusion, drops per minute equals volume divided by time in minutes, multiplied by drop factor.",
    details: [
      "Formula: gtt/min = (volume in mL ÷ time in minutes) × drop factor.",
      "If you already know mL/hr, use gtt/min = (mL/hr × drop factor) ÷ 60.",
      "Round drops per minute to a whole number because partial drops cannot be counted at the bedside.",
    ],
    microExample: "1,000 mL over 8 hours with 15 gtt/mL: 1,000 ÷ 480 × 15 = 31.25, rounded to 31 gtt/min",
  },
  {
    question: "Should drops per minute be rounded?",
    quickAnswer: "Usually yes. Manual drops per minute are counted as whole drops, so the final gtt/min value is usually rounded to a whole number.",
    details: [
      "Rounding should not replace clinical judgement or local policy.",
      "If rounding creates a meaningful difference in hourly volume, re-check the order and equipment.",
      "Pump rates in mL/hr may allow decimals depending on the device and setting.",
    ],
    microExample: "31.25 gtt/min is usually set as 31 gtt/min when counting drops manually.",
  },
  {
    question: "What is the most common IV drip calculation mistake?",
    quickAnswer: "The most common mistake is using the wrong drop factor or mixing up hours and minutes.",
    details: [
      "mL/hr uses hours. gtt/min uses minutes.",
      "The drop factor must come from the actual giving set, not memory.",
      "Check whether the question asks for mL/hr, gtt/min, or time to finish before calculating.",
    ],
    microExample: "Using 20 gtt/mL instead of 60 gtt/mL gives a result that is three times smaller.",
  },
]


export function IVFluidsCategoryClient() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "IV Fluid and Infusion Calculators",
    description:
      "A collection of IV fluid calculators for drip-rate conversion, infusion duration, and clock completion.",
    url: "https://www.medmaths.com/calculator/iv-fluids",
    isPartOf: {
      "@type": "WebSite",
      name: "MedMaths",
      url: "https://www.medmaths.com",
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: calculators.map((calculator, index) => ({
        "@type": "WebApplication",
        position: index + 1,
        name: calculator.title,
        description: calculator.description,
        url: `https://www.medmaths.com/calculator/iv-fluids/${calculator.slug}`,
        applicationCategory: "MedicalApplication",
        operatingSystem: "Web browser",
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
        text: [item.quickAnswer, ...(item.details || []), item.microExample].filter(Boolean).join(" "),
      },
    })),
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.medmaths.com" },
      { "@type": "ListItem", position: 2, name: "Calculators", item: "https://www.medmaths.com/calculators" },
      { "@type": "ListItem", position: 3, name: "IV Fluids", item: "https://www.medmaths.com/calculator/iv-fluids" },
    ],
  }

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Calculators", href: "/calculators" },
    { name: "IV Fluids", href: "/calculator/iv-fluids" },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <CalculatorCategoryLayout
        theme="iv"
        breadcrumbs={breadcrumbs}
        eyebrow="IV fluids, gravity drips, and infusion time"
        title="IV Fluid and Infusion Calculators"
        description="Convert between mL/hr and drops per minute, or calculate how long an infusion will take from remaining volume and rate. The calculators put the arithmetic first and keep drop-factor, timing, and gravity-flow checks close to the result."
        icon={<Droplet className="size-6" aria-hidden="true" />}
        calculators={calculators.map((calculator) => ({
          title: calculator.title,
          href: `/calculator/iv-fluids/${calculator.slug}`,
          description: calculator.description,
          bestFor: calculator.useWhen,
          formula: calculator.formula,
          icon: <Droplet className="size-5" aria-hidden="true" />,
        }))}
        lastReviewed={{ iso: "2026-07-10", label: "10 July 2026" }}
        quickGuide={
          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-2xl border p-5 [border-color:var(--calculator-border)] [background-color:var(--calculator-softer)]">
              <h2 className="font-bold text-gray-950">Start with the unit you already have</h2>
              <ul className="mt-3 grid gap-2 text-sm leading-6 text-gray-700 sm:grid-cols-3">
                <li><strong>Have mL/hr?</strong> Convert to gtt/min.</li>
                <li><strong>Counted gtt/min?</strong> Convert to mL/hr.</li>
                <li><strong>Know volume and rate?</strong> Calculate time.</li>
              </ul>
            </div>
            <CalculatorNotice variant="warning" title="Check the actual IV setup">
              Confirm the order, giving-set drop factor, pump settings, remaining volume, fluid, patient context, and local policy. Gravity flow can change after the arithmetic is completed.
            </CalculatorNotice>
          </div>
        }
        references={
          <CalculatorSection
            title="References"
            summary="Sources supporting gravity drip, flow-rate, and infusion-time calculations."
            icon={<Library className="size-5" aria-hidden="true" />}
          >
            <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-gray-700">
              <li>OpenStax Clinical Nursing Skills: intravenous infusion and gravity drip-rate calculations.</li>
              <li>RMIT Learning Lab: converting flow rates between mL/hr and drops per minute.</li>
              <li>OpenStax Fundamentals of Nursing: medication administration and dose-checking principles.</li>
            </ul>
          </CalculatorSection>
        }
      >
        <CalculatorSection
          title="IV drip rate formulas"
          summary="The four common relationships between volume, time, hourly rate, and drop factor."
          icon={<Gauge className="size-5" aria-hidden="true" />}
        >
          <div className="grid gap-4 md:grid-cols-2">
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
          title="Step-by-step IV calculation process"
          summary="Choose the target unit, convert time, confirm the giving set, and check the bedside result."
          icon={<BookOpen className="size-5" aria-hidden="true" />}
        >
          <ol className="grid gap-3 md:grid-cols-2">
            <li className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm leading-6 text-gray-700"><strong className="text-gray-950">1. Identify the target unit.</strong><br />Decide whether the answer is mL/hr, gtt/min, or an elapsed duration.</li>
            <li className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm leading-6 text-gray-700"><strong className="text-gray-950">2. Convert time correctly.</strong><br />Use hours for mL/hr and minutes for gtt/min.</li>
            <li className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm leading-6 text-gray-700"><strong className="text-gray-950">3. Confirm the drop factor.</strong><br />Use the gtt/mL printed on the actual giving set.</li>
            <li className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm leading-6 text-gray-700"><strong className="text-gray-950">4. Observe and recheck.</strong><br />A gravity rate must be checked at the drip chamber after adjustment.</li>
          </ol>
        </CalculatorSection>

        <CalculatorSection
          title="Common IV examples and calculation checks"
          summary="Worked long-tail examples followed by unit, drop-factor, and rounding checks."
          icon={<ShieldCheck className="size-5" aria-hidden="true" />}
        >
          <div className="grid gap-4 md:grid-cols-2">
            {commonExamples.map((example) => (
              <article key={example.question} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <h3 className="font-semibold text-gray-950">{example.question}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-700">{example.answer}</p>
              </article>
            ))}
          </div>
          <ul className="mt-4 grid gap-3 rounded-xl border border-red-100 bg-red-50 p-5 text-sm leading-6 text-red-900 md:grid-cols-2">
            <li>Check whether the question asks for mL/hr, gtt/min, or time.</li>
            <li>Check whether time is written in hours or minutes.</li>
            <li>Use the giving-set drop factor, not a value remembered from another set.</li>
            <li>Round manual drops to whole drops only after the exact calculation is understood.</li>
          </ul>
        </CalculatorSection>

        <CalculatorSection
          title="IV calculation FAQs"
          summary="Answers about drop factor, gtt/min, mL/hr, infusion time, and common errors."
          icon={<HelpCircle className="size-5" aria-hidden="true" />}
        >
          <CategoryFaqList items={faqItems} />
        </CalculatorSection>
      </CalculatorCategoryLayout>
    </>
  )
}
