"use client"

import { useEffect, useState } from "react"

export function DeferredAdSense() {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    // Defer AdSense loading until after initial page render
    const timer = setTimeout(() => {
      setShouldLoad(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (!shouldLoad) return null

  return (
    <script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7255361396746700"
      crossOrigin="anonymous"
    />
  )
}
