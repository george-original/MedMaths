# Batch 6 — mg/kg to Tablets Calculator Standard

## Scope

Updated the weight-based mg/kg-to-tablets calculator to match the MedMaths tablet calculator standard established in Batch 5.

## Calculator changes

- Applied the shared orange tablet-dosing calculator shell.
- Moved the calculator directly beneath the page heading.
- Replaced browser alerts with inline field validation and focus management.
- Added automatic result reveal and keyboard focus.
- Added standard Calculate, Clear, Copy and calculation-working components.
- Preserved the two-stage formula:
  - total dose (mg) = weight (kg) × dose (mg/kg)
  - tablets = total dose (mg) ÷ tablet strength (mg/tablet)
- Displays the calculated total dose and exact tablet count together.
- Clears stale results whenever an input changes.
- Moved author and review information to the lower trust section.

## Weight-based safety

- Makes clear that the entered dose must be a per-dose mg/kg amount.
- Warns that an mg/kg/day order must be converted to the prescribed per-dose amount first.
- States that the calculator does not check maximum single-dose or daily-dose limits.
- Prompts confirmation of patient weight, dose frequency, tablet strength, product information and local policy.

## Tablet visual and burden checks

- Uses the shared whole, quarter, half and three-quarter tablet visual.
- Does not show a misleading visual for awkward results such as 0.9 or 1.33 tablets.
- Adds tablet-splitting checks for fractional results.
- Adds an amber warning at 5 or more tablets.
- Adds a stronger red warning at 10 or more tablets.
- Does not recommend substitution or automatic rounding.

## Page consistency

- Removed the extra calculator wrapper that made this page sit differently from the fixed-dose tablet calculator.
- Reduced the content width to the shared calculator-page width.
- Removed the author line above the calculator.
- Added the standard lower trust block.
- Preserved existing SEO content, FAQ schema, references and related calculators.

## Files changed

- `app/calculator/tablet-dosing/mgkg-to-tablets/mgkg-to-tablets-client.tsx`
- `app/calculator/tablet-dosing/mgkg-to-tablets/page.tsx`
- `BATCH_06_MGKG_TO_TABLETS_STANDARD.md`
