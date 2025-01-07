'use server'

import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'

const MAX_CONTENT_LENGTH = 8000

function getFaviconUrl(url: string): string {
  try {
    const parsedUrl = new URL(url);
    return `${parsedUrl.protocol}//${parsedUrl.hostname}/favicon.ico`;
  } catch (error) {
    console.error('Error parsing URL:', error);
    return '/default-favicon.ico'; // Provide a default favicon path
  }
}

export async function analyzeLandingPage(inputType: 'url' | 'content', input: string) {
  console.log('Starting analyzeLandingPage function');
  
  if (!process.env.OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY is not set in the environment variables');
    throw new Error('OPENAI_API_KEY is not set in the environment variables');
  }

  let content = input;
  let faviconUrl = null;

  if (inputType === 'url') {
    try {
      console.log('Fetching URL content');
      const response = await fetch(input, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      content = await response.text();
      faviconUrl = getFaviconUrl(input);
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

    For each category:
    - Provide a score out of 100
    - Write a brief but insightful analysis paragraph
    - Give 2 specific, actionable recommendations for improvement

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
      ]
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
    let results;
    try {
      results = JSON.parse(jsonContent).results;
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      throw new Error(`Failed to parse the analysis results: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`);
    }

    if (!Array.isArray(results)) {
      console.error('Invalid results structure');
      throw new Error('Invalid results structure');
    }

    const overallScore = Math.round(
      results.reduce((acc: number, curr: { score: number }) => acc + curr.score, 0) / results.length
    );

    console.log('Analysis completed successfully');
    return {
      results,
      metadata: {
        url: inputType === 'url' ? input : null,
        faviconUrl,
        score: overallScore,
        date: new Date().toISOString()
      }
    };

  } catch (error) {
    console.error('Error analyzing landing page:', error);
    if (error instanceof Error) {
      throw new Error(`Analysis failed: ${error.message}`);
    } else {
      throw new Error('An unexpected error occurred during analysis');
    }
  }
}

