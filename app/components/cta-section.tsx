import Link from "next/link"

export default function CTASection() {
  return (
    <div className="w-full py-24 bg-white relative">
      {/* Grid Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-2">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-10">
              Perfect <span className="text-orange-500">backlinks</span>. Boost rankings.
              <span className="text-orange-500">  Start today</span>.
            </h2>
            <p className="text-lg text-gray-600 mt-30">
              Let our Smart AI help you build the best backlink profile for your website in a click.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <Link
              href="/#pricing"
              className="inline-flex items-center bg-orange-500 text-white rounded-lg px-8 py-3 font-semibold hover:bg-orange-600 transition-all text-lg"
            >
              Start Building Backlinks
            </Link>
          </div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/30 pointer-events-none"
        aria-hidden="true"
      />
    </div>
  )
}

