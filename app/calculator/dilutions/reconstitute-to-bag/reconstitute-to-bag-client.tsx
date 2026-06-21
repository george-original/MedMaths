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

export default function ReconstituteToFinalBagClient() {
  const [mgInVial, setMgInVial] = useState("")
  const [reconstVolume, setReconstVolume] = useState("")
  const [volumeWithdrawn, setVolumeWithdrawn] = useState("")
  const [bagVolume, setBagVolume] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const canCalculate = useMemo(() => {
    const mg = parseNumber(mgInVial)
    const rv = parseNumber(reconstVolume)
    const vw = parseNumber(volumeWithdrawn)
    const bv = parseNumber(bagVolume)
    return (
      Number.isFinite(mg) && mg > 0 && Number.isFinite(rv) && rv > 0 && Number.isFinite(vw) && vw > 0 && Number.isFinite(bv) && bv > 0
    )
  }, [mgInVial, reconstVolume, volumeWithdrawn, bagVolume])

  const calc = useMemo(() => {
    if (!submitted) return null

    const mg = parseNumber(mgInVial)
    const rv = parseNumber(reconstVolume)
    const vw = parseNumber(volumeWithdrawn)
    const bv = parseNumber(bagVolume)

    const errors: string[] = []
    if (!Number.isFinite(mg) || mg <= 0) errors.push("Enter a valid amount of drug in the vial (mg > 0).")
    if (!Number.isFinite(rv) || rv <= 0) errors.push("Enter a valid reconstitution volume (mL > 0).")
    if (!Number.isFinite(vw) || vw <= 0) errors.push("Enter a valid withdrawn volume (mL > 0).")
    if (!Number.isFinite(bv) || bv <= 0) errors.push("Enter a valid bag volume (mL > 0).")

    if (Number.isFinite(rv) && Number.isFinite(vw) && vw > rv) {
      errors.push("Withdrawn volume cannot be greater than the reconstituted vial volume.")
    }

    if (errors.length) return { ok: false as const, errors }

    // Step 1: vial concentration
    const concVial = mg / rv // mg/mL

    // Step 2: amount withdrawn (mg)
    const mgAdded = concVial * vw

    // Step 3: final bag concentration (mg/mL)
    // Assumes "bag volume" is the final total volume you want to use for the concentration calculation.
    const finalConc = mgAdded / bv

    const mgD = formatNumber(mg, 4)
    const rvD = formatNumber(rv, 4)
    const vwD = formatNumber(vw, 4)
    const bvD = formatNumber(bv, 4)

    const concVialD = formatNumber(concVial, 6)
    const mgAddedD = formatNumber(mgAdded, 4)
    const finalConcD = formatNumber(finalConc, 6)

    const result = {
      finalConc: `${finalConcD} mg/mL`,
      mgAdded: `${mgAddedD} mg added to bag`,
      vialConc: `${concVialD} mg/mL (vial after reconstitution)`,
    }

    const working = `STEP 1 — INPUTS
Drug in vial = ${mgD} mg
Reconstitution (final vial volume) = ${rvD} mL
Volume withdrawn from vial = ${vwD} mL
Bag volume used for calculation = ${bvD} mL

STEP 2 — VIAL CONCENTRATION
C(vial) = mg in vial ÷ reconstitution volume
        = ${mgD} ÷ ${rvD}
        = ${concVialD} mg/mL

STEP 3 — AMOUNT ADDED TO BAG
Amount added (mg) = C(vial) × volume withdrawn
                  = ${concVialD} × ${vwD}
                  = ${mgAddedD} mg

STEP 4 — FINAL BAG CONCENTRATION
C(final) = amount added ÷ bag volume
         = ${mgAddedD} ÷ ${bvD}
         = ${finalConcD} mg/mL`

    return { ok: true as const, result, working }
  }, [submitted, mgInVial, reconstVolume, volumeWithdrawn, bagVolume])

  function handleCalculate() {
    setSubmitted(true)
  }

  function handleClear() {
    setMgInVial("")
    setReconstVolume("")
    setVolumeWithdrawn("")
    setBagVolume("")
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
          <Label htmlFor="mgInVial">Drug amount in vial (mg)</Label>
          <Input
            id="mgInVial"
            type="text"
            inputMode="decimal"
            placeholder="e.g., 1000"
            value={mgInVial}
            onChange={(e) => setMgInVial(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="reconstVolume">Reconstitution volume (mL)</Label>
          <Input
            id="reconstVolume"
            type="text"
            inputMode="decimal"
            placeholder="e.g., 10"
            value={reconstVolume}
            onChange={(e) => setReconstVolume(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
          />
          <p className="text-xs text-gray-600">Use the **final vial volume** after reconstitution (label/monograph).</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="volumeWithdrawn">Volume withdrawn from vial (mL)</Label>
          <Input
            id="volumeWithdrawn"
            type="text"
            inputMode="decimal"
            placeholder="e.g., 5"
            value={volumeWithdrawn}
            onChange={(e) => setVolumeWithdrawn(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bagVolume">Bag volume (mL)</Label>
          <Input
            id="bagVolume"
            type="text"
            inputMode="decimal"
            placeholder="e.g., 250"
            value={bagVolume}
            onChange={(e) => setBagVolume(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
          />
          <p className="text-xs text-gray-600">Use the volume your policy uses for the final concentration check.</p>
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
        <div className="rounded-xl border border-purple-200 bg-purple-50 p-4">
          <p className="font-semibold text-gray-900">Final bag concentration: {calc.result.finalConc}</p>
          <p className="mt-1 text-sm text-gray-700">{calc.result.mgAdded}</p>
          <p className="mt-1 text-sm text-gray-700">{calc.result.vialConc}</p>

          <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">{calc.working}</pre>
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

      <p className="text-xs text-gray-500 text-center">
        Educational use only. Always verify against product information and local policy.
      </p>
    </div>
  )
}
