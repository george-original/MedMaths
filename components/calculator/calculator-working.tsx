import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export type CalculatorWorkingProps = {
  title?: string
  lines?: ReactNode[]
  children?: ReactNode
  className?: string
}

export function CalculatorWorking({
  title = "Working",
  lines,
  children,
  className,
}: CalculatorWorkingProps) {
  return (
    <div className={cn("rounded-xl border border-gray-200 bg-white p-4 text-gray-800", className)}>
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{title}</p>
      {lines ? (
        <div className="mt-2 space-y-1 font-mono text-xs leading-5 sm:text-sm">
          {lines.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
      ) : (
        <div className="mt-2 font-mono text-xs leading-5 sm:text-sm">{children}</div>
      )}
    </div>
  )
}
