"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calculator, Copy, RotateCcw } from "lucide-react"

export default function MgKgToMlDoseClient() {
  const [doseMgPerKg, setDoseMgPerKg] = useState("")
  const [weightKg, setWeightKg] = useState("")
  const [concMgPerMl, setConcMgPerMl] = useState("")

  const [useFormatHelper, setUseFormatHelper] = useState(false)
  const [strengthMg, setStrengthMg] = useState("")
  const [volumeMl, setVolumeMl] = useState("")

  const [resultMl, setResultMl] = useState<number | null>(null)
  const [totalDoseMg, setTotalDoseMg] = useState<number | null>(null)

  const [decimals, setDecimals] = useState(2)
  const [copied, setCopied] = useState(false)

  const parseNumber = (str: string): number | null => {
    const cleaned = str.replace(/,/g, "").trim()
    if (!cleaned) return null
    const num = Number.parseFloat(cleaned)
    return Number.isFinite(num) ? num : null
  }

  const formatResult = (value: number, decimalPlaces: number): string => {
    if (decimalPlaces === 0) return Math.round(value).toString()
    return value.toFixed(decimalPlaces)
  }

  const handleFormatHelperChange = () => {
    if (!useFormatHelper) {
      setUseFormatHelper(true)
    } else {
      setUseFormatHelper(false)
      setStrengthMg("")
      setVolumeMl("")
      setConcMgPerMl("")
    }
  }

  const updateConcentration = () => {
    if (useFormatHelper && strengthMg && volumeMl) {
      const strength = parseNumber(strengthMg)
      const vol = parseNumber(volumeMl)
      if (strength !== null && vol !== null && vol > 0) {
        const calc = strength / vol
        setConcMgPerMl(formatResult(calc, 2))
      }
    }
  }

  const handleCalculate = () => {
    const mgPerKg = parseNumber(doseMgPerKg)
    const kg = parseNumber(weightKg)

    if (mgPerKg === null || mgPerKg <= 0) {
      alert("Please enter a valid dose in mg/kg.")
      return
    }
    if (kg === null || kg <= 0) {
      alert("Please enter a valid weight in kg.")
      return
    }

    // Determine concentration
    let conc: number | null = null

    if (useFormatHelper && strengthMg && volumeMl) {
      const strength = parseNumber(strengthMg)
      const vol = parseNumber(volumeMl)
      if (strength !== null && vol !== null && vol > 0) {
        conc = strength / vol
        setConcMgPerMl(formatResult(conc, 2))
      }
    } else {
      conc = parseNumber(concMgPerMl)
    }

    if (conc === null || conc <= 0) {
      alert("Please enter a valid concentration in mg/mL (or use the label helper).")
      return
    }

    const totalMg = mgPerKg * kg
    const volume = totalMg / conc

    setTotalDoseMg(totalMg)
    setResultMl(volume)
  }

  const handleReset = () => {
    setDoseMgPerKg("")
    setWeightKg("")
    setConcMgPerMl("")
    setUseFormatHelper(false)
    setStrengthMg("")
    setVolumeMl("")
    setResultMl(null)
    setTotalDoseMg(null)
    setDecimals(2)
    setCopied(false)
  }

  const handleCopyResult = () => {
    if (resultMl !== null) {
      const formatted = formatResult(resultMl, decimals)
      navigator.clipboard.writeText(formatted)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleCalculate()
  }

  return (
    <div className="space-y-6">
      {/* Main inputs */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Dose (mg/kg)</label>
          <input
            type="text"
            value={doseMgPerKg}
            onChange={(e) => setDoseMgPerKg(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., 10"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <p className="text-xs text-gray-500 mt-1">Enter the ordered dose per kilogram. Commas accepted if needed.</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Patient weight (kg)</label>
          <input
            type="text"
            value={weightKg}
            onChange={(e) => setWeightKg(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., 70"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <p className="text-xs text-gray-500 mt-1">Use kilograms (kg). Double-check paediatric weights.</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Concentration (mg/mL)</label>
          <input
            type="text"
            value={concMgPerMl}
            onChange={(e) => setConcMgPerMl(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., 50"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Concentration in mg per mL. Leave blank if using the label helper below.
          </p>
        </div>
      </div>

      <div className="border-t pt-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={useFormatHelper}
            onChange={handleFormatHelperChange}
            className="w-4 h-4 rounded border-gray-300 cursor-pointer"
          />
          <span className="text-sm font-medium text-gray-700">I have mg per X mL (e.g., 250 mg per 5 mL)</span>
        </label>
      </div>

      {useFormatHelper && (
        <div className="bg-cyan-50 rounded-lg p-4 space-y-4 border border-cyan-200">
          <p className="text-sm text-gray-700 font-medium">Convert label format to mg/mL:</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Strength (mg)</label>
              <input
                type="text"
                value={strengthMg}
                onChange={(e) => {
                  setStrengthMg(e.target.value)
                  if (e.target.value && volumeMl) setTimeout(updateConcentration, 0)
                }}
                placeholder="e.g., 250"
                className="w-full px-3 py-2 rounded border border-cyan-300 bg-white text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Volume (mL)</label>
              <input
                type="text"
                value={volumeMl}
                onChange={(e) => {
                  setVolumeMl(e.target.value)
                  if (e.target.value && strengthMg) setTimeout(updateConcentration, 0)
                }}
                placeholder="e.g., 5"
                className="w-full px-3 py-2 rounded border border-cyan-300 bg-white text-sm"
              />
            </div>
          </div>

          {concMgPerMl && (
            <div className="text-sm text-gray-600">
              <span className="font-medium">Calculated concentration:</span> {concMgPerMl} mg/mL
            </div>
          )}
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <Button
          onClick={handleCalculate}
          className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-3 rounded-lg"
        >
          <Calculator className="mr-2 h-4 w-4" />
          Calculate
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 bg-transparent"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {resultMl !== null && (
        <div className="rounded-lg border border-cyan-200 bg-cyan-50 p-6 space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Volume required</p>
            <p className="text-3xl font-bold text-cyan-700">{formatResult(resultMl, decimals)} mL</p>
          </div>

          {totalDoseMg !== null && (
            <div className="text-sm text-gray-700">
              <span className="font-medium">Total dose:</span> {formatResult(totalDoseMg, 2)} mg
            </div>
          )}

          <div className="border-t pt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Round to decimals:</label>
            <select
              value={decimals}
              onChange={(e) => setDecimals(Number.parseInt(e.target.value))}
              className="w-full px-3 py-2 rounded border border-gray-300 bg-white text-sm"
            >
              <option value={0}>0 decimals</option>
              <option value={1}>1 decimal</option>
              <option value={2}>2 decimals</option>
              <option value={3}>3 decimals</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Result: {formatResult(resultMl, decimals)} mL</p>
          </div>

          <button
            onClick={handleCopyResult}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-cyan-300 rounded-lg hover:bg-cyan-50 text-sm font-medium text-cyan-700 transition-colors"
          >
            {copied ? "Copied!" : "Copy result"}
            <Copy className="h-4 w-4" />
          </button>

          {/* Working out box */}
          <div className="bg-white rounded p-3 font-mono text-xs text-gray-600 space-y-1">
            <div>Total mg = (mg/kg) × kg</div>
            <div>mL = Total mg ÷ (mg/mL)</div>
            <div className="pt-1 border-t border-gray-100" />
            <div>
              Total mg = {doseMgPerKg || "—"} × {weightKg || "—"} = {totalDoseMg === null ? "—" : formatResult(totalDoseMg, 2)}
            </div>
            <div>
              mL = {totalDoseMg === null ? "—" : formatResult(totalDoseMg, 2)} ÷ {concMgPerMl || "—"} ={" "}
              {formatResult(resultMl, decimals)}
            </div>
          </div>

          <div className="pt-2 border-t">
            <a
              href="/calculator/dose-calculations/mg-to-ml"
              className="text-sm text-cyan-600 hover:text-cyan-700 font-medium"
            >
              Prefer mg → mL directly? Use mg → mL →
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
