# Batch 22 — Ideal Body Weight and Creatinine Clearance Formula Authority

Completed: 12 July 2026

## Scope

This batch applies the BSA formula-authority standard to:

- Ideal Body Weight Calculator
- Creatinine Clearance Calculator

The calculator remains the first functional element. Formula explanations, definitions, worked examples, long-tail FAQs, and clinical limitations sit below the inputs and actions.

## Ideal Body Weight Calculator

### Calculator-first improvements

- Removed the safety notice from above the inputs.
- Kept the Devine equation selector, height-unit selector, height input, optional comparison, and actions first.
- Added dynamic male/female Devine equation explanation below the result and actions.
- Changing the selected equation recalculates an existing result when the entered height remains valid.

### Formula and result clarity

- Added a shared Devine formula library used by the calculator and page content.
- Displays the exact calculator value separately from the rounded display value.
- Shows complete arithmetic including:
  - centimetres to inches
  - height relative to 5 feet
  - selected base weight
  - multiplication by 2.3 kg per inch
  - exact result
- Explains why the male and female equations differ.
- Clarifies that a result is a formula-derived reference weight, not measured weight, a healthy target weight, or automatically the correct dosing weight.
- Strengthened the warning for heights below 5 feet by explaining that the arithmetic is an extrapolation below the formula's reference point.

### SEO and educational content

Added or strengthened clear answers for:

- What does IBW mean?
- What is the definition of ideal body weight?
- What does an ideal body weight result mean?
- What is ideal body weight used for?
- How is ideal body weight calculated?
- What is the male Devine formula?
- What is the female Devine formula?
- How do you calculate IBW from centimetres?
- Why can ideal body weight calculations differ?
- IBW versus actual, adjusted, and predicted body weight

The former approximate centimetre shortcut was removed. The page now keeps the exact centimetre conversion inside the full Devine equation.

## Creatinine Clearance Calculator

### Calculator-first improvements

- Removed the renal safety notice from above the inputs.
- Kept sex factor, age, weight, creatinine unit, serum creatinine, and actions first.
- Added a dynamic Cockcroft-Gault equation explanation below the result and actions.
- Changing the selected sex factor recalculates an existing result when all inputs remain valid.
- Changing serum creatinine units still clears the creatinine value to prevent unit carryover.

### Formula and result clarity

- Added a shared Cockcroft-Gault formula library used by the calculator and page content.
- Displays the exact calculator value separately from the rounded display value.
- Shows complete substituted arithmetic for both:
  - serum creatinine in µmol/L
  - serum creatinine in mg/dL
- Defines every equation variable beside the formula.
- Explains why the denominator changes from 72 to 0.814 when the creatinine unit changes.
- Explains what mL/min means.
- Clarifies that the result is an estimated creatinine clearance, not measured clearance, eGFR, a diagnosis, or a medication dose.
- Retains weight-method, renal-trend, dialysis, body-size, low-muscle-mass, and medicine-specific dosing limitations.

### SEO and educational content

Added or strengthened clear answers for:

- What does CrCl mean?
- What is the definition of creatinine clearance?
- What does a creatinine clearance result mean?
- What does mL/min mean?
- What is the Cockcroft-Gault formula?
- How do you calculate creatinine clearance manually?
- Cockcroft-Gault formula using µmol/L
- Cockcroft-Gault formula using mg/dL
- Which weight should be used?
- CrCl versus eGFR
- Why can two calculations differ?

The original Cockcroft-Gault publication is now linked directly in the references.

## Shared SEO controls

- Updated the Formula Authority Query Map with detailed query ownership for both pages.
- Preserved useful long-tail wording while keeping each answer distinct and practical.
- Competitor calculator brands remain excluded from application content.
- Added source-level QA checks that prevent either calculator from placing detailed formula explanations above its inputs and actions.

## Validation completed

- MedMaths preflight passed.
- 103 TypeScript and TSX files passed syntax transpilation.
- 236 local imports resolved.
- 30 application routes passed.
- 14 calculator catalogue routes passed.
- 29 internal href references passed.
- 22 calculator and formula-authority arithmetic regression cases passed.
- Male and female Devine calculations passed.
- Devine centimetre conversion passed.
- Cockcroft-Gault µmol/L and mg/dL calculations passed.
- Cockcroft-Gault unit-equivalence check passed within the allowed conversion tolerance.
- Calculator-first ordering checks passed for both calculators.
- Competitor-brand scan passed.

## Deployment limitation

A complete dependency-backed Next.js type check, lint, production build, browser rendering test, and mobile smoke test still require installed project dependencies in the deployment environment.

## Deferred improvements

No new unrelated issue was discovered. Deployment-environment production validation remains the only active backlog item.
