# Batch 12 — Creatinine Clearance calculator standard

## Scope

This batch standardises only the adult Cockcroft-Gault creatinine clearance calculator:

- `/calculator/renal-function/creatinine-clearance`

## Calculator changes

- Applied the shared blue renal-function calculator shell and result-first layout.
- Removed the draggable floating calculator and duplicate compact form.
- Replaced aggregate error boxes with inline validation, field focus, result reveal, and the shared copy control.
- Preserved serum creatinine entry in either µmol/L or mg/dL.
- Preserved the Cockcroft-Gault male factor of 1.0 and female factor of 0.85.
- Added consistent Calculate, Clear, Copy, display-rounding, interpretation, and working controls.
- Clears stale results whenever age, weight, factor, creatinine, or unit changes.
- Changing creatinine units now clears the creatinine field to reduce unit carry-over errors.
- Rejects mixed text, fractions, non-numeric values, and values outside the calculator's adult validation ranges.
- Stores the exact inputs and equation components used in the result.

## Safety changes

- Labels the weight field as the weight used in the equation and states that the calculator does not choose actual, ideal, adjusted, or another protocol-specific weight.
- States that the result is Cockcroft-Gault CrCl in mL/min and does not choose a medicine dose or confirm whether CrCl rather than eGFR is required.
- Adds specific result checks for estimated CrCl below 15 mL/min, 15–29.9 mL/min, and above 200 mL/min without converting the number into an automatic dosing recommendation.
- Adds a persistent reminder that creatinine-based estimates may be unreliable during rapid renal change, dialysis, pregnancy, severe frailty, low muscle mass, and body-size extremes.
- Keeps display rounding separate from the underlying calculation.
- Avoids presenting renal dosing bands as universal because dose thresholds are medicine- and guideline-specific.

## Page consistency

- Moved the calculator directly beneath the page heading.
- Removed the upper author line and added the shared lower author/review trust block.
- Retained one Related Calculators section.
- Converted instructions, common examples, common mistakes, practice questions, FAQs, and references into compact native disclosure sections while keeping their HTML content on the page.
- Preserved metadata, long-tail questions, formulas, structured data, examples, and source references.
- Standardised the lower-page order: related calculators, author/review information, then references.
- Changed the page presentation from emerald/green to the shared blue renal category identity.

## Validation performed

- TypeScript/TSX syntax transpilation across 91 files.
- Six Cockcroft-Gault calculation regression cases using both creatinine unit formulas.
- µmol/L and mg/dL equation-equivalence check.
- Changed-file local import resolution.
- Internal route target scan across 30 routes.
- Legacy floating-widget, `alert()`, `parseFloat`, and `onKeyPress` scan.
- Page structure checks for one calculator shell, one related-calculator section, one trust block, and the renal theme.
- Zip integrity check.

## Research basis

- Royal College of Pathologists of Australasia guidance on Cockcroft-Gault for assisting drug-dosing decisions in renal impairment.
- eviQ Cockcroft-Gault formula, practice points, and limitations.
- BNF/NICE renal-impairment prescribing guidance, including body-size-extreme considerations.

## Deferred improvements

No new unrelated website issue was identified in this batch. The existing deferred backlog remains unchanged.
