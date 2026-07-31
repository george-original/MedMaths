export type TabletFraction = 0 | 0.25 | 0.5 | 0.75
export type TabletVisualKind = "whole-or-standard-fraction" | "awkward" | "invalid"
export type TabletBurdenLevel = "standard" | "large" | "very-large"

export const TABLET_BURDEN_CAUTION_THRESHOLD = 5
export const TABLET_BURDEN_HIGH_THRESHOLD = 10

export type TabletVisualModel = {
  kind: TabletVisualKind
  wholeTablets: number
  fraction: TabletFraction | null
  displayText: string
  burdenLevel: TabletBurdenLevel
  burdenMessage: string | null
  splittingMessage: string | null
}

function nearlyEqual(a: number, b: number, tolerance = 0.000001) {
  return Math.abs(a - b) <= tolerance
}

function burdenForCount(tablets: number): Pick<TabletVisualModel, "burdenLevel" | "burdenMessage"> {
  if (tablets >= TABLET_BURDEN_HIGH_THRESHOLD) {
    return {
      burdenLevel: "very-large",
      burdenMessage:
        "Very large tablet count: confirm the ordered dose and the strength entered before administration. A different strength or formulation may be available, but any change must be confirmed by the prescriber or pharmacist.",
    }
  }

  if (tablets >= TABLET_BURDEN_CAUTION_THRESHOLD) {
    return {
      burdenLevel: "large",
      burdenMessage:
        "Large tablet count: recheck the prescribed dose and tablet strength. A different strength or formulation may be available, but do not substitute it without appropriate confirmation.",
    }
  }

  return { burdenLevel: "standard", burdenMessage: null }
}

export function getTabletVisualModel(tablets: number): TabletVisualModel {
  const burden = burdenForCount(tablets)

  if (!Number.isFinite(tablets) || tablets <= 0) {
    return {
      kind: "invalid",
      wholeTablets: 0,
      fraction: null,
      displayText: "Check the calculated tablet amount.",
      ...burden,
      splittingMessage: null,
    }
  }

  const wholeTablets = Math.floor(tablets)
  const decimal = tablets - wholeTablets
  const supportedFractions: TabletFraction[] = [0, 0.25, 0.5, 0.75]
  const fraction = supportedFractions.find((candidate) => nearlyEqual(decimal, candidate)) ?? null

  if (fraction === null) {
    return {
      kind: "awkward",
      wholeTablets,
      fraction: null,
      displayText: `${tablets} tablets cannot usually be represented accurately using standard whole, half or quarter tablet divisions.`,
      ...burden,
      splittingMessage:
        "Do not round the tablet count without checking the prescription, available strength, product information and local policy.",
    }
  }

  const fractionWords: Record<TabletFraction, string> = {
    0: "",
    0.25: "one quarter tablet",
    0.5: "one half tablet",
    0.75: "three quarters of a tablet",
  }
  const wholeText = wholeTablets === 0 ? "" : `${wholeTablets} whole tablet${wholeTablets === 1 ? "" : "s"}`
  const fractionText = fractionWords[fraction]
  const displayText = [wholeText, fractionText].filter(Boolean).join(" and ") || "No tablets"

  return {
    kind: "whole-or-standard-fraction",
    wholeTablets,
    fraction,
    displayText,
    ...burden,
    splittingMessage:
      fraction === 0
        ? null
        : "Only split a tablet when the specific product is suitable for splitting. Confirm the formulation, score line, product information and local policy.",
  }
}
