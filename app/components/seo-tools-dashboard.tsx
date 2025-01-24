"use client"

import { Link, Search, FileText, BarChart, Globe, Rocket, Share2 } from "lucide-react"

export default function SEOToolsDashboard() {
  return (
    <div id="free" className="container mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-2">
          Free <span className="text-orange-600">SEO Tools</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Boost your website's visibility with our powerful suite of SEO tools
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Backlink Directory */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
              <div className="text-orange-600">const directory = {`{`}</div>
              <div className="text-orange-600 pl-4">domain: 'example.com',</div>
              <div className="text-orange-600 pl-4">category: 'Technology'</div>
              <div className="text-orange-600">{`}`}</div>
            </div>
            <div className="flex items-center gap-2">
              <Link className="w-5 h-5 text-gray-700" />
              <h3 className="font-semibold text-gray-900">Backlink Directory</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Submit your website to our curated directory of high-authority domains.
            </p>
          </div>
        </div>

        {/* Landing Page Analyzer */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Performance Score</span>
                <span className="text-orange-600 font-semibold">98/100</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-orange-500 rounded-full" style={{ width: "98%" }}></div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-gray-700" />
              <h3 className="font-semibold text-gray-900">Landing Page Analyzer</h3>
            </div>
            <p className="text-gray-600 text-sm">Get detailed insights about your landing page SEO and performance.</p>
          </div>
        </div>

        {/* Open Graph Validator */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg p-4 text-white">
              <div className="border border-white/20 rounded p-3 bg-white/10">
                <Share2 className="w-8 h-8 mb-2" />
                <div className="text-sm">Preview your social cards</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-gray-700" />
              <h3 className="font-semibold text-gray-900">Open Graph Validator</h3>
            </div>
            <p className="text-gray-600 text-sm">Test how your content appears when shared on social media.</p>
          </div>
        </div>
      </div>

      {/* Meta Tools Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-gray-700" />
                <h3 className="font-semibold text-gray-900">Meta Description Generator</h3>
              </div>
              <span className="bg-purple-100 text-orange-800 text-xs px-2.5 py-1 rounded-full">AI-Powered</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-orange-600" />
                  <span className="text-sm text-gray-600">Characters</span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold">155</span>
                  <span className="text-green-500 text-sm">Optimal</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-orange-600 rounded-full" style={{ width: "100%" }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-orange-600" />
                  <span className="text-sm text-gray-600">Keywords</span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold">3-4</span>
                  <span className="text-green-500 text-sm">Perfect</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-orange-600 rounded-full" style={{ width: "90%" }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <BarChart className="w-4 h-4 text-orange-600" />
                  <span className="text-sm text-gray-600">CTR Impact</span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold">85%</span>
                  <span className="text-green-500 text-sm">+15%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-orange-600 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              Generate SEO-optimized meta descriptions that improve click-through rates and search visibility. Our AI
              ensures the perfect length and keyword density.
            </p>
          </div>
        </div>

        {/* Launch Fast Section */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Rocket className="w-5 h-5 text-gray-700" />
              <h3 className="font-semibold text-gray-900">Launch Fast Tool</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Generate optimized launch posts for multiple platforms in one click.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Product Hunt</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700">Indie Hackers</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-700">Hacker News</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-gray-700">Reddit</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              Save hours of work by automatically generating platform-optimized launch posts that follow best practices
              for each community.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

