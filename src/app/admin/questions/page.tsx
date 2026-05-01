"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Question = {
  id: string;
  category: string;
  difficulty: number;
  stem: string;
  options: { id: string; label: string; text: string }[];
};

const difficultyLabels: Record<number, string> = { 1: "Easy", 2: "Medium", 3: "Hard" };
const difficultyColors: Record<number, string> = {
  1: "bg-green-100 text-green-700",
  2: "bg-amber-100 text-amber-700",
  3: "bg-red-100 text-red-700",
};
const categoryLabels: Record<string, string> = {
  verbal: "Verbal",
  math_logic: "Math & Logic",
  spatial: "Spatial",
};

export default function AdminQuestionsPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("");

  const fetchQuestions = useCallback(() => {
    const params = new URLSearchParams();
    if (filterCategory) params.set("category", filterCategory);
    if (filterDifficulty) params.set("difficulty", filterDifficulty);
    fetch(`/api/admin/questions?${params}`)
      .then((res) => res.json())
      .then((data) => { setQuestions(data); setLoading(false); });
  }, [filterCategory, filterDifficulty]);

  useEffect(() => { fetchQuestions(); }, [fetchQuestions]);

  async function handleDelete(id: string) {
    if (!confirm("Delete this question?")) return;
    await fetch(`/api/admin/questions/${id}`, { method: "DELETE" });
    fetchQuestions();
  }

  const counts = {
    verbal: questions.filter((q) => q.category === "verbal").length,
    math_logic: questions.filter((q) => q.category === "math_logic").length,
    spatial: questions.filter((q) => q.category === "spatial").length,
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 text-slate-950 sm:p-6">
      <div className="mx-auto max-w-6xl space-y-5">
        <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Admin</p>
            <h1 className="mt-1 text-2xl font-bold">Question Bank</h1>
            <p className="mt-1 text-sm text-slate-500">
              {questions.length} questions — Verbal: {counts.verbal}, Math & Logic: {counts.math_logic}, Spatial: {counts.spatial}
            </p>
          </div>
          <Link
            href="/admin/questions/new"
            className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800"
          >
            Add Question
          </Link>
        </div>

        <div className="flex flex-wrap gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
          >
            <option value="">All Categories</option>
            <option value="verbal">Verbal</option>
            <option value="math_logic">Math & Logic</option>
            <option value="spatial">Spatial</option>
          </select>
          <select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
          >
            <option value="">All Difficulties</option>
            <option value="1">Easy</option>
            <option value="2">Medium</option>
            <option value="3">Hard</option>
          </select>
        </div>

        {loading ? (
          <p className="text-slate-500">Loading...</p>
        ) : (
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-slate-500">Question</th>
                  <th className="w-32 px-4 py-3 text-left font-medium text-slate-500">Category</th>
                  <th className="w-28 px-4 py-3 text-left font-medium text-slate-500">Difficulty</th>
                  <th className="w-28 px-4 py-3 text-right font-medium text-slate-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {questions.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50">
                    <td className="max-w-md truncate px-4 py-3 text-slate-900">{q.stem}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
                        {categoryLabels[q.category] || q.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${difficultyColors[q.difficulty]}`}>
                        {difficultyLabels[q.difficulty]}
                      </span>
                    </td>
                    <td className="space-x-2 px-4 py-3 text-right">
                      <button
                        onClick={() => router.push(`/admin/questions/${q.id}/edit`)}
                        className="text-xs font-medium text-slate-700 hover:text-slate-950"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(q.id)}
                        className="text-xs font-medium text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
