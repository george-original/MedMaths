"use client"

import { ShieldAlert } from "lucide-react"
import { CalculatorNotice } from "./calculator-notice"
import { CalculatorSection } from "./calculator-section"
import { formatSafeNumber } from "@/lib/safe-number-format"

export type UnitProductContext = "custom" | "insulin-u100" | "insulin-u40" | "heparin"

export type UnitsMeasurementGuideProps = {
  volumeMl: number
  doseUnits: number
  concentrationUnitsPerMl: number
  productContext: UnitProductContext
  className?: string
}

function formatNumber(value: number, decimals = 3) {
  return formatSafeNumber(value, decimals, { maxDecimals: 12 })
}

function isInsulinContext(context: UnitProductContext) {
  return context === "insulin-u100" || context === "insulin-u40"
}

export function UnitsMeasurementGuide({
  volumeMl,
  doseUnits,
  concentrationUnitsPerMl,
  productContext,
  className,
}: UnitsMeasurementGuideProps) {
  const isInsulin = isInsulinContext(productContext)
  const expectedConcentration = productContext === "insulin-u100" ? 100 : productContext === "insulin-u40" ? 40 : null
  const concentrationMatches = expectedConcentration === null || Math.abs(concentrationUnitsPerMl - expectedConcentration) < 1e-8

  return (
    <CalculatorSection
      title="Measurement and device safety"
      summary="This calculator shows the arithmetic only. It does not select or illustrate a syringe, pen, pump, route, or preparation method."
      icon={<ShieldAlert className="size-5" />}
      className={className}
    >
      <div className="space-y-3">
        {isInsulin && !concentrationMatches && (
          <CalculatorNotice variant="danger" title="Concentration mismatch">
            The entered concentration no longer matches the selected {productContext === "insulin-u100" ? "U-100" : "U-40"} example. Recheck the exact product label before using this result.
          </CalculatorNotice>
        )}

        {isInsulin && (
          <>
            <CalculatorNotice variant="danger" title="Do not choose a device from this mL result">
              The calculated volume is {formatNumber(volumeMl)} mL for {formatNumber(doseUnits)} units at {formatNumber(concentrationUnitsPerMl)} units/mL. Use only the prescribed product-specific delivery device and its labelled unit scale. Do not use this mL result to program a pen or pump, and do not use a mismatched insulin syringe.
            </CalculatorNotice>
            <CalculatorNotice variant="warning" title="Independent product check required">
              Confirm the insulin name, concentration, prescribed units, route, device, and local checking process. This page deliberately does not display a syringe scale because insulin syringe capacities and graduations vary.
            </CalculatorNotice>
          </>
        )}

        {productContext === "heparin" && (
          <CalculatorNotice variant="warning" title="Use the route-appropriate mL-marked device">
            The calculated volume is {formatNumber(volumeMl)} mL for {formatNumber(doseUnits)} units at {formatNumber(concentrationUnitsPerMl)} units/mL. Measure it only with the device required for the prescribed route and local policy. Do not interpret heparin units as insulin-syringe markings.
          </CalculatorNotice>
        )}

        {productContext === "custom" && (
          <CalculatorNotice variant="warning" title="The calculator cannot identify the correct device">
            The calculated volume is {formatNumber(volumeMl)} mL. Units are product-specific, so confirm the medicine, exact concentration, route, and required measuring or delivery device before using the result. No syringe or device visual is provided for a custom concentration.
          </CalculatorNotice>
        )}
      </div>
    </CalculatorSection>
  )
}
