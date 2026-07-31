import type { Metadata } from "next"
import Link from "next/link"
import { BadgeCheck, BookOpenCheck, CalendarClock, MessageSquareWarning, UserRoundCheck } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Editorial Policy | MedMaths Formula Review Process",
  description:
    "How MedMaths selects formulas, writes calculator content, checks references, handles updates, and responds to correction requests.",
  alternates: { canonical: "https://www.medmaths.com/editorial-policy" },
  robots: { index: true, follow: true },
}

const policySections = [
  {
    icon: UserRoundCheck,
    title: "Authorship and review labels",
    paragraphs: [
      "Each calculator or topic page identifies its author and the date it was last reviewed. A named clinical reviewer is displayed only when a separate person has completed that review.",
      "A last-reviewed date means the page content, formula presentation, examples, links, and safety wording were checked at that time. It does not mean the calculator replaces current medicine-specific guidance.",
    ],
  },
  {
    icon: BookOpenCheck,
    title: "Sources and formula references",
    paragraphs: [
      "Recognised equations are checked against primary publications, professional guidance, government or health-service resources, university education material, open textbooks, or other authoritative references where practical.",
      "References are selected to show the calculation method transparently. The source list does not turn a general arithmetic calculator into a medicine-specific prescribing or administration protocol.",
    ],
  },
  {
    icon: BadgeCheck,
    title: "Calculation and safety checks",
    paragraphs: [
      "Calculator changes are tested with known input-and-output cases, unit checks, invalid-input checks, and review of the displayed working. Higher-risk areas receive additional prompts for issues such as concentration, drop factor, dose frequency, measurement limits, or final-volume meaning.",
      "Safety text is written to clarify what remains outside the calculator, including patient assessment, maximum doses, contraindications, compatibility, stability, route, technique, local policy, and independent double checks.",
    ],
  },
  {
    icon: CalendarClock,
    title: "Updates and review timing",
    paragraphs: [
      "Pages are reviewed when a calculator is rebuilt, a formula or explanation changes, a material source is updated, or a reported issue requires correction. Review dates are updated only when the page has actually been checked.",
      "There is no claim that every linked external page is continuously monitored. Broken or changed sources are corrected when identified.",
    ],
  },
  {
    icon: MessageSquareWarning,
    title: "Corrections and concerns",
    paragraphs: [
      "Reports of incorrect arithmetic, unclear wording, unsafe presentation, broken links, or accessibility problems are prioritised. A calculator may be amended or temporarily removed when a material issue cannot be resolved immediately.",
      "To report a concern, include the calculator name, the values entered, the result shown, the expected result, and the reference or reasoning supporting the correction.",
    ],
  },
]

export default function EditorialPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
          <header className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-8 sm:px-8 sm:py-10">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-600">Content governance</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl">Editorial Policy</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-700">
              This policy explains how MedMaths calculator pages are written, sourced, reviewed, dated, tested, and corrected.
            </p>
            <p className="mt-4 text-sm font-semibold text-gray-600">Last reviewed: 11 July 2026</p>
          </header>

          <div className="mt-8 space-y-5">
            {policySections.map(({ icon: Icon, title, paragraphs }) => (
              <section key={title} className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-7">
                <div className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-950">{title}</h2>
                    <div className="mt-3 space-y-3 leading-7 text-gray-700">
                      {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>

          <section className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
            <h2 className="text-xl font-bold text-amber-950">Medical safety position</h2>
            <p className="mt-3 text-sm leading-6 text-amber-950">
              MedMaths provides calculation support and education. It does not prescribe medicines, validate orders, choose a preparation method, confirm patient suitability, or replace current product information, clinical references, pharmacy advice, local policy, and professional judgement.
            </p>
          </section>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="rounded-full bg-cyan-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-cyan-800">Report a content issue</Link>
            <Link href="/disclaimer" className="rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 hover:border-gray-500">Read the medical disclaimer</Link>
            <Link href="/about" className="rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 hover:border-gray-500">About the author</Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
