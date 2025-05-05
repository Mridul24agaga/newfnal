"use client"

import { useState, useEffect } from "react"
import { TrendingUp, Award, Users } from "lucide-react"
import Image from "next/image"

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
                Blogosocial.com – Elevating Domain Rating from 0 to 9 in 17 Days
              </h1>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 mr-2">Client:</span>
                  <span className="text-gray-600">Blogosocial.com</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 mr-2">Industry:</span>
                  <span className="text-gray-600">Strategic Blogging and SEO Services</span>
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
                  src="/blogosocial1.png"
                  alt="Blogosocial.com Homepage"
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
                      <p className="text-2xl font-bold text-gray-800">0</p>
                      <span className="text-green-500 mx-2">→</span>
                      <p className="text-2xl font-bold text-orange-600">9</p>
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
                      <p className="text-2xl font-bold text-gray-800">0</p>
                      <span className="text-green-500 mx-2">→</span>
                      <p className="text-2xl font-bold text-orange-600">50+</p>
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
                    <p className="text-sm text-gray-500">Timeline</p>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-bold text-orange-600">17 Days</p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">Rapid improvement in SEO metrics</p>
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
                  Blogosocial.com, a platform offering strategic blogging and SEO services, was a new entrant in the
                  digital space. With a Domain Rating (DR) of 0, the website faced challenges in establishing
                  credibility, attracting organic traffic, and competing in search engine rankings.
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
                  To address these challenges, Blogosocial.com partnered with GetMoreBacklinks.org to implement a
                  targeted backlink-building campaign. The approach included:
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
                      reputable directories relevant to the blogging and SEO industry, such as Product Hunt, G2, and
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
            {/* Featured Image */}
            <div
              className={`mb-10 transition-all duration-1000 ease-out delay-200 ${
                isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
              }`}
            >
              <div className="relative h-64 md:h-80 lg:h-96 w-full rounded-xl overflow-hidden shadow-md">
                <Image src="/blogosocial.png" alt="saasyDB Dashboard" fill className="object-contain" />
              </div>
            </div>

            {/* The Results */}
            <section
              className={`transition-all duration-1000 ease-out delay-700 ${
                isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
              }`}
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-900">The Results</h2>
              <div className="prose prose-lg text-gray-700">
                <p>Within 17 days, Blogosocial.com experienced a significant improvement in its SEO metrics:</p>
                <ul className="space-y-4 mt-4">
                  <li className="flex items-start">
                    <div className="bg-orange-100 rounded-full p-1 mr-3 mt-1">
                      <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>
                      <strong>Domain Rating:</strong> Increased from 0 to 9.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-orange-100 rounded-full p-1 mr-3 mt-1">
                      <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>
                      <strong>Referring Domains:</strong> Grew from 0 to over 50 unique domains.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-orange-100 rounded-full p-1 mr-3 mt-1">
                      <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>
                      <strong>Organic Traffic:</strong> Saw a noticeable uptick in monthly visitors.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-orange-100 rounded-full p-1 mr-3 mt-1">
                      <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>
                      <strong>Keyword Rankings:</strong> Achieved top 20 rankings for several industry-relevant
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
                  Blogosocial.com's collaboration with GetMoreBacklinks.org showcases the effectiveness of strategic
                  backlink-building in enhancing online authority and visibility. By focusing on high-quality directory
                  submissions and consistent information, Blogosocial.com significantly improved its Domain Rating and
                  overall SEO performance within a short period.
                </p>
                <p className="mt-4">
                  If you're looking to achieve similar results for your website, consider exploring the services offered
                  by GetMoreBacklinks.org to enhance your online presence and authority.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
