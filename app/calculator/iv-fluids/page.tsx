import { IVFluidsCategoryClient } from "./client"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "IV Fluid Calculators | Drip Rate & Infusion Time",
  description:
    "Browse IV fluid calculators for mL/hr, gtt/min, total volume, infusion duration, and clock finish time. Choose the tool that matches the known values.",
  keywords: [
    "IV drip rate calculator",
    "mL/hr to gtt/min calculator",
    "gtt/min to mL/hr calculator",
    "drops per minute calculator",
    "drop factor calculator",
    "infusion time calculator",
    "IV flow rate formula",
    "nursing IV calculations",
  ],
  authors: [{ name: "George Lambroglou, RN", url: "https://www.medmaths.com/about" }],
  creator: "George Lambroglou, RN",
  publisher: "MedMaths",
  alternates: { canonical: "https://www.medmaths.com/calculator/iv-fluids" },
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
    title: "IV Fluid Calculators | Drip Rate & Infusion Time",
    description:
      "Convert IV rates between mL/hr and drops per minute, calculate infusion time, and learn the drop factor formulas used in nursing IV calculations.",
    url: "https://www.medmaths.com/calculator/iv-fluids",
    siteName: "MedMaths",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary",
    title: "IV Fluid Calculators | Drip Rate & Infusion Time",
    description:
      "Convert IV rates between mL/hr and gtt/min, calculate infusion time, and learn the drop factor formulas used in nursing IV calculations.",
  },
}

export default function IVFluidsPage() {
  return <IVFluidsCategoryClient />
}
