type QuestionData = {
  category: "verbal" | "math_logic" | "spatial";
  difficulty: number;
  stem: string;
  options: { label: string; text: string }[];
  correctLabel: string;
  tags: string[];
};

export const attentionDetailCcatQuestions: QuestionData[] = [
  {
    category: "verbal",
    difficulty: 2,
    stem: "Target: RQ-47M9-L2B6. Which option matches the target exactly?",
    options: [
      { label: "A", text: "RQ-47M9-L2B8" },
      { label: "B", text: "RQ-47M9-L2B6" },
      { label: "C", text: "RQ-47N9-L2B6" },
      { label: "D", text: "RQ-74M9-L2B6" },
      { label: "E", text: "RQ-47M9-12B6" },
    ],
    correctLabel: "B",
    tags: ["attention-to-detail", "ccat-original"],
  },
  {
    category: "verbal",
    difficulty: 2,
    stem: "Target: Hartwell Logistics, Inv. #884-19K. Which option matches the target exactly?",
    options: [
      { label: "A", text: "Hartwell Logistics, Inv. #884-19K" },
      { label: "B", text: "Hartwell Logistic, Inv. #884-19K" },
      { label: "C", text: "Hartwell Logistics, Inv. #884-I9K" },
      { label: "D", text: "Hartwel Logistics, Inv. #884-19K" },
      { label: "E", text: "Hartwell Logistics, Inv #884-19K" },
    ],
    correctLabel: "A",
    tags: ["attention-to-detail", "ccat-original"],
  },
  {
    category: "verbal",
    difficulty: 2,
    stem: "Four options match the target pattern except one. Target pattern: two letters, dash, four digits, dash, one letter. Which option does not match?",
    options: [
      { label: "A", text: "PN-4827-Q" },
      { label: "B", text: "LR-9051-M" },
      { label: "C", text: "TX-7742-R" },
      { label: "D", text: "AB-63K8-Z" },
      { label: "E", text: "VC-1180-H" },
    ],
    correctLabel: "D",
    tags: ["attention-to-detail", "ccat-original"],
  },
  {
    category: "verbal",
    difficulty: 2,
    stem: "Which entry contains a different phone number from its paired record?",
    options: [
      { label: "A", text: "Miller: 415-902-7714 / Miller: 415-902-7714" },
      { label: "B", text: "Nolan: 628-410-3380 / Nolan: 628-410-3380" },
      { label: "C", text: "Patel: 312-884-1960 / Patel: 312-884-1968" },
      { label: "D", text: "Reyes: 720-559-0031 / Reyes: 720-559-0031" },
      { label: "E", text: "Chen: 206-417-8502 / Chen: 206-417-8502" },
    ],
    correctLabel: "C",
    tags: ["attention-to-detail", "ccat-original"],
  },
  {
    category: "verbal",
    difficulty: 3,
    stem: "Target: AVENIR-CL-80917-BR. Which option matches the target exactly?",
    options: [
      { label: "A", text: "AVENIR-CI-80917-BR" },
      { label: "B", text: "AVENIR-CL-80917-8R" },
      { label: "C", text: "AVENIR-CL-80971-BR" },
      { label: "D", text: "AVENIR-CL-80917-BR" },
      { label: "E", text: "AVENIR-CL-80917-RB" },
    ],
    correctLabel: "D",
    tags: ["attention-to-detail", "ccat-original"],
  },
  {
    category: "verbal",
    difficulty: 3,
    stem: "Which option is the only exact duplicate pair?",
    options: [
      { label: "A", text: "Kestrel Analytics / Kestral Analytics" },
      { label: "B", text: "PO-19-447A / PO-19-4474" },
      { label: "C", text: "N. Watanabe, Suite 402 / N. Watanabe, Suite 402" },
      { label: "D", text: "Acct 70091-33 / Acct 70019-33" },
      { label: "E", text: "Lima Office, 8th Fl. / Lima Office, 8th FI." },
    ],
    correctLabel: "C",
    tags: ["attention-to-detail", "ccat-original"],
  },
  {
    category: "verbal",
    difficulty: 3,
    stem: "Target: 0O5-S8B-1I7. Which option matches the target exactly?",
    options: [
      { label: "A", text: "005-S8B-1I7" },
      { label: "B", text: "0O5-S8B-1I7" },
      { label: "C", text: "0O5-58B-1I7" },
      { label: "D", text: "0O5-SBB-1I7" },
      { label: "E", text: "0O5-S8B-I17" },
    ],
    correctLabel: "B",
    tags: ["attention-to-detail", "ccat-original"],
  },
  {
    category: "verbal",
    difficulty: 3,
    stem: "Which entry contains the transposed characters?",
    options: [
      { label: "A", text: "Case ID: FJ-2906-X / Case ID: FJ-2906-X" },
      { label: "B", text: "Batch: MTR-6814 / Batch: MTR-6841" },
      { label: "C", text: "Route: NE-42-17 / Route: NE-42-17" },
      { label: "D", text: "Ref: 9LQ-508A / Ref: 9LQ-508A" },
      { label: "E", text: "Zone: C-118-77 / Zone: C-118-77" },
    ],
    correctLabel: "B",
    tags: ["attention-to-detail", "ccat-original"],
  },
  {
    category: "verbal",
    difficulty: 2,
    stem: "Target: Moreno, Alvarez & Singh LLP. Which option matches the target exactly?",
    options: [
      { label: "A", text: "Moreno, Alverez & Singh LLP" },
      { label: "B", text: "Moreno Alvarez & Singh LLP" },
      { label: "C", text: "Moreno, Alvarez & Singh LLP" },
      { label: "D", text: "Moreno, Alvarez and Singh LLP" },
      { label: "E", text: "Moreno, Alvarez & Sing LLP" },
    ],
    correctLabel: "C",
    tags: ["attention-to-detail", "ccat-original"],
  },
  {
    category: "verbal",
    difficulty: 3,
    stem: "Which option violates the pattern: uppercase letter, lowercase letter, digit, digit, uppercase letter, lowercase letter?",
    options: [
      { label: "A", text: "Aa47Qm" },
      { label: "B", text: "Bt19Rf" },
      { label: "C", text: "Cp83Ld" },
      { label: "D", text: "Dm7K2p" },
      { label: "E", text: "Ez60Tr" },
    ],
    correctLabel: "D",
    tags: ["attention-to-detail", "ccat-original"],
  },
];
