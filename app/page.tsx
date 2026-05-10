"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookMarked, Sparkles, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-6 h-16 flex items-center justify-between border-b border-white/5 glass sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
            <BookMarked className="w-4 h-4 text-primary" />
          </div>
          <span className="font-semibold text-lg tracking-tight">CurateAI</span>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/upload">
            <Button variant="ghost" className="text-muted-foreground hover:text-white">Sign In</Button>
          </Link>
          <Link href="/upload">
            <Button className="rounded-full">Get Started</Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-sm text-muted-foreground mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>AI-powered knowledge management</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gradient pb-2">
            Turn your bookmarks into an <br />
            <span className="text-gradient-primary">intelligent dashboard</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Stop losing great content in a messy list of folders. Upload your browser bookmarks and let AI categorize, summarize, and tag them automatically.
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <Link href="/upload">
              <Button size="lg" className="rounded-full h-12 px-8 text-base">
                Try it for free <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="rounded-full h-12 px-8 text-base bg-white/5 border-white/10 hover:bg-white/10">
                <LayoutDashboard className="mr-2 w-4 h-4" />
                View Demo
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-24 w-full max-w-5xl aspect-video glass-card overflow-hidden relative"
        >
          {/* Decorative dashboard mockup */}
          <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/90 to-primary/10">
            <div className="w-full h-12 border-b border-white/5 flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
            </div>
            <div className="flex h-[calc(100%-3rem)]">
              <div className="w-64 border-r border-white/5 p-4 space-y-4">
                <div className="h-8 rounded bg-white/5 w-full" />
                <div className="h-8 rounded bg-white/5 w-3/4" />
                <div className="h-8 rounded bg-white/5 w-5/6" />
              </div>
              <div className="flex-1 p-8">
                <div className="grid grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-40 rounded-xl bg-white/[0.02] border border-white/5 p-4 flex flex-col gap-3">
                      <div className="h-6 w-3/4 rounded bg-white/10" />
                      <div className="h-4 w-full rounded bg-white/5" />
                      <div className="h-4 w-5/6 rounded bg-white/5" />
                      <div className="mt-auto flex gap-2">
                        <div className="h-6 w-16 rounded-full bg-primary/20" />
                        <div className="h-6 w-16 rounded-full bg-white/5" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
