type QuestionData = {
  category: "verbal" | "math_logic" | "spatial";
  difficulty: number;
  stem: string;
  options: { label: string; text: string }[];
  correctLabel: string;
  tags: string[];
};

export const letterSeriesHardQuestions: QuestionData[] = [
  {
    category: "math_logic",
    difficulty: 3,
    stem: "What would be the next group of letters in the following series?\n\nab ... cd ... ef ... gh ... ?",
    options: [{ label: "A", text: "hi" }, { label: "B", text: "ij" }, { label: "C", text: "ik" }, { label: "D", text: "jk" }, { label: "E", text: "kl" }],
    correctLabel: "B",
    tags: ["letter-series"],
  },
  {
    category: "math_logic",
    difficulty: 3,
    stem: "What would be the next group of letters in the following series?\n\nbd ... eg ... hj ... km ... ?",
    options: [{ label: "A", text: "ln" }, { label: "B", text: "mp" }, { label: "C", text: "np" }, { label: "D", text: "nq" }, { label: "E", text: "or" }],
    correctLabel: "C",
    tags: ["letter-series"],
  },
  {
    category: "math_logic",
    difficulty: 3,
    stem: "What would be the next group of letters in the following series?\n\naz ... by ... cx ... dw ... ?",
    options: [{ label: "A", text: "eu" }, { label: "B", text: "ev" }, { label: "C", text: "fv" }, { label: "D", text: "ew" }, { label: "E", text: "fu" }],
    correctLabel: "B",
    tags: ["letter-series"],
  },
  {
    category: "math_logic",
    difficulty: 3,
    stem: "What would be the next group of letters in the following series?\n\nace ... bdf ... ceg ... dfh ... ?",
    options: [{ label: "A", text: "efg" }, { label: "B", text: "egi" }, { label: "C", text: "fgh" }, { label: "D", text: "fhj" }, { label: "E", text: "gik" }],
    correctLabel: "B",
    tags: ["letter-series"],
  },
  {
    category: "math_logic",
    difficulty: 3,
    stem: "What would be the next group of letters in the following series?\n\nza ... yb ... xc ... wd ... ?",
    options: [{ label: "A", text: "ue" }, { label: "B", text: "ve" }, { label: "C", text: "vf" }, { label: "D", text: "we" }, { label: "E", text: "ud" }],
    correctLabel: "B",
    tags: ["letter-series"],
  },
  {
    category: "math_logic",
    difficulty: 3,
    stem: "What would be the next group of letters in the following series?\n\nabc ... bce ... ceg ... dgi ... ?",
    options: [{ label: "A", text: "ehj" }, { label: "B", text: "eik" }, { label: "C", text: "ehl" }, { label: "D", text: "fij" }, { label: "E", text: "fhk" }],
    correctLabel: "B",
    tags: ["letter-series"],
  },
  {
    category: "math_logic",
    difficulty: 3,
    stem: "What would be the next group of letters in the following series?\n\nab ... de ... hi ... mn ... ?",
    options: [{ label: "A", text: "rs" }, { label: "B", text: "st" }, { label: "C", text: "tu" }, { label: "D", text: "qr" }, { label: "E", text: "uv" }],
    correctLabel: "B",
    tags: ["letter-series"],
  },
  {
    category: "math_logic",
    difficulty: 3,
    stem: "What would be the next group of letters in the following series?\n\nay ... cw ... eu ... gs ... ?",
    options: [{ label: "A", text: "iq" }, { label: "B", text: "ir" }, { label: "C", text: "hq" }, { label: "D", text: "jq" }, { label: "E", text: "kp" }],
    correctLabel: "A",
    tags: ["letter-series"],
  },
  {
    category: "math_logic",
    difficulty: 3,
    stem: "What would be the next group of letters in the following series?\n\nad ... cf ... eh ... gj ... ?",
    options: [{ label: "A", text: "hk" }, { label: "B", text: "il" }, { label: "C", text: "jm" }, { label: "D", text: "ik" }, { label: "E", text: "jl" }],
    correctLabel: "B",
    tags: ["letter-series"],
  },
  {
    category: "math_logic",
    difficulty: 3,
    stem: "What would be the next group of letters in the following series?\n\nabc ... cde ... ghi ... mno ... ?",
    options: [{ label: "A", text: "tuv" }, { label: "B", text: "uvw" }, { label: "C", text: "vwx" }, { label: "D", text: "stu" }, { label: "E", text: "wxy" }],
    correctLabel: "B",
    tags: ["letter-series"],
  },
  {
    category: "math_logic",
    difficulty: 3,
    stem: "What would be the next group of letters in the following series?\n\naz ... cx ... ev ... gt ... ?",
    options: [{ label: "A", text: "hr" }, { label: "B", text: "ir" }, { label: "C", text: "is" }, { label: "D", text: "jq" }, { label: "E", text: "ks" }],
    correctLabel: "B",
    tags: ["letter-series"],
  },
  {
    category: "math_logic",
    difficulty: 3,
    stem: "What would be the next group of letters in the following series?\n\nabc ... ace ... aeg ... agi ... ?",
    options: [{ label: "A", text: "ahk" }, { label: "B", text: "aik" }, { label: "C", text: "ajk" }, { label: "D", text: "ail" }, { label: "E", text: "akm" }],
    correctLabel: "B",
    tags: ["letter-series"],
  },
  {
    category: "math_logic",
    difficulty: 3,
    stem: "What would be the next group of letters in the following series?\n\nmn ... op ... rs ... vw ... ?",
    options: [{ label: "A", text: "xy" }, { label: "B", text: "yz" }, { label: "C", text: "za" }, { label: "D", text: "wx" }, { label: "E", text: "xz" }],
    correctLabel: "A",
    tags: ["letter-series"],
  },
  {
    category: "math_logic",
    difficulty: 3,
    stem: "What would be the next group of letters in the following series?\n\naaa ... bbb ... ddd ... ggg ... ?",
    options: [{ label: "A", text: "hhh" }, { label: "B", text: "iii" }, { label: "C", text: "jjj" }, { label: "D", text: "kkk" }, { label: "E", text: "lll" }],
    correctLabel: "D",
    tags: ["letter-series"],
  },
  {
    category: "math_logic",
    difficulty: 3,
    stem: "What would be the next group of letters in the following series?\n\nbd ... fh ... jl ... np ... ?",
    options: [{ label: "A", text: "rt" }, { label: "B", text: "qs" }, { label: "C", text: "su" }, { label: "D", text: "rv" }, { label: "E", text: "tw" }],
    correctLabel: "A",
    tags: ["letter-series"],
  },
];
