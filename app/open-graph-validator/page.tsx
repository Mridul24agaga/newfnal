"use client"

import type React from "react"

import { useState } from "react"
import { AlertCircle, Loader2 } from "lucide-react"
import Image from "next/image"
import Footer from "../components/footer"
import OpenGraphValidatorInfo from "./info"

type OpenGraphData = {
  title?: string
  url?: string
  siteName?: string
  locale?: string
  image?: string
  imageWidth?: string
  imageHeight?: string
  imageAlt?: string
  type?: string
}

export default function OpenGraphValidator() {
  const [url, setUrl] = useState("")
  const [ogData, setOgData] = useState<OpenGraphData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setOgData(null)

    try {
      const response = await fetch("/api/validate-og", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch URL data")
      }

      const data = await response.json()
      setOgData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Open Graph Validator",
    applicationCategory: "SEOApplication",
    description: "Validate and analyze Open Graph data instantly. Get detailed metadata and image previews.",
    operatingSystem: "Web",
    url: "https://getmorebacklinks.org/open-graph-validator",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Organization",
      name: "Get More Backlinks",
      url: "https://getmorebacklinks.org",
    },
  }

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header */}
      <header className="border-b border-gray-200 relative bg-white z-10">
        <div className="container mx-auto px-4">
          <div className="h-16 sm:h-20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/getmorepacklinks.png"
                alt="GetMoreBacklinks"
                width={100}
                height={32}
                className="h-6 sm:h-8 w-auto"
              />
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <a
                href="/"
                className="text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Home
              </a>
              <a
                href="/case-study"
                className="text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Case Studies
              </a>
              <a
                href="/blogs"
                className="text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Blogs
              </a>
              <a
                href="/#pricing"
                className="text-xs sm:text-sm font-medium text-white bg-[#F36516] hover:bg-[#E55505] transition-colors px-4 py-2 rounded-full"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="overflow-x-hidden overflow-y-auto">
        <div className="container mx-auto px-4 sm:px-6 py-12 max-w-4xl">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
            <div className="text-center mb-8">
              <div className="inline-block bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-sm font-medium mb-4">
                Free SEO Analysis Tool
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-orange-600 bg-clip-text text-transparent">
                Professional Open Graph Validator
              </h1>
              <p className="text-center text-gray-600 mb-6 text-sm sm:text-base max-w-2xl mx-auto">
                Analyze and validate Open Graph data to enhance your content's visibility and engagement across social
                media platforms.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mb-8">
              <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
                <input
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-150 ease-in-out"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-6 py-3 rounded-lg text-white font-medium transition duration-150 ease-in-out ${
                    isLoading
                      ? "bg-orange-400 cursor-not-allowed"
                      : "bg-[#F36516] hover:bg-[#E55505] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="inline-block mr-2 h-5 w-5 animate-spin" />
                      Validating...
                    </>
                  ) : (
                    "Validate"
                  )}
                </button>
              </div>
            </form>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg text-sm sm:text-base max-w-2xl mx-auto">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <h3 className="font-medium">Error</h3>
                </div>
                <p className="mt-1">{error}</p>
              </div>
            )}

            {ogData && (
              <div className="space-y-6 max-w-3xl mx-auto">
                <div className="flex items-center justify-center">
                  <div className="h-1 w-16 bg-gradient-to-r from-orange-300 to-orange-600 rounded-full"></div>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 text-center">
                  Open Graph Validation Results
                </h3>
                <div className="bg-gray-50 p-5 sm:p-7 rounded-xl border border-gray-200 font-mono text-xs sm:text-sm overflow-x-auto shadow-inner">
                  {Object.entries(ogData).map(([key, value]) => (
                    <div key={key} className="mb-2">
                      <span className="text-orange-600">&lt;meta property=&quot;og:{key}&quot; content=&quot;</span>
                      <span className="text-gray-800">{value}</span>
                      <span className="text-orange-600">&quot; /&gt;</span>
                    </div>
                  ))}
                </div>
                {ogData.image && (
                  <div className="mt-8">
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 text-center">Image Preview</h4>
                    <div className="flex justify-center">
                      <img
                        src={ogData.image || "/placeholder.svg"}
                        alt={ogData.imageAlt || "Open Graph image"}
                        className="max-w-full h-auto rounded-lg border border-gray-200"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="bg-gradient-to-r from-orange-100 to-orange-50 p-6 rounded-xl border border-orange-200 text-center">
            <p className="text-gray-700 text-sm sm:text-base">
              This professional-grade tool is provided free of charge. If you find it valuable, consider sharing it with
              your network!
            </p>
          </div>
        </div>
        <OpenGraphValidatorInfo />
      </main>
      <Footer/>
    </div>
  )
}
