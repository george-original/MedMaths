# Batch 16 — Topic and Category Page Standard

## Scope

This batch standardises the six MedMaths calculator topic pages without changing calculator formulas, calculator routes, metadata targets, or the calculator-page work completed in Batches 2–15.

Updated topic pages:

- Dose Calculations
- Tablet Dosing
- IV Fluids
- Body Composition
- Renal Function
- Dilutions

## Shared category-page system

Added `components/calculator/category-page.tsx` with:

- `CalculatorCategoryLayout`
- consistent breadcrumb placement
- compact category hero
- calculator cards immediately after the hero
- category colour variables from the shared calculator theme system
- uniform lower author/review placement
- optional quick-decision and reference slots
- responsive card grids for one, two, or three calculators
- `CategoryFaqList` using semantic server-rendered `<details>` elements

The shared exports were added to `components/calculator/index.ts`.

## User-experience changes

- Calculator links now appear immediately after each topic heading.
- All six topics use the same page order and spacing.
- Each category retains its own colour identity:
  - dose: cyan/teal
  - tablets: orange
  - IV fluids: teal
  - body composition: emerald
  - renal: blue
  - dilutions: purple
- A short decision guide and a visible safety note sit near the calculator cards.
- Long educational content is preserved but condensed into expandable sections.
- Formula explanations, worked examples, safety checks, FAQs, and references remain in the initial HTML.
- Author and review information now appears in the same lower-page trust block on every topic page.
- Reference sections use the same expandable presentation.

## Performance improvement

The IV Fluids topic content no longer declares `"use client"`. It is now server-rendered while retaining the same route and metadata. This removes unnecessary hydration for a page made primarily of static links and educational content.

## SEO preservation

- Existing metadata and canonical URLs were retained.
- Existing collection, breadcrumb, and FAQ structured data were retained.
- Existing long-tail FAQ content was retained.
- Existing formula and safety content was retained or reorganised without reducing the calculation-method coverage.
- No calculator URL was changed.

## Validation completed

- 92 TypeScript/TSX files passed syntax transpilation.
- Shared-layout checks passed for all six topic pages.
- Old root-topic FAQ accordion and direct site-shell duplication checks passed.
- IV topic server-rendering check passed.
- Changed-file local import checks passed.
- Internal literal links passed across 30 app routes.
- Diff review confirmed only the six topic pages, the new shared category component, and the calculator component index were changed before documentation was added.

## Not included

- Individual calculator maths or result behaviour
- Related-calculator card theme update
- Homepage and all-calculators index redesign
- External font hardening
- Full dependency install, lint, Next.js production build, and browser/mobile smoke testing
