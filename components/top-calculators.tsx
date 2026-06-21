"use client"

import Link from "next/link"
import { Droplet, Pill, Beaker, Weight, Activity, Syringe, type LucideIcon } from "lucide-react"

interface TopCalculator {
  title: string
  description: string
  href: string
  categoryTag: "Dose" | "IV" | "Tablet" | "Dilution" | "Body" | "Renal"
  icon: LucideIcon
}

const topCalculators: TopCalculator[] = [
  {
    title: "mg to mL Calculator",
    description: "Convert medicine dose in mg to volume in mL using concentration.",
    href: "/calculator/dose-calculations/mg-to-ml",
    categoryTag: "Dose",
    icon: Syringe,
  },
  {
    title: "Tablet Dosage Calculator",
    description: "Work out how many tablets are needed from dose and strength.",
    href: "/calculator/tablet-dosing/mg-to-tablets",
    categoryTag: "Tablet",
    icon: Pill,
  },
  {
    title: "mL/hr to gtt/min",
    description: "Convert IV pump rate to drops per minute using drop factor.",
    href: "/calculator/iv-fluids/drip-rate-mlhr-to-gttmin",
    categoryTag: "IV",
    icon: Droplet,
  },
  {
    title: "gtt/min to mL/hr",
    description: "Convert manual drip count back to an hourly IV rate.",
    href: "/calculator/iv-fluids/mlhr-from-drip-rate",
    categoryTag: "IV",
    icon: Droplet,
  },
  {
    title: "Infusion Time Calculator",
    description: "Calculate how long an IV infusion will take or has remaining.",
    href: "/calculator/iv-fluids/ml-per-hour-to-time-to-finish",
    categoryTag: "IV",
    icon: Droplet,
  },
  {
    title: "C1V1 = C2V2 Calculator",
    description: "Calculate dilution volume from stock and target concentration.",
    href: "/calculator/dilutions/c1v1-c2v2-basic",
    categoryTag: "Dilution",
    icon: Beaker,
  },
  {
    title: "BSA Calculator",
    description: "Body surface area calculation for dose checking and clinical notes.",
    href: "/calculator/body-composition/bsa",
    categoryTag: "Body",
    icon: Weight,
  },
  {
    title: "Creatinine Clearance",
    description: "Cockcroft-Gault CrCl estimate for renal dosing context.",
    href: "/calculator/renal-function/creatinine-clearance",
    categoryTag: "Renal",
    icon: Activity,
  },
]

const tagColors: Record<TopCalculator["categoryTag"], string> = {
  Dose: "#06b6d4",
  IV: "#3b82f6",
  Tablet: "#f97316",
  Dilution: "#8b5cf6",
  Body: "#22c55e",
  Renal: "#2563eb",
}

export function TopCalculators() {
  const jsonLdItems = topCalculators.map((calc) => ({
    "@type": "Thing",
    name: calc.title,
    url: `https://www.medmaths.com${calc.href}`,
  }))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Core MedMaths calculators",
            url: "https://www.medmaths.com",
            itemListElement: jsonLdItems.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item,
            })),
          }),
        }}
      />

      <section className="container mx-auto px-6 pb-20">
        <div className="mb-6 text-center">
          <h2 className="mb-2 text-3xl font-bold text-foreground">Most useful medication maths tools</h2>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
            Focused calculators for dose conversions, tablet dosing, IV rates, dilutions, and dosing weight checks.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {topCalculators.map((calc) => {
            const Icon = calc.icon
            const tagColor = tagColors[calc.categoryTag]
            return (
              <Link key={calc.href} href={calc.href} className="group block h-full">
                <div className="h-full rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-border/70 hover:bg-card/70 hover:shadow-md">
                  <div className="mb-4 flex items-start gap-3">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${tagColor}15` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: tagColor }} />
                    </div>
                    <span
                      className="ml-auto rounded-full border px-2.5 py-1 text-xs font-medium"
                      style={{ borderColor: tagColor, color: tagColor }}
                    >
                      {calc.categoryTag}
                    </span>
                  </div>

                  <h3 className="mb-2 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                    {calc.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">{calc.description}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </>
  )
}
