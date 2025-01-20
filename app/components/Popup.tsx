import React, { useState, useEffect } from "react"
import { X } from "lucide-react"
import Link from 'next/link'

interface PopupProps {
  isOpen: boolean
  onClose: () => void
}

export function Popup({ isOpen, onClose }: PopupProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isVisible) return null

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-y-0" : "translate-y-full"
      }`}
      role="dialog"
      aria-labelledby="popup-title"
    >
      <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200 max-w-sm w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close popup"
        >
          <X size={20} />
        </button>
        <h2 id="popup-title" className="text-xl font-bold mb-3 text-gray-800">
          Enjoying LaunchPost?
        </h2>
        <p className="mb-4 text-gray-600">
          Explore our additional tools and backlink service to supercharge your launch!
        </p>
        <div className="flex justify-end">
          <Link
            href="/landing-page-analyze"
            className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Explore More
          </Link>
        </div>
      </div>
    </div>
  )
}

