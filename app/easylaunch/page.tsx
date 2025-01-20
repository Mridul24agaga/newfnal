"use client"

import { useState, useEffect } from "react"
import { useFormState } from "react-dom"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { generateLaunchPosts } from "../actions/generateLaunchPosts"
import {
  DribbbleIcon as ProductHunt,
  Twitter,
  RssIcon as Reddit,
  Linkedin,
  Facebook,
  Menu,
  Loader2,
  Check,
} from "lucide-react"
import { HackerNews } from "./icons"
import Sidebar from "../components/Sidebar"
import { CopyButton } from "../components/CopyButton"
import { Popup } from "../components/Popup"
import type { User } from "@supabase/auth-helpers-nextjs"

export default function EasyLaunchPage() {
  const [state, formAction] = useFormState(generateLaunchPosts, null)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showPopup, setShowPopup] = useState(false)

  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        setUser(user)
      } catch (error) {
        console.error("Error fetching user:", error)
      }
    }
    getUser()
  }, [supabase.auth])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    await formAction(new FormData(e.currentTarget))
    setLoading(false)
    setShowPopup(true)
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "LaunchPost",
    applicationCategory: "BusinessApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "AI-powered tool that generates personalized launch strategies and social media content for startups in minutes, saving 6+ hours on product launches.",
    operatingSystem: "Web",
    url: "https://getmorebacklinks.org/easylaunch",
  }

  return (
    <div className="min-h-screen bg-white flex">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Sidebar user={user} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 md:pl-[50px] h-screen overflow-y-auto">
        <header className="bg-white border-b border-gray-200 md:hidden">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="w-8" />
            <h1 className="text-xl font-bold text-center text-gray-900">LaunchPost</h1>
            <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-md hover:bg-gray-100">
              <Menu className="h-6 w-6 text-gray-500" />
              <span className="sr-only">Open sidebar</span>
            </button>
          </div>
        </header>
        <main className="bg-white text-[#1A1A1A] flex justify-center">
          <div className="w-full max-w-7xl mx-auto pt-8 md:pt-12 pb-12 md:pb-20 px-4 sm:px-6 lg:px-8">
            {/* Logo and Name */}
            <div className="flex items-center justify-center gap-3 mb-8 md:mb-16">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M17 7L7 17M17 7H8M17 7V16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h1 className="text-2xl tracking-[0.2em] font-medium">LAUNCHPOST</h1>
            </div>

            {/* Social Media Icons */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8 md:mb-16">
              <div className="w-12 h-12 rounded-full bg-[#da552f] flex items-center justify-center">
                <ProductHunt className="w-6 h-6 text-white" />
              </div>
              <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
                <Twitter className="w-6 h-6 text-white" />
              </div>
              <div className="w-12 h-12 rounded-full bg-[#ff4500] flex items-center justify-center">
                <Reddit className="w-6 h-6 text-white" />
              </div>
              <div className="w-12 h-12 rounded-full bg-[#0077b5] flex items-center justify-center">
                <Linkedin className="w-6 h-6 text-white" />
              </div>
              <div className="w-12 h-12 rounded-full bg-[#ff6600] flex items-center justify-center">
                <HackerNews className="w-6 h-6 text-white" />
              </div>
              <div className="w-12 h-12 rounded-full bg-[#3b5998] flex items-center justify-center">
                <Facebook className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Main Heading */}
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-[3.5rem] md:text-[5.5rem] font-bold leading-[1.1] mb-4 md:mb-8 tracking-tight">
                From zero to live
                <br />
                launch in <span className="text-[#4285F4]">24 hours</span>
              </h2>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-600">
                Get a step-by-step launch guide with personalized strategy and done-for-you content to skyrocket your
                product's debut.
              </p>
            </div>

            {/* Why Use LaunchPost Section */}
            <div className="mb-8 md:mb-16 w-full">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-[#2D4356]">
                Why use LaunchPost?
              </h2>
              <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto w-full">
                <div className="bg-white p-6 md:p-12 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-2xl font-bold mb-8">
                    To launch startup <span className="bg-[#2D4356] text-white px-3 py-1 rounded">manually</span> you
                    need:
                  </h3>
                  <div className="space-y-8">
                    <div>
                      <p className="text-xl md:text-2xl">
                        1. Find communities with your audience <span className="text-gray-600">(30 minutes)</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-xl md:text-2xl">
                        2. Create a post plan for each platform/community{" "}
                        <span className="text-gray-600">(20 minutes)</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-xl md:text-2xl">
                        3. Create content for each post <span className="text-gray-600">(~30 minutes/post)</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-xl md:text-2xl">
                        4. Publish posts <span className="text-gray-600">(10 minutes)</span>
                      </p>
                    </div>
                    <div className="pt-6">
                      <span className="text-xl md:text-2xl font-bold">Total: More than </span>
                      <span className="bg-[#2D4356] text-white px-3 py-1 rounded text-xl md:text-2xl">6 hours</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#005B7F] text-white p-6 md:p-12 rounded-xl border-2 border-[#005B7F]">
                  <h3 className="text-2xl font-bold mb-8">
                    To launch startup using{" "}
                    <span className="bg-white text-[#005B7F] px-3 py-1 rounded">LaunchPost</span> you need:
                  </h3>
                  <div className="space-y-8">
                    <div>
                      <p className="text-xl md:text-2xl">
                        1. Provide product URL and brand name <span className="text-gray-200">(10 sec)</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-xl md:text-2xl">
                        2. Copy and paste ready content <span className="text-gray-200">(20 sec/post)</span>
                      </p>
                    </div>
                    <div className="pt-6">
                      <span className="text-xl md:text-2xl font-bold">Total: Less than </span>
                      <span className="bg-white text-[#005B7F] px-3 py-1 rounded text-xl md:text-2xl">2 minutes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Form */}
            <div className="max-w-xl mx-auto mb-8 md:mb-16">
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="saasName"
                  required
                  placeholder="Your Product Name"
                  className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                />
                <input
                  type="url"
                  name="url"
                  required
                  placeholder="Your Product URL (https://...)"
                  className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#4285F4] hover:bg-[#3b78e7] text-white px-8 py-4 rounded-xl text-xl font-medium transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" />
                      Generating...
                    </>
                  ) : (
                    "Generate Launch Posts"
                  )}
                </button>
              </form>
            </div>

            {/* Benefits */}
            <div className="max-w-2xl mx-auto mb-8 md:mb-16">
              <div className="bg-[#4285F4]/5 border border-[#4285F4]/10 rounded-xl p-8 space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#4285F4] mt-1 flex-shrink-0" />
                  <p className="text-lg">
                    Give your launch a <span className="font-semibold">boost</span>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#4285F4] mt-1 flex-shrink-0" />
                  <p className="text-lg">
                    Save hours <span className="text-gray-600">of your time to launch</span>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#4285F4] mt-1 flex-shrink-0" />
                  <p className="text-lg">
                    Get the most out of your launch <span className="font-semibold">very quickly</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Generated Content */}
            {state?.results && (
              <div className="mt-8 md:mt-16 space-y-6 md:space-y-8">
                <h3 className="text-xl md:text-2xl font-bold text-center mb-6 md:mb-8">Your Launch Posts</h3>
                {state.results.map(({ platform, content }) => (
                  <div key={platform} className="bg-gray-50 rounded-xl p-8">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-xl font-semibold">{platform} Post:</h4>
                      <CopyButton text={content} />
                    </div>
                    <div className="whitespace-pre-wrap text-gray-600">{content}</div>
                  </div>
                ))}
              </div>
            )}

            {state?.error && <div className="mt-8 text-red-600 text-center">{state.error}</div>}
          </div>
        </main>
      </div>
      <Popup isOpen={showPopup} onClose={() => setShowPopup(false)} />
    </div>
  )
}

