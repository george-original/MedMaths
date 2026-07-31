# Batch 9 — IV infusion time calculator standard

## Scope

This batch standardises only the IV infusion duration calculator:

- `/calculator/iv-fluids/ml-per-hour-to-time-to-finish`

The calculation remains:

`Time (hours) = remaining volume (mL) ÷ infusion rate (mL/hr)`

## Calculator changes

- Applied the shared teal IV calculator shell and result-first layout.
- Replaced browser alerts with inline validation and automatic field focus.
- Clears stale results whenever either input changes.
- Moves the completed result into view and announces it through the shared result component.
- Uses the remaining volume and current mL/hr rate as clearly separated inputs.
- Displays a practical duration in seconds, minutes, or hours and minutes while preserving the exact hours/minutes in the interpretation.
- Added consistent Calculate, Clear, Copy and working controls.

## Safety changes

- Emphasises remaining volume or accurate pump VTBI rather than automatically using the original bag size.
- Flags durations below five minutes for urgent rechecking of volume, rate, decimal placement, order and pump settings.
- Flags durations over 24 hours and adds a stronger check over 72 hours without declaring legitimate specialist infusions incorrect.
- States that the output is an elapsed-duration estimate, not a clock finish time.
- States that pauses, occlusions, disconnections, rate changes and inaccurate volume estimates change the actual completion time.
- Makes clear that the calculator does not determine whether the prescribed fluid, medicine, route, concentration or rate is clinically appropriate.

## Page consistency

- Moved the calculator directly beneath the page heading.
- Removed the extra calculator card wrapper and top author line.
- Kept the formula, worked example, common examples, safety content, FAQ text, schema, references and related calculators.
- Changed practice questions and FAQs to compact native disclosure sections.
- Added the shared lower author/review trust block.
- Reordered the lower page to match the calculator standard: related calculators, trust information, references.

## Validation performed

- TypeScript/TSX syntax transpilation across the project.
- Core infusion-duration calculation regression cases, including sub-minute and decimal-hour handling.
- Changed-file local import resolution.
- Internal route target scan.
- Legacy `alert()`, `parseFloat` and `onKeyPress` scan for the calculator.
- Zip integrity check.

## Deferred improvements

No new unrelated website issue was identified in this batch. The existing deferred backlog remains unchanged.
