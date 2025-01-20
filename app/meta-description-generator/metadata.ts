import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Meta Description Generator - 100% Free Tool",
  description:
    "Generate SEO-optimized meta descriptions instantly. Get scored recommendations for readability, engagement, and uniqueness. Free tool by Get More Backlinks.",
  keywords:
    "meta description generator, SEO meta descriptions, meta tag generator, SEO tool, meta description optimization",
  openGraph: {
    type: "website",
    title: "Free Meta Description Generator - Optimize Your SEO",
    description:
      "Generate, analyze, and compare SEO-optimized meta descriptions to enhance your content's visibility and engagement. Get instant feedback on readability and performance.",
    images: [
      {
        url: "https://getmorebacklinks.org/meta-description-generator/og-image.png",
        width: 1200,
        height: 630,
        alt: "Meta Description Generator Tool",
      },
    ],
    url: "https://getmorebacklinks.org/meta-description-generator",
    siteName: "Get More Backlinks",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Meta Description Generator - Optimize Your SEO",
    description:
      "Generate and analyze SEO-optimized meta descriptions with instant feedback on readability and performance.",
    images: ["https://getmorebacklinks.org/meta-description-generator/twitter-image.png"],
    creator: "@getmorebacklinks",
  },
  alternates: {
    canonical: "https://getmorebacklinks.org/meta-description-generator",
    languages: {
      en: "https://getmorebacklinks.org/meta-description-generator",
    },
  },
  other: {
    language: "en",
  },
}

