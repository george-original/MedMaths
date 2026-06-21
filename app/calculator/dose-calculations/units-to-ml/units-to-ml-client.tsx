"use client"

import type React from "react"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, RotateCcw } from "lucide-react"

type PresetKey = "custom" | "insulin_u100" | "insulin_u40" | "heparin_1000" | "heparin_5000"

const PRESETS: Array<{ key: PresetKey; label: string; value: string }> = [
  { key: "custom", label: "Custom", value: "" },
  { key: "insulin_u100", label: "Insulin U-100 (100 units/mL)", value: "100" },
  { key: "insulin_u40", label: "Insulin U-40 (40 units/mL)", value: "40" },
  { key: "heparin_1000", label: "Heparin 1,000 units/mL", value: "1000" },
  { key: "heparin_5000", label: "Heparin 5,000 units/mL", value: "5000" },
]

function parseNumber(input: string): number {
  const cleaned = (input || "").replace(/,/g, "").trim()
  const n = Number.parseFloat(cleaned)
  return Number.isFinite(n) ? n : Number.NaN
}

function formatNumber(value: number, decimals: number): string {
  if (!Number.isFinite(value)) return "—"
  const rounded = Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)
  const nf = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  })
  return nf.format(rounded)
}

export default function UnitsToMlClient() {
  const [preset, setPreset] = useState<PresetKey>("custom")
  const [doseUnits, setDoseUnits] = useState("")
  const [concUnitsPerMl, setConcUnitsPerMl] = useState("")
  const [decimals, setDecimals] = useState(2) // mL often charted with decimals
  const [copied, setCopied] = useState(false)

  const dose = useMemo(() => parseNumber(doseUnits), [doseUnits])
  const conc = useMemo(() => parseNumber(concUnitsPerMl), [concUnitsPerMl])

  const isDoseValid = Number.isFinite(dose) && dose > 0
  const isConcValid = Number.isFinite(conc) && conc > 0

  const volumeMl = useMemo(() => {
    if (!isDoseValid || !isConcValid) return null
    return dose / conc
  }, [dose, conc, isDoseValid, isConcValid])

  const working = useMemo(() => {
    if (volumeMl === null) return null
    const doseD = formatNumber(dose, 3)
    const concD = formatNumber(conc, 3)
    const mlD = formatNumber(volumeMl, decimals)

    return `STEP 1 — INPUTS
Dose = ${doseD} units
Concentration = ${concD} units/mL

STEP 2 — FORMULA
Volume (mL) = Dose (units) ÷ Concentration (units/mL)

STEP 3 — CALCULATION
Volume = ${doseD} ÷ ${concD}
       = ${mlD} mL`
  }, [volumeMl, dose, conc, decimals])

  const handlePresetChange = (next: PresetKey) => {
    setPreset(next)
    const found = PRESETS.find((p) => p.key === next)
    if (found && found.value) setConcUnitsPerMl(found.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      ;(e.target as HTMLElement)?.blur?.()
    }
  }

  const handleClear = () => {
    setPreset("custom")
    setDoseUnits("")
    setConcUnitsPerMl("")
    setDecimals(2)
    setCopied(false)
  }

  const handleCopy = async () => {
    if (volumeMl === null) return
    const text = `${formatNumber(volumeMl, decimals)} mL`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard may be blocked
    }
  }

  return (
    <div className="space-y-6">
      {/* Presets */}
      <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-4">
        <p className="text-sm font-medium text-slate-800">Quick presets (optional)</p>
        <p className="mt-1 text-xs text-slate-600">
          Choose a common concentration to auto-fill units/mL (e.g., U-100 insulin).
        </p>

        <div className="mt-3">
          <Label htmlFor="preset" className="text-slate-700">
            Preset concentration
          </Label>
          <select
            id="preset"
            value={preset}
            onChange={(e) => handlePresetChange(e.target.value as PresetKey)}
            className="mt-2 w-full rounded-lg border border-cyan-200 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            {PRESETS.map((p) => (
              <option key={p.key} value={p.key}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="doseUnits" className="text-slate-800">
            Dose (units)
          </Label>
          <Input
            id="doseUnits"
            value={doseUnits}
            onChange={(e) => setDoseUnits(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. 25"
            inputMode="decimal"
            className="bg-white"
          />
          {!isDoseValid && doseUnits.length > 0 ? (
            <p className="text-xs text-rose-600">Enter a dose greater than 0.</p>
          ) : (
            <p className="text-xs text-slate-500">Commas accepted (e.g., 10,000).</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="concUnitsPerMl" className="text-slate-800">
            Concentration (units/mL)
          </Label>
          <Input
            id="concUnitsPerMl"
            value={concUnitsPerMl}
            onChange={(e) => setConcUnitsPerMl(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. 100"
            inputMode="decimal"
            className="bg-white"
          />
          {!isConcValid && concUnitsPerMl.length > 0 ? (
            <p className="text-xs text-rose-600">Enter a concentration greater than 0.</p>
          ) : (
            <p className="text-xs text-slate-500">Examples: U-100 insulin = 100 units/mL.</p>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1 rounded-xl border border-slate-200 bg-white p-4">
          <Label htmlFor="decimals" className="text-slate-800">
            Rounding (display)
          </Label>
          <select
            id="decimals"
            value={decimals}
            onChange={(e) => setDecimals(Number.parseInt(e.target.value))}
            className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value={0}>0 decimals</option>
            <option value={1}>1 decimal</option>
            <option value={2}>2 decimals (common)</option>
            <option value={3}>3 decimals</option>
          </select>
          <p className="mt-2 text-xs text-slate-500">
            For small volumes, follow your syringe/device markings and local protocols.
          </p>
        </div>

        <div className="flex gap-3">
          <Button onClick={handleClear} variant="outline" className="rounded-xl">
            <RotateCcw className="mr-2 h-4 w-4" />
            Clear
          </Button>
          <Button
            onClick={handleCopy}
            className="rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
            disabled={volumeMl === null}
          >
            <Copy className="mr-2 h-4 w-4" />
            {copied ? "Copied" : "Copy result"}
          </Button>
        </div>
      </div>

      {/* Result */}
      {volumeMl !== null && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <p className="text-sm text-emerald-800">Volume required</p>
          <p className="mt-1 text-3xl font-bold text-emerald-900">{formatNumber(volumeMl, decimals)} mL</p>

          {working && (
            <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-700 whitespace-pre-wrap">
              {working}
            </div>
          )}

          <div className="mt-4 border-t border-emerald-200 pt-4">
            <a
              href="/calculator/dose-calculations/units-to-ml"
              className="text-sm font-medium text-cyan-700 hover:text-cyan-800"
            >
              Need mL → units? Go to mL to units →
            </a>
          </div>
        </div>
      )}

      {/* Safety mini-note */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm text-amber-900">
          <span className="font-semibold">Safety:</span> Confirm the concentration on the label (e.g., U-100 vs U-40 for
          insulin; units/mL for heparin) and follow local independent checking policies.
        </p>
      </div>
    </div>
  )
}
