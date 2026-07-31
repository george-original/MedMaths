# Batch 37 — Creatinine Clearance SEO and Content Refinement

Completed: 30 July 2026

## Scope

This batch refines only the supporting search and educational content for:

- `/calculator/renal-function/creatinine-clearance`

The Cockcroft-Gault calculator logic, weight helper, explicit weight-method selection, neutral result presentation, and arithmetic from Batch 36 remain intact.

## Search-positioning decision

The page now owns one narrow task:

> Estimate adult Cockcroft-Gault creatinine clearance when the current medicine label, dosing reference, pharmacist, prescriber, or local protocol requires that renal estimate.

The page does not target broad kidney-health, CKD-stage, “normal kidney function,” or universal renal-dose searches.

The title, URL, canonical, and H1 remain:

- `Creatinine Clearance Calculator | Cockcroft-Gault CrCl`
- `/calculator/renal-function/creatinine-clearance`
- `Creatinine Clearance Calculator — Cockcroft-Gault CrCl`

The meta description now emphasises adult Cockcroft-Gault CrCl, dual serum-creatinine units, and explicit weight selection.

## CrCl-versus-eGFR boundary

The distinction is now prominent immediately after the calculator:

- Cockcroft-Gault CrCl and laboratory eGFR are different estimates.
- They should not be substituted automatically.
- Newer eGFR methods may be appropriate for many medicines.
- Some medicine labels and references still specify Cockcroft-Gault CrCl.
- The current medicine source determines which estimate should be used.

The page no longer implies that Cockcroft-Gault is universally the preferred drug-dosing equation.

## Content reduction

The source page was reduced from approximately 36.9 KB to 32.1 KB while retaining the calculator, formulas, working, references, trust block, and safety boundaries.

- FAQs reduced from 14 to 8.
- Practice questions reduced from 6 to 3.
- Repeated definitions of CrCl and mL/min were consolidated.
- Repetitive result-meaning and limitation sections were consolidated.
- Four extra calculation cards were replaced with one transparent weight-method comparison.
- Retained one detailed µmol/L example.
- Retained one detailed mg/dL example.
- Added one actual-versus-ideal-versus-adjusted weight comparison.
- Retained a concise common-mistakes section and one limitations section.

## Weight-method example

For the same adult inputs, the page demonstrates how the selected weight changes the arithmetic:

- actual body weight;
- Devine ideal body weight;
- adjusted body weight using the 0.4 factor.

The example explicitly states that it demonstrates mathematical differences and does not decide which weight method is clinically correct.

## Structured data

- FAQ structured data now contains the eight focused patient-safe calculator questions only.
- Practice questions remain excluded from FAQ schema.
- WebApplication and BreadcrumbList structured data remain.
- SEO registry metadata was synchronised with the page.

## Validation performed

- Full repository preflight passed:
  - 114 source/configuration files;
  - 27 application routes;
  - 29 internal href references;
  - 12 indexed calculator routes;
  - 26 indexable SEO registry pages;
  - 37 formula/arithmetic cases;
  - 17 precision cases.
- All protected calculator regression suites passed.
- Creatinine-clearance regression expanded to 42 checks covering:
  - formula accuracy;
  - weight methods;
  - neutral result presentation;
  - metadata;
  - eight-FAQ limit;
  - three-practice-question limit;
  - CrCl/eGFR boundary;
  - removal of broad or duplicated content.
- Changed TypeScript/TSX files passed direct TypeScript syntax transpilation.
- SEO registry JSON parsed successfully.
- ZIP integrity checked after packaging.

## Research basis

The content policy reflects current guidance from:

- NIDDK, *Determining Drug Dosing in Adults with Chronic Kidney Disease*: medicine labels have used several kidney-function methods, the FDA does not universally prefer one estimating equation, and newer eGFR methods should be considered where appropriate.
- eviQ, *Creatinine Clearance Calculator*: Cockcroft-Gault formula, adult limitations, and actual/ideal/adjusted weight comparisons.
- NIDDK eGFR guidance: eGFR is an estimate, newer race-free CKD-EPI equations are used for adults, and creatinine-based estimates have limitations.
- The original Cockcroft-Gault publication and the existing listed clinical references.

## Deferred issue logged

Two unrelated items were logged rather than mixed into Batch 37:

- The separate renal category page still targets broad `kidney function calculator` language and repeats content now owned more clearly by the dedicated Cockcroft-Gault page. This belongs in the later sitewide calculator-network alignment batch.
- The repository README contains duplicated release and scope sections. This belongs in later documentation cleanup.

## Deployment limitation

A real dependency-backed Next.js production build and browser preview still require the deployment environment with installed packages.
