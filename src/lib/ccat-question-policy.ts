export type CcatQuestionLike = {
  category: "verbal" | "math_logic" | "spatial";
  difficulty?: number;
  stem: string;
  options: { label: string; text: string }[];
  correctLabel?: string;
  tags: string[];
};

export const CCAT_CATEGORY_DISTRIBUTIONS = [
  { category: "verbal", total: 22 },
  { category: "math_logic", total: 17 },
  { category: "spatial", total: 11 },
] as const;

export const CCAT_SECTION_BLUEPRINT = [
  { category: "verbal", total: 6, tags: ["analogy"] },
  { category: "verbal", total: 6, tags: ["antonym"] },
  { category: "verbal", total: 6, tags: ["sentence-completion"] },
  { category: "verbal", total: 4, tags: ["attention-to-detail"] },
  { category: "math_logic", total: 4, tags: ["word-problem", "algebra", "ratio", "percentage"] },
  { category: "math_logic", total: 4, tags: ["number-sequence", "number-series", "letter-series"] },
  { category: "math_logic", total: 3, tags: ["data-interpretation", "graph-interpretation"] },
  { category: "math_logic", total: 4, tags: ["syllogism", "true-false-uncertain", "logical-deduction"] },
  { category: "math_logic", total: 2, tags: ["ordering-logic"] },
  { category: "spatial", total: 4, tags: ["next-in-series", "rotation", "sequence"] },
  { category: "spatial", total: 3, tags: ["matrix"] },
  { category: "spatial", total: 2, tags: ["reflection", "spatial-reasoning", "transformation"] },
  { category: "spatial", total: 2, tags: ["odd-one-out"] },
] as const;

export const CCAT_STYLE_TAGS = {
  verbal: new Set([
    "analogy",
    "antonym",
    "attention-to-detail",
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
    "ordering-logic",
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

const NON_TESTLIKE_STEM_PATTERNS = [
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
  /\bshape pairs\b/i,
  /\bget lighter\b/i,
  /\bgets lighter\b/i,
  /\blighter each time\b/i,
  /\brotates?\b/i,
  /\brotated\b/i,
  /\brotation\b/i,
  /\b\d+°\b/i,
  /\b\d+\s*degrees?\b/i,
  /\bside(?:s)? increase\b/i,
  /\bincrease(?:s|d)?\b.+\bside(?:s)?\b/i,
  /\bwhich is the mirror image\b/i,
  /\bmirror image\b/i,
  /\bcompletes the 2x2\b/i,
  /\bdiagonal opposites\b/i,
  /\bdot moves\b/i,
  /\bshapes inside\b/i,
  /\bhow many peaks\b/i,
  /\bwhich replaces the\b/i,
  /\bwhich pair shows\b/i,
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

const ELEMENTARY_MATH_TAGS = new Set(["basic-math", "percentage"]);

const OFFICIAL_DIRECT_MATH_PATTERNS = [
  /\baverage of\b/i,
  /\bwhat is the (?:third|fourth|fifth) number\b/i,
  /\b\d+(?:\.\d+)?%\s+of\s+what\s+number\b/i,
];

const COMPLEX_WORD_PROBLEM_PATTERNS = [
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

export function hasAnyCcatTag(q: Pick<CcatQuestionLike, "category" | "tags">) {
  return q.tags.some((tag) => CCAT_STYLE_TAGS[q.category].has(tag));
}

export function isCcatStyleQuestion(q: CcatQuestionLike) {
  const isSyllogism = q.category === "math_logic" && q.tags.includes("true-false-uncertain");
  const optionCountIsValid = isSyllogism
    ? q.options.length === 3
    : q.category === "spatial"
      ? q.options.length >= 4 && q.options.length <= 5
      : q.options.length === 5;
  const hasCorrectLabel = q.correctLabel === undefined || q.options.some((option) => option.label === q.correctLabel);
  const givesAwayPattern = NON_TESTLIKE_STEM_PATTERNS.some((pattern) => pattern.test(q.stem));
  const isOfficialDirectMath = OFFICIAL_DIRECT_MATH_PATTERNS.some((pattern) => pattern.test(q.stem));
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
  const isTrustedOriginalDetail =
    q.tags.includes("ccat-original") &&
    q.difficulty !== undefined &&
    q.difficulty >= 2;
  const hasElementaryMathTag =
    q.category === "math_logic" &&
    q.tags.some((tag) => ELEMENTARY_MATH_TAGS.has(tag)) &&
    !isOfficialDirectMath;
  const isUnchallengingWordProblem =
    q.category === "math_logic" &&
    q.tags.includes("word-problem") &&
    q.difficulty !== 3 &&
    !COMPLEX_WORD_PROBLEM_PATTERNS.some((pattern) => pattern.test(q.stem));

  return (
    hasAnyCcatTag(q) &&
    optionCountIsValid &&
    hasCorrectLabel &&
    (!givesAwayPattern || isTrustedOriginalDetail) &&
    !isTooEasyMath &&
    !isTooEasyVerbalOrSpatial &&
    !hasElementaryMathTag &&
    !isUnchallengingWordProblem
  );
}

export function ccatStemKey(q: Pick<CcatQuestionLike, "category" | "stem">) {
  return `${q.category}:${q.stem.replace(/\s+/g, " ").trim().toLowerCase()}`;
}
