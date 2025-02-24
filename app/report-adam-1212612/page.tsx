"use client"

import { websiteList } from "./website-list"
import { useState } from "react"
import { FiClock, FiTrendingUp, FiExternalLink } from "react-icons/fi"

export default function ReportPage() {
  const [visibleWebsites, setVisibleWebsites] = useState(50)

  const loadMore = () => {
    setVisibleWebsites((prev) => Math.min(prev + 50, websiteList.length))
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <main className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <section className="bg-gray-50/80 border border-gray-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">
              <span className="text-blue-500">Report</span> Overview
            </h2>
            <p className="mb-4">
              This report provides a comprehensive overview of your startup's submission status across various
              platforms. It includes submission guidelines, a list of submitted websites, and evidence of submissions.
            </p>
            <p>Use this report to track your progress and ensure maximum visibility for your startup.</p>
          </section>

          <section className="bg-gray-50/80 border border-gray-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">
              <span className="text-blue-500">Submission</span> Guidelines
            </h2>
            <ul className="space-y-6">
              <li className="flex items-start">
                <div className="mr-4 mt-1">
                  <FiClock className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Processing Time</h3>
                  <p>
                    Expect results to appear within 30-60 days after submission. Be patient and use this time to refine
                    your product.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-4 mt-1">
                  <FiTrendingUp className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Maximize Visibility</h3>
                  <p>
                    Regularly update your product information and engage with the community to increase your chances of
                    being featured.
                  </p>
                </div>
              </li>
            </ul>
          </section>
        </div>

        <section className="bg-gray-50/80 border border-gray-200 rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-bold mb-6">
            <span className="text-blue-500">Submitted</span> Websites
          </h2>
          <p className="mb-6">
            Your startup has been submitted to {websiteList.length} websites. This extensive list covers a wide range of
            platforms, increasing your chances of visibility and success.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50/80 border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-lg mb-2">kyotobotanicals</h3>
                </div>
                <a href="https://kyotobotanicals.com/" target="_blank" rel="noopener noreferrer" className="text-black">
                  <FiExternalLink className="w-5 h-5" />
                </a>
              </div>
              <div className="flex items-center mt-2">
                <span className="text-xs bg-gradient-to-r from-gray-600 to-blue-500 text-white px-2 py-1 rounded">
                  Submitted
                </span>
              </div>
            </div>

            <div className="col-span-full">
              <div className="h-[400px] overflow-y-auto bg-gray-50/80 border border-gray-200 rounded-md p-4 mb-4">
                <ul className="space-y-2">
                  {websiteList.slice(0, visibleWebsites).map((website, index) => (
                    <li key={index}>
                      <a href={website} target="_blank" rel="noopener noreferrer" className="text-black">
                        {website}
                      </a>
                    </li>
                  ))}
                </ul>
                {visibleWebsites < websiteList.length && (
                  <button
                    onClick={loadMore}
                    className="mt-4 bg-gradient-to-r from-gray-600 to-blue-500 text-white px-4 py-2 rounded font-bold"
                  >
                    Load More
                  </button>
                )}
              </div>
              <div className="bg-blue-100 border-2 border-blue-500 rounded-lg p-6 text-center">
                <p className="text-2xl font-bold mb-4">⭐ IMPORTANT NOTE ⭐</p>
                <p className="text-xl font-bold">
                  If your startup has not been listed yet, don't worry! It takes 30-60 days for the results to appear.
                </p>
                <p className="text-lg mt-4">
                  After 30 days, if you face any issues, message us on{" "}
                  <a className="text-blue-600" href="https://x.com/KrissmannGupta">
                    Twitter
                  </a>
                  . We will help you out as much as we can!
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

