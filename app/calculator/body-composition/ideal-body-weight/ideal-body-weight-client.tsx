"use client"

import * as React from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { Button } from "@/components/ui/button"
import { Copy, RotateCcw, X, Move, ExternalLink } from "lucide-react"

type Sex = "male" | "female"
type Pt = { x: number; y: number }
type WeightUnit = "kg" | "lb"

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max)
}

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

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (pointer: fine)")
    const onChange = () => setIsDesktop(mq.matches)
    onChange()
    mq.addEventListener?.("change", onChange)
    return () => mq.removeEventListener?.("change", onChange)
  }, [])
  return isDesktop
}

/** Simple segmented toggle (emerald theme) */
function SexToggle({ sex, onChange }: { sex: Sex; onChange: (next: Sex) => void }) {
  return (
    <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
      <button
        type="button"
        onClick={() => onChange("male")}
        className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
          sex === "male" ? "bg-emerald-600 text-white" : "text-gray-700 hover:bg-gray-50"
        }`}
        aria-pressed={sex === "male"}
      >
        Male
      </button>
      <button
        type="button"
        onClick={() => onChange("female")}
        className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
          sex === "female" ? "bg-emerald-600 text-white" : "text-gray-700 hover:bg-gray-50"
        }`}
        aria-pressed={sex === "female"}
      >
        Female
      </button>
    </div>
  )
}

function WeightUnitToggle({ unit, onChange }: { unit: WeightUnit; onChange: (u: WeightUnit) => void }) {
  return (
    <div className="inline-flex rounded-lg border border-emerald-200 bg-white p-1">
      <button
        type="button"
        onClick={() => onChange("kg")}
        className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
          unit === "kg" ? "bg-emerald-600 text-white" : "text-gray-700 hover:bg-gray-50"
        }`}
        aria-pressed={unit === "kg"}
      >
        kg
      </button>
      <button
        type="button"
        onClick={() => onChange("lb")}
        className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
          unit === "lb" ? "bg-emerald-600 text-white" : "text-gray-700 hover:bg-gray-50"
        }`}
        aria-pressed={unit === "lb"}
      >
        lb
      </button>
    </div>
  )
}

type CalcOk = {
  ok: true
  heightCm: number
  heightIn: number
  inchesOver60: number
  baseKg: number
  ibwKg: number
  working: string
  // optional weight
  actualWeightKg?: number
  actualWeightUnit?: WeightUnit
}
type CalcErr = { ok: false; errors: string[] }

const LB_TO_KG = 0.45359237

export default function IdealBodyWeightClient() {
  // Inputs
  const [heightCmRaw, setHeightCmRaw] = useState("")
  const [useFeetInches, setUseFeetInches] = useState(false)
  const [heightFtRaw, setHeightFtRaw] = useState("")
  const [heightInRaw, setHeightInRaw] = useState("")
  const [sex, setSex] = useState<Sex>("male")

  // Optional weight
  const [weightRaw, setWeightRaw] = useState("")
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("kg")

  // Output / UI
  const [result, setResult] = useState<CalcOk | null>(null)
  const [errors, setErrors] = useState<string[] | null>(null)
  const [decimals, setDecimals] = useState(1)
  const [copied, setCopied] = useState(false)

  // Floating widget (desktop only)
  const isDesktop = useIsDesktop()
  const [mounted, setMounted] = useState(false)
  const [widgetOpen, setWidgetOpen] = useState(false)

  const defaultPos: Pt = useMemo(() => ({ x: 24, y: 120 }), [])
  const [pos, setPos] = useState<Pt>(defaultPos)
  const widgetRef = useRef<HTMLDivElement | null>(null)

  // Drag refs
  const draggingRef = useRef(false)
  const startRef = useRef<{ pointerX: number; pointerY: number; startX: number; startY: number }>({
    pointerX: 0,
    pointerY: 0,
    startX: 0,
    startY: 0,
  })

  useEffect(() => setMounted(true), [])

  // ESC closes widget (only while open)
  useEffect(() => {
    if (!widgetOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        setWidgetOpen(false)
        draggingRef.current = false
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [widgetOpen])

  // Restore saved widget position
  useEffect(() => {
    if (!mounted) return
    try {
      const raw = localStorage.getItem("medmaths_ibw_widget_pos")
      if (!raw) return
      const parsed = JSON.parse(raw) as Pt
      if (typeof parsed?.x === "number" && typeof parsed?.y === "number") setPos(parsed)
    } catch {}
  }, [mounted])

  useEffect(() => {
    if (!mounted) return
    try {
      localStorage.setItem("medmaths_ibw_widget_pos", JSON.stringify(pos))
    } catch {}
  }, [pos, mounted])

  // Close widget if not desktop
  useEffect(() => {
    if (!mounted) return
    if (!isDesktop && widgetOpen) setWidgetOpen(false)
  }, [isDesktop, widgetOpen, mounted])

  const clampToViewport = (next: Pt) => {
    const margin = 8
    const el = widgetRef.current
    const w = el?.offsetWidth ?? 460
    const h = el?.offsetHeight ?? 620
    const vw = window.innerWidth
    const vh = window.innerHeight
    return {
      x: clamp(next.x, margin, Math.max(margin, vw - w - margin)),
      y: clamp(next.y, margin, Math.max(margin, vh - h - margin)),
    }
  }

  const beginDrag = (e: React.PointerEvent) => {
    if (!isDesktop || !widgetRef.current) return
    draggingRef.current = true
    startRef.current = { pointerX: e.clientX, pointerY: e.clientY, startX: pos.x, startY: pos.y }
    ;(e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId)
  }

  const onDragMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return
    const dx = e.clientX - startRef.current.pointerX
    const dy = e.clientY - startRef.current.pointerY
    setPos(
      clampToViewport({
        x: startRef.current.startX + dx,
        y: startRef.current.startY + dy,
      })
    )
  }

  const endDrag = () => {
    draggingRef.current = false
  }

  useEffect(() => {
    if (!mounted || !widgetOpen) return
    const raf = requestAnimationFrame(() => setPos((p) => clampToViewport(p)))
    const onResize = () => setPos((p) => clampToViewport(p))
    window.addEventListener("resize", onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", onResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widgetOpen, mounted])

  function resolveHeightCm(): { heightCm: number | null } {
    if (useFeetInches) {
      const ft = parseNumber(heightFtRaw)
      const inch = parseNumber(heightInRaw)
      if (ft === null && inch === null) return { heightCm: null }
      if (ft !== null && ft < 0) return { heightCm: null }
      if (inch !== null && inch < 0) return { heightCm: null }
      const totalIn = (ft ?? 0) * 12 + (inch ?? 0)
      if (!Number.isFinite(totalIn) || totalIn <= 0) return { heightCm: null }
      return { heightCm: totalIn * 2.54 }
    }

    const heightCm = parseNumber(heightCmRaw)
    if (heightCm === null) return { heightCm: null }
    return { heightCm }
  }

  function resolveOptionalWeightKg(): { weightKg: number | null; weightLine: string | null; error: string | null } {
    const w = parseNumber(weightRaw)
    if (w === null) return { weightKg: null, weightLine: null, error: null } // not provided

    if (w <= 0) return { weightKg: null, weightLine: null, error: "Actual weight must be greater than 0 (or leave blank)." }

    // sanity range (optional)
    if (weightUnit === "kg") {
      if (w < 10 || w > 500) return { weightKg: null, weightLine: null, error: "Actual weight looks out of range — check units." }
      return { weightKg: w, weightLine: `Actual weight = ${formatResult(w, 1)} kg`, error: null }
    }

    // lb
    if (w < 20 || w > 1100) return { weightKg: null, weightLine: null, error: "Actual weight looks out of range — check units." }
    const kg = w * LB_TO_KG
    return {
      weightKg: kg,
      weightLine: `Actual weight = ${formatResult(w, 1)} lb → ${formatResult(kg, 1)} kg`,
      error: null,
    }
  }

  const calculate = () => {
    const nextErrors: string[] = []

    const { heightCm } = resolveHeightCm()
    if (heightCm === null) {
      nextErrors.push(useFeetInches ? "Please enter height in feet/inches (or turn that option off and use cm)." : "Please enter a height in cm.")
    } else {
      if (heightCm <= 0) nextErrors.push("Height must be greater than 0.")
      if (heightCm < 40 || heightCm > 250) nextErrors.push("Height looks out of range — check your units.")
    }

    const wResolved = resolveOptionalWeightKg()
    if (wResolved.error) nextErrors.push(wResolved.error)

    if (nextErrors.length) {
      setErrors(nextErrors)
      setResult(null)
      return
    }

    const heightIn = (heightCm as number) / 2.54
    const inchesOver60 = heightIn - 60
    const baseKg = sex === "male" ? 50 : 45.5
    const ibwKg = baseKg + 2.3 * inchesOver60

    const sexLabel = sex === "male" ? "Male" : "Female"

    const heightLine = useFeetInches
      ? `Height = ${heightFtRaw || "—"} ft ${heightInRaw || "—"} in (≈ ${formatResult(heightCm as number, 1)} cm)`
      : `Height = ${formatResult(heightCm as number, 1)} cm`

    const workingLines = [
      `STEP 1 — Inputs`,
      `Sex = ${sexLabel}`,
      heightLine,
      ...(wResolved.weightLine ? [wResolved.weightLine] : []),
      ``,
      `STEP 2 — Convert height to inches`,
      `Height (in) = Height (cm) ÷ 2.54`,
      `Height (in) = ${formatResult(heightCm as number, 1)} ÷ 2.54 = ${heightIn.toFixed(2)} in`,
      ``,
      `STEP 3 — Devine IBW formula`,
      sex === "male"
        ? `IBW (kg) = 50 + 2.3 × (height in − 60)`
        : `IBW (kg) = 45.5 + 2.3 × (height in − 60)`,
      ``,
      `STEP 4 — Substitute`,
      `height in − 60 = ${heightIn.toFixed(2)} − 60 = ${inchesOver60.toFixed(2)}`,
      `IBW = ${formatResult(baseKg, 1)} + 2.3 × (${inchesOver60.toFixed(2)})`,
      `IBW = ${ibwKg.toFixed(2)} kg`,
    ]

    setErrors(null)
    setResult({
      ok: true,
      heightCm: heightCm as number,
      heightIn,
      inchesOver60,
      baseKg,
      ibwKg,
      working: workingLines.join("\n"),
      ...(wResolved.weightKg !== null ? { actualWeightKg: wResolved.weightKg, actualWeightUnit: weightUnit } : {}),
    })
  }

  const reset = () => {
    setHeightCmRaw("")
    setUseFeetInches(false)
    setHeightFtRaw("")
    setHeightInRaw("")
    setSex("male")
    setWeightRaw("")
    setWeightUnit("kg")
    setResult(null)
    setErrors(null)
    setDecimals(1)
    setCopied(false)
  }

  const handleCopyResult = async () => {
    if (!result) return
    const formatted = formatResult(result.ibwKg, decimals)
    try {
      await navigator.clipboard.writeText(formatted)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      alert("Copy failed. Your browser may block clipboard access.")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") calculate()
  }

  const looksOdd =
    result?.ok &&
    ((result.ibwKg < 25 && (parseNumber(heightCmRaw) !== null || useFeetInches)) ||
      (result.ibwKg > 150 && (parseNumber(heightCmRaw) !== null || useFeetInches)))

  const TopRow = (
    <div className="flex items-center justify-between gap-3">
      <SexToggle sex={sex} onChange={setSex} />

      {isDesktop && (
        <Button type="button" variant="outline" className="rounded-lg border-gray-300" onClick={() => setWidgetOpen(true)}>
          <ExternalLink className="mr-2 h-4 w-4" />
          Floating widget
        </Button>
      )}
    </div>
  )

  const ResultExtras =
    result?.ok && result.actualWeightKg !== undefined ? (
      <div className="rounded-lg border border-emerald-200 bg-white p-4">
        <p className="text-sm font-semibold text-gray-900 mb-2">Optional comparison (actual weight vs IBW)</p>
        <div className="grid gap-2 text-sm text-gray-700">
          <div>
            <span className="font-medium">Actual weight:</span> {formatResult(result.actualWeightKg, 1)} kg
          </div>
          <div>
            <span className="font-medium">Difference:</span>{" "}
            {formatResult(result.actualWeightKg - result.ibwKg, 1)} kg{" "}
            <span className="text-xs text-gray-500">(actual − IBW)</span>
          </div>
          <div>
            <span className="font-medium">% of IBW:</span>{" "}
            {formatResult((result.actualWeightKg / result.ibwKg) * 100, 0)}%
          </div>
        </div>
      </div>
    ) : null

  const ResultBlock =
    result?.ok && (
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6 space-y-4">
        <div>
          <p className="text-sm text-gray-600 mb-1">Ideal Body Weight (IBW)</p>
          <p className="text-3xl font-bold text-emerald-700">{formatResult(result.ibwKg, decimals)} kg</p>
          <p className="mt-1 text-xs text-gray-600">
            Height used: {formatResult(result.heightCm, 1)} cm ({result.heightIn.toFixed(2)} in)
          </p>
        </div>

        {looksOdd && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            <span className="font-semibold">Quick check:</span> This result looks unusual. Re-check that height and sex selection are correct.
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
          </select>
          <p className="text-xs text-gray-500 mt-1">Result: {formatResult(result.ibwKg, decimals)} kg</p>
        </div>

        <button
          onClick={handleCopyResult}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-emerald-300 rounded-lg hover:bg-emerald-50 text-sm font-medium text-emerald-700 transition-colors"
        >
          <Copy className="h-4 w-4" />
          {copied ? "Copied!" : "Copy result"}
        </button>

        {ResultExtras}

        <div className="rounded-lg border border-emerald-200 bg-white p-4">
          <p className="text-sm font-semibold text-gray-900 mb-2">Working out</p>
          <pre className="whitespace-pre-wrap overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-xs text-gray-800">
            {result.working}
          </pre>
        </div>
      </div>
    )

  const ErrorBlock =
    errors && (
      <div className="rounded-lg border border-red-200 bg-red-50 p-5">
        <p className="text-sm font-semibold text-red-900">Check your input</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-red-900">
          {errors.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      </div>
    )

  const CalculatorCard = (
    <div className="space-y-6">
      {TopRow}

      {/* Height inputs */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Height (cm){" "}
            <span className="text-xs font-medium text-gray-500">{useFeetInches ? "(optional — if using ft/in)" : "(required)"}</span>
          </label>
          <input
            type="text"
            value={heightCmRaw}
            onChange={(e) => setHeightCmRaw(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g., 175"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            disabled={useFeetInches}
          />
          <p className="text-xs text-gray-500 mt-1">Commas accepted (e.g., 1,750). Press Enter to calculate.</p>
        </div>

        <div className="border-t pt-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={useFeetInches}
              onChange={() => {
                setUseFeetInches((prev) => {
                  const next = !prev
                  setResult(null)
                  setErrors(null)
                  setCopied(false)
                  if (!next) {
                    setHeightFtRaw("")
                    setHeightInRaw("")
                  } else {
                    setHeightCmRaw("")
                  }
                  return next
                })
              }}
              className="w-4 h-4 rounded border-gray-300 cursor-pointer"
            />
            <span className="text-sm font-medium text-gray-700">I want to enter height in feet + inches (optional)</span>
          </label>
        </div>

        {useFeetInches && (
          <div className="bg-emerald-50 rounded-lg p-4 space-y-4 border border-emerald-200">
            <p className="text-sm text-gray-700 font-medium">Enter height in ft/in:</p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Feet</label>
                <input
                  type="text"
                  value={heightFtRaw}
                  onChange={(e) => setHeightFtRaw(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="e.g., 5"
                  className="w-full px-3 py-2 rounded border border-emerald-300 bg-white text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Inches</label>
                <input
                  type="text"
                  value={heightInRaw}
                  onChange={(e) => setHeightInRaw(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="e.g., 9"
                  className="w-full px-3 py-2 rounded border border-emerald-300 bg-white text-sm"
                />
              </div>
            </div>

            <p className="text-xs text-gray-600">Tip: You can enter inches above 12 (e.g., 5 ft 14 in) — we’ll still convert it correctly.</p>
          </div>
        )}
      </div>

      {/* Optional weight */}
      <div className="border-t pt-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-gray-900">
              Actual weight <span className="text-xs font-medium text-gray-500">(optional)</span>
            </p>
            <p className="text-xs text-gray-500">This does not change IBW — it only adds an optional comparison.</p>
          </div>
          <WeightUnitToggle unit={weightUnit} onChange={setWeightUnit} />
        </div>

        <div className="mt-3">
          <input
            type="text"
            value={weightRaw}
            onChange={(e) => {
              setWeightRaw(e.target.value)
              setResult(null)
              setErrors(null)
              setCopied(false)
            }}
            onKeyDown={handleKeyDown}
            placeholder={weightUnit === "kg" ? "e.g., 82" : "e.g., 180"}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <p className="text-xs text-gray-500 mt-1">Commas accepted. Leave blank if you don’t want the comparison.</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-2">
        <Button onClick={calculate} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-lg" type="button">
          Calculate
        </Button>

        <Button onClick={reset} variant="outline" className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 bg-transparent" type="button">
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {ResultBlock}
      {ErrorBlock}

      <p className="text-center text-xs text-gray-500">Educational use only. Always interpret results in clinical context and follow local policy/protocols.</p>
    </div>
  )

  // Floating widget overlay (desktop only)
  const FloatingWidget =
    mounted && widgetOpen && isDesktop
      ? createPortal(
          <div className="fixed inset-0 z-[9999] pointer-events-none">
            <div
              ref={widgetRef}
              className="pointer-events-auto fixed"
              style={{
                left: pos.x,
                top: pos.y,
                width: 460,
                maxWidth: "calc(100vw - 16px)",
                maxHeight: "calc(100vh - 16px)",
              }}
            >
              <div className="rounded-2xl border border-gray-200 bg-white shadow-2xl overflow-hidden">
                {/* Header: drag ONLY on left handle */}
                <div className="flex items-center justify-between gap-3 px-4 py-3 bg-emerald-600 text-white select-none">
                  <div
                    className="flex items-center gap-2 flex-1"
                    onPointerDown={beginDrag}
                    onPointerMove={onDragMove}
                    onPointerUp={endDrag}
                    onPointerCancel={endDrag}
                    style={{ cursor: "grab" }}
                  >
                    <Move className="h-4 w-4 opacity-90" />
                    <p className="text-sm font-semibold">MedMaths – IBW (Devine)</p>
                  </div>

                  <button
                    type="button"
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.stopPropagation()
                      setWidgetOpen(false)
                      draggingRef.current = false
                    }}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 hover:bg-white/25 transition-colors"
                    aria-label="Close widget"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Body (scrollable) */}
                <div className="p-4 overflow-auto" style={{ maxHeight: "calc(100vh - 90px)" }}>
                  {CalculatorCard}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )
      : null

  return (
    <>
      {CalculatorCard}
      {FloatingWidget}
    </>
  )
}
