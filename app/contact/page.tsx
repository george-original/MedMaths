import type { Metadata } from "next"
import Link from "next/link"
import { AlertTriangle, Bug, Calculator, Mail, ShieldAlert } from "lucide-react"
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

const reportItems = [
  { icon: Calculator, title: "Formula or result issue", text: "Include the calculator, values entered, result shown, expected result, and your supporting calculation or reference." },
  { icon: ShieldAlert, title: "Safety or wording concern", text: "Describe the warning, instruction, or visual that may be unclear, misleading, or unsafe." },
  { icon: Bug, title: "Technical problem", text: "Include the page, device, browser, and what happened. A screenshot is useful when available." },
]

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
          <header>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-700">Feedback and corrections</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl">Contact MedMaths</h1>
            <p className="mt-4 text-lg leading-8 text-gray-700">
              Report a calculation issue, unclear safety message, broken link, accessibility problem, or idea for improving the calculator library.
            </p>
          </header>

          <section className="mt-8 rounded-2xl border border-cyan-200 bg-cyan-50 p-5 sm:p-7">
            <div className="flex items-start gap-3">
              <Mail className="mt-1 size-5 shrink-0 text-cyan-700" aria-hidden="true" />
              <div>
                <h2 className="text-xl font-bold text-gray-950">Email</h2>
                <a href="mailto:medmaths.calc@gmail.com" className="mt-2 inline-block font-semibold text-cyan-800 underline underline-offset-4">medmaths.calc@gmail.com</a>
                <p className="mt-2 text-sm leading-6 text-gray-700">Messages are reviewed as soon as practical. Safety-critical calculator reports are prioritised.</p>
                <Button asChild className="mt-4 rounded-full">
                  <a href="mailto:medmaths.calc@gmail.com?subject=MedMaths%20feedback">Send email</a>
                </Button>
              </div>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold text-gray-950">What to include</h2>
            <div className="mt-4 space-y-4">
              {reportItems.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-5">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-700"><Icon className="size-5" aria-hidden="true" /></div>
                  <div><h3 className="font-bold text-gray-950">{title}</h3><p className="mt-1 text-sm leading-6 text-gray-700">{text}</p></div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-800" aria-hidden="true" />
              <div>
                <h2 className="font-bold text-amber-950">Medical emergency</h2>
                <p className="mt-2 text-sm leading-6 text-amber-950">
                  MedMaths does not provide emergency assistance. In Australia, call Triple Zero (000) for a serious or urgent emergency. Outside Australia, use your local emergency number.
                </p>
              </div>
            </div>
          </section>

          <p className="mt-8 text-sm leading-6 text-gray-600">
            Read the <Link href="/editorial-policy" className="font-semibold text-cyan-700 hover:underline">editorial policy</Link> for the correction process and the <Link href="/disclaimer" className="font-semibold text-cyan-700 hover:underline">medical disclaimer</Link> for limits of use.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
