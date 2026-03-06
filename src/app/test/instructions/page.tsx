"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function InstructionsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleBeginTest() {
    setLoading(true);
    try {
      const res = await fetch("/api/test-sessions", { method: "POST" });
      const data = await res.json();
      router.push(`/test/${data.sessionId}`);
    } catch {
      alert("Failed to start test. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Test Instructions</h1>
          <p className="text-slate-400 text-sm mt-1">Read carefully before starting</p>
        </div>

        <ul className="space-y-3 text-slate-300">
          <li className="flex items-start gap-3">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold shrink-0 mt-0.5">1</span>
            You will have <strong className="text-white">15 minutes</strong> to complete 50 questions.
          </li>
          <li className="flex items-start gap-3">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold shrink-0 mt-0.5">2</span>
            Most people do <strong className="text-white">not</strong> finish all questions — this is normal.
          </li>
          <li className="flex items-start gap-3">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold shrink-0 mt-0.5">3</span>
            Questions are <strong className="text-white">forward-only</strong> — you cannot go back to previous questions.
          </li>
          <li className="flex items-start gap-3">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold shrink-0 mt-0.5">4</span>
            <strong className="text-white">No calculators</strong> are allowed.
          </li>
          <li className="flex items-start gap-3">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold shrink-0 mt-0.5">5</span>
            The test will <strong className="text-white">auto-submit</strong> when time runs out.
          </li>
        </ul>

        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-sm text-amber-300">
          Work quickly but carefully. Unanswered questions count as incorrect.
        </div>

        <button
          onClick={handleBeginTest}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-semibold hover:bg-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Generating Test..." : "Begin Test"}
        </button>
      </div>
    </div>
  );
}
