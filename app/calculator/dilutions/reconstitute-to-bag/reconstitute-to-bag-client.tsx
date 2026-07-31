"use client"

import { useRef, useState, type KeyboardEvent } from "react"
import { ArrowRight, Beaker, Syringe } from "lucide-react"

import {
  CalculatorActions,
  CalculatorCopyButton,
  CalculatorError,
  CalculatorField,
  CalculatorInput,
  CalculatorNotice,
  CalculatorResult,
  CalculatorSection,
  CalculatorShell,
  CalculatorWorking,
} from "@/components/calculator"
import { useResultReveal } from "@/hooks/use-result-reveal"
import {
  calculateFinalIvConcentration,
  type FinalIvConcentrationResult,
} from "@/lib/final-iv-concentration-formulas"
import { formatSafeNumber } from "@/lib/safe-number-format"

function parseNumber(value: string): number | null {
  const cleaned = value.replace(/,/g, "").trim()
  if (!cleaned) return null
  if (!/^(?:\d+\.?\d*|\.\d+)$/.test(cleaned)) return null

  const parsed = Number(cleaned)
  return Number.isFinite(parsed) ? parsed : null
}

function formatNumber(value: number, decimals = 3): string {
  return formatSafeNumber(value, decimals, { maxDecimals: 12 })
}

function positiveNumberError(label: string, example: string) {
  return `Enter a positive ${label} using numbers only, such as ${example}.`
}

type Errors = {
  drugAmount?: string
  finalVialVolume?: string
  transferVolume?: string
  finalTotalVolume?: string
  copy?: string
}

export default function FinalIvConcentrationClient() {
  const [drugAmountMg, setDrugAmountMg] = useState("")
  const [finalVialVolumeMl, setFinalVialVolumeMl] = useState("")
  const [transferVolumeMl, setTransferVolumeMl] = useState("")
  const [finalTotalVolumeMl, setFinalTotalVolumeMl] = useState("")
  const [result, setResult] = useState<FinalIvConcentrationResult | null>(null)
  const [errors, setErrors] = useState<Errors>({})

  const drugAmountRef = useRef<HTMLInputElement>(null)
  const finalVialVolumeRef = useRef<HTMLInputElement>(null)
  const transferVolumeRef = useRef<HTMLInputElement>(null)
  const finalTotalVolumeRef = useRef<HTMLInputElement>(null)
  const resultRef = useResultReveal<HTMLDivElement>(result !== null)

  function clearResult() {
    setResult(null)
    setErrors((current) => ({ ...current, copy: undefined }))
  }

  function calculate() {
    const nextErrors: Errors = {}
    const parsedDrugAmount = parseNumber(drugAmountMg)
    const parsedFinalVialVolume = parseNumber(finalVialVolumeMl)
    const parsedTransferVolume = parseNumber(transferVolumeMl)
    const parsedFinalTotalVolume = parseNumber(finalTotalVolumeMl)

    if (parsedDrugAmount === null || parsedDrugAmount <= 0) {
      nextErrors.drugAmount = positiveNumberError("drug amount per vial", "1000")
    }
    if (parsedFinalVialVolume === null || parsedFinalVialVolume <= 0) {
      nextErrors.finalVialVolume = positiveNumberError("verified final vial volume", "10")
    }
    if (parsedTransferVolume === null || parsedTransferVolume <= 0) {
      nextErrors.transferVolume = positiveNumberError("medicine-solution transfer volume", "5")
    }
    if (parsedFinalTotalVolume === null || parsedFinalTotalVolume <= 0) {
      nextErrors.finalTotalVolume = positiveNumberError("verified final total preparation volume", "250")
    }

    if (
      parsedTransferVolume !== null &&
      parsedTransferVolume > 0 &&
      parsedFinalTotalVolume !== null &&
      parsedFinalTotalVolume > 0 &&
      parsedFinalTotalVolume + 1e-10 < parsedTransferVolume
    ) {
      nextErrors.finalTotalVolume =
        "Final total preparation volume cannot be smaller than the medicine-solution volume transferred. Recheck the verified final volume."
    }

    setErrors(nextErrors)

    if (nextErrors.drugAmount) {
      drugAmountRef.current?.focus()
      return
    }
    if (nextErrors.finalVialVolume) {
      finalVialVolumeRef.current?.focus()
      return
    }
    if (nextErrors.transferVolume) {
      transferVolumeRef.current?.focus()
      return
    }
    if (nextErrors.finalTotalVolume) {
      finalTotalVolumeRef.current?.focus()
      return
    }

    if (
      parsedDrugAmount === null ||
      parsedFinalVialVolume === null ||
      parsedTransferVolume === null ||
      parsedFinalTotalVolume === null
    ) {
      return
    }

    try {
      setResult(
        calculateFinalIvConcentration({
          drugAmountPerVialMg: parsedDrugAmount,
          finalVialVolumePerVialMl: parsedFinalVialVolume,
          transferVolumeMl: parsedTransferVolume,
          finalTotalVolumeMl: parsedFinalTotalVolume,
        }),
      )
    } catch {
      setErrors({
        finalTotalVolume:
          "The concentration could not be calculated. Recheck all four verified values and confirm the units are mg and mL.",
      })
      finalTotalVolumeRef.current?.focus()
    }
  }

  function reset() {
    setDrugAmountMg("")
    setFinalVialVolumeMl("")
    setTransferVolumeMl("")
    setFinalTotalVolumeMl("")
    setResult(null)
    setErrors({})
    window.requestAnimationFrame(() => drugAmountRef.current?.focus())
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") calculate()
  }

  const displayedFinalConcentration = result
    ? formatNumber(result.finalConcentrationMgPerMl, 3)
    : ""
  const smallTransfer = result !== null && result.transferVolumeMl < 0.1
  const multipleVialEquivalent =
    result !== null && result.vialEquivalentsTransferred > 1 + 1e-10
  const noAdditionalCarrierRepresented =
    result !== null &&
    Math.abs(result.finalTotalVolumeMl - result.transferVolumeMl) < 1e-10
  const resultStatus =
    smallTransfer || multipleVialEquivalent || noAdditionalCarrierRepresented
      ? "warning"
      : "default"

  const workingLines = result
    ? [
        "Reconstituted vial concentration (mg/mL) = drug amount per vial (mg) ÷ verified final volume per vial (mL)",
        `Vial concentration = ${formatNumber(result.drugAmountPerVialMg, 6)} ÷ ${formatNumber(result.finalVialVolumePerVialMl, 6)}`,
        `Vial concentration = ${formatNumber(result.vialConcentrationMgPerMl, 6)} mg/mL`,
        "",
        "Amount transferred (mg) = vial concentration (mg/mL) × medicine-solution transfer volume (mL)",
        `Amount transferred = ${formatNumber(result.vialConcentrationMgPerMl, 6)} × ${formatNumber(result.transferVolumeMl, 6)}`,
        `Amount transferred = ${formatNumber(result.amountTransferredMg, 6)} mg`,
        "",
        "Final IV concentration (mg/mL) = amount transferred (mg) ÷ verified final total preparation volume (mL)",
        `Final concentration = ${formatNumber(result.amountTransferredMg, 6)} ÷ ${formatNumber(result.finalTotalVolumeMl, 6)}`,
        `Final concentration = ${displayedFinalConcentration} mg/mL`,
        `Reverse check: ${formatNumber(result.finalConcentrationMgPerMl, 6)} mg/mL × ${formatNumber(result.finalTotalVolumeMl, 6)} mL = ${formatNumber(result.reverseCheckAmountMg, 6)} mg`,
      ]
    : []

  const copyValue = result
    ? `Final IV concentration: ${displayedFinalConcentration} mg/mL. Reconstituted vial concentration: ${formatNumber(result.vialConcentrationMgPerMl, 6)} mg/mL. Medicine-solution transfer volume: ${formatNumber(result.transferVolumeMl, 6)} mL. Amount transferred: ${formatNumber(result.amountTransferredMg, 6)} mg. Verified final total preparation volume: ${formatNumber(result.finalTotalVolumeMl, 6)} mL.`
    : ""

  return (
    <CalculatorShell
      id="final-iv-concentration-tool"
      theme="dilution"
      eyebrow="IV concentration checker"
      title="Check final IV concentration after vial reconstitution"
      description="Use verified per-vial concentration details, the medicine-solution volume transferred, and the verified final total preparation volume. This calculator checks arithmetic; it does not plan the preparation."
      icon={<Beaker className="size-5" />}
    >
      <CalculatorNotice variant="warning" title="Verify all four inputs before calculating">
        Use the medicine label, product information, pharmacy label, protocol, or approved preparation source. The amount of diluent added may not equal the final vial volume, and a labelled bag size may not equal the verified final total preparation volume.
      </CalculatorNotice>

      <div className="grid gap-4 sm:grid-cols-2">
        <CalculatorField
          id="final-iv-drug-amount"
          label="Drug amount per vial"
          unit="mg"
          helperText="Enter the amount contained in each identical vial used for this check. Convert grams or micrograms before calculating."
          error={errors.drugAmount}
          required
        >
          <CalculatorInput
            ref={drugAmountRef}
            type="text"
            inputMode="decimal"
            value={drugAmountMg}
            onChange={(event) => {
              setDrugAmountMg(event.target.value)
              setErrors((current) => ({ ...current, drugAmount: undefined }))
              clearResult()
            }}
            onKeyDown={handleKeyDown}
            placeholder="e.g., 1000"
            autoComplete="off"
          />
        </CalculatorField>

        <CalculatorField
          id="final-iv-vial-volume"
          label="Verified final volume per reconstituted vial"
          unit="mL"
          helperText="Use the stated final solution volume per vial, not automatically the volume of diluent added."
          error={errors.finalVialVolume}
          required
        >
          <CalculatorInput
            ref={finalVialVolumeRef}
            type="text"
            inputMode="decimal"
            value={finalVialVolumeMl}
            onChange={(event) => {
              setFinalVialVolumeMl(event.target.value)
              setErrors((current) => ({ ...current, finalVialVolume: undefined }))
              clearResult()
            }}
            onKeyDown={handleKeyDown}
            placeholder="e.g., 10"
            autoComplete="off"
          />
        </CalculatorField>

        <CalculatorField
          id="final-iv-transfer-volume"
          label="Medicine-solution volume transferred"
          unit="mL"
          helperText="Enter the total reconstituted solution volume already specified for transfer. This may represent one or more identical vials."
          error={errors.transferVolume}
          required
        >
          <CalculatorInput
            ref={transferVolumeRef}
            type="text"
            inputMode="decimal"
            value={transferVolumeMl}
            onChange={(event) => {
              setTransferVolumeMl(event.target.value)
              setErrors((current) => ({ ...current, transferVolume: undefined }))
              clearResult()
            }}
            onKeyDown={handleKeyDown}
            placeholder="e.g., 5"
            autoComplete="off"
          />
        </CalculatorField>

        <CalculatorField
          id="final-iv-total-volume"
          label="Verified final total preparation volume"
          unit="mL"
          helperText="Use the total volume specified by the pharmacy label, product information, protocol, or approved preparation process."
          error={errors.finalTotalVolume}
          required
        >
          <CalculatorInput
            ref={finalTotalVolumeRef}
            type="text"
            inputMode="decimal"
            value={finalTotalVolumeMl}
            onChange={(event) => {
              setFinalTotalVolumeMl(event.target.value)
              setErrors((current) => ({ ...current, finalTotalVolume: undefined }))
              clearResult()
            }}
            onKeyDown={handleKeyDown}
            placeholder="e.g., 250"
            autoComplete="off"
          />
        </CalculatorField>
      </div>

      <CalculatorActions onCalculate={calculate} onReset={reset} />

      {result && (
        <>
          <CalculatorResult
            ref={resultRef}
            label="Final IV concentration"
            value={displayedFinalConcentration}
            unit="mg/mL"
            status={resultStatus}
            interpretation={
              <span>
                {formatNumber(result.amountTransferredMg, 6)} mg transferred in {formatNumber(result.transferVolumeMl, 6)} mL, using a verified final total preparation volume of {formatNumber(result.finalTotalVolumeMl, 6)} mL.
              </span>
            }
            actions={
              <CalculatorCopyButton
                value={copyValue}
                onError={() =>
                  setErrors((current) => ({
                    ...current,
                    copy: "Copy failed. Select the result manually or check browser clipboard permissions.",
                  }))
                }
              />
            }
          >
            <div className="grid gap-3 text-sm sm:grid-cols-3">
              <div className="rounded-xl border border-current/15 bg-white/70 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide opacity-70">Vial concentration</p>
                <p className="mt-1 font-bold">{formatNumber(result.vialConcentrationMgPerMl, 6)} mg/mL</p>
              </div>
              <div className="rounded-xl border border-current/15 bg-white/70 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide opacity-70">Amount transferred</p>
                <p className="mt-1 font-bold">{formatNumber(result.amountTransferredMg, 6)} mg</p>
              </div>
              <div className="rounded-xl border border-current/15 bg-white/70 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide opacity-70">Vial equivalents</p>
                <p className="mt-1 font-bold">{formatNumber(result.vialEquivalentsTransferred, 3)}</p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {smallTransfer && (
                <CalculatorNotice variant="warning" title="Small entered transfer volume — recheck the source values">
                  This is an arithmetic screening prompt, not a universal preparation threshold. Confirm the decimal place, verified vial concentration, prescribed transfer volume, and approved measuring method before using the result.
                </CalculatorNotice>
              )}

              {multipleVialEquivalent && (
                <CalculatorNotice variant="warning" title="More than one entered vial equivalent">
                  The transfer volume equals approximately {formatNumber(result.vialEquivalentsTransferred, 3)} times the verified final volume of one entered vial. Confirm that identical vials and this total transfer volume are specified by the approved source.
                </CalculatorNotice>
              )}

              {noAdditionalCarrierRepresented && (
                <CalculatorNotice variant="warning" title="No additional carrier volume is represented">
                  The verified final total volume equals the medicine-solution transfer volume. Confirm that this is the intended final preparation rather than an entered bag size, overfill estimate, or unadjusted volume.
                </CalculatorNotice>
              )}

              <CalculatorNotice variant="theme" title="Final concentration is not an infusion rate">
                This result gives mg per mL in the final preparation. It does not calculate mL/hr, dose per hour, compatibility, stability, route suitability, storage time, or infusion duration.
              </CalculatorNotice>
            </div>

            <div className="mt-4">
              <CalculatorWorking title="Step-by-step arithmetic" lines={workingLines} />
            </div>
          </CalculatorResult>

          {errors.copy && <CalculatorError>{errors.copy}</CalculatorError>}

          <FinalIvFlowGuide result={result} />
        </>
      )}

      <CalculatorNotice variant="neutral" title="Calculation checker only">
        This calculator does not select the medicine, dose, diluent, number of vials, transfer volume, container, compatibility, stability, storage condition, infusion rate, or administration method. Use verified product, pharmacy, protocol, and local-policy instructions.
      </CalculatorNotice>
    </CalculatorShell>
  )
}

function FinalIvFlowGuide({ result }: { result: FinalIvConcentrationResult }) {
  const fillRatio = Math.min(result.vialEquivalentsTransferred, 1)
  const vialFillHeight = 112 * fillRatio

  return (
    <CalculatorSection
      title="Visualise the verified-input concentration check"
      summary="Keep the vial concentration, medicine-solution transfer volume, amount transferred, and final total volume separate."
      icon={<Syringe className="size-5" />}
    >
      <CalculatorNotice variant="theme" title="Schematic only — not a preparation instruction">
        The drawing is not to scale and does not determine diluent, bag overfill, volume removal, compatibility, stability, route, infusion rate, or labelling requirements.
      </CalculatorNotice>

      <div className="overflow-x-auto rounded-2xl border [border-color:var(--calculator-border)] bg-white p-4">
        <svg
          viewBox="0 0 900 300"
          className="min-w-[720px]"
          width="100%"
          role="img"
          aria-label={`Schematic showing ${formatNumber(result.transferVolumeMl, 3)} mL of reconstituted medicine solution transferring ${formatNumber(result.amountTransferredMg, 3)} mg into a verified final total volume of ${formatNumber(result.finalTotalVolumeMl, 3)} mL`}
        >
          <text x="155" y="28" textAnchor="middle" fontSize="18" fontWeight="700" fill="#581c87">
            Reconstituted vial solution
          </text>
          <rect x="88" y="46" width="134" height="34" rx="8" fill="#e9d5ff" stroke="#9333ea" strokeWidth="3" />
          <rect x="65" y="76" width="180" height="150" rx="24" fill="#ffffff" stroke="#9333ea" strokeWidth="3" />
          <rect x="69" y={222 - vialFillHeight} width="172" height={vialFillHeight} rx="18" fill="#f3e8ff" />
          <line x1="65" y1="226" x2="245" y2="226" stroke="#7e22ce" strokeWidth="3" />
          <text x="155" y="254" textAnchor="middle" fontSize="15" fontWeight="700" fill="#111827">
            {formatNumber(result.vialConcentrationMgPerMl, 3)} mg/mL
          </text>
          <text x="155" y="278" textAnchor="middle" fontSize="13" fill="#4b5563">
            verified final volume {formatNumber(result.finalVialVolumePerVialMl, 3)} mL per vial
          </text>

          <line x1="286" y1="145" x2="500" y2="145" stroke="#9333ea" strokeWidth="5" strokeLinecap="round" />
          <polygon points="500,145 474,129 474,161" fill="#9333ea" />
          <text x="393" y="103" textAnchor="middle" fontSize="17" fontWeight="700" fill="#581c87">
            Transfer {formatNumber(result.transferVolumeMl, 3)} mL
          </text>
          <text x="393" y="127" textAnchor="middle" fontSize="14" fill="#4b5563">
            contains {formatNumber(result.amountTransferredMg, 3)} mg
          </text>
          {result.vialEquivalentsTransferred > 1 && (
            <text x="393" y="184" textAnchor="middle" fontSize="13" fontWeight="700" fill="#b45309">
              ≈ {formatNumber(result.vialEquivalentsTransferred, 2)} identical vial volumes
            </text>
          )}

          <text x="690" y="28" textAnchor="middle" fontSize="18" fontWeight="700" fill="#581c87">
            Verified final preparation
          </text>
          <path
            d="M585 62 Q585 45 602 45 H778 Q795 45 795 62 V232 Q795 250 778 250 H602 Q585 250 585 232 Z"
            fill="#ffffff"
            stroke="#9333ea"
            strokeWidth="3"
          />
          <path d="M650 45 Q690 20 730 45" fill="none" stroke="#9333ea" strokeWidth="3" />
          <rect x="590" y="126" width="200" height="119" rx="12" fill="#f3e8ff" />
          <line x1="585" y1="126" x2="795" y2="126" stroke="#7e22ce" strokeWidth="3" />
          <text x="690" y="162" textAnchor="middle" fontSize="24" fontWeight="800" fill="#581c87">
            {formatNumber(result.finalConcentrationMgPerMl, 3)} mg/mL
          </text>
          <text x="690" y="190" textAnchor="middle" fontSize="14" fill="#4b5563">
            verified final total volume
          </text>
          <text x="690" y="214" textAnchor="middle" fontSize="17" fontWeight="700" fill="#111827">
            {formatNumber(result.finalTotalVolumeMl, 3)} mL
          </text>
        </svg>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Transfer volume</p>
          <p className="mt-1 text-lg font-bold text-gray-950">{formatNumber(result.transferVolumeMl, 3)} mL</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Medicine transferred</p>
          <p className="mt-1 text-lg font-bold text-gray-950">{formatNumber(result.amountTransferredMg, 3)} mg</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Final total volume</p>
          <p className="mt-1 text-lg font-bold text-gray-950">{formatNumber(result.finalTotalVolumeMl, 3)} mL</p>
        </div>
      </div>

      <div className="flex items-start gap-2 rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-600">
        <ArrowRight className="mt-0.5 size-4 shrink-0 [color:var(--calculator-text)]" aria-hidden="true" />
        <p>
          The transfer volume is not automatically the final total volume, and the final concentration is not an infusion rate.
        </p>
      </div>
    </CalculatorSection>
  )
}
