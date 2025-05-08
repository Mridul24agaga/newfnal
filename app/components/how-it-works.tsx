"use client"

import { useState, useEffect } from "react"
import { CreditCard, Clock, TrendingUp, CheckCircle } from "lucide-react"

export default function HowItWorksSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Steps data
  const steps = [
    {
      icon: <CreditCard className="h-6 w-6 text-[#EB5C0E]" />,
      title: "Pay & Fill Form",
      description: "Choose your directories or let our experts pick the best 200.",
      details: [
        "Simple one-time payment",
        "Quick 5-minute form",
        "Expert directory selection",
        "Tailored to your industry",
      ],
    },
    {
      icon: <Clock className="h-6 w-6 text-[#EB5C0E]" />,
      title: "Wait 7 Working Days",
      description: "Receive a report with landing audits, blogs, directory listing data, and proof screenshots.",
      details: ["Comprehensive report", "Landing page audits", "Blog mentions", "Proof screenshots"],
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-[#EB5C0E]" />,
      title: "Enjoy & Scale",
      description: "Get traffic. Focus on building your product.",
      details: ["Increased organic traffic", "Better search rankings", "More backlinks", "Focus on your core business"],
    },
  ]

  return (
    <div className="py-16 px-4 md:px-6 lg:px-8 bg-white" style={{ fontFamily: "Saira, sans-serif" }}>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Saira:wght@300;400;500;600;700&display=swap");
      `}</style>

      <div id="howitworks" className="max-w-6xl mx-auto">
        {/* Heading and Description */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-[#EB5C0E]/10 text-[#EB5C0E] rounded-full px-4 py-1 text-sm font-medium mb-4">
            Simple Process
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900" style={{ fontFamily: "Saira, sans-serif" }}>
            How It Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg" style={{ fontFamily: "Saira, sans-serif" }}>
            Get more backlinks with our simple 3-step process
          </p>
        </div>

        {/* Steps - Desktop Version (md and up) */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Enhanced Progress Line with Gradient */}
            <div className="absolute top-24 left-0 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full bg-[#EB5C0E] transition-all duration-1000 ease-out`}
                style={{ width: isVisible ? "100%" : "0%" }}
              ></div>
            </div>

            {/* Steps */}
            <div className="flex justify-between">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`w-1/3 px-4 transition-all duration-500 ease-out ${
                    isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="flex flex-col items-center">
                    {/* Step Number with Pulsing Effect */}
                    <div className="relative z-10 mb-6">
                      <div className="w-16 h-16 rounded-full bg-white border-4 border-[#EB5C0E] flex items-center justify-center shadow-md">
                        <span className="text-2xl font-bold text-[#EB5C0E]">{index + 1}</span>
                      </div>
                      {isVisible && (
                        <div className="absolute inset-0 rounded-full border-4 border-[#EB5C0E]/40 animate-ping opacity-30"></div>
                      )}
                    </div>

                    {/* Content Card with Enhanced UI */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm w-full h-full">
                      {/* Icon and Title */}
                      <div className="flex items-center mb-4">
                        <div className="bg-[#EB5C0E]/10 rounded-full p-3 mr-3">{step.icon}</div>
                        <h3 className="text-xl font-bold">{step.title}</h3>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 mb-5">{step.description}</p>

                      {/* Details */}
                      <div className="space-y-2">
                        {step.details.map((detail, i) => (
                          <div key={i} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Steps - Mobile Version (sm and down) */}
        <div className="md:hidden">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`mb-8 transition-all duration-500 ease-out ${
                isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Step Card */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                {/* Step Header with Number */}
                <div className="bg-[#EB5C0E] px-6 py-3 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-4 shadow-sm">
                    <span className="text-xl font-bold text-[#EB5C0E]">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">{step.title}</h3>
                </div>

                {/* Step Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-5">{step.description}</p>

                  <div className="space-y-2">
                    {step.details.map((detail, i) => (
                      <div key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Connector Line (except for last item) */}
              {index < steps.length - 1 && (
                <div className="flex justify-center my-4">
                  <div className="w-1 h-12 bg-[#EB5C0E] rounded-full"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="#pricing"
            className="inline-flex items-center bg-[#EB5C0E] hover:bg-[#EB5C0E]/90 text-white font-medium px-8 py-3 rounded-full transition-all duration-300 border border-[#EB5C0E] shadow-sm"
          >
            <span>Get Started Today</span>
          </a>
          <p className="mt-3 text-sm text-gray-500">Start boosting your SEO in minutes</p>
        </div>
      </div>
    </div>
  )
}
