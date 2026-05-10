"use client";

import { useEffect, useState } from "react";

interface Bookmark {
  title: string;
  url: string;
  category: string;
}

export default function DashboardPage() {
  const [groupedBookmarks, setGroupedBookmarks] = useState<
    Record<string, Bookmark[]>
  >({});

  useEffect(() => {
    const html = localStorage.getItem("bookmarksHtml");

    if (!html) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const links = Array.from(doc.querySelectorAll("a"));

    const bookmarks: Bookmark[] = links.map((link) => {
      const title = link.textContent || "Untitled";
      const url = link.getAttribute("href") || "";

      return {
        title,
        url,
        category: categorizeBookmark(title, url),
      };
    });

    const grouped = bookmarks.reduce((acc, bookmark) => {
      if (!acc[bookmark.category]) {
        acc[bookmark.category] = [];
      }

      acc[bookmark.category].push(bookmark);
      return acc;
    }, {} as Record<string, Bookmark[]>);

    setGroupedBookmarks(grouped);
  }, []);

  return (
    <main className="min-h-screen bg-[#111113] text-white">
      <div className="grid md:grid-cols-[260px_1fr] min-h-screen">

        {/* Sidebar */}
        <aside className="border-r border-white/10 bg-[#151518] p-6">
          <h1 className="text-xl font-semibold mb-8">
            CurateAI
          </h1>

          <div className="space-y-2">
            {Object.keys(groupedBookmarks).map((category) => (
              <div
                key={category}
                className="px-4 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-all text-sm flex items-center justify-between"
              >
                <span>{category}</span>

                <span className="text-zinc-500 text-xs">
                  {groupedBookmarks[category].length}
                </span>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <section className="p-8 overflow-y-auto">

          {/* Header */}
          <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">
                Knowledge Dashboard
              </h2>

              <p className="text-zinc-400 mt-2">
                AI-organized bookmark collections
              </p>
            </div>

            <div className="px-4 py-2 rounded-xl border border-white/10 bg-white/[0.03] text-sm text-zinc-400">
              {Object.values(groupedBookmarks).flat().length} bookmarks indexed
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-12">
            {Object.entries(groupedBookmarks).map(
              ([category, bookmarks]) => (
                <div key={category}>
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-2xl font-medium">
                      {category}
                    </h3>

                    <span className="text-zinc-500 text-sm">
                      {bookmarks.length} items
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {bookmarks.map((bookmark, index) => (
                      <a
                        key={index}
                        href={bookmark.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:bg-white/[0.05] transition-all"
                      >
                        <div className="text-xs text-zinc-500 mb-3 truncate">
                          {bookmark.url}
                        </div>

                        <h4 className="text-lg font-medium leading-snug mb-3">
                          {bookmark.title}
                        </h4>

                        <p className="text-sm text-zinc-400 leading-relaxed">
                          AI-organized bookmark resource from your saved
                          collection.
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

/* ---------- AI-like Categorization ---------- */

function categorizeBookmark(title: string, url: string) {
  const text = `${title} ${url}`.toLowerCase();

  if (
    text.includes("openai") ||
    text.includes("claude") ||
    text.includes("gemini") ||
    text.includes("huggingface") ||
    text.includes("ai")
  ) {
    return "AI Tools";
  }

  if (
    text.includes("figma") ||
    text.includes("behance") ||
    text.includes("dribbble") ||
    text.includes("design")
  ) {
    return "Design Inspiration";
  }

  if (
    text.includes("github") ||
    text.includes("vercel") ||
    text.includes("nextjs") ||
    text.includes("react") ||
    text.includes("developer")
  ) {
    return "Development";
  }

  if (
    text.includes("youtube") ||
    text.includes("course") ||
    text.includes("tutorial") ||
    text.includes("learn")
  ) {
    return "Learning";
  }

  if (
    text.includes("notion") ||
    text.includes("productivity") ||
    text.includes("workflow")
  ) {
    return "Productivity";
  }

  return "General";
}