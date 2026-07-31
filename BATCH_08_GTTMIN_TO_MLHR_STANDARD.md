# Batch 8 — gtt/min to mL/hr calculator standard

## Scope

This batch standardises only the reverse gravity IV flow-rate calculator:

- `/calculator/iv-fluids/mlhr-from-drip-rate`

The calculation remains:

`mL/hr = (gtt/min × 60) ÷ drop factor`

## Calculator changes

- Applied the shared teal IV calculator shell and result-first layout.
- Replaced browser alerts with inline validation and field focus.
- Clears stale results whenever an input changes.
- Moves the completed result into view and announces it with the shared result component.
- Keeps 10, 15, 20 and 60 gtt/mL presets plus a custom drop factor.
- Shows the calculated mL/hr value without automatically converting it to an authoritative pump setting.
- Added consistent Calculate, Clear, Copy and working controls.

## Safety changes

- Requires the giving-set drop factor from the packet or label.
- Flags observed drip counts below 1 gtt/min as difficult to regulate accurately.
- Flags observed drip counts above 250 gtt/min as difficult to count accurately by eye.
- Flags estimated rates below 1 mL/hr and above 1000 mL/hr for rechecking.
- Adds an observed drip-pacing orientation check.
- Adds a 60 gtt/mL microdrip cross-check, while clearly limiting the shortcut to a confirmed microdrip set.
- States that the reverse conversion is an estimate and must not be treated as a pump setting without the original order and local checking process.

## Page consistency

- Moved the calculator directly beneath the page heading.
- Removed the extra calculator card wrapper and top author line.
- Changed practice questions and FAQs to compact native disclosure sections.
- Kept the formula, worked examples, safety content, FAQ text, schema, references and related calculators.
- Added the shared lower author/review trust block.
- Reordered the lower page to match the calculator standard: related calculators, trust information, references.

## Validation performed

- TypeScript/TSX syntax transpilation across the project.
- Core reverse-flow calculation regression cases.
- Changed-file local import resolution.
- Internal route target scan.
- Legacy `alert()`, `parseFloat` and `onKeyPress` scan for the calculator.
- Zip integrity check.

## Deferred improvements

No new unrelated issue was identified in this batch. The existing deferred backlog remains unchanged.
