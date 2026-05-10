import Link from "next/link";
import { ArrowRight } from "lucide-react";
export default function HomePage() {
return (
<main className="min-h-screen bg-[#111113] text-white">
{/* Navbar */}
<header className="sticky top-0 z-50 border-b border-white/10 bg-
[#111113]/80 backdrop-blur-xl">
<div className="max-w-6xl mx-auto px-6 h-16 flex items-center
justify-between">
<div className="text-lg font-semibold tracking-tight">
CurateAI
</div>
<div className="flex items-center gap-3">
<Link href="/dashboard">
<button className="h-10 px-4 rounded-xl border border-white/10
bg-white/[0.03] hover:bg-white/[0.06] transition-all text-sm">
View Demo
</button>
</Link>
<Link href="/upload">
<button className="h-10 px-5 rounded-xl bg-white text-black
text-sm font-medium hover:bg-zinc-200 transition-all">
Get Started
</button>
</Link>
</div>
</div>
</header>
{/* Hero */}
<section className="max-w-5xl mx-auto px-6 pt-28 pb-20 text-center">
<div className="inline-flex items-center rounded-full border borderwhite/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-400 mb-8">
AI-powered bookmark organization
</div>
<h1 className="text-5xl md:text-6xl font-semibold tracking-tight
leading-tight text-white">
Your bookmarks,
<br />
finally usable.
</h1>
<p className="mt-6 text-lg text-zinc-400 leading-relaxed max-w-2xl
mx-auto">
CurateAI transforms saved browser bookmarks into a clean,
searchable knowledge dashboard powered by AI.
</p>
<div className="mt-10 flex items-center justify-center gap-4 flexwrap">
<Link href="/upload">
<button className="h-12 px-6 rounded-xl bg-white text-black fontmedium hover:bg-zinc-200 transition-all flex items-center gap-2">
Upload Bookmarks
<ArrowRight className="w-4 h-4" />
</button>
</Link>
<Link href="/dashboard">
<button className="h-12 px-6 rounded-xl border border-white/10
bg-white/[0.03] hover:bg-white/[0.06] transition-all">
Open Demo Dashboard
</button>
</Link>
</div>
</section>
{/* Dashboard Preview */}
<section className="max-w-6xl mx-auto px-6 pb-28">
<div className="rounded-3xl border border-white/10 bg-[#18181b]
overflow-hidden shadow-2xl">
<div className="border-b border-white/10 px-6 py-4 flex itemscenter gap-2">
<div className="w-3 h-3 rounded-full bg-zinc-600" />
<div className="w-3 h-3 rounded-full bg-zinc-600" />
<div className="w-3 h-3 rounded-full bg-zinc-600" />
</div>
<div className="grid md:grid-cols-[260px_1fr] min-h-[500px]">
{/* Sidebar */}
<aside className="border-r border-white/10 p-5 space-y-3 bg-
[#151518]">
<div className="text-sm text-zinc-500 uppercase tracking-wide
mb-4">
Collections
</div>
{[
"AI Tools",
"Design Inspiration",
"Development",
"Productivity",
"Research",
].map((item) => (
<div
key={item}
className="px-4 py-3 rounded-xl bg-white/[0.03] hover:bgwhite/[0.06] transition-all text-sm"
>
{item}
</div>
))}
</aside>
{/* Main Dashboard */}
<div className="p-6">
<div className="flex items-center justify-between mb-8 gap-4
flex-wrap">
<div>
<h2 className="text-2xl font-semibold">
Knowledge Dashboard
</h2>
<p className="text-zinc-400 text-sm mt-1">
AI-organized bookmarks and insights
</p>
</div>
<div className="px-4 py-2 rounded-xl border border-white/10
bg-white/[0.03] text-sm text-zinc-300">
248 bookmarks indexed
</div>
</div>
<div className="grid md:grid-cols-2 gap-5">
{[1, 2, 3, 4].map((item) => (
<div
key={item}
className="rounded-2xl border border-white/10 bg-white/
[0.03] p-5 hover:bg-white/[0.05] transition-all"
>
<div className="flex items-center justify-between mb-4">
<div className="text-sm text-zinc-500">
AI Summary
</div>
<div className="text-xs px-2 py-1 rounded-lg bg-white/
[0.05] text-zinc-400">
Productivity
</div>
</div>
<h3 className="text-lg font-medium mb-3">
3
Building a personal knowledge workflow
</h3>
<p className="text-sm text-zinc-400 leading-relaxed">
AI-generated summary preview for saved resources and
articles.
</p>
</div>
))}
</div>
</div>
</div>
</div>
</section>
{/* Features */}
<section className="max-w-6xl mx-auto px-6 pb-28 grid md:grid-cols-3
gap-6">
{[
{
title: "AI Categorization",
text: "Automatically groups bookmarks into meaningful collections.",
},
{
title: "Semantic Search",
text: "Search saved knowledge naturally using AI-powered discovery.",
},
{
title: "Smart Dashboard",
text: "Convert saved links into an organized productivity workspace.",
},
].map((feature) => (
<div
key={feature.title}
className="rounded-2xl border border-white/10 bg-white/[0.03]
p-6"
>
<h3 className="text-xl font-medium mb-3">
{feature.title}
</h3>
<p className="text-zinc-400 leading-relaxed text-sm">
{feature.text}
</p>
</div>
))}
</section>
{/* Footer */}
<footer className="border-t border-white/10 py-8 text-center text-sm
text-zinc-500">
Built for the Build with Anakin Hackathon by raikardivya15
</footer>
</main>
);
}