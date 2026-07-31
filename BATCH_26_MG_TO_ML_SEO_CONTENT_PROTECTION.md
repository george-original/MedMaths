# Batch 26 — mg-to-mL SEO and Content Protection

**Completed:** 30 July 2026  
**Baseline:** Batch 25 shared calculation safety and precision build  
**Scope:** Protected improvement of the flagship mg-to-mL calculator and preparation for a possible Vial Dose to mL consolidation.

## Decision

The mg-to-mL page remains the protected flagship. Its proven search signals were not changed.

The Vial Dose to mL page has **not** been redirected in this batch. The available Search Console export does not contain URL-filtered query evidence for that page, so a permanent consolidation would be premature. The useful vial-specific guidance has been migrated into mg-to-mL, and the page now contains a stable `#reconstituted-vial` target for a later redirect if the evidence supports it.

## Protected signals

The following remain exactly unchanged:

- URL: `/calculator/dose-calculations/mg-to-ml`
- Canonical URL
- Title: `mg to mL Calculator for Medicine | Dose & Syringe`
- Meta description
- H1: `mg to mL Calculator for Medicine`
- mg → mL mode
- mL → mg mode
- Calculator-first page order

The review date was updated to 30 July 2026.

## Content changes

### FAQ discipline

The FAQ set was reduced from **19 to 12**.

Removed or consolidated content included:

- peptide and anabolic-steroid query targeting;
- morphine-specific keyword targeting;
- duplicate explanations of D/H × Q and stock-required wording;
- duplicate 50 mg/mL explanations;
- repetitive exact-number material.

The remaining FAQs cover the core user problems:

- mg to mL formula;
- D/H × Q terminology;
- mg/mL meaning;
- mg per X mL labels;
- reconstituted-vial final volume;
- mg versus mL;
- mg in 1 mL;
- reverse mL to mg;
- liquid antibiotics;
- injection and syringe-volume arithmetic;
- insulin units distinction;
- rounding and differing calculator results.

### Practice questions

Practice questions were reduced from **8 to 6**. One reconstituted-vial example was added, while repetitive exact-number cases were removed.

### Reconstituted-vial pathway

A visible `Using a reconstituted vial` section now explains:

- enter total drug amount and the verified final vial volume;
- final vial volume may differ from diluent added because displacement can occur;
- the calculator checks arithmetic only;
- it does not choose a diluent, method, route, compatibility, stability, or number of vials.

The label-format helper now explicitly supports total mg in a verified final vial volume.

### More-than-one-vial check

When the ordered dose is greater than the total mg entered in the label-strength field, the calculator shows a conditional warning. The wording does not assume the entry is definitely one vial; it asks the user to verify whether more than one vial or container is intended.

### Internal linking

The flagship page no longer sends users to the near-duplicate Vial Dose to mL page. It continues to link to genuinely different calculations such as C1V1=C2V2 and final IV bag concentration.

## Regression coverage

Added a dedicated mg-to-mL regression script covering:

1. direct mg to mL;
2. mg per X mL label format;
3. reconstituted-vial final-volume input;
4. tiny non-zero volume;
5. preserved tiny-volume display;
6. reverse mL to mg;
7. reverse conversion from a label-derived concentration;
8. decimal concentration.

The repository preflight now also checks:

- exactly 12 mg-to-mL FAQ items;
- query-chasing FAQ phrases do not return;
- reconstituted-vial guidance remains present;
- the flagship page does not link back to the duplicate vial calculator;
- protected metadata and H1 remain unchanged.

## Validation completed

Passed:

- 30 application routes;
- 29 internal links;
- 14 calculator catalogue routes;
- 29 indexable SEO records;
- 29 arithmetic and formula-authority checks;
- 17 shared precision checks;
- 8 protected mg-to-mL regression cases;
- syntax transpilation of the modified TSX and shared formula files;
- FAQ schema separation;
- metadata registry drift checks.

## Outstanding validation

A real dependency-backed Next.js production build and browser smoke test remain required in the deployment environment.

## Deferred decision

Before redirecting `/calculator/dilutions/vial-dose-to-ml`, obtain a Search Console export filtered to that exact URL. If it has no meaningful distinct query ownership, redirect it permanently to:

`/calculator/dose-calculations/mg-to-ml#reconstituted-vial`

## Newly logged issue

- URL-filtered Search Console evidence is still required before the Vial Dose to mL redirect can be approved.
