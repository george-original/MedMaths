# Topic 1: Dose Calculations — Stage 1

## Calculator updated
- `/calculator/dose-calculations/mgkg-to-ml-dose`

## Purpose
Improve the mg/kg to mL page so it more clearly explains the weight-based dose method, answers long-tail medication maths questions, and gives Google/AI systems a cleaner calculation pathway to understand.

## Calculator logic changes
- Replaced loose `parseFloat` number parsing with stricter decimal-only input validation.
- Added `inputMode="decimal"` to calculator number fields for better mobile input.
- Replaced deprecated `onKeyPress` usage with `onKeyDown`.
- Stored the concentration used at calculation time so the displayed working is clearer when the label helper is used.
- Trimmed trailing zeroes from displayed calculated results.

## Page SEO changes
- Updated title and description to better target `mg/kg to mL`, `weight-based dose formula`, paediatric liquid dose calculation, and practice-question intent.
- Expanded FAQ content to cover:
  - mg/kg meaning
  - mg/kg to mL formula
  - paediatric liquid dose calculation
  - mg per 5 mL label conversion
  - mg/kg/day versus per-dose orders
  - pounds to kg before mg/kg calculations
  - actual, ideal, or adjusted body weight caution
  - concentration selection
  - rounding
  - maximum dose checks
  - answer differences between calculators
- Added common worked examples for high-intent calculation patterns.
- Added practice questions with answer reveals.
- Strengthened the safety note around per-dose/per-day wording, dose frequency, maximum dose checks, and local protocols.
- Added OpenStax and Australian Commission on Safety and Quality in Health Care references.

## Internal linking
No broad internal-linking pass was done in this stage. Existing links were left in place. Sitewide linking is planned after all calculator pages have been reviewed.

## Build check
`npm run build` could not be completed because dependencies are not installed in the container (`next: not found`). Run locally after download:

```bash
npm install
npm run build
```

or:

```bash
pnpm install
pnpm build
```
