// This file simulates a database for scheduled blogs
// In a real implementation, you would use a database or persistent storage

import type { Blog } from "@/utils/blog-api"

// In-memory storage for scheduled blogs
let scheduledBlogs: Record<string, Blog & { scheduled_for: string }> = {}

// Add a blog to the scheduled list
export function schedulePost(blogId: string, blog: Blog & { scheduled_for: string }): void {
  scheduledBlogs[blogId] = blog

  // Save to localStorage if in browser environment
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("scheduledBlogs", JSON.stringify(scheduledBlogs))
    } catch (e) {
      console.error("Failed to save to localStorage:", e)
    }
  }
}

// Get all scheduled blogs
export function getScheduledBlogs(): Record<string, Blog & { scheduled_for: string }> {
  // Load from localStorage if in browser environment
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem("scheduledBlogs")
      if (saved) {
        scheduledBlogs = JSON.parse(saved)
      }
    } catch (e) {
      console.error("Failed to load from localStorage:", e)
    }
  }

  return scheduledBlogs
}

// Remove a blog from the scheduled list
export function removeScheduledBlog(blogId: string): void {
  delete scheduledBlogs[blogId]

  // Update localStorage if in browser environment
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("scheduledBlogs", JSON.stringify(scheduledBlogs))
    } catch (e) {
      console.error("Failed to save to localStorage:", e)
    }
  }
}

// Get blogs that should be published now
export function getBlogsToPublish(): Array<Blog & { scheduled_for: string }> {
  const now = new Date()
  const blogsToPublish: Array<Blog & { scheduled_for: string }> = []

  // Load from localStorage if in browser environment
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem("scheduledBlogs")
      if (saved) {
        scheduledBlogs = JSON.parse(saved)
      }
    } catch (e) {
      console.error("Failed to load from localStorage:", e)
    }
  }

  // Check each scheduled blog
  Object.entries(scheduledBlogs).forEach(([id, blog]) => {
    if (new Date(blog.scheduled_for) <= now) {
      blogsToPublish.push(blog)
      // Remove from scheduled list
      delete scheduledBlogs[id]
    }
  })

  // Update localStorage if in browser environment
  if (typeof window !== "undefined" && blogsToPublish.length > 0) {
    try {
      localStorage.setItem("scheduledBlogs", JSON.stringify(scheduledBlogs))
    } catch (e) {
      console.error("Failed to save to localStorage:", e)
    }
  }

  return blogsToPublish
}

