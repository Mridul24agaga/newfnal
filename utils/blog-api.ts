import slugify from "slugify"

export type Blog = {
  id: string
  title: string
  blog_post: string
  scheduled_for?: string
  published_at?: string
  status?: "draft" | "scheduled" | "published"
  slug?: string
  image?: string
}

// Function to create a slug from a title
export function createSlug(title: string): string {
  return slugify(title, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g,
  })
}

// Function to extract the first image URL from HTML content
export function extractFirstImage(htmlContent: string, defaultImage = "/brain.png"): string {
  if (!htmlContent) {
    return defaultImage
  }

  // Look for img tags with src attribute
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/i
  const match = htmlContent.match(imgRegex)

  if (match && match[1]) {
    // If the image URL is relative, keep it as is
    // If it's absolute (starts with http), use it directly
    return match[1]
  }

  // No image found, return the provided default image
  return defaultImage
}

// Function to extract a clean excerpt from HTML content
export function extractExcerpt(htmlContent: string, maxLength = 150): string {
  if (!htmlContent) {
    return ""
  }

  // Simple regex to remove HTML tags
  const text = htmlContent.replace(/<[^>]*>/g, "").trim()
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "..."
  }
  return text
}

// Format date to a readable string
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Function to fetch blogs from the API
export async function fetchBlogs(apiKey: string): Promise<Blog[]> {
  try {
    const res = await fetch("https://blogosocial.com/api/user-blogs", {
      headers: { Authorization: `Bearer ${apiKey}` },
      cache: "no-store", // Disable caching to always get fresh data
    })

    if (!res.ok) {
      throw new Error(`Error fetching blogs: ${res.status}`)
    }

    const blogs: Blog[] = await res.json()

    return blogs
  } catch (error) {
    console.error("Error fetching blogs:", error)
    return []
  }
}

// Function to fetch a single blog by slug
export async function fetchBlogBySlug(slug: string, apiKey: string): Promise<Blog | null> {
  try {
    const blogs = await fetchBlogs(apiKey)

    // Find the blog with the matching slug
    // Since the API doesn't support slug lookup directly, we need to create slugs from titles
    return blogs.find((blog) => blog.slug === slug || createSlug(blog.title) === slug) || null
  } catch (error) {
    console.error("Error fetching blog by slug:", error)
    return null
  }
}

