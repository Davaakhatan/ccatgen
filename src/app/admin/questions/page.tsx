"use client";

import { useEffect, useState } from "react";
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

  function fetchQuestions() {
    const params = new URLSearchParams();
    if (filterCategory) params.set("category", filterCategory);
    if (filterDifficulty) params.set("difficulty", filterDifficulty);
    fetch(`/api/admin/questions?${params}`)
      .then((res) => res.json())
      .then((data) => { setQuestions(data); setLoading(false); });
  }

  useEffect(() => { fetchQuestions(); }, [filterCategory, filterDifficulty]);

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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Question Bank</h1>
            <p className="text-sm text-gray-500 mt-1">
              {questions.length} questions — Verbal: {counts.verbal}, Math & Logic: {counts.math_logic}, Spatial: {counts.spatial}
            </p>
          </div>
          <Link
            href="/admin/questions/new"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            Add Question
          </Link>
        </div>

        <div className="flex gap-3">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
          >
            <option value="">All Categories</option>
            <option value="verbal">Verbal</option>
            <option value="math_logic">Math & Logic</option>
            <option value="spatial">Spatial</option>
          </select>
          <select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
          >
            <option value="">All Difficulties</option>
            <option value="1">Easy</option>
            <option value="2">Medium</option>
            <option value="3">Hard</option>
          </select>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Question</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500 w-28">Category</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500 w-24">Difficulty</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-500 w-28">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {questions.map((q) => (
                  <tr key={q.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-900 truncate max-w-md">{q.stem}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-medium text-indigo-700 bg-indigo-50 px-2 py-1 rounded-full">
                        {categoryLabels[q.category] || q.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${difficultyColors[q.difficulty]}`}>
                        {difficultyLabels[q.difficulty]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <button
                        onClick={() => router.push(`/admin/questions/${q.id}/edit`)}
                        className="text-indigo-600 hover:text-indigo-800 text-xs font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(q.id)}
                        className="text-red-600 hover:text-red-800 text-xs font-medium"
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
