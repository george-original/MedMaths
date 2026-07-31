# SEO Topic 3 — IV Fluids Stage 2

## Page updated
`/calculator/iv-fluids/drip-rate-mlhr-to-gttmin`

## Focus
Improve the mL/hr to gtt/min gravity drip calculator page without changing the route or redesigning the site.

## Calculator changes
- Replaced loose `parseFloat` parsing with strict decimal-only parsing.
- Rejects mixed entries such as `120ml`, `20 gtt/mL`, `5/10`, and `abc5`.
- Added `inputMode="decimal"` for mobile number entry.
- Replaced deprecated `onKeyPress` with `onKeyDown`.
- Shows exact gtt/min result and rounded whole-drop result.
- Adds an unusual-result warning for very low or very high drip rates.
- Improved copy result to copy with unit: `gtt/min`.

## SEO changes
- Updated title and meta description around `mL/hr to gtt/min`, `IV drip rate formula`, `drops per minute`, and `drop factor`.
- Added clear formula language: `gtt/min = (mL/hr × drop factor) ÷ 60`.
- Added worked example for `120 mL/hr` with a `20 gtt/mL` giving set.
- Added common examples for 10, 15, 20, and 60 gtt/mL tubing.
- Added step-by-step method, mistakes section, practice questions, FAQ, references, WebApplication schema, FAQ schema, and BreadcrumbList schema.

## Safety / clinical wording
- The page now tells users to use the drop factor printed on the IV giving set.
- It distinguishes mL/hr from gtt/min.
- It reminds users that IV pump programming is usually in mL/hr, while this page is for gravity drip rates.

## Checks performed
- TSX transpile check passed for the updated page and client component.
- Confirmed the updated calculator no longer contains `parseFloat` or `onKeyPress`.
- Full Next.js build still requires local dependencies.
