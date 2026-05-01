const easyMathPatterns = [
  /^what is [\d,.]+\s*(?:×|x|\*|÷|\/|\+|-)\s*[\d,.]+\??$/i,
  /^what is \d+(?:\.\d+)?%\s+of\s+[\d,.]+\??$/i,
  /^a .+ costs? \$?[\d,.]+\.? how much (?:do|does|would)\b/i,
  /^if \d+ .+ costs? \$?[\d,.]+,? how much does one\b/i,
  /^a class has .+ what is the total number\b/i,
  /^a school has \d+ students\. if the student-to-teacher ratio\b/i,
  /^a notebook costs\b/i,
  /^if .* apples cost\b/i,
  /^a rope .+ is cut .+ how many pieces\b/i,
  /^a tank leaks .+ how much water is lost\b/i,
  /^a conference room is booked .+ how many hours\b/i,
  /^a rectangular garden .+ how many meters of fencing\b/i,
  /^if a square has a perimeter .+ what is its area\b/i,
  /^survey results .+ how many chose\b/i,
  /^a survey shows:.+ what percentage prefer\b/i,
  /^how many diagonals does a hexagon have\b/i,
  /^in a dataset:.+ what is the range\??$/i,
  /^weekly temperatures .+ what is the range\b/i,
  /^a company's revenue grew from .+ what is the percentage increase\b/i,
  /^if \d*x \+ \d+y = \d+ and x = \d+, what is y\??$/i,
  /^if \d*x \+ \d+ = \d+, what is x\??$/i,
  /^a factory produces \d+ units\/day with a \d+% defect rate\. how many non-defective units\b/i,
];

const runs = Number(process.argv[2] ?? 5);
let totalFlags = 0;

for (let run = 1; run <= runs; run++) {
  const res = await fetch("http://127.0.0.1:3000/api/test-sessions", { method: "POST" });
  const data = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(data));

  const counts = data.questions.reduce((acc, q) => {
    acc[q.category] = (acc[q.category] || 0) + 1;
    return acc;
  }, {});
  const math = data.questions.filter((q) => q.category === "math_logic");
  const flagged = math.filter((q) => easyMathPatterns.some((pattern) => pattern.test(q.stem.replace(/\s+/g, " "))));
  totalFlags += flagged.length;

  console.log(`RUN ${run} total=${data.questions.length} counts=${JSON.stringify(counts)} math=${math.length} easyFlags=${flagged.length}`);
  for (const q of flagged) console.log(`FLAG ${q.order}: ${q.stem.replace(/\s+/g, " ").slice(0, 180)}`);
  for (const q of math.slice(0, 5)) console.log(`- ${q.stem.replace(/\s+/g, " ").slice(0, 180)}`);
}

console.log(`TOTAL_EASY_FLAGS ${totalFlags}`);
