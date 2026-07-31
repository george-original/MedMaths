# Batch 20 — Calculator top alignment standard

## Goal

Make every individual calculator page begin at the same vertical position as the mg to mL calculator.

## Issue found

Eight calculator pages retained an additional `pt-20` class on the `<main>` element. The shared site header already occupies its own layout space, so this second top padding created a large blank area above the breadcrumb and page heading.

## Change made

Removed the duplicate `pt-20` from:

- mg to Tablets
- mg/kg to Tablets
- mL/hr to gtt/min
- gtt/min to mL/hr
- IV Infusion Time
- Ideal Body Weight
- BSA
- Creatinine Clearance

All 14 individual calculator pages now use the same top layout contract as mg to mL:

```tsx
<main className="min-h-screen bg-white">
  <div className="mx-auto ... px-4 pb-12 pt-4 sm:px-6 sm:py-12 lg:px-8 lg:pt-10">
```

Category colours, calculator widths, content, formulas, metadata, structured data and routes were not changed.

## Regression protection

The repository preflight now checks every individual calculator page for the standard main wrapper and vertical-spacing classes. A future reintroduction of the extra top padding will fail `pnpm qa:preflight`.

## Validation

- All 14 calculator pages use the standard top alignment.
- No calculator route or formula changed.
- No page content was removed.
- Source-level QA preflight passed.
