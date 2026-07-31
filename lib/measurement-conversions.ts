export type MeasurementSystem = "metric" | "imperial"

export const CENTIMETRES_PER_INCH = 2.54
export const CENTIMETRES_PER_FOOT = 30.48
export const KILOGRAMS_PER_POUND = 0.45359237

export function feetAndInchesToCentimetres(feet: number, inches: number): number {
  return feet * CENTIMETRES_PER_FOOT + inches * CENTIMETRES_PER_INCH
}

export function poundsToKilograms(pounds: number): number {
  return pounds * KILOGRAMS_PER_POUND
}

export function kilogramsToPounds(kilograms: number): number {
  return kilograms / KILOGRAMS_PER_POUND
}

export function centimetresToFeetAndInches(centimetres: number): { feet: number; inches: number } {
  const totalInches = centimetres / CENTIMETRES_PER_INCH
  let feet = Math.floor(totalInches / 12)
  let inches = totalInches - feet * 12

  inches = Math.round(inches * 100) / 100
  if (inches >= 12) {
    feet += 1
    inches = 0
  }

  return { feet, inches }
}
