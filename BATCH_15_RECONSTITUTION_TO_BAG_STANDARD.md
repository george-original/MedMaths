# Batch 15 — Reconstitution to IV Bag Calculator Standard

## Scope

Updated only the Reconstitution to IV Bag calculator, its page presentation, and the shared volume guide option needed to lock a known IV-preparation context.

## Calculator changes

- Applied the shared purple dilution layout.
- Replaced browser alerts with inline errors and field focus.
- Added result reveal, copy, display rounding, working, and reverse checks.
- Kept vial amount, final vial volume, withdrawal volume, and final total bag volume as separate inputs.
- Allowed arithmetic for more than one identical vial equivalent while showing a clear warning rather than silently assuming it is appropriate.
- Prevented a final total volume smaller than the transferred medicine volume.

## Visual and safety changes

- Added a locked IV-preparation withdrawal guide.
- Added a vial-to-bag schematic that separately labels withdrawal volume, medicine transferred, final total volume, and final concentration.
- Added warnings for very small volumes, small volumes, large withdrawal volumes, multiple-vial equivalents, no represented carrier volume, and extremely low final concentrations.
- Explicitly states that final concentration is not an infusion rate.
- Does not choose a diluent, bag type, route, compatibility, stability, storage method, rate, or administration plan.

## Page presentation

- Calculator is directly below the heading.
- Removed the upper author line and duplicate related-calculator section.
- Added the standard lower trust block.
- Condensed worked examples, practice questions, FAQs, and references into expandable sections while preserving the text in the initial HTML.

## Deferred backlog

No new unrelated issue was identified.
