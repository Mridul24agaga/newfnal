'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, CheckCircle, Menu } from 'lucide-react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Sidebar from '@/app/components/Sidebar'

type Category = 'Messaging' | 'Readability' | 'Structure' | 'Actionability' | 'Design' | 'Credibility'

interface Result {
  category: Category
  score: number
  feedback: string
  recommendations: string[]
}

interface ResultsProps {
  analysisData: {
    results: Result[]
    metadata: {
      url: string
      score: number
      date: string
      screenshot?: string
    }
  }
}

export function Results({ analysisData }: ResultsProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [supabase.auth])

  if (!analysisData?.results || !Array.isArray(analysisData.results)) {
    return null
  }

  const { results, metadata } = analysisData

  const getColorClass = (score: number) => {
    if (score >= 75) return 'bg-emerald-500'
    if (score >= 60) return 'bg-orange-500'
    return 'bg-rose-500'
  }

  const getScoreText = (score: number) => {
    if (score >= 75) return 'Excellent'
    if (score >= 60) return 'Good'
    return 'Needs Improvement'
  }

  // Calculate overall summary
  const summary = results.map(result => ({
    category: result.category,
    score: result.score,
    color: getColorClass(result.score),
    text: getScoreText(result.score)
  }))

  const mainRecommendations = results.flatMap(result => 
    result.recommendations.slice(0, 1)
  ).slice(0, 5)

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar user={user} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Analysis Results</h1>
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-2 rounded-md hover:bg-gray-100"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="space-y-8">
              <section className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Analysis Summary</h2>
                <div className="flex flex-wrap items-center gap-4">
                  {summary.map(({ category, score, color, text }) => (
                    <div key={category} className="flex items-center space-x-2">
                      <div className={`w-10 h-10 ${color} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                        {score}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold">{category}</h3>
                        <p className="text-xs text-gray-500">{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Detailed Analysis</h2>
                <div className="space-y-6">
                  {results.map((result) => (
                    <div key={result.category} className="space-y-2">
                      <h3 className="text-xl font-semibold flex items-center">
                        <span className={`inline-block px-2 py-1 rounded-full text-white text-sm mr-2 ${getColorClass(result.score)}`}>
                          {result.score}
                        </span>
                        {result.category}
                      </h3>
                      <p className="text-gray-600">{result.feedback}</p>
                      <div className="pl-4 mt-2">
                        <h4 className="font-semibold mb-2">Recommendations:</h4>
                        <ul className="space-y-2">
                          {result.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start">
                              <ArrowRight className="h-5 w-5 mr-2 text-gray-400 flex-shrink-0 mt-0.5" />
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Key Recommendations</h2>
                <ul className="space-y-3">
                  {mainRecommendations.map((rec, index) => (
                    <li key={index} className="flex items-start bg-gray-50 p-3 rounded-lg">
                      <CheckCircle className="h-5 w-5 mr-3 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Analysis Metadata</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-500">Analyzed URL</p>
                    <p className="text-sm">{metadata.url}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500">Overall Score</p>
                    <p className="text-sm">{metadata.score}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500">Analysis Date</p>
                    <p className="text-sm">{new Date(metadata.date).toLocaleString()}</p>
                  </div>
                </div>
              </section>

              {metadata.screenshot && (
                <section className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold mb-4">Page Screenshot</h2>
                  <img src={metadata.screenshot} alt="Analyzed page screenshot" className="w-full h-auto rounded-lg" />
                </section>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

