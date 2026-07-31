# Batch 5 — mg to Tablets Calculator Standard

## Scope

Updated only the fixed-dose mg-to-tablets calculator and the shared tablet-result visual needed by the tablet calculator family.

## Calculator changes

- Applied the shared orange tablet-dosing calculator shell.
- Kept the calculator immediately below the page heading.
- Replaced browser alerts with inline validation and focus management.
- Added automatic result reveal and keyboard focus.
- Added standard Calculate, Clear, Copy and working components.
- Preserved the formula: tablets = dose ordered ÷ tablet strength.
- Moved author and review information to the lower trust section.

## Tablet safety visual

- Shows whole tablets plus standard quarter, half and three-quarter tablet fractions.
- Does not display a misleading visual for awkward results such as 1.2 or 1.33 tablets.
- Warns that tablet splitting depends on the specific product, score line, formulation, product information and local policy.
- Adds an amber check at 5 or more tablets.
- Adds a stronger red check at 10 or more tablets.
- States that a different strength or formulation may exist, but does not recommend substitution without prescriber or pharmacist confirmation.
- Limits the on-screen whole-tablet icons and summarises any additional tablets to keep large results readable.

## Safety correction

The shared tablet-fraction matcher was tightened from a 0.01 tolerance to 0.000001. A result such as 1.01 tablets is no longer presented as one whole tablet.

## Files changed

- `app/calculator/tablet-dosing/mg-to-tablets/mg-to-tablets-simple-client.tsx`
- `app/calculator/tablet-dosing/mg-to-tablets/page.tsx`
- `components/calculator/tablet-dose-guide.tsx`
- `components/calculator/index.ts`
- `lib/tablet-safety.ts`
- `BATCH_05_MG_TO_TABLETS_STANDARD.md`
- `DEFERRED_IMPROVEMENTS_BACKLOG.md`
