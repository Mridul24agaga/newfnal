'use client'

import { useState, useEffect } from "react"
import { ArrowUpRight, Search, TrendingUp } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

export default function Hero() {
  const [url, setUrl] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Header */}
      <header className="border-b border-gray-200 relative bg-white">
        <div className="container mx-auto px-4">
          <div className="h-16 sm:h-20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/getmorepacklinks.png"
                alt="getmorebacklinks"
                width={100}
                height={32}
                className="h-8 sm:h-10 w-auto"
              />
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Link 
                href="/book-call"
                className="text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                📞 Book a call
              </Link>
              <Link 
                href="/auth-form"
                className="text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 pt-12 sm:pt-20 pb-12 sm:pb-16 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-12">
          {/* Subtle element */}
          <div className={`inline-flex items-center bg-white transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'} rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 mt-2 sm:mt-4 shadow-sm border border-gray-100`}>
            <span className="text-sm sm:text-base">✨</span>
            <span className="text-[#F78226] text-xs sm:text-sm font-medium ml-1 sm:ml-2">
              One Click to SEO and Authority
            </span>
          </div>

          {/* Main Heading */}
          <h1 className={`text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-gray-900 leading-tight transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
            Get 10x more backlinks<br />
            <span className="text-[#F78226]">on autopilot</span>
          </h1>
            
          <p className={`text-base sm:text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
            The ultimate link building software. Get premium backlinks with high quality outreach, rank higher with 90% less effort.
          </p>

          {/* Search Form */}
          <div className={`max-w-xl mx-auto transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
            <div className="flex sm:flex-row relative bg-white rounded-full shadow-sm overflow-hidden border border-gray-200 sm:border-gray-300 sm:rounded-md sm:shadow-none">
              <input
                type="url"
                placeholder="Website URL"
                className="flex-1 h-12 pl-4 pr-24 sm:px-4 border-0 sm:border sm:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F78226] focus:border-transparent text-sm sm:text-base sm:rounded-md"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <button className="absolute right-0 top-0 h-full sm:static sm:h-12 px-6 sm:px-8 bg-[#F78226] text-white font-medium transition-colors hover:bg-[#F78226]/90 text-sm sm:text-base sm:rounded-md">
                Get Backlinks
              </button>
            </div>
          </div>

          {/* Features */}
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 pt-6 sm:pt-12 transition-all duration-1000 delay-700 ease-out ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
            <div className="flex flex-col items-center text-center space-y-2 sm:space-y-4 group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors duration-300">
                <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 text-[#FF4405]" />
              </div>
              <h3 className="text-base sm:text-xl font-semibold text-gray-800">High Quality Backlinks</h3>
              <p className="text-xs sm:text-base text-gray-600">Boost your site's authority with premium, relevant backlinks from trusted sources.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2 sm:space-y-4 group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                <Search className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              </div>
              <h3 className="text-base sm:text-xl font-semibold text-gray-800">Higher Search Rankings</h3>
              <p className="text-xs sm:text-base text-gray-600">Improve your search engine rankings and increase organic traffic to your website.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2 sm:space-y-4 group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              </div>
              <h3 className="text-base sm:text-xl font-semibold text-gray-800">Scaled Link Building</h3>
              <p className="text-xs sm:text-base text-gray-600">Efficiently expand your outreach efforts and build a robust backlink profile.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

