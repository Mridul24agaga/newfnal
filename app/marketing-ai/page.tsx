'use client'

import { useState } from 'react'
import StrategyOverview from './StrategyOverview'
import ChannelStrategy from './ChannelStrategy'
import AnalysisResult from './AnalysisResult'

interface AnalysisData {
  summary: string;
  modifications: string[];
  channelStrategies: {
    name: string;
    timeline: string;
    cost: string;
    roi: string;
  }[];
  implementationSteps: string[];
  projections: {
    totalCost: string;
    timeline: string;
    expectedVisitors: string;
    expectedPayingUsers: string;
    expectedRevenue: string;
  };
}

export default function MarketingStrategyAnalyzer() {
  const [url, setUrl] = useState('')
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState('')
  const [rawResponse, setRawResponse] = useState('')

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    setError('')
    setAnalysis(null)
    setRawResponse('')
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      
      const contentType = response.headers.get("content-type");
      const responseText = await response.text();
      setRawResponse(responseText);

      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(`Unexpected content type: ${contentType}. Expected application/json.`);
      }

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        throw new Error('Failed to parse the response as JSON.');
      }

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed. Please try again.');
      }

      if (!data.analysis) {
        throw new Error('No analysis data received from the server.');
      }

      setAnalysis(data.analysis)
    } catch (error) {
      console.error('Error:', error)
      setError(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Marketing Strategy Analyzer</h1>
      <div className="mb-4">
        <label htmlFor="url-input" className="block text-sm font-medium text-gray-700 mb-2">
          Enter URL for analysis
        </label>
        <input
          id="url-input"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="w-full p-2 border rounded mb-2"
          aria-describedby="url-error"
        />
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !url}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
          aria-busy={isAnalyzing}
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze Strategy'}
        </button>
        {error && (
          <div id="url-error" className="mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded" role="alert">
            <p className="font-bold">Error:</p>
            <p>{error}</p>
          </div>
        )}
        {rawResponse && (
          <div className="mt-2 p-2 bg-gray-100 border border-gray-400 rounded">
            <p className="font-bold">Raw Response:</p>
            <pre className="whitespace-pre-wrap overflow-x-auto">{rawResponse}</pre>
          </div>
        )}
      </div>
      {analysis && (
        <div className="mt-4">
          <StrategyOverview analysis={analysis} />
          <ChannelStrategy channelStrategies={analysis.channelStrategies} />
          <AnalysisResult 
            implementationSteps={analysis.implementationSteps} 
            projections={analysis.projections} 
          />
        </div>
      )}
    </div>
  )
}

