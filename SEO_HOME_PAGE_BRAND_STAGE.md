# SEO Home Page Brand Stage

Updated the MedMaths homepage to strengthen brand recognition for both `MedMaths` and the spaced search variant `Med Maths`.

## Files changed

- `app/page.tsx`
- `app/client-page.tsx`
- `app/layout.tsx`
- `app/about/page.tsx`
- `components/json-ld-schema.tsx`
- `components/site-header.tsx`
- `lib/seo-registry.json`

## Homepage SEO changes

- Updated homepage title to include both `MedMaths` and `Med Maths`.
- Updated homepage meta description to explicitly state that MedMaths is also searched as Med Maths.
- Added visible homepage copy explaining that MedMaths and Med Maths refer to the same calculator library.
- Added homepage FAQ-style content covering:
  - What is MedMaths?
  - Is Med Maths the same as MedMaths?
  - Which calculator should users start with?
  - Does MedMaths replace clinical judgement?
- Added matching FAQPage schema for the visible FAQ-style content.
- Added `alternateName` entries to WebSite and Organization schema:
  - Med Maths
  - MedMaths calculators
  - Med Maths calculators
  - medical maths calculators
- Updated global layout metadata and Open Graph description for stronger brand/entity association.
- Updated the site-header logo alt text from a plain brand alt to a more descriptive brand/entity alt.
- Added one supporting sentence on the About page that explains the MedMaths / Med Maths naming.

## Reason

The goal is to help search engines connect `MedMaths` and `Med Maths` as the same brand while keeping the language natural and not keyword-stuffed.

## Checks

TSX transpile checks passed for:

- `app/page.tsx`
- `app/client-page.tsx`
- `app/layout.tsx`
- `app/about/page.tsx`
- `components/json-ld-schema.tsx`
- `components/site-header.tsx`

A full Next.js build still needs to be run locally because the container does not have installed project dependencies.
