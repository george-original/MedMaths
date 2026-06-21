import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FAQAccordion } from "@/components/faq-accordion"
import C1V1C2V2BasicClient from "./c1v1-c2v2-basic-client"

const CANONICAL_URL = "https://www.medmaths.com/calculator/dilutions/c1v1-c2v2-basic"

export const metadata: Metadata = {
  title: "C1V1=C2V2 Calculator | Dilution Formula Solver",
  description: "Solve C1V1=C2V2 dilution formula problems for concentration or volume. Includes final volume, stock volume, formula, and examples.",
  keywords: ["C1V1 C2V2 calculator", "dilution calculator", "C1V1 C2V2 formula", "concentration volume calculator", "stock dilution calculator", "c1v1", "c2v2", "dilution equation", "stock concentration", "final concentration"],
  authors: [{ name: "George Lambroglou, RN", url: "https://www.medmaths.com/about" }],
  creator: "George Lambroglou, RN",
  publisher: "MedMaths",
  alternates: { canonical: "https://www.medmaths.com/calculator/dilutions/c1v1-c2v2-basic" },
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
    title: "C1V1=C2V2 Calculator | Dilution Formula Solver",
    description: "Solve C1V1=C2V2 dilution formula problems for concentration or volume. Includes final volume, stock volume, formula, and examples.",
    url: "https://www.medmaths.com/calculator/dilutions/c1v1-c2v2-basic",
    siteName: "MedMaths",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary",
    title: "C1V1=C2V2 Calculator | Dilution Formula Solver",
    description: "Solve C1V1=C2V2 dilution formula problems for concentration or volume. Includes final volume, stock volume, formula, and examples.",
  },
}

export default function C1V1C2V2Page() {
  const faqItems = [
    {
      question: "What does C1V1 = C2V2 mean?",
      quickAnswer:
        "It’s a dilution equation: concentration × volume before dilution equals concentration × volume after dilution (the solute amount stays the same).",
      details: [
        "C1 = starting (stock) concentration",
        "V1 = starting (stock) volume used",
        "C2 = final (target) concentration",
        "V2 = final total volume (stock + diluent)",
        "You can solve for whichever variable is unknown if the other three are known",
      ],
      microExample: "If you increase the final volume, the concentration decreases (assuming solute stays the same).",
    },
    {
      question: "Do I use final volume or diluent volume?",
      quickAnswer: "Always use final total volume (V2), not the diluent volume. Diluent = V2 − V1.",
      details: [
        "V2 is the total volume after dilution (what’s in the syringe/bag/container at the end)",
        "Diluent volume is just the amount added",
        "Common error: using diluent volume in place of V2",
        "Label your final product with both final volume and final concentration",
      ],
      microExample: "If you have 5 mL stock and add 45 mL diluent → V2 = 50 mL (not 45 mL).",
    },
    {
      question: "Do C1 and C2 have to use the same units?",
      quickAnswer: "Yes. C1 and C2 must be in the same units, and V1 and V2 must be in the same volume units.",
      details: [
        "Any unit works (mg/mL, IU/mL, %, etc.)",
        "But C1 and C2 must match (e.g., mg/mL with mg/mL)",
        "And V1 and V2 must match (e.g., mL with mL)",
        "Convert before calculating if units differ (e.g., mg/L → mg/mL)",
      ],
      microExample: "1 mg/mL = 1000 mg/L (same concentration, different unit scale).",
    },
    {
      question: "Why does my answer look wrong or negative?",
      quickAnswer:
        "Most often it’s a unit mismatch or the inputs describe a concentration (not a dilution) — check that C2 is not higher than C1 for a dilution.",
      details: [
        "Dilution decreases concentration: usually C2 should be less than C1",
        "If C2 > C1, you’re trying to ‘dilute up’ (that’s concentrating)",
        "Confirm you used final total volume (V2), not diluent volume",
        "Check you didn’t swap C1/C2 or V1/V2",
        "Use the working-out section to verify step-by-step",
      ],
      microExample: "If C1 = 10 and C2 = 20, dilution can’t achieve that (C2 is higher).",
    },
    {
      question: "Which variable should I solve for?",
      quickAnswer:
        "Identify the one unknown value. Then rearrange C1V1 = C2V2 to isolate the unknown (or use this calculator).",
      details: [
        "Solve V1: V1 = (C2 × V2) ÷ C1",
        "Solve V2: V2 = (C1 × V1) ÷ C2",
        "Solve C1: C1 = (C2 × V2) ÷ V1",
        "Solve C2: C2 = (C1 × V1) ÷ V2",
      ],
      microExample: "If you know C1, V1, and V2 — solve for C2.",
    },
    {
      question: "Does temperature or density matter?",
      quickAnswer:
        "For bedside medication prep, C1V1=C2V2 is a practical approximation — always follow product instructions and local policy.",
      details: [
        "In strict lab chemistry, density and temperature can affect volumes slightly",
        "In clinical practice, the equation is widely used and appropriate for typical dilution math",
        "Always follow manufacturer advice for reconstitution/dilution specifics",
        "When unsure, consult pharmacy",
      ],
      microExample: "Some meds specify exact diluents and final concentrations—follow the monograph.",
    },
  ]

  const breadcrumbs = [
    { name: "Home", url: "https://www.medmaths.com" },
    { name: "Calculators", url: "https://www.medmaths.com/calculators" },
    { name: "Dilutions", url: "https://www.medmaths.com/calculator/dilutions" },
    { name: "C1V1 = C2V2", url: CANONICAL_URL },
  ]

  return (
    <>
      {/* JSON-LD: Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: breadcrumbs.map((b, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: b.name,
              item: b.url,
            })),
          }),
        }}
      />

      {/* JSON-LD: FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.quickAnswer },
            })),
          }),
        }}
      />

      {/* JSON-LD: WebApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "C1V1 = C2V2 Dilution Calculator",
            description:
              "Use the C1V1=C2V2 dilution equation to solve for concentration or volume (C1, C2, V1, or V2) with worked examples and FAQs.",
            applicationCategory: "HealthApplication",
            operatingSystem: "All",
            url: CANONICAL_URL,
          }),
        }}
      />

      <SiteHeader />

      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-3xl px-4 pb-12 pt-4 sm:px-6 sm:py-12 lg:px-8 lg:pt-10">
          {/* Breadcrumb navigation */}
          <nav className="mb-4 hidden text-sm text-gray-500 sm:block">
            <Link href="/" className="hover:text-gray-700">
              Home
            </Link>
            {" / "}
            <Link href="/calculators" className="hover:text-gray-700">
              Calculators
            </Link>
            {" / "}
            <Link href="/calculator/dilutions" className="hover:text-gray-700">
              Dilutions
            </Link>
            {" / "}
            <span className="text-gray-900">C1V1 = C2V2</span>
          </nav>

          <h1 className="mb-2 text-3xl font-bold sm:text-4xl tracking-tight text-gray-900 text-center">
            C1V1 = C2V2 Dilution Calculator
          </h1>

          {/* Calculator */}
          <section id="calculator" className="calculator-tool mb-8 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-8">
            <C1V1C2V2BasicClient />
            <p className="mt-6 text-xs text-gray-500 text-center">
              Educational use only. Always interpret results in clinical context and verify with local policies.
            </p>
          </section>
          <p className="mb-4 text-center text-xs text-gray-500">
            Written by <span className="font-semibold text-gray-700">George Lambroglou, RN</span> • Formula checked against listed references • Last reviewed 21 Jun 2026
          </p>
          <p className="mb-8 text-lg text-gray-600 text-center">
            Solve the dilution equation for the missing concentration or volume. Enter the three known values and choose
            what you want to calculate.
          </p>

          <div className="mb-8 flex flex-wrap gap-3 text-center justify-center">
            <span className="text-sm text-gray-600">Jump to:</span>
            <a href="#calculator" className="text-purple-600 hover:text-purple-700 font-medium text-sm">
              Calculator
            </a>
            <span className="text-gray-300">|</span>
            <a href="#how-it-works" className="text-purple-600 hover:text-purple-700 font-medium text-sm">
              How it works
            </a>
            <span className="text-gray-300">|</span>
            <a href="#formula" className="text-purple-600 hover:text-purple-700 font-medium text-sm">
              Formula
            </a>
            <span className="text-gray-300">|</span>
            <a href="#examples" className="text-purple-600 hover:text-purple-700 font-medium text-sm">
              Examples
            </a>
            <span className="text-gray-300">|</span>
            <a href="#test-questions" className="text-purple-600 hover:text-purple-700 font-medium text-sm">
              Test questions
            </a>
            <span className="text-gray-300">|</span>
            <a href="#faqs" className="text-purple-600 hover:text-purple-700 font-medium text-sm">
              FAQs
            </a>
            <span className="text-gray-300">|</span>
            <a href="#references" className="text-purple-600 hover:text-purple-700 font-medium text-sm">
              References & Further Reading
            </a>
          </div>


          <section id="how-it-works" className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">How C1V1 = C2V2 Works</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                The C1V1=C2V2 equation represents conservation of solute: the amount of drug/solute before dilution
                equals the amount after dilution. When you add diluent, you increase the final volume (V2), so the final
                concentration (C2) decreases.
              </p>
              <p>
                Key safety point: use <span className="font-semibold text-gray-900">final total volume</span> (V2) — not
                the volume of diluent added. Diluent volume is calculated separately as V2 − V1.
              </p>

              {/* Minimal SEO/education block (keeps layout the same, matches purple skin) */}
              <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 text-sm text-purple-900">
                <p className="font-semibold">Quick checks (avoid the classic errors):</p>
                <ul className="mt-2 list-disc pl-5 space-y-1">
                  <li>
                    C1 and C2 must be the <span className="font-semibold">same concentration units</span> (convert first if needed).
                  </li>
                  <li>
                    V1 and V2 must be the <span className="font-semibold">same volume units</span>.
                  </li>
                  <li>
                    For a typical dilution, <span className="font-semibold">C2 should be lower than C1</span>.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section id="formula" className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">Formula</h2>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-700 text-center">
              <div>C1 × V1 = C2 × V2</div>
            </div>
          </section>

          <section id="examples" className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">Worked Examples</h2>

            <div className="space-y-6">
              {/* Example 1 */}
              <div>
                <div className="mb-4 rounded-lg border-l-4 border-purple-500 bg-amber-50 p-4">
                  <p className="font-semibold text-gray-900">
                    Example 1: You have 10 mg/mL stock. You want 1 mg/mL in a final volume of 50 mL. What volume (V1) of
                    stock do you need?
                  </p>
                </div>

                <div className="mb-3 rounded-lg bg-gray-50 p-4 font-mono text-sm text-gray-700 text-center">
                  10 × V1 = 1 × 50
                  <br />
                  V1 = 50 ÷ 10 = 5 mL
                  <br />
                  Diluent = 50 − 5 = 45 mL
                </div>

                <div className="mt-3 rounded-lg bg-purple-50 p-3 text-sm font-semibold text-gray-900 text-center">
                  Answer: 5 mL stock + 45 mL diluent = 50 mL at 1 mg/mL
                </div>
              </div>

              {/* Example 2 */}
              <div>
                <div className="mb-4 rounded-lg border-l-4 border-purple-500 bg-amber-50 p-4">
                  <p className="font-semibold text-gray-900">
                    Example 2: You take 20 mL of 5 mg/mL solution. What concentration (C2) do you get if you make it up
                    to 100 mL?
                  </p>
                </div>

                <div className="mb-3 rounded-lg bg-gray-50 p-4 font-mono text-sm text-gray-700 text-center">
                  5 × 20 = C2 × 100
                  <br />
                  C2 = (5 × 20) ÷ 100 = 1 mg/mL
                </div>

                <div className="mt-3 rounded-lg bg-purple-50 p-3 text-sm font-semibold text-gray-900 text-center">
                  Answer: 1 mg/mL
                </div>
              </div>
            </div>
          </section>

          {/* Test questions (ADDED — minimal + purple answers) */}
          <section id="test-questions" className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">Test questions</h2>
            <p className="mb-6 text-gray-600 text-center">
              Quick practice checks to reinforce setup and avoid the most common C1V1=C2V2 mistakes (education only).
            </p>

            <div className="space-y-4">
              {[
                {
                  q: "1) In C1V1=C2V2, what does V2 represent?",
                  a: "V2 is the final total volume after mixing (stock + diluent).",
                },
                {
                  q: "2) True/False: C1 can be in mg/L while C2 is in mg/mL if you’re careful.",
                  a: "False. C1 and C2 must be the same concentration units before you calculate.",
                },
                {
                  q: "3) If C1=8 mg/mL, V1=10 mL, and V2=40 mL — what is C2?",
                  a: "C2=(C1×V1)/V2=(8×10)/40=2 mg/mL.",
                },
                {
                  q: "4) If C1=20 mg/mL, C2=5 mg/mL, V2=60 mL — what is V1?",
                  a: "V1=(C2×V2)/C1=(5×60)/20=15 mL.",
                },
                {
                  q: "5) Using Q4, how much diluent is added?",
                  a: "Diluent = V2 − V1 = 60 − 15 = 45 mL.",
                },
                {
                  q: "6) Sanity check: for a typical dilution where C2 < C1, should V1 be smaller than V2?",
                  a: "Yes. V1 should be smaller than V2 for a dilution.",
                },
                {
                  q: "7) If your calculator shows negative diluent, what’s the first thing you check?",
                  a: "Unit mismatch or that you accidentally entered diluent volume instead of final total volume (V2), or that C2 > C1.",
                },
                {
                  q: "8) Can dilution achieve a higher concentration target (C2 > C1) by adding diluent?",
                  a: "No. Adding diluent can only reduce concentration.",
                },
              ].map((item) => (
                <details key={item.q} className="rounded-lg border border-gray-200 bg-white p-4">
                  <summary className="cursor-pointer font-medium text-gray-900">{item.q}</summary>
                  <div className="mt-3 rounded-lg bg-purple-50 p-3 text-sm text-gray-900">
                    <span className="font-semibold">Answer:</span> {item.a}
                  </div>
                </details>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">When This Is Used</h2>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-purple-600 font-bold mt-1">•</span>
                <span className="text-gray-700">Preparing diluted solutions from concentrated stock</span>
              </li>
              <li className="flex gap-3">
                <span className="text-purple-600 font-bold mt-1">•</span>
                <span className="text-gray-700">Adjusting medication concentrations for paediatric dosing</span>
              </li>
              <li className="flex gap-3">
                <span className="text-purple-600 font-bold mt-1">•</span>
                <span className="text-gray-700">Pharmacy compounding and aseptic preparation</span>
              </li>
              <li className="flex gap-3">
                <span className="text-purple-600 font-bold mt-1">•</span>
                <span className="text-gray-700">Double-checking dilution and concentration arithmetic</span>
              </li>
            </ul>
          </section>

          <section className="mb-12 rounded-lg border border-yellow-200 bg-yellow-50 p-6">
            <p className="text-sm text-gray-800">
              <span className="font-semibold">Clinical safety note:</span> Always confirm concentrations, units, and
              local protocols. Use independent double-checks for high-risk medications and small-volume dilutions.
            </p>
          </section>

          {/* Related calculators — unchanged (NO additions) */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">Related Calculators</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              <Link
                href="/calculator/dilutions/c1v1-c2v2-basic"
                className="rounded-lg border border-gray-200 bg-white p-4 hover:border-purple-300 hover:bg-purple-50 transition-colors"
              >
                <p className="font-medium text-gray-900 hover:text-purple-600">C1 → C2 Final Volume</p>
                <p className="text-xs text-gray-500 mt-1">Calculate V1 from C1/C2/V2</p>
              </Link>

              <Link
                href="/calculator/dilutions/c1v1-c2v2-basic"
                className="rounded-lg border border-gray-200 bg-white p-4 hover:border-purple-300 hover:bg-purple-50 transition-colors"
              >
                <p className="font-medium text-gray-900 hover:text-purple-600">Desired Concentration</p>
                <p className="text-xs text-gray-500 mt-1">Dose to final volume</p>
              </Link>

              <Link
                href="/calculator/dilutions"
                className="rounded-lg border border-gray-200 bg-white p-4 hover:border-purple-300 hover:bg-purple-50 transition-colors"
              >
                <p className="font-medium text-gray-900 hover:text-purple-600">All Dilution Calculators</p>
                <p className="text-xs text-gray-500 mt-1">Full dilutions library</p>
              </Link>
            </div>
          </section>

          <section id="faqs" className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">Frequently Asked Questions</h2>
            <FAQAccordion items={faqItems} />
          </section>

          {/* ✅ CLEAN RESOURCE-CARD REFERENCES (kept as you provided) */}
          <section id="references" className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 text-center">References & Further Reading</h2>
            <p className="mb-8 text-gray-600 text-center text-sm">
              This calculator is based on established dilution and pharmaceutical standards from authoritative sources
              across healthcare disciplines.
            </p>

            {/* International Standards */}
            <div className="mb-10">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">International Standards</h3>

              <div className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition-shadow">
                <a
                  href="https://www.bipm.org/documents/20126/54630884/SI-Prefixes.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start justify-between gap-4 group"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 group-hover:text-purple-600">
                      SI Prefixes (milli-, micro-, etc.)
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded ml-2">PDF</span>
                    </p>
                    <p className="text-sm text-gray-600 mt-1">BIPM (Bureau International des Poids et Mesures)</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Authoritative reference for metric prefixes used in unit conversions.
                    </p>
                  </div>
                  <span className="text-gray-400 group-hover:text-purple-600 text-lg mt-1">↗</span>
                </a>
              </div>
            </div>

            {/* Australia Resources */}
            <div className="mb-10">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Australia Resources</h3>

              <div className="space-y-3">
                <div className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition-shadow">
                  <a
                    href="https://students.flinders.edu.au/content/dam/student/slss/numeracy/drug-calcs.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between gap-4 group"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 group-hover:text-purple-600">
                        Drug Calculations <span className="text-xs bg-gray-100 px-2 py-1 rounded ml-2">PDF</span>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">Flinders University – Student Learning Support Service</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Shows the standard “volume required” method and worked examples used in healthcare training.
                      </p>
                    </div>
                    <span className="text-gray-400 group-hover:text-purple-600 text-lg mt-1">↗</span>
                  </a>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition-shadow">
                  <a
                    href="https://lor.usq.edu.au/usq/file/d7126477-43e3-402f-a988-e61a3dbe28ec/1/Medication_Calculation_2018.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between gap-4 group"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 group-hover:text-purple-600">
                        Medication Calculations <span className="text-xs bg-gray-100 px-2 py-1 rounded ml-2">PDF</span>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">University of Southern Queensland (USQ)</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Provides formula-based approaches consistent with dilution and dose-to-volume calculations.
                      </p>
                    </div>
                    <span className="text-gray-400 group-hover:text-purple-600 text-lg mt-1">↗</span>
                  </a>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition-shadow">
                  <a
                    href="https://learninglab.rmit.edu.au/nursing/finding-volume-required/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between gap-4 group"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 group-hover:text-purple-600">
                        Finding the Volume Required{" "}
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded ml-2">Web</span>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">RMIT Learning Lab (Nursing)</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Explains stock strength/stock volume concepts that underpin dilution calculations.
                      </p>
                    </div>
                    <span className="text-gray-400 group-hover:text-purple-600 text-lg mt-1">↗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* United Kingdom Resources */}
            <div className="mb-10">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">United Kingdom Resources</h3>

              <div className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition-shadow">
                <a
                  href="https://www.gloshospitals.nhs.uk/documents/2446/IV_Drug_Calculation_Test_practice_papers.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start justify-between gap-4 group"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 group-hover:text-purple-600">
                      Intravenous Drug and Fluid Administration Training{" "}
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded ml-2">PDF</span>
                    </p>
                    <p className="text-sm text-gray-600 mt-1">Gloucestershire Hospitals NHS Foundation Trust</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Includes practical calculation methods used in IV preparation and dilution scenarios.
                    </p>
                  </div>
                  <span className="text-gray-400 group-hover:text-purple-600 text-lg mt-1">↗</span>
                </a>
              </div>
            </div>

            {/* United States Resources */}
            <div className="mb-10">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">United States Resources</h3>

              <div className="space-y-3">
                <div className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition-shadow">
                  <a
                    href="https://www.upstate.edu/hr/document/med_calculations.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between gap-4 group"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 group-hover:text-purple-600">
                        Medication Calculations <span className="text-xs bg-gray-100 px-2 py-1 rounded ml-2">PDF</span>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">SUNY Upstate Medical University</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Explains ratio/proportion style approaches relevant to dilution and dose-to-volume problems.
                      </p>
                    </div>
                    <span className="text-gray-400 group-hover:text-purple-600 text-lg mt-1">↗</span>
                  </a>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition-shadow">
                  <a
                    href="https://www.ncbi.nlm.nih.gov/books/NBK560924/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between gap-4 group"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 group-hover:text-purple-600">
                        Pharmacy Calculations <span className="text-xs bg-gray-100 px-2 py-1 rounded ml-2">Web</span>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">NCBI Bookshelf (StatPearls Publishing)</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Covers solution/mixture calculation structures consistent with C1V1=C2V2 style dilution methods.
                      </p>
                    </div>
                    <span className="text-gray-400 group-hover:text-purple-600 text-lg mt-1">↗</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
              <p className="text-sm text-purple-900">
                <span className="font-semibold">Tip:</span> If your answer looks wrong, it’s almost always a unit mismatch
                (e.g., mg/mL vs mg/L) or using diluent volume instead of{" "}
                <span className="font-semibold">final total volume (V2)</span>.
              </p>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
