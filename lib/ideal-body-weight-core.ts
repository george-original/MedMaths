export type DevineSex = "male" | "female"

export type FeetInches = {
  feet: number
  inches: number
}

export type DevineCoreResult = {
  sex: DevineSex
  heightCm: number
  heightInches: number
  inchesAboveFiveFeet: number
  baseKg: number
  ibwKg: number
}

export const DEVINE_MIN_HEIGHT_CM = 152.4
export const DEVINE_MAX_HEIGHT_CM = 250

const DEVINE_BASE_KG: Record<DevineSex, number> = {
  male: 50,
  female: 45.5,
}

export function feetInchesToCm(feet: number, inches: number): number {
  return (feet * 12 + inches) * 2.54
}

export function cmToFeetInches(heightCm: number): FeetInches {
  const totalInches = heightCm / 2.54
  const feet = Math.floor(totalInches / 12)
  return { feet, inches: totalInches - feet * 12 }
}

export function isSupportedDevineHeight(heightCm: number): boolean {
  return Number.isFinite(heightCm) && heightCm >= DEVINE_MIN_HEIGHT_CM && heightCm <= DEVINE_MAX_HEIGHT_CM
}

export function assertSupportedDevineHeight(heightCm: number): void {
  if (!isSupportedDevineHeight(heightCm)) {
    throw new RangeError(
      `Devine IBW requires an adult height from ${DEVINE_MIN_HEIGHT_CM} to ${DEVINE_MAX_HEIGHT_CM} cm.`,
    )
  }
}

export function calculateDevineCore(heightCm: number, sex: DevineSex): DevineCoreResult {
  assertSupportedDevineHeight(heightCm)
  const heightInches = heightCm / 2.54
  const inchesAboveFiveFeet = heightInches - 60
  const baseKg = DEVINE_BASE_KG[sex]
  const ibwKg = baseKg + 2.3 * inchesAboveFiveFeet

  return {
    sex,
    heightCm,
    heightInches,
    inchesAboveFiveFeet,
    baseKg,
    ibwKg,
  }
}
