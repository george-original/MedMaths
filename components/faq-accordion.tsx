"use client"

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface FAQItem {
  question: string
  quickAnswer: string
  details?: string[] // <-- make optional (some pages will forget it)
  microExample?: string
  relatedCalculators?: Array<{
    name: string
    href: string
  }>
}

interface FAQAccordionProps {
  items?: FAQItem[] // <-- make optional (some pages pass undefined)
  showProtocolNote?: boolean
}

export function FAQAccordion({ items, showProtocolNote = true }: FAQAccordionProps) {
  const safeItems: FAQItem[] = Array.isArray(items) ? items : []

  // If a page has no FAQs, don't crash the build.
  if (safeItems.length === 0) {
    return showProtocolNote ? (
      <div className="max-w-3xl mx-auto mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-slate-700">
          <span className="font-semibold">Clinical reminder:</span> Always follow local protocols and consult medication
          information sheets. These examples are for calculation practice only.
        </p>
      </div>
    ) : null
  }

  return (
    <div className="space-y-3 max-w-3xl mx-auto">
      <Accordion type="single" collapsible className="w-full">
        {safeItems.map((item, index) => {
          const safeDetails = Array.isArray(item.details) ? item.details : []
          const safeRelated = Array.isArray(item.relatedCalculators) ? item.relatedCalculators : []

          return (
            <AccordionItem key={`${item.question}-${index}`} value={`faq-${index}`} className="border-0">
              <div className="mb-3 rounded-xl overflow-hidden bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 hover:border-orange-400 transition-all">
                <AccordionTrigger className="p-5 text-left hover:no-underline data-[state=open]:rounded-b-none data-[state=open]:bg-orange-100">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="flex-shrink-0 bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mt-0.5">
                      Q
                    </div>
                    <span className="font-semibold text-slate-900 text-base">{item.question}</span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="border-t border-orange-200 bg-white px-5 py-4">
                  <div className="space-y-3 ml-11">
                    {/* Quick Answer */}
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{item.quickAnswer}</p>
                    </div>

                    {/* Details as bullet points */}
                    {safeDetails.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Details</div>
                        <ul className="space-y-1.5">
                          {safeDetails.map((detail, i) => (
                            <li key={`${index}-detail-${i}`} className="flex gap-2 text-sm text-slate-700">
                              <span className="text-orange-600 font-bold flex-shrink-0 mt-0.5">•</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Micro example */}
                    {item.microExample && (
                      <div className="pt-2 border-t border-slate-200 mt-2">
                        <p className="text-xs font-mono text-slate-600 bg-slate-50 p-2 rounded">{item.microExample}</p>
                      </div>
                    )}

                    {/* Related calculators */}
                    {safeRelated.length > 0 && (
                      <div className="pt-3 border-t border-slate-200 mt-3">
                        <div className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">
                          Related Calculators
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {safeRelated.map((calc, i) => (
                            <Link
                              key={`${index}-rel-${i}-${calc.href}`}
                              href={calc.href}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-full text-xs font-medium text-orange-700 transition-colors"
                            >
                              {calc.name}
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </div>
            </AccordionItem>
          )
        })}
      </Accordion>

      {showProtocolNote && (
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-slate-700">
            <span className="font-semibold">Clinical reminder:</span> Always follow local protocols and consult
            medication information sheets. These examples are for calculation practice only.
          </p>
        </div>
      )}
    </div>
  )
}
