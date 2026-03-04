import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DIRECT_DATABASE_URL });
const adapter = new PrismaPg(pool);
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
];

// ---------------------------------------------------------------------------
// SPATIAL REASONING QUESTIONS (30)
// ---------------------------------------------------------------------------
const spatialQuestions: QuestionData[] = [
  // Easy (9)
  { category: "spatial", difficulty: 1, stem: "What comes next in the pattern? □ ■ □ ■ □ ___", options: [{ label: "A", text: "□" }, { label: "B", text: "■" }, { label: "C", text: "△" }, { label: "D", text: "○" }], correctLabel: "B", tags: ["pattern-continuation"] },
  { category: "spatial", difficulty: 1, stem: "If you rotate the letter 'b' 180 degrees, which letter does it resemble?", options: [{ label: "A", text: "d" }, { label: "B", text: "p" }, { label: "C", text: "q" }, { label: "D", text: "g" }], correctLabel: "C", tags: ["rotation"] },
  { category: "spatial", difficulty: 1, stem: "How many sides does a hexagon have?", options: [{ label: "A", text: "5" }, { label: "B", text: "6" }, { label: "C", text: "7" }, { label: "D", text: "8" }], correctLabel: "B", tags: ["shape-knowledge"] },
  { category: "spatial", difficulty: 1, stem: "What comes next? △ △ ○ △ △ ○ △ △ ___", options: [{ label: "A", text: "△" }, { label: "B", text: "○" }, { label: "C", text: "□" }, { label: "D", text: "■" }], correctLabel: "B", tags: ["pattern-continuation"] },
  { category: "spatial", difficulty: 1, stem: "If you look at 'd' in a mirror, which letter does it resemble?", options: [{ label: "A", text: "b" }, { label: "B", text: "p" }, { label: "C", text: "q" }, { label: "D", text: "a" }], correctLabel: "A", tags: ["mirror"] },
  { category: "spatial", difficulty: 1, stem: "What comes next? ↑ → ↓ ← ↑ → ↓ ___", options: [{ label: "A", text: "↑" }, { label: "B", text: "→" }, { label: "C", text: "↓" }, { label: "D", text: "←" }], correctLabel: "D", tags: ["pattern-continuation"] },
  { category: "spatial", difficulty: 1, stem: "If you fold a square piece of paper in half diagonally, what shape do you get?", options: [{ label: "A", text: "Rectangle" }, { label: "B", text: "Triangle" }, { label: "C", text: "Pentagon" }, { label: "D", text: "Trapezoid" }], correctLabel: "B", tags: ["spatial-manipulation"] },
  { category: "spatial", difficulty: 1, stem: "Which shape has all sides equal and all angles equal to 90°?", options: [{ label: "A", text: "Rectangle" }, { label: "B", text: "Rhombus" }, { label: "C", text: "Square" }, { label: "D", text: "Parallelogram" }], correctLabel: "C", tags: ["shape-knowledge"] },
  { category: "spatial", difficulty: 1, stem: "How many triangles are in a Star of David (hexagram)?", options: [{ label: "A", text: "2" }, { label: "B", text: "6" }, { label: "C", text: "8" }, { label: "D", text: "12" }], correctLabel: "C", tags: ["shape-counting"] },
  // Medium (15)
  { category: "spatial", difficulty: 2, stem: "In a 3×3 grid, top row: ○ ○ △. Middle row: ○ △ △. What should the bottom-left cell be?", options: [{ label: "A", text: "○" }, { label: "B", text: "△" }, { label: "C", text: "□" }, { label: "D", text: "■" }], correctLabel: "B", tags: ["matrix-pattern"] },
  { category: "spatial", difficulty: 2, stem: "A cube has 6 faces, 12 edges. How many vertices does it have?", options: [{ label: "A", text: "4" }, { label: "B", text: "6" }, { label: "C", text: "8" }, { label: "D", text: "10" }], correctLabel: "C", tags: ["shape-knowledge"] },
  { category: "spatial", difficulty: 2, stem: "If you rotate the letter 'N' 90° clockwise, which letter does it resemble?", options: [{ label: "A", text: "Z" }, { label: "B", text: "M" }, { label: "C", text: "U" }, { label: "D", text: "S" }], correctLabel: "A", tags: ["rotation"] },
  { category: "spatial", difficulty: 2, stem: "What comes next? ● ●● ●●● ●●●● ___", options: [{ label: "A", text: "●●●" }, { label: "B", text: "●●●●●" }, { label: "C", text: "●●●●●●" }, { label: "D", text: "●●" }], correctLabel: "B", tags: ["pattern-continuation"] },
  { category: "spatial", difficulty: 2, stem: "A cross-shaped net (center square + 4 sides) folds into which 3D shape?", options: [{ label: "A", text: "Open-top cube (5 faces)" }, { label: "B", text: "Complete cube" }, { label: "C", text: "Triangular prism" }, { label: "D", text: "Pyramid" }], correctLabel: "A", tags: ["spatial-manipulation"] },
  { category: "spatial", difficulty: 2, stem: "Triangle (3), Square (4), Pentagon (5). What comes next?", options: [{ label: "A", text: "Circle" }, { label: "B", text: "Hexagon (6)" }, { label: "C", text: "Octagon (8)" }, { label: "D", text: "Star" }], correctLabel: "B", tags: ["pattern-continuation"] },
  { category: "spatial", difficulty: 2, stem: "How many rectangles (including squares) are in a 2×3 grid?", options: [{ label: "A", text: "12" }, { label: "B", text: "15" }, { label: "C", text: "18" }, { label: "D", text: "21" }], correctLabel: "C", tags: ["shape-counting"] },
  { category: "spatial", difficulty: 2, stem: "Row 1: ★☆☆, Row 2: ☆★☆, Row 3: ___. Where does ★ appear in Row 3?", options: [{ label: "A", text: "First position" }, { label: "B", text: "Third position" }, { label: "C", text: "Second position" }, { label: "D", text: "First and second" }], correctLabel: "B", tags: ["matrix-pattern"] },
  { category: "spatial", difficulty: 2, stem: "If a shape is reflected across a vertical axis, which property changes?", options: [{ label: "A", text: "Area" }, { label: "B", text: "Left-right orientation" }, { label: "C", text: "Number of sides" }, { label: "D", text: "Perimeter" }], correctLabel: "B", tags: ["mirror"] },
  { category: "spatial", difficulty: 2, stem: "A pyramid with a square base has how many faces total?", options: [{ label: "A", text: "4" }, { label: "B", text: "5" }, { label: "C", text: "6" }, { label: "D", text: "8" }], correctLabel: "B", tags: ["shape-knowledge"] },
  { category: "spatial", difficulty: 2, stem: "What comes next? □ □△ □△○ □△○☆ ___", options: [{ label: "A", text: "□△○☆■" }, { label: "B", text: "□△○" }, { label: "C", text: "□□△" }, { label: "D", text: "☆○△□" }], correctLabel: "A", tags: ["pattern-continuation"] },
  { category: "spatial", difficulty: 2, stem: "If you rotate → by 270° clockwise, which direction does it point?", options: [{ label: "A", text: "Up ↑" }, { label: "B", text: "Down ↓" }, { label: "C", text: "Left ←" }, { label: "D", text: "Right →" }], correctLabel: "B", tags: ["rotation"] },
  { category: "spatial", difficulty: 2, stem: "In a 3×3 grid, diagonal from top-left to bottom-right is ■. All others are □. How many ■ cells?", options: [{ label: "A", text: "2" }, { label: "B", text: "3" }, { label: "C", text: "4" }, { label: "D", text: "5" }], correctLabel: "B", tags: ["matrix-pattern"] },
  { category: "spatial", difficulty: 2, stem: "Mirror the word 'TOT' along its right side. What does it look like?", options: [{ label: "A", text: "TOT" }, { label: "B", text: "TOD" }, { label: "C", text: "DOT" }, { label: "D", text: "OTO" }], correctLabel: "A", tags: ["mirror"] },
  { category: "spatial", difficulty: 2, stem: "A regular octagon has how many lines of symmetry?", options: [{ label: "A", text: "4" }, { label: "B", text: "6" }, { label: "C", text: "8" }, { label: "D", text: "10" }], correctLabel: "C", tags: ["shape-knowledge"] },
  // Hard (6)
  { category: "spatial", difficulty: 3, stem: "3×3 matrix: Row 1 shapes increase sides (△,□,⬠). Row 2 same but filled. Row 3 same but dotted. What is Row 3, Column 2?", options: [{ label: "A", text: "Dotted triangle" }, { label: "B", text: "Dotted square" }, { label: "C", text: "Dotted pentagon" }, { label: "D", text: "Dotted circle" }], correctLabel: "B", tags: ["matrix-pattern"] },
  { category: "spatial", difficulty: 3, stem: "A die has opposite faces summing to 7. Top shows 3, front shows 2. What is on the bottom?", options: [{ label: "A", text: "1" }, { label: "B", text: "4" }, { label: "C", text: "5" }, { label: "D", text: "6" }], correctLabel: "B", tags: ["spatial-manipulation"] },
  { category: "spatial", difficulty: 3, stem: "Alternate transformations: rotate 90° CW then reflect horizontally. Starting with 'L' pointing up-right, after both transforms the shape is:", options: [{ label: "A", text: "Same as original" }, { label: "B", text: "Down-right" }, { label: "C", text: "Down-left" }, { label: "D", text: "Up-left" }], correctLabel: "A", tags: ["rotation", "mirror"] },
  { category: "spatial", difficulty: 3, stem: "How many unit cubes are needed for a 3×3×3 cube with the entire center column removed?", options: [{ label: "A", text: "24" }, { label: "B", text: "25" }, { label: "C", text: "26" }, { label: "D", text: "23" }], correctLabel: "A", tags: ["shape-counting"] },
  { category: "spatial", difficulty: 3, stem: "4×4 grid rule: each row and column has one ★ and one ▲. Row 1: ★ col1, ▲ col3. Row 2: ★ col3, ▲ col4. Row 3: ▲ col1. Where must ★ be in Row 3?", options: [{ label: "A", text: "Column 2" }, { label: "B", text: "Column 3" }, { label: "C", text: "Column 4" }, { label: "D", text: "Column 1" }], correctLabel: "C", tags: ["matrix-pattern"] },
  { category: "spatial", difficulty: 3, stem: "A plus/cross shape (5 unit squares) is rotated 45°. What is the approximate width of the bounding box?", options: [{ label: "A", text: "3 units" }, { label: "B", text: "3√2 ≈ 4.24 units" }, { label: "C", text: "5 units" }, { label: "D", text: "2√2 ≈ 2.83 units" }], correctLabel: "B", tags: ["rotation", "spatial-manipulation"] },
];

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
