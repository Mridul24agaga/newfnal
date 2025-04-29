"use client"

import { useState, useCallback, useEffect } from "react"
import Link from "next/link"

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

export default function FetchBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [error, setError] = useState<string | null>(null)
  const [debugMessage, setDebugMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Hardcoded API key
  const apiKey = "a87683b6-828b-4f29-991f-69b868019e90" // Replace with your actual API key

  const fetchBlogs = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    setDebugMessage(null)

    try {
      const response = await fetch("http://localhost:3000/api/fetch-blogs", {
        method: "GET",
        headers: {
          "x-api-key": apiKey,
          Accept: "application/json",
        },
      })

      // Parse the response as text first to inspect it
      const responseText = await response.text()

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
            setBlogs(result.blogs)
            setDebugMessage(`Found ${result.blogs.length} blogs in the error response`)
          } else {
            setError("Error response doesn't contain blogs data")
            setDebugMessage(JSON.stringify(result))
          }
        }
        // If no error or different error, process normally
        else {
          if (!response.ok) {
            throw new Error(`API error: ${result.error || "Unknown error"}`)
          }

          // Handle different response formats
          if (Array.isArray(result)) {
            setBlogs(result)
          } else if (result.blogs && Array.isArray(result.blogs)) {
            setBlogs(result.blogs)
          } else if (typeof result === "object" && result.blog_post) {
            setBlogs([result])
          } else {
            setError("Unexpected response format")
            setDebugMessage(JSON.stringify(result))
          }
        }
      } catch (parseError) {
        // Handle JSON parse error
        throw new Error(`Failed to parse API response: ${responseText.substring(0, 100)}...`)
      }
    } catch (err) {
      console.error("Error fetching blogs:", err)
      setError(err instanceof Error ? err.message : "Something went wrong!")
      setBlogs([])
      setDebugMessage("Check browser console for more details")
    } finally {
      setIsLoading(false)
    }
  }, [apiKey])

  // Auto-fetch blogs when component mounts
  useEffect(() => {
    fetchBlogs()
  }, [fetchBlogs])

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

  // Helper function to clean blog post content (remove asterisks)
  const cleanContent = (blogPost: string) => {
    if (!blogPost) return ""
    return blogPost.replace(/\*/g, "")
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
          <p className="font-medium">Error:</p>
          <p>{error}</p>
        </div>
      )}

      {debugMessage && (
        <div className="mb-4 bg-blue-50 border border-blue-200 text-blue-700 p-4 rounded-lg">
          <p className="font-medium">Debug Info:</p>
          <p className="text-sm font-mono whitespace-pre-wrap">{debugMessage}</p>
        </div>
      )}

      <div className="mb-6 flex justify-end">
        <button
          onClick={fetchBlogs}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
        >
          {isLoading ? "Loading..." : "Refresh Blogs"}
        </button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 opacity-60 animate-pulse">
              <div className="h-48 bg-gray-200 rounded-t-lg"></div>
              <div className="p-5 border-b border-gray-100">
                <div className="h-6 bg-gray-200 rounded"></div>
              </div>
              <div className="p-5">
                <div className="h-24 bg-gray-100 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.length > 0 ? (
            blogs.map((blog, index) => {
              const imageUrl = extractImageUrl(blog.blog_post)
              const cleanedBlogPost = cleanContent(blog.blog_post)
              const title = extractTitle(blog.blog_post)
              const slug = createSlug(title)

              return (
                <Link href={`/fetch-blogs/${slug}`} key={index} className="transition-transform hover:scale-[1.02]">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full cursor-pointer hover:shadow-md transition-shadow">
                    <div className="h-48 relative overflow-hidden rounded-t-lg">
                      {imageUrl ? (
                        <img
                          src={imageUrl || "/placeholder.svg"}
                          alt="Blog image"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // If image fails to load, replace with placeholder
                            e.currentTarget.src = `https://via.placeholder.com/800x400?text=Image`
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                          <span>No image</span>
                        </div>
                      )}
                    </div>
                    <div className="p-5 border-b border-gray-100">
                      <h3 className="text-lg font-semibold">{title}</h3>
                    </div>
                    <div className="p-5">
                      <p className="text-gray-500 line-clamp-3">{cleanedBlogPost || "No content available"}</p>
                    </div>
                  </div>
                </Link>
              )
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No blogs found</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
