import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Terms of Service | MedMaths",
  description: "Terms of service for using MedMaths educational medical maths calculators.",
  alternates: { canonical: "https://www.medmaths.com/terms" },
  robots: { index: true, follow: true },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container mx-auto max-w-3xl px-4 py-20 pt-28">
          <h1 className="mb-6 text-4xl font-bold">Terms of Service</h1>
          <p className="mb-8 text-muted-foreground">
            By using MedMaths, you agree to use the calculators as educational arithmetic tools only.
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Educational use only</h2>
            <p>
              MedMaths provides medical maths calculators, examples, and formula explanations for education and calculation support. The site does not provide medical advice, prescribe medicines, validate medication orders, or replace professional judgement.
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-2xl font-bold">User responsibility</h2>
            <p>
              You are responsible for checking inputs, units, formula selection, medication labels, clinical references, local policies, and independent-check requirements. Do not rely on MedMaths as the sole source for clinical decisions.
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-2xl font-bold">No warranty</h2>
            <p>
              MedMaths is provided on an as-is basis. While care is taken to make calculators clear and useful, errors, omissions, or technical issues may occur.
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-2xl font-bold">Related policies</h2>
            <p>
              Read the <Link href="/disclaimer" className="text-primary hover:underline">medical disclaimer</Link>, <Link href="/privacy" className="text-primary hover:underline">privacy policy</Link>, and <Link href="/editorial-policy" className="text-primary hover:underline">editorial policy</Link> for more information.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
