# SEO Topic 4: Body Composition — Stage 3

## Page updated

`/calculator/body-composition/bsa`

## Calculator changes

- Replaced loose number parsing in `bsa-client.tsx` with strict decimal parsing.
- The calculator now rejects mixed text such as `170cm`, `70 kg`, `5/10`, and `abc5`.
- Clean decimal numbers such as `170`, `170.5`, `.5`, and `0.5` remain accepted.
- Existing formula options were preserved: Mosteller, Du Bois, Haycock, and Gehan & George.
- The floating desktop widget and in-page calculator layout were preserved.

## SEO/page changes

- Updated metadata to target high-intent terms including:
  - BSA calculator
  - body surface area calculator
  - BSA formula
  - Mosteller formula
  - body surface area formula
  - BSA for medication dosing
  - BSA for chemotherapy dosing
  - mg/m² dose calculator
- Reworked the H1 and intro to make the page clearer for Google AI and users.
- Added a clear safety note above the fold.
- Added a step-by-step “How to calculate BSA” section.
- Expanded formula explanations for Mosteller, Du Bois, Haycock, and Gehan & George.
- Added a BSA-based medication dose formula section.
- Expanded worked examples.
- Added common examples for height/weight BSA searches and mg/m² dose calculations.
- Expanded practice questions from 3 to 6.
- Expanded FAQs to cover long-tail searches such as:
  - how to calculate BSA
  - what is the Mosteller formula
  - what does mg/m² mean
  - BSA versus BMI
  - normal adult BSA
  - actual body weight versus ideal/adjusted body weight
  - paediatric BSA use
  - BSA for chemotherapy dosing
- Improved FAQ schema so answers include the details visible on the page.
- Updated WebApplication schema.
- Updated references to include formula sources and clinical context.

## Checks performed

- TSX transpile check passed for:
  - `app/calculator/body-composition/bsa/page.tsx`
  - `app/calculator/body-composition/bsa/bsa-client.tsx`
- Confirmed no `parseFloat` or `onKeyPress` remains in the BSA calculator folder.

## Local build still required

The container does not have project dependencies installed, so a full Next.js build still needs to be run locally:

```bash
pnpm install
pnpm build
```

## Internal linking note

The full sitewide internal linking pass has not been done yet. This page still has only its existing contextual links and references. The internal linking network remains scheduled for after all calculator/topic pages are reviewed.
