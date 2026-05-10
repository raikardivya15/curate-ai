import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#111113] text-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#111113]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-lg font-semibold tracking-tight">
            CurateAI
          </div>

          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <button className="h-10 px-4 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-all text-sm">
                View Demo
              </button>
            </Link>

            <Link href="/upload">
              <button className="h-10 px-5 rounded-xl bg-white text-black text-sm font-medium hover:bg-zinc-200 transition-all">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-28 pb-20 text-center">
        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-400 mb-8">
          AI-powered bookmark organization
        </div>

        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-tight text-white">
          Your bookmarks,
          <br />
          finally usable.
        </h1>

        <p className="mt-6 text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto">
          CurateAI transforms saved browser bookmarks into a clean,
          searchable knowledge dashboard powered by AI.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
          <Link href="/upload">
            <button className="h-12 px-6 rounded-xl bg-white text-black font-medium hover:bg-zinc-200 transition-all flex items-center gap-2">
              Upload Bookmarks
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>

          <Link href="/dashboard">
            <button className="h-12 px-6 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-all">
              Open Demo Dashboard
            </button>
          </Link>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="max-w-6xl mx-auto px-6 pb-28">
        <div className="rounded-3xl border border-white/10 bg-[#18181b] overflow-hidden shadow-2xl">
          <div className="border-b border-white/10 px-6 py-4 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-zinc-600" />
            <div className="w-3 h-3 rounded-full bg-zinc-600" />
            <div className="w-3 h-3 rounded-full bg-zinc-600" />
          </div>

          <div className="grid md:grid-cols-[260px_1fr] min-h-[500px]">
            {/* Sidebar */}
            <aside className="border-r border-white/10 p-5 space-y-3 bg-[#151518]">
              <div className="text-sm text-zinc-500 uppercase tracking-wide mb-4">
                Collections
              </div>

              {[
                "AI Tools",
                "Design Inspiration",
                "Development",
}