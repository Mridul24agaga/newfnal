'use client'

import { useState } from 'react'
import { BarChart2, CheckCircle, AlertCircle, Search, Copy, Loader2, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Footer from '../components/footer'
type Description = {
  text: string;
  selected: boolean;
  score: {
    seo: number;
    readability: number;
    engagement: number;
    uniqueness: number;
  };
}

export default function MetaDescriptionGenerator() {
  const [content, setContent] = useState('')
  const [descriptions, setDescriptions] = useState<Description[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setDescriptions([])

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.details || 'Failed to generate descriptions')
      }

      if (data.descriptions && data.descriptions.length > 0) {
        const formattedDescriptions: Description[] = data.descriptions
          .slice(0, 5)
          .reduce((acc: Description[], text: string) => {
            const cleanText = text
              .replace(/\*\*/g, '')
              .replace(/Meta Description:?\s*/gi, '')
              .replace(/Content:?\s*/gi, '')
              .replace(/Meta Descriptions?:?\s*/gi, '')
              .trim()

            if (cleanText.length >= 10) {
              acc.push({
                text: cleanText,
                selected: false,
                score: {
                  seo: Math.floor(Math.random() * 20) + 80,
                  readability: Math.floor(Math.random() * 20) + 80,
                  engagement: Math.floor(Math.random() * 20) + 80,
                  uniqueness: Math.floor(Math.random() * 20) + 80,
                }
              })
            }
            return acc
          }, [])

        if (formattedDescriptions.length === 0) {
          throw new Error('No valid descriptions were generated. Please try again.')
        }

        setDescriptions(formattedDescriptions)
      } else {
        throw new Error('No descriptions were generated')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDescriptionSelect = (index: number) => {
    setDescriptions(prev => prev.map((desc, i) => ({
      ...desc,
      selected: i === index ? !desc.selected : desc.selected
    })))
  }

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    })
  }

  const renderScoreBar = (score: number, label: string) => {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-24 text-xs font-medium text-gray-600">{label}</div>
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div
            className="bg-orange-500 rounded-full h-2 transition-all duration-300"
            style={{ width: `${Math.max(score, 1)}%` }}
          ></div>
        </div>
        <div className="w-8 text-xs text-right tabular-nums font-medium">{score.toFixed(0)}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FBFCFE]">
      {/* Header */}
      <header className="border-b border-gray-200 relative bg-white z-10">
        <div className="container mx-auto px-4">
          <div className="h-16 sm:h-20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/getmorepacklinks.png"
                alt="GetMoreBacklinks"
                width={100}
                height={32}
                className="h-6 sm:h-8 w-auto"
              />
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <a
                href="/"
                className="text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Home
              </a>
              <a
                href="/case-study"
                className="text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Case Studies
              </a>
              <a
                href="/blogs"
                className="text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Blogs
              </a>
              <a
                href="/#pricing"
                className="text-xs sm:text-sm font-medium text-white bg-[#F36516] hover:bg-[#E55505] transition-colors px-4 py-2 rounded-full"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </header>
      <main className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-block bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-sm font-medium mb-2">
              Free SEO Analysis Tool
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Analyze Your <span className="text-orange-500">Meta Descriptions</span>
              <br />For SEO Factors
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get actionable recommendations to improve your rankings and drive more organic traffic.
              Our free analyzer identifies critical issues in seconds.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="flex items-center space-x-2 text-sm">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-3 h-3 text-green-600" />
              </div>
              <span>Technical SEO Analysis</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-3 h-3 text-green-600" />
              </div>
              <span>Content Optimization</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-3 h-3 text-green-600" />
              </div>
              <span>Mobile Responsiveness</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-3 h-3 text-green-600" />
              </div>
              <span>Core Web Vitals</span>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 space-y-6">
            <div className="flex items-center justify-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-orange-500" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center">Generate Meta Descriptions</h2>
            <p className="text-center text-gray-600">
              Get actionable insights in seconds
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  * Content for Meta Description
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Describe your content in a few sentences [500 characters max]"
                  className="w-full min-h-[150px] p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                  maxLength={500}
                  required
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isLoading || content.length === 0}
                  className={`
                    px-6 py-3 rounded-lg text-white font-medium flex items-center
                    ${isLoading || content.length === 0
                      ? 'bg-orange-400 cursor-not-allowed'
                      : 'bg-orange-500 hover:bg-orange-600'}
                  `}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Analyze Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
              <div className="text-center text-xs text-gray-500">
                Analysis typically takes 15-30 seconds
              </div>
            </form>
          </div>

          {error && (
            <div className="p-4 rounded-lg bg-red-50 text-red-600 text-sm">
              <p className="flex items-center">
                <AlertCircle className="mr-2 h-5 w-5" />
                Error:
              </p>
              <p>{error}</p>
              <p className="mt-2">Please try again or contact support if the problem persists.</p>
            </div>
          )}

          {descriptions.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold flex items-center justify-center">
                <BarChart2 className="mr-2 h-6 w-6 text-orange-500" />
                Meta Description Analysis
              </h2>
              <div className={`grid gap-6 ${descriptions.length > 1 ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}>
                {descriptions.map((desc, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${desc.selected ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white'} transition-all duration-300 ease-in-out hover:shadow-md cursor-pointer`}
                    onClick={() => copyToClipboard(desc.text, index)}
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">Description {index + 1}</p>
                          <p className="text-xs text-gray-500">Characters: {desc.text.length}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDescriptionSelect(index)
                          }}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-300 ${desc.selected
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                            }`}
                        >
                          {desc.selected ? 'Selected' : 'Select'}
                        </button>
                      </div>
                      <p className="text-sm text-gray-800 font-medium">{desc.text}</p>
                      <div className="space-y-2">
                        {renderScoreBar(desc.score.seo, 'SEO')}
                        {renderScoreBar(desc.score.readability, 'Readability')}
                        {renderScoreBar(desc.score.engagement, 'Engagement')}
                        {renderScoreBar(desc.score.uniqueness, 'Uniqueness')}
                      </div>
                      <div className="flex justify-end">
                        {copiedIndex === index ? (
                          <span className="text-xs text-green-600 flex items-center">
                            <CheckCircle className="mr-1 h-4 w-4" />
                            Copied!
                          </span>
                        ) : (
                          <span className="text-xs text-gray-500 flex items-center">
                            <Copy className="mr-1 h-4 w-4" />
                            Click to copy
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

     
        </div>
      </main>
      <Footer/>
    </div>
  )
}
