"use client"

import { useRef, useState, type KeyboardEvent } from "react"
import { Droplets } from "lucide-react"
import {
  CalculatorActions,
  CalculatorCopyButton,
  CalculatorField,
  CalculatorInput,
  CalculatorNotice,
  CalculatorResult,
  CalculatorSelect,
  CalculatorShell,
  CalculatorWorking,
} from "@/components/calculator"
import { useResultReveal } from "@/hooks/use-result-reveal"
import { formatSafeNumber } from "@/lib/safe-number-format"

type Errors = {
  dripRate?: string
  dropFactor?: string
  copy?: string
}

function parseNumber(value: string): number | null {
  const cleaned = value.replace(/,/g, "").trim()
  if (!cleaned) return null
  if (!/^(?:\d+\.?\d*|\.\d+)$/.test(cleaned)) return null

  const parsed = Number(cleaned)
  return Number.isFinite(parsed) ? parsed : null
}

function formatNumber(value: number, decimals = 2): string {
  return formatSafeNumber(value, decimals, { maxDecimals: 12 })
}

function getPacingText(dropsPerMinute: number): string {
  if (dropsPerMinute <= 0) return "The entered drip rate is not positive."

  if (dropsPerMinute <= 60) {
    const secondsPerDrop = 60 / dropsPerMinute
    return `The entered rate is approximately 1 drop every ${formatNumber(secondsPerDrop, secondsPerDrop < 1 ? 2 : 1)} seconds.`
  }

  return `The entered rate is approximately ${formatNumber(dropsPerMinute / 60, 2)} drops each second.`
}

export default function MlHrFromDripRateClient() {
  const [gttMin, setGttMin] = useState("")
  const [dropFactor, setDropFactor] = useState("20")
  const [customDropFactor, setCustomDropFactor] = useState("")
  const [rawResult, setRawResult] = useState<number | null>(null)
  const [dripsUsed, setDripsUsed] = useState<number | null>(null)
  const [dropFactorUsed, setDropFactorUsed] = useState<number | null>(null)
  const [errors, setErrors] = useState<Errors>({})

  const dripRateRef = useRef<HTMLInputElement>(null)
  const customDropFactorRef = useRef<HTMLInputElement>(null)
  const resultRef = useResultReveal<HTMLDivElement>(rawResult !== null)

  function clearResult() {
    setRawResult(null)
    setDripsUsed(null)
    setDropFactorUsed(null)
    setErrors((current) => ({ ...current, copy: undefined }))
  }

  function getDropFactorValue(): number | null {
    if (dropFactor === "custom") return parseNumber(customDropFactor)
    return parseNumber(dropFactor)
  }

  function calculate() {
    setErrors({})

    const drips = parseNumber(gttMin)
    if (drips === null || drips <= 0) {
      setErrors({ dripRate: "Enter a positive observed drip rate using numbers only, such as 40." })
      dripRateRef.current?.focus()
      return
    }

    const selectedDropFactor = getDropFactorValue()
    if (selectedDropFactor === null || selectedDropFactor <= 0) {
      setErrors({ dropFactor: "Enter the positive drop factor printed on the giving set, such as 20." })
      customDropFactorRef.current?.focus()
      return
    }

    setDripsUsed(drips)
    setDropFactorUsed(selectedDropFactor)
    setRawResult((drips * 60) / selectedDropFactor)
  }

  function reset() {
    setGttMin("")
    setDropFactor("20")
    setCustomDropFactor("")
    setRawResult(null)
    setDripsUsed(null)
    setDropFactorUsed(null)
    setErrors({})
    window.requestAnimationFrame(() => dripRateRef.current?.focus())
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") calculate()
  }

  const parsedCustomDropFactor = dropFactor === "custom" ? parseNumber(customDropFactor) : null
  const isUncommonCustomDropFactor =
    parsedCustomDropFactor !== null &&
    parsedCustomDropFactor > 0 &&
    ![10, 15, 20, 60].includes(parsedCustomDropFactor)
  const isVerySlowDrip = dripsUsed !== null && dripsUsed < 1
  const isRapidDrip = dripsUsed !== null && dripsUsed > 250
  const isVeryLowRate = rawResult !== null && rawResult < 1
  const isVeryHighRate = rawResult !== null && rawResult > 1000
  const resultStatus = isVerySlowDrip || isRapidDrip || isVeryLowRate || isVeryHighRate ? "warning" : "default"
  const pacingText = dripsUsed === null ? "" : getPacingText(dripsUsed)

  return (
    <CalculatorShell
      id="gttmin-to-mlhr-tool"
      theme="iv"
      eyebrow="IV fluids"
      title="Estimate mL/hr from a gravity drip count"
      description="Enter the observed drops per minute and the exact giving-set drop factor to estimate the hourly infusion rate."
      icon={<Droplets className="size-5" />}
    >
      <CalculatorNotice variant="warning" title="Check the giving set first">
        Use the drop factor printed on the IV tubing packet or label. The same observed drip count can represent a very different mL/hr rate with another giving set.
      </CalculatorNotice>

      <div className="space-y-5">
        <CalculatorField
          id="observed-drip-rate"
          label="Observed drip rate"
          unit="gtt/min"
          helperText="Enter the counted drops per minute, such as 20, 25, 40, or 60."
          error={errors.dripRate}
          required
        >
          <CalculatorInput
            ref={dripRateRef}
            type="text"
            value={gttMin}
            onChange={(event) => {
              setGttMin(event.target.value)
              setErrors((current) => ({ ...current, dripRate: undefined }))
              clearResult()
            }}
            onKeyDown={handleKeyDown}
            placeholder="e.g., 40"
            autoComplete="off"
          />
        </CalculatorField>

        <CalculatorField
          id="reverse-iv-drop-factor"
          label="Giving-set drop factor"
          unit="gtt/mL"
          helperText="Common sets include 10, 15, 20, or 60 gtt/mL. Use the value on the set in front of you."
          required
        >
          <CalculatorSelect
            value={dropFactor}
            onChange={(event) => {
              setDropFactor(event.target.value)
              setErrors((current) => ({ ...current, dropFactor: undefined }))
              clearResult()
            }}
          >
            <option value="10">10 gtt/mL macrodrip</option>
            <option value="15">15 gtt/mL macrodrip</option>
            <option value="20">20 gtt/mL macrodrip</option>
            <option value="60">60 gtt/mL microdrip</option>
            <option value="custom">Custom drop factor</option>
          </CalculatorSelect>
        </CalculatorField>

        {dropFactor === "custom" && (
          <CalculatorField
            id="reverse-iv-custom-drop-factor"
            label="Custom drop factor"
            unit="gtt/mL"
            helperText="Enter numbers only. Confirm the value from the tubing packet or label."
            error={errors.dropFactor}
            required
          >
            <CalculatorInput
              ref={customDropFactorRef}
              type="text"
              value={customDropFactor}
              onChange={(event) => {
                setCustomDropFactor(event.target.value)
                setErrors((current) => ({ ...current, dropFactor: undefined }))
                clearResult()
              }}
              onKeyDown={handleKeyDown}
              placeholder="e.g., 25"
              autoComplete="off"
            />
          </CalculatorField>
        )}

        {isUncommonCustomDropFactor && (
          <CalculatorNotice variant="theme" title="Custom giving-set value">
            This is outside the common 10, 15, 20, and 60 gtt/mL presets. Use it only when the exact value is printed on the giving-set packaging or label.
          </CalculatorNotice>
        )}
      </div>

      <CalculatorActions onCalculate={calculate} onReset={reset} />

      {rawResult !== null && dripsUsed !== null && dropFactorUsed !== null && (
        <CalculatorResult
          ref={resultRef}
          label="Estimated hourly infusion rate"
          value={formatNumber(rawResult, 2)}
          unit="mL/hr"
          status={resultStatus}
          interpretation={`Estimated from ${formatNumber(dripsUsed, 2)} gtt/min using a ${formatNumber(dropFactorUsed, 2)} gtt/mL giving set. Gravity flow is approximate and must be checked against the order and actual infusion.`}
          actions={
            <CalculatorCopyButton
              value={`${formatNumber(rawResult, 2)} mL/hr`}
              onError={() => setErrors((current) => ({ ...current, copy: "Copy failed. Select and copy the result manually." }))}
            />
          }
        >
          <div className="space-y-3">
            {isVerySlowDrip && (
              <CalculatorNotice variant="warning" title="Very slow observed drip count">
                A rate below 1 drop per minute is difficult to observe and regulate accurately. Recheck the count, order, giving set, and intended delivery method.
              </CalculatorNotice>
            )}

            {isRapidDrip && (
              <CalculatorNotice variant="warning" title="Very rapid observed drip count">
                This drip count may be difficult to count accurately by eye. Recheck the observed rate, drop factor, order, patient context, and local IV policy.
              </CalculatorNotice>
            )}

            {isVeryLowRate && (
              <CalculatorNotice variant="warning" title="Estimated rate below 1 mL/hr">
                Confirm the calculation and whether gravity delivery is appropriate. Do not use this estimate as a pump setting without checking the original order and local policy.
              </CalculatorNotice>
            )}

            {isVeryHighRate && (
              <CalculatorNotice variant="warning" title="Very high estimated hourly rate">
                Recheck the counted drops, drop factor, order, patient context, and whether the infusion should be controlled by a pump or another approved method.
              </CalculatorNotice>
            )}

            <CalculatorNotice variant="theme" title="Observed drip pacing check">
              {pacingText} This is an orientation check only. Gravity flow can change with bag height, patient position, tubing, pressure, and clamp movement.
            </CalculatorNotice>

            {dropFactorUsed === 60 && (
              <CalculatorNotice variant="theme" title="Microdrip cross-check">
                With a 60 gtt/mL microdrip set, the numerical gtt/min value equals the numerical mL/hr value. This shortcut only applies when the giving set is confirmed as 60 gtt/mL.
              </CalculatorNotice>
            )}

            {errors.copy && <p role="alert" className="text-xs font-medium text-red-700">{errors.copy}</p>}

            <CalculatorWorking
              lines={[
                "mL/hr = (gtt/min × 60) ÷ drop factor",
                `mL/hr = (${formatNumber(dripsUsed, 3)} × 60) ÷ ${formatNumber(dropFactorUsed, 3)}`,
                `mL/hr = ${formatNumber(rawResult, 3)}`,
              ]}
            />
          </div>
        </CalculatorResult>
      )}

      <p className="text-center text-xs leading-5 text-gray-500">
        This reverse conversion estimates an hourly rate from a gravity drip count. Verify the order, giving-set label, patient context, actual chamber flow, and local policy.
      </p>
    </CalculatorShell>
  )
}
