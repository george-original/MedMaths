# Batch 39 — Final IV Bag Concentration Checker

Completed: 30 July 2026

## Scope

This batch refines only:

- `/calculator/dilutions/reconstitute-to-bag`

The existing URL and canonical remain unchanged.

## Product-positioning decision

The page no longer presents itself as a generic reconstitution or IV-bag preparation planner.

It now owns one narrow job:

> Check final IV concentration after the medicine amount per vial, verified final volume per reconstituted vial, medicine-solution transfer volume, and verified final total preparation volume are already known.

Updated page signals:

- Title: `Final IV Bag Concentration Calculator | Reconstituted Vial`
- H1: `Final IV Bag Concentration Calculator`
- Primary query: `final IV bag concentration calculator`
- Supporting queries: `reconstituted vial concentration calculator`, `vial to IV bag concentration`, `final IV concentration checker`, and `amount transferred calculator`

The page explicitly does not choose:

- medicine or dose;
- diluent or diluent volume;
- number of vials;
- medicine-solution transfer volume;
- bag, container, or final total volume;
- compatibility, stability, storage, or expiry;
- infusion rate, route, monitoring, or administration method.

## Calculator changes

The calculator now asks for four verified inputs:

1. drug amount per vial in mg;
2. verified final volume per reconstituted vial in mL;
3. total medicine-solution volume transferred in mL;
4. verified final total preparation volume in mL.

It calculates:

- reconstituted-vial concentration in mg/mL;
- total amount transferred in mg;
- final IV concentration in mg/mL;
- number of equivalent identical vial volumes represented by the transfer;
- reverse-check amount from final concentration × final total volume.

The result remains an arithmetic check rather than a preparation instruction.

## Formula extraction and testability

The arithmetic was moved from the client component into:

- `lib/final-iv-concentration-formulas.ts`

The shared function rejects:

- zero, negative, and non-finite inputs;
- a final total preparation volume smaller than the transferred medicine-solution volume.

A dedicated regression suite was added:

- `scripts/final-iv-concentration-regression.mjs`
- package script: `pnpm qa:finaliv`

The repository preflight now requires and runs this suite.

## Result and warning corrections

The page no longer uses red danger styling solely because a transfer volume crosses an arbitrary numerical threshold.

Unusual arithmetic now produces warning-level recheck prompts only:

- a transfer volume below 0.1 mL;
- more than one entered vial equivalent;
- no additional carrier volume represented.

The small-volume message states explicitly that it is an arithmetic screening prompt, not a universal preparation threshold.

The previous large-withdrawal and extremely-low-concentration hard-coded thresholds were removed.

## Device-guidance boundary

The shared volume-measurement guide was removed from this page.

That guide could make a final-concentration checker appear to recommend a measuring device or preparation method. The page retains only a labelled schematic that separates:

- verified reconstituted-vial concentration;
- medicine-solution transfer volume;
- amount transferred;
- verified final total preparation volume;
- final concentration.

The schematic remains explicitly labelled as not to scale and not a preparation instruction.

## Content reduction

The page was reduced to:

- 8 focused FAQs;
- 3 worked examples;
- 3 practice questions.

Removed or consolidated:

- antibiotic-specific targeting;
- chemotherapy-specific targeting;
- repetitive formula explanations;
- six near-identical common-result cards;
- duplicate questions about transferred amount and reverse checking.

The retained content focuses on:

1. the linked three-step calculation;
2. final vial volume versus diluent added;
3. verified final total volume;
4. amount transferred;
5. full-vial and multiple-vial arithmetic;
6. reverse checking;
7. final concentration versus infusion rate;
8. why diluent, compatibility, and stability cannot be selected generically.

Practice questions remain excluded from FAQ structured data.

## Research and safety basis

The safety boundary is grounded in sources showing that:

- reconstitution diluent and volume must come from manufacturer or approved medication directions;
- the amount of diluent added can differ from the final reconstituted volume;
- IV medicines have product-specific compatibility, stability, concentration, container, and administration requirements;
- high-risk medicines require stronger systems such as standardisation and independent checks.

References now include OpenStax Clinical Nursing Skills and the Australian Commission on Safety and Quality in Health Care, including a product-information example demonstrating why diluent volume and final reconstituted volume are not interchangeable.

## Registry and navigation alignment

Updated:

- page metadata and structured data;
- SEO registry;
- central calculator catalogue;
- dilution category card and selection guide;
- related-calculator card titles and descriptions;
- formula-authority query map;
- README release commands and calculator-scope note.

## Validation performed

- Full repository preflight passed:
  - 116 source/configuration files;
  - 27 application routes;
  - 29 internal href references;
  - 12 indexed calculator routes;
  - 26 indexable SEO registry pages;
  - 37 sitewide formula/arithmetic cases;
  - 17 shared precision cases.
- Dedicated final-IV-concentration regression passed 38 arithmetic, validation, safety-boundary, UI, SEO, and content checks.
- Every existing protected calculator regression suite passed.
- The new formula library passed strict direct TypeScript checking.
- Twelve changed TypeScript and TSX files passed direct syntax transpilation.
- SEO registry and package JSON parsed successfully.
- Source archive was checked for generated build artefacts before packaging.

## Deferred issues

No new unrelated issue was discovered.

Existing active deferred items remain:

- dependency-backed production build and browser preview;
- analytics and policy alignment;
- renal category-page search-intent alignment;
- README duplication cleanup.

## Deployment limitation

A real dependency-backed Next.js production build and browser preview still require the deployment environment with installed packages.
