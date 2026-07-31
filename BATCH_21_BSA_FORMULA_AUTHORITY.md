# Batch 21 — BSA Formula Authority Gold Standard

Completed: 11 July 2026

## Scope

Batch 21 establishes the formula-authority standard for MedMaths and applies it to the Body Surface Area calculator. It also removes the remaining competitor-calculator comparisons from live site content.

## BSA calculator changes

- Centralised all four BSA equations, coefficients, formula names, plain-English explanations, comparison notes, sources, calculations and working steps in `lib/bsa-formulas.ts`.
- Added a shared accessible `CalculatorEquation` component for formula presentation.
- The selected formula is now shown inside the interactive calculator before the user enters measurements.
- Switching between Mosteller, Du Bois and Du Bois, Haycock, and Gehan and George immediately changes the equation, plain-English instructions and formula-difference explanation.
- When a result already exists, switching formulas recalculates the result using the same height and weight.
- The result shows:
  - exact calculator value
  - user-selected display rounding
  - complete substituted arithmetic
  - a direct explanation of what the BSA result means
  - a four-formula comparison table using the same measurements
- Display rounding is explicitly separated from clinical or protocol-specific dose rounding.

## BSA meaning and long-tail content

The page now gives distinct, direct answers for:

- BSA meaning
- BSA definition
- what a BSA result means
- how BSA is calculated
- Mosteller BSA formula
- Du Bois and Du Bois BSA formula
- Haycock BSA formula
- Gehan and George BSA formula
- why BSA formulas differ
- which BSA formula to use
- what m² means
- how BSA is used in medication calculations
- how mg/m² arithmetic works
- BSA and BMI differences
- paediatric calculation limitations

All four formula explanations remain in server-rendered HTML. The interactive calculator highlights the selected method without hiding the other formula content from the initial page source.

## Formula presentation standard

The new shared equation component provides:

- a visually clear equation card
- a screen-reader equation label
- a plain-English explanation
- variable definitions immediately beside the equation
- category-colour styling
- mobile horizontal-overflow protection

## Query ownership

Added `FORMULA_AUTHORITY_QUERY_MAP.md` with:

- one primary search job for every calculator
- supporting long-tail query clusters
- a detailed BSA query map
- rules for retaining useful search phrases without keyword stuffing
- content boundaries to reduce search-intent overlap between pages

## Competitor comparison removal

Removed the remaining MDCalc and ClinCalc comparison FAQ and reference links from the Ideal Body Weight page.

The replacement explains why another IBW calculation may differ using formula choice, height conversion and rounding, without naming or promoting another calculator website.

The automated preflight now fails if competitor calculator brands are added to application content.

## SEO registry and catalogue

- Updated the BSA title, description, H1 recommendation, long-tail terms, synonyms, review date and page angle in the SEO registry.
- Updated the central calculator catalogue to describe the four available BSA formulas rather than presenting the tool as Mosteller-only.

## Formula sources checked

The BSA constants and equation forms were checked against the original Mosteller, Du Bois and Du Bois, Haycock, and Gehan and George publications, with Australian clinical context from eviQ.

## Automated checks

- MedMaths preflight passed.
- 106 source/configuration files scanned.
- 30 application routes checked.
- 29 internal href references checked.
- 14 calculator catalogue routes checked.
- 29 indexable SEO registry pages checked.
- 17 calculator and BSA-formula arithmetic regression checks passed.
- 101 TypeScript/TSX files passed syntax transpilation.
- 232 local imports resolved.
- Competitor-brand content scan passed.
- BSA formula-authority content and anchor checks passed.
- No original project file was removed.

## Build limitation

A dependency-backed Next.js build and browser rendering test could not run because project dependencies are not installed in this workspace and package-registry access is unavailable.

The existing deployment validation requirement remains active.

## Next controlled batch

Batch 22: Ideal Body Weight and Creatinine Clearance formula-authority updates.
