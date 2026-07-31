# Batch 7 — mL/hr to gtt/min Calculator Standard

## Scope

Updated the mL/hr-to-gtt/min gravity drip calculator to match the MedMaths IV calculator standard while preserving the established SEO content, formula, examples, FAQs, references, metadata and route.

## Calculator changes

- Applied the shared teal IV-fluids calculator shell.
- Moved the calculator directly beneath the page heading.
- Replaced browser alerts with inline field validation and focus management.
- Added automatic result reveal and keyboard focus.
- Added standard Calculate, Clear, Copy and calculation-working components.
- Preserved preset drop factors of 10, 15, 20 and 60 gtt/mL plus custom entry.
- Clears stale results whenever the rate or drop factor changes.
- Displays both the exact calculated rate and the whole-drop result.
- Moved author and review information into the standard lower trust section.

## Gravity drip safety

- Requires the drop factor from the actual giving-set packet or label.
- Does not assume that all giving sets use the same drop factor.
- Makes clear that gtt/min is a gravity drip count, not an IV pump setting.
- Warns when the exact result is below half a drop per minute rather than presenting a rounded zero as a usable gravity rate.
- Adds an additional check for very slow results near one drop per minute.
- Adds an additional check for very rapid manual drip counts above 250 gtt/min.
- Reminds users to count the actual chamber flow and recheck it after the rate settles.

## Result interpretation

- Shows the exact unrounded calculation.
- Shows the rounded whole-drop result when it can be represented meaningfully.
- Adds an approximate pacing explanation, such as one drop every 1.5 seconds, as an orientation aid only.
- Does not replace direct observation of the drip chamber or local IV policy.

## Page consistency

- Reduced the content width to the shared calculator-page width.
- Removed the author line above the calculator.
- Added the standard lower trust block.
- Preserved the existing formula, worked examples, common examples, practice questions, FAQ schema, references and related calculators.
- Reordered the lower page to related calculators, trust information and references, matching the mg-to-mL benchmark.

## Files changed

- `app/calculator/iv-fluids/drip-rate-mlhr-to-gttmin/drip-rate-mlhr-to-gttmin-client.tsx`
- `app/calculator/iv-fluids/drip-rate-mlhr-to-gttmin/page.tsx`
- `BATCH_07_MLHR_TO_GTTMIN_STANDARD.md`
- `DEFERRED_IMPROVEMENTS_BACKLOG.md`
