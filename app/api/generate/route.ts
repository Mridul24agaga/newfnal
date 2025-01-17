import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { content } = await req.json();
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Generate 5 unique SEO-optimized meta descriptions (max 155 characters each) for the following content. Make them compelling and include relevant keywords. After generating, provide a brief comparison and analysis of the strengths of each description: ${content}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the generated text to extract descriptions and analysis
    const [descriptionsText, analysisText] = text.split('Comparison and Analysis:');
    const descriptions = descriptionsText.split('\n').filter(d => d.trim()).map(d => d.replace(/^\d+\.\s*/, '').trim());
    const analysis = analysisText.trim();

    return new Response(JSON.stringify({ descriptions, analysis }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to generate descriptions' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

