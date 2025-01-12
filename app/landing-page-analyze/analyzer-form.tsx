'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { analyzeLandingPage } from './actions/analyze'
import { LoadingAnimation } from './loading-animation'
import { Results } from './results'
import { AnalysisHeader } from './analysis-header'
import { ArrowRight, Lock, Mail, Key, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'

export function AnalyzerForm() {
  const [input, setInput] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [analysisData, setAnalysisData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)

  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [supabase.auth])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      setError('Please sign in to use the analyzer.')
      return
    }
    setIsLoading(true)
    setError(null)
    try {
      const data = await analyzeLandingPage('url', input, user.id)
      setAnalysisData(data)
    } catch (error) {
      console.error('Error analyzing landing page:', error)
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unexpected error occurred')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      router.refresh()
    } catch (error) {
      console.error('Error signing in:', error)
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unexpected error occurred during sign in')
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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#FBFCFE]">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          <span className="text-orange-500">Landing Page</span>
          <br />
          <span className="text-gray-900">Analyzer</span>
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Get a detailed analysis of your landing page about copy, design, and more
          to improve your conversion rate. Sign in to use our free analyzer.
        </p>
      </div>

      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-xl border-2 border-orange-200 p-8">
          {user ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                  <span className="text-red-500">*</span> Website URL
                </label>
                <input
                  id="url"
                  type="url"
                  placeholder="https://your-website.com/"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 disabled:bg-orange-300 transition-colors"
              >
                {isLoading ? 'Analyzing...' : 'Analyze Now'}
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <div className="bg-orange-100 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-4">
                  <Lock className="w-10 h-10 text-orange-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign In Required</h2>
                <p className="text-gray-600 mb-4">
                  To use our Landing Page Analyzer, please sign in or create an account. It's quick, easy, and free!
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
        </div>

        {isLoading && (
          <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
            <LoadingAnimation />
          </div>
        )}

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
      </div>
    </div>
  )
}

