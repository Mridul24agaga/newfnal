"use client"

import { useEffect, useState } from "react"

export default function CardGrid() {
  const [isMounted, setIsMounted] = useState(false)

  // Predefined image paths
  const images = [
    "/backlink1.png",
    "/backlink2.png",
    "/backlink3.png",
    // 4th image removed as requested
    "/backlink5.png",
    "/backlink6.png",
    "/backlink7.png",
    "/backlink8.png",
    "/backlink9.png",
    "/backlink10.png",
  ]

  // Corresponding metrics for each card
  const metrics = ["+8", "+18", "+15", "+40", "+15", "+8", "+30", "+15", "+14"]

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Prevent hydration mismatch
  if (!isMounted) {
    return null
  }

  return (
    <div id="results" className="py-16 w-full bg-white overflow-hidden relative px-4 sm:px-6">
      <div className="text-center mb-10">
        <h1
          className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
          style={{ fontFamily: "Saira, sans-serif" }}
        >
          Client Results
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg" style={{ fontFamily: "Saira, sans-serif" }}>
          Discover and submit your website to the best high-authority directories to boost your online presence and
          improve SEO.
        </p>
      </div>

      {/* Mobile view - scrollable grid */}
      <div className="sm:hidden w-full mx-auto mb-8">
        <div className="flex flex-col gap-6">
          {images.slice(0, 9).map((image, index) => (
            <div key={index} className="w-full transform hover:scale-105 transition-all duration-300">
              <div className="relative group">
                {/* Semi-transparent border with shadow */}
                <div className="absolute inset-0 bg-[#2A2A2A] bg-opacity-60 rounded-xl transform scale-[1.05] -z-10 shadow-lg group-hover:shadow-xl transition-all duration-300"></div>

                {/* Orange badge with animation */}
                <div className="absolute -right-[2%] -top-[10%] z-10 bg-[#EB5C0E] text-white font-semibold px-3 py-1 rounded-full text-sm shadow-md group-hover:scale-110 transition-all duration-300">
                  {metrics[index]}
                </div>

                {/* White card with image */}
                <div className="w-full pb-[60%] bg-white rounded-xl relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center p-3">
                    <img
                      src={image || "/placeholder.svg"}
                      alt="Client Result"
                      className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-all duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop view - absolute positioning */}
      <div className="hidden sm:block w-full max-w-[1400px] mx-auto h-[750px] relative">
        {/* Top row cards */}
        <div className="absolute w-[28%] md:w-[26%] lg:w-[24%] left-[2%] top-[10%] transform -rotate-3 origin-center hover:scale-105 hover:-rotate-1 transition-all duration-300">
          <div className="relative group">
            {/* Semi-transparent border with shadow */}
            <div className="absolute inset-0 bg-[#2A2A2A] bg-opacity-60 rounded-xl transform scale-[1.05] -z-10 shadow-lg group-hover:shadow-xl transition-all duration-300"></div>

            {/* Orange badge with animation */}
            <div className="absolute -right-[2%] -top-[10%] z-10 bg-[#EB5C0E] text-white font-semibold px-[0.8vw] py-[0.3vw] rounded-full text-[1.6vw] md:text-[1.1vw] lg:text-[0.8vw] shadow-md group-hover:scale-110 transition-all duration-300">
              {metrics[0]}
            </div>

            {/* White card with image */}
            <div className="w-full pb-[60%] bg-white rounded-xl relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center p-3">
                <img
                  src={images[0] || "/placeholder.svg"}
                  alt="Client Result"
                  className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute w-[28%] md:w-[26%] lg:w-[24%] left-[33%] top-[8%] transform rotate-2 origin-center hover:scale-105 hover:rotate-0 transition-all duration-300">
          <div className="relative group">
            {/* Semi-transparent border with shadow */}
            <div className="absolute inset-0 bg-[#2A2A2A] bg-opacity-60 rounded-xl transform scale-[1.05] -z-10 shadow-lg group-hover:shadow-xl transition-all duration-300"></div>

            {/* Orange badge with animation */}
            <div className="absolute -right-[2%] -top-[10%] z-10 bg-[#EB5C0E] text-white font-semibold px-[0.8vw] py-[0.3vw] rounded-full text-[1.6vw] md:text-[1.1vw] lg:text-[0.8vw] shadow-md group-hover:scale-110 transition-all duration-300">
              {metrics[1]}
            </div>

            {/* White card with image */}
            <div className="w-full pb-[60%] bg-white rounded-xl relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center p-3">
                <img
                  src={images[1] || "/placeholder.svg"}
                  alt="Client Result"
                  className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute w-[28%] md:w-[26%] lg:w-[24%] right-[2%] top-[10%] transform rotate-3 origin-center hover:scale-105 hover:rotate-1 transition-all duration-300">
          <div className="relative group">
            {/* Semi-transparent border with shadow */}
            <div className="absolute inset-0 bg-[#2A2A2A] bg-opacity-60 rounded-xl transform scale-[1.05] -z-10 shadow-lg group-hover:shadow-xl transition-all duration-300"></div>

            {/* Orange badge with animation */}
            <div className="absolute -right-[2%] -top-[10%] z-10 bg-[#EB5C0E] text-white font-semibold px-[0.8vw] py-[0.3vw] rounded-full text-[1.6vw] md:text-[1.1vw] lg:text-[0.8vw] shadow-md group-hover:scale-110 transition-all duration-300">
              {metrics[2]}
            </div>

            {/* White card with image */}
            <div className="w-full pb-[60%] bg-white rounded-xl relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center p-3">
                <img
                  src={images[2] || "/placeholder.svg"}
                  alt="Client Result"
                  className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Middle row cards */}
        <div className="absolute w-[28%] md:w-[26%] lg:w-[24%] left-[8%] top-[35%] transform rotate-2 origin-center hover:scale-105 hover:rotate-0 transition-all duration-300">
          <div className="relative group">
            {/* Semi-transparent border with shadow */}
            <div className="absolute inset-0 bg-[#2A2A2A] bg-opacity-60 rounded-xl transform scale-[1.05] -z-10 shadow-lg group-hover:shadow-xl transition-all duration-300"></div>

            {/* Orange badge with animation */}
            <div className="absolute -right-[2%] -top-[10%] z-10 bg-[#EB5C0E] text-white font-semibold px-[0.8vw] py-[0.3vw] rounded-full text-[1.6vw] md:text-[1.1vw] lg:text-[0.8vw] shadow-md group-hover:scale-110 transition-all duration-300">
              {metrics[3]}
            </div>

            {/* White card with image */}
            <div className="w-full pb-[60%] bg-white rounded-xl relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center p-3">
                <img
                  src={images[3] || "/placeholder.svg"}
                  alt="Client Result"
                  className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute w-[28%] md:w-[26%] lg:w-[24%] left-[38%] top-[32%] transform -rotate-3 origin-center hover:scale-105 hover:-rotate-1 transition-all duration-300">
          <div className="relative group">
            {/* Semi-transparent border with shadow */}
            <div className="absolute inset-0 bg-[#2A2A2A] bg-opacity-60 rounded-xl transform scale-[1.05] -z-10 shadow-lg group-hover:shadow-xl transition-all duration-300"></div>

            {/* Orange badge with animation */}
            <div className="absolute -right-[2%] -top-[10%] z-10 bg-[#EB5C0E] text-white font-semibold px-[0.8vw] py-[0.3vw] rounded-full text-[1.6vw] md:text-[1.1vw] lg:text-[0.8vw] shadow-md group-hover:scale-110 transition-all duration-300">
              {metrics[4]}
            </div>

            {/* White card with image */}
            <div className="w-full pb-[60%] bg-white rounded-xl relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center p-3">
                <img
                  src={images[4] || "/placeholder.svg"}
                  alt="Client Result"
                  className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute w-[28%] md:w-[26%] lg:w-[24%] right-[8%] top-[35%] transform rotate-1 origin-center hover:scale-105 hover:rotate-3 transition-all duration-300">
          <div className="relative group">
            {/* Semi-transparent border with shadow */}
            <div className="absolute inset-0 bg-[#2A2A2A] bg-opacity-60 rounded-xl transform scale-[1.05] -z-10 shadow-lg group-hover:shadow-xl transition-all duration-300"></div>

            {/* Orange badge with animation */}
            <div className="absolute -right-[2%] -top-[10%] z-10 bg-[#EB5C0E] text-white font-semibold px-[0.8vw] py-[0.3vw] rounded-full text-[1.6vw] md:text-[1.1vw] lg:text-[0.8vw] shadow-md group-hover:scale-110 transition-all duration-300">
              {metrics[5]}
            </div>

            {/* White card with image */}
            <div className="w-full pb-[60%] bg-white rounded-xl relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center p-3">
                <img
                  src={images[5] || "/placeholder.svg"}
                  alt="Client Result"
                  className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row cards */}
        <div className="absolute w-[28%] md:w-[26%] lg:w-[24%] left-[2%] top-[60%] transform -rotate-1 origin-center hover:scale-105 hover:rotate-1 transition-all duration-300">
          <div className="relative group">
            {/* Semi-transparent border with shadow */}
            <div className="absolute inset-0 bg-[#2A2A2A] bg-opacity-60 rounded-xl transform scale-[1.05] -z-10 shadow-lg group-hover:shadow-xl transition-all duration-300"></div>

            {/* Orange badge with animation */}
            <div className="absolute -right-[2%] -top-[10%] z-10 bg-[#EB5C0E] text-white font-semibold px-[0.8vw] py-[0.3vw] rounded-full text-[1.6vw] md:text-[1.1vw] lg:text-[0.8vw] shadow-md group-hover:scale-110 transition-all duration-300">
              {metrics[6]}
            </div>

            {/* White card with image */}
            <div className="w-full pb-[60%] bg-white rounded-xl relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center p-3">
                <img
                  src={images[6] || "/placeholder.svg"}
                  alt="Client Result"
                  className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute w-[28%] md:w-[26%] lg:w-[24%] left-[33%] top-[58%] transform rotate-2 origin-center hover:scale-105 hover:rotate-0 transition-all duration-300">
          <div className="relative group">
            {/* Semi-transparent border with shadow */}
            <div className="absolute inset-0 bg-[#2A2A2A] bg-opacity-60 rounded-xl transform scale-[1.05] -z-10 shadow-lg group-hover:shadow-xl transition-all duration-300"></div>

            {/* Orange badge with animation */}
            <div className="absolute -right-[2%] -top-[10%] z-10 bg-[#EB5C0E] text-white font-semibold px-[0.8vw] py-[0.3vw] rounded-full text-[1.6vw] md:text-[1.1vw] lg:text-[0.8vw] shadow-md group-hover:scale-110 transition-all duration-300">
              {metrics[7]}
            </div>

            {/* White card with image */}
            <div className="w-full pb-[60%] bg-white rounded-xl relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center p-3">
                <img
                  src={images[7] || "/placeholder.svg"}
                  alt="Client Result"
                  className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute w-[28%] md:w-[26%] lg:w-[24%] right-[2%] top-[60%] transform -rotate-2 origin-center hover:scale-105 hover:rotate-0 transition-all duration-300">
          <div className="relative group">
            {/* Semi-transparent border with shadow */}
            <div className="absolute inset-0 bg-[#2A2A2A] bg-opacity-60 rounded-xl transform scale-[1.05] -z-10 shadow-lg group-hover:shadow-xl transition-all duration-300"></div>

            {/* Orange badge with animation */}
            <div className="absolute -right-[2%] -top-[10%] z-10 bg-[#EB5C0E] text-white font-semibold px-[0.8vw] py-[0.3vw] rounded-full text-[1.6vw] md:text-[1.1vw] lg:text-[0.8vw] shadow-md group-hover:scale-110 transition-all duration-300">
              {metrics[8]}
            </div>

            {/* White card with image */}
            <div className="w-full pb-[60%] bg-white rounded-xl relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center p-3">
                <img
                  src={images[8] || "/placeholder.svg"}
                  alt="Client Result"
                  className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
