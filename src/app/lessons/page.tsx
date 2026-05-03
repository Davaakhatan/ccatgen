"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const timingRules = [
  {
    title: "First pass",
    detail: "Answer anything obvious in under 10 seconds. If setup is unclear, guess, mark it mentally, and move.",
  },
  {
    title: "Math ceiling",
    detail: "Do not spend over 35 seconds unless the equation is already written and almost solved.",
  },
  {
    title: "Verbal ceiling",
    detail: "If two choices still feel equal after elimination, choose the tighter meaning and move.",
  },
  {
    title: "Spatial ceiling",
    detail: "Look for one rule at a time: count, rotation, fill, position, symmetry, then outlier.",
  },
  {
    title: "Forum pattern",
    detail: "Most reports say the clock is the real enemy. Train the 18-second rhythm by isolating weak categories.",
  },
];

const formatStrategy = [
  {
    title: "Four scored domains",
    detail: "Train verbal, numerical, logical, and spatial reasoning. This app groups numerical and logical into one drill, but the lessons separate the solving methods.",
  },
  {
    title: "18-second average",
    detail: "A 50-question, 15-minute test gives about 18 seconds per item. If the method is not visible quickly, eliminate, choose, and keep moving.",
  },
  {
    title: "No-calculator math",
    detail: "Use fractions, estimation, answer testing, and common percentage anchors before formal algebra. Long arithmetic is usually a trap.",
  },
  {
    title: "Crossover score buffer",
    detail: "For a strict 40+/50 target, practice above the line: 43+/50 on full tests and 24+/30 on hard drills before attempting the real assessment.",
  },
];

const verbalLessons = [
  {
    type: "Analogies",
    method: "Name the relationship before reading choices.",
    moves: ["function: knife cuts", "category: rose is a flower", "degree: warm is to hot", "part-whole: wheel is to car", "opposite: expand is to contract"],
    example: "If doctor : hospital, say 'worker -> workplace' before looking for the matching pair.",
  },
  {
    type: "Antonyms",
    method: "Turn the target word into a short plain-English phrase.",
    moves: ["Remove same-direction choices first", "Watch prefixes: un-, in-, dis-, anti-", "If unsure, compare emotional tone: positive, negative, neutral"],
    example: "LACKADAISICAL means low effort, so the opposite must mean energetic or eager.",
  },
  {
    type: "Sentence completion",
    method: "Predict the missing meaning from context before reading choices.",
    moves: ["Use contrast words: although, however, despite", "Use cause words: because, therefore, so", "For two blanks, solve the easier blank first"],
    example: "Despite strong criticism, she remained ___ means the blank should be stable, calm, or firm.",
  },
  {
    type: "Vocabulary guesses",
    method: "Break unfamiliar words into roots and tone.",
    moves: ["bene = good", "mal = bad", "brev = short", "loqu = speak", "cred = believe", "Use answer choices to infer the word family"],
    example: "Credulous relates to believing, so its opposite is skeptical, not quiet or angry.",
  },
  {
    type: "Same relationship pairs",
    method: "Reduce each pair to a two-word relationship label.",
    moves: ["tool -> use", "object -> material", "cause -> effect", "worker -> product", "place -> activity"],
    example: "Author : book is creator -> creation; choose the answer pair with the same relationship.",
  },
  {
    type: "Two-blank completion",
    method: "Solve the emotional direction first, then grammar.",
    moves: ["Mark positive/negative tone", "Reject choices where only one blank works", "Check if the second word makes the sentence too extreme"],
    example: "If the sentence says the manager calmed a conflict, the second blank should not be furious or hostile.",
  },
];

const mathLessons = [
  {
    type: "Averages",
    method: "Use total = average x count.",
    moves: ["Find required total first", "Subtract known values", "Avoid adding twice"],
    example: "Average of 4 numbers is 23. Total is 92. Known sum 47. Missing number 45.",
  },
  {
    type: "Percent of what number",
    method: "Translate directly: part = percent x whole.",
    moves: ["30% of what is 108 -> 0.30x = 108", "Use fractions when faster: 25% = 1/4, 12.5% = 1/8", "Reverse percentage changes by dividing, not subtracting"],
    example: "$60 after 25% off means 75% of original, so original = 60 / 0.75 = 80.",
  },
  {
    type: "Ratios",
    method: "Add ratio parts, divide total by parts, multiply the requested side.",
    moves: ["5:3 total parts = 8", "480 total means each part is 60", "Girls in the 3 side = 180"],
    example: "For 5 boys : 3 girls and 480 students, girls = 3/8 x 480.",
  },
  {
    type: "Rates and work",
    method: "Convert each rate to per-one-unit, then combine.",
    moves: ["Speed: distance = rate x time", "Together work: 1/a + 1/b", "Opposite directions: add speeds", "Catch-up: divide gap by speed difference"],
    example: "A fills in 6 hours and B fills in 3 hours. Together rate is 1/6 + 1/3 = 1/2 tank per hour.",
  },
  {
    type: "Number series",
    method: "Check the simplest rule first, then alternate rules.",
    moves: ["Differences: +3, +5, +7", "Multipliers: x2, x3", "Alternating positions: odd terms and even terms separately", "Squares/cubes: 4, 9, 16, 25"],
    example: "3, 6, 11, 18, 27 has differences 3, 5, 7, 9, so next adds 11.",
  },
  {
    type: "Alphabet pair series",
    method: "Split each group into columns and solve each letter position separately.",
    moves: ["Write A=1 through Z=26 if needed", "For ab, cd, ef: first letters a,c,e and second letters b,d,f both move +2", "For az, by, cx: first letter moves +1, second moves -1", "For bd, eg, hj: both letters move +3", "Watch wraparound after z"],
    example: "ab ... cd ... ef ... gh ... ? becomes first letters a,c,e,g -> i and second letters b,d,f,h -> j, so the answer is ij.",
  },
  {
    type: "Alphabet triple series",
    method: "Treat each slot as its own mini-sequence.",
    moves: ["ACE, BDF, CEG means each slot moves +1", "ABC, ACE, AEG means first slot stays A while second and third move", "If one slot changes faster, solve the slowest slot first", "Reject options with one correct letter but wrong other slots"],
    example: "ace ... bdf ... ceg ... dfh ... ? gives egi because a,b,c,d -> e; c,d,e,f -> g; e,f,g,h -> i.",
  },
  {
    type: "Alphabet skip traps",
    method: "Do not read pairs as words. Read alphabet positions.",
    moves: ["Adjacent pair: ab -> cd -> ef", "Gap pair: bd -> eg -> hj", "Mirror pair: az -> by -> cx", "Increasing jump: ab -> de -> hi -> mn"],
    example: "bd ... eg ... hj ... km ... ? moves +3 in both slots, so the next group is np.",
  },
  {
    type: "Syllogisms",
    method: "Treat the statements as law. Do not use outside knowledge.",
    moves: ["All A are B does not mean all B are A", "Some means at least one", "Only X can Y means Y -> X", "If location or condition changes, answer uncertain"],
    example: "Rules for East Village class do not prove the same rule in West Village, so the final claim is uncertain.",
  },
  {
    type: "Conditional logic",
    method: "Translate statements into arrows and only trust valid reversals.",
    moves: ["If A then B means A -> B", "Not B proves not A", "B alone does not prove A", "Only A are B usually means B -> A"],
    example: "If every approved report is archived, then a report that is not archived cannot be approved.",
  },
  {
    type: "Data interpretation",
    method: "Read the question first, then inspect only the needed row or column.",
    moves: ["Largest increase uses differences, not largest value", "Percentage change = change / original", "More than asks for subtraction after both values are found"],
    example: "From 1200 to 1600 is +400. Percent increase is 400/1200 = 33.3%.",
  },
  {
    type: "Algebra shortcuts",
    method: "Avoid formal algebra when answer testing is faster.",
    moves: ["Plug choices into the equation", "Estimate first to remove far choices", "For linear equations, isolate only once"],
    example: "If 3x + 7 = 31, subtract 7 first, then divide by 3. Do not write extra steps.",
  },
  {
    type: "Probability",
    method: "Use favorable / total and reduce only if choices require it.",
    moves: ["Count target outcomes", "Count all outcomes", "For 'not', subtract from 1", "For without replacement, update both numerator and denominator"],
    example: "5 blue out of 15 total is 5/15, so the answer is 1/3.",
  },
  {
    type: "Mental math anchors",
    method: "Memorize common conversions so the calculator ban does not slow you.",
    moves: ["1/8 = 12.5%", "1/6 = 16.7%", "1/3 = 33.3%", "3/4 = 75%", "x% increase then y% decrease is multiplicative"],
    example: "A 20% drop means multiply by 0.8; reversing it means divide by 0.8.",
  },
];

const spatialLessons = [
  {
    type: "Odd one out",
    method: "Find the shared property across four figures.",
    moves: ["Count shapes", "Compare filled vs empty", "Check missing element", "Check symmetry", "Check orientation"],
    example: "If four options contain circle + triangle + square and one has two squares, choose the one with two squares.",
  },
  {
    type: "Rotation",
    method: "Track one anchor point, not the whole figure.",
    moves: ["Choose a corner, arrowhead, dot, or gap", "Clockwise movement is usually 90 or 45 degrees", "Ignore size if only orientation changes"],
    example: "If a dot moves one corner clockwise each step, the next position is the next corner clockwise.",
  },
  {
    type: "Matrices",
    method: "Solve rows and columns separately.",
    moves: ["Look for add/remove rules", "Look for shape overlay", "Look for count progression", "If row rule fails, test column rule"],
    example: "If row 3 must combine the first two cells like rows 1 and 2, build the missing cell from that operation.",
  },
  {
    type: "Shape series",
    method: "List all changing features, then predict only the next change.",
    moves: ["Shape type", "Number of sides", "Fill", "Rotation", "Dot position", "Inner shape"],
    example: "Triangle, square, pentagon means sides increase by one; next is hexagon unless another feature alternates.",
  },
  {
    type: "Reflection",
    method: "Mirror left-right or top-bottom, then compare exact orientation.",
    moves: ["A reflected arrow reverses direction", "A rotated figure keeps handedness", "A reflected figure changes handedness"],
    example: "If a flag is on the right side before reflection, it should appear on the left side after reflection.",
  },
  {
    type: "Overlay rules",
    method: "When two cells combine, compare what survives and what disappears.",
    moves: ["Same + same may cancel", "Different may combine", "Filled plus empty may become filled", "Track one symbol at a time"],
    example: "If row cells combine dots from the first two figures, the missing cell should contain the union of those dot positions.",
  },
  {
    type: "Counting rules",
    method: "Count elements before interpreting the drawing.",
    moves: ["Outer sides", "Inner shapes", "Dots", "Line segments", "Filled regions"],
    example: "If every step adds one line and alternates fill, solve count first and fill second.",
  },
];

const categoryCoverage = [
  {
    label: "Verbal",
    count: "22",
    items: ["Analogies", "Antonyms", "Sentence completion", "Two-blank context", "Vocabulary roots"],
  },
  {
    label: "Numerical & Logical",
    count: "17",
    items: ["Averages", "Percentages", "Ratios", "Rates", "Work", "Number series", "Letter series", "Data", "Syllogisms", "Conditionals", "Probability"],
  },
  {
    label: "Spatial",
    count: "11",
    items: ["Odd one out", "Shape series", "Rotation", "Reflection", "Matrices", "Overlay", "Counting"],
  },
];

const alphabetPatterns = [
  { name: "Adjacent pairs", pattern: "ab ... cd ... ef ... gh", answer: "ij", rule: "Both slots move +2." },
  { name: "Skip pairs", pattern: "bd ... eg ... hj ... km", answer: "np", rule: "Both slots move +3." },
  { name: "Mirror pairs", pattern: "az ... by ... cx ... dw", answer: "ev", rule: "First slot +1, second slot -1." },
  { name: "Triple columns", pattern: "ace ... bdf ... ceg ... dfh", answer: "egi", rule: "Solve first, second, third letters separately." },
  { name: "Increasing jumps", pattern: "ab ... de ... hi ... mn", answer: "st", rule: "Starting letters jump +3, +4, +5, then +6." },
];

const skipSignals = [
  "You cannot identify the question type in 8 seconds.",
  "A math question needs more than two written steps.",
  "A spatial item has more than two competing rules after 20 seconds.",
  "A verbal word is unknown and elimination leaves three choices.",
  "You are rereading the same line without new information.",
];

export default function LessonsPage() {
  const router = useRouter();
  const [loadingCategory, setLoadingCategory] = useState<string | null>(null);

  async function startPractice(payload: { category?: "verbal" | "math_logic" | "spatial"; mode?: "hard" }) {
    setLoadingCategory(payload.category ?? payload.mode ?? null);
    try {
      const res = await fetch("/api/test-sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      router.push(`/test/${data.sessionId}`);
    } catch {
      alert("Failed to start category drill.");
      setLoadingCategory(null);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-base font-bold tracking-tight">CCAT Practice</Link>
        <Link href="/test/instructions" className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800">
          Start Test
        </Link>
      </nav>

      <main className="mx-auto max-w-6xl space-y-6 px-4 pb-12 pt-6 sm:px-6">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Crossover CCAT lessons</p>
          <h1 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">Fast solving methods for every CCAT category</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            The goal is not perfect solving. The goal is fast recognition, aggressive elimination, and moving before one hard question damages the whole test.
          </p>
        </section>

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {timingRules.map((rule) => (
            <div key={rule.title} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="font-semibold">{rule.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{rule.detail}</p>
            </div>
          ))}
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Public Format Strategy</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Public CCAT format overviews are useful for strategy, not for copying questions. The important takeaway is that the test punishes slow solving more than weak knowledge.
          </p>
          <div className="mt-4 grid gap-4 lg:grid-cols-4">
            {formatStrategy.map((item) => (
              <div key={item.title} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">40+ Training Protocol</h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <h3 className="font-semibold text-amber-950">Score target</h3>
              <p className="mt-2 text-sm leading-6 text-amber-900">
                For a 40+/50 requirement, your practice target is 43+/50 on full tests and 24+/30 on hard mixed drills. That buffer protects you from test-day pressure.
              </p>
            </div>
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <h3 className="font-semibold text-amber-950">Training rule</h3>
              <p className="mt-2 text-sm leading-6 text-amber-900">
                Do not move to the real test until you can hit the target twice in a row without pausing, searching, or extending time.
              </p>
            </div>
          </div>
          <button
            onClick={() => startPractice({ mode: "hard" })}
            disabled={loadingCategory !== null}
            className="mt-4 rounded-lg bg-amber-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-amber-800 disabled:opacity-50"
          >
            {loadingCategory === "hard" ? "Starting..." : "Start 40+ Hard Mixed Drill"}
          </button>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">All CCAT Categories Covered</h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {categoryCoverage.map((category) => (
              <div key={category.label} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{category.label}</h3>
                  <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-600">{category.count} in full test</span>
                </div>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {category.items.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">One-Category Timed Drills</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Public discussion around CCAT prep repeatedly points to pacing as the main problem. Use these 20-question, 6-minute drills to build category-specific speed before taking the full mixed test.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <button
              onClick={() => startPractice({ category: "verbal" })}
              disabled={loadingCategory !== null}
              className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-100 disabled:opacity-50"
            >
              {loadingCategory === "verbal" ? "Starting..." : "Verbal Drill"}
            </button>
            <button
              onClick={() => startPractice({ category: "math_logic" })}
              disabled={loadingCategory !== null}
              className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-100 disabled:opacity-50"
            >
              {loadingCategory === "math_logic" ? "Starting..." : "Numerical & Logic Drill"}
            </button>
            <button
              onClick={() => startPractice({ category: "spatial" })}
              disabled={loadingCategory !== null}
              className="rounded-lg border border-violet-200 bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-700 transition-colors hover:bg-violet-100 disabled:opacity-50"
            >
              {loadingCategory === "spatial" ? "Starting..." : "Spatial Drill"}
            </button>
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Alphabet Series Speed Sheet</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            These letter-pair and letter-group questions are official-style logic items. The fast method is always the same: split the group into slots, convert letters to movement, then compare choices.
          </p>
          <div className="mt-4 grid gap-3 lg:grid-cols-5">
            {alphabetPatterns.map((item) => (
              <div key={item.name} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-sm font-semibold">{item.name}</h3>
                <p className="mt-2 font-mono text-sm text-slate-700">{item.pattern}</p>
                <p className="mt-2 text-sm font-semibold text-slate-950">Next: {item.answer}</p>
                <p className="mt-2 text-xs leading-5 text-slate-600">{item.rule}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Verbal Reasoning</h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {verbalLessons.map((lesson) => (
              <LessonBlock key={lesson.type} accent="blue" {...lesson} />
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Math & Logic</h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {mathLessons.map((lesson) => (
              <LessonBlock key={lesson.type} accent="emerald" {...lesson} />
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Spatial Reasoning</h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {spatialLessons.map((lesson) => (
              <LessonBlock key={lesson.type} accent="violet" {...lesson} />
            ))}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">When To Skip</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
              {skipSignals.map((signal) => (
                <li key={signal} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-red-500" />
                  {signal}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">15-Minute Plan</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <PlanStep time="0-5 min" target="Clear easy items" detail="Take the obvious verbal, direct math, and simple spatial items fast." />
              <PlanStep time="5-11 min" target="Work medium items" detail="Use paper for short equations and skip any visual rule that does not reveal itself." />
              <PlanStep time="11-15 min" target="Guess and finish" detail="Do not leave blanks. Use elimination and choose the most likely option." />
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Source Notes</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Built from public Criteria, Crossover, and TestCCAT-style format guidance plus public candidate discussion patterns: 50 questions, 15 minutes, no calculator, verbal/numerical/logical/spatial categories, no penalty for wrong answers, increasing difficulty, and heavy emphasis on 18-second pacing.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <a href="https://www.criteriacorp.com/candidates/ccat-prep" className="font-semibold text-slate-700 underline">Criteria CCAT prep</a>
            <a href="https://www.crossover.com/resources/ccat-guide" className="font-semibold text-slate-700 underline">Crossover CCAT guide</a>
            <a href="https://testccat.com/ccat-exam-format-overview" className="font-semibold text-slate-700 underline">TestCCAT format overview</a>
            <a href="https://www.reddit.com/r/recruitinghell/comments/1rybr97/ccat_exam/" className="font-semibold text-slate-700 underline">Reddit timing discussion</a>
          </div>
        </section>
      </main>
    </div>
  );
}

function LessonBlock({
  type,
  method,
  moves,
  example,
  accent,
}: {
  type: string;
  method: string;
  moves: string[];
  example: string;
  accent: "blue" | "emerald" | "violet";
}) {
  const accentClass = {
    blue: "border-blue-500",
    emerald: "border-emerald-500",
    violet: "border-violet-500",
  }[accent];

  return (
    <article className={`border-l-4 ${accentClass} rounded-r-lg bg-slate-50 p-4`}>
      <h3 className="font-semibold">{type}</h3>
      <p className="mt-2 text-sm font-medium text-slate-800">{method}</p>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
        {moves.map((move) => (
          <li key={move}>- {move}</li>
        ))}
      </ul>
      <p className="mt-3 rounded-lg border border-slate-200 bg-white p-3 text-sm leading-6 text-slate-600">
        {example}
      </p>
    </article>
  );
}

function PlanStep({ time, target, detail }: { time: string; target: string; detail: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{time}</div>
      <h3 className="mt-2 font-semibold">{target}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{detail}</p>
    </div>
  );
}
