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
    const { content } = await req.json()

    const prompt = `Generate 5 unique SEO-optimized meta descriptions (max 155 characters each) for the following content. Make them compelling and include relevant keywords. After generating, provide a brief comparison and analysis of the strengths of each description: ${content}`

    const result = await callAzureOpenAI(prompt, 1000, 0.7)

    // Parse the generated text to extract descriptions
    const descriptions = result
      .split(/\d+\.\s+/)
      .filter((d) => d.trim().length > 0)
      .map((d) => d.trim())
      .slice(0, 5)

    return new Response(JSON.stringify({ descriptions }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error: any) {
    console.error("Error in API route:", error)
    return new Response(
      JSON.stringify({
        error: "Failed to generate descriptions",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
