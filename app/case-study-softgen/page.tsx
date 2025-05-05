"use client"

import { useState, useEffect } from "react"
import { TrendingUp, Award, Users, ExternalLink } from "lucide-react"
import Image from "next/image"
import Footer from "../components/footer"

export default function CaseStudyPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="bg-white" style={{ fontFamily: "Saira, sans-serif" }}>
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

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Case Study Header */}
          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
            }`}
          >
            <div className="mb-8">
              <div className="inline-flex items-center bg-orange-100 text-orange-800 rounded-full px-4 py-1 text-sm font-medium mb-4">
                Case Study
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
                Softgen.ai – Elevating Domain Rating from 15 to 26 in 30 Days
              </h1>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 mr-2">Client:</span>
                  <span className="text-gray-600">Softgen.ai</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 mr-2">Industry:</span>
                  <span className="text-gray-600">AI-Powered No-Code Web App Builder</span>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div
            className={`mb-10 transition-all duration-1000 ease-out delay-200 ${
              isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
            }`}
          >
            <div className="relative w-full rounded-xl overflow-hidden shadow-md">
              <div className="aspect-[16/9]">
                <Image
                  src="/softgengrowth2.jpeg"
                  alt="Softgen.ai Homepage"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 800px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div
            className={`mb-12 transition-all duration-1000 ease-out delay-300 ${
              isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="bg-orange-100 p-3 rounded-full mr-4">
                    <TrendingUp className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Domain Rating</p>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-bold text-gray-800">15</p>
                      <span className="text-green-500 mx-2">→</span>
                      <p className="text-2xl font-bold text-orange-600">26</p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">Significant increase in domain authority</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="bg-orange-100 p-3 rounded-full mr-4">
                    <Award className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Referring Domains</p>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-bold text-gray-800">20</p>
                      <span className="text-green-500 mx-2">→</span>
                      <p className="text-2xl font-bold text-orange-600">100+</p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">Massive growth in backlink profile</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="bg-orange-100 p-3 rounded-full mr-4">
                    <Users className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Organic Traffic</p>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-bold text-orange-600">2.5x</p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">Increase in monthly visitors</p>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-12">
            {/* The Challenge */}
            <section
              className={`transition-all duration-1000 ease-out delay-400 ${
                isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
              }`}
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-900">The Challenge</h2>
              <div className="prose prose-lg text-gray-700">
                <p>
                  Softgen.ai, an innovative platform enabling users to build full-stack web applications without coding,
                  aimed to improve its online authority and search engine visibility. Despite offering a robust suite of
                  features, the website's Domain Rating (DR) was relatively low at 15, limiting its reach and
                  credibility in a competitive market.
                </p>
              </div>
            </section>

            {/* The Strategy */}
            <section
              className={`transition-all duration-1000 ease-out delay-500 ${
                isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
              }`}
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-900">The Strategy</h2>
              <div className="prose prose-lg text-gray-700">
                <p>
                  To address this, Softgen.ai partnered with GetMoreBacklinks.org to implement a strategic
                  backlink-building campaign. The approach included:
                </p>
                <ul className="space-y-4 mt-4">
                  <li className="flex items-start">
                    <div className="bg-orange-100 rounded-full p-1 mr-3 mt-1">
                      <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>
                      <strong>High-Authority Directory Submissions:</strong> Submitting the website to over 100
                      reputable directories relevant to the tech and AI industry, such as Product Hunt, G2, and
                      Capterra.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-orange-100 rounded-full p-1 mr-3 mt-1">
                      <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>
                      <strong>Consistent NAP Information:</strong> Ensuring uniform Name, Address, and Phone Number
                      details across all listings to boost local SEO signals.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-orange-100 rounded-full p-1 mr-3 mt-1">
                      <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>
                      <strong>Targeted Outreach:</strong> Focusing on directories frequented by the target audience to
                      attract qualified traffic.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Second Image */}
            <div
              className={`transition-all duration-1000 ease-out delay-600 ${
                isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
              }`}
            >
              <div className="relative w-full rounded-xl overflow-hidden shadow-md">
                <div className="aspect-[16/9]">
                  <Image
                    src="/softgengrowth.png"
                    alt="Softgen.ai Domain Rating Growth"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 800px"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
              <p className="text-center text-sm text-gray-500 mt-2">Softgen.ai's Domain Rating growth over 30 days</p>
            </div>

            {/* The Results */}
            <section
              className={`transition-all duration-1000 ease-out delay-700 ${
                isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
              }`}
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-900">The Results</h2>
              <div className="prose prose-lg text-gray-700">
                <p>Within 30 days, Softgen.ai experienced a significant improvement in its SEO metrics:</p>
                <ul className="space-y-4 mt-4">
                  <li className="flex items-start">
                    <div className="bg-orange-100 rounded-full p-1 mr-3 mt-1">
                      <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>
                      <strong>Domain Rating:</strong> Increased from 15 to 26.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-orange-100 rounded-full p-1 mr-3 mt-1">
                      <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>
                      <strong>Referring Domains:</strong> Grew from 20 to over 100 unique domains.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-orange-100 rounded-full p-1 mr-3 mt-1">
                      <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>
                      <strong>Organic Traffic:</strong> Saw a 2.5x increase in monthly visitors.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-orange-100 rounded-full p-1 mr-3 mt-1">
                      <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>
                      <strong>Keyword Rankings:</strong> Achieved top 10 rankings for several industry-relevant
                      keywords.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Key Takeaways */}
            <section
              className={`transition-all duration-1000 ease-out delay-800 ${
                isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
              }`}
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Key Takeaways</h2>
              <div className="prose prose-lg text-gray-700">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-orange-100 rounded-full p-1 mr-3 mt-1">
                      <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>
                      <strong>Strategic Directory Submissions:</strong> Targeting high-authority directories can
                      significantly boost a website's domain authority and search engine rankings.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-orange-100 rounded-full p-1 mr-3 mt-1">
                      <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>
                      <strong>Consistency is Crucial:</strong> Maintaining consistent business information across all
                      platforms enhances credibility and SEO performance.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-orange-100 rounded-full p-1 mr-3 mt-1">
                      <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>
                      <strong>Focused Outreach:</strong> Engaging with directories that align with the target audience
                      ensures more qualified traffic and higher conversion rates.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Conclusion */}
            <section
              className={`transition-all duration-1000 ease-out delay-900 ${
                isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
              }`}
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Conclusion</h2>
              <div className="prose prose-lg text-gray-700">
                <p>
                  Softgen.ai's collaboration with GetMoreBacklinks.org showcases the effectiveness of strategic
                  backlink-building in enhancing online authority and visibility. By focusing on high-quality directory
                  submissions and consistent information, Softgen.ai significantly improved its Domain Rating and
                  overall SEO performance within a short period.
                </p>
                <p className="mt-4">
                  If you're looking to achieve similar results for your website, consider exploring the services offered
                  by GetMoreBacklinks.org to enhance your online presence and authority.
                </p>
              </div>
            </section>
          </div>

          {/* CTA Section */}
          <div
            className={`mt-16 transition-all duration-1000 ease-out delay-1000 ${
              isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
            }`}
          >
            <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 rounded-2xl p-10 md:p-16 shadow-xl border border-orange-400">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#grid)" />
                </svg>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-300 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-300 rounded-full opacity-20 blur-3xl"></div>

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-left max-w-xl">
                  <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white rounded-full px-4 py-1 text-sm font-medium mb-4">
                    <Award className="h-4 w-4 mr-2" />
                    Proven Results
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to boost your Domain Rating?</h3>
                  <p className="text-lg text-white/90 mb-6">
                    Get the same results as Softgen.ai with our proven backlink-building strategies. Join hundreds of
                    satisfied clients who have seen dramatic improvements in their SEO metrics.
                  </p>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-6 mb-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                      <p className="text-3xl font-bold text-white">73%</p>
                      <p className="text-xs text-white/80">Average DR Increase</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                      <p className="text-3xl font-bold text-white">30</p>
                      <p className="text-xs text-white/80">Days Average</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                      <p className="text-3xl font-bold text-white">100+</p>
                      <p className="text-xs text-white/80">Happy Clients</p>
                    </div>
                  </div>
                </div>

                
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
