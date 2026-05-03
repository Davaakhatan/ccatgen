"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type ResultData = {
  rawScore: number;
  total: number;
  categoryBreakdown: {
    verbal: { correct: number; total: number };
    math_logic: { correct: number; total: number };
    spatial: { correct: number; total: number };
  };
  percentileBand: string;
};

const bandStyles: Record<string, { bg: string; text: string; border: string }> = {
  "Below Average": { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
  Average: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  "Above Average": { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  Exceptional: { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200" },
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
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load results.");
        return data;
      })
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
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-500">Calculating results...</p>
      </div>
    );
  }

  const categories = [
    { key: "verbal" as const, label: "Verbal", data: result.categoryBreakdown.verbal },
    { key: "math_logic" as const, label: "Math & Logic", data: result.categoryBreakdown.math_logic },
    { key: "spatial" as const, label: "Spatial", data: result.categoryBreakdown.spatial },
  ];

  const scorePct = result.total > 0 ? Math.round((result.rawScore / result.total) * 100) : 0;
  const band = bandStyles[result.percentileBand] || { bg: "bg-slate-50", text: "text-slate-700", border: "border-slate-200" };

  return (
    <div className="min-h-screen bg-slate-50 p-4 text-slate-950 sm:p-6">
      <div className="mx-auto max-w-3xl space-y-5">
        <div className="rounded-lg border border-slate-200 bg-white p-7 text-center shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Test Complete</p>
          <h1 className="mt-2 text-2xl font-bold">Your Score</h1>

          <div className="mt-6 space-y-3">
            <div className="text-6xl font-extrabold">{result.rawScore}<span className="text-2xl text-slate-400">/{result.total}</span></div>
            <div className="text-slate-500">{scorePct}% correct</div>
          </div>

          <div className={`mt-5 inline-block rounded-full border px-5 py-2 font-semibold ${band.bg} ${band.text} ${band.border}`}>
            {result.percentileBand}
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold">Category Breakdown</h2>

          <div className="mt-5 space-y-5">
            {categories.map((cat) => {
              const pct = cat.data.total > 0 ? (cat.data.correct / cat.data.total) * 100 : 0;
              return (
                <div key={cat.key} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-700">{cat.label}</span>
                    <span className="text-slate-500">
                      {cat.data.correct}/{cat.data.total}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full ${categoryColors[cat.key]} rounded-full transition-all`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => router.push("/test/instructions")}
            className="flex-1 rounded-lg bg-slate-950 py-3 font-semibold text-white transition-colors hover:bg-slate-800"
          >
            Take Another Test
          </button>
          <button
            onClick={() => router.push("/")}
            className="flex-1 rounded-lg border border-slate-200 bg-white py-3 font-medium text-slate-700 transition-colors hover:bg-slate-100"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
