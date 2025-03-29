import fs from "fs/promises"
import path from "path"

// Define the blog post type for the public-facing blog
export type BlogPost = {
  id: number
  title: string
  excerpt: string
  content?: string
  date: string
  slug: string
  image: string
}

// Define the blog post type from the API
export type ApiBlog = {
  id: string
  title: string
  blog_post: string
  scheduled_for?: string
  published_at?: string
  status?: "draft" | "scheduled" | "published"
}

const DATA_FILE_PATH = path.join(process.cwd(), "data", "blog-posts.json")
const PUBLISHED_FILE_PATH = path.join(process.cwd(), "data", "published-posts.json")

// Ensure the data directory exists
async function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), "data")
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

// Get the static blog posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  await ensureDataDirectory()

  try {
    // First, try to read the static blog posts
    const staticData = await fs.readFile(DATA_FILE_PATH, "utf-8")
    const staticPosts = JSON.parse(staticData) as BlogPost[]

    // Then, try to read the published posts
    try {
      const publishedData = await fs.readFile(PUBLISHED_FILE_PATH, "utf-8")
      const publishedPosts = JSON.parse(publishedData) as BlogPost[]

      // Combine the two arrays, with published posts taking precedence
      const combinedPosts = [...staticPosts]

      // Add published posts that aren't already in the static posts
      for (const post of publishedPosts) {
        const existingIndex = combinedPosts.findIndex((p) => p.slug === post.slug)
        if (existingIndex >= 0) {
          combinedPosts[existingIndex] = post
        } else {
          combinedPosts.push(post)
        }
      }

      // Sort by date (newest first)
      return combinedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    } catch {
      // If no published posts exist yet, just return the static posts
      return staticPosts
    }
  } catch {
    // If no data file exists yet, return the default blog posts
    const defaultPosts = [
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
      // ... other default posts
    ]

    // Save the default posts to the data file
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(defaultPosts, null, 2))
    return defaultPosts
  }
}

// Get a specific blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts()
  return posts.find((post) => post.slug === slug) || null
}

// Update the convertApiBlogToPublicPost function to ensure IDs start after 13
export function convertApiBlogToPublicPost(blog: ApiBlog, nextId?: number): BlogPost {
  // Extract the first image from the blog post if available
  const imageMatch = blog.blog_post.match(/!\[.*?\]$$(.*?)$$/)
  const image = imageMatch ? imageMatch[1] : "/placeholder.svg"

  // Extract an excerpt (first 150 characters)
  const excerpt =
    blog.blog_post
      .replace(/!\[.*?\]$$.*?$$/g, "") // Remove images
      .replace(/#{1,6}\s+/g, "") // Remove headings
      .replace(/\*\*/g, "") // Remove bold
      .replace(/\*/g, "") // Remove italic
      .slice(0, 150) + "..."

  return {
    id: nextId || Number.parseInt(blog.id, 10) + 13, // Start after ID 13
    title: blog.title,
    excerpt,
    content: blog.blog_post,
    date: blog.published_at
      ? new Date(blog.published_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
    slug: createSlug(blog.title),
    image,
  }
}

// Create a slug from a title
export function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/--+/g, "-") // Replace multiple hyphens with single hyphen
    .trim()
}

// Add a function to get the next available ID
export async function getNextAvailableId(): Promise<number> {
  const posts = await getBlogPosts()
  const maxId = posts.reduce((max, post) => Math.max(max, post.id), 0)
  return Math.max(maxId, 13) + 1
}

// Update the addPublishedPost function to ensure proper ID sequencing
export async function addPublishedPost(post: BlogPost): Promise<void> {
  await ensureDataDirectory()

  try {
    // Read existing published posts
    const data = await fs.readFile(PUBLISHED_FILE_PATH, "utf-8")
    const posts = JSON.parse(data) as BlogPost[]

    // Check if post already exists
    const existingIndex = posts.findIndex((p) => p.slug === post.slug)
    if (existingIndex >= 0) {
      posts[existingIndex] = post
    } else {
      // Ensure the ID is greater than 13 and unique
      const maxId = posts.reduce((max, p) => Math.max(max, p.id), 13)
      post.id = Math.max(post.id, maxId + 1)
      posts.push(post)
    }

    // Save the updated posts
    await fs.writeFile(PUBLISHED_FILE_PATH, JSON.stringify(posts, null, 2))
  } catch {
    // If the file doesn't exist yet, create it with the new post
    // Make sure the ID is at least 14
    post.id = Math.max(post.id, 14)
    await fs.writeFile(PUBLISHED_FILE_PATH, JSON.stringify([post], null, 2))
  }
}

