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
  CalculatorSegmentedControl,
  CalculatorSelect,
  CalculatorShell,
  CalculatorWorking,
} from "@/components/calculator"
import { useResultReveal } from "@/hooks/use-result-reveal"
import {
  calculateDripRateFromHourlyRate,
  calculateDripRateFromVolumeTime,
} from "@/lib/iv-drip-rate-formulas"
import { formatSafeNumber } from "@/lib/safe-number-format"

type Mode = "hourlyRate" | "volumeTime"

type Result = {
  mode: Mode
  mlPerHour: number
  exactDropsPerMinute: number
  roundedDropsPerMinute: number
  dropFactor: number
  volumeMl?: number
  durationMinutes?: number
}

type Errors = {
  rate?: string
  volume?: string
  hours?: string
  minutes?: string
  duration?: string
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

function parseOptionalNumber(value: string): number | null {
  if (!value.trim()) return 0
  return parseNumber(value)
}

function formatNumber(value: number, decimals = 2): string {
  return formatSafeNumber(value, decimals, { maxDecimals: 12 })
}

function getPacingText(wholeDropsPerMinute: number): string {
  if (wholeDropsPerMinute <= 0) return "The rate is below one whole drop per minute."

  if (wholeDropsPerMinute <= 60) {
    const secondsPerDrop = 60 / wholeDropsPerMinute
    return `Approximately 1 drop every ${formatNumber(secondsPerDrop, secondsPerDrop < 1 ? 2 : 1)} seconds.`
  }

  const dropsPerSecond = wholeDropsPerMinute / 60
  return `Approximately ${formatNumber(dropsPerSecond, 2)} drops each second.`
}

export default function DripRateMlHrToGttMinClient() {
  const [mode, setMode] = useState<Mode>("hourlyRate")
  const [mlHr, setMlHr] = useState("")
  const [volumeMl, setVolumeMl] = useState("")
  const [timeHours, setTimeHours] = useState("")
  const [timeMinutes, setTimeMinutes] = useState("")
  const [dropFactor, setDropFactor] = useState("20")
  const [customDropFactor, setCustomDropFactor] = useState("")
  const [result, setResult] = useState<Result | null>(null)
  const [errors, setErrors] = useState<Errors>({})

  const rateRef = useRef<HTMLInputElement>(null)
  const volumeRef = useRef<HTMLInputElement>(null)
  const hoursRef = useRef<HTMLInputElement>(null)
  const minutesRef = useRef<HTMLInputElement>(null)
  const customDropFactorRef = useRef<HTMLInputElement>(null)
  const resultRef = useResultReveal<HTMLDivElement>(result !== null)

  function clearResult() {
    setResult(null)
    setErrors((current) => ({ ...current, copy: undefined }))
  }

  function changeMode(nextMode: Mode) {
    if (nextMode === mode) return
    setMode(nextMode)
    setResult(null)
    setErrors({})
    window.requestAnimationFrame(() => {
      if (nextMode === "hourlyRate") rateRef.current?.focus()
      else volumeRef.current?.focus()
    })
  }

  function getDropFactorValue(): number | null {
    if (dropFactor === "custom") return parseNumber(customDropFactor)
    return parseNumber(dropFactor)
  }

  function calculate() {
    setErrors({})

    const selectedDropFactor = getDropFactorValue()
    if (selectedDropFactor === null || selectedDropFactor <= 0) {
      setErrors({
        dropFactor: "Enter the positive drop factor printed on the giving set, such as 20.",
      })
      customDropFactorRef.current?.focus()
      return
    }

    if (mode === "hourlyRate") {
      const rate = parseNumber(mlHr)
      if (rate === null || rate <= 0) {
        setErrors({ rate: "Enter a positive infusion rate using numbers only, such as 120." })
        rateRef.current?.focus()
        return
      }

      const calculated = calculateDripRateFromHourlyRate(rate, selectedDropFactor)
      setResult({ mode, dropFactor: selectedDropFactor, ...calculated })
      return
    }

    const volume = parseNumber(volumeMl)
    if (volume === null || volume <= 0) {
      setErrors({ volume: "Enter a positive total volume in mL, such as 1000." })
      volumeRef.current?.focus()
      return
    }

    const hours = parseOptionalNumber(timeHours)
    if (hours === null || hours < 0) {
      setErrors({ hours: "Enter zero or a positive number of hours." })
      hoursRef.current?.focus()
      return
    }

    const minutes = parseOptionalNumber(timeMinutes)
    if (minutes === null || minutes < 0 || minutes >= 60) {
      setErrors({ minutes: "Enter minutes from 0 to 59." })
      minutesRef.current?.focus()
      return
    }

    const durationMinutes = hours * 60 + minutes
    if (durationMinutes <= 0) {
      setErrors({ duration: "Enter an infusion time greater than zero using hours, minutes, or both." })
      hoursRef.current?.focus()
      return
    }

    const calculated = calculateDripRateFromVolumeTime(volume, durationMinutes, selectedDropFactor)
    setResult({ mode, dropFactor: selectedDropFactor, ...calculated })
  }

  function reset() {
    setMlHr("")
    setVolumeMl("")
    setTimeHours("")
    setTimeMinutes("")
    setDropFactor("20")
    setCustomDropFactor("")
    setResult(null)
    setErrors({})
    window.requestAnimationFrame(() => {
      if (mode === "hourlyRate") rateRef.current?.focus()
      else volumeRef.current?.focus()
    })
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") calculate()
  }

  const isBelowWholeDrop = result !== null && result.exactDropsPerMinute < 0.5
  const isVerySlow = result !== null && result.exactDropsPerMinute >= 0.5 && result.exactDropsPerMinute < 1
  const isVeryFast = result !== null && result.roundedDropsPerMinute > 250
  const resultStatus = isBelowWholeDrop || isVerySlow || isVeryFast ? "warning" : "default"
  const displayedResult = isBelowWholeDrop ? "<1" : result?.roundedDropsPerMinute.toString() ?? ""
  const pacingText = result === null ? "" : getPacingText(result.roundedDropsPerMinute)

  return (
    <CalculatorShell
      id="mlhr-to-gttmin-tool"
      theme="iv"
      eyebrow="IV fluids"
      title={mode === "hourlyRate" ? "Convert mL/hr to drops per minute" : "Calculate drops per minute from volume and time"}
      description={
        mode === "hourlyRate"
          ? "Enter the ordered mL/hr rate and the exact giving-set drop factor."
          : "Enter the total volume, prescribed infusion time, and the exact giving-set drop factor."
      }
      icon={<Droplets className="size-5" />}
    >
      <div className="flex justify-center">
        <CalculatorSegmentedControl
          value={mode}
          options={[
            { value: "hourlyRate", label: "I know the mL/hr rate" },
            { value: "volumeTime", label: "I know volume and time" },
          ]}
          onChange={changeMode}
          ariaLabel="Choose IV drip rate input method"
          className="w-full sm:w-auto"
        />
      </div>

      <CalculatorNotice variant="warning" title="Check the giving set first">
        Use the drop factor printed on the IV tubing packet or label. Do not assume that every giving set has the same gtt/mL value.
      </CalculatorNotice>

      <div className="space-y-5">
        {mode === "hourlyRate" ? (
          <CalculatorField
            id="iv-rate-mlhr"
            label="Infusion rate"
            unit="mL/hr"
            helperText="Enter the ordered hourly infusion rate, such as 75, 100, or 120."
            error={errors.rate}
            required
          >
            <CalculatorInput
              ref={rateRef}
              type="text"
              inputMode="decimal"
              value={mlHr}
              onChange={(event) => {
                setMlHr(event.target.value)
                setErrors((current) => ({ ...current, rate: undefined }))
                clearResult()
              }}
              onKeyDown={handleKeyDown}
              placeholder="e.g., 120"
              autoComplete="off"
            />
          </CalculatorField>
        ) : (
          <div className="space-y-5">
            <CalculatorField
              id="iv-total-volume"
              label="Total volume"
              unit="mL"
              helperText="Enter the total volume to be infused, such as 1000."
              error={errors.volume}
              required
            >
              <CalculatorInput
                ref={volumeRef}
                type="text"
                inputMode="decimal"
                value={volumeMl}
                onChange={(event) => {
                  setVolumeMl(event.target.value)
                  setErrors((current) => ({ ...current, volume: undefined }))
                  clearResult()
                }}
                onKeyDown={handleKeyDown}
                placeholder="e.g., 1000"
                autoComplete="off"
              />
            </CalculatorField>

            <div>
              <div className="grid gap-5 sm:grid-cols-2">
                <CalculatorField
                  id="iv-time-hours"
                  label="Infusion time"
                  unit="hours"
                  helperText="Enter whole or decimal hours. Leave blank if using minutes only."
                  error={errors.hours}
                >
                  <CalculatorInput
                    ref={hoursRef}
                    type="text"
                    inputMode="decimal"
                    value={timeHours}
                    onChange={(event) => {
                      setTimeHours(event.target.value)
                      setErrors((current) => ({ ...current, hours: undefined, duration: undefined }))
                      clearResult()
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="e.g., 8"
                    autoComplete="off"
                  />
                </CalculatorField>

                <CalculatorField
                  id="iv-time-minutes"
                  label="Additional time"
                  unit="minutes"
                  helperText="Optional additional minutes from 0 to 59."
                  error={errors.minutes}
                >
                  <CalculatorInput
                    ref={minutesRef}
                    type="text"
                    inputMode="decimal"
                    value={timeMinutes}
                    onChange={(event) => {
                      setTimeMinutes(event.target.value)
                      setErrors((current) => ({ ...current, minutes: undefined, duration: undefined }))
                      clearResult()
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="e.g., 30"
                    autoComplete="off"
                  />
                </CalculatorField>
              </div>
              {errors.duration && <p role="alert" className="mt-2 text-sm font-medium text-red-700">{errors.duration}</p>}
            </div>
          </div>
        )}

        <CalculatorField
          id="iv-drop-factor"
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
            id="iv-custom-drop-factor"
            label="Custom drop factor"
            unit="gtt/mL"
            helperText="Enter numbers only. Confirm the value from the tubing packet or label."
            error={errors.dropFactor}
            required
          >
            <CalculatorInput
              ref={customDropFactorRef}
              type="text"
              inputMode="decimal"
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
      </div>

      <CalculatorActions onCalculate={calculate} onReset={reset} />

      {result && (
        <CalculatorResult
          ref={resultRef}
          label="Gravity drip rate"
          value={displayedResult}
          unit="gtt/min"
          status={resultStatus}
          interpretation={
            isBelowWholeDrop
              ? `Exact result: ${formatNumber(result.exactDropsPerMinute, 3)} gtt/min. This is below half a drop per minute and cannot be represented closely by rounding to a whole drop.`
              : `Exact result: ${formatNumber(result.exactDropsPerMinute, 2)} gtt/min. Displayed as ${result.roundedDropsPerMinute} whole drops per minute.`
          }
          actions={
            <CalculatorCopyButton
              value={
                isBelowWholeDrop
                  ? `${formatNumber(result.exactDropsPerMinute, 3)} gtt/min (less than 1 whole drop/min)`
                  : `${result.roundedDropsPerMinute} gtt/min${result.mode === "volumeTime" ? `; calculated rate ${formatNumber(result.mlPerHour, 2)} mL/hr` : ""}`
              }
              onError={() => setErrors((current) => ({ ...current, copy: "Copy failed. Select and copy the result manually." }))}
            />
          }
        >
          <div className="space-y-3">
            {result.mode === "volumeTime" && (
              <CalculatorNotice variant="theme" title="Calculated hourly infusion rate">
                {formatNumber(result.mlPerHour, 2)} mL/hr from {formatNumber(result.volumeMl ?? 0, 2)} mL over {formatNumber((result.durationMinutes ?? 0) / 60, 2)} hours.
              </CalculatorNotice>
            )}

            {isBelowWholeDrop && (
              <CalculatorNotice variant="danger" title="Rate below one measurable whole drop per minute">
                Recheck the order, infusion rate or duration, drop factor, and intended delivery method. Do not treat a rounded result of zero as a usable gravity setting.
              </CalculatorNotice>
            )}

            {isVerySlow && !isBelowWholeDrop && (
              <CalculatorNotice variant="warning" title="Very slow gravity rate">
                This result is close to one drop per minute. Confirm that a gravity infusion is appropriate and recheck the actual flow after any adjustment.
              </CalculatorNotice>
            )}

            {isVeryFast && (
              <CalculatorNotice variant="warning" title="Very rapid manual drip count">
                This result may be difficult to count and regulate accurately by eye. Recheck the order, drop factor, patient context, and local IV policy.
              </CalculatorNotice>
            )}

            {!isBelowWholeDrop && (
              <CalculatorNotice variant="theme" title="Approximate drip pacing">
                {pacingText} This is an orientation aid only. Count the actual drip chamber flow and recheck it after the rate settles.
              </CalculatorNotice>
            )}

            {errors.copy && <p role="alert" className="text-xs font-medium text-red-700">{errors.copy}</p>}

            <CalculatorWorking
              lines={
                result.mode === "hourlyRate"
                  ? [
                      "gtt/min = (mL/hr × drop factor) ÷ 60",
                      `gtt/min = (${formatNumber(result.mlPerHour, 3)} × ${formatNumber(result.dropFactor, 3)}) ÷ 60`,
                      `gtt/min = ${formatNumber(result.exactDropsPerMinute, 3)}`,
                      isBelowWholeDrop ? "Whole-drop display = less than 1 gtt/min" : `Rounded to whole drops = ${result.roundedDropsPerMinute} gtt/min`,
                    ]
                  : [
                      `Total time = ${formatNumber(result.durationMinutes ?? 0, 2)} minutes`,
                      `mL/hr = (${formatNumber(result.volumeMl ?? 0, 3)} × 60) ÷ ${formatNumber(result.durationMinutes ?? 0, 3)}`,
                      `mL/hr = ${formatNumber(result.mlPerHour, 3)}`,
                      "gtt/min = (volume mL × drop factor) ÷ time in minutes",
                      `gtt/min = (${formatNumber(result.volumeMl ?? 0, 3)} × ${formatNumber(result.dropFactor, 3)}) ÷ ${formatNumber(result.durationMinutes ?? 0, 3)}`,
                      `gtt/min = ${formatNumber(result.exactDropsPerMinute, 3)}`,
                      isBelowWholeDrop ? "Whole-drop display = less than 1 gtt/min" : `Rounded to whole drops = ${result.roundedDropsPerMinute} gtt/min`,
                    ]
              }
            />
          </div>
        </CalculatorResult>
      )}

      <p className="text-center text-xs leading-5 text-gray-500">
        Gravity drip calculations support checking only. Verify the order, total volume and time where used, tubing drop factor, patient context, actual chamber flow, and local policy.
      </p>
    </CalculatorShell>
  )
}
