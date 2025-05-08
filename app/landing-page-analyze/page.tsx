"use client"

import Image from "next/image"
import { AnalyzerForm } from "./analyzer-form"
import Footer from "../components/footer"
import { ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const priceCurrency = "USD"
  const USD = "$"
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Landing Page Analyzer",
    applicationCategory: "SEOApplication",
    description:
      "Free tool to analyze landing pages for 200+ SEO factors and get actionable recommendations to improve rankings.",
    operatingSystem: "Web",
    url: "https://getmorebacklinks.org/landing-page-analyze",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: priceCurrency,
    },
    creator: {
      "@type": "Organization",
      name: "Get More Backlinks",
      url: "https://getmorebacklinks.org",
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="h-16 sm:h-20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/getmorepacklinks.png"
                alt="GetMoreBacklinks"
                width={120}
                height={40}
                className="h-8 sm:h-10 w-auto"
              />
            </div>
            <nav className="flex items-center gap-3 sm:gap-6">
              <Link
                href="/"
                className="text-sm sm:text-base font-medium text-gray-700 hover:text-[#F36516] transition-colors"
              >
                Home
              </Link>
              <Link
                href="/case-study"
                className="text-sm sm:text-base font-medium text-gray-700 hover:text-[#F36516] transition-colors"
              >
                Case Studies
              </Link>
              <Link
                href="/blogs"
                className="text-sm sm:text-base font-medium text-gray-700 hover:text-[#F36516] transition-colors"
              >
                Blogs
              </Link>
              <Link
                href="/#pricing"
                className="text-sm sm:text-base font-medium text-white bg-gradient-to-r from-[#F36516] to-[#FF7A30] hover:from-[#E55505] hover:to-[#F36516] transition-all px-5 py-2.5 rounded-full border border-orange-300 transform hover:-translate-y-0.5"
              >
                Get Started
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto mb-8">
          <div className="text-center mb-8">
            <div className="inline-block bg-orange-100 text-[#F36516] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Free SEO Analysis Tool
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Analyze Your <span className="text-[#F36516]">Landing Page</span> <br className="hidden md:block" />
              For 200+ SEO Factors
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Get actionable recommendations to improve your rankings and drive more organic traffic. Our free analyzer
              identifies critical issues in seconds.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <div className="flex items-center bg-white px-4 py-2 rounded-full border border-gray-200">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm font-medium">Technical SEO Analysis</span>
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-full border border-gray-200">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm font-medium">Content Optimization</span>
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-full border border-gray-200">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm font-medium">Mobile Responsiveness</span>
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-full border border-gray-200">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm font-medium">Core Web Vitals</span>
            </div>
          </div>

          <AnalyzerForm />
        </div>

        {/* How to Use Section */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="bg-white border border-gray-200 rounded-2xl p-10">
            <div className="text-center mb-12">
              <div className="inline-block bg-orange-100 text-[#F36516] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                Simple 3-Step Process
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How to Use the Landing Page Analyzer
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our powerful tool makes it easy to identify and fix SEO issues that are holding back your rankings.
              </p>
            </div>

            <div className="space-y-16">
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div className="order-2 md:order-1">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 text-[#F36516] font-bold rounded-full mb-4">
                    1
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Enter Your URL</h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Simply paste your landing page URL into the analyzer above. Our advanced algorithm will immediately
                    begin scanning your page for over 200+ SEO factors that impact your rankings and user experience.
                  </p>
                  <ul className="space-y-3">
                    {["No registration required", "Instant analysis", "Works with any website"].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="order-1 md:order-2">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-orange-100 to-orange-200 rounded-2xl transform rotate-2 -z-10"></div>
                    <Image
                      src="/analyzer.png"
                      alt="URL input interface of the Landing Page Analyzer"
                      width={800}
                      height={400}
                      className="rounded-xl border border-gray-200 w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div className="order-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 text-[#F36516] font-bold rounded-full mb-4">
                    2
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Review Your Analysis</h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Within seconds, you'll receive a comprehensive report covering technical SEO, content optimization,
                    mobile responsiveness, and Core Web Vitals. Each issue is clearly explained with its potential
                    impact on your rankings.
                  </p>
                  <ul className="space-y-3">
                    {["Detailed performance metrics", "Prioritized issues", "Competitor comparison"].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="order-1">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-orange-100 to-orange-200 rounded-2xl transform -rotate-2 -z-10"></div>
                    <Image
                      src="/222.png"
                      alt="Comprehensive SEO analysis report"
                      width={800}
                      height={400}
                      className="rounded-xl border border-gray-200 w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div className="order-2 md:order-1">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 text-[#F36516] font-bold rounded-full mb-4">
                    3
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Implement Recommendations</h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Our tool provides prioritized, actionable recommendations that you can implement immediately. Each
                    suggestion includes specific code snippets and step-by-step instructions to fix issues and optimize
                    your page.
                  </p>
                  <ul className="space-y-3">
                    {["Code examples provided", "Step-by-step instructions", "Priority-based fixes"].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="order-1 md:order-2">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-orange-100 to-orange-200 rounded-2xl transform rotate-2 -z-10"></div>
                    <Image
                      src="/333.png"
                      alt="Prioritized SEO recommendations with code examples"
                      width={800}
                      height={400}
                      className="rounded-xl border border-gray-200 w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Case Study Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-10 border border-gray-700">
            <div className="text-center mb-12">
              <div className="inline-block bg-orange-500/20 text-orange-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                Success Story
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Case Study: From Page 5 to Position 1</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                See how a SaaS company used our analyzer to transform their product page from being buried on page 5 to
                ranking #1 for their target keywords.
              </p>
            </div>

            <div className="space-y-12">
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-500/20 text-orange-400 font-bold rounded-full mb-4">
                    <span className="sr-only">Challenge</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">The Challenge</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Despite having a great product and investing in content, their main landing page wasn't ranking.
                    Their team was frustrated by generic SEO advice that wasn't moving the needle.
                  </p>
                  <div className="mt-6 flex items-center">
                    <div className="flex items-center mr-6">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                      <span className="text-gray-300">Page 5 ranking</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                      <span className="text-gray-300">Low organic traffic</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-orange-500/10 rounded-2xl transform rotate-2 -z-10"></div>
                    <Image
                      src="/innvision.png"
                      alt="Initial poor ranking position"
                      width={800}
                      height={400}
                      className="rounded-xl border border-gray-200 w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div className="order-2 md:order-1">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-orange-500/10 rounded-2xl transform -rotate-2 -z-10"></div>
                    <Image
                      src="/innvision2.png"
                      alt="Analysis showing critical SEO issues"
                      width={800}
                      height={400}
                      className="rounded-xl border border-gray-200 w-full"
                    />
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-500/20 text-orange-400 font-bold rounded-full mb-4">
                    <span className="sr-only">Analysis</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">The Analysis</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Our analyzer identified several critical issues that competitors had optimized for:
                  </p>
                  <ul className="mt-4 space-y-3">
                    {[
                      "Poor mobile performance (7.2s load time)",
                      "Unoptimized header tags and content structure",
                      "Missing schema markup for better SERP features",
                      "Content that didn't match user search intent",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                          <span className="text-xs">{i + 1}</span>
                        </div>
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-500/20 text-orange-400 font-bold rounded-full mb-4">
                    <span className="sr-only">Results</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                      <polyline points="16 7 22 7 22 13"></polyline>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">The Results</h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-4">
                    After implementing our recommendations over two weeks, they saw dramatic improvements:
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/10 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-orange-400 mb-1">7.2s → 2.1s</div>
                      <div className="text-sm text-gray-300">Mobile Load Time</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-orange-400 mb-1">-34%</div>
                      <div className="text-sm text-gray-300">Bounce Rate</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-orange-400 mb-1">+2.5 min</div>
                      <div className="text-sm text-gray-300">Time on Page</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-orange-400 mb-1">+312%</div>
                      <div className="text-sm text-gray-300">Organic Traffic</div>
                    </div>
                  </div>
                  <p className="text-gray-300">
                    Within 6 weeks, they reached position #1 for their main keyword, driving significantly more organic
                    traffic.
                  </p>
                </div>
                <div>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-orange-500/10 rounded-2xl transform rotate-2 -z-10"></div>
                    <Image
                      src="/result.png"
                      alt="Graph showing dramatic ranking improvement"
                      width={800}
                      height={400}
                      className="rounded-xl border border-gray-200 w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4">Key Takeaways</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Technical + Content",
                      description:
                        "Success came from addressing both technical SEO and content optimization simultaneously.",
                    },
                    {
                      title: "Prioritized Approach",
                      description:
                        "The analyzer's prioritized recommendations helped them focus on high-impact changes first.",
                    },
                    {
                      title: "Continuous Improvement",
                      description:
                        "Regular re-analysis helped them stay on top of new opportunities and maintain rankings.",
                    },
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="font-bold">{index + 1}</span>
                        </div>
                        <h4 className="font-bold text-lg">{item.title}</h4>
                      </div>
                      <p className="text-gray-300 pl-11">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/#analyzer"
                className="inline-flex items-center justify-center bg-gradient-to-r from-[#F36516] to-[#FF7A30] hover:from-[#E55505] hover:to-[#F36516] text-white font-medium px-8 py-4 rounded-full border border-orange-300 transition-all transform hover:-translate-y-0.5"
              >
                Analyze Your Landing Page Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-10 text-white text-center border border-orange-400">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Improve Your Rankings?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of SEO professionals who use our analyzer to identify and fix critical issues.
            </p>
            <Link
              href="/#analyzer"
              className="inline-flex items-center justify-center bg-white text-orange-600 font-medium px-8 py-4 rounded-full border border-orange-200 transition-all transform hover:-translate-y-0.5"
            >
              Get Your Free Analysis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <div className="mt-6 text-orange-100 text-sm">No credit card required • Instant results</div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
