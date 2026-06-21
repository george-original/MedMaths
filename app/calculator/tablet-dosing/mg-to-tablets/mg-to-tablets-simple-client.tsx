"use client"

import type React from "react"
import { useState } from "react"
import { Calculator, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Result = {
  dose: number
  strength: number
  tablets: number
}

export default function MgToTabletsClient() {
  const [doseMg, setDoseMg] = useState("")
  const [strengthMg, setStrengthMg] = useState("")
  const [result, setResult] = useState<Result | null>(null)

  const calculate = () => {
    const dose = Number.parseFloat(doseMg)
    const strength = Number.parseFloat(strengthMg)

    if (!Number.isFinite(dose) || dose <= 0) return alert("Enter a valid prescribed dose in mg.")
    if (!Number.isFinite(strength) || strength <= 0) return alert("Enter a valid tablet strength in mg per tablet.")

    const tablets = dose / strength
    setResult({ dose, strength, tablets })
  }

  const clear = () => {
    setDoseMg("")
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
            <p className="text-sm text-muted-foreground">Convert a dose in mg into tablets using tablet strength</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="doseMg">Prescribed dose (mg)</Label>
            <Input
              id="doseMg"
              type="number"
              inputMode="decimal"
              placeholder="e.g., 500"
              value={doseMg}
              onChange={(e) => setDoseMg(e.target.value)}
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
              <p className="text-sm font-medium text-emerald-900">Tablets required</p>
              <p className="text-3xl font-bold text-emerald-900">{result.tablets.toFixed(2)}</p>
              <p className="mt-2 text-xs text-emerald-800">
                Exact mathematical result. Round only according to local policy (e.g., ½ or ¼ scored tablets), or use an
                alternative strength/liquid.
              </p>

              <div className="mt-4 border-t border-emerald-200 pt-4">
                <p className="text-xs font-medium text-emerald-900 mb-2">Working</p>
                <div className="space-y-1 font-mono text-sm text-emerald-900">
                  <p>Tablets = dose ÷ strength</p>
                  <p>
                    Tablets = {result.dose} ÷ {result.strength} = {result.tablets.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-center text-xs text-muted-foreground italic">
              Educational use only. Always follow your local medication policy.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
