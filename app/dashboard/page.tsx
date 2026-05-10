"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, LayoutDashboard, Compass, Star, Settings, 
  LogOut, Filter, Sparkles, ExternalLink, Loader2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

type Bookmark = {
  title: string;
  url: string;
  addedAt?: string;
  category?: string;
  summary?: string;
  tags?: string[];
  status: "pending" | "processing" | "done" | "error";
};

export default function DashboardPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isParsing, setIsParsing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const processBookmarks = async (itemsToProcess: Bookmark[], currentAllItems: Bookmark[]) => {
    let current = [...currentAllItems];
    
    for (let i = 0; i < itemsToProcess.length; i++) {
      const targetUrl = itemsToProcess[i].url;
      
      // Update status to processing
      current = current.map(b => b.url === targetUrl ? { ...b, status: "processing" } : b);
      setBookmarks(current);

      try {
        const res = await fetch("/api/ai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: targetUrl, title: itemsToProcess[i].title })
        });
        const aiData = await res.json();

        current = current.map(b => b.url === targetUrl ? { 
          ...b, 
          status: "done", 
          category: aiData.category,
          summary: aiData.summary,
          tags: aiData.tags
        } : b);
        
        setBookmarks(current);
        localStorage.setItem("savedBookmarks", JSON.stringify(current));
      } catch {
        current = current.map(b => b.url === targetUrl ? { ...b, status: "error" } : b);
        setBookmarks(current);
        localStorage.setItem("savedBookmarks", JSON.stringify(current));
      }
    }
  };

  useEffect(() => {
    // 1. Load from localStorage
    const saved = localStorage.getItem("savedBookmarks");
    let initialBookmarks: Bookmark[] = [];
    if (saved) {
      try {
        initialBookmarks = JSON.parse(saved);
        // eslint-disable-next-line
        setBookmarks(initialBookmarks);
      } catch {
        console.error("Failed to parse saved bookmarks");
      }
    }

    const parseBookmarks = async () => {
      const html = localStorage.getItem("bookmarksHtml");
      if (!html) return;
      
      setIsParsing(true);
      try {
        const res = await fetch("/api/parse", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ html })
        });
        const data = await res.json();
        
        if (data.bookmarks) {
          const newBookmarks = data.bookmarks.map((b: Omit<Bookmark, "status">) => ({
            ...b,
            status: "pending" as const
          }));
          
          // Merge with existing
          const merged = [...newBookmarks, ...initialBookmarks];
          setBookmarks(merged);
          localStorage.setItem("savedBookmarks", JSON.stringify(merged));
          
          // Clear it so we don't re-parse on reload
          localStorage.removeItem("bookmarksHtml");
          
          // Start processing the NEW ones with AI
          processBookmarks(newBookmarks, merged);
        }
      } catch {
        console.error("Failed to parse");
      } finally {
        setIsParsing(false);
      }
    };

    parseBookmarks();
  }, []);

  const categories = ["All", ...Array.from(new Set(bookmarks.filter(b => b.category).map(b => b.category as string)))];

  const filteredBookmarks = bookmarks.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (b.summary && b.summary.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = !selectedCategory || selectedCategory === "All" || b.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    total: bookmarks.length,
    processed: bookmarks.filter(b => b.status === "done").length,
    aiCategorized: bookmarks.filter(b => b.category === "AI").length
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 flex flex-col glass z-10">
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <span className="font-semibold tracking-tight text-lg">CurateAI</span>
          </div>
        </div>

        <ScrollArea className="flex-1 py-6 px-4">
          <div className="space-y-1">
            <Button variant="secondary" className="w-full justify-start bg-white/5 hover:bg-white/10 text-white font-medium">
              <LayoutDashboard className="mr-3 w-4 h-4 text-primary" /> Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-white">
              <Compass className="mr-3 w-4 h-4" /> Discover
            </Button>
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-white">
              <Star className="mr-3 w-4 h-4" /> Favorites
            </Button>
          </div>

          <div className="mt-8">
            <h4 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Categories
            </h4>
            <div className="space-y-1">
              {categories.map(cat => (
                <Button 
                  key={cat} 
                  variant="ghost" 
                  size="sm"
                  className={`w-full justify-between text-muted-foreground hover:text-white ${selectedCategory === cat ? 'bg-white/5 text-white' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  <span className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-primary/50 mr-3" />
                    {cat}
                  </span>
                  <span className="text-xs bg-white/5 px-2 py-0.5 rounded-full">
                    {cat === "All" ? bookmarks.length : bookmarks.filter(b => b.category === cat).length}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-white/5">
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-white">
            <Settings className="mr-3 w-4 h-4" /> Settings
          </Button>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-red-400 mt-1">
            <LogOut className="mr-3 w-4 h-4" /> Log out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background -z-10" />
        
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-8 border-b border-white/5 glass sticky top-0 z-10">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search bookmarks, summaries, or tags..." 
              className="pl-10 bg-white/5 border-white/10 rounded-full h-10 focus-visible:ring-primary/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="bg-white/5 border-white/10 rounded-full">
              <Filter className="mr-2 w-4 h-4" /> Filter
            </Button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-purple-400 border border-white/20" />
          </div>
        </header>

        <ScrollArea className="flex-1 p-8">
          {/* Top Stats */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <Card className="glass-card border-white/5 bg-white/[0.02]">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Total Bookmarks</p>
                  <h3 className="text-3xl font-bold">{stats.total}</h3>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <LayoutDashboard className="w-6 h-6 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card border-white/5 bg-white/[0.02]">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">AI Processed</p>
                  <h3 className="text-3xl font-bold">
                    {stats.processed} <span className="text-sm font-normal text-muted-foreground">/ {stats.total}</span>
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-purple-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card border-white/5 bg-white/[0.02]">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">AI Focus</p>
                  <h3 className="text-3xl font-bold">{stats.aiCategorized}</h3>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Compass className="w-6 h-6 text-blue-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Grid */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">Your Knowledge Base</h2>
            {bookmarks.some(b => b.status === "processing") && (
              <div className="flex items-center text-sm text-primary">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                AI is processing your links...
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
            <AnimatePresence>
              {filteredBookmarks.map((bookmark, idx) => (
                <motion.div
                  key={bookmark.url + idx}
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full glass-card border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors flex flex-col overflow-hidden group">
                    <CardContent className="p-5 flex flex-col h-full relative">
                      <div className="mb-3">
                        {bookmark.status === "processing" ? (
                          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 animate-pulse">
                            Processing...
                          </Badge>
                        ) : bookmark.status === "done" ? (
                          <Badge variant="secondary" className="bg-white/10 text-white border-white/5">
                            {bookmark.category}
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-muted-foreground">
                            Pending
                          </Badge>
                        )}
                      </div>
                      
                      <h3 className="font-semibold text-lg leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {bookmark.title}
                      </h3>
                      
                      {bookmark.summary && (
                        <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                          {bookmark.summary}
                        </p>
                      )}
                      
                      <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                        <div className="flex gap-2 overflow-hidden">
                          {bookmark.tags?.slice(0, 2).map(tag => (
                            <span key={tag} className="text-xs text-muted-foreground bg-white/5 px-2 py-1 rounded-md whitespace-nowrap">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <a 
                          href={bookmark.url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors shrink-0"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {!isParsing && filteredBookmarks.length === 0 && (
              <div className="col-span-full py-20 flex flex-col items-center justify-center text-muted-foreground">
                <Search className="w-12 h-12 mb-4 opacity-20" />
                <p>No bookmarks found.</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}
