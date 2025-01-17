import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  console.log('API route called');
  try {
    const { url } = await request.json();
    console.log('Received URL:', url);

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not set');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      Analyze the marketing strategy of the company or product described at the URL: ${url}

      Please provide:
      1. A summary of the key points in the marketing strategy.
      2. Suggested improvements or modifications to the strategy.
      3. Potential channel strategies with timelines, costs, and expected ROI.
      4. Implementation steps or changes to consider.
      5. Projected outcomes including estimated costs, timeline, visitors, paying users, and revenue.

      Return the response as a JSON object with the following structure:
      {
        "summary": "Summary of key points",
        "modifications": ["Suggestion 1", "Suggestion 2", ...],
        "channelStrategies": [
          {
            "name": "Channel Name",
            "timeline": "Estimated timeline",
            "cost": "Estimated cost",
            "roi": "Expected ROI"
          },
          ...
        ],
        "implementationSteps": ["Step 1", "Step 2", ...],
        "projections": {
          "totalCost": "Estimated total cost",
          "timeline": "Estimated timeline",
          "expectedVisitors": "Estimated visitor count",
          "expectedPayingUsers": "Estimated paying user count",
          "expectedRevenue": "Estimated revenue"
        }
      }
    `;

    console.log('Sending request to Gemini API');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysisText = response.text();
    console.log('Received response from Gemini API');

    let analysis;
    try {
      analysis = JSON.parse(analysisText);
      console.log('Successfully parsed Gemini API response');
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError);
      return NextResponse.json({ 
        error: 'Failed to parse the analysis result. The AI might have returned an invalid format.',
        details: analysisText
      }, { status: 500 });
    }

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ 
      error: 'An error occurred during analysis. Please try again.',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

