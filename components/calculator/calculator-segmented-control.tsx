"use client"

import { cn } from "@/lib/utils"

export type CalculatorSegmentedOption<T extends string> = {
  value: T
  label: string
  disabled?: boolean
}

export type CalculatorSegmentedControlProps<T extends string> = {
  value: T
  options: CalculatorSegmentedOption<T>[]
  onChange: (value: T) => void
  ariaLabel: string
  className?: string
}

export function CalculatorSegmentedControl<T extends string>({
  value,
  options,
  onChange,
  ariaLabel,
  className,
}: CalculatorSegmentedControlProps<T>) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn("inline-flex max-w-full rounded-xl border border-gray-200 bg-white p-1", className)}
    >
      {options.map((option) => {
        const selected = option.value === value

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            disabled={option.disabled}
            onClick={() => onChange(option.value)}
            className={cn(
              "min-h-9 flex-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors sm:flex-none",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:[--tw-ring-color:var(--calculator-focus)]",
              selected
                ? "text-white [background-color:var(--calculator-accent)]"
                : "text-gray-700 hover:[background-color:var(--calculator-soft)]",
              "disabled:pointer-events-none disabled:opacity-50",
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
