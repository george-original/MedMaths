import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata = {
  title: "410 - Content Removed | MedMaths",
  description: "This content has been permanently removed.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function Page410() {
  return (
    <>
      <SiteHeader />
      <div className="container mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="mb-4 text-4xl font-bold">410 - Gone</h1>
        <p className="mb-8 text-lg text-gray-600">
          This content has been permanently removed and is no longer available.
        </p>
        <a href="/" className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700">
          Return to Homepage
        </a>
      </div>
      <SiteFooter />
    </>
  )
}
