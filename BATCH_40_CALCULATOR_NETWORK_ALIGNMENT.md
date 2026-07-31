# Batch 40 — Calculator Network Alignment

**Date:** 30 July 2026  
**Baseline:** `MedMaths-main-batch39-final-iv-bag-concentration-checker.zip`

## Goal

Align the full calculator network after the page-by-page improvement batches so each URL owns one distinct search task and users move to the correct next calculator without duplicate or retired pages.

## Changes completed

### Central related-calculator network

- Added `lib/calculator-network.json` and `lib/calculator-network.ts`.
- Every indexed calculator now has exactly four deliberate next-step links.
- Removed 12 separately maintained inline related-calculator arrays.
- Tablet mode links retain `#fixed-dose` and `#weight-based` anchors.
- Related cards now resolve destination colours correctly when a URL contains an anchor.
- Four-card sections use a balanced two-column/four-column layout.

### Query ownership

Four plural collection pages remain indexable:

1. Medication Dose Calculators
2. IV Fluid and Infusion Calculators
3. Medication Dilution and IV Concentration Calculators
4. Dosing Body Measure Calculators

Their titles, descriptions, H1s, registry records, and structured-data names were aligned to plural collection intent. Singular calculator queries remain owned by the calculator pages.

### Renal architecture

- Removed the single-item renal category page.
- Added a permanent redirect from `/calculator/renal-function` to `/calculator/renal-function/creatinine-clearance`.
- Removed the retired category from the SEO registry and sitemap.
- Updated the creatinine-clearance breadcrumb, catalogue topic link, homepage pathway, and directory pathway.

### Homepage and directory

- Removed outdated promises of a separate vial calculator.
- Clarified that vial withdrawal volume belongs to mg-to-mL.
- Clarified medication dilution versus final IV concentration tasks.
- Direct renal-intent users to the Cockcroft-Gault calculator.
- Aligned homepage and search-popular lists to the same evidence-based order.
- Added the proven reverse-IV page and high-impression IBW/BSA pages to the popular set.
- Single-calculator topic cards now say `Open calculator`; duplicate topic-guide links are hidden.

### Automated protection

Added `pnpm qa:network`, covering 220 checks for:

- all 12 indexed calculator routes
- exactly four related links per calculator
- no self-links, duplicates, retired targets, or unsupported anchors
- distinct category and calculator primary-query ownership
- four valid collection pages
- renal redirect and route retirement
- popular-list synchronisation
- central related-link usage on every calculator page
- homepage and directory pathway wording

The network suite also runs inside `pnpm qa:preflight`.

## Validation

Passed:

- 26 application routes
- 12 indexed calculators
- 25 indexable SEO pages
- 26 internal href references
- 37 sitewide arithmetic checks
- 17 shared precision checks
- every dedicated calculator regression suite
- 220 calculator-network checks
- 22 changed TypeScript/TSX syntax-transpilation checks
- JSON and ZIP integrity checks

A full dependency-backed TypeScript run and Next.js production build remain unavailable in this workspace because project dependencies are not installed. These remain mandatory in final deployment QA.

## Result

The website now has 12 distinct indexed calculator jobs across six topic areas, four genuine collection pages, centralised related links, and no single-calculator category page competing with its calculator.
