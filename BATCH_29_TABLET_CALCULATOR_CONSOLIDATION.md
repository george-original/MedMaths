# Batch 29 — Tablet Calculator Consolidation

## Objective

Resolve tablet search ownership using the available Search Console evidence, improve the landing experience, and remove the near-duplicate fixed-dose and mg/kg child pages.

## Evidence used

The 28-day Search Console export showed:

- `/calculator/tablet-dosing`: 149 clicks, 14,156 impressions, 1.05% CTR, average position 6.49
- neither `/calculator/tablet-dosing/mg-to-tablets` nor `/calculator/tablet-dosing/mgkg-to-tablets` appeared in the page-performance export

The ranking tablet URL was therefore preserved and upgraded instead of trying to move authority to a weaker child URL.

## Architecture implemented

`/calculator/tablet-dosing` is now the calculator-first tablet page with two modes:

1. Dose already in mg
2. Dose based on mg/kg per dose

Permanent redirects preserve old links:

- `/calculator/tablet-dosing/mg-to-tablets` → `/calculator/tablet-dosing#fixed-dose`
- `/calculator/tablet-dosing/mgkg-to-tablets` → `/calculator/tablet-dosing#weight-based`

Both retired pages were removed from the application routes, calculator catalogue, SEO registry, sitemap, internal links, and most-used seed.

## SEO protection

The Search Console-proven page retains its live:

- URL
- canonical
- title
- meta description
- H1

The page now gives users the calculator immediately instead of requiring a second click from a collection page.

## Calculator changes

- Added an accessible two-mode segmented control.
- Added hash-aware mode selection for redirected and shared links.
- Preserved exact tablet arithmetic and tablet-fraction safety guidance.
- Retained kg and mg/kg-per-dose scope for the weight-based mode.
- Kept mg/kg/day outside the calculator and explained that the per-dose amount must be resolved first.
- Added shared pure formula helpers for fixed-dose and weight-based calculations.
- Reduced the combined page to eight focused FAQs and four practice questions.
- Preserved warnings for awkward fractions, unsuitable splitting, and large tablet burdens.

## Technical hardening

- Added `scripts/tablet-dose-regression.mjs` and `pnpm qa:tablet`.
- Added 11 arithmetic, validation, mode, metadata, and redirect checks.
- Updated repository preflight to support calculator pages that live at a topic-root URL rather than assuming all calculator routes have the same depth.
- Resolved the `CalculatorInput.categoryShortName` raw-input type mismatch.
- Added calculator-search category-name fallback from the central catalogue.

## Validation completed

- Repository preflight passed.
- 27 application routes checked.
- 29 internal href references checked.
- 12 calculator catalogue routes checked.
- 26 indexable SEO registry pages checked.
- 34 arithmetic/formula-authority cases passed.
- 17 shared precision cases passed.
- 11 tablet regression checks passed.
- Changed TS/TSX files passed direct TypeScript syntax transpilation.
- `lib/tablet-dose-formulas.ts` passed direct strict TypeScript checking.

## Deployment limitation

The workspace does not contain project dependencies and cannot complete a dependency-backed Next.js production build or browser test. Run the full release gate in the preview/deployment environment before publishing.

## Newly logged issues

No new unrelated issue was discovered. The pre-existing calculator catalogue input-type mismatch was resolved because this batch directly changed the catalogue architecture.
