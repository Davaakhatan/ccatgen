type QuestionData = {
  category: "verbal" | "math_logic" | "spatial";
  difficulty: number;
  stem: string;
  options: { label: string; text: string }[];
  correctLabel: string;
  tags: string[];
};

export const verbalQuestions3: QuestionData[] = [
  // ─── SENTENCE COMPLETION (25) ─────────────────────────────────────────────
  {
    category: "verbal", difficulty: 1,
    stem: "The children were _______ after playing outside all afternoon.",
    options: [{ label: "A", text: "exhausted" }, { label: "B", text: "energized" }, { label: "C", text: "confused" }, { label: "D", text: "inspired" }, { label: "E", text: "alarmed" }],
    correctLabel: "A", tags: ["sentence-completion"],
  },
  {
    category: "verbal", difficulty: 1,
    stem: "The teacher _______ the students for their excellent performance on the exam.",
    options: [{ label: "A", text: "scolded" }, { label: "B", text: "ignored" }, { label: "C", text: "praised" }, { label: "D", text: "challenged" }, { label: "E", text: "dismissed" }],
    correctLabel: "C", tags: ["sentence-completion"],
  },
  {
    category: "verbal", difficulty: 1,
    stem: "Heavy rain caused the river to _______ its banks.",
    options: [{ label: "A", text: "retreat from" }, { label: "B", text: "overflow" }, { label: "C", text: "freeze along" }, { label: "D", text: "dry up near" }, { label: "E", text: "narrow at" }],
    correctLabel: "B", tags: ["sentence-completion"],
  },
  {
    category: "verbal", difficulty: 1,
    stem: "The new employee quickly _______ to the company's culture.",
    options: [{ label: "A", text: "objected" }, { label: "B", text: "adapted" }, { label: "C", text: "rebelled" }, { label: "D", text: "succumbed" }, { label: "E", text: "retreated" }],
    correctLabel: "B", tags: ["sentence-completion"],
  },
  {
    category: "verbal", difficulty: 2,
    stem: "The detective's _______ investigation uncovered evidence that had been overlooked for years.",
    options: [{ label: "A", text: "cursory" }, { label: "B", text: "thorough" }, { label: "C", text: "haphazard" }, { label: "D", text: "belated" }, { label: "E", text: "token" }],
    correctLabel: "B", tags: ["sentence-completion"],
  },
  {
    category: "verbal", difficulty: 2,
    stem: "The politician's _______ remarks offended many members of the audience.",
    options: [{ label: "A", text: "diplomatic" }, { label: "B", text: "innocuous" }, { label: "C", text: "inflammatory" }, { label: "D", text: "conciliatory" }, { label: "E", text: "measured" }],
    correctLabel: "C", tags: ["sentence-completion"],
  },
  {
    category: "verbal", difficulty: 2,
    stem: "Despite the _______ evidence against him, the defendant maintained his innocence.",
    options: [{ label: "A", text: "scant" }, { label: "B", text: "overwhelming" }, { label: "C", text: "fabricated" }, { label: "D", text: "circumstantial" }, { label: "E", text: "insufficient" }],
    correctLabel: "B", tags: ["sentence-completion"],
  },
  {
    category: "verbal", difficulty: 2,
    stem: "The scientist's findings were so _______ that they challenged decades of accepted theory.",
    options: [{ label: "A", text: "predictable" }, { label: "B", text: "mundane" }, { label: "C", text: "revolutionary" }, { label: "D", text: "trivial" }, { label: "E", text: "redundant" }],
    correctLabel: "C", tags: ["sentence-completion"],
  },
  {
    category: "verbal", difficulty: 2,
    stem: "The company implemented _______ measures to reduce costs during the economic downturn.",
    options: [{ label: "A", text: "extravagant" }, { label: "B", text: "austerity" }, { label: "C", text: "promotional" }, { label: "D", text: "expansion" }, { label: "E", text: "charitable" }],
    correctLabel: "B", tags: ["sentence-completion"],
  },
  {
    category: "verbal", difficulty: 2,
    stem: "The author's writing style is known for its _______, using few words to convey deep meaning.",
    options: [{ label: "A", text: "verbosity" }, { label: "B", text: "ambiguity" }, { label: "C", text: "brevity" }, { label: "D", text: "complexity" }, { label: "E", text: "redundancy" }],
    correctLabel: "C", tags: ["sentence-completion"],
  },
  {
    category: "verbal", difficulty: 2,
    stem: "The negotiations reached a _______ when neither side would compromise.",
    options: [{ label: "A", text: "breakthrough" }, { label: "B", text: "consensus" }, { label: "C", text: "stalemate" }, { label: "D", text: "resolution" }, { label: "E", text: "triumph" }],
    correctLabel: "C", tags: ["sentence-completion"],
  },
  {
    category: "verbal", difficulty: 3,
    stem: "The professor's _______ lecture left the students struggling to follow his complex arguments.",
    options: [{ label: "A", text: "lucid" }, { label: "B", text: "abstruse" }, { label: "C", text: "engaging" }, { label: "D", text: "simplistic" }, { label: "E", text: "entertaining" }],
    correctLabel: "B", tags: ["sentence-completion"],
  },
  {
    category: "verbal", difficulty: 3,
    stem: "Her _______ nature made her the ideal mediator, as she could see merit in opposing viewpoints.",
    options: [{ label: "A", text: "dogmatic" }, { label: "B", text: "partisan" }, { label: "C", text: "equanimous" }, { label: "D", text: "volatile" }, { label: "E", text: "obstinate" }],
    correctLabel: "C", tags: ["sentence-completion"],
  },
  {
    category: "verbal", difficulty: 3,
    stem: "The _______ of the ancient manuscript made it nearly impossible to decipher.",
    options: [{ label: "A", text: "clarity" }, { label: "B", text: "legibility" }, { label: "C", text: "deterioration" }, { label: "D", text: "preservation" }, { label: "E", text: "simplicity" }],
    correctLabel: "C", tags: ["sentence-completion"],
  },
  {
    category: "verbal", difficulty: 2,
    stem: "The manager's _______ leadership style empowered employees to make their own decisions.",
    options: [{ label: "A", text: "autocratic" }, { label: "B", text: "delegative" }, { label: "C", text: "micromanaging" }, { label: "D", text: "dictatorial" }, { label: "E", text: "restrictive" }],
    correctLabel: "B", tags: ["sentence-completion"],
  },
  {
    category: "verbal", difficulty: 1,
    stem: "The documentary provided a _______ account of the historical events.",
    options: [{ label: "A", text: "fictional" }, { label: "B", text: "biased" }, { label: "C", text: "factual" }, { label: "D", text: "humorous" }, { label: "E", text: "brief" }],
    correctLabel: "C", tags: ["sentence-completion"],
  },
  {
    category: "verbal", difficulty: 2,
    stem: "The witness gave a _______ testimony, carefully avoiding any definitive statements.",
    options: [{ label: "A", text: "forthright" }, { label: "B", text: "evasive" }, { label: "C", text: "candid" }, { label: "D", text: "transparent" }, { label: "E", text: "emphatic" }],
    correctLabel: "B", tags: ["sentence-completion"],
  },
  {
    category: "verbal", difficulty: 3,
    stem: "The artist's work was praised for its _______, blending multiple cultural influences into a cohesive whole.",
    options: [{ label: "A", text: "homogeneity" }, { label: "B", text: "eclecticism" }, { label: "C", text: "minimalism" }, { label: "D", text: "conformity" }, { label: "E", text: "monotony" }],
    correctLabel: "B", tags: ["sentence-completion"],
  },
  {
    category: "verbal", difficulty: 2,
    stem: "The CEO's _______ decision to expand into new markets proved profitable within a year.",
    options: [{ label: "A", text: "reckless" }, { label: "B", text: "timid" }, { label: "C", text: "bold" }, { label: "D", text: "reluctant" }, { label: "E", text: "cautious" }],
    correctLabel: "C", tags: ["sentence-completion"],
  },
  {
    category: "verbal", difficulty: 1,
    stem: "The instructions were so _______ that even a beginner could follow them.",
    options: [{ label: "A", text: "complicated" }, { label: "B", text: "vague" }, { label: "C", text: "clear" }, { label: "D", text: "confusing" }, { label: "E", text: "technical" }],
    correctLabel: "C", tags: ["sentence-completion"],
  },
  {
    category: "verbal", difficulty: 2,
    stem: "The charity's efforts to _______ poverty in the region have yielded significant results.",
    options: [{ label: "A", text: "perpetuate" }, { label: "B", text: "alleviate" }, { label: "C", text: "exacerbate" }, { label: "D", text: "ignore" }, { label: "E", text: "celebrate" }],
    correctLabel: "B", tags: ["sentence-completion"],
  },
  {
    category: "verbal", difficulty: 3,
    stem: "The critic dismissed the novel as _______, lacking originality or depth.",
    options: [{ label: "A", text: "groundbreaking" }, { label: "B", text: "riveting" }, { label: "C", text: "derivative" }, { label: "D", text: "innovative" }, { label: "E", text: "profound" }],
    correctLabel: "C", tags: ["sentence-completion"],
  },
  {
    category: "verbal", difficulty: 1,
    stem: "The storm caused _______ damage to the coastal town.",
    options: [{ label: "A", text: "minimal" }, { label: "B", text: "extensive" }, { label: "C", text: "imaginary" }, { label: "D", text: "temporary" }, { label: "E", text: "invisible" }],
    correctLabel: "B", tags: ["sentence-completion"],
  },
  {
    category: "verbal", difficulty: 2,
    stem: "The athlete showed remarkable _______ by competing despite her injury.",
    options: [{ label: "A", text: "cowardice" }, { label: "B", text: "indifference" }, { label: "C", text: "resilience" }, { label: "D", text: "fragility" }, { label: "E", text: "complacency" }],
    correctLabel: "C", tags: ["sentence-completion"],
  },
  {
    category: "verbal", difficulty: 3,
    stem: "The philosopher's arguments were _______, each point building logically upon the previous one.",
    options: [{ label: "A", text: "disjointed" }, { label: "B", text: "cogent" }, { label: "C", text: "rambling" }, { label: "D", text: "incoherent" }, { label: "E", text: "specious" }],
    correctLabel: "B", tags: ["sentence-completion"],
  },

  // ─── ANALOGIES (15) ───────────────────────────────────────────────────────
  {
    category: "verbal", difficulty: 1,
    stem: "Painter is to brush as writer is to ___.",
    options: [{ label: "A", text: "book" }, { label: "B", text: "pen" }, { label: "C", text: "paper" }, { label: "D", text: "story" }, { label: "E", text: "desk" }],
    correctLabel: "B", tags: ["analogy"],
  },
  {
    category: "verbal", difficulty: 1,
    stem: "Glove is to hand as shoe is to ___.",
    options: [{ label: "A", text: "leg" }, { label: "B", text: "sock" }, { label: "C", text: "foot" }, { label: "D", text: "lace" }, { label: "E", text: "heel" }],
    correctLabel: "C", tags: ["analogy"],
  },
  {
    category: "verbal", difficulty: 1,
    stem: "Bark is to dog as meow is to ___.",
    options: [{ label: "A", text: "bird" }, { label: "B", text: "mouse" }, { label: "C", text: "cat" }, { label: "D", text: "fish" }, { label: "E", text: "rabbit" }],
    correctLabel: "C", tags: ["analogy"],
  },
  {
    category: "verbal", difficulty: 2,
    stem: "Thermometer is to temperature as speedometer is to ___.",
    options: [{ label: "A", text: "distance" }, { label: "B", text: "velocity" }, { label: "C", text: "fuel" }, { label: "D", text: "direction" }, { label: "E", text: "weight" }],
    correctLabel: "B", tags: ["analogy"],
  },
  {
    category: "verbal", difficulty: 2,
    stem: "Architect is to building as composer is to ___.",
    options: [{ label: "A", text: "instrument" }, { label: "B", text: "orchestra" }, { label: "C", text: "symphony" }, { label: "D", text: "concert" }, { label: "E", text: "stage" }],
    correctLabel: "C", tags: ["analogy"],
  },
  {
    category: "verbal", difficulty: 2,
    stem: "Prologue is to beginning as epilogue is to ___.",
    options: [{ label: "A", text: "middle" }, { label: "B", text: "chapter" }, { label: "C", text: "end" }, { label: "D", text: "introduction" }, { label: "E", text: "summary" }],
    correctLabel: "C", tags: ["analogy"],
  },
  {
    category: "verbal", difficulty: 2,
    stem: "Predator is to prey as hunter is to ___.",
    options: [{ label: "A", text: "forest" }, { label: "B", text: "weapon" }, { label: "C", text: "quarry" }, { label: "D", text: "tracker" }, { label: "E", text: "camouflage" }],
    correctLabel: "C", tags: ["analogy"],
  },
  {
    category: "verbal", difficulty: 2,
    stem: "Drought is to water as famine is to ___.",
    options: [{ label: "A", text: "disease" }, { label: "B", text: "food" }, { label: "C", text: "rain" }, { label: "D", text: "war" }, { label: "E", text: "poverty" }],
    correctLabel: "B", tags: ["analogy"],
  },
  {
    category: "verbal", difficulty: 3,
    stem: "Sonnet is to poem as waltz is to ___.",
    options: [{ label: "A", text: "music" }, { label: "B", text: "dance" }, { label: "C", text: "rhythm" }, { label: "D", text: "stage" }, { label: "E", text: "ballroom" }],
    correctLabel: "B", tags: ["analogy"],
  },
  {
    category: "verbal", difficulty: 3,
    stem: "Chronology is to time as cartography is to ___.",
    options: [{ label: "A", text: "history" }, { label: "B", text: "navigation" }, { label: "C", text: "maps" }, { label: "D", text: "science" }, { label: "E", text: "geography" }],
    correctLabel: "C", tags: ["analogy"],
  },
  {
    category: "verbal", difficulty: 2,
    stem: "Telescope is to far as microscope is to ___.",
    options: [{ label: "A", text: "large" }, { label: "B", text: "small" }, { label: "C", text: "invisible" }, { label: "D", text: "dark" }, { label: "E", text: "bright" }],
    correctLabel: "B", tags: ["analogy"],
  },
  {
    category: "verbal", difficulty: 1,
    stem: "Chapter is to book as scene is to ___.",
    options: [{ label: "A", text: "actor" }, { label: "B", text: "play" }, { label: "C", text: "stage" }, { label: "D", text: "script" }, { label: "E", text: "audience" }],
    correctLabel: "B", tags: ["analogy"],
  },
  {
    category: "verbal", difficulty: 3,
    stem: "Anarchy is to government as atheism is to ___.",
    options: [{ label: "A", text: "morality" }, { label: "B", text: "science" }, { label: "C", text: "religion" }, { label: "D", text: "philosophy" }, { label: "E", text: "society" }],
    correctLabel: "C", tags: ["analogy"],
  },
  {
    category: "verbal", difficulty: 2,
    stem: "Symptom is to disease as clue is to ___.",
    options: [{ label: "A", text: "crime" }, { label: "B", text: "detective" }, { label: "C", text: "mystery" }, { label: "D", text: "evidence" }, { label: "E", text: "suspect" }],
    correctLabel: "C", tags: ["analogy"],
  },
  {
    category: "verbal", difficulty: 1,
    stem: "Calf is to cow as puppy is to ___.",
    options: [{ label: "A", text: "cat" }, { label: "B", text: "dog" }, { label: "C", text: "kitten" }, { label: "D", text: "bone" }, { label: "E", text: "kennel" }],
    correctLabel: "B", tags: ["analogy"],
  },

  // ─── TRUE/FALSE/UNCERTAIN (20) ────────────────────────────────────────────
  {
    category: "verbal", difficulty: 1,
    stem: "If the first two statements are true, is the final statement true?\n\n• All managers attend the weekly meeting.\n• Tom is a manager.\n• Tom attends the weekly meeting.",
    options: [{ label: "A", text: "True" }, { label: "B", text: "False" }, { label: "C", text: "Uncertain" }],
    correctLabel: "A", tags: ["true-false-uncertain"],
  },
  {
    category: "verbal", difficulty: 1,
    stem: "If the first two statements are true, is the final statement true?\n\n• Some toys are made of plastic.\n• This toy is red.\n• This toy is made of plastic.",
    options: [{ label: "A", text: "True" }, { label: "B", text: "False" }, { label: "C", text: "Uncertain" }],
    correctLabel: "C", tags: ["true-false-uncertain"],
  },
  {
    category: "verbal", difficulty: 1,
    stem: "If the first two statements are true, is the final statement true?\n\n• All planets orbit the sun.\n• Mars is a planet.\n• Mars orbits the sun.",
    options: [{ label: "A", text: "True" }, { label: "B", text: "False" }, { label: "C", text: "Uncertain" }],
    correctLabel: "A", tags: ["true-false-uncertain"],
  },
  {
    category: "verbal", difficulty: 2,
    stem: "If the first two statements are true, is the final statement true?\n\n• All employees with over 5 years of experience received a bonus.\n• Jane has worked at the company for 3 years.\n• Jane did not receive a bonus.",
    options: [{ label: "A", text: "True" }, { label: "B", text: "False" }, { label: "C", text: "Uncertain" }],
    correctLabel: "C", tags: ["true-false-uncertain"],
  },
  {
    category: "verbal", difficulty: 2,
    stem: "If the first two statements are true, is the final statement true?\n\n• No students who failed the midterm passed the course.\n• Kevin passed the course.\n• Kevin passed the midterm.",
    options: [{ label: "A", text: "True" }, { label: "B", text: "False" }, { label: "C", text: "Uncertain" }],
    correctLabel: "A", tags: ["true-false-uncertain"],
  },
  {
    category: "verbal", difficulty: 2,
    stem: "If the first two statements are true, is the final statement true?\n\n• All residents of Building A have parking permits.\n• Michael has a parking permit.\n• Michael is a resident of Building A.",
    options: [{ label: "A", text: "True" }, { label: "B", text: "False" }, { label: "C", text: "Uncertain" }],
    correctLabel: "C", tags: ["true-false-uncertain"],
  },
  {
    category: "verbal", difficulty: 2,
    stem: "If the first two statements are true, is the final statement true?\n\n• Every student who submitted the project on time received full credit.\n• Ashley submitted her project on time.\n• Ashley received full credit.",
    options: [{ label: "A", text: "True" }, { label: "B", text: "False" }, { label: "C", text: "Uncertain" }],
    correctLabel: "A", tags: ["true-false-uncertain"],
  },
  {
    category: "verbal", difficulty: 3,
    stem: "If the first two statements are true, is the final statement true?\n\n• All board members voted in favor of the merger.\n• Some people who voted in favor are also shareholders.\n• All board members are shareholders.",
    options: [{ label: "A", text: "True" }, { label: "B", text: "False" }, { label: "C", text: "Uncertain" }],
    correctLabel: "C", tags: ["true-false-uncertain"],
  },
  {
    category: "verbal", difficulty: 3,
    stem: "If the first two statements are true, is the final statement true?\n\n• Only certified technicians can operate the MRI machine.\n• Sandra operated the MRI machine today.\n• Sandra is a certified technician.",
    options: [{ label: "A", text: "True" }, { label: "B", text: "False" }, { label: "C", text: "Uncertain" }],
    correctLabel: "A", tags: ["true-false-uncertain"],
  },
  {
    category: "verbal", difficulty: 3,
    stem: "If the first two statements are true, is the final statement true?\n\n• All contracts signed before January require renewal.\n• Some contracts that require renewal have already been renewed.\n• All contracts signed before January have been renewed.",
    options: [{ label: "A", text: "True" }, { label: "B", text: "False" }, { label: "C", text: "Uncertain" }],
    correctLabel: "C", tags: ["true-false-uncertain"],
  },
  {
    category: "verbal", difficulty: 1,
    stem: "If the first two statements are true, is the final statement true?\n\n• All rivers flow to the sea.\n• The Nile is a river.\n• The Nile flows to the sea.",
    options: [{ label: "A", text: "True" }, { label: "B", text: "False" }, { label: "C", text: "Uncertain" }],
    correctLabel: "A", tags: ["true-false-uncertain"],
  },
  {
    category: "verbal", difficulty: 2,
    stem: "If the first two statements are true, is the final statement true?\n\n• All items over $100 require manager approval.\n• This purchase costs $85.\n• This purchase does not require manager approval.",
    options: [{ label: "A", text: "True" }, { label: "B", text: "False" }, { label: "C", text: "Uncertain" }],
    correctLabel: "C", tags: ["true-false-uncertain"],
  },
  {
    category: "verbal", difficulty: 2,
    stem: "If the first two statements are true, is the final statement true?\n\n• No one without a badge can enter the building after 6 PM.\n• It is 8 PM and Carlos is inside the building.\n• Carlos has a badge.",
    options: [{ label: "A", text: "True" }, { label: "B", text: "False" }, { label: "C", text: "Uncertain" }],
    correctLabel: "A", tags: ["true-false-uncertain"],
  },
  {
    category: "verbal", difficulty: 3,
    stem: "If the first two statements are true, is the final statement true?\n\n• All finalists in the competition scored above 90.\n• Maya scored above 90.\n• Maya is a finalist in the competition.",
    options: [{ label: "A", text: "True" }, { label: "B", text: "False" }, { label: "C", text: "Uncertain" }],
    correctLabel: "C", tags: ["true-false-uncertain"],
  },
  {
    category: "verbal", difficulty: 1,
    stem: "If the first two statements are true, is the final statement true?\n\n• No mammals can breathe underwater.\n• Whales are mammals.\n• Whales cannot breathe underwater.",
    options: [{ label: "A", text: "True" }, { label: "B", text: "False" }, { label: "C", text: "Uncertain" }],
    correctLabel: "A", tags: ["true-false-uncertain"],
  },
  {
    category: "verbal", difficulty: 2,
    stem: "If the first two statements are true, is the final statement true?\n\n• All flights from Gate B are delayed.\n• Flight 302 is delayed.\n• Flight 302 departs from Gate B.",
    options: [{ label: "A", text: "True" }, { label: "B", text: "False" }, { label: "C", text: "Uncertain" }],
    correctLabel: "C", tags: ["true-false-uncertain"],
  },
  {
    category: "verbal", difficulty: 3,
    stem: "If the first two statements are true, is the final statement true?\n\n• All applicants who passed the interview were offered positions.\n• Daniel was not offered a position.\n• Daniel did not pass the interview.",
    options: [{ label: "A", text: "True" }, { label: "B", text: "False" }, { label: "C", text: "Uncertain" }],
    correctLabel: "A", tags: ["true-false-uncertain"],
  },
  {
    category: "verbal", difficulty: 1,
    stem: "If the first two statements are true, is the final statement true?\n\n• All coins in the jar are silver.\n• This coin is from the jar.\n• This coin is silver.",
    options: [{ label: "A", text: "True" }, { label: "B", text: "False" }, { label: "C", text: "Uncertain" }],
    correctLabel: "A", tags: ["true-false-uncertain"],
  },
  {
    category: "verbal", difficulty: 2,
    stem: "If the first two statements are true, is the final statement true?\n\n• Some architects are also engineers.\n• All engineers understand physics.\n• Some architects understand physics.",
    options: [{ label: "A", text: "True" }, { label: "B", text: "False" }, { label: "C", text: "Uncertain" }],
    correctLabel: "A", tags: ["true-false-uncertain"],
  },
  {
    category: "verbal", difficulty: 3,
    stem: "If the first two statements are true, is the final statement true?\n\n• Every report submitted late received a penalty.\n• Some reports with penalties were eventually accepted.\n• All late reports were eventually accepted.",
    options: [{ label: "A", text: "True" }, { label: "B", text: "False" }, { label: "C", text: "Uncertain" }],
    correctLabel: "C", tags: ["true-false-uncertain"],
  },

  // ─── ANTONYMS (10) ────────────────────────────────────────────────────────
  {
    category: "verbal", difficulty: 1,
    stem: "Choose the word that is most OPPOSITE to GENEROUS.",
    options: [{ label: "A", text: "Kind" }, { label: "B", text: "Stingy" }, { label: "C", text: "Wealthy" }, { label: "D", text: "Helpful" }, { label: "E", text: "Honest" }],
    correctLabel: "B", tags: ["antonym"],
  },
  {
    category: "verbal", difficulty: 1,
    stem: "Choose the word that is most OPPOSITE to ANCIENT.",
    options: [{ label: "A", text: "Old" }, { label: "B", text: "Historic" }, { label: "C", text: "Modern" }, { label: "D", text: "Valuable" }, { label: "E", text: "Classic" }],
    correctLabel: "C", tags: ["antonym"],
  },
  {
    category: "verbal", difficulty: 2,
    stem: "Choose the word that is most OPPOSITE to TRANSPARENT.",
    options: [{ label: "A", text: "Clear" }, { label: "B", text: "Visible" }, { label: "C", text: "Opaque" }, { label: "D", text: "Bright" }, { label: "E", text: "Thin" }],
    correctLabel: "C", tags: ["antonym"],
  },
  {
    category: "verbal", difficulty: 2,
    stem: "Choose the word that is most OPPOSITE to DILIGENT.",
    options: [{ label: "A", text: "Careful" }, { label: "B", text: "Lazy" }, { label: "C", text: "Clever" }, { label: "D", text: "Honest" }, { label: "E", text: "Patient" }],
    correctLabel: "B", tags: ["antonym"],
  },
  {
    category: "verbal", difficulty: 2,
    stem: "Choose the word that is most OPPOSITE to BENEVOLENT.",
    options: [{ label: "A", text: "Generous" }, { label: "B", text: "Powerful" }, { label: "C", text: "Malevolent" }, { label: "D", text: "Intelligent" }, { label: "E", text: "Cautious" }],
    correctLabel: "C", tags: ["antonym"],
  },
  {
    category: "verbal", difficulty: 3,
    stem: "Choose the word that is most OPPOSITE to EPHEMERAL.",
    options: [{ label: "A", text: "Brief" }, { label: "B", text: "Permanent" }, { label: "C", text: "Fragile" }, { label: "D", text: "Invisible" }, { label: "E", text: "Trivial" }],
    correctLabel: "B", tags: ["antonym"],
  },
  {
    category: "verbal", difficulty: 3,
    stem: "Choose the word that is most OPPOSITE to LOQUACIOUS.",
    options: [{ label: "A", text: "Eloquent" }, { label: "B", text: "Verbose" }, { label: "C", text: "Taciturn" }, { label: "D", text: "Articulate" }, { label: "E", text: "Persuasive" }],
    correctLabel: "C", tags: ["antonym"],
  },
  {
    category: "verbal", difficulty: 1,
    stem: "Choose the word that is most OPPOSITE to EXPAND.",
    options: [{ label: "A", text: "Grow" }, { label: "B", text: "Contract" }, { label: "C", text: "Stretch" }, { label: "D", text: "Inflate" }, { label: "E", text: "Build" }],
    correctLabel: "B", tags: ["antonym"],
  },
  {
    category: "verbal", difficulty: 2,
    stem: "Choose the word that is most OPPOSITE to ABUNDANT.",
    options: [{ label: "A", text: "Plentiful" }, { label: "B", text: "Wealthy" }, { label: "C", text: "Scarce" }, { label: "D", text: "Heavy" }, { label: "E", text: "Cheap" }],
    correctLabel: "C", tags: ["antonym"],
  },
  {
    category: "verbal", difficulty: 3,
    stem: "Choose the word that is most OPPOSITE to INTREPID.",
    options: [{ label: "A", text: "Brave" }, { label: "B", text: "Cowardly" }, { label: "C", text: "Stubborn" }, { label: "D", text: "Reckless" }, { label: "E", text: "Cautious" }],
    correctLabel: "B", tags: ["antonym"],
  },

  // ─── ATTENTION TO DETAIL / COLUMN COMPARISON (10) ─────────────────────────
  {
    category: "verbal", difficulty: 2,
    stem: "How many of the five items in the left-hand column are exactly the same as the corresponding entry in the right-hand column?\n\nLeft-Hand Column → Right-Hand Column\n1) Anderson & Associates → Anderson & Associates\n2) 555-0142 ext. 307 → 555-0142 ext. 307\n3) Invoice #INV-20240315 → Invoice #INV-20240315\n4) Dr. Margaret Chen-Williams → Dr. Margaret Chen-Wiliams\n5) PO Box 4821, Suite 200 → PO Box 4821, Suite 200",
    options: [{ label: "A", text: "1" }, { label: "B", text: "2" }, { label: "C", text: "3" }, { label: "D", text: "4" }, { label: "E", text: "5" }],
    correctLabel: "D", tags: ["column-comparison"],
  },
  {
    category: "verbal", difficulty: 2,
    stem: "How many of the five items in the left-hand column are exactly the same as the corresponding entry in the right-hand column?\n\nLeft-Hand Column → Right-Hand Column\n1) REF-2024-A1B2C3 → REF-2024-A1B2C3\n2) 192.168.1.105 → 192.168.1.150\n3) PROJ-ALPHA-v2.3.1 → PROJ-ALPHA-v2.3.1\n4) usr/local/bin/config → usr/local/bin/config\n5) SHA256:e3b0c44298fc → SHA256:e3b0c44928fc",
    options: [{ label: "A", text: "1" }, { label: "B", text: "2" }, { label: "C", text: "3" }, { label: "D", text: "4" }, { label: "E", text: "5" }],
    correctLabel: "C", tags: ["column-comparison"],
  },
  {
    category: "verbal", difficulty: 1,
    stem: "How many of the five items in the left-hand column are exactly the same as the corresponding entry in the right-hand column?\n\nLeft-Hand Column → Right-Hand Column\n1) Thomas Jefferson → Thomas Jefferson\n2) Benjamin Franklin → Benjamin Frankiln\n3) George Washington → George Washington\n4) John Adams → John Adams\n5) James Madison → James Maddison",
    options: [{ label: "A", text: "1" }, { label: "B", text: "2" }, { label: "C", text: "3" }, { label: "D", text: "4" }, { label: "E", text: "5" }],
    correctLabel: "C", tags: ["column-comparison"],
  },
  {
    category: "verbal", difficulty: 3,
    stem: "How many of the five items in the left-hand column are exactly the same as the corresponding entry in the right-hand column?\n\nLeft-Hand Column → Right-Hand Column\n1) pneumonoultramicroscopicsilicovolcanoconiosis → pneumonoultramicroscopicsilicovolcanoconiosis\n2) antidisestablishmentarianism → antidisestablishmentarianism\n3) supercalifragilisticexpialidocious → supercalifragilisticexpialidocious\n4) hippopotomonstrosesquippedaliophobia → hippopotomonstrosesquipedaliophobia\n5) floccinaucinihilipilification → floccinaucinihilipilification",
    options: [{ label: "A", text: "1" }, { label: "B", text: "2" }, { label: "C", text: "3" }, { label: "D", text: "4" }, { label: "E", text: "5" }],
    correctLabel: "D", tags: ["column-comparison"],
  },
  {
    category: "verbal", difficulty: 2,
    stem: "How many of the five items in the left-hand column are exactly the same as the corresponding entry in the right-hand column?\n\nLeft-Hand Column → Right-Hand Column\n1) $1,234,567.89 → $1,234,567.89\n2) €8,901,234.56 → €8,901,234.56\n3) ¥45,678,901 → ¥45,678,901\n4) £3,456,789.01 → £3,456,798.01\n5) CHF 2,345,678.90 → CHF 2,345,678.90",
    options: [{ label: "A", text: "1" }, { label: "B", text: "2" }, { label: "C", text: "3" }, { label: "D", text: "4" }, { label: "E", text: "5" }],
    correctLabel: "D", tags: ["column-comparison"],
  },
  {
    category: "verbal", difficulty: 1,
    stem: "How many of the five items in the left-hand column are exactly the same as the corresponding entry in the right-hand column?\n\nLeft-Hand Column → Right-Hand Column\n1) Red → Red\n2) Blue → Blue\n3) Green → Grean\n4) Yellow → Yellow\n5) Purple → Purple",
    options: [{ label: "A", text: "1" }, { label: "B", text: "2" }, { label: "C", text: "3" }, { label: "D", text: "4" }, { label: "E", text: "5" }],
    correctLabel: "D", tags: ["column-comparison"],
  },
  {
    category: "verbal", difficulty: 3,
    stem: "How many of the five items in the left-hand column are exactly the same as the corresponding entry in the right-hand column?\n\nLeft-Hand Column → Right-Hand Column\n1) dx/dy = 2x³ + 4x² - 7 → dx/dy = 2x³ + 4x² - 7\n2) f(x) = sin(2πx/λ) → f(x) = sin(2πx/λ)\n3) ∑(n=1 to ∞) 1/n² = π²/6 → ∑(n=1 to ∞) 1/n² = π²/6\n4) ∫₀¹ e^(-x²) dx → ∫₀¹ e^(-x²) dx\n5) lim(x→0) sin(x)/x = 1 → lim(x→0) sin(x)/x = 1",
    options: [{ label: "A", text: "1" }, { label: "B", text: "2" }, { label: "C", text: "3" }, { label: "D", text: "4" }, { label: "E", text: "5" }],
    correctLabel: "E", tags: ["column-comparison"],
  },
  {
    category: "verbal", difficulty: 2,
    stem: "How many of the five items in the left-hand column are exactly the same as the corresponding entry in the right-hand column?\n\nLeft-Hand Column → Right-Hand Column\n1) Springfield, IL 62704 → Springfield, IL 62704\n2) Sacramento, CA 95814 → Sacramento, CA 95814\n3) Tallahassee, FL 32301 → Tallahassee, FL 32301\n4) Harrisburg, PA 17101 → Harrisburg, PA 17110\n5) Columbus, OH 43215 → Columbus, OH 43215",
    options: [{ label: "A", text: "1" }, { label: "B", text: "2" }, { label: "C", text: "3" }, { label: "D", text: "4" }, { label: "E", text: "5" }],
    correctLabel: "D", tags: ["column-comparison"],
  },
  {
    category: "verbal", difficulty: 1,
    stem: "How many of the five items in the left-hand column are exactly the same as the corresponding entry in the right-hand column?\n\nLeft-Hand Column → Right-Hand Column\n1) Password123! → Password123!\n2) S3cur3P@ss → S3cur3P@ss\n3) MyD0g$Name → MyD0g$Name\n4) Welcome2024# → Welc0me2024#\n5) Admin@Work → Admin@Work",
    options: [{ label: "A", text: "1" }, { label: "B", text: "2" }, { label: "C", text: "3" }, { label: "D", text: "4" }, { label: "E", text: "5" }],
    correctLabel: "D", tags: ["column-comparison"],
  },
  {
    category: "verbal", difficulty: 3,
    stem: "How many of the five items in the left-hand column are exactly the same as the corresponding entry in the right-hand column?\n\nLeft-Hand Column → Right-Hand Column\n1) Tchaikovsky → Tchaikovsky\n2) Rachmaninoff → Rachmaninoff\n3) Shostakovich → Shostakovich\n4) Mussorgsky → Mussorgsky\n5) Dostoyevsky → Dostoevsky",
    options: [{ label: "A", text: "1" }, { label: "B", text: "2" }, { label: "C", text: "3" }, { label: "D", text: "4" }, { label: "E", text: "5" }],
    correctLabel: "D", tags: ["column-comparison"],
  },

  // ─── WORD COMPARISON / ODD-WORD-OUT (5) ───────────────────────────────────
  {
    category: "verbal", difficulty: 2,
    stem: "Which word does NOT belong with the others?",
    options: [{ label: "A", text: "Sparrow" }, { label: "B", text: "Robin" }, { label: "C", text: "Penguin" }, { label: "D", text: "Salmon" }, { label: "E", text: "Eagle" }],
    correctLabel: "D", tags: ["word-comparison"],
  },
  {
    category: "verbal", difficulty: 2,
    stem: "Which word does NOT belong with the others?",
    options: [{ label: "A", text: "Flute" }, { label: "B", text: "Clarinet" }, { label: "C", text: "Trumpet" }, { label: "D", text: "Oboe" }, { label: "E", text: "Saxophone" }],
    correctLabel: "C", tags: ["word-comparison"],
  },
  {
    category: "verbal", difficulty: 3,
    stem: "Which word does NOT belong with the others?",
    options: [{ label: "A", text: "Igneous" }, { label: "B", text: "Sedimentary" }, { label: "C", text: "Metamorphic" }, { label: "D", text: "Mineral" }, { label: "E", text: "Volcanic" }],
    correctLabel: "D", tags: ["word-comparison"],
  },
  {
    category: "verbal", difficulty: 1,
    stem: "Which word does NOT belong with the others?",
    options: [{ label: "A", text: "Soccer" }, { label: "B", text: "Basketball" }, { label: "C", text: "Tennis" }, { label: "D", text: "Chess" }, { label: "E", text: "Hockey" }],
    correctLabel: "D", tags: ["word-comparison"],
  },
  {
    category: "verbal", difficulty: 3,
    stem: "Which word does NOT belong with the others?",
    options: [{ label: "A", text: "Hypothesis" }, { label: "B", text: "Theory" }, { label: "C", text: "Axiom" }, { label: "D", text: "Conjecture" }, { label: "E", text: "Experiment" }],
    correctLabel: "E", tags: ["word-comparison"],
  },
];
