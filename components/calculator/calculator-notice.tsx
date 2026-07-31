import type { ReactNode } from "react"
import { AlertCircle, CheckCircle2, Info, TriangleAlert } from "lucide-react"
import { cn } from "@/lib/utils"

type NoticeVariant = "theme" | "info" | "warning" | "danger" | "success" | "neutral"

const variantClasses: Record<NoticeVariant, string> = {
  theme:
    "[background-color:var(--calculator-soft)] [border-color:var(--calculator-border)] [color:var(--calculator-strong-text)]",
  info: "border-blue-200 bg-blue-50 text-blue-950",
  warning: "border-amber-200 bg-amber-50 text-amber-950",
  danger: "border-red-200 bg-red-50 text-red-950",
  success: "border-emerald-200 bg-emerald-50 text-emerald-950",
  neutral: "border-gray-200 bg-gray-50 text-gray-800",
}

const defaultIcons: Record<NoticeVariant, ReactNode> = {
  theme: <Info className="size-4" />,
  info: <Info className="size-4" />,
  warning: <TriangleAlert className="size-4" />,
  danger: <AlertCircle className="size-4" />,
  success: <CheckCircle2 className="size-4" />,
  neutral: <Info className="size-4" />,
}

export type CalculatorNoticeProps = {
  variant?: NoticeVariant
  title?: string
  children: ReactNode
  icon?: ReactNode | null
  className?: string
}

export function CalculatorNotice({
  variant = "theme",
  title,
  children,
  icon,
  className,
}: CalculatorNoticeProps) {
  const isAlert = variant === "danger" || variant === "warning"

  return (
    <div
      role={isAlert ? "alert" : "note"}
      className={cn("flex items-start gap-3 rounded-xl border px-4 py-3 text-sm leading-6", variantClasses[variant], className)}
    >
      {icon !== null && <div className="mt-1 shrink-0">{icon ?? defaultIcons[variant]}</div>}
      <div className="min-w-0">
        {title && <p className="font-semibold">{title}</p>}
        <div className={cn(title && "mt-0.5")}>{children}</div>
      </div>
    </div>
  )
}
