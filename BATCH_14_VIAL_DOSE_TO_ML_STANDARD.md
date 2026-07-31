# Batch 14 — Vial Dose to mL calculator standard

## Scope

This batch standardises only:

- `/calculator/dilutions/vial-dose-to-ml`

## Calculator changes

- Applied the shared purple dilution-calculator shell and result-first layout.
- Moved the calculator directly beneath the page heading.
- Replaced browser alerts and the combined error panel with inline field errors, automatic field focus, result reveal, and the shared copy control.
- Preserved direct mg/mL entry.
- Added a safer vial-label entry mode for labels written as total mg in a final vial volume, such as 500 mg in 10 mL.
- The label mode calculates mg/mL before calculating the withdrawal volume.
- Explicitly labels the reconstitution input as final vial volume rather than diluent added.
- Added display rounding without changing the stored exact result.
- Clears stale results whenever dose, concentration, label amount, or final vial volume changes.
- Shows the concentration calculation, volume formula, substitution, and reverse dose check in the working.

## Safety changes

- States that a reconstituted vial must use the final concentration or final vial volume from product information.
- Warns that powder displacement can make final vial volume different from diluent added.
- Flags volumes below 0.05 mL as high caution and does not recommend an insulin syringe or automatic unit conversion.
- Flags volumes from 0.05 mL to below 0.1 mL for device-graduation confirmation.
- Flags calculated withdrawal volumes above 10 mL for dose, concentration, route, and administration-volume review.
- When label-mode information is available, flags a dose or withdrawal volume that exceeds one entered vial without assuming multiple vials are appropriate.
- Adds the route-aware measurement guide for oral/enteral, subcutaneous, intramuscular, IV preparation, or unknown context.
- The guide does not infer route from volume, select needle gauge/length/site, or recommend an insulin syringe solely because a volume is small.
- Keeps the exact calculated mL separate from illustrative device markings and does not round automatically.

## Page consistency

- Removed the upper author line, quick-navigation chip row, extra calculator wrapper, duplicate within-topic related links, and the old FAQ component styling.
- Added the shared lower author/review trust block.
- Retained one Related Calculators section.
- Converted formulas, worked examples, practice questions, FAQs, and references into compact native disclosure sections while keeping the content in the initial page HTML.
- Preserved metadata, long-tail questions, structured data, examples, and reference sources.
- Standardised the lower-page order: related calculators, author/review information, then references.

## Validation performed

- TypeScript/TSX syntax transpilation across 91 files.
- Direct-concentration and total-mg/final-volume regression cases.
- One-vial threshold and small-volume safety checks.
- Changed-file local import resolution.
- Internal route target scan.
- Legacy `alert()`, `parseFloat`, and `onKeyPress` scan.
- Page structure checks for one calculator shell, one related-calculator section, one trust block, and the dilution theme.
- Zip integrity check.

## Deferred improvements

No new unrelated website issue was identified in this batch. The existing deferred backlog remains unchanged.
