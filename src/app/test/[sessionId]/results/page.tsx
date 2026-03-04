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

const bandColors: Record<string, string> = {
  "Below Average": "bg-red-100 text-red-800 border-red-200",
  Average: "bg-amber-100 text-amber-800 border-amber-200",
  "Above Average": "bg-green-100 text-green-800 border-green-200",
  Exceptional: "bg-purple-100 text-purple-800 border-purple-200",
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Calculating results...</p>
      </div>
    );
  }

  const categories = [
    { key: "verbal" as const, label: "Verbal", data: result.categoryBreakdown.verbal },
    { key: "math_logic" as const, label: "Math & Logic", data: result.categoryBreakdown.math_logic },
    { key: "spatial" as const, label: "Spatial", data: result.categoryBreakdown.spatial },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center p-4">
      <div className="max-w-lg w-full space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center space-y-6">
          <h1 className="text-2xl font-bold text-gray-900">Test Results</h1>

          <div className="space-y-2">
            <div className="text-5xl font-bold text-indigo-600">{result.rawScore}</div>
            <div className="text-gray-500">out of 50 correct</div>
          </div>

          <div
            className={`inline-block px-4 py-2 rounded-full border font-medium ${bandColors[result.percentileBand] || "bg-gray-100 text-gray-800 border-gray-200"}`}
          >
            {result.percentileBand}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Category Breakdown</h2>

          {categories.map((cat) => {
            const pct = cat.data.total > 0 ? (cat.data.correct / cat.data.total) * 100 : 0;
            return (
              <div key={cat.key} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">{cat.label}</span>
                  <span className="text-gray-500">
                    {cat.data.correct} / {cat.data.total}
                  </span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full transition-all"
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
            className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Take Another Test
          </button>
          <button
            onClick={() => router.push("/")}
            className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
}
