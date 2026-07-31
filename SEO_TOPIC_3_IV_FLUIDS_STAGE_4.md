# SEO Topic 3: IV Fluids — Stage 4

## Page updated
`/calculator/iv-fluids/ml-per-hour-to-time-to-finish`

## Calculator changes
- Replaced loose `Number.parseFloat` parsing with strict numeric input validation.
- Replaced deprecated `onKeyPress` with `onKeyDown`.
- Changed inputs from `type="number"` to text inputs with decimal mobile keyboard support.
- Fixed duration rounding so results do not display as `1h 60m` after minute rounding.
- Added copied-result error handling.
- Added clearer working and quick-check warning for unusually short or long durations.

## SEO changes
- Rebuilt page metadata around IV infusion time, mL/hr to finish time, IV bag finish time, VTBI, and nursing IV time calculation searches.
- Added visible formula explanation: `Time (hours) = remaining volume (mL) ÷ infusion rate (mL/hr)`.
- Added worked example, common examples, practice questions, and long-tail FAQ section.
- Added WebApplication, FAQPage, and BreadcrumbList JSON-LD schema matching visible page content.
- Added references to OpenStax and RMIT flow-rate formula material.

## Safety wording
- Emphasised using remaining volume or VTBI, not automatically the original bag size.
- Clarified the calculator estimates duration only and does not decide whether the IV rate is clinically appropriate.

## Build/check notes
- TSX transpile checks passed for the updated page and client component.
- Full Next.js build still requires local dependencies.
