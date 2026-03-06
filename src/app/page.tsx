import Link from "next/link";
import UserNav from "@/components/UserNav";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
        <span className="text-lg font-bold text-white tracking-tight">CCAT Practice</span>
        <UserNav />
      </nav>

      {/* Hero */}
      <div className="flex items-center justify-center px-4 pt-16 pb-24">
        <div className="max-w-xl w-full text-center space-y-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium px-4 py-1.5 rounded-full">
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
              Crossover CCAT Format
            </div>
            <h1 className="text-5xl font-extrabold text-white leading-tight">
              Cognitive Ability<br />Practice Test
            </h1>
            <p className="text-lg text-slate-400 max-w-md mx-auto">
              Realistic CCAT-style questions to prepare for cognitive assessments used in hiring
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
              <div className="text-3xl font-bold text-white">50</div>
              <div className="text-sm text-slate-400 mt-1">Questions</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
              <div className="text-3xl font-bold text-white">15</div>
              <div className="text-sm text-slate-400 mt-1">Minutes</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
              <div className="text-3xl font-bold text-white">3</div>
              <div className="text-sm text-slate-400 mt-1">Categories</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              Verbal
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Math & Logic
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-violet-400" />
              Spatial
            </span>
          </div>

          <div className="flex flex-col gap-3 items-center">
            <Link
              href="/test/instructions"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-10 py-3.5 rounded-xl font-semibold hover:bg-indigo-500 transition-all hover:shadow-lg hover:shadow-indigo-500/25"
            >
              Start Test
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/test/results"
              className="text-slate-400 hover:text-indigo-300 text-sm font-medium transition-colors"
            >
              View My Results
            </Link>
          </div>

          <p className="text-xs text-slate-600">
            Not an official CCAT product. For practice purposes only.
          </p>
        </div>
      </div>
    </div>
  );
}
