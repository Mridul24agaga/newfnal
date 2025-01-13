'use client'

import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { TrendingUp, Users, Video, FileText, Target, Star, LinkIcon, Shield, Lightbulb, BarChart2, Crosshair, FileBox, Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Sidebar from '@/app/components/Sidebar'

interface Service {
  title: string
  description: string
  icon: React.ElementType
  color: string
  benefits: string[]
}

export default function SEOExpert() {
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [supabase.auth])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Website URL submitted:', websiteUrl)
  }


  const services: Service[] = [
    {
      title: "Video Analysis",
      description: "Comprehensive 15-20 minute walkthrough",
      icon: Video,
      color: "from-blue-400 to-blue-600",
      benefits: ["Visual explanations", "Actionable insights", "Expert commentary"]
    },
    {
      title: "Action Plan",
      description: "Customized step-by-step strategy",
      icon: FileText,
      color: "from-green-400 to-green-600",
      benefits: ["Prioritized tasks", "Clear milestones", "ROI projections"]
    },
    {
      title: "Priority List",
      description: "Focus on high-impact improvements",
      icon: Target,
      color: "from-yellow-400 to-yellow-600",
      benefits: ["Quick wins identified", "Effort vs. impact analysis", "Clear roadmap"]
    },
    {
      title: "6-Month Guarantee",
      description: "Committed support for your success",
      icon: Star,
      color: "from-purple-400 to-purple-600",
      benefits: ["Ongoing assistance", "Progress tracking", "Results assurance"]
    },
    {
      title: "Backlinks Strategy",
      description: "Boost your site's authority",
      icon: LinkIcon,
      color: "from-pink-400 to-pink-600",
      benefits: ["Quality link building", "Domain authority growth", "Competitor analysis"]
    },
    {
      title: "100% Confidential",
      description: "Your strategy stays private",
      icon: Shield,
      color: "from-indigo-400 to-indigo-600",
      benefits: ["Secure data handling", "NDA available", "Exclusive insights"]
    },
    {
      title: "Insider Tactics",
      description: "Leverage proven SEO techniques",
      icon: Lightbulb,
      color: "from-orange-400 to-orange-600",
      benefits: ["Industry secrets", "Cutting-edge methods", "Startup-focused strategies"]
    },
    {
      title: "Traffic Boost",
      description: "Significant increase in organic visits",
      icon: BarChart2,
      color: "from-red-400 to-red-600",
      benefits: ["300% average growth", "Targeted audience reach", "Conversion optimization"]
    },
    {
      title: "Competitor Analysis",
      description: "Stay ahead in your market",
      icon: Crosshair,
      color: "from-teal-400 to-teal-600",
      benefits: ["Gap identification", "Opportunity spotting", "Market positioning"]
    }
  ]

  return (
    <div className="flex h-screen bg-[#FBFCFE] overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} user={user} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="flex items-center justify-between mb-4 md:hidden">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                  <span className="sr-only">Open sidebar</span>
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              
              {/* Hero Section */}
              <div className="text-center mb-20">
                <h1 className="text-4xl sm:text-5xl font-bold mb-6 relative">
                  <span className="relative inline-block">
                    Want an SEO Strategy
                    <svg 
                      className="absolute -bottom-2 left-0 w-full" 
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
                  That Works?
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                  {"We'll tell you exactly what to do to get more"}
                  <br className="hidden sm:inline" />
                  {"traffic and leads from Google."}
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto mb-20">
                  <input
                    type="url"
                    placeholder="Enter your website URL"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    required
                    className="flex-1 h-14 px-6 rounded-full border-2 border-gray-200 focus:outline-none focus:border-red-500 transition-colors text-lg"
                  />
                  <button 
                    type="submit"
                    className="h-14 px-8 bg-red-500 text-white font-medium rounded-full hover:bg-red-600 transition-colors text-lg"
                  >
                    Order SEO Roast
                  </button>
                </form>
              </div>

              {/* What is SEO Audit Section */}
              <div className="mb-24">
                <div className="text-center mb-16">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                    What is an SEO Audit?
                  </h2>
                  <p className="text-gray-600 text-lg">(And why you need one)</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                        <span className="text-pink-500 text-xl">?</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        "SEO is too technical. I don't understand it."
                      </h3>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed">
                      We understand that SEO can feel overwhelming. That's why our SEO Roast breaks down complex concepts into clear, actionable insights you can easily understand.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      We'll explain everything in plain English and provide a simple roadmap for improving your website's performance, even if you're not a tech expert.
                    </p>

                    <div 
                      className="bg-white rounded-xl p-4 shadow-sm inline-flex items-center gap-3 hover:-translate-y-1 transition-transform duration-200"
                    >
                      <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-pink-500" />
                      </div>
                      <div>
                        <span className="font-semibold text-pink-500">300% </span>
                        <span className="text-gray-600">
                          increase in organic traffic for 
                          <span className="font-semibold"> IconBuddy </span>
                          after simplifying their SEO strategy
                        </span>
                      </div>
                    </div>
                  </div>

                  <div 
                    className="rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-200"
                  >
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="SEO Dashboard Screenshot"
                      width={600}
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div 
                    className="rounded-2xl overflow-hidden shadow-lg md:order-2 hover:scale-105 transition-transform duration-200"
                  >
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="SEO Growth Graph"
                      width={600}
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>

                  <div className="space-y-6 md:order-1">
                    <div className="inline-flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                        <span className="text-pink-500 text-xl">$</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        "SEO is a waste of money. I haven't seen results in the past."
                      </h3>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed">
                      We know that many businesses have had negative experiences with SEO. Often, this is due to agencies using outdated tactics or failing to tailor strategies to individual needs.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      Our SEO Roast is different. We use data-driven analysis and a proven framework to identify specific opportunities for improvement, delivering a clear return on your investment.
                    </p>

                    <div 
                      className="bg-white rounded-xl p-4 shadow-sm inline-flex items-center gap-3 hover:-translate-y-1 transition-transform duration-200"
                    >
                      <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                        <Users className="w-4 h-4 text-pink-500" />
                      </div>
                      <div>
                        <span className="font-semibold text-pink-500">5x </span>
                        <span className="text-gray-600">
                          increase in qualified leads for 
                          <span className="font-semibold"> StoryChief </span>
                          after implementing our recommendations
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services Section */}
              <div className="mb-24">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 relative inline-block">
                  Here's What You Get
                  <div className="absolute -right-6 -top-6 w-12 h-12 bg-yellow-200 rounded-full -z-10 opacity-50" />
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {services.map((service, index) => (
                    <div 
                      key={index}
                      className={`group relative overflow-hidden rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br ${service.color} text-white`}
                    >
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                      <div className="relative z-10">
                        <service.icon className="h-12 w-12 mb-6 text-white" />
                        <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                        <p className="text-lg mb-6 opacity-90">{service.description}</p>
                        <ul className="space-y-2">
                          {service.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-center">
                              <svg className="h-5 w-5 mr-2 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
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

                {/* Add after the services grid div */}
                <div className="bg-white py-24 px-0 sm:px-6 lg:px-8">
                  <div className="max-w-7xl mx-auto">
                    <div className="bg-gray-900 rounded-2xl overflow-hidden">
                      <div className="px-4 py-12 sm:px-12 sm:py-16 lg:py-20">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex -space-x-2">
                            {[...Array(5)].map((_, i) => (
                              <img
                                key={i}
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EnegR21GUNiTbLplvTzshdNhPwXHCG.png"
                                alt={`Startup ${i + 1}`}
                                className="w-10 h-10 rounded-full border-2 border-gray-900"
                              />
                            ))}
                          </div>
                          <div>
                            <span className="text-white font-semibold">18+ startups</span>
                            <p className="text-gray-400 text-sm">Grow faster with a top-secret roadmap</p>
                          </div>
                        </div>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8">
                          Private SEO Audits
                        </h2>

                        <div className="space-y-4 mb-8">
                          <div className="flex items-center gap-3 text-white">
                            <span className="text-xl">🔒</span>
                            <span className="text-lg"><strong>100% Confidential</strong> strategies</span>
                          </div>
                          <div className="flex items-center gap-3 text-white">
                            <span className="text-xl">💡</span>
                            <span className="text-lg"><strong>Insider tactics</strong> from 100+ startups</span>
                          </div>
                          <div className="flex items-center gap-3 text-white">
                            <span className="text-xl">📈</span>
                            <span className="text-lg"><strong>Potential 300% boost</strong> in organic traffic</span>
                          </div>
                          <div className="flex items-center gap-3 text-white">
                            <span className="text-xl">🎯</span>
                            <span className="text-lg"><strong>Customized action plan</strong> to outrank competitors</span>
                          </div>
                          <div className="flex items-center gap-3 text-white">
                            <span className="text-xl">📁</span>
                            <span className="text-lg"><strong>Exportable data</strong> for your team</span>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4">
                          <button className="w-full sm:w-auto bg-red-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-red-600 transition-colors">
                            Get Private Audit $550
                          </button>
                          <div className="flex items-center gap-2 text-gray-400">
                            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            1 spot left
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Final CTA Section */}
                <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
                  <div className="max-w-xl mx-auto text-center">
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                      Ready to Transform Your SEO Strategy?
                    </h3>
                    <p className="text-gray-600 text-lg mb-8">
                      Join hundreds of successful businesses that have boosted their online presence with our SEO audits.
                    </p>
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                      <input
                        type="url"
                        placeholder="Website URL"
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        required
                        className="flex-1 h-14 px-6 rounded-full border-2 border-gray-200 focus:outline-none focus:border-red-500 transition-colors text-lg"
                      />
                      <button 
                        type="submit"
                        className="h-14 px-8 bg-red-500 text-white font-medium rounded-full hover:bg-red-600 transition-colors text-lg whitespace-nowrap"
                      >
                        Order SEO Roast
                      </button>
                    </form>
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

