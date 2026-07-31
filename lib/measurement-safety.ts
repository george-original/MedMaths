export type AdministrationContext =
  | "oral-enteral"
  | "subcutaneous"
  | "intramuscular"
  | "intravenous"
  | "unknown"

export type MeasurementSafetyLevel = "standard" | "caution" | "high-caution"

export type MeasurementSafetyGuidance = {
  level: MeasurementSafetyLevel
  title: string
  message: string
  deviceCategory:
    | "oral-enteral-device"
    | "injectable-device"
    | "iv-preparation-device"
    | "no-device-recommendation"
  requiresRouteConfirmation: boolean
  requiresPreparationConfirmation: boolean
}

export const VOLUME_GUIDE_SAFETY_RULES = [
  "Never infer the administration route from the calculated volume.",
  "Never recommend an insulin syringe for a non-insulin medicine solely because the volume is small.",
  "Never convert mL into insulin-syringe units unless the medicine, concentration and device are specifically intended for that units-based use.",
  "Keep the calculated answer in the prescribed unit and show device markings only as a visual aid.",
  "When a volume may not be measurable accurately, prompt the user to recheck the dose, concentration and units and confirm an appropriate preparation method.",
] as const

function deviceCategoryForContext(
  context: AdministrationContext,
): MeasurementSafetyGuidance["deviceCategory"] {
  if (context === "oral-enteral") return "oral-enteral-device"
  if (context === "subcutaneous" || context === "intramuscular") return "injectable-device"
  if (context === "intravenous") return "iv-preparation-device"
  return "no-device-recommendation"
}

export function getMeasurementSafetyGuidance(
  volumeMl: number,
  context: AdministrationContext,
): MeasurementSafetyGuidance {
  const deviceCategory = deviceCategoryForContext(context)
  const requiresRouteConfirmation = context === "unknown"

  if (!Number.isFinite(volumeMl) || volumeMl <= 0) {
    return {
      level: "high-caution",
      title: "Check the calculated volume",
      message: "Enter a valid positive volume before selecting a measuring or administration device.",
      deviceCategory: "no-device-recommendation",
      requiresRouteConfirmation: true,
      requiresPreparationConfirmation: true,
    }
  }

  if (volumeMl < 0.05) {
    return {
      level: "high-caution",
      title: "Very small volume",
      message:
        "Recheck the prescribed dose, concentration and units. This volume may not be measurable accurately using a standard device. Confirm an appropriate device, dilution or preparation method using product information, pharmacy guidance and local policy. Do not convert the result into insulin-syringe units unless the medicine and device are specifically intended for that use.",
      deviceCategory: "no-device-recommendation",
      requiresRouteConfirmation,
      requiresPreparationConfirmation: true,
    }
  }

  if (volumeMl < 0.1) {
    return {
      level: "caution",
      title: "Small volume",
      message:
        "Confirm the device graduations can represent this volume accurately. Recheck the dose, concentration and route before measuring or preparing the medicine.",
      deviceCategory,
      requiresRouteConfirmation,
      requiresPreparationConfirmation: true,
    }
  }

  if (requiresRouteConfirmation) {
    return {
      level: "caution",
      title: "Confirm the route first",
      message:
        "The calculated volume alone does not identify the correct device. Confirm whether the medicine is oral, enteral, subcutaneous, intramuscular or intravenous before selecting a measuring or administration device.",
      deviceCategory,
      requiresRouteConfirmation: true,
      requiresPreparationConfirmation: false,
    }
  }

  return {
    level: "standard",
    title: "Check the device markings",
    message:
      "Use a device appropriate for the prescribed route and confirm that its graduations can represent the calculated volume without unsupported rounding.",
    deviceCategory,
    requiresRouteConfirmation: false,
    requiresPreparationConfirmation: false,
  }
}
