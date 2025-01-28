export default function TestimonialsSection() {
  const testimonials = [
    {
      text: '"the perfect tool for startups like ours. Affordable, fast, and it actually improved our search rankings."',
      author: "Stuart",
      role: "Founder",
      avatar: "/50.jpg",
    },
    {
      text: '"i love how seamless the process is. Enter your details once, and the platform does the heavy lifting"',
      author: "Frank D.",
      role: "Entrepreneur",
      avatar: "/49.jpg",
      isLarge: true,
    },
    {
      text: '"its incredibly easy to use, even for non-tech-savvy people."',
      author: "Fabian.",
      role: "Founder",
      avatar: "/48.jpg",
    },
    {
      text: '"We saw a noticeable uptick in our website traffic within two weeks of using the service"',
      author: "Ashar J.",
      role: "Founder",
      avatar: "/dm.jpeg",
    },
    {
      text: '"This is the best B2B Tool!"',
      author: "Wesam",
      role: "SAAS Owner",
      avatar: "/cok.jpeg",
    },
    {
      text: '"This is sooo good."',
      author: "Baback",
      role: "Founder",
      avatar: "/cj.jpeg",
    },
    {
      text: '"The value for money is unmatched. For anyone serious about backlinks, this is a must-have tool"',
      author: "Julie J.",
      role: "Entrepreneur",
      avatar: "/aunty45.jpeg",
    },
    {
      text: '""Finally, a directory submission tool that actually delivers results! The AI makes the process effortless."',
      author: "Dean F.",
      role: "Entrepreneur",
      avatar: "/cowoker.jpeg",
    },
    {
      text: '"GetMoreBacklinks is a lifesaver! It’s like having a whole team working for you, but at a fraction of the cost"',
      author: "Thomas",
      role: "SAAS Owner",
      avatar: "/kag.jpg",
    },
  ]

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-orange-500 font-medium mb-4 block">Testimonials</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black max-w-4xl mx-auto leading-[1.1]">
            We have inspired thousands of
            <br />
            amazing people
          </h2>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* First row */}
          <div className="col-span-12 md:col-span-3">
            <TestimonialCard {...testimonials[0]} />
          </div>
          <div className="col-span-12 md:col-span-6">
            <TestimonialCard {...testimonials[1]} />
          </div>
          <div className="col-span-12 md:col-span-3">
            <TestimonialCard {...testimonials[2]} />
          </div>

          {/* Second row */}
          <div className="col-span-12 md:col-span-4">
            <TestimonialCard {...testimonials[3]} />
          </div>
          <div className="col-span-12 md:col-span-4">
            <TestimonialCard {...testimonials[4]} />
          </div>
          <div className="col-span-12 md:col-span-4">
            <TestimonialCard {...testimonials[5]} />
          </div>

          {/* Third row */}
          <div className="col-span-12 md:col-span-4">
            <TestimonialCard {...testimonials[6]} />
          </div>
          <div className="col-span-12 md:col-span-4">
            <TestimonialCard {...testimonials[7]} />
          </div>
          <div className="col-span-12 md:col-span-4">
            <TestimonialCard {...testimonials[8]} />
          </div>
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({
  text,
  author,
  role,
  avatar,
}: {
  text: string
  author: string
  role: string
  avatar: string
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 h-full relative transition-all hover:border-orange-500">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/5 to-orange-500/10 opacity-0 hover:opacity-100 transition-opacity" />
      <div className="space-y-4">
        <p className="text-gray-900">{text}</p>
        <div className="flex items-center gap-3">
          <img src={avatar || "/placeholder.svg"} alt={author} className="w-10 h-10 rounded-full" />
          <div>
            <div className="font-medium text-gray-900">{author}</div>
            <div className="text-sm text-gray-600">{role}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

