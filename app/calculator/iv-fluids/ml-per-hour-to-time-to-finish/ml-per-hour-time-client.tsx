"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calculator, Copy, RotateCcw } from "lucide-react"

export default function MLPerHourTimeClient() {
  const [volume, setVolume] = useState("")
  const [rate, setRate] = useState("")
  const [result, setResult] = useState<{ hours: number; hm: string } | null>(null)
  const [copied, setCopied] = useState(false)

  const handleCalculate = () => {
    const vol = Number.parseFloat(volume)
    const rateVal = Number.parseFloat(rate)

    if (!vol || vol <= 0) {
      alert("Please enter a valid volume in mL.")
      return
    }
    if (!rateVal || rateVal <= 0) {
      alert("Please enter a valid infusion rate in mL/hr.")
      return
    }

    const hours = vol / rateVal
    const wholeHours = Math.floor(hours)
    const minutes = Math.round((hours - wholeHours) * 60)
    const hm = `${wholeHours}h ${minutes}m`

    setResult({ hours, hm })
  }

  const handleReset = () => {
    setVolume("")
    setRate("")
    setResult(null)
    setCopied(false)
  }

  const handleCopyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result.hm)
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
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Volume (mL)</label>
          <input
            type="number"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., 500"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Infusion Rate (mL/hr)</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., 100"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
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

      {result && (
        <div className="rounded-lg border border-teal-200 bg-teal-50 p-6 space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Infusion time</p>
            <p className="text-3xl font-bold text-teal-700">{result.hm}</p>
            <p className="text-sm text-gray-600 mt-2">({result.hours.toFixed(2)} hours)</p>
          </div>

          <button
            onClick={handleCopyResult}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-teal-300 rounded-lg hover:bg-teal-50 text-sm font-medium text-teal-700 transition-colors"
          >
            <Copy className="h-4 w-4" />
            {copied ? "Copied!" : "Copy result"}
          </button>

          <div className="bg-white rounded p-3 font-mono text-xs text-gray-600 space-y-1">
            <div>Time (hours) = Volume (mL) ÷ Infusion rate (mL/hr)</div>
            <div>
              Time = {volume} ÷ {rate}
            </div>
            <div>
              Time = {result.hours.toFixed(2)} hours = {result.hm}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
