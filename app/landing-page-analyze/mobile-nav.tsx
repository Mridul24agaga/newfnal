'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export function MobileNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <>
      <button className="md:hidden" onClick={toggleMenu}>
        {isMenuOpen ? (
          <X className="h-6 w-6 text-gray-900" />
        ) : (
          <Menu className="h-6 w-6 text-gray-900" />
        )}
      </button>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 md:hidden bg-white py-2 shadow-lg">
          <div className="container mx-auto px-4 flex flex-col gap-2">
            <Link 
              href="/blogs" 
              className="text-[15px] text-black transition-colors py-2"
              onClick={toggleMenu}
            >
              Blogs
            </Link>
            <Link 
              href="/submit" 
              className="text-[15px] text-black transition-colors py-2"
              onClick={toggleMenu}
            >
              Submit my Directory
            </Link>
            <Link
              href="/#pricing-section"
              className="px-6 py-2.5 bg-[#F97316] text-white text-[15px] rounded-full hover:bg-[#EA580C] transition-colors text-center"
              onClick={toggleMenu}
            >
              Submit my Product
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

