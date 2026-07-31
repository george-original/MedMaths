# MedMaths

MedMaths is a Next.js medication-maths calculator library covering dose-to-volume calculations, tablet dosing, IV drip rates, infusion time, dilutions, body measures, and Cockcroft-Gault creatinine clearance.

## Local development

The repository is pinned to the package manager version declared in `package.json`.

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

## Release checks

Run the dependency-free repository preflight first:

```bash
pnpm qa:preflight
```

The preflight includes the shared precision regression suite. Protected calculator regressions can also be run directly with:

```bash
pnpm qa:precision
pnpm qa:mgml
pnpm qa:gttmlhr
pnpm qa:tablet
pnpm qa:bsa
pnpm qa:mgkgml
pnpm qa:unitsml
pnpm qa:ivdrip
pnpm qa:ivtime
pnpm qa:ibw
pnpm qa:crcl
pnpm qa:dilution
pnpm qa:finaliv
pnpm qa:network
```

Then run the complete release gate:

```bash
pnpm check
```

`pnpm check` performs:

1. repository and route preflight checks
2. strict TypeScript checking
3. a production Next.js build and static-generation pass

The production build no longer downloads Google Fonts and no longer ignores TypeScript build errors.

## Deployment smoke test

After the build succeeds, test the production server rather than relying only on development mode:

```bash
pnpm start
```

Check at minimum:

- homepage search and popular-calculator links
- `/calculators`
- all six topic areas: four collection pages plus the direct tablet and renal calculator routes
- all 12 indexed calculator pages on mobile and desktop widths
- keyboard access, inline validation, result reveal, copy buttons, disclosures, related links, trust blocks, and references
- `/robots.txt`, `/sitemap.xml`, icons, manifest, canonical tags, and structured data
- redirects defined in `next.config.mjs` and HTTP 410 responses for retired feed URLs
- analytics and advertising only after calculator controls remain clear and unobstructed

## Calculator network architecture

MedMaths currently has 12 indexed calculator jobs across six topics. Dose, IV, dilution, and dosing-body-measure topics have indexable collection pages. Tablet dosing and renal dosing each route directly to their single calculator so a thin category page does not compete with the calculator.

`lib/calculator-network.json` defines four deliberate next-step links for every calculator. `pnpm qa:network` verifies query ownership, retired routes, related links, popular-calculator ordering, and collection-page boundaries.

## Medical scope

MedMaths presents arithmetic and educational explanations. It does not prescribe, recommend, independently validate, or replace medication orders, product information, clinical judgement, local policy, or required independent checks.
## Formula authority content

`FORMULA_AUTHORITY_QUERY_MAP.md` defines the primary search job and supporting long-tail questions for each calculator. New formula pages should follow the meaning → equation → variables → plain-English method → substituted arithmetic → result meaning → limitations structure established by the BSA page.



## Current calculator scope note

The Ideal Body Weight page calculates adult clinical Devine IBW only for heights of at least 5 feet (152.4 cm). It does not calculate a healthy target weight, adjusted body weight, or ventilation predicted body weight.

The Creatinine Clearance page estimates adult Cockcroft-Gault CrCl only when that renal estimate is required by the current medicine source. It can compare actual, Devine ideal, and adjusted weight values, but requires active weight-method selection and does not substitute CrCl for eGFR automatically or choose a medicine dose.

The Medication Dilution page solves C1V1 = C2V2 for verified medication-dilution arithmetic. It treats V2 as final total volume, shows V2 − V1 only as an arithmetic difference, and does not select a diluent, concentration, route, stability period, or preparation method.

The Final IV Bag Concentration page checks final mg/mL concentration only after the per-vial amount, verified final vial volume, medicine-solution transfer volume, and verified final total preparation volume are already known. It does not choose a diluent, number of vials, bag volume, compatibility, stability, storage, infusion rate, or administration method.
