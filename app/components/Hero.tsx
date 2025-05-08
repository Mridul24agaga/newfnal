"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowUpRight, Check } from "lucide-react"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollDirection, setScrollDirection] = useState("down")
  const [mobileScrollDirection, setMobileScrollDirection] = useState("right")
  const directoryRef = useRef<HTMLDivElement>(null)
  const mobileSliderRef = useRef<HTMLDivElement>(null)
  const mobileSliderContentRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    setIsVisible(true)

    // Auto-scrolling effect with direction change for desktop
    const scrollInterval = setInterval(() => {
      if (directoryRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = directoryRef.current

        // Change direction when reaching top or bottom with a buffer
        if (scrollTop >= scrollHeight - clientHeight - 20 && scrollDirection === "down") {
          setScrollDirection("up")
        } else if (scrollTop <= 20 && scrollDirection === "up") {
          setScrollDirection("down")
        }

        // Scroll based on direction with smoother movement
        if (scrollDirection === "down") {
          directoryRef.current.scrollTop += 1.5
        } else {
          directoryRef.current.scrollTop -= 1.5
        }
      }
    }, 20) // Faster interval for smoother scrolling

    // Auto-scrolling effect for mobile slider
    const mobileScrollInterval = setInterval(() => {
      if (mobileSliderRef.current && mobileSliderContentRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = mobileSliderRef.current

        // Change direction when reaching end or start
        if (scrollLeft >= scrollWidth - clientWidth - 10 && mobileScrollDirection === "right") {
          setMobileScrollDirection("left")
        } else if (scrollLeft <= 10 && mobileScrollDirection === "left") {
          setMobileScrollDirection("right")
        }

        // Scroll based on direction
        if (mobileScrollDirection === "right") {
          mobileSliderRef.current.scrollLeft += 2 // Faster scroll speed
        } else {
          mobileSliderRef.current.scrollLeft -= 2
        }
      }
    }, 20) // Faster interval for smoother scrolling

    // Add touch scrolling behavior for mobile slider
    const mobileSlider = mobileSliderRef.current
    if (mobileSlider) {
      let isDown = false
      let startX: number
      let scrollLeft: number

      const handleMouseDown = (e: MouseEvent) => {
        isDown = true
        mobileSlider.classList.add("active")
        startX = e.pageX - mobileSlider.getBoundingClientRect().left
        scrollLeft = mobileSlider.scrollLeft
      }

      const handleMouseLeave = () => {
        isDown = false
        mobileSlider.classList.remove("active")
      }

      const handleMouseUp = () => {
        isDown = false
        mobileSlider.classList.remove("active")
      }

      const handleMouseMove = (e: MouseEvent) => {
        if (!isDown) return
        e.preventDefault()
        const x = e.pageX - mobileSlider.getBoundingClientRect().left
        const walk = (x - startX) * 2 // Scroll speed
        mobileSlider.scrollLeft = scrollLeft - walk
      }

      mobileSlider.addEventListener("mousedown", handleMouseDown as EventListener)
      mobileSlider.addEventListener("mouseleave", handleMouseLeave)
      mobileSlider.addEventListener("mouseup", handleMouseUp)
      mobileSlider.addEventListener("mousemove", handleMouseMove as EventListener)

      // Touch events for mobile
      const handleTouchStart = (e: TouchEvent) => {
        isDown = true
        startX = e.touches[0].clientX - mobileSlider.getBoundingClientRect().left
        scrollLeft = mobileSlider.scrollLeft
      }

      const handleTouchEnd = () => {
        isDown = false
      }

      const handleTouchMove = (e: TouchEvent) => {
        if (!isDown) return
        const x = e.touches[0].clientX - mobileSlider.getBoundingClientRect().left
        const walk = (x - startX) * 2
        mobileSlider.scrollLeft = scrollLeft - walk
      }

      mobileSlider.addEventListener("touchstart", handleTouchStart as EventListener)
      mobileSlider.addEventListener("touchend", handleTouchEnd)
      mobileSlider.addEventListener("touchmove", handleTouchMove as EventListener)

      return () => {
        clearInterval(scrollInterval)
        clearInterval(mobileScrollInterval)

        if (mobileSlider) {
          mobileSlider.removeEventListener("mousedown", handleMouseDown as EventListener)
          mobileSlider.removeEventListener("mouseleave", handleMouseLeave)
          mobileSlider.removeEventListener("mouseup", handleMouseUp)
          mobileSlider.removeEventListener("mousemove", handleMouseMove as EventListener)

          mobileSlider.removeEventListener("touchstart", handleTouchStart as EventListener)
          mobileSlider.removeEventListener("touchend", handleTouchEnd)
          mobileSlider.removeEventListener("touchmove", handleTouchMove as EventListener)
        }
      }
    }

    return () => {
      clearInterval(scrollInterval)
      clearInterval(mobileScrollInterval)
    }
  }, [scrollDirection, mobileScrollDirection])

  // Directory data - Product directories with logos
  const directoryItems = [
    {
      name: "Product Hunt",
      description: "Tech products and tools",
      logo: "https://ph-static.imgix.net/ph-logo-1.png",
      color: "#DA552F",
    },
    {
      name: "Hacker News",
      description: "Tech news and discussions",
      logo: "https://news.ycombinator.com/favicon.ico",
      color: "#FFFFFF",
    },
    {
      name: "Reddit",
      description: "Community discussions",
      logo: "https://www.redditstatic.com/desktop2x/img/favicon/android-icon-192x192.png",
      color: "#FF4500",
    },
    {
      name: "Indie Hackers",
      description: "Independent founders",
      logo: "https://www.indiehackers.com/images/logos/indie-hackers-logo__glyph--light.svg",
      color: "#FFFFFF",
    },
    {
      name: "BetaList",
      description: "Early-stage startups",
      logo: "https://www.indiemakers.tools/media/images/betalist.jpg",
      color: "#FFFFFF",
    },
    {
      name: "AppSumo",
      description: "Software deals",
      logo: "https://appsumo2-cdn.appsumo.com/static/images/favicon.ico",
      color: "#FFBC00",
    },
    {
      name: "G2",
      description: "Business software reviews",
      logo: "https://images.seeklogo.com/logo-png/40/1/g2-logo-png_seeklogo-407782.png",
      color: "#FFFFFF",
    },
    {
      name: "Capterra",
      description: "Software reviews",
      logo: "https://www.capterra.com/favicon.ico",
      color: "#FF9D28",
    },
    {
      name: "AlternativeTo",
      description: "Software alternatives",
      logo: "https://alternativeto.net/favicon.ico",
      color: "#5064EC",
    },
    {
      name: "SaaSHub",
      description: "Software alternatives",
      logo: "https://www.saashub.com/images/app/service_logos/9/ae995212f366/small.png",
      color: "#3498DB",
    },
    {
      name: "StackShare",
      description: "Tech stack sharing",
      logo: "https://media.licdn.com/dms/image/v2/C560BAQF6ChuKvla6GA/company-logo_200_200/company-logo_200_200/0/1631347132099?e=2147483647&v=beta&t=gYYzd0IpNVqpIInfBpVivXL19iUuxG68Nmu6oLYS6uU",
      color: "#FFFFFF",
    },
    {
      name: "Slant",
      description: "Product comparisons",
      logo: "https://www.slant.co/favicon.ico",
      color: "#FF7A59",
    },
    {
      name: "Crunchbase",
      description: "Company database",
      logo: "https://www.crunchbase.com/favicon.ico",
      color: "#0288D1",
    },
    {
      name: "AngelList",
      description: "Startup jobs",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvoAyOng9I9rmvHX2Y-XXhcYLrCETnrpsuuA&s",
      color: "#FFFFFF",
    },
    {
      name: "Producthunt Alternatives",
      description: "Similar platforms",
      logo: "https://ph-static.imgix.net/ph-logo-1.png",
      color: "#6C5CE7",
    },
  ]

  return (
    <div className="min-h-screen font-saira">
      {/* Header */}
      <header className="border-b border-gray-200 relative bg-white z-10">
        <div className="container mx-auto px-4">
          <div className="h-16 sm:h-20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/getmorepacklinks.png"
                alt="GetMoreBacklinks"
                width={100}
                height={32}
                className="h-6 sm:h-8 w-auto"
              />
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <a
                href="/"
                className="text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Home
              </a>
              <a
                href="/case-study"
                className="text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Case Studies
              </a>
              <a
                href="/blogs"
                className="text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Blogs
              </a>

              <a
                href="/#pricing"
                className="text-xs sm:text-sm font-medium text-white bg-[#FB8C33] hover:bg-[#EA7B22] transition-colors px-4 py-2 rounded-full"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Orange Background */}
      <div className="py-12 md:py-16 lg:py-20 bg-[#EB5C0E]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left Column - Text Content */}
            <div className="space-y-6 flex flex-col h-full">
              <div className="space-y-6 flex-grow">
                {/* Tagline before heading */}
                <div className="inline-flex bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <p className="text-white font-semibold text-sm md:text-base">
                    #1 Most affordable directory submission service since 2024
                  </p>
                </div>

                {/* Heading in 3 lines */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white">
                  <span className="block">List on 200+</span>
                  <span className="block">Product Hunt - Like</span>
                  <span className="block">platforms with one click.</span>
                </h1>

                {/* Description after heading */}
                <p className="text-white/90 text-lg">
                  GetMoreBacklinks - Your SaaS, Product, Apps, Extensions, Directories, D2C, E-commerce, Blog,
                  Newsletters on 200+ High DA-DR directories in One click
                </p>

                {/* Benefits styled like the image */}
                <div className="flex flex-wrap gap-3 pt-4">
                  <div className="flex items-center gap-2 bg-[#FB8C33] border border-white/30 rounded-full px-4 py-2">
                    <Check className="w-4 h-4 text-white" />
                    <span className="font-medium text-white text-sm">Boost SEO</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#FB8C33] border border-white/30 rounded-full px-4 py-2">
                    <Check className="w-4 h-4 text-white" />
                    <span className="font-medium text-white text-sm">Increase Sales</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#FB8C33] border border-white/30 rounded-full px-4 py-2">
                    <Check className="w-4 h-4 text-white" />
                    <span className="font-medium text-white text-sm">Improve Ranking</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#FB8C33] border border-white/30 rounded-full px-4 py-2">
                    <Check className="w-4 h-4 text-white" />
                    <span className="font-medium text-white text-sm">Expand Visibility</span>
                  </div>
                </div>

                {/* Mobile-only directory horizontal slider */}
                <div className="md:hidden mt-6">
                  <h3 className="font-medium text-white mb-3">Some of our 200+ directories</h3>
                  <div
                    ref={mobileSliderRef}
                    className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide"
                    style={{ scrollBehavior: "smooth" }}
                  >
                    <div
                      ref={mobileSliderContentRef}
                      className="flex space-x-3"
                      style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
                    >
                      {/* Show more items to ensure continuous scrolling */}
                      {directoryItems.slice(0, 15).map((item, index) => (
                        <div
                          key={index}
                          className="flex-shrink-0 w-[180px] bg-white rounded-lg p-3 shadow-lg border border-gray-100"
                          style={{ scrollSnapAlign: "start" }}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden"
                              style={{ backgroundColor: `${item.color}20` }}
                            >
                              <Image
                                src={item.logo || "/placeholder.svg"}
                                alt={item.name}
                                width={40}
                                height={40}
                                className="w-7 h-7 object-contain"
                                unoptimized
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-900 truncate">{item.name}</div>
                              <div className="text-xs text-gray-500 truncate">{item.description}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 text-center">
                      <span className="text-sm text-white/80">+ more directories</span>
                    </div>
                  </div>
                </div>

                {/* Got a question section - Styled to match the image */}
                <div className="mt-8 pt-4">
                  <div className="bg-gray-900 text-white p-4 rounded-lg flex items-center gap-4 max-w-md">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src="/mridul2.jpg"
                        alt="Founder"
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1 font-medium text-lg">
                        Got a question? <ArrowUpRight className="w-4 h-4" />
                      </div>
                      <div className="text-sm text-gray-300">
                        DM me on{" "}
                        <a
                          href="https://www.linkedin.com/in/mridulthareja/"
                          className="text-white hover:underline font-medium"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          LinkedIn
                        </a>
                        ,{" "}
                        <a
                          href="https://x.com/Innvisionagency"
                          className="text-white hover:underline font-medium"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Twitter
                        </a>{" "}
                        or by{" "}
                        <a href="mailto:hi@mridulthareja.com" className="text-white hover:underline font-medium">
                          Email
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Directory with Auto-Scroll and Blur Effects - White Background */}
            {/* Hidden on mobile, visible on md screens and up */}
            <div className="hidden md:block relative h-[500px] rounded-lg bg-white shadow-lg">
              {/* Top blur gradient */}
              <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none rounded-t-lg"></div>

              {/* Bottom blur gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none rounded-b-lg"></div>

              {/* Directory container */}
              <div className="absolute inset-0 overflow-hidden rounded-lg border border-gray-200">
                <div
                  ref={directoryRef}
                  className="h-full overflow-y-auto scrollbar-hide scroll-smooth"
                  style={{ scrollBehavior: "smooth", WebkitOverflowScrolling: "touch" }}
                >
                  <div className="grid grid-cols-2 gap-3 p-3">
                    {directoryItems.map((item, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 rounded-lg border border-gray-100 p-3 hover:border-gray-300 transition-colors h-[90px] flex items-center"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden"
                            style={{ backgroundColor: `${item.color}20` }} // Light version of the brand color
                          >
                            <Image
                              src={item.logo || "/placeholder.svg"}
                              alt={item.name}
                              width={40}
                              height={40}
                              className="w-7 h-7 object-contain"
                              unoptimized
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900 truncate">{item.name}</div>
                            <div className="text-sm text-gray-500 truncate">{item.description}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
