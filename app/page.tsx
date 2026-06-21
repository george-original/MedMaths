import type { Metadata } from "next"
import ClientPage from "./client-page"
import { JsonLdSchema, generateWebsiteSchema, generateOrganizationSchema } from "@/components/json-ld-schema"
import { getPageMetadata } from "@/lib/seo-utils"

const pageData = getPageMetadata("/")

export const metadata: Metadata = {
  title: "Medication Dose Calculators | IV, Tablet & mg to mL",
  description: "Free medication dose calculators for nurses and clinicians: mg to mL, tablet dosage, IV drip rates, dilutions, BSA, IBW, and Cockcroft-Gault CrCl.",
  keywords: ["medication dose calculators", "medication calculator", "nursing dose calculations", "mg to mL calculator", "tablet dosage calculator", "IV drip rate calculator"],
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
    title: "Medication Dose Calculators | IV, Tablet & mg to mL",
    description: "Free medication dose calculators for nurses and clinicians: mg to mL, tablet dosage, IV drip rates, dilutions, BSA, IBW, and Cockcroft-Gault CrCl.",
    url: "https://www.medmaths.com/",
    siteName: "MedMaths",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary",
    title: "Medication Dose Calculators | IV, Tablet & mg to mL",
    description: "Free medication dose calculators for nurses and clinicians: mg to mL, tablet dosage, IV drip rates, dilutions, BSA, IBW, and Cockcroft-Gault CrCl.",
  },
}

export default function HomePage() {
  return (
    <>
      <JsonLdSchema schema={generateWebsiteSchema()} />
      <JsonLdSchema schema={generateOrganizationSchema()} />
      <ClientPage />
    </>
  )
}
