import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy | MedMaths",
  description: "Read how MedMaths handles privacy, analytics, cookies, advertising, and calculator input privacy.",
  keywords: ["MedMaths privacy policy"],
  authors: [{ name: "George Lambroglou, RN", url: "https://www.medmaths.com/about" }],
  creator: "George Lambroglou, RN",
  publisher: "MedMaths",
  alternates: { canonical: "https://www.medmaths.com/privacy" },
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
    title: "Privacy Policy | MedMaths",
    description: "Read how MedMaths handles privacy, analytics, cookies, advertising, and calculator input privacy.",
    url: "https://www.medmaths.com/privacy",
    siteName: "MedMaths",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | MedMaths",
    description: "Read how MedMaths handles privacy, analytics, cookies, advertising, and calculator input privacy.",
  },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
      <div className="flex-1">
        <div className="container mx-auto px-4 py-20">
          <div className="prose prose-sm dark:prose-invert max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

            <p className="text-muted-foreground mb-6">
              Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
            <p>
              MedMaths ("we," "us," "our," or "Company") operates the medmaths.com website. This Privacy Policy explains
              how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. Information We Collect</h2>
            <p>
              We may collect information about you in a variety of ways. The information we may collect on our Site
              includes:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Personal Data:</strong> Voluntarily provided information such as name, email, and inquiries
                through contact forms.
              </li>
              <li>
                <strong>Automatic Data:</strong> Information automatically collected including IP address, browser type,
                operating system, pages visited, and referring URL through Google Analytics cookies.
              </li>
              <li>
                <strong>Calculator Data:</strong> Inputs you provide to medical calculators are processed locally in
                your browser and are NOT transmitted to or stored on our servers. We do not collect, store, or have
                access to any patient data or clinical information you enter into calculators.
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">3. Use of Information</h2>
            <p>
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized
              experience. Specifically, we may use information collected about you via our Site to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Generate analytics and improve website functionality</li>
              <li>Respond to inquiries and customer support requests</li>
              <li>Provide personalized content recommendations</li>
              <li>Monitor website security and prevent fraud</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">4. Disclosure of Information</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share information with
              service providers who assist in operating our website and conducting our business, subject to strict
              confidentiality agreements.
            </p>
            <p className="mt-4">
              We may disclose your information when required by law or to protect our rights and safety.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">5. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies to enhance your experience on our Site. You can instruct your browser to refuse all cookies
              or indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use
              some portions of our Site.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">6. Third-Party Analytics</h2>
            <p>
              We use Google Analytics to track website traffic and user behavior. Google Analytics collects information
              such as your IP address, browser type, pages visited, and time spent on our Site. For more information,
              please review Google's Privacy Policy.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">7. Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information
              against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission
              over the Internet is 100% secure.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">8. Your Rights</h2>
            <p>Depending on your location, you may have certain rights regarding your personal data, including:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Right to access your data</li>
              <li>Right to correct inaccurate data</li>
              <li>Right to delete your data</li>
              <li>Right to opt-out of data processing</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, please contact us using the information provided in the Contact section.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">9. Data Protection Regulations</h2>
            <p>
              We aim to comply with major data protection regulations including the General Data Protection Regulation
              (GDPR) for EU users and the California Consumer Privacy Act (CCPA) for California residents. Our practices
              include:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Calculator inputs are processed locally and not stored by us</li>
              <li>We collect minimal personal data (only voluntary contact form submissions)</li>
              <li>Google Analytics collects anonymous traffic and usage data</li>
              <li>You can opt out of analytics through browser settings or ad blockers</li>
              <li>We respect user rights to access, correct, or delete personal data we hold</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">10. Important: Do Not Enter PHI</h2>
            <p>
              <strong>Do not enter identifying patient information (Protected Health Information/PHI)</strong> into our
              calculators. This includes patient names, medical record numbers, dates of birth, or any other identifying
              information. Our calculators are designed to work with clinical parameters only (e.g., weight, lab values,
              vital signs).
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">11. Children's Privacy</h2>
            <p>
              MedMaths does not knowingly collect information from children under the age of 13. If we become aware that
              a child under 13 has provided us with personal information, we will promptly delete such information and
              terminate the child's account.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">12. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices and applicable
              laws. We will notify you of material changes by updating the "Last updated" date of this Privacy Policy.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">13. Contact Us</h2>
            <p>If you have questions about this Privacy Policy or our privacy practices, please contact us at:</p>
            <div className="bg-muted p-4 rounded-lg mt-4 space-y-2">
              <p>
                <strong>Email:</strong> medmaths.calc@gmail.com
              </p>
              <p>
                <strong>Website:</strong>{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  Contact Form
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
