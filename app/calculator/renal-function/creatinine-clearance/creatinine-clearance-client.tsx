"use client"

import { useMemo, useRef, useState, type KeyboardEvent } from "react"
import { Activity, Scale } from "lucide-react"
import {
  CalculatorActions,
  CalculatorCopyButton,
  CalculatorEquation,
  CalculatorField,
  CalculatorInput,
  CalculatorNotice,
  CalculatorResult,
  CalculatorSegmentedControl,
  CalculatorShell,
  CalculatorWorking,
} from "@/components/calculator"
import { useResultReveal } from "@/hooks/use-result-reveal"
import {
  COCKCROFT_GAULT_DEVINE_MAX_HEIGHT_CM,
  COCKCROFT_GAULT_DEVINE_MIN_HEIGHT_CM,
  buildWeightContext,
  calculateCockcroftGault,
  calculateCockcroftGaultWeightCandidates,
  cockcroftGaultFormulaDefinitions,
  formatCockcroftGaultNumber,
  getCockcroftGaultWeightMethodLabel,
  getWeightFromCandidates,
  type CockcroftGaultCalculation,
  type CockcroftGaultHelperWeightMethod,
  type CockcroftGaultSexFactor,
  type CockcroftGaultWeightCandidates,
  type SerumCreatinineUnit,
} from "@/lib/creatinine-clearance-formulas"
import {
  centimetresToFeetAndInches,
  feetAndInchesToCentimetres,
  kilogramsToPounds,
  poundsToKilograms,
  type MeasurementSystem,
} from "@/lib/measurement-conversions"

type WeightEntryMode = "direct" | "helper"

type Errors = {
  age?: string
  directWeight?: string
  actualWeight?: string
  height?: string
  weightMethod?: string
  creatinine?: string
  copy?: string
}

function parseNumber(value: string): number | null {
  const cleaned = value.replace(/,/g, "").trim()
  if (!cleaned) return null
  if (!/^(?:\d+\.?\d*|\.\d+)$/.test(cleaned)) return null

  const parsed = Number(cleaned)
  return Number.isFinite(parsed) ? parsed : null
}

function formatInputValue(value: number, decimals = 2): string {
  if (!Number.isFinite(value)) return ""
  return Number(value.toFixed(decimals)).toString()
}

export default function CreatinineClearanceClient() {
  const [sexFactor, setSexFactor] = useState<CockcroftGaultSexFactor>("male")
  const [age, setAge] = useState("")
  const [weightEntryMode, setWeightEntryMode] = useState<WeightEntryMode>("direct")
  const [directWeight, setDirectWeight] = useState("")
  const [measurementSystem, setMeasurementSystem] = useState<MeasurementSystem>("metric")
  const [actualWeight, setActualWeight] = useState("")
  const [heightCm, setHeightCm] = useState("")
  const [heightFeet, setHeightFeet] = useState("")
  const [heightInches, setHeightInches] = useState("")
  const [selectedWeightMethod, setSelectedWeightMethod] = useState<CockcroftGaultHelperWeightMethod | "">("")
  const [unit, setUnit] = useState<SerumCreatinineUnit>("umol")
  const [creatinine, setCreatinine] = useState("")
  const [decimals, setDecimals] = useState(1)
  const [result, setResult] = useState<CockcroftGaultCalculation | null>(null)
  const [errors, setErrors] = useState<Errors>({})

  const ageRef = useRef<HTMLInputElement>(null)
  const directWeightRef = useRef<HTMLInputElement>(null)
  const actualWeightRef = useRef<HTMLInputElement>(null)
  const heightCmRef = useRef<HTMLInputElement>(null)
  const heightFeetRef = useRef<HTMLInputElement>(null)
  const weightMethodRef = useRef<HTMLDivElement>(null)
  const creatinineRef = useRef<HTMLInputElement>(null)
  const resultRef = useResultReveal<HTMLDivElement>(result !== null)
  const selectedFormula = cockcroftGaultFormulaDefinitions[unit]

  const helperMeasurements = useMemo(() => {
    const parsedActualWeight = parseNumber(actualWeight)
    if (parsedActualWeight === null) return null

    const actualWeightKg = measurementSystem === "metric" ? parsedActualWeight : poundsToKilograms(parsedActualWeight)
    let convertedHeightCm: number | null = null

    if (measurementSystem === "metric") {
      convertedHeightCm = parseNumber(heightCm)
    } else {
      const parsedFeet = parseNumber(heightFeet)
      const parsedInches = parseNumber(heightInches || "0")
      if (parsedFeet !== null && Number.isInteger(parsedFeet) && parsedInches !== null && parsedInches >= 0 && parsedInches < 12) {
        convertedHeightCm = feetAndInchesToCentimetres(parsedFeet, parsedInches)
      }
    }

    if (convertedHeightCm === null) return null
    return { actualWeightKg, heightCm: convertedHeightCm }
  }, [actualWeight, heightCm, heightFeet, heightInches, measurementSystem])

  const helperCandidates = useMemo(() => {
    if (!helperMeasurements) return null
    if (
      helperMeasurements.actualWeightKg < 10 ||
      helperMeasurements.actualWeightKg > 400 ||
      helperMeasurements.heightCm < COCKCROFT_GAULT_DEVINE_MIN_HEIGHT_CM ||
      helperMeasurements.heightCm > COCKCROFT_GAULT_DEVINE_MAX_HEIGHT_CM
    ) {
      return null
    }

    try {
      return calculateCockcroftGaultWeightCandidates(
        helperMeasurements.actualWeightKg,
        helperMeasurements.heightCm,
        sexFactor,
      )
    } catch {
      return null
    }
  }, [helperMeasurements, sexFactor])

  function clearResult() {
    setResult(null)
    setErrors((current) => ({ ...current, copy: undefined }))
  }



  function changeSexFactor(next: CockcroftGaultSexFactor) {
    setSexFactor(next)
    setErrors((current) => ({ ...current, copy: undefined }))
    setResult(null)
  }

  function changeWeightEntryMode(next: WeightEntryMode) {
    setWeightEntryMode(next)
    setErrors((current) => ({
      ...current,
      directWeight: undefined,
      actualWeight: undefined,
      height: undefined,
      weightMethod: undefined,
      copy: undefined,
    }))
    setResult(null)
    window.requestAnimationFrame(() => {
      if (next === "direct") directWeightRef.current?.focus()
      else actualWeightRef.current?.focus()
    })
  }

  function changeMeasurementSystem(next: MeasurementSystem) {
    if (next === measurementSystem) return

    if (next === "imperial") {
      const parsedWeightKg = parseNumber(actualWeight)
      const parsedHeightCm = parseNumber(heightCm)
      if (parsedWeightKg !== null) setActualWeight(formatInputValue(kilogramsToPounds(parsedWeightKg), 2))
      if (parsedHeightCm !== null) {
        const converted = centimetresToFeetAndInches(parsedHeightCm)
        setHeightFeet(String(converted.feet))
        setHeightInches(formatInputValue(converted.inches, 2))
      }
    } else {
      const parsedWeightLb = parseNumber(actualWeight)
      const parsedFeet = parseNumber(heightFeet)
      const parsedInches = parseNumber(heightInches || "0")
      if (parsedWeightLb !== null) setActualWeight(formatInputValue(poundsToKilograms(parsedWeightLb), 2))
      if (parsedFeet !== null && Number.isInteger(parsedFeet) && parsedInches !== null && parsedInches >= 0 && parsedInches < 12) {
        setHeightCm(formatInputValue(feetAndInchesToCentimetres(parsedFeet, parsedInches), 2))
      }
    }

    setMeasurementSystem(next)
    setErrors((current) => ({ ...current, actualWeight: undefined, height: undefined, weightMethod: undefined, copy: undefined }))
    setResult(null)
  }

  function changeUnit(next: SerumCreatinineUnit) {
    setUnit(next)
    setCreatinine("")
    setErrors((current) => ({ ...current, creatinine: undefined, copy: undefined }))
    setResult(null)
    window.requestAnimationFrame(() => creatinineRef.current?.focus())
  }

  function validateWeight(): { weightKg: number; method: "direct" | CockcroftGaultHelperWeightMethod; candidates?: CockcroftGaultWeightCandidates } | null {
    if (weightEntryMode === "direct") {
      const parsedWeight = parseNumber(directWeight)
      if (parsedWeight === null || parsedWeight < 10 || parsedWeight > 400) {
        setErrors({ directWeight: "Enter the weight required by the medicine reference from 10 to 400 kg, such as 80." })
        directWeightRef.current?.focus()
        return null
      }
      return { weightKg: parsedWeight, method: "direct" }
    }

    const parsedActualWeight = parseNumber(actualWeight)
    const actualWeightKg =
      parsedActualWeight === null
        ? null
        : measurementSystem === "metric"
          ? parsedActualWeight
          : poundsToKilograms(parsedActualWeight)

    if (actualWeightKg === null || actualWeightKg < 10 || actualWeightKg > 400) {
      setErrors({
        actualWeight:
          measurementSystem === "metric"
            ? "Enter actual body weight from 10 to 400 kg, such as 100."
            : "Enter actual body weight from about 22 to 882 lb, such as 220.",
      })
      actualWeightRef.current?.focus()
      return null
    }

    let convertedHeightCm: number | null = null
    if (measurementSystem === "metric") {
      convertedHeightCm = parseNumber(heightCm)
    } else {
      const parsedFeet = parseNumber(heightFeet)
      const parsedInches = parseNumber(heightInches || "0")
      if (parsedFeet !== null && Number.isInteger(parsedFeet) && parsedInches !== null && parsedInches >= 0 && parsedInches < 12) {
        convertedHeightCm = feetAndInchesToCentimetres(parsedFeet, parsedInches)
      }
    }

    if (
      convertedHeightCm === null ||
      convertedHeightCm < COCKCROFT_GAULT_DEVINE_MIN_HEIGHT_CM ||
      convertedHeightCm > COCKCROFT_GAULT_DEVINE_MAX_HEIGHT_CM
    ) {
      setErrors({
        height:
          "The weight helper uses adult Devine IBW and requires height from 152.4 to 250 cm (5 ft to about 8 ft 2 in). Enter a protocol-selected weight directly when this helper does not apply.",
      })
      if (measurementSystem === "metric") heightCmRef.current?.focus()
      else heightFeetRef.current?.focus()
      return null
    }

    const candidates = calculateCockcroftGaultWeightCandidates(actualWeightKg, convertedHeightCm, sexFactor)
    if (!selectedWeightMethod) {
      setErrors({ weightMethod: "Select the weight method required by the medicine reference or local protocol." })
      weightMethodRef.current?.focus()
      return null
    }

    return {
      weightKg: getWeightFromCandidates(candidates, selectedWeightMethod),
      method: selectedWeightMethod,
      candidates,
    }
  }

  function calculate() {
    setErrors({})

    const parsedAge = parseNumber(age)
    if (parsedAge === null || parsedAge < 18 || parsedAge > 120) {
      setErrors({ age: "Enter an adult age from 18 to 120 years using numbers only, such as 70." })
      ageRef.current?.focus()
      return
    }

    const selectedWeight = validateWeight()
    if (!selectedWeight) return

    const parsedCreatinine = parseNumber(creatinine)
    const creatinineValid =
      unit === "umol"
        ? parsedCreatinine !== null && parsedCreatinine >= 10 && parsedCreatinine <= 3000
        : parsedCreatinine !== null && parsedCreatinine >= 0.1 && parsedCreatinine <= 34

    if (!creatinineValid || parsedCreatinine === null) {
      setErrors({
        creatinine:
          unit === "umol"
            ? "Enter serum creatinine from 10 to 3000 µmol/L using numbers only, such as 120."
            : "Enter serum creatinine from 0.1 to 34 mg/dL using numbers only, such as 1.2.",
      })
      creatinineRef.current?.focus()
      return
    }

    const weightContext = buildWeightContext(selectedWeight.method, selectedWeight.candidates)
    const nextResult = calculateCockcroftGault(
      parsedAge,
      selectedWeight.weightKg,
      sexFactor,
      parsedCreatinine,
      unit,
      weightContext,
    )

    if (!Number.isFinite(nextResult.crcl) || nextResult.crcl <= 0) {
      setErrors({ creatinine: "The result could not be calculated. Recheck every input and unit." })
      creatinineRef.current?.focus()
      return
    }

    setResult(nextResult)
  }

  function reset() {
    setSexFactor("male")
    setAge("")
    setWeightEntryMode("direct")
    setDirectWeight("")
    setMeasurementSystem("metric")
    setActualWeight("")
    setHeightCm("")
    setHeightFeet("")
    setHeightInches("")
    setSelectedWeightMethod("")
    setUnit("umol")
    setCreatinine("")
    setDecimals(1)
    setResult(null)
    setErrors({})
    window.requestAnimationFrame(() => ageRef.current?.focus())
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") calculate()
  }

  const displayedCrCl = result ? formatCockcroftGaultNumber(result.crcl, decimals) : ""
  const inputReviewSuggested = result !== null && (result.crcl < 30 || result.crcl > 200)
  const adjustedSelected = result?.weightContext.method === "adjusted"

  return (
    <CalculatorShell
      id="creatinine-clearance-tool"
      theme="renal"
      eyebrow="Renal function"
      title="Calculate Cockcroft-Gault creatinine clearance"
      description="Enter adult age, serum creatinine, and either a protocol-selected weight or compare actual, Devine ideal, and adjusted weight options before choosing one."
      icon={<Activity className="size-5" />}
    >
      <div className="space-y-5">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-gray-900">Cockcroft-Gault sex factor</p>
          <CalculatorSegmentedControl
            value={sexFactor}
            onChange={changeSexFactor}
            ariaLabel="Select the Cockcroft-Gault sex factor"
            options={[
              { value: "male", label: "Male factor (1.0)" },
              { value: "female", label: "Female factor (0.85)" },
            ]}
            className="w-full sm:w-auto"
          />
          <p className="text-xs leading-5 text-gray-500">
            Use the category specified by the relevant calculator convention, medicine reference, or local protocol.
          </p>
        </div>

        <CalculatorField
          id="crcl-age"
          label="Age"
          unit="years"
          helperText="Enter adult age in years, such as 70."
          error={errors.age}
          required
        >
          <CalculatorInput
            ref={ageRef}
            type="text"
            inputMode="decimal"
            value={age}
            onChange={(event) => {
              setAge(event.target.value)
              setErrors((current) => ({ ...current, age: undefined }))
              clearResult()
            }}
            onKeyDown={handleKeyDown}
            placeholder="e.g., 70"
            autoComplete="off"
          />
        </CalculatorField>

        <div className="space-y-3 border-t border-gray-200 pt-5">
          <div>
            <p className="text-sm font-semibold text-gray-900">How will you enter the equation weight?</p>
            <p className="mt-1 text-xs leading-5 text-gray-500">
              MedMaths can show common weight calculations, but it does not decide which method is correct for a medicine.
            </p>
          </div>
          <CalculatorSegmentedControl
            value={weightEntryMode}
            onChange={changeWeightEntryMode}
            ariaLabel="Choose how to enter the Cockcroft-Gault weight"
            options={[
              { value: "direct", label: "Enter selected weight" },
              { value: "helper", label: "Compare weight methods" },
            ]}
            className="w-full"
          />
        </div>

        {weightEntryMode === "direct" ? (
          <CalculatorField
            id="crcl-direct-weight"
            label="Weight required by the reference"
            unit="kg"
            helperText="Enter the actual, ideal, adjusted, or other kilogram weight already specified by the medicine reference or local policy."
            error={errors.directWeight}
            required
          >
            <CalculatorInput
              ref={directWeightRef}
              type="text"
              inputMode="decimal"
              value={directWeight}
              onChange={(event) => {
                setDirectWeight(event.target.value)
                setErrors((current) => ({ ...current, directWeight: undefined }))
                clearResult()
              }}
              onKeyDown={handleKeyDown}
              placeholder="e.g., 80"
              autoComplete="off"
            />
          </CalculatorField>
        ) : (
          <div className="space-y-4 rounded-2xl border border-blue-200 bg-blue-50/50 p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <Scale className="mt-0.5 size-5 shrink-0 text-blue-700" />
              <div>
                <h3 className="font-semibold text-gray-950">Optional weight-method helper</h3>
                <p className="mt-1 text-sm leading-6 text-gray-700">
                  Enter actual weight and adult height. The helper calculates actual weight, Devine IBW, and adjusted weight using a 0.4 factor. You must select the method required by the dosing source.
                </p>
              </div>
            </div>

            <CalculatorSegmentedControl
              value={measurementSystem}
              onChange={changeMeasurementSystem}
              ariaLabel="Choose metric or imperial weight-helper inputs"
              options={[
                { value: "metric", label: "Metric" },
                { value: "imperial", label: "Feet, inches & lb" },
              ]}
              className="w-full sm:w-auto"
            />

            {measurementSystem === "metric" ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <CalculatorField
                  id="crcl-actual-weight-kg"
                  label="Actual body weight"
                  unit="kg"
                  helperText="Used to calculate and compare the weight options."
                  error={errors.actualWeight}
                  required
                >
                  <CalculatorInput
                    ref={actualWeightRef}
                    type="text"
                    inputMode="decimal"
                    value={actualWeight}
                    onChange={(event) => {
                      setActualWeight(event.target.value)
                      setErrors((current) => ({ ...current, actualWeight: undefined, weightMethod: undefined }))
                      clearResult()
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="e.g., 100"
                    autoComplete="off"
                  />
                </CalculatorField>
                <CalculatorField
                  id="crcl-height-cm"
                  label="Adult height"
                  unit="cm"
                  helperText="Devine IBW helper supports 152.4 to 250 cm."
                  error={errors.height}
                  required
                >
                  <CalculatorInput
                    ref={heightCmRef}
                    type="text"
                    inputMode="decimal"
                    value={heightCm}
                    onChange={(event) => {
                      setHeightCm(event.target.value)
                      setErrors((current) => ({ ...current, height: undefined, weightMethod: undefined }))
                      clearResult()
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="e.g., 175"
                    autoComplete="off"
                  />
                </CalculatorField>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-3">
                <CalculatorField
                  id="crcl-actual-weight-lb"
                  label="Actual body weight"
                  unit="lb"
                  helperText="Converted to kilograms before calculation."
                  error={errors.actualWeight}
                  required
                >
                  <CalculatorInput
                    ref={actualWeightRef}
                    type="text"
                    inputMode="decimal"
                    value={actualWeight}
                    onChange={(event) => {
                      setActualWeight(event.target.value)
                      setErrors((current) => ({ ...current, actualWeight: undefined, weightMethod: undefined }))
                      clearResult()
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="e.g., 220"
                    autoComplete="off"
                  />
                </CalculatorField>
                <CalculatorField
                  id="crcl-height-feet"
                  label="Height"
                  unit="ft"
                  helperText="Whole feet only."
                  error={errors.height}
                  required
                >
                  <CalculatorInput
                    ref={heightFeetRef}
                    type="text"
                    inputMode="decimal"
                    value={heightFeet}
                    onChange={(event) => {
                      setHeightFeet(event.target.value)
                      setErrors((current) => ({ ...current, height: undefined, weightMethod: undefined }))
                      clearResult()
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="e.g., 5"
                    autoComplete="off"
                  />
                </CalculatorField>
                <CalculatorField
                  id="crcl-height-inches"
                  label="Additional height"
                  unit="in"
                  helperText="Enter 0 to less than 12 inches."
                  required
                >
                  <CalculatorInput
                    type="text"
                    inputMode="decimal"
                    value={heightInches}
                    onChange={(event) => {
                      setHeightInches(event.target.value)
                      setErrors((current) => ({ ...current, height: undefined, weightMethod: undefined }))
                      clearResult()
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="e.g., 9"
                    autoComplete="off"
                  />
                </CalculatorField>
              </div>
            )}

            <div ref={weightMethodRef} tabIndex={-1} className="scroll-mt-24 outline-none">
              <p className="text-sm font-semibold text-gray-900">Select the weight method required by the reference</p>
              <p className="mt-1 text-xs leading-5 text-gray-600">
                The three values appear when valid actual weight and height are entered. Selecting one records the exact method used in the result.
              </p>
              {errors.weightMethod && <p className="mt-2 text-sm font-medium text-red-700">{errors.weightMethod}</p>}

              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {(["actual", "ideal", "adjusted"] as const).map((method) => {
                  const value = helperCandidates ? getWeightFromCandidates(helperCandidates, method) : null
                  const selected = selectedWeightMethod === method
                  return (
                    <button
                      key={method}
                      type="button"
                      aria-pressed={selected}
                      disabled={!helperCandidates}
                      onClick={() => {
                        setSelectedWeightMethod(method)
                        setErrors((current) => ({ ...current, weightMethod: undefined }))
                        clearResult()
                      }}
                      className={`rounded-xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-55 ${
                        selected ? "border-blue-600 bg-blue-100" : "border-gray-200 bg-white hover:border-blue-300"
                      }`}
                    >
                      <span className="block text-sm font-semibold text-gray-950">{getCockcroftGaultWeightMethodLabel(method)}</span>
                      <span className="mt-2 block text-xl font-bold text-blue-900">
                        {value === null ? "—" : `${formatCockcroftGaultNumber(value, 2)} kg`}
                      </span>
                      {method === "adjusted" && (
                        <span className="mt-2 block text-xs leading-5 text-gray-600">IBW + 0.4 × (actual − IBW)</span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            <CalculatorNotice variant="neutral" title="The helper does not choose the clinically correct weight">
              Actual, ideal, and adjusted weights can produce different CrCl estimates. Use the method explicitly required by the current medicine reference, product information, pharmacist, prescriber, or local protocol.
            </CalculatorNotice>
          </div>
        )}

        <div className="space-y-2 border-t border-gray-200 pt-5">
          <p className="text-sm font-semibold text-gray-900">Serum creatinine unit</p>
          <CalculatorSegmentedControl
            value={unit}
            onChange={changeUnit}
            ariaLabel="Choose serum creatinine unit"
            options={[
              { value: "umol", label: "µmol/L" },
              { value: "mgdl", label: "mg/dL" },
            ]}
            className="w-full sm:w-auto"
          />
          <p className="text-xs leading-5 text-gray-500">
            Changing the unit clears the creatinine field so the same number cannot be carried into the wrong equation.
          </p>
        </div>

        <CalculatorField
          id="crcl-creatinine"
          label="Serum creatinine"
          unit={unit === "umol" ? "µmol/L" : "mg/dL"}
          helperText={
            unit === "umol"
              ? "Enter the pathology value in µmol/L, such as 120."
              : "Enter the pathology value in mg/dL, such as 1.2."
          }
          error={errors.creatinine}
          required
        >
          <CalculatorInput
            ref={creatinineRef}
            type="text"
            inputMode="decimal"
            value={creatinine}
            onChange={(event) => {
              setCreatinine(event.target.value)
              setErrors((current) => ({ ...current, creatinine: undefined }))
              clearResult()
            }}
            onKeyDown={handleKeyDown}
            placeholder={unit === "umol" ? "e.g., 120" : "e.g., 1.2"}
            autoComplete="off"
          />
        </CalculatorField>
      </div>

      <CalculatorActions onCalculate={calculate} onReset={reset} />

      {result !== null && (
        <CalculatorResult
          ref={resultRef}
          label="Estimated creatinine clearance"
          value={displayedCrCl}
          unit="mL/min"
          status="default"
          badge={
            <span className="rounded-full border border-current/20 bg-white/70 px-2 py-0.5 text-xs font-semibold">
              Cockcroft-Gault • {result.weightContext.label}
            </span>
          }
          interpretation={`Exact calculator value: ${formatCockcroftGaultNumber(result.crcl, 6)} mL/min. Weight used: ${formatCockcroftGaultNumber(result.weightKg, 4)} kg (${result.weightContext.label.toLowerCase()}). Displayed to ${decimals} decimal place${decimals === 1 ? "" : "s"}.`}
          actions={
            <CalculatorCopyButton
              value={`Cockcroft-Gault creatinine clearance: ${displayedCrCl} mL/min. Exact value: ${formatCockcroftGaultNumber(result.crcl, 6)} mL/min. Weight used: ${formatCockcroftGaultNumber(result.weightKg, 4)} kg (${result.weightContext.label}).`}
              onError={() => setErrors((current) => ({ ...current, copy: "Copy failed. Select and copy the result manually." }))}
            />
          }
        >
          <div className="space-y-4">
            <CalculatorNotice variant="neutral" title="What this result means">
              This is an estimated Cockcroft-Gault creatinine clearance using the selected weight and the values entered. It is not a measured clearance, an eGFR result, a diagnosis, or a medication dose.
            </CalculatorNotice>

            <CalculatorNotice variant="neutral" title="Weight method recorded">
              The equation used {formatCockcroftGaultNumber(result.weightKg, 4)} kg as {result.weightContext.label.toLowerCase()}. MedMaths records the choice but does not confirm that it is the correct weight for the medicine.
            </CalculatorNotice>

            {result.weightContext.method !== "direct" && (
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-gray-200 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Actual weight</p>
                  <p className="mt-1 text-lg font-bold text-gray-950">{formatCockcroftGaultNumber(result.weightContext.actualWeightKg ?? 0, 2)} kg</p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Devine IBW</p>
                  <p className="mt-1 text-lg font-bold text-gray-950">{formatCockcroftGaultNumber(result.weightContext.idealWeightKg ?? 0, 2)} kg</p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Adjusted weight</p>
                  <p className="mt-1 text-lg font-bold text-gray-950">{formatCockcroftGaultNumber(result.weightContext.adjustedWeightKg ?? 0, 2)} kg</p>
                </div>
              </div>
            )}

            {inputReviewSuggested && (
              <CalculatorNotice variant="warning" title="Recheck the calculation inputs and clinical context">
                This estimate is outside the range commonly seen in many adult calculations. Recheck age, creatinine unit, selected weight method, serum creatinine, renal trend, and whether Cockcroft-Gault is the estimate required by the medicine reference. The number does not create a universal dosing category.
              </CalculatorNotice>
            )}

            {adjustedSelected && (
              <CalculatorNotice variant="warning" title="Adjusted weight uses a 0.4 factor">
                This helper uses adjusted weight = IBW + 0.4 × (actual weight − IBW). Adjustment factors and weight-method rules are not universal. Confirm that the current dosing reference explicitly requires this method.
              </CalculatorNotice>
            )}

            <CalculatorNotice variant="neutral" title="Interpret with renal trend and clinical context">
              Serum-creatinine estimates may be unreliable during rapid renal change, dialysis, pregnancy, severe frailty, low muscle mass, and body-size extremes. Check whether the medicine source requires Cockcroft-Gault CrCl, eGFR, measured clearance, or another estimate.
            </CalculatorNotice>

            <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_180px] sm:items-end">
              <div>
                <label htmlFor="crcl-rounding" className="text-sm font-semibold text-gray-900">
                  Display rounding
                </label>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  This changes display only. Keep sufficient precision for checking and apply medicine-specific thresholds exactly as written.
                </p>
              </div>
              <select
                id="crcl-rounding"
                value={decimals}
                onChange={(event) => setDecimals(Number(event.target.value))}
                className="h-11 w-full rounded-xl border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none focus:[border-color:var(--calculator-accent)] focus:ring-2 focus:[--tw-ring-color:var(--calculator-focus)]"
              >
                <option value={0}>0 decimals</option>
                <option value={1}>1 decimal</option>
                <option value={2}>2 decimals</option>
              </select>
            </div>

            {errors.copy && <p className="text-sm font-medium text-red-700">{errors.copy}</p>}

            <CalculatorWorking title="Cockcroft-Gault step-by-step arithmetic" lines={result.working} />
          </div>
        </CalculatorResult>
      )}

      <section aria-labelledby="selected-crcl-formula-heading" className="space-y-4 border-t border-gray-200 pt-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Selected equation explained</p>
          <h3 id="selected-crcl-formula-heading" className="mt-1 text-lg font-bold text-gray-950">
            How the Cockcroft-Gault equation works with {unit === "umol" ? "µmol/L" : "mg/dL"}
          </h3>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Change the serum creatinine unit above to update the denominator and explanation. The calculator inputs and actions stay first.
          </p>
        </div>

        <CalculatorEquation
          title={selectedFormula.heading}
          equation={selectedFormula.equation}
          spokenEquation={selectedFormula.spokenEquation}
          plainEnglish={selectedFormula.plainEnglish}
          variables={[
            { symbol: "CrCl", meaning: "estimated creatinine clearance in millilitres per minute" },
            { symbol: "age", meaning: "adult age in years" },
            { symbol: "weight", meaning: "the actively selected kilogram weight method required by the dosing reference" },
            { symbol: "sex factor", meaning: "1.0 for male or 0.85 for female in this equation" },
            { symbol: "SCr", meaning: `serum creatinine in ${unit === "umol" ? "µmol/L" : "mg/dL"}` },
          ]}
          theme="renal"
          headingLevel="h4"
        />

        <CalculatorNotice variant="neutral" title="Why the equation changes with the creatinine unit">
          The mg/dL version uses 72 in the denominator. The µmol/L version uses 0.814 because the creatinine unit has been converted. Correctly converted values should produce closely matching estimates, apart from rounding.
        </CalculatorNotice>
      </section>

      <CalculatorNotice variant="warning" title="Check the requested renal estimate and weight method before dosing">
        This calculator returns Cockcroft-Gault creatinine clearance in mL/min. It does not choose a medicine dose, decide the correct weight method, replace renal-trend review, or confirm whether CrCl rather than eGFR is required.
      </CalculatorNotice>

      <p className="text-center text-xs leading-5 text-gray-500">
        Adult educational calculator. Verify the requested renal-function estimate, creatinine unit, weight method, renal trend, medicine-specific guidance, and final order independently.
      </p>
    </CalculatorShell>
  )
}
