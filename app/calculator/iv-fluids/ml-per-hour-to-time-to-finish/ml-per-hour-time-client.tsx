"use client"

import { useRef, useState, type KeyboardEvent } from "react"
import { Clock } from "lucide-react"
import {
  CalculatorActions,
  CalculatorCopyButton,
  CalculatorField,
  CalculatorInput,
  CalculatorNotice,
  CalculatorResult,
  CalculatorShell,
  CalculatorWorking,
} from "@/components/calculator"
import { useResultReveal } from "@/hooks/use-result-reveal"
import {
  calculateInfusionCompletion,
  calculateInfusionDuration,
  type InfusionCompletionResult,
} from "@/lib/iv-infusion-time-formulas"
import { formatSafeNumber } from "@/lib/safe-number-format"

type Errors = {
  volume?: string
  rate?: string
  startTime?: string
  copy?: string
}

type DurationResult = {
  hours: number
  minutes: number
  display: string
  detailed: string
}

type Result = {
  duration: DurationResult
  completion: InfusionCompletionResult | null
}

function parseNumber(value: string): number | null {
  const cleaned = value.replace(/,/g, "").trim()
  if (!cleaned) return null
  if (!/^(?:\d+\.?\d*|\.\d+)$/.test(cleaned)) return null

  const parsed = Number(cleaned)
  return Number.isFinite(parsed) ? parsed : null
}

function parseTimeToMinutes(value: string): number | null {
  const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(value.trim())
  if (!match) return null
  return Number(match[1]) * 60 + Number(match[2])
}

function formatNumber(value: number, decimals = 2): string {
  return formatSafeNumber(value, decimals, { maxDecimals: 12 })
}

function formatDuration(hours: number): DurationResult {
  const minutes = hours * 60

  if (minutes < 1) {
    const seconds = Math.max(1, Math.round(hours * 3600))
    return {
      hours,
      minutes,
      display: `${seconds} sec`,
      detailed: `approximately ${seconds} second${seconds === 1 ? "" : "s"}`,
    }
  }

  const roundedMinutes = Math.round(minutes)
  const hoursPart = Math.floor(roundedMinutes / 60)
  const minutesPart = roundedMinutes % 60

  if (hoursPart === 0) {
    return {
      hours,
      minutes,
      display: `${minutesPart} min`,
      detailed: `approximately ${minutesPart} minute${minutesPart === 1 ? "" : "s"}`,
    }
  }

  return {
    hours,
    minutes,
    display: `${hoursPart}h ${minutesPart}m`,
    detailed:
      minutesPart === 0
        ? `approximately ${hoursPart} hour${hoursPart === 1 ? "" : "s"}`
        : `${hoursPart} hour${hoursPart === 1 ? "" : "s"} and ${minutesPart} minute${minutesPart === 1 ? "" : "s"}`,
  }
}

function getDayLabel(dayOffset: number): string {
  if (dayOffset === 0) return "today"
  if (dayOffset === 1) return "tomorrow"
  return `in ${dayOffset} days`
}

export default function MLPerHourTimeClient() {
  const [volume, setVolume] = useState("")
  const [rate, setRate] = useState("")
  const [includeFinishTime, setIncludeFinishTime] = useState(false)
  const [startTime, setStartTime] = useState("")
  const [volumeUsed, setVolumeUsed] = useState<number | null>(null)
  const [rateUsed, setRateUsed] = useState<number | null>(null)
  const [startTimeUsed, setStartTimeUsed] = useState<string | null>(null)
  const [result, setResult] = useState<Result | null>(null)
  const [errors, setErrors] = useState<Errors>({})

  const volumeRef = useRef<HTMLInputElement>(null)
  const rateRef = useRef<HTMLInputElement>(null)
  const startTimeRef = useRef<HTMLInputElement>(null)
  const resultRef = useResultReveal<HTMLDivElement>(result !== null)

  function clearResult() {
    setVolumeUsed(null)
    setRateUsed(null)
    setStartTimeUsed(null)
    setResult(null)
    setErrors((current) => ({ ...current, copy: undefined }))
  }

  function calculate() {
    setErrors({})

    const parsedVolume = parseNumber(volume)
    if (parsedVolume === null || parsedVolume <= 0) {
      setErrors({ volume: "Enter a positive remaining volume using numbers only, such as 500." })
      volumeRef.current?.focus()
      return
    }

    const parsedRate = parseNumber(rate)
    if (parsedRate === null || parsedRate <= 0) {
      setErrors({ rate: "Enter a positive infusion rate using numbers only, such as 125." })
      rateRef.current?.focus()
      return
    }

    let completion: InfusionCompletionResult | null = null
    let validStartTime: string | null = null
    const durationCalculation = calculateInfusionDuration(parsedVolume, parsedRate)

    if (includeFinishTime) {
      const parsedStartMinutes = parseTimeToMinutes(startTime)
      if (parsedStartMinutes === null) {
        setErrors({ startTime: "Enter a valid 24-hour start time, such as 14:30." })
        startTimeRef.current?.focus()
        return
      }
      completion = calculateInfusionCompletion(parsedStartMinutes, durationCalculation.minutes)
      validStartTime = startTime
    }

    setVolumeUsed(parsedVolume)
    setRateUsed(parsedRate)
    setStartTimeUsed(validStartTime)
    setResult({
      duration: formatDuration(durationCalculation.hours),
      completion,
    })
  }

  function reset() {
    setVolume("")
    setRate("")
    setIncludeFinishTime(false)
    setStartTime("")
    setVolumeUsed(null)
    setRateUsed(null)
    setStartTimeUsed(null)
    setResult(null)
    setErrors({})
    window.requestAnimationFrame(() => volumeRef.current?.focus())
  }

  function useCurrentTime() {
    const now = new Date()
    const nextTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`
    setStartTime(nextTime)
    setErrors((current) => ({ ...current, startTime: undefined }))
    clearResult()
    window.requestAnimationFrame(() => startTimeRef.current?.focus())
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") calculate()
  }

  const finishLabel = result?.completion
    ? `${result.completion.displayTime24Hour} ${getDayLabel(result.completion.dayOffset)}`
    : null

  const copyValue = result
    ? `Estimated remaining infusion duration: ${result.duration.display}${finishLabel ? `. Estimated clock completion: ${finishLabel}` : ""}`
    : ""

  return (
    <CalculatorShell
      id="iv-infusion-time-tool"
      theme="iv"
      eyebrow="IV fluids"
      title="Calculate infusion duration and optional finish time"
      description="Enter the volume still to infuse and the current mL/hr rate. Add a start time only when you also need an estimated clock completion."
      icon={<Clock className="size-5" />}
    >
      <CalculatorNotice variant="warning" title="Use the remaining volume, not automatically the original bag size">
        If a pump displays an accurate VTBI, use that value. The estimate changes if the infusion is paused, occluded, disconnected, or reprogrammed.
      </CalculatorNotice>

      <div className="space-y-5">
        <CalculatorField
          id="iv-remaining-volume"
          label="Remaining volume"
          unit="mL"
          helperText="Enter the volume still to infuse, such as 100, 500, or 1000. Do not include the unit."
          error={errors.volume}
          required
        >
          <CalculatorInput
            ref={volumeRef}
            type="text"
            inputMode="decimal"
            value={volume}
            onChange={(event) => {
              setVolume(event.target.value)
              setErrors((current) => ({ ...current, volume: undefined }))
              clearResult()
            }}
            onKeyDown={handleKeyDown}
            placeholder="e.g., 500"
            autoComplete="off"
          />
        </CalculatorField>

        <CalculatorField
          id="iv-current-rate"
          label="Current infusion rate"
          unit="mL/hr"
          helperText="Use the current ordered or programmed rate. Do not enter drops per minute here."
          error={errors.rate}
          required
        >
          <CalculatorInput
            ref={rateRef}
            type="text"
            inputMode="decimal"
            value={rate}
            onChange={(event) => {
              setRate(event.target.value)
              setErrors((current) => ({ ...current, rate: undefined }))
              clearResult()
            }}
            onKeyDown={handleKeyDown}
            placeholder="e.g., 125"
            autoComplete="off"
          />
        </CalculatorField>

        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <label className="flex cursor-pointer items-start gap-3" htmlFor="include-clock-finish-time">
            <input
              id="include-clock-finish-time"
              type="checkbox"
              checked={includeFinishTime}
              onChange={(event) => {
                const checked = event.target.checked
                setIncludeFinishTime(checked)
                setErrors((current) => ({ ...current, startTime: undefined }))
                clearResult()
                if (checked) window.requestAnimationFrame(() => startTimeRef.current?.focus())
              }}
              className="mt-1 size-4 rounded border-gray-300 text-teal-700 focus:ring-teal-600"
            />
            <span>
              <span className="block font-semibold text-gray-900">Also calculate the clock finish time</span>
              <span className="block text-sm leading-5 text-gray-600">
                The time is calculated in your device&apos;s local time and rounded to the nearest minute.
              </span>
            </span>
          </label>

          {includeFinishTime && (
            <div className="mt-4 border-t border-gray-200 pt-4">
              <CalculatorField
                id="iv-start-time"
                label="Start time"
                unit="24-hour time"
                helperText="Enter when this remaining-volume estimate starts, such as 14:30."
                error={errors.startTime}
                required
              >
                <div className="flex flex-col gap-2 sm:flex-row">
                  <CalculatorInput
                    ref={startTimeRef}
                    type="time"
                    step={60}
                    value={startTime}
                    onChange={(event) => {
                      setStartTime(event.target.value)
                      setErrors((current) => ({ ...current, startTime: undefined }))
                      clearResult()
                    }}
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    onClick={useCurrentTime}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
                  >
                    Use current time
                  </button>
                </div>
              </CalculatorField>
            </div>
          )}
        </div>
      </div>

      <CalculatorActions onCalculate={calculate} onReset={reset} />

      {result !== null && volumeUsed !== null && rateUsed !== null && (
        <CalculatorResult
          ref={resultRef}
          label="Estimated remaining duration"
          value={result.duration.display}
          interpretation={`Exact calculation: ${formatNumber(result.duration.hours, 3)} hours (${formatNumber(result.duration.minutes, 1)} minutes), displayed as ${result.duration.detailed}.`}
          actions={
            <CalculatorCopyButton
              value={copyValue}
              onError={() => setErrors((current) => ({ ...current, copy: "Copy failed. Select and copy the result manually." }))}
            />
          }
        >
          <div className="space-y-3">
            {result.completion && finishLabel && startTimeUsed && (
              <div className="rounded-xl border border-teal-200 bg-teal-50 p-4">
                <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">Estimated clock completion</p>
                <p className="mt-1 text-2xl font-bold text-teal-950">{finishLabel}</p>
                <p className="mt-1 text-sm text-teal-900">
                  From a start time of {startTimeUsed}. Clock completion is rounded to the nearest minute.
                </p>
              </div>
            )}

            <CalculatorNotice variant="theme" title="Estimate only">
              This calculation assumes the remaining volume and rate stay unchanged. Any pause, rate change, occlusion, disconnection, or inaccurate volume estimate will change the actual completion time.
            </CalculatorNotice>

            <CalculatorNotice variant="warning" title="Check against the order and pump">
              Recheck the remaining volume, mL/hr rate, decimal placement, order, and pump settings. This calculator cannot determine whether the infusion duration or rate is clinically appropriate.
            </CalculatorNotice>

            {errors.copy && <p className="text-sm font-medium text-red-700">{errors.copy}</p>}

            <CalculatorWorking
              lines={[
                "Time (hours) = remaining volume (mL) ÷ rate (mL/hr)",
                `Time = ${formatNumber(volumeUsed, 3)} ÷ ${formatNumber(rateUsed, 3)}`,
                `Time = ${formatNumber(result.duration.hours, 3)} hours`,
                `Estimated duration = ${result.duration.display}`,
                ...(result.completion && startTimeUsed && finishLabel
                  ? [`Clock completion = ${startTimeUsed} + ${result.duration.display}`, `Estimated finish = ${finishLabel}`]
                  : []),
              ]}
            />
          </div>
        </CalculatorResult>
      )}

      <p className="text-center text-xs leading-5 text-gray-500">
        This tool calculates duration and optional clock completion only. It does not determine whether the IV fluid, medicine, concentration, route, or rate is clinically appropriate.
      </p>
    </CalculatorShell>
  )
}
