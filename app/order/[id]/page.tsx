'use client'

import { ArrowLeft, HelpCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function OrderPage() {
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'full'>('basic')
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const paypalLinks = {
      basic: 'https://www.paypal.com/ncp/payment/3LFDJDWJMR7F4',
      full: 'https://www.paypal.com/ncp/payment/SW5ZVGBCXW2SA' // Replace with the actual PayPal link for the full audit
    }
    window.location.href = paypalLinks[selectedPlan]
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link 
            href="/hire-an-seo-expert"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Link>
        </div>

        <div className="text-center mb-8">
          <div className="inline-block">
            <Image
              src="/getmorepacklinks.png"
              alt="Company Logo"
              width={200}
              height={100}
              className="mx-auto"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">Order SEO Audit</h2>
          <p className="text-gray-600 mb-6">Fill in the details of your website for the SEO audit.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                Website*
              </label>
              <input
                type="url"
                id="website"
                name="website"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F45B5B] focus:border-transparent"
                placeholder="example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Audit Type*
              </label>
              
              <div className="space-y-4">
                <div
                  className={`relative border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedPlan === 'basic'
                      ? 'border-[#F45B5B] bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedPlan('basic')}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="plan"
                        value="basic"
                        checked={selectedPlan === 'basic'}
                        className="mt-1"
                        onChange={() => setSelectedPlan('basic')}
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">SEO Improvement Audit</h3>
                          <HelpCircle className="w-4 h-4 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Comprehensive analysis and actionable recommendations for your website's SEO
                        </p>
                      </div>
                    </div>
                    <span className="font-semibold">$329</span>
                  </div>
                </div>

                <div
                  className={`relative border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedPlan === 'full'
                      ? 'border-[#F45B5B] bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedPlan('full')}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="plan"
                        value="full"
                        checked={selectedPlan === 'full'}
                        className="mt-1"
                        onChange={() => setSelectedPlan('full')}
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">SEO Audit + 200 Backlinks + 10 Blogs</h3>
                          <HelpCircle className="w-4 h-4 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Complete SEO audit, high-quality backlinks, and custom blog content to boost your online presence
                        </p>
                      </div>
                    </div>
                    <span className="font-semibold">$550</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Private Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F45B5B] focus:border-transparent"
                placeholder="We would like to know more about..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#F45B5B] text-white py-3 rounded-md font-medium hover:bg-[#E34A4A] transition-colors"
            >
              Order SEO Audit
            </button>
          </form>
        </div>

        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-green-800 font-medium mb-2">
            Guarantee: If you don't see an improvement in your traffic within 6 months:
          </h3>
          <ul className="space-y-2 text-green-700">
            <li className="flex items-center gap-2">
              <span className="font-medium">•</span>
              We'll provide a FREE follow-up audit
            </li>
            <li className="flex items-center gap-2">
              <span className="font-medium">•</span>
              You'll receive FREE implementation tips
            </li>
            <li className="flex items-center gap-2">
              <span className="font-medium">•</span>
              Chat with us for FREE
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

