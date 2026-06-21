import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "About MedMaths | Medication Maths Built by an RN",
  description: "Learn about MedMaths, a focused medication maths calculator library built around dose conversions, tablet dosing, IV rates, dilutions, and renal dosing checks.",
  keywords: ["medication calculation website"],
  authors: [{ name: "George Lambroglou, RN", url: "https://www.medmaths.com/about" }],
  creator: "George Lambroglou, RN",
  publisher: "MedMaths",
  alternates: { canonical: "https://www.medmaths.com/about" },
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
    title: "About MedMaths | Medication Maths Built by an RN",
    description: "Learn about MedMaths, a focused medication maths calculator library built around dose conversions, tablet dosing, IV rates, dilutions, and renal dosing checks.",
    url: "https://www.medmaths.com/about",
    siteName: "MedMaths",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary",
    title: "About MedMaths | Medication Maths Built by an RN",
    description: "Learn about MedMaths, a focused medication maths calculator library built around dose conversions, tablet dosing, IV rates, dilutions, and renal dosing checks.",
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
      <div className="flex-1">
        <div className="container mx-auto px-4 py-20 pt-28">
          <div className="prose prose-sm dark:prose-invert max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">About MedMaths</h1>

            <h2 className="text-2xl font-bold mt-8 mb-4">What MedMaths is</h2>
            <p>
              MedMaths is a focused medication maths calculator site. It is built around high-value calculations such as mg to mL, tablet dosing, IV drip rates, infusion time, dilution maths, body-measure dosing support, and creatinine clearance.
            </p>
            <p>
              The aim is simple: help nurses, students, pharmacists, and clinicians check calculation arithmetic quickly, while still showing the formula and worked examples.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Why the calculator library is focused</h2>
            <p>
              MedMaths is not trying to become a broad medical calculator directory. There are already large sites for clinical scores and diagnostic decision tools. MedMaths is being tightened around medication calculation search intent because that is where the site can be clearest, safest, and most useful.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Core calculator groups</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Dose conversions, including mg to mL and units to mL</li>
              <li>Tablet and oral dosing calculations</li>
              <li>IV fluids, drip rates, mL/hr, gtt/min, and infusion time</li>
              <li>Dilution and reconstitution maths</li>
              <li>Dosing body measures, including BSA and ideal body weight</li>
              <li>Renal dosing support, including creatinine clearance</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">How content is written</h2>
            <p>
              Calculator pages should show the calculator, formula, examples, safety notes, and references where practical. Content should avoid making the site sound more authoritative than it is. When a page is written by one person, it should not imply separate independent review unless that review has actually occurred.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Privacy</h2>
            <p>
              Calculator inputs are processed in the browser and are not stored by MedMaths. Site analytics may be used to understand general traffic and improve pages, but calculator inputs should not be collected as patient data.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Editorial policy</h2>
            <p>
              The review process, correction approach, and source expectations are explained on the {" "}
              <Link href="/editorial-policy" className="text-primary hover:underline">
                Editorial Policy
              </Link>{" "}
              page.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Medical disclaimer</h2>
            <p>
              MedMaths provides educational calculators for calculation support only. These tools do not replace professional judgement, local policy, medication labels, pharmacy advice, independent double-check requirements, or clinical escalation.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Verify medication orders and product concentration</li>
              <li>Check local policies and high-risk medicine procedures</li>
              <li>Use independent double checks where required</li>
              <li>Seek senior, pharmacy, or prescriber advice when uncertain</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Contact</h2>
            <p>
              For corrections, suggestions, or feedback, please visit the {" "}
              <Link href="/contact" className="text-primary hover:underline">
                contact page
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
