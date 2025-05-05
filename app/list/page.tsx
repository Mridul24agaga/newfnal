"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Check, ExternalLink, Search, Sparkles, X } from "lucide-react"

// Directory data
const directories = [
  {
    id: 1,
    name: "Made with React.js",
    url: "https://madewithreactjs.com/",
    description: "Showcase of projects and applications built with React.js",
    category: "technology",
  },
  {
    id: 2,
    name: "Made with Laravel",
    url: "https://madewithlaravel.com/",
    description: "Collection of websites and applications built with Laravel",
    category: "technology",
  },
  {
    id: 3,
    name: "Made with Svelte",
    url: "https://madewithsvelte.com/",
    description: "Directory of projects built with Svelte framework",
    category: "technology",
  },
  {
    id: 4,
    name: "Startups of London",
    url: "https://startupsoflondon.com/",
    description: "Discover startups based in London with news and ecosystem reports",
    category: "startup",
  },
  {
    id: 5,
    name: "Startup Buffer",
    url: "https://startupbuffer.com/",
    description: "Resources and tools for startup founders and entrepreneurs",
    category: "startup",
  },
  {
    id: 6,
    name: "TechMap",
    url: "https://techmap.me/",
    description: "Map of tech companies and startups across different regions",
    category: "technology",
  },
  {
    id: 7,
    name: "Letter List",
    url: "https://letterlist.com/submit/",
    description: "Submit your newsletter to this curated directory",
    category: "content",
  },
  {
    id: 8,
    name: "Being Guru",
    url: "https://www.beingguru.com/submit-startup/",
    description: "Platform to submit and showcase your startup",
    category: "startup",
  },
  {
    id: 9,
    name: "Web App Rater",
    url: "https://webapprater.com/submit-your-web-application-for-review-html",
    description: "Get your web application reviewed and rated",
    category: "technology",
  },
  {
    id: 10,
    name: "The Popular Apps",
    url: "https://www.thepopularapps.com/submit-app/",
    description: "Directory for submitting and discovering popular applications",
    category: "technology",
  },
  {
    id: 11,
    name: "Startup Collections",
    url: "https://startupcollections.com/",
    description: "Curated collections of startups across various industries",
    category: "startup",
  },
  {
    id: 12,
    name: "How Brands Are Built",
    url: "https://howbrandsarebuilt.com/submit/",
    description: "Submit your brand story and branding process",
    category: "marketing",
  },
  {
    id: 13,
    name: "Indian Yellow Pages",
    url: "https://www.indianyellowpages.com/directory/",
    description: "Business directory for Indian companies and services",
    category: "business",
  },
  {
    id: 14,
    name: "Classical Finance",
    url: "https://www.classicalfinance.com/your-story/",
    description: "Share your finance-related story or business",
    category: "finance",
  },
  {
    id: 15,
    name: "Tech Faster",
    url: "http://techfaster.com/submit-your-company/",
    description: "Submit your tech company for coverage",
    category: "technology",
  },
  {
    id: 16,
    name: "ExactSeek",
    url: "https://www.exactseek.com/add.html",
    description: "Add your website to this search engine directory",
    category: "seo",
  },
  {
    id: 17,
    name: "Business Software",
    url: "https://www.business-software.com/add-your-product/",
    description: "Add your business software product to this directory",
    category: "technology",
  },
  {
    id: 18,
    name: "Thing Testing",
    url: "https://thingtesting.com/submit-brand",
    description: "Submit your brand for independent testing and reviews",
    category: "marketing",
  },
  {
    id: 19,
    name: "Startup Stash",
    url: "https://startupstash.com/",
    description: "Directory of resources and tools for startups",
    category: "startup",
  },
  {
    id: 20,
    name: "BetaList",
    url: "https://betalist.com/",
    description: "Platform for early adopters to discover upcoming startups",
    category: "startup",
  },
  {
    id: 21,
    name: "Peerlist",
    url: "https://peerlist.io/",
    description: "Professional network for tech professionals",
    category: "technology",
  },
  {
    id: 22,
    name: "Bing Places",
    url: "https://www.bingplaces.com/",
    description: "Add your business to Bing's local listings",
    category: "business",
  },
  {
    id: 23,
    name: "Unboxing Startups",
    url: "https://unboxingstartups.com/contact/",
    description: "Platform featuring startup stories and interviews",
    category: "startup",
  },
  {
    id: 24,
    name: "Springwise",
    url: "https://springwise.com/submit-an-innovation/",
    description: "Submit your innovative business idea or product",
    category: "innovation",
  },
  {
    id: 25,
    name: "All Top Startups",
    url: "https://alltopstartups.com/submit-startup/",
    description: "Submit your startup for coverage and exposure",
    category: "startup",
  },
  {
    id: 26,
    name: "Startups.co.uk",
    url: "https://startups.co.uk/contact-us/",
    description: "UK-focused startup news and resources platform",
    category: "startup",
  },
  {
    id: 27,
    name: "Startup Ranking",
    url: "https://www.startupranking.com/",
    description: "Global ranking platform for startups",
    category: "startup",
  },
  {
    id: 28,
    name: "AboutUs",
    url: "https://aboutus.com/",
    description: "Directory of websites with information about companies",
    category: "business",
  },
  {
    id: 29,
    name: "Startups.fyi",
    url: "https://www.startups.fyi/",
    description: "Curated directory of startup resources and tools",
    category: "startup",
  },
  {
    id: 30,
    name: "SaaSworthy",
    url: "https://www.saasworthy.com/",
    description: "Platform for discovering and comparing SaaS products",
    category: "technology",
  },
  {
    id: 31,
    name: "Resource.fyi",
    url: "https://resource.fyi/",
    description: "Curated collection of resources for various fields",
    category: "resources",
  },
  {
    id: 32,
    name: "Public APIs",
    url: "https://publicapis.dev/",
    description: "Directory of free and public APIs for developers",
    category: "technology",
  },
  {
    id: 33,
    name: "Joinly",
    url: "https://www.joinly.xyz/",
    description: "Platform connecting startups with potential collaborators",
    category: "startup",
  },
  {
    id: 34,
    name: "Feed My Startup",
    url: "https://feedmystartup.com/",
    description: "Resources and tools for startup growth",
    category: "startup",
  },
  {
    id: 35,
    name: "Indie Hacker Tools",
    url: "https://www.indiehacker.tools/",
    description: "Collection of tools for independent developers and entrepreneurs",
    category: "technology",
  },
  {
    id: 36,
    name: "Insanely Cool Tools",
    url: "https://insanelycooltools.com/submit-tool",
    description: "Submit your tool to this directory of useful tools",
    category: "technology",
  },
  {
    id: 37,
    name: "Micro Launch",
    url: "https://microlaunch.net/",
    description: "Platform for launching micro startups and projects",
    category: "startup",
  },
  {
    id: 38,
    name: "Tiny Startups",
    url: "https://tinystartups.com/",
    description: "Community and resources for small-scale startups",
    category: "startup",
  },
  {
    id: 39,
    name: "Business Tool Vault",
    url: "https://www.businesstoolvault.com/",
    description: "Collection of business tools and resources",
    category: "business",
  },
  {
    id: 40,
    name: "SaaS Surf",
    url: "https://saassurf.com/",
    description: "Directory of SaaS products and tools",
    category: "technology",
  },
  {
    id: 41,
    name: "Yes Ramen",
    url: "https://yesramen.com/",
    description: "Platform for discovering and sharing useful tools",
    category: "technology",
  },
  {
    id: 42,
    name: "Apps and Websites",
    url: "https://appsandwebsites.com/",
    description: "Directory of useful applications and websites",
    category: "technology",
  },
  {
    id: 43,
    name: "Handpicked Tools",
    url: "https://handpickedtools.com/",
    description: "Curated collection of useful tools and resources",
    category: "technology",
  },
  {
    id: 44,
    name: "Find Cool Tools",
    url: "https://findcool.tools/",
    description: "Directory of interesting and useful tools",
    category: "technology",
  },
  {
    id: 45,
    name: "Tally Submission",
    url: "https://tally.so/r/nGrXLj",
    description: "Submit your product or service via this Tally form",
    category: "submission",
  },
  {
    id: 46,
    name: "Prime Indies",
    url: "https://primeindies.com/",
    description: "Platform showcasing independent products and creators",
    category: "technology",
  },
  {
    id: 47,
    name: "All HR Software",
    url: "https://allhrsoftware.com/",
    description: "Directory of HR software solutions",
    category: "business",
  },
  {
    id: 48,
    name: "Once Tools",
    url: "https://once.tools/",
    description: "Collection of one-time use tools and utilities",
    category: "technology",
  },
  {
    id: 49,
    name: "Toools Design",
    url: "https://www.toools.design/",
    description: "Design tools and resources for creators",
    category: "design",
  },
  {
    id: 50,
    name: "Tool Finder",
    url: "https://toolfinder.co/submit-your-tool",
    description: "Submit your tool to this directory",
    category: "technology",
  },
  {
    id: 51,
    name: "Fazier",
    url: "https://fazier.com/",
    description: "Platform for discovering useful tools and services",
    category: "technology",
  },
  {
    id: 52,
    name: "GetByte",
    url: "https://www.getbyte.tech/",
    description: "Directory of tech tools and resources",
    category: "technology",
  },
  {
    id: 53,
    name: "Early Tools",
    url: "https://www.early.tools/submit",
    description: "Submit your early-stage tool or product",
    category: "technology",
  },
  {
    id: 54,
    name: "Startup Spotlight",
    url: "https://www.startupspotlight.co/",
    description: "Platform highlighting innovative startups",
    category: "startup",
  },
  {
    id: 55,
    name: "Best Free Tools",
    url: "https://www.bestfreetools.io/",
    description: "Collection of the best free tools available online",
    category: "technology",
  },
  {
    id: 56,
    name: "Toolfolio",
    url: "https://toolfolio.io/",
    description: "Portfolio of useful tools for various purposes",
    category: "technology",
  },
  {
    id: 57,
    name: "Extend Hunt",
    url: "https://extendhunt.com/",
    description: "Directory of browser extensions and add-ons",
    category: "technology",
  },
  {
    id: 58,
    name: "Hunted Space",
    url: "https://hunted.space/products",
    description: "Collection of hunted products and tools",
    category: "technology",
  },
  {
    id: 59,
    name: "Twelve Tools",
    url: "https://twelve.tools/",
    description: "Curated collection of twelve essential tools",
    category: "technology",
  },
  {
    id: 60,
    name: "Launching Today",
    url: "https://www.launching.today/",
    description: "Platform featuring products launching today",
    category: "technology",
  },
  {
    id: 61,
    name: "Feedback Tools",
    url: "https://feedbacktools.org/",
    description: "Collection of tools for gathering and managing feedback",
    category: "business",
  },
  {
    id: 62,
    name: "Submit Your Tools",
    url: "https://www.submityour.tools/",
    description: "Submit your tools to this directory",
    category: "technology",
  },
  {
    id: 63,
    name: "Startup Dope",
    url: "https://startupdope.com/",
    description: "News and resources for startups",
    category: "startup",
  },
  {
    id: 64,
    name: "Startup 88",
    url: "https://startup88.com/",
    description: "Platform featuring startup news and resources",
    category: "startup",
  },
  {
    id: 65,
    name: "Lazy Hunt",
    url: "https://lazyhunt.com/",
    description: "Curated collection of products and tools",
    category: "technology",
  },
  {
    id: 66,
    name: "Web That",
    url: "https://webthat.io/",
    description: "Directory of web tools and resources",
    category: "technology",
  },
  {
    id: 67,
    name: "List.ly",
    url: "https://list.ly/",
    description: "Platform for creating and sharing lists",
    category: "content",
  },
  {
    id: 68,
    name: "Tools Landing Page",
    url: "https://tools.landin.page/",
    description: "Collection of tools for creating landing pages",
    category: "marketing",
  },
  {
    id: 69,
    name: "Find The Tools",
    url: "https://findthe.tools/",
    description: "Directory to help you find the right tools",
    category: "technology",
  },
  {
    id: 70,
    name: "SaaS PO",
    url: "https://saaspo.com/submit",
    description: "Submit your SaaS product to this directory",
    category: "technology",
  },
  {
    id: 71,
    name: "SaaS Affiliates",
    url: "https://saasaffiliates.co/",
    description: "Directory of SaaS affiliate programs",
    category: "marketing",
  },
  {
    id: 72,
    name: "SaaS Refs",
    url: "https://www.saasrefs.com/",
    description: "References and reviews for SaaS products",
    category: "technology",
  },
  {
    id: 73,
    name: "Best Web Design Tools",
    url: "https://bestwebdesigntools.com/",
    description: "Collection of the best web design tools",
    category: "design",
  },
  {
    id: 74,
    name: "Affiliate For Creators",
    url: "https://affiliateforcreators.com/",
    description: "Affiliate programs for content creators",
    category: "marketing",
  },
  {
    id: 75,
    name: "Disrupt 500",
    url: "https://www.disrupt500.com/",
    description: "Platform featuring disruptive startups and technologies",
    category: "startup",
  },
  {
    id: 76,
    name: "100 Apps",
    url: "https://100apps.org/",
    description: "Collection of 100 useful applications",
    category: "technology",
  },
  {
    id: 77,
    name: "Advanced Innovation",
    url: "https://advanced-innovation.io/",
    description: "Platform showcasing innovative technologies and products",
    category: "innovation",
  },
  {
    id: 78,
    name: "Afford Hunt",
    url: "https://affordhunt.com/",
    description: "Hunt for affordable tools and products",
    category: "technology",
  },
  {
    id: 79,
    name: "AI Directory",
    url: "https://aidirectory.org/",
    description: "Directory of AI tools and resources",
    category: "ai",
  },
  {
    id: 80,
    name: "AI Marketing Directory",
    url: "https://aimarketing.directory/",
    description: "Directory of AI tools for marketing",
    category: "ai",
  },
  {
    id: 81,
    name: "AI Monstr",
    url: "https://aimonstr.com/",
    description: "Collection of powerful AI tools",
    category: "ai",
  },
  {
    id: 82,
    name: "AI Tool Mall",
    url: "https://aitoolmall.com/",
    description: "Marketplace of AI tools and services",
    category: "ai",
  },
  {
    id: 83,
    name: "AI Tools Directory",
    url: "https://aitoolsdirectory.com/",
    description: "Comprehensive directory of AI tools",
    category: "ai",
  },
  {
    id: 84,
    name: "AI Tools Masters",
    url: "https://aitoolsmasters.com/",
    description: "Curated collection of master AI tools",
    category: "ai",
  },
  {
    id: 85,
    name: "AI Wiki Tools",
    url: "https://aiwikitools.com/",
    description: "Wiki-style directory of AI tools",
    category: "ai",
  },
  {
    id: 86,
    name: "AlternativeTo",
    url: "https://alternativeto.net/",
    description: "Find alternatives to software and apps",
    category: "technology",
  },
  {
    id: 87,
    name: "Any FP",
    url: "https://anyfp.com/",
    description: "Directory of financial products and services",
    category: "finance",
  },
  {
    id: 88,
    name: "App Rater",
    url: "https://apprater.net/",
    description: "Platform for rating and reviewing apps",
    category: "technology",
  },
  {
    id: 89,
    name: "Awesome Indie",
    url: "https://awesomeindie.com/",
    description: "Collection of awesome indie products and tools",
    category: "technology",
  },
  {
    id: 90,
    name: "Awesome Marketing Websites",
    url: "https://awesomemarketingwebsites.com/",
    description: "Showcase of effective marketing websites",
    category: "marketing",
  },
  {
    id: 91,
    name: "Best of AI",
    url: "https://bestofai.com/",
    description: "Curated collection of the best AI tools",
    category: "ai",
  },
  {
    id: 92,
    name: "Browse AI",
    url: "https://brouseai.com/",
    description: "Directory of AI tools for browsing and research",
    category: "ai",
  },
  {
    id: 93,
    name: "Capterra",
    url: "https://capterra.com/",
    description: "Business software reviews and directory",
    category: "business",
  },
  {
    id: 94,
    name: "ChatGPT Demo",
    url: "https://chatgptdemo.com/",
    description: "Demonstrations of ChatGPT capabilities",
    category: "ai",
  },
  {
    id: 95,
    name: "Cloud Findr",
    url: "https://cloudfindr.co/",
    description: "Directory of cloud services and tools",
    category: "technology",
  },
  {
    id: 96,
    name: "Crazy About Startups",
    url: "https://crazyaboutstartups.com/",
    description: "Platform featuring exciting startup stories",
    category: "startup",
  },
  {
    id: 97,
    name: "Dev Pages",
    url: "https://devpages.io/",
    description: "Directory of resources for developers",
    category: "technology",
  },
  {
    id: 98,
    name: "Devpost",
    url: "https://devpost.com/",
    description: "Platform for hackathons and developer challenges",
    category: "technology",
  },
  {
    id: 99,
    name: "Easy Save AI",
    url: "https://easysaveai.com/",
    description: "AI tools for saving time and resources",
    category: "ai",
  },
  {
    id: 100,
    name: "Ecommerce Stack",
    url: "https://ecommerce-stack.com/",
    description: "Collection of tools for ecommerce businesses",
    category: "business",
  },
]

// Categories for filtering
const categories = [
  { value: "all", label: "All Categories" },
  { value: "technology", label: "Technology" },
  { value: "startup", label: "Startup" },
  { value: "marketing", label: "Marketing" },
  { value: "content", label: "Content" },
  { value: "business", label: "Business" },
  { value: "finance", label: "Finance" },
  { value: "seo", label: "SEO" },
  { value: "innovation", label: "Innovation" },
  { value: "resources", label: "Resources" },
  { value: "submission", label: "Submission" },
  { value: "design", label: "Design" },
  { value: "ai", label: "AI" },
]

// DirectoryList Component
function DirectoryList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Filter directories based on search term and category
  const filteredDirectories = directories.filter((directory) => {
    const matchesSearch =
      directory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      directory.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || directory.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div>
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search directories..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex-shrink-0">
          <select
            className="w-full p-2 border rounded-md"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDirectories.map((directory) => (
          <Card
            key={directory.id}
            className="h-full flex flex-col hover:shadow-lg transition-shadow border border-gray-200 overflow-hidden"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold text-rose-600">{directory.name}</CardTitle>
              <div className="inline-block px-2 py-1 mt-2 text-xs font-medium rounded-full bg-rose-100 text-rose-800">
                {directory.category}
              </div>
            </CardHeader>
            <CardContent className="flex-grow pb-2">
              <p className="text-gray-600">{directory.description}</p>
            </CardContent>
            <CardFooter className="pt-2">
              <Button
                asChild
                className="w-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 transition-all"
              >
                <a
                  href={directory.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  Visit Directory <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredDirectories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">No directories found matching your criteria.</p>
        </div>
      )}

      <div className="text-center mt-12">
        <p className="text-gray-500">
          Showing {filteredDirectories.length} of {directories.length} directories
        </p>
        <p className="text-gray-500 mt-2">Get access to all 400+ directories with our premium list</p>
      </div>
    </div>
  )
}

// InterestPopup Component
function InterestPopup() {
  const scrollToPricing = () => {
    const pricingSection = document.getElementById("pricing-section")
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <Button
      size="lg"
      className="bg-white text-rose-600 hover:bg-gray-100 hover:text-rose-700 shadow-lg transition-all"
      onClick={scrollToPricing}
    >
      Want the Full List?
    </Button>
  )
}

// ScrollPopup Component
function ScrollPopup() {
  const [showPopup, setShowPopup] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show popup when user scrolls down 30% of the page height
      if (!dismissed && window.scrollY > window.innerHeight * 0.3) {
        setShowPopup(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [dismissed])

  const handleDismiss = () => {
    setShowPopup(false)
    setDismissed(true)
  }

  const scrollToPricing = () => {
    const pricingSection = document.getElementById("pricing-section")
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" })
    }
    setShowPopup(false)
    setDismissed(true)
  }

  if (!showPopup) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-in fade-in duration-300">
      <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-auto p-8 animate-in zoom-in-95 duration-300">
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close popup"
        >
          <X size={24} />
        </button>

        <div className="text-center">
          <div className="bg-gradient-to-r from-rose-500 to-orange-500 text-white p-4 rounded-lg mb-6">
            <div className="flex items-center justify-center mb-2">
              <Sparkles className="h-6 w-6 mr-2" />
              <h3 className="text-xl font-bold">SPECIAL OFFER</h3>
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-3">Want the FULL 400+ Directory List?</h3>
          <p className="text-gray-600 mb-6 text-lg">
            Get our premium directory with 4x more listings, updated monthly!
          </p>

          <Button
            onClick={scrollToPricing}
            className="w-full py-6 text-lg bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all"
          >
            <Sparkles className="mr-2 h-5 w-5" /> Get Premium Access
          </Button>

          <p className="mt-4 text-sm text-gray-500">One-time payment of $50 for lifetime access</p>
        </div>
      </div>
    </div>
  )
}

// PremiumOfferCard Component
function PremiumOfferCard() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [showPaymentForm, setShowPaymentForm] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the payment process
    // For now, we'll just show a success message
    alert("Thank you for your purchase! We'll send the full list to your email shortly.")
  }

  return (
    <Card className="w-full max-w-md shadow-xl border-0 transform hover:scale-105 transition-transform duration-300">
      <CardHeader className="bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-t-lg">
        <div className="flex items-center justify-center mb-2">
          <Sparkles className="h-6 w-6 mr-2" />
          <CardTitle className="text-2xl text-center">Premium Directory List</CardTitle>
        </div>
        <CardDescription className="text-white text-center text-lg font-medium mt-2">
          $50 One-time Payment
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 bg-gradient-to-b from-white to-gray-50 rounded-b-lg">
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
              <Check className="h-4 w-4 text-green-600" />
            </div>
            <p>
              <span className="font-semibold">400+ curated directory listings</span> - 4x more than the free list
            </p>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
              <Check className="h-4 w-4 text-green-600" />
            </div>
            <p>
              <span className="font-semibold">Monthly updates</span> with new directories
            </p>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
              <Check className="h-4 w-4 text-green-600" />
            </div>
            <p>
              <span className="font-semibold">Categorized by industry</span> and submission type
            </p>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
              <Check className="h-4 w-4 text-green-600" />
            </div>
            <p>
              <span className="font-semibold">Submission tips</span> for higher acceptance rates
            </p>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
              <Check className="h-4 w-4 text-green-600" />
            </div>
            <p>
              <span className="font-semibold">Priority email support</span> for any questions
            </p>
          </div>
        </div>

        {!showPaymentForm ? (
          <Button
            className="w-full mt-8 py-6 text-lg bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all border-0"
            onClick={() => setShowPaymentForm(true)}
          >
            <Sparkles className="mr-2 h-5 w-5" /> Get Full 400+ Directory List
          </Button>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="card">Card Information</Label>
              <Input id="card" placeholder="1234 5678 9012 3456" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" placeholder="MM/YY" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" placeholder="123" required />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full py-6 text-lg bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all border-0"
            >
              Pay $50 and Get 400+ Directories
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}

// Main Page Component
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-rose-500 to-orange-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-md">100+ Free Updated Directory Listing</h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
            Submit your startup, tool, or project to these directories to gain visibility and traction
          </p>
          <div className="flex justify-center space-x-4">
            <InterestPopup />
            <Button
              size="lg"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-rose-600 transition-all shadow-lg"
              onClick={() => {
                const directorySection = document.querySelector(".container h2")
                if (directorySection) {
                  directorySection.scrollIntoView({ behavior: "smooth" })
                }
              }}
            >
              Browse Directories
            </Button>
          </div>
        </div>
      </section>

      {/* Directory Listings */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-12">Browse Directories</h2>
        <DirectoryList />
      </section>

      {/* Premium Offer */}
      <section id="pricing-section" className="container mx-auto px-4 py-16 bg-gray-100 rounded-lg my-12">
        <h2 className="text-3xl font-bold text-center mb-4">Want the Full 400+ Directory List?</h2>
        <p className="text-xl text-center text-gray-600 mb-12">Get 4x more directories with our premium package</p>
        <div className="flex justify-center">
          <PremiumOfferCard />
        </div>
      </section>

      {/* Scroll Popup */}
      <ScrollPopup />
    </div>
  )
}
