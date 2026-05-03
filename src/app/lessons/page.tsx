import Link from "next/link";

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
    type: "Syllogisms",
    method: "Treat the statements as law. Do not use outside knowledge.",
    moves: ["All A are B does not mean all B are A", "Some means at least one", "Only X can Y means Y -> X", "If location or condition changes, answer uncertain"],
    example: "Rules for East Village class do not prove the same rule in West Village, so the final claim is uncertain.",
  },
  {
    type: "Data interpretation",
    method: "Read the question first, then inspect only the needed row or column.",
    moves: ["Largest increase uses differences, not largest value", "Percentage change = change / original", "More than asks for subtraction after both values are found"],
    example: "From 1200 to 1600 is +400. Percent increase is 400/1200 = 33.3%.",
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
];

const skipSignals = [
  "You cannot identify the question type in 8 seconds.",
  "A math question needs more than two written steps.",
  "A spatial item has more than two competing rules after 20 seconds.",
  "A verbal word is unknown and elimination leaves three choices.",
  "You are rereading the same line without new information.",
];

export default function LessonsPage() {
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

        <section className="grid gap-3 sm:grid-cols-4">
          {timingRules.map((rule) => (
            <div key={rule.title} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="font-semibold">{rule.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{rule.detail}</p>
            </div>
          ))}
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
            Built from public Criteria and Crossover CCAT guidance: 50 questions, 15 minutes, no calculator, verbal/math/spatial categories, no penalty for wrong answers, and Crossover&apos;s emphasis on speed, skipping, and increasing difficulty.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <a href="https://www.criteriacorp.com/candidates/ccat-prep" className="font-semibold text-slate-700 underline">Criteria CCAT prep</a>
            <a href="https://www.crossover.com/resources/ccat-guide" className="font-semibold text-slate-700 underline">Crossover CCAT guide</a>
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
