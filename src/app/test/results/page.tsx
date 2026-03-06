"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type SessionResult = {
  sessionId: string;
  startedAt: string;
  rawScore: number;
  total: number;
  percentileBand: string;
  categoryBreakdown: {
    verbal: { correct: number; total: number };
    math_logic: { correct: number; total: number };
    spatial: { correct: number; total: number };
  };
};

const bandColors: Record<string, string> = {
  "Below Average": "bg-red-500/10 text-red-300 border border-red-500/20",
  Average: "bg-amber-500/10 text-amber-300 border border-amber-500/20",
  "Above Average": "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20",
  Exceptional: "bg-violet-500/10 text-violet-300 border border-violet-500/20",
};

export default function RecentResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState<SessionResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/test-sessions/recent")
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center">
        <p className="text-slate-400">Loading results...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-4">
      <div className="max-w-3xl mx-auto space-y-6 pt-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">My Results</h1>
          <button
            onClick={() => router.push("/test/instructions")}
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-500 transition-colors"
          >
            Take New Test
          </button>
        </div>

        {results.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
            <p className="text-slate-400">No completed tests yet.</p>
            <button
              onClick={() => router.push("/test/instructions")}
              className="mt-4 bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-indigo-500 transition-colors"
            >
              Take Your First Test
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {results.map((r, idx) => {
              const pct = r.total > 0 ? Math.round((r.rawScore / r.total) * 100) : 0;
              const date = new Date(r.startedAt);
              return (
                <button
                  key={r.sessionId}
                  onClick={() => router.push(`/test/${r.sessionId}/results`)}
                  className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:border-indigo-500/30 hover:bg-white/[0.07] transition-all text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-lg font-bold text-slate-600 w-8">#{idx + 1}</div>
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold text-white">{r.rawScore}<span className="text-base text-slate-500">/{r.total}</span></span>
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${bandColors[r.percentileBand] || "bg-slate-500/10 text-slate-300"}`}>
                            {r.percentileBand}
                          </span>
                        </div>
                        <div className="text-sm text-slate-500 mt-1">
                          {date.toLocaleDateString()} at {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 text-xs text-slate-500 hidden sm:flex">
                      <div className="text-center">
                        <div className="font-medium text-slate-300">{r.categoryBreakdown.verbal.correct}/{r.categoryBreakdown.verbal.total}</div>
                        <div>Verbal</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-slate-300">{r.categoryBreakdown.math_logic.correct}/{r.categoryBreakdown.math_logic.total}</div>
                        <div>Math</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-slate-300">{r.categoryBreakdown.spatial.correct}/{r.categoryBreakdown.spatial.total}</div>
                        <div>Spatial</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        )}

        <button
          onClick={() => router.push("/")}
          className="w-full border border-white/10 text-slate-400 py-3 rounded-xl font-medium hover:bg-white/5 transition-colors"
        >
          Return Home
        </button>
      </div>
    </div>
  );
}
