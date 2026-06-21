"use client"

import * as React from "react"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function getNumber(val: string): number {
  const cleaned = val.replace(/,/g, "").trim()
  const num = Number.parseFloat(cleaned)
  return Number.isFinite(num) ? num : Number.NaN
}

function formatNumber(value: number, decimals = 4): string {
  if (!Number.isFinite(value)) return "—"
  const cleaned = Math.round(value * 1e10) / 1e10
  if (Math.abs(cleaned - Math.round(cleaned)) < 1e-10) return String(Math.round(cleaned))
  let s = cleaned.toFixed(decimals)
  s = s.replace(/\.?0+$/, "")
  return s
}

type SolveFor = "V2" | "C2" | "C1" | "V1"

export default function C1V1C2V2BasicClient() {
  const [c1, setC1] = useState("")
  const [v1, setV1] = useState("")
  const [c2, setC2] = useState("")
  const [v2, setV2] = useState("")
  const [solving, setSolving] = useState<SolveFor>("V2")

  const [result, setResult] = useState<string | null>(null)
  const [working, setWorking] = useState<string | null>(null)

  const canCalculate = useMemo(() => {
    const c1v = getNumber(c1)
    const v1v = getNumber(v1)
    const c2v = getNumber(c2)
    const v2v = getNumber(v2)

    if (solving === "V2") return Number.isFinite(c1v) && c1v > 0 && Number.isFinite(v1v) && v1v > 0 && Number.isFinite(c2v) && c2v > 0
    if (solving === "C2") return Number.isFinite(c1v) && c1v > 0 && Number.isFinite(v1v) && v1v > 0 && Number.isFinite(v2v) && v2v > 0
    if (solving === "C1") return Number.isFinite(v1v) && v1v > 0 && Number.isFinite(c2v) && c2v > 0 && Number.isFinite(v2v) && v2v > 0
    if (solving === "V1") return Number.isFinite(c1v) && c1v > 0 && Number.isFinite(c2v) && c2v > 0 && Number.isFinite(v2v) && v2v > 0
    return false
  }, [c1, v1, c2, v2, solving])

  const handleCalculate = () => {
    const c1v = getNumber(c1)
    const v1v = getNumber(v1)
    const c2v = getNumber(c2)
    const v2v = getNumber(v2)

    const need = (label: string) => {
      alert(`Enter a valid ${label}.`)
    }

    let value: number

    if (solving === "V2") {
      if (!Number.isFinite(c1v) || c1v <= 0) return need("C1 (starting concentration)")
      if (!Number.isFinite(v1v) || v1v <= 0) return need("V1 (starting volume)")
      if (!Number.isFinite(c2v) || c2v <= 0) return need("C2 (final concentration)")
      value = (c1v * v1v) / c2v

      const diluent = value - v1v

      setResult(
        `V2 (final total volume): ${formatNumber(value, 4)}\n` +
          `Diluent to add (V2 − V1): ${formatNumber(diluent, 4)}`
      )

      setWorking(`STEP 1 — INPUTS
C1 = ${formatNumber(c1v, 6)}
V1 = ${formatNumber(v1v, 6)}
C2 = ${formatNumber(c2v, 6)}

STEP 2 — FORMULA
C1 × V1 = C2 × V2
V2 = (C1 × V1) ÷ C2

STEP 3 — CALCULATION
V2 = (${formatNumber(c1v, 6)} × ${formatNumber(v1v, 6)}) ÷ ${formatNumber(c2v, 6)}
   = ${formatNumber(value, 6)}

STEP 4 — DILUENT (OPTIONAL)
Diluent = V2 − V1
        = ${formatNumber(value, 6)} − ${formatNumber(v1v, 6)}
        = ${formatNumber(diluent, 6)}`)
      return
    }

    if (solving === "C2") {
      if (!Number.isFinite(c1v) || c1v <= 0) return need("C1 (starting concentration)")
      if (!Number.isFinite(v1v) || v1v <= 0) return need("V1 (starting volume)")
      if (!Number.isFinite(v2v) || v2v <= 0) return need("V2 (final total volume)")
      value = (c1v * v1v) / v2v

      setResult(`C2 (final concentration): ${formatNumber(value, 4)}`)

      setWorking(`STEP 1 — INPUTS
C1 = ${formatNumber(c1v, 6)}
V1 = ${formatNumber(v1v, 6)}
V2 = ${formatNumber(v2v, 6)}

STEP 2 — FORMULA
C1 × V1 = C2 × V2
C2 = (C1 × V1) ÷ V2

STEP 3 — CALCULATION
C2 = (${formatNumber(c1v, 6)} × ${formatNumber(v1v, 6)}) ÷ ${formatNumber(v2v, 6)}
   = ${formatNumber(value, 6)}`)
      return
    }

    if (solving === "C1") {
      if (!Number.isFinite(v1v) || v1v <= 0) return need("V1 (starting volume)")
      if (!Number.isFinite(c2v) || c2v <= 0) return need("C2 (final concentration)")
      if (!Number.isFinite(v2v) || v2v <= 0) return need("V2 (final total volume)")
      value = (c2v * v2v) / v1v

      setResult(`C1 (starting concentration): ${formatNumber(value, 4)}`)

      setWorking(`STEP 1 — INPUTS
V1 = ${formatNumber(v1v, 6)}
C2 = ${formatNumber(c2v, 6)}
V2 = ${formatNumber(v2v, 6)}

STEP 2 — FORMULA
C1 × V1 = C2 × V2
C1 = (C2 × V2) ÷ V1

STEP 3 — CALCULATION
C1 = (${formatNumber(c2v, 6)} × ${formatNumber(v2v, 6)}) ÷ ${formatNumber(v1v, 6)}
   = ${formatNumber(value, 6)}`)
      return
    }

    // solving === "V1"
    if (!Number.isFinite(c1v) || c1v <= 0) return need("C1 (starting concentration)")
    if (!Number.isFinite(c2v) || c2v <= 0) return need("C2 (final concentration)")
    if (!Number.isFinite(v2v) || v2v <= 0) return need("V2 (final total volume)")
    value = (c2v * v2v) / c1v

    const diluent = v2v - value

    setResult(
      `V1 (stock volume): ${formatNumber(value, 4)}\n` +
        (diluent >= 0 ? `Diluent to add (V2 − V1): ${formatNumber(diluent, 4)}` : `Diluent: ${formatNumber(diluent, 4)} (check inputs)`)
    )

    setWorking(`STEP 1 — INPUTS
C1 = ${formatNumber(c1v, 6)}
C2 = ${formatNumber(c2v, 6)}
V2 = ${formatNumber(v2v, 6)}

STEP 2 — FORMULA
C1 × V1 = C2 × V2
V1 = (C2 × V2) ÷ C1

STEP 3 — CALCULATION
V1 = (${formatNumber(c2v, 6)} × ${formatNumber(v2v, 6)}) ÷ ${formatNumber(c1v, 6)}
   = ${formatNumber(value, 6)}

STEP 4 — DILUENT (OPTIONAL)
Diluent = V2 − V1
        = ${formatNumber(v2v, 6)} − ${formatNumber(value, 6)}
        = ${formatNumber(diluent, 6)}`)
  }

  const handleClear = () => {
    setC1("")
    setV1("")
    setC2("")
    setV2("")
    setResult(null)
    setWorking(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleCalculate()
  }

  const unitHint =
    solving === "C1" || solving === "C2"
      ? "Concentration units (e.g., mg/mL, IU/mL, %)"
      : "Volume units (e.g., mL)"

  return (
    <div>
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Calculator</h2>
        <p className="text-sm text-gray-500 mt-1">
          Enter the three known values, then choose what to solve for. {unitHint}
        </p>
      </div>

      {/* Solve for */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Solve for</label>
        <div className="grid gap-2 sm:grid-cols-4">
          {(["V2", "V1", "C2", "C1"] as SolveFor[]).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => {
                setSolving(k)
                setResult(null)
                setWorking(null)
              }}
              className={
                "rounded-md border px-3 py-2 text-sm font-semibold transition-colors " +
                (solving === k
                  ? "border-purple-300 bg-purple-50 text-purple-800"
                  : "border-gray-200 bg-white text-gray-800 hover:bg-gray-50")
              }
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      {/* Inputs */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="c1">C1 (starting concentration)</Label>
          <Input
            id="c1"
            inputMode="decimal"
            type="text"
            placeholder="e.g. 10"
            value={c1}
            onChange={(e) => setC1(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div>
          <Label htmlFor="v1">V1 (starting volume)</Label>
          <Input
            id="v1"
            inputMode="decimal"
            type="text"
            placeholder="e.g. 5"
            value={v1}
            onChange={(e) => setV1(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div>
          <Label htmlFor="c2">C2 (final concentration)</Label>
          <Input
            id="c2"
            inputMode="decimal"
            type="text"
            placeholder="e.g. 1"
            value={c2}
            onChange={(e) => setC2(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div>
          <Label htmlFor="v2">V2 (final total volume)</Label>
          <Input
            id="v2"
            inputMode="decimal"
            type="text"
            placeholder="e.g. 50"
            value={v2}
            onChange={(e) => setV2(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button
          onClick={handleCalculate}
          disabled={!canCalculate}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-60 sm:flex-1"
        >
          Calculate
        </Button>
        <Button onClick={handleClear} variant="outline" className="w-full sm:w-auto">
          Clear
        </Button>
      </div>

      {/* Result */}
      {result && (
        <div className="mt-6 rounded-lg border border-purple-200 bg-purple-50 p-4">
          <p className="font-semibold text-gray-900 whitespace-pre-line">{result}</p>
        </div>
      )}

      {/* Working */}
      {working && (
        <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">{working}</pre>
        </div>
      )}
    </div>
  )
}
