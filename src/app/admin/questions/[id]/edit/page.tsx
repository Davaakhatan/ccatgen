"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditQuestionPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [category, setCategory] = useState("verbal");
  const [difficulty, setDifficulty] = useState(2);
  const [stem, setStem] = useState("");
  const [options, setOptions] = useState([
    { label: "A", text: "" },
    { label: "B", text: "" },
    { label: "C", text: "" },
    { label: "D", text: "" },
  ]);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/questions?id=${id}`)
      .then((res) => res.json())
      .then((q) => {
        setCategory(q.category);
        setDifficulty(q.difficulty);
        setStem(q.stem);
        setOptions(q.options.map((o: { label: string; text: string }) => ({ label: o.label, text: o.text })));
        const cIdx = q.options.findIndex((o: { id: string }) => o.id === q.correctOptionId);
        setCorrectIndex(cIdx >= 0 ? cIdx : 0);
        setTags(q.tags?.join(", ") || "");
        setLoading(false);
      });
  }, [id]);

  async function handleSave() {
    if (!stem.trim() || options.some((o) => !o.text.trim())) {
      alert("Please fill in all fields.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/questions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          difficulty,
          stem,
          options,
          correctOptionIndex: correctIndex,
          tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });
      if (res.ok) {
        router.push("/admin/questions");
      } else {
        alert("Failed to update question.");
        setSaving(false);
      }
    } catch {
      alert("Failed to update question.");
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading question...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Question</h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="verbal">Verbal</option>
                <option value="math_logic">Math & Logic</option>
                <option value="spatial">Spatial</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(parseInt(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value={1}>Easy</option>
                <option value={2}>Medium</option>
                <option value={3}>Hard</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Question Stem</label>
            <textarea
              value={stem}
              onChange={(e) => setStem(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Options</label>
            {options.map((opt, i) => (
              <div key={opt.label} className="flex items-center gap-3">
                <input
                  type="radio"
                  name="correct"
                  checked={correctIndex === i}
                  onChange={() => setCorrectIndex(i)}
                  className="text-indigo-600"
                />
                <span className="font-medium text-gray-700 w-6">{opt.label}.</span>
                <input
                  type="text"
                  value={opt.text}
                  onChange={(e) => {
                    const newOpts = [...options];
                    newOpts[i] = { ...newOpts[i], text: e.target.value };
                    setOptions(newOpts);
                  }}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Update Question"}
            </button>
            <button
              onClick={() => router.push("/admin/questions")}
              className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
