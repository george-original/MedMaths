import type { MetadataRoute } from "next"
import { getPagesForSitemap } from "@/lib/seo-utils"

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = getPagesForSitemap()

  return pages.map((page) => {
    let priority = 0.5
    let changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never" = "monthly"

    if (page.url === "https://www.medmaths.com/") {
      priority = 1.0
      changeFrequency = "weekly"
    } else if (page.url === "https://www.medmaths.com/calculators") {
      priority = 0.9
      changeFrequency = "weekly"
    } else if (page.type === "category") {
      priority = 0.8
      changeFrequency = "weekly"
    } else if (page.type === "calculator") {
      priority = 0.75
      changeFrequency = "monthly"
    } else if (page.type === "main") {
      priority = 0.35
      changeFrequency = "yearly"
    }

    return {
      url: page.url,
      lastModified: (page as any).lastReviewed ? new Date((page as any).lastReviewed) : undefined,
      changeFrequency,
      priority,
    }
  })
}
