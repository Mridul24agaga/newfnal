"use client"

import { useState } from "react"
import { CheckCircle, ArrowRight, Globe } from "lucide-react"
import Image from "next/image"
import performSeoAudit from "./actions/seo-audit"
import Footer from "../components/footer"

export default function SEOAuditTool() {
  const [url, setUrl] = useState("")
  const [auditResults, setAuditResults] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAudit = async () => {
    if (!url) return

    setLoading(true)
    setError(null)

    try {
      const results = await performSeoAudit(url)
      setAuditResults(results)
    } catch (error) {
      console.error("Error performing SEO audit:", error)
      setError("An error occurred while auditing the website. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "SEO Audit Tool",
    applicationCategory: "SEOApplication",
    description:
      "Comprehensive SEO audit tool that analyzes your website's search engine optimization factors and provides actionable recommendations to improve rankings.",
    operatingSystem: "Web",
    url: "https://getmorebacklinks.org/seo-audit-tool",
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
      <header className="relative bg-white z-10">
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

      <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {!auditResults && (
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-orange-100 text-[#F36516] px-4 py-1 rounded-full text-sm font-medium mb-6">
              Free SEO Audit Tool
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              Complete <span className="text-[#F36516]">SEO Audit</span>
              <br />
              For Your Website
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
              Get a comprehensive SEO analysis with actionable recommendations to improve your search rankings. Our free
              audit tool identifies critical SEO issues in seconds.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">On-Page SEO Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Technical SEO Check</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Content Quality Score</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Mobile SEO Performance</span>
              </div>
            </div>

            <div className="max-w-xl mx-auto bg-white rounded-lg shadow-sm p-8">
              <div className="flex justify-center mb-4">
                <div className="bg-[#F36516] p-4 rounded-full">
                  <Globe className="h-6 w-6 text-white" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-center mb-2">Audit Your Website</h2>
              <p className="text-gray-600 text-center mb-6">Get detailed SEO insights in seconds</p>

              <div className="space-y-6">
                <div>
                  <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                    * Website URL
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Globe className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="url"
                      id="url"
                      name="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://your-website.com/"
                      className="w-full pl-10 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F36516]/20 focus:border-[#F36516]"
                    />
                  </div>
                </div>

                <button
                  onClick={handleAudit}
                  disabled={loading || !url}
                  className="w-full py-3 px-4 bg-[#F36516] hover:bg-[#E55505] text-white rounded-md font-medium transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    "Auditing..."
                  ) : (
                    <>
                      Start SEO Audit
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>

                <p className="text-center text-sm text-gray-500">Audit typically takes 15-30 seconds</p>
              </div>
            </div>

            <p className="text-center text-gray-600 mt-8">
              Already audited over <span className="text-[#F36516] font-semibold">10,000+</span> websites
            </p>
          </div>
        )}

        {error && <div className="max-w-2xl mx-auto mt-4 p-4 bg-red-50 text-red-700 rounded-md">{error}</div>}

        {auditResults && (
          <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-3xl font-bold text-center mb-8">SEO Audit Results</h2>

            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Overall SEO Score</h3>
                <div className="text-3xl font-bold text-[#F36516]">{auditResults.metadata.score}/100</div>
              </div>
              <p className="text-gray-600 mb-4">
                Audit for: <span className="font-semibold">{auditResults.metadata.url}</span>
              </p>
              <p className="text-gray-600">
                Completed on:{" "}
                <span className="font-semibold">{new Date(auditResults.metadata.date).toLocaleString()}</span>
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">SEO Health Summary</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <h4 className="font-semibold">Good</h4>
                    </div>
                    <p className="text-sm text-gray-600">{auditResults.summary?.good || 0} factors</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="h-5 w-5 text-yellow-500 mr-2" />
                      <h4 className="font-semibold">Needs Improvement</h4>
                    </div>
                    <p className="text-sm text-gray-600">{auditResults.summary?.needsImprovement || 0} factors</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="h-5 w-5 text-red-500 mr-2" />
                      <h4 className="font-semibold">Critical Issues</h4>
                    </div>
                    <p className="text-sm text-gray-600">{auditResults.summary?.critical || 0} factors</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {/* On-Page SEO Section */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gray-50 px-6 py-4">
                  <h3 className="text-xl font-bold">On-Page SEO</h3>
                </div>
                <div className="p-6 space-y-6">
                  {auditResults.results
                    .filter((result: any) =>
                      ["Meta Tags", "Content", "Headings", "Keywords", "Images"].includes(result.category),
                    )
                    .map((result: any, index: number) => (
                      <div key={index} className="pb-6 last:pb-0">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="text-lg font-semibold">{result.category}</h4>
                          <div className="flex items-center">
                            <span className="text-lg font-bold text-[#F36516] mr-2">{result.score}/100</span>
                            {result.score >= 70 ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : result.score >= 40 ? (
                              <CheckCircle className="h-5 w-5 text-yellow-500" />
                            ) : (
                              <CheckCircle className="h-5 w-5 text-red-500" />
                            )}
                          </div>
                        </div>
                        <p className="text-gray-700 mb-4">{result.feedback}</p>
                        <h5 className="font-semibold mb-2 text-gray-800">Recommendations:</h5>
                        <ul className="list-disc pl-5 text-gray-600 space-y-1">
                          {result.recommendations.map((rec: string, idx: number) => (
                            <li key={idx}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                </div>
              </div>

              {/* Technical SEO Section */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gray-50 px-6 py-4">
                  <h3 className="text-xl font-bold">Technical SEO</h3>
                </div>
                <div className="p-6 space-y-6">
                  {auditResults.results
                    .filter((result: any) =>
                      ["Structure", "Mobile Friendliness", "Page Speed", "Security"].includes(result.category),
                    )
                    .map((result: any, index: number) => (
                      <div key={index} className="pb-6 last:pb-0">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="text-lg font-semibold">{result.category}</h4>
                          <div className="flex items-center">
                            <span className="text-lg font-bold text-[#F36516] mr-2">{result.score}/100</span>
                            {result.score >= 70 ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : result.score >= 40 ? (
                              <CheckCircle className="h-5 w-5 text-yellow-500" />
                            ) : (
                              <CheckCircle className="h-5 w-5 text-red-500" />
                            )}
                          </div>
                        </div>
                        <p className="text-gray-700 mb-4">{result.feedback}</p>
                        <h5 className="font-semibold mb-2 text-gray-800">Recommendations:</h5>
                        <ul className="list-disc pl-5 text-gray-600 space-y-1">
                          {result.recommendations.map((rec: string, idx: number) => (
                            <li key={idx}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                </div>
              </div>

              {/* User Experience & Credibility Section */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gray-50 px-6 py-4">
                  <h3 className="text-xl font-bold">User Experience & Credibility</h3>
                </div>
                <div className="p-6 space-y-6">
                  {auditResults.results
                    .filter((result: any) => ["Actionability", "Credibility"].includes(result.category))
                    .map((result: any, index: number) => (
                      <div key={index} className="pb-6 last:pb-0">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="text-lg font-semibold">{result.category}</h4>
                          <div className="flex items-center">
                            <span className="text-lg font-bold text-[#F36516] mr-2">{result.score}/100</span>
                            {result.score >= 70 ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : result.score >= 40 ? (
                              <CheckCircle className="h-5 w-5 text-yellow-500" />
                            ) : (
                              <CheckCircle className="h-5 w-5 text-red-500" />
                            )}
                          </div>
                        </div>
                        <p className="text-gray-700 mb-4">{result.feedback}</p>
                        <h5 className="font-semibold mb-2 text-gray-800">Recommendations:</h5>
                        <ul className="list-disc pl-5 text-gray-600 space-y-1">
                          {result.recommendations.map((rec: string, idx: number) => (
                            <li key={idx}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                </div>
              </div>

              {/* Priority Action Items */}
              <div className="bg-[#FFF8F3] rounded-lg shadow-sm overflow-hidden">
                <div className="bg-[#FFF0E6] px-6 py-4">
                  <h3 className="text-xl font-bold">Priority SEO Improvements</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-4">
                    Based on our audit, here are the most important SEO actions you should take to improve your
                    website's search rankings:
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-red-500 mb-2">High Priority:</h4>
                      <ul className="list-disc pl-5 text-gray-600 space-y-1">
                        {auditResults.priorityActions?.high?.map((item: string, index: number) => (
                          <li key={index}>{item}</li>
                        )) || <li>No high priority issues found.</li>}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-yellow-500 mb-2">Medium Priority:</h4>
                      <ul className="list-disc pl-5 text-gray-600 space-y-1">
                        {auditResults.priorityActions?.medium?.map((item: string, index: number) => (
                          <li key={index}>{item}</li>
                        )) || <li>No medium priority issues found.</li>}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-green-500 mb-2">Low Priority:</h4>
                      <ul className="list-disc pl-5 text-gray-600 space-y-1">
                        {auditResults.priorityActions?.low?.map((item: string, index: number) => (
                          <li key={index}>{item}</li>
                        )) || <li>No low priority issues found.</li>}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
