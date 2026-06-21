"use client"

import type React from "react"
import { useState } from "react"
import { Calculator, RotateCcw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

type Result = {
  weightKg: number
  dosePerKg: number
  strengthMg: number
  totalMg: number
  tablets: number
}

export default function MgKgToTabletsClient() {
  const [weightKg, setWeightKg] = useState("")
  const [dosePerKg, setDosePerKg] = useState("")
  const [strengthMg, setStrengthMg] = useState("")
  const [result, setResult] = useState<Result | null>(null)

  const calculate = () => {
    const weight = Number.parseFloat(weightKg)
    const dose = Number.parseFloat(dosePerKg)
    const strength = Number.parseFloat(strengthMg)

    if (!Number.isFinite(weight) || weight <= 0) return alert("Enter a valid weight in kg.")
    if (!Number.isFinite(dose) || dose <= 0) return alert("Enter a valid dose in mg/kg.")
    if (!Number.isFinite(strength) || strength <= 0) return alert("Enter a valid tablet strength in mg/tablet.")

    const totalMg = weight * dose
    const tablets = totalMg / strength

    setResult({
      weightKg: weight,
      dosePerKg: dose,
      strengthMg: strength,
      totalMg,
      tablets,
    })
  }

  const clear = () => {
    setWeightKg("")
    setDosePerKg("")
    setStrengthMg("")
    setResult(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      calculate()
    }
  }

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-600">
            <Calculator className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl">Calculator</CardTitle>
            <p className="text-sm text-muted-foreground">Convert a weight-based dose (mg/kg) into tablets</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="weightKg">Weight (kg)</Label>
            <Input
              id="weightKg"
              type="number"
              inputMode="decimal"
              placeholder="e.g., 25"
              value={weightKg}
              onChange={(e) => setWeightKg(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dosePerKg">Dose (mg/kg)</Label>
            <Input
              id="dosePerKg"
              type="number"
              inputMode="decimal"
              placeholder="e.g., 15"
              value={dosePerKg}
              onChange={(e) => setDosePerKg(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="strengthMg">Tablet strength (mg/tablet)</Label>
            <Input
              id="strengthMg"
              type="number"
              inputMode="decimal"
              placeholder="e.g., 250"
              value={strengthMg}
              onChange={(e) => setStrengthMg(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={calculate} className="flex-1 bg-orange-600 hover:bg-orange-700">
            Calculate
          </Button>
          <Button onClick={clear} variant="outline" className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Clear
          </Button>
        </div>

        {result && (
          <div className="space-y-4">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
              <p className="text-sm font-medium text-emerald-900">Result</p>

              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                <div className="rounded-lg bg-white/70 p-3">
                  <p className="text-xs text-emerald-800">Total dose</p>
                  <p className="text-2xl font-bold text-emerald-900">{result.totalMg.toFixed(2)} mg</p>
                </div>
                <div className="rounded-lg bg-white/70 p-3">
                  <p className="text-xs text-emerald-800">Tablets</p>
                  <p className="text-2xl font-bold text-emerald-900">{result.tablets.toFixed(2)}</p>
                </div>
              </div>

              <p className="mt-3 text-xs text-emerald-800">
                Exact mathematical result. Round only according to local policy (e.g., ½ or ¼ scored tablets), or use an
                alternative strength/liquid.
              </p>

              <div className="mt-4 border-t border-emerald-200 pt-4">
                <p className="text-xs font-medium text-emerald-900 mb-2">Working</p>
                <div className="space-y-1 font-mono text-sm text-emerald-900">
                  <p>Total dose (mg) = weight × dose/kg</p>
                  <p>
                    Total dose = {result.weightKg} × {result.dosePerKg} = {result.totalMg.toFixed(2)} mg
                  </p>
                  <p>Tablets = total dose ÷ strength</p>
                  <p>
                    Tablets = {result.totalMg.toFixed(2)} ÷ {result.strengthMg} = {result.tablets.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-center text-xs text-muted-foreground italic">
              Educational use only. Always verify maximum dose limits and local medication policy.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
