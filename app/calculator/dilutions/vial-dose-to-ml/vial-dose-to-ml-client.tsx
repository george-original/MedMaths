"use client"

import * as React from "react"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function parseNumber(val: string): number {
  const cleaned = val.replace(/,/g, "").trim()
  const num = Number.parseFloat(cleaned)
  return Number.isFinite(num) ? num : Number.NaN
}

function formatNumber(value: number, decimals = 2): string {
  if (!Number.isFinite(value)) return "—"
  const cleaned = Math.round(value * 1e12) / 1e12
  if (Math.abs(cleaned - Math.round(cleaned)) < 1e-12) return String(Math.round(cleaned))
  let s = cleaned.toFixed(decimals)
  s = s.replace(/\.?0+$/, "")
  return s
}

export default function VialDoseToMlClient() {
  const [vialConc, setVialConc] = useState("")
  const [doseMg, setDoseMg] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const canCalculate = useMemo(() => {
    const conc = parseNumber(vialConc)
    const dose = parseNumber(doseMg)
    return Number.isFinite(conc) && conc > 0 && Number.isFinite(dose) && dose > 0
  }, [vialConc, doseMg])

  const calc = useMemo(() => {
    if (!submitted) return null

    const conc = parseNumber(vialConc)
    const dose = parseNumber(doseMg)

    const errors: string[] = []
    if (!Number.isFinite(conc) || conc <= 0) errors.push("Enter a valid vial concentration (mg/mL > 0).")
    if (!Number.isFinite(dose) || dose <= 0) errors.push("Enter a valid prescribed dose (mg > 0).")

    if (errors.length) return { ok: false as const, errors }

    const volume = dose / conc

    const concD = formatNumber(conc, 3)
    const doseD = formatNumber(dose, 3)
    const volD = formatNumber(volume, 3)

    const working = `STEP 1 — INPUTS
Vial concentration = ${concD} mg/mL
Prescribed dose = ${doseD} mg

STEP 2 — FORMULA
Volume (mL) = Dose (mg) ÷ Concentration (mg/mL)

STEP 3 — CALCULATION
Volume = ${doseD} ÷ ${concD}
       = ${volD} mL

STEP 4 — QUICK CHECK
Check: Volume × Concentration = ${volD} × ${concD} = ${formatNumber(volume * conc, 3)} mg`

    return { ok: true as const, result: { volD }, working }
  }, [submitted, vialConc, doseMg])

  function handleCalculate() {
    setSubmitted(true)
  }

  function handleClear() {
    setVialConc("")
    setDoseMg("")
    setSubmitted(false)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault()
      handleCalculate()
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="vialConc">Vial concentration (mg/mL)</Label>
          <Input
            id="vialConc"
            value={vialConc}
            onChange={(e) => setVialConc(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. 50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="doseMg">Prescribed dose (mg)</Label>
          <Input
            id="doseMg"
            value={doseMg}
            onChange={(e) => setDoseMg(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. 75"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
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

      {submitted && calc?.ok && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4">
          <p className="text-sm text-foreground">
            Volume to withdraw: <span className="font-semibold">{calc.result.volD} mL</span>
          </p>

          <div className="mt-4 rounded-xl border border-border bg-muted/50 p-4">
            <pre className="whitespace-pre-wrap text-sm text-muted-foreground font-mono">{calc.working}</pre>
          </div>
        </div>
      )}

      {submitted && calc && !calc.ok && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-semibold text-red-900">Check your inputs</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-red-900">
            {calc.errors.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-xs text-muted-foreground text-center">
        Educational use only. Always verify vial label and follow local policy.
      </p>
    </div>
  )
}
