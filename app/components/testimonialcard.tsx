"use client"

import React, { useState, useRef, useEffect } from "react"
import {
  ExternalLink,
  TrendingUp,
  Award,
  Users,
  ChevronRight,
  ChevronLeft,
  X,
  AlertTriangle,
  Search,
  Target,
  Diamond,
  CheckCircle,
  Send,
} from "lucide-react"

export default function TestimonialSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [showPopup, setShowPopup] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

  // Check scroll position
  const checkScrollPosition = () => {
    if (!scrollContainerRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10) // 10px buffer
  }

  // Scroll handlers
  const scrollLeft = () => {
    if (!scrollContainerRef.current) return
    scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
  }

  const scrollRight = () => {
    if (!scrollContainerRef.current) return
    scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
  }

  // Initialize and update scroll position check
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      checkScrollPosition()
      scrollContainer.addEventListener("scroll", checkScrollPosition)
      window.addEventListener("resize", checkScrollPosition)

      return () => {
        scrollContainer.removeEventListener("scroll", checkScrollPosition)
        window.removeEventListener("resize", checkScrollPosition)
      }
    }
  }, [])

  // Show popup after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true)
    }, 5000) // Show after 5 seconds

    return () => clearTimeout(timer)
  }, [])

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes("@")) {
      setSubmitError("Please enter a valid email address")
      return
    }

    setIsSubmitting(true)
    setSubmitError("")

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          notifyEmail: "founder@markupxbrands.com",
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong")
      }

      setSubmitSuccess(true)
      setEmail("")
    } catch (error) {
      console.error("Subscription error:", error)
      setSubmitError(error instanceof Error ? error.message : "Failed to subscribe. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const testimonials = [
    {
      name: "Amit Verma",
      position: "",
      avatar: "/amit.jpg",
      content: "Thanks bro, just visited getmorebacklinks, really impressive. Would love to connect with you:)",
      date: "Mar 22, 2025",
      hasTwitter: true,
      twitterUrl: "https://x.com/whocares0412/status/1888814676450197649",
    },
    {
      name: "RTR",
      position: "",
      avatar: "/raghu.jpg",
      content: "Checkout getmorebacklinks.org By @KrissmannGupta and @Innvisionagency",
      date: "Mar 19, 2025",
      hasTwitter: true,
      twitterUrl: "https://x.com/raghu_rtr/status/1876320392106979477",
    },
    {
      name: "Arthur",
      position: "",
      avatar: "/arthur.jpg",
      content:
        "Just bought getmorebacklinks.org from @KrissmannGupta for my BuildFast! Excited to level up SEO game. 🚀",
      date: "Mar 18, 2025",
      hasTwitter: true,
      twitterUrl: "https://x.com/arthuryuzbashew/status/1876330172879647156",
    },
    {
      name: "Dom",
      position: "@DG_9_6",
      avatar: "/dom.jpg",
      content:
        "Backlink Automation. We submitted our product to hundreds of directories — automatically. Tools like Getmorebacklinks[dot]org helped us build backlinks at scale.",
      date: "Mar 16, 2025",
      hasTwitter: true,
      twitterUrl: "https://x.com/DG_9_6/status/1902723043488649601",
    },
    {
      name: "Kaivan Parekh",
      position: "@KaivanParekh2",
      avatar: "/kavin.jpg",
      content:
        "http://Getmorebacklinks.org Don't click if you're not looking into increasing website traffic and optimising SEO for your website. The compounding SEO effect kicked in fast.",
      date: "Mar 15, 2025",
      hasTwitter: true,
      twitterUrl: "https://x.com/KaivanParekh2/status/1881350868400046292",
    },
    {
      name: "Andrew",
      position: "",
      avatar: "/andrew.jpg",
      content: "I would hanestly considered your service if I found it earlier. But already bought one 🤷‍♂️",
      date: "Mar 12, 2025",
      hasTwitter: true,
      twitterUrl: "https://x.com/andriixzvf/status/1903901641251942698",
    },
    {
      name: "Stuart, saasyDB",
      position: "@WhoWorksThere",
      avatar: "/stuart.png",
      content:
        "This crazy jump in domain rating is from actively building links for saasyDB. it's wild. I want to do this more and more. And I didn't even do the labor, I hired @KrissmannGupta and his team did most of it",
      date: "Mar 10, 2025",
      hasTwitter: true,
      twitterUrl: "https://x.com/WhoWorksThere/status/1892672579141308794",
    },
    {
      name: "Lewis ⚡ oss/acc",
      position: "@illyism",
      avatar: "/lewis.jpg",
      content: "lmao check out this out getmorebacklinks.org from @KrissmannGupta @Innvisionagency",
      date: "Mar 24, 2025",
      hasTwitter: true,
      twitterUrl: "https://x.com/lewisbuildsai/status/1891187147597619242",
    },
    {
      name: "Russ Shimon",
      position: "",
      avatar: "/russ.jpg",
      content: "Hired @KrissmannGupta to help me figure it out!",
      date: "Mar 8, 2025",
      hasTwitter: true,
      twitterUrl: "https://x.com/pureshimon/status/1871376482116964685",
    },
  ]

  const results = [
    {
      title: "Average DR Increase",
      value: "+15",
      unit: "Points",
      icon: <TrendingUp className="h-5 w-5 text-orange-500" />,
    },
    {
      title: "Backlinks Generated",
      value: "10,000+",
      unit: "",
      icon: <Award className="h-5 w-5 text-orange-500" />,
    },
    {
      title: "Happy Customers",
      value: "70+",
      unit: "Founders",
      icon: <Users className="h-5 w-5 text-orange-500" />,
    },
  ]

  const caseStudies = [
    {
      name: "SaasyDB",
      industry: "SaaS",
      image: "/placeholder.svg?key=saasydb-chart",
      quote: "This crazy jump in domain rating is from actively building links for saasyDB. It's wild!",
      beforeDR: 12,
      afterDR: 32,
      author: "Stuart, saasyDB",
    },
    {
      name: "Blogosocial",
      industry: "Dev Tools",
      image: "/placeholder.svg?key=buildfast-chart",
      quote: "Excited to level up SEO game with GetMoreBacklinks. Already seeing significant improvements!",
      beforeDR: 1,
      afterDR: 9,
      author: "MarkupX ",
    },
    {
      name: "Softgen",
      industry: "B2B",
      image: "/placeholder.svg?key=techflow-chart",
      quote: "The compounding SEO effect kicked in fast. Our traffic doubled in just 2 months.",
      beforeDR: 15,
      afterDR: 27,
      author: "Softgen",
    },
  ]

  const EmailPopup = () => {
    if (!showPopup) return null

    // Memoized email input to prevent unnecessary re-renders
    const EmailInput = React.memo(() => (
      <div className="relative mb-4">
        <label htmlFor="email-input" className="sr-only">
          Email address
        </label>
        <input
          id="email-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className="w-full border border-gray-300 rounded-full py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          required
          autoFocus // Ensure input is focused when popup appears
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z" />
          </svg>
        </div>
      </div>
    ))

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-xl max-w-md w-full relative overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setShowPopup(false)}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 z-10"
            aria-label="Close popup"
          >
            <X size={20} />
          </button>

          {submitSuccess ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Thank you for subscribing!</h3>
              <p className="text-gray-600 mb-6">Your directory list is on its way to your inbox.</p>
              <button
                onClick={() => setShowPopup(false)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-full"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <div className="p-6 pb-0 flex flex-col sm:flex-row items-start">
                <div className="text-red-500 mr-3 mb-3 sm:mb-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold">Wait! Before you go...</h2>
                  <p className="text-gray-600 mt-2">Get our</p>
                  <p className="text-blue-500 font-medium">
                    exclusive list of 100 startup directories and Hackers Guide on Getting your Startup Noticed
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    The Ultimate Guide packed with secrets you need to steal traffic from your competitors
                  </p>
                </div>
              </div>

              <div className="p-6">
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="flex items-start mb-3">
                    <AlertTriangle className="text-amber-500 mr-2 mt-0.5 flex-shrink-0" size={18} />
                    <p className="font-medium">What does Hackers Guide includes:</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-1.5 rounded-full mr-3 flex-shrink-0 mt-0.5">
                        <Search className="h-4 w-4 text-blue-600" />
                      </div>
                      <p className="text-sm">100 High-authority startup directories</p>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-red-100 p-1.5 rounded-full mr-3 flex-shrink-0 mt-0.5">
                        <Target className="h-4 w-4 text-red-600" />
                      </div>
                      <p className="text-sm">The MVP way of stealing traffic from your competitors</p>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-blue-100 p-1.5 rounded-full mr-3 flex-shrink-0 mt-0.5">
                        <Diamond className="h-4 w-4 text-blue-600" />
                      </div>
                      <p className="text-sm">Hidden gems that only Indie Hackers know about</p>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-green-100 p-1.5 rounded-full mr-3 flex-shrink-0 mt-0.5">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <p className="text-sm">Building Backlinks in weeks what takes a year usually</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  {submitError && <p className="text-red-500 text-sm mb-3">{submitError}</p>}

                  <div className="flex items-center text-xs text-gray-500 mb-4">
                    <span className="mr-2">🔒</span>
                    We respect your privacy and will never share your email.
                  </div>

                  <EmailInput />

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={() => setShowPopup(false)}
                      className="py-2.5 px-4 border border-gray-300 rounded-full text-gray-700 font-medium flex items-center justify-center hover:bg-gray-50"
                    >
                      <X size={16} className="mr-2" />
                      No thanks
                    </button>

                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="bg-orange-500 text-white py-2.5 px-4 rounded-full font-medium flex items-center justify-center hover:bg-orange-600 disabled:opacity-70"
                    >
                      <Send size={16} className="mr-2" />
                      {isSubmitting ? "Sending..." : "Send me the directory list"}
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="py-16 px-4 md:px-6 lg:px-8" style={{ fontFamily: "Saira, sans-serif" }}>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Saira:wght@300;400;500;600;700&display=swap");

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-orange-100 text-orange-800 rounded-full px-4 py-1 text-sm font-medium mb-4">
            Used by 110+ Founders, Solopreneurs, Builders
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900" style={{ fontFamily: "Saira, sans-serif" }}>
            Boost SEO score and Domain Rating
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg" style={{ fontFamily: "Saira, sans-serif" }}>
            Real results from real customers who have transformed their SEO with GetMoreBacklinks
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {testimonials.slice(0, 6).map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col transition-all duration-300 relative"
                >
                  {testimonial.hasTwitter && (
                    <a
                      href={testimonial.twitterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-5 right-5 text-gray-600 hover:text-blue-500 transition-colors"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/200encias/svg"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  )}

                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-orange-200">
                      <img
                        src={testimonial.avatar || "/placeholder.svg?height=48&width=48&query=person"}
                        alt={`${testimonial.name}'s avatar`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800" style={{ fontFamily: "Saira, sans-serif" }}>
                        {testimonial.name}
                      </h3>
                      {testimonial.position && (
                        <p className="text-sm text-gray-600" style={{ fontFamily: "Saira, sans-serif" }}>
                          {testimonial.position}
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 flex-grow" style={{ fontFamily: "Saira, sans-serif" }}>
                    "{testimonial.content}"
                  </p>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm text-gray-500" style={{ fontFamily: "Saira, sans-serif" }}>
                      {testimonial.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="sticky top-8 space-y-6">
              <div className="border border-gray-200 rounded-xl p-6 bg-white">
                <h3 className="text-xl font-bold mb-6 text-gray-800">Real Results</h3>

                <div className="space-y-6">
                  {results.map((result, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-orange-100 p-3 rounded-full mr-4">{result.icon}</div>
                      <div>
                        <p className="text-sm text-gray-500">{result.title}</p>
                        <p className="text-2xl font-bold text-gray-800">
                          {result.value} <span className="text-sm font-normal">{result.unit}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl p-6 bg-white">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Case Studies</h3>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={scrollLeft}
                      disabled={!canScrollLeft}
                      className={`p-1.5 rounded-full border border-gray-200 ${
                        canScrollLeft ? "text-gray-700 hover:bg-gray-100" : "text-gray-300 cursor-not-allowed"
                      }`}
                      aria-label="Scroll left"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={scrollRight}
                      disabled={!canScrollRight}
                      className={`p-1.5 rounded-full border border-gray-200 ${
                        canScrollRight ? "text-gray-700 hover:bg-gray-100" : "text-gray-300 cursor-not-allowed"
                      }`}
                      aria-label="Scroll right"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                <div
                  ref={scrollContainerRef}
                  className="overflow-x-auto pb-4 -mx-1 px-1 scrollbar-hide"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  <div className="flex space-x-4" style={{ minWidth: "max-content" }}>
                    {caseStudies.map((study, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-4 min-w-[260px] max-w-[260px] flex flex-col"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-800">{study.name}</h4>
                          <div className="text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded">
                            {study.industry}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-3 text-sm">
                          <div>
                            <p className="text-xs text-gray-500">Before</p>
                            <p className="font-bold">DR {study.beforeDR}</p>
                          </div>
                          <TrendingUp className="text-orange-500 mx-1" size={16} />
                          <div>
                            <p className="text-xs text-gray-500">After</p>
                            <p className="font-bold text-orange-600">DR {study.afterDR}</p>
                          </div>
                          <div className="bg-green-100 text-green-800 px-1.5 py-0.5 rounded text-xs font-medium">
                            +{study.afterDR - study.beforeDR}
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-2 flex-grow">"{study.quote}"</p>
                        <p className="text-xs text-gray-500">— {study.author}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <a
                    href="/case-study"
                    className="inline-flex items-center text-orange-500 font-medium text-sm hover:text-orange-600 transition-colors"
                  >
                    See more case studies
                    <ChevronRight size={14} className="ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center border-t border-gray-200 pt-12">
          <a
            href="#pricing"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-[#FB8C33] hover:bg-orange-600 text-white font-medium px-8 py-3 rounded-full relative overflow-hidden group transition-all duration-300 border border-orange-600"
            style={{ fontFamily: "Saira, sans-serif" }}
          >
            <span className="relative z-10">Get More Backlinks Today</span>
            <ExternalLink size={16} className="ml-2 relative z-10" />
          </a>
          <p className="mt-3 text-sm text-gray-500">Join 110+ satisfied customers boosting their SEO</p>
        </div>

        <EmailPopup />
      </div>
    </div>
  )
}
