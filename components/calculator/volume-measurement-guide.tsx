"use client"

import { useMemo, useState } from "react"
import { HelpCircle, Route, ShieldAlert, Syringe, ZoomIn, ZoomOut } from "lucide-react"
import { CalculatorNotice } from "./calculator-notice"
import { CalculatorSection } from "./calculator-section"
import { CalculatorSegmentedControl } from "./calculator-segmented-control"
import {
  getMeasurementSafetyGuidance,
  type AdministrationContext,
  type MeasurementSafetyGuidance,
} from "@/lib/measurement-safety"
import { cn } from "@/lib/utils"

const contextOptions: Array<{ value: AdministrationContext; label: string }> = [
  { value: "unknown", label: "Not sure" },
  { value: "oral-enteral", label: "Oral / enteral" },
  { value: "subcutaneous", label: "Subcutaneous" },
  { value: "intramuscular", label: "Intramuscular" },
  { value: "intravenous", label: "IV preparation" },
]

const capacities = [1, 3, 5, 10, 20, 50] as const

import { formatSafeNumber } from "@/lib/safe-number-format"

function formatNumber(value: number, decimals = 3) {
  return formatSafeNumber(value, decimals, { maxDecimals: 12 })
}

function selectIllustrativeCapacity(volumeMl: number) {
  return capacities.find((capacity) => volumeMl <= capacity) ?? null
}

function illustrativeGraduation(capacityMl: number) {
  if (capacityMl <= 1) return 0.01
  if (capacityMl <= 3) return 0.1
  if (capacityMl <= 5) return 0.2
  if (capacityMl <= 10) return 0.5
  return 1
}

function markingMessage(volumeMl: number, capacityMl: number) {
  const graduation = illustrativeGraduation(capacityMl)
  const nearest = Math.round(volumeMl / graduation) * graduation
  const aligns = Math.abs(volumeMl - nearest) < 1e-8

  if (aligns) {
    return `The target aligns with the illustrative ${formatNumber(graduation, 2)} mL spacing shown. Check the actual device because printed graduations vary by product.`
  }

  return `The exact result falls between the illustrative ${formatNumber(graduation, 2)} mL marks. Do not round to a nearby mark unless the product information, local policy, or an authorised clinician supports that rounding.`
}

function contextDeviceText(context: AdministrationContext, capacityMl: number) {
  if (context === "oral-enteral") {
    return {
      title: `Illustrative ${capacityMl} mL oral / enteral syringe`,
      note: "Use an oral or enteral measuring device intended for that route. Oral and enteral syringes must not be used for injection.",
      kind: "oral" as const,
    }
  }

  if (context === "subcutaneous") {
    return {
      title: `Illustrative ${capacityMl} mL injectable syringe`,
      note: "Use an injectable syringe appropriate to the prescribed subcutaneous route. This calculator does not confirm that the volume is suitable for the route. Needle gauge, needle length, site, and technique are not selected.",
      kind: "injectable" as const,
    }
  }

  if (context === "intramuscular") {
    return {
      title: `Illustrative ${capacityMl} mL injectable syringe`,
      note: "Use an injectable syringe appropriate to the prescribed intramuscular route. This calculator does not confirm that the volume is suitable for the route. Needle gauge, needle length, site, and technique are not selected.",
      kind: "injectable" as const,
    }
  }

  return {
    title: `Illustrative ${capacityMl} mL IV preparation syringe`,
    note: "This visual represents the medication volume withdrawn or prepared. It does not represent the final IV bag volume, compatibility, route suitability, or administration rate.",
    kind: "iv" as const,
  }
}

function noticeVariant(level: MeasurementSafetyGuidance["level"]): "theme" | "warning" | "danger" {
  if (level === "high-caution") return "danger"
  if (level === "caution") return "warning"
  return "theme"
}

export type VolumeMeasurementGuideProps = {
  volumeMl: number
  className?: string
  defaultOpen?: boolean
  defaultContext?: AdministrationContext
  lockContext?: boolean
}

export function VolumeMeasurementGuide({
  volumeMl,
  className,
  defaultOpen = false,
  defaultContext = "unknown",
  lockContext = false,
}: VolumeMeasurementGuideProps) {
  const [context, setContext] = useState<AdministrationContext>(defaultContext)
  const [zoomIndex, setZoomIndex] = useState(0)
  const zoomLevels = [1, 1.3, 1.6]

  const guidance = useMemo(
    () => getMeasurementSafetyGuidance(volumeMl, context),
    [context, volumeMl],
  )

  const capacity = useMemo(() => selectIllustrativeCapacity(volumeMl), [volumeMl])
  const canShowDevice =
    context !== "unknown" &&
    guidance.level !== "high-caution" &&
    capacity !== null &&
    volumeMl <= capacity

  const device = canShowDevice && capacity ? contextDeviceText(context, capacity) : null

  return (
    <CalculatorSection
      title="Show me how to measure this volume"
      summary={
        lockContext
          ? "Review a context-specific visual guide and device-marking check."
          : "Choose the prescribed route to see a route-specific visual guide and device-marking check."
      }
      icon={<Syringe className="size-5" />}
      defaultOpen={defaultOpen}
      className={className}
    >
      <div className="space-y-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-900">
            <Route className="size-4 [color:var(--calculator-text)]" aria-hidden="true" />
            {lockContext ? "Preparation context" : "What is the prescribed route or preparation context?"}
          </div>
          {lockContext ? (
            <div className="rounded-xl border [border-color:var(--calculator-border)] [background-color:var(--calculator-softer)] px-4 py-3 text-sm font-semibold text-gray-900">
              {contextOptions.find((option) => option.value === context)?.label ?? "Not sure"}
            </div>
          ) : (
            <CalculatorSegmentedControl
              value={context}
              options={contextOptions}
              onChange={(next) => {
                setContext(next)
                setZoomIndex(0)
              }}
              ariaLabel="Administration route or preparation context"
              className="flex w-full flex-wrap [&>button]:min-w-[8rem]"
            />
          )}
        </div>

        <CalculatorNotice
          variant={noticeVariant(guidance.level)}
          title={guidance.title}
          icon={guidance.level === "high-caution" ? <ShieldAlert className="size-4" /> : undefined}
        >
          {guidance.message}
        </CalculatorNotice>

        {volumeMl > 50 && (
          <CalculatorNotice variant="warning" title="Large calculated volume">
            This result is larger than the illustrative syringe scales used in this guide. Recheck the dose and concentration, then confirm the intended formulation, route, and preparation method. The guide will not suggest a single device for this volume.
          </CalculatorNotice>
        )}

        {context === "unknown" && guidance.level !== "high-caution" && (
          <div className="flex items-start gap-2 rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-600">
            <HelpCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            Select the route before a device category is shown. Volume alone cannot determine whether an oral, enteral, injectable, or IV preparation device is appropriate.
          </div>
        )}

        {device && capacity && (
          <div className="overflow-hidden rounded-2xl border [border-color:var(--calculator-border)] bg-white">
            <div className="flex flex-col gap-3 border-b px-4 py-3 [border-color:var(--calculator-border)] [background-color:var(--calculator-softer)] sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-950">{device.title}</p>
                <p className="mt-0.5 text-xs leading-5 text-gray-600">{device.note}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => setZoomIndex((index) => Math.max(0, index - 1))}
                  disabled={zoomIndex === 0}
                  className="inline-flex h-9 items-center gap-1 rounded-lg border border-gray-200 bg-white px-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Zoom out visual guide"
                >
                  <ZoomOut className="size-4" />
                  Zoom out
                </button>
                <button
                  type="button"
                  onClick={() => setZoomIndex((index) => Math.min(zoomLevels.length - 1, index + 1))}
                  disabled={zoomIndex === zoomLevels.length - 1}
                  className="inline-flex h-9 items-center gap-1 rounded-lg border border-gray-200 bg-white px-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Zoom in visual guide"
                >
                  <ZoomIn className="size-4" />
                  Zoom in
                </button>
              </div>
            </div>

            <div className="overflow-hidden p-3 sm:p-4">
              <div
                className="origin-center transition-transform duration-200"
                style={{ transform: `scale(${zoomLevels[zoomIndex]})` }}
              >
                <RouteAwareSyringeSvg
                  capacityMl={capacity}
                  volumeMl={volumeMl}
                  kind={device.kind}
                />
              </div>
            </div>

            <div className="space-y-2 border-t px-4 py-3 text-sm [border-color:var(--calculator-border)]">
              <p className="font-semibold text-gray-950">
                Target volume: {formatNumber(volumeMl)} mL
              </p>
              <p className="text-gray-600">{markingMessage(volumeMl, capacity)}</p>
              <p className="text-xs leading-5 text-gray-500">
                Visual scale only. Check the actual device label, capacity, graduation marks, route, product information, and local policy before measuring or administering a medicine.
              </p>
            </div>
          </div>
        )}
      </div>
    </CalculatorSection>
  )
}

type RouteAwareSyringeSvgProps = {
  capacityMl: number
  volumeMl: number
  kind: "oral" | "injectable" | "iv"
}

function RouteAwareSyringeSvg({ capacityMl, volumeMl, kind }: RouteAwareSyringeSvgProps) {
  const width = 780
  const height = 175
  const barrelX = 100
  const barrelY = 48
  const barrelWidth = 590
  const barrelHeight = 48
  const fillRatio = Math.min(Math.max(volumeMl / capacityMl, 0), 1)
  const fillWidth = barrelWidth * fillRatio
  const graduation = illustrativeGraduation(capacityMl)
  const tickCount = Math.max(1, Math.round(capacityMl / graduation))
  const labelEvery = tickCount >= 100 ? 10 : tickCount > 20 ? 5 : tickCount > 10 ? 2 : 1

  const routeLabel =
    kind === "oral"
      ? "ORAL / ENTERAL — NOT FOR INJECTION"
      : kind === "iv"
        ? "IV PREPARATION — FINAL BAG VOLUME NOT SHOWN"
        : "INJECTABLE DEVICE — NEEDLE SELECTION NOT SHOWN"

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height="auto"
      role="img"
      aria-label={`${capacityMl} mL ${kind === "oral" ? "oral or enteral" : kind === "iv" ? "IV preparation" : "injectable"} syringe visual showing ${formatNumber(volumeMl)} mL`}
      
    >
      <text x={barrelX} y="22" fontSize="14" fontWeight="700" fill="#111827">
        Illustrative {capacityMl} mL scale
      </text>
      <text x={barrelX} y="40" fontSize="11" fontWeight="700" fill="var(--calculator-accent)">
        {routeLabel}
      </text>

      {kind === "oral" ? (
        <>
          <rect x="35" y={barrelY + 15} width="50" height="18" rx="9" fill="#e5e7eb" stroke="#9ca3af" />
          <rect x="75" y={barrelY + 20} width="25" height="8" rx="4" fill="#d1d5db" />
        </>
      ) : kind === "iv" ? (
        <>
          <rect x="45" y={barrelY + 13} width="38" height="22" rx="5" fill="#e5e7eb" stroke="#9ca3af" />
          <rect x="78" y={barrelY + 18} width="22" height="12" rx="3" fill="#d1d5db" />
        </>
      ) : (
        <>
          <rect x="12" y={barrelY + 22} width="68" height="3" rx="1.5" fill="#9ca3af" />
          <polygon
            points={`80,${barrelY + 23.5} 100,${barrelY + 17} 100,${barrelY + 30}`}
            fill="#6b7280"
          />
        </>
      )}

      <rect
        x={barrelX}
        y={barrelY}
        width={barrelWidth}
        height={barrelHeight}
        rx="10"
        fill="#ffffff"
        stroke="#d1d5db"
        strokeWidth="2"
      />
      <rect
        x={barrelX}
        y={barrelY}
        width={fillWidth}
        height={barrelHeight}
        rx="10"
        fill="var(--calculator-soft)"
      />
      <line
        x1={barrelX + fillWidth}
        y1={barrelY - 9}
        x2={barrelX + fillWidth}
        y2={barrelY + barrelHeight + 10}
        stroke="var(--calculator-accent)"
        strokeWidth="4"
      />
      <text
        x={Math.min(barrelX + fillWidth + 8, barrelX + barrelWidth - 75)}
        y={barrelY - 14}
        fontSize="13"
        fontWeight="700"
        fill="var(--calculator-strong-text)"
      >
        {formatNumber(volumeMl)} mL
      </text>

      <rect x={barrelX + barrelWidth} y={barrelY + 8} width="42" height={barrelHeight - 16} rx="7" fill="#e5e7eb" stroke="#d1d5db" />
      <rect x={barrelX + barrelWidth + 40} y={barrelY + 16} width="35" height={barrelHeight - 32} rx="5" fill="#d1d5db" />
      <rect x={barrelX + barrelWidth + 70} y={barrelY + 5} width="12" height={barrelHeight - 10} rx="6" fill="#9ca3af" />

      {Array.from({ length: tickCount + 1 }, (_, index) => {
        const value = Math.min(index * graduation, capacityMl)
        const x = barrelX + (value / capacityMl) * barrelWidth
        const major = index % labelEvery === 0 || index === tickCount
        return (
          <g key={`${value}-${index}`}>
            <line
              x1={x}
              y1={barrelY + barrelHeight + 2}
              x2={x}
              y2={barrelY + barrelHeight + (major ? 17 : 11)}
              stroke="#9ca3af"
              strokeWidth={major ? 2 : 1}
            />
            {major && (
              <text
                x={x}
                y={barrelY + barrelHeight + 36}
                fontSize="11"
                textAnchor="middle"
                fill="#374151"
              >
                {formatNumber(value, 2)}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}
