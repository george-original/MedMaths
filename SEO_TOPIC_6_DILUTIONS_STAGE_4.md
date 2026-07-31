# SEO Topic 6 — Dilutions Stage 4

## Page updated
`/calculator/dilutions/reconstitute-to-bag`

## Calculator changes
- Replaced loose `Number.parseFloat` input handling with strict decimal-only parsing.
- Rejects mixed-unit entries such as `10 mg/mL`, `50mL`, `1/2`, and `abc5`.
- Clarified that the reconstitution input should be final vial volume, not automatically the diluent volume added.
- Renamed the bag input to final total bag volume to reduce final-volume ambiguity.
- Added copy-result support.
- Added warnings for very small withdrawn volumes, very large withdrawn volumes, unusual final concentration, and extremely small concentration results.
- Preserved the core formula sequence: vial concentration, amount transferred, final bag concentration.

## SEO changes
- Strengthened title and description around reconstitution calculator, IV bag dilution, final bag concentration, final vial volume, final bag volume, and diluent-vs-final-volume searches.
- Added long-tail FAQs and FAQ schema.
- Added BreadcrumbList schema and WebApplication schema.
- Added formula, step-by-step instructions, worked examples, common examples, practice questions, common mistakes, and clinical safety notes.
- Updated references to include dilution maths, medication dose maths, high-risk medicines, IV compatibility/final concentration considerations, and IV manipulation safety.

## Build checks
- TSX transpile check passed for the page and client component.
- Full Next.js build could not run in this container because project dependencies are not installed (`pnpm` missing and `next` not found).

## Internal linking note
- The page now links only within the dilution topic. The final sitewide linking network is still held for the later dedicated linking pass.
