"use server"

import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!)

const platforms = ["Product Hunt", "Twitter", "LinkedIn", "LinkedIn Viral", "X Viral", "Reddit"]

const basePrompt = `
Generate a launch post for {platform} for a SaaS product named "{saasName}" with the URL {url}.

The post should include:
1. A catchy title or opening line
2. A brief description of the product
3. Key features or benefits
4. A call to action

Make the post viral, catchy, and authentic. Use no emojis and keep it professional. Write in bullet points or short paragraphs. Include a relevant quote at the beginning and a touch of humor at the end. For Reddit, ensure it doesn't look promotional and emphasize any free features or affordability.

{extraInstructions}

Tailor the content and style to be appropriate for {platform}.
`

function getExtraInstructions(platform: string) {
  switch (platform) {
    case "LinkedIn Viral":
      return "Make this post extremely engaging and shareable for a professional audience. Focus on the unique value proposition and how it solves a common industry problem."
    case "X Viral":
      return "Create a tweet thread that's highly retweetable. Use short, punchy sentences and focus on the most exciting aspects of the product. Encourage engagement and sharing."
    default:
      return ""
  }
}

export async function generateLaunchPosts(prevState: any, formData: FormData) {
  const saasName = formData.get("saasName") as string
  const url = formData.get("url") as string

  const model = genAI.getGenerativeModel({ model: "gemini-pro" })

  try {
    const results = await Promise.all(
      platforms.map(async (platform) => {
        const extraInstructions = getExtraInstructions(platform)
        const prompt = basePrompt
          .replace("{platform}", platform)
          .replace("{saasName}", saasName)
          .replace("{url}", url)
          .replace("{extraInstructions}", extraInstructions)

        const result = await model.generateContent(prompt)
        let content = result.response.text()

        // Remove ** from the generated content
        content = content.replace(/\*\*/g, "")

        return { platform, content }
      }),
    )

    return { success: true, results }
  } catch (error) {
    console.error("Error generating launch posts:", error)
    return { success: false, error: "Failed to generate launch posts. Please try again." }
  }
}

