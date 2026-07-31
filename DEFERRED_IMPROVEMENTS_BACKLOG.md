# MedMaths Deferred Improvements Backlog

This file records genuine issues discovered during calculator batches that should be handled in a dedicated improvement or technical-hardening pass rather than mixed into unrelated calculator work.

## Resolved items

### 1. External Google font build dependency — resolved in Batch 19

The project previously used `next/font/google`, which could fail in restricted or offline build environments.

**Resolution:** Batch 19 removed the Google-hosted font dependency and replaced it with a local system font stack. Google Fonts preconnects and the empty Inter `@font-face` rule were also removed.

### 2. Related-calculator cards did not use category colours — resolved in Batch 18

The shared Related Calculators component was hard-coded to cyan styling.

**Resolution:** Batch 18 added category-aware section and destination-card themes across all 14 calculators.

### 3. TypeScript build errors were ignored — resolved in Batch 19

`next.config.mjs` previously included `typescript.ignoreBuildErrors: true`.

**Resolution:** Batch 19 removed the bypass. Production builds must now pass strict TypeScript checking.

### 4. Calculator catalogue input-type mismatch — resolved in Batch 29

`CalculatorInput` incorrectly required `categoryShortName` even though the value is added when raw calculator entries are mapped into their parent category.

**Resolution:** Batch 29 omitted `categoryShortName` from the raw calculator input type and retained it on the final mapped catalogue item. The pure catalogue source now passes its direct TypeScript check; the full dependency-backed project check remains part of deployment QA.


### 5. Renal category search-intent overlap — resolved in Batch 40

The renal topic had only one calculator, so the category page repeated the same Cockcroft-Gault query and content.

**Resolution:** Batch 40 removed the category page from the indexed architecture and added a permanent redirect from `/calculator/renal-function` to the dedicated creatinine-clearance calculator. Homepage and directory links now open the calculator directly.

### 6. Calculator-network and README alignment — resolved in Batch 40

Related links, popular-calculator ordering, collection-page query ownership, and release documentation had drifted across multiple batches.

**Resolution:** Batch 40 introduced a central four-link calculator network with 220 regression checks, aligned popular lists with Search Console evidence, retargeted four collection pages to plural search intent, and consolidated the README release documentation.

## Active item

### 1. Deployment-environment production validation

The current workspace cannot access the package registry and does not contain installed project dependencies. It therefore cannot complete a real dependency-backed Next.js build or browser test.

**Required release action:** in the deployment environment, run:

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm check
pnpm start
```

Then complete desktop and mobile smoke testing, keyboard and accessibility review, structured-data inspection, redirect checks, analytics verification, and advertising-placement review.


### 2. Analytics implementation and policy alignment

The repository includes analytics policy wording, but no Google Analytics or Vercel Analytics component is mounted in application source. Deployment-platform injection may exist outside the repository, so this cannot be concluded from source alone.

**Required later:** verify the production page source and network requests, then either mount the intended analytics implementation with consent handling or revise the policy wording to match actual behaviour.

### 3. AdSense activation, consent, and placement review

Batch 42 installed the user-provided AdSense site loader for publisher `ca-pub-1935059419471624` once in the root document head. No ad units or automatic placement decisions were added.

**Required after AdSense review/approval:** configure the Google-certified consent message where required, review Auto ads settings, add only approved ad placements away from calculator controls, and publish the exact `ads.txt` entry supplied by the AdSense account.


## Batch history

- Batches 4–6: no new unrelated issue discovered.
- Batch 7: related-calculator category-colour issue logged.
- Batches 8–17: no new unrelated issue discovered.
- Batch 18: related-calculator colour issue resolved; trust and content presentation standardised.
- Batch 19: external font dependency and TypeScript build bypass resolved; retired feed URLs changed to real HTTP 410 responses; automated preflight and release gate added.
- Batch 21: no new technical issue discovered; deployment-environment production validation remains active.
- Batch 22: no new unrelated issue discovered; deployment-environment production validation remains active.

- Batch 24: protected live mg-to-mL SEO signals, separated tablet collection intent, added malformed-URL redirects, and logged analytics/policy verification.
- Batch 25: resolved shared non-zero display rounding, added precision regressions, synchronised calculator metadata records, protected FAQ schema boundaries, and logged the calculator-catalog input-type mismatch.
- Batch 26: protected mg-to-mL search signals, reduced query-chasing content, and added reconstituted-vial guidance and regression coverage.
- Batch 27: consolidated the unindexed Vial Dose to mL page into mg-to-mL, removed it from the catalogue, registry, sitemap, and internal links, and added a permanent redirect.
- Batch 28: protected the proven gtt/min to mL/hr page metadata and route, retained the safer reverse-conversion interface, reduced templated content, and added dedicated reverse-IV regression coverage; no new unrelated issue discovered.
- Batch 29: made the Search Console-proven tablet-dosing URL the combined fixed-dose and weight-based calculator, retired two weak child routes with permanent redirects, and resolved the catalogue input-type mismatch.
- Batch 30: upgraded the BSA calculator with metric and imperial inputs, explicit conversion working, focused FAQs, and dedicated regression coverage; no new unrelated issue discovered.
- Batch 31: expanded mg/kg to mL with per-dose and per-day modes, divided-dose arithmetic, kg/lb support, exact conversion working, focused content, and dedicated regression coverage; no new unrelated issue discovered.
- Batch 32: removed the unreviewed insulin syringe visual, made exact-label entry the default, required confirmation for prefilled example concentrations, narrowed Units-to-mL metadata and FAQs, and added dedicated safety regression coverage; no new unrelated issue discovered.
- Batch 33: expanded the forward IV drip-rate calculator with direct mL/hr and total-volume-and-time modes, transparent derived mL/hr working, focused content, and dedicated regression coverage; no new unrelated issue discovered.
- Batch 34: added optional browser-local clock completion to the IV Infusion Time Calculator, including midnight and multi-day rollover; removed unsupported duration danger thresholds; added dedicated regression coverage; no new unrelated issue discovered.

- Batch 35: narrowed Ideal Body Weight to adult clinical Devine IBW, removed PBW search targeting and actual-weight comparison, blocked below-5-feet extrapolation, and added dedicated regression coverage; no new unrelated issue discovered.
- Batch 36: added explicit actual, Devine ideal, adjusted, and direct protocol-weight pathways to Cockcroft-Gault; removed diagnostic-looking CrCl result colours; added dedicated regression coverage; no new unrelated issue discovered.
- Batch 37: narrowed Creatinine Clearance to adult Cockcroft-Gault CrCl search intent, consolidated repeated definitions and warnings, reduced FAQs to 8 and practice questions to 3, added one transparent weight-method comparison, and strengthened the CrCl-versus-eGFR boundary. Logged the over-broad renal category page for the later sitewide alignment batch and duplicated README sections for later documentation cleanup.

### 4. Vial Dose URL consolidation — resolved in Batch 27

The standalone page was confirmed to be unindexed and had no Search Console performance to preserve. Its useful final-vial-volume guidance now lives on the protected mg-to-mL page, and the retired URL permanently redirects to that section.
- Batch 38: repositioned C1V1=C2V2 as a medication-dilution calculator, extracted testable formula logic, tightened final-volume and diluent-difference safety boundaries, reduced templated content, and added dedicated regression coverage; no new unrelated issue discovered.
- Batch 39: repositioned the reconstitution-to-bag page as a verified-input final IV concentration checker, extracted testable formula logic, removed device-style preparation guidance and unsupported danger thresholds, reduced templated content, and added dedicated regression coverage; no new unrelated issue discovered.

- Batch 40: centralised related-calculator links, aligned collection-page query ownership, retired the single-calculator renal category route, synchronised popular calculator lists, updated homepage/directory pathways, and added 220 calculator-network regression checks. No new unrelated issue discovered.

- Batch 41: completed final source-level release QA; removed the unused `@hookform/resolvers` root dependency and partial generated build artefacts; all formula, route, precision, SEO-registry, import-resolution, redirect, and calculator-network checks passed. Dependency-backed Next.js build, browser testing, and production analytics verification remain the active release gate.

- Batch 42: installed the user-provided AdSense publisher loader once in the root head, removed a stale unused loader containing another publisher ID, and added an automated AdSense identity/duplication regression check. Consent configuration, ads.txt, and ad placement remain post-approval tasks.
