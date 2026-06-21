"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CalculatorSearch } from "@/components/calculator-search"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image src="/medmaths-logo.png" alt="MedMaths" width={32} height={32} className="h-8 w-8" />
          <span className="text-xl font-semibold tracking-tight text-foreground">MedMaths</span>
        </Link>

        <div className="hidden flex-1 justify-center md:flex">
          <div className="w-full max-w-xl">
            <CalculatorSearch />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <Button asChild size="sm" className="rounded-full">
            <Link href="/calculators">Browse</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
