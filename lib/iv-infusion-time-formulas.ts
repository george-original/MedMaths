export type InfusionDurationResult = {
  hours: number
  minutes: number
}

export type InfusionCompletionResult = {
  startMinutes: number
  durationMinutes: number
  finishMinutesOfDay: number
  dayOffset: number
  displayTime24Hour: string
}

function requirePositiveFinite(value: number, label: string) {
  if (!Number.isFinite(value) || value <= 0) {
    throw new RangeError(`${label} must be a positive finite number.`)
  }
}

export function calculateInfusionDuration(
  remainingVolumeMl: number,
  rateMlPerHour: number,
): InfusionDurationResult {
  requirePositiveFinite(remainingVolumeMl, "remaining volume")
  requirePositiveFinite(rateMlPerHour, "infusion rate")

  const hours = remainingVolumeMl / rateMlPerHour
  return {
    hours,
    minutes: hours * 60,
  }
}

export function calculateInfusionCompletion(
  startMinutes: number,
  durationMinutes: number,
): InfusionCompletionResult {
  if (!Number.isFinite(startMinutes) || startMinutes < 0 || startMinutes >= 24 * 60) {
    throw new RangeError("start time must be from 00:00 to 23:59.")
  }
  requirePositiveFinite(durationMinutes, "duration")

  const roundedFinishTotalMinutes = Math.round(startMinutes + durationMinutes)
  const dayOffset = Math.floor(roundedFinishTotalMinutes / (24 * 60))
  const finishMinutesOfDay = roundedFinishTotalMinutes % (24 * 60)
  const finishHour = Math.floor(finishMinutesOfDay / 60)
  const finishMinute = finishMinutesOfDay % 60

  return {
    startMinutes,
    durationMinutes,
    finishMinutesOfDay,
    dayOffset,
    displayTime24Hour: `${String(finishHour).padStart(2, "0")}:${String(finishMinute).padStart(2, "0")}`,
  }
}
