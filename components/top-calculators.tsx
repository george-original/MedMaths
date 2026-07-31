import { PopularCalculatorGrid } from "@/components/calculator"
import { popularCalculatorCatalogItems } from "@/lib/calculator-catalog"

export function TopCalculators() {
  const jsonLdItems = popularCalculatorCatalogItems.map((calculator) => ({
    "@type": "Thing",
    name: calculator.title,
    url: `https://www.medmaths.com${calculator.href}`,
  }))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Core MedMaths calculators",
            url: "https://www.medmaths.com",
            itemListElement: jsonLdItems.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item,
            })),
          }),
        }}
      />

      <section className="border-y border-gray-200 bg-gray-50/70">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
          <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-700">Start here</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
                Common medication maths calculators
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
                Open a focused calculator directly. Each tool shows the formula, calculation steps, result, and relevant arithmetic checks.
              </p>
            </div>
          </div>

          <PopularCalculatorGrid />
        </div>
      </section>
    </>
  )
}
