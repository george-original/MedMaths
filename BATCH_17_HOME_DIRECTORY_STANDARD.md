# Batch 17 — Homepage and Calculator Directory Standard

## Scope

This batch standardises the MedMaths homepage and `/calculators` directory after the individual calculator and topic-page passes.

Updated areas:

- homepage layout and information hierarchy
- common-calculator section
- all-calculators directory
- shared calculator catalogue data
- shared topic and calculator card components

No calculator formula, calculator route, topic route, canonical URL, or calculator result behaviour was changed.

## Shared catalogue system

Added `lib/calculator-catalog.ts` as the single catalogue for:

- 14 calculator routes
- 6 topic routes
- calculator titles and short titles
- descriptions and selection intent
- formulas
- category names and short labels
- category colour themes
- icons
- popular-calculator ordering

Added `components/calculator/calculator-directory.tsx` with reusable server-rendered components:

- `CalculatorTopicGrid`
- `PopularCalculatorGrid`
- `CalculatorDirectory`
- `CalculatorDirectoryCard`
- `DirectoryDisclosure`

The shared exports were added to `components/calculator/index.ts`.

## Homepage improvements

The homepage now prioritises calculator access in this order:

1. compact hero and value statement
2. prominent calculator search
3. direct browse and mg-to-mL actions
4. common calculator cards
5. topic cards
6. visible calculation-safety reminder
7. condensed educational, brand, structure, and FAQ content
8. standard author and review block
9. final directory action

Additional changes:

- reduced the oversized hero treatment
- removed repeated standalone sections that said the same thing in different ways
- retained MedMaths / Med Maths brand-search wording inside a lower disclosure
- retained the existing homepage FAQ answers in visible server-rendered HTML
- changed the homepage content component from a full client component to a server component
- changed `TopCalculators` from a client component to a server component
- preserved homepage metadata and structured data

## All-calculators directory improvements

The `/calculators` page now uses this order:

1. breadcrumb
2. compact directory hero
3. prominent calculator search
4. six quick-choice cards
5. topic cards
6. the full 14-calculator directory
7. visible safety reminder
8. expandable calculation-type guidance
9. expandable FAQs
10. standard author and review block

Additional changes:

- calculator cards now use their correct category colour instead of universal cyan hover styling
- IV cards now use the shared teal IV theme
- category counts are derived from the catalogue rather than manually typed
- the single renal calculator uses an appropriately sized card width
- the old client-side FAQ accordion was replaced on this page with semantic server-rendered disclosures
- collection, breadcrumb, and FAQ schema were retained
- all SEO text remains in the initial HTML

## Performance and maintenance improvements

- homepage layout is server-rendered except for the interactive calculator search
- all-calculators layout is server-rendered except for the interactive calculator search
- common-calculator cards are server-rendered
- duplicate category and calculator arrays were removed from the homepage, top-calculator component, and directory page
- future title, route, formula-label, or category-count updates can be made in one catalogue

## Validation completed

- 94 TypeScript and TSX files passed syntax transpilation
- catalogue check confirmed 14 unique calculator routes and 6 topics
- every catalogue calculator route maps to an existing page
- changed-file local imports passed
- 55 literal internal links passed across 30 app routes
- shared-catalogue checks passed
- homepage, common-calculator section, and directory page no longer declare `use client`
- the all-calculators page no longer imports the old client FAQ accordion
- diff review confirmed only the intended homepage, directory, shared-catalogue, shared-card, and export files changed before documentation was added
- no original project files were removed

## Build limitation

A full dependency install, lint, Next.js production build, static-generation run, and browser/mobile smoke test could not be performed in this workspace because the project dependencies are not installed and package-registry access is restricted.

## Not included

- category-aware styling for the shared Related Calculators component
- external Google font hardening
- deployment-environment production validation
- final sitewide trust, SEO-content presentation, and technical-hardening pass
