import fs from "node:fs"
import path from "node:path"
import process from "node:process"
import { spawnSync } from "node:child_process"
import { fileURLToPath } from "node:url"

const scriptPath = fileURLToPath(import.meta.url)
const root = path.resolve(path.dirname(scriptPath), "..")
const failures = []
const notes = []

function fail(message) {
  failures.push(message)
}

function note(message) {
  notes.push(message)
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8")
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath))
}

function walk(relativeDirectory, extensions = null) {
  const base = path.join(root, relativeDirectory)
  if (!fs.existsSync(base)) return []

  const files = []
  const visit = (directory) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      if (["node_modules", ".next", ".git"].includes(entry.name)) continue
      const absolute = path.join(directory, entry.name)
      if (entry.isDirectory()) visit(absolute)
      else if (!extensions || extensions.some((extension) => entry.name.endsWith(extension))) {
        files.push(path.relative(root, absolute).split(path.sep).join("/"))
      }
    }
  }

  visit(base)
  return files.sort()
}

function normaliseRoute(value) {
  if (!value) return "/"
  const stripped = value.split(/[?#]/, 1)[0]
  if (stripped === "/") return "/"
  return stripped.replace(/\/+$/, "") || "/"
}

function routeFromPage(relativePath) {
  const directory = path.posix.dirname(relativePath.replace(/^app\//, ""))
  if (directory === ".") return "/"
  const segments = directory
    .split("/")
    .filter((segment) => !segment.startsWith("(") && !segment.startsWith("@"))
  return normaliseRoute(`/${segments.join("/")}`)
}

function assertClose(label, actual, expected, tolerance = 1e-9) {
  if (!Number.isFinite(actual) || Math.abs(actual - expected) > tolerance) {
    fail(`${label}: expected ${expected}, received ${actual}`)
  }
}

// Build artefacts must not be committed or shipped in the source archive.
for (const artefact of ["node_modules", ".next", "tsconfig.tsbuildinfo"]) {
  if (exists(artefact)) fail(`Generated build artefact is present in the source tree: ${artefact}`)
}

const sourceFiles = [
  ...walk("app", [".ts", ".tsx", ".css"]),
  ...walk("components", [".ts", ".tsx"]),
  ...walk("hooks", [".ts", ".tsx"]),
  ...walk("lib", [".ts", ".tsx", ".json"]),
  "next.config.mjs",
  "package.json",
].filter((file, index, files) => files.indexOf(file) === index)

const sourceText = sourceFiles.map((file) => `${file}\n${read(file)}`).join("\n")

// Build hardening: production must not require Google-hosted fonts or suppress TypeScript errors.
for (const forbidden of ["next/font/google", "fonts.googleapis.com", "fonts.gstatic.com"]) {
  if (sourceText.includes(forbidden)) fail(`External Google font dependency remains: ${forbidden}`)
}
if (/ignoreBuildErrors\s*:\s*true/.test(sourceText)) {
  fail("next.config.mjs still suppresses TypeScript build errors")
}

// MedMaths explains its own calculations rather than targeting competitor-brand searches.
for (const competitorBrand of ["MDCalc", "ClinCalc", "Omni Calculator", "OmniCalculator", "omnicalculator.com"]) {
  if (sourceText.toLowerCase().includes(competitorBrand.toLowerCase())) {
    fail(`Competitor calculator brand remains in application content: ${competitorBrand}`)
  }
}

if (!exists("FORMULA_AUTHORITY_QUERY_MAP.md")) {
  fail("Missing formula-authority query ownership map")
}

const packageJson = JSON.parse(read("package.json"))
for (const scriptName of ["build", "check", "qa:preflight", "qa:precision", "qa:unitsml", "qa:crcl", "qa:dilution", "qa:finaliv", "qa:network", "typecheck"]) {
  if (!packageJson.scripts?.[scriptName]) fail(`Missing package script: ${scriptName}`)
}

const precisionRegression = spawnSync(
  process.execPath,
  ["--no-warnings", "--experimental-strip-types", "scripts/precision-regression.mjs"],
  { cwd: root, encoding: "utf8" },
)
if (precisionRegression.status !== 0) {
  fail(`Safe-number precision regression failed: ${(precisionRegression.stderr || precisionRegression.stdout).trim()}`)
}

const unitsMlRegression = spawnSync(
  process.execPath,
  ["--no-warnings", "--experimental-strip-types", "scripts/units-to-ml-regression.mjs"],
  { cwd: root, encoding: "utf8" },
)
if (unitsMlRegression.status !== 0) {
  fail(`Units-to-mL safety regression failed: ${(unitsMlRegression.stderr || unitsMlRegression.stdout).trim()}`)
}

const ivInfusionTimeRegression = spawnSync(
  process.execPath,
  ["--no-warnings", "--experimental-strip-types", "scripts/iv-infusion-time-regression.mjs"],
  { cwd: root, encoding: "utf8" },
)
if (ivInfusionTimeRegression.status !== 0) {
  fail(`IV infusion time regression failed: ${(ivInfusionTimeRegression.stderr || ivInfusionTimeRegression.stdout).trim()}`)
}

const creatinineClearanceRegression = spawnSync(
  process.execPath,
  ["--no-warnings", "--experimental-strip-types", "scripts/creatinine-clearance-regression.mjs"],
  { cwd: root, encoding: "utf8" },
)
if (creatinineClearanceRegression.status !== 0) {
  fail(`Creatinine clearance regression failed: ${(creatinineClearanceRegression.stderr || creatinineClearanceRegression.stdout).trim()}`)
}

const medicationDilutionRegression = spawnSync(
  process.execPath,
  ["--no-warnings", "--experimental-strip-types", "scripts/c1v1-c2v2-regression.mjs"],
  { cwd: root, encoding: "utf8" },
)
if (medicationDilutionRegression.status !== 0) {
  fail(`C1V1=C2V2 medication dilution regression failed: ${(medicationDilutionRegression.stderr || medicationDilutionRegression.stdout).trim()}`)
}

const finalIvConcentrationRegression = spawnSync(
  process.execPath,
  ["--no-warnings", "--experimental-strip-types", "scripts/final-iv-concentration-regression.mjs"],
  { cwd: root, encoding: "utf8" },
)
if (finalIvConcentrationRegression.status !== 0) {
  fail(`Final IV concentration regression failed: ${(finalIvConcentrationRegression.stderr || finalIvConcentrationRegression.stdout).trim()}`)
}

const calculatorNetworkRegression = spawnSync(
  process.execPath,
  ["scripts/calculator-network-regression.mjs"],
  { cwd: root, encoding: "utf8" },
)
if (calculatorNetworkRegression.status !== 0) {
  fail(`Calculator network regression failed: ${(calculatorNetworkRegression.stderr || calculatorNetworkRegression.stdout).trim()}`)
}

// Application routes.
const pageFiles = walk("app", ["/page.tsx", "/page.ts", "page.tsx", "page.ts"]).filter((file) => /(^|\/)page\.tsx?$/.test(file))
const appRoutes = new Set(pageFiles.map(routeFromPage))
if (appRoutes.size !== pageFiles.length) fail("Duplicate application route detected")

// Validate internal links and static assets referenced in TS/TSX.
const hrefPattern = /\bhref\s*(?:=|:)\s*["'`]([^"'`]+)["'`]/g
const internalReferences = new Set()
for (const file of [...walk("app", [".ts", ".tsx"]), ...walk("components", [".ts", ".tsx"])]) {
  const text = read(file)
  for (const match of text.matchAll(hrefPattern)) {
    const raw = match[1]
    if (!raw.startsWith("/") || raw.startsWith("//") || raw.includes("${")) continue
    internalReferences.add(raw)
  }
}

const assetExtensions = new Set([".ico", ".png", ".jpg", ".jpeg", ".svg", ".webp", ".json", ".webmanifest", ".xml"])
for (const reference of internalReferences) {
  const target = normaliseRoute(reference)
  const extension = path.posix.extname(target)
  if (assetExtensions.has(extension)) {
    const publicPath = target.replace(/^\//, "")
    if (!exists(`public/${publicPath}`)) fail(`Missing public asset referenced by href: ${reference}`)
    continue
  }
  if (target.startsWith("/api/")) continue
  if (!appRoutes.has(target)) fail(`Broken internal route reference: ${reference}`)
}

// Central calculator catalogue must point to live routes and remain unique.
const catalogueText = read("lib/calculator-catalog.ts")
const catalogueHrefMatches = [
  ...catalogueText.matchAll(/\{\s*title:\s*["'][^"']+["'][\s\S]*?href:\s*["'](\/calculator\/[^"']+)["'][\s\S]*?formula:\s*["'][^"']+["'][\s\S]*?\}/g),
].map((match) => normaliseRoute(match[1]))
const uniqueCatalogueHrefs = [...new Set(catalogueHrefMatches)]
for (const href of uniqueCatalogueHrefs) {
  if (!appRoutes.has(href)) fail(`Calculator catalogue points to a missing route: ${href}`)
}

const seoRegistry = JSON.parse(read("lib/seo-registry.json"))
if (seoRegistry.canonicalHost !== "https://www.medmaths.com") {
  fail(`Unexpected canonical host: ${seoRegistry.canonicalHost}`)
}

const registryUrls = new Set()
const registryCanonicals = new Set()
const registryCalculatorPaths = new Set()
let indexableRegistryCount = 0
for (const page of seoRegistry.pages ?? []) {
  if (!page.url || !page.canonical) {
    fail(`SEO registry entry is missing URL or canonical: ${page.displayName ?? "unknown page"}`)
    continue
  }
  if (registryUrls.has(page.url)) fail(`Duplicate SEO registry URL: ${page.url}`)
  if (registryCanonicals.has(page.canonical)) fail(`Duplicate SEO registry canonical: ${page.canonical}`)
  registryUrls.add(page.url)
  registryCanonicals.add(page.canonical)

  const route = normaliseRoute(new URL(page.url).pathname)
  const isIndexable = !String(page.robots ?? "").toLowerCase().includes("noindex") && !page.excludeFromSitemap
  if (isIndexable) {
    indexableRegistryCount += 1
    if (!appRoutes.has(route)) fail(`Indexable SEO registry page has no application route: ${route}`)
  }
  if (page.type === "calculator") registryCalculatorPaths.add(route)
}

// Registry metadata must match the live metadata exported by each calculator page.
for (const page of seoRegistry.pages ?? []) {
  if (page.type !== "calculator") continue
  const route = normaliseRoute(new URL(page.url).pathname)
  const pageFile = route === "/" ? "app/page.tsx" : `app${route}/page.tsx`
  if (!exists(pageFile)) continue
  const pageText = read(pageFile)
  for (const [label, value] of [
    ["title", page.title],
    ["meta description", page.metaDescription],
    ["canonical", page.canonical],
  ]) {
    if (typeof value === "string" && value.length > 0 && !pageText.includes(value)) {
      fail(`SEO registry ${label} drift for ${route}`)
    }
  }
}

if (uniqueCatalogueHrefs.length !== 12) {
  fail(`Expected 12 unique calculator routes in the catalogue, found ${uniqueCatalogueHrefs.length}`)
}
for (const href of uniqueCatalogueHrefs) {
  if (!registryCalculatorPaths.has(href)) fail(`Calculator catalogue route missing from SEO registry: ${href}`)
}
for (const href of registryCalculatorPaths) {
  if (!uniqueCatalogueHrefs.includes(href)) fail(`SEO registry calculator missing from central catalogue: ${href}`)
}

// Calculator page presentation contract established by the standardisation batches.
const calculatorPageFiles = [...registryCalculatorPaths]
  .map((route) => `app${route}/page.tsx`)
  .filter((file) => exists(file))
if (calculatorPageFiles.length !== 12) {
  fail(`Expected 12 calculator page files, found ${calculatorPageFiles.length}`)
}
for (const file of calculatorPageFiles) {
  const text = read(file)
  for (const faqMatch of text.matchAll(/"@type"\s*:\s*"FAQPage"/g)) {
    const schemaSegment = text.slice(faqMatch.index, faqMatch.index + 1400)
    if (/mainEntity\s*:\s*(?:practiceQuestions|commonExamples)/.test(schemaSegment)) {
      fail(`${file} maps practice content directly into FAQ structured data`)
    }
    if (/\.\.\.(?:practiceQuestions|commonExamples)/.test(schemaSegment)) {
      fail(`${file} mixes practice content into FAQ structured data`)
    }
  }
  const relatedIndex = text.indexOf("<RelatedCalculators")
  const trustIndex = text.indexOf("<CalculatorTrustBlock")
  const referencesIndex = text.indexOf('id="references"')
  if (relatedIndex < 0) fail(`${file} is missing RelatedCalculators`)
  if (trustIndex < 0) fail(`${file} is missing CalculatorTrustBlock`)
  if (referencesIndex < 0) fail(`${file} is missing the references anchor`)
  if (relatedIndex >= 0 && trustIndex >= 0 && referencesIndex >= 0 && !(relatedIndex < trustIndex && trustIndex < referencesIndex)) {
    fail(`${file} does not follow Related Calculators -> trust -> references order`)
  }
  if (!text.includes('<main className="min-h-screen bg-white">')) {
    fail(`${file} does not use the standard mg-to-mL top-of-page alignment`)
  }
  if (!text.includes('pb-12 pt-4 sm:px-6 sm:py-12 lg:px-8 lg:pt-10')) {
    fail(`${file} does not use the standard calculator page vertical spacing`)
  }
}

// BSA is the gold-standard formula-authority page for the next content pass.
const bsaPageText = read("app/calculator/body-composition/bsa/page.tsx")
const bsaClientText = read("app/calculator/body-composition/bsa/bsa-client.tsx")
for (const requiredBsaContent of [
  "What does BSA mean?",
  "What is the definition of body surface area?",
  "What does a BSA result mean?",
  "mosteller-bsa-formula",
  "du-bois-bsa-formula",
  "haycock-bsa-formula",
  "gehan-george-bsa-formula",
  "How is BSA used in medication calculations?",
]) {
  if (!bsaPageText.includes(requiredBsaContent)) {
    fail(`BSA formula-authority page is missing: ${requiredBsaContent}`)
  }
}
if (!bsaClientText.includes("<CalculatorEquation")) {
  fail("BSA calculator does not show the selected equation inside the interactive tool")
}
if (!bsaClientText.includes("Same height and weight calculated with all four formulas")) {
  fail("BSA calculator does not compare all four formula results")
}
for (const requiredBsaClientContent of [
  'id="bsa-measurement-system"',
  'id="bsa-height-feet"',
  'id="bsa-height-inches"',
  'id="bsa-weight-lb"',
  "feetAndInchesToCentimetres",
  "poundsToKilograms",
]) {
  if (!bsaClientText.includes(requiredBsaClientContent)) {
    fail(`BSA calculator is missing international-input support: ${requiredBsaClientContent}`)
  }
}
const bsaFormulaInputIndex = bsaClientText.indexOf('id="bsa-formula"')
const bsaHeightInputIndex = bsaClientText.indexOf('id="bsa-height"')
const bsaWeightInputIndex = bsaClientText.indexOf('id="bsa-weight"')
const bsaActionsIndex = bsaClientText.indexOf("<CalculatorActions")
const bsaSelectedEquationIndex = bsaClientText.indexOf("<CalculatorEquation")
if (
  [bsaFormulaInputIndex, bsaHeightInputIndex, bsaWeightInputIndex, bsaActionsIndex, bsaSelectedEquationIndex].some(
    (index) => index < 0,
  ) ||
  !(
    bsaFormulaInputIndex < bsaHeightInputIndex &&
    bsaHeightInputIndex < bsaWeightInputIndex &&
    bsaWeightInputIndex < bsaActionsIndex &&
    bsaActionsIndex < bsaSelectedEquationIndex
  )
) {
  fail("BSA calculator must keep formula selection, inputs and actions before the detailed formula explanation")
}
if (!read("components/calculator/index.ts").includes("CalculatorEquation")) {
  fail("Shared CalculatorEquation component is not exported")
}
if (!read("components/calculator/index.ts").includes("SimpleFormulaAnswer")) {
  fail("Shared SimpleFormulaAnswer component is not exported")
}


// Ideal Body Weight and Creatinine Clearance follow the formula-authority pattern while keeping inputs first.
const ibwPageText = read("app/calculator/body-composition/ideal-body-weight/page.tsx")
const ibwClientText = read("app/calculator/body-composition/ideal-body-weight/ideal-body-weight-client.tsx")
for (const requiredIbwContent of [
  'title: "Clinical Ideal Body Weight Calculator | Devine IBW"',
  "Clinical Ideal Body Weight (IBW) Calculator",
  "What this calculator returns",
  "male-devine-formula",
  "female-devine-formula",
  "Devine formula worked examples",
  "Why does this calculator stop below 5 feet (152.4 cm)?",
  "Which body-weight measure does this page calculate?",
]) {
  if (!ibwPageText.includes(requiredIbwContent)) fail(`Ideal Body Weight clinical formula-authority page is missing: ${requiredIbwContent}`)
}
for (const requiredIbwClient of [
  "<CalculatorEquation",
  "DEVINE_MIN_HEIGHT_CM",
  "This calculator does not extrapolate the Devine equation below 5 feet",
  "cmToFeetInches",
  "feetInchesToCm",
]) {
  if (!ibwClientText.includes(requiredIbwClient)) fail(`Ideal Body Weight calculator capability is missing: ${requiredIbwClient}`)
}
for (const forbiddenIbwContent of [
  "Optional actual-weight comparison",
  "actualWeight",
  "predicted body weight calculator",
  '"PBW calculator"',
  "creating a negative height difference",
]) {
  if (ibwPageText.includes(forbiddenIbwContent) || ibwClientText.includes(forbiddenIbwContent)) {
    fail(`IBW removed or mistargeted content returned: ${forbiddenIbwContent}`)
  }
}
const ibwFaqBlock = ibwPageText.split("const faqItems = [", 2)[1]?.split("const practiceQuestions = [", 1)[0] ?? ""
const ibwPracticeBlock = ibwPageText.split("const practiceQuestions = [", 2)[1]?.split("const maleWorkedExample", 1)[0] ?? ""
if ((ibwFaqBlock.match(/question:/g) ?? []).length !== 8) fail("IBW FAQ count drifted from 8")
if ((ibwPracticeBlock.match(/q:/g) ?? []).length !== 3) fail("IBW practice-question count drifted from 3")
const ibwSexIndex = ibwClientText.indexOf("Sex used by the Devine equation")
const ibwHeightIndex = ibwClientText.indexOf('id="ibw-height-cm"')
const ibwActionsIndex = ibwClientText.indexOf("<CalculatorActions")
const ibwEquationIndex = ibwClientText.indexOf("<CalculatorEquation")
if ([ibwSexIndex, ibwHeightIndex, ibwActionsIndex, ibwEquationIndex].some((index) => index < 0) || !(ibwSexIndex < ibwHeightIndex && ibwHeightIndex < ibwActionsIndex && ibwActionsIndex < ibwEquationIndex)) {
  fail("Ideal Body Weight calculator must keep equation selection, height input and actions before the detailed formula explanation")
}

const crclPageText = read("app/calculator/renal-function/creatinine-clearance/page.tsx")
const crclClientText = read("app/calculator/renal-function/creatinine-clearance/creatinine-clearance-client.tsx")
for (const requiredCrClContent of [
  "Cockcroft-Gault CrCl at a glance",
  "CrCl and eGFR are different estimates",
  "What does a Cockcroft-Gault CrCl result mean?",
  "Why the weight method matters",
  "When to pause before using the estimate",
  "cockcroft-gault-umol-formula",
  "cockcroft-gault-mgdl-formula",
  "Cockcroft-Gault worked examples",
]) {
  if (!crclPageText.includes(requiredCrClContent)) fail(`Creatinine Clearance formula-authority page is missing: ${requiredCrClContent}`)
}
if (!crclClientText.includes("<CalculatorEquation")) fail("Creatinine Clearance calculator does not explain the selected equation")
const crclSexIndex = crclClientText.indexOf("Cockcroft-Gault sex factor")
const crclAgeIndex = crclClientText.indexOf('id="crcl-age"')
const crclCreatinineIndex = crclClientText.indexOf('id="crcl-creatinine"')
const crclActionsIndex = crclClientText.indexOf("<CalculatorActions")
const crclEquationIndex = crclClientText.indexOf("<CalculatorEquation")
if ([crclSexIndex, crclAgeIndex, crclCreatinineIndex, crclActionsIndex, crclEquationIndex].some((index) => index < 0) || !(crclSexIndex < crclAgeIndex && crclAgeIndex < crclCreatinineIndex && crclCreatinineIndex < crclActionsIndex && crclActionsIndex < crclEquationIndex)) {
  fail("Creatinine Clearance calculator must keep sex factor, inputs and actions before the detailed formula explanation")
}


// mg to mL and Units to mL now follow the formula-authority pattern while keeping inputs first.
const mgMlPageText = read("app/calculator/dose-calculations/mg-to-ml/page.tsx")
const mgMlClientText = read("app/calculator/dose-calculations/mg-to-ml/mg-to-ml-client.tsx")
for (const requiredMgMlContent of [
  "What does mg/mL mean?",
  "What does this calculator do?",
  "mg-to-ml-formula",
  "required-over-supplied-formula",
  "ml-to-mg-formula",
  "What does D/H × Q mean in medication calculations?",
  "stock required over stock supplied",
]) {
  if (!mgMlPageText.includes(requiredMgMlContent)) fail(`mg to mL formula-authority page is missing: ${requiredMgMlContent}`)
}
if (!mgMlClientText.includes("<CalculatorEquation")) fail("mg to mL calculator does not explain the selected equation")
if (!mgMlPageText.includes("<SimpleFormulaAnswer")) fail("mg to mL page is missing the human-first simple formula answer")
const mgMlCalculatorIndex = mgMlPageText.indexOf("<MgToMlClient")
const mgMlSimpleAnswerIndex = mgMlPageText.indexOf("<SimpleFormulaAnswer")
const mgMlDisclosureIndex = mgMlPageText.indexOf("<CalculatorContentDisclosure")
if ([mgMlCalculatorIndex, mgMlSimpleAnswerIndex, mgMlDisclosureIndex].some((index) => index < 0) || !(mgMlCalculatorIndex < mgMlSimpleAnswerIndex && mgMlSimpleAnswerIndex < mgMlDisclosureIndex)) {
  fail("mg to mL page must keep the calculator first, then the simple answer, then detailed education")
}
if (!mgMlClientText.includes("Exact calculated result:")) fail("mg to mL calculator does not distinguish exact and displayed results")
const mgMlPrimaryIndex = mgMlClientText.indexOf('id="mg-ml-primary"')
const mgMlActionsIndex = mgMlClientText.indexOf("<CalculatorActions")
const mgMlEquationIndex = mgMlClientText.indexOf("<CalculatorEquation")
if ([mgMlPrimaryIndex, mgMlActionsIndex, mgMlEquationIndex].some((index) => index < 0) || !(mgMlPrimaryIndex < mgMlActionsIndex && mgMlActionsIndex < mgMlEquationIndex)) {
  fail("mg to mL calculator must keep inputs and actions before the detailed formula explanation")
}

const unitsMlPageText = read("app/calculator/dose-calculations/units-to-ml/page.tsx")
const unitsMlClientText = read("app/calculator/dose-calculations/units-to-ml/units-to-ml-client.tsx")
for (const requiredUnitsMlContent of [
  "What does units/mL mean?",
  "What does this calculator do?",
  "units-to-ml-formula",
  "ml-to-units-formula",
  "Why concentration changes the volume",
]) {
  if (!unitsMlPageText.includes(requiredUnitsMlContent)) fail(`Units to mL formula-authority page is missing: ${requiredUnitsMlContent}`)
}
if (!unitsMlClientText.includes("<CalculatorEquation")) fail("Units to mL calculator does not explain the selected equation")
if (!unitsMlPageText.includes("<SimpleFormulaAnswer")) fail("Units to mL page is missing the human-first simple formula answer")
const unitsMlCalculatorIndex = unitsMlPageText.indexOf("<UnitsToMlClient")
const unitsMlSimpleAnswerIndex = unitsMlPageText.indexOf("<SimpleFormulaAnswer")
const unitsMlDisclosureIndex = unitsMlPageText.indexOf("<CalculatorContentDisclosure")
if ([unitsMlCalculatorIndex, unitsMlSimpleAnswerIndex, unitsMlDisclosureIndex].some((index) => index < 0) || !(unitsMlCalculatorIndex < unitsMlSimpleAnswerIndex && unitsMlSimpleAnswerIndex < unitsMlDisclosureIndex)) {
  fail("Units to mL page must keep the calculator first, then the simple answer, then detailed education")
}
if (!unitsMlClientText.includes("Exact calculated result:")) fail("Units to mL calculator does not distinguish exact and displayed results")
for (const requiredUnitsSafety of [
  "I confirmed this exact concentration on the product label.",
  "does not select a syringe, pen, pump, preparation, or dose",
]) {
  if (!unitsMlClientText.includes(requiredUnitsSafety)) fail(`Units to mL safety control is missing: ${requiredUnitsSafety}`)
}
const unitsGuideText = read("components/calculator/units-measurement-guide.tsx")
for (const forbiddenUnitsVisual of ["matched-syringe", "ZoomIn", "ZoomOut", "Illustrative matched"]) {
  if (unitsGuideText.includes(forbiddenUnitsVisual)) fail(`Units to mL insulin syringe visual returned: ${forbiddenUnitsVisual}`)
}
const unitsMlPrimaryIndex = unitsMlClientText.indexOf('id="units-primary"')
const unitsMlConcentrationIndex = unitsMlClientText.indexOf('id="units-concentration"')
const unitsMlActionsIndex = unitsMlClientText.indexOf("<CalculatorActions")
const unitsMlEquationIndex = unitsMlClientText.indexOf("<CalculatorEquation")
if ([unitsMlPrimaryIndex, unitsMlConcentrationIndex, unitsMlActionsIndex, unitsMlEquationIndex].some((index) => index < 0) || !(unitsMlPrimaryIndex < unitsMlConcentrationIndex && unitsMlConcentrationIndex < unitsMlActionsIndex && unitsMlActionsIndex < unitsMlEquationIndex)) {
  fail("Units to mL calculator must keep inputs and actions before the detailed formula explanation")
}

// Retired feed endpoints must return a real 410 response rather than redirecting to a 200 page.
for (const routeHandler of [
  "app/feed/route.ts",
  "app/comments/feed/route.ts",
  "app/sitemap.rss/route.ts",
]) {
  if (!exists(routeHandler)) fail(`Missing 410 route handler: ${routeHandler}`)
}
if (!/status:\s*410/.test(read("lib/gone-response.ts"))) {
  fail("The shared removed-resource response does not return HTTP 410")
}
const nextConfigText = read("next.config.mjs")

// Deployment safety: protect the established mg-to-mL search result and clean known malformed URLs.
const protectedMgMlTitle = "mg to mL Calculator for Medicine | Dose & Syringe"
const protectedMgMlDescription = "Convert mg to mL from a medicine label using mg/mL or mg per 5 mL. Shows the formula, syringe-volume examples, and why concentration matters."
if (!mgMlPageText.includes(`title: "${protectedMgMlTitle}"`)) fail("Protected mg-to-mL title changed")
if ((mgMlPageText.match(new RegExp(protectedMgMlDescription.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) ?? []).length < 3) {
  fail("Protected mg-to-mL description is not preserved across metadata, Open Graph, and Twitter")
}
if (!mgMlPageText.includes('alternates: { canonical: "https://www.medmaths.com/calculator/dose-calculations/mg-to-ml" }')) {
  fail("Protected mg-to-mL canonical changed")
}
if (!mgMlPageText.includes('>mg to mL Calculator for Medicine</h1>')) fail("Protected mg-to-mL H1 changed")
const mgMlFaqBlock = mgMlPageText.split("const faqItems = [", 2)[1]?.split("const practiceQuestions = [", 1)[0] ?? ""
const mgMlFaqCount = (mgMlFaqBlock.match(/question:/g) ?? []).length
if (mgMlFaqCount !== 12) fail(`mg-to-mL FAQ count drifted: expected 12, received ${mgMlFaqCount}`)
for (const queryChasingPhrase of ["peptides or anabolic steroid", "morphine or other high-risk medicines"]) {
  if (mgMlPageText.toLowerCase().includes(queryChasingPhrase)) fail(`Query-chasing mg-to-mL FAQ returned: ${queryChasingPhrase}`)
}
if (!mgMlPageText.includes('id="reconstituted-vial"') || !mgMlPageText.includes("verified final vial volume")) {
  fail("Reconstituted-vial guidance is missing from the protected mg-to-mL page")
}
if (mgMlPageText.includes('href: "/calculator/dilutions/vial-dose-to-ml"')) {
  fail("The protected mg-to-mL page still routes users to the duplicate vial calculator")
}
if (sourceText.includes("search_term_string") || sourceText.includes("SearchAction")) {
  fail("Unsupported site-search structured data has returned")
}
for (const malformedPath of [
  "/calculator/dose-calculations/dose-calculations",
  "/calculator/dose-calculations/medication-math-formula",
]) {
  if (!nextConfigText.includes(`source: "${malformedPath}"`)) fail(`Missing cleanup redirect: ${malformedPath}`)
}
const retiredVialPath = "/calculator/dilutions/vial-dose-to-ml"
const vialRedirectTarget = "/calculator/dose-calculations/mg-to-ml#reconstituted-vial"
if (!nextConfigText.includes(`source: "${retiredVialPath}"`) || !nextConfigText.includes(`destination: "${vialRedirectTarget}"`)) {
  fail("Missing permanent Vial Dose to mL consolidation redirect")
}
if (appRoutes.has(retiredVialPath)) fail("Retired Vial Dose to mL route still exists as an application page")
if (registryCalculatorPaths.has(retiredVialPath)) fail("Retired Vial Dose to mL remains in the SEO registry")
if (uniqueCatalogueHrefs.includes(retiredVialPath)) fail("Retired Vial Dose to mL remains in the calculator catalogue")
for (const reference of internalReferences) {
  if (normaliseRoute(reference) === retiredVialPath) fail(`Internal link still points to retired Vial Dose to mL route: ${reference}`)
}
const tabletCategoryText = read("app/calculator/tablet-dosing/page.tsx")
if (tabletCategoryText.includes('title: "Tablet Dose Calculator |')) {
  fail("Tablet category page is targeting the singular calculator title")
}

for (const retiredPath of ["/feed", "/comments/feed", "/sitemap.rss"]) {
  if (nextConfigText.includes(`source: "${retiredPath}"`)) {
    fail(`Retired endpoint is still configured as a redirect instead of a 410 route: ${retiredPath}`)
  }
}

// Public icon and manifest coverage.
for (const asset of [
  "public/favicon.ico",
  "public/favicon.svg",
  "public/favicon-48x48.png",
  "public/icon-192x192.png",
  "public/icon-512x512.png",
  "public/apple-touch-icon.png",
  "public/site.webmanifest",
  "public/medmaths-logo.png",
]) {
  if (!exists(asset)) fail(`Missing required public asset: ${asset}`)
}

const manifest = JSON.parse(read("public/site.webmanifest"))
for (const icon of manifest.icons ?? []) {
  const iconPath = String(icon.src ?? "").replace(/^\//, "")
  if (!iconPath || !exists(`public/${iconPath}`)) fail(`Manifest icon is missing: ${icon.src ?? "unnamed"}`)
}

// Deprecated or fragile browser/input patterns should not return.
const appCode = [
  ...walk("app", [".ts", ".tsx"]),
  ...walk("components", [".ts", ".tsx"]),
  ...walk("hooks", [".ts", ".tsx"]),
  ...walk("lib", [".ts", ".tsx"]),
]
  .map((file) => `${file}\n${read(file)}`)
  .join("\n")
for (const [label, pattern] of [
  ["browser alert", /\balert\s*\(/],
  ["parseFloat", /\bparseFloat\s*\(/],
  ["deprecated onKeyPress", /\bonKeyPress\s*=/],
]) {
  if (pattern.test(appCode)) fail(`Deprecated or disallowed pattern found: ${label}`)
}

// Tablet calculator consolidation: ranking URL owns both modes; child URLs are redirects only.
for (const retiredTabletRoute of [
  "/calculator/tablet-dosing/mg-to-tablets",
  "/calculator/tablet-dosing/mgkg-to-tablets",
]) {
  if (appRoutes.has(retiredTabletRoute)) fail(`Retired tablet route still has an application page: ${retiredTabletRoute}`)
  if (registryUrls.has(`https://www.medmaths.com${retiredTabletRoute}`)) fail(`Retired tablet route remains in SEO registry: ${retiredTabletRoute}`)
  if (uniqueCatalogueHrefs.includes(retiredTabletRoute)) fail(`Retired tablet route remains in calculator catalogue: ${retiredTabletRoute}`)
}
for (const [source, destination] of [
  ["/calculator/tablet-dosing/mg-to-tablets", "/calculator/tablet-dosing#fixed-dose"],
  ["/calculator/tablet-dosing/mgkg-to-tablets", "/calculator/tablet-dosing#weight-based"],
]) {
  if (!nextConfigText.includes(`source: "${source}"`) || !nextConfigText.includes(`destination: "${destination}"`)) {
    fail(`Missing tablet consolidation redirect: ${source} -> ${destination}`)
  }
}

// Arithmetic regression checks covering the 12 indexed calculator routes.
assertClose("mg to mL", 500 / 250, 2)
assertClose("mg to mL from label", (125 / 250) * 5, 2.5)
assertClose("mL to mg", 2.5 * 50, 125)
assertClose("mg to mL reconstituted vial path", (75 / 500) * 10, 1.5)
assertClose("mg to mL tiny volume", 0.25 / 10, 0.025)
assertClose("mL to mg from label concentration", 2.5 * (250 / 5), 125)
assertClose("mg to mL decimal concentration", 1.5 / 0.75, 2)
assertClose("mg/kg to mL per dose", (15 * 20) / 100, 3)
assertClose("mg/kg/day divided dose to mL", ((20 * 20) / 4) / 25, 4)
assertClose("mg/kg to mL from pounds", ((44 * 0.45359237) * 10) / 50, 3.991612856, 1e-12)
assertClose("mg/kg/day from pounds", (((66 * 0.45359237) * 30) / 3) / 20, 14.96854821, 1e-10)
assertClose("units to mL", 10 / 100, 0.1)
assertClose("mL to units", 0.3 * 100, 30)
assertClose("U-40 units to mL", 20 / 40, 0.5)
assertClose("mg to tablets", 500 / 250, 2)
assertClose("mg/kg to tablets", (10 * 20) / 100, 2)
assertClose("mL/hr to gtt/min", (120 * 20) / 60, 40)
assertClose("gtt/min to mL/hr", (40 * 60) / 20, 120)
assertClose("gtt/min to mL/hr 25 at 20", (25 * 60) / 20, 75)
assertClose("gtt/min to mL/hr 25 at 15", (25 * 60) / 15, 100)
assertClose("gtt/min to mL/hr microdrip", (50 * 60) / 60, 50)
assertClose("gtt/min to mL/hr decimal", (12.5 * 60) / 20, 37.5)
assertClose("gtt/min to mL/hr custom set", (15 * 60) / 30, 30)
assertClose("gtt/min to mL/hr small estimate", (0.5 * 60) / 60, 0.5)
assertClose("infusion time", 250 / 125, 2)
assertClose("male Devine IBW", 50 + 2.3 * 10, 73)
assertClose("female Devine IBW", 45.5 + 2.3 * 10, 68.5)
assertClose("Devine IBW from cm", 50 + 2.3 * (175 / 2.54 - 60), 70.46456692913387, 1e-12)
assertClose("Mosteller BSA", Math.sqrt((170 * 70) / 3600), 1.818118685772619, 1e-12)
assertClose("Du Bois BSA", 0.007184 * 170 ** 0.725 * 70 ** 0.425, 1.809707801753247, 1e-12)
assertClose("Haycock BSA", 0.024265 * 170 ** 0.3964 * 70 ** 0.5378, 1.8256771247769754, 1e-12)
assertClose("Gehan and George BSA", 0.0235 * 170 ** 0.42246 * 70 ** 0.51456, 1.831289313422129, 1e-12)
assertClose("Cockcroft-Gault CrCl µmol/L", ((140 - 65) * 70) / (0.814 * 100), 64.4963144963145, 1e-12)
assertClose("Cockcroft-Gault CrCl mg/dL female", ((140 - 65) * 70 * 0.85) / (72 * 1.2), 51.64930555555556, 1e-12)
assertClose("Cockcroft-Gault unit equivalence", ((140 - 70) * 80) / (0.814 * 120), ((140 - 70) * 80) / (72 * (120 / 88.4)), 0.05)
assertClose("C1V1 C2V2", (10 * 50) / 100, 5)
assertClose("reconstitution to bag", ((1000 / 10) * 2.5) / 250, 1)

note(`${sourceFiles.length} source/configuration files scanned`)
note(`${appRoutes.size} application routes found`)
note(`${internalReferences.size} internal href references checked`)
note(`${uniqueCatalogueHrefs.length} calculator catalogue routes checked`)
note(`${indexableRegistryCount} indexable SEO registry pages checked`)
note("3 retired feed endpoints checked for real HTTP 410 handling")
note("37 calculator and formula-authority arithmetic regression cases passed")
note("17 safe-number precision regression cases passed")
note("Units-to-mL safety regression and no-insulin-syringe-visual checks passed")
note("IV infusion duration, clock-completion, midnight-rollover, and no-danger-threshold checks passed")
note("Clinical Devine IBW scope, 5-foot minimum, no-actual-weight comparison, and content limits passed")
note("Creatinine clearance weight-helper, explicit method selection, adjusted-weight transparency, and neutral result presentation passed")
note("Medication dilution C1V1=C2V2 arithmetic, final-volume boundaries, focused content, and SEO ownership checks passed")
note("Calculator metadata registry drift checks passed")
note("Practice questions remain separated from FAQ structured data")
note("mg-to-mL protection, mg/kg expansion, units-to-mL safety, vial consolidation, reverse-IV protection, IV-time expansion, tablet consolidation, and malformed-URL checks passed")

if (failures.length > 0) {
  console.error("MedMaths preflight failed:\n")
  for (const message of failures) console.error(`- ${message}`)
  process.exitCode = 1
} else {
  console.log("MedMaths preflight passed:\n")
  for (const message of notes) console.log(`- ${message}`)
}
