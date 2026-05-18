type QuestionData = {
  category: "verbal" | "math_logic" | "spatial";
  difficulty: number;
  stem: string;
  options: { label: string; text: string }[];
  correctLabel: string;
  tags: string[];
};

const original = "ccat-original";
const solution = (text: string) => `solution:${text}`;

export const ccatCuratedExpansionQuestions: QuestionData[] = [
  {
    category: "math_logic",
    difficulty: 3,
    stem: "A vendor sold 40% of its laptops in the morning and 25% of the remaining laptops in the afternoon. If 90 laptops were left unsold, how many laptops did the vendor start with?",
    options: [{ label: "A", text: "160" }, { label: "B", text: "180" }, { label: "C", text: "200" }, { label: "D", text: "220" }, { label: "E", text: "240" }],
    correctLabel: "C",
    tags: ["word-problem", "percentage", original, solution("After selling 40%, 60% remain. Selling 25% of that leaves 75% of 60%, or 45% of the original. If 45% is 90, the original is 90 / 0.45 = 200.")],
  },
  {
    category: "math_logic",
    difficulty: 3,
    stem: "A team completes 3/8 of a project on Monday and 1/4 of the project on Tuesday. What fraction of the project remains?",
    options: [{ label: "A", text: "1/8" }, { label: "B", text: "1/4" }, { label: "C", text: "3/8" }, { label: "D", text: "5/8" }, { label: "E", text: "7/8" }],
    correctLabel: "C",
    tags: ["word-problem", "ratio", original, solution("Convert 1/4 to 2/8. Finished is 3/8 + 2/8 = 5/8, so remaining is 3/8.")],
  },
  {
    category: "math_logic",
    difficulty: 3,
    stem: "The ratio of junior analysts to senior analysts is 5:3. If 12 senior analysts are added and the ratio becomes 5:5, how many junior analysts are there?",
    options: [{ label: "A", text: "20" }, { label: "B", text: "24" }, { label: "C", text: "30" }, { label: "D", text: "36" }, { label: "E", text: "40" }],
    correctLabel: "C",
    tags: ["word-problem", "ratio", original, solution("Let the original ratio be 5x juniors and 3x seniors. After adding 12 seniors, seniors equal juniors: 3x + 12 = 5x, so x = 6. Juniors = 5x = 30.")],
  },
  {
    category: "math_logic",
    difficulty: 3,
    stem: "A store's sales were $8,000 in April and $9,600 in May. By what percentage did sales increase?",
    options: [{ label: "A", text: "16%" }, { label: "B", text: "18%" }, { label: "C", text: "20%" }, { label: "D", text: "24%" }, { label: "E", text: "28%" }],
    correctLabel: "C",
    tags: ["data-interpretation", "percentage", original, solution("Increase is 9,600 - 8,000 = 1,600. Percentage increase is 1,600 / 8,000 = 0.20 = 20%.")],
  },
  {
    category: "math_logic",
    difficulty: 3,
    stem: "A machine makes 150 parts in 25 minutes. At the same rate, how many parts will it make in 1 hour and 10 minutes?",
    options: [{ label: "A", text: "360" }, { label: "B", text: "390" }, { label: "C", text: "405" }, { label: "D", text: "420" }, { label: "E", text: "450" }],
    correctLabel: "D",
    tags: ["word-problem", "rate", original, solution("150 parts in 25 minutes is 6 parts per minute. 1 hour 10 minutes is 70 minutes, so 70 x 6 = 420 parts.")],
  },
  {
    category: "math_logic",
    difficulty: 3,
    stem: "What is the next number in the series? 4, 9, 19, 39, 79",
    options: [{ label: "A", text: "119" }, { label: "B", text: "139" }, { label: "C", text: "149" }, { label: "D", text: "159" }, { label: "E", text: "169" }],
    correctLabel: "D",
    tags: ["number-series", "number-sequence", original, solution("Each term doubles and adds 1: 4 x 2 + 1 = 9, 9 x 2 + 1 = 19, and so on. Next is 79 x 2 + 1 = 159.")],
  },
  {
    category: "math_logic",
    difficulty: 3,
    stem: "What is the next number in the series? 81, 27, 54, 18, 36, 12",
    options: [{ label: "A", text: "6" }, { label: "B", text: "18" }, { label: "C", text: "24" }, { label: "D", text: "30" }, { label: "E", text: "42" }],
    correctLabel: "C",
    tags: ["number-series", "number-sequence", original, solution("The repeating rule is divide by 3, then multiply by 2: 81 -> 27 -> 54 -> 18 -> 36 -> 12, so next is 12 x 2 = 24.")],
  },
  {
    category: "math_logic",
    difficulty: 3,
    stem: "What would be the next group of letters in the following series?\n\ncf ... eh ... gk ... in ... ?",
    options: [{ label: "A", text: "kp" }, { label: "B", text: "kq" }, { label: "C", text: "lp" }, { label: "D", text: "lq" }, { label: "E", text: "mr" }],
    correctLabel: "B",
    tags: ["letter-series", original, solution("First letters move c, e, g, i, so next is k. Second letters move f, h, k, n with jumps +2, +3, +3; continuing the +3 pattern gives q. The next group is kq.")],
  },
  {
    category: "math_logic",
    difficulty: 3,
    stem: "Assumptions: All approved invoices are archived. Some archived invoices are flagged. Conclusion: Some approved invoices are flagged. If the assumptions are true, is the conclusion correct, incorrect, or cannot be determined?",
    options: [{ label: "A", text: "Correct" }, { label: "B", text: "Cannot be determined based on the information available" }, { label: "C", text: "Incorrect" }],
    correctLabel: "B",
    tags: ["true-false-uncertain", "syllogism", original, solution("Approved invoices are inside the archived group, but the flagged archived invoices could be different archived invoices. The conclusion is possible but not forced.")],
  },
  {
    category: "math_logic",
    difficulty: 3,
    stem: "Assumptions: No temporary staff are team leads. All team leads attend the planning meeting. Conclusion: Some temporary staff attend the planning meeting. If the assumptions are true, is the conclusion correct, incorrect, or cannot be determined?",
    options: [{ label: "A", text: "Correct" }, { label: "B", text: "Cannot be determined based on the information available" }, { label: "C", text: "Incorrect" }],
    correctLabel: "B",
    tags: ["true-false-uncertain", "syllogism", original, solution("The assumptions tell us temporary staff are not team leads and team leads attend. They say nothing about whether temporary staff attend by another reason.")],
  },
  {
    category: "verbal",
    difficulty: 2,
    stem: "Cautious is to reckless as meticulous is to:",
    options: [{ label: "A", text: "careless" }, { label: "B", text: "precise" }, { label: "C", text: "patient" }, { label: "D", text: "nervous" }, { label: "E", text: "orderly" }],
    correctLabel: "A",
    tags: ["analogy", original, solution("Cautious and reckless are opposites. Meticulous means very careful, so the opposite is careless.")],
  },
  {
    category: "verbal",
    difficulty: 2,
    stem: "Archive is to records as warehouse is to:",
    options: [{ label: "A", text: "workers" }, { label: "B", text: "inventory" }, { label: "C", text: "shipments" }, { label: "D", text: "machinery" }, { label: "E", text: "addresses" }],
    correctLabel: "B",
    tags: ["analogy", original, solution("An archive stores records. A warehouse stores inventory.")],
  },
  {
    category: "verbal",
    difficulty: 3,
    stem: "Which word is most opposite in meaning to 'ambiguous'?",
    options: [{ label: "A", text: "uncertain" }, { label: "B", text: "vague" }, { label: "C", text: "explicit" }, { label: "D", text: "complex" }, { label: "E", text: "subtle" }],
    correctLabel: "C",
    tags: ["antonym", original, solution("Ambiguous means unclear or open to more than one interpretation. Explicit means clear and directly stated.")],
  },
  {
    category: "verbal",
    difficulty: 3,
    stem: "Which word is most opposite in meaning to 'diligent'?",
    options: [{ label: "A", text: "careful" }, { label: "B", text: "idle" }, { label: "C", text: "steady" }, { label: "D", text: "prompt" }, { label: "E", text: "thorough" }],
    correctLabel: "B",
    tags: ["antonym", original, solution("Diligent means hardworking and careful. Idle is the opposite because it means inactive or avoiding work.")],
  },
  {
    category: "verbal",
    difficulty: 3,
    stem: "Despite the short deadline, the analyst gave a ___ summary that included only the most important figures.",
    options: [{ label: "A", text: "concise" }, { label: "B", text: "redundant" }, { label: "C", text: "evasive" }, { label: "D", text: "lengthy" }, { label: "E", text: "ornate" }],
    correctLabel: "A",
    tags: ["sentence-completion", original, solution("The clue is 'only the most important figures,' which points to short and direct. Concise fits that meaning.")],
  },
  {
    category: "verbal",
    difficulty: 3,
    stem: "The new policy was intended to ___ confusion by making every approval step visible.",
    options: [{ label: "A", text: "compound" }, { label: "B", text: "reduce" }, { label: "C", text: "conceal" }, { label: "D", text: "imitate" }, { label: "E", text: "postpone" }],
    correctLabel: "B",
    tags: ["sentence-completion", original, solution("Making steps visible would lessen confusion, so reduce is the best fit.")],
  },
  {
    category: "verbal",
    difficulty: 2,
    stem: "Which option is exactly the same as this code?\n\nTR-58KQ-904N",
    options: [{ label: "A", text: "TR-58KQ-904N" }, { label: "B", text: "TR-58K0-904N" }, { label: "C", text: "TR-58KQ-940N" }, { label: "D", text: "TR-85KQ-904N" }, { label: "E", text: "TR-58QK-904N" }],
    correctLabel: "A",
    tags: ["attention-to-detail", original, solution("Compare chunk by chunk: TR, 58, KQ, 904, N. Only A matches every character in the same order.")],
  },
  {
    category: "verbal",
    difficulty: 2,
    stem: "Which option is exactly the same as this reference?\n\nNOVA-7421-MR",
    options: [{ label: "A", text: "N0VA-7421-MR" }, { label: "B", text: "NOVA-742I-MR" }, { label: "C", text: "NOVA-7421-MR" }, { label: "D", text: "NOVA-7241-MR" }, { label: "E", text: "NOVA-7421-RM" }],
    correctLabel: "C",
    tags: ["attention-to-detail", original, solution("Only C keeps the same letters, digits, and final MR order. The distractors swap O/0, 1/I, digit order, or MR/RM.")],
  },
];
