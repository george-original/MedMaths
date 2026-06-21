import seoRegistry from "./seo-registry.json"
import mostUsedSeed from "./most-used-seed.json"

export interface PageMetadata {
  url: string
  type: "main" | "category" | "calculator"
  canonical: string
  robots: string
  categoryKey: string | null
  displayName: string
  title: string
  primaryKeyword: string

  // ✅ In real JSON, these sometimes end up missing — treat as optional in runtime
  secondaryKeywords: string[]
  synonyms: string[]
  metaDescription: string
  schema: string[]
  recommendedH1: string
  excludeFromSitemap?: boolean
  lastReviewed?: string
  audience?: string[]
  siteAngle?: string
}

export interface SeoRegistry {
  canonicalHost: string
  canonicalPreference: string
  adSenseSafety: {
    noAdsNearInputsOrButtons: boolean
    noEncouragingClicks: boolean
    hidePlaceholdersWhenAdsNotLoaded: boolean
  }
  pages: PageMetadata[]
}

// ---------- Helpers (runtime safety) ----------
function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((x) => typeof x === "string") : []
}

function safeLower(s: unknown): string {
  return typeof s === "string" ? s.toLowerCase() : ""
}

/**
 * Accepts:
 *  - "/calculator/..." (relative path)
 *  - "https://www.medmaths.com/calculator/..." (absolute url)
 * Returns: "/calculator/..." safely without throwing
 */
function toPath(input: string): string {
  if (!input) return "/"
  try {
    if (input.startsWith("http://") || input.startsWith("https://")) {
      return new URL(input).pathname || "/"
    }
    // already a pathname
    return input.startsWith("/") ? input : `/${input}`
  } catch {
    // worst-case fallback
    return input.startsWith("/") ? input : `/${input}`
  }
}

// ---------- Registry ----------
export const registry = seoRegistry as SeoRegistry

export const mostUsedCalculators =
  (mostUsedSeed as any)?.mostUsedSeed && Array.isArray((mostUsedSeed as any).mostUsedSeed)
    ? (mostUsedSeed as any).mostUsedSeed
    : []

function isIndexablePage(page: PageMetadata): boolean {
  const robots = safeLower(page.robots)
  return !robots.includes("noindex") && !(page as any).excludeFromSitemap
}

function isSearchVisiblePage(page: PageMetadata): boolean {
  const robots = safeLower(page.robots)
  return !robots.includes("noindex")
}

// Find page metadata by URL path
export function getPageMetadata(path: string): PageMetadata | undefined {
  const p = toPath(path)

  // Prefer exact full-url match if possible
  const fullUrl = `${registry.canonicalHost}${p}`
  const byFull = registry.pages.find((page) => page.url === fullUrl)
  if (byFull) return normalizePage(byFull)

  // Fallback: match by pathname (handles registry entries with different host formatting)
  const byPath = registry.pages.find((page) => toPath(page.url) === p)
  return byPath ? normalizePage(byPath) : undefined
}

// Get all calculators for a specific category
export function getCalculatorsByCategory(categoryKey: string): PageMetadata[] {
  return registry.pages
    .map(normalizePage)
    .filter((page) => page.type === "calculator" && page.categoryKey === categoryKey && isSearchVisiblePage(page))
}

// Get all category pages
export function getAllCategories(): PageMetadata[] {
  return registry.pages
    .map(normalizePage)
    .filter((page) => page.type === "category" && isSearchVisiblePage(page))
}

// Normalize a registry entry so missing arrays never crash the build
function normalizePage(page: PageMetadata): PageMetadata {
  return {
    ...page,
    secondaryKeywords: asStringArray((page as any).secondaryKeywords),
    synonyms: asStringArray((page as any).synonyms),
    schema: asStringArray((page as any).schema),
  }
}

// Normalize search term for synonym matching
export function normalizeSearchTerm(term: string): string {
  const normalized = (term || "").toLowerCase().trim()

  const synonymMap: Record<string, string> = {
    µg: "mcg",
    ug: "mcg",
    microgram: "mcg",
    micrograms: "mcg",
    cc: "ml",
    litre: "liter",
    litres: "liters",
    hyperglycaemia: "hyperglycemia",
    "gtt/min": "drops per minute",
    gtt: "drops",
    "umol/l": "µmol/l",
  }

  return synonymMap[normalized] || normalized
}

// Search calculators with synonym support (build-safe)
export function searchCalculators(query: string): PageMetadata[] {
  if (!query?.trim()) return []

  const normalizedQuery = normalizeSearchTerm(query)
  const queryTokens = normalizedQuery.split(/\s+/).filter(Boolean)

  const calculators = registry.pages
    .map(normalizePage)
    .filter((page) => page.type === "calculator" && isSearchVisiblePage(page))

  const scored = calculators.map((calc) => {
    let score = 0

    const display = safeLower(calc.displayName)
    const primary = safeLower(calc.primaryKeyword)
    const slug = (calc.url?.split("/").pop() || "").toLowerCase()

    // Exact displayName match
    if (display.includes(normalizedQuery)) score += 100

    // Primary keyword match
    if (primary.includes(normalizedQuery)) score += 80

    // Slug token match
    const slugTokens = slug.split("-").filter(Boolean)
    if (slugTokens.some((token) => queryTokens.includes(token))) score += 60

    // Synonym match (safe even if missing)
    const allSynonyms = asStringArray(calc.synonyms).map((s) => s.toLowerCase())
    if (allSynonyms.some((syn) => syn.includes(normalizedQuery))) score += 50

    // Secondary keyword match (safe even if missing)
    const allSecondary = asStringArray(calc.secondaryKeywords).map((s) => s.toLowerCase())
    if (allSecondary.some((sec) => sec.includes(normalizedQuery))) score += 40

    // Partial token matches
    for (const token of queryTokens) {
      if (display.includes(token)) score += 10
      if (primary.includes(token)) score += 8
    }

    return { calc, score }
  })

  return scored
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ calc }) => calc)
}

// Get related calculators (same category, exclude self) — safe for relative/absolute URLs
export function getRelatedCalculators(currentUrl: string, limit = 6): PageMetadata[] {
  const current = getPageMetadata(toPath(currentUrl))
  if (!current?.categoryKey) return []

  const currentPath = toPath(currentUrl)

  return registry.pages
    .map(normalizePage)
    .filter((page) => page.type === "calculator" && isSearchVisiblePage(page))
    .filter((page) => page.categoryKey === current.categoryKey && toPath(page.url) !== currentPath)
    .slice(0, limit)
}

// Category adjacency for "commonly used with"
const categoryAdjacency: Record<string, string[]> = {
  "dose-calculations": ["tablet-dosing", "iv-fluids", "dilutions", "renal-function", "body-composition"],
  "tablet-dosing": ["dose-calculations", "body-composition"],
  "iv-fluids": ["dose-calculations", "dilutions"],
  dilutions: ["dose-calculations", "iv-fluids"],
  "body-composition": ["dose-calculations", "renal-function", "tablet-dosing"],
  "renal-function": ["dose-calculations", "body-composition"],
}

// Get commonly used with calculators (adjacent categories)
export function getCommonlyUsedWith(currentUrl: string, limit = 3): PageMetadata[] {
  const current = getPageMetadata(toPath(currentUrl))
  if (!current?.categoryKey) return []

  const adjacentCategories = categoryAdjacency[current.categoryKey] || []

  return registry.pages
    .map(normalizePage)
    .filter((page) => page.type === "calculator" && isSearchVisiblePage(page))
    .filter((page) => page.categoryKey && adjacentCategories.includes(page.categoryKey))
    .slice(0, limit)
}

// Get pages for sitemap
export function getPagesForSitemap(): PageMetadata[] {
  return registry.pages.map(normalizePage).filter(isIndexablePage)
}
