# Batch 38 — Medication Dilution C1V1=C2V2 Refinement

Completed: 30 July 2026

## Scope

This batch refines only:

- `/calculator/dilutions/c1v1-c2v2-basic`

The route remains indexed and keeps the full C1V1=C2V2 equation with the ability to solve for V1, V2, C1, or C2.

## Search-positioning decision

The page now owns one narrow job:

> Check medication-dilution concentration and volume arithmetic when the same medicine or solute, matching concentration units, and a verified final total volume are known.

The page no longer attempts to serve broad laboratory, density, temperature, or general-chemistry search intent.

Updated page signals:

- Title: `Medication Dilution Calculator | C1V1=C2V2`
- H1: `Medication Dilution Calculator (C1V1 = C2V2)`
- Primary query: `medication dilution calculator`
- Supporting queries: `drug dilution calculator`, `C1V1 C2V2 calculator`, `stock volume calculator`, and `final concentration calculator`

The existing URL and canonical remain unchanged.

## Calculator changes

The four solve paths remain:

- V1 — stock solution volume;
- V2 — final total volume;
- C1 — starting concentration;
- C2 — final concentration.

The interface now states explicitly that:

- C1 and C2 must describe the same medicine or solute;
- C1 and C2 must use the same concentration unit and basis;
- V1 and V2 must use the same volume unit;
- V2 is the verified final total volume, not only the diluent added;
- percentage concentrations need the same percentage basis;
- the result is arithmetic only and does not select a medicine, diluent, route, final concentration, stability period, or preparation method.

The V1 result wording was changed from an instruction-like `Use X mL` statement to a neutral arithmetic statement.

## Diluent-volume boundary

The calculator continues to show:

`V2 − V1`

This is now labelled consistently as the **arithmetic diluent difference**.

The page explicitly warns that the difference must not automatically be treated as an instruction to add that exact volume because real products may:

- require making up to a final volume;
- have displacement or non-additive volume considerations;
- specify a different reconstitution or dilution sequence;
- require a particular diluent, concentration range, route, stability period, or independent check.

## Formula extraction and testability

C1V1=C2V2 arithmetic was moved from the client component into:

- `lib/c1v1-c2v2-formulas.ts`

The shared function uses a discriminated input type for the selected unknown and rejects zero, negative, and non-finite known values.

A dedicated regression suite was added:

- `scripts/c1v1-c2v2-regression.mjs`
- package script: `pnpm qa:dilution`

The suite covers all four solve paths, conservation checks, small non-zero results, stronger-than-stock arithmetic, same-concentration results, invalid values, metadata, page scope, content limits, category alignment, and removal of generic chemistry drift.

## Content reduction

The page source was reduced from approximately 29.2 KB to 26.5 KB while retaining the calculator, all four formula rearrangements, safety guidance, related calculators, trust block, and references.

- FAQs reduced from 11 to 8.
- Practice questions reduced from 8 to 4.
- Worked examples reduced from 4 to 3.
- The temperature/density FAQ was removed.
- Repetitive definitions and generic chemistry wording were consolidated.
- The page now uses medication-specific examples without naming or recommending a medicine.

Practice questions remain excluded from FAQ structured data.

## References and research basis

The page references were replaced with more authoritative sources covering:

- the dilution equation and conservation of solute amount;
- nursing dosage-calculation and unit-consistency principles;
- product-label or package-insert control of reconstitution diluent and volume;
- FDA medication-error guidance for reconstitution instructions and resulting concentration;
- Australian high-risk-medicine controls and independent-check systems.

The sources now include OpenStax, the U.S. Food and Drug Administration, and the Australian Commission on Safety and Quality in Health Care.

## Registry and navigation alignment

Updated:

- calculator metadata;
- SEO registry;
- central calculator catalogue;
- dilution category card and selection guide;
- formula-authority query map;
- README release commands and current calculator scope;
- authoritative upload note.

The category page itself remains scheduled for the later sitewide network-alignment pass; this batch changed only the directly affected calculator card and selection wording.

## Validation performed

- Full repository preflight passed:
  - 115 source/configuration files;
  - 27 application routes;
  - 29 internal href references;
  - 12 indexed calculator routes;
  - 26 indexable SEO registry pages;
  - 37 sitewide formula/arithmetic cases;
  - 17 shared precision cases.
- Dedicated C1V1=C2V2 regression passed 33 arithmetic, validation, UI, SEO, and content checks.
- Every existing protected calculator regression suite passed.
- The new formula library passed strict direct TypeScript checking.
- All changed TypeScript and TSX files passed direct syntax transpilation.
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
