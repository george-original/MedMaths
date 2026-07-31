# Batch 27 — Vial Dose to mL consolidation

**Status:** Complete  
**Source baseline:** Batch 26 mg-to-mL SEO content protection  
**Scope:** Remove the unindexed near-duplicate Vial Dose to mL page and consolidate its useful workflow into the protected mg-to-mL calculator.

## Decision

The standalone Vial Dose to mL page was not indexed and had no Search Console performance to preserve. It duplicated the core calculation already handled by mg-to-mL:

`volume in mL = ordered dose ÷ concentration`

The mg-to-mL page already accepts a verified final vial amount and final vial volume and contains a stable `#reconstituted-vial` section.

## Changes

- Removed the standalone page and client route.
- Added a permanent redirect from `/calculator/dilutions/vial-dose-to-ml` to `/calculator/dose-calculations/mg-to-ml#reconstituted-vial`.
- Removed the retired page from the calculator catalogue and SEO registry, which also removes it from the sitemap.
- Removed all internal links to the retired URL.
- Updated the dilution category to contain two distinct tools: C1V1=C2V2 and final IV bag concentration.
- Kept vial-withdrawal education, but routed it to the mg-to-mL reconstituted-vial section.
- Updated calculator-directory copy and automated QA expectations from 14 to 13 indexed calculator routes.
- Added regression checks for the redirect, deleted route, catalogue removal, registry removal, and absence of internal links.

## Protected unchanged

The flagship mg-to-mL URL, canonical, title, meta description, H1, calculator-first layout, mg-to-mL mode, and mL-to-mg mode remain unchanged.

## Release requirement

Run a dependency-backed Next.js production build and browser preview smoke test in the deployment environment before replacing the live website.
