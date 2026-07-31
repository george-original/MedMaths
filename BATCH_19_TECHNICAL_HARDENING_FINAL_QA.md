# Batch 19 — Technical Hardening and Final Production QA Preparation

## Scope

This batch closes the deferred technical-hardening work that can be completed safely without changing calculator behaviour or adding new clinical functionality.

## Changes completed

### External font dependency removed

- Removed `next/font/google` and the Google Fonts preconnect tags.
- Removed the empty Inter `@font-face` rule.
- Replaced the font stack with a local system-ui stack.
- Production builds no longer need to contact Google Fonts.

### TypeScript build bypass removed

- Removed `typescript.ignoreBuildErrors: true` from `next.config.mjs`.
- A production build must now stop on TypeScript errors rather than deploying through them.
- Enabled React strict mode and removed the `X-Powered-By` response header.

### Release commands added

- `pnpm qa:preflight` runs a dependency-free repository guard.
- `pnpm typecheck` runs strict TypeScript checking.
- `pnpm check` runs preflight, TypeScript, and the production build as one release gate.
- The previous broken `eslint .` command was replaced with the repository preflight because ESLint is not installed or locked in this project.

### Automated preflight added

`scripts/qa-preflight.mjs` checks:

- external font regressions
- TypeScript build suppression
- package release scripts
- application routes and internal links
- calculator catalogue and SEO registry consistency
- 14 calculator page structure contracts
- public icons and manifest assets
- deprecated input patterns
- arithmetic regression cases for all 14 calculators

### Removed-resource HTTP status corrected

- Replaced redirects from `/feed`, `/comments/feed`, and `/sitemap.rss` with dedicated route handlers.
- These retired endpoints now return a real HTTP `410 Gone` response with `X-Robots-Tag: noindex, nofollow`.
- Updated the informational `/410` page so it no longer implies that a normal page response itself carries a 410 status.

### Type-safety cleanup

- Removed avoidable `any` casts from the sitemap, SEO utility, JSON-LD component, and shared calculator-field wrapper.
- Preserved runtime checks for optional JSON fields.

### Build artefact hygiene

- Added a repository `.gitignore` for dependencies, Next.js output, TypeScript build state, environment files, and logs.
- Moved TypeScript incremental state into `.next/cache` so release checks do not leave `tsconfig.tsbuildinfo` at the project root.
- Added a preflight guard against shipping generated build artefacts in the source archive.

### Release documentation updated

- Replaced the one-line README with install, release, production smoke-test, and medical-scope instructions.
- Updated the final QA report and deferred backlog.

## Validation completed in this workspace

- Dependency-free preflight passed.
- TypeScript/TSX syntax transpilation passed.
- Local imports passed.
- Internal application routes passed.
- Central calculator catalogue and SEO registry matched.
- All 14 calculator page presentation contracts passed.
- Three retired feed endpoints passed real HTTP 410 checks.
- Fourteen arithmetic regression cases passed.
- No Google Font request or TypeScript build bypass remains in production source. No `alert()`, `parseFloat`, or deprecated `onKeyPress` remains in application code.
- Zip integrity passed.

## Environment limitation

A dependency-backed `pnpm install --frozen-lockfile`, strict TypeScript run, Next.js production build, static generation, browser accessibility pass, and mobile smoke test still need to run in the deployment environment. This workspace cannot reach the package registry and does not contain installed project dependencies.
