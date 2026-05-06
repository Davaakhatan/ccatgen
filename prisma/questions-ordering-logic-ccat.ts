type QuestionData = {
  category: "verbal" | "math_logic" | "spatial";
  difficulty: number;
  stem: string;
  options: { label: string; text: string }[];
  correctLabel: string;
  tags: string[];
};

export const orderingLogicCcatQuestions: QuestionData[] = [
  {
    category: "math_logic",
    difficulty: 3,
    stem: "Five reports are reviewed in order. R is before T. S is immediately after R. V is after T but before W. Which report is third?",
    options: [
      { label: "A", text: "R" },
      { label: "B", text: "S" },
      { label: "C", text: "T" },
      { label: "D", text: "V" },
      { label: "E", text: "W" },
    ],
    correctLabel: "C",
    tags: ["ordering-logic", "logical-deduction", "ccat-original"],
  },
  {
    category: "math_logic",
    difficulty: 3,
    stem: "Four tasks A, B, C, and D are completed one at a time. A is not first. B is immediately before C. D is after A. Which order must be correct?",
    options: [
      { label: "A", text: "A, B, C, D" },
      { label: "B", text: "B, C, A, D" },
      { label: "C", text: "D, A, B, C" },
      { label: "D", text: "B, A, C, D" },
      { label: "E", text: "A, D, B, C" },
    ],
    correctLabel: "B",
    tags: ["ordering-logic", "logical-deduction", "ccat-original"],
  },
  {
    category: "math_logic",
    difficulty: 3,
    stem: "M, N, O, P, and Q are ranked from 1st to 5th. O is two places after M. Q is immediately before N. P is not last. If M is 1st, who is 4th?",
    options: [
      { label: "A", text: "N" },
      { label: "B", text: "O" },
      { label: "C", text: "P" },
      { label: "D", text: "Q" },
      { label: "E", text: "M" },
    ],
    correctLabel: "D",
    tags: ["ordering-logic", "logical-deduction", "ccat-original"],
  },
  {
    category: "math_logic",
    difficulty: 3,
    stem: "Six files are processed left to right. F is immediately left of G. H is somewhere right of I. J is at the far right. K is between G and H. Which file must be immediately to the right of F?",
    options: [
      { label: "A", text: "I" },
      { label: "B", text: "G" },
      { label: "C", text: "H" },
      { label: "D", text: "J" },
      { label: "E", text: "K" },
    ],
    correctLabel: "B",
    tags: ["ordering-logic", "logical-deduction", "ccat-original"],
  },
  {
    category: "math_logic",
    difficulty: 3,
    stem: "Three meetings are scheduled before lunch and two after lunch. HR is immediately before Finance. Product is immediately after Finance. Legal is after Product. Sales is after Legal. Which meeting is first?",
    options: [
      { label: "A", text: "Finance" },
      { label: "B", text: "HR" },
      { label: "C", text: "Legal" },
      { label: "D", text: "Product" },
      { label: "E", text: "Sales" },
    ],
    correctLabel: "B",
    tags: ["ordering-logic", "logical-deduction", "ccat-original"],
  },
  {
    category: "math_logic",
    difficulty: 3,
    stem: "A code has five symbols in a row. The star is fourth. The square is immediately right of the circle. The triangle is left of the star. The diamond is last. Which symbol is second?",
    options: [
      { label: "A", text: "Circle" },
      { label: "B", text: "Square" },
      { label: "C", text: "Triangle" },
      { label: "D", text: "Star" },
      { label: "E", text: "Diamond" },
    ],
    correctLabel: "A",
    tags: ["ordering-logic", "logical-deduction", "ccat-original"],
  },
  {
    category: "math_logic",
    difficulty: 3,
    stem: "Five candidates L, M, N, O, and P are interviewed. M is after L. N is before L. O is immediately after M. P is before N. Which candidate is interviewed last?",
    options: [
      { label: "A", text: "L" },
      { label: "B", text: "M" },
      { label: "C", text: "N" },
      { label: "D", text: "O" },
      { label: "E", text: "P" },
    ],
    correctLabel: "D",
    tags: ["ordering-logic", "logical-deduction", "ccat-original"],
  },
  {
    category: "math_logic",
    difficulty: 3,
    stem: "Five packages are stacked from top to bottom. A is above B. C is immediately below D. E is below B. D is above A. Which package is in the middle?",
    options: [
      { label: "A", text: "A" },
      { label: "B", text: "B" },
      { label: "C", text: "C" },
      { label: "D", text: "D" },
      { label: "E", text: "E" },
    ],
    correctLabel: "A",
    tags: ["ordering-logic", "logical-deduction", "ccat-original"],
  },
];
