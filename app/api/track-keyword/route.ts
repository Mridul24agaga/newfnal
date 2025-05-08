import { OpenAI } from "openai"

const openai = new OpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY as string,
  baseURL: process.env.AZURE_OPENAI_API_BASE_PATH_GPT4O_MINI,
  defaultQuery: { "api-version": "2024-02-15-preview" },
  defaultHeaders: { "api-key": process.env.AZURE_OPENAI_API_KEY },
})

// Call Azure OpenAI
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

export async function POST(req: Request) {
  try {
    const { domain, keywords } = await req.json()

    if (!domain || !keywords || !Array.isArray(keywords) || keywords.length === 0) {
      return new Response(
        JSON.stringify({
          error: "Invalid request",
          details: "Domain and at least one keyword are required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    // Limit to 10 keywords for demo purposes
    const limitedKeywords = keywords.slice(0, 10)

    const prompt = `
    You are a keyword rank tracking tool. For the domain "${domain}", analyze the following keywords and provide realistic ranking data:
    ${limitedKeywords.join(", ")}
    
    For each keyword, provide:
    1. Current position in search results (a number between 1-100, with some variation)
    2. Position change compared to previous period (a number between -10 and +10)
    3. Monthly search volume (realistic numbers based on keyword popularity)
    4. SEO difficulty score (a number between 1-100)
    
    Format your response as a JSON array with objects containing these properties: keyword, position, change, volume, difficulty.
    Make the data realistic but varied. Some keywords should rank well, others poorly.
    `

    const result = await callAzureOpenAI(prompt, 1000, 0.7)

    try {
      // Try to parse the response as JSON
      let rankings = JSON.parse(result)

      // Ensure it's an array
      if (!Array.isArray(rankings)) {
        if (rankings.rankings && Array.isArray(rankings.rankings)) {
          rankings = rankings.rankings
        } else {
          throw new Error("Response is not in the expected format")
        }
      }

      // Validate and clean the data
      const validRankings = rankings
        .map((item: any) => ({
          keyword: String(item.keyword || ""),
          position: Number(item.position || 0),
          change: Number(item.change || 0),
          volume: Number(item.volume || 0),
          difficulty: Number(item.difficulty || 0),
          url: String(item.url || `https://${domain}`),
        }))
        .filter((item: any) => item.keyword && !isNaN(item.position))

      return new Response(JSON.stringify({ rankings: validRankings }), {
        headers: { "Content-Type": "application/json" },
      })
    } catch (parseError) {
      console.error("Error parsing OpenAI response:", parseError)
      console.log("Raw response:", result)

      // Fallback: Generate mock data if parsing fails
      const mockRankings = limitedKeywords.map((keyword) => ({
        keyword,
        position: Math.floor(Math.random() * 50) + 1,
        change: Math.floor(Math.random() * 21) - 10,
        volume: Math.floor(Math.random() * 10000) + 100,
        difficulty: Math.floor(Math.random() * 100) + 1,
        url: `https://${domain}`,
      }))

      return new Response(
        JSON.stringify({
          rankings: mockRankings,
          note: "Using fallback data due to parsing error",
        }),
        {
          headers: { "Content-Type": "application/json" },
        },
      )
    }
  } catch (error: any) {
    console.error("Error in API route:", error)
    return new Response(
      JSON.stringify({
        error: "Failed to track keywords",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
