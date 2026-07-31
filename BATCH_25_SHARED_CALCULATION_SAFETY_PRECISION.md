# Batch 25 — Shared Calculation Safety and Precision

This repository batch is Implementation Batch 1 from the calculator review roadmap. It fixes shared result-formatting risks before any calculator-specific SEO or feature changes.

## Scope

- Prevent a valid non-zero calculation from being displayed as zero after user-selected rounding.
- Keep exact arithmetic separate from display formatting.
- Apply the same rule across dose, dilution, IV, tablet, body-measure, and renal calculators.
- Add regression protection for small results.
- Prevent SEO metadata records from drifting away from page metadata.
- Confirm practice questions are not included in FAQ structured data.

## Main safety change

A new shared formatter was added at:

`lib/safe-number-format.ts`

The formatter respects the selected display precision unless that precision would hide a non-zero result. When that happens, it automatically retains enough decimals to keep the value visible.

Examples:

| Exact value | Selected display | Previous display | Batch 25 display |
|---:|---|---:|---:|
| 0.25 mL | 0 decimals | 0 mL | 0.25 mL |
| 0.025 mL | 0 decimals | 0 mL | 0.025 mL |
| 0.04 mL | 1 decimal | 0 mL | 0.04 mL |
| 0.0049 mg/mL | 2 decimals | 0 mg/mL | 0.0049 mg/mL |
| 5.4 mL | whole-number display | 5 mL | 5 mL |

The stored calculation is never changed. This is display protection only.

## Calculator coverage

The shared formatter is now used by:

- mg to mL
- mg/kg to mL
- Units to mL
- mg to Tablets
- mg/kg to Tablets
- mL/hr to gtt/min
- gtt/min to mL/hr
- IV infusion time
- BSA
- Ideal body weight
- Creatinine clearance
- C1V1=C2V2
- Vial dose to mL
- Reconstitution to IV bag
- Volume, units, and tablet measurement guides

The liquid and dilution rounding selectors now explain that small non-zero values retain enough decimals to remain visible. The zero-decimal option is labelled `Whole number (non-zero preserved)`.

## Regression protection

Added:

- `scripts/precision-regression.mjs`
- `npm run qa:precision`
- Automatic precision-regression execution inside `qa:preflight`

The precision suite includes 17 checks covering:

- 0.25 mL at whole-number display
- 0.025 mL at whole-number display
- 0.04 mL at one decimal
- 0.0049 at two decimals
- units-to-mL small results
- mg/kg-to-mL very small results
- vial withdrawal results
- reconstitution final concentrations
- C1V1 small stock volumes
- negative and extremely small values
- unchanged ordinary whole-number rounding

## SEO and structured-data safeguards

The SEO registry was synchronised with the actual title and meta description exported by all 14 calculator pages.

The repository preflight now fails when a calculator registry title, description, or canonical no longer appears in its corresponding page source.

The preflight also fails if `practiceQuestions` or `commonExamples` are mapped into FAQ structured data. Practice exercises remain visible educational content but are not represented as FAQ schema.

## Validation completed

Passed:

- 27 calculator and formula arithmetic regression cases
- 17 safe-number precision regression cases
- 30 application-route checks
- 29 internal-link checks
- 14 calculator catalogue checks
- 29 indexable SEO-registry checks
- 19 changed TypeScript/TSX files transpiled without syntax errors
- Strict type-checking of the five pure calculation/formatting libraries

## Validation limitation

A full dependency-backed Next.js type-check and production build could not run in this workspace because the configured package registry does not provide `@hookform/resolvers`. This limitation already exists in the deployment-environment backlog.

During the attempted full type-check, a pre-existing calculator-catalog input-type mismatch was also exposed. It has been logged for a dedicated technical-hardening batch rather than mixed into this safety batch.

## Files added

- `lib/safe-number-format.ts`
- `scripts/precision-regression.mjs`
- `BATCH_25_SHARED_CALCULATION_SAFETY_PRECISION.md`

## Files updated

- Shared formula-formatting libraries
- All calculator clients with local result formatting
- Measurement-guide components
- `lib/seo-registry.json`
- `scripts/qa-preflight.mjs`
- `package.json`
- `README.md`
- `DEFERRED_IMPROVEMENTS_BACKLOG.md`

## Deployment status

This batch resolves the shared zero-display release blocker at source and regression-test level. The package should still be preview-built and browser-tested in an environment with all dependencies installed before replacing the live website.
