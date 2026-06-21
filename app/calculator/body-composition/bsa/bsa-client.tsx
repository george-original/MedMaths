"use client"

import type React from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type FormulaKey = "mosteller" | "dubois" | "haycock" | "gehan"

type CalcOk = {
  ok: true
  bsa: number
  formulaKey: FormulaKey
  formulaName: string
  heightCm: number
  weightKg: number
  working: string
}
type CalcErr = { ok: false; errors: string[] }
type CalcState = CalcOk | CalcErr

function parseNumber(raw: string): number | null {
  const cleaned = raw.replace(/,/g, "").trim()
  if (!cleaned) return null
  const n = Number(cleaned)
  return Number.isFinite(n) ? n : null
}

function trimZerosFixed(n: number, decimals: number): string {
  return n.toFixed(decimals).replace(/\.?0+$/, "")
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n))
}

function formulaDisplayName(key: FormulaKey) {
  switch (key) {
    case "mosteller":
      return "Mosteller"
    case "dubois":
      return "DuBois"
    case "haycock":
      return "Haycock"
    case "gehan":
      return "Gehan & George"
  }
}

/**
 * IMPORTANT:
 * This is defined OUTSIDE the client component so it does NOT remount on every keypress.
 * That’s what was causing the “one digit at a time” focus loss.
 */
function BSAForm(props: {
  compact?: boolean
  height: string
  weight: string
  formula: FormulaKey
  submitted: boolean
  calc: CalcState | null
  setHeight: (v: string) => void
  setWeight: (v: string) => void
  setFormula: (v: FormulaKey) => void
  onCalculate: () => void
  onClear: () => void
}) {
  const {
    compact = false,
    height,
    weight,
    formula,
    submitted,
    calc,
    setHeight,
    setWeight,
    setFormula,
    onCalculate,
    onClear,
  } = props

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === "NumpadEnter") {
      e.preventDefault()
      onCalculate()
    }
  }

  const heightId = compact ? "heightWidget" : "height"
  const weightId = compact ? "weightWidget" : "weight"
  const formulaId = compact ? "formulaWidget" : "formula"

  return (
    <div className={compact ? "space-y-4" : "space-y-6"} onKeyDown={handleKeyDown}>
      <div className="space-y-2">
        <Label htmlFor={formulaId}>Formula</Label>
        <Select value={formula} onValueChange={(v) => setFormula(v as FormulaKey)}>
          <SelectTrigger id={formulaId} className="w-full">
            <SelectValue placeholder="Select formula" />
          </SelectTrigger>

          {/* If this is used inside a floating widget, the portal menu must sit above it */}
          <SelectContent className="z-[90]">
            <SelectItem value="mosteller">Mosteller (Most common)</SelectItem>
            <SelectItem value="dubois">DuBois</SelectItem>
            <SelectItem value="haycock">Haycock</SelectItem>
            <SelectItem value="gehan">Gehan & George</SelectItem>
          </SelectContent>
        </Select>

        {!compact && <p className="text-sm text-gray-600">Tip: commas are allowed (e.g. 1,000).</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={heightId}>Height (cm)</Label>
          <Input
            id={heightId}
            inputMode="decimal"
            placeholder="e.g. 170"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={weightId}>Weight (kg)</Label>
          <Input
            id={weightId}
            inputMode="decimal"
            placeholder="e.g. 70"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
      </div>

      {/* Buttons:
          - On-page: Calculate is wider like your golden standard
          - Widget: compact buttons side-by-side
      */}
      {compact ? (
        <div className="flex gap-2">
          <Button className="bg-emerald-600 hover:bg-emerald-700 h-9 px-3" onClick={onCalculate} type="button">
            Calculate
          </Button>
          <Button variant="outline" className="h-9 px-3 bg-transparent" onClick={onClear} type="button">
            Clear
          </Button>
        </div>
      ) : (
        <div className="grid gap-3 sm:flex sm:flex-wrap sm:gap-3">
          <Button
            className="bg-emerald-600 hover:bg-emerald-700 w-full sm:w-auto sm:min-w-[220px] px-8"
            onClick={onCalculate}
            type="button"
          >
            Calculate
          </Button>
          <Button variant="outline" className="w-full sm:w-auto px-8 bg-transparent" onClick={onClear} type="button">
            Clear
          </Button>
        </div>
      )}

      {submitted && calc && calc.ok && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
          <p className="text-sm font-semibold text-emerald-900">Result</p>
          <p className="mt-2 text-2xl font-bold text-emerald-900">{calc.bsa.toFixed(2)} m²</p>
          <p className="mt-1 text-sm text-emerald-900/80">Formula: {calc.formulaName}</p>

          <div className="mt-4">
            <p className="text-sm font-semibold text-emerald-900">Working out</p>
            <pre className="mt-2 overflow-x-auto rounded-lg border border-emerald-200 bg-white p-4 font-mono text-sm text-gray-900 whitespace-pre-wrap">
              {calc.working}
            </pre>
          </div>
        </div>
      )}

      {submitted && calc && !calc.ok && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <p className="text-sm font-semibold text-red-900">Check your inputs</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-red-900">
            {calc.errors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      )}

      {!compact && (
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Educational use only.</span> Always follow local policy for dosing and
            verify calculations in clinical context.
          </p>
        </div>
      )}
    </div>
  )
}

export default function BSAClient() {
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [formula, setFormula] = useState<FormulaKey>("mosteller")
  const [submitted, setSubmitted] = useState(false)

  // Floating widget
  const [widgetOpen, setWidgetOpen] = useState(false)
  const widgetRef = useRef<HTMLDivElement | null>(null)
  const dragState = useRef({
    dragging: false,
    pointerId: null as number | null,
    startX: 0,
    startY: 0,
    startLeft: 0,
    startTop: 0,
  })

  const [pos, setPos] = useState<{ left: number; top: number }>({ left: 24, top: 120 })

  const calc: CalcState | null = useMemo(() => {
    if (!submitted) return null

    const h = parseNumber(height)
    const w = parseNumber(weight)
    const errors: string[] = []

    if (h === null) errors.push("Enter a height (cm).")
    if (w === null) errors.push("Enter a weight (kg).")

    if (h !== null && h <= 0) errors.push("Height must be greater than 0.")
    if (w !== null && w <= 0) errors.push("Weight must be greater than 0.")

    if (h !== null && (h < 40 || h > 250)) errors.push("Height looks out of range (enter cm).")
    if (w !== null && (w < 2 || w > 400)) errors.push("Weight looks out of range (enter kg).")

    if (errors.length) return { ok: false, errors }

    const heightCm = h as number
    const weightKg = w as number
    const key = formula
    const name = formulaDisplayName(key)

    let bsa = 0
    let lines: string[] = []

    if (key === "mosteller") {
      const product = heightCm * weightKg
      const divided = product / 3600
      bsa = Math.sqrt(divided)

      lines = [
        `STEP 1 — Inputs`,
        `Height = ${trimZerosFixed(heightCm, 1)} cm`,
        `Weight = ${trimZerosFixed(weightKg, 1)} kg`,
        ``,
        `STEP 2 — Mosteller formula`,
        `BSA (m²) = √[(Height × Weight) / 3600]`,
        ``,
        `STEP 3 — Substitute`,
        `BSA = √[(${trimZerosFixed(heightCm, 1)} × ${trimZerosFixed(weightKg, 1)}) / 3600]`,
        `BSA = √[${trimZerosFixed(product, 2)} / 3600]`,
        `BSA = √${divided.toFixed(6)}`,
        ``,
        `STEP 4 — Result`,
        `BSA = ${bsa.toFixed(2)} m²`,
      ]
    } else if (key === "dubois") {
      const a = 0.007184
      const hPow = Math.pow(heightCm, 0.725)
      const wPow = Math.pow(weightKg, 0.425)
      bsa = a * hPow * wPow

      lines = [
        `STEP 1 — Inputs`,
        `Height = ${trimZerosFixed(heightCm, 1)} cm`,
        `Weight = ${trimZerosFixed(weightKg, 1)} kg`,
        ``,
        `STEP 2 — DuBois formula`,
        `BSA (m²) = 0.007184 × Height^0.725 × Weight^0.425`,
        ``,
        `STEP 3 — Substitute`,
        `Height^0.725 = ${trimZerosFixed(heightCm, 1)}^0.725 = ${hPow.toFixed(4)}`,
        `Weight^0.425 = ${trimZerosFixed(weightKg, 1)}^0.425 = ${wPow.toFixed(4)}`,
        `BSA = 0.007184 × ${hPow.toFixed(4)} × ${wPow.toFixed(4)}`,
        ``,
        `STEP 4 — Result`,
        `BSA = ${bsa.toFixed(2)} m²`,
      ]
    } else if (key === "haycock") {
      const a = 0.024265
      const hPow = Math.pow(heightCm, 0.3964)
      const wPow = Math.pow(weightKg, 0.5378)
      bsa = a * hPow * wPow

      lines = [
        `STEP 1 — Inputs`,
        `Height = ${trimZerosFixed(heightCm, 1)} cm`,
        `Weight = ${trimZerosFixed(weightKg, 1)} kg`,
        ``,
        `STEP 2 — Haycock formula`,
        `BSA (m²) = 0.024265 × Height^0.3964 × Weight^0.5378`,
        ``,
        `STEP 3 — Substitute`,
        `Height^0.3964 = ${trimZerosFixed(heightCm, 1)}^0.3964 = ${hPow.toFixed(4)}`,
        `Weight^0.5378 = ${trimZerosFixed(weightKg, 1)}^0.5378 = ${wPow.toFixed(4)}`,
        `BSA = 0.024265 × ${hPow.toFixed(4)} × ${wPow.toFixed(4)}`,
        ``,
        `STEP 4 — Result`,
        `BSA = ${bsa.toFixed(2)} m²`,
      ]
    } else {
      const a = 0.0235
      const hPow = Math.pow(heightCm, 0.42246)
      const wPow = Math.pow(weightKg, 0.51456)
      bsa = a * hPow * wPow

      lines = [
        `STEP 1 — Inputs`,
        `Height = ${trimZerosFixed(heightCm, 1)} cm`,
        `Weight = ${trimZerosFixed(weightKg, 1)} kg`,
        ``,
        `STEP 2 — Gehan & George formula`,
        `BSA (m²) = 0.0235 × Height^0.42246 × Weight^0.51456`,
        ``,
        `STEP 3 — Substitute`,
        `Height^0.42246 = ${trimZerosFixed(heightCm, 1)}^0.42246 = ${hPow.toFixed(4)}`,
        `Weight^0.51456 = ${trimZerosFixed(weightKg, 1)}^0.51456 = ${wPow.toFixed(4)}`,
        `BSA = 0.0235 × ${hPow.toFixed(4)} × ${wPow.toFixed(4)}`,
        ``,
        `STEP 4 — Result`,
        `BSA = ${bsa.toFixed(2)} m²`,
      ]
    }

    return {
      ok: true,
      bsa,
      formulaKey: key,
      formulaName: name,
      heightCm,
      weightKg,
      working: lines.join("\n"),
    }
  }, [submitted, height, weight, formula])

  function handleCalculate() {
    setSubmitted(true)
  }

  function handleClear() {
    setHeight("")
    setWeight("")
    setFormula("mosteller")
    setSubmitted(false)
  }

  function openWidget() {
    setWidgetOpen(true)
    setPos({ left: Math.max(16, Math.floor(window.innerWidth * 0.55)), top: 120 })
  }

  function closeWidget() {
    setWidgetOpen(false)
  }

  // ESC closes widget
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setWidgetOpen(false)
    }
    if (widgetOpen) window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [widgetOpen])

  // Clamp into viewport on open/resize
  useEffect(() => {
    function clampIntoView() {
      if (!widgetOpen) return
      const el = widgetRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const maxLeft = Math.max(8, window.innerWidth - r.width - 8)
      const maxTop = Math.max(8, window.innerHeight - r.height - 8)
      setPos((p) => ({ left: clamp(p.left, 8, maxLeft), top: clamp(p.top, 8, maxTop) }))
    }
    clampIntoView()
    window.addEventListener("resize", clampIntoView)
    return () => window.removeEventListener("resize", clampIntoView)
  }, [widgetOpen])

  function onPointerDownHeader(e: React.PointerEvent) {
    const el = widgetRef.current
    if (!el) return
    try {
      ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    } catch {}
    dragState.current = {
      dragging: true,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      startLeft: pos.left,
      startTop: pos.top,
    }
  }

  function onPointerMoveHeader(e: React.PointerEvent) {
    const st = dragState.current
    if (!st.dragging) return
    const el = widgetRef.current
    if (!el) return

    const dx = e.clientX - st.startX
    const dy = e.clientY - st.startY

    const r = el.getBoundingClientRect()
    const maxLeft = Math.max(8, window.innerWidth - r.width - 8)
    const maxTop = Math.max(8, window.innerHeight - r.height - 8)

    setPos({ left: clamp(st.startLeft + dx, 8, maxLeft), top: clamp(st.startTop + dy, 8, maxTop) })
  }

  function onPointerUpHeader(e: React.PointerEvent) {
    const st = dragState.current
    if (!st.dragging) return
    st.dragging = false
    st.pointerId = null
    try {
      ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
    } catch {}
  }

  return (
    <div className="relative">
      {/* Button inside the calculator card, top-right. Desktop only. */}
      <div className="mb-4 flex justify-end">
        <Button
          className="hidden md:inline-flex bg-emerald-600 hover:bg-emerald-700"
          onClick={openWidget}
          type="button"
        >
          Open floating widget
        </Button>
      </div>

      {/* Normal in-page calculator */}
      <BSAForm
        height={height}
        weight={weight}
        formula={formula}
        submitted={submitted}
        calc={calc}
        setHeight={setHeight}
        setWeight={setWeight}
        setFormula={setFormula}
        onCalculate={handleCalculate}
        onClear={handleClear}
      />

      {/* Floating draggable widget (desktop only) */}
      {widgetOpen && (
        <div className="hidden md:block">
          <div
            ref={widgetRef}
            className="fixed z-[80] w-[440px] max-w-[calc(100vw-24px)] rounded-2xl border border-gray-200 bg-white shadow-xl"
            style={{ left: pos.left, top: pos.top }}
            role="dialog"
            aria-label="BSA floating widget"
          >
            {/* Green header / drag handle */}
            <div
              className="flex items-center justify-between gap-3 rounded-t-2xl border-b border-emerald-700/20 bg-emerald-600 px-4 py-3 text-white"
              onPointerDown={onPointerDownHeader}
              onPointerMove={onPointerMoveHeader}
              onPointerUp={onPointerUpHeader}
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-sm font-bold">
                  MM
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold leading-tight">BSA Calculator</p>
                  <p className="text-xs text-white/80">Drag this bar • ESC to close</p>
                </div>
              </div>

              <button
                type="button"
                onPointerDown={(e) => {
                  // Prevent the header drag handler from capturing this pointer
                  e.preventDefault()
                  e.stopPropagation()
                }}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  closeWidget()
                }}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/25 text-white hover:bg-white/10"
                aria-label="Close widget"
              >
                ✕
              </button>
            </div>
            {/* Scrollable body */}
            <div className="max-h-[calc(100vh-180px)] overflow-y-auto p-4">
              <BSAForm
                compact
                height={height}
                weight={weight}
                formula={formula}
                submitted={submitted}
                calc={calc}
                setHeight={setHeight}
                setWeight={setWeight}
                setFormula={setFormula}
                onCalculate={handleCalculate}
                onClear={handleClear}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
