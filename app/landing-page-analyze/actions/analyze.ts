'use server'

import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const MAX_CONTENT_LENGTH = 8000

export async function analyzeLandingPage(inputType: 'url' | 'content', input: string, userId: string) {
  console.log('Starting analyzeLandingPage function');
  
  if (!process.env.OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY is not set in the environment variables');
    throw new Error('OPENAI_API_KEY is not set in the environment variables');
  }

  let content = input;

  if (inputType === 'url') {
    try {
      console.log('Fetching URL content');
      const response = await fetch(input);
      content = await response.text();
    } catch (error) {
      console.error('Error fetching URL content:', error);
      throw new Error(`Failed to fetch content from the provided URL: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  if (content.length > MAX_CONTENT_LENGTH) {
    content = content.substring(0, MAX_CONTENT_LENGTH) + '...(truncated)';
  }

  const prompt = `
    Analyze the following landing page content and provide a detailed analysis with scores (0-100) for these categories:
    1. Messaging
    2. Readability
    3. Structure
    4. Actionability
    5. Design
    6. Credibility
    7. SEO (including meta tags, heading structure, and keyword density)
    8. Call-to-Action Effectiveness
    9. Accessibility
    10. Mobile Responsiveness

    For each category:
    - Provide a score out of 100
    - Write a brief but insightful analysis paragraph
    - Give 2 specific, actionable recommendations for improvement

    Additionally, provide an overall content suggestion to improve the landing page.

    Content:
    ${content}

    Respond in the following JSON format:
    {
      "results": [
        {
          "category": "Category Name",
          "score": 0,
          "feedback": "Detailed analysis paragraph",
          "recommendations": ["Specific recommendation 1", "Specific recommendation 2"]
        }
      ],
      "contentSuggestion": "AI-generated content improvement suggestion"
    }

    Make the analysis critical but constructive, focusing on specific improvements that could be made.
  `;

  try {
    console.log('Calling OpenAI API');
    const response = await generateText({
      model: openai('gpt-4o'),
      prompt: prompt,
    });

    console.log('Parsing OpenAI response');
    const jsonContent = response.text.replace(/\`\`\`json\n|\n\`\`\`/g, '').trim();
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(jsonContent);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      throw new Error(`Failed to parse the analysis results: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`);
    }

    if (!Array.isArray(parsedResponse.results)) {
      console.error('Invalid results structure');
      throw new Error('Invalid results structure');
    }

    const overallScore = Math.round(
      parsedResponse.results.reduce((acc: number, curr: { score: number }) => acc + curr.score, 0) / parsedResponse.results.length
    );

    const analysisResult = {
      results: parsedResponse.results,
      contentSuggestion: parsedResponse.contentSuggestion,
      metadata: {
        url: inputType === 'url' ? input : null,
        score: overallScore,
        date: new Date().toISOString()
      }
    };

    // Save the analysis result to the database
    const savedAnalysis = await prisma.analysis.create({
      data: {
        url: input,
        results: analysisResult,
        overallScore,
        seoScore: parsedResponse.results.find((r: any) => r.category === 'SEO')?.score,
        ctaScore: parsedResponse.results.find((r: any) => r.category === 'Call-to-Action Effectiveness')?.score,
        accessibilityScore: parsedResponse.results.find((r: any) => r.category === 'Accessibility')?.score,
        user: { connect: { id: userId } }
      }
    });

    console.log('Analysis completed and saved successfully');
    return analysisResult;

  } catch (error) {
    console.error('Error analyzing landing page:', error);
    if (error instanceof Error) {
      throw new Error(`Analysis failed: ${error.message}`);
    } else {
      throw new Error('An unexpected error occurred during analysis');
    }
  }
}

export async function getHistoricalAnalyses(userId: string, url: string) {
  return prisma.analysis.findMany({
    where: {
      userId,
      url
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export async function compareCompetitors(urls: string[], userId: string) {
  const analyses = await Promise.all(urls.map(url => analyzeLandingPage('url', url, userId)));
  
  const comparisonResult = {
    urls,
    results: analyses
  };

  await prisma.competitorComparison.create({
    data: {
      urls,
      results: comparisonResult,
      user: { connect: { id: userId } }
    }
  });

  return comparisonResult;
}

