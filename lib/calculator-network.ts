import networkData from "@/lib/calculator-network.json"
import { getCalculatorCatalogItem } from "@/lib/calculator-catalog"

export type CalculatorNetworkItem = {
  title: string
  href: string
  description: string
}

const network = networkData as Record<string, string[]>

const anchorTitles: Record<string, string> = {
  "/calculator/tablet-dosing#fixed-dose": "Fixed-Dose Tablet Calculator",
  "/calculator/tablet-dosing#weight-based": "Weight-Based Tablet Calculator",
}

export function getCalculatorNetworkItems(currentHref: string): CalculatorNetworkItem[] {
  return (network[currentHref] ?? []).map((href) => {
    const calculator = getCalculatorCatalogItem(href)

    if (!calculator) {
      throw new Error(`Calculator network target is missing from the catalogue: ${href}`)
    }

    return {
      title: anchorTitles[href] ?? calculator.title,
      href,
      description: calculator.description,
    }
  })
}
