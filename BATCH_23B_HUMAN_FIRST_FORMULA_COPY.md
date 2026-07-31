# Batch 23B — Human-first formula copy correction

## Purpose

The Batch 23 formula content was accurate, but the main explanation was more technical than necessary. This correction makes the answer understandable at a glance while preserving the detailed educational and long-tail SEO content below it.

## Shared component

Added `SimpleFormulaAnswer`, a reusable server-rendered block that presents:

1. a direct answer to the search question
2. one clean equation
3. one worked example
4. one short concentration reminder

The component is designed to sit after the calculator and before the detailed educational disclosure.

## mg to mL

The page now states immediately:

> Divide the dose you need in mg by the medicine concentration in mg/mL.

Formula:

`Volume (mL) = Dose (mg) ÷ Concentration (mg/mL)`

Example:

`500 mg ÷ 50 mg/mL = 10 mL`

Supporting wording and dynamic result explanations were shortened. The detailed nursing terminology, D/H × Q wording, worked examples, safety guidance, FAQs, and long-tail content remain available below the simple answer.

## Units to mL

The page now states immediately:

> Divide the ordered dose in units by the medicine concentration in units/mL.

Formula:

`Volume (mL) = Dose (units) ÷ Concentration (units/mL)`

Example:

`3,000 units ÷ 5,000 units/mL = 0.6 mL`

The detailed insulin, heparin, safety, formula, example, and FAQ content remains below the simple answer.

## Content rule established

Future formula-authority updates should follow this order:

1. calculator
2. direct plain-English answer
3. clean equation
4. one worked example
5. short meaning and result explanation
6. detailed formula education and long-tail SEO content

The detailed information remains, but the first explanation must be understandable without clinical or mathematical jargon.

## Validation

- MedMaths preflight passed
- 105 TypeScript and TSX files passed syntax transpilation
- 242 local imports resolved
- 27 arithmetic and formula-authority regression cases passed
- calculator-first ordering retained
- simple-answer placement checks added
- competitor-brand scan passed
