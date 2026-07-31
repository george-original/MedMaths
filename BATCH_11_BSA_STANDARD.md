# Batch 11 — Body Surface Area calculator standard

## Scope

This batch standardises only the Body Surface Area calculator:

- `/calculator/body-composition/bsa`

The calculator retains four BSA equations:

- Mosteller
- Du Bois & Du Bois
- Haycock
- Gehan & George

## Calculator changes

- Applied the shared emerald body-composition calculator shell and result-first layout.
- Removed the draggable floating calculator and its duplicate compact form.
- Replaced the aggregate result/error boxes with inline validation, field focus, result reveal, and the shared copy control.
- Preserved height in centimetres, weight in kilograms, and selectable BSA formula.
- Added consistent Calculate, Clear, Copy, display-rounding, interpretation, and working controls.
- Clears stale results whenever height, weight, or formula changes.
- Rejects mixed text such as `170cm`, `70 kg`, comma-formatted ambiguity, fractions, and non-numeric input.
- Stores and displays the exact formula inputs used in the calculation.

## Safety changes

- States that the calculator returns BSA only and does not select a regimen, dose, formula, dosing weight, cap, or rounding rule.
- Prompts users to use the exact BSA formula required by the order, guideline, or local protocol.
- Flags BSA results outside a common adult range without declaring them invalid for children or body-size extremes.
- Adds separate small-body-size and large-body-size checks.
- States that the displayed decimal setting does not alter the underlying BSA result.
- States that a dose written in mg/m² requires a second calculation and protocol-specific medication checks.
- Does not automatically cap BSA or substitute ideal or adjusted body weight.

## Page consistency

- Moved the calculator directly beneath the page heading.
- Removed top review pills and added the shared lower author/review trust block.
- Retained one shared Related Calculators section.
- Converted alternative formulas, common examples, practice questions, FAQs, and references into compact native disclosure sections while keeping their HTML content on the page.
- Preserved metadata, long-tail questions, formula explanations, structured data, examples, and source references.
- Standardised the lower-page order: related calculators, author/review information, then references.

## Validation performed

- TypeScript/TSX syntax transpilation across 91 files.
- Six BSA regression cases covering all four formulas, plus adult and paediatric-style examples.
- BSA display-rounding checks.
- Changed-file local import resolution.
- Internal route target scan across 30 routes.
- Legacy floating-widget, `alert()`, `parseFloat`, `onKeyPress`, and FAQ component scan.
- Page structure checks for one calculator shell, one related-calculator section, and one trust block.
- Zip integrity check.

## Deferred improvements

No new unrelated website issue was identified in this batch. The existing deferred backlog remains unchanged.
