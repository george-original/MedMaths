# SEO Topic 6 — Dilutions Stage 3

## Page updated
- `/calculator/dilutions/vial-dose-to-ml`

## Calculator changes
- Replaced loose number parsing with strict decimal-only parsing.
- Rejects mixed-unit input such as `10 mg/mL`, `50mL`, `1/2`, and `abc5`.
- Accepts clean decimal values such as `10`, `50`, `0.5`, and `.5`.
- Added decimal mobile keyboard support.
- Added clearer helper text explaining that the input must be vial concentration in `mg/mL`, not total vial amount.
- Added warning states for very small calculated volumes and unusually large draw-up volumes.
- Improved result display and reverse-check working.

## SEO changes
- Updated metadata around vial dose to mL, draw-up volume, injection volume, dose divided by concentration, and medication vial calculations.
- Rebuilt the visible page content around the formula:
  - `Volume (mL) = Ordered dose (mg) ÷ Vial concentration (mg/mL)`
- Added a clear label-conversion explanation for labels written as total amount per total volume, such as `500 mg / 10 mL`.
- Added step-by-step calculation instructions.
- Added worked examples and common example cards.
- Added practice questions.
- Expanded long-tail FAQ coverage.
- Added FAQ schema, breadcrumb schema, and WebApplication schema.
- Updated references to OpenStax, RMIT Learning Lab, and the Australian Commission high-risk medicines page.

## Linking note
- Fixed a duplicate related-calculator link that pointed this page back to itself.
- Kept linking within the dilution topic only.
- Did not perform the final sitewide internal linking pass.

## Check performed
- TSX transpile check passed for:
  - `app/calculator/dilutions/vial-dose-to-ml/page.tsx`
  - `app/calculator/dilutions/vial-dose-to-ml/vial-dose-to-ml-client.tsx`
- Confirmed this calculator folder no longer contains `parseFloat` or `onKeyPress`.

## Build note
- Full Next.js build was not run in this container because project dependencies are not installed and `pnpm` is unavailable.
- Run locally with `pnpm install && pnpm build` or `npm install && npm run build`.
