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
          onClick={handleBeginTest}
          disabled={loading}
          className="w-full rounded-lg bg-slate-950 py-3.5 font-semibold text-white shadow-sm transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Generating Test..." : "Begin Test"}
        </button>
      </div>
    </div>
  );
}
