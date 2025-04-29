"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Calendar, User, ArrowRight, Clock } from "lucide-react"

interface Blog {
  id: string
  user_id: string
  blog_post: string
  title?: string
  created_at?: string
}

interface ApiResponse {
  blogs?: Blog[]
  error?: string
  message?: string
  details?: string
  debug?: string
}

// Function to create a slug from a title
const createSlug = (title: string): string => {
  return title
    ? title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "") // Remove special characters
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/--+/g, "-") // Replace multiple hyphens with single hyphen
    : "untitled-blog"
}

// Function to extract a preview from blog content
const extractPreview = (content: string, maxLength = 150): string => {
  // Remove any HTML tags
  const plainText = content.replace(/<[^>]*>/g, "")

  // Truncate to maxLength
  if (plainText.length <= maxLength) return plainText

  // Find the last space before maxLength to avoid cutting words
  const lastSpace = plainText.substring(0, maxLength).lastIndexOf(" ")
  return plainText.substring(0, lastSpace > 0 ? lastSpace : maxLength) + "..."
}

// Function to estimate reading time
const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200
  const plainText = content.replace(/<[^>]*>/g, "")
  const words = plainText.split(/\s+/).length
  return Math.max(1, Math.ceil(words / wordsPerMinute))
}

// BlogCard component for displaying a blog preview
function BlogCard({ blog }: { blog: Blog }) {
  const router = useRouter()

  // Generate slug from title
  const slug = createSlug(blog.title || "untitled-blog")

  // Format date if available
  const formattedDate = blog.created_at
    ? new Date(blog.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null

  // Extract preview text
  const preview = extractPreview(blog.blog_post)

  // Calculate reading time
  const readingTime = calculateReadingTime(blog.blog_post)

  // Handle card click
  const handleCardClick = () => {
    router.push(`/blogs/${slug}?id=${blog.id}`)
  }

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
    >
      {/* Card header with gradient */}
      <div className="h-3 bg-gradient-to-r from-indigo-600 to-purple-600"></div>

      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{blog.title || "Untitled Blog"}</h3>

        {/* Meta information */}
        <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4 gap-3">
          <div className="flex items-center">
            <User className="h-3.5 w-3.5 mr-1.5" />
            <span>{blog.user_id}</span>
          </div>

          {formattedDate && (
            <div className="flex items-center">
              <Calendar className="h-3.5 w-3.5 mr-1.5" />
              <span>{formattedDate}</span>
            </div>
          )}

          <div className="flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1.5" />
            <span>{readingTime} min read</span>
          </div>
        </div>

        {/* Preview text */}
        <p className="text-gray-600 mb-4 line-clamp-3">{preview}</p>

        {/* Read more button */}
        <div className="flex justify-end">
          <span className="inline-flex items-center text-indigo-600 font-medium text-sm">
            Read more <ArrowRight className="h-4 w-4 ml-1" />
          </span>
        </div>
      </div>
    </div>
  )
}

// Main FetchBlogs component
export default function FetchBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [error, setError] = useState<string | null>(null)
  const [debugMessage, setDebugMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Replace with your actual API key
  const API_KEY = "your-api-key-here"

  const fetchBlogs = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    setDebugMessage(null)

    try {
      // In a real app, you would use an environment variable for the API URL
      const response = await fetch("http://localhost:3000/api/fetch-blogs", {
        method: "GET",
        headers: {
          "x-api-key": API_KEY,
        },
      })

      const result: ApiResponse = await response.json()

      if (!response.ok) {
        throw new Error(`${result.error || "Failed to fetch blogs"}: ${result.details || ""}`)
      }

      if (result.blogs && result.blogs.length > 0) {
        setBlogs(result.blogs)
      } else {
        // Sample blogs for demonstration
        const sampleBlogs: Blog[] = [
          {
            id: "1",
            user_id: "user123",
            title: "Getting Started with Next.js",
            blog_post:
              "# Introduction to Next.js\n\nNext.js is a React framework that enables server-side rendering and static site generation. It's a powerful tool for building modern web applications.\n\n## Key Features\n\n- **Server-Side Rendering**: Renders pages on the server for better SEO and performance.\n- **Static Site Generation**: Pre-renders pages at build time for even better performance.\n- **API Routes**: Create API endpoints easily within your Next.js app.\n\n## Getting Started\n\nTo start a new Next.js project, run:\n\n```bash\nnpx create-next-app my-app\n```\n\n**Conclusion**\n\nNext.js makes it easy to build production-ready React applications with great developer experience.",
            created_at: new Date().toISOString(),
          },
          {
            id: "2",
            user_id: "user456",
            title: "Understanding React Hooks",
            blog_post:
              "# React Hooks Explained\n\nReact Hooks are functions that let you use state and other React features without writing a class component.\n\n## Common Hooks\n\n- **useState**: Adds state to functional components\n- **useEffect**: Handles side effects in functional components\n- **useContext**: Accesses context in functional components\n\n## Custom Hooks\n\nYou can create your own hooks to reuse stateful logic between components.\n\n```jsx\nfunction useCounter(initialValue = 0) {\n  const [count, setCount] = useState(initialValue);\n  \n  const increment = () => setCount(count + 1);\n  const decrement = () => setCount(count - 1);\n  \n  return { count, increment, decrement };\n}\n```\n\n**Conclusion**\n\nHooks make it easier to reuse stateful logic and organize code by related functionality rather than lifecycle methods.",
            created_at: new Date(Date.now() - 86400000).toISOString(), // Yesterday
          },
          {
            id: "3",
            user_id: "user789",
            title: "CSS Grid Layout: A Complete Guide",
            blog_post:
              "# Mastering CSS Grid Layout\n\nCSS Grid Layout is a two-dimensional layout system designed for user interface design.\n\n## Grid Basics\n\n- **Grid Container**: The element with `display: grid`\n- **Grid Items**: Direct children of the grid container\n- **Grid Lines**: The dividing lines that make up the grid\n\n## Creating a Grid\n\n```css\n.container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-gap: 20px;\n}\n```\n\n## Placing Items\n\nYou can place items precisely using grid-column and grid-row properties.\n\n```css\n.item {\n  grid-column: 1 / 3;\n  grid-row: 2 / 4;\n}\n```\n\n**FAQ**\n\n**Q1: Is CSS Grid supported in all browsers?**\n\nCSS Grid is supported in all modern browsers including Edge, Firefox, Chrome, Safari, and Opera.",
            created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          },
        ]
        setBlogs(sampleBlogs)
        setDebugMessage("Using sample blogs for demonstration")
      }
    } catch (err) {
      console.error("Error fetching blogs:", err)
      setError(err instanceof Error ? err.message : "Something went wrong!")

      // For demonstration, add sample blogs even on error
      const sampleBlogs: Blog[] = [
        {
          id: "1",
          user_id: "user123",
          title: "Getting Started with Next.js",
          blog_post:
            "# Introduction to Next.js\n\nNext.js is a React framework that enables server-side rendering and static site generation. It's a powerful tool for building modern web applications.\n\n## Key Features\n\n- **Server-Side Rendering**: Renders pages on the server for better SEO and performance.\n- **Static Site Generation**: Pre-renders pages at build time for even better performance.\n- **API Routes**: Create API endpoints easily within your Next.js app.\n\n## Getting Started\n\nTo start a new Next.js project, run:\n\n```bash\nnpx create-next-app my-app\n```\n\n**Conclusion**\n\nNext.js makes it easy to build production-ready React applications with great developer experience.",
          created_at: new Date().toISOString(),
        },
        {
          id: "2",
          user_id: "user456",
          title: "Understanding React Hooks",
          blog_post:
            "# React Hooks Explained\n\nReact Hooks are functions that let you use state and other React features without writing a class component.\n\n## Common Hooks\n\n- **useState**: Adds state to functional components\n- **useEffect**: Handles side effects in functional components\n- **useContext**: Accesses context in functional components\n\n## Custom Hooks\n\nYou can create your own hooks to reuse stateful logic between components.\n\n```jsx\nfunction useCounter(initialValue = 0) {\n  const [count, setCount] = useState(initialValue);\n  \n  const increment = () => setCount(count + 1);\n  const decrement = () => setCount(count - 1);\n  \n  return { count, increment, decrement };\n}\n```\n\n**Conclusion**\n\nHooks make it easier to reuse stateful logic and organize code by related functionality rather than lifecycle methods.",
          created_at: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        },
        {
          id: "3",
          user_id: "user789",
          title: "CSS Grid Layout: A Complete Guide",
          blog_post:
            "# Mastering CSS Grid Layout\n\nCSS Grid Layout is a two-dimensional layout system designed for user interface design.\n\n## Grid Basics\n\n- **Grid Container**: The element with `display: grid`\n- **Grid Items**: Direct children of the grid container\n- **Grid Lines**: The dividing lines that make up the grid\n\n## Creating a Grid\n\n```css\n.container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-gap: 20px;\n}\n```\n\n## Placing Items\n\nYou can place items precisely using grid-column and grid-row properties.\n\n```css\n.item {\n  grid-column: 1 / 3;\n  grid-row: 2 / 4;\n}\n```\n\n**FAQ**\n\n**Q1: Is CSS Grid supported in all browsers?**\n\nCSS Grid is supported in all modern browsers including Edge, Firefox, Chrome, Safari, and Opera.",
          created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        },
      ]
      setBlogs(sampleBlogs)
      setDebugMessage("Using sample blogs for demonstration (API error occurred)")
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Fetch blogs when component mounts
  useEffect(() => {
    fetchBlogs()
  }, [fetchBlogs])

  return (
    <div className="container">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
        Blog Posts
      </h1>
      <p className="text-gray-500 mt-1">Explore our collection of articles and tutorials</p>

      {isLoading ? (
        <div className="mt-12 flex justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
            <p className="text-gray-600">Loading blog posts...</p>
          </div>
        </div>
      ) : (
        <>
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-lg text-red-600 text-center">{error}</div>
          )}

          {debugMessage && (
            <div className="mt-2 p-3 bg-gray-50 border border-gray-100 rounded-lg text-gray-600 text-center text-sm">
              <span className="font-semibold">Debug:</span> {debugMessage}
            </div>
          )}

          {blogs.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {blogs.length} Blog Post{blogs.length !== 1 ? "s" : ""}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog, index) => (
                  <BlogCard key={index} blog={blog} />
                ))}
              </div>
            </div>
          )}

          {blogs.length === 0 && !error && (
            <div className="mt-12 text-center p-8 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No blog posts found</h3>
              <p className="text-gray-600">Check back later for new content</p>
            </div>
          )}
        </>
      )}

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
      `}</style>
    </div>
  )
}
