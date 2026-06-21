import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Contact MedMaths | Calculator Feedback & Corrections",
  description: "Contact MedMaths to suggest a calculator, report a formula issue, or request a correction to medication maths content.",
  keywords: ["MedMaths contact"],
  authors: [{ name: "George Lambroglou, RN", url: "https://www.medmaths.com/about" }],
  creator: "George Lambroglou, RN",
  publisher: "MedMaths",
  alternates: { canonical: "https://www.medmaths.com/contact" },
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
    title: "Contact MedMaths | Calculator Feedback & Corrections",
    description: "Contact MedMaths to suggest a calculator, report a formula issue, or request a correction to medication maths content.",
    url: "https://www.medmaths.com/contact",
    siteName: "MedMaths",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary",
    title: "Contact MedMaths | Calculator Feedback & Corrections",
    description: "Contact MedMaths to suggest a calculator, report a formula issue, or request a correction to medication maths content.",
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
      <div className="flex-1">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-muted-foreground mb-8">
              Have questions or feedback? We'd love to hear from you. Send us a message and we'll respond as soon as
              possible.
            </p>

            <div className="bg-muted rounded-lg p-8 space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-sm text-muted-foreground">
                  For all inquiries:{" "}
                  <a href="mailto:medmaths.calc@gmail.com" className="text-primary hover:underline">
                    medmaths.calc@gmail.com
                  </a>
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Response Time</h3>
                <p className="text-sm text-muted-foreground">
                  We aim to respond to all inquiries within 48 hours during business days.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Types of Inquiries</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Calculator improvements or feature requests</li>
                  <li>• Bug reports or technical issues</li>
                  <li>• Content feedback or corrections</li>
                  <li>• Partnership or collaboration opportunities</li>
                  <li>• Privacy and data concerns</li>
                </ul>
              </div>

              <div className="pt-4">
                <Button asChild>
                  <a href="mailto:medmaths.calc@gmail.com">Send Email</a>
                </Button>
              </div>
            </div>

            <div className="mt-12 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Medical Emergency?</h3>
              <p className="text-sm">
                If this is an emergency, call your local emergency number (e.g., 000 AU / 911 US) or go to your nearest
                emergency department.
              </p>
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
