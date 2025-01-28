"use client"

import { useState, useEffect } from "react"
import { ArrowUpRight, Search, X, Gift, ExternalLink, Info } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BacklinksTable } from "./backlinks-table"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

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

  const chartDates = ["22 Mar", "17 Apr", "13 May", "8 Jun", "4 Jul", "30 Jul", "25 Aug", "20 Sep"]
  const chartValues = [0, 0, 0, 5, 8, 10, 30, 45]

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: "#e5e7eb",
        },
        ticks: {
          font: {
            family: "Inter, sans-serif",
          },
        },
      },
      y: {
        grid: {
          color: "#e5e7eb",
        },
        min: 0,
        max: 45,
        ticks: {
          stepSize: 10,
          font: {
            family: "Inter, sans-serif",
          },
        },
        title: {
          display: true,
          text: "Referring domains",
          font: {
            family: "Inter, sans-serif",
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: "white",
        titleColor: "black",
        bodyColor: "black",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context) => `${context.parsed.y} referring domains`,
        },
      },
    },
  }

  const chartData = {
    labels: chartDates,
    datasets: [
      {
        data: chartValues,
        borderColor: "#f97316",
        backgroundColor: "#f97316",
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
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
              Get 10x more backlinks
              <br className="hidden sm:inline" />
              <span className="text-white"> on autopilot</span>
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
                    <Line options={chartOptions} data={chartData} />
                    {/* Arrow and Label */}
                    <div className="absolute left-[45%] top-[45%] flex flex-col items-center">
                      <div className="text-center mb-2">
                        <div className="font-medium">Started SEO with</div>
                        <div className="text-orange-500 font-semibold">GetMoreBacklinks</div>
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
            {/* Updated Additional Cards */}
            <div className="grid gap-8 md:grid-cols-2">
              {/* Card 1 - Hours to Minutes */}
              <div className="bg-white rounded-3xl border border-gray-200 p-6 flex flex-col">
                <h3 className="text-2xl sm:text-3xl font-bold mb-1">
                  <span className="text-2xl text-[#F36516]">Sign Up</span> →{" "}
                  <span className="text-2xl text-[#F36516]">Free Directory List</span>
                </h3>
                <p className="text-gray-600 mb-4">
                  Find high quality, relevant backlinks for your site and email asking for a backlink, all in one
                  platform. Free directories sign up.
                </p>
                <div className="flex-grow mb-4">
                  <BacklinksTable />
                </div>
                <Link
                  href="/auth-form"
                  className="w-full bg-[#F36516] text-white rounded-full py-3 px-4 font-medium flex items-center justify-center gap-2 hover:bg-[#E55505] transition-colors"
                >
                  <Search className="w-4 h-4" />
                  Sign up Now
                </Link>
              </div>

              {/* Card 2 - Backlink Profiles */}
              <div className="bg-white rounded-3xl border border-gray-200 p-8 space-y-6">
                <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                  Scale with <span className="text-[#F36516]">90% less effort</span>
                </h3>
                <p className="text-gray-600 mb-6">Outreach made easy. Get detailed backlink profiles instantly.</p>

                {/* First Backlink Card */}
                <div className="relative transform -rotate-2 transition-transform hover:rotate-0 hover:scale-[1.02]">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#F36516]/20 to-[#FE9D40]/20 rounded-3xl transform rotate-2"></div>
                  <div className="bg-white rounded-3xl border-2 border-[#F36516] p-6 relative">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold mb-1">Backlink profile for skillop</h3>
                        <p className="text-gray-500 text-sm">Domain including subdomains. One link per domain</p>
                      </div>

                      <div className="grid grid-cols-3 gap-8">
                        {/* Domain Rating */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-medium">Domain Rating</span>
                            <button className="text-gray-400 hover:text-gray-600">
                              <Info className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="relative w-20 h-20">
                            <div className="absolute inset-0">
                              <svg className="w-full h-full" viewBox="0 0 100 100">
                                <circle
                                  className="text-gray-200"
                                  strokeWidth="10"
                                  stroke="currentColor"
                                  fill="transparent"
                                  r="45"
                                  cx="50"
                                  cy="50"
                                />
                                <circle
                                  className="text-[#F36516]"
                                  strokeWidth="10"
                                  strokeDasharray={25 * 2.827}
                                  strokeLinecap="round"
                                  stroke="currentColor"
                                  fill="transparent"
                                  r="45"
                                  cx="50"
                                  cy="50"
                                />
                              </svg>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-3xl font-bold">25</span>
                            </div>
                          </div>
                        </div>

                        {/* Backlinks */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-medium">Backlinks</span>
                            <button className="text-gray-400 hover:text-gray-600">
                              <Info className="h-4 w-4" />
                            </button>
                          </div>
                          <div>
                            <div className="text-3xl font-bold mb-1">117</div>
                            <div className="text-sm text-gray-600">79% dofollow</div>
                          </div>
                        </div>

                        {/* Linking websites */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-medium">Linking websites</span>
                            <button className="text-gray-400 hover:text-gray-600">
                              <Info className="h-4 w-4" />
                            </button>
                          </div>
                          <div>
                            <div className="text-3xl font-bold mb-1">64</div>
                            <div className="text-sm text-gray-600">86% dofollow</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Popup for Free Directory Listing */}
      {showPopup && (
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-xl p-6 max-w-sm z-50 border-t-4 border-[#F36516] animate-fade-in-up">
          <button
            onClick={() => setShowPopup(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            aria-label="Close popup"
          >
            <X size={20} />
          </button>
          <div className="flex items-center mb-4">
            <Gift className="text-[#F36516] mr-3" size={24} />
            <h3 className="text-xl font-bold text-[#F36516]">Free Directory Database!</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Boost your SEO instantly! Get a free high-quality backlink by listing your website in our directory.
          </p>
          <ul className="text-sm text-gray-600 mb-4 space-y-2">
            <li className="flex items-center">
              <ArrowUpRight className="text-green-500 mr-2" size={16} />
              Improve your domain authority
            </li>
            <li className="flex items-center">
              <ArrowUpRight className="text-green-500 mr-2" size={16} />
              Increase organic traffic
            </li>
            <li className="flex items-center">
              <ArrowUpRight className="text-green-500 mr-2" size={16} />
              Enhance your online visibility
            </li>
          </ul>
          <div className="flex justify-between items-center">
            <Link
              href="/auth-form"
              className="bg-[#F36516] text-white px-4 py-2 rounded-full font-medium hover:bg-[#E55505] transition-colors flex items-center"
            >
              Get Free Directory List
              <ExternalLink className="ml-2" size={16} />
            </Link>
            <button onClick={() => setShowPopup(false)} className="text-gray-500 hover:text-gray-700 font-medium">
              Maybe later
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 40px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}

