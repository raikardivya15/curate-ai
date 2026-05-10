import Link from "next/link";
import { ArrowRight, Brain, Search, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl" />
      </div>

      <header className="flex items-center justify-between px-8 py-6 border-b border-white/10">
        <h1 className="text-2xl font-bold">
          Curate<span className="text-violet-400">AI</span>
        </h1>

        <div className="flex gap-4">
          <Link href="/dashboard">
            <button className="px-5 py-2 rounded-xl border border-white/10 bg-white/5">
              View Demo
            </button>
          </Link>

          <Link href="/upload">
            <button className="px-5 py-2 rounded-xl bg-white text-black font-semibold">
              Get Started
            </button>
          </Link>
        </div>
      </header>

      <section className="flex flex-col items-center justify-center text-center px-6 py-32">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 mb-8">
          <Sparkles className="w-4 h-4 text-violet-400" />
          AI-Powered Bookmark Intelligence
        </div>

        <h2 className="text-6xl font-bold max-w-5xl leading-tight">
          Turn messy bookmarks into your{" "}
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            second brain
          </span>
        </h2>

        <p className="mt-8 text-zinc-400 text-lg max-w-2xl">
          CurateAI transforms chaotic browser bookmarks into an organized,
          searchable, AI-powered knowledge dashboard.
        </p>

        <div className="mt-10 flex gap-4">
          <Link href="/upload">
            <button className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-black font-semibold">
              Upload Bookmarks
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>

          <Link href="/dashboard">
            <button className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5">
              View Live Demo
            </button>
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 pb-24 max-w-6xl mx-auto">

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <Brain className="w-10 h-10 text-violet-400 mb-5" />
          <h3 className="text-2xl font-semibold mb-3">
            AI Categorization
          </h3>
          <p className="text-zinc-400">
            Automatically organize bookmarks into meaningful collections.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <Search className="w-10 h-10 text-cyan-400 mb-5" />
          <h3 className="text-2xl font-semibold mb-3">
            Smart Search
          </h3>
          <p className="text-zinc-400">
            Rediscover saved resources instantly with AI-powered search.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <Sparkles className="w-10 h-10 text-pink-400 mb-5" />
          <h3 className="text-2xl font-semibold mb-3">
            Knowledge Dashboard
          </h3>
          <p className="text-zinc-400">
            Turn passive bookmarks into an active productivity system.
          </p>
        </div>

      </section>

    </main>
  );
}