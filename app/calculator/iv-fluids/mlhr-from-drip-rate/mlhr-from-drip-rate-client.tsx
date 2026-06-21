"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calculator, Copy, RotateCcw } from "lucide-react"

export default function MlHrFromDripRateClient() {
  const [gttMin, setGttMin] = useState("")
  const [dropFactor, setDropFactor] = useState("20")
  const [customDropFactor, setCustomDropFactor] = useState("")
  const [result, setResult] = useState<number | null>(null)
  const [decimals, setDecimals] = useState(0)
  const [workingOut, setWorkingOut] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const parseNumber = (str: string): number | null => {
    const cleaned = str.replace(/,/g, "")
    const num = Number.parseFloat(cleaned)
    return isNaN(num) ? null : num
  }

  const getDropFactorValue = () => {
    if (dropFactor === "custom") {
      return parseNumber(customDropFactor)
    }
    return parseNumber(dropFactor)
  }

  const handleCalculate = () => {
    const drips = parseNumber(gttMin)
    const df = getDropFactorValue()

    if (drips === null || drips <= 0) {
      alert("Please enter a valid drip rate in gtt/min.")
      return
    }
    if (df === null || df <= 0) {
      alert("Please enter a valid drop factor in gtt/mL.")
      return
    }

    const mLPerMin = drips / df
    const mLPerHr = mLPerMin * 60
    const rounded = Math.round(mLPerHr)

    setResult(rounded)

    const working = `Step 1: mL/min = gtt/min ÷ drop factor
mL/min = ${drips} ÷ ${df} = ${mLPerMin.toFixed(2)} mL/min

Step 2: mL/hr = mL/min × 60
mL/hr = ${mLPerMin.toFixed(2)} × 60 = ${mLPerHr.toFixed(2)} mL/hr

Formula: mL/hr = (gtt/min × 60) ÷ drop factor
mL/hr = (${drips} × 60) ÷ ${df} = ${mLPerHr.toFixed(2)} mL/hr

Rounded: ≈ ${rounded} mL/hr`

    setWorkingOut(working)
  }

  const handleReset = () => {
    setGttMin("")
    setDropFactor("20")
    setCustomDropFactor("")
    setResult(null)
    setDecimals(0)
    setWorkingOut(null)
    setCopied(false)
  }

  const handleCopyResult = () => {
    if (result !== null) {
      navigator.clipboard.writeText(result.toString())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCalculate()
    }
  }

  return (
    <div className="space-y-6">
      {/* Main inputs */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Drip Rate (gtt/min)</label>
          <input
            type="text"
            value={gttMin}
            onChange={(e) => setGttMin(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., 42"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <p className="text-xs text-gray-500 mt-1">Enter the observed drip rate in drops per minute.</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Drop Factor (gtt/mL)</label>
          <select
            value={dropFactor}
            onChange={(e) => setDropFactor(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="10">10 gtt/mL</option>
            <option value="15">15 gtt/mL</option>
            <option value="20">20 gtt/mL</option>
            <option value="60">60 gtt/mL (microdrip)</option>
            <option value="custom">Custom...</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">Drop factor is printed on your IV tubing packaging.</p>
        </div>

        {dropFactor === "custom" && (
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Custom Drop Factor (gtt/mL)</label>
            <input
              type="text"
              value={customDropFactor}
              onChange={(e) => setCustomDropFactor(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g., 25"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          onClick={handleCalculate}
          className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 rounded-lg"
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

      {result !== null && (
        <div className="rounded-lg border border-teal-200 bg-teal-50 p-6 space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Infusion rate (mL/hr)</p>
            <p className="text-3xl font-bold text-teal-700">≈ {result} mL/hr</p>
          </div>

          <button
            onClick={handleCopyResult}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-teal-300 rounded-lg hover:bg-teal-50 text-sm font-medium text-teal-700 transition-colors"
          >
            <Copy className="h-4 w-4" />
            {copied ? "Copied!" : "Copy result"}
          </button>

          {/* Working out box */}
          <div className="bg-white rounded p-4 font-mono text-xs text-gray-600 space-y-1 border border-gray-200">
            <div className="font-semibold text-gray-800 mb-2">Working out:</div>
            {workingOut && workingOut.split("\n").map((line, i) => <div key={i}>{line}</div>)}
          </div>
        </div>
      )}

      <p className="text-xs text-gray-500 text-center mt-6">
        Results are approximate. Always verify against medical order and local protocols.
      </p>
    </div>
  )
}
