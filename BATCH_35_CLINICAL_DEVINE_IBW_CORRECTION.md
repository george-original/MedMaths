# Batch 35 — Clinical Devine IBW Correction

## Scope

This batch narrows the Ideal Body Weight page to one clear clinical calculation: adult Devine ideal body weight (IBW).

It does not add consumer healthy-weight ranges, Robinson/Miller/Hamwi comparisons, adjusted body weight, or ventilation predicted body weight.

## Calculator changes

- Retained male and female Devine equations.
- Retained centimetres and feet/inches input.
- Added automatic conversion when switching height systems.
- Limited calculation to adult heights from 5 feet (152.4 cm) to 250 cm.
- Removed below-5-feet extrapolation.
- Removed the optional actual-weight field and percentage comparison.
- Kept exact calculation working and display-only rounding.
- Clarified that the result is a clinical reference weight, not a healthy target or a medication recommendation.

## Search-intent changes

- New title: `Clinical Ideal Body Weight Calculator | Devine IBW`
- New H1: `Clinical Ideal Body Weight (IBW) Calculator`
- Removed predicted-body-weight and PBW targeting from metadata and keyword arrays.
- Preserved one concise on-page distinction explaining that ventilation PBW is a separate protocol-specific calculation.
- Reduced FAQs from 17 to 8 focused clinical questions.
- Reduced practice questions from 5 to 3.
- Reduced quick example cards from 6 to 4.

## Clinical scope decision

The calculator no longer extrapolates Devine below 5 feet. Clinical calculator references reviewed for this batch either limit the Devine method to 60 inches or do not calculate IBW below approximately 152 cm. Users below the supported height are directed to the method specified by the applicable protocol.

Ventilation predicted body weight remains outside this calculator. Official low-tidal-volume ventilation guidance distinguishes PBW from ideal and actual body weight.

## Technical changes

- Added `lib/ideal-body-weight-core.ts` for pure calculation, validation, and unit conversion.
- Updated `lib/ideal-body-weight-formulas.ts` to build formula explanations from the validated core result.
- Added `scripts/ideal-body-weight-regression.mjs`.
- Added `pnpm qa:ibw`.
- Updated the calculator catalogue, SEO registry, formula-authority query map, repository preflight, and README.

## Regression coverage

The dedicated IBW suite covers:

- male and female 5-foot baseline results
- 5-foot-10-inch results
- centimetre calculations
- centimetre-to-feet/inches conversion and round trip
- minimum and maximum supported heights
- rejection below 5 feet and above 250 cm
- removal of actual-weight comparison
- metadata and keyword scope
- eight-FAQ and three-practice-question limits
- calculator-first field and equation ordering

## Validation completed

- Repository preflight passed.
- All existing calculator regression suites passed.
- 34 dedicated IBW checks passed.
- 17 shared precision checks passed.
- The IBW core and formula libraries passed strict TypeScript checking.
- All changed TypeScript and TSX files passed direct syntax transpilation.
- No generated `.next`, `node_modules`, or TypeScript build artefacts are included.

## Outstanding deployment check

A dependency-backed Next.js production build and browser preview remain required in the deployment environment because this workspace does not contain installed project dependencies.

## Deferred issues

No new unrelated issue was discovered in Batch 35.
