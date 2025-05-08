"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  TrendingUp,
  Users,
  MousePointer,
  ShoppingCart,
  ArrowRight,
  BarChart2,
  Award,
  ExternalLink,
  LinkIcon,
  LineChart,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Stats data
const statsData = [
  {
    title: "Traffic Increase",
    value: "180%",
    description: "Average traffic growth",
    icon: <TrendingUp className="h-5 w-5 text-[#EB5C0E]" />,
  },
  {
    title: "Organic Reach",
    value: "3.2x",
    description: "Improvement in 6 months",
    icon: <Users className="h-5 w-5 text-[#EB5C0E]" />,
  },
  {
    title: "Click-Through Rate",
    value: "12.4%",
    description: "From directory listings",
    icon: <MousePointer className="h-5 w-5 text-[#EB5C0E]" />,
  },
  {
    title: "Conversion Rate",
    value: "4.7%",
    description: "From directory traffic",
    icon: <ShoppingCart className="h-5 w-5 text-[#EB5C0E]" />,
  },
]

// Featured case studies - Enhanced with more details
const featuredCaseStudies = [
  {
    title: "Blogosocial.com",
    highlight: "Domain Rating 0 → 9",
    timeframe: "17 Days",
    description:
      "New blogging platform achieved significant domain authority growth through strategic backlink building from high-quality directories. Their organic traffic increased by 245% within the first month.",
    results: [
      "245% increase in organic traffic",
      "First page rankings for 12 target keywords",
      "67 high-quality backlinks acquired",
    ],
    icon: <Award className="h-6 w-6 text-[#EB5C0E]" />,
    link: "/case-study",
  },
  {
    title: "SaasyDB",
    highlight: "300% Traffic Increase",
    timeframe: "60 Days",
    description:
      "Tech startup transformed their online visibility and lead generation with our comprehensive SEO strategy focused on niche-specific directory submissions and content optimization.",
    results: ["300% increase in organic traffic", "156% increase in qualified leads", "42 new referring domains"],
    icon: <BarChart2 className="h-6 w-6 text-[#EB5C0E]" />,
    link: "/case-study",
  },
  {
    title: "Softgen",
    highlight: "75+ Quality Backlinks",
    timeframe: "30 Days",
    description:
      "Eco-friendly e-commerce store established authority in a competitive niche through targeted outreach and strategic directory placements, resulting in significant revenue growth.",
    results: [
      "75+ high-quality backlinks acquired",
      "189% increase in organic traffic",
      "32% increase in e-commerce conversions",
    ],
    icon: <TrendingUp className="h-6 w-6 text-[#EB5C0E]" />,
    link: "/case-study",
  },
]

export default function TrafficResultsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCase, setActiveCase] = useState(0)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Function to prevent right-click on testimonial
  const preventRightClick = (e: React.MouseEvent) => {
    e.preventDefault()
    return false
  }

  return (
    <div className="py-16 px-4 md:px-6 lg:px-8 bg-white" style={{ fontFamily: "Saira, sans-serif" }}>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Saira:wght@300;400;500;600;700&display=swap");
        
        .no-select {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        
        .case-study-card {
          transition: all 0.3s ease;
        }
        
        .case-study-card:hover {
          transform: translateY(-5px);
        }
        
        .results-list li {
          position: relative;
          padding-left: 1.5rem;
        }
        
        .results-list li:before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.5rem;
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          background-color: #EB5C0E;
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Heading and Description */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-[#EB5C0E]/10 text-[#EB5C0E] rounded-full px-4 py-1 text-sm font-medium mb-4">
            Real Results
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900" style={{ fontFamily: "Saira, sans-serif" }}>
            Traffic from relevant directories:
            <br className="hidden md:block" />
            <span className="text-[#EB5C0E]"> more sales on autopilot</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg" style={{ fontFamily: "Saira, sans-serif" }}>
            Our customers see significant improvements in organic reach and traffic, leading to sustainable growth and
            increased revenue.
          </p>
        </div>

        {/* Traffic Graph Section */}
        <div
          className={`transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
          }`}
        >
          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm mb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">Real Traffic Growth</h3>
                <p className="text-gray-500">Actual results from one of our clients over a 4-month period</p>
              </div>
              <div className="flex items-center mt-4 md:mt-0 space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-sm text-gray-600">Clicks</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-600 mr-2"></div>
                  <span className="text-sm text-gray-600">Impressions</span>
                </div>
              </div>
            </div>

            {/* Traffic Graph */}
            <div className="relative w-full h-[400px] mb-6">
              <Image
                src="/traffic-results.webp"
                alt="Traffic growth graph showing clicks and impressions increasing over time"
                fill
                className="object-contain"
              />
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="bg-blue-100 rounded-lg p-4">
                <p className="text-sm text-blue-700 font-medium">Total Clicks</p>
                <p className="text-2xl font-bold text-blue-800">1.84K</p>
              </div>
              <div className="bg-purple-100 rounded-lg p-4">
                <p className="text-sm text-purple-700 font-medium">Total Impressions</p>
                <p className="text-2xl font-bold text-purple-800">48.4K</p>
              </div>
              <div className="bg-green-100 rounded-lg p-4">
                <p className="text-sm text-green-700 font-medium">Average CTR</p>
                <p className="text-2xl font-bold text-green-800">3.8%</p>
              </div>
              <div className="bg-amber-100 rounded-lg p-4">
                <p className="text-sm text-amber-700 font-medium">Average Position</p>
                <p className="text-2xl font-bold text-amber-800">23.4</p>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Case Studies Section - Enhanced with more details */}
        <div
          className={`transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
          }`}
        >
          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm mb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">Featured Success Stories</h3>
                <p className="text-gray-500">Real results from our directory submission strategies</p>
              </div>
              <Link
                href="/case-study"
                className="mt-4 md:mt-0 inline-flex items-center text-[#EB5C0E] hover:text-[#EB5C0E]/80 font-medium"
              >
                View all case studies <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            {/* Case Studies Tabs */}
            <div className="flex flex-wrap border-b border-gray-200 mb-6">
              {featuredCaseStudies.map((study, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 font-medium text-sm mr-4 border-b-2 transition-colors ${
                    activeCase === index
                      ? "border-[#EB5C0E] text-[#EB5C0E]"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveCase(index)}
                >
                  {study.title}
                </button>
              ))}
            </div>

            {/* Active Case Study */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm mb-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-2/3">
                  <div className="flex items-center mb-4">
                    <div className="bg-[#EB5C0E]/10 p-3 rounded-full mr-4">{featuredCaseStudies[activeCase].icon}</div>
                    <div>
                      <p className="text-sm text-gray-500">{featuredCaseStudies[activeCase].title}</p>
                      <p className="text-2xl font-bold text-gray-800">{featuredCaseStudies[activeCase].highlight}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="inline-block bg-[#EB5C0E]/10 text-[#EB5C0E] text-xs font-medium px-2.5 py-0.5 rounded">
                      {featuredCaseStudies[activeCase].timeframe}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-6">{featuredCaseStudies[activeCase].description}</p>

                  <h4 className="font-semibold text-gray-800 mb-3">Key Results:</h4>
                  <ul className="results-list space-y-2 mb-6">
                    {featuredCaseStudies[activeCase].results.map((result, idx) => (
                      <li key={idx} className="text-gray-600">
                        {result}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={featuredCaseStudies[activeCase].link}
                    className="inline-flex items-center text-[#EB5C0E] font-medium hover:underline"
                  >
                    Read full case study <ExternalLink className="ml-1 h-4 w-4" />
                  </Link>
                </div>

                <div className="md:w-1/3 bg-gray-50 rounded-lg p-5">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <LineChart className="h-4 w-4 mr-2 text-[#EB5C0E]" />
                    Strategy Overview
                  </h4>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start">
                      <div className="bg-[#EB5C0E]/20 p-1 rounded-full mr-2 mt-0.5">
                        <div className="w-1.5 h-1.5 bg-[#EB5C0E] rounded-full"></div>
                      </div>
                      <span>Targeted niche directory submissions</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-[#EB5C0E]/20 p-1 rounded-full mr-2 mt-0.5">
                        <div className="w-1.5 h-1.5 bg-[#EB5C0E] rounded-full"></div>
                      </div>
                      <span>Optimized business profiles with relevant keywords</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-[#EB5C0E]/20 p-1 rounded-full mr-2 mt-0.5">
                        <div className="w-1.5 h-1.5 bg-[#EB5C0E] rounded-full"></div>
                      </div>
                      <span>Strategic anchor text distribution</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-[#EB5C0E]/20 p-1 rounded-full mr-2 mt-0.5">
                        <div className="w-1.5 h-1.5 bg-[#EB5C0E] rounded-full"></div>
                      </div>
                      <span>Consistent citation building across platforms</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Case Studies Grid - Condensed version */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredCaseStudies.map((study, index) => (
                <Link
                  href={study.link}
                  key={index}
                  className="group bg-white border border-gray-200 hover:border-[#EB5C0E]/20 rounded-xl p-6 transition-all duration-300 hover:shadow-md case-study-card"
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-[#EB5C0E]/10 p-3 rounded-full mr-4 group-hover:bg-[#EB5C0E]/20 transition-colors">
                      {study.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{study.title}</p>
                      <p className="text-xl font-bold text-gray-800">{study.highlight}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className="inline-block bg-[#EB5C0E]/10 text-[#EB5C0E] text-xs font-medium px-2.5 py-0.5 rounded">
                      {study.timeframe}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">{study.description}</p>
                  <div className="flex items-center text-[#EB5C0E] font-medium">
                    Read case study <ExternalLink className="ml-1 h-4 w-4" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/case-study"
                className="inline-flex items-center bg-[#EB5C0E]/10 hover:bg-[#EB5C0E]/20 text-[#EB5C0E] font-medium px-6 py-2 rounded-full transition-all duration-300"
              >
                Explore All Case Studies <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className={`bg-white border border-gray-200 rounded-xl p-6 transition-all duration-1000 ease-out ${
                isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center mb-4">
                <div className="bg-[#EB5C0E]/10 p-3 rounded-full mr-4">{stat.icon}</div>
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
              </div>
              <p className="text-gray-600">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Testimonial Quote */}
        <div
          className={`bg-[#EB5C0E] rounded-2xl p-8 md:p-12 text-white mb-12 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4"
          }`}
          style={{ transitionDelay: "500ms" }}
          onContextMenu={preventRightClick}
        >
          <div className="max-w-3xl mx-auto text-center no-select">
            <svg
              className="w-12 h-12 mx-auto mb-6 text-[#EB5C0E]/30 opacity-80"
              fill="currentColor"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
            <p className="text-xl md:text-2xl font-medium mb-6">
              "I've used pricey tools before, but GetMoreBacklinks.org is an absolute steal for the value they deliver.
              My domain authority improved within two months, and I'm seeing an increase in organic traffic. Totally
              worth it."
            </p>
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#EB5C0E]/30">
                <img src="/jay.webp" alt="Customer" className="w-full h-full object-cover" />
              </div>
              <div className="ml-4 text-left">
                <p className="font-semibold">Daniel K</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <a
            href="/#pricing"
            className="inline-flex items-center bg-[#EB5C0E] hover:bg-[#EB5C0E]/90 text-white font-medium px-8 py-3 rounded-full transition-all duration-300 border border-[#EB5C0E]/80"
          >
            <LinkIcon className="mr-2 h-5 w-5" />
            <span className="relative z-10">Get Premium Backlinks Today</span>
          </a>
          <p className="mt-3 text-sm text-gray-500">High-quality directory submissions. Cancel anytime.</p>
        </div>
      </div>
    </div>
  )
}
