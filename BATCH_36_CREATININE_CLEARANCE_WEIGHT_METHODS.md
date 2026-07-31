# Batch 36 — Creatinine Clearance Weight Methods and Neutral Result Presentation

Completed: 30 July 2026

## Scope

This batch updates only the adult Cockcroft-Gault creatinine clearance calculator:

- `/calculator/renal-function/creatinine-clearance`

The batch focuses on calculator capability and result safety. A later dedicated batch will reduce and refine the long-form SEO content.

## Calculator changes

- Preserved direct entry for a kilogram weight already specified by a medicine reference or local protocol.
- Added an optional weight-method helper with metric and imperial inputs.
- The helper calculates and displays:
  - actual body weight;
  - Devine ideal body weight;
  - adjusted body weight using `IBW + 0.4 × (actual weight − IBW)`.
- Requires the user to actively select the method required by the current dosing source.
- Records the selected method and exact kilogram weight in the result, copied text, and step-by-step working.
- Supports actual weight in kg or lb and height in cm or feet/inches.
- Converts imperial measurements before calculating weight candidates.
- Uses the same adult Devine height boundary as the dedicated IBW calculator: 152.4 to 250 cm.
- Keeps serum creatinine entry in either µmol/L or mg/dL and clears the field when the unit changes.

## Safety changes

- The calculator never automatically decides whether actual, ideal, adjusted, or another weight is clinically correct.
- Adjusted body weight is clearly labelled as a 0.4-factor arithmetic option rather than a universal rule.
- The result card now always uses neutral renal styling rather than turning red based only on a CrCl number.
- CrCl below 30 mL/min or above 200 mL/min triggers an input-review prompt, not a diagnosis or universal dosing band.
- The page continues to distinguish Cockcroft-Gault CrCl from eGFR and measured clearance.
- The calculator does not select a medicine dose, renal equation, dialysis plan, or medicine-specific threshold.

## SEO and page-alignment changes

- Updated title to `Creatinine Clearance Calculator | Cockcroft-Gault CrCl`.
- Updated the description to explain dual creatinine units and transparent weight-method comparison.
- Updated the calculator catalogue, renal category description, SEO registry, and formula-authority query map.
- Updated the review date to 30 July 2026.
- Preserved the existing URL, canonical, H1, Cockcroft-Gault formulas, and indexable page architecture.

## Formula policy

The helper exposes weight choices but does not claim that one is generally correct. This reflects the fact that medicine labels and protocols may use different renal-function estimates and weight methods.

The adjusted-weight helper uses a commonly published arithmetic form:

`Adjusted weight = IBW + 0.4 × (actual weight − IBW)`

The user must confirm that the current medicine reference explicitly requires that method and factor.

## Validation performed

- 30 dedicated creatinine-clearance formula, helper, UI, metadata, and neutral-result checks.
- Actual, Devine ideal, and adjusted weight candidate calculations.
- µmol/L and mg/dL Cockcroft-Gault cases.
- Explicit weight-method recording in results.
- Metric and imperial helper-path source checks.
- No red `danger` result state or universal low-CrCl classification.
- Full repository preflight:
  - 27 application routes;
  - 12 indexed calculator routes;
  - 26 indexable SEO registry pages;
  - 37 sitewide arithmetic checks;
  - 17 shared precision checks;
  - all existing protected calculator regression suites.
- Changed TypeScript/TSX syntax transpilation.
- Strict type-checking of the pure creatinine-clearance calculation libraries.

## Research basis

- NIDDK guidance that drug labels and dosing references have used multiple kidney-function estimates and that no single estimating equation is universally preferred for every medicine.
- eviQ Cockcroft-Gault calculator formulas and its published actual, ideal, and adjusted weight comparison.
- Original Cockcroft-Gault equation and existing MedMaths adult Devine formula policy.

## Deferred within the planned roadmap

The page still has over-expanded supporting content. The next creatinine-clearance batch should:

- reduce the FAQ set;
- reduce practice questions;
- consolidate repeated CrCl definitions and warnings;
- strengthen one concise CrCl-versus-eGFR section;
- complete a final search-positioning and competitor review.

No new unrelated website issue was discovered in this batch.
