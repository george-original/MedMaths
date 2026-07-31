/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // Removed broad calculator sections -> focused calculator directory
      {
        source: "/calculator/cardiology/:slug*",
        destination: "/calculators",
        permanent: true,
      },
      {
        source: "/calculator/pregnancy/:slug*",
        destination: "/calculators",
        permanent: true,
      },
      {
        source: "/calculator/clinical-scores/:slug*",
        destination: "/calculators",
        permanent: true,
      },
      {
        source: "/calculator/lab-corrections/:slug*",
        destination: "/calculators",
        permanent: true,
      },
      {
        source: "/calculator/unit-conversions/:slug*",
        destination: "/calculator/dose-calculations",
        permanent: true,
      },
      {
        source: "/calculator/paediatrics/:slug*",
        destination: "/calculator/dose-calculations/mgkg-to-ml-dose",
        permanent: true,
      },
      {
        source: "/calculator/critical-care/:slug*",
        destination: "/calculator/iv-fluids",
        permanent: true,
      },
      {
        source: "/learning/:slug*",
        destination: "/calculators",
        permanent: true,
      },
      {
        source: "/calculator/dose-calculations/ml-to-mg",
        destination: "/calculator/dose-calculations/mg-to-ml",
        permanent: true,
      },
      {
        source: "/calculator/dose-calculations/mcg-to-ml",
        destination: "/calculator/dose-calculations/mg-to-ml",
        permanent: true,
      },
      {
        source: "/calculator/dose-calculations/dose-calculations",
        destination: "/calculator/dose-calculations",
        permanent: true,
      },
      {
        source: "/calculator/dose-calculations/medication-math-formula",
        destination: "/calculator/dose-calculations",
        permanent: true,
      },
      {
        source: "/calculator/dilutions/vial-dose-to-ml",
        destination: "/calculator/dose-calculations/mg-to-ml#reconstituted-vial",
        permanent: true,
      },
      {
        source: "/calculator/tablet-dosing/mg-to-tablets",
        destination: "/calculator/tablet-dosing#fixed-dose",
        permanent: true,
      },
      {
        source: "/calculator/tablet-dosing/mgkg-to-tablets",
        destination: "/calculator/tablet-dosing#weight-based",
        permanent: true,
      },
      {
        source: "/calculator/renal-function",
        destination: "/calculator/renal-function/creatinine-clearance",
        permanent: true,
      },
      {
        source: "/calculator/infusion-rates/:slug*",
        destination: "/calculator/iv-fluids",
        permanent: true,
      },

      // WordPress tag and category pages -> calculators
      {
        source: "/tag/:slug*",
        destination: "/calculators",
        permanent: true,
      },
      {
        source: "/category/:slug*",
        destination: "/calculators",
        permanent: true,
      },

      // WordPress author and pagination pages -> homepage
      {
        source: "/author/:slug*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/page/:num",
        destination: "/",
        permanent: true,
      },

      // Retired feed URLs are handled by dedicated 410 route handlers.

      // Specific old WordPress post URL
      {
        source: "/mg-to-ml-calculator-mg-ml-medmaths/",
        destination: "/calculator/dose-calculations/mg-to-ml",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
