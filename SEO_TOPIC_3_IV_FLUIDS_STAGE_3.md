# SEO Topic 3 — IV Fluids Stage 3

## Page updated

`/calculator/iv-fluids/mlhr-from-drip-rate`

## Purpose

Strengthen the gtt/min to mL/hr calculator page so it clearly explains the reverse IV drip rate calculation and targets long-tail searches around drops per minute, drop factor, macrodrip, microdrip, and mL/hr conversions.

## Calculator changes

- Replaced loose `parseFloat` input parsing with strict decimal-only validation.
- Replaced deprecated `onKeyPress` usage with `onKeyDown`.
- Added decimal mobile keyboard support.
- Changed result handling to keep the exact mL/hr result and the rounded mL/hr result.
- Added clearer working display:
  - `mL/hr = (gtt/min × 60) ÷ drop factor`
- Added a quick-check warning for unusually low or high mL/hr results.
- Updated copy-to-clipboard to include the unit, e.g. `120 mL/hr`.

## SEO changes

- Updated metadata title and description.
- Added keyword targets for:
  - gtt/min to mL/hr calculator
  - drops per minute to mL per hour
  - drip rate to mL/hr
  - drop factor calculator
  - 20, 25, 40, and 60 gtt/min examples
  - macrodrip and microdrip examples
- Added WebApplication schema.
- Added FAQPage schema.
- Added BreadcrumbList schema.
- Added visible sections for:
  - how to convert gtt/min to mL/hr
  - formula
  - worked example
  - common examples
  - common mistakes
  - practice questions
  - FAQs
  - quick method
  - references

## Safety / clinical wording

- Reinforces that the drop factor must be checked from the tubing packet or label.
- Explains that gravity drip rates can change with movement, clamp changes, bag height, pressure changes, and tubing changes.
- Avoids replacing clinical judgement, local policy, IV pump practice, or medication orders.

## Checks performed

- TSX transpile check passed for:
  - `app/calculator/iv-fluids/mlhr-from-drip-rate/page.tsx`
  - `app/calculator/iv-fluids/mlhr-from-drip-rate/mlhr-from-drip-rate-client.tsx`
- Confirmed the updated calculator folder no longer contains:
  - `parseFloat`
  - `onKeyPress`

## Full build status

Full Next.js build was not run in the container because project dependencies are not installed. Run locally:

```bash
pnpm install
pnpm build
```
