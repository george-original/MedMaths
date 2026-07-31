# Batch 13 — C1V1 = C2V2 dilution calculator standard

## Scope

This batch standardises only:

- `/calculator/dilutions/c1v1-c2v2-basic`

## Calculator changes

- Applied the shared purple dilution calculator shell and result-first layout.
- Moved the calculator directly beneath the page heading.
- Replaced browser alerts with inline field errors, field focus, result reveal, and the shared copy control.
- Preserved solving for V1, V2, C1, or C2.
- Disabled the selected unknown field so the user enters only the three known values.
- Added explicit concentration-unit and volume-unit selectors so the result is labelled clearly.
- Added common concentration labels for mg/mL, mcg/mL, units/mL, %, mmol/L, and other matching units.
- Added display rounding without changing the stored calculation.
- Clears stale results whenever an input, solve target, or unit label changes.
- Rejects mixed unit text, fractions, blank values, zero, and negative inputs.
- Shows a substitution line and a C1V1/C2V2 arithmetic cross-check in the working.

## Safety changes

- Prominently states that V2 is final total volume, not merely diluent added.
- Flags a target concentration stronger than the starting concentration because adding diluent cannot create a stronger solution.
- Flags a negative diluent difference or a calculated stock volume greater than final volume.
- Flags unchanged concentrations because the equation then describes no dilution.
- Flags calculated volume results below 0.05 mL without recommending a device or automatic rounding.
- Adds a specific caution that percent concentrations must use the same percentage basis.
- Labels V2 − V1 as an arithmetic diluent difference rather than a universal preparation instruction.
- Explains that displacement, making up to final volume, compatibility, permitted diluent, route, stability, sterility, and local policy remain product-specific.
- Does not provide an automatic syringe, route, diluent, or administration recommendation.

## Page consistency

- Removed the upper author line and duplicate within-topic related-link block.
- Added the shared lower author/review trust block.
- Retained one Related Calculators section.
- Converted formulas, worked examples, practice questions, FAQs, and references into compact native disclosure sections while keeping the content in the initial page HTML.
- Preserved metadata, long-tail questions, structured data, examples, and references.
- Standardised the lower-page order: related calculators, author/review information, then references.

## Validation performed

- TypeScript/TSX syntax transpilation across 91 files.
- Six C1V1/C2V2 regression cases covering V1, V2, C1, and C2.
- Dilution-direction and diluent-difference safety checks.
- Changed-file local import resolution.
- Internal route target scan across 30 routes.
- Legacy `alert()`, `parseFloat`, and `onKeyPress` scan.
- Page structure checks for one calculator shell, one related-calculator section, one trust block, and the dilution theme.
- Zip integrity check.

## Deferred improvements

No new unrelated website issue was identified in this batch. The existing deferred backlog remains unchanged.
