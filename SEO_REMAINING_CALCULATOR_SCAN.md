# MedMaths calculator coverage scan

## Result
All active calculator topic pages and calculator pages in `app/calculator` have now been reviewed and upgraded for SEO structure, formula clarity, worked examples, FAQs, schema, and safer input handling where required.

## Calculator topics completed

### Dose Calculations
- `/calculator/dose-calculations`
- `/calculator/dose-calculations/mg-to-ml`
- `/calculator/dose-calculations/mgkg-to-ml-dose`
- `/calculator/dose-calculations/units-to-ml`

### Tablet Dosing
- `/calculator/tablet-dosing`
- `/calculator/tablet-dosing` — combined fixed-dose and weight-based tablet calculator

### IV Fluids
- `/calculator/iv-fluids`
- `/calculator/iv-fluids/drip-rate-mlhr-to-gttmin`
- `/calculator/iv-fluids/mlhr-from-drip-rate`
- `/calculator/iv-fluids/ml-per-hour-to-time-to-finish`

### Body Composition
- `/calculator/body-composition`
- `/calculator/body-composition/ideal-body-weight`
- `/calculator/body-composition/bsa`

### Renal Function
- `/calculator/renal-function`
- `/calculator/renal-function/creatinine-clearance`

### Dilutions
- `/calculator/dilutions`
- `/calculator/dilutions/c1v1-c2v2-basic`
- `/calculator/dilutions/reconstitute-to-bag`

## Additional calculator-section page completed
- `/calculators`

This all-calculators index page was upgraded after the scan because it is the central calculator discovery page. It now targets MedMaths, Med Maths, medical maths calculators, medication maths calculators, nursing calculation calculators, and individual calculator search intent without keyword stuffing.

## Technical checks completed
- `app/calculators/page.tsx` passed TSX transpile check.
- No `parseFloat` occurrences remain in `app/calculator` or `app/calculators`.
- No `onKeyPress` occurrences remain in `app/calculator` or `app/calculators`.

## Next phase
The calculator content and topic pages are now ready for the planned sitewide internal linking pass.

Internal linking should be handled after this scan so that links are added from a complete map of upgraded pages, rather than patched one page at a time.

## Batch 27 architecture update

The unindexed `/calculator/dilutions/vial-dose-to-ml` page was consolidated into `/calculator/dose-calculations/mg-to-ml#reconstituted-vial`. The retired URL now permanently redirects and is no longer an indexed calculator route.
