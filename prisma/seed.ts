import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

// Required for Node.js — Neon serverless driver needs WebSocket
neonConfig.webSocketConstructor = ws;

const adapter = new PrismaNeon({ connectionString: process.env.DIRECT_DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

type QuestionData = {
  category: "verbal" | "math_logic" | "spatial";
  difficulty: number;
  stem: string;
  options: { label: string; text: string }[];
  correctLabel: string;
  tags: string[];
};

// ---------------------------------------------------------------------------
// VERBAL QUESTIONS — Real CCAT style (50+)
// Types: antonyms, analogies, sentence completion, vocabulary
// Distribution: ~15 easy, ~25 medium, ~10 hard
// ---------------------------------------------------------------------------
const verbalQuestions: QuestionData[] = [
  // ===== EASY (15) =====
  // Antonyms (CCAT format: "Choose the word most OPPOSITE to...")
  { category: "verbal", difficulty: 1, stem: "Choose the word that is most OPPOSITE to EXPAND.", options: [{ label: "A", text: "Grow" }, { label: "B", text: "Contract" }, { label: "C", text: "Stretch" }, { label: "D", text: "Inflate" }, { label: "E", text: "Widen" }], correctLabel: "B", tags: ["antonym"] },
  { category: "verbal", difficulty: 1, stem: "Choose the word that is most OPPOSITE to ANCIENT.", options: [{ label: "A", text: "Old" }, { label: "B", text: "Historic" }, { label: "C", text: "Modern" }, { label: "D", text: "Classic" }, { label: "E", text: "Antique" }], correctLabel: "C", tags: ["antonym"] },
  { category: "verbal", difficulty: 1, stem: "Choose the word that is most OPPOSITE to GENEROUS.", options: [{ label: "A", text: "Kind" }, { label: "B", text: "Wealthy" }, { label: "C", text: "Humble" }, { label: "D", text: "Stingy" }, { label: "E", text: "Charitable" }], correctLabel: "D", tags: ["antonym"] },
  { category: "verbal", difficulty: 1, stem: "Choose the word that is most OPPOSITE to BRAVE.", options: [{ label: "A", text: "Bold" }, { label: "B", text: "Strong" }, { label: "C", text: "Cowardly" }, { label: "D", text: "Fierce" }, { label: "E", text: "Daring" }], correctLabel: "C", tags: ["antonym"] },
  { category: "verbal", difficulty: 1, stem: "Choose the word that is most OPPOSITE to SIMPLE.", options: [{ label: "A", text: "Easy" }, { label: "B", text: "Plain" }, { label: "C", text: "Basic" }, { label: "D", text: "Complex" }, { label: "E", text: "Clear" }], correctLabel: "D", tags: ["antonym"] },
  // Analogies
  { category: "verbal", difficulty: 1, stem: "BIRD is to FLY as FISH is to:", options: [{ label: "A", text: "Water" }, { label: "B", text: "Swim" }, { label: "C", text: "Scale" }, { label: "D", text: "Ocean" }, { label: "E", text: "Breathe" }], correctLabel: "B", tags: ["analogy"] },
  { category: "verbal", difficulty: 1, stem: "DOG is to PUPPY as CAT is to:", options: [{ label: "A", text: "Feline" }, { label: "B", text: "Kitten" }, { label: "C", text: "Cub" }, { label: "D", text: "Pet" }, { label: "E", text: "Whisker" }], correctLabel: "B", tags: ["analogy"] },
  { category: "verbal", difficulty: 1, stem: "BOOK is to READ as SONG is to:", options: [{ label: "A", text: "Write" }, { label: "B", text: "Dance" }, { label: "C", text: "Listen" }, { label: "D", text: "Play" }, { label: "E", text: "Compose" }], correctLabel: "C", tags: ["analogy"] },
  { category: "verbal", difficulty: 1, stem: "PEN is to WRITER as HAMMER is to:", options: [{ label: "A", text: "Nail" }, { label: "B", text: "Carpenter" }, { label: "C", text: "Wood" }, { label: "D", text: "Tool" }, { label: "E", text: "Build" }], correctLabel: "B", tags: ["analogy"] },
  { category: "verbal", difficulty: 1, stem: "OCEAN is to WATER as DESERT is to:", options: [{ label: "A", text: "Cactus" }, { label: "B", text: "Sand" }, { label: "C", text: "Heat" }, { label: "D", text: "Dry" }, { label: "E", text: "Oasis" }], correctLabel: "B", tags: ["analogy"] },
  // Sentence Completion
  { category: "verbal", difficulty: 1, stem: "The weather was so ___ that we decided to stay indoors.", options: [{ label: "A", text: "pleasant" }, { label: "B", text: "severe" }, { label: "C", text: "mild" }, { label: "D", text: "fair" }, { label: "E", text: "warm" }], correctLabel: "B", tags: ["sentence-completion"] },
  { category: "verbal", difficulty: 1, stem: "She was ___ about winning the first prize in the competition.", options: [{ label: "A", text: "ecstatic" }, { label: "B", text: "furious" }, { label: "C", text: "confused" }, { label: "D", text: "bored" }, { label: "E", text: "nervous" }], correctLabel: "A", tags: ["sentence-completion"] },
  // Vocabulary
  { category: "verbal", difficulty: 1, stem: "Which word means the same as HAPPY?", options: [{ label: "A", text: "Sad" }, { label: "B", text: "Joyful" }, { label: "C", text: "Angry" }, { label: "D", text: "Tired" }, { label: "E", text: "Worried" }], correctLabel: "B", tags: ["vocabulary"] },
  { category: "verbal", difficulty: 1, stem: "Which word means the same as FAST?", options: [{ label: "A", text: "Slow" }, { label: "B", text: "Quick" }, { label: "C", text: "Heavy" }, { label: "D", text: "Lazy" }, { label: "E", text: "Steady" }], correctLabel: "B", tags: ["vocabulary"] },
  { category: "verbal", difficulty: 1, stem: "Which word means the same as BEGIN?", options: [{ label: "A", text: "End" }, { label: "B", text: "Continue" }, { label: "C", text: "Start" }, { label: "D", text: "Finish" }, { label: "E", text: "Pause" }], correctLabel: "C", tags: ["vocabulary"] },

  // ===== MEDIUM (25) =====
  // Antonyms
  { category: "verbal", difficulty: 2, stem: "Choose the word that is most OPPOSITE to LENGTHEN.", options: [{ label: "A", text: "Abdicate" }, { label: "B", text: "Truncate" }, { label: "C", text: "Elongate" }, { label: "D", text: "Stifle" }, { label: "E", text: "Resist" }], correctLabel: "B", tags: ["antonym"] },
  { category: "verbal", difficulty: 2, stem: "Choose the word that is most OPPOSITE to BENEVOLENT.", options: [{ label: "A", text: "Charitable" }, { label: "B", text: "Malevolent" }, { label: "C", text: "Indifferent" }, { label: "D", text: "Generous" }, { label: "E", text: "Gracious" }], correctLabel: "B", tags: ["antonym"] },
  { category: "verbal", difficulty: 2, stem: "Choose the word that is most OPPOSITE to TRANSPARENT.", options: [{ label: "A", text: "Clear" }, { label: "B", text: "Opaque" }, { label: "C", text: "Visible" }, { label: "D", text: "Translucent" }, { label: "E", text: "Obvious" }], correctLabel: "B", tags: ["antonym"] },
  { category: "verbal", difficulty: 2, stem: "Choose the word that is most OPPOSITE to AFFLUENT.", options: [{ label: "A", text: "Wealthy" }, { label: "B", text: "Destitute" }, { label: "C", text: "Successful" }, { label: "D", text: "Famous" }, { label: "E", text: "Fortunate" }], correctLabel: "B", tags: ["antonym"] },
  { category: "verbal", difficulty: 2, stem: "Choose the word that is most OPPOSITE to CONCEAL.", options: [{ label: "A", text: "Hide" }, { label: "B", text: "Reveal" }, { label: "C", text: "Cover" }, { label: "D", text: "Protect" }, { label: "E", text: "Mask" }], correctLabel: "B", tags: ["antonym"] },
  { category: "verbal", difficulty: 2, stem: "Choose the word that is most OPPOSITE to RIGID.", options: [{ label: "A", text: "Stiff" }, { label: "B", text: "Hard" }, { label: "C", text: "Flexible" }, { label: "D", text: "Firm" }, { label: "E", text: "Solid" }], correctLabel: "C", tags: ["antonym"] },
  // Analogies
  { category: "verbal", difficulty: 2, stem: "SURGEON is to SCALPEL as PAINTER is to:", options: [{ label: "A", text: "Canvas" }, { label: "B", text: "Gallery" }, { label: "C", text: "Brush" }, { label: "D", text: "Color" }, { label: "E", text: "Studio" }], correctLabel: "C", tags: ["analogy"] },
  { category: "verbal", difficulty: 2, stem: "ARCHIPELAGO is to ISLANDS as CONSTELLATION is to:", options: [{ label: "A", text: "Planets" }, { label: "B", text: "Stars" }, { label: "C", text: "Galaxies" }, { label: "D", text: "Moons" }, { label: "E", text: "Space" }], correctLabel: "B", tags: ["analogy"] },
  { category: "verbal", difficulty: 2, stem: "THERMOMETER is to TEMPERATURE as BAROMETER is to:", options: [{ label: "A", text: "Wind" }, { label: "B", text: "Humidity" }, { label: "C", text: "Pressure" }, { label: "D", text: "Rain" }, { label: "E", text: "Climate" }], correctLabel: "C", tags: ["analogy"] },
  { category: "verbal", difficulty: 2, stem: "LIBRARY is to BOOKS as MUSEUM is to:", options: [{ label: "A", text: "Paintings" }, { label: "B", text: "Exhibits" }, { label: "C", text: "Tourists" }, { label: "D", text: "Buildings" }, { label: "E", text: "History" }], correctLabel: "B", tags: ["analogy"] },
  { category: "verbal", difficulty: 2, stem: "FLOCK is to BIRDS as PACK is to:", options: [{ label: "A", text: "Cards" }, { label: "B", text: "Wolves" }, { label: "C", text: "Fish" }, { label: "D", text: "Bees" }, { label: "E", text: "Sheep" }], correctLabel: "B", tags: ["analogy"] },
  { category: "verbal", difficulty: 2, stem: "PILOT is to COCKPIT as JUDGE is to:", options: [{ label: "A", text: "Prison" }, { label: "B", text: "Courtroom" }, { label: "C", text: "Law" }, { label: "D", text: "Gavel" }, { label: "E", text: "Verdict" }], correctLabel: "B", tags: ["analogy"] },
  { category: "verbal", difficulty: 2, stem: "RUDDER is to SHIP as STEERING WHEEL is to:", options: [{ label: "A", text: "Tire" }, { label: "B", text: "Car" }, { label: "C", text: "Driver" }, { label: "D", text: "Road" }, { label: "E", text: "Engine" }], correctLabel: "B", tags: ["analogy"] },
  // Sentence Completion
  { category: "verbal", difficulty: 2, stem: "The scientist's ___ approach to research ensured that every variable was carefully controlled.", options: [{ label: "A", text: "haphazard" }, { label: "B", text: "methodical" }, { label: "C", text: "reckless" }, { label: "D", text: "casual" }, { label: "E", text: "random" }], correctLabel: "B", tags: ["sentence-completion"] },
  { category: "verbal", difficulty: 2, stem: "The politician's speech was so ___ that many in the audience struggled to stay awake.", options: [{ label: "A", text: "riveting" }, { label: "B", text: "controversial" }, { label: "C", text: "tedious" }, { label: "D", text: "inspiring" }, { label: "E", text: "brief" }], correctLabel: "C", tags: ["sentence-completion"] },
  { category: "verbal", difficulty: 2, stem: "Despite the team's ___ effort, they fell short of their fundraising goal.", options: [{ label: "A", text: "minimal" }, { label: "B", text: "halfhearted" }, { label: "C", text: "valiant" }, { label: "D", text: "indifferent" }, { label: "E", text: "lazy" }], correctLabel: "C", tags: ["sentence-completion"] },
  { category: "verbal", difficulty: 2, stem: "The new policy was met with ___ from employees who felt it was unfair.", options: [{ label: "A", text: "enthusiasm" }, { label: "B", text: "resistance" }, { label: "C", text: "apathy" }, { label: "D", text: "gratitude" }, { label: "E", text: "indifference" }], correctLabel: "B", tags: ["sentence-completion"] },
  { category: "verbal", difficulty: 2, stem: "The manager's ___ leadership style fostered creativity and innovation among her team.", options: [{ label: "A", text: "authoritarian" }, { label: "B", text: "collaborative" }, { label: "C", text: "negligent" }, { label: "D", text: "rigid" }, { label: "E", text: "passive" }], correctLabel: "B", tags: ["sentence-completion"] },
  // Vocabulary
  { category: "verbal", difficulty: 2, stem: "EPHEMERAL most nearly means:", options: [{ label: "A", text: "Eternal" }, { label: "B", text: "Fleeting" }, { label: "C", text: "Solid" }, { label: "D", text: "Ancient" }, { label: "E", text: "Visible" }], correctLabel: "B", tags: ["vocabulary"] },
  { category: "verbal", difficulty: 2, stem: "LETHARGIC most nearly means:", options: [{ label: "A", text: "Energetic" }, { label: "B", text: "Sluggish" }, { label: "C", text: "Angry" }, { label: "D", text: "Cautious" }, { label: "E", text: "Restless" }], correctLabel: "B", tags: ["vocabulary"] },
  { category: "verbal", difficulty: 2, stem: "PROLIFIC most nearly means:", options: [{ label: "A", text: "Lazy" }, { label: "B", text: "Productive" }, { label: "C", text: "Famous" }, { label: "D", text: "Wealthy" }, { label: "E", text: "Skilled" }], correctLabel: "B", tags: ["vocabulary"] },
  { category: "verbal", difficulty: 2, stem: "UBIQUITOUS most nearly means:", options: [{ label: "A", text: "Rare" }, { label: "B", text: "Unique" }, { label: "C", text: "Everywhere" }, { label: "D", text: "Hidden" }, { label: "E", text: "Occasional" }], correctLabel: "C", tags: ["vocabulary"] },
  { category: "verbal", difficulty: 2, stem: "CANDID most nearly means:", options: [{ label: "A", text: "Reserved" }, { label: "B", text: "Frank" }, { label: "C", text: "Hostile" }, { label: "D", text: "Timid" }, { label: "E", text: "Polite" }], correctLabel: "B", tags: ["vocabulary"] },
  { category: "verbal", difficulty: 2, stem: "TACITURN most nearly means:", options: [{ label: "A", text: "Talkative" }, { label: "B", text: "Reserved" }, { label: "C", text: "Hostile" }, { label: "D", text: "Cheerful" }, { label: "E", text: "Nervous" }], correctLabel: "B", tags: ["vocabulary"] },

  // ===== HARD (10) =====
  // Antonyms
  { category: "verbal", difficulty: 3, stem: "Choose the word that is most OPPOSITE to EXACERBATE.", options: [{ label: "A", text: "Worsen" }, { label: "B", text: "Ameliorate" }, { label: "C", text: "Accelerate" }, { label: "D", text: "Complicate" }, { label: "E", text: "Intensify" }], correctLabel: "B", tags: ["antonym"] },
  { category: "verbal", difficulty: 3, stem: "Choose the word that is most OPPOSITE to LOQUACIOUS.", options: [{ label: "A", text: "Verbose" }, { label: "B", text: "Garrulous" }, { label: "C", text: "Taciturn" }, { label: "D", text: "Eloquent" }, { label: "E", text: "Articulate" }], correctLabel: "C", tags: ["antonym"] },
  // Analogies
  { category: "verbal", difficulty: 3, stem: "SYCOPHANT is to FLATTERY as ASCETIC is to:", options: [{ label: "A", text: "Luxury" }, { label: "B", text: "Self-denial" }, { label: "C", text: "Celebration" }, { label: "D", text: "Indulgence" }, { label: "E", text: "Pleasure" }], correctLabel: "B", tags: ["analogy"] },
  { category: "verbal", difficulty: 3, stem: "PARADOX is to CONTRADICTION as TAUTOLOGY is to:", options: [{ label: "A", text: "Redundancy" }, { label: "B", text: "Innovation" }, { label: "C", text: "Brevity" }, { label: "D", text: "Complexity" }, { label: "E", text: "Clarity" }], correctLabel: "A", tags: ["analogy"] },
  { category: "verbal", difficulty: 3, stem: "CATALYST is to REACTION as SPARK is to:", options: [{ label: "A", text: "Electricity" }, { label: "B", text: "Fire" }, { label: "C", text: "Light" }, { label: "D", text: "Wire" }, { label: "E", text: "Heat" }], correctLabel: "B", tags: ["analogy"] },
  // Sentence Completion
  { category: "verbal", difficulty: 3, stem: "The author's ___ prose style, characterized by long subordinate clauses and obscure allusions, challenged even experienced readers.", options: [{ label: "A", text: "lucid" }, { label: "B", text: "terse" }, { label: "C", text: "labyrinthine" }, { label: "D", text: "pedestrian" }, { label: "E", text: "colloquial" }], correctLabel: "C", tags: ["sentence-completion"] },
  { category: "verbal", difficulty: 3, stem: "The diplomat's ___ remarks, while seemingly innocuous, carried a subtle but unmistakable warning to the opposing delegation.", options: [{ label: "A", text: "bombastic" }, { label: "B", text: "anodyne" }, { label: "C", text: "veiled" }, { label: "D", text: "effusive" }, { label: "E", text: "explicit" }], correctLabel: "C", tags: ["sentence-completion"] },
  { category: "verbal", difficulty: 3, stem: "The professor's ___ arguments, though difficult to follow, ultimately proved to be logically irrefutable.", options: [{ label: "A", text: "simplistic" }, { label: "B", text: "abstruse" }, { label: "C", text: "fallacious" }, { label: "D", text: "banal" }, { label: "E", text: "transparent" }], correctLabel: "B", tags: ["sentence-completion"] },
  // Vocabulary
  { category: "verbal", difficulty: 3, stem: "PERSPICACIOUS most nearly means:", options: [{ label: "A", text: "Stubborn" }, { label: "B", text: "Shrewd" }, { label: "C", text: "Generous" }, { label: "D", text: "Anxious" }, { label: "E", text: "Careless" }], correctLabel: "B", tags: ["vocabulary"] },
  { category: "verbal", difficulty: 3, stem: "OBSEQUIOUS most nearly means:", options: [{ label: "A", text: "Defiant" }, { label: "B", text: "Indifferent" }, { label: "C", text: "Fawning" }, { label: "D", text: "Honest" }, { label: "E", text: "Assertive" }], correctLabel: "C", tags: ["vocabulary"] },
];

// ---------------------------------------------------------------------------
// MATH & LOGIC QUESTIONS — Real CCAT style (50+)
// Types: word problems, number sequences, percentages, ratios, arithmetic, logical deduction
// Distribution: ~15 easy, ~25 medium, ~10 hard
// ---------------------------------------------------------------------------
const mathLogicQuestions: QuestionData[] = [
  // ===== EASY (15) =====
  // Basic Arithmetic (CCAT starts with easy warm-up questions)
  { category: "math_logic", difficulty: 1, stem: "What is 7 × 8?", options: [{ label: "A", text: "54" }, { label: "B", text: "56" }, { label: "C", text: "58" }, { label: "D", text: "63" }, { label: "E", text: "48" }], correctLabel: "B", tags: ["arithmetic"] },
  { category: "math_logic", difficulty: 1, stem: "What is 144 ÷ 12?", options: [{ label: "A", text: "10" }, { label: "B", text: "11" }, { label: "C", text: "12" }, { label: "D", text: "14" }, { label: "E", text: "13" }], correctLabel: "C", tags: ["arithmetic"] },
  { category: "math_logic", difficulty: 1, stem: "What is 15 + 27?", options: [{ label: "A", text: "32" }, { label: "B", text: "42" }, { label: "C", text: "40" }, { label: "D", text: "52" }, { label: "E", text: "38" }], correctLabel: "B", tags: ["arithmetic"] },
  // Percentages
  { category: "math_logic", difficulty: 1, stem: "If a shirt costs $20 and is on sale for 50% off, what is the sale price?", options: [{ label: "A", text: "$5" }, { label: "B", text: "$10" }, { label: "C", text: "$15" }, { label: "D", text: "$12" }, { label: "E", text: "$8" }], correctLabel: "B", tags: ["percentage"] },
  { category: "math_logic", difficulty: 1, stem: "What is 25% of 80?", options: [{ label: "A", text: "15" }, { label: "B", text: "20" }, { label: "C", text: "25" }, { label: "D", text: "30" }, { label: "E", text: "16" }], correctLabel: "B", tags: ["percentage"] },
  // Word Problems
  { category: "math_logic", difficulty: 1, stem: "You buy 5 pens at $2.40 each. What is the total cost?", options: [{ label: "A", text: "$12.00" }, { label: "B", text: "$11.20" }, { label: "C", text: "$10.80" }, { label: "D", text: "$12.40" }, { label: "E", text: "$10.00" }], correctLabel: "A", tags: ["word-problem"] },
  { category: "math_logic", difficulty: 1, stem: "A baker has 36 cookies and divides them equally among 4 children. How many does each child get?", options: [{ label: "A", text: "7" }, { label: "B", text: "8" }, { label: "C", text: "9" }, { label: "D", text: "10" }, { label: "E", text: "6" }], correctLabel: "C", tags: ["word-problem"] },
  { category: "math_logic", difficulty: 1, stem: "A cashier processes 15 customers per hour. How many customers in 8 hours?", options: [{ label: "A", text: "60" }, { label: "B", text: "90" }, { label: "C", text: "120" }, { label: "D", text: "150" }, { label: "E", text: "100" }], correctLabel: "C", tags: ["word-problem"] },
  { category: "math_logic", difficulty: 1, stem: "A dozen eggs costs $3.60. How much does each egg cost?", options: [{ label: "A", text: "$0.25" }, { label: "B", text: "$0.30" }, { label: "C", text: "$0.35" }, { label: "D", text: "$0.40" }, { label: "E", text: "$0.20" }], correctLabel: "B", tags: ["word-problem"] },
  // Number Sequences
  { category: "math_logic", difficulty: 1, stem: "What is the next number in the sequence: 2, 4, 6, 8, ___?", options: [{ label: "A", text: "9" }, { label: "B", text: "10" }, { label: "C", text: "12" }, { label: "D", text: "16" }, { label: "E", text: "14" }], correctLabel: "B", tags: ["number-sequence"] },
  { category: "math_logic", difficulty: 1, stem: "What is the next number: 5, 10, 15, 20, ___?", options: [{ label: "A", text: "22" }, { label: "B", text: "24" }, { label: "C", text: "25" }, { label: "D", text: "30" }, { label: "E", text: "35" }], correctLabel: "C", tags: ["number-sequence"] },
  { category: "math_logic", difficulty: 1, stem: "What is the next number: 3, 6, 9, 12, ___?", options: [{ label: "A", text: "14" }, { label: "B", text: "15" }, { label: "C", text: "16" }, { label: "D", text: "18" }, { label: "E", text: "21" }], correctLabel: "B", tags: ["number-sequence"] },
  // Logical Deduction
  { category: "math_logic", difficulty: 1, stem: "All cats are animals. Whiskers is a cat. Therefore:", options: [{ label: "A", text: "Whiskers is a dog" }, { label: "B", text: "Whiskers is an animal" }, { label: "C", text: "All animals are cats" }, { label: "D", text: "Whiskers is not an animal" }, { label: "E", text: "Some animals are cats" }], correctLabel: "B", tags: ["logical-deduction"] },
  { category: "math_logic", difficulty: 1, stem: "All dogs have tails. Rex is a dog. Therefore:", options: [{ label: "A", text: "Rex has four legs" }, { label: "B", text: "Rex has a tail" }, { label: "C", text: "All tails belong to dogs" }, { label: "D", text: "Rex is a puppy" }, { label: "E", text: "Dogs are mammals" }], correctLabel: "B", tags: ["logical-deduction"] },
  { category: "math_logic", difficulty: 1, stem: "A box has 48 items. If you remove half, how many remain?", options: [{ label: "A", text: "12" }, { label: "B", text: "20" }, { label: "C", text: "24" }, { label: "D", text: "36" }, { label: "E", text: "16" }], correctLabel: "C", tags: ["word-problem"] },

  // ===== MEDIUM (25) =====
  // Number Sequences
  { category: "math_logic", difficulty: 2, stem: "What is the next number: 2, 4, 8, 16, ___?", options: [{ label: "A", text: "18" }, { label: "B", text: "20" }, { label: "C", text: "32" }, { label: "D", text: "24" }, { label: "E", text: "28" }], correctLabel: "C", tags: ["number-sequence"] },
  { category: "math_logic", difficulty: 2, stem: "What is the next number: 2, 6, 18, 54, ___?", options: [{ label: "A", text: "108" }, { label: "B", text: "162" }, { label: "C", text: "72" }, { label: "D", text: "216" }, { label: "E", text: "180" }], correctLabel: "B", tags: ["number-sequence"] },
  { category: "math_logic", difficulty: 2, stem: "What is the next number: 1, 1, 2, 3, 5, 8, ___?", options: [{ label: "A", text: "11" }, { label: "B", text: "12" }, { label: "C", text: "13" }, { label: "D", text: "15" }, { label: "E", text: "10" }], correctLabel: "C", tags: ["number-sequence"] },
  { category: "math_logic", difficulty: 2, stem: "What is the next number: 1, 4, 9, 16, 25, ___?", options: [{ label: "A", text: "30" }, { label: "B", text: "34" }, { label: "C", text: "36" }, { label: "D", text: "49" }, { label: "E", text: "35" }], correctLabel: "C", tags: ["number-sequence"] },
  { category: "math_logic", difficulty: 2, stem: "What is the next number: 100, 81, 64, 49, ___?", options: [{ label: "A", text: "25" }, { label: "B", text: "36" }, { label: "C", text: "32" }, { label: "D", text: "40" }, { label: "E", text: "42" }], correctLabel: "B", tags: ["number-sequence"] },
  { category: "math_logic", difficulty: 2, stem: "What is the next number: 0, 1, 3, 6, 10, ___?", options: [{ label: "A", text: "13" }, { label: "B", text: "14" }, { label: "C", text: "15" }, { label: "D", text: "16" }, { label: "E", text: "12" }], correctLabel: "C", tags: ["number-sequence"] },
  { category: "math_logic", difficulty: 2, stem: "What is the next number: 2, 3, 5, 7, 11, ___?", options: [{ label: "A", text: "12" }, { label: "B", text: "13" }, { label: "C", text: "14" }, { label: "D", text: "15" }, { label: "E", text: "17" }], correctLabel: "B", tags: ["number-sequence"] },
  // Word Problems
  { category: "math_logic", difficulty: 2, stem: "A group of 3 numbers has an average of 17. The first two numbers are 12 and 19. What is the third number?", options: [{ label: "A", text: "17" }, { label: "B", text: "19" }, { label: "C", text: "20" }, { label: "D", text: "23" }, { label: "E", text: "18" }], correctLabel: "C", tags: ["word-problem"] },
  { category: "math_logic", difficulty: 2, stem: "A zoo offers a 25% group discount on $80 admission. How many people were in a group that spent $720?", options: [{ label: "A", text: "9" }, { label: "B", text: "10" }, { label: "C", text: "12" }, { label: "D", text: "15" }, { label: "E", text: "8" }], correctLabel: "C", tags: ["word-problem"] },
  { category: "math_logic", difficulty: 2, stem: "A train travels 240 km in 3 hours. What is its average speed?", options: [{ label: "A", text: "60 km/h" }, { label: "B", text: "70 km/h" }, { label: "C", text: "80 km/h" }, { label: "D", text: "90 km/h" }, { label: "E", text: "100 km/h" }], correctLabel: "C", tags: ["word-problem"] },
  { category: "math_logic", difficulty: 2, stem: "If it takes 6 workers 4 days to build a wall, how long would it take 12 workers?", options: [{ label: "A", text: "1 day" }, { label: "B", text: "2 days" }, { label: "C", text: "3 days" }, { label: "D", text: "8 days" }, { label: "E", text: "4 days" }], correctLabel: "B", tags: ["word-problem"] },
  { category: "math_logic", difficulty: 2, stem: "A rectangle has perimeter 30 cm and width 5 cm. What is its length?", options: [{ label: "A", text: "8 cm" }, { label: "B", text: "10 cm" }, { label: "C", text: "12 cm" }, { label: "D", text: "15 cm" }, { label: "E", text: "20 cm" }], correctLabel: "B", tags: ["word-problem"] },
  // Percentages
  { category: "math_logic", difficulty: 2, stem: "A store marks up products by 25%. If a product costs $80, what is the selling price?", options: [{ label: "A", text: "$90" }, { label: "B", text: "$95" }, { label: "C", text: "$100" }, { label: "D", text: "$105" }, { label: "E", text: "$110" }], correctLabel: "C", tags: ["percentage"] },
  { category: "math_logic", difficulty: 2, stem: "What is 15% of 200?", options: [{ label: "A", text: "15" }, { label: "B", text: "25" }, { label: "C", text: "30" }, { label: "D", text: "35" }, { label: "E", text: "20" }], correctLabel: "C", tags: ["percentage"] },
  { category: "math_logic", difficulty: 2, stem: "A jacket originally costs $120. After a 30% discount, what is the price?", options: [{ label: "A", text: "$84" }, { label: "B", text: "$86" }, { label: "C", text: "$90" }, { label: "D", text: "$96" }, { label: "E", text: "$80" }], correctLabel: "A", tags: ["percentage"] },
  { category: "math_logic", difficulty: 2, stem: "A car depreciates 20% yearly. Worth $25,000 new, what is it worth after 1 year?", options: [{ label: "A", text: "$5,000" }, { label: "B", text: "$15,000" }, { label: "C", text: "$20,000" }, { label: "D", text: "$22,500" }, { label: "E", text: "$18,000" }], correctLabel: "C", tags: ["percentage"] },
  // Ratios
  { category: "math_logic", difficulty: 2, stem: "The ratio of boys to girls is 3:5. If there are 24 students, how many girls?", options: [{ label: "A", text: "9" }, { label: "B", text: "12" }, { label: "C", text: "15" }, { label: "D", text: "18" }, { label: "E", text: "10" }], correctLabel: "C", tags: ["ratio"] },
  { category: "math_logic", difficulty: 2, stem: "A recipe calls for 2 cups of flour for 12 cookies. How much flour for 30 cookies?", options: [{ label: "A", text: "4 cups" }, { label: "B", text: "5 cups" }, { label: "C", text: "6 cups" }, { label: "D", text: "3 cups" }, { label: "E", text: "7 cups" }], correctLabel: "B", tags: ["ratio"] },
  { category: "math_logic", difficulty: 2, stem: "A jar has 3 red, 5 blue, and 2 green marbles. What is the probability of drawing a blue marble?", options: [{ label: "A", text: "1/3" }, { label: "B", text: "1/2" }, { label: "C", text: "2/5" }, { label: "D", text: "3/10" }, { label: "E", text: "5/8" }], correctLabel: "B", tags: ["ratio"] },
  { category: "math_logic", difficulty: 2, stem: "A map scale is 1:50,000. If two cities are 4 cm apart on the map, what is the real distance?", options: [{ label: "A", text: "2 km" }, { label: "B", text: "20 km" }, { label: "C", text: "200 km" }, { label: "D", text: "0.2 km" }, { label: "E", text: "4 km" }], correctLabel: "A", tags: ["ratio"] },
  // Logical Deduction
  { category: "math_logic", difficulty: 2, stem: "If all roses are flowers, and some flowers fade quickly, which must be true?", options: [{ label: "A", text: "All roses fade quickly" }, { label: "B", text: "Some roses may fade quickly" }, { label: "C", text: "No roses fade quickly" }, { label: "D", text: "All flowers are roses" }, { label: "E", text: "Roses never fade" }], correctLabel: "B", tags: ["logical-deduction"] },
  { category: "math_logic", difficulty: 2, stem: "If 5 machines take 5 minutes to make 5 widgets, how long for 100 machines to make 100 widgets?", options: [{ label: "A", text: "1 minute" }, { label: "B", text: "5 minutes" }, { label: "C", text: "20 minutes" }, { label: "D", text: "100 minutes" }, { label: "E", text: "50 minutes" }], correctLabel: "B", tags: ["logical-deduction"] },
  { category: "math_logic", difficulty: 2, stem: "Neither Alice nor Bob is tallest. Charlie is taller than Diana. Diana is taller than Alice. Who could be tallest?", options: [{ label: "A", text: "Alice" }, { label: "B", text: "Bob" }, { label: "C", text: "Charlie" }, { label: "D", text: "Diana" }, { label: "E", text: "Cannot be determined" }], correctLabel: "C", tags: ["logical-deduction"] },
  { category: "math_logic", difficulty: 2, stem: "Tom is older than Sue. Sue is older than Mike. Who is youngest?", options: [{ label: "A", text: "Tom" }, { label: "B", text: "Sue" }, { label: "C", text: "Mike" }, { label: "D", text: "Cannot determine" }, { label: "E", text: "They are the same age" }], correctLabel: "C", tags: ["logical-deduction"] },
  { category: "math_logic", difficulty: 2, stem: "If no athletes are lazy and some students are lazy, which must be true?", options: [{ label: "A", text: "No students are athletes" }, { label: "B", text: "Some students are not athletes" }, { label: "C", text: "All athletes are students" }, { label: "D", text: "Some athletes are lazy" }, { label: "E", text: "All students are lazy" }], correctLabel: "B", tags: ["logical-deduction"] },

  // ===== HARD (10) =====
  // Number Sequences
  { category: "math_logic", difficulty: 3, stem: "What is the next number: 1, 3, 7, 15, 31, ___?", options: [{ label: "A", text: "55" }, { label: "B", text: "62" }, { label: "C", text: "63" }, { label: "D", text: "64" }, { label: "E", text: "47" }], correctLabel: "C", tags: ["number-sequence"] },
  { category: "math_logic", difficulty: 3, stem: "What is the next number: 1, 2, 6, 24, 120, ___?", options: [{ label: "A", text: "240" }, { label: "B", text: "480" }, { label: "C", text: "600" }, { label: "D", text: "720" }, { label: "E", text: "360" }], correctLabel: "D", tags: ["number-sequence"] },
  // Word Problems
  { category: "math_logic", difficulty: 3, stem: "A clock loses 15 minutes every hour. If set correctly at noon, what time does it show at 4:00 PM?", options: [{ label: "A", text: "3:00 PM" }, { label: "B", text: "3:15 PM" }, { label: "C", text: "2:45 PM" }, { label: "D", text: "3:30 PM" }, { label: "E", text: "2:00 PM" }], correctLabel: "A", tags: ["word-problem"] },
  { category: "math_logic", difficulty: 3, stem: "In a room of 30 people, everyone shakes hands with everyone else exactly once. How many handshakes occur?", options: [{ label: "A", text: "435" }, { label: "B", text: "870" }, { label: "C", text: "450" }, { label: "D", text: "900" }, { label: "E", text: "420" }], correctLabel: "A", tags: ["word-problem"] },
  { category: "math_logic", difficulty: 3, stem: "A tank fills by pipe A in 6 hours and pipe B in 8 hours. With both pipes open, how long to fill?", options: [{ label: "A", text: "3 hours 26 min" }, { label: "B", text: "3 hours 30 min" }, { label: "C", text: "7 hours" }, { label: "D", text: "4 hours" }, { label: "E", text: "2 hours 45 min" }], correctLabel: "A", tags: ["word-problem"] },
  { category: "math_logic", difficulty: 3, stem: "Three people can paint a house in 6 hours. How long for two people at the same rate?", options: [{ label: "A", text: "8 hours" }, { label: "B", text: "9 hours" }, { label: "C", text: "10 hours" }, { label: "D", text: "12 hours" }, { label: "E", text: "7 hours" }], correctLabel: "B", tags: ["word-problem"] },
  { category: "math_logic", difficulty: 3, stem: "A snail climbs 3m during the day and slides back 2m at night. How many days to reach the top of a 10m wall?", options: [{ label: "A", text: "7" }, { label: "B", text: "8" }, { label: "C", text: "9" }, { label: "D", text: "10" }, { label: "E", text: "6" }], correctLabel: "B", tags: ["logical-deduction"] },
  // Percentages
  { category: "math_logic", difficulty: 3, stem: "A company's profit increased by 20% in year 1, then decreased by 20% in year 2. Compared to the original, the profit is:", options: [{ label: "A", text: "The same" }, { label: "B", text: "4% lower" }, { label: "C", text: "4% higher" }, { label: "D", text: "2% lower" }, { label: "E", text: "2% higher" }], correctLabel: "B", tags: ["percentage"] },
  // Logical Deduction
  { category: "math_logic", difficulty: 3, stem: "If the day after tomorrow is two days before Thursday, what day is today?", options: [{ label: "A", text: "Sunday" }, { label: "B", text: "Monday" }, { label: "C", text: "Tuesday" }, { label: "D", text: "Saturday" }, { label: "E", text: "Wednesday" }], correctLabel: "A", tags: ["logical-deduction"] },
  { category: "math_logic", difficulty: 3, stem: "If you flip a coin 3 times, what is the probability of getting exactly 2 heads?", options: [{ label: "A", text: "1/4" }, { label: "B", text: "3/8" }, { label: "C", text: "1/2" }, { label: "D", text: "1/8" }, { label: "E", text: "1/3" }], correctLabel: "B", tags: ["ratio"] },
];

// ---------------------------------------------------------------------------
// SPATIAL REASONING QUESTIONS — imported from separate file with SVG visuals
// ---------------------------------------------------------------------------
import { spatialQuestions } from "./spatial-questions";

// ---------------------------------------------------------------------------
// SEED FUNCTION
// ---------------------------------------------------------------------------
async function main() {
  console.log("Starting seed...");

  console.log("  Clearing existing data...");
  await prisma.questionInstance.deleteMany();
  await prisma.testSession.deleteMany();
  await prisma.option.deleteMany();
  await prisma.question.deleteMany();
  console.log("  Existing data cleared.");

  const allQuestions = [...verbalQuestions, ...mathLogicQuestions, ...spatialQuestions];
  console.log(`  Seeding ${allQuestions.length} questions...`);

  let count = 0;
  for (const q of allQuestions) {
    await prisma.$transaction(async (tx) => {
      const question = await tx.question.create({
        data: {
          category: q.category,
          difficulty: q.difficulty,
          stem: q.stem,
          correctOptionId: "placeholder",
          tags: q.tags,
        },
      });

      const createdOptions = await Promise.all(
        q.options.map((opt) =>
          tx.option.create({
            data: { questionId: question.id, label: opt.label, text: opt.text },
          })
        )
      );

      const correctOption = createdOptions.find((o) => o.label === q.correctLabel);
      if (!correctOption) {
        throw new Error(`Correct option "${q.correctLabel}" not found for: "${q.stem}"`);
      }

      await tx.question.update({
        where: { id: question.id },
        data: { correctOptionId: correctOption.id },
      });
    });

    count++;
    if (count % 10 === 0) console.log(`  Progress: ${count}/${allQuestions.length}`);
  }

  console.log(`\n  All ${count} questions seeded!`);

  const verbal = await prisma.question.count({ where: { category: "verbal" } });
  const math = await prisma.question.count({ where: { category: "math_logic" } });
  const spatial = await prisma.question.count({ where: { category: "spatial" } });

  console.log(`\nSummary: Verbal=${verbal}, Math&Logic=${math}, Spatial=${spatial}, Total=${verbal + math + spatial}`);
}

main()
  .then(async () => { await prisma.$disconnect(); console.log("Seed completed!"); })
  .catch(async (e) => { console.error("Seed failed:", e); await prisma.$disconnect(); process.exit(1); });
