# Batch 4 — Units to mL Calculator Standard

Date: 11 July 2026

## Scope

Applied the shared MedMaths calculator design standard to:

- `/calculator/dose-calculations/units-to-ml`

This batch did not alter other calculator formulas or routes.

## Calculator interface changes

- Applied the shared cyan/teal dose-calculator shell.
- Moved the calculator immediately below the H1, matching the mg-to-mL page structure.
- Added an explicit Calculate action rather than showing a live result while inputs are incomplete.
- Replaced browser alerts with inline validation and field focus.
- Added automatic result reveal and accessible `aria-live` result output.
- Standardised Calculate, Clear, Copy, working, and display-rounding controls.
- Preserved both calculation modes:
  - units → mL
  - mL → units
- Preserved concentration presets for U-100 insulin, U-40 insulin, and common heparin concentrations.
- Selecting Custom now clears a previously selected preset concentration rather than leaving stale preset data visible.
- Editing the concentration manually changes the context to Custom, preventing an insulin-specific device guide from being shown without an explicit insulin preset.

## Units-specific measurement guide

Added a new reusable `UnitsMeasurementGuide`.

### Insulin presets

When U-100 or U-40 is explicitly selected, the user chooses the delivery context:

- Not sure
- Matched insulin syringe
- Pen / pump
- IV preparation

The visual scale appears only when:

- the insulin preset is explicit,
- the entered concentration matches that preset,
- the user explicitly selects the matching syringe context,
- the dose fits within the illustrative 1 mL scale, and
- the dose is not below the high-caution threshold.

The guide:

- uses units on the matched insulin scale rather than pretending that all unit-based medicines use the same device,
- warns against mismatched U-100/U-40 scales,
- warns not to use the mL result to program a pen or pump,
- warns against withdrawing insulin from a pen or cartridge unless product information and local policy specifically support it,
- does not visualise or recommend an IV insulin preparation,
- flags fractional-unit results as falling between illustrative whole-unit marks,
- does not round automatically,
- does not recommend multiple syringes or split administration.

### Heparin and custom unit-based medicines

- Heparin receives a clear warning that its units must not be interpreted as insulin-syringe markings.
- Heparin and custom unit-based medicines use the route-aware mL measurement guide.
- Oral, injectable, and IV contexts remain separate.
- Very small volumes do not receive an automatic device recommendation.

## Result safety prompts

- Very small volumes trigger a high-caution check of dose, concentration, decimal position, product, and device.
- Insulin results greater than 1 mL trigger a stronger warning.
- Very large reverse-calculated unit amounts trigger an independent-check prompt.
- The calculator does not recommend a medication dose.

## Page consistency

- Removed the extra outer calculator card so the tool aligns with mg-to-mL and mg/kg-to-mL.
- Removed the author line above the calculator.
- Added the standard lower-page author and review block.
- Removed the duplicate manual related-tools section and retained the shared RelatedCalculators component.
- Added an official product-instructions reference supporting product-specific insulin device safety.

## Validation completed

- TS/TSX syntax transpile passed across 90 project files.
- Changed-file local import check passed.
- Static internal route check passed across 30 routes.
- Core calculation regressions passed:
  - 25 units ÷ 100 units/mL = 0.25 mL
  - 20 units ÷ 40 units/mL = 0.5 mL
  - 3,000 units ÷ 5,000 units/mL = 0.6 mL
  - 0.25 mL × 100 units/mL = 25 units
  - 0.75 mL × 1,000 units/mL = 750 units
- Confirmed 0.013 mL at U-100 equals 1.3 units, not 13 units.
- Safety behaviour checks passed.
- No `alert()`, `parseFloat`, or deprecated `onKeyPress` remains in this calculator.

## Full build status

A full dependency install and Next.js production build could not be run in this workspace because the package registry is unavailable. This is recorded in the deferred QA backlog and does not change the exported project files.
