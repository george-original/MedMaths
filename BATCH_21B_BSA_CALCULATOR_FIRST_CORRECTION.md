# Batch 21B — BSA Calculator-First Correction

Completed: 11 July 2026

## Reason for the correction

The first Batch 21 layout placed the selected formula equation and comparison explanation before the height and weight fields. That made the educational content compete with the main purpose of the page: completing a BSA calculation quickly.

## Corrected calculator order

The interactive BSA tool now follows this order:

1. formula selector
2. height input
3. weight input
4. Calculate and Clear controls
5. calculated result and step-by-step working
6. selected-formula explanation
7. formula-difference note
8. safety reminder

The page heading and calculator remain the first content on the route. A user can select a method, enter measurements and calculate without scrolling through formula education first.

## Preserved formula-authority content

The correction does not remove the Batch 21 SEO or educational work. It preserves:

- all four formula choices
- automatic recalculation when the method changes after a result
- selected-formula equation and plain-English explanation
- exact result and display rounding
- substituted arithmetic
- four-formula comparison table
- BSA meaning and definition content
- long-tail FAQs
- server-rendered explanations for all four formulas
- original references and structured data

The detailed selected-formula explanation now appears after the functional calculator area rather than before the inputs.

## Regression protection

The automated preflight now verifies that the BSA source order is:

`formula selector -> height -> weight -> actions -> selected equation`

This prevents detailed formula content from being placed above the input workflow in a future update.

## Scope

Changed files:

- `app/calculator/body-composition/bsa/bsa-client.tsx`
- `scripts/qa-preflight.mjs`
- `BATCH_21B_BSA_CALCULATOR_FIRST_CORRECTION.md`

No formulas, coefficients, routes, metadata, long-tail content, references, calculator validation rules or result calculations were changed.
