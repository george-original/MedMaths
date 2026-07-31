import fs from "node:fs"
import path from "node:path"
import process from "node:process"
import { fileURLToPath } from "node:url"

const scriptPath = fileURLToPath(import.meta.url)
const root = path.resolve(path.dirname(scriptPath), "..")
const failures = []
let checks = 0

function check(condition, message) {
  checks += 1
  if (!condition) failures.push(message)
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8")
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath))
}

function routeOnly(value) {
  return String(value).split(/[?#]/, 1)[0].replace(/\/+$/, "") || "/"
}

const registry = JSON.parse(read("lib/seo-registry.json"))
const network = JSON.parse(read("lib/calculator-network.json"))
const seed = JSON.parse(read("lib/most-used-seed.json")).mostUsedSeed ?? []
const catalogue = read("lib/calculator-catalog.ts")
const nextConfig = read("next.config.mjs")

const calculatorPaths = registry.pages
  .filter((page) => page.type === "calculator" && !String(page.robots ?? "").includes("noindex") && !page.excludeFromSitemap)
  .map((page) => new URL(page.url).pathname)
  .sort()

const networkKeys = Object.keys(network).sort()
check(JSON.stringify(networkKeys) === JSON.stringify(calculatorPaths), "Calculator network keys must match all indexed calculator routes")

for (const [source, targets] of Object.entries(network)) {
  check(Array.isArray(targets) && targets.length === 4, `${source} must have exactly four related calculator targets`)
  check(new Set(targets).size === targets.length, `${source} has duplicate related calculator targets`)
  for (const target of targets) {
    check(routeOnly(target) !== source, `${source} links to itself in the calculator network`)
    check(calculatorPaths.includes(routeOnly(target)), `${source} points to a non-indexed calculator: ${target}`)
    if (target.includes("#")) {
      check(
        ["/calculator/tablet-dosing#fixed-dose", "/calculator/tablet-dosing#weight-based"].includes(target),
        `${source} uses an unsupported calculator anchor: ${target}`,
      )
    }
  }
}

const retiredRoutes = [
  "/calculator/dilutions/vial-dose-to-ml",
  "/calculator/tablet-dosing/mg-to-tablets",
  "/calculator/tablet-dosing/mgkg-to-tablets",
  "/calculator/renal-function",
]
for (const retired of retiredRoutes) {
  check(!calculatorPaths.includes(retired), `Retired route remains indexed: ${retired}`)
  check(!networkKeys.includes(retired), `Retired route remains a calculator-network source: ${retired}`)
  check(!Object.values(network).flat().some((target) => routeOnly(target) === retired), `Retired route remains a calculator-network target: ${retired}`)
}
check(!exists("app/calculator/renal-function/page.tsx"), "Single-calculator renal category page should remain retired")
check(
  nextConfig.includes('source: "/calculator/renal-function"') &&
    nextConfig.includes('destination: "/calculator/renal-function/creatinine-clearance"'),
  "Renal category redirect is missing",
)

const categoryPages = registry.pages.filter((page) => page.type === "category" && !String(page.robots ?? "").includes("noindex"))
const primaryOwners = new Map()
for (const page of [...categoryPages, ...registry.pages.filter((page) => page.type === "calculator")]) {
  const key = String(page.primaryKeyword ?? "").toLowerCase().trim()
  check(Boolean(key), `${page.url} is missing a primary keyword`)
  const previous = primaryOwners.get(key)
  check(!previous, `Duplicate primary query ownership: ${key} (${previous} and ${page.url})`)
  primaryOwners.set(key, page.url)
}

const expectedCategoryKeywords = {
  "https://www.medmaths.com/calculator/dose-calculations": "medication dose calculators",
  "https://www.medmaths.com/calculator/iv-fluids": "iv fluid calculators",
  "https://www.medmaths.com/calculator/dilutions": "medication dilution calculators",
  "https://www.medmaths.com/calculator/body-composition": "dosing body measure calculators",
}
for (const [url, keyword] of Object.entries(expectedCategoryKeywords)) {
  const page = categoryPages.find((candidate) => candidate.url === url)
  check(page?.primaryKeyword?.toLowerCase() === keyword, `${url} does not own the expected plural collection query`)
}
check(categoryPages.length === 4, `Expected four indexable collection pages, found ${categoryPages.length}`)

const popularMatch = catalogue.match(/export const popularCalculatorHrefs = \[([\s\S]*?)\] as const/)
const popularPaths = popularMatch ? [...popularMatch[1].matchAll(/"([^"]+)"/g)].map((match) => match[1]) : []
const seedPaths = seed.map((value) => new URL(value).pathname)
check(JSON.stringify(popularPaths) === JSON.stringify(seedPaths), "Homepage popular calculators and search popular seed must use the same order")
check(popularPaths[0] === "/calculator/dose-calculations/mg-to-ml", "mg-to-mL must remain the first popular calculator")
check(popularPaths.includes("/calculator/iv-fluids/mlhr-from-drip-rate"), "Proven reverse-IV calculator is missing from popular calculators")

const calculatorPages = fs
  .readdirSync(path.join(root, "app/calculator"), { recursive: true })
  .filter((file) => String(file).endsWith("page.tsx"))
  .map((file) => `app/calculator/${String(file).replaceAll("\\", "/")}`)
  .filter((file) => read(file).includes("<RelatedCalculators"))

for (const file of calculatorPages) {
  const text = read(file)
  check(text.includes('from "@/lib/calculator-network"'), `${file} does not import the central calculator network`)
  check(!text.includes("items={["), `${file} still contains an inline related-calculator array`)
  check((text.match(/getCalculatorNetworkItems\(/g) ?? []).length === 1, `${file} must use one central related-calculator block`)
}
check(calculatorPages.length === 12, `Expected 12 calculator pages with related-calculator blocks, found ${calculatorPages.length}`)

const appText = ["app/client-page.tsx", "app/calculators/page.tsx"].map(read).join("\n")
check(!appText.includes("vial calculations"), "Homepage or directory still promises a standalone vial-calculation page")
check(!appText.includes('href: "/calculator/renal-function"'), "Directory still routes renal users through the retired category page")
check(appText.includes("final IV concentration"), "Homepage and directory should name final IV concentration as the retained dilution task")

if (failures.length) {
  console.error(`Calculator network regression failed (${failures.length} issue${failures.length === 1 ? "" : "s"}):`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`Calculator network regression passed: ${checks} checks.`)
