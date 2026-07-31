"use client"

import { useEffect, useState } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type CalculatorCopyButtonProps = {
  value: string
  label?: string
  copiedLabel?: string
  className?: string
  onError?: () => void
}

export function CalculatorCopyButton({
  value,
  label = "Copy result",
  copiedLabel = "Copied",
  className,
  onError,
}: CalculatorCopyButtonProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 1600)
    return () => window.clearTimeout(timer)
  }, [copied])

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
    } catch {
      onError?.()
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      onClick={copy}
      className={cn(
        "h-10 rounded-xl border-current/20 bg-white/90 px-3 text-current hover:bg-white",
        className,
      )}
    >
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      {copied ? copiedLabel : label}
    </Button>
  )
}
