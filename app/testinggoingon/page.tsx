"use client"

import { useEffect, useState } from "react"

type Blog = {
  id: string
  title: string
  blog_post: string
}

type HeadlineToBlog = {
  id: string
  headline: string
  blog_text: string
}

export default function BlogFetcher() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [headlines, setHeadlines] = useState<HeadlineToBlog[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const apiKey = "fed9f03d6beec0ff8e30172a46672dab99c1f43981ca33c237a146f4cabd06f8"

  useEffect(() => {
    const fetchData = async () => {
      // Create an AbortController for timeout handling
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout

      try {
        setLoading(true)
        const res = await fetch("http://localhost:3000/api/user-data", {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          signal: controller.signal,
        })

        clearTimeout(timeoutId) // Clear the timeout if fetch completes

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}))
          throw new Error(errData?.error || `API error: ${res.status} ${res.statusText}`)
        }

        const data = await res.json()
        setBlogs(data.blogs || [])
        setHeadlines(data.headlinetoblog || [])
        setError(null)
      } catch (err) {
        if (err instanceof Error) {
          if (err.name === "AbortError") {
            setError("Request timed out. Please try again later.")
          } else if (err.message.includes("Failed to fetch")) {
            setError("Network error. Please check your connection and try again.")
          } else {
            setError(err.message || "An unexpected error occurred.")
          }
          console.error("Error fetching data:", err.message)
        } else {
          setError("An unexpected error occurred.")
          console.error("Unknown error:", err)
        }
      } finally {
        setLoading(false)
        clearTimeout(timeoutId) // Ensure timeout is cleared
      }
    }

    fetchData()
  }, [apiKey])

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="bg-white rounded-lg shadow-md p-4 overflow-hidden">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6 mb-2 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
    </div>
  )

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Blogs</h1>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <LoadingSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="text-xl font-semibold">{blog.title}</h2>
              </div>
              <div className="p-4">
                <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: blog.blog_post }} />
              </div>
            </div>
          ))}
        </div>
      )}

      <h1 className="text-3xl font-bold mt-12 mb-6">Headlines</h1>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={`headline-${i}`} className="bg-blue-50 rounded-lg shadow-md p-4 overflow-hidden">
              <div className="h-5 bg-blue-100 rounded w-2/3 mb-4 animate-pulse"></div>
              <div className="h-4 bg-blue-100 rounded w-full mb-2 animate-pulse"></div>
              <div className="h-4 bg-blue-100 rounded w-5/6 animate-pulse"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {headlines.map((headline) => (
            <div key={headline.id} className="bg-blue-50 rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b border-blue-100">
                <h3 className="text-lg font-semibold">{headline.headline}</h3>
              </div>
              <div className="p-4">
                <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: headline.blog_text }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
