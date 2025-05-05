"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import type { BlogPost } from "../blogs/page"

interface SearchBarProps {
  blogPosts: BlogPost[]
}

export default function SearchBar({ blogPosts }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [searchResults, setSearchResults] = useState<BlogPost[]>([])
  const router = useRouter()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)

    if (query.length > 2) {
      // Search in titles and excerpts
      const results = blogPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(query.toLowerCase()),
      )
      setSearchResults(results)
      setShowResults(true)
    } else {
      setShowResults(false)
    }
  }

  const handleResultClick = (slug: string) => {
    router.push(`/blogs/${slug}`)
    setShowResults(false)
    setSearchQuery("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchResults.length > 0) {
      handleResultClick(searchResults[0].slug)
    }
  }

  return (
    <div className="relative max-w-xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="search"
            placeholder="Search articles..."
            className="pl-10 pr-4 py-3 h-12 rounded-full border border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50 w-full"
            value={searchQuery}
            onChange={handleSearch}
            onFocus={() => searchQuery.length > 2 && setShowResults(true)}
            onBlur={() => setTimeout(() => setShowResults(false), 200)}
          />
        </div>
      </form>

      {showResults && searchResults.length > 0 && (
        <div className="absolute mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-10 max-h-80 overflow-y-auto">
          {searchResults.map((result) => (
            <div
              key={result.id}
              className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0"
              onClick={() => handleResultClick(result.slug)}
            >
              <h4 className="font-medium text-gray-900">{result.title}</h4>
              <p className="text-sm text-gray-600 line-clamp-1">{result.excerpt}</p>
            </div>
          ))}
        </div>
      )}

      {showResults && searchResults.length === 0 && searchQuery.length > 2 && (
        <div className="absolute mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-10 p-4 text-center">
          <p className="text-gray-600">No results found for "{searchQuery}"</p>
        </div>
      )}
    </div>
  )
}
