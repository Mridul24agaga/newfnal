"use client"

import { useEffect, useState } from "react"

export default function CardGrid() {
    const [isMounted, setIsMounted] = useState(false)


    // Predefined image paths
    const images = [
        "/backlink1.png",
        "/backlink2.png",
        "/backlink3.png",
        "/backlink4.png",
        "/backlink5.png",
        "/backlink6.png",
        "/backlink7.png",
        "/backlink8.png",
        "/backlink9.png",
        "/backlink10.png",
        "/backlink11.png",


    ]

    useEffect(() => {
        setIsMounted(true)
    }, [])

    // Prevent hydration mismatch
    if (!isMounted) {
        return null
    }

    return (
        <div className="min-h-screen w-full bg-white overflow-hidden relative p-4 mt-20">
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
               <div className="w-full max-w-[1400px] mx-auto h-screen max-h-[800px] relative">
                {/* Top row cards */}
                <div className="absolute w-[70%] sm:w-[24%] md:w-[22%] lg:w-[20%] left-[5%] sm:left-[2%] top-[5%] sm:top-[10%] transform -rotate-3 origin-center">
                    <div className="relative">
                        {/* Light grey border container */}
                        <div className="absolute inset-0 bg-[#2A2A2A] rounded-xl transform scale-[1.05] -z-10"></div>

                        {/* Green badge */}
                        <div className="absolute -right-[2%] -top-[10%] z-10 bg-[#7DF13B] text-black font-semibold px-[0.6vw] py-[0.2vw] rounded-full text-[3vw] sm:text-[1.8vw] md:text-[1.2vw] lg:text-[0.8vw]">
                            +8
                        </div>

                        {/* White card with image */}
                        <div className="w-full pb-[50%] bg-white rounded-xl relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <img
                                    src={images[0] || "/placeholder.svg"}
                                    alt="Men's Fashion"
                                    className="w-full h-full object-contain rounded-xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute w-[70%] sm:w-[24%] md:w-[22%] lg:w-[20%] left-[5%] sm:left-[28%] top-[25%] sm:top-[8%] transform rotate-2 origin-center">
                    <div className="relative">
                        {/* Light grey border container */}
                        <div className="absolute inset-0 bg-[#2A2A2A] rounded-xl transform scale-[1.05] -z-10"></div>

                        {/* Green badge */}
                        <div className="absolute -right-[2%] -top-[10%] z-10 bg-[#7DF13B] text-black font-semibold px-[0.6vw] py-[0.2vw] rounded-full text-[3vw] sm:text-[1.8vw] md:text-[1.2vw] lg:text-[0.8vw]">
                            +18
                        </div>

                        {/* White card with image */}
                        <div className="w-full pb-[50%] bg-white rounded-xl relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <img
                                    src={images[1] || "/placeholder.svg"}
                                    alt="Men's Fashion"
                                    className="w-full h-full object-contain rounded-xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute w-[70%] sm:w-[24%] md:w-[22%] lg:w-[20%] left-[5%] sm:left-[54%] top-[45%] sm:top-[12%] transform rotate-3 origin-center">
                    <div className="relative">
                        {/* Light grey border container */}
                        <div className="absolute inset-0 bg-[#2A2A2A] rounded-xl transform scale-[1.05] -z-10"></div>

                        {/* Green badge */}
                        <div className="absolute -right-[2%] -top-[10%] z-10 bg-[#7DF13B] text-black font-semibold px-[0.6vw] py-[0.2vw] rounded-full text-[3vw] sm:text-[1.8vw] md:text-[1.2vw] lg:text-[0.8vw]">
                            +15
                        </div>

                        {/* White card with image */}
                        <div className="w-full pb-[50%] bg-white rounded-xl relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <img
                                    src={images[2] || "/placeholder.svg"}
                                    alt="Casual Wear"
                                    className="w-full h-full object-contain rounded-xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute w-[70%] sm:w-[24%] md:w-[22%] lg:w-[20%] left-[5%] sm:right-[2%] sm:left-auto top-[65%] sm:top-[10%] transform -rotate-2 origin-center">
                    <div className="relative">
                        {/* Light grey border container */}
                        <div className="absolute inset-0 bg-[#2A2A2A] rounded-xl transform scale-[1.05] -z-10"></div>

                        {/* Green badge */}
                        <div className="absolute -right-[2%] -top-[10%] z-10 bg-[#7DF13B] text-black font-semibold px-[0.6vw] py-[0.2vw] rounded-full text-[3vw] sm:text-[1.8vw] md:text-[1.2vw] lg:text-[0.8vw]">
                            +17
                        </div>

                        {/* White card with image */}
                        <div className="w-full pb-[50%] bg-white rounded-xl relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <img
                                    src={images[3] || "/placeholder.svg"}
                                    alt="Formal Attire"
                                    className="w-full h-full object-contain rounded-xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Middle row cards */}
                <div className="absolute w-[70%] sm:w-[24%] md:w-[22%] lg:w-[20%] left-[5%] sm:left-[15%] top-[85%] sm:top-[35%] transform rotate-2 origin-center">
                    <div className="relative">
                        {/* Light grey border container */}
                        <div className="absolute inset-0 bg-[#2A2A2A] rounded-xl transform scale-[1.05] -z-10"></div>

                        {/* Green badge */}
                        <div className="absolute -right-[2%] -top-[10%] z-10 bg-[#7DF13B] text-black font-semibold px-[0.6vw] py-[0.2vw] rounded-full text-[3vw] sm:text-[1.8vw] md:text-[1.2vw] lg:text-[0.8vw]">
                            +40
                        </div>

                        {/* White card with image */}
                        <div className="w-full pb-[50%] bg-white rounded-xl relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <img
                                    src={images[4] || "/placeholder.svg"}
                                    alt="Accessories"
                                    className="w-full h-full object-contain rounded-xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute w-[70%] sm:w-[24%] md:w-[22%] lg:w-[20%] left-[5%] sm:left-[41%] top-[105%] sm:top-[32%] transform -rotate-3 origin-center">
                    <div className="relative">
                        {/* Light grey border container */}
                        <div className="absolute inset-0 bg-[#2A2A2A] rounded-xl transform scale-[1.05] -z-10"></div>

                        {/* Green badge */}
                        <div className="absolute -right-[2%] -top-[10%] z-10 bg-[#7DF13B] text-black font-semibold px-[0.6vw] py-[0.2vw] rounded-full text-[3vw] sm:text-[1.8vw] md:text-[1.2vw] lg:text-[0.8vw]">
                            +15
                        </div>

                        {/* White card with image */}
                        <div className="w-full pb-[50%] bg-white rounded-xl relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <img
                                    src={images[5] || "/placeholder.svg"}
                                    alt="Shoes"
                                    className="w-full h-full object-contain rounded-xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute w-[70%] sm:w-[24%] md:w-[22%] lg:w-[20%] left-[5%] sm:right-[15%] sm:left-auto top-[125%] sm:top-[35%] transform rotate-1 origin-center">
                    <div className="relative">
                        {/* Light grey border container */}
                        <div className="absolute inset-0 bg-[#2A2A2A] rounded-xl transform scale-[1.05] -z-10"></div>

                        {/* Green badge */}
                        <div className="absolute -right-[2%] -top-[10%] z-10 bg-[#7DF13B] text-black font-semibold px-[0.6vw] py-[0.2vw] rounded-full text-[3vw] sm:text-[1.8vw] md:text-[1.2vw] lg:text-[0.8vw]">
                            +8
                        </div>

                        {/* White card with image */}
                        <div className="w-full pb-[50%] bg-white rounded-xl relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <img
                                    src={images[6] || "/placeholder.svg"}
                                    alt="Watches"
                                    className="w-full h-full object-contain rounded-xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom row cards */}
                <div className="absolute w-[70%] sm:w-[24%] md:w-[22%] lg:w-[20%] left-[5%] sm:left-[5%] top-[145%] sm:top-[60%] transform -rotate-1 origin-center">
                    <div className="relative">
                        {/* Light grey border container */}
                        <div className="absolute inset-0 bg-[#2A2A2A] rounded-xl transform scale-[1.05] -z-10"></div>

                        {/* Green badge */}
                        <div className="absolute -right-[2%] -top-[10%] z-10 bg-[#7DF13B] text-black font-semibold px-[0.6vw] py-[0.2vw] rounded-full text-[3vw] sm:text-[1.8vw] md:text-[1.2vw] lg:text-[0.8vw]">
                            +30
                        </div>

                        {/* White card with image */}
                        <div className="w-full pb-[50%] bg-white rounded-xl relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <img
                                    src={images[7] || "/placeholder.svg"}
                                    alt="Hats"
                                    className="w-full h-full object-contain rounded-xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute w-[70%] sm:w-[24%] md:w-[22%] lg:w-[20%] left-[5%] sm:left-[30%] top-[165%] sm:top-[58%] transform rotate-2 origin-center">
                    <div className="relative">
                        {/* Light grey border container */}
                        <div className="absolute inset-0 bg-[#2A2A2A] rounded-xl transform scale-[1.05] -z-10"></div>

                        {/* Green badge */}
                        <div className="absolute -right-[2%] -top-[10%] z-10 bg-[#7DF13B] text-black font-semibold px-[0.6vw] py-[0.2vw] rounded-full text-[3vw] sm:text-[1.8vw] md:text-[1.2vw] lg:text-[0.8vw]">
                            +15
                        </div>

                        {/* White card with image */}
                        <div className="w-full pb-[50%] bg-white rounded-xl relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <img
                                    src={images[8] || "/placeholder.svg"}
                                    alt="Sunglasses"
                                    className="w-full h-full object-contain rounded-xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute w-[70%] sm:w-[24%] md:w-[22%] lg:w-[20%] left-[5%] sm:right-[30%] sm:left-auto top-[185%] sm:top-[60%] transform -rotate-2 origin-center">
                    <div className="relative">
                        {/* Light grey border container */}
                        <div className="absolute inset-0 bg-[#2A2A2A] rounded-xl transform scale-[1.05] -z-10"></div>

                        {/* Green badge */}
                        <div className="absolute -right-[2%] -top-[10%] z-10 bg-[#7DF13B] text-black font-semibold px-[0.6vw] py-[0.2vw] rounded-full text-[3vw] sm:text-[1.8vw] md:text-[1.2vw] lg:text-[0.8vw]">
                            +14
                        </div>

                        {/* White card with image */}
                        <div className="w-full pb-[50%] bg-white rounded-xl relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <img
                                    src={images[9] || "/placeholder.svg"}
                                    alt="Belts"
                                    className="w-full h-full object-contain rounded-xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute w-[70%] sm:w-[24%] md:w-[22%] lg:w-[20%] left-[5%] sm:right-[5%] sm:left-auto top-[205%] sm:top-[58%] transform rotate-3 origin-center">
                    <div className="relative">
                        {/* Light grey border container */}
                        <div className="absolute inset-0 bg-[#2A2A2A] rounded-xl transform scale-[1.05] -z-10"></div>

                        {/* Green badge */}
                        <div className="absolute -right-[2%] -top-[10%] z-10 bg-[#7DF13B] text-black font-semibold px-[0.6vw] py-[0.2vw] rounded-full text-[3vw] sm:text-[1.8vw] md:text-[1.2vw] lg:text-[0.8vw]">
                            +8
                        </div>

                        {/* White card with image */}
                        <div className="w-full pb-[50%] bg-white rounded-xl relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <img
                                    src={images[10] || "/placeholder.svg"}
                                    alt="Ties"
                                    className="w-full h-full object-contain rounded-xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

