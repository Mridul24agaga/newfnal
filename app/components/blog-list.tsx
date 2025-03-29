"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import { extractImageFromMarkdown } from "@/lib/utils"

type Blog = {
  id: string
  title: string
  blog_post: string
  scheduled_for?: string
  published_at?: string
  status?: "draft" | "scheduled" | "published"
}

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const apiKey = "568feb6f19a409d73c11de7e3ce5cd702aca55a4590f5ccd9c4f89e92ec1c6a9"

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    setLoading(true)
    try {
      const res = await fetch("http://localhost:3000/api/user-blogs", {
        headers: { Authorization: `Bearer ${apiKey}` },
      })

      if (!res.ok) {
        throw new Error(`Error fetching blogs: ${res.status}`)
      }

      const data = await res.json()
      setBlogs(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch blogs")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  function createSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/--+/g, '-') // Replace multiple hyphens with single hyphen
      .trim()
  }

  if (loading) return <div className="text-center p-8">Loading blogs...</div>
  if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Blogs</h1>

      {blogs.length === 0 ? (
        <p className="text-center p-8 text-gray-500">No blogs found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div key={blog.id} className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-4 border-b">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold">{blog.title}</h2>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(blog)}`}>
                    {getStatusText(blog)}
                  </span>
                </div>

                {blog.scheduled_for && (
                  <div className="flex items-center text-sm text-gray-500 mt-2">
                    <span>Scheduled for: {formatDate(blog.scheduled_for)}</span>
                  </div>
                )}

                {blog.published_at && (
                  <div className="flex items-center text-sm text-gray-500 mt-2">
                    <span>Published: {formatDate(blog.published_at)}</span>
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="prose prose-sm max-h-40 overflow-hidden relative">
                  <ReactMarkdown>{blog.blog_post}</ReactMarkdown>
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent"></div>
                </div>
              </div>

              <div className="p-4 border-t flex justify-between">
                <Link 
                  href={`/blog/${createSlug(blog.title)}`}
                  className="px-4 py-2 border rounded hover:bg-gray-50"
                >
                  Read More
                </Link>

                {!blog.published_at && !blog.scheduled_for && (
                  <button
                    className="px-4 py-2 border rounded hover:bg-gray-50"
                    onClick={() => schedulePost(blog.id)}
                  >
                    Schedule Post
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  // Helper functions
  function getStatusClass(blog: Blog) {
    if (blog.status === "published" || blog.published_at) {
      return "bg-green-100 text-green-800"
    } else if (blog.status === "scheduled" || blog.scheduled_for) {
      return "bg-blue-100 text-blue-800"
    } else {
      return "bg-gray-100 text-gray-800"
    }
  }

  function getStatusText(blog: Blog) {
    if (blog.status === "published" || blog.published_at) {
      return "Published"
    } else if (blog.status === "scheduled" || blog.scheduled_for) {
      return "Scheduled"
    } else {
      return "Draft"
    }
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  async function schedulePost(blogId: string) {
    try {
      // Schedule the post for tomorrow
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrow.setHours(9, 0, 0, 0) // 9:00 AM

      const response = await fetch(`http://localhost:3000/api/schedule-blog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          blogId,
          scheduledFor: tomorrow.toISOString()
        })
      })

      if (!response.ok) {
        throw new Error('Failed to schedule post')
      }

      // Refresh the blog list
      fetchBlogs()
    } catch (error) {
      console.error('Error scheduling post:', error)
      alert('Failed to schedule post. Please try again.')
    }
  }
}
