"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Search, X } from "lucide-react"
import Footer from "../components/footer"

export default function CaseStudiesPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredCaseStudies, setFilteredCaseStudies] = useState<CaseStudy[]>([])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  interface CaseStudy {
    id: number
    title: string
    date: string
    excerpt: string
    image: string
    slug: string
    category: string
    results?: {
      metric: string
      value: string
    }[]
  }

  const categories = ["Domain Rating", "Backlinks", "SaaS Growth"]

  // Case studies data - only the three real case studies
  const caseStudies: CaseStudy[] = [
    {
      id: 3,
      title: "Softgen – Elevating Domain Rating from 15 to 26 in 30 Days",
      date: "April 15, 2025",
      excerpt:
        "Softgen.ai, an innovative platform enabling users to build full-stack web applications without coding, aimed to improve its online authority and search engine visibility. Our strategic backlink campaign delivered impressive results.",
      image: "/softgengrowth2.jpeg",
      slug: "/case-study-softgen",
      category: "Backlinks",
      results: [
        { metric: "Domain Rating Increase", value: "73%" },
        { metric: "Organic Traffic Growth", value: "124%" },
        { metric: "Keyword Rankings", value: "+42" },
      ],
    },
    {
      id: 1,
      title: "Blogosocial – Elevating Domain Rating from 0 to 9 in 17 Days",
      date: "May 2, 2025",
      excerpt:
        "Blogosocial.com, a platform offering strategic blogging and SEO services, was a new entrant in the digital space. Our comprehensive backlink strategy helped them establish authority quickly and efficiently.",
      image: "/blogosocial1.png",
      slug: "/case-study-blogosocial",
      category: "Domain Rating",
      results: [
        { metric: "Domain Rating", value: "0 to 9" },
        { metric: "Timeframe", value: "17 days" },
        { metric: "Referring Domains", value: "+32" },
      ],
    },
    {
      id: 2,
      title: "SaasyDB – Elevating Domain Rating from 8 to 35 in 60 Days",
      date: "April 28, 2025",
      excerpt:
        "SaasyDB, a platform offering a comprehensive database of SaaS company contacts, aimed to improve its online authority to attract more users and enhance visibility. Our targeted approach delivered exceptional results.",
      image: "/getmorebacklinksgrowth.jpeg",
      slug: "/case-study-saasydb",
      category: "SaaS Growth",
      results: [
        { metric: "Domain Rating Increase", value: "338%" },
        { metric: "Conversion Rate", value: "+45%" },
        { metric: "Monthly Signups", value: "3x" },
      ],
    },
  ]

  // Filter case studies based on search query and active category
  useEffect(() => {
    let filtered = [...caseStudies]

    // Filter by category if one is selected
    if (activeCategory) {
      filtered = filtered.filter((study) => study.category === activeCategory)
    }

    // Filter by search query if one exists
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (study) =>
          study.title.toLowerCase().includes(query) ||
          study.excerpt.toLowerCase().includes(query) ||
          study.category.toLowerCase().includes(query),
      )
    }

    setFilteredCaseStudies(filtered)
  }, [activeCategory, searchQuery])

  // Handle category selection
  const handleCategoryClick = (category: string) => {
    if (activeCategory === category) {
      setActiveCategory(null)
    } else {
      setActiveCategory(category)
    }
  }

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Clear search
  const clearSearch = () => {
    setSearchQuery("")
  }

  // Featured case study (always Softgen)
  const featuredCaseStudy = caseStudies[0]

  // Recent case studies (all except featured)
  const recentCaseStudies = filteredCaseStudies.filter((study) => study.id !== featuredCaseStudy.id)

  // Check if we have any results
  const hasResults =
    recentCaseStudies.length > 0 ||
    (searchQuery &&
      featuredCaseStudy &&
      (featuredCaseStudy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        featuredCaseStudy.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        featuredCaseStudy.category.toLowerCase().includes(searchQuery.toLowerCase())))

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Saira:wght@300;400;500;600;700&display=swap");
      `}</style>

      {/* Header */}
      <header className="border-b border-gray-200 relative bg-white z-10">
        <div className="container mx-auto px-4">
          <div className="h-16 sm:h-20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/getmorepacklinks.png"
                alt="GetMoreBacklinks"
                width={100}
                height={32}
                className="h-6 sm:h-8 w-auto"
              />
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <a
                href="/"
                className="text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Home
              </a>
              <a
                href="/case-study"
                className="text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Case Studies
              </a>
              <a
                href="/blogs"
                className="text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Blogs
              </a>
              <a
                href="/#pricing"
                className="text-xs sm:text-sm font-medium text-white bg-[#F36516] hover:bg-[#E55505] transition-colors px-4 py-2 rounded-full"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-50 to-orange-100 py-12 md:py-20 border-b border-orange-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Success Stories</h1>
              <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                Real results from real clients. Discover how our backlink strategies transform online visibility and
                authority.
              </p>

              {/* Functional Search Bar */}
              <div className="relative max-w-xl mx-auto">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="search"
                    placeholder="Search case studies..."
                    className="pl-10 pr-10 py-3 h-12 rounded-full border border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50 w-full"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  {searchQuery && (
                    <button
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      onClick={clearSearch}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
                {searchQuery && (
                  <div className="mt-2 text-sm text-gray-600">
                    {filteredCaseStudies.length === 0
                      ? "No results found"
                      : `Found ${filteredCaseStudies.length} result${filteredCaseStudies.length !== 1 ? "s" : ""}`}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                className={`px-4 py-2 rounded-full transition-colors ${
                  activeCategory === null
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : "border border-gray-300 text-gray-700 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200"
                }`}
                onClick={() => setActiveCategory(null)}
              >
                All Categories
              </button>

              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    activeCategory === category
                      ? "bg-orange-500 text-white hover:bg-orange-600"
                      : "border border-gray-300 text-gray-700 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200"
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* No Results Message */}
        {!hasResults && (
          <section className="py-12 container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center">
              <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                <div className="text-gray-400 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No matching case studies found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or filter criteria to find what you're looking for.
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => {
                      setSearchQuery("")
                      setActiveCategory(null)
                    }}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Featured Case Study - Only show if it matches search criteria */}
        {featuredCaseStudy &&
          (!searchQuery ||
            featuredCaseStudy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            featuredCaseStudy.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            featuredCaseStudy.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
          (!activeCategory || featuredCaseStudy.category === activeCategory) && (
            <section className="py-12 container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                  <span className="mr-2">Featured Case Study</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
                    Latest
                  </span>
                </h2>
                <div className="bg-white rounded-xl shadow-md overflow-hidden md:flex border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="md:w-1/2 relative">
                    <div className="aspect-[16/9] md:h-full relative">
                      <Image
                        src={featuredCaseStudy.image || "/placeholder.svg"}
                        alt={featuredCaseStudy.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-contain p-4"
                        priority
                      />
                    </div>
                  </div>
                  <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <time className="text-sm text-gray-500" dateTime={featuredCaseStudy.date}>
                          {featuredCaseStudy.date}
                        </time>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200">
                          {featuredCaseStudy.category}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">{featuredCaseStudy.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{featuredCaseStudy.excerpt}</p>

                      {/* Results Metrics */}
                      {featuredCaseStudy.results && (
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          {featuredCaseStudy.results.map((result, index) => (
                            <div
                              key={index}
                              className="bg-orange-50 border border-orange-100 rounded-lg p-3 text-center"
                            >
                              <div className="text-orange-600 font-bold text-xl">{result.value}</div>
                              <div className="text-xs text-gray-600">{result.metric}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div>
                      <Link
                        href={featuredCaseStudy.slug}
                        className="inline-flex items-center text-orange-500 hover:text-orange-600 font-medium transition-colors"
                      >
                        Read Full Case Study <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

        {/* Recent Case Studies */}
        {recentCaseStudies.length > 0 && (
          <section className="py-12 container mx-auto px-4 border-t border-gray-100">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                {searchQuery ? "Search Results" : "Recent Success Stories"}
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {recentCaseStudies.map((study) => (
                  <article
                    key={study.id}
                    className="bg-white rounded-lg overflow-hidden h-full border border-gray-100 hover:shadow-md transition-shadow duration-300"
                    data-category={study.category}
                  >
                    <div className="aspect-[16/9] relative">
                      <Image
                        src={study.image || "/placeholder.svg"}
                        alt={study.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain p-4"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-center mb-1">
                        <time className="text-sm text-gray-500" dateTime={study.date}>
                          {study.date}
                        </time>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200">
                          {study.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 line-clamp-2 hover:text-orange-500 transition-colors mb-2">
                        <Link href={study.slug} className="hover:underline">
                          {study.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 line-clamp-3 mb-4">{study.excerpt}</p>

                      {/* Results Metrics */}
                      {study.results && (
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          {study.results.map((result, index) => (
                            <div key={index} className="bg-gray-50 border border-gray-100 rounded-lg p-2 text-center">
                              <div className="text-orange-600 font-bold text-sm">{result.value}</div>
                              <div className="text-xs text-gray-600 line-clamp-1">{result.metric}</div>
                            </div>
                          ))}
                        </div>
                      )}

                      <Link
                        href={study.slug}
                        className="inline-flex items-center text-orange-500 hover:text-orange-600 font-medium transition-colors"
                      >
                        Read Case Study <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to achieve similar results?</h2>
              <p className="text-lg mb-8 text-orange-50">
                Join hundreds of businesses that have transformed their online presence with our proven backlink
                strategies.
              </p>
              <a
                href="/#pricing"
                className="inline-block bg-white text-orange-600 hover:bg-orange-50 px-8 py-3 rounded-full font-medium transition-colors"
              >
                Get Started Today
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
