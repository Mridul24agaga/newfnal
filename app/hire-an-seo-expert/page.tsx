"use client"

import { useState, useEffect } from "react"
import type { User } from "@supabase/supabase-js"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import {
  TrendingUp,
  Users,
  Video,
  FileText,
  Target,
  Star,
  LinkIcon,
  Shield,
  Lightbulb,
  BarChart2,
  Crosshair,
  FileBox,
  Menu,
  ArrowRight,
  CheckCircle,
  Clock,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Sidebar from "@/app/components/Sidebar"
import { createOrder } from "../actions/create-order"

interface Service {
  title: string
  description: string
  icon: React.ElementType
  color: string
  benefits: string[]
}

export default function SEOExpert() {
  const [websiteUrl, setWebsiteUrl] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [supabase.auth])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("websiteUrl", websiteUrl)

    const result = await createOrder(formData)

    if (result.success) {
      window.location.href = result.url
    }
  }

  const services: Service[] = [
    {
      title: "Video Analysis",
      description: "Comprehensive 15-20 minute walkthrough",
      icon: Video,
      color: "from-blue-400 to-blue-600",
      benefits: ["Visual explanations", "Actionable insights", "Expert commentary"],
    },
    {
      title: "Action Plan",
      description: "Customized step-by-step strategy",
      icon: FileText,
      color: "from-green-400 to-green-600",
      benefits: ["Prioritized tasks", "Clear milestones", "ROI projections"],
    },
    {
      title: "Priority List",
      description: "Focus on high-impact improvements",
      icon: Target,
      color: "from-yellow-400 to-yellow-600",
      benefits: ["Quick wins identified", "Effort vs. impact analysis", "Clear roadmap"],
    },
    {
      title: "3-Month Guarantee",
      description: "Committed support for your success",
      icon: Star,
      color: "from-purple-400 to-purple-600",
      benefits: ["Ongoing assistance", "Progress tracking", "Results assurance"],
    },
    {
      title: "Backlinks Strategy",
      description: "Boost your site's authority",
      icon: LinkIcon,
      color: "from-pink-400 to-pink-600",
      benefits: ["Quality link building", "Domain authority growth", "Competitor analysis"],
    },
    {
      title: "100% Confidential",
      description: "Your strategy stays private",
      icon: Shield,
      color: "from-indigo-400 to-indigo-600",
      benefits: ["Secure data handling", "NDA available", "Exclusive insights"],
    },
    {
      title: "Insider Tactics",
      description: "Leverage proven SEO techniques",
      icon: Lightbulb,
      color: "from-orange-400 to-orange-600",
      benefits: ["Industry secrets", "Cutting-edge methods", "Startup-focused strategies"],
    },
    {
      title: "Traffic Boost",
      description: "Significant increase in organic visits",
      icon: BarChart2,
      color: "from-red-400 to-red-600",
      benefits: ["300% average growth", "Targeted audience reach", "Conversion optimization"],
    },
    {
      title: "Competitor Analysis",
      description: "Stay ahead in your market",
      icon: Crosshair,
      color: "from-teal-400 to-teal-600",
      benefits: ["Gap identification", "Opportunity spotting", "Market positioning"],
    },
  ]

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} user={user} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="flex items-center justify-end mb-4 md:hidden px-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                  <span className="sr-only">Open sidebar</span>
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Hero Section */}
              <div className="text-center mb-12 sm:mb-20 px-4 sm:px-0 mt-8 sm:mt-16">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 relative">
                  <span className="relative inline-block">
                    Skyrocket Your
                    <svg
                      className="absolute -bottom-2 left-0 w-full hidden sm:block"
                      viewBox="0 0 300 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 9.12457C75.6841 4.01379 150.368 3.01242 225.053 3.01242C262.121 3.01242 299.189 4.01379 299.189 4.01379"
                        stroke="#FF6B6B"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <br />
                  <span className="text-[#F45B5B]">SEO Performance</span>
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 sm:mb-10 max-w-3xl mx-auto">
                  Unlock the full potential of your website with our expert SEO strategies. Get more traffic, leads, and
                  revenue from Google.
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-12 sm:mb-20"
                >
                  <input
                    type="url"
                    placeholder="Enter your website URL"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    required
                    className="flex-grow h-14 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-[#F45B5B] transition-colors text-base"
                  />
                  <button
                    type="submit"
                    className="h-14 px-8 bg-[#F45B5B] text-white font-medium rounded-lg hover:bg-[#E34A4A] transition-colors text-base flex items-center justify-center"
                  >
                    Get Free SEO Audit
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </form>

                <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                    100% Free Analysis
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-blue-500" />
                    Results in 24 Hours
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-purple-500" />
                    No Credit Card Required
                  </div>
                </div>
              </div>

              {/* Latest SEO Audit - Skillop */}
              <div className="bg-[#111827] rounded-xl p-8 mb-16 text-white">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white text-center">
                  🚀 Skillop's SEO Success Story: A Game-Changing Audit
                </h2>
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="w-full md:w-1/2 mb-6 md:mb-0">
                    <p className="text-white mb-4">
                      We recently supercharged Skillop's online presence. Check out these incredible results:
                    </p>
                    <ul className="space-y-2 text-white">
                      <li className="flex items-center">
                        <span className="text-2xl mr-2">📈</span> 45% increase in organic traffic (3 months)
                      </li>
                      <li className="flex items-center">
                        <span className="text-2xl mr-2">🔝</span> 22% improvement in keyword rankings
                      </li>
                      <li className="flex items-center">
                        <span className="text-2xl mr-2">💰</span> 38% boost in conversion rates
                      </li>
                    </ul>
                    <button className="mt-6 bg-[#F45B5B] text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-[#E34A4A] transition-colors inline-flex items-center">
                      Read the Full Case Study
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                  <div className="w-full md:w-1/2 md:pl-8">
                    <div className="rounded-lg overflow-hidden shadow-lg border-2 border-[#F45B5B] relative">
                      <Image
                        src="/skillop-dashboard.jpg"
                        alt="Skillop SEO Dashboard"
                        width={600}
                        height={400}
                        className="w-full h-auto"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white text-3xl font-bold tracking-wider">COMING SOON</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* What is SEO Audit Section */}
              <div className="mb-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                      What is an SEO Audit?
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                      Discover how our comprehensive SEO analysis can transform your online presence
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                    <div className="space-y-6">
                      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                            <span className="text-pink-500 text-2xl font-bold">?</span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">
                            "SEO is too technical. I don't understand it."
                          </h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                          We break down complex SEO concepts into clear, actionable insights. Our SEO Roast provides a
                          simple roadmap for improving your website's performance, even if you're not a tech expert.
                        </p>
                      </div>
                      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-blue-500" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">Real Results, Real Growth</h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-4">
                          Our clients see significant improvements in their SEO performance. For example, IconBuddy
                          experienced a 300% increase in organic traffic after implementing our recommendations.
                        </p>
                        <div className="bg-blue-50 rounded-lg p-4 flex items-center gap-3">
                          <span className="text-2xl">📈</span>
                          <span className="text-blue-700 font-semibold">
                            300% increase in organic traffic for IconBuddy
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-200 to-blue-200 transform skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                      <div className="relative bg-white rounded-3xl shadow-lg overflow-hidden">
                        <Image
                          src="/seo.jpeg"
                          alt="SEO Audit Example"
                          width={600}
                          height={400}
                          className="w-full h-auto"
                        />
                        <div className="p-6">
                          <h4 className="text-lg font-semibold mb-2">Comprehensive SEO Analysis</h4>
                          <p className="text-gray-600">
                            Our audits cover all aspects of your website's SEO, from technical issues to content
                            optimization and backlink profiles.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative order-2 md:order-1">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-200 to-yellow-200 transform -skew-y-6 sm:skew-y-0 sm:rotate-6 sm:rounded-3xl"></div>
                      <div className="relative bg-white rounded-3xl shadow-lg overflow-hidden">
                        <Image
                          src="/seo.webp"
                          alt="SEO Growth Chart"
                          width={600}
                          height={400}
                          className="w-full h-auto"
                        />
                        <div className="p-6">
                          <h4 className="text-lg font-semibold mb-2">Measurable SEO Growth</h4>
                          <p className="text-gray-600">
                            Our strategies are data-driven, focusing on metrics that directly impact your business
                            growth and online visibility.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6 order-1 md:order-2">
                      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                            <span className="text-green-500 text-2xl font-bold">$</span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">
                            "SEO is a waste of money. I haven't seen results in the past."
                          </h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                          Our SEO Roast is different. We use data-driven analysis and a proven framework to identify
                          specific opportunities for improvement, delivering a clear return on your investment.
                        </p>
                      </div>
                      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                            <Users className="w-6 h-6 text-purple-500" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">Tailored Strategies, Impressive Results</h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-4">
                          We create customized SEO strategies that align with your business goals. Our approach has led
                          to significant improvements for our clients, including a 5x increase in qualified leads for
                          StoryChief.
                        </p>
                        <div className="bg-purple-50 rounded-lg p-4 flex items-center gap-3">
                          <span className="text-2xl">🎯</span>
                          <span className="text-purple-700 font-semibold">
                            5x increase in qualified leads for StoryChief
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gray-900 rounded-2xl py-16 px-4 sm:px-6 lg:px-8 mb-24">
                <div className="max-w-7xl mx-auto text-center">
                  <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                    <span className="block">Ready to boost your SEO performance?</span>
                    <span className="block mt-2">Get your free SEO audit today!</span>
                  </h2>
                  <p className="mt-4 text-lg leading-6 text-blue-100 max-w-3xl mx-auto">
                    Discover untapped opportunities to improve your website's visibility and drive more organic traffic.
                    Our comprehensive SEO audit will provide you with actionable insights to outrank your competitors.
                  </p>
                  <div className="mt-8 flex justify-center">
                    <div className="inline-flex rounded-md shadow">
                      <button
                        onClick={handleSubmit}
                        className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition duration-300 ease-in-out"
                      >
                        Get Your Free SEO Audit
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services Section */}
              <div className="mb-16 sm:mb-24 px-4 sm:px-0">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 relative inline-block">
                  Here's What You Get
                  <div className="absolute -right-6 -top-6 w-12 h-12 bg-yellow-200 rounded-full -z-10 opacity-50" />
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {services.map((service, index) => (
                    <div
                      key={index}
                      className={`group relative overflow-hidden rounded-2xl p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br ${service.color} text-white`}
                    >
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                      <div className="relative z-10">
                        <service.icon className="h-10 w-10 sm:h-12 sm:w-12 mb-4 sm:mb-6 text-white" />
                        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{service.title}</h3>
                        <p className="text-base sm:text-lg mb-4 sm:mb-6 opacity-90">{service.description}</p>
                        <ul className="space-y-2">
                          {service.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-center text-sm sm:text-base">
                              <svg
                                className="h-5 w-5 mr-2 text-white"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path d="M5 13l4 4L19 7"></path>
                              </svg>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out" />
                    </div>
                  ))}
                </div>

                {/* Maybe You? Section */}
                <div className="bg-gradient-to-r from-orange-100 to-orange-200 rounded-xl p-8 mt-16 border-4 border-orange-300 shadow-lg">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center text-orange-800">Maybe You?</h2>
                  <p className="text-center text-orange-700 mb-8 text-lg">
                    Are you ready to join our success stories? Let's transform your SEO strategy and boost your online
                    presence.
                  </p>
                  <div className="flex justify-center">
                    <button
                      onClick={handleSubmit}
                      className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-xl hover:bg-orange-600 transition-colors inline-flex items-center shadow-md hover:shadow-lg transform hover:-translate-y-1"
                    >
                      Start Your SEO Journey
                      <ArrowRight className="ml-2 h-6 w-6" />
                    </button>
                  </div>
                </div>

                {/* Private SEO Audits Section */}
                <div className="bg-white py-16 sm:py-24 mt-16">
                  <div className="mx-auto">
                    <div className="bg-gray-900 rounded-2xl overflow-hidden">
                      <div className="p-4 sm:p-12 lg:p-20">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex -space-x-2">
                            {["/cj.jpeg", "/cowoker.jpeg", "/cok.jpeg", "/dm.jpeg"].map((src, index) => (
                              <img
                                key={index}
                                src={src || "/placeholder.svg"}
                                alt={`Startup ${index + 1}`}
                                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-gray-900 transition-all duration-300 hover:scale-110 hover:z-10 hover:brightness-110 transform"
                              />
                            ))}
                          </div>
                          <div>
                            <span className="text-white font-semibold text-sm sm:text-base">18+ startups</span>
                            <p className="text-gray-400 text-xs sm:text-sm">Grow faster with a top-secret roadmap</p>
                          </div>
                        </div>

                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-8">
                          Ready to Get Your SEO Audit Done?
                        </h2>

                        <div className="space-y-3 sm:space-y-4 mb-6">
                          <div className="flex items-center gap-3 text-white">
                            <span className="text-lg sm:text-xl">🔒</span>
                            <span className="text-base sm:text-lg">
                              <strong>100% Confidential</strong> strategies
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-white">
                            <span className="text-lg sm:text-xl">💡</span>
                            <span className="text-base sm:text-lg">
                              <strong>Insider tactics</strong> from 100+ startups
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-white">
                            <span className="text-lg sm:text-xl">📈</span>
                            <span className="text-base sm:text-lg">
                              <strong>Potential 300% boost</strong> in organic traffic
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-white">
                            <span className="text-lg sm:text-xl">🎯</span>
                            <span className="text-base sm:text-lg">
                              <strong>Customized action plan</strong> to outrank competitors
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-white">
                            <span className="text-lg sm:text-xl">📁</span>
                            <span className="text-base sm:text-lg">
                              <strong>Exportable data</strong> for your team
                            </span>
                          </div>
                        </div>

                        <form onSubmit={handleSubmit} className="w-full sm:w-auto">
                          <button
                            type="submit"
                            className="w-full bg-[#F45B5B] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-[#E34A4A] transition-colors inline-flex items-center justify-center"
                          >
                            Click Here for Your SEO Audit
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
          </div>

        </main>
      </div>
    </div>
  
  )
}

