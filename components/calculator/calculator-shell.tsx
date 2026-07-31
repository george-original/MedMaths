import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import {
  calculatorThemes,
  getCalculatorThemeStyle,
  type CalculatorThemeKey,
} from "@/lib/calculator-themes"

export type CalculatorShellProps = {
  theme: CalculatorThemeKey
  children: ReactNode
  title?: string
  description?: string
  eyebrow?: string
  icon?: ReactNode
  headerAction?: ReactNode
  footer?: ReactNode
  id?: string
  className?: string
  bodyClassName?: string
}

export function CalculatorShell({
  theme,
  children,
  title,
  description,
  eyebrow,
  icon,
  headerAction,
  footer,
  id,
  className,
  bodyClassName,
}: CalculatorShellProps) {
  const headingId = title && id ? `${id}-title` : undefined
  const themeConfig = calculatorThemes[theme]

  return (
    <section
      id={id}
      data-calculator-shell
      data-calculator-theme={theme}
      aria-labelledby={headingId}
      style={getCalculatorThemeStyle(theme)}
      className={cn(
        "calculator-tool overflow-hidden rounded-2xl border bg-white shadow-sm",
        "[border-color:var(--calculator-border)]",
        className,
      )}
    >
      {(title || description || eyebrow || icon || headerAction) && (
        <header
          className={cn(
            "flex flex-col gap-3 border-b px-4 py-4 sm:flex-row sm:items-start sm:justify-between sm:px-6",
            "[background-color:var(--calculator-softer)] [border-color:var(--calculator-border)]",
          )}
        >
          <div className="flex min-w-0 items-start gap-3">
            {icon && (
              <div
                aria-hidden="true"
                className={cn(
                  "mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl",
                  "[background-color:var(--calculator-soft)] [color:var(--calculator-text)]",
                )}
              >
                {icon}
              </div>
            )}

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide [color:var(--calculator-text)]">
                {eyebrow ?? themeConfig.label}
              </p>
              {title && (
                <h2 id={headingId} className="mt-1 text-xl font-bold text-gray-950 sm:text-2xl">
                  {title}
                </h2>
              )}
              {description && <p className="mt-1 max-w-3xl text-sm leading-6 text-gray-600">{description}</p>}
            </div>
          </div>

          {headerAction && <div className="shrink-0">{headerAction}</div>}
        </header>
      )}

      <div className={cn("space-y-5 px-4 py-5 sm:px-6 sm:py-6", bodyClassName)}>{children}</div>

      {footer && (
        <footer className="border-t px-4 py-4 [border-color:var(--calculator-border)] sm:px-6">
          {footer}
        </footer>
      )}
    </section>
  )
}
