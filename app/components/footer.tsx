'use client'

import { Twitter, Linkedin, Send } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const [isClient, setIsClient] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const scrollTo = (id: string) => {
    if (pathname === '/') {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      } else {
        console.warn(`Element with id "${id}" not found`)
      }
    }
  }

  return (
    <footer className="bg-white text-gray-600 pt-16 pb-0 px-4 sm:px-6 lg:px-8 relative">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gray-200"></div>
      
      {/* Orange to white gradient at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-orange-50 to-white" style={{ bottom: '-32px' }}></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Logo and Description Section */}
          <div className="lg:col-span-4">
            <div className="space-y-8">
              {/* Logo */}
              <div className="h-10 w-auto">
                <Image
                  src="/getmorepacklinks.png"
                  alt="Company Logo"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </div>
              
              <p className="text-gray-600 leading-relaxed">
                Get instant traffic on your site, save days of manual work with just one click. Submit Your AI Startup To 100+ Plaƞorms In 7 Days
              </p>

              <div className="flex space-x-4">
                <Link href="https://x.com/KrissmannGupta" className="text-gray-600 hover:text-gray-900 transition-colors">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="https://www.linkedin.com/in/krissmann/" className="text-gray-600 hover:text-gray-900 transition-colors">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation Sections */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {/* Product Section */}
              <div>
                <h3 className="text-gray-900 font-semibold mb-4">Product</h3>
                <ul className="space-y-3">
                  {isClient ? (
                    <>
                      <li>
                        {pathname === '/' ? (
                          <button onClick={() => scrollTo('free')} className="hover:text-gray-900 transition-colors">Features</button>
                        ) : (
                          <Link href="/#free" className="hover:text-gray-900 transition-colors">Features</Link>
                        )}
                      </li>
                      <li>
                        {pathname === '/' ? (
                          <button onClick={() => scrollTo('pricing')} className="hover:text-gray-900 transition-colors">Pricing</button>
                        ) : (
                          <Link href="/#pricing" className="hover:text-gray-900 transition-colors">Pricing</Link>
                        )}
                      </li>
                      
                      <li>
                        {pathname === '/' ? (
                          <button onClick={() => scrollTo('faq')} className="hover:text-gray-900 transition-colors">FAQ</button>
                        ) : (
                          <Link href="/#faq" className="hover:text-gray-900 transition-colors">FAQ</Link>
                        )}
                      </li>
                    </>
                  ) : (
                    <>
                      <li><Link href="/#features" className="hover:text-gray-900 transition-colors">Features</Link></li>
                      <li><Link href="/#pricing-section" className="hover:text-gray-900 transition-colors">Pricing</Link></li>
                      <li><Link href="/#howitworks" className="hover:text-gray-900 transition-colors">How it Works</Link></li>
                      <li><Link href="/#faq" className="hover:text-gray-900 transition-colors">FAQ</Link></li>
                    </>
                  )}
                </ul>
              </div>

              {/* Tools Section */}
              <div>
                <h3 className="text-gray-900 font-semibold mb-4">Tools</h3>
                <ul className="space-y-3">
                <li><Link href="/landing-page-analyze" className="hover:text-gray-900 transition-colors">Landing Page Analyzer</Link></li>
                  <li><Link href="/seo-audit-website" className="hover:text-gray-900 transition-colors">SEO Audit</Link></li>
                  <li><Link href="/open-graph-validator" className="hover:text-gray-900 transition-colors">Open Graph Validator</Link></li>
                  <li><Link href="/meta-description-generator" className="hover:text-gray-900 transition-colors">Meta Description Generator</Link></li>
                  <li><Link href="/ai-content-checker" className="hover:text-gray-900 transition-colors">AI Content Checker</Link></li>
                  <li><Link href="/paragraph-writer" className="hover:text-gray-900 transition-colors">Paragraph Rewriter</Link></li>
                  <li><Link href="/backlink-checker" className="hover:text-gray-900 transition-colors">Backlink Checker</Link></li>
                  <li><Link href="/keyword-rank-tracker" className="hover:text-gray-900 transition-colors">Keyword Rank Tracker</Link></li>
                </ul>
              </div>

              {/* Company Section */}
              <div>
                <h3 className="text-gray-900 font-semibold mb-4">Company</h3>
                <ul className="space-y-3">
                  <li><Link href="/privacy-policy" className="hover:text-gray-900 transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-gray-900 transition-colors">Terms of Service</Link></li>
                </ul>
                {/* Contact Email Addresses */}
                <div className="mt-6">
                  <h4 className="text-gray-900 font-semibold mb-2">Contact Us</h4>
                  <ul className="space-y-2">
                    <li><a href="mailto:hi@mridulthareja.com" className="hover:text-gray-900 transition-colors">hi@mridulthareja.com</a></li>
                    <li><a href="mailto:founder@markupxbrands.com" className="hover:text-gray-900 transition-colors">founder@markupxbrands.com</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="text-sm text-gray-500">
            © 2025 Get More Backlinks. All rights reserved. Licensed under MarkupX Technologies.
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
            <span className="text-red-600">Facing Issue in Signup</span>
          </div>
        </div>
      </div>ye s
    </footer>
  )
}

