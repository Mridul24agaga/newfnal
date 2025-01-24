import Image from "next/image"
import Link from 'next/link'

export default function CTASection() {
  return (
    <div className="w-full py-12">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="bg-gray-50 rounded-[20px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="flex flex-col space-y-4 max-w-[600px]">
            <h2 className="text-3xl md:text-4xl font-bold text-orange-500">Get started with GetMoreBacklinks</h2>
            <p className="text-gray-600 text-lg">
              Join thousands of SEO professionals using GetMoreBacklinks to build high-quality backlinks and boost their
              rankings.
            </p>
            <div>
              <Link href="/#pricing" className="bg-orange-500 text-white rounded-lg px-6 py-3 font-semibold hover:bg-orange-600 transition-colors">
                Start Building Backlinks
              </Link>
              <p className="text-gray-500 text-sm mt-4">
                Get started today and increase your backlinks and organic traffic
              </p>
            </div>
          </div>
          <div className="relative w-full md:w-[450px] h-[300px]">
            <Image
              src="/manclimbing.png"
              alt="SEO Analytics Illustration"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 100vw, 450px"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

