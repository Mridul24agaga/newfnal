import Link from "next/link"
import { Saira } from "next/font/google"

// Initialize the Saira font
const saira = Saira({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-saira",
})

export default function CTASection() {
  return (
    <div className={`w-full py-24 bg-white relative ${saira.className}`}>
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
              Submit your <span className="text-orange-500">product now</span>. Get listed on
              <span className="text-orange-500"> 200+ directories</span> today.
            </h2>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <Link
              href="/#pricing"
              className="inline-flex items-center bg-orange-500 text-white rounded-lg px-8 py-3 font-semibold hover:bg-orange-600 transition-all text-lg"
            >
              Get Started
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
