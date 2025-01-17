'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { User } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Menu, Search, ArrowRight, Lock, Loader2 } from 'lucide-react'
import Sidebar from '../components/Sidebar'

interface AnalysisResult {
  // Define the structure of your analysis result here
  [key: string]: any
}

export default function LandingPageAnalyzer() {
  const [url, setUrl] = useState('')
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isAuthChecking, setIsAuthChecking] = useState(true)
  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
      } catch (error) {
        console.error('Error fetching user:', error)
      } finally {
        setIsAuthChecking(false)
      }
    }
    getUser()
  }, [supabase.auth])

  const handleAnalyze = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/analyze-landing-page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })
      if (!response.ok) {
        throw new Error('Failed to analyze landing page')
      }
      const result = await response.json()
      setAnalysis(result)
    } catch (error) {
      console.error('Error analyzing landing page:', error)
      setError('An error occurred while analyzing the landing page. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="flex h-screen bg-[#FBFCFE]">
      <Sidebar user={user} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 md:hidden">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="w-8" />
            <h1 className="text-xl font-bold text-center text-gray-900">Landing Page Analyzer</h1>
            <button 
              onClick={() => setSidebarOpen(true)} 
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <Menu className="h-6 w-6 text-gray-500" />
              <span className="sr-only">Open sidebar</span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Landing Page SEO Analyzer
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Optimize your landing pages for better search engine rankings and improved user experience.
              </p>
            </div>

            {isAuthChecking ? (
              <div className="flex justify-center items-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
              </div>
            ) : user ? (
              <div className="rounded-lg bg-white shadow-sm border border-gray-200 p-6">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="url" className="sr-only">
                      Landing Page URL
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        id="url"
                        name="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter your landing page URL"
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
                    {loading ? 'Analyzing...' : 'Analyze Landing Page'}
                  </button>
                </div>

                {error && (
                  <div className="mt-4 p-4 rounded-lg bg-red-50 text-red-700 text-sm">
                    {error}
                  </div>
                )}

                {analysis && (
                  <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>
                    <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto">
                      {JSON.stringify(analysis, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 space-y-6">
                <div className="text-center">
                  <div className="bg-orange-100 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-4">
                    <Lock className="w-10 h-10 text-orange-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign In Required</h2>
                  <p className="text-gray-600 mb-4">
                    To use our Landing Page Analyzer and improve your SEO rankings, please sign in or create an account. It's quick, easy, and free!
                  </p>
                </div>
                <div className="space-y-4">
                  <Link
                    href="/auth-form"
                    className="w-full bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center justify-center"
                  >
                    Sign In
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                  <Link
                    href="/auth-form"
                    className="w-full bg-white text-orange-500 px-6 py-3 rounded-lg font-medium border-2 border-orange-500 hover:bg-orange-50 transition-colors flex items-center justify-center"
                  >
                    Create an Account
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </div>
              </div>
            )}

            <p className="mt-4 text-center text-sm text-gray-600">
              This professional-grade SEO tool is provided free of charge. If you find it valuable, consider sharing it with your network!
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}

