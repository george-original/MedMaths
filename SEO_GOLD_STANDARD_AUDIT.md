# MedMaths SEO Gold Standard Audit

Updated: 10 Jul 2026

## Gold standard page used

`/calculator/dose-calculations/mg-to-ml`

This page is now the gold standard pattern for MedMaths calculator pages because it contains:

- Clear search-matched title and meta description
- Calculator first, with safety note directly inside the tool
- Author/reviewer line and last-reviewed date
- Plain-language intent clarification
- Jump links
- Formula explanation
- Worked examples
- Common long-tail search examples
- Practice questions with answers
- Safety reminder
- Related calculator links
- FAQ accordion
- FAQPage schema generated from the same FAQ data
- Breadcrumb schema
- WebApplication schema
- MedicalWebPage schema
- References and study sources

## What was improved on the mg-to-mL page

### Search intent added

The FAQ and practice sections now cover long-tail search intent around:

- how to convert mg to mL for medicine
- what mg/mL means
- what 50 mg/mL means
- 250 mg/5 mL label conversion
- whether mg is the same as mL
- how many mg are in 1 mL
- how many mL is 2.5 mg
- how to convert mL to mg
- liquid antibiotic mL calculation
- injections and syringe volumes
- insulin/unit-based medicine safety
- morphine and other high-risk medicine safety
- peptides/anabolic steroid search safety
- density conversion versus medication concentration
- rounding differences
- calculator result differences

### Practice questions expanded

Practice questions increased from 4 to 8 and now include:

- direct mg to mL
- mg per 5 mL label conversion
- 2.5 mg to mL
- 0.5 mg to mL
- liquid antibiotic example
- mL to mg reverse conversion
- rounding to 2 decimals
- very small volume example

### Common example cards expanded

Common examples now include high-impression search patterns such as:

- 0.25 mg to mL
- 0.5 mg to mL
- 1 mg to mL
- 2 mg to mL
- 2.5 mg to mL syringe
- 5 mg to mL
- 10 mg to mL
- 12.5 mg to mL
- 25 mg to mL
- 50 mg to mL
- 100 mg to mL
- 250 mg to mL
- 500 mg to mL

### Safety improvement

The calculator input parser now rejects mixed text such as `50mg`, `5 mL`, or `abc5`. It only accepts clean decimal numbers such as `5`, `5.5`, `.5`, and `0.5`.

## Comparison against other calculators

| Page | Current state | Main gap | Priority |
|---|---|---|---|
| `mg-to-ml` | Gold standard | Keep monitoring CTR and queries | Done |
| `mg-to-tablets` | Thin page | Needs FAQ, practice questions, references, common examples, stronger related links | Very high |
| `mlhr-from-drip-rate` | Thin page | Needs gtt/min search-intent content, examples for 10/15/20/60 gtt/mL, practice questions, FAQ schema | Very high |
| `ideal-body-weight` | Strong page | Needs tighter Devine formula long-tail FAQ and more internal linking from medication calculators | High |
| `bsa` | Strong page | Needs practice questions and stronger long-tail BSA formula questions | High |
| `mgkg-to-ml-dose` | Strong page | Needs references and practice questions | Medium-high |
| `units-to-ml` | Strong page | Needs more insulin/unit-safety FAQ, references, and practice questions | Medium-high |
| `creatinine-clearance` | Moderate page | Needs more dosing-use context, FAQ expansion, examples, and related links | Medium |

## Next work order

1. Rebuild `mg-to-tablets` to match the mg-to-mL gold standard.
2. Rebuild `mlhr-from-drip-rate` as `gtt/min to mL/hr` search-intent content.
3. Upgrade `ideal-body-weight` around Devine formula searches.
4. Upgrade `bsa` around body surface area formula and medication dosing searches.
5. Add references and practice questions to `mgkg-to-ml-dose` and `units-to-ml`.

## Rule for future calculator pages

Every calculator page should include:

1. Search-matched title and meta description
2. Calculator above the fold
3. Safety note inside or directly below the calculator
4. Plain-English formula explanation
5. Worked examples
6. Common long-tail search examples
7. Practice questions with answers
8. FAQ section using real Search Console queries
9. FAQPage schema generated from the same FAQ content
10. Internal links to nearby calculators
11. References where clinical formula accuracy matters
12. No keyword stuffing and no unsafe dose recommendation language
