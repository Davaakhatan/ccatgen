"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type ResultData = {
  rawScore: number;
  categoryBreakdown: {
    verbal: { correct: number; total: number };
    math_logic: { correct: number; total: number };
    spatial: { correct: number; total: number };
  };
  percentileBand: string;
};

const bandStyles: Record<string, { bg: string; text: string; border: string }> = {
  "Below Average": { bg: "bg-red-500/10", text: "text-red-300", border: "border-red-500/20" },
  Average: { bg: "bg-amber-500/10", text: "text-amber-300", border: "border-amber-500/20" },
  "Above Average": { bg: "bg-emerald-500/10", text: "text-emerald-300", border: "border-emerald-500/20" },
  Exceptional: { bg: "bg-violet-500/10", text: "text-violet-300", border: "border-violet-500/20" },
};

const categoryColors: Record<string, string> = {
  verbal: "bg-blue-500",
  math_logic: "bg-emerald-500",
  spatial: "bg-violet-500",
};

export default function ResultsPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.sessionId as string;

  const [result, setResult] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/test-sessions/${sessionId}/result`)
      .then((res) => res.json())
      .then((data) => {
        setResult(data);
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to load results.");
        router.push("/");
      });
  }, [sessionId, router]);

  if (loading || !result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center">
        <p className="text-slate-400">Calculating results...</p>
      </div>
    );
  }

  const categories = [
    { key: "verbal" as const, label: "Verbal", data: result.categoryBreakdown.verbal },
    { key: "math_logic" as const, label: "Math & Logic", data: result.categoryBreakdown.math_logic },
    { key: "spatial" as const, label: "Spatial", data: result.categoryBreakdown.spatial },
  ];

  const scorePct = Math.round((result.rawScore / 50) * 100);
  const band = bandStyles[result.percentileBand] || { bg: "bg-slate-500/10", text: "text-slate-300", border: "border-slate-500/20" };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-lg w-full space-y-5">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center space-y-6">
          <h1 className="text-xl font-semibold text-slate-300">Test Complete</h1>

          <div className="space-y-3">
            <div className="text-6xl font-extrabold text-white">{result.rawScore}<span className="text-2xl text-slate-500">/50</span></div>
            <div className="text-slate-400">{scorePct}% correct</div>
          </div>

          <div className={`inline-block px-5 py-2 rounded-full border font-semibold ${band.bg} ${band.text} ${band.border}`}>
            {result.percentileBand}
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 space-y-5">
          <h2 className="text-base font-semibold text-slate-200">Category Breakdown</h2>

          {categories.map((cat) => {
            const pct = cat.data.total > 0 ? (cat.data.correct / cat.data.total) * 100 : 0;
            return (
              <div key={cat.key} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-slate-300">{cat.label}</span>
                  <span className="text-slate-500">
                    {cat.data.correct}/{cat.data.total}
                  </span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${categoryColors[cat.key]} rounded-full transition-all`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => router.push("/test/instructions")}
            className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-500 transition-colors"
          >
            Take Another Test
          </button>
          <button
            onClick={() => router.push("/")}
            className="flex-1 border border-white/10 text-slate-300 py-3 rounded-xl font-medium hover:bg-white/5 transition-colors"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
