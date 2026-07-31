"use client"

import { useEffect, useRef, useState, type KeyboardEvent } from "react"
import { Pill } from "lucide-react"
import {
  CalculatorActions,
  CalculatorCopyButton,
  CalculatorField,
  CalculatorInput,
  CalculatorNotice,
  CalculatorResult,
  CalculatorSegmentedControl,
  CalculatorShell,
  CalculatorWorking,
  TabletDoseGuide,
} from "@/components/calculator"
import { useResultReveal } from "@/hooks/use-result-reveal"
import { formatSafeNumber } from "@/lib/safe-number-format"
import { getTabletVisualModel } from "@/lib/tablet-safety"
import {
  calculateFixedTabletDose,
  calculateWeightBasedTabletDose,
  type FixedTabletDoseResult,
  type WeightBasedTabletDoseResult,
} from "@/lib/tablet-dose-formulas"

type Mode = "fixed" | "weightBased"
type Result =
  | ({ mode: "fixed" } & FixedTabletDoseResult)
  | ({ mode: "weightBased" } & WeightBasedTabletDoseResult)

type Errors = {
  dose?: string
  weight?: string
  dosePerKg?: string
  strength?: string
  copy?: string
}

function parseNumber(value: string): number | null {
  const cleaned = value.replace(/,/g, "").trim()
  if (!cleaned) return null
  if (!/^(?:\d+\.?\d*|\.\d+)$/.test(cleaned)) return null

  const parsed = Number(cleaned)
  return Number.isFinite(parsed) ? parsed : null
}

function formatNumber(value: number, decimalPlaces = 3): string {
  return formatSafeNumber(value, decimalPlaces, { maxDecimals: 12 })
}

function modeFromHash(): Mode | null {
  if (typeof window === "undefined") return null
  if (window.location.hash === "#weight-based") return "weightBased"
  if (window.location.hash === "#fixed-dose") return "fixed"
  return null
}

export default function TabletDoseClient() {
  const [mode, setMode] = useState<Mode>("fixed")
  const [doseMg, setDoseMg] = useState("")
  const [weightKg, setWeightKg] = useState("")
  const [dosePerKg, setDosePerKg] = useState("")
  const [strengthMg, setStrengthMg] = useState("")
  const [result, setResult] = useState<Result | null>(null)
  const [errors, setErrors] = useState<Errors>({})

  const doseRef = useRef<HTMLInputElement>(null)
  const weightRef = useRef<HTMLInputElement>(null)
  const dosePerKgRef = useRef<HTMLInputElement>(null)
  const strengthRef = useRef<HTMLInputElement>(null)
  const resultRef = useResultReveal<HTMLDivElement>(result !== null)

  useEffect(() => {
    const applyHashMode = () => {
      const hashMode = modeFromHash()
      if (hashMode) setMode(hashMode)
    }

    applyHashMode()
    window.addEventListener("hashchange", applyHashMode)
    return () => window.removeEventListener("hashchange", applyHashMode)
  }, [])

  function clearResult() {
    setResult(null)
    setErrors((current) => ({ ...current, copy: undefined }))
  }

  function changeMode(nextMode: Mode) {
    if (nextMode === mode) return
    setMode(nextMode)
    setResult(null)
    setErrors({})
    const hash = nextMode === "fixed" ? "#fixed-dose" : "#weight-based"
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}${hash}`)
    window.requestAnimationFrame(() => {
      if (nextMode === "fixed") doseRef.current?.focus()
      else weightRef.current?.focus()
    })
  }

  function calculate() {
    setErrors({})

    const strength = parseNumber(strengthMg)

    if (mode === "fixed") {
      const dose = parseNumber(doseMg)
      if (dose === null || dose <= 0) {
        setErrors({ dose: "Enter a positive prescribed dose using numbers only, such as 500." })
        doseRef.current?.focus()
        return
      }
      if (strength === null || strength <= 0) {
        setErrors({ strength: "Enter the positive strength in one tablet, such as 250." })
        strengthRef.current?.focus()
        return
      }

      setResult({ mode: "fixed", ...calculateFixedTabletDose(dose, strength) })
      return
    }

    const weight = parseNumber(weightKg)
    if (weight === null || weight <= 0) {
      setErrors({ weight: "Enter a positive weight in kilograms using numbers only, such as 25." })
      weightRef.current?.focus()
      return
    }

    const dose = parseNumber(dosePerKg)
    if (dose === null || dose <= 0) {
      setErrors({ dosePerKg: "Enter a positive per-dose amount in mg/kg using numbers only, such as 15." })
      dosePerKgRef.current?.focus()
      return
    }

    if (strength === null || strength <= 0) {
      setErrors({ strength: "Enter the positive strength in one tablet, such as 250." })
      strengthRef.current?.focus()
      return
    }

    setResult({ mode: "weightBased", ...calculateWeightBasedTabletDose(weight, dose, strength) })
  }

  function reset() {
    setDoseMg("")
    setWeightKg("")
    setDosePerKg("")
    setStrengthMg("")
    setResult(null)
    setErrors({})
    window.requestAnimationFrame(() => {
      if (mode === "fixed") doseRef.current?.focus()
      else weightRef.current?.focus()
    })
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") calculate()
  }

  const visualModel = result ? getTabletVisualModel(result.tablets) : null
  const resultStatus =
    visualModel?.burdenLevel === "very-large"
      ? "danger"
      : visualModel?.kind === "awkward" || visualModel?.burdenLevel === "large" || Boolean(visualModel?.splittingMessage)
        ? "warning"
        : "default"

  return (
    <CalculatorShell
      id="tablet-dose-tool"
      theme="tablet"
      eyebrow="Tablet dosing"
      title={mode === "fixed" ? "Calculate tablets from a dose in mg" : "Calculate tablets from a dose in mg/kg"}
      description={
        mode === "fixed"
          ? "Enter the prescribed dose and the strength contained in one tablet."
          : "Enter the patient weight, the prescribed mg/kg amount per dose, and the strength contained in one tablet."
      }
      icon={<Pill className="size-5" />}
    >
      <span id="fixed-dose" className="scroll-mt-24" aria-hidden="true" />
      <span id="weight-based" className="scroll-mt-24" aria-hidden="true" />

      <div className="flex justify-center">
        <CalculatorSegmentedControl
          value={mode}
          options={[
            { value: "fixed", label: "Dose already in mg" },
            { value: "weightBased", label: "Dose based on mg/kg" },
          ]}
          onChange={changeMode}
          ariaLabel="Choose tablet calculation type"
          className="w-full sm:w-auto"
        />
      </div>

      {mode === "fixed" ? (
        <CalculatorNotice variant="warning" title="Use the strength in one tablet">
          Enter the amount printed for a single tablet, not the total medicine in the pack or bottle. Check that the order and product strength use the same unit.
        </CalculatorNotice>
      ) : (
        <CalculatorNotice variant="warning" title="Enter an mg/kg amount per dose">
          Use weight in kilograms and enter the ordered amount in mg/kg per dose. If the order is written as mg/kg/day, calculate the prescribed per-dose amount first. This calculator does not check maximum single-dose or daily-dose limits.
        </CalculatorNotice>
      )}

      {mode === "fixed" ? (
        <div className="grid gap-5 sm:grid-cols-2">
          <CalculatorField
            id="tablet-dose-mg"
            label="Dose ordered"
            unit="mg"
            helperText="The prescribed dose or study-question dose."
            error={errors.dose}
            required
          >
            <CalculatorInput
              ref={doseRef}
              type="text"
              inputMode="decimal"
              value={doseMg}
              onChange={(event) => {
                setDoseMg(event.target.value)
                setErrors((current) => ({ ...current, dose: undefined }))
                clearResult()
              }}
              onKeyDown={handleKeyDown}
              placeholder="e.g., 500"
              autoComplete="off"
            />
          </CalculatorField>

          <CalculatorField
            id="tablet-strength-mg"
            label="Tablet strength"
            unit="mg/tablet"
            helperText="The strength printed for one tablet."
            error={errors.strength}
            required
          >
            <CalculatorInput
              ref={strengthRef}
              type="text"
              inputMode="decimal"
              value={strengthMg}
              onChange={(event) => {
                setStrengthMg(event.target.value)
                setErrors((current) => ({ ...current, strength: undefined }))
                clearResult()
              }}
              onKeyDown={handleKeyDown}
              placeholder="e.g., 250"
              autoComplete="off"
            />
          </CalculatorField>
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-3">
          <CalculatorField
            id="tablet-weight-kg"
            label="Patient weight"
            unit="kg"
            helperText="Convert pounds to kilograms before using this mode."
            error={errors.weight}
            required
          >
            <CalculatorInput
              ref={weightRef}
              type="text"
              inputMode="decimal"
              value={weightKg}
              onChange={(event) => {
                setWeightKg(event.target.value)
                setErrors((current) => ({ ...current, weight: undefined }))
                clearResult()
              }}
              onKeyDown={handleKeyDown}
              placeholder="e.g., 25"
              autoComplete="off"
            />
          </CalculatorField>

          <CalculatorField
            id="tablet-dose-mgkg"
            label="Dose ordered"
            unit="mg/kg per dose"
            helperText="Use the prescribed per-dose amount, not an undivided daily total."
            error={errors.dosePerKg}
            required
          >
            <CalculatorInput
              ref={dosePerKgRef}
              type="text"
              inputMode="decimal"
              value={dosePerKg}
              onChange={(event) => {
                setDosePerKg(event.target.value)
                setErrors((current) => ({ ...current, dosePerKg: undefined }))
                clearResult()
              }}
              onKeyDown={handleKeyDown}
              placeholder="e.g., 15"
              autoComplete="off"
            />
          </CalculatorField>

          <CalculatorField
            id="tablet-strength-weight-based"
            label="Tablet strength"
            unit="mg/tablet"
            helperText="Enter the strength contained in one tablet."
            error={errors.strength}
            required
          >
            <CalculatorInput
              ref={strengthRef}
              type="text"
              inputMode="decimal"
              value={strengthMg}
              onChange={(event) => {
                setStrengthMg(event.target.value)
                setErrors((current) => ({ ...current, strength: undefined }))
                clearResult()
              }}
              onKeyDown={handleKeyDown}
              placeholder="e.g., 250"
              autoComplete="off"
            />
          </CalculatorField>
        </div>
      )}

      <CalculatorActions onCalculate={calculate} onReset={reset} />

      {result && visualModel && (
        <div className="space-y-4">
          <CalculatorResult
            ref={resultRef}
            label="Tablets required"
            value={formatNumber(result.tablets)}
            unit={result.tablets === 1 ? "tablet" : "tablets"}
            status={resultStatus}
            badge={
              <span className="rounded-full border border-current/20 bg-white/70 px-2 py-0.5 text-xs font-semibold">
                {result.mode === "fixed" ? "Fixed-dose calculation" : "Weight-based calculation"}
              </span>
            }
            interpretation={
              visualModel.kind === "awkward"
                ? "This is not a standard whole, half, or quarter-tablet amount. Do not round automatically."
                : visualModel.displayText
            }
            actions={
              <CalculatorCopyButton
                value={
                  result.mode === "fixed"
                    ? `${formatNumber(result.tablets)} ${result.tablets === 1 ? "tablet" : "tablets"}`
                    : `${formatNumber(result.totalDoseMg)} mg total dose; ${formatNumber(result.tablets)} ${result.tablets === 1 ? "tablet" : "tablets"}`
                }
                onError={() => setErrors((current) => ({ ...current, copy: "Copy failed. Select and copy the result manually." }))}
              />
            }
          >
            {result.mode === "weightBased" && (
              <div className="mb-4 rounded-xl border border-current/15 bg-white/65 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide opacity-70">Calculated total dose</p>
                <p className="mt-1 text-xl font-bold">{formatNumber(result.totalDoseMg)} mg</p>
              </div>
            )}

            <CalculatorWorking
              lines={
                result.mode === "fixed"
                  ? [
                      "Tablets = dose ordered ÷ tablet strength",
                      `Tablets = ${formatNumber(result.doseMg)} mg ÷ ${formatNumber(result.strengthMg)} mg/tablet`,
                      `Tablets = ${formatNumber(result.tablets)}`,
                    ]
                  : [
                      "Total dose (mg) = weight (kg) × dose (mg/kg)",
                      `Total dose = ${formatNumber(result.weightKg)} kg × ${formatNumber(result.dosePerKg)} mg/kg = ${formatNumber(result.totalDoseMg)} mg`,
                      "Tablets = total dose (mg) ÷ tablet strength (mg/tablet)",
                      `Tablets = ${formatNumber(result.totalDoseMg)} mg ÷ ${formatNumber(result.strengthMg)} mg/tablet = ${formatNumber(result.tablets)}`,
                    ]
              }
            />
            {errors.copy && <p className="mt-3 text-xs font-medium text-red-700">{errors.copy}</p>}
          </CalculatorResult>

          <TabletDoseGuide tablets={result.tablets} />
        </div>
      )}

      <p className="text-center text-xs italic text-gray-500">
        Educational medication-maths support only. Confirm the order, patient weight when used, dose frequency, maximum-dose limits, product, formulation, splitting suitability, and local policy before administration.
      </p>
    </CalculatorShell>
  )
}
