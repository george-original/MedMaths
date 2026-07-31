import Link from "next/link"
import type { ReactNode } from "react"
import { BadgeCheck, CalendarDays, FileWarning, MessageSquareText, PenLine, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import { getCalculatorThemeStyle, type CalculatorThemeKey } from "@/lib/calculator-themes"

type PersonCredit = {
  name: string
  credentials?: string
  href?: string
}

export type CalculatorTrustBlockProps = {
  author: PersonCredit
  reviewer?: PersonCredit
  lastReviewed?: {
    iso: string
    label: string
  }
  note?: ReactNode
  theme?: CalculatorThemeKey
  className?: string
}

function PersonName({ person }: { person: PersonCredit }) {
  const display = `${person.name}${person.credentials ? `, ${person.credentials}` : ""}`

  if (!person.href) return <span className="font-semibold text-gray-900">{display}</span>

  return (
    <Link
      href={person.href}
      className="font-semibold text-gray-900 underline decoration-gray-300 underline-offset-4 hover:[text-decoration-color:var(--calculator-accent)]"
    >
      {display}
    </Link>
  )
}

export function CalculatorTrustBlock({
  author,
  reviewer,
  lastReviewed,
  note,
  theme = "neutral",
  className,
}: CalculatorTrustBlockProps) {
  return (
    <aside
      aria-label="Author and review information"
      style={getCalculatorThemeStyle(theme)}
      className={cn(
        "overflow-hidden rounded-2xl border [border-color:var(--calculator-border)] [background-color:var(--calculator-softer)]",
        className,
      )}
    >
      <div className="border-b px-4 py-4 [border-color:var(--calculator-border)] sm:px-5">
        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl [background-color:var(--calculator-soft)] [color:var(--calculator-text)]">
            <ShieldCheck className="size-4" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-950">Authorship and review</h2>
            <p className="mt-1 text-xs leading-5 text-gray-600">
              Transparent page ownership, review timing, and limits of use.
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className={cn("grid gap-4 text-sm text-gray-600", reviewer ? "sm:grid-cols-3" : "sm:grid-cols-2")}>
          <div className="flex items-start gap-2.5">
            <PenLine className="mt-0.5 size-4 shrink-0 [color:var(--calculator-text)]" aria-hidden="true" />
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Written by</p>
              <PersonName person={author} />
            </div>
          </div>

          {reviewer && (
            <div className="flex items-start gap-2.5">
              <BadgeCheck className="mt-0.5 size-4 shrink-0 [color:var(--calculator-text)]" aria-hidden="true" />
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Clinically reviewed by</p>
                <PersonName person={reviewer} />
              </div>
            </div>
          )}

          {lastReviewed && (
            <div className="flex items-start gap-2.5">
              <CalendarDays className="mt-0.5 size-4 shrink-0 [color:var(--calculator-text)]" aria-hidden="true" />
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Last reviewed</p>
                <time dateTime={lastReviewed.iso} className="font-semibold text-gray-900">
                  {lastReviewed.label}
                </time>
              </div>
            </div>
          )}
        </div>

        {note && <div className="mt-4 border-t pt-4 text-xs leading-5 text-gray-600 [border-color:var(--calculator-border)]">{note}</div>}

        <nav aria-label="Editorial and safety links" className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t pt-4 text-xs font-semibold [border-color:var(--calculator-border)]">
          <Link href="/editorial-policy" className="inline-flex items-center gap-1.5 [color:var(--calculator-text)] hover:underline hover:underline-offset-4">
            <BadgeCheck className="size-3.5" aria-hidden="true" /> Editorial policy
          </Link>
          <Link href="/disclaimer" className="inline-flex items-center gap-1.5 [color:var(--calculator-text)] hover:underline hover:underline-offset-4">
            <FileWarning className="size-3.5" aria-hidden="true" /> Medical disclaimer
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-1.5 [color:var(--calculator-text)] hover:underline hover:underline-offset-4">
            <MessageSquareText className="size-3.5" aria-hidden="true" /> Report an issue
          </Link>
        </nav>
      </div>
    </aside>
  )
}
