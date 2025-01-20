"use client"

import { useState, useEffect } from "react"
import type { User } from "@supabase/supabase-js"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import Sidebar from "@/app/components/Sidebar"
import { Menu } from "lucide-react"
import Image from "next/image"
import { AnalyzerForm } from "./analyzer-form"

export default function Home() {
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
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Organization",
      name: "Get More Backlinks",
      url: "https://getmorebacklinks.org",
    },
  }

  return (
    <div className="flex h-screen bg-[#FBFCFE]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Sidebar user={user} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="flex-1 overflow-auto">
        <div className="min-h-screen flex flex-col">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-4 border-b md:hidden">
            <div className="w-8" />
            <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-md hover:bg-gray-100">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open sidebar</span>
            </button>
          </div>

          <div className="flex-grow">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-58">
              <AnalyzerForm />

              <div className="mt-16 space-y-12">
                <div className="bg-white border border-gray-200 rounded-lg p-8">
                  <section>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Use the Landing Page Analyzer</h2>

                    <div className="space-y-8">
                      <div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">Step 1: Enter Your URL</h3>
                        <p className="text-gray-900 text-lg leading-relaxed mb-4">
                          Simply paste your landing page URL into the analyzer above. Our tool will immediately begin
                          scanning your page for over 200+ SEO factors that impact your rankings.
                        </p>
                        <Image
                          src="/111.png"
                          alt="URL input interface of the Landing Page Analyzer"
                          width={800}
                          height={300}
                          className="rounded-lg w-full"
                        />
                      </div>

                      <div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">Step 2: Review Your Analysis</h3>
                        <p className="text-gray-900 text-lg leading-relaxed mb-4">
                          Within seconds, you'll receive a comprehensive report covering technical SEO, content
                          optimization, mobile responsiveness, and Core Web Vitals. Each issue is clearly explained with
                          its potential impact on your rankings.
                        </p>
                        <Image
                          src="/222.png"
                          alt="Comprehensive SEO analysis report"
                          width={800}
                          height={300}
                          className="rounded-lg w-full"
                        />
                      </div>

                      <div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">Step 3: Implement Recommendations</h3>
                        <p className="text-gray-900 text-lg leading-relaxed mb-4">
                          Our tool provides prioritized, actionable recommendations. Each suggestion includes specific
                          code snippets and step-by-step instructions. Focus on high-priority items first for the
                          biggest impact on your rankings.
                        </p>
                        <Image
                          src="/333.png"
                          alt="Prioritized SEO recommendations with code examples"
                          width={800}
                          height={300}
                          className="rounded-lg w-full"
                        />
                      </div>
                    </div>
                  </section>

                  <section className="mt-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Case Study: From Page 5 to Position 1</h2>
                    <p className="text-gray-900 text-lg leading-relaxed mb-6">
                      Let me share how a SaaS company used our analyzer to transform their product page from being
                      buried on page 5 to ranking #1 for their target keywords.
                    </p>

                    <div className="space-y-8">
                      <div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">The Challenge</h3>
                        <p className="text-gray-900 text-lg leading-relaxed mb-4">
                          Despite having a great product and investing in content, their main landing page wasn't
                          ranking. Their team was frustrated by generic SEO advice that wasn't moving the needle.
                        </p>
                        <Image
                          src="/innvision.png"
                          alt="Initial poor ranking position"
                          width={800}
                          height={300}
                          className="rounded-lg w-full"
                        />
                      </div>

                      <div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">The Analysis</h3>
                        <p className="text-gray-900 text-lg leading-relaxed mb-4">
                          Our analyzer identified several critical issues: poor mobile performance (7.2s load time),
                          unoptimized header tags, missing schema markup, and content that didn't match user intent. The
                          tool provided specific fixes for each issue.
                        </p>
                        <Image
                          src="/innvision2.png"
                          alt="Analysis showing critical SEO issues"
                          width={800}
                          height={300}
                          className="rounded-lg w-full"
                        />
                      </div>

                      <div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">The Results</h3>
                        <p className="text-gray-900 text-lg leading-relaxed mb-4">
                          After implementing our recommendations over two weeks: mobile load time dropped to 2.1s,
                          bounce rate decreased by 34%, and average time on page increased by 2.5 minutes. Within 6
                          weeks, they reached position #1 for their main keyword, driving 312% more organic traffic.
                        </p>
                        <Image
                          src="/result.png"
                          alt="Graph showing dramatic ranking improvement"
                          width={800}
                          height={300}
                          className="rounded-lg w-full"
                        />
                      </div>

                      <div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">Key Takeaways</h3>
                        <p className="text-gray-900 text-lg leading-relaxed mb-4">
                          Success came from addressing both technical SEO and content optimization. The analyzer's
                          prioritized recommendations helped them focus on changes that had the biggest impact first.
                          Regular re-analysis helped them stay on top of new opportunities and maintain their rankings.
                        </p>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

