# Batch 2 — mg to mL calculator standard

## Scope

Applied the Batch 1 calculator design system to the mg to mL calculator and created the first improved route-aware volume measurement guide.

## Calculator changes

- Replaced browser alert validation with inline field errors and focus management.
- Added consistent calculator shell, fields, actions, result card, working panel, rounding control, copy action, and automatic result reveal.
- Preserved both mg → mL and mL → mg modes.
- Preserved direct mg/mL entry and mg per X mL label entry.
- Stores the exact values used in the calculation so the displayed working does not become stale when React state updates.
- Keeps the dose-calculation cyan/teal category theme.

## Improved visual measurement guide

Added `components/calculator/volume-measurement-guide.tsx`.

The guide:

- stays collapsed until the user opens “Show me how to measure this volume”;
- requires the user to choose oral/enteral, subcutaneous, intramuscular, IV preparation, or not sure;
- never infers route from volume;
- separates oral/enteral, injectable, and IV-preparation device visuals;
- does not select needle gauge, needle length, site, or technique;
- makes clear that an IV preparation volume is not the final IV bag volume;
- includes zoom controls and an exact target-volume marker;
- checks whether the result aligns with the illustrative markings;
- warns against unsupported rounding;
- suppresses device recommendations for very small volumes and for volumes above the available illustrative scales;
- never recommends an insulin syringe merely because a volume is small.

## Page consistency changes

- Removed the duplicate legacy related-calculator block and self-link.
- Kept the shared related-calculator component.
- Moved author and review information to the lower trust area using the shared trust block.
- Removed a duplicated sentence in the quick checklist.

## Shared-component correction

Adjusted `CalculatorField` cloning so the shared component passes TypeScript validation without changing its visible behaviour.

## Validation completed

- `tsc --noEmit`: passed.
- Next.js production compilation: passed after temporarily replacing the network-fetched Google font during the local QA run.
- Static page generation was started but did not finish within the execution limit.
- Original Google font configuration was restored before export.
- No browser `alert()` calls remain in the mg to mL calculator.
- No automatic insulin-syringe selection exists.
- Output archive excludes `node_modules`, `.next`, generated lock files, and build cache files.
