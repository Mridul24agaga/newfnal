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
} from "lucide-react"
import Link from "next/link"

// Sample data for the traffic graph
const trafficData = [
  { month: "Jan", organic: 1200, directory: 300, total: 1500 },
  { month: "Feb", organic: 1400, directory: 450, total: 1850 },
  { month: "Mar", organic: 1300, directory: 600, total: 1900 },
  { month: "Apr", organic: 1500, directory: 750, total: 2250 },
  { month: "May", organic: 1700, directory: 900, total: 2600 },
  { month: "Jun", organic: 1900, directory: 1200, total: 3100 },
  { month: "Jul", organic: 2100, directory: 1500, total: 3600 },
  { month: "Aug", organic: 2400, directory: 1800, total: 4200 },
]

// Stats data
const statsData = [
  {
    title: "Traffic Increase",
    value: "180%",
    description: "Average traffic growth",
    icon: <TrendingUp className="h-5 w-5 text-orange-500" />,
  },
  {
    title: "Organic Reach",
    value: "3.2x",
    description: "Improvement in 6 months",
    icon: <Users className="h-5 w-5 text-orange-500" />,
  },
  {
    title: "Click-Through Rate",
    value: "12.4%",
    description: "From directory listings",
    icon: <MousePointer className="h-5 w-5 text-orange-500" />,
  },
  {
    title: "Conversion Rate",
    value: "4.7%",
    description: "From directory traffic",
    icon: <ShoppingCart className="h-5 w-5 text-orange-500" />,
  },
]

// Featured case studies
const featuredCaseStudies = [
  {
    title: "Blogosocial.com",
    highlight: "Domain Rating 0 → 9",
    timeframe: "17 Days",
    description:
      "New blogging platform achieved significant domain authority growth through strategic backlink building",
    icon: <Award className="h-6 w-6 text-orange-500" />,
    link: "/case-study",
  },
  {
    title: "SaasyDB",
    highlight: "300% Traffic Increase",
    timeframe: "60 Days",
    description:
      "Tech startup transformed their online visibility and lead generation with our comprehensive SEO strategy",
    icon: <BarChart2 className="h-6 w-6 text-orange-500" />,
    link: "/case-study",
  },
  {
    title: "Softgen",
    highlight: "75+ Quality Backlinks",
    timeframe: "30 Days",
    description: "Eco-friendly e-commerce store established authority in a competitive niche through targeted outreach",
    icon: <TrendingUp className="h-6 w-6 text-orange-500" />,
    link: "/case-study",
  },
]

export default function TrafficResultsSection() {
  const [isVisible, setIsVisible] = useState(false)

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
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Heading and Description */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-orange-100 text-orange-800 rounded-full px-4 py-1 text-sm font-medium mb-4">
            Real Results
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900" style={{ fontFamily: "Saira, sans-serif" }}>
            Traffic from relevant directories:
            <br className="hidden md:block" />
            <span className="text-orange-500"> more sales on autopilot</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg" style={{ fontFamily: "Saira, sans-serif" }}>
            Our customers see significant improvements in organic reach and traffic, leading to sustainable growth and
            increased revenue.
          </p>
        </div>

        {/* Featured Case Studies Section (replacing the graph section) */}
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
                className="mt-4 md:mt-0 inline-flex items-center text-orange-500 hover:text-orange-600 font-medium"
              >
                View all case studies <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            {/* Case Studies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredCaseStudies.map((study, index) => (
                <Link
                  href={study.link}
                  key={index}
                  className="group bg-white border border-gray-200 hover:border-orange-200 rounded-xl p-6 transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-orange-100 p-3 rounded-full mr-4 group-hover:bg-orange-200 transition-colors">
                      {study.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{study.title}</p>
                      <p className="text-xl font-bold text-gray-800">{study.highlight}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className="inline-block bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {study.timeframe}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{study.description}</p>
                  <div className="flex items-center text-orange-500 font-medium">
                    Read case study <ExternalLink className="ml-1 h-4 w-4" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/case-study"
                className="inline-flex items-center bg-orange-100 hover:bg-orange-200 text-orange-800 font-medium px-6 py-2 rounded-full transition-all duration-300"
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
                <div className="bg-orange-100 p-3 rounded-full mr-4">{stat.icon}</div>
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
              </div>
              <p className="text-gray-600">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Testimonial Quote - Updated with new testimonial and right-click prevention */}
        <div
          className={`bg-[#FB8C33] rounded-2xl p-8 md:p-12 text-white mb-12 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4"
          }`}
          style={{ transitionDelay: "500ms" }}
          onContextMenu={preventRightClick}
        >
          <div className="max-w-3xl mx-auto text-center no-select">
            <svg
              className="w-12 h-12 mx-auto mb-6 text-orange-200 opacity-80"
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
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-orange-300">
                <img src="/jay.webp" alt="Customer" className="w-full h-full object-cover" />
              </div>
              <div className="ml-4 text-left">
                <p className="font-semibold">Daniel K</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section - Updated to focus on backlinks and redirect to pricing */}
        <div className="text-center">
          <a
            href="/#pricing"
            className="inline-flex items-center bg-[#FB8C33] hover:bg-orange-600 text-white font-medium px-8 py-3 rounded-full transition-all duration-300 border border-orange-600"
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
