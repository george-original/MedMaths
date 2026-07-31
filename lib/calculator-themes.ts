import type { CSSProperties } from "react"

export type CalculatorThemeKey =
  | "dose"
  | "tablet"
  | "iv"
  | "body"
  | "renal"
  | "dilution"
  | "neutral"

export type CalculatorTheme = {
  key: CalculatorThemeKey
  label: string
  accent: string
  accentHover: string
  focus: string
  soft: string
  softer: string
  border: string
  text: string
  strongText: string
}

export const calculatorThemes: Record<CalculatorThemeKey, CalculatorTheme> = {
  dose: {
    key: "dose",
    label: "Dose calculations",
    accent: "#0891b2",
    accentHover: "#0e7490",
    focus: "#06b6d4",
    soft: "#ecfeff",
    softer: "#f7feff",
    border: "#a5f3fc",
    text: "#0e7490",
    strongText: "#164e63",
  },
  tablet: {
    key: "tablet",
    label: "Tablet dosing",
    accent: "#ea580c",
    accentHover: "#c2410c",
    focus: "#f97316",
    soft: "#fff7ed",
    softer: "#fffbf7",
    border: "#fed7aa",
    text: "#c2410c",
    strongText: "#7c2d12",
  },
  iv: {
    key: "iv",
    label: "IV fluids",
    accent: "#0d9488",
    accentHover: "#0f766e",
    focus: "#14b8a6",
    soft: "#f0fdfa",
    softer: "#f8fffd",
    border: "#99f6e4",
    text: "#0f766e",
    strongText: "#134e4a",
  },
  body: {
    key: "body",
    label: "Body composition",
    accent: "#059669",
    accentHover: "#047857",
    focus: "#10b981",
    soft: "#ecfdf5",
    softer: "#f7fffb",
    border: "#a7f3d0",
    text: "#047857",
    strongText: "#064e3b",
  },
  renal: {
    key: "renal",
    label: "Renal function",
    accent: "#2563eb",
    accentHover: "#1d4ed8",
    focus: "#3b82f6",
    soft: "#eff6ff",
    softer: "#f8fbff",
    border: "#bfdbfe",
    text: "#1d4ed8",
    strongText: "#1e3a8a",
  },
  dilution: {
    key: "dilution",
    label: "Dilutions",
    accent: "#9333ea",
    accentHover: "#7e22ce",
    focus: "#a855f7",
    soft: "#faf5ff",
    softer: "#fdfaff",
    border: "#e9d5ff",
    text: "#7e22ce",
    strongText: "#581c87",
  },
  neutral: {
    key: "neutral",
    label: "Calculator",
    accent: "#475569",
    accentHover: "#334155",
    focus: "#64748b",
    soft: "#f8fafc",
    softer: "#ffffff",
    border: "#cbd5e1",
    text: "#334155",
    strongText: "#0f172a",
  },
}

type CalculatorThemeStyle = CSSProperties & {
  "--calculator-accent": string
  "--calculator-accent-hover": string
  "--calculator-focus": string
  "--calculator-soft": string
  "--calculator-softer": string
  "--calculator-border": string
  "--calculator-text": string
  "--calculator-strong-text": string
}

export function getCalculatorThemeStyle(themeKey: CalculatorThemeKey): CalculatorThemeStyle {
  const theme = calculatorThemes[themeKey]

  return {
    "--calculator-accent": theme.accent,
    "--calculator-accent-hover": theme.accentHover,
    "--calculator-focus": theme.focus,
    "--calculator-soft": theme.soft,
    "--calculator-softer": theme.softer,
    "--calculator-border": theme.border,
    "--calculator-text": theme.text,
    "--calculator-strong-text": theme.strongText,
  }
}
