"use client"

import { useRef, useState, type KeyboardEvent } from "react"
import { Syringe } from "lucide-react"
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
  VolumeMeasurementGuide,
} from "@/components/calculator"
import { useResultReveal } from "@/hooks/use-result-reveal"
import { formatSafeNumber } from "@/lib/safe-number-format"
import {
  calculateMgMl,
  calculateMgMlFromLabel,
  formatFormulaNumber,
  mgMlFormulaDefinitions,
  mgMlLabelFormulaDefinition,
} from "@/lib/dose-volume-formulas"

type Mode = "mgToMl" | "mlToMg"

type Errors = {
  primary?: string
  concentration?: string
  strength?: string
  labelVolume?: string
  copy?: string
}

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

export default function MgToMlClient() {
  const [mode, setMode] = useState<Mode>("mgToMl")
  const [doseMg, setDoseMg] = useState("")
  const [volumeInputMl, setVolumeInputMl] = useState("")
  const [concMgPerMl, setConcMgPerMl] = useState("")
  const [useFormatHelper, setUseFormatHelper] = useState(false)
  const [strengthMg, setStrengthMg] = useState("")
  const [labelVolumeMl, setLabelVolumeMl] = useState("")
  const [result, setResult] = useState<number | null>(null)
  const [usedConcentration, setUsedConcentration] = useState<number | null>(null)
  const [usedPrimary, setUsedPrimary] = useState<number | null>(null)
  const [usedLabelStrength, setUsedLabelStrength] = useState<number | null>(null)
  const [usedLabelVolume, setUsedLabelVolume] = useState<number | null>(null)
  const [decimals, setDecimals] = useState(2)
  const [errors, setErrors] = useState<Errors>({})

  const primaryRef = useRef<HTMLInputElement>(null)
  const concentrationRef = useRef<HTMLInputElement>(null)
  const strengthRef = useRef<HTMLInputElement>(null)
  const labelVolumeRef = useRef<HTMLInputElement>(null)
  const resultRef = useResultReveal<HTMLDivElement>(result !== null)

  const isMgToMl = mode === "mgToMl"
  const primaryLabel = isMgToMl ? "Dose required" : "Volume drawn up"
  const primaryUnit = isMgToMl ? "mg" : "mL"
  const primaryPlaceholder = isMgToMl ? "e.g., 500" : "e.g., 2.5"
  const primaryValue = isMgToMl ? doseMg : volumeInputMl
  const resultLabel = isMgToMl ? "Volume required" : "Dose amount"
  const resultUnit = isMgToMl ? "mL" : "mg"

  function clearResult() {
    setResult(null)
    setUsedConcentration(null)
    setUsedPrimary(null)
    setUsedLabelStrength(null)
    setUsedLabelVolume(null)
    setErrors((current) => ({ ...current, copy: undefined }))
  }

  function updatePrimary(value: string) {
    if (isMgToMl) setDoseMg(value)
    else setVolumeInputMl(value)
    setErrors((current) => ({ ...current, primary: undefined }))
    clearResult()
  }

  function validateConcentration(): number | null {
    if (!useFormatHelper) {
      const concentration = parseNumber(concMgPerMl)
      if (concentration === null || concentration <= 0) {
        setErrors((current) => ({
          ...current,
          concentration: "Enter a positive concentration using numbers only, such as 50.",
        }))
        concentrationRef.current?.focus()
        return null
      }
      return concentration
    }

    const strength = parseNumber(strengthMg)
    if (strength === null || strength <= 0) {
      setErrors((current) => ({
        ...current,
        strength: "Enter the positive strength shown on the label, such as 250.",
      }))
      strengthRef.current?.focus()
      return null
    }

    const labelVolume = parseNumber(labelVolumeMl)
    if (labelVolume === null || labelVolume <= 0) {
      setErrors((current) => ({
        ...current,
        labelVolume: "Enter the positive label volume using numbers only, such as 5.",
      }))
      labelVolumeRef.current?.focus()
      return null
    }

    return strength / labelVolume
  }

  function calculate() {
    setErrors({})

    const primary = parseNumber(primaryValue)
    if (primary === null || primary <= 0) {
      setErrors({
        primary: `Enter a positive ${isMgToMl ? "dose in mg" : "volume in mL"} using numbers only.`,
      })
      primaryRef.current?.focus()
      return
    }

    const concentration = validateConcentration()
    if (concentration === null) return

    const labelStrength = useFormatHelper ? parseNumber(strengthMg) : null
    const labelVolume = useFormatHelper ? parseNumber(labelVolumeMl) : null
    const nextResult =
      isMgToMl && useFormatHelper && labelStrength !== null && labelVolume !== null
        ? calculateMgMlFromLabel(primary, labelStrength, labelVolume)
        : calculateMgMl(primary, concentration, mode)

    setUsedConcentration(concentration)
    setUsedPrimary(primary)
    setUsedLabelStrength(labelStrength)
    setUsedLabelVolume(labelVolume)
    setConcMgPerMl(formatResult(concentration, 4))
    setResult(nextResult)
  }

  function reset() {
    setMode("mgToMl")
    setDoseMg("")
    setVolumeInputMl("")
    setConcMgPerMl("")
    setUseFormatHelper(false)
    setStrengthMg("")
    setLabelVolumeMl("")
    setResult(null)
    setUsedConcentration(null)
    setUsedPrimary(null)
    setUsedLabelStrength(null)
    setUsedLabelVolume(null)
    setDecimals(2)
    setErrors({})
    window.requestAnimationFrame(() => primaryRef.current?.focus())
  }

  function changeMode(nextMode: Mode) {
    if (nextMode === mode) return
    setMode(nextMode)
    setResult(null)
    setUsedConcentration(null)
    setUsedPrimary(null)
    setUsedLabelStrength(null)
    setUsedLabelVolume(null)
    setErrors({})
    window.requestAnimationFrame(() => primaryRef.current?.focus())
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") calculate()
  }

  const formattedResult = result === null ? "" : formatResult(result, decimals)
  const resultStatus =
    result !== null &&
    ((isMgToMl && (result < 0.05 || result > 50)) || (!isMgToMl && result > 10000))
      ? "warning"
      : "default"
  const exactResult = result === null ? "" : formatFormulaNumber(result, 8)
  const selectedFormula = isMgToMl && useFormatHelper ? mgMlLabelFormulaDefinition : mgMlFormulaDefinitions[mode]
  const exceedsEnteredLabelAmount =
    isMgToMl &&
    usedLabelStrength !== null &&
    usedPrimary !== null &&
    usedPrimary > usedLabelStrength * (1 + 1e-10)

  return (
    <CalculatorShell
      id="mg-to-ml-tool"
      theme="dose"
      eyebrow="Dose calculations"
      title="Calculate mg and mL"
      description="Enter a prescribed dose or measured volume, then use the exact medicine concentration shown on the product label."
      icon={<Syringe className="size-5" />}
      headerAction={
        <CalculatorSegmentedControl
          value={mode}
          options={[
            { value: "mgToMl", label: "mg → mL" },
            { value: "mlToMg", label: "mL → mg" },
          ]}
          onChange={changeMode}
          ariaLabel="Calculation direction"
        />
      }
    >
      <CalculatorNotice variant="warning" title="Do not guess the concentration">
        Use the strength printed on the medication label. Milligrams and millilitres cannot be connected safely without that concentration.
      </CalculatorNotice>

      <div className="space-y-5">
        <CalculatorField
          id="mg-ml-primary"
          label={primaryLabel}
          unit={primaryUnit}
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

        <div className="border-t border-gray-200 pt-5">
          <p className="mb-3 text-sm font-semibold text-gray-900">How is the medicine strength written?</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => {
                setUseFormatHelper(false)
                setErrors((current) => ({ ...current, strength: undefined, labelVolume: undefined }))
                clearResult()
              }}
              aria-pressed={!useFormatHelper}
              className={`rounded-xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:[--tw-ring-color:var(--calculator-focus)] ${
                !useFormatHelper
                  ? "[border-color:var(--calculator-accent)] [background-color:var(--calculator-soft)]"
                  : "border-gray-200 bg-white hover:bg-gray-50"
              }`}
            >
              <span className="block text-sm font-semibold text-gray-950">I know the concentration</span>
              <span className="mt-1 block text-xs text-gray-500">Example: 50 mg/mL</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setUseFormatHelper(true)
                setErrors((current) => ({ ...current, concentration: undefined }))
                clearResult()
              }}
              aria-pressed={useFormatHelper}
              className={`rounded-xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:[--tw-ring-color:var(--calculator-focus)] ${
                useFormatHelper
                  ? "[border-color:var(--calculator-accent)] [background-color:var(--calculator-soft)]"
                  : "border-gray-200 bg-white hover:bg-gray-50"
              }`}
            >
              <span className="block text-sm font-semibold text-gray-950">My label says mg per X mL</span>
              <span className="mt-1 block text-xs text-gray-500">Also use for total mg in a verified final vial volume</span>
            </button>
          </div>
        </div>

        {!useFormatHelper ? (
          <CalculatorField
            id="mg-ml-concentration"
            label="Concentration"
            unit="mg/mL"
            helperText="Use this when the label already gives the amount in each 1 mL."
            error={errors.concentration}
            required
          >
            <CalculatorInput
              ref={concentrationRef}
              type="text"
              value={concMgPerMl}
              onChange={(event) => {
                setConcMgPerMl(event.target.value)
                setErrors((current) => ({ ...current, concentration: undefined }))
                clearResult()
              }}
              onKeyDown={handleKeyDown}
              placeholder="e.g., 50"
              autoComplete="off"
            />
          </CalculatorField>
        ) : (
          <div className="space-y-4 rounded-2xl border p-4 [border-color:var(--calculator-border)] [background-color:var(--calculator-softer)] sm:p-5">
            <p className="text-sm leading-6 text-gray-700">
              Enter the amount and volume exactly as written on the label. For a reconstituted vial, use the verified <strong>final vial volume</strong>, not the amount of diluent added unless the product information states they are the same.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <CalculatorField
                id="mg-ml-label-strength"
                label="Label strength"
                unit="mg"
                error={errors.strength}
                required
              >
                <CalculatorInput
                  ref={strengthRef}
                  type="text"
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

              <CalculatorField
                id="mg-ml-label-volume"
                label="Label volume"
                unit="mL"
                error={errors.labelVolume}
                required
              >
                <CalculatorInput
                  ref={labelVolumeRef}
                  type="text"
                  value={labelVolumeMl}
                  onChange={(event) => {
                    setLabelVolumeMl(event.target.value)
                    setErrors((current) => ({ ...current, labelVolume: undefined }))
                    clearResult()
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="e.g., 5"
                  autoComplete="off"
                />
              </CalculatorField>
            </div>
            <p className="text-xs text-gray-500">Example: 250 mg / 5 mL becomes 50 mg/mL. A reconstituted vial containing 500 mg in a final volume of 10 mL is also 50 mg/mL.</p>
          </div>
        )}
      </div>

      <CalculatorActions
        onCalculate={calculate}
        onReset={reset}
        calculateIcon={<Syringe className="size-4" />}
      />

      {result !== null && usedConcentration !== null && usedPrimary !== null && (
        <div className="space-y-4">
          <CalculatorResult
            ref={resultRef}
            label={resultLabel}
            value={formattedResult}
            unit={resultUnit}
            status={resultStatus}
            interpretation={
              isMgToMl
                ? `At ${formatResult(usedConcentration, 4)} mg in each 1 mL, the dose is contained in ${formattedResult} mL.`
                : `At ${formatResult(usedConcentration, 4)} mg in each 1 mL, ${formatResult(usedPrimary, 4)} mL contains ${formattedResult} mg.`
            }
            actions={
              <CalculatorCopyButton
                value={`${formattedResult} ${resultUnit}`}
                onError={() => setErrors((current) => ({
                  ...current,
                  copy: "Copy failed. Select the result manually or check browser clipboard permissions.",
                }))}
              />
            }
          >
            <div className="grid gap-2 rounded-xl bg-gray-50 p-3 text-sm text-gray-700 sm:grid-cols-2">
              <p><span className="font-semibold text-gray-950">Exact calculated result:</span> {exactResult} {resultUnit}</p>
              <p><span className="font-semibold text-gray-950">Displayed result:</span> {formattedResult} {resultUnit}</p>
            </div>
            {resultStatus === "warning" && (
              <CalculatorNotice variant="warning" title="Quick check">
                This result is unusually small or large. Recheck the dose, concentration, units, product strength, and prescribed route before using the result.
              </CalculatorNotice>
            )}
            {exceedsEnteredLabelAmount && (
              <CalculatorNotice variant="warning" title="Check the total amount entered">
                The ordered dose is greater than the total mg entered in the label-strength field. If those values describe one vial or container, check whether more than one is intended and verify the order and product information.
              </CalculatorNotice>
            )}
            {errors.copy && <p role="alert" className="text-xs font-medium text-red-700">{errors.copy}</p>}
          </CalculatorResult>

          <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_180px]">
            <CalculatorWorking
              lines={
                isMgToMl && usedLabelStrength !== null && usedLabelVolume !== null
                  ? [
                      "Volume (mL) = dose needed ÷ dose on label × label volume",
                      `Volume = ${formatFormulaNumber(usedPrimary, 6)} mg ÷ ${formatFormulaNumber(usedLabelStrength, 6)} mg × ${formatFormulaNumber(usedLabelVolume, 6)} mL`,
                      `Volume = ${formatFormulaNumber(usedPrimary / usedLabelStrength, 8)} × ${formatFormulaNumber(usedLabelVolume, 6)} mL`,
                      `Exact calculated volume = ${exactResult} mL`,
                      `Displayed volume = ${formattedResult} mL`,
                    ]
                  : isMgToMl
                    ? [
                        "Volume (mL) = dose needed (mg) ÷ concentration (mg/mL)",
                        `Volume = ${formatFormulaNumber(usedPrimary, 6)} mg ÷ ${formatFormulaNumber(usedConcentration, 6)} mg/mL`,
                        `Exact calculated volume = ${exactResult} mL`,
                        `Displayed volume = ${formattedResult} mL`,
                      ]
                    : [
                        "Dose (mg) = volume (mL) × concentration (mg/mL)",
                        `Dose = ${formatFormulaNumber(usedPrimary, 6)} mL × ${formatFormulaNumber(usedConcentration, 6)} mg/mL`,
                        `Exact calculated dose = ${exactResult} mg`,
                        `Displayed dose = ${formattedResult} mg`,
                      ]
              }
            />

            <CalculatorField
              id="mg-ml-rounding"
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

          {isMgToMl && <VolumeMeasurementGuide volumeMl={result} />}
        </div>
      )}

      <CalculatorEquation
        id="selected-mg-ml-formula"
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
