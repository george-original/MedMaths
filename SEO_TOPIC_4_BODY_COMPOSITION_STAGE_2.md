# SEO Topic 4 — Body Composition Stage 2

## Page updated
/calculator/body-composition/ideal-body-weight

## Focus
Improve the Ideal Body Weight calculator page toward the mg-to-mL SEO standard while preserving the existing route and calculator design.

## Calculator changes
- Replaced loose numeric parsing with strict decimal parsing so mixed input such as `175cm`, `82 kg`, `5 ft`, or `1/2` is rejected instead of partially accepted.
- Added decimal mobile keyboard support to height and weight inputs.
- Updated copy-to-clipboard to include the unit `kg`.

## SEO changes
- Strengthened title and metadata around: ideal body weight calculator, Devine formula in kg, male/female IBW formula, IBW in cm, PBW, dosing weight, and actual vs ideal body weight.
- Added long-tail FAQ items for:
  - how to calculate ideal body weight in kg
  - male Devine formula
  - actual weight vs IBW
  - IBW vs BMI
  - children/paediatric caution
  - height under 5 feet
- Added common IBW example cards for common male/female heights.
- Added a section clarifying IBW, actual body weight, adjusted body weight, and predicted body weight.
- Added an additional reference to the PMC ideal body weight commentary.

## Checks
- TSX transpile check passed for page.tsx.
- TSX transpile check passed for ideal-body-weight-client.tsx.
- Confirmed no parseFloat or onKeyPress remains in the ideal-body-weight folder.

## Not done yet
- No final sitewide internal linking pass.
- No homepage SEO update yet.
