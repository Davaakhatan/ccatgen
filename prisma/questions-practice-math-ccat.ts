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

export const practiceMathCcatQuestions: QuestionData[] = [
  {
    category: "math_logic", difficulty: 2,
    stem: "The price of a speaker was $120. During its first week in January, its price rose by 20%, then a week later rose again by another $24. What is the total percentage increase in price for this speaker?",
    options: [{ label: "A", text: "50%" }, { label: "B", text: "40%" }, { label: "C", text: "35%" }, { label: "D", text: "45%" }, { label: "E", text: "25%" }],
    correctLabel: "B",
    tags: ["word-problem", "percentage", original, solution("20% of 120 is 24, so the price becomes 144. Another 24 makes 168. Increase is 168 - 120 = 48, and 48 / 120 = 40%.")],
  },
  {
    category: "math_logic", difficulty: 2,
    stem: "A recipe for making 18 cookies requires 3/4 cup of sugar. How much sugar is needed to make two dozen cookies using the same recipe?",
    options: [{ label: "A", text: "2/3 cup" }, { label: "B", text: "3/8 cup" }, { label: "C", text: "1 cup" }, { label: "D", text: "1 1/3 cups" }, { label: "E", text: "1 1/2 cups" }],
    correctLabel: "C",
    tags: ["word-problem", "ratio", original, solution("Two dozen is 24 cookies. 24 / 18 = 4/3. Sugar needed is 3/4 x 4/3 = 1 cup.")],
  },
  {
    category: "math_logic", difficulty: 2,
    stem: "Choose which of the following expressions represents the highest value.",
    options: [{ label: "A", text: "14/49" }, { label: "B", text: "15/50" }, { label: "C", text: "17/51" }, { label: "D", text: "16/64" }, { label: "E", text: "12/6" }],
    correctLabel: "E",
    tags: ["number-comparison", "ratio", original, solution("12/6 = 2. The other fractions are all less than 1, so 12/6 is the highest value.")],
  },
  {
    category: "math_logic", difficulty: 2,
    stem: "What is the next number in the series? 45, 15, 30, 30, 10, 20",
    options: [{ label: "A", text: "1" }, { label: "B", text: "10" }, { label: "C", text: "20" }, { label: "D", text: "40" }, { label: "E", text: "5" }],
    correctLabel: "C",
    tags: ["number-series", "number-sequence", original, solution("The pattern runs in groups: start, divide by 3, then double. 45 -> 15 -> 30, then 30 -> 10 -> 20. The next group starts at 20.")],
  },
  {
    category: "math_logic", difficulty: 2,
    stem: "A plumber has 6,000 toilets. He is about to install 20% of the toilets over the next 4 days. If he plans to divide his work evenly, how many toilets will he install each of the 4 days?",
    options: [{ label: "A", text: "300" }, { label: "B", text: "400" }, { label: "C", text: "500" }, { label: "D", text: "550" }, { label: "E", text: "350" }],
    correctLabel: "A",
    tags: ["word-problem", "percentage", original, solution("20% of 6,000 is 1,200. Spread evenly over 4 days: 1,200 / 4 = 300 per day.")],
  },
  {
    category: "math_logic", difficulty: 3,
    stem: "A clock showed the time accurately on Wednesday at 4:00 p.m. On the following Saturday at 2:00 p.m., the clock was running late by 35 seconds. On average, how many seconds did the clock lose each 30 minutes?",
    options: [{ label: "A", text: "1" }, { label: "B", text: "1/3" }, { label: "C", text: "1/2" }, { label: "D", text: "1/4" }, { label: "E", text: "1/8" }],
    correctLabel: "D",
    tags: ["word-problem", "rate", original, solution("Wednesday 4 p.m. to Saturday 2 p.m. is 70 hours. There are 140 half-hours. 35 seconds / 140 = 1/4 second per 30 minutes.")],
  },
  {
    category: "math_logic", difficulty: 2,
    stem: "A swimming pool has a capacity of 4,200 gallons and is 1/4 full of water. How many hours will it take a pipe supplying water at a rate of 10 gallons per minute to finish filling the pool?",
    options: [{ label: "A", text: "3.5" }, { label: "B", text: "4.25" }, { label: "C", text: "4.5" }, { label: "D", text: "5" }, { label: "E", text: "5.25" }],
    correctLabel: "E",
    tags: ["word-problem", "rate", original, solution("The pool needs 3/4 of 4,200 = 3,150 gallons. At 10 gallons per minute, time is 315 minutes, which is 5.25 hours.")],
  },
  {
    category: "math_logic", difficulty: 2,
    stem: "What is the next number in the series? 1, 3, 7, 13, 21",
    options: [{ label: "A", text: "31" }, { label: "B", text: "33" }, { label: "C", text: "35" }, { label: "D", text: "37" }, { label: "E", text: "39" }],
    correctLabel: "A",
    tags: ["number-series", "number-sequence", original, solution("The differences are +2, +4, +6, +8. The next difference is +10, so 21 + 10 = 31.")],
  },
  {
    category: "math_logic", difficulty: 2,
    stem: "A data scientist uses 1.25 MB of storage for one operation. If she performs 140 such operations per month, how many megabytes of storage will she need every month?",
    options: [{ label: "A", text: "168" }, { label: "B", text: "170" }, { label: "C", text: "174" }, { label: "D", text: "175" }, { label: "E", text: "181" }],
    correctLabel: "D",
    tags: ["word-problem", "rate", original, solution("1.25 MB is 5/4 MB. 140 x 5/4 = 35 x 5 = 175 MB.")],
  },
  {
    category: "math_logic", difficulty: 3,
    stem: "A plumber can complete a repair in 2.5 hours. His colleague takes 3 hours to complete the repair. If both of them work at those rates for 45 hours in one week, how many repairs will they complete?",
    options: [{ label: "A", text: "32" }, { label: "B", text: "33" }, { label: "C", text: "35" }, { label: "D", text: "37" }, { label: "E", text: "39" }],
    correctLabel: "B",
    tags: ["word-problem", "rate", original, solution("Rates: 1/2.5 = 0.4 repair/hour and 1/3 repair/hour. Together they do 0.733... repairs/hour. In 45 hours: 45 x (0.4 + 1/3) = 18 + 15 = 33 repairs.")],
  },
  {
    category: "math_logic", difficulty: 2,
    stem: "A group of four numbers has an average of 27. The first three numbers are 7, 29, and 35. What is the fourth number?",
    options: [{ label: "A", text: "31" }, { label: "B", text: "33" }, { label: "C", text: "35" }, { label: "D", text: "37" }, { label: "E", text: "39" }],
    correctLabel: "D",
    tags: ["word-problem", "average", original, solution("Total needed is 27 x 4 = 108. Known sum is 7 + 29 + 35 = 71. Missing number is 108 - 71 = 37.")],
  },
  {
    category: "math_logic", difficulty: 2,
    stem: "A new car is purchased for $24,000. The value of the car depreciates by 20% in the first year and 15% in the next. What is the value of the car after 2 years?",
    options: [{ label: "A", text: "$16,300" }, { label: "B", text: "$16,320" }, { label: "C", text: "$16,340" }, { label: "D", text: "$16,360" }, { label: "E", text: "$16,380" }],
    correctLabel: "B",
    tags: ["word-problem", "percentage", original, solution("After 20% depreciation: 24,000 x 0.80 = 19,200. After another 15% depreciation: 19,200 x 0.85 = 16,320.")],
  },
  {
    category: "math_logic", difficulty: 2,
    stem: "An analyst determines that there is a 20% chance that a flight will be delayed. If someone takes a round trip of two flights, what are the chances that neither flight will be delayed?",
    options: [{ label: "A", text: "56%" }, { label: "B", text: "60%" }, { label: "C", text: "64%" }, { label: "D", text: "70%" }, { label: "E", text: "80%" }],
    correctLabel: "C",
    tags: ["word-problem", "probability", original, solution("Not delayed is 80% for each flight. For two independent flights: 0.80 x 0.80 = 0.64 = 64%.")],
  },
  {
    category: "math_logic", difficulty: 2,
    stem: "If a person earns $20 per hour, how much will they earn in 8 hours?",
    options: [{ label: "A", text: "$160" }, { label: "B", text: "$2.50" }, { label: "C", text: "$140" }, { label: "D", text: "$196" }, { label: "E", text: "$180" }],
    correctLabel: "A",
    tags: ["word-problem", "rate", original, solution("$20 per hour for 8 hours is 20 x 8 = 160.")],
  },
  {
    category: "math_logic", difficulty: 2,
    stem: "In a party of 5 people, everyone shakes hands with each other once. How many handshakes occurred?",
    options: [{ label: "A", text: "16" }, { label: "B", text: "10" }, { label: "C", text: "12" }, { label: "D", text: "8" }, { label: "E", text: "14" }],
    correctLabel: "B",
    tags: ["word-problem", "combinations", original, solution("Each handshake is a pair of people. 5 choose 2 = 5 x 4 / 2 = 10.")],
  },
  {
    category: "math_logic", difficulty: 2,
    stem: "What is the next number in the sequence? 3, 6, 11, 18, ...",
    options: [{ label: "A", text: "25" }, { label: "B", text: "26" }, { label: "C", text: "27" }, { label: "D", text: "24" }, { label: "E", text: "28" }],
    correctLabel: "C",
    tags: ["number-series", "number-sequence", original, solution("The differences are +3, +5, +7. The next difference is +9, so 18 + 9 = 27.")],
  },
  {
    category: "math_logic", difficulty: 2,
    stem: "A train leaves the station at 10:00 a.m. and travels at 60 mph. At what time will it reach the next station, 80 miles away?",
    options: [{ label: "A", text: "11:20 a.m." }, { label: "B", text: "10:40 a.m." }, { label: "C", text: "11:00 a.m." }, { label: "D", text: "11:40 a.m." }, { label: "E", text: "12:00 p.m." }],
    correctLabel: "A",
    tags: ["word-problem", "rate", original, solution("Time = distance / speed = 80 / 60 = 4/3 hours = 1 hour 20 minutes. 10:00 a.m. + 1:20 = 11:20 a.m.")],
  },
  {
    category: "math_logic", difficulty: 2,
    stem: "In a group of seven people, three have blonde hair, two have brown hair, and two have black hair. What fraction of the group has blonde hair?",
    options: [{ label: "A", text: "0.517" }, { label: "B", text: "0.428" }, { label: "C", text: "0.524" }, { label: "D", text: "0.482" }, { label: "E", text: "0.375" }],
    correctLabel: "B",
    tags: ["word-problem", "ratio", original, solution("Blonde-haired people are 3 out of 7. 3 / 7 = 0.428571..., so the closest option is 0.428.")],
  },
  {
    category: "math_logic", difficulty: 2,
    stem: "A train leaves the station at 9:00 a.m. and travels at a speed of 70 mph. At what time will it reach the next station, 140 miles away?",
    options: [{ label: "A", text: "11:00 a.m." }, { label: "B", text: "12:00 p.m." }, { label: "C", text: "1:00 p.m." }, { label: "D", text: "2:00 p.m." }, { label: "E", text: "10:30 a.m." }],
    correctLabel: "A",
    tags: ["word-problem", "rate", original, solution("Time = 140 / 70 = 2 hours. 9:00 a.m. + 2 hours = 11:00 a.m.")],
  },
  {
    category: "math_logic", difficulty: 2,
    stem: "If a factory produces 16 meeples per hour, how many meeples can it produce in 6 hours?",
    options: [{ label: "A", text: "94" }, { label: "B", text: "96" }, { label: "C", text: "98" }, { label: "D", text: "92" }, { label: "E", text: "80" }],
    correctLabel: "B",
    tags: ["word-problem", "rate", original, solution("16 meeples per hour for 6 hours gives 16 x 6 = 96.")],
  },
  {
    category: "math_logic", difficulty: 2,
    stem: "A store sells 385 lamps in June. If it sells 200 more the next month, how many lamps did it sell in July?",
    options: [{ label: "A", text: "485" }, { label: "B", text: "525" }, { label: "C", text: "585" }, { label: "D", text: "625" }, { label: "E", text: "685" }],
    correctLabel: "C",
    tags: ["word-problem", "arithmetic", original, solution("July sales are 200 more than June: 385 + 200 = 585.")],
  },
  {
    category: "verbal", difficulty: 2,
    stem: "Terrify is to frighten as:",
    options: [{ label: "A", text: "Demand is to request" }, { label: "B", text: "Explore is to ignore" }, { label: "C", text: "Brag is to scold" }, { label: "D", text: "Predator is to prey" }, { label: "E", text: "Chase is to capture" }],
    correctLabel: "A",
    tags: ["analogy", original, solution("Terrify and frighten are near-synonyms, with terrify being stronger. Demand and request have the same stronger/weaker action relationship.")],
  },
  {
    category: "math_logic", difficulty: 2,
    stem: "A store has a sale where all jackets are sold at a discount of 40%. If the regular price of a jacket is $75, how many jackets can be bought at sale price if the shopper spent $495?",
    options: [{ label: "A", text: "11" }, { label: "B", text: "12" }, { label: "C", text: "13" }, { label: "D", text: "14" }, { label: "E", text: "15" }],
    correctLabel: "A",
    tags: ["word-problem", "percentage", original, solution("A 40% discount means the sale price is 60% of 75, which is 45. 495 / 45 = 11 jackets.")],
  },
  {
    category: "math_logic", difficulty: 2,
    stem: "36 is 15% of what number?",
    options: [{ label: "A", text: "220" }, { label: "B", text: "225" }, { label: "C", text: "235" }, { label: "D", text: "240" }, { label: "E", text: "250" }],
    correctLabel: "D",
    tags: ["word-problem", "percentage", original, solution("Translate directly: 0.15 x number = 36. Number = 36 / 0.15 = 240.")],
  },
  {
    category: "math_logic", difficulty: 2,
    stem: "By what percentage did the price increase between 1990 and 2010? In 1990 the price was $1.25, and in 2010 the price was $1.75.",
    options: [{ label: "A", text: "20%" }, { label: "B", text: "25%" }, { label: "C", text: "40%" }, { label: "D", text: "50%" }, { label: "E", text: "75%" }],
    correctLabel: "C",
    tags: ["data-interpretation", "graph-interpretation", "percentage", original, solution("Increase is 1.75 - 1.25 = 0.50. Divide by the 1990 value: 0.50 / 1.25 = 0.40 = 40%.")],
  },
  {
    category: "math_logic", difficulty: 2,
    stem: "Assumptions: Some writers do not own a car. No gardeners are writers. Conclusion: Some gardeners do not own a car. If the assumptions are true, is the conclusion correct, incorrect, or cannot be determined?",
    options: [{ label: "A", text: "Correct" }, { label: "B", text: "Cannot be determined based on the information available" }, { label: "C", text: "Incorrect" }],
    correctLabel: "B",
    tags: ["true-false-uncertain", "syllogism", original, solution("The facts tell us about some writers and all gardeners not being writers. They do not tell us whether any gardeners own cars, so the conclusion cannot be determined.")],
  },
];
