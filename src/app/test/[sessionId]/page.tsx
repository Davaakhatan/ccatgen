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

  const progressPct = Math.round(((currentIndex + 1) / session.questions.length) * 100);
  const timePct = session ? Math.round((timeLeft / (15 * 60)) * 100) : 100;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
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
              <div className="h-full bg-indigo-500 rounded-full transition-all duration-300" style={{ width: `${progressPct}%` }} />
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
            className="bg-slate-900 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            Finish
          </button>
        </div>
      </div>

      {/* Time progress bar */}
      <div className="h-0.5 bg-slate-100">
        <div
          className={`h-full transition-all duration-1000 ${isLowTime ? "bg-red-500" : "bg-indigo-500"}`}
          style={{ width: `${timePct}%` }}
        />
      </div>

      {/* Question Progress Dots */}
      <div className="bg-white border-b border-slate-100 px-4 py-2 flex flex-wrap gap-1 justify-center">
        {session.questions.map((q, i) => (
          <div
            key={q.instanceId}
            className={`w-6 h-6 rounded-full text-xs font-medium flex items-center justify-center transition-all ${
              i === currentIndex
                ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                : answers[q.questionId]
                ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                : i < currentIndex
                ? "bg-slate-100 text-slate-400 border border-slate-200"
                : "bg-slate-50 text-slate-300 border border-slate-100"
            }`}
          >
            {i + 1}
          </div>
        ))}
      </div>

      {/* Question Panel */}
      <div className="flex-1 flex items-start justify-center p-4 pt-8">
        <div className="max-w-2xl w-full space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-5">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                question.category === "verbal" ? "bg-blue-50 text-blue-600" :
                question.category === "math_logic" ? "bg-emerald-50 text-emerald-600" :
                "bg-violet-50 text-violet-600"
              }`}>
                {question.category === "verbal" ? "Verbal" : question.category === "math_logic" ? "Math & Logic" : "Spatial"}
              </span>
            </div>
            {question.category === "spatial" && question.stem.includes("<svg") ? (
              <div className="text-lg font-medium text-slate-900 mb-6" dangerouslySetInnerHTML={{ __html: question.stem }} />
            ) : (
              <h2 className="text-lg font-medium text-slate-900 mb-6 whitespace-pre-wrap leading-relaxed">
                {question.stem}
              </h2>
            )}

            <div className="space-y-2.5">
              {question.options.map((option) => {
                const isSelected = answers[question.questionId] === option.id;
                const isSvgOption = option.text.includes("<svg");
                return (
                  <button
                    key={option.id}
                    onClick={() => handleAnswer(question.questionId, option.id)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-50 text-indigo-900 shadow-sm"
                        : "border-slate-150 hover:border-slate-300 hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-sm font-bold mr-3 ${
                      isSelected ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"
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

          {/* Navigation */}
          <div className="flex justify-end">
            <button
              onClick={() => setCurrentIndex((i) => Math.min(session.questions.length - 1, i + 1))}
              disabled={currentIndex === session.questions.length - 1}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
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
