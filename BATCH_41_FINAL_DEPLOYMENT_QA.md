# Batch 41 — Final Deployment QA

**Date:** 30 July 2026  
**Baseline:** Batch 40 calculator-network alignment  
**Release status:** **Preview-ready source candidate; production approval withheld until dependency-backed build and browser verification pass.**

## Scope

This final gate reviewed the complete MedMaths source candidate after the calculator, SEO, safety, consolidation, and network-alignment batches.

The gate covered:

- calculation and precision regressions
- route, redirect, sitemap, canonical, and SEO-registry structure
- local import and public-asset resolution
- TypeScript and TSX syntax transpilation
- JSON, YAML, package, and lockfile consistency
- generated-artifact exclusion
- final archive integrity
- deployment-environment readiness

## Source changes made in this batch

### 1. Removed one demonstrably unused dependency

`@hookform/resolvers` was not imported anywhere in application source. It was removed from `package.json` and from the root lockfile importer.

The historical package snapshot remains in `pnpm-lock.yaml`, which is harmless because it is no longer reachable from the importer. The package will not be installed by the project.

### 2. Removed generated build artefacts

A partial `.next` directory created during an unsuccessful dependency-free type-check attempt was removed before packaging.

No `node_modules`, `.next`, `.turbo`, `dist`, or `coverage` directory is present in the release ZIP.

## Passed checks

### Repository and architecture

- 117 source and configuration files scanned by the repository preflight
- 26 application routes found
- 26 internal route references checked
- 12 indexed calculators checked
- 25 indexable SEO registry pages checked
- 3 retired feed endpoints checked for real HTTP 410 handling
- 22 redirect rules parsed, unique, and permanent
- 25 canonical SEO URLs found with no duplicate registry URL
- 279 local imports resolved
- 7 referenced public assets confirmed present
- 57 root dependency and development-dependency entries matched the lockfile importer

### Source syntax and structure

- 111 TypeScript and TSX files transpiled
- 0 TypeScript/TSX syntax errors
- 31 client-component files checked
- no async default client component found
- no generated build directory included
- all JSON files parsed
- `pnpm-lock.yaml` parsed
- `next.config.mjs` and `postcss.config.mjs` parsed

### Calculation, safety, and page regressions

- 37 sitewide formula and arithmetic checks
- 17 small-number precision checks
- 8 protected mg-to-mL checks
- 14 gtt/min to mL/hr checks
- 11 tablet-calculator checks
- 7 BSA checks
- 16 mg/kg-to-mL checks
- 6 Units-to-mL arithmetic checks plus 20 safety/content protections
- 20 IV drip-rate checks
- 26 IV infusion-duration and clock-completion checks
- 34 clinical Devine IBW checks
- 42 Cockcroft–Gault checks
- 33 medication-dilution checks
- 38 final-IV-concentration checks
- 220 calculator-network checks

All listed suites passed.

## Checks not completed in this workspace

The source candidate could not complete a dependency-backed `pnpm install`, strict project type-check, `next build`, local server start, or browser automation pass.

The available package registry returned package-not-found responses for required public npm packages, and the connected deployment interface could not upload the local multi-file project directly. A temporary cloud-source transfer was investigated, but no MedMaths candidate was promoted or connected to the live domain.

This limitation means the following are **not yet proven**:

- complete module-level TypeScript checking with React and Next types installed
- Next.js 16 production compilation and static generation
- hydration and runtime console behaviour
- actual responsive rendering at mobile and desktop widths
- keyboard and screen-reader interaction in a real browser
- Core Web Vitals and Lighthouse performance
- deployed canonical, sitemap, robots, manifest, and redirect responses

## Required preview gate

Do not replace the live website directly with this ZIP.

In the real deployment environment, run:

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm check
pnpm start
```

Then verify a preview deployment at minimum across:

1. Homepage and calculator directory
2. Four collection pages
3. All 12 indexed calculator pages
4. Tablet and renal direct-topic routes
5. Retired vial, tablet-child, and renal-category redirects
6. Mobile widths of 320, 375, 390, and 430 pixels
7. Desktop widths of 1280 and 1440 pixels
8. Decimal entry, reset, copy, result reveal, and direction/mode switching
9. Keyboard focus, field labels, validation messages, and result announcements
10. `/robots.txt`, `/sitemap.xml`, canonical tags, JSON-LD, icons, and manifest
11. Browser console and failed network requests
12. Analytics and advertising behaviour

## Analytics policy verification

The privacy page states that Google Analytics is used. No Google Analytics or Vercel Analytics component is mounted in this repository.

Analytics may be injected through the hosting or tag-management configuration. Before production release, inspect the deployed page source and network requests. Then either:

- confirm the analytics implementation and consent behaviour; or
- revise the privacy wording to match the actual implementation.

## Final judgement

The source candidate has passed a substantially stronger static and calculation QA gate than the current live build. Its architecture, formulas, safety boundaries, routes, and SEO ownership are internally consistent.

It is **ready for a real preview build**.

It is **not honestly production-approved** until the dependency-backed build and browser checks pass.
