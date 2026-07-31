# Batch 1 — MedMaths Calculator Design System Foundation

## Scope

This batch creates the reusable foundation for the calculator-by-calculator visual and usability pass. It intentionally does **not** alter any existing calculator formula, route, metadata, visible page layout or result behaviour.

## Shared components added

- `CalculatorShell` — consistent calculator card, header, spacing and category theme.
- `CalculatorField`, `CalculatorInput`, `CalculatorSelect`, `CalculatorError` — consistent labels, input sizing, helper text and inline errors.
- `CalculatorNotice` — consistent theme, information, caution, danger and success notices.
- `CalculatorActions` — consistent Calculate and Clear buttons.
- `CalculatorSegmentedControl` — consistent mode switching for calculators with two or more calculation directions.
- `CalculatorCopyButton` — consistent accessible result-copy behaviour.
- `CalculatorResult` — accessible result-first panel with `aria-live` and keyboard focus support.
- `CalculatorWorking` — consistent formula and working display.
- `CalculatorSection` — native expandable section. Content remains in the initial HTML for users and search engines.
- `CalculatorTrustBlock` — one standard location and format for author, reviewer and review-date information.
- `useResultReveal` — optional smooth reveal and focus when a result first appears.

## Category colours retained

- Dose calculations: cyan/teal
- Tablet dosing: orange
- IV fluids: teal
- Body composition: emerald
- Renal function: blue
- Dilutions: purple

The layout and behaviour can now be standardised without removing category identity.

## Medication-safety foundations added

### Volume/device guide rules

- Never infer route from volume.
- Never recommend an oral/enteral device for an injection.
- Never recommend an insulin syringe for a non-insulin medicine solely because the volume is small.
- Never convert mL into insulin-syringe units unless the medicine, concentration and device are specifically intended for units-based use.
- Very small volumes prompt rechecking of dose, concentration and units, plus confirmation of an appropriate device, dilution or preparation method.

### Tablet guide rules

- Standard visual fractions are whole, quarter, half and three-quarter tablets.
- Awkward fractions are not silently rounded.
- Five or more tablets triggers a large-count check.
- Ten or more tablets triggers a stronger very-large-count check.
- These thresholds are user-safety prompts, not claims that the prescribed dose is wrong.
- A different strength or formulation is presented only as something that may be available and must be confirmed by the prescriber or pharmacist.

## QA boundary

No existing calculator imports these components yet. That is deliberate. Each later batch will adopt the shared system on one calculator, verify its behaviour and then move to the next calculator after approval.
