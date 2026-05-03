import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import vm from "node:vm";
import ts from "typescript";

const prismaDir = path.resolve("prisma");
const require = createRequire(import.meta.url);
const bankFiles = fs
  .readdirSync(prismaDir)
  .filter((file) => (file.startsWith("questions") || file === "spatial-questions.ts") && file.endsWith(".ts"))
  .sort();

const ccatStyleTags = {
  verbal: new Set([
    "analogy",
    "antonym",
    "sentence-completion",
  ]),
  math_logic: new Set([
    "algebra",
    "data-interpretation",
    "graph-interpretation",
    "letter-series",
    "logical-deduction",
    "number-sequence",
    "number-series",
    "percentage",
    "ratio",
    "syllogism",
    "true-false-uncertain",
    "word-problem",
  ]),
  spatial: new Set([
    "matrix",
    "next-in-series",
    "odd-one-out",
    "reflection",
    "rotation",
    "sequence",
    "spatial-reasoning",
    "transformation",
  ]),
};

const nonTestlikeStemPatterns = [
  /\btrue,?\s+false,?\s+or\s+uncertain\b/i,
  /\bcolumn a\b/i,
  /\bleft-hand column\b/i,
  /\bright-hand column\b/i,
  /\bexactly identical\b/i,
  /\bwhich column has a greater value\b/i,
  /\bwhich word (?:does not|doesn'?t|does NOT) belong\b/i,
  /\bwhich word means the same as\b/i,
  /\bmost nearly means\b/i,
  /\bin the sentence\b.+\bwhat does\b/i,
  /\bthe pacific ocean\b/i,
  /\bvenus is the closest planet\b/i,
  /\bthere are 365 days in a leap year\b/i,
  /\bhow many days are in a leap year\b/i,
  /^what is [\d,.]+\s*(?:×|x|\*|÷|\/|\+|-)\s*[\d,.]+\??$/i,
  /^what is \d+(?:\.\d+)?%\s+of\s+[\d,.]+\??$/i,
  /^what is the least common multiple\b/i,
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
  /^a company'?s revenue grew from .+ what is the percentage increase\b/i,
  /^if \d*x \+ \d+y = \d+ and x = \d+, what is y\??$/i,
  /^if \d*x \+ \d+ = \d+, what is x\??$/i,
  /^a factory produces \d+ units\/day with a \d+% defect rate\. how many non-defective units\b/i,
  /^a group of \d+ friends shares a restaurant bill\b/i,
  /^a store marks up goods\b/i,
  /^if the original cost is\b/i,
  /\btruth-teller\b/i,
  /\bliar always lies\b/i,
  /\bidentical-looking coins\b/i,
  /\bbalance scale\b/i,
  /\bswitches control .* lights\b/i,
  /\bminimum number of switches\b/i,
  /\bsit in a row\b/i,
  /\bseated in a row\b/i,
  /\bfinished a race\b/i,
  /\bwho finished\b/i,
  /\bwhat is the finishing order\b/i,
  /\bwhat color is the\b/i,
  /\bhouses are in a row\b/i,
  /\bminimum number of weighings\b/i,
  /\bhow many different .* arrangements\b/i,
  /\beach shape adds\b/i,
  /\brules:/i,
  /\b3 rules\b/i,
  /\bnumber of sides increases\b/i,
  /\bthe number of sides increases\b/i,
  /\bcircles grow\b/i,
  /\bsquares grow\b/i,
  /\bgrows\b/i,
  /\brow rule\b/i,
  /\bcolumn rule\b/i,
  /\brow \d:/i,
  /\bcolumn \d:/i,
  /^3x3 matrix\b/i,
  /\bcircle, square, diamond repeats\b/i,
  /\bstars alternate\b/i,
  /\bnumber of inner shapes\b/i,
  /\badds a dot\b/i,
  /\bnext corner clockwise\b/i,
  /\bcombines the dots\b/i,
  /\bcombines\b/i,
  /\balternate fills\b/i,
  /\bbig and small shapes\b/i,
  /\bwhat pair comes next\b/i,
  /\bwhat goes in\b/i,
  /\btop-left\b/i,
  /\btop-right\b/i,
  /\bbottom-left\b/i,
  /\bbottom-right\b/i,
  /\beach row sums\b/i,
  /\bfilled portion increases\b/i,
  /\bunit cubes\b/i,
  /^3x3 grid:/i,
  /\bif you cut\b.+\bhow many edges\b/i,
  /\bsquare paper is folded\b/i,
  /\beach row has\b/i,
  /\beach row follows\b/i,
  /\bpattern:/i,
  /\bthe pattern is\b/i,
  /\bdots increase\b/i,
  /\bshape changes\b/i,
  /\bshapes gain\b/i,
  /\bgain one side\b/i,
  /\bsize increases\b/i,
  /\bfill darkens\b/i,
  /\bfill alternates\b/i,
  /\binner shape changes\b/i,
  /\bwhat fills\b/i,
  /\bempty becomes filled\b/i,
  /^3x3 matrix:/i,
  /\bhow many sides does this shape have\b/i,
  /\bcan be folded into\b/i,
  /\bopen-top box\b/i,
  /\bdifferent order\b/i,
  /\bconsider both\b/i,
];

const elementaryMathTags = new Set(["basic-math", "percentage"]);

const officialDirectMathPatterns = [
  /\baverage of\b/i,
  /\bwhat is the (?:third|fourth|fifth) number\b/i,
  /\b\d+(?:\.\d+)?%\s+of\s+what\s+number\b/i,
];

const complexWordProblemPatterns = [
  /\baverage speed\b/i,
  /\btoward each other\b/i,
  /\btogether\b/i,
  /\bworkers?\b/i,
  /\bpipes?\b/i,
  /\bcompound(?:ed)?\b/i,
  /\binvest(?:ment|ed)\b/i,
  /\bdepreciat(?:es|ion|ed)\b/i,
  /\bpopulation\b/i,
  /\bprobability\b/i,
  /\bconsecutive\b/i,
  /\bremainder\b/i,
  /\bratio\b/i,
  /\brate of\b/i,
  /\bpercent(?:age)? (?:increase|decrease|change)\b/i,
  /\bprofit margin\b/i,
  /\byear-over-year\b/i,
];

function loadBank(file) {
  const source = fs.readFileSync(path.join(prismaDir, file), "utf8");
  const js = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;
  const sandbox = {
    exports: {},
    module: { exports: {} },
    require,
    console,
    Math,
    Array,
    String,
    Number,
    Object,
    Set,
  };
  sandbox.exports = sandbox.module.exports;
  vm.createContext(sandbox);
  vm.runInContext(js, sandbox, { filename: file });

  return Object.values(sandbox.module.exports)
    .filter(Array.isArray)
    .flat();
}

function normalizeCcatQuestion(q) {
  if (q.tags?.includes("true-false-uncertain")) {
    return { ...q, category: "math_logic" };
  }

  return q;
}

function isCcatStyle(q) {
  const allowedTags = ccatStyleTags[q.category];
  const hasAllowedTag = q.tags?.some((tag) => allowedTags?.has(tag)) ?? false;
  const isSyllogism = q.category === "math_logic" && q.tags.includes("true-false-uncertain");
  const optionCountIsValid = isSyllogism
    ? q.options.length === 3
    : q.category === "spatial"
      ? q.options.length >= 4 && q.options.length <= 5
      : q.options.length === 5;
  const givesAwayPattern = nonTestlikeStemPatterns.some((pattern) => pattern.test(q.stem));
  const isOfficialDirectMath = officialDirectMathPatterns.some((pattern) => pattern.test(q.stem));
  const isPatternSeries =
    q.category === "math_logic" &&
    (q.tags.includes("letter-series") || q.tags.includes("number-sequence") || q.tags.includes("number-series"));
  const isTooEasyMath =
    q.category === "math_logic" &&
    q.difficulty !== undefined &&
    q.difficulty < 3 &&
    !isSyllogism &&
    !isOfficialDirectMath &&
    !(isPatternSeries && q.difficulty >= 2);
  const isTooEasyVerbalOrSpatial =
    (q.category === "verbal" || q.category === "spatial") &&
    q.difficulty !== undefined &&
    q.difficulty < 2;
  const hasElementaryMathTag =
    q.category === "math_logic" &&
    q.tags.some((tag) => elementaryMathTags.has(tag)) &&
    !isOfficialDirectMath;
  const isUnchallengingWordProblem =
    q.category === "math_logic" &&
    q.tags.includes("word-problem") &&
    q.difficulty !== 3 &&
    !complexWordProblemPatterns.some((pattern) => pattern.test(q.stem));

  return (
    hasAllowedTag &&
    optionCountIsValid &&
    q.options.some((option) => option.label === q.correctLabel) &&
    !givesAwayPattern &&
    !isTooEasyMath &&
    !isTooEasyVerbalOrSpatial &&
    !hasElementaryMathTag &&
    !isUnchallengingWordProblem
  );
}

const questions = [];
for (const file of bankFiles) {
  loadBank(file).forEach((q, index) => questions.push({ ...normalizeCcatQuestion(q), file, number: index + 1 }));
}

const seen = new Map();
const stats = {
  total: questions.length,
  ccatStyle: 0,
  nonCcatStyle: 0,
  missingCorrectLabel: 0,
  invalidOptionCount: 0,
  duplicateStems: 0,
  byCategory: {},
};
const examples = {
  nonCcatStyle: [],
  missingCorrectLabel: [],
  invalidOptionCount: [],
  duplicateStems: [],
};

for (const q of questions) {
  stats.byCategory[q.category] ??= { total: 0, ccatStyle: 0 };
  stats.byCategory[q.category].total += 1;

  const validOptionCount = q.tags.includes("true-false-uncertain")
    ? q.options.length === 3
    : q.category === "spatial"
      ? q.options.length >= 4 && q.options.length <= 5
      : q.options.length === 5;
  const hasCorrectLabel = q.options.some((option) => option.label === q.correctLabel);
  const ccatStyle = isCcatStyle(q);

  if (ccatStyle) {
    stats.ccatStyle += 1;
    stats.byCategory[q.category].ccatStyle += 1;
  } else {
    stats.nonCcatStyle += 1;
    if (examples.nonCcatStyle.length < 10) examples.nonCcatStyle.push(q);
  }

  if (!validOptionCount) {
    stats.invalidOptionCount += 1;
    if (examples.invalidOptionCount.length < 10) examples.invalidOptionCount.push(q);
  }
  if (!hasCorrectLabel) {
    stats.missingCorrectLabel += 1;
    if (examples.missingCorrectLabel.length < 10) examples.missingCorrectLabel.push(q);
  }

  const stemKey = `${q.category}:${q.stem.replace(/\s+/g, " ").trim().toLowerCase()}`;
  if (seen.has(stemKey)) {
    stats.duplicateStems += 1;
    if (examples.duplicateStems.length < 10) examples.duplicateStems.push({ ...q, duplicateOf: seen.get(stemKey) });
  } else {
    seen.set(stemKey, `${q.file} #${q.number}`);
  }
}

function printExamples(title, items) {
  if (items.length === 0) return;
  console.log(`\n${title}`);
  for (const q of items) {
    const prefix = `${q.file} #${q.number}`;
    const duplicate = q.duplicateOf ? ` duplicate of ${q.duplicateOf}` : "";
    console.log(`- ${prefix}${duplicate}: ${q.stem.replace(/\s+/g, " ").slice(0, 140)}`);
  }
}

console.log("Question bank audit");
console.log(JSON.stringify(stats, null, 2));
printExamples("Non-CCAT-style examples", examples.nonCcatStyle);
printExamples("Invalid option-count examples", examples.invalidOptionCount);
printExamples("Duplicate-stem examples", examples.duplicateStems);
printExamples("Missing-correct-label examples", examples.missingCorrectLabel);
