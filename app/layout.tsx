import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://www.medmaths.com"),
  title: "MedMaths | Med Maths Medication Calculators",
  description:
    "MedMaths, also searched as Med Maths, provides medication dose, IV, tablet, dilution, BSA, IBW, and CrCl calculators for nurses and clinicians.",
  alternates: {
    canonical: "https://www.medmaths.com",
  },
  applicationName: "MedMaths",
  appleWebApp: {
    title: "MedMaths",
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
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
    title: "MedMaths | Med Maths Medication Calculators",
    description:
      "MedMaths, also searched as Med Maths, provides focused medication maths calculators with formulas, worked examples, and instant results.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-AU">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1935059419471624"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
