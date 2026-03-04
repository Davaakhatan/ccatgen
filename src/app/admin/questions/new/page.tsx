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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Add Question</h1>

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
              placeholder="Enter the question..."
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
                  placeholder={`Option ${opt.label}`}
                />
              </div>
            ))}
            <p className="text-xs text-gray-500">Select the radio button for the correct answer.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              placeholder="analogy, vocabulary"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Question"}
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
