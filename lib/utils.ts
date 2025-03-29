import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Extract the first image URL from a markdown string
export function extractImageFromMarkdown(markdown: string): string {
  const imageMatch = markdown.match(/!\[.*?\]$$(.*?)$$/)
  return imageMatch ? imageMatch[1] : "/placeholder.svg"
}

// Create an excerpt from markdown content
export function createExcerpt(markdown: string, length = 150): string {
  return (
    markdown
      .replace(/!\[.*?\]$$.*?$$/g, "") // Remove images
      .replace(/#{1,6}\s+/g, "") // Remove headings
      .replace(/\*\*/g, "") // Remove bold
      .replace(/\*/g, "") // Remove italic
      .slice(0, length) + "..."
  )
}

