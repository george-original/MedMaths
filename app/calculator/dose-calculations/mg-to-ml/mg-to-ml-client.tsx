"use client"

import { useState } from "react"
import type { KeyboardEvent } from "react"
import { Button } from "@/components/ui/button"
import { Copy, RotateCcw, Syringe } from "lucide-react"

type Mode = "mgToMl" | "mlToMg"

function parseNumber(str: string): number | null {
  const cleaned = str.replace(/,/g, "").trim()
  if (!cleaned) return null
  const num = Number.parseFloat(cleaned)
  return Number.isFinite(num) ? num : null
}

function formatResult(value: number, decimalPlaces: number): string {
  if (!Number.isFinite(value)) return "—"
  if (decimalPlaces === 0) return Math.round(value).toString()
  return value.toFixed(decimalPlaces).replace(/\.?0+$/, "")
}

function ModeToggle({ mode, onChange }: { mode: Mode; onChange: (next: Mode) => void }) {
  return (
    <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
      <button
        type="button"
        onClick={() => onChange("mgToMl")}
        className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
          mode === "mgToMl" ? "bg-cyan-600 text-white" : "text-gray-700 hover:bg-gray-50"
        }`}
        aria-pressed={mode === "mgToMl"}
      >
        mg → mL
      </button>
      <button
        type="button"
        onClick={() => onChange("mlToMg")}
        className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
          mode === "mlToMg" ? "bg-cyan-600 text-white" : "text-gray-700 hover:bg-gray-50"
        }`}
        aria-pressed={mode === "mlToMg"}
      >
        mL → mg
      </button>
    </div>
  )
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
  const [decimals, setDecimals] = useState(2)
  const [copied, setCopied] = useState(false)

  const primaryLabel = mode === "mgToMl" ? "Dose required (mg)" : "Volume drawn up (mL)"
  const primaryPlaceholder = mode === "mgToMl" ? "e.g., 500" : "e.g., 2.5"
  const primaryValue = mode === "mgToMl" ? doseMg : volumeInputMl
  const setPrimaryValue = mode === "mgToMl" ? setDoseMg : setVolumeInputMl
  const resultLabel = mode === "mgToMl" ? "Volume required" : "Dose amount"
  const resultUnit = mode === "mgToMl" ? "mL" : "mg"

  function deriveConcentration(): number | null {
    if (!useFormatHelper) return parseNumber(concMgPerMl)

    const strength = parseNumber(strengthMg)
    const labelVolume = parseNumber(labelVolumeMl)
    if (strength === null || strength <= 0 || labelVolume === null || labelVolume <= 0) return null

    const derived = strength / labelVolume
    setConcMgPerMl(formatResult(derived, 3))
    return derived
  }

  function calculate(nextMode?: Mode) {
    const activeMode = nextMode ?? mode
    const concentration = deriveConcentration()

    if (concentration === null || concentration <= 0) {
      alert("Please enter a valid concentration, either as mg/mL or as mg per X mL.")
      return
    }

    if (activeMode === "mgToMl") {
      const dose = parseNumber(doseMg)
      if (dose === null || dose <= 0) {
        alert("Please enter a valid dose in mg.")
        return
      }
      setResult(dose / concentration)
      return
    }

    const volume = parseNumber(volumeInputMl)
    if (volume === null || volume <= 0) {
      alert("Please enter a valid volume in mL.")
      return
    }
    setResult(volume * concentration)
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
    setDecimals(2)
    setCopied(false)
  }

  async function copyResult() {
    if (result === null) return
    const formatted = `${formatResult(result, decimals)} ${resultUnit}`
    try {
      await navigator.clipboard.writeText(formatted)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      alert("Copy failed. Your browser may block clipboard access.")
    }
  }

  function changeMode(nextMode: Mode) {
    if (nextMode === mode) return
    setMode(nextMode)
    setResult(null)
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") calculate()
  }

  const looksUnusual =
    result !== null &&
    ((mode === "mgToMl" && result < 0.05) ||
      (mode === "mgToMl" && result > 50) ||
      (mode === "mlToMg" && result > 10000))

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <ModeToggle mode={mode} onChange={changeMode} />
        <p className="text-xs text-gray-500">Formula shown after calculation. Inputs are not stored.</p>
      </div>

      <p className="rounded-md border border-yellow-200 bg-yellow-50 px-3 py-2 text-xs leading-relaxed text-yellow-900">
        <span className="font-semibold">Do not guess concentration.</span> Use the product strength on the label.
      </p>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-900">{primaryLabel}</label>
          <input
            type="text"
            inputMode="decimal"
            value={primaryValue}
            onChange={(e) => setPrimaryValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={primaryPlaceholder}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="border-t pt-4">
          <p className="mb-3 text-sm font-semibold text-gray-900">How is the medicine strength written?</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setUseFormatHelper(false)}
              className={`rounded-xl border p-4 text-left transition-colors ${
                !useFormatHelper ? "border-cyan-500 bg-cyan-50" : "border-gray-200 bg-white hover:bg-gray-50"
              }`}
            >
              <span className="block text-sm font-semibold text-gray-900">I know the concentration</span>
              <span className="mt-1 block text-xs text-gray-500">Example: 50 mg/mL</span>
            </button>

            <button
              type="button"
              onClick={() => setUseFormatHelper(true)}
              className={`rounded-xl border p-4 text-left transition-colors ${
                useFormatHelper ? "border-cyan-500 bg-cyan-50" : "border-gray-200 bg-white hover:bg-gray-50"
              }`}
            >
              <span className="block text-sm font-semibold text-gray-900">My label says mg per X mL</span>
              <span className="mt-1 block text-xs text-gray-500">Example: 250 mg / 5 mL</span>
            </button>
          </div>
        </div>

        {!useFormatHelper ? (
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-900">Concentration (mg/mL)</label>
            <input
              type="text"
              inputMode="decimal"
              value={concMgPerMl}
              onChange={(e) => setConcMgPerMl(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g., 50"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <p className="mt-1 text-xs text-gray-500">Use this when the label already gives the strength per 1 mL.</p>
          </div>
        ) : (
          <div className="space-y-4 rounded-lg border border-cyan-200 bg-cyan-50 p-4">
            <p className="text-sm font-medium text-gray-800">Enter the label strength, then the calculator converts it to mg/mL.</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Strength (mg)</label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={strengthMg}
                  onChange={(e) => setStrengthMg(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="e.g., 250"
                  className="w-full rounded border border-cyan-300 bg-white px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Volume (mL)</label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={labelVolumeMl}
                  onChange={(e) => setLabelVolumeMl(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="e.g., 5"
                  className="w-full rounded border border-cyan-300 bg-white px-3 py-2 text-sm"
                />
              </div>
            </div>
            <p className="text-xs text-gray-600">Example: 250 mg / 5 mL becomes 50 mg/mL.</p>
          </div>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <Button onClick={() => calculate()} className="flex-1 rounded-lg bg-cyan-600 py-3 font-medium text-white hover:bg-cyan-700">
          <Syringe className="mr-2 h-4 w-4" />
          Calculate
        </Button>
        <Button onClick={reset} variant="outline" className="rounded-lg border border-gray-300 bg-transparent px-6 py-3 hover:bg-gray-50">
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {result !== null && (
        <div className="space-y-4 rounded-lg border border-cyan-200 bg-cyan-50 p-6">
          <div>
            <p className="mb-1 text-sm text-gray-600">{resultLabel}</p>
            <p className="text-3xl font-bold text-cyan-700">
              {formatResult(result, decimals)} {resultUnit}
            </p>
          </div>

          {looksUnusual && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
              <span className="font-semibold">Quick check:</span> This result is unusual. Re-check units, concentration, and product strength before using the result.
            </div>
          )}

          <div className="border-t border-cyan-200 pt-4">
            <label className="mb-2 block text-sm font-medium text-gray-700">Round to decimals:</label>
            <select
              value={decimals}
              onChange={(e) => setDecimals(Number.parseInt(e.target.value))}
              className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm"
            >
              <option value={0}>0 decimals</option>
              <option value={1}>1 decimal</option>
              <option value={2}>2 decimals</option>
              <option value={3}>3 decimals</option>
            </select>
          </div>

          <button
            type="button"
            onClick={copyResult}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-cyan-300 bg-white px-4 py-2 text-sm font-medium text-cyan-700 transition-colors hover:bg-cyan-50"
          >
            <Copy className="h-4 w-4" />
            {copied ? "Copied" : "Copy result"}
          </button>

          <div className="space-y-1 rounded bg-white p-3 font-mono text-xs text-gray-700">
            {mode === "mgToMl" ? (
              <>
                <div>mL = mg ÷ (mg/mL)</div>
                <div>
                  mL = {doseMg || "—"} ÷ {concMgPerMl || "—"}
                </div>
                <div>mL = {formatResult(result, decimals)}</div>
              </>
            ) : (
              <>
                <div>mg = mL × (mg/mL)</div>
                <div>
                  mg = {volumeInputMl || "—"} × {concMgPerMl || "—"}
                </div>
                <div>mg = {formatResult(result, decimals)}</div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
