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
  "Below Average": "bg-red-50 text-red-700 border border-red-200",
  Average: "bg-amber-50 text-amber-700 border border-amber-200",
  "Above Average": "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Exceptional: "bg-violet-50 text-violet-700 border border-violet-200",
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
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-500">Loading results...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 text-slate-950 sm:p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">History</p>
            <h1 className="mt-1 text-2xl font-bold">My Results</h1>
          </div>
          <button
            onClick={() => router.push("/test/instructions")}
            className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            Take New Test
          </button>
        </div>

        {results.length === 0 ? (
          <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
            <p className="text-slate-600">No completed tests yet.</p>
            <button
              onClick={() => router.push("/test/instructions")}
              className="mt-4 rounded-lg bg-slate-950 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-slate-800"
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
                  className="w-full rounded-lg border border-slate-200 bg-white p-5 text-left shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-8 text-lg font-bold text-slate-300">#{idx + 1}</div>
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold text-slate-950">{r.rawScore}<span className="text-base text-slate-400">/{r.total}</span></span>
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${bandColors[r.percentileBand] || "bg-slate-500/10 text-slate-300"}`}>
                            {r.percentileBand}
                          </span>
                        </div>
                        <div className="mt-1 text-sm text-slate-500">
                          {date.toLocaleDateString()} at {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                    </div>
                    <div className="hidden gap-4 text-xs text-slate-500 sm:flex">
                      <div className="text-center">
                        <div className="font-medium text-slate-800">{r.categoryBreakdown.verbal.correct}/{r.categoryBreakdown.verbal.total}</div>
                        <div>Verbal</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-slate-800">{r.categoryBreakdown.math_logic.correct}/{r.categoryBreakdown.math_logic.total}</div>
                        <div>Math</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-slate-800">{r.categoryBreakdown.spatial.correct}/{r.categoryBreakdown.spatial.total}</div>
                        <div>Spatial</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-slate-950"
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
          className="w-full rounded-lg border border-slate-200 bg-white py-3 font-medium text-slate-700 transition-colors hover:bg-slate-100"
        >
          Return Home
        </button>
      </div>
    </div>
  );
}
