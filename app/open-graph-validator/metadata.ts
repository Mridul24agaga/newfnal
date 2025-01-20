import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Open Graph Validator | Free SEO Tool | Get More Backlinks",
  description:
    "Validate and analyze Open Graph data instantly. Get detailed metadata and image previews. Enhance your content's visibility with our free Open Graph validation tool.",
  keywords: "Open Graph validator, SEO tool, metadata analysis, URL validation, meta tag validator",
  openGraph: {
    type: "website",
    title: "Free Open Graph Validator - Optimize Your SEO",
    description:
      "Validate URLs and analyze Open Graph data to enhance your content's visibility and engagement. Get instant feedback on your metadata.",
    images: [
      {
        url: "https://getmorebacklinks.org/open-graph-validator/og-image.png",
        width: 1200,
        height: 630,
        alt: "Open Graph Validator Tool",
      },
    ],
    url: "https://getmorebacklinks.org/open-graph-validator",
    siteName: "Get More Backlinks",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Open Graph Validator - Optimize Your SEO",
    description: "Validate URLs and analyze Open Graph data with instant feedback on your metadata.",
    images: ["https://getmorebacklinks.org/open-graph-validator/twitter-image.png"],
    creator: "@getmorebacklinks",
  },
  alternates: {
    canonical: "https://getmorebacklinks.org/open-graph-validator",
    languages: {
      en: "https://getmorebacklinks.org/open-graph-validator",
    },
  },
  other: {
    language: "en",
  },
}

