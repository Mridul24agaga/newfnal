"use server"

import { OpenAI } from "openai"
import { load } from "cheerio"
import type { SeoAuditResult } from "@/app/types/seo"

// Initialize Azure OpenAI with your exact configuration
const openai = new OpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY as string,
  baseURL: process.env.AZURE_OPENAI_API_BASE_PATH_GPT4O_MINI,
  defaultQuery: { "api-version": "2024-02-15-preview" },
  defaultHeaders: { "api-key": process.env.AZURE_OPENAI_API_KEY },
})

function extractSeoData(html: string): string {
  const $ = load(html)
  const seoData = {
    // Basic page info
    url: $('link[rel="canonical"]').attr("href") || "",
    title: $("title").text(),
    metaDescription: $('meta[name="description"]').attr("content") || "",
    metaKeywords: $('meta[name="keywords"]').attr("content") || "",

    // Headings
    h1: $("h1")
      .map((_, el) => $(el).text().trim())
      .get(),
    h2: $("h2")
      .map((_, el) => $(el).text().trim())
      .get(),
    h3: $("h3")
      .map((_, el) => $(el).text().trim())
      .get(),

    // Content
    wordCount: $("body").text().trim().split(/\s+/).length,
    paragraphs: $("p")
      .map((_, el) => $(el).text().trim())
      .get(),

    // Images
    images: $("img")
      .map((_, el) => ({
        src: $(el).attr("src") || "",
        alt: $(el).attr("alt") || "",
        hasAlt: $(el).attr("alt") ? true : false,
      }))
      .get(),

    // Links
    internalLinks: $("a[href^='/'], a[href^='" + $('link[rel="canonical"]').attr("href") + "']")
      .map((_, el) => $(el).attr("href"))
      .get(),
    externalLinks: $("a[href^='http']")
      .filter(
        (_, el) =>
          !$(el)
            .attr("href")
            ?.includes($('link[rel="canonical"]').attr("href") || ""),
      )
      .map((_, el) => $(el).attr("href"))
      .get(),

    // Technical SEO elements
    hasHttps: $('link[rel="canonical"]').attr("href")?.startsWith("https") || false,
    hasSitemap: $('link[rel="sitemap"]').length > 0 || $('a[href*="sitemap.xml"]').length > 0,
    hasRobotsTxt: $('a[href*="robots.txt"]').length > 0,
    hasSchema: $('script[type="application/ld+json"]').length > 0,

    // Mobile friendliness indicators
    hasViewport: $('meta[name="viewport"]').length > 0,
    hasMobileSpecificMeta:
      $('meta[name="apple-mobile-web-app-capable"]').length > 0 || $('meta[name="mobile-web-app-capable"]').length > 0,

    // Social media
    hasOpenGraph: $('meta[property^="og:"]').length > 0,
    hasTwitterCards: $('meta[name^="twitter:"]').length > 0,
  }

  return JSON.stringify(seoData, null, 2)
}

function cleanJsonString(str: string): string {
  // Remove any markdown code block syntax
  str = str.replace(/```json\n?|\n?```/g, "")

  // Remove any potential line breaks within the JSON
  str = str.replace(/\n/g, " ")

  // Fix common JSON formatting issues
  str = str.replace(/,\s*}/g, "}") // Remove trailing commas
  str = str.replace(/,\s*]/g, "]") // Remove trailing commas in arrays

  // Ensure proper quote usage
  str = str.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?\s*:/g, '"$2": ')

  return str.trim()
}

// Call Azure OpenAI with your exact implementation
async function callAzureOpenAI(prompt: string, maxTokens: number, temperature = 0.7): Promise<string> {
  try {
    console.log(`Calling OpenAI: ${prompt.slice(0, 100)}${prompt.length > 100 ? "..." : ""}`)

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4o-mini",
      max_tokens: maxTokens,
      temperature: temperature,
      n: 1,
    })
    const result = completion.choices[0]?.message?.content || ""
    const sanitizedResult = result.replace(/\$1/g, "").trim()
    if (sanitizedResult !== result) {
      console.warn(`Sanitized '$1' from OpenAI response: ${sanitizedResult.slice(0, 200)}...`)
    }
    return sanitizedResult
  } catch (error: any) {
    console.error("Error calling Azure OpenAI:", error.message)
    return `Fallback: Couldn't generate this part due to ${error.message}. Let's roll with what we've got!`
  }
}

export default performSeoAudit

export async function performSeoAudit(url: string): Promise<SeoAuditResult> {
  try {
    // Fetch the content of the URL
    const pageResponse = await fetch(url)
    const html = await pageResponse.text()

    // Extract SEO data
    const seoData = extractSeoData(html)

    const prompt = `As an expert SEO analyst, perform a comprehensive SEO audit on this website data.
Return ONLY a valid JSON object with exactly this structure (no additional text or formatting):
{
  "results": [
    {
      "category": "Meta Tags",
      "score": <number between 0-100>,
      "feedback": "<single string with analysis of title, meta description, etc.>",
      "recommendations": ["<recommendation 1>", "<recommendation 2>", "<recommendation 3>"]
    },
    {
      "category": "Content",
      "score": <number between 0-100>,
      "feedback": "<single string with analysis of content quality, length, etc.>",
      "recommendations": ["<recommendation 1>", "<recommendation 2>", "<recommendation 3>"]
    },
    {
      "category": "Headings",
      "score": <number between 0-100>,
      "feedback": "<single string with analysis of heading structure>",
      "recommendations": ["<recommendation 1>", "<recommendation 2>", "<recommendation 3>"]
    },
    {
      "category": "Keywords",
      "score": <number between 0-100>,
      "feedback": "<single string with analysis of keyword usage>",
      "recommendations": ["<recommendation 1>", "<recommendation 2>", "<recommendation 3>"]
    },
    {
      "category": "Images",
      "score": <number between 0-100>,
      "feedback": "<single string with analysis of image optimization>",
      "recommendations": ["<recommendation 1>", "<recommendation 2>", "<recommendation 3>"]
    },
    {
      "category": "Structure",
      "score": <number between 0-100>,
      "feedback": "<single string with analysis of URL structure, internal linking, etc.>",
      "recommendations": ["<recommendation 1>", "<recommendation 2>", "<recommendation 3>"]
    },
    {
      "category": "Mobile Friendliness",
      "score": <number between 0-100>,
      "feedback": "<single string with analysis of mobile optimization>",
      "recommendations": ["<recommendation 1>", "<recommendation 2>", "<recommendation 3>"]
    },
    {
      "category": "Page Speed",
      "score": <number between 0-100>,
      "feedback": "<single string with analysis of potential page speed issues>",
      "recommendations": ["<recommendation 1>", "<recommendation 2>", "<recommendation 3>"]
    },
    {
      "category": "Security",
      "score": <number between 0-100>,
      "feedback": "<single string with analysis of HTTPS, etc.>",
      "recommendations": ["<recommendation 1>", "<recommendation 2>", "<recommendation 3>"]
    },
    {
      "category": "Actionability",
      "score": <number between 0-100>,
      "feedback": "<single string with analysis of calls to action, conversion potential>",
      "recommendations": ["<recommendation 1>", "<recommendation 2>", "<recommendation 3>"]
    },
    {
      "category": "Credibility",
      "score": <number between 0-100>,
      "feedback": "<single string with analysis of trust signals, about page, contact info, etc.>",
      "recommendations": ["<recommendation 1>", "<recommendation 2>", "<recommendation 3>"]
    }
  ],
  "summary": {
    "good": <number of categories with score >= 70>,
    "needsImprovement": <number of categories with score 40-69>,
    "critical": <number of categories with score < 40>
  },
  "priorityActions": {
    "high": ["<critical action 1>", "<critical action 2>", "<critical action 3>"],
    "medium": ["<important action 1>", "<important action 2>", "<important action 3>"],
    "low": ["<minor action 1>", "<minor action 2>", "<minor action 3>"]
  }
}

Analyze this SEO data: ${seoData}`

    // Generate content with Azure OpenAI
    const generatedText = await callAzureOpenAI(prompt, 2500, 0.7)

    if (!generatedText) {
      throw new Error("Failed to generate SEO audit")
    }

    // Clean and parse the JSON response
    const cleanedJson = cleanJsonString(generatedText)

    let parsedAudit: any
    try {
      parsedAudit = JSON.parse(cleanedJson)
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError)
      console.error("Generated Text:", generatedText)
      console.error("Cleaned JSON:", cleanedJson)
      throw new Error("Failed to parse audit results. Invalid JSON format received.")
    }

    // Validate the parsed audit structure
    if (!parsedAudit.results || !Array.isArray(parsedAudit.results)) {
      throw new Error("Invalid audit format: Missing or invalid results array")
    }

    // Calculate overall score
    const overallScore = Math.round(
      parsedAudit.results.reduce((sum: number, result: any) => sum + result.score, 0) / parsedAudit.results.length,
    )

    // Ensure scores are between 0-100
    parsedAudit.results = parsedAudit.results.map((result: any) => ({
      ...result,
      score: Math.min(100, Math.max(0, Math.round(result.score))),
    }))

    // Create the final audit data
    const auditData: SeoAuditResult = {
      results: parsedAudit.results,
      summary: parsedAudit.summary,
      priorityActions: parsedAudit.priorityActions,
      metadata: {
        url,
        score: overallScore,
        date: new Date().toISOString(),
      },
    }

    return auditData
  } catch (error) {
    console.error("Error in SEO audit:", error)
    throw new Error("An error occurred during the SEO audit: " + (error as Error).message)
  }
}
