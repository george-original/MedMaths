# Topic 1 Dose Calculations — Stage 2

## Calculator updated
`/calculator/dose-calculations/units-to-ml`

## Reason for update
The page was useful but not yet at the mg-to-mL gold standard. It also had an apparent mL-to-units link even though the calculator only handled units-to-mL. This was turned into a real bidirectional mode inside the calculator.

## Calculator changes
- Added a mode toggle for `units → mL` and `mL → units`.
- Added strict numeric parsing so mixed text like `25 units`, `0.2 mL`, or `5/10` is rejected instead of silently parsed.
- Kept existing concentration presets for U-100 insulin, U-40 insulin, and common heparin concentrations.
- Added safer warning states for very small mL volumes and unusually large insulin volumes.
- Improved working display for both formula directions.
- Replaced the previous self-link "Need mL → units?" with an actual calculator mode switch.

## SEO changes
- Updated page title and metadata around insulin, heparin, units/mL, and bidirectional mL-to-units intent.
- Added clearer instructions, formula explanations, worked examples, common examples, practice questions, and high-intent FAQ items.
- Added FAQ schema that matches visible FAQ content.
- Kept content medically cautious: the page converts known dose/concentration only and does not recommend doses.

## References emphasised
- RMIT Learning Lab volume calculation method.
- Australian Commission high-risk medicine APINCHS framework.
- ISMP high-alert medicine list.
- PubMed Central article explaining concentrated insulin language such as U-100, U-200, U-300, and U-500.

## Build check
Attempted `npm run build`, but `next` is not installed in the container runtime. Run locally after downloading:

```bash
pnpm install
pnpm build
```
