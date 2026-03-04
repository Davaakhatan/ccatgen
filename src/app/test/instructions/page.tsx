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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Test Instructions</h1>

        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3">
            <span className="text-indigo-600 font-bold mt-0.5">1.</span>
            You will have <strong>15 minutes</strong> to complete 50 questions.
          </li>
          <li className="flex items-start gap-3">
            <span className="text-indigo-600 font-bold mt-0.5">2.</span>
            Most people do <strong>not</strong> finish all questions — this is normal.
          </li>
          <li className="flex items-start gap-3">
            <span className="text-indigo-600 font-bold mt-0.5">3.</span>
            You may <strong>skip questions</strong> and return to them later.
          </li>
          <li className="flex items-start gap-3">
            <span className="text-indigo-600 font-bold mt-0.5">4.</span>
            <strong>No calculators</strong> are allowed.
          </li>
          <li className="flex items-start gap-3">
            <span className="text-indigo-600 font-bold mt-0.5">5.</span>
            The test will <strong>auto-submit</strong> when time runs out.
          </li>
        </ul>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
          Work quickly but carefully. Unanswered questions count as incorrect.
        </div>

        <button
          onClick={handleBeginTest}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Generating Test..." : "Begin Test"}
        </button>
      </div>
    </div>
  );
}
