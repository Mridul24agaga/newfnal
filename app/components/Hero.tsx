'use client'

import { useState, useEffect } from "react"
import { ArrowUpRight, Search } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

export default function Hero() {
  const [url, setUrl] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Header */}
      <header className="border-b border-gray-200 relative bg-white z-10">
        <div className="container mx-auto px-4">
          <div className="h-16 sm:h-20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/getmorepacklinks.png"
                alt="getmorebacklinks"
                width={100}
                height={32}
                className="h-6 sm:h-8 w-auto"
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

      {/* Orange Gradient Section */}
      <div className="bg-gradient-to-r from-[#F36516] to-[#FE9D40] pt-8 sm:pt-12 pb-72 sm:pb-80 md:pb-96 relative z-0">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
            {/* Subtle element */}
            <div className={`inline-flex items-center bg-white transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'} rounded-full px-2 sm:px-3 py-1 sm:py-1.5 shadow-sm border border-gray-100`}>
              <span className="text-xs sm:text-sm">✨</span>
              <span className="text-black text-xs sm:text-sm font-medium ml-1 sm:ml-2">
                One Click to SEO and Authority
              </span>
            </div>

            {/* Main Heading */}
            <h1 className={`text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
              Get 10x more backlinks<br className="hidden sm:inline" />
              <span className="text-white"> on autopilot</span>
            </h1>

            <p className={`text-white/90 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
              The ultimate link building software. Get premium backlinks with high quality outreach, rank higher with 90% less effort.
            </p>

            {/* Search Form */}
            <div className={`max-w-xl mx-auto transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 relative">
                <input
                  type="url"
                  placeholder="Website URL"
                  className="w-full sm:flex-1 h-12 px-4 rounded-full sm:rounded-l-full sm:rounded-r-none border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent text-sm"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <button className="w-full sm:w-auto h-12 px-6 bg-orange-600 text-white font-medium transition-colors hover:bg-orange-700 text-sm rounded-full sm:rounded-l-none sm:rounded-r-full">
                  Get Backlinks
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlapping Card and Additional Cards */}
      <div className="relative z-10 -mt-64 sm:-mt-72 md:-mt-80">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Overlapping Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 md:p-12 mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-6">
                Supercharge Your SEO with{' '}
                <span className="text-[#4285f4]">10x More Backlinks</span>
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg text-center mb-6 sm:mb-8 md:mb-12">
                Our AI-powered platform finds high-quality, relevant backlinks and automates outreach, saving you time and boosting your rankings.
              </p>
              <div className="relative">
                <div className="absolute -right-2 -top-2 sm:-right-4 sm:-top-4">
                  <Image
                    src="/placeholder.svg?height=50&width=50"
                    alt="Cursor icon"
                    width={50}
                    height={50}
                    className="w-8 h-8 sm:w-12 sm:h-12"
                  />
                </div>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <Image
                    src="/chart.webp"
                    alt="Backlinks Growth Graph"
                    width={800}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>

            {/* Updated Additional Cards */}
            <div className="grid gap-8 md:grid-cols-2">
              {/* Card 1 - Hours to Minutes */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
                <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                  <span className="text-[#F36516]">20+ hours</span> → <span className="text-[#F36516]">20 minutes</span>
                </h3>
                <p className="text-gray-600 mb-6">
                  Find high quality, relevant backlinks for your site and email asking for a backlink, all in one platform.
                </p>
                
                <Image 
                  src="/backlinkss.png"
                  alt="Backlinks table"
                  width={500}
                  height={300}
                  className="w-full h-auto mb-6"
                />

                <button className="w-full mt-6 bg-[#F36516] text-white rounded-lg py-3 px-4 font-medium flex items-center justify-center gap-2">
                  <Search className="w-4 h-4" />
                  Find Backlinks On Auto Pilot
                </button>
              </div>

              {/* Card 2 - Scale with less effort */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
                <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                  Scale with <span className="text-[#F36516]">90% less effort</span>
                </h3>
                <p className="text-gray-600 mb-6">
                  Outreach made easy. Send thousands of backlink outreach emails in just minutes.
                </p>
                <Image 
                  src="/backlinks.png"
                  alt="Backlink outreach statistics"
                  width={500}
                  height={300}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

