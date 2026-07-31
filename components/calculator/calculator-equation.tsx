import type { ReactNode } from "react"

import { cn } from "@/lib/utils"
import { getCalculatorThemeStyle, type CalculatorThemeKey } from "@/lib/calculator-themes"

export type CalculatorEquationVariable = {
  symbol: string
  meaning: string
}

export type CalculatorEquationProps = {
  title?: string
  equation: ReactNode
  spokenEquation: string
  plainEnglish?: string
  variables?: CalculatorEquationVariable[]
  theme?: CalculatorThemeKey
  id?: string
  className?: string
  headingLevel?: "h2" | "h3" | "h4"
}

export function CalculatorEquation({
  title,
  equation,
  spokenEquation,
  plainEnglish,
  variables = [],
  theme = "neutral",
  id,
  className,
  headingLevel = "h3",
}: CalculatorEquationProps) {
  const Heading = headingLevel
  const headingId = title && id ? `${id}-heading` : undefined

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      style={getCalculatorThemeStyle(theme)}
      className={cn(
        "scroll-mt-24 rounded-2xl border bg-white p-4 [border-color:var(--calculator-border)] sm:p-5",
        className,
      )}
    >
      {title && (
        <Heading id={headingId} className="text-lg font-bold text-gray-950 sm:text-xl">
          {title}
        </Heading>
      )}

      <div
        role="math"
        aria-label={spokenEquation}
        className={cn(
          title ? "mt-3" : "",
          "overflow-x-auto rounded-xl border px-4 py-4 text-center font-mono text-sm font-semibold leading-7 text-gray-950",
          "[border-color:var(--calculator-border)] [background-color:var(--calculator-softer)] sm:text-base",
        )}
      >
        <span aria-hidden="true">{equation}</span>
      </div>

      {plainEnglish && (
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wide [color:var(--calculator-text)]">In simple words</p>
          <p className="mt-1.5 text-sm leading-6 text-gray-700">{plainEnglish}</p>
        </div>
      )}

      {variables.length > 0 && (
        <dl className="mt-4 grid gap-2 text-sm text-gray-700 sm:grid-cols-2">
          {variables.map((variable) => (
            <div key={`${variable.symbol}-${variable.meaning}`} className="rounded-lg bg-gray-50 px-3 py-2">
              <dt className="inline font-semibold text-gray-950">{variable.symbol}</dt>
              <dd className="inline"> = {variable.meaning}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  )
}
