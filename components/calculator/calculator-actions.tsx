"use client"

import type { ReactNode } from "react"
import { Calculator, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type CalculatorActionsProps = {
  onCalculate: () => void
  onReset: () => void
  calculateLabel?: string
  resetLabel?: string
  calculateIcon?: ReactNode
  resetIcon?: ReactNode
  calculateDisabled?: boolean
  resetDisabled?: boolean
  className?: string
}

export function CalculatorActions({
  onCalculate,
  onReset,
  calculateLabel = "Calculate",
  resetLabel = "Clear",
  calculateIcon = <Calculator className="size-4" />,
  resetIcon = <RotateCcw className="size-4" />,
  calculateDisabled,
  resetDisabled,
  className,
}: CalculatorActionsProps) {
  return (
    <div className={cn("grid gap-3 pt-1 sm:grid-cols-[minmax(0,1fr)_auto]", className)}>
      <Button
        type="button"
        size="lg"
        onClick={onCalculate}
        disabled={calculateDisabled}
        className={cn(
          "h-12 rounded-xl font-semibold text-white shadow-sm",
          "[background-color:var(--calculator-accent)] hover:[background-color:var(--calculator-accent-hover)]",
          "focus-visible:[--tw-ring-color:var(--calculator-focus)]",
        )}
      >
        {calculateIcon}
        {calculateLabel}
      </Button>

      <Button
        type="button"
        size="lg"
        variant="outline"
        onClick={onReset}
        disabled={resetDisabled}
        className="h-12 rounded-xl border-gray-300 bg-white px-5 text-gray-700 hover:bg-gray-50 sm:min-w-28"
      >
        {resetIcon}
        {resetLabel}
      </Button>
    </div>
  )
}
