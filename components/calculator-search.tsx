"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  searchCalculators,
  getAllCategories,
  mostUsedCalculators,
  getPageMetadata,
  normalizeSearchTerm,
} from "@/lib/seo-utils"
import type { PageMetadata } from "@/lib/seo-utils"

type Group = { categoryName: string; items: PageMetadata[] }

function safeSliceText(s: string | undefined, n: number) {
  const t = (s ?? "").trim()
  if (!t) return ""
  return t.length > n ? `${t.slice(0, n)}…` : t
}

function toPath(input: string): string {
  // Accept:
  // - "/calculator/..."
  // - "https://www.medmaths.com/calculator/..."
  // - "calculator/..." (missing leading slash)
  try {
    if (input.startsWith("http://") || input.startsWith("https://")) {
      return new URL(input).pathname
    }
  } catch {
    // ignore
  }
  if (input.startsWith("/")) return input
  return `/${input}`
}

function buildPopularList(limit = 8): PageMetadata[] {
  // mostUsedCalculators can be strings (paths/urls). We resolve them to PageMetadata when possible.
  const items: PageMetadata[] = []
  const seen = new Set<string>()

  for (const raw of (mostUsedCalculators as unknown as string[]) || []) {
    const path = toPath(String(raw))
    const meta = getPageMetadata(path)
    if (!meta) continue
    if (seen.has(meta.url)) continue
    seen.add(meta.url)
    items.push(meta)
    if (items.length >= limit) break
  }

  return items
}

export function CalculatorSearch() {
  const [search, setSearch] = useState("")
  const [results, setResults] = useState<PageMetadata[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number>(-1)

  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const categories = useMemo(() => getAllCategories(), [])
  const popular = useMemo(() => buildPopularList(8), [])

  // Debounced search (prevents heavy re-score on every keypress)
  useEffect(() => {
    const q = search.trim()
    if (!q) {
      setResults([])
      setActiveIndex(-1)
      // keep closed until focus; focus handler will open popular panel
      return
    }

    const t = setTimeout(() => {
      const filtered = searchCalculators(q)
      setResults(filtered.slice(0, 12))
      setIsOpen(filtered.length > 0)
      setActiveIndex(-1)
    }, 150)

    return () => clearTimeout(t)
  }, [search])

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        inputRef.current &&
        !inputRef.current.contains(target)
      ) {
        setIsOpen(false)
        setActiveIndex(-1)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const groupedResults: Group[] = useMemo(() => {
    const list = (results ?? []).filter(Boolean)

    const groups: Group[] = []
    for (const calc of list) {
      const key = (calc.categoryKey || "").trim()
      const categoryData = categories.find((cat) => (cat.url || "").includes(key))
      const categoryName = categoryData?.displayName || (key ? key : "Other")

      const existing = groups.find((g) => g.categoryName === categoryName)
      if (existing) existing.items.push(calc)
      else groups.push({ categoryName, items: [calc] })
    }

    return groups
  }, [results, categories])

  // Flatten for keyboard navigation index mapping
  const flatItems = useMemo(() => {
    const out: PageMetadata[] = []
    for (const g of groupedResults) out.push(...g.items)
    return out
  }, [groupedResults])

  const openPopularPanel = () => {
    // Only open popular panel when the input is focused and empty
    if (!search.trim() && popular.length > 0) {
      setResults([])
      setIsOpen(true)
      setActiveIndex(-1)
    }
  }

  const closeAll = () => {
    setIsOpen(false)
    setActiveIndex(-1)
  }

  const clearSearch = () => {
    setSearch("")
    setResults([])
    setActiveIndex(-1)
    // keep open popular panel if focused
    if (document.activeElement === inputRef.current) openPopularPanel()
    else closeAll()
  }

  const goToCalc = (calc: PageMetadata) => {
    // We only need pathname for Next Link navigation
    const pathname = toPath(calc.url)
    // Imperative navigation without importing router:
    window.location.assign(pathname)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setIsOpen(true)
      return
    }

    if (e.key === "Escape") {
      closeAll()
      return
    }

    // If empty and popular is showing, use that list for nav
    const showingPopular = isOpen && !search.trim() && popular.length > 0
    const navList = showingPopular ? popular : flatItems

    if (!isOpen || navList.length === 0) return

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIndex((prev) => {
        const next = prev + 1
        return next >= navList.length ? 0 : next
      })
      return
    }

    if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex((prev) => {
        const next = prev - 1
        return next < 0 ? navList.length - 1 : next
      })
      return
    }

    if (e.key === "Enter") {
      if (activeIndex >= 0 && activeIndex < navList.length) {
        e.preventDefault()
        goToCalc(navList[activeIndex])
      }
    }
  }

  // Small UX: if user types “µg”, normalize it to “mcg” in-place (optional)
  const handleChange = (val: string) => {
    const norm = normalizeSearchTerm(val)
    setSearch(norm)
    if (norm.trim()) setIsOpen(true)
  }

  const showingPopular = isOpen && !search.trim() && popular.length > 0

  return (
    <div className="relative mx-auto max-w-2xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground pointer-events-none" />

        <Input
          ref={inputRef}
          type="search"
          placeholder="Search calculators (e.g., mg to mL, tablet dose, drip rate…)"
          value={search}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => {
            if (search.trim()) setIsOpen(true)
            else openPopularPanel()
          }}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-10 py-2"
          aria-expanded={isOpen}
          aria-autocomplete="list"
        />

        {search.trim() && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
            onClick={clearSearch}
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 max-h-96 overflow-y-auto rounded-lg border border-border bg-card shadow-lg z-50"
        >
          {/* POPULAR (empty query) */}
          {showingPopular && (
            <div>
              <div className="sticky top-0 bg-muted px-4 py-2 text-xs font-semibold text-muted-foreground uppercase">
                Popular calculators
              </div>
              {popular.map((calc, idx) => {
                const pathname = toPath(calc.url)
                const isActive = idx === activeIndex
                return (
                  <Link
                    key={calc.url}
                    href={pathname}
                    onMouseDown={(e) => e.preventDefault()} // prevents input blur before click
                    onClick={() => {
                      setSearch("")
                      closeAll()
                    }}
                    className={[
                      "block px-4 py-3 transition-colors border-b border-border/50 last:border-b-0 cursor-pointer",
                      isActive ? "bg-muted" : "hover:bg-muted",
                    ].join(" ")}
                  >
                    <div className="font-medium text-foreground text-sm">{calc.displayName}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {safeSliceText(calc.metaDescription, 110)}
                    </div>
                  </Link>
                )
              })}
            </div>
          )}

          {/* SEARCH RESULTS */}
          {!showingPopular && results.length > 0 && (
            <>
              {groupedResults.map((group) => (
                <div key={group.categoryName} className="border-b border-border last:border-b-0">
                  <div className="sticky top-0 bg-muted px-4 py-2 text-xs font-semibold text-muted-foreground uppercase">
                    {group.categoryName}
                  </div>

                  {group.items.map((calc) => {
                    const idx = flatItems.findIndex((x) => x.url === calc.url)
                    const isActive = idx === activeIndex
                    const pathname = toPath(calc.url)

                    return (
                      <Link
                        key={calc.url}
                        href={pathname}
                        onMouseDown={(e) => e.preventDefault()}
                        onMouseEnter={() => setActiveIndex(idx)}
                        onClick={() => {
                          setSearch("")
                          closeAll()
                        }}
                        className={[
                          "block px-4 py-3 transition-colors border-b border-border/50 last:border-b-0 cursor-pointer",
                          isActive ? "bg-muted" : "hover:bg-muted",
                        ].join(" ")}
                      >
                        <div className="font-medium text-foreground text-sm">{calc.displayName}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {safeSliceText(calc.metaDescription, 110)}
                        </div>
                      </Link>
                    )
                  })}
                </div>
              ))}
            </>
          )}

          {/* NO RESULTS */}
          {!showingPopular && search.trim() && results.length === 0 && (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No calculators found. Try “mg to mL”, “tablet dose”, or “drip rate”.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
