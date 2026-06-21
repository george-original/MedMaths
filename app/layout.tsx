import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.medmaths.com"),
  title: "MedMaths | Medication Dose, IV & Tablet Calculators",
  description:
    "Medication dose calculators for nurses and clinicians: mg to mL, tablet dosing, IV drip rates, dilutions, BSA, IBW, and CrCl.",
  alternates: {
    canonical: "https://www.medmaths.com",
  },
  verification: {
    google: "maNa29tVHXpls0DkzV1GAlJn72k-I28ftp1O2AfxY6Y",
  },
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
    type: "website",
    locale: "en_AU",
    url: "https://www.medmaths.com",
    siteName: "MedMaths",
    title: "MedMaths | Medication Dose, IV & Tablet Calculators",
    description:
      "Focused medication maths calculators with formulas, worked examples, and instant results.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
