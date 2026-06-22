"use client"

import type React from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type SexKey = "male" | "female"
type UnitKey = "umol" | "mgdl"

type CalcOk = {
  ok: true
  crcl: number
  age: number
  weight: number
  sex: SexKey
  creatinine: number
  unit: UnitKey
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

/**
 * Defined OUTSIDE the client component so it does NOT remount on every keypress.
 */
function CrClForm(props: {
  compact?: boolean
  age: string
  weight: string
  sex: SexKey
  creatinine: string
  unit: UnitKey
  submitted: boolean
  calc: CalcState | null
  setAge: (v: string) => void
  setWeight: (v: string) => void
  setSex: (v: SexKey) => void
  setCreatinine: (v: string) => void
  setUnit: (v: UnitKey) => void
  onCalculate: () => void
  onClear: () => void
}) {
  const {
    compact = false,
    age,
    weight,
    sex,
    creatinine,
    unit,
    submitted,
    calc,
    setAge,
    setWeight,
    setSex,
    setCreatinine,
    setUnit,
    onCalculate,
    onClear,
  } = props

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === "NumpadEnter") {
      e.preventDefault()
      onCalculate()
    }
  }

  const ageId = compact ? "ageWidget" : "age"
  const weightId = compact ? "weightWidget" : "weight"
  const sexId = compact ? "sexWidget" : "sex"
  const creatinineId = compact ? "creatinineWidget" : "creatinine"
  const unitId = compact ? "unitWidget" : "unit"

  return (
    <div className={compact ? "space-y-4" : "space-y-6"} onKeyDown={handleKeyDown}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={sexId}>Sex</Label>
          <Select value={sex} onValueChange={(v) => setSex(v as SexKey)}>
            <SelectTrigger id={sexId} className="w-full">
              <SelectValue placeholder="Select sex" />
            </SelectTrigger>
            <SelectContent className="z-[90]">
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor={ageId}>Age (years)</Label>
          <Input
            id={ageId}
            inputMode="decimal"
            placeholder="e.g. 70"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={weightId}>Weight (kg)</Label>
          <Input
            id={weightId}
            inputMode="decimal"
            placeholder="e.g. 80"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={unitId}>Creatinine unit</Label>
          <Select value={unit} onValueChange={(v) => setUnit(v as UnitKey)}>
            <SelectTrigger id={unitId} className="w-full">
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent className="z-[90]">
              <SelectItem value="umol">µmol/L</SelectItem>
              <SelectItem value="mgdl">mg/dL</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={creatinineId}>
          Serum creatinine ({unit === "umol" ? "µmol/L" : "mg/dL"})
        </Label>
        <Input
          id={creatinineId}
          inputMode="decimal"
          placeholder={unit === "umol" ? "e.g. 120" : "e.g. 1.2"}
          value={creatinine}
          onChange={(e) => setCreatinine(e.target.value)}
        />
      </div>

      {!compact && <p className="text-sm text-gray-600">Tip: commas are allowed (e.g. 1,000).</p>}

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
          <p className="mt-2 text-2xl font-bold text-emerald-900">{calc.crcl.toFixed(1)} mL/min</p>
          <p className="mt-1 text-sm text-emerald-900/80">
            Cockcroft-Gault &bull; {calc.sex === "male" ? "Male" : "Female"} &bull;{" "}
            {calc.creatinine} {calc.unit === "umol" ? "µmol/L" : "mg/dL"}
          </p>

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

export default function CreatinineClearanceClient() {
  const [age, setAge] = useState("")
  const [weight, setWeight] = useState("")
  const [sex, setSex] = useState<SexKey>("male")
  const [creatinine, setCreatinine] = useState("")
  const [unit, setUnit] = useState<UnitKey>("umol")
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

    const ageVal = parseNumber(age)
    const weightVal = parseNumber(weight)
    const creatVal = parseNumber(creatinine)
    const errors: string[] = []

    if (ageVal === null) errors.push("Enter an age (years).")
    if (weightVal === null) errors.push("Enter a weight (kg).")
    if (creatVal === null) errors.push("Enter a serum creatinine value.")

    if (ageVal !== null && (ageVal < 18 || ageVal > 120)) errors.push("Age looks out of range (18–120 years).")
    if (weightVal !== null && (weightVal < 10 || weightVal > 400)) errors.push("Weight looks out of range (enter kg).")

    if (unit === "umol") {
      if (creatVal !== null && (creatVal < 10 || creatVal > 3000))
        errors.push("Creatinine looks out of range for µmol/L (10–3000).")
    } else {
      if (creatVal !== null && (creatVal < 0.1 || creatVal > 34))
        errors.push("Creatinine looks out of range for mg/dL (0.1–34).")
    }

    if (errors.length) return { ok: false, errors }

    const a = ageVal as number
    const w = weightVal as number
    const cr = creatVal as number
    const sexFactor = sex === "male" ? 1.0 : 0.85
    const sexLabel = sex === "male" ? "1.0 (male)" : "0.85 (female)"

    let crcl: number
    let lines: string[]

    if (unit === "umol") {
      // CrCl = ((140 − age) × weight × sex factor) / (0.814 × creatinine µmol/L)
      const numerator = (140 - a) * w * sexFactor
      const denominator = 0.814 * cr
      crcl = numerator / denominator

      lines = [
        `STEP 1 — Inputs`,
        `Age    = ${trimZerosFixed(a, 0)} years`,
        `Weight = ${trimZerosFixed(w, 1)} kg`,
        `Sex factor = ${sexLabel}`,
        `Creatinine = ${trimZerosFixed(cr, 1)} µmol/L`,
        ``,
        `STEP 2 — Cockcroft-Gault (SI units)`,
        `CrCl = ((140 − age) × weight × sex factor) ÷ (0.814 × creatinine)`,
        ``,
        `STEP 3 — Substitute`,
        `Numerator   = (140 − ${trimZerosFixed(a, 0)}) × ${trimZerosFixed(w, 1)} × ${sexFactor}`,
        `            = ${trimZerosFixed(140 - a, 0)} × ${trimZerosFixed(w, 1)} × ${sexFactor}`,
        `            = ${numerator.toFixed(2)}`,
        `Denominator = 0.814 × ${trimZerosFixed(cr, 1)}`,
        `            = ${denominator.toFixed(4)}`,
        ``,
        `STEP 4 — Result`,
        `CrCl = ${numerator.toFixed(2)} ÷ ${denominator.toFixed(4)}`,
        `CrCl = ${crcl.toFixed(1)} mL/min`,
      ]
    } else {
      // CrCl = ((140 − age) × weight × sex factor) / (72 × creatinine mg/dL)
      const numerator = (140 - a) * w * sexFactor
      const denominator = 72 * cr
      crcl = numerator / denominator

      lines = [
        `STEP 1 — Inputs`,
        `Age    = ${trimZerosFixed(a, 0)} years`,
        `Weight = ${trimZerosFixed(w, 1)} kg`,
        `Sex factor = ${sexLabel}`,
        `Creatinine = ${trimZerosFixed(cr, 2)} mg/dL`,
        ``,
        `STEP 2 — Cockcroft-Gault (US units)`,
        `CrCl = ((140 − age) × weight × sex factor) ÷ (72 × creatinine)`,
        ``,
        `STEP 3 — Substitute`,
        `Numerator   = (140 − ${trimZerosFixed(a, 0)}) × ${trimZerosFixed(w, 1)} × ${sexFactor}`,
        `            = ${trimZerosFixed(140 - a, 0)} × ${trimZerosFixed(w, 1)} × ${sexFactor}`,
        `            = ${numerator.toFixed(2)}`,
        `Denominator = 72 × ${trimZerosFixed(cr, 2)}`,
        `            = ${denominator.toFixed(2)}`,
        ``,
        `STEP 4 — Result`,
        `CrCl = ${numerator.toFixed(2)} ÷ ${denominator.toFixed(2)}`,
        `CrCl = ${crcl.toFixed(1)} mL/min`,
      ]
    }

    return {
      ok: true,
      crcl,
      age: a,
      weight: w,
      sex,
      creatinine: cr,
      unit,
      working: lines.join("\n"),
    }
  }, [submitted, age, weight, sex, creatinine, unit])

  function handleCalculate() {
    setSubmitted(true)
  }

  function handleClear() {
    setAge("")
    setWeight("")
    setSex("male")
    setCreatinine("")
    setUnit("umol")
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
      <CrClForm
        age={age}
        weight={weight}
        sex={sex}
        creatinine={creatinine}
        unit={unit}
        submitted={submitted}
        calc={calc}
        setAge={setAge}
        setWeight={setWeight}
        setSex={setSex}
        setCreatinine={setCreatinine}
        setUnit={setUnit}
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
            aria-label="Creatinine Clearance floating widget"
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
                  <p className="text-sm font-semibold leading-tight">CrCl Calculator</p>
                  <p className="text-xs text-white/80">Drag this bar &bull; ESC to close</p>
                </div>
              </div>

              <button
                type="button"
                onPointerDown={(e) => {
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
                &#x2715;
              </button>
            </div>
            {/* Scrollable body */}
            <div className="max-h-[calc(100vh-180px)] overflow-y-auto p-4">
              <CrClForm
                compact
                age={age}
                weight={weight}
                sex={sex}
                creatinine={creatinine}
                unit={unit}
                submitted={submitted}
                calc={calc}
                setAge={setAge}
                setWeight={setWeight}
                setSex={setSex}
                setCreatinine={setCreatinine}
                setUnit={setUnit}
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
