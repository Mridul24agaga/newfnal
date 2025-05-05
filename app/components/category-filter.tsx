"use client"

import { useState, useEffect } from "react"
import type { BlogPost } from "../blogs/page"

interface CategoryFilterProps {
  categories: string[]
  blogPosts: BlogPost[]
  postCategories: Record<number, string>
}

export default function CategoryFilter({ categories, blogPosts, postCategories }: CategoryFilterProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  useEffect(() => {
    // Filter blog posts when category changes
    if (activeCategory) {
      // Get all blog post elements
      const blogElements = document.querySelectorAll("article[data-category]")

      blogElements.forEach((element) => {
        const category = element.getAttribute("data-category")

        if (category === activeCategory) {
          element.classList.remove("hidden")
        } else {
          element.classList.add("hidden")
        }
      })
    } else {
      // Show all posts when no category is selected
      const blogElements = document.querySelectorAll("article[data-category]")
      blogElements.forEach((element) => {
        element.classList.remove("hidden")
      })
    }
  }, [activeCategory])

  const handleCategoryClick = (category: string) => {
    if (activeCategory === category) {
      // If clicking the active category, clear the filter
      setActiveCategory(null)
    } else {
      setActiveCategory(category)
    }
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <button
        className={`px-4 py-2 rounded-full transition-colors ${
          activeCategory === null
            ? "bg-orange-500 text-white hover:bg-orange-600"
            : "border border-gray-300 text-gray-700 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200"
        }`}
        onClick={() => setActiveCategory(null)}
      >
        All Topics
      </button>

      {categories.map((category) => (
        <button
          key={category}
          className={`px-4 py-2 rounded-full transition-colors ${
            activeCategory === category
              ? "bg-orange-500 text-white hover:bg-orange-600"
              : "border border-gray-300 text-gray-700 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200"
          }`}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
