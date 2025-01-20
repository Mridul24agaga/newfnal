import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Landing Page Analyzer - 100% Free Tool",
  description:
    "Analyze your landing page for 200+ SEO factors instantly. Get actionable recommendations to improve rankings. Free tool by Get More Backlinks.",
  keywords: "landing page analyzer, SEO analysis tool, website analyzer, SEO checker, landing page optimization",
  openGraph: {
    type: "website",
    title: "Free Landing Page Analyzer - Boost Your SEO Rankings",
    description:
      "Instantly analyze your landing page for 200+ SEO factors. Get actionable recommendations to improve rankings and drive more organic traffic.",
    images: [
      {
        url: "https://getmorebacklinks.org/landing-page-analyze/og-image.png",
        width: 1200,
        height: 630,
        alt: "Landing Page Analyzer Tool",
      },
    ],
    url: "https://getmorebacklinks.org/landing-page-analyze",
    siteName: "Get More Backlinks",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Landing Page Analyzer - Check Your SEO Score",
    description:
      "Analyze your landing page for 200+ SEO factors and get actionable recommendations to improve rankings.",
    images: ["https://getmorebacklinks.org/landing-page-analyze/twitter-image.png"],
    creator: "@getmorebacklinks",
  },
  alternates: {
    canonical: "https://getmorebacklinks.org/landing-page-analyze",
    languages: {
      en: "https://getmorebacklinks.org/landing-page-analyze",
    },
  },
  other: {
    language: "en",
  },
}

