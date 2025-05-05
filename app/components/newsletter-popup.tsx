"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Heart, Search, Target, Gem, CheckSquare, X, Mail, Shield } from "lucide-react"

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  useEffect(() => {
    // Check if the user has already seen the popup
    const hasSeenPopup = localStorage.getItem("hasSeenPopup")

    if (!hasSeenPopup) {
      // Show popup after a short delay
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    // Set flag in localStorage to prevent showing again in this session
    localStorage.setItem("hasSeenPopup", "true")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setHasSubmitted(true)
      localStorage.setItem("hasSubscribed", "true")

      // Close popup after showing success message
      setTimeout(() => {
        setIsOpen(false)
      }, 2000)
    }, 1000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full relative animate-fade-in-up">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="p-6">
          {/* Header */}
          <div className="flex items-center mb-4">
            <Heart className="text-red-500 mr-2" size={24} />
            <h2 className="text-xl font-bold text-gray-800">Wait! Before you go...</h2>
          </div>

          <div className="flex">
            <div className="flex-1">
              <p className="text-gray-700 mb-2">Get our</p>
              <p className="text-blue-600 font-medium mb-1">
                exclusive list of 170+ startup directories and Hackers Guide on Getting your Startup Noticed
              </p>
              <p className="text-gray-700 text-sm mb-4">
                The Ultimate Guide packed with secrets you need to steal traffic from your competitors
              </p>
            </div>
            <div className="ml-4 flex-shrink-0">
              <div className="bg-blue-100 rounded-lg p-3">
                <Mail className="text-blue-500" size={32} />
              </div>
            </div>
          </div>

          {/* What's included section */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="font-medium text-gray-800 mb-3 flex items-center">
              <span className="text-amber-500 mr-2">⚠️</span>
              What does Hackers Guide includes:
            </p>

            <div className="space-y-3">
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-1 mr-2">
                  <Search className="text-blue-600" size={16} />
                </div>
                <p className="text-gray-700 text-sm">170+ High-authority startup directories</p>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-1 mr-2">
                  <Target className="text-red-500" size={16} />
                </div>
                <p className="text-gray-700 text-sm">The MVP way of stealing traffic from your competitors</p>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-1 mr-2">
                  <Gem className="text-cyan-500" size={16} />
                </div>
                <p className="text-gray-700 text-sm">Hidden gems that only Indie Hackers know about</p>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-1 mr-2">
                  <CheckSquare className="text-green-500" size={16} />
                </div>
                <p className="text-gray-700 text-sm">Building Backlinks in weeks what takes a year usually</p>
              </div>
            </div>
          </div>

          {/* Form */}
          {!hasSubmitted ? (
            <form onSubmit={handleSubmit}>
              <div className="relative mb-4">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center justify-center text-sm text-gray-500 mb-4">
                <Shield className="mr-1" size={14} />
                <p>We respect your privacy and will never share your email.</p>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
                >
                  No thanks
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2 px-4 bg-blue-600 rounded-lg text-white font-medium hover:bg-blue-700 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  ) : (
                    <Mail className="mr-2" size={18} />
                  )}
                  Send me the directory list
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <CheckSquare className="text-green-500" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Thank you!</h3>
              <p className="text-gray-600">Check your inbox for the directory list and Hackers Guide.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
