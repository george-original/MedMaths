import type { Metadata } from "next"
import ClientPage from "./client-page"
import { JsonLdSchema, generateWebsiteSchema, generateOrganizationSchema } from "@/components/json-ld-schema"

export const metadata: Metadata = {
  title: "MedMaths | Med Maths Calculators for Dose, IV & Tablets",
  description: "MedMaths, also searched as Med Maths, provides free medication maths calculators for mg to mL, tablets, IV drip rates, dilutions, BSA, IBW, and CrCl.",
  keywords: ["MedMaths", "Med Maths", "med maths calculators", "medical maths calculators", "medication dose calculators", "medication calculator", "nursing dose calculations", "mg to mL calculator", "tablet dosage calculator", "IV drip rate calculator"],
  authors: [{ name: "George Lambroglou, RN", url: "https://www.medmaths.com/about" }],
  creator: "George Lambroglou, RN",
  publisher: "MedMaths",
  alternates: { canonical: "https://www.medmaths.com/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "MedMaths | Med Maths Calculators for Dose, IV & Tablets",
    description: "MedMaths, also searched as Med Maths, provides free medication maths calculators for mg to mL, tablets, IV drip rates, dilutions, BSA, IBW, and CrCl.",
    url: "https://www.medmaths.com/",
    siteName: "MedMaths",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary",
    title: "MedMaths | Med Maths Calculators for Dose, IV & Tablets",
    description: "MedMaths, also searched as Med Maths, provides free medication maths calculators for mg to mL, tablets, IV drip rates, dilutions, BSA, IBW, and CrCl.",
  },
}

const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is MedMaths?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MedMaths is a focused medical maths calculator library for medication dose conversions, tablet dosing, IV drip rates, dilutions, body surface area, ideal body weight, and creatinine clearance.",
      },
    },
    {
      "@type": "Question",
      name: "Is Med Maths the same as MedMaths?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Med Maths is the spaced version of the MedMaths brand name. Both refer to the same medication maths calculator site.",
      },
    },
    {
      "@type": "Question",
      name: "Which MedMaths calculator should I use first?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Start with the unit in the medication order. Use mg to mL for liquid dose volume, mg/kg tools for weight-based dosing, tablet calculators for oral tablets, IV calculators for drip rates and infusion time, and renal or body-measure calculators when the order depends on CrCl, BSA, or IBW.",
      },
    },
    {
      "@type": "Question",
      name: "Does MedMaths replace clinical judgement?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. MedMaths shows calculation methods and arithmetic only. It does not recommend doses, diagnose conditions, or replace medication orders, product information, local policy, or clinical review.",
      },
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <JsonLdSchema schema={generateWebsiteSchema()} />
      <JsonLdSchema schema={generateOrganizationSchema()} />
      <JsonLdSchema schema={homeFaqSchema} />
      <ClientPage />
    </>
  )
}
