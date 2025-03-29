"use client"

import { useState } from "react"
import { Search } from "lucide-react"

export default function DirectoryListing() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showAll, setShowAll] = useState(false)

  const categories = ["Agencies", "AI", "Communities", "Dev Tools", "Indie", "SaaS", "Startup"]

  // At least 50 directories
  const directories = [
    { name: "Capterra", dr: 93, traffic: "4.2M", categories: ["SaaS", "Agencies"] },
    { name: "G2", dr: 91, traffic: "14.9M", categories: ["SaaS"] },
    { name: "Product Hunt", dr: 90, traffic: "32.1M", categories: ["SaaS"] },
    { name: "Microsoft AppSource", dr: 96, traffic: "12.5M", categories: ["SaaS"] },
    { name: "SaaSworthy", dr: 72, traffic: "256K", categories: ["SaaS"] },
    { name: "GetApp", dr: 84, traffic: "8.7M", categories: ["SaaS"] },
    { name: "Software Advice", dr: 86, traffic: "2.8M", categories: ["SaaS", "Dev Tools"] },
    { name: "Futurepedia", dr: 79, traffic: "890K", categories: ["AI"] },
    { name: "There's An AI For That", dr: 74, traffic: "420K", categories: ["AI"] },
    { name: "AI Tools Directory", dr: 65, traffic: "180K", categories: ["AI"] },
    { name: "TopAI.tools", dr: 69, traffic: "230K", categories: ["AI"] },
    { name: "AI Scout", dr: 63, traffic: "150K", categories: ["AI"] },
    { name: "Vimeo", dr: 96, traffic: "45.2M", categories: ["Communities"] },
    { name: "Gravatar", dr: 95, traffic: "38.7M", categories: ["Dev Tools"] },
    { name: "Flickr", dr: 94, traffic: "22.3M", categories: ["Communities"] },
    { name: "Behance", dr: 94, traffic: "18.9M", categories: ["Communities", "Indie"] },
    { name: "TrustPilot", dr: 94, traffic: "28.6M", categories: ["SaaS"] },
    { name: "Hey Link", dr: 92, traffic: "5.8M", categories: ["Dev Tools"] },
    { name: "Source Forge", dr: 92, traffic: "32.1M", categories: ["Dev Tools", "SaaS"] },
    { name: "Stack Overflow", dr: 92, traffic: "65.3M", categories: ["Dev Tools", "Communities"] },
    { name: "Chrome Web Store", dr: 92, traffic: "48.7M", categories: ["Dev Tools"] },
    { name: "Disqus", dr: 92, traffic: "15.2M", categories: ["SaaS"] },
    { name: "Gitbook", dr: 91, traffic: "8.7M", categories: ["Dev Tools"] },
    { name: "About Me", dr: 91, traffic: "7.3M", categories: ["Communities"] },
    { name: "AI Tools Neil Patel", dr: 91, traffic: "3.2M", categories: ["AI"] },
    { name: "Bitly", dr: 91, traffic: "22.8M", categories: ["Dev Tools"] },
    { name: "BuyMeACoffee", dr: 91, traffic: "9.5M", categories: ["Indie"] },
    { name: "MySpace", dr: 91, traffic: "6.1M", categories: ["Communities"] },
    { name: "dev.to", dr: 90, traffic: "18.3M", categories: ["Dev Tools", "Communities"] },
    { name: "Crunchbase", dr: 90, traffic: "25.7M", categories: ["Startup"] },
    { name: "HackerNews", dr: 90, traffic: "32.8M", categories: ["Communities", "Startup"] },
    { name: "Linktree", dr: 90, traffic: "28.4M", categories: ["Dev Tools"] },
    { name: "Github", dr: 90, traffic: "85.6M", categories: ["Dev Tools"] },
    { name: "Pitchbook", dr: 89, traffic: "4.8M", categories: ["Startup"] },
    { name: "Hacker Noon", dr: 89, traffic: "7.2M", categories: ["Communities", "Startup"] },
    { name: "Slashdot", dr: 88, traffic: "5.9M", categories: ["Communities"] },
    { name: "FinancesOnline", dr: 87, traffic: "6.3M", categories: ["SaaS"] },
    { name: "Cal", dr: 87, traffic: "3.7M", categories: ["Dev Tools"] },
    { name: "Devpost", dr: 86, traffic: "4.2M", categories: ["Dev Tools"] },
    { name: "Your Story", dr: 86, traffic: "8.1M", categories: ["Startup"] },
    { name: "Softpedia", dr: 86, traffic: "12.5M", categories: ["Dev Tools", "SaaS"] },
    { name: "LiveJournal", dr: 86, traffic: "7.8M", categories: ["Communities"] },
    { name: "Dessign", dr: 84, traffic: "2.1M", categories: ["Dev Tools"] },
    { name: "Sitejabber", dr: 84, traffic: "5.3M", categories: ["SaaS"] },
    { name: "F6S", dr: 82, traffic: "3.9M", categories: ["Startup"] },
    { name: "AppSumo", dr: 82, traffic: "6.8M", categories: ["SaaS"] },
    { name: "Hotfrog", dr: 80, traffic: "4.2M", categories: ["Agencies"] },
    { name: "AlternativeTo", dr: 80, traffic: "15.3M", categories: ["SaaS"] },
    { name: "mssg me", dr: 80, traffic: "2.8M", categories: ["Dev Tools"] },
    { name: "Indie Hackers", dr: 80, traffic: "4.5M", categories: ["Indie", "Startup"] },
    { name: "Listly", dr: 80, traffic: "3.1M", categories: ["Communities"] },
    { name: "Perplexity", dr: 79, traffic: "12.7M", categories: ["AI"] },
    { name: "Bento", dr: 79, traffic: "3.4M", categories: ["Dev Tools"] },
    { name: "Web Wiki", dr: 78, traffic: "2.9M", categories: ["Dev Tools"] },
    { name: "Software Suggest", dr: 77, traffic: "3.8M", categories: ["SaaS"] },
    { name: "Store Board", dr: 77, traffic: "2.5M", categories: ["Agencies"] },
    { name: "EU Startups", dr: 76, traffic: "1.8M", categories: ["Startup"] },
    { name: "App Brain", dr: 76, traffic: "2.2M", categories: ["Dev Tools"] },
    { name: "AI FOSSHUB", dr: 75, traffic: "1.5M", categories: ["AI"] },
    { name: "AngelList", dr: 75, traffic: "4.7M", categories: ["Startup"] },
    { name: "Killer Startups", dr: 74, traffic: "1.2M", categories: ["Startup"] },
    { name: "Starter Story", dr: 74, traffic: "2.3M", categories: ["Startup"] },
    { name: "Exact Seek", dr: 74, traffic: "950K", categories: ["SaaS"] },
    { name: "Raindrop", dr: 73, traffic: "1.8M", categories: ["Dev Tools"] },
    { name: "betalist", dr: 73, traffic: "1.1M", categories: ["Startup"] },
    { name: "Alternative", dr: 72, traffic: "2.4M", categories: ["SaaS"] },
    { name: "CSS Light", dr: 71, traffic: "890K", categories: ["Dev Tools"] },
    { name: "Serchen", dr: 71, traffic: "1.2M", categories: ["SaaS"] },
    { name: "Featured Customers", dr: 71, traffic: "1.5M", categories: ["SaaS"] },
    { name: "SaaSHub", dr: 70, traffic: "2.1M", categories: ["SaaS"] },
    { name: "Crowd Reviews", dr: 70, traffic: "950K", categories: ["SaaS"] },
    { name: "Crozdesk", dr: 70, traffic: "1.3M", categories: ["SaaS"] },
    { name: "RocketHub", dr: 70, traffic: "1.1M", categories: ["Startup"] },
  ]

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredDirectories = directories.filter((dir) => {
    const matchesSearch = dir.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory ? dir.categories.includes(selectedCategory) : true
    return matchesSearch && matchesCategory
  })

  // Show only 12 directories (4 rows of 3) if showAll is false
  const displayedDirectories = showAll ? filteredDirectories : filteredDirectories.slice(0, 12)

  return (
    <div
      className="bg-white min-h-screen p-4 md:p-6 lg:p-8"
      style={{ fontFamily: "Saira, sans-serif" }}
    >
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Saira:wght@300;400;500;600;700&display=swap");
        body {
          font-family: 'Saira', sans-serif;
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Heading and Description */}
        <div className="text-center mb-10">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
            style={{ fontFamily: "Saira, sans-serif" }}
          >
            Directory Listings
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg" style={{ fontFamily: "Saira, sans-serif" }}>
            Discover and submit your website to the best high-authority directories to boost your online presence and
            improve SEO.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={18} />
          </div>
          <input
            type="text"
            placeholder="Search among 10,352 directories"
            className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300 transition-all"
            style={{ fontFamily: "Saira, sans-serif" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-5 py-2 rounded-full transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
              }`}
              style={{ fontFamily: "Saira, sans-serif" }}
              onClick={() => {
                if (selectedCategory === category) {
                  setSelectedCategory(null)
                } else {
                  setSelectedCategory(category)
                }
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedDirectories.map((directory, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col h-[130px] w-full shadow-sm hover:shadow-md transition-all duration-300 hover:border-orange-200"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-800" style={{ fontFamily: "Saira, sans-serif" }}>
                  {directory.name}
                </h3>
                <button
                  className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium px-4 py-1.5 rounded-full relative overflow-hidden group shadow-sm transition-all duration-300"
                  style={{ fontFamily: "Saira, sans-serif" }}
                >
                  <span className="relative z-10">Submit</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                </button>
              </div>
              <div className="text-sm text-gray-600 flex items-center" style={{ fontFamily: "Saira, sans-serif" }}>
                <span className="font-medium text-gray-700">DR: {directory.dr}</span>
                <span className="mx-2 text-gray-400">•</span>
                <span>Traffic: {directory.traffic}</span>
                {directory.categories.length > 0 && (
                  <>
                    <span className="mx-2 text-gray-400">•</span>
                    <span>{directory.categories.join(":")}</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Show All Button */}
        {filteredDirectories.length > 12 && (
          <div className="mt-8 text-center">
            <button
              className="bg-white text-gray-800 py-3 px-8 rounded-full w-full max-w-md mx-auto border border-gray-200 hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow relative overflow-hidden group"
              style={{ fontFamily: "Saira, sans-serif" }}
              onClick={() => setShowAll(!showAll)}
            >
              <span className="relative z-10 font-medium">
                {showAll ? "Show less directories" : `Show all directories (${directories.length})`}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

