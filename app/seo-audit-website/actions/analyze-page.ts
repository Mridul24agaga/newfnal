"use server"

import { OpenAI } from "openai"
import { load } from "cheerio"

// Initialize Azure OpenAI with your exact configuration
const openai = new OpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY as string,
  baseURL: process.env.AZURE_OPENAI_API_BASE_PATH_GPT4O_MINI,
  defaultQuery: { "api-version": "2024-02-15-preview" },
  defaultHeaders: { "api-key": process.env.AZURE_OPENAI_API_KEY },
})

function extractImportantContent(html: string): string {
  const $ = load(html)
  const content = {
    title: $("title").text(),
    description: $('meta[name="description"]').attr("content") || "",
    headings: [] as string[],
    mainContent: [] as string[],
    buttons: [] as string[],
    navigation: [] as string[],
  }

  // Extract headings
  $("h1, h2, h3").each((_, el) => {
    content.headings.push($(el).text().trim())
  })

  // Extract main content paragraphs
  $("p").each((_, el) => {
    const text = $(el).text().trim()
    if (text.length > 20) {
      content.mainContent.push(text)
    }
  })

  // Extract button text
  $('button, a.button, .btn, [role="button"]').each((_, el) => {
    content.buttons.push($(el).text().trim())
  })

  // Extract navigation items
  $("nav a, header a").each((_, el) => {
    content.navigation.push($(el).text().trim())
  })

  return JSON.stringify(content, null, 2)
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
async function callAzureOpenAI(prompt: string, maxTokens: number, temperature = 0.8): Promise<string> {
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

export default analyzeLandingPage

export async function analyzeLandingPage(url: string) {
  try {
    // Fetch the content of the URL
    const pageResponse = await fetch(url)
    const html = await pageResponse.text()

    // Extract important content
    const content = extractImportantContent(html)

    const prompt = `As an expert web analyst, analyze this landing page content and provide feedback.
Return ONLY a valid JSON object with exactly this structure (no additional text or formatting):
{
  "Messaging": {
    "score": <number between 0-100>,
    "feedback": "<single string with analysis>",
    "recommendations": ["<recommendation 1>", "<recommendation 2>"]
  },
  "Readability": {
    "score": <number between 0-100>,
    "feedback": "<single string with analysis>",
    "recommendations": ["<recommendation 1>", "<recommendation 2>"]
  },
  "Structure": {
    "score": <number between 0-100>,
    "feedback": "<single string with analysis>",
    "recommendations": ["<recommendation 1>", "<recommendation 2>"]
  },
  "Actionability": {
    "score": <number between 0-100>,
    "feedback": "<single string with analysis>",
    "recommendations": ["<recommendation 1>", "<recommendation 2>"]
  },
  "Design": {
    "score": <number between 0-100>,
    "feedback": "<single string with analysis>",
    "recommendations": ["<recommendation 1>", "<recommendation 2>"]
  },
  "Credibility": {
    "score": <number between 0-100>,
    "feedback": "<single string with analysis>",
    "recommendations": ["<recommendation 1>", "<recommendation 2>"]
  }
}

Analyze this content: ${content}`

    // Generate content with Azure OpenAI
    const generatedText = await callAzureOpenAI(prompt, 2000, 0.7)

    if (!generatedText) {
      throw new Error("Failed to generate analysis")
    }

    // Clean and parse the JSON response
    const cleanedJson = cleanJsonString(generatedText)

    let parsedAnalysis: any
    try {
      parsedAnalysis = JSON.parse(cleanedJson)
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError)
      console.error("Generated Text:", generatedText)
      console.error("Cleaned JSON:", cleanedJson)
      throw new Error("Failed to parse analysis results. Invalid JSON format received.")
    }

    // Validate the parsed analysis structure
    const requiredCategories = ["Messaging", "Readability", "Structure", "Actionability", "Design", "Credibility"]
    for (const category of requiredCategories) {
      if (
        !parsedAnalysis[category] ||
        typeof parsedAnalysis[category].score !== "number" ||
        typeof parsedAnalysis[category].feedback !== "string" ||
        !Array.isArray(parsedAnalysis[category].recommendations)
      ) {
        throw new Error(`Invalid analysis format: Missing or invalid ${category} category`)
      }
    }

    const results = Object.entries(parsedAnalysis).map(([category, data]: [string, any]) => ({
      category,
      score: Math.min(100, Math.max(0, Math.round(data.score))), // Ensure score is between 0-100
      feedback: data.feedback,
      recommendations: data.recommendations,
    }))

    const overallScore = Math.round(results.reduce((sum, result) => sum + result.score, 0) / results.length)

    const analysisData = {
      results,
      metadata: {
        url,
        score: overallScore,
        date: new Date().toISOString(),
      },
    }

    return analysisData
  } catch (error) {
    console.error("Error in analysis:", error)
    throw new Error("An error occurred during analysis: " + (error as Error).message)
  }
}
