# SEO Topic 2 — Tablet Dosing Stage 2

Updated: 10 Jul 2026

## Page updated

- `/calculator/tablet-dosing/mg-to-tablets`

## Calculator logic reviewed

The calculator was worth improving because it used loose `parseFloat` parsing. Mixed input like `500mg` could be interpreted as `500`. The updated calculator now only accepts clean decimal numbers.

## Calculator changes

- Replaced loose parsing with strict numeric validation.
- Switched numeric fields to text + decimal input mode to support strict validation while keeping mobile decimal keyboards.
- Added clearer field helper text.
- Added a warning to use the amount in one tablet, not the pack total.
- Added practical result classification:
  - whole-tablet result
  - half-tablet result
  - quarter-tablet result
  - awkward tablet count
- Improved result formatting so unnecessary trailing zeros are removed.
- Kept the core formula unchanged: `tablets = dose ordered ÷ tablet strength`.

## SEO/page changes

- Strengthened title and meta description around long-tail searches.
- Added calculator schema, FAQ schema, and breadcrumb schema.
- Added a clear explanation section: how to calculate tablets from mg.
- Added a worked example.
- Added three-step instructions.
- Added common mg-to-tablet examples.
- Added tablet splitting and rounding safety checks.
- Added practice questions.
- Added high-intent FAQ content using natural wording.
- Added references.

## Guardrails followed

- No internal-linking network added yet.
- No route changes.
- No broad redesign.
- No unsafe medicine advice.
- No fake clinical review claims.
- Calculator remains educational and policy-aware.
