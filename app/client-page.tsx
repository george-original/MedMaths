import Link from "next/link"
import { ArrowRight, BookOpen, Calculator, Search, ShieldCheck, Stethoscope } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CalculatorSearch } from "@/components/calculator-search"
import { TopCalculators } from "@/components/top-calculators"
import {
  CalculatorTopicGrid,
  CalculatorTrustBlock,
  DirectoryDisclosure,
} from "@/components/calculator"
import { allCalculatorCatalogItems, calculatorCatalog } from "@/lib/calculator-catalog"

const homeFaqItems = [
  {
    question: "What is MedMaths?",
    answer:
      "MedMaths is a focused medical maths calculator library for medication dose conversions, tablet dosing, IV drip rates, dilutions, body surface area, ideal body weight, and creatinine clearance.",
  },
  {
    question: "Is Med Maths the same as MedMaths?",
    answer:
      "Yes. Med Maths is the spaced version of the MedMaths brand name. Both refer to this medication maths calculator website.",
  },
  {
    question: "Which MedMaths calculator should I use first?",
    answer:
      "Start with the units in the medication order and product label. Use mg to mL for liquid dose volume, mg/kg tools for weight-based dosing, tablet calculators for tablet quantities, IV calculators for drip rates or infusion time, and the renal or body measure tools when a reference specifically requires CrCl, BSA, or IBW.",
  },
  {
    question: "Does MedMaths replace clinical judgement?",
    answer:
      "No. MedMaths shows formulas and arithmetic. It does not recommend doses, validate medication orders, diagnose conditions, or replace product information, local policy, or clinical review.",
  },
]

export default function ClientPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <main className="pt-20">
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.12em] text-cyan-800">
              <Calculator className="size-4" aria-hidden="true" />
              {allCalculatorCatalogItems.length} calculators across {calculatorCatalog.length} topics
            </div>

            <h1 className="text-balance text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
              Medication maths calculators for clear, focused arithmetic checks
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-pretty text-base leading-7 text-gray-600 sm:text-lg">
              MedMaths provides free calculators for mg to mL, mg/kg doses, tablets, IV drip rates, infusion time, dilutions, BSA, ideal body weight, and Cockcroft-Gault creatinine clearance.
            </p>

            <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-cyan-200 bg-cyan-50/60 p-3 text-left shadow-sm sm:p-4">
              <div className="mb-2 flex items-center gap-2 px-1 text-sm font-semibold text-cyan-900">
                <Search className="size-4" aria-hidden="true" />
                Search all calculators
              </div>
              <CalculatorSearch />
            </div>

            <div className="mt-7 flex flex-wrap justify-center gap-2 text-xs font-medium text-gray-600 sm:text-sm">
              <span className="rounded-full border border-gray-200 bg-white px-3 py-1.5">No signup</span>
              <span className="rounded-full border border-gray-200 bg-white px-3 py-1.5">Calculator inputs not stored</span>
              <span className="rounded-full border border-gray-200 bg-white px-3 py-1.5">Formulas and working shown</span>
              <span className="rounded-full border border-gray-200 bg-white px-3 py-1.5">Built by an RN</span>
            </div>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-full px-6">
                <Link href="/calculators">
                  Browse all calculators <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-6">
                <Link href="/calculator/dose-calculations/mg-to-ml">Open mg to mL</Link>
              </Button>
            </div>
          </div>
        </section>

        <TopCalculators />

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="mb-7 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-700">Browse by topic</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
              Choose the calculation type that matches the order
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
              Start with the units and wording in the problem. Each topic page explains which calculator fits and keeps its own colour identity.
            </p>
          </div>
          <CalculatorTopicGrid />
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 sm:p-7">
            <div className="flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white">
                <ShieldCheck className="size-5" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-amber-950">Calculation support, not prescribing advice</h2>
                <p className="mt-2 text-sm leading-6 text-amber-950">
                  MedMaths shows arithmetic and calculation methods. Always confirm the medication order, product strength, units, route, frequency, patient factors, maximum dose limits, compatibility, and local independent-check requirements before using a result.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-gray-200 bg-gray-50/70">
          <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="mb-7 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-700">About the library</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
                Medical maths calculators, explained clearly
              </h2>
              <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-gray-600">
                The longer educational and search information remains available without pushing the calculators down the page.
              </p>
            </div>

            <div className="space-y-3">
              <DirectoryDisclosure title="What MedMaths covers" icon={<Stethoscope className="size-5" aria-hidden="true" />}>
                <p>
                  MedMaths is a focused medical maths calculator library. It covers common medication calculation methods including dose-to-volume conversions, weight-based doses, tablet quantities, IV drip rates, infusion duration, stock dilution, final IV concentration, body surface area, ideal body weight, and creatinine clearance.
                </p>
                <p className="mt-3">
                  Some people search for the brand as <strong>MedMaths</strong>, while others type <strong>Med Maths</strong>. Both names refer to the same calculator library.
                </p>
              </DirectoryDisclosure>

              <DirectoryDisclosure title="How to choose a calculator" icon={<Search className="size-5" aria-hidden="true" />}>
                <p>
                  Start with the unit written in the medication order. Use mg to mL for a liquid dose, mg/kg tools when patient weight is part of the order, tablet calculators for fixed oral strengths, IV calculators for mL/hr or gtt/min questions, and dilution tools for concentration-volume arithmetic or final IV concentration checks.
                </p>
                <p className="mt-3">
                  BSA, ideal body weight, and creatinine clearance should be used only when the relevant medicine reference or protocol specifically requires that measure.
                </p>
              </DirectoryDisclosure>

              <DirectoryDisclosure title="How the pages are structured" icon={<BookOpen className="size-5" aria-hidden="true" />}>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <h3 className="font-semibold text-gray-950">Calculation first</h3>
                    <p className="mt-1">The calculator, formula, result, and working appear before long educational content.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-950">Clinical units</h3>
                    <p className="mt-1">Labels use practical medication maths units such as mg/mL, tablets, gtt/min, and mL/hr.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-950">Narrow scope</h3>
                    <p className="mt-1">The site supports arithmetic checks without turning the result into a dose recommendation.</p>
                  </div>
                </div>
              </DirectoryDisclosure>

              <DirectoryDisclosure title="MedMaths frequently asked questions" icon={<Calculator className="size-5" aria-hidden="true" />}>
                <div className="space-y-5">
                  {homeFaqItems.map((item) => (
                    <div key={item.question}>
                      <h3 className="font-semibold text-gray-950">{item.question}</h3>
                      <p className="mt-1">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </DirectoryDisclosure>
            </div>

            <CalculatorTrustBlock
              theme="neutral"
              className="mt-6"
              author={{ name: "George Lambroglou", credentials: "RN", href: "/about" }}
              lastReviewed={{ iso: "2026-07-11", label: "11 July 2026" }}
              note="MedMaths provides calculation and education tools. It does not prescribe, recommend, or independently validate medication doses."
            />
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 text-center sm:px-6 lg:px-8 lg:py-20">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
            Open the full calculator directory
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
            View all {allCalculatorCatalogItems.length} calculators grouped by dose, tablet, IV, dilution, body measure, and renal topics.
          </p>
          <Button asChild size="lg" className="mt-6 rounded-full px-7">
            <Link href="/calculators">
              Browse all calculators <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
