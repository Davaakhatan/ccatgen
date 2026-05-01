"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useRef } from "react";

type Question = {
  instanceId: string;
  order: number;
  questionId: string;
  category: string;
  stem: string;
  options: { id: string; label: string; text: string }[];
  userAnswerId: string | null;
};

type SessionData = {
  sessionId: string;
  status: string;
  endsAt: string;
  questions: Question[];
};

export default function TestRunnerPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.sessionId as string;

  const [session, setSession] = useState<SessionData | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const finishCalledRef = useRef(false);

  // Load session data
  useEffect(() => {
    fetch(`/api/test-sessions/${sessionId}`)
      .then((res) => res.json())
      .then((data: SessionData) => {
        if (data.status !== "active") {
          router.push(`/test/${sessionId}/results`);
          return;
        }
        setSession(data);
        const answerMap: Record<string, string> = {};
        data.questions.forEach((q: Question) => {
          if (q.userAnswerId) answerMap[q.questionId] = q.userAnswerId;
        });
        setAnswers(answerMap);
        const remaining = Math.max(0, Math.floor((new Date(data.endsAt).getTime() - Date.now()) / 1000));
        setTimeLeft(remaining);
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to load test session.");
        router.push("/");
      });
  }, [sessionId, router]);

  // Finish test function
  const finishTest = useCallback(async () => {
    if (finishCalledRef.current) return;
    finishCalledRef.current = true;
    setSubmitting(true);
    try {
      await fetch(`/api/test-sessions/${sessionId}/finish`, { method: "POST" });
      router.push(`/test/${sessionId}/results`);
    } catch {
      finishCalledRef.current = false;
      setSubmitting(false);
    }
  }, [sessionId, router]);

  // Timer
  useEffect(() => {
    if (loading || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          finishTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [loading, timeLeft, finishTest]);

  async function handleAnswer(questionId: string, optionId: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    try {
      await fetch(`/api/test-sessions/${sessionId}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId, selectedOptionId: optionId }),
      });
    } catch {
      // Silently handle — answer is stored locally
    }
  }

  function handleFinish() {
    if (confirm("Are you sure you want to finish the test? You cannot go back.")) {
      finishTest();
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading test...</p>
      </div>
    );
  }

  if (!session) return null;

  const question = session.questions[currentIndex];
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isLowTime = timeLeft < 120;
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = session.questions.length - answeredCount;

  const progressPct = Math.round(((currentIndex + 1) / session.questions.length) * 100);
  const timePct = session ? Math.round((timeLeft / (15 * 60)) * 100) : 100;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white px-4 py-3 shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <div className="flex items-center gap-5">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${isLowTime ? "bg-red-50" : "bg-slate-50"}`}>
            <svg className={`w-4 h-4 ${isLowTime ? "text-red-500" : "text-slate-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className={`text-lg font-mono font-bold tabular-nums ${isLowTime ? "text-red-600 animate-pulse" : "text-slate-900"}`}>
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-sm font-medium text-slate-700">
              Q{currentIndex + 1}/{session.questions.length}
            </span>
            <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full transition-all duration-300" style={{ width: `${progressPct}%` }} />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-500 hidden sm:inline">
            {answeredCount} answered
          </span>
          <button
            onClick={handleFinish}
            disabled={submitting}
            className="rounded-lg bg-slate-950 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-slate-800 disabled:opacity-50"
          >
            Finish
          </button>
        </div>
        </div>
      </div>

      {/* Time progress bar */}
      <div className="h-0.5 bg-slate-100">
        <div
          className={`h-full transition-all duration-1000 ${isLowTime ? "bg-red-500" : "bg-blue-600"}`}
          style={{ width: `${timePct}%` }}
        />
      </div>

      {/* Question Progress Dots */}
      <div className="border-b border-slate-100 bg-white px-3 py-2">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-1">
        {session.questions.map((q, i) => (
          <button
            key={q.instanceId}
            type="button"
            onClick={() => setCurrentIndex(i)}
            className={`w-6 h-6 rounded-full text-xs font-medium flex items-center justify-center transition-all ${
              i === currentIndex
                ? "bg-slate-950 text-white shadow-sm"
                : answers[q.questionId]
                ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                : i < currentIndex
                ? "bg-slate-100 text-slate-400 border border-slate-200"
                : "bg-slate-50 text-slate-300 border border-slate-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
        </div>
      </div>

      {/* Question Panel */}
      <div className="flex-1 p-4 pt-6 sm:p-6">
        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[minmax(0,1fr)_220px]">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-5 flex items-center justify-between gap-3">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                question.category === "verbal" ? "bg-blue-50 text-blue-600" :
                question.category === "math_logic" ? "bg-emerald-50 text-emerald-600" :
                "bg-violet-50 text-violet-600"
              }`}>
                {question.category === "verbal" ? "Verbal" : question.category === "math_logic" ? "Math & Logic" : "Spatial"}
              </span>
              <span className="text-xs font-medium text-slate-400">
                Question {currentIndex + 1}
              </span>
            </div>
            {question.category === "spatial" && question.stem.includes("<svg") ? (
              <div className="mb-6 text-base font-medium text-slate-900 [&_svg]:max-w-full" dangerouslySetInnerHTML={{ __html: question.stem }} />
            ) : (
              <h2 className="mb-6 whitespace-pre-wrap text-lg font-semibold leading-relaxed text-slate-950">
                {question.stem}
              </h2>
            )}

            <div className="space-y-2">
              {question.options.map((option) => {
                const isSelected = answers[question.questionId] === option.id;
                const isSvgOption = option.text.includes("<svg");
                return (
                  <button
                    key={option.id}
                    onClick={() => handleAnswer(question.questionId, option.id)}
                    className={`w-full rounded-lg border p-4 text-left transition-all ${
                      isSelected
                        ? "border-slate-950 bg-slate-950 text-white shadow-sm"
                        : "border-slate-200 text-slate-700 hover:border-slate-400 hover:bg-slate-50"
                    }`}
                  >
                    <span className={`mr-3 inline-flex h-7 w-7 items-center justify-center rounded-md text-sm font-bold ${
                      isSelected ? "bg-white text-slate-950" : "bg-slate-100 text-slate-500"
                    }`}>{option.label}</span>
                    {isSvgOption ? (
                      <span className="inline-block align-middle" dangerouslySetInnerHTML={{ __html: option.text }} />
                    ) : (
                      <span>{option.text}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <aside className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm lg:sticky lg:top-28 lg:self-start">
            <div className="space-y-4 text-sm">
              <div>
                <div className="mb-1 flex justify-between text-slate-500">
                  <span>Answered</span>
                  <span>{answeredCount}/50</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-emerald-500" style={{ width: `${(answeredCount / 50) * 100}%` }} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="rounded-md bg-slate-50 p-3">
                  <div className="text-lg font-bold text-slate-950">{unansweredCount}</div>
                  <div className="text-xs text-slate-500">Open</div>
                </div>
                <div className="rounded-md bg-slate-50 p-3">
                  <div className="text-lg font-bold text-slate-950">{minutes}:{String(seconds).padStart(2, "0")}</div>
                  <div className="text-xs text-slate-500">Left</div>
                </div>
              </div>
            </div>
          </aside>

          <div className="flex justify-between lg:col-span-2">
            <button
              onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
              disabled={currentIndex === 0}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              Previous
            </button>
            <button
              onClick={() => setCurrentIndex((i) => Math.min(session.questions.length - 1, i + 1))}
              disabled={currentIndex === session.questions.length - 1}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-5 py-2.5 font-medium text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-30"
            >
              Next
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
