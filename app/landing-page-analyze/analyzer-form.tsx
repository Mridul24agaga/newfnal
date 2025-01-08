'use client'

import { useState } from 'react'
import { analyzeLandingPage } from './actions/analyze'
import { LoadingAnimation } from './loading-animation'
import { Results } from './results'
import { AnalysisHeader } from './analysis-header'

export function AnalyzerForm() {
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [analysisData, setAnalysisData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    try {
      const data = await analyzeLandingPage('url', input, 'user-id')
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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-50 via-white to-mint-50">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          <span className="text-amber-400">Landing Page</span>
          <br />
          <span className="text-navy-900">Analyzer</span>
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Get a detailed analysis of your landing page about copy, design, and more
          to improve your conversion rate. 100% Free to use, no signup required.
        </p>
      </div>

      <div className="w-full max-w-xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
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
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
            >
              {isLoading ? 'Analyzing...' : 'Analyze Now'}
            </button>
          </form>
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

