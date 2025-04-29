import { NextResponse } from "next/server"

export async function GET(request: Request) {
  // Get API key from environment variables in production
  // For demo purposes, we're using the hardcoded key from your component
  const apiKey = "6fecb5c6d40c1fbab21b4b130a45b99b4cc447dde964ba415996107546491ff2"

  try {
    const response = await fetch("https://getmoreseo.org/api/user-data", {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      // This is important to avoid caching issues
      cache: "no-store",
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json(
        { error: errorData?.error || `Server responded with status: ${response.status}` },
        { status: response.status },
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("API proxy error:", error)
    return NextResponse.json({ error: "Failed to fetch data from external API" }, { status: 500 })
  }
}
