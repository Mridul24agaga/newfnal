"use client"

import { Star } from "lucide-react"
import Image from "next/image"

// Helper function to format dates
function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString))
}

// Star rating component
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-5 h-5 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
        />
      ))}
    </div>
  )
}

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Constantin",
      role: "Founder",
      avatar: "/50.jpg",
      rating: 5,
      text: "Within 5 minutes, we managed to find more than 100 relevant websites to reach out to. Combine this with the automatic outreach and verified contacts, GetMoreBacklinks is essential for improving our brand's visibility.",
      date: "2024-09-28",
    },
    {
      id: 2,
      name: "Tom Leach",
      role: "Founder",
      avatar: "/49.jpg",
      rating: 5,
      text: "Link building is an SEO agency's most time-consuming task. With GetMoreBacklinks, we can set up a whole month's campaign in minutes and get highly relevant, authoritative links quickly.",
      date: "2024-09-28",
    },
    {
      id: 3,
      name: "Alessandro Morelli",
      role: "Project Manager",
      avatar: "/48.jpg",
      rating: 4,
      text: "Easily the best link building platform, saving me the most time so I can focus on the things I really enjoy!",
      date: "2024-09-29",
    },
    {
      id: 4,
      name: "Sarah Johnson",
      role: "Marketing Director",
      avatar: "/cok.jpeg",
      rating: 5,
      text: "GetMoreBacklinks has revolutionized our outreach strategy. We've seen remarkable improvements in our link-building efforts.",
      date: "2024-09-30",
    },
    {
      id: 5,
      name: "Michael Chen",
      role: "SEO Specialist",
      avatar: "/dm.jpeg",
      rating: 5,
      text: "An incredible tool that has streamlined our entire link-building process. The results from GetMoreBacklinks speak for themselves.",
      date: "2024-10-01",
    },
    {
      id: 6,
      name: "Emma Wilson",
      role: "Content Manager",
      avatar: "/aunty45.jpeg",
      rating: 4,
      text: "The automation features of GetMoreBacklinks have saved us countless hours. It's become an essential part of our toolkit.",
      date: "2024-10-02",
    },
    {
      id: 7,
      name: "David Martinez",
      role: "Digital Strategist",
      avatar: "/cowoker.jpeg",
      rating: 5,
      text: "The quality of leads we get through GetMoreBacklinks is consistently high. It's transformed our outreach approach.",
      date: "2024-10-03",
    },
    {
      id: 8,
      name: "Lisa Thompson",
      role: "Agency Owner",
      avatar: "/placeholder.svg?height=64&width=64",
      rating: 5,
      text: "We've been able to scale our link-building efforts significantly since adopting GetMoreBacklinks.",
      date: "2024-10-04",
    },
    {
      id: 9,
      name: "James Wilson",
      role: "Growth Manager",
      avatar: "/placeholder.svg?height=64&width=64",
      rating: 4,
      text: "The ROI we've seen from using GetMoreBacklinks has been exceptional. Highly recommended for serious SEO professionals.",
      date: "2024-10-05",
    },
    {
      id: 10,
      name: "Anna Schmidt",
      role: "Digital Marketing Lead",
      avatar: "/placeholder.svg?height=64&width=64",
      rating: 5,
      text: "The interface is intuitive and the results are impressive. GetMoreBacklinks has become our go-to solution for link building.",
      date: "2024-10-06",
    },
    {
      id: 11,
      name: "Robert Taylor",
      role: "SEO Consultant",
      avatar: "/placeholder.svg?height=64&width=64",
      rating: 5,
      text: "I've recommended GetMoreBacklinks to all my clients. The results have been consistently impressive.",
      date: "2024-10-07",
    },
    {
      id: 12,
      name: "Sophie Anderson",
      role: "Marketing Manager",
      avatar: "/placeholder.svg?height=64&width=64",
      rating: 4,
      text: "The automated outreach features of GetMoreBacklinks have revolutionized how we approach link building.",
      date: "2024-10-08",
    },
    {
      id: 13,
      name: "Daniel Lee",
      role: "Agency Director",
      avatar: "/placeholder.svg?height=64&width=64",
      rating: 5,
      text: "GetMoreBacklinks has become indispensable for our agency's link-building efforts.",
      date: "2024-10-09",
    },
    {
      id: 14,
      name: "Rachel Green",
      role: "Content Strategist",
      avatar: "/placeholder.svg?height=64&width=64",
      rating: 5,
      text: "The efficiency gains we've achieved with GetMoreBacklinks have been remarkable.",
      date: "2024-10-10",
    },
    {
      id: 15,
      name: "Chris Morgan",
      role: "Digital Director",
      avatar: "/placeholder.svg?height=64&width=64",
      rating: 4,
      text: "GetMoreBacklinks is a game-changer for our outreach campaigns. The results have exceeded our expectations.",
      date: "2024-10-11",
    },
    {
      id: 16,
      name: "Patricia Wong",
      role: "SEO Manager",
      avatar: "/placeholder.svg?height=64&width=64",
      rating: 5,
      text: "GetMoreBacklinks' ability to find relevant contacts has significantly improved our success rate.",
      date: "2024-10-12",
    },
    {
      id: 17,
      name: "Mark Stevens",
      role: "Growth Specialist",
      avatar: "/placeholder.svg?height=64&width=64",
      rating: 5,
      text: "We've seen a dramatic improvement in our link-building success rate since using GetMoreBacklinks.",
      date: "2024-10-13",
    },
    {
      id: 18,
      name: "Laura Martinez",
      role: "Digital Marketing Manager",
      avatar: "/placeholder.svg?height=64&width=64",
      rating: 4,
      text: "GetMoreBacklinks has streamlined our entire outreach process. Highly recommended.",
      date: "2024-10-14",
    },
    {
      id: 19,
      name: "Kevin Brown",
      role: "SEO Director",
      avatar: "/placeholder.svg?height=64&width=64",
      rating: 5,
      text: "GetMoreBacklinks is an essential tool for modern SEO campaigns. The results speak for themselves.",
      date: "2024-10-15",
    },
    {
      id: 20,
      name: "Emily Clark",
      role: "Marketing Specialist",
      avatar: "/placeholder.svg?height=64&width=64",
      rating: 5,
      text: "The quality of leads and the efficiency of GetMoreBacklinks have transformed our link-building strategy.",
      date: "2024-10-16",
    },
  ]

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  {testimonial.avatar.includes(".svg") ? (
                    <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-xl font-semibold text-white">
                      {testimonial.name.charAt(0)}
                    </div>
                  ) : (
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={`${testimonial.name}'s avatar`}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <StarRating rating={testimonial.rating} />
                <p className="text-gray-700 text-sm leading-relaxed">{testimonial.text}</p>
                <p className="text-gray-500 text-sm">{formatDate(testimonial.date)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

