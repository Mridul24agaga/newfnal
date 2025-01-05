'use client'

import Image from 'next/image'
import { websiteList } from './website-list'
import { useState } from 'react'
import { FiClock, FiTrendingUp, FiAlertCircle, FiCheckCircle, FiExternalLink, FiLink, FiTool, FiEdit } from 'react-icons/fi'
import Footer from '../components/footer'

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
            <span className="text-orange-500">Submitted</span> Websites
          </h2>
          <p className="mb-6">Your startup has been submitted to {websiteList.length} websites. This extensive list covers a wide range of platforms, increasing your chances of visibility and success.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50/80 border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-lg mb-2">CopyClick</h3>
                </div>
                <a 
                  href="https://www.copy-click.com/"
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
                  <p className="text-sm">Add a canonical URL to specify the preferred version of this page.</p>
                  <div className="mt-2 bg-orange-100 border border-orange-300 rounded p-2">
                    <p className="text-sm text-orange-800">Suggestion: Implement a canonical tag in your HTML head to indicate the preferred URL for this page. This helps prevent duplicate content issues and consolidates ranking signals.</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold">Indexation & Robots.txt</h4>
                  <p className="text-sm text-gray-600">Score: 0/100</p>
                  <p className="text-sm">Consider adding hreflang tags if your content is available in multiple languages.</p>
                  <div className="mt-2 bg-orange-100 border border-orange-300 rounded p-2">
                    <p className="text-sm text-orange-800">Suggestion: If you have multiple language versions of your content, implement hreflang tags to help search engines serve the correct language version to users.</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold">Structured Data</h4>
                  <p className="text-sm text-gray-600">Score: 0/100</p>
                  <p className="text-sm">Consider adding structured data to enhance how your content appears in search results.</p>
                  <div className="mt-2 bg-orange-100 border border-orange-300 rounded p-2">
                    <p className="text-sm text-orange-800">Suggestion: Implement relevant structured data (e.g., JSON-LD) to provide additional context about your page content to search engines, potentially improving your search result appearance.</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold">Meta & SEO Tags</h4>
                  <p className="text-sm text-gray-600">Score: 22/100</p>
                  <p className="text-sm">Title is too short. Aim for 50-60 characters.</p>
                  <div className="mt-2 bg-orange-100 border border-orange-300 rounded p-2">
                    <p className="text-sm text-orange-800">Suggestion: Expand your title tag to include more relevant keywords and make it more descriptive, while staying within the recommended 50-60 character limit for optimal display in search results.</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold">Links & Navigation</h4>
                  <p className="text-sm text-gray-600">Score: 63/100</p>
                  <p className="text-sm">Fix the broken links to ensure a smooth user experience and proper page indexing.</p>
                  <div className="mt-2 bg-orange-100 border border-orange-300 rounded p-2">
                    <p className="text-sm text-orange-800">Suggestion: Conduct a thorough link audit to identify and fix any broken links. This improves user experience and helps search engines crawl your site more effectively.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-full mt-6 bg-orange-100 border border-orange-500 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4">Improve Your Landing Page</h3>
              <p className="text-lg mb-4">Enhance your online presence and boost your SEO with these critical improvements:</p>
              
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="text-xl font-semibold">Extension Details</h4>
                  <p>Our CopyClick extension simplifies the process of copying text from any website or app, making it ready for use in AI tools like ChatGPT or Claude. Key features include:</p>
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>One-click text copying from any source</li>
                    <li>Automatic formatting for AI tool compatibility</li>
                    <li>Cross-browser support (Chrome, Firefox, Safari)</li>
                    <li>Privacy-focused with no data storage</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold">Boost Your SEO with Our Blog Service</h4>
                  <p>Elevate your online presence with our professional blog writing service:</p>
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>SEO-optimized content tailored to your industry</li>
                    <li>Regular posts to improve search engine rankings</li>
                    <li>Engaging articles to increase site traffic and user retention</li>
                    <li>Expert writers with deep knowledge in various fields</li>
                    <li>Affordable plans starting from just $14/month</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg">
                <p className="text-xl font-bold text-center mb-2">Ready to supercharge your online presence?</p>
                <p className="text-center mb-4">Get started with our blog service today and watch your site climb the search rankings!</p>
                <div className="text-center">
                  <a 
                    href="https://x.com/KrissmannGupta" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-gradient-to-r from-gray-600 to-orange-500 text-white px-6 py-2 rounded-lg font-bold inline-block hover:opacity-90 transition-opacity"
                  >
                    Contact Us on Twitter
                  </a>
                </div>
              </div>
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
                Learn More
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
                Learn More
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
                Learn More
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
                  src="/copyclick1.png" 
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
                  src="/copyclick2.png" 
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

