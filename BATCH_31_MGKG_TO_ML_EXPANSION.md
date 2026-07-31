# Batch 31 — mg/kg to mL Expansion

Date: 30 July 2026

## Scope

Expand the existing mg/kg to mL calculator so the tool matches the order formats and weight units already discussed on the page, without making medication recommendations.

## Implemented

- Added two explicit calculation modes:
  - mg/kg per dose
  - mg/kg/day
- Added prescribed divided doses per day for daily orders.
- Added weight input in kilograms or pounds.
- Pounds are converted using the exact factor `1 lb = 0.45359237 kg` before dose arithmetic.
- Added automatic conversion when switching between kg and lb.
- Added separate outputs for:
  - total daily mg when applicable
  - mg per dose
  - equivalent mg/kg per dose
  - mL per dose
- Preserved direct mg/mL entry and mg per X mL label entry.
- Added transparent conversion and divided-dose working.
- Retained the shared non-zero precision protections and volume measurement guide.
- Reduced the FAQ set from 13 to 10 focused questions.
- Replaced repetitive examples with per-dose, per-day, label-format, and pounds examples.
- Updated metadata and calculator catalogue wording to match the actual capability.
- Updated the review date to 30 July 2026.

## Safety boundaries

The calculator does not:

- choose dose frequency
- decide whether a daily order should be divided equally
- select actual, ideal, or adjusted body weight
- check maximum single or daily doses
- recommend a medication dose
- approve a route, device, or rounding choice

The user must match the mode, divided-dose count, weight method, concentration, and limits to the medication order and approved reference.

## Validation completed

- Repository preflight passed.
- 37 sitewide calculator and formula-authority arithmetic checks passed.
- 17 shared precision checks passed.
- 16 dedicated mg/kg-to-mL arithmetic, validation, UI, and SEO protections passed.
- Existing mg-to-mL, reverse-IV, tablet, and BSA regression suites passed.
- Changed TypeScript/TSX files passed syntax transpilation.
- The pure weight-based liquid formula library passed strict standalone TypeScript checking.

## Outstanding release validation

A dependency-backed `pnpm check` and browser preview remain required in the deployment environment because project dependencies are not installed in this workspace.

## Newly logged issues

None.
