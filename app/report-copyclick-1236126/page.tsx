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
                  <h4 className="font-bold">Links & Navigation</h4>
                  <p className="text-sm text-gray-600">Score: 0/100</p>
                  <p className="text-sm">There was an error checking the sitemap. Please ensure the domain is accessible and try again.</p>
                </div>
                
                <div>
                  <h4 className="font-bold">Indexation & Robots.txt</h4>
                  <p className="text-sm text-gray-600">Score: 0/100</p>
                  <p className="text-sm">Consider adding hreflang tags if your content is available in multiple languages.</p>
                </div>
                
                <div>
                  <h4 className="font-bold">Content Structure & Accessibility</h4>
                  <p className="text-sm text-gray-600">Score: 21/100</p>
                  <p className="text-sm">Consider adding more content to reach a minimum of 300 words for better SEO.</p>
                </div>
                
                <div>
                  <h4 className="font-bold">Content Structure & Accessibility</h4>
                  <p className="text-sm text-gray-600">Score: 50/100</p>
                  <p className="text-sm">Add descriptive alt tags to images that are missing them to improve accessibility and SEO.</p>
                </div>
                
                <div>
                  <h4 className="font-bold">Meta & SEO Tags</h4>
                  <p className="text-sm text-gray-600">Score: 53/100</p>
                  <p className="text-sm">Title is too short. Aim for 50-60 characters.</p>
                </div>
                
                <div>
                  <h4 className="font-bold">Content Structure & Accessibility</h4>
                  <p className="text-sm text-gray-600">Score: 60/100</p>
                  <p className="text-sm">Improve your heading structure: Heading level skipped. "Install now" should be H2 instead of H3. Heading level skipped. "Copy the text shown in any website or app on your browser in plain text ready to paste into ChatGPT or Claude." should be H3 instead of H4</p>
                </div>
                
                <div>
                  <h4 className="font-bold">Meta & SEO Tags</h4>
                  <p className="text-sm text-gray-600">Score: 69/100</p>
                  <p className="text-sm">Meta description is too short. Aim for 120-160 characters.</p>
                </div>
              </div>
            </div>

            <div className="col-span-full mt-6 bg-orange-100 border border-orange-300 rounded-lg p-4">
              <h4 className="font-bold text-lg mb-3">Suggestions for Improvement</h4>
              <ul className="list-disc list-inside space-y-2">
                <li>Create and submit a valid sitemap.xml file to improve crawlability.</li>
                <li>Implement hreflang tags if you have multi-language content to help search engines serve the correct version to users.</li>
                <li>Expand your content to reach at least 300 words per page, focusing on providing valuable information to users.</li>
                <li>Review all images and add descriptive, keyword-rich alt tags to improve accessibility and SEO.</li>
                <li>Optimize your page title to be between 50-60 characters long, including relevant keywords.</li>
                <li>Fix the heading structure to maintain a logical hierarchy.</li>
                <li>Expand your meta description to be between 120-160 characters, providing a concise summary of the page content.</li>
              </ul>
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

