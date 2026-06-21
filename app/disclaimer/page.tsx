import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Medical Disclaimer | MedMaths Calculators",
  description: "Medical disclaimer for MedMaths medication maths calculators. Use for education and arithmetic support only, not as a substitute for clinical judgement.",
  keywords: ["MedMaths medical disclaimer"],
  authors: [{ name: "George Lambroglou, RN", url: "https://www.medmaths.com/about" }],
  creator: "George Lambroglou, RN",
  publisher: "MedMaths",
  alternates: { canonical: "https://www.medmaths.com/disclaimer" },
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
    title: "Medical Disclaimer | MedMaths Calculators",
    description: "Medical disclaimer for MedMaths medication maths calculators. Use for education and arithmetic support only, not as a substitute for clinical judgement.",
    url: "https://www.medmaths.com/disclaimer",
    siteName: "MedMaths",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary",
    title: "Medical Disclaimer | MedMaths Calculators",
    description: "Medical disclaimer for MedMaths medication maths calculators. Use for education and arithmetic support only, not as a substitute for clinical judgement.",
  },
}

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
      <div className="flex-1">
        <div className="container mx-auto px-4 py-20">
          <div className="prose prose-sm dark:prose-invert max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Medical Disclaimer</h1>

            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 mb-8">
              <p className="font-bold text-lg mb-4">IMPORTANT - PLEASE READ CAREFULLY</p>
              <p className="text-sm">
                The information, calculators, and educational content provided on MedMaths (medmaths.com) are for
                informational and educational purposes only and are not intended to replace professional medical advice,
                diagnosis, or treatment.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">1. Not Medical Advice</h2>
            <p>
              Nothing on this website constitutes professional medical advice, diagnosis, prognosis, or treatment. The
              calculators and information provided are educational tools designed to support healthcare professionals
              and students. They should not be used to make clinical decisions without professional supervision.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. Always Consult Healthcare Professionals</h2>
            <p>
              Always consult with a qualified healthcare professional (physician, nurse, pharmacist, or other licensed
              practitioner) before:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Starting or changing any medication or treatment</li>
              <li>Making any clinical decision based on calculator results</li>
              <li>Acting on any health information obtained from this website</li>
              <li>Self-diagnosing or self-treating medical conditions</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">3. Accuracy and Limitations</h2>
            <p>While we strive to ensure the accuracy of our calculators:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Mathematical errors or computational mistakes may occur</li>
              <li>Clinical formulas change and may be outdated</li>
              <li>Results should be verified with current clinical guidelines</li>
              <li>Individual patient factors may not be fully accounted for</li>
              <li>We do not guarantee accuracy, completeness, or timeliness of information</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">4. Individual Variation</h2>
            <p>
              Medical calculations often involve population-based formulas that may not account for individual patient
              variations. Clinical judgment and professional assessment are essential when applying calculator results
              to patient care.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">5. Emergency Situations</h2>
            <p>
              If you are experiencing a medical emergency, please call emergency services (911 in the US) or go to the
              nearest emergency department immediately. Do not rely on this website for emergency medical assistance.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">6. No Liability</h2>
            <p>
              MedMaths and its creators, developers, and distributors assume no liability for any direct or indirect
              damages, injuries, or losses resulting from the use or misuse of information, calculators, or content on
              this website. Users assume all responsibility for their use of this website and all its content.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">7. Drug Administration</h2>
            <p>
              Never administer medications or treatments based solely on calculator results. Always verify doses,
              routes, and frequencies with:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Current institutional protocols and guidelines</li>
              <li>Prescribing information and package inserts</li>
              <li>Qualified healthcare professionals</li>
              <li>Clinical pharmacy resources</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">8. For Healthcare Professionals Only</h2>
            <p>
              While our website is accessible to the public, some calculators are specifically designed for use by
              licensed healthcare professionals. Lay users should only use calculators designated as educational tools
              and should consult with healthcare providers before taking any action based on results.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">9. Third-Party Links</h2>
            <p>
              We do not endorse and are not responsible for the content, accuracy, or practices of any external websites
              or resources linked to from MedMaths.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">10. Changes to Disclaimer</h2>
            <p>This disclaimer may be updated at any time without notice. Please review it regularly for changes.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
            <p>
              If you have questions about this disclaimer or our medical content, please contact us at:
              support@medmaths.com
            </p>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
