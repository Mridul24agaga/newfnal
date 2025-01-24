"use client"

import { Suspense } from "react"
import Testimonials from "../components/testimonialcard"
import Link from "next/link"
import { PricingSectionWrapper } from "./pricing-section-wrapper"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <Link href="/backlink-directory" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Directory
          </Link>
        </div>
       
        <Suspense fallback={<PricingLoadingState />}>
          <PricingSectionWrapper />
        </Suspense>
        <Testimonials  />
      </div>
    </div>
  )
}

function PricingLoadingState() {
  return (
    <div className="animate-pulse">
      <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
      <div className="h-32 bg-gray-200 rounded-lg"></div>
    </div>
  )
}

