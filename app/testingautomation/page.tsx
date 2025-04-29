"use client"

import { useEffect, useState } from "react"

// Define types for our data structures
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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // Use our Next.js API route instead of calling the external API directly
        const res = await fetch("/api/proxy")

        // Handle error responses
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}))
          throw new Error(errData?.error || `Server responded with status: ${res.status}`)
        }

        // Process successful response
        const data = await res.json()
        setBlogs(data.blogs || [])
        setHeadlines(data.headlinetoblog || [])
        setError("")
      } catch (err) {
        console.error("API request failed:", err)
        setError(err instanceof Error ? err.message : "Unexpected error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Render loading state
  if (loading) {
    return <div className="p-8 text-center">Loading your content...</div>
  }

  // Render error state
  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
          <h2 className="text-lg font-bold mb-2">Error</h2>
          <p>{error}</p>
          <p className="mt-2 text-sm">
            Please check your API key and try again. If the problem persists, contact support.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Blogs</h1>

      {/* Display blogs */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold mb-3">{blog.title}</h2>
            <div className="prose prose-sm" dangerouslySetInnerHTML={{ __html: blog.blog_post }} />
          </div>
        ))}
        {blogs.length === 0 && <p className="text-gray-500 col-span-full">No blogs found.</p>}
      </div>

      <h1 className="text-2xl font-bold mb-6">Headlines</h1>

      {/* Display headlines */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {headlines.map((headline) => (
          <div key={headline.id} className="bg-blue-50 p-6 rounded-lg shadow-md border border-blue-100">
            <h3 className="text-lg font-semibold mb-3">{headline.headline}</h3>
            <div className="prose prose-sm" dangerouslySetInnerHTML={{ __html: headline.blog_text }} />
          </div>
        ))}
        {headlines.length === 0 && <p className="text-gray-500 col-span-full">No headlines found.</p>}
      </div>
    </div>
  )
}
