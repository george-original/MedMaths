import { Pill, ShieldAlert, TriangleAlert } from "lucide-react"
import { CalculatorNotice } from "./calculator-notice"
import { getTabletVisualModel, type TabletFraction } from "@/lib/tablet-safety"

export type TabletDoseGuideProps = {
  tablets: number
  className?: string
}

import { formatSafeNumber } from "@/lib/safe-number-format"

function formatNumber(value: number, decimals = 3) {
  return formatSafeNumber(value, decimals, { maxDecimals: 12 })
}

function fractionPath(fraction: TabletFraction) {
  switch (fraction) {
    case 0.25:
      return "M32 32 L32 4 A28 28 0 0 1 60 32 Z"
    case 0.5:
      return "M32 32 L32 4 A28 28 0 0 1 32 60 Z"
    case 0.75:
      return "M32 32 L32 4 A28 28 0 1 1 4 32 Z"
    default:
      return ""
  }
}

function TabletIcon({ fraction = 0, label }: { fraction?: TabletFraction; label: string }) {
  const isWhole = fraction === 0

  return (
    <div className="flex flex-col items-center gap-1.5">
      <svg viewBox="0 0 64 64" className="h-14 w-14" role="img" aria-label={label}>
        <circle cx="32" cy="32" r="28" fill="#fff7ed" stroke="#ea580c" strokeWidth="3" />
        {isWhole ? (
          <>
            <line x1="32" y1="7" x2="32" y2="57" stroke="#fdba74" strokeWidth="2" strokeDasharray="4 3" />
            <circle cx="32" cy="32" r="22" fill="#ffedd5" opacity="0.65" />
          </>
        ) : (
          <>
            <path d={fractionPath(fraction)} fill="#fdba74" />
            <line x1="32" y1="4" x2="32" y2="60" stroke="#c2410c" strokeWidth="1.5" opacity="0.65" />
            {(fraction === 0.25 || fraction === 0.75) && (
              <line x1="4" y1="32" x2="60" y2="32" stroke="#c2410c" strokeWidth="1.5" opacity="0.65" />
            )}
          </>
        )}
      </svg>
      <span className="text-[11px] font-medium text-gray-600">{label}</span>
    </div>
  )
}

export function TabletDoseGuide({ tablets, className }: TabletDoseGuideProps) {
  const model = getTabletVisualModel(tablets)
  const visibleWholeCount = Math.min(model.wholeTablets, 8)
  const hiddenWholeCount = Math.max(0, model.wholeTablets - visibleWholeCount)

  return (
    <div className={className}>
      <div className="rounded-2xl border border-orange-200 bg-white p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-700">
            <Pill className="size-5" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-950">Tablet amount visual</h3>
            <p className="mt-0.5 text-sm leading-6 text-gray-600">
              This shows the exact arithmetic as whole tablets and standard tablet fractions. It does not confirm that a specific product can be split.
            </p>
          </div>
        </div>

        {model.kind === "whole-or-standard-fraction" ? (
          <div className="mt-4">
            <div className="flex flex-wrap items-end gap-3 rounded-xl border border-orange-100 bg-orange-50/60 p-4">
              {Array.from({ length: visibleWholeCount }, (_, index) => (
                <TabletIcon key={`whole-${index}`} label="1 whole tablet" />
              ))}

              {hiddenWholeCount > 0 && (
                <div className="flex h-14 min-w-20 items-center justify-center rounded-xl border border-dashed border-orange-300 bg-white px-3 text-sm font-semibold text-orange-800">
                  + {hiddenWholeCount} more
                </div>
              )}

              {model.fraction !== null && model.fraction > 0 && (
                <TabletIcon
                  fraction={model.fraction}
                  label={
                    model.fraction === 0.25
                      ? "¼ tablet"
                      : model.fraction === 0.5
                        ? "½ tablet"
                        : "¾ tablet"
                  }
                />
              )}
            </div>
            <p className="mt-3 text-sm font-semibold text-orange-950">{model.displayText}</p>
          </div>
        ) : (
          <CalculatorNotice variant="warning" title="Awkward tablet amount" className="mt-4">
            The exact result is {formatNumber(tablets)} tablets. This cannot usually be represented accurately using standard whole, half, or quarter tablet divisions. Do not round without checking the order, available strength, product information, and local policy.
          </CalculatorNotice>
        )}

        {model.splittingMessage && (
          <CalculatorNotice variant="warning" title="Tablet splitting check" className="mt-4">
            {model.splittingMessage}
          </CalculatorNotice>
        )}

        {model.burdenLevel === "large" && model.burdenMessage && (
          <CalculatorNotice variant="warning" title="Large tablet count" icon={<TriangleAlert className="size-4" />} className="mt-4">
            {model.burdenMessage}
          </CalculatorNotice>
        )}

        {model.burdenLevel === "very-large" && model.burdenMessage && (
          <CalculatorNotice variant="danger" title="Very large tablet count" icon={<ShieldAlert className="size-4" />} className="mt-4">
            {model.burdenMessage}
          </CalculatorNotice>
        )}

        <p className="mt-4 text-xs leading-5 text-gray-500">
          Visual guide only. A different tablet strength, liquid medicine, or another formulation may be available, but any change must be confirmed by the prescriber or pharmacist. Never substitute or alter a medicine based on this visual alone.
        </p>
      </div>
    </div>
  )
}
