"use client"

import { forwardRef, type ReactNode } from "react"
import { cn } from "@/lib/utils"

type ResultStatus = "default" | "warning" | "danger" | "success"

const statusClasses: Record<ResultStatus, string> = {
  default:
    "[background-color:var(--calculator-soft)] [border-color:var(--calculator-border)] [color:var(--calculator-strong-text)]",
  warning: "border-amber-200 bg-amber-50 text-amber-950",
  danger: "border-red-200 bg-red-50 text-red-950",
  success: "border-emerald-200 bg-emerald-50 text-emerald-950",
}

export type CalculatorResultProps = {
  label: string
  value: ReactNode
  unit?: ReactNode
  interpretation?: ReactNode
  status?: ResultStatus
  badge?: ReactNode
  actions?: ReactNode
  children?: ReactNode
  className?: string
}

export const CalculatorResult = forwardRef<HTMLDivElement, CalculatorResultProps>(
  function CalculatorResult(
    {
      label,
      value,
      unit,
      interpretation,
      status = "default",
      badge,
      actions,
      children,
      className,
    },
    ref,
  ) {
    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        tabIndex={-1}
        data-calculator-result
        className={cn(
          "scroll-mt-24 rounded-2xl border p-5 outline-none focus-visible:ring-2 focus-visible:[--tw-ring-color:var(--calculator-focus)] sm:p-6",
          statusClasses[status],
          className,
        )}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-semibold opacity-80">{label}</p>
              {badge}
            </div>
            <p className="mt-1 break-words text-3xl font-bold tracking-tight sm:text-4xl">
              {value}
              {unit && <span className="ml-2 text-xl font-semibold sm:text-2xl">{unit}</span>}
            </p>
            {interpretation && <div className="mt-2 max-w-3xl text-sm leading-6">{interpretation}</div>}
          </div>

          {actions && <div className="shrink-0">{actions}</div>}
        </div>

        {children && <div className="mt-4 border-t border-current/15 pt-4">{children}</div>}
      </div>
    )
  },
)
