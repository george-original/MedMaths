"use client"

import { useRef, useState, type KeyboardEvent } from "react"
import { Gauge, Syringe } from "lucide-react"
import {
  CalculatorActions,
  CalculatorCopyButton,
  CalculatorEquation,
  CalculatorField,
  CalculatorInput,
  CalculatorNotice,
  CalculatorResult,
  CalculatorSegmentedControl,
  CalculatorSelect,
  CalculatorShell,
  CalculatorWorking,
  UnitsMeasurementGuide,
  type UnitProductContext,
} from "@/components/calculator"
import { useResultReveal } from "@/hooks/use-result-reveal"
import { formatSafeNumber } from "@/lib/safe-number-format"
import { formatFormulaNumber, unitsMlFormulaDefinitions } from "@/lib/dose-volume-formulas"
import { calculateUnitsVolume } from "@/lib/units-volume-formulas"

type Mode = "unitsToMl" | "mlToUnits"
type PresetKey = "custom" | "insulin_u100" | "insulin_u40" | "heparin_1000" | "heparin_5000"

type Errors = {
  primary?: string
  concentration?: string
  presetConfirmation?: string
  copy?: string
}

const PRESETS: Array<{ key: PresetKey; label: string; value: string }> = [
  { key: "custom", label: "Enter concentration from product label", value: "" },
  { key: "insulin_u100", label: "Example only: insulin U-100 (100 units/mL)", value: "100" },
  { key: "insulin_u40", label: "Example only: insulin U-40 (40 units/mL)", value: "40" },
  { key: "heparin_1000", label: "Example only: heparin 1,000 units/mL", value: "1000" },
  { key: "heparin_5000", label: "Example only: heparin 5,000 units/mL", value: "5000" },
]

function parseNumber(value: string): number | null {
  const cleaned = value.replace(/,/g, "").trim()
  if (!cleaned) return null
  if (!/^(?:\d+\.?\d*|\.\d+)$/.test(cleaned)) return null

  const parsed = Number(cleaned)
  return Number.isFinite(parsed) ? parsed : null
}

function formatResult(value: number, decimalPlaces: number): string {
  return formatSafeNumber(value, decimalPlaces, { maxDecimals: 12 })
}

function productContextForPreset(preset: PresetKey): UnitProductContext {
  if (preset === "insulin_u100") return "insulin-u100"
  if (preset === "insulin_u40") return "insulin-u40"
  if (preset === "heparin_1000" || preset === "heparin_5000") return "heparin"
  return "custom"
}

export default function UnitsToMlClient() {
  const [mode, setMode] = useState<Mode>("unitsToMl")
  const [preset, setPreset] = useState<PresetKey>("custom")
  const [doseUnits, setDoseUnits] = useState("")
  const [volumeInputMl, setVolumeInputMl] = useState("")
  const [concentrationUnitsPerMl, setConcentrationUnitsPerMl] = useState("")
  const [result, setResult] = useState<number | null>(null)
  const [usedPrimary, setUsedPrimary] = useState<number | null>(null)
  const [usedConcentration, setUsedConcentration] = useState<number | null>(null)
  const [usedPreset, setUsedPreset] = useState<PresetKey>("custom")
  const [presetConfirmed, setPresetConfirmed] = useState(false)
  const [decimals, setDecimals] = useState(2)
  const [errors, setErrors] = useState<Errors>({})

  const primaryRef = useRef<HTMLInputElement>(null)
  const concentrationRef = useRef<HTMLInputElement>(null)
  const resultRef = useResultReveal<HTMLDivElement>(result !== null)

  const isUnitsToMl = mode === "unitsToMl"
  const primaryLabel = isUnitsToMl ? "Ordered dose" : "Measured volume"
  const primaryUnit = isUnitsToMl ? "units" : "mL"
  const primaryPlaceholder = isUnitsToMl ? "e.g., 25" : "e.g., 0.25"
  const primaryValue = isUnitsToMl ? doseUnits : volumeInputMl
  const resultLabel = isUnitsToMl ? "Volume required" : "Dose amount"
  const resultUnit = isUnitsToMl ? "mL" : "units"

  function clearResult() {
    setResult(null)
    setUsedPrimary(null)
    setUsedConcentration(null)
    setUsedPreset("custom")
    setErrors((current) => ({ ...current, copy: undefined }))
  }

  function updatePrimary(value: string) {
    if (isUnitsToMl) setDoseUnits(value)
    else setVolumeInputMl(value)
    setErrors((current) => ({ ...current, primary: undefined }))
    clearResult()
  }

  function updateConcentration(value: string, nextPreset: PresetKey = "custom") {
    setPreset(nextPreset)
    setPresetConfirmed(false)
    setConcentrationUnitsPerMl(value)
    setErrors((current) => ({ ...current, concentration: undefined }))
    clearResult()
  }

  function changePreset(nextPreset: PresetKey) {
    const selected = PRESETS.find((item) => item.key === nextPreset)
    updateConcentration(selected?.value ?? "", nextPreset)
  }

  function calculate() {
    setErrors({})

    const primary = parseNumber(primaryValue)
    if (primary === null || primary <= 0) {
      setErrors({
        primary: `Enter a positive ${isUnitsToMl ? "dose in units" : "volume in mL"} using numbers only.`,
      })
      primaryRef.current?.focus()
      return
    }

    const concentration = parseNumber(concentrationUnitsPerMl)
    if (concentration === null || concentration <= 0) {
      setErrors({
        concentration: "Enter a positive concentration in units/mL using numbers only.",
      })
      concentrationRef.current?.focus()
      return
    }

    if (preset !== "custom" && !presetConfirmed) {
      setErrors({
        presetConfirmation: "Confirm that this exact concentration appears on the product label before calculating.",
      })
      return
    }

    const nextResult = calculateUnitsVolume(primary, concentration, mode)
    setUsedPrimary(primary)
    setUsedConcentration(concentration)
    setUsedPreset(preset)
    setResult(nextResult)
  }

  function reset() {
    setMode("unitsToMl")
    setPreset("custom")
    setDoseUnits("")
    setVolumeInputMl("")
    setConcentrationUnitsPerMl("")
    setResult(null)
    setUsedPrimary(null)
    setUsedConcentration(null)
    setUsedPreset("custom")
    setPresetConfirmed(false)
    setDecimals(2)
    setErrors({})
    window.requestAnimationFrame(() => primaryRef.current?.focus())
  }

  function changeMode(nextMode: Mode) {
    if (nextMode === mode) return
    setMode(nextMode)
    clearResult()
    setErrors({})
    window.requestAnimationFrame(() => primaryRef.current?.focus())
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") calculate()
  }

  const formattedResult = result === null ? "" : formatResult(result, decimals)
  const usedProductContext = productContextForPreset(usedPreset)
  const isInsulinResult = usedProductContext === "insulin-u100" || usedProductContext === "insulin-u40"
  const verySmallVolume = isUnitsToMl && result !== null && result < 0.05
  const largeInsulinVolume = isUnitsToMl && isInsulinResult && result !== null && result > 1
  const unusuallyLargeUnits = !isUnitsToMl && result !== null && result > 10000
  const resultStatus = verySmallVolume || largeInsulinVolume || unusuallyLargeUnits ? "warning" : "default"
  const exactResult = result === null ? "" : formatFormulaNumber(result, 8)
  const selectedFormula = unitsMlFormulaDefinitions[mode]

  return (
    <CalculatorShell
      id="units-to-ml-tool"
      theme="dose"
      eyebrow="Dose calculations"
      title="Calculate units and mL"
      description="Enter the ordered units or measured mL, then use the exact concentration shown on the product label in units/mL."
      icon={<Gauge className="size-5" />}
      headerAction={
        <CalculatorSegmentedControl
          value={mode}
          options={[
            { value: "unitsToMl", label: "units → mL" },
            { value: "mlToUnits", label: "mL → units" },
          ]}
          onChange={changeMode}
          ariaLabel="Calculation direction"
        />
      }
    >
      <CalculatorNotice variant="danger" title="Units-based medicines can be high risk">
        Confirm the medicine, exact product concentration, prescribed units, route, and product-specific delivery device. Units/mL is not interchangeable with mg/mL. This calculator performs arithmetic only and does not select a syringe, pen, pump, preparation, or dose.
      </CalculatorNotice>

      <CalculatorField
        id="units-preset"
        label="Concentration entry"
        helperText="Enter the exact concentration from the product label. Example options only reduce typing; they do not identify or verify the product."
      >
        <CalculatorSelect
          value={preset}
          onChange={(event) => changePreset(event.target.value as PresetKey)}
        >
          {PRESETS.map((item) => (
            <option key={item.key} value={item.key}>
              {item.label}
            </option>
          ))}
        </CalculatorSelect>
      </CalculatorField>

      {preset !== "custom" && (
        <CalculatorNotice variant="warning" title="Example concentration selected">
          <div className="space-y-2">
            <p>Do not use the example as a product recommendation. Compare it with the exact medicine label, concentration, route, and delivery device.</p>
            <label className="flex cursor-pointer items-start gap-2 font-medium">
              <input
                type="checkbox"
                checked={presetConfirmed}
                onChange={(event) => {
                  setPresetConfirmed(event.target.checked)
                  setErrors((current) => ({ ...current, presetConfirmation: undefined }))
                  clearResult()
                }}
                className="mt-1 size-4 rounded border-gray-300"
              />
              <span>I confirmed this exact concentration on the product label.</span>
            </label>
            {errors.presetConfirmation && (
              <p role="alert" className="text-xs font-semibold text-red-700">
                {errors.presetConfirmation}
              </p>
            )}
          </div>
        </CalculatorNotice>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <CalculatorField
          id="units-primary"
          label={primaryLabel}
          unit={primaryUnit}
          helperText={
            isUnitsToMl
              ? "Enter the prescribed amount in units. Commas are accepted, such as 10,000."
              : "Enter the measured volume in mL, such as 0.25."
          }
          error={errors.primary}
          required
        >
          <CalculatorInput
            ref={primaryRef}
            type="text"
            value={primaryValue}
            onChange={(event) => updatePrimary(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={primaryPlaceholder}
            autoComplete="off"
          />
        </CalculatorField>

        <CalculatorField
          id="units-concentration"
          label="Concentration"
          unit="units/mL"
          helperText="Use the concentration printed on the exact product label."
          error={errors.concentration}
          required
        >
          <CalculatorInput
            ref={concentrationRef}
            type="text"
            value={concentrationUnitsPerMl}
            onChange={(event) => updateConcentration(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g., 100"
            autoComplete="off"
          />
        </CalculatorField>
      </div>

      <CalculatorActions
        onCalculate={calculate}
        onReset={reset}
        calculateIcon={<Syringe className="size-4" />}
      />

      {result !== null && usedPrimary !== null && usedConcentration !== null && (
        <div className="space-y-4">
          <CalculatorResult
            ref={resultRef}
            label={resultLabel}
            value={formattedResult}
            unit={resultUnit}
            status={resultStatus}
            interpretation={
              isUnitsToMl
                ? `${formatResult(usedPrimary, 4)} units at ${formatResult(usedConcentration, 4)} units/mL equals ${formattedResult} mL.`
                : `${formatResult(usedPrimary, 4)} mL at ${formatResult(usedConcentration, 4)} units/mL contains ${formattedResult} units.`
            }
            actions={
              <CalculatorCopyButton
                value={`${formattedResult} ${resultUnit}`}
                onError={() =>
                  setErrors((current) => ({
                    ...current,
                    copy: "Copy failed. Select the result manually or check browser clipboard permissions.",
                  }))
                }
              />
            }
          >
            <div className="grid gap-2 rounded-xl bg-gray-50 p-3 text-sm text-gray-700 sm:grid-cols-2">
              <p><span className="font-semibold text-gray-950">Exact calculated result:</span> {exactResult} {resultUnit}</p>
              <p><span className="font-semibold text-gray-950">Displayed result:</span> {formattedResult} {resultUnit}</p>
            </div>
            {verySmallVolume && (
              <CalculatorNotice variant="danger" title="Very small calculated volume">
                Recheck the prescribed units, concentration, decimal position, and product. This volume may not be accurately measurable with a standard device. Do not convert it to insulin-syringe markings unless the medicine and device are specifically matched for that use.
              </CalculatorNotice>
            )}
            {largeInsulinVolume && (
              <CalculatorNotice variant="danger" title="Large insulin volume">
                This insulin result is greater than 1 mL. Recheck the prescribed units, insulin concentration, product, and delivery device before proceeding. The calculator will not suggest multiple syringes or split administration.
              </CalculatorNotice>
            )}
            {unusuallyLargeUnits && (
              <CalculatorNotice variant="warning" title="Large unit amount">
                Recheck the measured volume, concentration, medicine, and unit scale. This result may be correct for some products, but it deserves an independent check.
              </CalculatorNotice>
            )}
            {errors.copy && (
              <p role="alert" className="text-xs font-medium text-red-700">
                {errors.copy}
              </p>
            )}
          </CalculatorResult>

          <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_180px]">
            <CalculatorWorking
              lines={
                isUnitsToMl
                  ? [
                      "Volume (mL) = dose (units) ÷ concentration (units/mL)",
                      `Volume = ${formatFormulaNumber(usedPrimary, 6)} units ÷ ${formatFormulaNumber(usedConcentration, 6)} units/mL`,
                      `Exact calculated volume = ${exactResult} mL`,
                      `Displayed volume = ${formattedResult} mL`,
                    ]
                  : [
                      "Dose (units) = volume (mL) × concentration (units/mL)",
                      `Dose = ${formatFormulaNumber(usedPrimary, 6)} mL × ${formatFormulaNumber(usedConcentration, 6)} units/mL`,
                      `Exact calculated dose = ${exactResult} units`,
                      `Displayed dose = ${formattedResult} units`,
                    ]
              }
            />

            <CalculatorField
              id="units-rounding"
              label="Display rounding"
              helperText="This changes display only. Small non-zero values keep enough decimals to remain visible."
            >
              <CalculatorSelect
                value={decimals}
                onChange={(event) => setDecimals(Number(event.target.value))}
              >
                <option value={0}>Whole number (non-zero preserved)</option>
                <option value={1}>1 decimal</option>
                <option value={2}>2 decimals</option>
                <option value={3}>3 decimals</option>
              </CalculatorSelect>
            </CalculatorField>
          </div>

          {isUnitsToMl && (
            <UnitsMeasurementGuide
              volumeMl={result}
              doseUnits={usedPrimary}
              concentrationUnitsPerMl={usedConcentration}
              productContext={usedProductContext}
            />
          )}
        </div>
      )}

      <CalculatorEquation
        id="selected-units-ml-formula"
        theme="dose"
        title={selectedFormula.heading}
        equation={selectedFormula.equation}
        spokenEquation={selectedFormula.spokenEquation}
        plainEnglish={selectedFormula.plainEnglish}
        variables={selectedFormula.variables}
      />
    </CalculatorShell>
  )
}
