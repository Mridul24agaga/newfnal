'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, CheckCircle, BarChart2, Globe, Calendar } from 'lucide-react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

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

function ScoreBadge({ score }: { score: number }) {
  const getColorClass = (score: number) => {
    if (score >= 75) return 'bg-emerald-500'
    if (score >= 60) return 'bg-orange-500'
    return 'bg-rose-500'
  }

  return (
    <div className={`${getColorClass(score)} text-white font-bold rounded-full w-12 h-12 flex items-center justify-center text-lg`}>
      {score}
    </div>
  )
}

export function Results({ analysisData }: ResultsProps) {
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

  const mainRecommendations = results.flatMap(result => 
    result.recommendations.slice(0, 1)
  ).slice(0, 3)

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="mx-auto py-4 px-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Analysis Results</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 overflow-hidden">
            <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">Overall Score</h2>
            <div className="flex items-center justify-between">
              <ScoreBadge score={metadata.score} />
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{metadata.score}/100</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Overall Performance</p>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <h2 className="text-lg font-bold p-4 text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700">Category Breakdown</h2>
            {results.map((result, index) => (
              <div key={result.category} className={`p-4 ${index !== results.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''}`}>
                <div className="flex items-center space-x-3 mb-3">
                  <ScoreBadge score={result.score} />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{result.category}</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{result.feedback}</p>
                <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Recommendations:</h4>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, recIndex) => (
                    <li key={recIndex} className="flex items-start space-x-2">
                      <ArrowRight className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">Key Recommendations</h2>
            <ul className="space-y-3">
              {mainRecommendations.map((rec, index) => (
                <li key={index} className="flex items-start bg-blue-50 dark:bg-blue-900 p-3 rounded-lg">
                  <CheckCircle className="h-5 w-5 mr-3 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{rec}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">Analysis Details</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Globe className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Analyzed URL</p>
                  <p className="text-sm text-gray-900 dark:text-gray-100">{metadata.url}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Analysis Date</p>
                  <p className="text-sm text-gray-900 dark:text-gray-100">{new Date(metadata.date).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </section>

          {metadata.screenshot && (
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <h2 className="text-lg font-bold p-4 text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700">Page Screenshot</h2>
              <div className="aspect-w-16 aspect-h-9">
                <img src={metadata.screenshot} alt="Analyzed page screenshot" className="object-cover w-full h-full" />
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  )
}

