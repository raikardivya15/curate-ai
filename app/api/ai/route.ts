import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function POST(req: Request) {
  try {
    const { url, title } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "No URL provided" }, { status: 400 });
    }

    const ANAKIN_API_KEY = process.env.ANAKIN_API_KEY;
    const ANAKIN_APP_ID = process.env.ANAKIN_APP_ID;

    if (!ANAKIN_API_KEY || !ANAKIN_APP_ID) {
      // Fallback if no API key is provided
      return NextResponse.json({
        url,
        category: "Pending setup",
        summary: "Please add ANAKIN_API_KEY and ANAKIN_APP_ID to .env.local to enable Anakin AI.",
        tags: ["setup-required"]
      });
    }

    // Attempt to scrape the website
    let scrapedText = "";
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 seconds timeout
      
      const response = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; CurateAIBot/1.0)" },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const html = await response.text();
        const $ = cheerio.load(html);
        $('script, style, noscript, iframe, img, svg, video').remove();
        scrapedText = $('body').text().replace(/\s+/g, ' ').trim().substring(0, 15000);
      }
    } catch {
      console.log(`Could not scrape ${url}`);
    }

    const prompt = `
You are a helpful bookmark categorization assistant. 
Please analyze the following webpage:
Title: ${title}
URL: ${url}
Content Snippet (if available): ${scrapedText || "No content could be retrieved."}

Your task is to:
1. Assign it a concise Category that perfectly describes the topic (e.g., Tech, Food, UI/UX, AI, E-commerce, Health, Finance, etc.). Generate the most accurate 1-2 word category based on the content or URL.
2. Write a 2-3 sentence summary of what this page is about. Focus on what it's useful for.
3. Provide an array of 3-5 relevant lowercase tags.

Return ONLY a valid JSON object with the following structure, with no markdown formatting or extra text:
{
  "category": "string",
  "summary": "string",
  "tags": ["string", "string", "string"]
}
`;

    const anakinResponse = await fetch(`https://api.anakin.ai/v1/chatbots/${ANAKIN_APP_ID}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ANAKIN_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: prompt,
        stream: false
      })
    });

    if (!anakinResponse.ok) {
      console.error("Anakin API Error:", await anakinResponse.text());
      throw new Error(`Anakin API returned ${anakinResponse.status}`);
    }

    const anakinData = await anakinResponse.json();
    let text = anakinData.content || anakinData.reply || "";

    // Clean up potential markdown formatting from the response
    if (text.startsWith("\`\`\`json")) {
      text = text.substring(7);
      if (text.endsWith("\`\`\`")) {
        text = text.substring(0, text.length - 3);
      }
    } else if (text.startsWith("\`\`\`")) {
      text = text.substring(3);
      if (text.endsWith("\`\`\`")) {
        text = text.substring(0, text.length - 3);
      }
    }

    let parsedData;
    try {
      parsedData = JSON.parse(text.trim());
    } catch {
      console.error("Failed to parse Anakin JSON output:", text);
      parsedData = { category: "Uncategorized", summary: text.substring(0, 200) || "Processed by Anakin.", tags: [] };
    }

    return NextResponse.json({
      url,
      category: parsedData.category || "Other",
      summary: parsedData.summary || "No summary available.",
      tags: parsedData.tags || []
    });
  } catch (error) {
    console.error("Error processing bookmark:", error);
    return NextResponse.json({ error: "Failed to process bookmark" }, { status: 500 });
  }
}
