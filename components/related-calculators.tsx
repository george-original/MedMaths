import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getCalculatorCatalogItem } from "@/lib/calculator-catalog"
import { getCalculatorThemeStyle, type CalculatorThemeKey } from "@/lib/calculator-themes"

export type RelatedCalculatorItem = {
  title: string
  href: string
  description: string
}

type RelatedCalculatorsProps = {
  title?: string
  description?: string
  items: RelatedCalculatorItem[]
  theme?: CalculatorThemeKey
  className?: string
}

export function RelatedCalculators({
  title = "Related calculators",
  description = "Use these calculators for the next step in the same medication maths pathway.",
  items,
  theme = "neutral",
  className = "",
}: RelatedCalculatorsProps) {
  if (!items.length) return null

  return (
    <section
      style={getCalculatorThemeStyle(theme)}
      className={`mb-12 rounded-2xl border p-6 [border-color:var(--calculator-border)] [background-color:var(--calculator-softer)] sm:p-8 ${className}`.trim()}
    >
      <div className="mb-6 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.14em] [color:var(--calculator-text)]">Continue calculating</p>
        <h2 className="mt-2 text-2xl font-bold text-gray-900">{title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">{description}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => {
          const destinationTheme = getCalculatorCatalogItem(item.href)?.theme ?? theme

          return (
            <Link
              key={item.href}
              href={item.href}
              style={getCalculatorThemeStyle(destinationTheme)}
              className="group flex h-full flex-col rounded-xl border bg-white p-5 shadow-sm transition [border-color:var(--calculator-border)] hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:[--tw-ring-color:var(--calculator-focus)]"
            >
              <span className="mb-3 h-1 w-10 rounded-full [background-color:var(--calculator-accent)]" aria-hidden="true" />
              <h3 className="text-base font-semibold text-gray-900 transition-colors group-hover:[color:var(--calculator-text)]">
                {item.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-700">{item.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold [color:var(--calculator-text)]">
                Open calculator <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
