import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from 'next/server';
import { AnalysisResult } from '@/app/types/seo';
import axios from 'axios';
import * as cheerio from 'cheerio';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

async function fetchWebsiteContent(url: string): Promise<string> {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    // Remove script and style elements
    $('script, style').remove();
    // Get the text content
    return $('body').text().trim();
  } catch (error) {
    console.error('Error fetching website content:', error);
    throw new Error('Failed to fetch website content');
  }
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    // Fetch the website content
    const websiteContent = await fetchWebsiteContent(url);
    const wordCount = websiteContent.split(/\s+/).length;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Analyze the SEO of the website ${url} with the following content:

    "${websiteContent.substring(0, 1000)}..."

    Provide a detailed report. Your response should be a valid JSON object with the following structure, and nothing else. Do not include any markdown formatting or additional text:

    {
      "onPageSEO": {
        "titleTag": {
          "score": number,
          "suggestions": string
        },
        "metaDescription": {
          "score": number,
          "suggestions": string
        },
        "headings": {
          "score": number,
          "suggestions": string
        }
      },
      "technicalSEO": {
        "https": boolean,
        "mobileResponsive": boolean,
        "canonicalUrl": string,
        "robotsTxt": boolean
      },
      "imageOptimization": {
        "totalImages": number,
        "imagesWithAltText": number,
        "lazyLoadedImages": number,
        "suggestions": string
      },
      "contentAnalysis": {
        "wordCount": number,
        "qualitySuggestions": string
      },
      "structuredData": {
        "implemented": boolean,
        "recommendations": string
      },
      "competitiveEdge": {
        "comparison": string,
        "uniqueFeatures": string
      },
      "overallQuality": {
        "highPriority": string[],
        "mediumPriority": string[],
        "lowPriority": string[]
      }
    }

    Ensure that all string values are properly escaped for JSON. Provide realistic and detailed analysis for each section. For the contentAnalysis.wordCount, use the actual word count of ${wordCount}.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Remove any potential markdown formatting
    const jsonString = text.replace(/```json\n|\n```/g, '').trim();
    
    let analysisResult: AnalysisResult;
    try {
      analysisResult = JSON.parse(jsonString);
      // Ensure we use the actual word count
      analysisResult.contentAnalysis.wordCount = wordCount;
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      console.error('Received text:', jsonString);
      return NextResponse.json({ error: 'Invalid response format from AI' }, { status: 500 });
    }

    // Validate the structure of the parsed JSON
    if (!analysisResult.onPageSEO || !analysisResult.technicalSEO || !analysisResult.imageOptimization ||
        !analysisResult.contentAnalysis || !analysisResult.structuredData || !analysisResult.competitiveEdge ||
        !analysisResult.overallQuality) {
      console.error('Invalid analysis result structure:', analysisResult);
      return NextResponse.json({ error: 'Invalid analysis result structure' }, { status: 500 });
    }

    return NextResponse.json(analysisResult);
  } catch (error) {
    console.error('Error in SEO analysis:', error);
    return NextResponse.json({ error: 'Error analyzing website' }, { status: 500 });
  }
}

