import type { Metadata } from "next"
import Link from "next/link"
import { Droplet, Beaker, Pill, Weight, Activity, Syringe } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "All Calculators | MedMaths",
  description:
    "Browse all medication dose calculators: mg to mL, tablet dosage, IV drip rates, dilutions, BSA, ideal body weight, and creatinine clearance.",
  alternates: { canonical: "https://www.medmaths.com/calculators" },
}

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

export default function CalculatorsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="container mx-auto px-6 py-12 md:py-16">
        <div className="mx-auto max-w-3xl mb-10 text-center">
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            All Calculators
          </h1>
          <p className="text-base text-muted-foreground">
            14 focused medication maths tools across 6 categories.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {calculatorCategories.map((category) => {
            const Icon = category.icon
            const theme = categoryTheme[category.name] || { accent: "#3b82f6" }

            return (
              <Link key={category.slug} href={category.href} className="group block h-full">
                <div className="relative h-full overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-border/80 hover:bg-card/60 hover:shadow-md">
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1"
                    style={{ backgroundColor: theme.accent }}
                  />

                  <div className="pl-2">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div className="flex flex-1 items-center gap-3">
                        <div
                          className="rounded-lg p-2"
                          style={{ backgroundColor: `${theme.accent}15` }}
                        >
                          <Icon className="h-4 w-4" style={{ color: theme.accent }} />
                        </div>
                        <h2 className="text-sm font-semibold text-foreground">{category.name}</h2>
                      </div>

                      <div
                        className="shrink-0 rounded-full border px-2.5 py-1 text-xs font-medium"
                        style={{ borderColor: theme.accent, color: theme.accent }}
                      >
                        {category.count}
                      </div>
                    </div>

                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
