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
  "Below Average": "bg-red-100 text-red-700",
  Average: "bg-amber-100 text-amber-700",
  "Above Average": "bg-green-100 text-green-700",
  Exceptional: "bg-purple-100 text-purple-700",
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading results...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-4">
      <div className="max-w-3xl mx-auto space-y-6 pt-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Recent Test Results</h1>
          <button
            onClick={() => router.push("/test/instructions")}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            Take New Test
          </button>
        </div>

        {results.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <p className="text-gray-500">No completed tests yet.</p>
            <button
              onClick={() => router.push("/test/instructions")}
              className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
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
                  className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:border-indigo-300 hover:shadow-md transition-all text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-lg font-bold text-gray-400 w-8">#{idx + 1}</div>
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold text-indigo-600">{r.rawScore}/{r.total}</span>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${bandColors[r.percentileBand] || "bg-gray-100 text-gray-700"}`}>
                            {r.percentileBand}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {date.toLocaleDateString()} at {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 text-xs text-gray-500">
                      <div className="text-center">
                        <div className="font-medium text-gray-700">{r.categoryBreakdown.verbal.correct}/{r.categoryBreakdown.verbal.total}</div>
                        <div>Verbal</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-gray-700">{r.categoryBreakdown.math_logic.correct}/{r.categoryBreakdown.math_logic.total}</div>
                        <div>Math</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-gray-700">{r.categoryBreakdown.spatial.correct}/{r.categoryBreakdown.spatial.total}</div>
                        <div>Spatial</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
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
          className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Return Home
        </button>
      </div>
    </div>
  );
}
