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

  const { results, metadata } = analysisData

  const getColorClass = (score: number) => {
    if (score >= 75) return 'stroke-emerald-500'
    if (score >= 60) return 'stroke-orange-500'
    return 'stroke-rose-500'
  }

  const getScoreDescription = (score: number) => {
    if (score >= 90) return 'Excellent'
    if (score >= 75) return 'Good'
    if (score >= 60) return 'Fair'
    return 'Needs Improvement'
  }

  // Calculate overall summary
  const summary = results.map(result => ({
    category: result.category,
    score: result.score,
    color: getColorClass(result.score)
  }))

  return (
    <div className="mt-8 space-y-8 bg-gray-50 p-6 rounded-lg">
      <div className="border-b pb-6">
        <h2 className="text-2xl font-bold mb-2">Landing Page Analysis</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-4xl font-bold">{metadata.score}</span>
            <div className="text-sm text-gray-600">
              <div>Overall Score</div>
              <div>{getScoreDescription(metadata.score)}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold">Category Breakdown:</h3>
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
          <div key={result.category} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">{result.category}</h3>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                result.score >= 75 ? 'bg-emerald-100 text-emerald-800' :
                result.score >= 60 ? 'bg-orange-100 text-orange-800' :
                'bg-rose-100 text-rose-800'
              }`}>
                Score: {result.score}
              </div>
            </div>
            <div className="prose prose-sm max-w-none">
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900">Analysis:</h4>
                <p className="text-gray-600">{result.feedback}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Recommendations:</h4>
                <ul className="list-none space-y-2 mt-2">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2">→</span>
                      <span className="text-gray-600">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-sm text-gray-500">
        <div>Website: {metadata.url}</div>
        <div>Generated on: {new Date(metadata.date).toLocaleString()}</div>
      </div>
    </div>
  )
}

