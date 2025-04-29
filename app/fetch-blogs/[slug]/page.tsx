"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"

interface Blog {
  user_id: string
  blog_post: string
}

interface ApiResponse {
  blogs?: Blog[]
  error?: string
  message?: string
  details?: string
  debug?: string
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

  // Helper function to create a URL-friendly slug from a title
  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/--+/g, "-") // Replace multiple hyphens with single hyphen
      .trim() // Trim whitespace
  }

  // Helper function to extract a title from blog post
  const extractTitle = (blogPost: string) => {
    if (!blogPost) return "Untitled Blog"

    // Try to extract title from HTML if it exists
    const titleMatch =
      blogPost.match(/<h1[^>]*>(.*?)<\/h1>/i) ||
      blogPost.match(/<h2[^>]*>(.*?)<\/h2>/i) ||
      blogPost.match(/<h3[^>]*>(.*?)<\/h3>/i)

    if (titleMatch && titleMatch[1]) {
      return titleMatch[1]
    }

    // Try to extract from markdown headings
    const markdownHeadingMatch = blogPost.match(/^#\s+(.*?)$/m)
    if (markdownHeadingMatch && markdownHeadingMatch[1]) {
      return markdownHeadingMatch[1]
    }

    // Try to extract from bold text that might be a title
    const boldTitleMatch = blogPost.match(/\*\*(.*?)\*\*/m)
    if (
      boldTitleMatch &&
      boldTitleMatch[1] &&
      (boldTitleMatch[1].startsWith("Introduction") ||
        boldTitleMatch[1].startsWith("Overview") ||
        boldTitleMatch[1].length > 20)
    ) {
      return boldTitleMatch[1]
    }

    // Fall back to first sentence
    const firstSentence = blogPost.split(".")[0]
    return firstSentence.length > 100 ? firstSentence.substring(0, 100) + "..." : firstSentence
  }

  useEffect(() => {
    const fetchBlog = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Get the slug from the URL
        const slug = params.slug as string

        // Fetch all blogs using the hardcoded API key
        const apiKey = "a87683b6-828b-4f29-991f-69b868019e90" // Replace with your actual API key
        const response = await fetch("http://localhost:3000/api/fetch-blogs", {
          method: "GET",
          headers: {
            "x-api-key": apiKey,
            Accept: "application/json",
          },
        })

        // Parse the response as text first to inspect it
        const responseText = await response.text()
        let fetchedBlogs: Blog[] = []

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
          }
          // If no error or different error, process normally
          else {
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
        } catch (parseError) {
          // Handle JSON parse error
          throw new Error(`Failed to parse API response: ${responseText.substring(0, 100)}...`)
        }

        // Check if we have blogs
        if (fetchedBlogs.length === 0) {
          throw new Error("No blogs found in the response")
        }

        // Find the blog with a matching slug
        let foundBlog: Blog | null = null

        for (const currentBlog of fetchedBlogs) {
          const title = extractTitle(currentBlog.blog_post)
          const currentSlug = createSlug(title)

          if (currentSlug === slug) {
            foundBlog = currentBlog
            break
          }
        }

        // If no blog found with matching slug, use the first blog
        if (!foundBlog && fetchedBlogs.length > 0) {
          foundBlog = fetchedBlogs[0]
          console.log("Blog with slug not found, using first blog instead")
        }

        if (foundBlog) {
          setBlog(foundBlog)
          setFormattedContent(formatBlogContent(foundBlog.blog_post))
        } else {
          throw new Error("Blog not found")
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

  // Function to format blog content
  const formatBlogContent = (content: string) => {
    if (!content) return ""

    // Step 1: Handle markdown headings (#, ##, ###, etc.)
    content = content.replace(/^(#+)\s*(.*?)\s*$/gm, (match, hashes, text) => {
      const level = hashes.length // Number of # determines heading level
      const id = text
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
      return `<h${level} id="${id}" class="text-${4 - level + 1}xl font-bold my-6 scroll-mt-16">${text.trim()}</h${level}>`
    })

    // Step 2: Format bold text with double asterisks (**text**)
    content = content.replace(/\*\*(.*?)\*\*/g, (match, p1) => {
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
    content = content.replace(/(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)/g, "<strong>$1</strong>")

    // Step 4: Format lists
    content = content.replace(/- \*\*(.*?)\*\*: ([\s\S]*?)(?=(?:- \*\*|$))/g, (match, title, description) => {
      return `<div class="my-3">
        <strong class="block mb-1">${title}:</strong>
        <p>${description.trim()}</p>
      </div>`
    })

    // Step 5: Format bullet points
    content = content.replace(/- (.*?)(?=(?:\n|$))/g, '<li class="ml-6 list-disc my-2">$1</li>')

    // Step 6: Wrap lists in ul tags
    content = content.replace(
      /<li class="ml-6 list-disc my-2">(.*?)<\/li>\n<li class="ml-6 list-disc my-2">/g,
      '<ul class="my-4 list-disc">\n<li class="ml-6 list-disc my-2">$1</li>\n<li class="ml-6 list-disc my-2">',
    )
    content = content.replace(
      /<li class="ml-6 list-disc my-2">(.*?)<\/li>\n(?!<li)/g,
      '<li class="ml-6 list-disc my-2">$1</li>\n</ul>\n',
    )

    // Step 7: Format paragraphs
    const lines = content.split("\n")
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

  // Helper function to extract the first URL from a blog post
  const extractImageUrl = (blogPost: string) => {
    if (!blogPost) return null

    // First try to find image tags
    const imgTagMatch = blogPost.match(/<img[^>]+src="([^">]+)"/i)
    if (imgTagMatch && imgTagMatch[1]) {
      return imgTagMatch[1]
    }

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
    <div ref={topRef} className="min-h-screen bg-white py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto mb-6">
        <button
          onClick={() => router.push("/fetch-blogs")}
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

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Table of Contents Sidebar */}
          <div className="md:w-1/4 md:sticky md:top-8 md:self-start">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Table of Contents</h3>
              <TableOfContents blogContent={blog.blog_post} />
            </div>
          </div>

          {/* Main Content */}
          <div className="md:w-3/4 p-6 sm:p-10 bg-white rounded-lg shadow-sm">
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                <p className="font-medium">Error:</p>
                <p>{error}</p>
                <button onClick={() => router.push("/fetch-blogs")} className="mt-2 text-sm underline">
                  Return to blog list
                </button>
              </div>
            )}

            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800">{extractTitle(blog.blog_post)}</h1>

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
  )
}
