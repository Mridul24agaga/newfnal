import fs from "fs/promises"
import path from "path"

const DATA_FILE_PATH = path.join(process.cwd(), "data", "blog-posts.json")
const PUBLISHED_FILE_PATH = path.join(process.cwd(), "data", "published-posts.json")

// Get the next available ID for blog posts (ensuring it's greater than 13)
export async function getNextAvailableId(): Promise<number> {
  let maxId = 13 // Start with 13 as the minimum

  try {
    // Check static blog posts
    try {
      const staticData = await fs.readFile(DATA_FILE_PATH, "utf-8")
      const staticPosts = JSON.parse(staticData)

      // Find the maximum ID in static posts
      for (const post of staticPosts) {
        if (post.id > maxId) {
          maxId = post.id
        }
      }
    } catch (error) {
      // If file doesn't exist or can't be read, continue with current maxId
      console.log("No static blog posts found or error reading file")
    }

    // Check published blog posts
    try {
      const publishedData = await fs.readFile(PUBLISHED_FILE_PATH, "utf-8")
      const publishedPosts = JSON.parse(publishedData)

      // Find the maximum ID in published posts
      for (const post of publishedPosts) {
        if (post.id > maxId) {
          maxId = post.id
        }
      }
    } catch (error) {
      // If file doesn't exist or can't be read, continue with current maxId
      console.log("No published blog posts found or error reading file")
    }

    // Return the next available ID (max + 1)
    return maxId + 1
  } catch (error) {
    console.error("Error getting next available ID:", error)
    // If any error occurs, return 14 as the safe default (after ID 13)
    return 14
  }
}

// Update the ID reference in an existing blog post
export async function updateBlogPostId(slug: string, newId: number): Promise<boolean> {
  try {
    // Check published blog posts
    const publishedData = await fs.readFile(PUBLISHED_FILE_PATH, "utf-8")
    const publishedPosts = JSON.parse(publishedData)

    // Find the post by slug
    const postIndex = publishedPosts.findIndex((post: any) => post.slug === slug)

    if (postIndex !== -1) {
      // Update the ID
      publishedPosts[postIndex].id = newId

      // Save the updated posts
      await fs.writeFile(PUBLISHED_FILE_PATH, JSON.stringify(publishedPosts, null, 2))
      return true
    }

    return false
  } catch (error) {
    console.error("Error updating blog post ID:", error)
    return false
  }
}

