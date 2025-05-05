"use client"

import { useState } from "react"
import { Check, X, ExternalLink, Info } from "lucide-react"

// Define types for our features
type FeatureKey = "directory-submissions" | "high-da-backlinks" | "instant-reply" | "local-directory"

type Features = {
  [key in FeatureKey]: boolean | string
}

type Competitor = {
  name: string
  highlight: boolean
  tagline: string
  price: string
  pricePeriod: string
  features: Features
}

export default function ComparisonSection() {
  const [expandedFeature, setExpandedFeature] = useState<FeatureKey | null>(null)

  // Toggle feature explanation
  const toggleFeature = (feature: FeatureKey) => {
    if (expandedFeature === feature) {
      setExpandedFeature(null)
    } else {
      setExpandedFeature(feature)
    }
  }

  // Comparison data
  const competitors: Competitor[] = [
    {
      name: "GetMoreBacklinks",
      highlight: true,
      tagline: "All-in-one backlink solution",
      price: "$127",
      pricePeriod: "one-time",
      features: {
        "directory-submissions": true,
        "high-da-backlinks": true,
        "instant-reply": true,
        "local-directory": true,
      },
    },
    {
      name: "Listing Bot",
      highlight: false,
      tagline: "Automated directory listings",
      price: "$499",
      pricePeriod: "one-time",
      features: {
        "directory-submissions": true,
        "high-da-backlinks": false,
        "instant-reply": false,
        "local-directory": false,
      },
    },
    {
      name: "SEO Agency",
      highlight: false,
      tagline: "Full-service SEO",
      price: "$1,500+",
      pricePeriod: "monthly",
      features: {
        "directory-submissions": true,
        "high-da-backlinks": false,
        "instant-reply": false,
        "local-directory": true,
      },
    },
  ]

  // Feature explanations
  const featureExplanations: Record<FeatureKey, string> = {
    "directory-submissions":
      "Submit your product or website to high-quality directories to increase visibility and backlinks.",
    "high-da-backlinks":
      "Receive backlinks from websites with high Domain Authority, which have more impact on your SEO.",
    "instant-reply": "Whether you receive immediate responses to your support inquiries.",
    "local-directory": "Submission to local directories that boost local SEO and visibility in local searches.",
  }

  // Feature display names
  const featureNames: Record<FeatureKey, string> = {
    "directory-submissions": "Directory Submissions",
    "high-da-backlinks": "High DA Backlinks",
    "instant-reply": "Instant Reply",
    "local-directory": "Local Directory Submission",
  }

  return (
    <div className="py-16 px-4 md:px-6 lg:px-8 bg-white" style={{ fontFamily: "Saira, sans-serif" }}>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Saira:wght@300;400;500;600;700&display=swap");
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Heading and Description */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-orange-100 text-orange-800 rounded-full px-4 py-1 text-sm font-medium mb-4">
            Honest Comparison
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900" style={{ fontFamily: "Saira, sans-serif" }}>
            How We Compare
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg" style={{ fontFamily: "Saira, sans-serif" }}>
            See why GetMoreBacklinks offers the best value for your SEO investment
          </p>
        </div>

        {/* Mobile Comparison Cards (visible on small screens) */}
        <div className="lg:hidden space-y-8 mb-12">
          {competitors.map((competitor, index) => (
            <div
              key={index}
              className={`border ${
                competitor.highlight ? "border-orange-500" : "border-gray-200"
              } rounded-xl bg-white overflow-hidden`}
            >
              <div className={`p-6 ${competitor.highlight ? "bg-orange-50" : ""}`}>
                <h3 className="text-xl font-bold mb-1">{competitor.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{competitor.tagline}</p>
                <div className="flex items-baseline mb-6">
                  <span className="text-3xl font-bold">{competitor.price}</span>
                  <span className="text-gray-500 ml-1">{competitor.pricePeriod}</span>
                </div>

                {(Object.entries(featureNames) as [FeatureKey, string][]).map(([key, name]) => (
                  <div key={key} className="py-3 border-t border-gray-100 flex justify-between items-center">
                    <div className="flex items-center">
                      <span>{name}</span>
                      <button onClick={() => toggleFeature(key)} className="ml-1 text-gray-400 hover:text-gray-600">
                        <Info size={14} />
                      </button>
                    </div>
                    <div>
                      {typeof competitor.features[key] === "boolean" ? (
                        competitor.features[key] ? (
                          <Check className="text-green-500 w-5 h-5" />
                        ) : (
                          <X className="text-red-500 w-5 h-5" />
                        )
                      ) : (
                        <span className="text-sm font-medium">{competitor.features[key]}</span>
                      )}
                    </div>
                  </div>
                ))}

                {expandedFeature && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                    {featureExplanations[expandedFeature]}
                  </div>
                )}

                {competitor.highlight && (
                  <div className="mt-6">
                    <a
                      href="#pricing"
                      className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-full transition-colors"
                    >
                      Get Started
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Comparison Table (visible on large screens) */}
        <div className="hidden lg:block overflow-hidden border border-gray-200 rounded-xl bg-white">
          {/* Table Header */}
          <div className="grid grid-cols-4 border-b border-gray-200">
            <div className="p-6 col-span-1 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-700">Features</h3>
            </div>

            {competitors.map((competitor, index) => (
              <div key={index} className={`p-6 text-center ${competitor.highlight ? "bg-orange-50" : ""}`}>
                <h3 className={`text-xl font-bold mb-1 ${competitor.highlight ? "text-orange-600" : ""}`}>
                  {competitor.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{competitor.tagline}</p>
                <div className="flex items-baseline justify-center mb-6">
                  <span className="text-3xl font-bold">{competitor.price}</span>
                  <span className="text-gray-500 ml-1">{competitor.pricePeriod}</span>
                </div>

                {competitor.highlight && (
                  <a
                    href="#pricing"
                    className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-full transition-colors"
                  >
                    Get Started
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Table Body */}
          {(Object.entries(featureNames) as [FeatureKey, string][]).map(([key, name], rowIndex) => (
            <div key={key} className={`grid grid-cols-4 ${rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
              <div className="p-4 col-span-1 flex items-center border-r border-gray-200">
                <div className="flex items-center">
                  <span className="font-medium">{name}</span>
                  <button onClick={() => toggleFeature(key)} className="ml-1 text-gray-400 hover:text-gray-600">
                    <Info size={14} />
                  </button>
                </div>

                {expandedFeature === key && (
                  <div className="absolute mt-8 ml-6 z-10 p-3 bg-white rounded-lg text-sm text-gray-600 shadow-lg border border-gray-200 max-w-xs">
                    {featureExplanations[key]}
                  </div>
                )}
              </div>

              {competitors.map((competitor, index) => (
                <div key={index} className={`p-4 text-center ${competitor.highlight ? "bg-orange-50" : ""}`}>
                  {typeof competitor.features[key] === "boolean" ? (
                    competitor.features[key] ? (
                      <Check className="text-green-500 w-5 h-5 mx-auto" />
                    ) : (
                      <X className="text-red-500 w-5 h-5 mx-auto" />
                    )
                  ) : (
                    <span className={`font-medium ${competitor.highlight ? "text-orange-600" : ""}`}>
                      {competitor.features[key]}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">Why Choose GetMoreBacklinks?</h3>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-xl p-6 bg-white">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
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
                  className="text-orange-500"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2">7-Day Delivery</h4>
              <p className="text-gray-600">
                Get your backlinks faster with our 7-day delivery guarantee, while others take weeks or even months.
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-6 bg-white">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
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
                  className="text-orange-500"
                >
                  <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2">Best Value</h4>
              <p className="text-gray-600">
                At just $127 one-time, we're more affordable than monthly subscriptions and provide comprehensive
                backlink services.
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-6 bg-white">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
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
                  className="text-orange-500"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2">24/7 Support</h4>
              <p className="text-gray-600">
                Get instant replies and round-the-clock support whenever you need assistance with your backlink
                strategy.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <a
            href="#pricing"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white font-medium px-8 py-3 rounded-full relative overflow-hidden group transition-all duration-300 border border-orange-600"
            style={{ fontFamily: "Saira, sans-serif" }}
          >
            <span className="relative z-10">Get More Backlinks Today</span>
            <ExternalLink size={16} className="ml-2 relative z-10" />
          </a>
          <p className="mt-3 text-sm text-gray-500">Join 110+ satisfied customers boosting their SEO</p>
        </div>
      </div>
    </div>
  )
}
