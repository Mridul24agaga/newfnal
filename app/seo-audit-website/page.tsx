"use client"

import { useState, useEffect } from "react"
import type { User } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Menu, Search, ArrowRight, CheckCircle } from "lucide-react"
import Image from "next/image"
import Sidebar from "@/app/components/Sidebar"
import type { AnalysisResult } from "@/app/types/seo"

export default function SEOOptimizer() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [url, setUrl] = useState("")
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [supabase.auth])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/auth-form")
  }

  const handleAnalyze = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })
      if (!response.ok) {
        throw new Error("Failed to analyze website")
      }
      const result = await response.json()
      setAnalysis(result)
    } catch (error) {
      console.error("Error analyzing website:", error)
      setError("An error occurred while analyzing the website. Please try again.")
    }
    setLoading(false)
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "SEO Website Auditor",
    applicationCategory: "SEOApplication",
    description:
      "Analyze and optimize your website's SEO with our comprehensive SEO Website Auditor. Get detailed insights on on-page SEO, technical SEO, content quality, and more.",
    operatingSystem: "Web",
    url: "https://getmorebacklinks.org/seo-audit-website",
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
    <div className="flex h-screen bg-[#FBFCFE]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Sidebar user={user} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 md:hidden">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="w-8" /> {/* Spacer for centering */}
            <h1 className="text-xl font-bold text-center text-gray-900">SEO Website Auditor</h1>
            <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-md hover:bg-gray-100">
              <Menu className="h-6 w-6 text-gray-500" />
              <span className="sr-only">Open sidebar</span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">SEO Website Auditor</h1>
              <p className="mt-4 text-lg text-gray-600">
                Generate, analyze, and validate URLs to enhance your website's visibility and SEO performance.
              </p>
            </div>

            <div className="mt-10">
              <div className="rounded-lg bg-white shadow-sm border border-gray-200 p-6">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="url" className="sr-only">
                      Website URL
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        id="url"
                        name="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter your website URL"
                        className="block w-full rounded-lg border border-gray-300 py-4 pl-4 pr-12 text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleAnalyze}
                    disabled={loading || !url}
                    className="w-full rounded-lg bg-orange-500 px-4 py-4 text-base font-semibold text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500/20 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    {loading ? "Analyzing..." : "Analyze Website"}
                  </button>
                </div>

                {error && <div className="mt-4 p-4 rounded-lg bg-red-50 text-red-700 text-sm">{error}</div>}
              </div>

              <div className="mt-8 space-y-8">
                <div className="rounded-lg bg-white border border-gray-200 p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About Our SEO Audit Tool</h2>
                  <p className="text-gray-700 mb-4">
                    Our SEO Website Auditor is a comprehensive tool designed to analyze and improve your website's
                    search engine optimization. It provides in-depth insights and actionable recommendations to boost
                    your site's visibility and performance in search results.
                  </p>
                  <Image
                    src="/seoaudit.png"
                    alt="SEO Audit Tool Dashboard"
                    width={600}
                    height={300}
                    className="rounded-lg w-full mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Key Features:</h3>
                  <ul className="list-disc pl-5 text-gray-600 space-y-2 mb-4">
                    <li>In-depth analysis of on-page SEO elements</li>
                    <li>Technical SEO audit including HTTPS, mobile responsiveness, and more</li>
                    <li>Image optimization check</li>
                    <li>Content quality analysis</li>
                    <li>Structured data implementation review</li>
                    <li>Competitive analysis</li>
                    <li>Prioritized recommendations for improvement</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-orange-50 border border-orange-200 p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Pro Tips for SEO Success</h2>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-orange-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">
                        Conduct regular audits to stay on top of SEO trends and algorithm updates.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-orange-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">
                        Focus on creating high-quality, original content that provides value to your users.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-orange-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">
                        Optimize your website for mobile devices to improve user experience and search rankings.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-orange-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">
                        Build high-quality backlinks from reputable websites in your industry.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-orange-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">
                        Use our SEO Audit Tool in conjunction with other SEO strategies for best results.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <p className="mt-8 text-center text-sm text-gray-600">
                This professional-grade tool is provided free of charge. If you find it valuable, consider sharing it
                with your network!
              </p>
            </div>

            {analysis && (
              <div className="mt-12 grid gap-6 md:grid-cols-2">
                {analysis.onPageSEO && (
                  <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">On-Page SEO</h2>
                    {analysis.onPageSEO.titleTag && (
                      <div className="mb-4">
                        <p className="font-semibold">
                          Title Score: <span className="text-orange-500">{analysis.onPageSEO.titleTag.score}/100</span>
                        </p>
                        <p className="text-gray-600">{analysis.onPageSEO.titleTag.suggestions}</p>
                      </div>
                    )}
                    {analysis.onPageSEO.metaDescription && (
                      <div className="mb-4">
                        <p className="font-semibold">
                          Meta Description Score:{" "}
                          <span className="text-orange-500">{analysis.onPageSEO.metaDescription.score}/100</span>
                        </p>
                        <p className="text-gray-600">{analysis.onPageSEO.metaDescription.suggestions}</p>
                      </div>
                    )}
                    {analysis.onPageSEO.headings && (
                      <div>
                        <p className="font-semibold">
                          Headings Score:{" "}
                          <span className="text-orange-500">{analysis.onPageSEO.headings.score}/100</span>
                        </p>
                        <p className="text-gray-600">{analysis.onPageSEO.headings.suggestions}</p>
                      </div>
                    )}
                  </div>
                )}

                {analysis.technicalSEO && (
                  <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Technical SEO</h2>
                    <p className="mb-2">
                      <span className="font-semibold">HTTPS:</span>{" "}
                      {analysis.technicalSEO.https ? "Enabled" : "Disabled"}
                    </p>
                    <p className="mb-2">
                      <span className="font-semibold">Mobile Responsive:</span>{" "}
                      {analysis.technicalSEO.mobileResponsive ? "Yes" : "No"}
                    </p>
                    <p className="mb-2">
                      <span className="font-semibold">Canonical URL:</span> {analysis.technicalSEO.canonicalUrl}
                    </p>
                    <p>
                      <span className="font-semibold">Robots.txt:</span>{" "}
                      {analysis.technicalSEO.robotsTxt ? "Valid" : "Invalid/Missing"}
                    </p>
                  </div>
                )}

                {analysis.imageOptimization && (
                  <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Image Optimization</h2>
                    <p className="mb-2">
                      <span className="font-semibold">Total Images:</span> {analysis.imageOptimization.totalImages}
                    </p>
                    <p className="mb-2">
                      <span className="font-semibold">Images with Alt Text:</span>{" "}
                      {analysis.imageOptimization.imagesWithAltText}
                    </p>
                    <p className="mb-2">
                      <span className="font-semibold">Lazy Loaded Images:</span>{" "}
                      {analysis.imageOptimization.lazyLoadedImages}
                    </p>
                    <p className="text-gray-600">{analysis.imageOptimization.suggestions}</p>
                  </div>
                )}

                {analysis.contentAnalysis && (
                  <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Content Analysis</h2>
                    <p className="mb-4">
                      <span className="font-semibold">Word Count:</span> {analysis.contentAnalysis.wordCount}
                    </p>
                    <p className="font-semibold mb-2">Quality Suggestions:</p>
                    <ul className="list-disc pl-5 text-gray-600">
                      {analysis.contentAnalysis.qualitySuggestions.split(". ").map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {analysis.structuredData && (
                  <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Structured Data</h2>
                    <p className="mb-2">
                      <span className="font-semibold">Implemented:</span>{" "}
                      {analysis.structuredData.implemented ? "Yes" : "No"}
                    </p>
                    <p className="text-gray-600">{analysis.structuredData.recommendations}</p>
                  </div>
                )}

                {analysis.competitiveEdge && (
                  <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Competitive Edge</h2>
                    <p className="mb-2">
                      <span className="font-semibold">Comparison:</span> {analysis.competitiveEdge.comparison}
                    </p>
                    <p className="text-gray-600">{analysis.competitiveEdge.uniqueFeatures}</p>
                  </div>
                )}

                {analysis.overallQuality && (
                  <div className="bg-white shadow-md rounded-lg p-6 md:col-span-2">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Overall SEO Quality</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-bold text-red-500 mb-2">High Priority:</h3>
                        <ul className="list-disc pl-5 text-gray-600">
                          {analysis.overallQuality.highPriority.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-bold text-yellow-500 mb-2">Medium Priority:</h3>
                        <ul className="list-disc pl-5 text-gray-600">
                          {analysis.overallQuality.mediumPriority.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-bold text-green-500 mb-2">Low Priority:</h3>
                        <ul className="list-disc pl-5 text-gray-600">
                          {analysis.overallQuality.lowPriority.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

