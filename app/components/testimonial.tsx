"use client"

import Image from "next/image"
import { Star } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import ListingSection from "./listing"

const testimonials = [
  {
    id: 1,
    name: "Uniscribe",
    company: "AI Transcription Company",
    image: "/uniscribe.jpg",
    rating: 5,
    text: "GetMoreBacklinks made the backlink generation process so easy and effective!  My Domain Rating has already increased to 17. Outstanding service! ",
  },
  {
    id: 2,
    name: "ShortsNinja",
    company: "AI Faceless Video Generation",
    image: "/shortsninja.jpg",
    rating: 5,
    text: "With GetMoreBacklinks, building high-quality backlinks has never been easier!  Their seamless process helped boost my Domain Rating to 7.",
  },
]

export default function TestimonialsSection() {
  const [isScreenshotAttempted, setIsScreenshotAttempted] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === "3" || e.key === "4" || e.key === "5")) {
        setIsScreenshotAttempted(true)
        setTimeout(() => setIsScreenshotAttempted(false), 500)
      }
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsScreenshotAttempted(true)
        setTimeout(() => setIsScreenshotAttempted(false), 500)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [])

  return (
    <section
      className="py-16 bg-white relative"
      onContextMenu={(e) => e.preventDefault()}
      style={{ userSelect: "none", WebkitUserSelect: "none", MozUserSelect: "none", msUserSelect: "none" }}
    >
      {isScreenshotAttempted && <div className="fixed inset-0 bg-black z-50" />}
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Real Results, Real Testimonials</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about their experience with
            GetMoreBacklinks.org. These success stories showcase the tangible impact our service has had on businesses
            just like yours.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-900 p-8 rounded-lg shadow-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F97316] to-yellow-500"></div>
              <div className="flex flex-col h-full">
                <div className="flex items-center space-x-4 mb-6">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={`${testimonial.name}'s profile picture`}
                    width={64}
                    height={64}
                    className="rounded-full border-2 border-[#F97316]"
                    unoptimized
                  />
                  <div>
                    <p className="font-semibold text-white text-lg">{testimonial.name}</p>
                    <p className="text-gray-400">{testimonial.company}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#F97316] text-[#F97316]" />
                  ))}
                </div>
                <blockquote className="text-white text-lg mb-6 flex-grow">"{testimonial.text}"</blockquote>
              </div>
            </div>
          ))}
        </div>
        <ListingSection/>
        <div className="mt-2 text-center">
          
          <Link
            href="/#pricing"
            className="inline-block bg-[#F97316] hover:bg-[#EA580C] text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
          >
            Get Started Now
          </Link>
         
        </div>
      </div>
    </section>
  )
}

