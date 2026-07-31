import type { ReactNode } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export type CalculatorSectionProps = {
  title: string
  children: ReactNode
  summary?: string
  icon?: ReactNode
  defaultOpen?: boolean
  className?: string
  contentClassName?: string
}

export function CalculatorSection({
  title,
  children,
  summary,
  icon,
  defaultOpen = false,
  className,
  contentClassName,
}: CalculatorSectionProps) {
  return (
    <details
      open={defaultOpen}
      data-calculator-section
      className={cn(
        "group overflow-hidden rounded-2xl border bg-white",
        "[border-color:var(--calculator-border)]",
        className,
      )}
    >
      <summary
        className={cn(
          "flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-left outline-none sm:px-5",
          "focus-visible:ring-2 focus-visible:[--tw-ring-color:var(--calculator-focus)]",
          "[&::-webkit-details-marker]:hidden",
        )}
      >
        <div className="flex min-w-0 items-start gap-3">
          {icon && <div className="mt-0.5 shrink-0 [color:var(--calculator-text)]">{icon}</div>}
          <div className="min-w-0">
            <h2 className="text-base font-semibold text-gray-950 sm:text-lg">{title}</h2>
            {summary && <p className="mt-0.5 text-sm leading-5 text-gray-500">{summary}</p>}
          </div>
        </div>
        <ChevronDown
          aria-hidden="true"
          className="size-5 shrink-0 text-gray-500 transition-transform duration-200 group-open:rotate-180"
        />
      </summary>

      <div
        className={cn(
          "border-t px-4 py-5 [border-color:var(--calculator-border)] sm:px-5",
          contentClassName,
        )}
      >
        {children}
      </div>
    </details>
  )
}
