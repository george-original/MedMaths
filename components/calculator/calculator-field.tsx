import { cloneElement, type ComponentProps, type ReactElement, type ReactNode } from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type CalculatorControlProps = {
  id?: string
  "aria-describedby"?: string
  "aria-invalid"?: boolean | "true" | "false"
  "aria-required"?: boolean | "true" | "false"
}

export type CalculatorFieldProps = {
  id: string
  label: string
  children: ReactElement<CalculatorControlProps>
  helperText?: ReactNode
  error?: string | null
  required?: boolean
  unit?: string
  className?: string
}

export function CalculatorField({
  id,
  label,
  children,
  helperText,
  error,
  required,
  unit,
  className,
}: CalculatorFieldProps) {
  const helperId = helperText ? `${id}-helper` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [helperId, errorId].filter(Boolean).join(" ") || undefined
  const control = cloneElement(children, {
    id,
    "aria-describedby": describedBy,
    "aria-invalid": Boolean(error) || undefined,
    "aria-required": required || undefined,
  })

  return (
    <div className={cn("space-y-1.5", className)} data-calculator-field>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-semibold text-gray-900">
          {label}
          {required && <span className="ml-1 text-red-600">*</span>}
        </label>
        {unit && <span className="text-xs font-medium text-gray-500">{unit}</span>}
      </div>

      {control}

      {helperText && (
        <p id={helperId} className="text-xs leading-5 text-gray-500">
          {helperText}
        </p>
      )}
      {error && <CalculatorError id={errorId}>{error}</CalculatorError>}
    </div>
  )
}

export type CalculatorInputProps = ComponentProps<typeof Input>

export function CalculatorInput({ className, ...props }: CalculatorInputProps) {
  return (
    <Input
      inputMode={props.inputMode ?? "decimal"}
      className={cn(
        "h-12 rounded-xl border-gray-300 bg-white px-4 text-base shadow-none md:text-base",
        "focus-visible:[border-color:var(--calculator-accent)] focus-visible:[--tw-ring-color:var(--calculator-focus)]",
        className,
      )}
      {...props}
    />
  )
}

export type CalculatorSelectProps = ComponentProps<"select">

export function CalculatorSelect({ className, children, ...props }: CalculatorSelectProps) {
  return (
    <select
      className={cn(
        "h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-base text-gray-900 outline-none transition-[border-color,box-shadow]",
        "focus:[border-color:var(--calculator-accent)] focus:ring-2 focus:[--tw-ring-color:var(--calculator-focus)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  )
}

export type CalculatorErrorProps = {
  id?: string
  children: ReactNode
  className?: string
}

export function CalculatorError({ id, children, className }: CalculatorErrorProps) {
  return (
    <p id={id} role="alert" className={cn("text-xs font-medium leading-5 text-red-700", className)}>
      {children}
    </p>
  )
}
