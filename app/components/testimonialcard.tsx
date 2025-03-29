"use client"

import { ExternalLink } from "lucide-react"

export default function TestimonialSection() {
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

  return (
    <div className="bg-white py-16 px-4 md:px-6 lg:px-8" style={{ fontFamily: "Saira, sans-serif" }}>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Saira:wght@300;400;500;600;700&display=swap");
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Heading and Description */}
        <div className="text-center mb-12">
          <h2
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
            style={{ fontFamily: "Saira, sans-serif" }}
          >
            What Our Users Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg" style={{ fontFamily: "Saira, sans-serif" }}>
            Join thousands of satisfied users who have transformed their SEO with GetMoreBacklinks
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col shadow-sm hover:shadow-md transition-all duration-300 relative"
            >
              {/* Twitter/X Icon */}
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
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              )}

              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
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
                {testimonial.content}
              </p>

              <div className="mt-2">
                <span className="text-sm text-gray-500" style={{ fontFamily: "Saira, sans-serif" }}>
                  {testimonial.date}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-12 text-center">
          <a
            href="#pricing"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white font-medium px-8 py-3 rounded-full relative overflow-hidden group shadow-md transition-all duration-300"
            style={{ fontFamily: "Saira, sans-serif" }}
          >
            <span className="relative z-10">Get More Backlinks Today</span>
            <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            <ExternalLink size={16} className="ml-2 relative z-10" />
          </a>
        </div>
      </div>
    </div>
  )
}

