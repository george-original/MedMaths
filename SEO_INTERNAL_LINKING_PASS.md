# SEO Internal Linking Pass

Date: 2026-07-11

## Scope

This pass added calculator-to-calculator internal links after all calculator topics were upgraded for SEO.

The goal was to help users and search engines move through the MedMaths calculator library by calculation pathway rather than only by category page.

## New shared component

Added:

- `components/related-calculators.tsx`

This component renders a consistent related-calculator card grid with descriptive anchor text.

## Calculator pages updated

Added related calculator sections to these 14 calculator pages:

1. `/calculator/dose-calculations/mg-to-ml`
2. `/calculator/dose-calculations/mgkg-to-ml-dose`
3. `/calculator/dose-calculations/units-to-ml`
4. `/calculator/tablet-dosing` — combined tablet calculator
6. `/calculator/iv-fluids/drip-rate-mlhr-to-gttmin`
7. `/calculator/iv-fluids/mlhr-from-drip-rate`
8. `/calculator/iv-fluids/ml-per-hour-to-time-to-finish`
9. `/calculator/body-composition/ideal-body-weight`
10. `/calculator/body-composition/bsa`
11. `/calculator/renal-function/creatinine-clearance`
12. `/calculator/dilutions/c1v1-c2v2-basic`
13. `/calculator/dilutions/vial-dose-to-ml`
14. `/calculator/dilutions/reconstitute-to-bag`

## Linking strategy

Links were added by clinical/calculation pathway:

- Dose conversion pages link to unit, vial, dilution, tablet, BSA, IBW, renal, and IV tools where relevant.
- Tablet pages link to liquid dose, weight-based dose, IBW, BSA, and renal context calculators.
- IV pages link to reverse IV conversions, infusion time, dilution, reconstitution, and dose-to-volume calculators.
- Body composition pages link to each other, renal dosing, mg/kg, BSA, and dose-volume calculators.
- Dilution pages link between C1V1, vial dose-to-mL, reconstitution, infusion time, and dose calculators.
- Creatinine clearance links to dosing weight, BSA, liquid dose, unit, and tablet calculators.

## Extra route quality fix

During the internal link check, the footer and About page linked to pages that did not yet exist:

- `/editorial-policy`
- `/terms`
- `/cookies`

These pages were added to prevent broken internal footer links and to improve trust signals:

- `app/editorial-policy/page.tsx`
- `app/terms/page.tsx`
- `app/cookies/page.tsx`

## Checks run

- TSX transpile check across app, components, and lib files: passed.
- Internal route validation for app and component links: passed.
- Full Next.js build was not run because node_modules are not installed in the container.

Run locally:

```bash
pnpm install
pnpm build
```

or:

```bash
npm install
npm run build
```
