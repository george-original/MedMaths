# SEO Topic 5 — Renal Function Stage 2

## Page updated
`/calculator/renal-function/creatinine-clearance`

## Calculator changes
- Replaced loose numeric parsing with strict decimal validation.
- Rejects mixed-unit entries such as `175cm`, `70 kg`, `120umol`, `1.2 mg/dL`, `5/10`, and `abc5`.
- Preserved the existing Cockcroft-Gault calculation logic, floating widget, unit selector, and step-by-step working display.

## SEO content changes
- Strengthened metadata for Cockcroft-Gault, CrCl, renal dosing, µmol/L, mg/dL, serum creatinine unit conversion, eGFR vs CrCl, and body-weight choice searches.
- Added clearer above-the-fold explanation for creatinine clearance in mL/min.
- Added step-by-step instructions.
- Expanded formula explanation for both mg/dL and µmol/L.
- Added worked example, common example cards, unit and weight checks, common mistake section, and practice questions.
- Expanded FAQs to target long-tail questions around:
  - Cockcroft-Gault formula
  - how to calculate creatinine clearance manually
  - µmol/L vs mg/dL
  - serum creatinine unit conversion
  - eGFR vs CrCl
  - which weight to use
  - renal dose adjustment
  - limitations in AKI, low muscle mass, frailty, dialysis and body-size extremes
  - adult-only use
- Added WebApplication schema alongside FAQPage and BreadcrumbList schema.
- Updated visible references with links to RCPA, eviQ, BNF/NICE, and the original Cockcroft-Gault publication citation.

## Checks
- TSX transpile check passed for:
  - `app/calculator/renal-function/creatinine-clearance/page.tsx`
  - `app/calculator/renal-function/creatinine-clearance/creatinine-clearance-client.tsx`
- Confirmed this calculator folder no longer contains `parseFloat` or `onKeyPress`.
- Full build could not run in container because `next` is not installed in `node_modules`.
