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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <span
            className={`text-lg font-mono font-bold ${isLowTime ? "text-red-600 animate-pulse" : "text-gray-900"}`}
          >
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </span>
          <span className="text-sm text-gray-500">
            Question {currentIndex + 1} / {session.questions.length}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">
            {answeredCount} / {session.questions.length} answered
          </span>
          <button
            onClick={handleFinish}
            disabled={submitting}
            className="bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            Finish Test
          </button>
        </div>
      </div>

      {/* Question Progress Dots (non-clickable, forward-only like real CCAT) */}
      <div className="bg-white border-b border-gray-100 px-4 py-2 flex flex-wrap gap-1 justify-center">
        {session.questions.map((q, i) => (
          <div
            key={q.instanceId}
            className={`w-6 h-6 rounded-full text-xs font-medium flex items-center justify-center ${
              i === currentIndex
                ? "bg-indigo-600 text-white"
                : answers[q.questionId]
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-gray-100 text-gray-400 border border-gray-200"
            }`}
          >
            {i + 1}
          </div>
        ))}
      </div>

      {/* Question Panel */}
      <div className="flex-1 flex items-start justify-center p-4 pt-8">
        <div className="max-w-2xl w-full space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-indigo-50 text-indigo-700 capitalize">
                {question.category.replace("_", " & ")}
              </span>
            </div>
            {question.category === "spatial" && question.stem.includes("<svg") ? (
              <div className="text-lg font-medium text-gray-900 mb-6" dangerouslySetInnerHTML={{ __html: question.stem }} />
            ) : (
              <h2 className="text-lg font-medium text-gray-900 mb-6 whitespace-pre-wrap">
                {question.stem}
              </h2>
            )}

            <div className="space-y-3">
              {question.options.map((option) => {
                const isSelected = answers[question.questionId] === option.id;
                const isSvgOption = option.text.includes("<svg");
                return (
                  <button
                    key={option.id}
                    onClick={() => handleAnswer(question.questionId, option.id)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-50 text-indigo-900"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <span className="font-medium mr-3">{option.label}.</span>
                    {isSvgOption ? (
                      <span className="inline-block align-middle" dangerouslySetInnerHTML={{ __html: option.text }} />
                    ) : (
                      option.text
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
              className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
