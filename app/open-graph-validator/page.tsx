"use client"

import { useState, useEffect } from "react"
import { AlertCircle, Loader2, Menu, Lock, ArrowRight } from "lucide-react"
import Sidebar from "../components/Sidebar"
import { createClientComponentClient, type User } from "@supabase/auth-helpers-nextjs"
import Link from "next/link"
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
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isAuthChecking, setIsAuthChecking] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        setUser(user)
      } catch (error) {
        console.error("Error fetching user:", error)
      } finally {
        setIsAuthChecking(false)
      }
    }
    getUser()
  }, [supabase.auth])

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
    <div className="flex h-screen bg-gray-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Sidebar user={user} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-end md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
            aria-label="Open sidebar"
          >
            <Menu className="h-6 w-6" />
          </button>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl">
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4">Professional Open Graph Validator</h1>
              <p className="text-center text-gray-600 mb-6 text-sm sm:text-base">
                Analyze and validate Open Graph data to enhance your content's visibility and engagement.
              </p>

              {isAuthChecking ? (
                <div className="flex justify-center items-center h-40">
                  <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
                </div>
              ) : user ? (
                <form onSubmit={handleSubmit} className="mb-6">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="url"
                      placeholder="https://example.com"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      required
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-150 ease-in-out"
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`px-6 py-2 rounded-lg text-white font-medium transition duration-150 ease-in-out ${
                        isLoading
                          ? "bg-orange-400 cursor-not-allowed"
                          : "bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
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
              ) : (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="bg-orange-100 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-4">
                      <Lock className="w-10 h-10 text-orange-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign In Required</h2>
                    <p className="text-gray-600 mb-4">
                      To use our Open Graph Validator, please sign in or create an account. It's quick, easy, and free!
                    </p>
                  </div>
                  <div className="space-y-4">
                    <Link
                      href="/auth-form"
                      className="w-64 mx-auto bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center justify-center"
                    >
                      Sign In
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                    <Link
                      href="/auth-form"
                      className="w-64 mx-auto bg-white text-orange-500 px-6 py-3 rounded-lg font-medium border-2 border-orange-500 hover:bg-orange-50 transition-colors flex items-center justify-center"
                    >
                      Create an Account
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </div>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg text-sm sm:text-base">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                    <h3 className="font-medium">Error</h3>
                  </div>
                  <p className="mt-1">{error}</p>
                </div>
              )}

              {ogData && (
                <div className="space-y-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Open Graph Validation Results</h3>
                  <div className="bg-gray-50 p-4 sm:p-6 rounded-lg border border-gray-200 font-mono text-xs sm:text-sm overflow-x-auto">
                    {Object.entries(ogData).map(([key, value]) => (
                      <div key={key} className="mb-2">
                        <span className="text-orange-600">&lt;meta property=&quot;og:{key}&quot; content=&quot;</span>
                        <span className="text-gray-800">{value}</span>
                        <span className="text-orange-600">&quot; /&gt;</span>
                      </div>
                    ))}
                  </div>
                  {ogData.image && (
                    <div className="mt-6">
                      <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Image Preview</h4>
                      <img
                        src={ogData.image || "/placeholder.svg"}
                        alt={ogData.imageAlt || "Open Graph image"}
                        className="max-w-full h-auto rounded-lg border border-gray-200"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            <p className="text-center text-gray-500 text-xs sm:text-sm">
              This professional-grade tool is provided free of charge. If you find it valuable, consider sharing it with
              your network!
            </p>
          </div>
          <OpenGraphValidatorInfo />
        </main>
      </div>
    </div>
  )
}

