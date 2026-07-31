import Link from "next/link"
import type { ReactNode } from "react"
import {
  Activity,
  ArrowRight,
  Beaker,
  ChevronDown,
  Droplet,
  Pill,
  Syringe,
  Weight,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { getCalculatorThemeStyle } from "@/lib/calculator-themes"
import {
  calculatorCatalog,
  popularCalculatorCatalogItems,
  type CalculatorCatalogCategory,
  type CalculatorCatalogIconKey,
  type CalculatorCatalogItem,
} from "@/lib/calculator-catalog"

const iconMap: Record<CalculatorCatalogIconKey, LucideIcon> = {
  syringe: Syringe,
  pill: Pill,
  droplet: Droplet,
  beaker: Beaker,
  weight: Weight,
  activity: Activity,
}

export type CalculatorTopicGridProps = {
  className?: string
  categories?: CalculatorCatalogCategory[]
}

export function CalculatorTopicGrid({ className, categories = calculatorCatalog }: CalculatorTopicGridProps) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {categories.map((category) => {
        const Icon = iconMap[category.icon]

        return (
          <Link
            key={category.href}
            href={category.href}
            style={getCalculatorThemeStyle(category.theme)}
            className={cn(
              "group relative flex h-full min-h-40 flex-col overflow-hidden rounded-2xl border bg-white p-5 shadow-sm transition",
              "[border-color:var(--calculator-border)] hover:-translate-y-0.5 hover:shadow-md",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:[--tw-ring-color:var(--calculator-focus)]",
            )}
          >
            <div className="absolute inset-y-0 left-0 w-1 [background-color:var(--calculator-accent)]" aria-hidden="true" />
            <div className="flex items-start justify-between gap-4 pl-1">
              <div className="flex size-11 items-center justify-center rounded-xl [background-color:var(--calculator-soft)] [color:var(--calculator-text)]">
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <span className="rounded-full border px-2.5 py-1 text-xs font-semibold [border-color:var(--calculator-border)] [color:var(--calculator-text)]">
                {category.calculators.length} {category.calculators.length === 1 ? "calculator" : "calculators"}
              </span>
            </div>
            <h3 className="mt-4 pl-1 text-base font-bold text-gray-950 transition-colors group-hover:[color:var(--calculator-text)]">
              {category.name}
            </h3>
            <p className="mt-2 pl-1 text-sm leading-6 text-gray-600">{category.description}</p>
            <span className="mt-auto inline-flex items-center gap-1.5 pl-1 pt-4 text-sm font-semibold [color:var(--calculator-text)]">
              {category.calculators.length === 1 ? "Open calculator" : "Browse topic"} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </Link>
        )
      })}
    </div>
  )
}

export type PopularCalculatorGridProps = {
  className?: string
  limit?: number
  items?: CalculatorCatalogItem[]
}

export function PopularCalculatorGrid({
  className,
  limit = popularCalculatorCatalogItems.length,
  items = popularCalculatorCatalogItems,
}: PopularCalculatorGridProps) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {items.slice(0, limit).map((calculator) => (
        <CalculatorDirectoryCard key={calculator.href} calculator={calculator} compact />
      ))}
    </div>
  )
}

export type CalculatorDirectoryProps = {
  className?: string
  categories?: CalculatorCatalogCategory[]
}

export function CalculatorDirectory({ className, categories = calculatorCatalog }: CalculatorDirectoryProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {categories.map((category) => {
        const Icon = iconMap[category.icon]

        return (
          <section
            key={category.href}
            style={getCalculatorThemeStyle(category.theme)}
            aria-labelledby={`directory-${category.slug}`}
            className="rounded-3xl border bg-white p-5 shadow-sm [border-color:var(--calculator-border)] sm:p-6"
          >
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl [background-color:var(--calculator-soft)] [color:var(--calculator-text)]">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 id={`directory-${category.slug}`} className="text-lg font-bold text-gray-950">
                    {category.name}
                  </h3>
                  <p className="mt-1 max-w-3xl text-sm leading-6 text-gray-600">{category.description}</p>
                </div>
              </div>
              {category.calculators.length > 1 && (
                <Link
                  href={category.href}
                  className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold [color:var(--calculator-text)] hover:underline hover:underline-offset-4"
                >
                  Topic guide <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              )}
            </div>

            <div
              className={cn(
                "grid gap-4",
                category.calculators.length === 1 && "max-w-2xl",
                category.calculators.length === 2 && "md:grid-cols-2",
                category.calculators.length >= 3 && "md:grid-cols-2 xl:grid-cols-3",
              )}
            >
              {category.calculators.map((calculator) => (
                <CalculatorDirectoryCard key={calculator.href} calculator={calculator} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}

export type CalculatorDirectoryCardProps = {
  calculator: CalculatorCatalogItem
  compact?: boolean
  className?: string
}

export function CalculatorDirectoryCard({ calculator, compact = false, className }: CalculatorDirectoryCardProps) {
  const Icon = iconMap[calculator.icon]

  return (
    <Link
      href={calculator.href}
      style={getCalculatorThemeStyle(calculator.theme)}
      className={cn(
        "group flex h-full flex-col rounded-2xl border bg-white p-4 shadow-sm transition",
        "[border-color:var(--calculator-border)] hover:-translate-y-0.5 hover:shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:[--tw-ring-color:var(--calculator-focus)]",
        compact && "min-h-52 p-5",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl [background-color:var(--calculator-soft)] [color:var(--calculator-text)]">
          <Icon className="size-5" aria-hidden="true" />
        </div>
        {compact && (
          <span className="rounded-full border px-2.5 py-1 text-[11px] font-semibold [border-color:var(--calculator-border)] [color:var(--calculator-text)]">
            {calculator.categoryShortName}
          </span>
        )}
      </div>

      <h3 className="mt-4 text-base font-bold text-gray-950 transition-colors group-hover:[color:var(--calculator-text)]">
        {calculator.shortTitle ?? calculator.title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-gray-600">{compact ? calculator.description : calculator.intent}</p>

      {!compact && (
        <div className="mt-4 rounded-xl border px-3 py-2.5 [border-color:var(--calculator-border)] [background-color:var(--calculator-softer)]">
          <p className="font-mono text-[11px] leading-5 [color:var(--calculator-strong-text)]">{calculator.formula}</p>
        </div>
      )}

      <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold [color:var(--calculator-text)]">
        Open calculator <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  )
}

export type DirectoryDisclosureProps = {
  title: string
  children: ReactNode
  icon?: ReactNode
  className?: string
}

export function DirectoryDisclosure({ title, children, icon, className }: DirectoryDisclosureProps) {
  return (
    <details className={cn("group rounded-2xl border border-gray-200 bg-white", className)}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-3 font-semibold text-gray-950">
          {icon && <span className="text-gray-500">{icon}</span>}
          {title}
        </span>
        <ChevronDown className="size-5 shrink-0 text-gray-500 transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>
      <div className="border-t border-gray-200 px-5 py-5 text-sm leading-6 text-gray-700">{children}</div>
    </details>
  )
}
