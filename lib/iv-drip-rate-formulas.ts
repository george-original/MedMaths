export type DripRateFromHourlyRateResult = {
  mlPerHour: number
  exactDropsPerMinute: number
  roundedDropsPerMinute: number
}

export type DripRateFromVolumeTimeResult = DripRateFromHourlyRateResult & {
  volumeMl: number
  durationMinutes: number
}

function requirePositiveFinite(value: number, label: string) {
  if (!Number.isFinite(value) || value <= 0) {
    throw new RangeError(`${label} must be a positive finite number.`)
  }
}

export function calculateDripRateFromHourlyRate(
  mlPerHour: number,
  dropFactorGttPerMl: number,
): DripRateFromHourlyRateResult {
  requirePositiveFinite(mlPerHour, "mL/hr rate")
  requirePositiveFinite(dropFactorGttPerMl, "drop factor")

  const exactDropsPerMinute = (mlPerHour * dropFactorGttPerMl) / 60

  return {
    mlPerHour,
    exactDropsPerMinute,
    roundedDropsPerMinute: Math.round(exactDropsPerMinute),
  }
}

export function calculateDripRateFromVolumeTime(
  volumeMl: number,
  durationMinutes: number,
  dropFactorGttPerMl: number,
): DripRateFromVolumeTimeResult {
  requirePositiveFinite(volumeMl, "volume")
  requirePositiveFinite(durationMinutes, "duration")
  requirePositiveFinite(dropFactorGttPerMl, "drop factor")

  const mlPerHour = (volumeMl * 60) / durationMinutes
  const exactDropsPerMinute = (volumeMl * dropFactorGttPerMl) / durationMinutes

  return {
    volumeMl,
    durationMinutes,
    mlPerHour,
    exactDropsPerMinute,
    roundedDropsPerMinute: Math.round(exactDropsPerMinute),
  }
}
