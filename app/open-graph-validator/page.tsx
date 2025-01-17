'use client'

import { useState } from 'react'
import { AlertCircle, Loader2, Menu } from 'lucide-react'
import Sidebar from '../components/Sidebar'

type OpenGraphData = {
  title?: string
  url?: string
  siteName?: string
  locale?: string
  image?: string
  imageWidth?: string
  imageHeight?: string
  imageAlt?: string
  type?: string
}

export default function URLValidator() {
  const [url, setUrl] = useState('')
  const [ogData, setOgData] = useState<OpenGraphData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setOgData(null)

    try {
      const response = await fetch('/api/validate-og', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch URL data')
      }

      const data = await response.json()
      setOgData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar user={null} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-500 focus:outline-none focus:text-gray-700 md:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">URL Validator</h1>
          <div className="w-6 h-6" /> {/* Placeholder for symmetry */}
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl">
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">Professional URL Validator</h2>
              <p className="text-center text-gray-600 mb-6 text-sm sm:text-base">
                Generate, analyze, and validate URLs to enhance your content's visibility and engagement.
              </p>

              <form onSubmit={handleSubmit} className="mb-6">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="url"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-150 ease-in-out"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`px-6 py-2 rounded-lg text-white font-medium transition duration-150 ease-in-out ${
                      isLoading ? 'bg-orange-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2'
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="inline-block mr-2 h-5 w-5 animate-spin" />
                        Validating...
                      </>
                    ) : (
                      'Validate'
                    )}
                  </button>
                </div>
              </form>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg text-sm sm:text-base">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                    <h3 className="font-medium">Error</h3>
                  </div>
                  <p className="mt-1">{error}</p>
                </div>
              )}

              {ogData && (
                <div className="space-y-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">URL Validation Results</h3>
                  <div className="bg-gray-50 p-4 sm:p-6 rounded-lg border border-gray-200 font-mono text-xs sm:text-sm overflow-x-auto">
                    {Object.entries(ogData).map(([key, value]) => (
                      <div key={key} className="mb-2">
                        <span className="text-orange-600">&lt;meta property=&quot;og:{key}&quot; content=&quot;</span>
                        <span className="text-gray-800">{value}</span>
                        <span className="text-orange-600">&quot; /&gt;</span>
                      </div>
                    ))}
                  </div>
                  {ogData.image && (
                    <div className="mt-6">
                      <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Image Preview</h4>
                      <img 
                        src={ogData.image || "/placeholder.svg"} 
                        alt={ogData.imageAlt || "Open Graph image"} 
                        className="max-w-full h-auto rounded-lg border border-gray-200"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            <p className="text-center text-gray-500 text-xs sm:text-sm">
              This professional-grade tool is provided free of charge. If you find it valuable, consider sharing it with your network!
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}

