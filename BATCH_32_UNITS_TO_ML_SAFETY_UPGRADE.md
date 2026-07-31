# Batch 32 — Units to mL Safety Upgrade

Date: 30 July 2026

## Scope

Strengthen the Units-to-mL calculator before deployment by removing device guidance that could be mistaken for clinical instruction, requiring clearer concentration verification, and keeping the page focused on arithmetic rather than product or device selection.

## Implemented

- Kept both calculation directions:
  - units to mL
  - mL to units
- Kept custom product-label concentration entry as the default.
- Relabelled prefilled concentrations as **examples only**.
- Added a required confirmation when a prefilled example concentration is selected:
  - the user must confirm that the exact concentration appears on the product label before calculation.
- Reset the example selection to custom if the concentration is manually edited.
- Removed the insulin syringe visual and all syringe-scale controls.
- Removed generic device visuals from this calculator because a custom units/mL concentration does not identify the medicine, route, syringe, pen, pump, or preparation method.
- Replaced device visuals with text-only safety guidance for:
  - insulin example contexts
  - heparin example contexts
  - custom units/mL concentrations
- Preserved warnings for:
  - very small volumes
  - insulin example volumes greater than 1 mL
  - unusually large reverse-conversion unit results
- Preserved exact-result and safe non-zero display formatting.
- Updated the page title to keep the generic calculation primary:
  - `Units to mL Calculator | Dose Volume Conversion`
- Updated the description to emphasise the exact product-label concentration and high-risk medicine safety checks.
- Reduced the FAQ set from 12 to 9 focused questions.
- Reduced practice questions from 6 to 4.
- Replaced repetitive exact-dose content with broader formula, concentration, rounding, insulin, heparin, and device-boundary questions.
- Added a dedicated standalone units-volume formula library with positive-number validation.
- Added a dedicated Units-to-mL regression suite and integrated it into repository preflight.
- Updated the review date to 30 July 2026.

## Safety reasoning

The calculator performs product-specific units/mL arithmetic but cannot determine the correct medicine, concentration, route, device, syringe capacity, syringe graduations, pen, pump, or IV preparation.

The insulin syringe illustration was removed rather than released without specialist review. FDA device guidance describes insulin syringes as concentration-specific devices with insulin-unit scales and product-specific labelling. The Australian Commission on Safety and Quality in Health Care lists insulin and heparin/anticoagulants among high-risk medicines requiring strong safety systems.

Sources:

- Australian Commission on Safety and Quality in Health Care — High risk medicines and systems: https://www.safetyandquality.gov.au/clinical-topics/medicines-safety-and-quality/high-risk-medicines-and-systems
- US Food and Drug Administration — Guidance on piston and insulin syringe labelling: https://www.fda.gov/regulatory-information/search-fda-guidance-documents/guidance-content-premarket-notification-510k-submissions-piston-syringes

## Explicit boundaries

The calculator does not:

- recommend a medicine or dose
- verify that an example concentration matches the selected product
- choose a syringe, pen, pump, or preparation method
- convert mL into pen or pump programming instructions
- treat insulin syringe markings as a universal units scale
- treat heparin units as insulin syringe markings
- approve a route or device
- decide whether a small volume is clinically measurable or acceptable

## Validation completed

- Repository preflight passed.
- 37 sitewide calculator and formula-authority arithmetic checks passed.
- 17 shared precision checks passed.
- Dedicated Units-to-mL regression passed:
  - 6 arithmetic and precision checks
  - 20 safety, content, and metadata protections
- Existing mg-to-mL, reverse-IV, tablet, BSA, and mg/kg-to-mL regression suites passed.
- The new units-volume formula library passed strict standalone TypeScript checking.
- All changed TypeScript and TSX files passed direct syntax transpilation.
- SEO registry metadata remains aligned with the page metadata.
- Practice questions remain excluded from FAQ structured data.

## Outstanding release validation

A dependency-backed `pnpm check` and browser preview remain required in the deployment environment because project dependencies are not installed in this workspace.

## Newly logged issues

None.
