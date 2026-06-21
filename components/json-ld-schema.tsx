interface JsonLdSchemaProps {
  schema: Record<string, any>
}

export function JsonLdSchema({ schema }: JsonLdSchemaProps) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MedMaths",
    url: "https://www.medmaths.com",
    description: "Focused medication maths calculators for dose conversions, tablet dosing, IV drip rates, dilutions, dosing body measures, and renal dosing support.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.medmaths.com/calculators?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  }
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateCalculatorSchema(calc: {
  name: string
  description: string
  url: string
  category: string
  keywords?: string[]
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: calc.name,
    description: calc.description,
    url: calc.url,
    applicationCategory: "MedicalApplication",
    applicationSubCategory: calc.category,
    operatingSystem: "Any",
    browserRequirements: "Modern web browser",
    isAccessibleForFree: true,
    inLanguage: "en-AU",
    keywords: calc.keywords?.join(", "),
    audience: [
      { "@type": "Audience", audienceType: "Nurses" },
      { "@type": "Audience", audienceType: "Student nurses" },
      { "@type": "Audience", audienceType: "Pharmacists" },
      { "@type": "Audience", audienceType: "Clinicians" },
    ],
    author: {
      "@type": "Person",
      name: "George Lambroglou",
      jobTitle: "Registered Nurse",
      url: "https://www.medmaths.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "MedMaths",
      url: "https://www.medmaths.com",
      logo: "https://www.medmaths.com/medmaths-logo.png",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "AUD",
      availability: "https://schema.org/InStock",
    },
  }
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MedMaths",
    url: "https://www.medmaths.com",
    logo: "https://www.medmaths.com/medmaths-logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      email: "medmaths.calc@gmail.com",
      contactType: "Corrections and calculator feedback",
    },
  }
}
