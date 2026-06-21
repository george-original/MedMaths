"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CalculatorSearch } from "@/components/calculator-search"
import { TopCalculators } from "@/components/top-calculators"
import { Droplet, Beaker, Pill, Weight, Activity, Syringe } from "lucide-react"

const categoryTheme: Record<string, { accent: string }> = {
  "Dose Calculations": { accent: "#06b6d4" },
  "Tablet & Oral Dosing": { accent: "#f97316" },
  "IV Fluids & Infusions": { accent: "#3b82f6" },
  "Dilutions & Reconstitution": { accent: "#8b5cf6" },
  "Dosing Body Measures": { accent: "#22c55e" },
  "Renal Dosing Support": { accent: "#2563eb" },
}

const calculatorCategories = [
  {
    name: "Dose Calculations",
    slug: "dose-calculations",
    description: "mg to mL, mg/kg to mL, and units to mL dose checks.",
    count: "3",
    href: "/calculator/dose-calculations",
    icon: Syringe,
  },
  {
    name: "Tablet & Oral Dosing",
    slug: "tablet-dosing",
    description: "mg to tablets and weight-based tablet calculations.",
    count: "2",
    href: "/calculator/tablet-dosing",
    icon: Pill,
  },
  {
    name: "IV Fluids & Infusions",
    slug: "iv-fluids",
    description: "mL/hr, gtt/min, and infusion time calculations.",
    count: "3",
    href: "/calculator/iv-fluids",
    icon: Droplet,
  },
  {
    name: "Dilutions & Reconstitution",
    slug: "dilutions",
    description: "C1V1=C2V2, vial dose to mL, and reconstitution calculations.",
    count: "3",
    href: "/calculator/dilutions",
    icon: Beaker,
  },
  {
    name: "Dosing Body Measures",
    slug: "body-composition",
    description: "BSA and ideal body weight for medication dose context.",
    count: "2",
    href: "/calculator/body-composition",
    icon: Weight,
  },
  {
    name: "Renal Dosing Support",
    slug: "renal-function",
    description: "Creatinine clearance for medication dosing context.",
    count: "1",
    href: "/calculator/renal-function",
    icon: Activity,
  },
]

export default function ClientPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="container mx-auto px-6 pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">
            Medication maths for clinical practice
          </p>
          <h1 className="mb-6 text-center text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Medication dose calculators for nurses and clinicians.
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-center text-pretty text-lg text-muted-foreground md:text-xl">
            Use focused calculators for mg to mL conversions, tablet dosage, IV drip rates, infusion time, dilutions, BSA, ideal body weight, and Cockcroft-Gault creatinine clearance.
          </p>
          <div className="mx-auto max-w-2xl mb-10">
            <CalculatorSearch />
          </div>
          <div className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground">
            <span className="rounded-full border border-border px-3 py-1">No signup</span>
            <span className="rounded-full border border-border px-3 py-1">Inputs not stored</span>
            <span className="rounded-full border border-border px-3 py-1">Formulas shown</span>
            <span className="rounded-full border border-border px-3 py-1">Built by an RN</span>
          </div>
        </div>
      </section>

      <TopCalculators />

      <section className="container mx-auto px-6 pb-20">
        <h2 className="mb-3 text-center text-3xl font-bold text-foreground">Browse the focused calculator set</h2>
        <p className="mx-auto mb-8 max-w-2xl text-center text-sm text-muted-foreground">
          Each calculator is built around one search intent, one formula, clear units, worked examples, and safer medication maths scope.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {calculatorCategories.map((category) => {
            const Icon = category.icon
            const theme = categoryTheme[category.name] || { accent: "#3b82f6" }

            return (
              <Link key={category.slug} href={category.href} className="group block h-full">
                <div className="relative h-full overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-border/80 hover:bg-card/60 hover:shadow-md">
                  <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: theme.accent }} />

                  <div className="pl-2">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div className="flex flex-1 items-center gap-3">
                        <div className="rounded-lg p-2" style={{ backgroundColor: `${theme.accent}15` }}>
                          <Icon className="h-4 w-4" style={{ color: theme.accent }} />
                        </div>
                        <h3 className="text-sm font-semibold text-foreground">{category.name}</h3>
                      </div>

                      <div
                        className="shrink-0 rounded-full border px-2.5 py-1 text-xs font-medium"
                        style={{ borderColor: theme.accent, color: theme.accent }}
                      >
                        {category.count}
                      </div>
                    </div>

                    <p className="text-xs leading-relaxed text-muted-foreground">{category.description}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="border-y border-border/40 bg-muted/20">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="mb-1 text-4xl font-semibold tracking-tight text-foreground">14</div>
              <div className="text-sm text-muted-foreground">Focused tools</div>
            </div>
            <div className="text-center">
              <div className="mb-1 text-4xl font-semibold tracking-tight text-foreground">Private</div>
              <div className="text-sm text-muted-foreground">Inputs not stored</div>
            </div>
            <div className="text-center">
              <div className="mb-1 text-4xl font-semibold tracking-tight text-foreground">Clear</div>
              <div className="text-sm text-muted-foreground">Formulas included</div>
            </div>
            <div className="text-center">
              <div className="mb-1 text-4xl font-semibold tracking-tight text-foreground">Free</div>
              <div className="text-sm text-muted-foreground">No account needed</div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-20 md:py-28">
        <h2 className="mb-4 text-center text-4xl font-bold tracking-tight text-foreground md:text-5xl">Why this focused library is stronger</h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-muted-foreground">
          MedMaths is built around the medication calculations people commonly need to check: dose conversions, tablets, IV rates, dilutions, body measures, and renal dosing support.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-8">
            <h3 className="mb-2 text-xl font-semibold text-foreground">Calculation first</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Pages put the calculator, formula, and worked examples before long educational content.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8">
            <h3 className="mb-2 text-xl font-semibold text-foreground">Nursing-friendly wording</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Labels use real medication maths language, such as mg/mL, mg per 5 mL, tablets, gtt/min, and mL/hr.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8">
            <h3 className="mb-2 text-xl font-semibold text-foreground">Safer scope</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              The site stays in a narrow lane: medication maths, not broad diagnostic scoring or general medical calculators.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16 text-center md:py-24">
        <h2 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          Start with the calculator people already need.
        </h2>
        <Button size="lg" asChild className="rounded-full px-8">
          <Link href="/calculator/dose-calculations/mg-to-ml">Open mg to mL calculator</Link>
        </Button>
      </section>

      <SiteFooter />
    </div>
  )
}
