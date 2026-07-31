# Batch 18 — Sitewide Trust, SEO Content Presentation, and Related Calculator Colours

## Scope

This batch completes the planned sitewide presentation pass after the individual calculator, topic-page, homepage, and directory batches.

Updated areas:

- shared Related Calculators component
- shared authorship and review block
- lower educational and SEO content presentation
- About page
- Editorial Policy
- Medical Disclaimer
- Contact page
- footer emergency wording

No calculator formula, client-side calculation function, result arithmetic, calculator route, canonical URL, or structured calculator schema was changed.

## Related Calculator colour consistency

The shared `RelatedCalculators` component now accepts the current page theme and uses the central calculator catalogue to identify the destination category for each card.

This means:

- the surrounding section retains the current calculator's category identity
- each destination card uses the colour of the calculator it opens
- dose, tablet, IV, dilution, body, and renal cards no longer appear universally cyan
- hover, focus, accent, and link colours use the shared calculator theme variables

All 14 calculator-page call sites now declare their current category theme.

## Authorship and review transparency

The shared `CalculatorTrustBlock` now includes:

- an explicit Authorship and review heading
- page author
- optional independent clinical reviewer
- last-reviewed date
- calculator-specific limits-of-use note
- direct links to the Editorial Policy, Medical Disclaimer, and issue-reporting page
- category-aware styling

The independent reviewer label remains conditional. Pages do not imply a separate clinical review when no reviewer has been supplied.

The homepage, calculator directory, all six topic layouts, and all 14 calculator pages now use the updated trust presentation.

## SEO content presentation

Added the server-rendered `CalculatorContentDisclosure` component using semantic HTML `<details>` and `<summary>` elements.

The eight calculator pages that still displayed long educational sections in full now place formula explanations, examples, common searches, practice questions, FAQs, and detailed safety guidance inside a clear category-themed learning disclosure:

- mg to mL
- mg/kg to mL
- Units to mL
- mg to Tablets
- mg/kg to Tablets
- mL/hr to gtt/min
- gtt/min to mL/hr
- IV Infusion Time

Their reference lists now appear in a separate disclosure after Related Calculators and the authorship block.

The other six calculator pages already used compact semantic disclosures and retained their existing content structure.

All disclosure content remains server-rendered in the page HTML. No educational copy, long-tail questions, formula examples, FAQ data, or references were deleted.

## Trust-page improvements

### About

- added a clear named-author section
- states George Lambroglou's RN background without implying independent review
- explains the project's arithmetic-first, source-transparent, safety-limited approach
- adds ProfilePage and Person structured data
- links directly to calculators, editorial policy, reporting, privacy, and disclaimer pages

### Editorial Policy

- explains authorship and reviewer labels
- defines what a last-reviewed date means
- documents source selection, calculation testing, safety checks, update timing, and correction handling
- explicitly states that independent review is only displayed when it occurred

### Medical Disclaimer

- replaced generic and US-centred wording with clearer Australia-first language
- separates arithmetic support from clinical decision-making
- lists the checks that remain outside the calculators
- adds official Healthdirect Triple Zero guidance
- uses the same contact email as the rest of the site

### Contact

- prioritises formula, safety, accessibility, and technical reports
- explains what information helps investigate a result
- removes the unverified fixed response-time promise
- uses consistent Australia-first emergency wording

### Footer

- removes the mixed-country emergency-number examples
- uses concise Australia-first guidance with a local-number instruction for users elsewhere

## Validation completed

- 95 TypeScript and TSX files passed syntax transpilation
- all changed local imports resolved
- 65 literal internal links resolved across 30 application routes
- 84 Related Calculator destinations matched the shared calculator catalogue
- all 14 calculator pages contain one themed Related Calculators section
- all 14 calculator pages contain one themed authorship block
- all 14 calculator pages follow Related Calculators → authorship → references order
- all 14 calculator pages contain one unique references anchor
- all eight previously expanded calculator pages now use the shared learning and references disclosures
- stale `support@medmaths.com`, US-only `911`, mixed emergency examples, and fixed 48-hour response wording were removed
- no original project file was removed

## Build limitation

The workspace does not contain project dependencies and cannot access the package registry. A full Next.js build, lint run, browser rendering pass, accessibility audit, and mobile smoke test must still be completed in the deployment environment.

## Remaining deferred work

1. Replace or harden the external Google font build dependency.
2. Run the complete install, TypeScript check, lint, production build, static generation, and mobile browser QA in the deployment environment.
