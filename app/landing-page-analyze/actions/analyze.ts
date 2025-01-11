'use server'

import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'

interface AnalysisResult {
  category: string;
  score: number;
  feedback: string;
  recommendations: string[];
}

interface AnalysisResponse {
  results: AnalysisResult[];
  contentSuggestion: string;
}

export async function analyzeLandingPage(inputType: 'url' | 'content', input: string, userId: string) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key is not configured')
  }

  let content = input
  
  if (inputType === 'url') {
    try {
      const response = await fetch(input)

      if (!response.ok) {
        throw new Error(`Failed to fetch URL (${response.status} ${response.statusText})`)
      }

      content = await response.text()
    } catch (error) {
      throw new Error(`Unable to access the URL. Please verify the URL is correct and publicly accessible.`)
    }
  }

  try {
    const response = await generateText({
      model: openai('gpt-4o'),
      prompt: `Analyze this landing page content and provide scores (0-100) and feedback:
      
      ${content.substring(0, 8000)}
      
      Format the response as JSON with this structure:
      {
        "results": [
          {
            "category": "Category Name",
            "score": 0,
            "feedback": "Analysis details",
            "recommendations": ["Recommendation 1", "Recommendation 2"]
          }
        ],
        "contentSuggestion": "Overall suggestion"
      }`
    })

    let analysisResult: AnalysisResponse;

    try {
      // Remove Markdown code block syntax if present
      const jsonString = response.text.replace(/^```json\n|\n```$/g, '').trim()
      analysisResult = JSON.parse(jsonString)
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', response.text)
      throw new Error('Invalid response format from OpenAI API')
    }
    
    if (!Array.isArray(analysisResult.results)) {
      console.error('Invalid analysis results format:', analysisResult)
      throw new Error('Invalid analysis results format')
    }

    const overallScore = Math.round(
      analysisResult.results.reduce((sum: number, item: AnalysisResult) => sum + item.score, 0) / 
      analysisResult.results.length
    )

    return {
      results: analysisResult.results,
      contentSuggestion: analysisResult.contentSuggestion,
      metadata: {
        url: inputType === 'url' ? input : null,
        score: overallScore,
        date: new Date().toISOString()
      }
    }
  } catch (error) {
    console.error('Error in analyzeLandingPage:', error)
    if (error instanceof Error) {
      throw new Error(`Failed to analyze the landing page: ${error.message}`)
    } else {
      throw new Error('Failed to analyze the landing page. Please try again.')
    }
  }
}

