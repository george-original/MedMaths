# SEO Topic 6 — Dilutions Stage 2

## Page updated
`/calculator/dilutions/c1v1-c2v2-basic`

## Calculator changes
- Replaced loose numeric parsing with strict clean-decimal parsing.
- Rejects mixed-unit text such as `10 mg/mL`, `50mL`, `1/2`, and `abc5`.
- Preserved existing solve modes for `V2`, `V1`, `C2`, and `C1`.
- Preserved step-by-step working output and diluent calculation.

## SEO changes
- Strengthened title, description, and keyword metadata around stock volume, final concentration, final total volume, diluent volume, and C1V1 formula searches.
- Expanded the FAQ set around:
  - What C1V1=C2V2 means
  - How to calculate V1
  - How to calculate C2
  - Final volume versus diluent volume
  - How much diluent to add
  - Percentage dilution examples
  - Unit matching
  - Medication dilution safety
  - Reconstitution versus dilution
- Added clearer step-by-step usage instructions.
- Expanded the formula section to include rearranged equations for V1, V2, C1, and C2.
- Added common dilution example cards.
- Replaced duplicate self-referential related cards with within-topic dilution calculator cards.

## Safety notes
- Reinforced that V2 is final total volume, not diluent volume.
- Reinforced that C1/C2 and V1/V2 units must match before calculating.
- Reinforced that medication dilution arithmetic does not replace product instructions, medication monographs, pharmacy advice, or local policy.

## Checks
- TSX transpile check passed for the page and client component.
- Confirmed no remaining `parseFloat` or `onKeyPress` in the updated C1V1 calculator folder.
