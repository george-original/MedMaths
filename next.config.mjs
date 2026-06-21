/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
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
        source: "/calculator/infusion-rates/:slug*",
        destination: "/calculator/iv-fluids",
        permanent: true,
      },

      // WordPress tag pages -> calculators
      {
        source: "/tag/:slug*",
        destination: "/calculators",
        permanent: true, // 301
      },
      
      // WordPress category pages -> calculators
      {
        source: "/category/:slug*",
        destination: "/calculators",
        permanent: true, // 301
      },
      
      // WordPress author pages -> homepage
      {
        source: "/author/:slug*",
        destination: "/",
        permanent: true, // 301
      },
      
      // WordPress pagination -> homepage
      {
        source: "/page/:num",
        destination: "/",
        permanent: true, // 301
      },
      
      // WordPress feeds -> return 410 Gone (cleaner than redirecting)
      {
        source: "/feed",
        destination: "/410",
        permanent: true, // 301 to 410 page
      },
      {
        source: "/comments/feed",
        destination: "/410",
        permanent: true, // 301 to 410 page
      },
      {
        source: "/sitemap.rss",
        destination: "/410",
        permanent: true, // 301 to 410 page
      },
      
      // Specific old WordPress post URL
      {
        source: "/mg-to-ml-calculator-mg-ml-medmaths/",
        destination: "/calculator/dose-calculations/mg-to-ml",
        permanent: true, // 301
      },
    ]
  },
}

export default nextConfig
