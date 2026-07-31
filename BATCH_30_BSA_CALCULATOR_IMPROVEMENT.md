# Batch 30 — BSA Calculator Improvement

Completed: 30 July 2026

## Scope

This batch improves only the Body Surface Area calculator:

- `/calculator/body-composition/bsa`

The objective was to strengthen calculator usefulness and international usability rather than add more general content.

## Calculator improvements

- Added a measurement-system selector:
  - metric: centimetres and kilograms
  - imperial: feet, inches and pounds
- Imperial inputs are converted to centimetres and kilograms before any BSA equation is applied.
- The result records both the entered measurements and the converted formula inputs.
- Step-by-step working now includes the imperial conversion arithmetic before the selected BSA formula.
- Switching between metric and imperial systems converts valid existing inputs rather than forcing re-entry.
- Retained all four formula options:
  - Mosteller
  - Du Bois and Du Bois
  - Haycock
  - Gehan and George
- Retained exact results, display-only rounding and the four-formula comparison table.
- Added mobile numeric input modes and field-specific validation for feet, inches and pounds.

## SEO and content changes

- Updated the title to `BSA Calculator | Height, Weight & 4 Formulas`.
- Updated the H1 to `BSA Calculator — Body Surface Area from Height and Weight`.
- Updated the meta description to describe metric and imperial inputs and formula comparison.
- Synchronised the SEO registry and calculator catalogue.
- Reduced the FAQ set from 16 to 12 focused questions.
- Removed four repetitive formula-specific FAQs because the page already provides complete server-rendered formula sections.
- Added one direct FAQ explaining feet, inches and pounds support.
- Replaced repetitive practice items with four varied exercises, including an imperial-input example.
- Retained the established BSA meaning, formula, medication-calculation and clinical-limitations content.

## Formula and conversion safety

- The published BSA equations still receive centimetres and kilograms only.
- Imperial conversion constants are centralised in `lib/measurement-conversions.ts`:
  - 1 inch = 2.54 cm
  - 1 foot = 30.48 cm
  - 1 lb = 0.45359237 kg
- The calculator does not select a BSA formula, medication regimen, dose cap, dosing weight or rounding rule.
- Formula comparison remains informational; the selected protocol or reference determines the required equation.

## Regression coverage

Added `scripts/bsa-regression.mjs` and `pnpm qa:bsa` covering:

- feet and inches to centimetres
- pounds to kilograms
- kilograms to pounds
- centimetres to feet and inches
- exact six-foot boundary handling
- Mosteller BSA after imperial conversion
- required metric/imperial controls
- protected metadata and H1
- focused FAQ count
- SEO registry and catalogue alignment

The dependency-free preflight also now requires international-input controls on the BSA calculator.

## Validation completed

- Repository preflight passed.
- Existing precision, mg-to-mL, reverse-IV and tablet regression suites passed.
- BSA conversion and page-protection regression suite passed.
- Changed TypeScript and TSX files passed direct syntax transpilation.
- Pure measurement-conversion and BSA formula libraries passed direct TypeScript checking.
- ZIP integrity passed.

## Remaining deployment gate

A dependency-backed Next.js production build, browser rendering, mobile smoke test and accessibility check remain required in the deployment environment.

## Deferred issues

No new unrelated issue was discovered in this batch.
