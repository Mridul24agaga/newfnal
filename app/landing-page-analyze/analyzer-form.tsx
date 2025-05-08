"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { analyzeLandingPage } from "@/app/landing-page-analyze/actions/analyze"
import { Results } from "./results"
import { AnalysisHeader } from "./analysis-header"
import { ArrowRight, Lock, Loader2, Globe, AlertTriangle } from "lucide-react"
import Link from "next/link"

export function AnalyzerForm() {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [analysisData, setAnalysisData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const [isAuthChecking, setIsAuthChecking] = useState(true)

  const router = useRouter()
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

    if (!user) {
      setError("Please sign in to use the analyzer.")
      return
    }

    if (!url) {
      setError("Please enter a valid URL")
      return
    }

    try {
      // Validate URL format
      new URL(url)
    } catch {
      setError("Please enter a valid URL (e.g., https://example.com)")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const data = await analyzeLandingPage(url)
      setAnalysisData(data)
    } catch (error) {
      console.error("Error analyzing landing page:", error)
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("An unexpected error occurred")
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (analysisData) {
    return (
      <div className="space-y-8">
        <AnalysisHeader
          url={analysisData.metadata.url}
          score={analysisData.metadata.score}
          date={analysisData.metadata.date}
        />
        <Results analysisData={analysisData} />
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl border border-orange-100 p-6">
        {isAuthChecking ? (
          <div className="flex justify-center items-center h-24">
            <div className="flex flex-col items-center">
              <Loader2 className="h-8 w-8 animate-spin text-orange-500 mb-2" />
              <p className="text-gray-500 text-sm">Checking authentication...</p>
            </div>
          </div>
        ) : user ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mb-3 text-white">
                <Globe className="h-7 w-7" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Analyze Your Website</h2>
              <p className="text-gray-500 text-sm mt-1">Get actionable insights in seconds</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 flex items-center">
                <span className="text-red-500 mr-1">*</span> Website URL
              </label>
              <div className="relative">
                <input
                  id="url"
                  type="url"
                  placeholder="https://your-website.com/"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  pattern="https?://.*"
                  className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                />
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-3 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 disabled:from-orange-300 disabled:to-orange-400 transition-all duration-300 border border-orange-300 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  Analyzing...
                </>
              ) : (
                <>
                  Analyze Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>

            <div className="text-center text-xs text-gray-500 mt-2">Analysis typically takes 15-30 seconds</div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-3 text-white border border-orange-300">
                <Lock className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Sign In Required</h2>
              <p className="text-gray-600 text-sm mb-3">
                To use our Landing Page Analyzer, please sign in or create an account. It's quick, easy, and free!
              </p>
            </div>

            <div className="space-y-3">
              <Link
                href="/auth-form"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-3 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-300 border border-orange-300 flex items-center justify-center"
              >
                Sign In
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>

              <Link
                href="/auth-form"
                className="w-full bg-white text-orange-500 px-5 py-3 rounded-lg font-medium border border-orange-500 hover:bg-orange-50 transition-all duration-300 flex items-center justify-center"
              >
                Create an Account
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-3 bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg flex items-center animate-fadeIn">
          <AlertTriangle className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Already analyzed over <span className="font-semibold text-orange-500">10,000+</span> landing pages
        </p>
      </div>

      {isLoading && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl border border-orange-100 flex flex-col items-center">
            <div className="relative w-16 h-16 mb-3">
              <div className="absolute inset-0 rounded-full border-t-4 border-orange-500 animate-spin"></div>
              <div className="absolute inset-2 rounded-full border-2 border-orange-200"></div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Analyzing your landing page...</h3>
            <p className="text-gray-500 text-center text-sm max-w-md">
              We're checking your design, copy, SEO, and more to provide actionable insights.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
