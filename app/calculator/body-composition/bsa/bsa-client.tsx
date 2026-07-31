"use client"

import { useRef, useState, type KeyboardEvent } from "react"
import { Ruler } from "lucide-react"
import {
  CalculatorActions,
  CalculatorCopyButton,
  CalculatorEquation,
  CalculatorField,
  CalculatorInput,
  CalculatorNotice,
  CalculatorResult,
  CalculatorSelect,
  CalculatorShell,
  CalculatorWorking,
} from "@/components/calculator"
import { useResultReveal } from "@/hooks/use-result-reveal"
import {
  bsaFormulaDefinitions,
  bsaFormulaOrder,
  calculateBsa,
  calculateBsaValue,
  formatBsaNumber,
  type BsaCalculation,
  type BsaFormulaKey,
} from "@/lib/bsa-formulas"
import {
  centimetresToFeetAndInches,
  feetAndInchesToCentimetres,
  kilogramsToPounds,
  poundsToKilograms,
  type MeasurementSystem,
} from "@/lib/measurement-conversions"

type Errors = {
  height?: string
  inches?: string
  weight?: string
  copy?: string
}

type NormalisedInputs = {
  heightCm: number
  weightKg: number
  inputSummary: string
  conversionWorking: string[]
}

const MIN_HEIGHT_CM = 40
const MAX_HEIGHT_CM = 250
const MIN_WEIGHT_KG = 2
const MAX_WEIGHT_KG = 400
const MIN_WEIGHT_LB = kilogramsToPounds(MIN_WEIGHT_KG)
const MAX_WEIGHT_LB = kilogramsToPounds(MAX_WEIGHT_KG)

function parseNumber(value: string): number | null {
  const cleaned = value.trim()
  if (!cleaned) return null
  if (!/^(?:\d+\.?\d*|\.\d+)$/.test(cleaned)) return null

  const parsed = Number(cleaned)
  return Number.isFinite(parsed) ? parsed : null
}

function formatInputValue(value: number, decimals: number): string {
  return value.toFixed(decimals).replace(/\.?0+$/, "")
}

export default function BSAClient() {
  const [measurementSystem, setMeasurementSystem] = useState<MeasurementSystem>("metric")
  const [heightCmInput, setHeightCmInput] = useState("")
  const [weightKgInput, setWeightKgInput] = useState("")
  const [heightFeetInput, setHeightFeetInput] = useState("")
  const [heightInchesInput, setHeightInchesInput] = useState("")
  const [weightLbInput, setWeightLbInput] = useState("")
  const [formula, setFormula] = useState<BsaFormulaKey>("mosteller")
  const [decimals, setDecimals] = useState(2)
  const [result, setResult] = useState<BsaCalculation | null>(null)
  const [errors, setErrors] = useState<Errors>({})

  const heightCmRef = useRef<HTMLInputElement>(null)
  const heightFeetRef = useRef<HTMLInputElement>(null)
  const heightInchesRef = useRef<HTMLInputElement>(null)
  const weightKgRef = useRef<HTMLInputElement>(null)
  const weightLbRef = useRef<HTMLInputElement>(null)
  const resultRef = useResultReveal<HTMLDivElement>(result !== null)
  const selectedFormula = bsaFormulaDefinitions[formula]

  function clearResult() {
    setResult(null)
    setErrors((current) => ({ ...current, copy: undefined }))
  }

  function getNormalisedInputs(): NormalisedInputs | null {
    if (measurementSystem === "metric") {
      const heightCm = parseNumber(heightCmInput)
      const weightKg = parseNumber(weightKgInput)
      if (heightCm === null || heightCm < MIN_HEIGHT_CM || heightCm > MAX_HEIGHT_CM) return null
      if (weightKg === null || weightKg < MIN_WEIGHT_KG || weightKg > MAX_WEIGHT_KG) return null

      return {
        heightCm,
        weightKg,
        inputSummary: `${formatBsaNumber(heightCm, 2)} cm and ${formatBsaNumber(weightKg, 2)} kg`,
        conversionWorking: [],
      }
    }

    const feet = parseNumber(heightFeetInput)
    const inches = parseNumber(heightInchesInput)
    const pounds = parseNumber(weightLbInput)
    if (feet === null || !Number.isInteger(feet) || feet < 1 || feet > 8) return null
    if (inches === null || inches < 0 || inches >= 12) return null
    if (pounds === null || pounds < MIN_WEIGHT_LB || pounds > MAX_WEIGHT_LB) return null

    const heightCm = feetAndInchesToCentimetres(feet, inches)
    const weightKg = poundsToKilograms(pounds)
    if (heightCm < MIN_HEIGHT_CM || heightCm > MAX_HEIGHT_CM) return null
    if (weightKg < MIN_WEIGHT_KG || weightKg > MAX_WEIGHT_KG) return null

    return {
      heightCm,
      weightKg,
      inputSummary: `${formatBsaNumber(feet, 0)} ft ${formatBsaNumber(inches, 2)} in and ${formatBsaNumber(pounds, 2)} lb`,
      conversionWorking: [
        `Height = (${formatBsaNumber(feet, 0)} × 30.48) + (${formatBsaNumber(inches, 2)} × 2.54) = ${formatBsaNumber(heightCm, 4)} cm`,
        `Weight = ${formatBsaNumber(pounds, 2)} × 0.45359237 = ${formatBsaNumber(weightKg, 4)} kg`,
      ],
    }
  }

  function changeFormula(nextFormula: BsaFormulaKey) {
    setFormula(nextFormula)
    setErrors((current) => ({ ...current, copy: undefined }))

    const inputs = getNormalisedInputs()
    if (result !== null && inputs) {
      setResult(
        calculateBsa(inputs.heightCm, inputs.weightKg, nextFormula, {
          measurementSystem,
          inputSummary: inputs.inputSummary,
          conversionWorking: inputs.conversionWorking,
        }),
      )
      return
    }

    setResult(null)
  }

  function changeMeasurementSystem(nextSystem: MeasurementSystem) {
    if (nextSystem === measurementSystem) return

    const currentInputs = getNormalisedInputs()
    if (currentInputs) {
      if (nextSystem === "imperial") {
        const convertedHeight = centimetresToFeetAndInches(currentInputs.heightCm)
        setHeightFeetInput(String(convertedHeight.feet))
        setHeightInchesInput(formatInputValue(convertedHeight.inches, 2))
        setWeightLbInput(formatInputValue(kilogramsToPounds(currentInputs.weightKg), 1))
      } else {
        setHeightCmInput(formatInputValue(currentInputs.heightCm, 2))
        setWeightKgInput(formatInputValue(currentInputs.weightKg, 2))
      }
    }

    setMeasurementSystem(nextSystem)
    setResult(null)
    setErrors({})
    window.requestAnimationFrame(() => {
      if (nextSystem === "metric") heightCmRef.current?.focus()
      else heightFeetRef.current?.focus()
    })
  }

  function calculate() {
    const nextErrors: Errors = {}

    if (measurementSystem === "metric") {
      const heightCm = parseNumber(heightCmInput)
      const weightKg = parseNumber(weightKgInput)

      if (heightCm === null || heightCm < MIN_HEIGHT_CM || heightCm > MAX_HEIGHT_CM) {
        nextErrors.height = `Enter height from ${MIN_HEIGHT_CM} to ${MAX_HEIGHT_CM} cm using numbers only, such as 170.`
      }
      if (weightKg === null || weightKg < MIN_WEIGHT_KG || weightKg > MAX_WEIGHT_KG) {
        nextErrors.weight = `Enter weight from ${MIN_WEIGHT_KG} to ${MAX_WEIGHT_KG} kg using numbers only, such as 70.`
      }
    } else {
      const feet = parseNumber(heightFeetInput)
      const inches = parseNumber(heightInchesInput)
      const pounds = parseNumber(weightLbInput)

      if (feet === null || !Number.isInteger(feet) || feet < 1 || feet > 8) {
        nextErrors.height = "Enter whole feet from 1 to 8, such as 5."
      }
      if (inches === null || inches < 0 || inches >= 12) {
        nextErrors.inches = "Enter inches from 0 to less than 12, such as 7."
      }
      if (pounds === null || pounds < MIN_WEIGHT_LB || pounds > MAX_WEIGHT_LB) {
        nextErrors.weight = `Enter weight from ${formatBsaNumber(MIN_WEIGHT_LB, 1)} to ${formatBsaNumber(MAX_WEIGHT_LB, 1)} lb using numbers only, such as 154.`
      }

      if (!nextErrors.height && !nextErrors.inches && feet !== null && inches !== null) {
        const convertedHeight = feetAndInchesToCentimetres(feet, inches)
        if (convertedHeight < MIN_HEIGHT_CM || convertedHeight > MAX_HEIGHT_CM) {
          nextErrors.height = `Enter a combined height equivalent to ${MIN_HEIGHT_CM} to ${MAX_HEIGHT_CM} cm.`
        }
      }
    }

    setErrors(nextErrors)

    if (nextErrors.height) {
      if (measurementSystem === "metric") heightCmRef.current?.focus()
      else heightFeetRef.current?.focus()
      return
    }
    if (nextErrors.inches) {
      heightInchesRef.current?.focus()
      return
    }
    if (nextErrors.weight) {
      if (measurementSystem === "metric") weightKgRef.current?.focus()
      else weightLbRef.current?.focus()
      return
    }

    const inputs = getNormalisedInputs()
    if (!inputs) return

    setResult(
      calculateBsa(inputs.heightCm, inputs.weightKg, formula, {
        measurementSystem,
        inputSummary: inputs.inputSummary,
        conversionWorking: inputs.conversionWorking,
      }),
    )
  }

  function reset() {
    setMeasurementSystem("metric")
    setHeightCmInput("")
    setWeightKgInput("")
    setHeightFeetInput("")
    setHeightInchesInput("")
    setWeightLbInput("")
    setFormula("mosteller")
    setDecimals(2)
    setResult(null)
    setErrors({})
    window.requestAnimationFrame(() => heightCmRef.current?.focus())
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") calculate()
  }

  const isSmallBodySize = result !== null && (result.heightCm < 100 || result.weightKg < 20)
  const isLargeBodySize = result !== null && result.weightKg > 200
  const unusualBsa = result !== null && (result.bsa < 0.3 || result.bsa > 3.5)
  const resultStatus = unusualBsa ? "warning" : "default"
  const displayedBsa = result ? formatBsaNumber(result.bsa, decimals) : ""
  const comparisonResults =
    result === null
      ? []
      : bsaFormulaOrder.map((key) => ({
          key,
          name: bsaFormulaDefinitions[key].name,
          value: calculateBsaValue(result.heightCm, result.weightKg, key),
        }))

  return (
    <CalculatorShell
      id="bsa-tool"
      theme="body"
      eyebrow="Body composition"
      title="Calculate body surface area from height and weight"
      description="Choose the required formula and enter metric or imperial measurements. Imperial values are converted to centimetres and kilograms before the published formula is applied."
      icon={<Ruler className="size-5" />}
    >
      <div className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <CalculatorField
            id="bsa-formula"
            label="BSA formula"
            helperText="Choose the formula required by the medication protocol, clinical reference, or local policy."
            required
          >
            <CalculatorSelect
              value={formula}
              onChange={(event) => changeFormula(event.target.value as BsaFormulaKey)}
            >
              <option value="mosteller">Mosteller</option>
              <option value="dubois">Du Bois &amp; Du Bois</option>
              <option value="haycock">Haycock</option>
              <option value="gehan">Gehan &amp; George</option>
            </CalculatorSelect>
          </CalculatorField>

          <CalculatorField
            id="bsa-measurement-system"
            label="Measurement system"
            helperText="Choose metric or imperial inputs. The formula itself always uses cm and kg."
            required
          >
            <CalculatorSelect
              value={measurementSystem}
              onChange={(event) => changeMeasurementSystem(event.target.value as MeasurementSystem)}
            >
              <option value="metric">Metric (cm and kg)</option>
              <option value="imperial">Imperial (ft, in and lb)</option>
            </CalculatorSelect>
          </CalculatorField>
        </div>

        {measurementSystem === "metric" ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <CalculatorField
              id="bsa-height"
              label="Height"
              unit="cm"
              helperText="Enter centimetres without the unit, such as 170."
              error={errors.height}
              required
            >
              <CalculatorInput
                ref={heightCmRef}
                type="text"
                value={heightCmInput}
                onChange={(event) => {
                  setHeightCmInput(event.target.value)
                  setErrors((current) => ({ ...current, height: undefined }))
                  clearResult()
                }}
                onKeyDown={handleKeyDown}
                placeholder="e.g., 170"
                autoComplete="off"
                inputMode="decimal"
              />
            </CalculatorField>

            <CalculatorField
              id="bsa-weight"
              label="Weight"
              unit="kg"
              helperText="Enter kilograms without the unit, such as 70."
              error={errors.weight}
              required
            >
              <CalculatorInput
                ref={weightKgRef}
                type="text"
                value={weightKgInput}
                onChange={(event) => {
                  setWeightKgInput(event.target.value)
                  setErrors((current) => ({ ...current, weight: undefined }))
                  clearResult()
                }}
                onKeyDown={handleKeyDown}
                placeholder="e.g., 70"
                autoComplete="off"
                inputMode="decimal"
              />
            </CalculatorField>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-3">
            <CalculatorField
              id="bsa-height-feet"
              label="Height"
              unit="ft"
              helperText="Enter whole feet, such as 5."
              error={errors.height}
              required
            >
              <CalculatorInput
                ref={heightFeetRef}
                type="text"
                value={heightFeetInput}
                onChange={(event) => {
                  setHeightFeetInput(event.target.value)
                  setErrors((current) => ({ ...current, height: undefined }))
                  clearResult()
                }}
                onKeyDown={handleKeyDown}
                placeholder="e.g., 5"
                autoComplete="off"
                inputMode="numeric"
              />
            </CalculatorField>

            <CalculatorField
              id="bsa-height-inches"
              label="Height"
              unit="in"
              helperText="Enter remaining inches from 0 to less than 12."
              error={errors.inches}
              required
            >
              <CalculatorInput
                ref={heightInchesRef}
                type="text"
                value={heightInchesInput}
                onChange={(event) => {
                  setHeightInchesInput(event.target.value)
                  setErrors((current) => ({ ...current, inches: undefined }))
                  clearResult()
                }}
                onKeyDown={handleKeyDown}
                placeholder="e.g., 7"
                autoComplete="off"
                inputMode="decimal"
              />
            </CalculatorField>

            <CalculatorField
              id="bsa-weight-lb"
              label="Weight"
              unit="lb"
              helperText="Enter pounds without the unit, such as 154."
              error={errors.weight}
              required
            >
              <CalculatorInput
                ref={weightLbRef}
                type="text"
                value={weightLbInput}
                onChange={(event) => {
                  setWeightLbInput(event.target.value)
                  setErrors((current) => ({ ...current, weight: undefined }))
                  clearResult()
                }}
                onKeyDown={handleKeyDown}
                placeholder="e.g., 154"
                autoComplete="off"
                inputMode="decimal"
              />
            </CalculatorField>
          </div>
        )}

        <CalculatorNotice variant="neutral" title="Formula units">
          All four published formulas use height in centimetres and weight in kilograms. Imperial entries are converted first, and those conversion steps appear in the working.
        </CalculatorNotice>
      </div>

      <CalculatorActions onCalculate={calculate} onReset={reset} />

      {result !== null && (
        <CalculatorResult
          ref={resultRef}
          label="Body surface area"
          value={displayedBsa}
          unit="m²"
          status={resultStatus}
          interpretation={`Input: ${result.inputSummary}. Formula inputs: ${result.metricInputSummary}. Exact calculator value: ${formatBsaNumber(result.bsa, 6)} m². Displayed to ${decimals} decimal place${decimals === 1 ? "" : "s"} using the ${result.formulaName} formula.`}
          actions={
            <CalculatorCopyButton
              value={`Body surface area (${result.formulaName}): ${displayedBsa} m². Input: ${result.inputSummary}. Formula inputs: ${result.metricInputSummary}. Exact calculator value: ${formatBsaNumber(result.bsa, 6)} m².`}
              onError={() => setErrors((current) => ({ ...current, copy: "Copy failed. Select and copy the result manually." }))}
            />
          }
        >
          <div className="space-y-4">
            <CalculatorNotice variant="neutral" title="What this result means">
              A result of {displayedBsa} m² means the estimated body surface area is {displayedBsa} square metres. It is not the medication dose. A prescribed dose per square metre is still required for an mg/m² calculation.
            </CalculatorNotice>

            {result.measurementSystem === "imperial" && (
              <CalculatorNotice variant="neutral" title="Imperial measurements converted">
                The entered measurements ({result.inputSummary}) were converted to {result.metricInputSummary} before the {result.formulaName} equation was applied.
              </CalculatorNotice>
            )}

            {unusualBsa && (
              <CalculatorNotice variant="warning" title="Broad plausibility check">
                This result is outside the calculator's broad review range. This is not a diagnostic or clinical reference range. Recheck height, weight, units, and the selected formula, then follow the relevant protocol rather than changing the value automatically.
              </CalculatorNotice>
            )}

            {isSmallBodySize && !unusualBsa && (
              <CalculatorNotice variant="neutral" title="Small body-size input">
                Confirm that the selected formula and any dose-rounding or maximum-dose rules are appropriate for the patient group. Paediatric and small-body-size protocols can differ.
              </CalculatorNotice>
            )}

            {isLargeBodySize && !unusualBsa && (
              <CalculatorNotice variant="neutral" title="Large body-size input">
                Do not apply a BSA cap or substitute another weight unless the medicine protocol explicitly requires it. The calculator reports the uncapped arithmetic result.
              </CalculatorNotice>
            )}

            <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_180px] sm:items-end">
              <div>
                <label htmlFor="bsa-rounding" className="text-sm font-semibold text-gray-900">
                  Display rounding
                </label>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  This changes display only. Medication protocols may use their own BSA and dose-rounding rules.
                </p>
              </div>
              <select
                id="bsa-rounding"
                value={decimals}
                onChange={(event) => setDecimals(Number(event.target.value))}
                className="h-11 w-full rounded-xl border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none focus:[border-color:var(--calculator-accent)] focus:ring-2 focus:[--tw-ring-color:var(--calculator-focus)]"
              >
                <option value={2}>2 decimals</option>
                <option value={3}>3 decimals</option>
                <option value={4}>4 decimals</option>
              </select>
            </div>

            {errors.copy && <p className="text-sm font-medium text-red-700">{errors.copy}</p>}

            <CalculatorWorking title={`${result.formulaName} step-by-step arithmetic`} lines={result.working} />

            <section aria-labelledby="bsa-formula-comparison-heading" className="rounded-xl border border-gray-200 bg-white p-4">
              <h3 id="bsa-formula-comparison-heading" className="text-sm font-semibold text-gray-950">
                Same height and weight calculated with all four formulas
              </h3>
              <p className="mt-1 text-xs leading-5 text-gray-600">
                Small differences occur because each equation applies different constants and mathematical powers.
              </p>
              <div className="mt-3 overflow-hidden rounded-lg border border-gray-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                    <tr>
                      <th scope="col" className="px-3 py-2 font-semibold">Formula</th>
                      <th scope="col" className="px-3 py-2 text-right font-semibold">BSA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {comparisonResults.map((comparison) => (
                      <tr key={comparison.key} className={comparison.key === result.formulaKey ? "bg-emerald-50" : "bg-white"}>
                        <th scope="row" className="px-3 py-2 font-medium text-gray-900">
                          {comparison.name}
                          {comparison.key === result.formulaKey && (
                            <span className="ml-2 text-xs font-semibold text-emerald-700">Selected</span>
                          )}
                        </th>
                        <td className="px-3 py-2 text-right font-mono text-gray-800">
                          {formatBsaNumber(comparison.value, 3)} m²
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </CalculatorResult>
      )}

      <section aria-labelledby="selected-bsa-formula-heading" className="space-y-4 border-t border-gray-200 pt-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Selected formula explained</p>
          <h3 id="selected-bsa-formula-heading" className="mt-1 text-lg font-bold text-gray-950">
            How the {selectedFormula.name} formula works
          </h3>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Select a different method above to update this explanation. Any calculated result uses the selected formula and the same converted height and weight.
          </p>
        </div>

        <CalculatorEquation
          title={selectedFormula.heading}
          equation={selectedFormula.equation}
          spokenEquation={selectedFormula.spokenEquation}
          plainEnglish={selectedFormula.plainEnglish}
          variables={[
            { symbol: "BSA", meaning: "body surface area in square metres (m²)" },
            { symbol: "height", meaning: "height in centimetres (cm)" },
            { symbol: "weight", meaning: "weight in kilograms (kg)" },
          ]}
          theme="body"
          headingLevel="h4"
        />

        <CalculatorNotice variant="neutral" title={`How ${selectedFormula.name} differs`}>
          {selectedFormula.difference} Use the equation specified by the medication protocol, clinical reference, or local policy.
        </CalculatorNotice>
      </section>

      <CalculatorNotice variant="warning" title="Use the formula and dosing rules named by the protocol">
        This calculator returns body surface area only. It does not decide whether a medicine dose should be rounded, capped, reduced, or calculated from a different weight.
      </CalculatorNotice>

      <p className="text-center text-xs leading-5 text-gray-500">
        BSA is a calculated estimate. For medication dosing, verify the prescribed mg/m² instruction, selected formula, body-weight input, protocol limits, and final dose independently.
      </p>
    </CalculatorShell>
  )
}
