export type UnitsVolumeMode = "unitsToMl" | "mlToUnits"

function requirePositiveFinite(value: number, label: string) {
  if (!Number.isFinite(value) || value <= 0) {
    throw new RangeError(`${label} must be a positive finite number.`)
  }
}

export function calculateUnitsVolume(
  primary: number,
  concentrationUnitsPerMl: number,
  mode: UnitsVolumeMode,
): number {
  requirePositiveFinite(primary, mode === "unitsToMl" ? "Dose in units" : "Volume in mL")
  requirePositiveFinite(concentrationUnitsPerMl, "Concentration in units/mL")

  return mode === "unitsToMl"
    ? primary / concentrationUnitsPerMl
    : primary * concentrationUnitsPerMl
}
