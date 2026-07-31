import Link from "next/link"
import type { ReactNode } from "react"
import { ArrowRight, ChevronDown } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { getCalculatorThemeStyle, type CalculatorThemeKey } from "@/lib/calculator-themes"
import { CalculatorTrustBlock } from "./calculator-trust-block"
import { cn } from "@/lib/utils"

export type CalculatorCategoryBreadcrumb = {
  name: string
  href: string
}

export type CalculatorCategoryItem = {
  title: string
  href: string
  description: string
  bestFor?: string
  formula?: string
  icon?: ReactNode
}

export type CalculatorCategoryLayoutProps = {
  theme: CalculatorThemeKey
  breadcrumbs: CalculatorCategoryBreadcrumb[]
  eyebrow: string
  title: string
  description: string
  icon?: ReactNode
  calculators: CalculatorCategoryItem[]
  children?: ReactNode
  quickGuide?: ReactNode
  references?: ReactNode
  lastReviewed: {
    iso: string
    label: string
  }
  className?: string
}

export function CalculatorCategoryLayout({
  theme,
  breadcrumbs,
  eyebrow,
  title,
  description,
  icon,
  calculators,
  children,
  quickGuide,
  references,
  lastReviewed,
  className,
}: CalculatorCategoryLayoutProps) {
  return (
    <>
      <SiteHeader />
      <main
        style={getCalculatorThemeStyle(theme)}
        className={cn("min-h-screen bg-white pt-20", className)}
      >
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <nav className="mb-6 text-sm text-gray-600" aria-label="Breadcrumb">
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.href}>
                {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                {index === breadcrumbs.length - 1 ? (
                  <span aria-current="page" className="font-medium text-gray-900">
                    {crumb.name}
                  </span>
                ) : (
                  <Link href={crumb.href} className="hover:text-gray-950 hover:underline hover:underline-offset-4">
                    {crumb.name}
                  </Link>
                )}
              </span>
            ))}
          </nav>

          <header className="mb-8 rounded-3xl border px-5 py-7 [border-color:var(--calculator-border)] [background-color:var(--calculator-softer)] sm:px-8 sm:py-9">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              {icon && (
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl [background-color:var(--calculator-soft)] [color:var(--calculator-text)]">
                  {icon}
                </div>
              )}
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.16em] [color:var(--calculator-text)]">{eyebrow}</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">{title}</h1>
                <p className="mt-4 max-w-4xl text-base leading-7 text-gray-700 sm:text-lg">{description}</p>
              </div>
            </div>
          </header>

          <section
            aria-label={`${title} list`}
            className={cn(
              "mb-8 grid gap-4",
              calculators.length === 1 && "max-w-2xl",
              calculators.length === 2 && "sm:grid-cols-2",
              calculators.length >= 3 && "sm:grid-cols-2 lg:grid-cols-3",
            )}
          >
            {calculators.map((calculator) => (
              <CalculatorCategoryCard key={calculator.href} calculator={calculator} />
            ))}
          </section>

          {quickGuide && <section className="mb-8">{quickGuide}</section>}

          {children && <div className="space-y-4">{children}</div>}

          <CalculatorTrustBlock
            theme={theme}
            className="mt-8"
            author={{ name: "George Lambroglou", credentials: "RN", href: "/about" }}
            lastReviewed={lastReviewed}
            note="MedMaths topic pages explain calculation methods and help users choose a calculator. They support arithmetic checking and education; they do not prescribe, validate, or recommend a medicine dose."
          />

          {references && <div className="mt-4">{references}</div>}
        </div>
      </main>
      <SiteFooter />
    </>
  )
}

function CalculatorCategoryCard({ calculator }: { calculator: CalculatorCategoryItem }) {
  return (
    <Link
      href={calculator.href}
      className={cn(
        "group flex h-full flex-col rounded-2xl border bg-white p-5 shadow-sm transition",
        "[border-color:var(--calculator-border)] hover:-translate-y-0.5 hover:shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:[--tw-ring-color:var(--calculator-focus)]",
      )}
    >
      <div className="mb-4 flex size-11 items-center justify-center rounded-xl [background-color:var(--calculator-soft)] [color:var(--calculator-text)]">
        {calculator.icon}
      </div>
      <h2 className="text-lg font-bold text-gray-950 transition-colors group-hover:[color:var(--calculator-text)]">
        {calculator.title}
      </h2>
      <p className="mt-2 text-sm leading-6 text-gray-600">{calculator.description}</p>

      {(calculator.bestFor || calculator.formula) && (
        <div className="mt-4 space-y-2 rounded-xl border p-3 [border-color:var(--calculator-border)] [background-color:var(--calculator-softer)]">
          {calculator.bestFor && (
            <p className="text-xs leading-5 text-gray-700">
              <span className="font-semibold text-gray-900">Best for:</span> {calculator.bestFor}
            </p>
          )}
          {calculator.formula && <p className="font-mono text-[11px] leading-5 [color:var(--calculator-strong-text)]">{calculator.formula}</p>}
        </div>
      )}

      <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold [color:var(--calculator-text)]">
        Open calculator <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  )
}

export type CategoryFaqItem = {
  question: string
  answer?: string
  quickAnswer?: string
  details?: string[]
  microExample?: string
}

export function CategoryFaqList({ items }: { items: CategoryFaqItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details key={item.question} className="group rounded-xl border bg-white [border-color:var(--calculator-border)]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-left [&::-webkit-details-marker]:hidden">
            <span className="font-semibold leading-6 text-gray-950">{item.question}</span>
            <ChevronDown className="size-5 shrink-0 text-gray-500 transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <div className="border-t px-4 py-4 text-sm leading-6 text-gray-700 [border-color:var(--calculator-border)]">
            <p>{item.answer ?? item.quickAnswer}</p>
            {item.details && item.details.length > 0 && (
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                {item.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            )}
            {item.microExample && (
              <p className="mt-3 rounded-lg px-3 py-2 font-mono text-xs [background-color:var(--calculator-softer)] [color:var(--calculator-strong-text)]">
                {item.microExample}
              </p>
            )}
          </div>
        </details>
      ))}
    </div>
  )
}
