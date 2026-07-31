# Batch 42 — AdSense site verification script

## Scope

Install the user-provided Google AdSense publisher loader once across the MedMaths website without adding ad units inside calculator interfaces.

## Publisher

- Publisher ID: `ca-pub-1935059419471624`
- Loader: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1935059419471624`

## Changes

- Added the async AdSense loader to the root `<head>` in `app/layout.tsx`.
- Removed the unused `components/deferred-adsense.tsx` file, which contained a different stale publisher ID.
- Did not add live ad units or automatic ad placement code to calculator cards.
- Added `scripts/adsense-regression.mjs` and the `pnpm qa:adsense` command.

## Regression protections

The AdSense regression check confirms:

1. The correct publisher loader appears exactly once.
2. It appears in `app/layout.tsx`.
3. The script remains asynchronous and uses anonymous cross-origin loading.
4. The stale publisher ID is absent.
5. The redundant deferred loader is absent.

## Deployment note

This installs the site-verification and AdSense library script. Ad placement, Auto ads settings, consent messaging, and `ads.txt` should be configured deliberately after the AdSense account/site review rather than being inferred from the publisher ID alone.
