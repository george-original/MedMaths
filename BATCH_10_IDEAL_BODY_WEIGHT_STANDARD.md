# Batch 10 — Ideal Body Weight calculator standard

## Scope

This batch standardises only the Ideal Body Weight calculator:

- `/calculator/body-composition/ideal-body-weight`

The calculation remains the Devine equation:

- Male: `IBW (kg) = 50 + 2.3 × (height in inches − 60)`
- Female: `IBW (kg) = 45.5 + 2.3 × (height in inches − 60)`

## Calculator changes

- Applied the shared emerald body-composition calculator shell and result-first layout.
- Removed the separate draggable floating-widget interaction so the calculator now follows the same inline pattern as the rest of MedMaths.
- Replaced aggregate error boxes and clipboard alerts with inline validation, automatic field focus, and the shared copy control.
- Supports height entry in centimetres or feet and inches.
- Requires whole feet and validates inches separately to reduce unit-entry mistakes.
- Keeps the optional actual-weight comparison, but places it in a collapsed section and states that it does not change the IBW result.
- Moves the completed result into view and announces it through the shared result component.
- Adds consistent Calculate, Clear, Copy, display-rounding, interpretation, and working controls.
- Clears stale results whenever an input or formula selection changes.

## Safety changes

- States clearly that IBW is not automatically the correct dosing or ventilation weight.
- Prompts users to follow the weight metric required by the medicine or local protocol: actual, ideal, adjusted, or predicted body weight.
- Flags heights below 5 feet because short-stature rules can differ between protocols, particularly for predicted body weight.
- Flags unusual IBW outputs without declaring them clinically impossible.
- Restricts the input range to an adult-oriented height range and states that this calculator is not a paediatric growth or dosing tool.
- Keeps actual-weight comparisons descriptive only and does not turn them into dosing advice.

## Page consistency

- Moved the calculator directly beneath the page heading.
- Removed the top review pills and added the shared lower author/review trust block.
- Removed the duplicate hard-coded related-calculator section and retained one shared related-calculator section.
- Converted common examples, practice questions, FAQs, and references into compact native disclosure sections while preserving their HTML content for users and search engines.
- Removed the orange hard-coded FAQ component from this emerald category page.
- Preserved metadata, formula explanations, long-tail questions, structured data, examples, and source references.

## Validation performed

- TypeScript/TSX syntax transpilation across the project.
- Five Devine calculation regression cases, including cm and ft/in equivalents and a height below 5 feet.
- Changed-file local import resolution.
- Internal route target scan.
- Legacy `alert()`, `parseFloat`, `onKeyPress`, portal, and floating-widget scan for the calculator.
- Page structure checks for one related-calculator section and one trust block.
- Zip integrity check.

## Deferred improvements

No new unrelated website issue was identified in this batch. The existing deferred backlog remains unchanged.
