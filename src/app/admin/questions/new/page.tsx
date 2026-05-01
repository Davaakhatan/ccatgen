"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewQuestionPage() {
  const router = useRouter();
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
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!stem.trim() || options.some((o) => !o.text.trim())) {
      alert("Please fill in all fields.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/questions", {
        method: "POST",
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
        alert("Failed to save question.");
        setSaving(false);
      }
    } catch {
      alert("Failed to save question.");
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 text-slate-950 sm:p-6">
      <div className="mx-auto max-w-2xl space-y-5">
        <h1 className="text-2xl font-bold">Add Question</h1>

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
              placeholder="Enter the question..."
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
                  placeholder={`Option ${opt.label}`}
                />
              </div>
            ))}
            <p className="text-xs text-slate-500">Select the radio button for the correct answer.</p>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Tags (comma-separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              placeholder="analogy, vocabulary"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-lg bg-slate-950 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Question"}
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
