'use client'

import Image from 'next/image'
import { websiteList } from './website-list'
import { useState } from 'react'
import { FiClock, FiTrendingUp, FiAlertCircle, FiCheckCircle, FiExternalLink, FiLink, FiTool, FiEdit } from 'react-icons/fi'
import Footer from '../components/footer'
import { CircularProgress } from './circular-progress'

export default function ReportPage() {
  const [visibleWebsites, setVisibleWebsites] = useState(50)

  const loadMore = () => {
    setVisibleWebsites(prev => Math.min(prev + 50, websiteList.length))
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="bg-white border-b-2 border-orange-500 py-6">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Image src="/getmorepacklinks.png" alt="Company Logo" width={70} height={50} />
          <h1 className="text-3xl font-bold">
            <span className="text-orange-500 mt-15">Submission</span> Report
          </h1>
        </div>
      </header>

      <main className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <section className="bg-gray-50/80 border border-gray-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">
              <span className="text-orange-500">Report</span> Overview
            </h2>
            <p className="mb-4">This report provides a comprehensive overview of your startup's submission status across various platforms. It includes submission guidelines, a list of submitted websites, and evidence of submissions.</p>
            <p>Use this report to track your progress and ensure maximum visibility for your startup.</p>
          </section>

          <section className="bg-gray-50/80 border border-gray-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">
              <span className="text-orange-500">Submission</span> Guidelines
            </h2>
            <ul className="space-y-6">
              <li className="flex items-start">
                <div className="mr-4 mt-1">
                  <FiClock className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Processing Time</h3>
                  <p>Expect results to appear within 30-60 days after submission. Be patient and use this time to refine your product.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-4 mt-1">
                  <FiTrendingUp className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Maximize Visibility</h3>
                  <p>Regularly update your product information and engage with the community to increase your chances of being featured.</p>
                </div>
              </li>
            </ul>
          </section>
        </div>

        <section className="bg-gray-50/80 border border-gray-200 rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-bold mb-6">
            <span className="text-orange-500">Landing Page</span> Analysis
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-8">
            <CircularProgress value={70} label="Messaging" color="#FF9F43" />
            <CircularProgress value={80} label="Readability" color="#28C76F" />
            <CircularProgress value={75} label="Structure" color="#FF5C5C" />
            <CircularProgress value={65} label="Actionability" color="#FF9F43" />
            <CircularProgress value={60} label="Design" color="#FF9F43" />
            <CircularProgress value={50} label="Credibility" color="#FF4F7A" />
          </div>

          <div className="space-y-6">
            <div className="prose max-w-none">
              <p className="text-gray-700">
                NoDial's landing page does a decent job by presenting a clear value proposition and leveraging integration with well-known services like Stripe and Calendly. The color scheme is cohesive, maintaining a modern, professional look. The typography is simple and readable, which is important. However, the page feels repetitive, especially in the headline sections where it continually reaffirms what it does without expanding on unique benefits or showcasing real-case scenarios. The call-to-action buttons are visible but lack creativity in the wording, feeling a bit generic. Social proof elements are non-existent, which seriously diminishes trust. The FAQ section helps in addressing potential customer concerns, but without clear testimonials, the credibility takes a hit.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Main Recommendations:</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <span className="text-orange-500">→</span>
                  Add customer testimonials or case studies to enhance credibility.
                  </li>
                <li className="flex items-center gap-2">
                  <span className="text-orange-500">→</span>
                  Use more engaging, action-oriented CTAs to improve actionability.
                  </li>
                <li className="flex items-center gap-2">
                  <span className="text-orange-500">→</span>
                  Modernize the design with subtle animations, updated visuals, and interactive elements.
                  </li>
                  <li className="flex items-center gap-2">
                  <span className="text-orange-500">→</span>
                  Simplify the layout further for better structure and user experience.
                  </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-gray-50/80 border border-gray-200 rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-bold mb-6">
            <span className="text-orange-500">Submitted</span> Websites
          </h2>
          <p className="mb-6">Your startup has been submitted to {websiteList.length} websites. This extensive list covers a wide range of platforms, increasing your chances of visibility and success.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50/80 border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-lg mb-2">MasterHackers</h3>
                </div>
                <a 
                  href="https://masterhackers.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black"
                >
                  <FiExternalLink className="w-5 h-5" />
                </a>
              </div>
              <div className="flex items-center mt-2">
                <span className="text-xs bg-gradient-to-r from-gray-600 to-orange-500 text-white px-2 py-1 rounded">Submitted</span>
              </div>
            </div>
            
            <div className="col-span-full bg-gray-50/80 border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-4">Priority SEO Actions</h3>
              <p className="mb-4">Improvement suggestions for sections with a score below 100%</p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold">Indexation & Robots.txt</h4>
                  <p className="text-sm text-gray-600">Score: 0/100</p>
                  <p className="text-sm">Consider adding hreflang tags if your content is available in multiple languages.</p>
                  <div className="mt-2 bg-orange-100 border border-orange-300 rounded p-2">
                    <p className="text-sm text-orange-800">Suggestion: Implement hreflang tags in your HTML head or HTTP headers to specify language and regional URLs. This helps search engines serve the correct language version of your pages to users.</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold">Meta & SEO Tags</h4>
                  <p className="text-sm text-gray-600">Score: 10/100</p>
                  <p className="text-sm">Title is too short. Aim for 50-60 characters.</p>
                  <div className="mt-2 bg-orange-100 border border-orange-300 rounded p-2">
                    <p className="text-sm text-orange-800">Suggestion: Expand your title tag to include more relevant keywords and make it more descriptive. A good title should be compelling and accurately represent the page content.</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold">Indexation & Robots.txt</h4>
                  <p className="text-sm text-gray-600">Score: 50/100</p>
                  <p className="text-sm">The canonical URL differs from the current URL. Ensure this is intentional.</p>
                  <div className="mt-2 bg-orange-100 border border-orange-300 rounded p-2">
                    <p className="text-sm text-orange-800">Suggestion: Review your canonical tags. If the difference is unintentional, update the canonical URL to match the current URL. Canonical tags help prevent duplicate content issues by specifying the preferred version of a page.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-full mt-6 bg-orange-100 border border-orange-300 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <FiEdit className="text-orange-500" />
                <h4 className="font-bold text-lg">Boost Your SEO with Our Blog Service</h4>
              </div>
              <p className="text-sm mb-2">
                <strong>Blogs are crucial for SEO success.</strong> They help you:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 mb-4">
                <li>Increase organic traffic</li>
                <li>Improve search engine rankings</li>
                <li>Establish your brand as an industry authority</li>
                <li>Create opportunities for backlinks</li>
                <li>Engage your audience and increase time on site</li>
              </ul>
              <p className="text-sm font-bold mb-2">We offer a premium blog service to supercharge your SEO efforts:</p>
              <ul className="list-none text-sm space-y-1 mb-4">
                <li>✅ SEO-optimized blog posts tailored to your needs</li>
                <li>✅ Customized content strategy aligned with your business goals</li>
                <li>✅ Expert writers with industry knowledge</li>
                <li>✅ Plans starting from just $14/month</li>
              </ul>
              <p className="text-sm font-bold">
                Ready to elevate your SEO game? DM us on <a className='text-orange-600' href="https://x.com/KrissmannGupta">Twitter</a> to get started!
              </p>
            </div>

            {/* Website list with load more */}
            <div className="col-span-full">
              <div className="h-[400px] overflow-y-auto bg-gray-50/80 border border-gray-200 rounded-md p-4 mb-4">
                <ul className="space-y-2">
                  {websiteList.slice(0, visibleWebsites).map((website, index) => (
                    <li key={index}>
                      <a 
                        href={website} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-black"
                      >
                        {website}
                      </a>
                    </li>
                  ))}
                </ul>
                {visibleWebsites < websiteList.length && (
                  <button 
                    onClick={loadMore} 
                    className="mt-4 bg-gradient-to-r from-gray-600 to-orange-500 text-white px-4 py-2 rounded font-bold"
                  >
                    Load More
                  </button>
                )}
              </div>
              <div className="bg-orange-100 border-2 border-orange-500 rounded-lg p-6 text-center">
                <p className="text-2xl font-bold mb-4">⭐ IMPORTANT NOTE ⭐</p>
                <p className="text-xl font-bold">
                  If your startup has not been listed yet, don't worry! It takes 30-60 days for the results to appear.
                </p>
                <p className="text-lg mt-4">
                  After 30 days, if you face any issues, message us on <a className='text-orange-600' href="https://x.com/KrissmannGupta">Twitter</a>. We will help you out as much as we can!
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50/80 border border-gray-200 rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-bold mb-6">
            <span className="text-orange-500">Paid</span> Directories
          </h2>
          <p className="mb-6">To further boost your visibility, consider listing your product on these premium directories:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2">Opentools</h3>
              <p className="text-sm text-gray-600 mb-2">Launch your product to a community of early adopters and tech enthusiasts.</p>
              <a 
                href="https://www.producthunt.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:underline"
              >
              </a>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2">Killer Startups</h3>
              <p className="text-sm text-gray-600 mb-2">Reach entrepreneurs and small business owners with lifetime deals.</p>
              <a 
                href="https://appsumo.com/partners/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:underline"
              >
              </a>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2">Futurepedia</h3>
              <p className="text-sm text-gray-600 mb-2">Get listed on the world's largest tech marketplace for business software.</p>
              <a 
                href="https://www.g2.com/products/new"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:underline"
              >
              </a>
            </div>
          </div>

          <div className="bg-orange-100 border-2 border-orange-500 rounded-lg p-6 text-center">
            <p className="text-2xl font-bold mb-4">🚀 Coming Soon: Directory Partnerships</p>
            <p className="text-lg">
              We're excited to announce that we'll soon be partnering with top directories to offer you exclusive listing opportunities!
            </p>
            <button className="mt-4 bg-gradient-to-r from-gray-600 to-orange-500 text-white px-6 py-2 rounded-lg font-bold">
              Get Notified
            </button>
          </div>
        </section>

        <section className="bg-gray-50/80 border border-gray-200 rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-bold mb-4">
            <span className="text-orange-500">Submission</span> Evidence
          </h2>
          <p className="mb-6">Below are the confirmation emails and submission receipts from various platforms:</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Startupanz.com Card */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="relative h-[400px]">
                <Image 
                  src="/masterhacker1.png" 
                  alt="Startupanz.com confirmation"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Additional Evidence Cards */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="relative h-[400px]">
                <Image 
                  src="/masterhacker2.png" 
                  alt="ProductHunt submission"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="relative h-[400px]">
                <Image 
                  src="/masterhacker3.png" 
                  alt="ProductHunt submission"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer/>
    </div>
  )
}

