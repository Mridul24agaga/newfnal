"use client"

import type React from "react"
import Image from "next/image"
import { useState } from "react"
import Footer from "../components/footer"
import {
  BarChart2,
  ArrowRight,
  Loader2,
  TrendingUp,
  Globe,
  AlertCircle,
  Search,
  ChevronUp,
  ChevronDown,
  Minus,
} from "lucide-react"

type KeywordRanking = {
  keyword: string
  position: number
  url: string
  change: number
  volume: number
  difficulty: number
}

export default function KeywordRankTracker() {
  const [domain, setDomain] = useState("")
  const [keywords, setKeywords] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [rankings, setRankings] = useState<KeywordRanking[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simulate API call for demo purposes
      setTimeout(() => {
        const mockRankings: KeywordRanking[] = keywords
          .split("\n")
          .filter((k) => k.trim().length > 0)
          .map((keyword) => ({
            keyword,
            position: Math.floor(Math.random() * 50) + 1,
            url: `https://${domain}/page-${Math.floor(Math.random() * 10) + 1}`,
            change: Math.floor(Math.random() * 10) - 5,
            volume: Math.floor(Math.random() * 10000) + 100,
            difficulty: Math.floor(Math.random() * 100),
          }))
        setRankings(mockRankings)
        setIsLoading(false)
      }, 2000)

      // Uncomment for real API call
      /*
      const response = await fetch("/api/track-keyword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          domain,
          keywords: keywords.split("\n").filter((k) => k.trim().length > 0),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.details || "Failed to track keywords")
      }

      setRankings(data.rankings)
      */
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred. Please try again.")
    } finally {
      // setIsLoading(false) // Uncomment for real API call
    }
  }

  const getChangeColor = (change: number) => {
    if (change > 0) return "text-green-600"
    if (change < 0) return "text-red-600"
    return "text-gray-600"
  }

  const getChangeIcon = (change: number) => {
    if (change > 0) return <ChevronUp className="h-4 w-4" />
    if (change < 0) return <ChevronDown className="h-4 w-4" />
    return <Minus className="h-4 w-4" />
  }

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty < 30) return "bg-green-500"
    if (difficulty < 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="min-h-screen bg-white">
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
      <main className="py-12 px-4 container mx-auto">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-4">
            <div className="inline-block bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-sm font-medium">
              AI-POWERED TOOL
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Keyword <span className="text-orange-500">Rank Tracker</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Track your website's keyword rankings and monitor your SEO performance with our AI-powered rank tracker.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 space-y-6">
            <div className="text-center">
              <div className="mx-auto bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-orange-500" />
              </div>
              <h2 className="text-2xl font-bold">Track Your Keywords</h2>
              <p className="text-gray-600 mt-1">Enter your domain and keywords to track their rankings</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="domain" className="block text-sm font-medium text-gray-700">
                  Website Domain
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Globe className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="domain"
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="example.com"
                    className="pl-10 w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="keywords" className="block text-sm font-medium text-gray-700">
                  Keywords (one per line)
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    id="keywords"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="seo tools
keyword research
rank tracker"
                    className="pl-10 w-full min-h-[120px] p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col items-center space-y-3">
                <button
                  type="submit"
                  disabled={isLoading || !domain || !keywords}
                  className={`
                    w-full sm:w-auto px-8 py-4 rounded-lg text-white font-medium flex items-center justify-center
                    ${isLoading || !domain || !keywords
                      ? "bg-orange-400 cursor-not-allowed"
                      : "bg-orange-500 hover:bg-orange-600 transition-colors"
                    }
                  `}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                      Tracking...
                    </>
                  ) : (
                    <>
                      Track Rankings
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
                <p className="text-xs text-gray-500">Tracking typically takes 15-30 seconds</p>
              </div>
            </form>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="mr-3 h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-red-700">Error:</p>
                  <p className="text-red-600 text-sm">{error}</p>
                  <p className="mt-2 text-sm text-red-600">
                    Please try again or contact support if the problem persists.
                  </p>
                </div>
              </div>
            </div>
          )}

          {rankings.length > 0 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold flex items-center justify-center">
                  <BarChart2 className="mr-2 h-6 w-6 text-orange-500" />
                  Keyword Rankings for <span className="text-orange-600 ml-1">{domain}</span>
                </h2>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-orange-50 border-b border-orange-100">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                        >
                          Keyword
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                        >
                          Position
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                        >
                          Change
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                        >
                          Volume
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                        >
                          Difficulty
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {rankings.map((ranking, index) => (
                        <tr key={index} className="hover:bg-orange-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                            {ranking.keyword}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              #{ranking.position}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`flex items-center ${getChangeColor(ranking.change)} font-medium`}>
                              {getChangeIcon(ranking.change)}
                              <span className="ml-1">{Math.abs(ranking.change)}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                            {ranking.volume.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            <div className="flex items-center">
                              <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                                <div
                                  className={`h-2.5 rounded-full ${getDifficultyColor(ranking.difficulty)}`}
                                  style={{ width: `${ranking.difficulty}%` }}
                                ></div>
                              </div>
                              <span className="font-medium">{ranking.difficulty}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-orange-800 mb-4">Insights & Recommendations</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-orange-100 rounded-full p-1 mr-3 mt-0.5">
                      <TrendingUp className="h-4 w-4 text-orange-600" />
                    </div>
                    <span className="text-gray-700">
                      Your average position is{" "}
                      <span className="font-semibold text-orange-700">
                        #{Math.round(rankings.reduce((sum, r) => sum + r.position, 0) / rankings.length)}
                      </span>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-orange-100 rounded-full p-1 mr-3 mt-0.5">
                      <TrendingUp className="h-4 w-4 text-orange-600" />
                    </div>
                    <span className="text-gray-700">
                      <span className="font-semibold text-orange-700">
                        {rankings.filter((r) => r.position <= 10).length}
                      </span>{" "}
                      keywords are ranking on the first page
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-orange-100 rounded-full p-1 mr-3 mt-0.5">
                      <TrendingUp className="h-4 w-4 text-orange-600" />
                    </div>
                    <span className="text-gray-700">
                      <span className="font-semibold text-orange-700">
                        {rankings.filter((r) => r.change > 0).length}
                      </span>{" "}
                      keywords improved in rankings
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-orange-100 rounded-full p-1 mr-3 mt-0.5">
                      <TrendingUp className="h-4 w-4 text-orange-600" />
                    </div>
                    <span className="text-gray-700">
                      Focus on keywords with high volume and low difficulty for best results
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-sm text-orange-700">
              <span>Already tracked over </span>
              <span className="font-bold mx-1 text-orange-600">1,000,000+</span>
              <span>keywords</span>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  )
}
