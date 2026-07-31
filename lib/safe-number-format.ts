export type SafeNumberFormatOptions = {
  /** Maximum fixed decimal places used to keep a non-zero value visible. */
  maxDecimals?: number
  /** Minimum significant digits retained when a selected precision would display zero. */
  minimumSignificantDigits?: number
  /** Remove trailing zeroes and an unused decimal point. */
  trimTrailingZeros?: boolean
}

function clampInteger(value: number, minimum: number, maximum: number): number {
  if (!Number.isFinite(value)) return minimum
  return Math.min(maximum, Math.max(minimum, Math.trunc(value)))
}

function trimFixedNumber(value: string): string {
  return value.replace(/\.?0+$/, "") || "0"
}

/**
 * Returns the fixed precision needed to keep a small non-zero value visible
 * with the requested number of significant digits.
 */
export function precisionNeededForNonZero(
  value: number,
  minimumSignificantDigits = 2,
): number {
  const absolute = Math.abs(value)
  if (!Number.isFinite(absolute) || absolute === 0 || absolute >= 1) return 0

  const digits = clampInteger(minimumSignificantDigits, 1, 6)
  const leadingDecimalZeros = Math.max(0, Math.ceil(-Math.log10(absolute)) - 1)
  return leadingDecimalZeros + digits
}

/**
 * Formats a calculated value without allowing a non-zero result to appear as
 * zero. The user's selected decimal setting is respected unless it would hide
 * the value, in which case enough decimal places are retained to show it.
 *
 * This is display formatting only. It never changes the stored calculation.
 */
export function formatSafeNumber(
  value: number,
  preferredDecimals = 2,
  options: SafeNumberFormatOptions = {},
): string {
  if (!Number.isFinite(value)) return "—"
  if (value === 0 || Object.is(value, -0)) return "0"

  const maxDecimals = clampInteger(options.maxDecimals ?? 12, 0, 15)
  const selectedDecimals = clampInteger(preferredDecimals, 0, maxDecimals)
  const minimumSignificantDigits = clampInteger(
    options.minimumSignificantDigits ?? 2,
    1,
    6,
  )
  const trimTrailingZeros = options.trimTrailingZeros ?? true

  const selectedFixed = value.toFixed(selectedDecimals)
  const selectedNumeric = Number(selectedFixed)

  let effectiveDecimals = selectedDecimals
  if (selectedNumeric === 0) {
    effectiveDecimals = Math.min(
      maxDecimals,
      Math.max(
        selectedDecimals,
        precisionNeededForNonZero(value, minimumSignificantDigits),
      ),
    )
  }

  let formatted = value.toFixed(effectiveDecimals)

  // Extremely small values may still round to zero at the fixed-decimal cap.
  // Fall back to significant notation rather than presenting a false zero.
  if (Number(formatted) === 0) {
    formatted = value.toPrecision(minimumSignificantDigits)
  }

  return trimTrailingZeros && !/[eE]/.test(formatted)
    ? trimFixedNumber(formatted)
    : formatted
}

/** Returns true when extra decimals were retained to avoid displaying zero. */
export function didAutoPreserveNonZero(
  value: number,
  preferredDecimals: number,
  options: SafeNumberFormatOptions = {},
): boolean {
  if (!Number.isFinite(value) || value === 0) return false
  const maxDecimals = clampInteger(options.maxDecimals ?? 12, 0, 15)
  const selectedDecimals = clampInteger(preferredDecimals, 0, maxDecimals)
  return Number(value.toFixed(selectedDecimals)) === 0
}
