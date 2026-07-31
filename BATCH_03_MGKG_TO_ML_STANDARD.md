# Batch 3 — mg/kg to mL calculator standard

## Scope

Applied the shared calculator design system to the mg/kg to mL calculator and reused the route-aware volume measurement guide established in Batch 2.

## Calculator changes

- Replaced the legacy bespoke form with the shared dose-calculator shell, fields, actions, result panel, working panel, rounding control, and copy action.
- Replaced browser alert validation with inline field errors and focus management.
- Added automatic result reveal and focus so the answer is brought into view when required.
- Preserved both concentration-entry methods: direct mg/mL and label strength written as mg per X mL.
- Stores the exact mg/kg dose, weight, concentration, total dose, and volume used in the calculation so the displayed working cannot become stale after state updates.
- Keeps the dose-calculation cyan/teal category theme.

## Weight-based medication safety

- Makes clear that the entered mg/kg value must be for one dose.
- Warns users to confirm divided dosing before using an order written as mg/kg/day.
- Labels the weight field in kilograms and tells users not to enter pounds.
- Tells users to use the weight type required by the medication order or clinical reference rather than assuming actual, ideal, or adjusted weight.
- Displays the calculated total dose in mg alongside the final volume in mL.
- Flags unusually small or large calculated volumes for a complete order, weight, concentration, maximum-dose, and route recheck.

## Visual measurement guide

- Adds the shared “Show me how to measure this volume” guide to the exact calculated mL result.
- Requires oral/enteral, subcutaneous, intramuscular, IV preparation, or unknown context before showing a route-specific device category.
- Does not infer route from the calculated volume.
- Does not recommend an oral device for injection.
- Does not select an insulin syringe merely because the volume is small.
- Suppresses device recommendations for very small volumes and prompts confirmation of an appropriate device, dilution, or preparation method.
- Uses the unrounded calculation result for the visual marker and device-marking check.

## Page consistency changes

- Removed the extra outer calculator card so the shared calculator shell controls the card layout.
- Removed the author/review line from above the page introduction.
- Added the shared author and review block near the references.
- Removed the duplicate legacy related-calculator section and retained the shared related-calculator component.

## Validation completed

- TypeScript transpilation checks passed for the updated client and page.
- `tsc --noEmit`: passed before dependency cleanup.
- Next.js production compilation passed after temporarily replacing the network-fetched Google font during the QA run; static generation began but did not finish within the execution limit.
- Original Google font configuration was restored before export.
- Core formula regression cases were checked: 10 mg/kg × 70 kg ÷ 50 mg/mL = 14 mL; 15 mg/kg × 18 kg ÷ (250 mg/5 mL) = 5.4 mL; 2.5 mg/kg × 18 kg ÷ 40 mg/mL = 1.125 mL.
- No browser `alert()` calls, `parseFloat`, or deprecated `onKeyPress` remain in this calculator.
- Output archive excludes `node_modules`, `.next`, generated npm lock files, and build cache files.
