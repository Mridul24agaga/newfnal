'use client'

import { ProgressCircle } from './progress-circle'

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
  if (!analysisData?.results || !Array.isArray(analysisData.results)) {
    return null
  }

  const { results } = analysisData

  const getColorClass = (score: number) => {
    if (score >= 75) return 'stroke-emerald-500'
    if (score >= 60) return 'stroke-orange-500'
    return 'stroke-rose-500'
  }

  // Calculate overall summary
  const summary = results.map(result => ({
    category: result.category,
    score: result.score,
    color: getColorClass(result.score)
  }))

  const mainRecommendations = results.flatMap(result => 
    result.recommendations.slice(0, 1)
  ).slice(0, 5)

  return (
    <div className="mt-8 space-y-8 bg-gray-50 p-6 rounded-lg">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Summary:</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {summary.map(({ category, score, color }) => (
            <ProgressCircle
              key={category}
              percentage={score}
              label={category}
              color={color}
            />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {results.map((result) => (
          <div key={result.category} className="space-y-2">
            <h3 className="text-xl font-semibold">{result.category}</h3>
            <p className="text-gray-600">{result.feedback}</p>
            <div className="pl-4">
              <h4 className="font-semibold mt-2 mb-1">Recommendations:</h4>
              <ul className="list-none space-y-1">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-gray-400 mr-2">→</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-6">
        <h3 className="text-xl font-bold mb-4">Main Recommendations:</h3>
        <ul className="space-y-2">
          {mainRecommendations.map((rec, index) => (
            <li key={index} className="flex items-start">
              <span className="text-gray-400 mr-2">→</span>
              {rec}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

