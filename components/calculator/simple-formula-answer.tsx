import type { ReactNode } from "react"

import { cn } from "@/lib/utils"
import { getCalculatorThemeStyle, type CalculatorThemeKey } from "@/lib/calculator-themes"

export type SimpleFormulaAnswerProps = {
  id?: string
  theme?: CalculatorThemeKey
  title: string
  lead: ReactNode
  equation: ReactNode
  spokenEquation: string
  example?: ReactNode
  note?: ReactNode
  className?: string
}

export function SimpleFormulaAnswer({
  id,
  theme = "neutral",
  title,
  lead,
  equation,
  spokenEquation,
  example,
  note,
  className,
}: SimpleFormulaAnswerProps) {
  const headingId = id ? `${id}-heading` : undefined

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      style={getCalculatorThemeStyle(theme)}
      className={cn(
        "rounded-2xl border p-5 [border-color:var(--calculator-border)] [background-color:var(--calculator-softer)] sm:p-6",
        className,
      )}
    >
      <p className="text-xs font-bold uppercase tracking-[0.12em] [color:var(--calculator-text)]">Simple answer</p>
      <h2 id={headingId} className="mt-1 text-xl font-bold text-gray-950 sm:text-2xl">
        {title}
      </h2>
      <p className="mt-3 text-base leading-7 text-gray-800">{lead}</p>

      <div
        role="math"
        aria-label={spokenEquation}
        className="mt-4 overflow-x-auto rounded-xl border bg-white px-4 py-4 text-center font-mono text-base font-semibold leading-7 text-gray-950 [border-color:var(--calculator-border)] sm:text-lg"
      >
        <span aria-hidden="true">{equation}</span>
      </div>

      {example && (
        <div className="mt-4 rounded-xl bg-white px-4 py-3 text-sm leading-6 text-gray-800">
          <span className="font-semibold text-gray-950">Example:</span> {example}
        </div>
      )}

      {note && <p className="mt-3 text-sm leading-6 text-gray-700">{note}</p>}
    </section>
  )
}
