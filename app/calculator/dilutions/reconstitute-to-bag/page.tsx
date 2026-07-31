import type { Metadata } from "next"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

import { CalculatorTrustBlock } from "@/components/calculator"
import { RelatedCalculators } from "@/components/related-calculators"
import { getCalculatorNetworkItems } from "@/lib/calculator-network"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

import FinalIvConcentrationClient from "./reconstitute-to-bag-client"

const CANONICAL_URL = "https://www.medmaths.com/calculator/dilutions/reconstitute-to-bag"
const LAST_UPDATED_ISO = "2026-07-30"
const LAST_UPDATED_HUMAN = "30 Jul 2026"

export const metadata: Metadata = {
  title: "Final IV Bag Concentration Calculator | Reconstituted Vial",
  description:
    "Check final IV concentration from a verified reconstituted-vial concentration, medicine-solution transfer volume, and final total preparation volume. Arithmetic only—not preparation instructions.",
  keywords: [
    "final IV bag concentration calculator",
    "reconstituted vial concentration calculator",
    "vial to IV bag concentration",
    "final IV concentration checker",
    "amount transferred calculator",
    "final preparation concentration",
    "reconstituted vial to bag calculator",
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
    title: "Final IV Bag Concentration Calculator | Reconstituted Vial",
    description:
      "Check final IV concentration after verified vial reconstitution and transfer. The calculator does not plan the preparation.",
    url: CANONICAL_URL,
    siteName: "MedMaths",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary",
    title: "Final IV Bag Concentration Calculator | Reconstituted Vial",
    description:
      "Check final IV concentration after verified vial reconstitution and transfer. Arithmetic only—not preparation instructions.",
  },
}

const faqItems = [
  {
    question: "How is final IV concentration calculated after vial reconstitution?",
    quickAnswer:
      "Calculate the verified vial concentration, calculate how much medicine is in the transferred solution, then divide by the verified final total preparation volume.",
    details: [
      "Vial concentration = drug amount per vial ÷ verified final volume per vial",
      "Amount transferred = vial concentration × medicine-solution transfer volume",
      "Final concentration = amount transferred ÷ verified final total preparation volume",
    ],
    microExample:
      "1000 mg ÷ 10 mL = 100 mg/mL; 100 mg/mL × 5 mL = 500 mg; 500 mg ÷ 250 mL = 2 mg/mL.",
  },
  {
    question: "Is the final vial volume the same as the diluent added?",
    quickAnswer:
      "Not necessarily. Powder displacement can make the final solution volume different from the amount of diluent added.",
    details: [
      "Use a verified final vial volume or verified final concentration",
      "Check the medicine label, product information, pharmacy label, monograph, or protocol",
      "Do not infer final vial volume from the diluent amount alone",
    ],
    microExample:
      "A product may direct 19 mL of diluent but state a 20 mL final reconstituted volume. The stated final volume controls the concentration arithmetic.",
  },
  {
    question: "What does verified final total preparation volume mean?",
    quickAnswer:
      "It is the total volume that the approved source says should be used to calculate the final concentration.",
    details: [
      "It is not automatically the nominal bag size",
      "Some instructions remove fluid first, account for transfer volume, or make up to a stated final volume",
      "Bag overfill and product-specific preparation steps cannot be resolved by generic arithmetic",
    ],
    microExample:
      "If 500 mg is present in a verified final total volume of 110 mL, the concentration is 500 ÷ 110 = 4.545 mg/mL—not 5 mg/mL.",
  },
  {
    question: "How do I calculate the amount of medicine transferred?",
    quickAnswer:
      "Multiply the verified reconstituted-vial concentration by the total medicine-solution volume transferred.",
    details: [
      "This calculation can represent one vial or multiple identical vials",
      "The calculator does not decide how many vials should be used",
      "The prescribed or verified transfer volume must already be known",
    ],
    microExample: "100 mg/mL × 5 mL transferred = 500 mg transferred.",
  },
  {
    question: "What if the full contents of one or more vials are transferred?",
    quickAnswer:
      "Enter the total solution volume transferred. The calculator reports how many identical final-vial volumes that represents.",
    details: [
      "The drug amount and final vial volume inputs describe one identical vial",
      "A transfer volume above one final-vial volume triggers a multiple-vial check",
      "Residual volume, dead space, incomplete transfer, and vial count remain product- and process-specific",
    ],
    microExample:
      "A 1000 mg vial with a verified final volume of 10 mL transferred in full to a 250 mL final volume gives 4 mg/mL.",
  },
  {
    question: "How do I reverse-check the final concentration?",
    quickAnswer:
      "Multiply the final concentration by the verified final total volume. It should equal the amount transferred.",
    details: [
      "This checks the concentration arithmetic",
      "It can help identify a decimal-place or volume-entry error",
      "It does not confirm compatibility, stability, sterility, or preparation suitability",
    ],
    microExample: "2 mg/mL × 250 mL = 500 mg transferred.",
  },
  {
    question: "Is final IV concentration the same as infusion rate?",
    quickAnswer:
      "No. Final concentration is expressed as an amount per volume, such as mg/mL. Infusion rate is expressed as volume or dose per time.",
    details: [
      "This page does not calculate mL/hr",
      "It does not calculate mg/hr or dose per minute",
      "Use the verified administration instructions and a separate infusion-rate calculation where required",
    ],
    microExample: "2 mg/mL describes concentration. It does not state how quickly the solution should be infused.",
  },
  {
    question: "Why can this calculator not choose the diluent, bag, compatibility, or stability?",
    quickAnswer:
      "Those decisions are medicine-specific and depend on the approved product information, pharmacy preparation, protocol, and local safety systems.",
    details: [
      "Different medicines can require different diluents and concentration ranges",
      "Compatibility and stability can depend on container, concentration, time, temperature, and co-administered medicines",
      "High-risk IV medicines may require pharmacy preparation and independent checks",
    ],
    microExample:
      "Two calculations can produce the same mg/mL result while only one preparation is compatible or stable. Arithmetic alone cannot distinguish them.",
  },
]

const workedExamples = [
  {
    title: "Partial transfer from one reconstituted vial",
    lines: [
      "1000 mg per vial ÷ 10 mL final vial volume = 100 mg/mL",
      "100 mg/mL × 5 mL transferred = 500 mg",
      "500 mg ÷ 250 mL verified final volume = 2 mg/mL",
    ],
    answer: "Final IV concentration: 2 mg/mL",
  },
  {
    title: "Full transfer of one vial",
    lines: [
      "500 mg per vial ÷ 5 mL final vial volume = 100 mg/mL",
      "100 mg/mL × 5 mL transferred = 500 mg",
      "500 mg ÷ 100 mL verified final volume = 5 mg/mL",
    ],
    answer: "Final IV concentration: 5 mg/mL",
  },
  {
    title: "Verified final volume differs from the nominal bag size",
    lines: [
      "500 mg per vial ÷ 10 mL final vial volume = 50 mg/mL",
      "50 mg/mL × 10 mL transferred = 500 mg",
      "500 mg ÷ 110 mL verified final volume = 4.545 mg/mL",
    ],
    answer: "Final IV concentration: 4.545 mg/mL",
  },
]

const practiceItems = [
  {
    q: "A 1000 mg vial has a verified final volume of 10 mL. A verified 4 mL is transferred into a verified final total volume of 100 mL. What is the final concentration?",
    a: "Vial concentration = 1000 ÷ 10 = 100 mg/mL. Amount transferred = 100 × 4 = 400 mg. Final concentration = 400 ÷ 100 = 4 mg/mL.",
  },
  {
    q: "A 500 mg vial has a verified final volume of 10 mL. A total of 20 mL from identical vials is transferred. How much medicine is transferred?",
    a: "Vial concentration = 500 ÷ 10 = 50 mg/mL. Amount transferred = 50 × 20 = 1000 mg. The transfer represents two identical final-vial volumes.",
  },
  {
    q: "The final concentration is 2 mg/mL in a verified final total volume of 250 mL. What amount should the reverse check show?",
    a: "2 × 250 = 500 mg transferred.",
  },
]

const references = [
  {
    title: "Preparing Unit-Dose Packaged Medications",
    organisation: "OpenStax Clinical Nursing Skills",
    description:
      "Explains that reconstitution diluent and volume must be taken from the manufacturer directions and medication label.",
    href: "https://openstax.org/books/clinical-nursing-skills/pages/12-3-preparing-unit-dose-packaged-medications",
  },
  {
    title: "High Risk Medicines and Systems",
    organisation: "Australian Commission on Safety and Quality in Health Care",
    description:
      "Medication-safety framework covering high-risk medicines, independent checks, and safer preparation systems.",
    href: "https://www.safetyandquality.gov.au/clinical-topics/medicines-safety-and-quality/high-risk-medicines-and-systems",
  },
  {
    title: "Veklury Powder for Injection",
    organisation: "Australian Commission on Safety and Quality in Health Care medicine information",
    description:
      "A product example showing why diluent added and final reconstituted volume can differ and why product-specific instructions control preparation.",
    href: "https://www.safetyandquality.gov.au/medicine-finder/veklury-powder-for-injection",
  },
  {
    title: "Principles of Intravenous Therapy",
    organisation: "OpenStax Clinical Nursing Skills",
    description:
      "Explains that IV medication administration requirements, including infusion rate, are medicine- and source-specific.",
    href: "https://openstax.org/books/clinical-nursing-skills/pages/13-1-principles-of-intravenous-therapy",
  },
]

export default function FinalIvBagConcentrationPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://www.medmaths.com" },
    { name: "Calculators", url: "https://www.medmaths.com/calculators" },
    { name: "Dilutions", url: "https://www.medmaths.com/calculator/dilutions" },
    { name: "Final IV Bag Concentration", url: CANONICAL_URL },
  ]

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
        text: [item.quickAnswer, ...item.details].join("\n"),
      },
    })),
  }

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Final IV Bag Concentration Calculator",
    description:
      "Check final IV concentration from verified reconstituted-vial, transfer-volume, and final-total-volume inputs.",
    url: CANONICAL_URL,
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SiteHeader />

      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-4xl px-4 pb-12 pt-4 sm:px-6 sm:py-12 lg:px-8 lg:pt-10">
          <nav className="mb-4 hidden text-sm text-gray-500 sm:block" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-purple-700">Home</Link>
            <span> / </span>
            <Link href="/calculators" className="hover:text-purple-700">Calculators</Link>
            <span> / </span>
            <Link href="/calculator/dilutions" className="hover:text-purple-700">Dilutions</Link>
            <span> / </span>
            <span className="text-gray-900">Final IV Bag Concentration</span>
          </nav>

          <section className="mb-6 text-center sm:mb-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-purple-700">Verified-input concentration checker</p>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Final IV Bag Concentration Calculator
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg">
              Check the final mg/mL concentration after a vial has been reconstituted and a verified medicine-solution volume has been transferred into a verified final total preparation volume.
            </p>
          </section>

          <FinalIvConcentrationClient />

          <div className="my-8 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
            {[
              ["#final-iv-concentration-tool", "Calculator"],
              ["#formula", "Formula"],
              ["#how-to-use", "How to use"],
              ["#worked-examples", "Examples"],
              ["#practice", "Practice"],
              ["#faqs", "FAQs"],
              ["#references", "References"],
            ].map(([href, label]) => (
              <a key={href} href={href} className="font-medium text-purple-700 hover:text-purple-900">
                {label}
              </a>
            ))}
          </div>

          <section id="formula" className="mb-8 scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-900">Final IV concentration formula</h2>
            <p className="mt-3 leading-7 text-gray-700">
              This is a linked arithmetic check. The medicine-specific preparation decisions must already be verified before the values are entered.
            </p>
            <div className="mt-4 space-y-2 rounded-2xl border border-purple-200 bg-purple-50 p-5 font-mono text-sm leading-6 text-purple-950">
              <div>Vial concentration = drug amount per vial ÷ verified final volume per vial</div>
              <div>Amount transferred = vial concentration × medicine-solution transfer volume</div>
              <div>Final concentration = amount transferred ÷ verified final total preparation volume</div>
            </div>
          </section>

          <section className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
            <h2 className="text-xl font-bold text-amber-950">What this calculator does not decide</h2>
            <div className="mt-4 grid gap-4 text-sm leading-6 text-amber-950 sm:grid-cols-2">
              <div>
                <h3 className="font-semibold">Reconstitution method</h3>
                <p className="mt-1">It does not choose the diluent, diluent volume, aseptic process, number of vials, or transfer volume.</p>
              </div>
              <div>
                <h3 className="font-semibold">Final container and volume</h3>
                <p className="mt-1">It does not determine bag overfill, volume to remove, make-up volume, container type, or final labelling requirements.</p>
              </div>
              <div>
                <h3 className="font-semibold">Compatibility and stability</h3>
                <p className="mt-1">It cannot confirm concentration limits, compatibility, stability, storage, or expiry after preparation.</p>
              </div>
              <div>
                <h3 className="font-semibold">Administration</h3>
                <p className="mt-1">It does not calculate infusion rate, dose per hour, route suitability, monitoring, or administration duration.</p>
              </div>
            </div>
          </section>

          <details id="how-to-use" className="group mb-6 scroll-mt-24 overflow-hidden rounded-2xl border border-purple-200 bg-white" open>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-gray-900 [&::-webkit-details-marker]:hidden">
              How to use this concentration checker
              <span className="text-sm font-medium text-purple-700 group-open:hidden">Show</span>
              <span className="hidden text-sm font-medium text-purple-700 group-open:inline">Hide</span>
            </summary>
            <div className="border-t border-purple-200 p-5">
              <ol className="list-decimal space-y-2 pl-5 text-sm leading-6 text-gray-700">
                <li>Verify the medicine amount and final solution volume for each identical reconstituted vial.</li>
                <li>Verify the total medicine-solution volume specified for transfer.</li>
                <li>Verify the final total preparation volume used for the concentration calculation.</li>
                <li>Enter the values in mg and mL.</li>
                <li>Review the vial concentration, amount transferred, final concentration, reverse check, and arithmetic prompts.</li>
              </ol>
            </div>
          </details>

          <details id="worked-examples" className="group mb-6 scroll-mt-24 overflow-hidden rounded-2xl border border-purple-200 bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-gray-900 [&::-webkit-details-marker]:hidden">
              Worked examples
              <span className="text-sm font-medium text-purple-700 group-open:hidden">Show</span>
              <span className="hidden text-sm font-medium text-purple-700 group-open:inline">Hide</span>
            </summary>
            <div className="space-y-5 border-t border-purple-200 p-5">
              {workedExamples.map((example) => (
                <div key={example.title} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <h3 className="font-semibold text-gray-900">{example.title}</h3>
                  <div className="mt-3 space-y-1 font-mono text-xs leading-5 text-gray-700 sm:text-sm">
                    {example.lines.map((line) => <div key={line}>{line}</div>)}
                  </div>
                  <p className="mt-3 rounded-lg border border-purple-200 bg-purple-50 p-3 text-sm font-semibold text-purple-950">{example.answer}</p>
                </div>
              ))}
            </div>
          </details>

          <details id="practice" className="group mb-6 scroll-mt-24 overflow-hidden rounded-2xl border border-purple-200 bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-gray-900 [&::-webkit-details-marker]:hidden">
              Practice questions with answers
              <span className="text-sm font-medium text-purple-700 group-open:hidden">Show</span>
              <span className="hidden text-sm font-medium text-purple-700 group-open:inline">Hide</span>
            </summary>
            <div className="space-y-3 border-t border-purple-200 p-5">
              {practiceItems.map((item, index) => (
                <details key={item.q} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <summary className="cursor-pointer font-semibold text-gray-900">{index + 1}. {item.q}</summary>
                  <p className="mt-3 rounded-lg border border-purple-200 bg-purple-50 p-3 text-sm leading-6 text-purple-950"><strong>Answer:</strong> {item.a}</p>
                </details>
              ))}
            </div>
          </details>

          <details id="faqs" className="group mb-10 scroll-mt-24 overflow-hidden rounded-2xl border border-purple-200 bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-gray-900 [&::-webkit-details-marker]:hidden">
              Final IV concentration FAQ
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
            title="Related medication and IV calculators"
            description="Use a different calculator when the unknown is dose volume, stock dilution, infusion time, or drip rate."
            items={getCalculatorNetworkItems("/calculator/dilutions/reconstitute-to-bag")}
          />

          <CalculatorTrustBlock
            theme="dilution"
            author={{ name: "George Lambroglou", credentials: "RN", href: "/about" }}
            lastReviewed={{ iso: LAST_UPDATED_ISO, label: LAST_UPDATED_HUMAN }}
            note="This page checks final-concentration arithmetic from verified inputs. It does not provide product-specific reconstitution, compounding, compatibility, stability, storage, infusion-rate, or administration instructions."
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
                    <p className="font-medium text-gray-900 transition group-hover:text-purple-700">{reference.title}</p>
                    <p className="mt-1 text-sm text-gray-600">{reference.organisation}</p>
                    <p className="mt-1 text-sm leading-6 text-gray-700">{reference.description}</p>
                  </div>
                  <ExternalLink className="mt-1 size-4 shrink-0 text-gray-400 transition group-hover:text-purple-700" aria-hidden="true" />
                </a>
              ))}
              <p className="text-sm leading-6 text-gray-600">References support the arithmetic and safety boundary. The current medicine order, approved product information, pharmacy preparation, protocol, and local policy control real preparation and administration.</p>
            </div>
          </details>
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
