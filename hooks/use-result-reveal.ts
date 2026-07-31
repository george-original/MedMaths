"use client"

import { useEffect, useRef } from "react"

export type ResultRevealOptions = {
  behavior?: ScrollBehavior
  focus?: boolean
  scrollOnlyWhenOutsideViewport?: boolean
}

export function useResultReveal<T extends HTMLElement>(
  visible: boolean,
  {
    behavior = "smooth",
    focus = true,
    scrollOnlyWhenOutsideViewport = true,
  }: ResultRevealOptions = {},
) {
  const ref = useRef<T>(null)
  const wasVisible = useRef(false)

  useEffect(() => {
    const becameVisible = visible && !wasVisible.current
    wasVisible.current = visible

    if (!becameVisible || !ref.current) return

    const element = ref.current
    const frame = window.requestAnimationFrame(() => {
      const bounds = element.getBoundingClientRect()
      const isOutsideViewport = bounds.top < 0 || bounds.bottom > window.innerHeight

      if (!scrollOnlyWhenOutsideViewport || isOutsideViewport) {
        element.scrollIntoView({ behavior, block: "nearest" })
      }

      if (focus) {
        element.focus({ preventScroll: true })
      }
    })

    return () => window.cancelAnimationFrame(frame)
  }, [behavior, focus, scrollOnlyWhenOutsideViewport, visible])

  return ref
}
