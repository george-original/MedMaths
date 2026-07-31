# Batch 24 — Deployment Safety Audit

## Authoritative states

- Current live baseline: `MedMaths-main(1).zip`
- Unpublished redevelopment baseline: Batch 23B
- This package: deployment candidate derived from Batch 23B

## Changes made

1. Preserved the exact live mg-to-mL title, canonical, H1, and meta description across standard, Open Graph, and Twitter metadata.
2. Retained the Batch 23B calculator-first layout, shared components, reverse mL-to-mg mode, formula explanations, safety guidance, and regression-tested calculations.
3. Repositioned the tablet category page as a plural collection page so it does not compete as strongly with the dedicated mg-to-tablets calculator.
4. Added permanent redirects for two malformed dose-calculation URLs found in Search Console.
5. Confirmed that the unsupported SearchAction template from the live build is absent, preventing the literal `{search_term_string}` URL from returning.
6. Added automated release guards for the protected mg-to-mL SEO signals and cleanup redirects.

## Validation completed

- Dependency-free repository preflight passed.
- 30 application routes checked.
- 14 calculator catalogue routes checked.
- 29 indexable SEO registry pages checked.
- 27 arithmetic and formula-authority regression cases passed.
- Protected mg-to-mL metadata, canonical, H1, calculator-first order, and both calculation directions passed static checks.

## Required before upload

Run in an environment with dependencies and a browser:

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm check
pnpm start
```

Then smoke-test the homepage, calculator directory, all six category pages, all 14 calculators, redirects, 410 endpoints, sitemap, structured data, icons, mobile layout, keyboard use, validation, result reveal, and copy actions.

## Deployment recommendation

This candidate is safer than uploading the unmodified Batch 23B archive because it protects the current winning search snippet and removes known URL/cannibalisation regressions. It still requires the dependency-backed production build and browser smoke test before replacing the live site.
