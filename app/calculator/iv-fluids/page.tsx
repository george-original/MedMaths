import { IVFluidsCategoryClient } from "./client"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "IV Drip Rate Calculators | mL/hr & gtt/min",
  description: "IV drip rate calculators for mL/hr to gtt/min, drops per minute to mL/hr, and infusion time using volume, time, rate, and drop factor.",
  keywords: ["IV drip rate calculator", "drops per minute calculator", "gtt/min calculator", "mL/hr calculator", "infusion time calculator"],
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
    title: "IV Drip Rate Calculators | mL/hr & gtt/min",
    description: "IV drip rate calculators for mL/hr to gtt/min, drops per minute to mL/hr, and infusion time using volume, time, rate, and drop factor.",
    url: "https://www.medmaths.com/calculator/iv-fluids",
    siteName: "MedMaths",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary",
    title: "IV Drip Rate Calculators | mL/hr & gtt/min",
    description: "IV drip rate calculators for mL/hr to gtt/min, drops per minute to mL/hr, and infusion time using volume, time, rate, and drop factor.",
  },
}

export default function IVFluidsPage() {
  return <IVFluidsCategoryClient />
}
