# Batch 23 — mg to mL and Units to mL Formula Authority

Completed: 12 July 2026

## Scope

This batch applies the calculator-first formula-authority standard to:

- mg to mL Calculator
- Units to mL Calculator

The inputs and actions remain the first functional content. Dynamic formula explanations, definitions, full arithmetic, long-tail questions, and clinical limitations sit below the calculator workflow.

## mg to mL Calculator

### Calculator-first improvements

- Preserved direction selection, dose or volume input, concentration entry, label-format helper, and actions before the detailed formula explanation.
- Added a dynamic equation block below the calculator workflow.
- The equation changes between:
  - mg to mL using mg/mL concentration
  - required dose over supplied dose using a label such as 250 mg in 5 mL
  - mL to mg

### Formula and result clarity

- Added a shared dose-volume formula library used by the interactive calculators.
- Displays the exact calculated result separately from the displayed rounded result.
- Shows complete substituted arithmetic.
- When the label helper is used, the working now shows:
  - required dose
  - supplied dose
  - supplied volume
  - required-over-supplied fraction
  - multiplication by supplied volume
- Added clear variable definitions beside each equation.
- Added plain-English nursing wording:
  - required dose ÷ supplied dose × supplied volume or form
  - desired dose ÷ dose on hand × quantity
  - D/H × Q
  - stock required over stock supplied, followed by the supplied volume or form
- Added a dimensional-cancellation explanation showing why matching mg units cancel and leave mL.
- Clarifies that mg and mL are different units and cannot be connected without concentration.

### SEO and educational content

Added or strengthened clear answers for:

- What does mg/mL mean?
- What does this calculator do?
- How do you convert mg to mL?
- How do you convert mL to mg?
- What does desired dose over dose on hand mean?
- What does D/H × Q mean?
- What does stock required over stock supplied mean?
- Why can mg not be converted to mL without concentration?
- How does a label written as mg per X mL work?

Useful long-tail nursing terminology remains in the page and is explained rather than repeated as keyword-only text.

## Units to mL Calculator

### Calculator-first improvements

- Preserved concentration preset, ordered dose or measured volume, concentration input, and actions before the detailed formula explanation.
- Added a dynamic equation block below the calculator workflow.
- The equation changes between:
  - units to mL
  - mL to units

### Formula and result clarity

- Displays the exact calculated result separately from the displayed rounded result.
- Shows complete substituted arithmetic with units.
- Defines ordered dose, concentration, volume, and calculated dose beside the equation.
- Explains units/mL in direct language.
- Shows why a higher concentration produces a smaller volume for the same unit dose.
- Retains product-specific insulin and heparin safety checks without assuming a route or device from the number alone.

### SEO and educational content

Added or strengthened clear answers for:

- What does units/mL mean?
- What does this calculator do?
- What is the units to mL formula?
- What is the mL to units formula?
- How many units are in 1 mL?
- Why does concentration change the required volume?
- Why are units/mL and mg/mL different?
- How do U-100 and U-40 calculations differ?
- How is a heparin units-to-volume calculation performed?

## Shared controls

- Added `lib/dose-volume-formulas.ts` as the shared source for formula definitions and arithmetic helpers.
- Updated the Formula Authority Query Map with detailed query ownership for both pages.
- Added QA rules preventing the detailed equation blocks from moving above the inputs and actions.
- Added QA checks for exact-versus-displayed result wording and required formula-authority content.
- Competitor calculator brands remain excluded from application content.

## Validation completed

- MedMaths preflight passed.
- 104 TypeScript and TSX files passed syntax transpilation.
- 30 application routes passed.
- 14 calculator catalogue routes passed.
- 29 internal href references passed.
- 27 calculator and formula-authority arithmetic regression cases passed.
- mg to mL direct-concentration calculation passed.
- required-over-supplied label calculation passed.
- mL to mg reverse calculation passed.
- units to mL and mL to units calculations passed.
- U-40 concentration case passed.
- Calculator-first ordering checks passed for both calculators.
- Competitor-brand scan passed.

## Deployment limitation

A complete dependency-backed Next.js type check, lint, production build, browser rendering test, and mobile smoke test still require installed project dependencies in the deployment environment.

## Deferred improvements

No new unrelated issue was discovered. Deployment-environment production validation remains the active backlog item.
