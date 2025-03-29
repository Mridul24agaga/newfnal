"use client"

import { useState, useEffect } from "react"
import { ArrowUpRight, Search, X, Gift, ExternalLink, Info } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BacklinksTable } from "./backlinks-table"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const chartData = [
  { date: "22 Mar", domains: 0 },
  { date: "17 Apr", domains: 0 },
  { date: "13 May", domains: 0 },
  { date: "8 Jun", domains: 5 },
  { date: "4 Jul", domains: 8 },
  { date: "30 Jul", domains: 10 },
  { date: "25 Aug", domains: 30 },
  { date: "20 Sep", domains: 45 },
]

export default function Hero() {
  const [url, setUrl] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const [showPopup, setShowPopup] = useState(true)
  const router = useRouter()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (url) {
      router.push("/auth-form")
    }
  }

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
                href="/blogs"
                className="text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Blogs
              </Link>
              <Link
                href="/auth-form"
                className="text-xs sm:text-sm font-medium text-white bg-[#F36516] hover:bg-[#E55505] transition-colors px-4 py-2 rounded-full"
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
            <div
              className={`inline-flex items-center bg-white transition-all duration-1000 ease-out ${
                isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform -translate-y-4"
              } rounded-full px-2 sm:px-3 py-1 sm:py-1.5 shadow-sm border border-gray-100`}
            >
              <span className="text-xs sm:text-sm">✨</span>
              <span className="text-black text-xs sm:text-sm font-medium ml-1 sm:ml-2">
                One Click to SEO and Authority
              </span>
            </div>

            {/* Main Heading */}
            <h1
              className={`text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight transition-all duration-1000 ease-out ${
                isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4"
              }`}
            >
             Most Affordable High DA 
              <br className="hidden sm:inline" />
              <span className="text-white"> Directory Submission Services</span>
            </h1>

            <p
              className={`text-white/90 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto transition-all duration-1000 delay-300 ease-out ${
                isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4"
              }`}
            >
              The ultimate link building software. Get premium backlinks with high quality outreach, rank higher with
              90% less effort.
            </p>

            {/* Search Form */}
            <div
              className={`max-w-xl mx-auto transition-all duration-1000 delay-500 ease-out ${
                isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4"
              }`}
            >
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-0 relative">
                <input
                  type="url"
                  placeholder="Website URL"
                  className="w-full sm:flex-1 h-12 px-4 rounded-full sm:rounded-l-full sm:rounded-r-none border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent text-sm"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto h-12 px-6 bg-orange-600 text-white font-medium transition-colors hover:bg-orange-700 text-sm rounded-full sm:rounded-l-none sm:rounded-r-full"
                >
                  Get Backlinks
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Overlapping Card and Additional Cards */}
      <div className="relative z-10 -mt-64 sm:-mt-72 md:-mt-80">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Overlapping Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 md:p-12 mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-6">
                Supercharge Your SEO with <span className="text-[#F46A1A]">10x More Backlinks</span>
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg text-center mb-6 sm:mb-8 md:mb-12">
                Our AI-powered platform finds high-quality, relevant backlinks and automates outreach, saving you time
                and boosting your rankings.
              </p>
              <div className="relative">
                <div className="absolute -right-2 -top-2 sm:-right-4 sm:-top-4">
                  <Image
                    src="/wand.webp"
                    alt="Cursor icon"
                    width={50}
                    height={50}
                    className="w-8 h-8 sm:w-12 sm:h-12"
                  />
                </div>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="h-[400px] relative p-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                          dataKey="date"
                          tick={{ fontSize: 12 }}
                          tickLine={false}
                          axisLine={{ stroke: "#e5e7eb" }}
                        />
                        <YAxis
                          label={{
                            value: "Referring domains",
                            angle: -90,
                            position: "insideLeft",
                            style: { textAnchor: "middle" },
                          }}
                          tick={{ fontSize: 12 }}
                          tickLine={false}
                          axisLine={{ stroke: "#e5e7eb" }}
                          domain={[0, 45]}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #e5e7eb",
                            borderRadius: "4px",
                            padding: "8px",
                          }}
                          formatter={(value) => [`${value} referring domains`]}
                        />
                        <Line
                          type="monotone"
                          dataKey="domains"
                          stroke="#F97316"
                          strokeWidth={2}
                          dot={{ fill: "#F97316", strokeWidth: 2 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>

                    {/* Arrow and Label */}
                    <div className="absolute left-[45%] top-[45%] flex flex-col items-center">
                      <div className="text-center mb-2 bg-white px-2 py-1 rounded-md shadow-sm">
                        <div className="font-medium">Started SEO with</div>
                        <div className="text-[#F97316] font-semibold">GetMoreBacklinks</div>
                      </div>
                      <svg
                        width="24"
                        height="60"
                        viewBox="0 0 24 60"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="transform rotate-45"
                      >
                        <path
                          d="M12 60L23.547 40L0.452994 40L12 60ZM10.5 0L10.5 42L13.5 42L13.5 0L10.5 0Z"
                          fill="black"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </div>

    
    </div>
  )
}

