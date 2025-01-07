import { AnalyzerForm } from './analyzer-form'
import Link from 'next/link'
import Image from 'next/image'
import { MobileNav } from './mobile-nav'
import Footer from '../components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-mint-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 transition-all duration-300 bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Image
              src="/getmorepacklinks.png"
              alt="Logo"
              width={180}
              height={40}
              className="h-8 w-auto"
            />
            <div className="hidden md:flex items-center justify-center gap-4 sm:gap-8">
              <Link href="/blogs" className="text-[15px] text-black transition-colors">
                Blogs
              </Link>
              <Link href="/submit" className="text-[15px] text-black transition-colors">
                Submit my Directory
              </Link>
              <Link
                href="/#pricing-section"
                className="px-6 py-2.5 bg-[#F97316] text-white text-[15px] rounded-full hover:bg-[#EA580C] transition-colors"
              >
                Submit my Product
              </Link>
            </div>
            <MobileNav />
          </div>
        </div>
      </nav>

      <div className="container mx-auto min-h-[calc(10vh-73px)] flex items-center justify-center px-4">
        <div className="w-full">
          <AnalyzerForm />
          <Footer/>
        </div>
      </div>
    </main>
  )
}

