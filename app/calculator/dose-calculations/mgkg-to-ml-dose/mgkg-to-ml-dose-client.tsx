"use client"

import { useRef, useState, type KeyboardEvent } from "react"
import { Scale, Syringe } from "lucide-react"
import {
  CalculatorActions,
  CalculatorCopyButton,
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
import { kilogramsToPounds, poundsToKilograms } from "@/lib/measurement-conversions"
import { formatSafeNumber } from "@/lib/safe-number-format"
import {
  calculateWeightBasedLiquidDose,
  type WeightBasedDoseBasis,
  type WeightBasedLiquidDoseResult,
  type WeightUnit,
} from "@/lib/weight-based-liquid-formulas"

type Errors = {
  dose?: string
  weight?: string
  dosesPerDay?: string
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

function formatInput(value: number, decimals = 2): string {
  return value.toFixed(decimals).replace(/\.?0+$/, "")
}

export default function MgKgToMlDoseClient() {
  const [doseBasis, setDoseBasis] = useState<WeightBasedDoseBasis>("perDose")
  const [doseMgPerKg, setDoseMgPerKg] = useState("")
  const [weightValue, setWeightValue] = useState("")
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("kg")
  const [dosesPerDay, setDosesPerDay] = useState("")
  const [concMgPerMl, setConcMgPerMl] = useState("")
  const [useFormatHelper, setUseFormatHelper] = useState(false)
  const [strengthMg, setStrengthMg] = useState("")
  const [labelVolumeMl, setLabelVolumeMl] = useState("")

  const [result, setResult] = useState<WeightBasedLiquidDoseResult | null>(null)
  const [decimals, setDecimals] = useState(2)
  const [errors, setErrors] = useState<Errors>({})

  const doseRef = useRef<HTMLInputElement>(null)
  const weightRef = useRef<HTMLInputElement>(null)
  const dosesPerDayRef = useRef<HTMLInputElement>(null)
  const concentrationRef = useRef<HTMLInputElement>(null)
  const strengthRef = useRef<HTMLInputElement>(null)
  const labelVolumeRef = useRef<HTMLInputElement>(null)
  const resultRef = useResultReveal<HTMLDivElement>(result !== null)

  function clearResult() {
    setResult(null)
    setErrors((current) => ({ ...current, copy: undefined }))
  }

  function changeDoseBasis(nextBasis: WeightBasedDoseBasis) {
    if (nextBasis === doseBasis) return
    setDoseBasis(nextBasis)
    setResult(null)
    setErrors({})
    window.requestAnimationFrame(() => {
      if (nextBasis === "perDose") doseRef.current?.focus()
      else dosesPerDayRef.current?.focus()
    })
  }

  function changeWeightUnit(nextUnit: WeightUnit) {
    if (nextUnit === weightUnit) return

    const currentWeight = parseNumber(weightValue)
    if (currentWeight !== null && currentWeight > 0) {
      const converted = nextUnit === "lb" ? kilogramsToPounds(currentWeight) : poundsToKilograms(currentWeight)
      setWeightValue(formatInput(converted, nextUnit === "lb" ? 2 : 3))
    }

    setWeightUnit(nextUnit)
    setResult(null)
    setErrors((current) => ({ ...current, weight: undefined, copy: undefined }))
    window.requestAnimationFrame(() => weightRef.current?.focus())
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

    const dose = parseNumber(doseMgPerKg)
    if (dose === null || dose <= 0) {
      setErrors({
        dose:
          doseBasis === "perDose"
            ? "Enter a positive mg/kg amount for one dose, such as 10."
            : "Enter a positive total daily amount in mg/kg/day, such as 20.",
      })
      doseRef.current?.focus()
      return
    }

    const weight = parseNumber(weightValue)
    if (weight === null || weight <= 0) {
      setErrors({
        weight: `Enter a positive patient weight in ${weightUnit === "kg" ? "kilograms" : "pounds"} using numbers only.`,
      })
      weightRef.current?.focus()
      return
    }

    let dividedDoses: number | undefined
    if (doseBasis === "perDay") {
      const parsedDoses = parseNumber(dosesPerDay)
      if (parsedDoses === null || !Number.isInteger(parsedDoses) || parsedDoses <= 0) {
        setErrors({ dosesPerDay: "Enter the prescribed number of divided doses as a positive whole number, such as 4." })
        dosesPerDayRef.current?.focus()
        return
      }
      dividedDoses = parsedDoses
    }

    const concentration = validateConcentration()
    if (concentration === null) return

    const nextResult = calculateWeightBasedLiquidDose({
      doseMgPerKg: dose,
      weight,
      weightUnit,
      doseBasis,
      dosesPerDay: dividedDoses,
      concentrationMgPerMl: concentration,
    })

    setConcMgPerMl(formatResult(concentration, 4))
    setResult(nextResult)
  }

  function reset() {
    setDoseBasis("perDose")
    setDoseMgPerKg("")
    setWeightValue("")
    setWeightUnit("kg")
    setDosesPerDay("")
    setConcMgPerMl("")
    setUseFormatHelper(false)
    setStrengthMg("")
    setLabelVolumeMl("")
    setResult(null)
    setDecimals(2)
    setErrors({})
    window.requestAnimationFrame(() => doseRef.current?.focus())
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") calculate()
  }

  const formattedVolume = result === null ? "" : formatResult(result.volumePerDoseMl, decimals)
  const formattedPerDoseMg = result === null ? "" : formatResult(result.perDoseMg, 4)
  const formattedWeightKg = result === null ? "" : formatResult(result.weightKg, 4)
  const formattedDailyMg = result?.dailyDoseMg === null || result?.dailyDoseMg === undefined
    ? ""
    : formatResult(result.dailyDoseMg, 4)
  const resultStatus =
    result !== null && (result.volumePerDoseMl < 0.05 || result.volumePerDoseMl > 50) ? "warning" : "default"

  const weightWorking =
    result && result.weightUnit === "lb"
      ? [`Weight = ${formatResult(result.weightInput, 4)} lb × 0.45359237 = ${formattedWeightKg} kg`]
      : []

  const doseWorking =
    result?.doseBasis === "perDay"
      ? [
          `Daily mg = ${formatResult(result.orderedDoseMgPerKg, 4)} mg/kg/day × ${formattedWeightKg} kg = ${formattedDailyMg} mg/day`,
          `mg per dose = ${formattedDailyMg} ÷ ${result.dosesPerDay} doses/day = ${formattedPerDoseMg} mg`,
          `Per-dose equivalent = ${formatResult(result.perDoseMgPerKg, 4)} mg/kg per dose`,
        ]
      : result
        ? [
            `mg per dose = ${formatResult(result.orderedDoseMgPerKg, 4)} mg/kg × ${formattedWeightKg} kg = ${formattedPerDoseMg} mg`,
          ]
        : []

  return (
    <CalculatorShell
      id="mgkg-to-ml-tool"
      theme="dose"
      eyebrow="Dose calculations"
      title="Calculate a weight-based liquid dose"
      description="Choose whether the order is written per dose or per day, enter weight in kg or lb, then use the exact medicine concentration shown on the label."
      icon={<Scale className="size-5" />}
    >
      <div className="flex justify-center">
        <CalculatorSegmentedControl
          value={doseBasis}
          options={[
            { value: "perDose", label: "mg/kg per dose" },
            { value: "perDay", label: "mg/kg per day" },
          ]}
          onChange={changeDoseBasis}
          ariaLabel="Choose how the weight-based order is written"
          className="w-full sm:w-auto"
        />
      </div>

      {doseBasis === "perDose" ? (
        <CalculatorNotice variant="warning" title="Use the amount ordered for one dose">
          Enter the prescribed mg/kg amount for a single administration. The calculator does not check maximum single-dose or daily-dose limits.
        </CalculatorNotice>
      ) : (
        <CalculatorNotice variant="warning" title="Confirm the number of divided doses">
          Enter the total order in mg/kg/day and the prescribed number of doses per day. The calculator divides the daily total evenly for arithmetic checking only.
        </CalculatorNotice>
      )}

      <div className="space-y-5">
        <CalculatorField
          id="mgkg-dose"
          label={doseBasis === "perDose" ? "Ordered dose per administration" : "Ordered total daily dose"}
          unit={doseBasis === "perDose" ? "mg/kg per dose" : "mg/kg/day"}
          helperText={
            doseBasis === "perDose"
              ? "Enter the amount prescribed for one dose."
              : "Enter the total weight-based amount prescribed across the whole day."
          }
          error={errors.dose}
          required
        >
          <CalculatorInput
            ref={doseRef}
            type="text"
            inputMode="decimal"
            value={doseMgPerKg}
            onChange={(event) => {
              setDoseMgPerKg(event.target.value)
              setErrors((current) => ({ ...current, dose: undefined }))
              clearResult()
            }}
            onKeyDown={handleKeyDown}
            placeholder={doseBasis === "perDose" ? "e.g., 10" : "e.g., 20"}
            autoComplete="off"
          />
        </CalculatorField>

        {doseBasis === "perDay" && (
          <CalculatorField
            id="mgkg-doses-per-day"
            label="Divided doses per day"
            unit="doses/day"
            helperText="Enter the prescribed number of administrations used to divide the daily total."
            error={errors.dosesPerDay}
            required
          >
            <CalculatorInput
              ref={dosesPerDayRef}
              type="text"
              inputMode="numeric"
              value={dosesPerDay}
              onChange={(event) => {
                setDosesPerDay(event.target.value)
                setErrors((current) => ({ ...current, dosesPerDay: undefined }))
                clearResult()
              }}
              onKeyDown={handleKeyDown}
              placeholder="e.g., 4"
              autoComplete="off"
            />
          </CalculatorField>
        )}

        <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_180px]">
          <CalculatorField
            id="mgkg-weight"
            label="Patient weight"
            unit={weightUnit}
            helperText="Use the medication weight required by the order or clinical reference."
            error={errors.weight}
            required
          >
            <CalculatorInput
              ref={weightRef}
              type="text"
              inputMode="decimal"
              value={weightValue}
              onChange={(event) => {
                setWeightValue(event.target.value)
                setErrors((current) => ({ ...current, weight: undefined }))
                clearResult()
              }}
              onKeyDown={handleKeyDown}
              placeholder={weightUnit === "kg" ? "e.g., 18" : "e.g., 40"}
              autoComplete="off"
            />
          </CalculatorField>

          <CalculatorField
            id="mgkg-weight-unit"
            label="Weight unit"
            helperText="Pounds are converted to kilograms before the dose is calculated."
            required
          >
            <CalculatorSelect value={weightUnit} onChange={(event) => changeWeightUnit(event.target.value as WeightUnit)}>
              <option value="kg">Kilograms (kg)</option>
              <option value="lb">Pounds (lb)</option>
            </CalculatorSelect>
          </CalculatorField>
        </div>

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
              <span className="mt-1 block text-xs text-gray-500">Example: 250 mg / 5 mL</span>
            </button>
          </div>
        </div>

        {!useFormatHelper ? (
          <CalculatorField
            id="mgkg-concentration"
            label="Concentration"
            unit="mg/mL"
            helperText="Use the concentration of the exact liquid medicine being prepared or administered."
            error={errors.concentration}
            required
          >
            <CalculatorInput
              ref={concentrationRef}
              type="text"
              inputMode="decimal"
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
              Enter the amount and volume exactly as written on the label. The calculator converts them to mg/mL before calculating the dose volume.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <CalculatorField id="mgkg-label-strength" label="Label strength" unit="mg" error={errors.strength} required>
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

              <CalculatorField id="mgkg-label-volume" label="Label volume" unit="mL" error={errors.labelVolume} required>
                <CalculatorInput
                  ref={labelVolumeRef}
                  type="text"
                  inputMode="decimal"
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
            <p className="text-xs text-gray-500">Example: 250 mg / 5 mL becomes 50 mg/mL.</p>
          </div>
        )}
      </div>

      <CalculatorActions onCalculate={calculate} onReset={reset} calculateIcon={<Syringe className="size-4" />} />

      {result && (
        <div className="space-y-4">
          <CalculatorResult
            ref={resultRef}
            label="Volume per dose"
            value={formattedVolume}
            unit="mL"
            status={resultStatus}
            badge={
              <span className="rounded-full border border-current/15 bg-white/70 px-2 py-0.5 text-xs font-semibold">
                {result.doseBasis === "perDay"
                  ? `Daily total: ${formattedDailyMg} mg ÷ ${result.dosesPerDay} doses`
                  : `Dose: ${formattedPerDoseMg} mg`}
              </span>
            }
            interpretation={
              result.doseBasis === "perDay" ? (
                <>
                  {formatResult(result.orderedDoseMgPerKg, 4)} mg/kg/day at {formattedWeightKg} kg gives {formattedDailyMg} mg/day. Divided into {result.dosesPerDay} doses, each dose is {formattedPerDoseMg} mg or {formattedVolume} mL at {formatResult(result.concentrationMgPerMl, 4)} mg/mL.
                </>
              ) : (
                <>
                  {formatResult(result.orderedDoseMgPerKg, 4)} mg/kg × {formattedWeightKg} kg = {formattedPerDoseMg} mg per dose. At {formatResult(result.concentrationMgPerMl, 4)} mg/mL, the required volume is {formattedVolume} mL.
                </>
              )
            }
            actions={
              <CalculatorCopyButton
                value={`${formattedVolume} mL per dose (${formattedPerDoseMg} mg per dose${result.doseBasis === "perDay" ? `; ${formattedDailyMg} mg/day in ${result.dosesPerDay} doses` : ""})`}
                onError={() =>
                  setErrors((current) => ({
                    ...current,
                    copy: "Copy failed. Select the result manually or check browser clipboard permissions.",
                  }))
                }
              />
            }
          >
            {resultStatus === "warning" && (
              <CalculatorNotice variant="warning" title="Quick check">
                This calculated volume is unusually small or large. Recheck the order basis, patient weight, divided-dose count, concentration, maximum-dose limits, route, and administration device.
              </CalculatorNotice>
            )}
            {result.weightUnit === "lb" && (
              <CalculatorNotice variant="info" title="Weight conversion used">
                {formatResult(result.weightInput, 4)} lb was converted to {formattedWeightKg} kg before the mg/kg calculation.
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
              lines={[
                ...weightWorking,
                ...doseWorking,
                "mL per dose = mg per dose ÷ concentration (mg/mL)",
                `mL per dose = ${formattedPerDoseMg} ÷ ${formatResult(result.concentrationMgPerMl, 4)} = ${formattedVolume} mL`,
              ]}
            />

            <CalculatorField
              id="mgkg-rounding"
              label="Display rounding"
              helperText="This changes display only. Small non-zero values keep enough decimals to remain visible."
            >
              <CalculatorSelect value={decimals} onChange={(event) => setDecimals(Number(event.target.value))}>
                <option value={0}>Whole number (non-zero preserved)</option>
                <option value={1}>1 decimal place</option>
                <option value={2}>2 decimal places</option>
                <option value={3}>3 decimal places</option>
              </CalculatorSelect>
            </CalculatorField>
          </div>

          <VolumeMeasurementGuide
            volumeMl={result.volumePerDoseMl}
            theme="dose"
            title="Measurement check"
            description="Compare the calculated volume with the markings on the prescribed administration device. This guide does not select a syringe or approve rounding."
          />
        </div>
      )}
    </CalculatorShell>
  )
}
