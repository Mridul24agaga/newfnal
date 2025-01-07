'use client'

import { Share2, LinkIcon } from 'lucide-react'

interface AnalysisHeaderProps {
  url: string
  score: number
  date: string
  description?: string
}

export function AnalysisHeader({ url, score, date, description }: AnalysisHeaderProps) {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
  }

  const handleShare = async (platform: 'twitter' | 'linkedin') => {
    const text = `Check out this landing page analysis for ${url}`
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`
    }
    window.open(urls[platform], '_blank')
  }

  const domain = url ? new URL(url).hostname : 'Website'

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 relative overflow-hidden mt-4 sm:mt-8 mx-auto max-w-5xl">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-pink-400"></div>
      <div className="p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{domain}</h1>
            <h2 className="text-base sm:text-lg text-gray-600">Landing Page Analysis</h2>
          </div>
          <div className="relative w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] flex-shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                className="stroke-gray-100"
                strokeWidth="10"
                fill="transparent"
                r="45"
                cx="50"
                cy="50"
              />
              <circle
                className="stroke-orange-500"
                strokeWidth="10"
                strokeLinecap="round"
                fill="transparent"
                r="45"
                cx="50"
                cy="50"
                style={{
                  strokeDasharray: `${2 * Math.PI * 45}`,
                  strokeDashoffset: `${2 * Math.PI * 45 * (1 - score / 100)}`,
                }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl sm:text-2xl font-bold">{score}</span>
              <span className="text-xs text-gray-500">Score</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs sm:text-sm font-medium text-gray-500">Website:</span>
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 truncate max-w-[calc(100%-4rem)]"
            >
              {url}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-medium text-gray-500">Generated on:</span>
            <span className="text-xs sm:text-sm text-gray-700">{new Date(date).toLocaleString()}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="flex-1 flex items-center justify-center px-3 py-2 text-xs sm:text-sm bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors"
          >
            <LinkIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            Copy link
          </button>
          <button
            onClick={() => handleShare('linkedin')}
            className="flex-1 p-2 text-gray-600 hover:text-blue-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center"
            aria-label="Share on LinkedIn"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </button>
          <button
            onClick={() => handleShare('twitter')}
            className="flex-1 p-2 text-gray-600 hover:text-blue-400 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center"
            aria-label="Share on Twitter"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

