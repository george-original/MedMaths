"use client"

import { useRef, useState, type KeyboardEvent } from "react"
import { Scale } from "lucide-react"
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
  DEVINE_MAX_HEIGHT_CM,
  DEVINE_MIN_HEIGHT_CM,
  calculateDevineIbw,
  cmToFeetInches,
  devineFormulaDefinitions,
  feetInchesToCm,
  formatDevineNumber,
  isSupportedDevineHeight,
  type DevineCalculation,
  type DevineSex,
} from "@/lib/ideal-body-weight-formulas"

type HeightMode = "cm" | "ft-in"

type Errors = {
  heightCm?: string
  heightFt?: string
  heightIn?: string
  copy?: string
}

function parseNumber(value: string): number | null {
  const cleaned = value.replace(/,/g, "").trim()
  if (!cleaned) return null
  if (!/^(?:\d+\.?\d*|\.\d+)$/.test(cleaned)) return null

  const parsed = Number(cleaned)
  return Number.isFinite(parsed) ? parsed : null
}

export default function IdealBodyWeightClient() {
  const [sex, setSex] = useState<DevineSex>("male")
  const [heightMode, setHeightMode] = useState<HeightMode>("cm")
  const [heightCm, setHeightCm] = useState("")
  const [heightFt, setHeightFt] = useState("")
  const [heightIn, setHeightIn] = useState("")
  const [decimals, setDecimals] = useState(1)
  const [result, setResult] = useState<DevineCalculation | null>(null)
  const [errors, setErrors] = useState<Errors>({})

  const heightCmRef = useRef<HTMLInputElement>(null)
  const heightFtRef = useRef<HTMLInputElement>(null)
  const heightInRef = useRef<HTMLInputElement>(null)
  const resultRef = useResultReveal<HTMLDivElement>(result !== null)
  const selectedFormula = devineFormulaDefinitions[sex]

  function clearResult() {
    setResult(null)
    setErrors((current) => ({ ...current, copy: undefined }))
  }

  function resolveEnteredHeight(): number | null {
    if (heightMode === "cm") {
      return parseNumber(heightCm)
    }

    const feet = parseNumber(heightFt)
    const inches = heightIn.trim() === "" ? 0 : parseNumber(heightIn)
    if (feet === null || inches === null) return null
    return feetInchesToCm(feet, inches)
  }

  function changeSex(next: DevineSex) {
    setSex(next)
    setErrors((current) => ({ ...current, copy: undefined }))

    const resolvedHeightCm = resolveEnteredHeight()
    if (result !== null && resolvedHeightCm !== null && isSupportedDevineHeight(resolvedHeightCm)) {
      setResult(calculateDevineIbw(resolvedHeightCm, next))
      return
    }

    setResult(null)
  }

  function changeHeightMode(next: HeightMode) {
    if (next === heightMode) return

    if (next === "ft-in") {
      const parsedCm = parseNumber(heightCm)
      if (parsedCm !== null && parsedCm > 0) {
        const converted = cmToFeetInches(parsedCm)
        setHeightFt(String(converted.feet))
        setHeightIn(formatDevineNumber(converted.inches, 2))
      }
    } else {
      const feet = parseNumber(heightFt)
      const inches = heightIn.trim() === "" ? 0 : parseNumber(heightIn)
      if (feet !== null && inches !== null && feet >= 0 && inches >= 0) {
        setHeightCm(formatDevineNumber(feetInchesToCm(feet, inches), 2))
      }
    }

    setHeightMode(next)
    setErrors({})
    setResult(null)

    window.requestAnimationFrame(() => {
      if (next === "cm") heightCmRef.current?.focus()
      else heightFtRef.current?.focus()
    })
  }

  function validateHeight(): number | null {
    if (heightMode === "cm") {
      const parsedHeight = parseNumber(heightCm)
      if (parsedHeight === null) {
        setErrors({ heightCm: "Enter height using numbers only, such as 175." })
        heightCmRef.current?.focus()
        return null
      }
      if (!isSupportedDevineHeight(parsedHeight)) {
        setErrors({
          heightCm: `Enter an adult height from ${DEVINE_MIN_HEIGHT_CM} to ${DEVINE_MAX_HEIGHT_CM} cm. This calculator does not extrapolate the Devine equation below 5 feet.`,
        })
        heightCmRef.current?.focus()
        return null
      }
      return parsedHeight
    }

    const feet = parseNumber(heightFt)
    if (feet === null || !Number.isInteger(feet) || feet < 5 || feet > 8) {
      setErrors({ heightFt: "Enter whole feet from 5 to 8, such as 5." })
      heightFtRef.current?.focus()
      return null
    }

    const inches = heightIn.trim() === "" ? 0 : parseNumber(heightIn)
    if (inches === null || inches < 0 || inches >= 12) {
      setErrors({ heightIn: "Enter inches from 0 up to, but not including, 12. Decimals are allowed." })
      heightInRef.current?.focus()
      return null
    }

    const resolvedHeightCm = feetInchesToCm(feet, inches)
    if (!isSupportedDevineHeight(resolvedHeightCm)) {
      const maximumHeight = cmToFeetInches(DEVINE_MAX_HEIGHT_CM)
      setErrors({
        heightIn: `The combined height must be from 5 feet to ${maximumHeight.feet} feet ${formatDevineNumber(maximumHeight.inches, 2)} inches (${DEVINE_MAX_HEIGHT_CM} cm).`,
      })
      heightInRef.current?.focus()
      return null
    }

    return resolvedHeightCm
  }

  function calculate() {
    setErrors({})
    const resolvedHeightCm = validateHeight()
    if (resolvedHeightCm === null) return
    setResult(calculateDevineIbw(resolvedHeightCm, sex))
  }

  function reset() {
    setSex("male")
    setHeightMode("cm")
    setHeightCm("")
    setHeightFt("")
    setHeightIn("")
    setDecimals(1)
    setResult(null)
    setErrors({})
    window.requestAnimationFrame(() => heightCmRef.current?.focus())
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") calculate()
  }

  const displayedIbw = result ? formatDevineNumber(result.ibwKg, decimals) : ""

  return (
    <CalculatorShell
      id="ideal-body-weight-tool"
      theme="body"
      eyebrow="Clinical body-weight calculation"
      title="Calculate adult Devine ideal body weight"
      description="Select the male or female Devine equation, then enter an adult height of at least 5 feet (152.4 cm)."
      icon={<Scale className="size-5" />}
    >
      <div className="space-y-5">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-gray-900">Sex used by the Devine equation</p>
          <CalculatorSegmentedControl
            value={sex}
            onChange={changeSex}
            ariaLabel="Select male or female Devine equation"
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
            ]}
            className="w-full sm:w-auto"
          />
          <p className="text-xs leading-5 text-gray-500">
            The Devine equations use different base weights. Use the equation specified by the relevant clinical reference or protocol.
          </p>
        </div>

        <div className="space-y-2 border-t border-gray-200 pt-5">
          <p className="text-sm font-semibold text-gray-900">Height entry</p>
          <CalculatorSegmentedControl
            value={heightMode}
            onChange={changeHeightMode}
            ariaLabel="Choose height units"
            options={[
              { value: "cm", label: "Centimetres" },
              { value: "ft-in", label: "Feet + inches" },
            ]}
            className="w-full sm:w-auto"
          />
        </div>

        {heightMode === "cm" ? (
          <CalculatorField
            id="ibw-height-cm"
            label="Adult height"
            unit="cm"
            helperText={`Enter ${DEVINE_MIN_HEIGHT_CM} to ${DEVINE_MAX_HEIGHT_CM} cm without the unit, such as 175.`}
            error={errors.heightCm}
            required
          >
            <CalculatorInput
              ref={heightCmRef}
              type="text"
              inputMode="decimal"
              value={heightCm}
              onChange={(event) => {
                setHeightCm(event.target.value)
                setErrors((current) => ({ ...current, heightCm: undefined }))
                clearResult()
              }}
              onKeyDown={handleKeyDown}
              placeholder="e.g., 175"
              autoComplete="off"
            />
          </CalculatorField>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            <CalculatorField
              id="ibw-height-feet"
              label="Adult height"
              unit="feet"
              helperText="Enter whole feet from 5 to 8, such as 5."
              error={errors.heightFt}
              required
            >
              <CalculatorInput
                ref={heightFtRef}
                type="text"
                inputMode="numeric"
                value={heightFt}
                onChange={(event) => {
                  setHeightFt(event.target.value)
                  setErrors((current) => ({ ...current, heightFt: undefined }))
                  clearResult()
                }}
                onKeyDown={handleKeyDown}
                placeholder="e.g., 5"
                autoComplete="off"
              />
            </CalculatorField>

            <CalculatorField
              id="ibw-height-inches"
              label="Additional height"
              unit="inches"
              helperText="Enter 0 to less than 12. Decimals are allowed."
              error={errors.heightIn}
            >
              <CalculatorInput
                ref={heightInRef}
                type="text"
                inputMode="decimal"
                value={heightIn}
                onChange={(event) => {
                  setHeightIn(event.target.value)
                  setErrors((current) => ({ ...current, heightIn: undefined }))
                  clearResult()
                }}
                onKeyDown={handleKeyDown}
                placeholder="e.g., 10"
                autoComplete="off"
              />
            </CalculatorField>
          </div>
        )}

        <CalculatorNotice variant="neutral" title="Height limit for this calculator">
          The Devine equations use 5 feet as their reference point. This calculator does not calculate below 5 feet (152.4 cm); use the method specified by the applicable clinical protocol instead.
        </CalculatorNotice>
      </div>

      <CalculatorActions onCalculate={calculate} onReset={reset} />

      {result !== null && (
        <CalculatorResult
          ref={resultRef}
          label="Clinical ideal body weight (Devine)"
          value={displayedIbw}
          unit="kg"
          interpretation={`Exact calculator value: ${formatDevineNumber(result.ibwKg, 6)} kg. Displayed to ${decimals} decimal place${decimals === 1 ? "" : "s"} using the ${devineFormulaDefinitions[result.sex].name} equation.`}
          actions={
            <CalculatorCopyButton
              value={`Clinical ideal body weight (${devineFormulaDefinitions[result.sex].name}): ${displayedIbw} kg. Exact calculator value: ${formatDevineNumber(result.ibwKg, 6)} kg.`}
              onError={() => setErrors((current) => ({ ...current, copy: "Copy failed. Select and copy the result manually." }))}
            />
          }
        >
          <div className="space-y-4">
            <CalculatorNotice variant="neutral" title="What this result means">
              A result of {displayedIbw} kg is the height-based reference weight produced by the selected Devine equation. It is not the person&apos;s measured weight, a healthy target weight, or automatically the correct weight for a medication calculation.
            </CalculatorNotice>

            <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_180px] sm:items-end">
              <div>
                <label htmlFor="ibw-rounding" className="text-sm font-semibold text-gray-900">
                  Display rounding
                </label>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  This changes display only, not the underlying calculation or any protocol-specific rounding rule.
                </p>
              </div>
              <select
                id="ibw-rounding"
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

            <CalculatorWorking title={`${devineFormulaDefinitions[result.sex].name} step-by-step arithmetic`} lines={result.working} />
          </div>
        </CalculatorResult>
      )}

      <section aria-labelledby="selected-ibw-formula-heading" className="space-y-4 border-t border-gray-200 pt-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Selected equation explained</p>
          <h3 id="selected-ibw-formula-heading" className="mt-1 text-lg font-bold text-gray-950">
            How the {selectedFormula.name} equation works
          </h3>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Select male or female above to update this equation. The calculator remains first so the clinical reference weight can be obtained without reading the longer explanation.
          </p>
        </div>

        <CalculatorEquation
          title={selectedFormula.heading}
          equation={selectedFormula.equation}
          spokenEquation={selectedFormula.spokenEquation}
          plainEnglish={selectedFormula.plainEnglish}
          variables={[
            { symbol: "IBW", meaning: "ideal body weight returned by the Devine equation, in kilograms" },
            { symbol: "height", meaning: "adult height in inches; centimetres are divided by 2.54 first" },
            { symbol: "60", meaning: "60 inches, which equals 5 feet" },
            { symbol: "2.3", meaning: "kilograms added for each inch above 5 feet" },
          ]}
          theme="body"
          headingLevel="h4"
        />

        <CalculatorNotice variant="neutral" title="Why the male and female Devine results differ">
          Both equations add 2.3 kg for each inch above 5 feet. The male equation starts from 50 kg and the female equation starts from 45.5 kg, so the same height produces results that differ by 4.5 kg.
        </CalculatorNotice>
      </section>

      <CalculatorNotice variant="warning" title="Use the weight measure named by the protocol">
        This calculator returns Devine IBW only. It does not calculate adjusted body weight or ventilation predicted body weight, and it does not decide which body-weight measure a medicine requires.
      </CalculatorNotice>

      <p className="text-center text-xs leading-5 text-gray-500">
        Verify the selected Devine equation, height, required body-weight measure, and final calculation independently.
      </p>
    </CalculatorShell>
  )
}
