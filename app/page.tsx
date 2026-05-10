import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.3),transparent_40%)]" />

      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 min-h-screen">
        <div className="backdrop-blur-xl border border-white/10 bg-white/5 rounded-3xl px-10 py-16 max-w-5xl shadow-2xl">
          
          <p className="uppercase tracking-[0.3em] text-sm text-zinc-400 mb-6">
            AI-Powered Bookmark Intelligence
          </p>

          <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-6">
            Turn chaotic bookmarks into your{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              second brain
            </span>
          </h1>

          <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            CurateAI transforms messy browser bookmarks into an organized,
            searchable, AI-powered knowledge dashboard.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/upload">
              <button className="px-8 py-4 rounded-2xl bg-white text-black font-semibold hover:scale-105 transition-all">
                Get Started
              </button>
            </Link>

            <Link href="/dashboard">
              <button className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all">
                View Demo
              </button>
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-semibold mb-2">AI Categorization</h3>
              <p className="text-zinc-400 text-sm">
                Automatically organize bookmarks into meaningful smart collections.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-semibold mb-2">Smart Search</h3>
              <p className="text-zinc-400 text-sm">
                Instantly rediscover saved resources using natural language.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-semibold mb-2">Knowledge Dashboard</h3>
              <p className="text-zinc-400 text-sm">
                Turn passive bookmarks into an active productivity system.
              </p>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}