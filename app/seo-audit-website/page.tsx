'use client'

import { useState, useEffect } from 'react'
import { AnalysisResult } from '@/app/types/seo'
import Sidebar from '@/app/components/Sidebar'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { User } from '@supabase/auth-helpers-nextjs'
import { Search, ArrowRight } from 'lucide-react'

export default function SEOOptimizer() {
  const [url, setUrl] = useState('')
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [supabase.auth])

  const handleAnalyze = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })
      if (!response.ok) {
        throw new Error('Failed to analyze website')
      }
      const result = await response.json()
      setAnalysis(result)
    } catch (error) {
      console.error('Error analyzing website:', error)
      setError('An error occurred while analyzing the website. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="flex h-screen bg-[#FBFCFE]">
      <Sidebar user={user} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 overflow-hidden">
        <main className="h-full overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-gray-900">SEO Optimizer</h1>
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
              <div className="flex space-x-2 mb-4">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter website URL"
                    className="w-full p-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <button
                  onClick={handleAnalyze}
                  disabled={loading}
                  className="px-6 py-3 bg-orange-500 text-white rounded-lg disabled:bg-gray-400 hover:bg-orange-600 transition-colors flex items-center"
                >
                  {loading ? 'Analyzing...' : 'Analyze'}
                  {!loading && <ArrowRight className="ml-2" size={18} />}
                </button>
              </div>

              {error && (
                <div className="text-red-500 mb-4 p-3 bg-red-100 rounded-lg">
                  {error}
                </div>
              )}
            </div>

            {analysis && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {analysis.onPageSEO && (
                  <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">On-Page SEO</h2>
                    {analysis.onPageSEO.titleTag && (
                      <div className="mb-4">
                        <p className="font-semibold">Title Score: <span className="text-orange-500">{analysis.onPageSEO.titleTag.score}/100</span></p>
                        <p className="text-gray-600">{analysis.onPageSEO.titleTag.suggestions}</p>
                      </div>
                    )}
                    {analysis.onPageSEO.metaDescription && (
                      <div className="mb-4">
                        <p className="font-semibold">Meta Description Score: <span className="text-orange-500">{analysis.onPageSEO.metaDescription.score}/100</span></p>
                        <p className="text-gray-600">{analysis.onPageSEO.metaDescription.suggestions}</p>
                      </div>
                    )}
                    {analysis.onPageSEO.headings && (
                      <div>
                        <p className="font-semibold">Headings Score: <span className="text-orange-500">{analysis.onPageSEO.headings.score}/100</span></p>
                        <p className="text-gray-600">{analysis.onPageSEO.headings.suggestions}</p>
                      </div>
                    )}
                  </div>
                )}

                {analysis.technicalSEO && (
                  <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Technical SEO</h2>
                    <p className="mb-2"><span className="font-semibold">HTTPS:</span> {analysis.technicalSEO.https ? 'Enabled' : 'Disabled'}</p>
                    <p className="mb-2"><span className="font-semibold">Mobile Responsive:</span> {analysis.technicalSEO.mobileResponsive ? 'Yes' : 'No'}</p>
                    <p className="mb-2"><span className="font-semibold">Canonical URL:</span> {analysis.technicalSEO.canonicalUrl}</p>
                    <p><span className="font-semibold">Robots.txt:</span> {analysis.technicalSEO.robotsTxt ? 'Valid' : 'Invalid/Missing'}</p>
                  </div>
                )}

                {analysis.imageOptimization && (
                  <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Image Optimization</h2>
                    <p className="mb-2"><span className="font-semibold">Total Images:</span> {analysis.imageOptimization.totalImages}</p>
                    <p className="mb-2"><span className="font-semibold">Images with Alt Text:</span> {analysis.imageOptimization.imagesWithAltText}</p>
                    <p className="mb-2"><span className="font-semibold">Lazy Loaded Images:</span> {analysis.imageOptimization.lazyLoadedImages}</p>
                    <p className="text-gray-600">{analysis.imageOptimization.suggestions}</p>
                  </div>
                )}

                {analysis.contentAnalysis && (
                  <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Content Analysis</h2>
                    <p className="mb-4"><span className="font-semibold">Word Count:</span> {analysis.contentAnalysis.wordCount}</p>
                    <p className="font-semibold mb-2">Quality Suggestions:</p>
                    <ul className="list-disc pl-5 text-gray-600">
                      {analysis.contentAnalysis.qualitySuggestions.split('. ').map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {analysis.structuredData && (
                  <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Structured Data</h2>
                    <p className="mb-2"><span className="font-semibold">Implemented:</span> {analysis.structuredData.implemented ? 'Yes' : 'No'}</p>
                    <p className="text-gray-600">{analysis.structuredData.recommendations}</p>
                  </div>
                )}

                {analysis.competitiveEdge && (
                  <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Competitive Edge</h2>
                    <p className="mb-2"><span className="font-semibold">Comparison:</span> {analysis.competitiveEdge.comparison}</p>
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

