"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import Footer from "@/app/components/footer"

// Helper function to extract a title from blog post and remove asterisks
const extractTitle = (blogPost: string) => {
  if (!blogPost) return "Untitled Blog"

  // Remove asterisks from the blog post
  const cleanBlogPost = blogPost.replace(/\*/g, "")

  // Extract first sentence or first 50 characters as title
  const firstSentence = cleanBlogPost.split(".")[0]
  return firstSentence.length > 50 ? firstSentence.substring(0, 50) + "..." : firstSentence
}

// Helper function to create a URL-friendly slug from a title
const createSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/--+/g, "-") // Replace multiple hyphens with single hyphen
    .trim() // Trim whitespace
}

// Helper function to extract the first URL from a blog post
const extractImageUrl = (blogPost: string) => {
  if (!blogPost) return null

  // Regular expression to match URLs
  const urlRegex = /(https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|webp))/i
  const match = blogPost.match(urlRegex)

  if (match && match[0]) {
    return match[0]
  }

  // If no image URL found, try to find any URL
  const generalUrlRegex = /(https?:\/\/[^\s]+)/i
  const generalMatch = blogPost.match(generalUrlRegex)

  if (generalMatch && generalMatch[0]) {
    return generalMatch[0]
  }

  return null
}

// Static blog posts data
const staticBlogPosts = [
  {
    id: 1,
    title: "Top 10 Software Listing Websites for New Startups in 2025",
    excerpt:
      "Discover the most effective platforms to showcase your startup and automate your directory submissions...",
    date: "December 15, 2024",
    slug: "top-10-software-listing-websites-2025",
    image: "/brain.png",
  },
  {
    id: 2,
    title: "Automatic Directory Submission: How AI is Changing the Game",
    excerpt:
      "Learn how artificial intelligence is revolutionizing the way startups build their online presence through automated directory submissions...",
    date: "December 14, 2024",
    slug: "automatic-directory-submission-ai-revolution",
    image: "/aig.jpg",
  },
  {
    id: 3,
    title: "What Are PBN Links and Their Role in SEO? A Comprehensive Guide",
    excerpt:
      "Learn about Private Blog Networks (PBNs), their impact on SEO, associated risks, and better alternatives for building quality backlinks.",
    date: "December 10, 2024",
    slug: "what-are-pbn-links-and-their-role-in-seo",
    image: "/private.png",
  },
  {
    id: 4,
    title: "How to Analyze Competitors Backlinks for SEO Success: Complete Guide",
    excerpt:
      "Learn how to effectively analyze your competitors backlinks, uncover valuable link building opportunities, and strengthen your SEO strategy with our comprehensive guide.",
    date: "December 9, 2024",
    slug: "how-to-analyze-competitors-backlinks-for-seo-success",
    image: "/analyze.png",
  },
  {
    id: 5,
    title: "How to Create an Effective SEO Client Report Using GetMoreBacklinks",
    excerpt:
      "Learn how to create comprehensive and impactful SEO client reports using GetMoreBacklinks. Discover best practices, key components, and the role of AI in directory submissions.",
    date: "December 8, 2024",
    slug: "how-to-create-an-effective-seo-client-report-using-getmorebacklinks",
    image: "/getmorebacklinkss.webp",
  },
  {
    id: 6,
    title: "SEO Reporting for Agencies: How GetMoreBacklinks Can Help You Streamline Your SEO Efforts",
    excerpt:
      "Discover how GetMoreBacklinks can help agencies streamline SEO reporting, automate backlink management, and enhance overall SEO strategies.",
    date: "December 7, 2024",
    slug: "seo-reporting-for-agencies-how-getmorebacklinks-can-streamline-your-efforts",
    image: "/backlink-checker.webp",
  },
  {
    id: 7,
    title: "Step-by-Step: How to Build Quality Backlinks with AI-Powered Tools",
    excerpt:
      "Learn how to leverage AI-powered tools for building high-quality backlinks. Discover automated directory submissions, personalized outreach, and advanced analytics for better SEO results.",
    date: "December 6, 2024",
    slug: "step-by-step-how-to-build-quality-backlinks-with-ai-powered-tools",
    image: "/backlinks.webp",
  },
  {
    id: 8,
    title: "The Future of Directory Submissions: AI and Automation in SEO",
    excerpt:
      "Explore how AI and automation are revolutionizing directory submissions and SEO strategies for startups and small businesses.",
    date: "December 5, 2024",
    slug: "the-future-directory-submission-ai-and-automation-in-seo",
    image: "/ai-seo-future.webp",
  },
  {
    id: 9,
    title: "The Ultimate Guide to Automated Directory Submission: Save Time and Boost Your SEO",
    excerpt:
      "Learn how automated directory submission can streamline your SEO strategy. Discover step-by-step implementation, benefits, and best practices for startups and SaaS founders.",
    date: "December 3, 2024",
    slug: "ultimate-guide-to-automated-directory-submission",
    image: "/directory.png",
  },
  {
    id: 10,
    title: "The Ultimate Guide to Listing Bots: Automate Your Startups Online Presence",
    excerpt:
      "Learn how to automate your directory submissions and boost your startups online visibility with listing bots. Comprehensive guide including tools, strategies, and best practices.",
    date: "December 3, 2024",
    slug: "ultimate-guide-to-listing-bots",
    image: "/content.png",
  },
  {
    id: 11,
    title: "Why SaaS Founders Cant Ignore Directory Listings in Their Marketing Strategy",
    excerpt:
      "Learn how directory listings can bolster visibility, SEO performance, and long-term growth for SaaS companies. Discover key benefits and implementation strategies.",
    date: "December 3, 2024",
    slug: "why-saas-founders-cant-ignore-directory-listings-in-their-marketing-strategy",
    image: "/saas-marketing.webp",
  },
  {
    id: 12,
    title: "The Smart Startup's Guide: How Affiliate Programs and SEO Create Sustainable SaaS Growth",
    excerpt:
      "Learn how directory listings can bolster visibility, SEO performance, and long-term growth for SaaS companies. Discover key benefits and implementation strategies.",
    date: "January 9, 2025",
    slug: "the-smart-startup-guide-how-affilate-programs-and-seo-create-sustainable-saas-growth",
    image: "/blog1png.png",
  },
  {
    id: 13,
    title: "Stop Chasing Trends: Build a Real Growth Game Plan",
    excerpt:
      "Discover sustainable business growth strategies that create long-term success instead of short-lived wins.",
    date: "March 10th, 2025",
    slug: "link-building-on-a-budget-get-results-without-breaking-the-rank",
    image: "/123.png",
  },
]

interface Blog {
  user_id?: string
  blog_post?: string
  title?: string
  excerpt?: string
  date?: string
  image?: string
  id?: number
  slug?: string
}

// Table of Contents component
const TableOfContents = ({ blogContent }: { blogContent: string }) => {
  // Extract headings from the blog content
  const extractHeadings = (content: string) => {
    const headings: { level: number; text: string; id: string }[] = []

    // First pass: Extract markdown headings (#, ##, ###)
    const headingRegex = /^(#+)\s*(.*?)\s*$/gm
    let match

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length
      const text = match[2].trim()
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
      headings.push({ level, text, id })
    }

    // Second pass: Extract bold text that might be headings
    const boldHeadingRegex = /\*\*(.*?)\*\*/g
    const contentCopy = content
    while ((match = boldHeadingRegex.exec(contentCopy)) !== null) {
      const text = match[1].trim()
      // Only include if it looks like a heading (starts with numbers or specific words)
      if (
        text.match(/^\d+\./) ||
        text.startsWith("Conclusion") ||
        text.startsWith("FAQ") ||
        text.startsWith("Introduction") ||
        text.startsWith("Summary") ||
        text.startsWith("Overview")
      ) {
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")

        // Check if this heading is already in our list (to avoid duplicates)
        if (!headings.some((h) => h.id === id)) {
          headings.push({ level: 2, text, id })
        }
      }
    }

    // Sort headings by their position in the document
    headings.sort((a, b) => {
      const posA = content.indexOf(a.text)
      const posB = content.indexOf(b.text)
      return posA - posB
    })

    return headings
  }

  const headings = extractHeadings(blogContent || "")

  if (headings.length === 0) {
    return <p className="text-gray-500 italic">No sections found</p>
  }

  return (
    <nav className="toc">
      <ul className="space-y-2 text-sm">
        {headings.map((heading, index) => (
          <li
            key={index}
            className={`${
              heading.level === 1 ? "font-bold" : heading.level === 2 ? "pl-2" : heading.level === 3 ? "pl-4" : "pl-6"
            }`}
          >
            <a
              href={`#${heading.id}`}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 block py-1"
              onClick={(e) => {
                e.preventDefault()
                const element = document.getElementById(heading.id)
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" })
                  // Update URL without refreshing the page
                  window.history.pushState(null, "", `#${heading.id}`)
                }
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default function BlogPost() {
  const params = useParams()
  const router = useRouter()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formattedContent, setFormattedContent] = useState<string>("")
  const topRef = useRef<HTMLDivElement>(null)

  // Function to format blog content
  const formatBlogContent = (content: string) => {
    if (!content) return ""

    // Step 1: Handle markdown headings (#, ##, ###, etc.)
    let formatted = content.replace(/^(#+)\s*(.*?)\s*$/gm, (match, hashes, text) => {
      const level = hashes.length // Number of # determines heading level
      const id = text
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
      return `<h${level} id="${id}" class="text-${4 - level + 1}xl font-bold my-6 scroll-mt-16">${text.trim()}</h${level}>`
    })

    // Step 2: Format bold text with double asterisks (**text**)
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, (match, p1) => {
      // Check if it looks like a heading
      if (
        p1.match(/^\d+\./) ||
        p1.startsWith("Conclusion") ||
        p1.startsWith("FAQ") ||
        p1.startsWith("Introduction") ||
        p1.startsWith("Summary") ||
        p1.startsWith("Overview")
      ) {
        const id = p1
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
        return `<h2 id="${id}" class="text-2xl font-bold my-5 scroll-mt-16">${p1}</h2>`
      }
      return `<strong>${p1}</strong>`
    })

    // Step 3: Format bold text with single asterisks (*text*)
    formatted = formatted.replace(/(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)/g, "<strong>$1</strong>")

    // Step 4: Format lists
    formatted = formatted.replace(/- \*\*(.*?)\*\*: ([\s\S]*?)(?=(?:- \*\*|$))/g, (match, title, description) => {
      return `<div class="my-3">
        <strong class="block mb-1">${title}:</strong>
        <p>${description.trim()}</p>
      </div>`
    })

    // Step 5: Format bullet points
    formatted = formatted.replace(/- (.*?)(?=(?:\n|$))/g, '<li class="ml-6 list-disc my-2">$1</li>')

    // Step 6: Wrap lists in ul tags
    formatted = formatted.replace(
      /<li class="ml-6 list-disc my-2">(.*?)<\/li>\n<li class="ml-6 list-disc my-2">/g,
      '<ul class="my-4 list-disc">\n<li class="ml-6 list-disc my-2">$1</li>\n<li class="ml-6 list-disc my-2">',
    )
    formatted = formatted.replace(
      /<li class="ml-6 list-disc my-2">(.*?)<\/li>\n(?!<li)/g,
      '<li class="ml-6 list-disc my-2">$1</li>\n</ul>\n',
    )

    // Step 7: Format paragraphs
    const lines = formatted.split("\n")
    let formattedContent = ""
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      if (
        line &&
        !line.startsWith("<h") &&
        !line.startsWith("<ul") &&
        !line.startsWith("<li") &&
        !line.startsWith("<div") &&
        !line.startsWith("<p") &&
        !line.startsWith("</")
      ) {
        formattedContent += `<p class="my-4">${line}</p>\n`
      } else {
        formattedContent += line + "\n"
      }
    }

    // Step 8: Format Q&A in FAQ section
    formattedContent = formattedContent.replace(
      /\*\*Q\d+: (.*?)\*\*/g,
      '<h3 class="text-xl font-semibold mt-6 mb-2">$1</h3>',
    )

    // Step 9: Format image tags
    formattedContent = formattedContent.replace(/<img([^>]*)>/gi, '<img$1 class="rounded-lg max-w-full my-4">')

    // Step 10: Format links
    formattedContent = formattedContent.replace(
      /<a([^>]*)>/gi,
      '<a$1 class="text-blue-600 hover:text-blue-800 underline">',
    )

    return formattedContent
  }

  useEffect(() => {
    const fetchBlog = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Get the slug from the URL
        const slug = params.slug as string

        // First, check if the blog exists in static blogs
        const staticBlog = staticBlogPosts.find((blog) => blog.slug === slug)

        if (staticBlog) {
          setBlog(staticBlog)
          // Static blogs don't have blog_post; use excerpt or placeholder content
          setFormattedContent(
            formatBlogContent(staticBlog.excerpt || "Full content for this blog post will be available soon.")
          )
          setIsLoading(false)
          return
        }

        // If not found in static blogs, fetch from the API
        const apiKey = "351f7b8a-f756-47cb-a44d-b37420d54516" // Replace with your actual API key
        const response = await fetch("https://www.getmoreseo.org/api/fetch-blogs", {
          method: "GET",
          headers: {
            "x-api-key": apiKey,
            Accept: "application/json",
          },
        })

        // Parse the response as text first to inspect it
        const responseText = await response.text()
        let fetchedBlogs: any[] = []

        try {
          // Try to parse the response as JSON
          const result = JSON.parse(responseText)

          // Check if the result contains an error about multiple rows
          if (
            result.error &&
            typeof result.error === "string" &&
            result.error.includes("multiple (or no) rows returned")
          ) {
            // If the error contains blogs data, use it
            if (result.blogs && Array.isArray(result.blogs)) {
              fetchedBlogs = result.blogs
            }
          } else {
            // If no error or different error, process normally
            if (!response.ok) {
              throw new Error(`API error: ${result.error || "Unknown error"}`)
            }

            // Handle different response formats
            if (Array.isArray(result)) {
              fetchedBlogs = result
            } else if (result.blogs && Array.isArray(result.blogs)) {
              fetchedBlogs = result.blogs
            } else if (typeof result === "object" && result.blog_post) {
              fetchedBlogs = [result]
            }
          }

          // Find the blog with a matching slug
          let foundBlog: any = null

          for (const currentBlog of fetchedBlogs) {
            const title = extractTitle(currentBlog.blog_post || "")
            const currentSlug = createSlug(title)

            if (currentSlug === slug) {
              foundBlog = currentBlog
              break
            }
          }

          if (foundBlog) {
            setBlog(foundBlog)
            setFormattedContent(formatBlogContent(foundBlog.blog_post || ""))
          } else {
            throw new Error("Blog not found")
          }
        } catch (parseError) {
          // Handle JSON parse error
          throw new Error(`Failed to parse API response: ${responseText.substring(0, 100)}...`)
        }
      } catch (err) {
        console.error("Error fetching blog:", err)
        setError(err instanceof Error ? err.message : "Something went wrong!")
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlog()
  }, [params.slug])

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollButton = document.getElementById("scroll-top-button")
      if (scrollButton) {
        if (window.scrollY > 300) {
          scrollButton.classList.remove("hidden")
        } else {
          scrollButton.classList.add("hidden")
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading blog post...</p>
        </div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="max-w-md mx-auto">
          <div className="text-center p-8">
            <div className="h-12 w-12 text-gray-400 mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Blog post not found</h2>
            <p className="text-gray-600">The blog post you're looking for doesn't exist or has been removed.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 relative bg-white z-10">
        <div className="container mx-auto px-4">
          <div className="h-16 sm:h-20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/getmorepacklinks.png"
                alt="getmorebacklinks"
                width={100}
                height={32}
                className="h-6 sm:h-8 w-auto"
              />
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                href="/blogs"
                className="text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Blogs
              </Link>
              <Link
                href="/auth-form"
                className="text-xs sm:text-sm font-medium text-white bg-[#F36516] hover:bg-[#E55505] transition-colors px-4 py-2 rounded-full"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div ref={topRef} className="flex-grow py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto mb-6">
          <button
            onClick={() => router.push("/blogs")}
            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Back to Blogs
          </button>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col gap-8">
            {/* Main Content */}
            <div className="w-full p-6 sm:p-10 bg-white rounded-lg shadow-sm">
              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                  <p className="font-medium">Error:</p>
                  <p>{error}</p>
                  <button onClick={() => router.push("/blogs")} className="mt-2 text-sm underline">
                    Return to blog list
                  </button>
                </div>
              )}

              <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800">
                {blog.title || (blog.blog_post ? extractTitle(blog.blog_post) : "Untitled Blog")}
              </h1>

              {blog.date && (
                <div className="mb-6">
                  <time className="text-sm text-gray-500" dateTime={blog.date}>
                    {blog.date}
                  </time>
                </div>
              )}

              {/* Blog Content */}
              <div
                className="prose prose-gray max-w-none
                prose-headings:font-bold prose-headings:text-gray-800
                prose-p:text-gray-700 prose-p:leading-relaxed
                prose-a:text-blue-600 prose-a:underline prose-a:hover:text-blue-800
                prose-strong:font-bold prose-strong:text-gray-800
                prose-img:w-full prose-img:rounded-lg prose-img:max-w-full
                prose-ul:pl-6 prose-ul:my-6 prose-ul:space-y-1
                prose-li:mb-2 prose-li:text-gray-700"
                dangerouslySetInnerHTML={{ __html: formattedContent }}
              />
            </div>
          </div>
        </div>

        {/* Scroll to top button */}
        <button
          id="scroll-top-button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 hidden"
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
        </button>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}