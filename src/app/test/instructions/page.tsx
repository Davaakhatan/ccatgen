"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function InstructionsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [practiceLoading, setPracticeLoading] = useState<string | null>(null);

  async function startSession(category?: "verbal" | "math_logic" | "spatial", mode?: "hard") {
    setLoading(true);
    if (category || mode) setPracticeLoading(category ?? mode ?? null);
    try {
      const payload = category ? { category } : mode ? { mode } : undefined;
      const res = await fetch("/api/test-sessions", {
        method: "POST",
        headers: payload ? { "Content-Type": "application/json" } : undefined,
        body: payload ? JSON.stringify(payload) : undefined,
      });
      const data = await res.json();
      router.push(`/test/${data.sessionId}`);
    } catch {
      alert("Failed to start test. Please try again.");
      setLoading(false);
      setPracticeLoading(null);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 text-slate-950 sm:p-6">
      <div className="mx-auto max-w-3xl space-y-5">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Timed practice</p>
          <h1 className="mt-2 text-2xl font-bold">Test Instructions</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            You will answer a mixed set of verbal, math/logic, and spatial questions under a 15-minute timer.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-2xl font-bold">50</div>
            <div className="mt-1 text-sm text-slate-500">Questions</div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-2xl font-bold">15:00</div>
            <div className="mt-1 text-sm text-slate-500">Time limit</div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-2xl font-bold">0</div>
            <div className="mt-1 text-sm text-slate-500">Calculator use</div>
          </div>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 shadow-sm">
          <h2 className="font-semibold text-amber-950">40+ hard mixed drill</h2>
          <p className="mt-2 text-sm leading-6 text-amber-900">
            Train above the pass line with 30 medium/hard questions in 9 minutes. Your target here is 24+/30 before you trust a full-test 40+ attempt.
          </p>
          <button
            onClick={() => startSession(undefined, "hard")}
            disabled={loading}
            className="mt-4 rounded-lg bg-amber-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-800 disabled:opacity-50"
          >
            {practiceLoading === "hard" ? "Starting..." : "Start 40+ Hard Drill"}
          </button>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <ul className="space-y-3 text-sm leading-6 text-slate-700">
            <li className="flex gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-slate-900" />
              Most candidates will not finish every question; speed matters.
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-slate-900" />
              You can move backward and forward during practice to review skipped questions.
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-slate-900" />
              Unanswered questions count as incorrect when the test is submitted.
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-slate-900" />
              Results are shown immediately with category breakdowns.
            </li>
          </ul>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-semibold">Single-category speed drills</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Drill 20 questions in 6 minutes for one category. This trains the 18-second rhythm without mixing skills.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <button
              onClick={() => startSession("verbal")}
              disabled={loading}
              className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-100 disabled:opacity-50"
            >
              {practiceLoading === "verbal" ? "Starting..." : "Verbal Drill"}
            </button>
            <button
              onClick={() => startSession("math_logic")}
              disabled={loading}
              className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-100 disabled:opacity-50"
            >
              {practiceLoading === "math_logic" ? "Starting..." : "Math & Logic Drill"}
            </button>
            <button
              onClick={() => startSession("spatial")}
              disabled={loading}
              className="rounded-lg border border-violet-200 bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-700 transition-colors hover:bg-violet-100 disabled:opacity-50"
            >
              {practiceLoading === "spatial" ? "Starting..." : "Spatial Drill"}
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-semibold">Need speed methods first?</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Review category tactics for verbal, math/logic, and spatial questions before starting the timer.
          </p>
          <button
            onClick={() => router.push("/lessons")}
            className="mt-4 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Open Lessons
          </button>
        </div>

        <button
          onClick={() => startSession()}
          disabled={loading}
          className="w-full rounded-lg bg-slate-950 py-3.5 font-semibold text-white shadow-sm transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Generating Test..." : "Begin Test"}
        </button>
      </div>
    </div>
  );
}
