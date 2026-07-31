# Batch 33 — IV Drip Rate Calculator Expansion

Date: 30 July 2026

## Scope

Expand the forward gravity IV drip-rate calculator so it serves both common input pathways without creating another overlapping page:

- a known infusion rate in mL/hr
- a known total volume and prescribed infusion time

The calculator remains an arithmetic and flow-rate checking tool. It does not choose an IV order, giving set, route, device, or clinical method.

## Implemented

- Retained the existing route:
  - `/calculator/iv-fluids/drip-rate-mlhr-to-gttmin`
- Added an accessible two-mode control:
  - **I know the mL/hr rate**
  - **I know volume and time**
- Retained the direct formula:
  - `gtt/min = (mL/hr × drop factor) ÷ 60`
- Added the volume-and-time formula:
  - `gtt/min = (volume mL × drop factor) ÷ time in minutes`
- Added derived hourly-rate working in volume-and-time mode:
  - `mL/hr = (volume mL × 60) ÷ time in minutes`
- Added total-volume input.
- Added separate hours and additional-minutes inputs.
- Added validation that:
  - volume is positive
  - total duration is greater than zero
  - additional minutes remain between 0 and 59
  - the giving-set drop factor is positive
- Kept standard giving-set options of 10, 15, 20, and 60 gtt/mL plus a custom option.
- Preserved exact gtt/min arithmetic while displaying whole drops per minute.
- Preserved the shared protection that prevents a small non-zero result from being presented as zero.
- Added the calculated mL/hr rate to the result and copy text in volume-and-time mode.
- Retained slow-rate, rapid-rate, giving-set, and actual-flow warnings.
- Updated page metadata to reflect the broader calculator job:
  - `IV Drip Rate Calculator | mL/hr or Volume & Time`
- Updated the H1 to:
  - `IV Drip Rate Calculator`
- Reduced the content to:
  - 8 focused FAQs
  - 4 practice questions
- Added a dedicated pure formula library:
  - `lib/iv-drip-rate-formulas.ts`
- Added a dedicated regression suite:
  - `scripts/iv-drip-rate-regression.mjs`
- Updated the calculator catalogue, SEO registry, formula-authority map, README, upload note, and batch history.

## Safety boundaries

The calculator does not:

- select the prescribed volume, rate, or duration
- choose the giving-set drop factor
- decide whether gravity infusion is appropriate
- program an infusion pump
- determine compatibility, route, or administration policy
- treat the rounded whole-drop result as a substitute for checking actual chamber flow
- decide whether an unusually slow or fast rate is clinically acceptable

## Validation completed

- Repository preflight passed.
- 37 sitewide calculator and formula-authority arithmetic checks passed.
- 17 shared precision checks passed.
- Dedicated IV drip-rate regression passed:
  - direct mL/hr calculations
  - total-volume-and-time calculations
  - derived mL/hr results
  - whole-drop rounding
  - invalid zero-input rejection
  - two-mode UI protections
  - page metadata and content checks
- Existing mg-to-mL, reverse-IV, tablet, BSA, mg/kg-to-mL, and Units-to-mL regressions passed.
- The new pure formula library passed strict standalone TypeScript checking.
- All changed TypeScript and TSX files passed direct syntax transpilation.
- SEO registry metadata remains aligned with the page metadata.
- Practice questions remain excluded from FAQ structured data.

## Outstanding release validation

A dependency-backed `pnpm check` and browser preview remain required in the deployment environment because project dependencies are not installed in this workspace.

## Newly logged issues

None.
