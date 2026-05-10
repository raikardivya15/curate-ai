import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function POST(req: Request) {
  try {
    const { html } = await req.json();

    if (!html) {
      return NextResponse.json({ error: "No HTML provided" }, { status: 400 });
    }

    const $ = cheerio.load(html);
    const bookmarks: { title: string; url: string; addedAt: string }[] = [];

    $("a").each((_, element) => {
      const el = $(element);
      const url = el.attr("href");
      const title = el.text().trim();
      const addDate = el.attr("add_date");

      if (url && url.startsWith("http")) {
        bookmarks.push({
          title: title || new URL(url).hostname,
          url,
          addedAt: addDate || Date.now().toString(),
        });
      }
    });

    return NextResponse.json({ bookmarks: bookmarks.slice(0, 50) }); // Limit to 50 for demo
  } catch (error) {
    console.error("Error parsing bookmarks:", error);
    return NextResponse.json({ error: "Failed to parse bookmarks" }, { status: 500 });
  }
}
