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
    { label: "E", text: "" },
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
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-500">Loading question...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 text-slate-950 sm:p-6">
      <div className="mx-auto max-w-2xl space-y-5">
        <h1 className="text-2xl font-bold">Edit Question</h1>

        <div className="space-y-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              >
                <option value="verbal">Verbal</option>
                <option value="math_logic">Math & Logic</option>
                <option value="spatial">Spatial</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(parseInt(e.target.value))}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              >
                <option value={1}>Easy</option>
                <option value={2}>Medium</option>
                <option value={3}>Hard</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Question Stem</label>
            <textarea
              value={stem}
              onChange={(e) => setStem(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">Options</label>
            {options.map((opt, i) => (
              <div key={opt.label} className="flex items-center gap-3">
                <input
                  type="radio"
                  name="correct"
                  checked={correctIndex === i}
                  onChange={() => setCorrectIndex(i)}
                  className="text-slate-950 focus:ring-slate-950"
                />
                <span className="w-6 font-medium text-slate-700">{opt.label}.</span>
                <input
                  type="text"
                  value={opt.text}
                  onChange={(e) => {
                    const newOpts = [...options];
                    newOpts[i] = { ...newOpts[i], text: e.target.value };
                    setOptions(newOpts);
                  }}
                  className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Tags (comma-separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-lg bg-slate-950 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Update Question"}
            </button>
            <button
              onClick={() => router.push("/admin/questions")}
              className="rounded-lg border border-slate-300 px-6 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
