import type { ReactNode } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { getCalculatorThemeStyle, type CalculatorThemeKey } from "@/lib/calculator-themes"

export type CalculatorContentDisclosureProps = {
  title: string
  summary?: string
  children: ReactNode
  theme?: CalculatorThemeKey
  id?: string
  defaultOpen?: boolean
  className?: string
}

export function CalculatorContentDisclosure({
  title,
  summary,
  children,
  theme = "neutral",
  id,
  defaultOpen = false,
  className,
}: CalculatorContentDisclosureProps) {
  return (
    <details
      id={id}
      open={defaultOpen}
      style={getCalculatorThemeStyle(theme)}
      className={cn(
        "group mb-8 scroll-mt-24 overflow-hidden rounded-2xl border bg-white [border-color:var(--calculator-border)]",
        className,
      )}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left [&::-webkit-details-marker]:hidden sm:px-6 sm:py-5">
        <div>
          <h2 className="text-xl font-bold text-gray-950 sm:text-2xl">{title}</h2>
          {summary && <p className="mt-1.5 max-w-3xl text-sm leading-6 text-gray-600">{summary}</p>}
        </div>
        <ChevronDown className="size-5 shrink-0 [color:var(--calculator-text)] transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>
      <div className="border-t px-5 py-6 [border-color:var(--calculator-border)] [background-color:var(--calculator-softer)] sm:px-6">
        {children}
      </div>
    </details>
  )
}
