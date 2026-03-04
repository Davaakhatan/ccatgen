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
// VERBAL QUESTIONS (30)
// ---------------------------------------------------------------------------
const verbalQuestions: QuestionData[] = [
  // Easy (9)
  { category: "verbal", difficulty: 1, stem: "Bright is to Dim as Hot is to:", options: [{ label: "A", text: "Cold" }, { label: "B", text: "Warm" }, { label: "C", text: "Fire" }, { label: "D", text: "Sun" }], correctLabel: "A", tags: ["analogy"] },
  { category: "verbal", difficulty: 1, stem: "What is the opposite of 'ancient'?", options: [{ label: "A", text: "Old" }, { label: "B", text: "Modern" }, { label: "C", text: "Historic" }, { label: "D", text: "Classic" }], correctLabel: "B", tags: ["antonym"] },
  { category: "verbal", difficulty: 1, stem: "Choose the word that best completes the sentence: The weather was so ___ that we decided to stay indoors.", options: [{ label: "A", text: "pleasant" }, { label: "B", text: "severe" }, { label: "C", text: "mild" }, { label: "D", text: "fair" }], correctLabel: "B", tags: ["sentence-completion"] },
  { category: "verbal", difficulty: 1, stem: "Dog is to Puppy as Cat is to:", options: [{ label: "A", text: "Feline" }, { label: "B", text: "Kitten" }, { label: "C", text: "Cub" }, { label: "D", text: "Pet" }], correctLabel: "B", tags: ["analogy"] },
  { category: "verbal", difficulty: 1, stem: "What is the opposite of 'generous'?", options: [{ label: "A", text: "Kind" }, { label: "B", text: "Wealthy" }, { label: "C", text: "Stingy" }, { label: "D", text: "Humble" }], correctLabel: "C", tags: ["antonym"] },
  { category: "verbal", difficulty: 1, stem: "Which word means the same as 'happy'?", options: [{ label: "A", text: "Sad" }, { label: "B", text: "Joyful" }, { label: "C", text: "Angry" }, { label: "D", text: "Tired" }], correctLabel: "B", tags: ["vocabulary"] },
  { category: "verbal", difficulty: 1, stem: "Book is to Read as Song is to:", options: [{ label: "A", text: "Write" }, { label: "B", text: "Dance" }, { label: "C", text: "Listen" }, { label: "D", text: "Play" }], correctLabel: "C", tags: ["analogy"] },
  { category: "verbal", difficulty: 1, stem: "Choose the word that best completes: She was ___ about winning the prize.", options: [{ label: "A", text: "ecstatic" }, { label: "B", text: "furious" }, { label: "C", text: "confused" }, { label: "D", text: "bored" }], correctLabel: "A", tags: ["sentence-completion"] },
  { category: "verbal", difficulty: 1, stem: "What is the opposite of 'expand'?", options: [{ label: "A", text: "Grow" }, { label: "B", text: "Stretch" }, { label: "C", text: "Contract" }, { label: "D", text: "Inflate" }], correctLabel: "C", tags: ["antonym"] },
  // Medium (15)
  { category: "verbal", difficulty: 2, stem: "Ephemeral most nearly means:", options: [{ label: "A", text: "Eternal" }, { label: "B", text: "Fleeting" }, { label: "C", text: "Solid" }, { label: "D", text: "Ancient" }], correctLabel: "B", tags: ["vocabulary"] },
  { category: "verbal", difficulty: 2, stem: "Surgeon is to Scalpel as Painter is to:", options: [{ label: "A", text: "Canvas" }, { label: "B", text: "Gallery" }, { label: "C", text: "Brush" }, { label: "D", text: "Color" }], correctLabel: "C", tags: ["analogy"] },
  { category: "verbal", difficulty: 2, stem: "The scientist's ___ approach to research ensured that every variable was carefully controlled.", options: [{ label: "A", text: "haphazard" }, { label: "B", text: "methodical" }, { label: "C", text: "reckless" }, { label: "D", text: "casual" }], correctLabel: "B", tags: ["sentence-completion"] },
  { category: "verbal", difficulty: 2, stem: "Which word is most opposite in meaning to 'benevolent'?", options: [{ label: "A", text: "Charitable" }, { label: "B", text: "Malevolent" }, { label: "C", text: "Indifferent" }, { label: "D", text: "Generous" }], correctLabel: "B", tags: ["antonym"] },
  { category: "verbal", difficulty: 2, stem: "Archipelago is to Islands as Constellation is to:", options: [{ label: "A", text: "Planets" }, { label: "B", text: "Stars" }, { label: "C", text: "Galaxies" }, { label: "D", text: "Moons" }], correctLabel: "B", tags: ["analogy"] },
  { category: "verbal", difficulty: 2, stem: "The politician's speech was so ___ that many in the audience struggled to stay awake.", options: [{ label: "A", text: "riveting" }, { label: "B", text: "controversial" }, { label: "C", text: "tedious" }, { label: "D", text: "inspiring" }], correctLabel: "C", tags: ["sentence-completion"] },
  { category: "verbal", difficulty: 2, stem: "Lethargic most nearly means:", options: [{ label: "A", text: "Energetic" }, { label: "B", text: "Sluggish" }, { label: "C", text: "Angry" }, { label: "D", text: "Cautious" }], correctLabel: "B", tags: ["vocabulary"] },
  { category: "verbal", difficulty: 2, stem: "Library is to Books as Museum is to:", options: [{ label: "A", text: "Paintings" }, { label: "B", text: "Exhibits" }, { label: "C", text: "Tourists" }, { label: "D", text: "Buildings" }], correctLabel: "B", tags: ["analogy"] },
  { category: "verbal", difficulty: 2, stem: "What is the opposite of 'transparent'?", options: [{ label: "A", text: "Clear" }, { label: "B", text: "Opaque" }, { label: "C", text: "Visible" }, { label: "D", text: "Translucent" }], correctLabel: "B", tags: ["antonym"] },
  { category: "verbal", difficulty: 2, stem: "Despite the team's ___ effort, they fell short of their fundraising goal.", options: [{ label: "A", text: "minimal" }, { label: "B", text: "halfhearted" }, { label: "C", text: "valiant" }, { label: "D", text: "indifferent" }], correctLabel: "C", tags: ["sentence-completion"] },
  { category: "verbal", difficulty: 2, stem: "Prolific most nearly means:", options: [{ label: "A", text: "Lazy" }, { label: "B", text: "Productive" }, { label: "C", text: "Famous" }, { label: "D", text: "Wealthy" }], correctLabel: "B", tags: ["vocabulary"] },
  { category: "verbal", difficulty: 2, stem: "Thermometer is to Temperature as Barometer is to:", options: [{ label: "A", text: "Wind" }, { label: "B", text: "Humidity" }, { label: "C", text: "Pressure" }, { label: "D", text: "Rain" }], correctLabel: "C", tags: ["analogy"] },
  { category: "verbal", difficulty: 2, stem: "The new policy was met with ___ from employees who felt it was unfair.", options: [{ label: "A", text: "enthusiasm" }, { label: "B", text: "resistance" }, { label: "C", text: "apathy" }, { label: "D", text: "gratitude" }], correctLabel: "B", tags: ["sentence-completion"] },
  { category: "verbal", difficulty: 2, stem: "Ubiquitous most nearly means:", options: [{ label: "A", text: "Rare" }, { label: "B", text: "Unique" }, { label: "C", text: "Everywhere" }, { label: "D", text: "Hidden" }], correctLabel: "C", tags: ["vocabulary"] },
  { category: "verbal", difficulty: 2, stem: "Candid most nearly means:", options: [{ label: "A", text: "Reserved" }, { label: "B", text: "Frank" }, { label: "C", text: "Hostile" }, { label: "D", text: "Timid" }], correctLabel: "B", tags: ["vocabulary"] },
  // Hard (6)
  { category: "verbal", difficulty: 3, stem: "Perspicacious most nearly means:", options: [{ label: "A", text: "Stubborn" }, { label: "B", text: "Shrewd" }, { label: "C", text: "Generous" }, { label: "D", text: "Anxious" }], correctLabel: "B", tags: ["vocabulary"] },
  { category: "verbal", difficulty: 3, stem: "Sycophant is to Flattery as Ascetic is to:", options: [{ label: "A", text: "Luxury" }, { label: "B", text: "Self-denial" }, { label: "C", text: "Celebration" }, { label: "D", text: "Indulgence" }], correctLabel: "B", tags: ["analogy"] },
  { category: "verbal", difficulty: 3, stem: "The author's ___ prose style, characterized by long subordinate clauses and obscure allusions, challenged even experienced readers.", options: [{ label: "A", text: "lucid" }, { label: "B", text: "terse" }, { label: "C", text: "labyrinthine" }, { label: "D", text: "pedestrian" }], correctLabel: "C", tags: ["sentence-completion"] },
  { category: "verbal", difficulty: 3, stem: "Enervate most nearly means:", options: [{ label: "A", text: "Energize" }, { label: "B", text: "Weaken" }, { label: "C", text: "Anger" }, { label: "D", text: "Encourage" }], correctLabel: "B", tags: ["vocabulary"] },
  { category: "verbal", difficulty: 3, stem: "Paradox is to Contradiction as Tautology is to:", options: [{ label: "A", text: "Redundancy" }, { label: "B", text: "Innovation" }, { label: "C", text: "Brevity" }, { label: "D", text: "Complexity" }], correctLabel: "A", tags: ["analogy"] },
  { category: "verbal", difficulty: 3, stem: "The diplomat's ___ remarks, while seemingly innocuous, carried a subtle but unmistakable warning to the opposing delegation.", options: [{ label: "A", text: "bombastic" }, { label: "B", text: "anodyne" }, { label: "C", text: "veiled" }, { label: "D", text: "effusive" }], correctLabel: "C", tags: ["sentence-completion"] },
  // --- Additional Verbal (20 more) ---
  { category: "verbal", difficulty: 1, stem: "What is the opposite of 'brave'?", options: [{ label: "A", text: "Bold" }, { label: "B", text: "Cowardly" }, { label: "C", text: "Strong" }, { label: "D", text: "Fierce" }], correctLabel: "B", tags: ["antonym"] },
  { category: "verbal", difficulty: 1, stem: "Pen is to Writer as Hammer is to:", options: [{ label: "A", text: "Nail" }, { label: "B", text: "Carpenter" }, { label: "C", text: "Wood" }, { label: "D", text: "Tool" }], correctLabel: "B", tags: ["analogy"] },
  { category: "verbal", difficulty: 1, stem: "Which word means the same as 'fast'?", options: [{ label: "A", text: "Slow" }, { label: "B", text: "Quick" }, { label: "C", text: "Heavy" }, { label: "D", text: "Lazy" }], correctLabel: "B", tags: ["vocabulary"] },
  { category: "verbal", difficulty: 1, stem: "Choose the word that best completes: The road was too ___ for the old car to handle.", options: [{ label: "A", text: "smooth" }, { label: "B", text: "flat" }, { label: "C", text: "rough" }, { label: "D", text: "wide" }], correctLabel: "C", tags: ["sentence-completion"] },
  { category: "verbal", difficulty: 2, stem: "Taciturn most nearly means:", options: [{ label: "A", text: "Talkative" }, { label: "B", text: "Reserved" }, { label: "C", text: "Hostile" }, { label: "D", text: "Cheerful" }], correctLabel: "B", tags: ["vocabulary"] },
  { category: "verbal", difficulty: 2, stem: "Flock is to Birds as Pack is to:", options: [{ label: "A", text: "Cards" }, { label: "B", text: "Wolves" }, { label: "C", text: "Fish" }, { label: "D", text: "Bees" }], correctLabel: "B", tags: ["analogy"] },
  { category: "verbal", difficulty: 2, stem: "What is the opposite of 'affluent'?", options: [{ label: "A", text: "Wealthy" }, { label: "B", text: "Destitute" }, { label: "C", text: "Successful" }, { label: "D", text: "Famous" }], correctLabel: "B", tags: ["antonym"] },
  { category: "verbal", difficulty: 2, stem: "The manager's ___ leadership style fostered creativity and innovation among her team.", options: [{ label: "A", text: "authoritarian" }, { label: "B", text: "collaborative" }, { label: "C", text: "negligent" }, { label: "D", text: "rigid" }], correctLabel: "B", tags: ["sentence-completion"] },
  { category: "verbal", difficulty: 2, stem: "Pilot is to Cockpit as Judge is to:", options: [{ label: "A", text: "Prison" }, { label: "B", text: "Courtroom" }, { label: "C", text: "Law" }, { label: "D", text: "Gavel" }], correctLabel: "B", tags: ["analogy"] },
  { category: "verbal", difficulty: 2, stem: "Gregarious most nearly means:", options: [{ label: "A", text: "Solitary" }, { label: "B", text: "Aggressive" }, { label: "C", text: "Sociable" }, { label: "D", text: "Cautious" }], correctLabel: "C", tags: ["vocabulary"] },
  { category: "verbal", difficulty: 2, stem: "What is the opposite of 'conceal'?", options: [{ label: "A", text: "Hide" }, { label: "B", text: "Reveal" }, { label: "C", text: "Cover" }, { label: "D", text: "Protect" }], correctLabel: "B", tags: ["antonym"] },
  { category: "verbal", difficulty: 2, stem: "The witness gave a ___ account of the events, leaving out no details.", options: [{ label: "A", text: "vague" }, { label: "B", text: "thorough" }, { label: "C", text: "biased" }, { label: "D", text: "brief" }], correctLabel: "B", tags: ["sentence-completion"] },
  { category: "verbal", difficulty: 3, stem: "Obsequious most nearly means:", options: [{ label: "A", text: "Defiant" }, { label: "B", text: "Indifferent" }, { label: "C", text: "Fawning" }, { label: "D", text: "Honest" }], correctLabel: "C", tags: ["vocabulary"] },
  { category: "verbal", difficulty: 3, stem: "Catalyst is to Reaction as Spark is to:", options: [{ label: "A", text: "Electricity" }, { label: "B", text: "Fire" }, { label: "C", text: "Light" }, { label: "D", text: "Wire" }], correctLabel: "B", tags: ["analogy"] },
  { category: "verbal", difficulty: 3, stem: "The professor's ___ arguments, though difficult to follow, ultimately proved to be logically irrefutable.", options: [{ label: "A", text: "simplistic" }, { label: "B", text: "abstruse" }, { label: "C", text: "fallacious" }, { label: "D", text: "banal" }], correctLabel: "B", tags: ["sentence-completion"] },
  { category: "verbal", difficulty: 3, stem: "Laconic most nearly means:", options: [{ label: "A", text: "Verbose" }, { label: "B", text: "Concise" }, { label: "C", text: "Emotional" }, { label: "D", text: "Dull" }], correctLabel: "B", tags: ["vocabulary"] },
  { category: "verbal", difficulty: 2, stem: "Rudder is to Ship as Steering Wheel is to:", options: [{ label: "A", text: "Tire" }, { label: "B", text: "Car" }, { label: "C", text: "Driver" }, { label: "D", text: "Road" }], correctLabel: "B", tags: ["analogy"] },
  { category: "verbal", difficulty: 2, stem: "Pragmatic most nearly means:", options: [{ label: "A", text: "Idealistic" }, { label: "B", text: "Theoretical" }, { label: "C", text: "Practical" }, { label: "D", text: "Emotional" }], correctLabel: "C", tags: ["vocabulary"] },
  { category: "verbal", difficulty: 1, stem: "What is the opposite of 'simple'?", options: [{ label: "A", text: "Easy" }, { label: "B", text: "Complex" }, { label: "C", text: "Plain" }, { label: "D", text: "Basic" }], correctLabel: "B", tags: ["antonym"] },
  { category: "verbal", difficulty: 1, stem: "Ocean is to Water as Desert is to:", options: [{ label: "A", text: "Cactus" }, { label: "B", text: "Sand" }, { label: "C", text: "Heat" }, { label: "D", text: "Dry" }], correctLabel: "B", tags: ["analogy"] },
];

// ---------------------------------------------------------------------------
// MATH & LOGIC QUESTIONS (30)
// ---------------------------------------------------------------------------
const mathLogicQuestions: QuestionData[] = [
  // Easy (9)
  { category: "math_logic", difficulty: 1, stem: "What is the next number in the sequence: 2, 4, 6, 8, ___?", options: [{ label: "A", text: "9" }, { label: "B", text: "10" }, { label: "C", text: "12" }, { label: "D", text: "16" }], correctLabel: "B", tags: ["number-sequence"] },
  { category: "math_logic", difficulty: 1, stem: "If a shirt costs $20 and is on sale for 50% off, what is the sale price?", options: [{ label: "A", text: "$5" }, { label: "B", text: "$10" }, { label: "C", text: "$15" }, { label: "D", text: "$12" }], correctLabel: "B", tags: ["percentage"] },
  { category: "math_logic", difficulty: 1, stem: "All cats are animals. Whiskers is a cat. Therefore:", options: [{ label: "A", text: "Whiskers is a dog" }, { label: "B", text: "Whiskers is an animal" }, { label: "C", text: "All animals are cats" }, { label: "D", text: "Whiskers is not an animal" }], correctLabel: "B", tags: ["logical-deduction"] },
  { category: "math_logic", difficulty: 1, stem: "What is 144 / 12?", options: [{ label: "A", text: "10" }, { label: "B", text: "11" }, { label: "C", text: "12" }, { label: "D", text: "14" }], correctLabel: "C", tags: ["arithmetic"] },
  { category: "math_logic", difficulty: 1, stem: "A baker has 36 cookies and wants to divide them equally among 4 children. How many does each child get?", options: [{ label: "A", text: "7" }, { label: "B", text: "8" }, { label: "C", text: "9" }, { label: "D", text: "10" }], correctLabel: "C", tags: ["word-problem"] },
  { category: "math_logic", difficulty: 1, stem: "What is the next number: 5, 10, 15, 20, ___?", options: [{ label: "A", text: "22" }, { label: "B", text: "24" }, { label: "C", text: "25" }, { label: "D", text: "30" }], correctLabel: "C", tags: ["number-sequence"] },
  { category: "math_logic", difficulty: 1, stem: "If you buy 3 apples at $2 each, how much do you spend?", options: [{ label: "A", text: "$5" }, { label: "B", text: "$6" }, { label: "C", text: "$7" }, { label: "D", text: "$8" }], correctLabel: "B", tags: ["word-problem"] },
  { category: "math_logic", difficulty: 1, stem: "What is 7 × 8?", options: [{ label: "A", text: "54" }, { label: "B", text: "56" }, { label: "C", text: "58" }, { label: "D", text: "63" }], correctLabel: "B", tags: ["arithmetic"] },
  { category: "math_logic", difficulty: 1, stem: "A cashier processes 15 customers per hour. How many in 8 hours?", options: [{ label: "A", text: "60" }, { label: "B", text: "90" }, { label: "C", text: "120" }, { label: "D", text: "150" }], correctLabel: "C", tags: ["word-problem"] },
  // Medium (15)
  { category: "math_logic", difficulty: 2, stem: "What is the next number: 2, 6, 18, 54, ___?", options: [{ label: "A", text: "108" }, { label: "B", text: "162" }, { label: "C", text: "72" }, { label: "D", text: "216" }], correctLabel: "B", tags: ["number-sequence"] },
  { category: "math_logic", difficulty: 2, stem: "A store marks up products by 25%. If a product costs $80, what is the selling price?", options: [{ label: "A", text: "$90" }, { label: "B", text: "$95" }, { label: "C", text: "$100" }, { label: "D", text: "$105" }], correctLabel: "C", tags: ["percentage"] },
  { category: "math_logic", difficulty: 2, stem: "If all roses are flowers, and some flowers fade quickly, which must be true?", options: [{ label: "A", text: "All roses fade quickly" }, { label: "B", text: "Some roses may fade quickly" }, { label: "C", text: "No roses fade quickly" }, { label: "D", text: "All flowers are roses" }], correctLabel: "B", tags: ["logical-deduction"] },
  { category: "math_logic", difficulty: 2, stem: "A train travels 240 km in 3 hours. What is its average speed?", options: [{ label: "A", text: "60 km/h" }, { label: "B", text: "70 km/h" }, { label: "C", text: "80 km/h" }, { label: "D", text: "90 km/h" }], correctLabel: "C", tags: ["word-problem"] },
  { category: "math_logic", difficulty: 2, stem: "What is the next number: 1, 1, 2, 3, 5, 8, ___?", options: [{ label: "A", text: "11" }, { label: "B", text: "12" }, { label: "C", text: "13" }, { label: "D", text: "15" }], correctLabel: "C", tags: ["number-sequence"] },
  { category: "math_logic", difficulty: 2, stem: "The ratio of boys to girls is 3:5. If there are 24 students, how many girls?", options: [{ label: "A", text: "9" }, { label: "B", text: "12" }, { label: "C", text: "15" }, { label: "D", text: "18" }], correctLabel: "C", tags: ["ratio"] },
  { category: "math_logic", difficulty: 2, stem: "If 5 machines take 5 minutes to make 5 widgets, how long for 100 machines to make 100 widgets?", options: [{ label: "A", text: "1 minute" }, { label: "B", text: "5 minutes" }, { label: "C", text: "20 minutes" }, { label: "D", text: "100 minutes" }], correctLabel: "B", tags: ["logical-deduction"] },
  { category: "math_logic", difficulty: 2, stem: "A rectangle has perimeter 30 cm and width 5 cm. What is its length?", options: [{ label: "A", text: "8 cm" }, { label: "B", text: "10 cm" }, { label: "C", text: "12 cm" }, { label: "D", text: "15 cm" }], correctLabel: "B", tags: ["word-problem"] },
  { category: "math_logic", difficulty: 2, stem: "What is 15% of 200?", options: [{ label: "A", text: "15" }, { label: "B", text: "25" }, { label: "C", text: "30" }, { label: "D", text: "35" }], correctLabel: "C", tags: ["percentage"] },
  { category: "math_logic", difficulty: 2, stem: "What is the next number: 3, 7, 15, 31, ___?", options: [{ label: "A", text: "47" }, { label: "B", text: "55" }, { label: "C", text: "62" }, { label: "D", text: "63" }], correctLabel: "D", tags: ["number-sequence"] },
  { category: "math_logic", difficulty: 2, stem: "A jar has 3 red, 5 blue, and 2 green marbles. What is the probability of drawing blue?", options: [{ label: "A", text: "1/3" }, { label: "B", text: "1/2" }, { label: "C", text: "2/5" }, { label: "D", text: "3/10" }], correctLabel: "B", tags: ["ratio"] },
  { category: "math_logic", difficulty: 2, stem: "Neither Alice nor Bob is tallest. Charlie is taller than Diana, Diana taller than Alice. Who could be tallest?", options: [{ label: "A", text: "Alice" }, { label: "B", text: "Bob" }, { label: "C", text: "Charlie" }, { label: "D", text: "Diana" }], correctLabel: "C", tags: ["logical-deduction"] },
  { category: "math_logic", difficulty: 2, stem: "A car depreciates 20% yearly. Worth $25,000 new, what is it worth after 1 year?", options: [{ label: "A", text: "$5,000" }, { label: "B", text: "$15,000" }, { label: "C", text: "$20,000" }, { label: "D", text: "$22,500" }], correctLabel: "C", tags: ["percentage"] },
  { category: "math_logic", difficulty: 2, stem: "What is the next number: 1, 4, 9, 16, 25, ___?", options: [{ label: "A", text: "30" }, { label: "B", text: "34" }, { label: "C", text: "36" }, { label: "D", text: "49" }], correctLabel: "C", tags: ["number-sequence"] },
  { category: "math_logic", difficulty: 2, stem: "A pool fills in 4 hours and drains in 6 hours. If both run, how long to fill?", options: [{ label: "A", text: "8 hours" }, { label: "B", text: "10 hours" }, { label: "C", text: "12 hours" }, { label: "D", text: "24 hours" }], correctLabel: "C", tags: ["word-problem"] },
  // Hard (6)
  { category: "math_logic", difficulty: 3, stem: "A clock loses 15 minutes every hour. Set at noon, what time does it show at 4:00 PM?", options: [{ label: "A", text: "3:00 PM" }, { label: "B", text: "3:15 PM" }, { label: "C", text: "2:45 PM" }, { label: "D", text: "3:30 PM" }], correctLabel: "A", tags: ["word-problem"] },
  { category: "math_logic", difficulty: 3, stem: "What is the next number: 1, 3, 7, 15, 31, ___?", options: [{ label: "A", text: "55" }, { label: "B", text: "62" }, { label: "C", text: "63" }, { label: "D", text: "64" }], correctLabel: "C", tags: ["number-sequence"] },
  { category: "math_logic", difficulty: 3, stem: "In a room of 30 people, everyone shakes hands with everyone else once. How many handshakes?", options: [{ label: "A", text: "435" }, { label: "B", text: "870" }, { label: "C", text: "450" }, { label: "D", text: "900" }], correctLabel: "A", tags: ["word-problem"] },
  { category: "math_logic", difficulty: 3, stem: "A tank fills by pipe A in 6 hours and pipe B in 8 hours. Both together, how long to fill?", options: [{ label: "A", text: "3 hours 26 min" }, { label: "B", text: "3 hours 30 min" }, { label: "C", text: "7 hours" }, { label: "D", text: "4 hours" }], correctLabel: "A", tags: ["word-problem"] },
  { category: "math_logic", difficulty: 3, stem: "If the day after tomorrow is two days before Thursday, what day is today?", options: [{ label: "A", text: "Sunday" }, { label: "B", text: "Monday" }, { label: "C", text: "Tuesday" }, { label: "D", text: "Saturday" }], correctLabel: "A", tags: ["logical-deduction"] },
  { category: "math_logic", difficulty: 3, stem: "A company's profit increased by 20% in year 1, then decreased by 20% in year 2. Compared to the original, the profit is:", options: [{ label: "A", text: "The same" }, { label: "B", text: "4% lower" }, { label: "C", text: "4% higher" }, { label: "D", text: "2% lower" }], correctLabel: "B", tags: ["percentage"] },
  // --- Additional Math & Logic (20 more) ---
  { category: "math_logic", difficulty: 1, stem: "What is 25% of 80?", options: [{ label: "A", text: "15" }, { label: "B", text: "20" }, { label: "C", text: "25" }, { label: "D", text: "30" }], correctLabel: "B", tags: ["percentage"] },
  { category: "math_logic", difficulty: 1, stem: "What is the next number: 3, 6, 9, 12, ___?", options: [{ label: "A", text: "14" }, { label: "B", text: "15" }, { label: "C", text: "16" }, { label: "D", text: "18" }], correctLabel: "B", tags: ["number-sequence"] },
  { category: "math_logic", difficulty: 1, stem: "A box has 48 items. If you remove half, how many remain?", options: [{ label: "A", text: "12" }, { label: "B", text: "20" }, { label: "C", text: "24" }, { label: "D", text: "36" }], correctLabel: "C", tags: ["word-problem"] },
  { category: "math_logic", difficulty: 1, stem: "All dogs have tails. Rex is a dog. Therefore:", options: [{ label: "A", text: "Rex has four legs" }, { label: "B", text: "Rex has a tail" }, { label: "C", text: "All tails belong to dogs" }, { label: "D", text: "Rex is a puppy" }], correctLabel: "B", tags: ["logical-deduction"] },
  { category: "math_logic", difficulty: 2, stem: "What is the next number: 100, 81, 64, 49, ___?", options: [{ label: "A", text: "25" }, { label: "B", text: "36" }, { label: "C", text: "32" }, { label: "D", text: "40" }], correctLabel: "B", tags: ["number-sequence"] },
  { category: "math_logic", difficulty: 2, stem: "A jacket originally costs $120. After a 30% discount, what is the price?", options: [{ label: "A", text: "$84" }, { label: "B", text: "$86" }, { label: "C", text: "$90" }, { label: "D", text: "$96" }], correctLabel: "A", tags: ["percentage"] },
  { category: "math_logic", difficulty: 2, stem: "If it takes 6 workers 4 days to build a wall, how long for 12 workers?", options: [{ label: "A", text: "1 day" }, { label: "B", text: "2 days" }, { label: "C", text: "3 days" }, { label: "D", text: "8 days" }], correctLabel: "B", tags: ["word-problem"] },
  { category: "math_logic", difficulty: 2, stem: "Tom is older than Sue. Sue is older than Mike. Who is youngest?", options: [{ label: "A", text: "Tom" }, { label: "B", text: "Sue" }, { label: "C", text: "Mike" }, { label: "D", text: "Cannot determine" }], correctLabel: "C", tags: ["logical-deduction"] },
  { category: "math_logic", difficulty: 2, stem: "What is the next number: 2, 3, 5, 7, 11, ___?", options: [{ label: "A", text: "12" }, { label: "B", text: "13" }, { label: "C", text: "14" }, { label: "D", text: "15" }], correctLabel: "B", tags: ["number-sequence"] },
  { category: "math_logic", difficulty: 2, stem: "A recipe calls for 2 cups of flour for 12 cookies. How much for 30 cookies?", options: [{ label: "A", text: "4 cups" }, { label: "B", text: "5 cups" }, { label: "C", text: "6 cups" }, { label: "D", text: "3 cups" }], correctLabel: "B", tags: ["ratio"] },
  { category: "math_logic", difficulty: 2, stem: "If no athletes are lazy and some students are lazy, which must be true?", options: [{ label: "A", text: "No students are athletes" }, { label: "B", text: "Some students are not athletes" }, { label: "C", text: "All athletes are students" }, { label: "D", text: "Some athletes are lazy" }], correctLabel: "B", tags: ["logical-deduction"] },
  { category: "math_logic", difficulty: 2, stem: "A circular track is 400m. A runner does 3.5 laps. How far did they run?", options: [{ label: "A", text: "1200m" }, { label: "B", text: "1400m" }, { label: "C", text: "1600m" }, { label: "D", text: "1000m" }], correctLabel: "B", tags: ["word-problem"] },
  { category: "math_logic", difficulty: 3, stem: "What is the next number: 1, 2, 6, 24, 120, ___?", options: [{ label: "A", text: "240" }, { label: "B", text: "480" }, { label: "C", text: "600" }, { label: "D", text: "720" }], correctLabel: "D", tags: ["number-sequence"] },
  { category: "math_logic", difficulty: 3, stem: "A snail climbs 3m during the day and slides back 2m at night. How many days to reach the top of a 10m wall?", options: [{ label: "A", text: "7" }, { label: "B", text: "8" }, { label: "C", text: "9" }, { label: "D", text: "10" }], correctLabel: "B", tags: ["logical-deduction"] },
  { category: "math_logic", difficulty: 3, stem: "Three people can paint a house in 6 hours. How long for two people at the same rate?", options: [{ label: "A", text: "8 hours" }, { label: "B", text: "9 hours" }, { label: "C", text: "10 hours" }, { label: "D", text: "12 hours" }], correctLabel: "B", tags: ["word-problem"] },
  { category: "math_logic", difficulty: 3, stem: "If you flip a coin 3 times, what is the probability of getting exactly 2 heads?", options: [{ label: "A", text: "1/4" }, { label: "B", text: "3/8" }, { label: "C", text: "1/2" }, { label: "D", text: "1/8" }], correctLabel: "B", tags: ["ratio"] },
  { category: "math_logic", difficulty: 2, stem: "What is the next number: 0, 1, 3, 6, 10, ___?", options: [{ label: "A", text: "13" }, { label: "B", text: "14" }, { label: "C", text: "15" }, { label: "D", text: "16" }], correctLabel: "C", tags: ["number-sequence"] },
  { category: "math_logic", difficulty: 2, stem: "A map scale is 1:50,000. If two cities are 4cm apart on the map, what is the real distance?", options: [{ label: "A", text: "2 km" }, { label: "B", text: "20 km" }, { label: "C", text: "200 km" }, { label: "D", text: "0.2 km" }], correctLabel: "A", tags: ["ratio"] },
  { category: "math_logic", difficulty: 1, stem: "What is 15 + 27?", options: [{ label: "A", text: "32" }, { label: "B", text: "42" }, { label: "C", text: "40" }, { label: "D", text: "52" }], correctLabel: "B", tags: ["arithmetic"] },
  { category: "math_logic", difficulty: 1, stem: "A dozen eggs is 12. How many eggs in 5 dozen?", options: [{ label: "A", text: "48" }, { label: "B", text: "55" }, { label: "C", text: "60" }, { label: "D", text: "72" }], correctLabel: "C", tags: ["word-problem"] },
];

// ---------------------------------------------------------------------------
// SPATIAL REASONING QUESTIONS (30) — imported from separate file with SVG visuals
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
