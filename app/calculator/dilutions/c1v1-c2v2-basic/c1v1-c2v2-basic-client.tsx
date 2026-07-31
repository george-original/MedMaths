"use client"

import { useRef, useState, type KeyboardEvent } from "react"
import { FlaskConical } from "lucide-react"
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
} from "@/components/calculator"
import { useResultReveal } from "@/hooks/use-result-reveal"
import { calculateMedicationDilution, type DilutionVariable } from "@/lib/c1v1-c2v2-formulas"
import { formatSafeNumber } from "@/lib/safe-number-format"

type SolveFor = DilutionVariable
type ConcentrationUnit = "mg/mL" | "mcg/mL" | "units/mL" | "%" | "mmol/L" | "same concentration units"
type VolumeUnit = "mL" | "L"

type Errors = {
  c1?: string
  v1?: string
  c2?: string
  v2?: string
  copy?: string
}

type Result = {
  solving: SolveFor
  value: number
  c1: number
  v1: number
  c2: number
  v2: number
  concentrationUnit: ConcentrationUnit
  volumeUnit: VolumeUnit
  diluentDifference: number
  working: string[]
}

function parseNumber(value: string): number | null {
  const cleaned = value.trim()
  if (!cleaned) return null
  if (!/^(?:\d+\.?\d*|\.\d+)$/.test(cleaned)) return null

  const parsed = Number(cleaned)
  return Number.isFinite(parsed) ? parsed : null
}

function formatNumber(value: number, decimals: number): string {
  return formatSafeNumber(value, decimals, { maxDecimals: 12 })
}

function resultLabel(solving: SolveFor): string {
  switch (solving) {
    case "V1":
      return "Stock solution volume required (V1)"
    case "V2":
      return "Final total volume (V2)"
    case "C1":
      return "Starting concentration (C1)"
    case "C2":
      return "Final concentration (C2)"
  }
}

function resultUnit(result: Result): string {
  return result.solving === "V1" || result.solving === "V2"
    ? result.volumeUnit
    : result.concentrationUnit
}

function inputError(label: string): string {
  return `Enter a positive ${label} using numbers only, such as 10 or 0.5.`
}

function calculateResult(
  solving: SolveFor,
  c1: number,
  v1: number,
  c2: number,
  v2: number,
  concentrationUnit: ConcentrationUnit,
  volumeUnit: VolumeUnit,
): Result {
  const calculated =
    solving === "V1"
      ? calculateMedicationDilution({ solving, c1, c2, v2 })
      : solving === "V2"
        ? calculateMedicationDilution({ solving, c1, v1, c2 })
        : solving === "C1"
          ? calculateMedicationDilution({ solving, v1, c2, v2 })
          : calculateMedicationDilution({ solving, c1, v1, v2 })

  const formula =
    solving === "V1"
      ? "V1 = (C2 × V2) ÷ C1"
      : solving === "V2"
        ? "V2 = (C1 × V1) ÷ C2"
        : solving === "C1"
          ? "C1 = (C2 × V2) ÷ V1"
          : "C2 = (C1 × V1) ÷ V2"

  const substitution =
    solving === "V1"
      ? `V1 = (${formatNumber(calculated.c2, 6)} × ${formatNumber(calculated.v2, 6)}) ÷ ${formatNumber(calculated.c1, 6)}`
      : solving === "V2"
        ? `V2 = (${formatNumber(calculated.c1, 6)} × ${formatNumber(calculated.v1, 6)}) ÷ ${formatNumber(calculated.c2, 6)}`
        : solving === "C1"
          ? `C1 = (${formatNumber(calculated.c2, 6)} × ${formatNumber(calculated.v2, 6)}) ÷ ${formatNumber(calculated.v1, 6)}`
          : `C2 = (${formatNumber(calculated.c1, 6)} × ${formatNumber(calculated.v1, 6)}) ÷ ${formatNumber(calculated.v2, 6)}`

  return {
    ...calculated,
    concentrationUnit,
    volumeUnit,
    working: [
      "C1 × V1 = C2 × V2",
      formula,
      substitution,
      `${solving} = ${formatNumber(calculated.value, 6)} ${solving.startsWith("V") ? volumeUnit : concentrationUnit}`,
      `Check: ${formatNumber(calculated.c1, 6)} × ${formatNumber(calculated.v1, 6)} = ${formatNumber(calculated.c2, 6)} × ${formatNumber(calculated.v2, 6)}`,
    ],
  }
}

export default function C1V1C2V2BasicClient() {
  const [solving, setSolving] = useState<SolveFor>("V1")
  const [c1, setC1] = useState("")
  const [v1, setV1] = useState("")
  const [c2, setC2] = useState("")
  const [v2, setV2] = useState("")
  const [concentrationUnit, setConcentrationUnit] = useState<ConcentrationUnit>("mg/mL")
  const [volumeUnit, setVolumeUnit] = useState<VolumeUnit>("mL")
  const [decimals, setDecimals] = useState(3)
  const [result, setResult] = useState<Result | null>(null)
  const [errors, setErrors] = useState<Errors>({})

  const c1Ref = useRef<HTMLInputElement>(null)
  const v1Ref = useRef<HTMLInputElement>(null)
  const c2Ref = useRef<HTMLInputElement>(null)
  const v2Ref = useRef<HTMLInputElement>(null)
  const resultRef = useResultReveal<HTMLDivElement>(result !== null)

  function clearResult() {
    setResult(null)
    setErrors((current) => ({ ...current, copy: undefined }))
  }

  function changeSolveFor(next: SolveFor) {
    setSolving(next)
    setErrors({})
    setResult(null)

    if (next === "C1") setC1("")
    if (next === "V1") setV1("")
    if (next === "C2") setC2("")
    if (next === "V2") setV2("")
  }

  function calculate() {
    const nextErrors: Errors = {}
    const parsedC1 = parseNumber(c1)
    const parsedV1 = parseNumber(v1)
    const parsedC2 = parseNumber(c2)
    const parsedV2 = parseNumber(v2)

    if (solving !== "C1" && (parsedC1 === null || parsedC1 <= 0)) {
      nextErrors.c1 = inputError("starting concentration")
    }
    if (solving !== "V1" && (parsedV1 === null || parsedV1 <= 0)) {
      nextErrors.v1 = inputError("stock volume")
    }
    if (solving !== "C2" && (parsedC2 === null || parsedC2 <= 0)) {
      nextErrors.c2 = inputError("target concentration")
    }
    if (solving !== "V2" && (parsedV2 === null || parsedV2 <= 0)) {
      nextErrors.v2 = inputError("final total volume")
    }

    setErrors(nextErrors)

    if (nextErrors.c1) {
      c1Ref.current?.focus()
      return
    }
    if (nextErrors.v1) {
      v1Ref.current?.focus()
      return
    }
    if (nextErrors.c2) {
      c2Ref.current?.focus()
      return
    }
    if (nextErrors.v2) {
      v2Ref.current?.focus()
      return
    }

    const nextResult = calculateResult(
      solving,
      parsedC1 ?? 1,
      parsedV1 ?? 1,
      parsedC2 ?? 1,
      parsedV2 ?? 1,
      concentrationUnit,
      volumeUnit,
    )

    if (!Number.isFinite(nextResult.value) || nextResult.value <= 0) {
      const targetField = solving.toLowerCase() as keyof Errors
      setErrors({ [targetField]: "The result could not be calculated. Recheck all values and matching units." })
      return
    }

    setResult(nextResult)
  }

  function reset() {
    setSolving("V1")
    setC1("")
    setV1("")
    setC2("")
    setV2("")
    setConcentrationUnit("mg/mL")
    setVolumeUnit("mL")
    setDecimals(3)
    setResult(null)
    setErrors({})
    window.requestAnimationFrame(() => c1Ref.current?.focus())
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") calculate()
  }

  const displayedResult = result ? formatNumber(result.value, decimals) : ""
  const isVolumeResult = result !== null && (result.solving === "V1" || result.solving === "V2")
  const targetStrongerThanStock = result !== null && result.c2 > result.c1 * (1 + 1e-10)
  const sameConcentration = result !== null && Math.abs(result.c2 - result.c1) <= Math.max(result.c1, result.c2) * 1e-10
  const negativeDiluent = result !== null && result.diluentDifference < -1e-10
  const verySmallVolume = result !== null && isVolumeResult && result.value < 0.05 && result.volumeUnit === "mL"
  const resultStatus = targetStrongerThanStock || negativeDiluent ? "danger" : sameConcentration || verySmallVolume ? "warning" : "default"

  const interpretation = result
    ? result.solving === "V1"
      ? `The calculated stock-solution volume is ${displayedResult} ${result.volumeUnit} for a verified final total volume of ${formatNumber(result.v2, decimals)} ${result.volumeUnit} at ${formatNumber(result.c2, decimals)} ${result.concentrationUnit}.`
      : result.solving === "V2"
        ? `The arithmetic final total volume is ${displayedResult} ${result.volumeUnit} when ${formatNumber(result.v1, decimals)} ${result.volumeUnit} of the starting solution is diluted to ${formatNumber(result.c2, decimals)} ${result.concentrationUnit}.`
        : result.solving === "C1"
          ? `The implied starting concentration is ${displayedResult} ${result.concentrationUnit}.`
          : `The calculated final concentration is ${displayedResult} ${result.concentrationUnit}.`
    : ""

  const copyValue = result
    ? `${resultLabel(result.solving)}: ${displayedResult} ${resultUnit(result)}. C1 ${formatNumber(result.c1, decimals)} ${result.concentrationUnit}; V1 ${formatNumber(result.v1, decimals)} ${result.volumeUnit}; C2 ${formatNumber(result.c2, decimals)} ${result.concentrationUnit}; V2 ${formatNumber(result.v2, decimals)} ${result.volumeUnit}.`
    : ""

  return (
    <CalculatorShell
      id="c1v1-c2v2-tool"
      theme="dilution"
      eyebrow="Dilutions"
      title="Calculate a medication dilution"
      description="Choose the missing value. C1 and C2 must describe the same medicine or solute using the same concentration basis, and V2 must be the final total volume."
      icon={<FlaskConical className="size-5" />}
    >
      <CalculatorNotice variant="warning" title="Medication dilution arithmetic only">
        Use this equation only when C1 and C2 describe the same medicine or solute and use matching concentration units. V2 is the verified final total volume, not only the diluent added. Product information, pharmacy guidance, and local policy control the permitted diluent, concentration, route, stability, and preparation method.
      </CalculatorNotice>

      <div className="space-y-5">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-gray-900">Solve for the missing value</p>
          <CalculatorSegmentedControl
            value={solving}
            onChange={changeSolveFor}
            ariaLabel="Choose the missing dilution value"
            options={[
              { value: "V1", label: "V1" },
              { value: "V2", label: "V2" },
              { value: "C2", label: "C2" },
              { value: "C1", label: "C1" },
            ]}
            className="w-full sm:w-auto"
          />
          <p className="text-xs leading-5 text-gray-500">{resultLabel(solving)} is calculated. Enter the other three values.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <CalculatorField
            id="c1v1-concentration-unit"
            label="Concentration unit for C1 and C2"
            helperText="Both values must describe the same medicine or solute and use the same concentration unit and basis."
            required
          >
            <CalculatorSelect
              value={concentrationUnit}
              onChange={(event) => {
                setConcentrationUnit(event.target.value as ConcentrationUnit)
                clearResult()
              }}
            >
              <option value="mg/mL">mg/mL</option>
              <option value="mcg/mL">mcg/mL</option>
              <option value="units/mL">units/mL</option>
              <option value="%">%</option>
              <option value="mmol/L">mmol/L</option>
              <option value="same concentration units">Other matching concentration units</option>
            </CalculatorSelect>
          </CalculatorField>

          <CalculatorField
            id="c1v1-volume-unit"
            label="Volume unit for V1 and V2"
            helperText="Both volume values must use the same unit."
            required
          >
            <CalculatorSelect
              value={volumeUnit}
              onChange={(event) => {
                setVolumeUnit(event.target.value as VolumeUnit)
                clearResult()
              }}
            >
              <option value="mL">mL</option>
              <option value="L">L</option>
            </CalculatorSelect>
          </CalculatorField>
        </div>

        {concentrationUnit === "%" && (
          <CalculatorNotice variant="neutral" title="Percent concentrations must use the same basis">
            Confirm that C1 and C2 represent the same kind of percentage, such as both % w/v. A matching percent symbol alone does not prove the concentration definitions are equivalent.
          </CalculatorNotice>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <CalculatorField
            id="c1v1-c1"
            label="C1 — stock medicine concentration"
            unit={concentrationUnit}
            helperText={solving === "C1" ? "This is the value the calculator will solve." : "Enter the verified concentration of the starting medicine or solution."}
            error={errors.c1}
            required={solving !== "C1"}
          >
            <CalculatorInput
              ref={c1Ref}
              type="text"
              value={solving === "C1" ? "" : c1}
              onChange={(event) => {
                setC1(event.target.value)
                setErrors((current) => ({ ...current, c1: undefined }))
                clearResult()
              }}
              onKeyDown={handleKeyDown}
              placeholder={solving === "C1" ? "Calculated" : "e.g., 10"}
              disabled={solving === "C1"}
              autoComplete="off"
            />
          </CalculatorField>

          <CalculatorField
            id="c1v1-v1"
            label="V1 — stock solution volume"
            unit={volumeUnit}
            helperText={solving === "V1" ? "This is the value the calculator will solve." : "Enter the volume withdrawn from the starting solution."}
            error={errors.v1}
            required={solving !== "V1"}
          >
            <CalculatorInput
              ref={v1Ref}
              type="text"
              value={solving === "V1" ? "" : v1}
              onChange={(event) => {
                setV1(event.target.value)
                setErrors((current) => ({ ...current, v1: undefined }))
                clearResult()
              }}
              onKeyDown={handleKeyDown}
              placeholder={solving === "V1" ? "Calculated" : "e.g., 5"}
              disabled={solving === "V1"}
              autoComplete="off"
            />
          </CalculatorField>

          <CalculatorField
            id="c1v1-c2"
            label="C2 — intended final concentration"
            unit={concentrationUnit}
            helperText={solving === "C2" ? "This is the value the calculator will solve." : "Enter the intended final concentration from the medicine source or preparation instruction."}
            error={errors.c2}
            required={solving !== "C2"}
          >
            <CalculatorInput
              ref={c2Ref}
              type="text"
              value={solving === "C2" ? "" : c2}
              onChange={(event) => {
                setC2(event.target.value)
                setErrors((current) => ({ ...current, c2: undefined }))
                clearResult()
              }}
              onKeyDown={handleKeyDown}
              placeholder={solving === "C2" ? "Calculated" : "e.g., 1"}
              disabled={solving === "C2"}
              autoComplete="off"
            />
          </CalculatorField>

          <CalculatorField
            id="c1v1-v2"
            label="V2 — verified final total volume"
            unit={volumeUnit}
            helperText={solving === "V2" ? "This is the value the calculator will solve." : "Enter the verified total volume after preparation, not only the diluent volume."}
            error={errors.v2}
            required={solving !== "V2"}
          >
            <CalculatorInput
              ref={v2Ref}
              type="text"
              value={solving === "V2" ? "" : v2}
              onChange={(event) => {
                setV2(event.target.value)
                setErrors((current) => ({ ...current, v2: undefined }))
                clearResult()
              }}
              onKeyDown={handleKeyDown}
              placeholder={solving === "V2" ? "Calculated" : "e.g., 50"}
              disabled={solving === "V2"}
              autoComplete="off"
            />
          </CalculatorField>
        </div>
      </div>

      <CalculatorActions onCalculate={calculate} onReset={reset} />

      {result !== null && (
        <CalculatorResult
          ref={resultRef}
          label={resultLabel(result.solving)}
          value={displayedResult}
          unit={resultUnit(result)}
          status={resultStatus}
          badge={<span className="rounded-full border border-current/20 bg-white/70 px-2 py-0.5 text-xs font-semibold">{result.solving}</span>}
          interpretation={interpretation}
          actions={
            <CalculatorCopyButton
              value={copyValue}
              onError={() => setErrors((current) => ({ ...current, copy: "Copy failed. Select and copy the result manually." }))}
            />
          }
        >
          <div className="space-y-3">
            {(targetStrongerThanStock || negativeDiluent) && (
              <CalculatorNotice variant="danger" title="This is not a standard dilution by adding diluent">
                The final concentration is higher than the starting concentration, or the calculated stock volume is greater than the final total volume. Adding diluent cannot create a stronger solution. Recheck the medicine, concentration basis, C1, C2, V1, V2, and every unit before using the result.
              </CalculatorNotice>
            )}

            {sameConcentration && (
              <CalculatorNotice variant="warning" title="No concentration change">
                C1 and C2 are the same, so the equation describes no dilution. Recheck whether a different target concentration was intended.
              </CalculatorNotice>
            )}

            {verySmallVolume && (
              <CalculatorNotice variant="warning" title="Very small calculated volume">
                Recheck the concentration, units, and preparation instructions. Do not automatically round this result or choose a device from the number alone. Confirm an appropriate preparation method, concentration, and measuring device through the product information, pharmacy guidance, and local policy.
              </CalculatorNotice>
            )}

            {result.diluentDifference >= -1e-10 && (
              <CalculatorNotice variant="theme" title="Arithmetic diluent difference">
                V2 − V1 = {formatNumber(Math.max(0, result.diluentDifference), decimals)} {result.volumeUnit}. This is only the arithmetic difference between final total volume and stock volume. Do not treat it as an instruction to add that exact amount: some products require making up to a final volume, account for displacement, or specify a different preparation sequence.
              </CalculatorNotice>
            )}

            <CalculatorNotice variant="neutral" title="Preparation safety check">
              Confirm the medication order, product label or monograph, permitted diluent, compatibility, route, final concentration, stability, aseptic requirements, and required independent check. C1V1 = C2V2 does not decide whether the preparation is clinically appropriate.
            </CalculatorNotice>

            <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_180px] sm:items-end">
              <div>
                <label htmlFor="c1v1-rounding" className="text-sm font-semibold text-gray-900">
                  Display rounding
                </label>
                <p className="mt-1 text-xs leading-5 text-gray-500">Rounding changes the display only, not the stored calculation. Small non-zero values keep enough decimals to remain visible.</p>
              </div>
              <CalculatorSelect id="c1v1-rounding" value={decimals} onChange={(event) => setDecimals(Number(event.target.value))}>
                <option value={0}>Whole number (non-zero preserved)</option>
                <option value={1}>1 decimal</option>
                <option value={2}>2 decimals</option>
                <option value={3}>3 decimals</option>
                <option value={4}>4 decimals</option>
              </CalculatorSelect>
            </div>

            <CalculatorWorking title="C1V1 = C2V2 working" lines={result.working} />
            {errors.copy && <p role="alert" className="text-xs font-medium text-red-700">{errors.copy}</p>}
          </div>
        </CalculatorResult>
      )}
    </CalculatorShell>
  )
}
