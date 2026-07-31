import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Cookie Policy | MedMaths",
  description: "Cookie policy for MedMaths, including analytics, advertising, and local calculator input handling.",
  alternates: { canonical: "https://www.medmaths.com/cookies" },
  robots: { index: true, follow: true },
}

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container mx-auto max-w-3xl px-4 py-20 pt-28">
          <h1 className="mb-6 text-4xl font-bold">Cookie Policy</h1>
          <p className="mb-8 text-muted-foreground">
            This page explains how MedMaths may use cookies or similar technologies for site operation, analytics, and advertising.
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Calculator inputs</h2>
            <p>
              MedMaths calculator inputs are intended to be processed in the browser and not stored by MedMaths. Do not enter patient-identifying information into calculator fields.
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-2xl font-bold">Analytics and advertising</h2>
            <p>
              MedMaths may use analytics and advertising tools to understand general traffic patterns, improve calculator pages, and support the site. These tools may use cookies or similar technologies depending on your browser settings, location, consent choices, and third-party settings.
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-2xl font-bold">Managing cookies</h2>
            <p>
              You can manage or block cookies through your browser settings. Blocking some cookies may affect analytics, advertising, or some site features.
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-2xl font-bold">More information</h2>
            <p>
              Read the <Link href="/privacy" className="text-primary hover:underline">privacy policy</Link> or use the <Link href="/contact" className="text-primary hover:underline">contact page</Link> for questions.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
