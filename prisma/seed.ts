import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import { ccatStemKey, isCcatStyleQuestion, type CcatQuestionLike } from "../src/lib/ccat-question-policy";

// Required for Node.js — Neon serverless driver needs WebSocket
neonConfig.webSocketConstructor = ws;

const adapter = new PrismaNeon({ connectionString: process.env.DIRECT_DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

type SeedQuestion = CcatQuestionLike & {
  difficulty: number;
  correctLabel: string;
};

function normalizeCcatQuestion(q: SeedQuestion): SeedQuestion {
  if (q.tags.includes("true-false-uncertain")) {
    return { ...q, category: "math_logic" };
  }

  return q;
}

function dedupeByStem(questions: SeedQuestion[]) {
  const seen = new Set<string>();
  const unique: SeedQuestion[] = [];

  for (const q of questions) {
    const key = ccatStemKey(q);
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(q);
  }

  return unique;
}

// Import question banks
import { verbalQuestions } from "./questions-verbal";
import { mathLogicQuestions } from "./questions-math";
import { spatialQuestions } from "./spatial-questions";
import { spatialQuestionsExtra } from "./questions-spatial-extra";
import { verbalQuestions2 } from "./questions-verbal-2";
import { mathLogicQuestions2 } from "./questions-math-2";
import { spatialQuestions2 } from "./questions-spatial-2";
import { additionalQuestions } from "./questions-additional";
import { verbalQuestions3 } from "./questions-verbal-3";
import { mathLogicQuestions3 } from "./questions-math-3";
import { spatialQuestions3 } from "./questions-spatial-3";
import { verbalQuestions4 } from "./questions-verbal-4";
import { mathLogicQuestions4 } from "./questions-math-4";
import { spatialQuestions4 } from "./questions-spatial-4";
import { verbalQuestions5 } from "./questions-verbal-5";
import { mathLogicQuestions5 } from "./questions-math-5";
import { letterSeriesHardQuestions } from "./questions-letter-series-hard";
import { ccatSpatialQuestions } from "./questions-spatial-ccat";
import { attentionDetailCcatQuestions } from "./questions-attention-detail-ccat";
import { orderingLogicCcatQuestions } from "./questions-ordering-logic-ccat";
import { practiceMathCcatQuestions } from "./questions-practice-math-ccat";
import { ccatSpatialPatternQuestions } from "./questions-spatial-patterns-ccat";
import { ccatCuratedExpansionQuestions } from "./questions-ccat-curated-expansion";

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

  const rawQuestions: SeedQuestion[] = [
    ...verbalQuestions,
    ...mathLogicQuestions,
    ...spatialQuestions,
    ...spatialQuestionsExtra,
    ...verbalQuestions2,
    ...mathLogicQuestions2,
    ...spatialQuestions2,
    ...additionalQuestions,
    ...verbalQuestions3,
    ...mathLogicQuestions3,
    ...spatialQuestions3,
    ...verbalQuestions4,
    ...mathLogicQuestions4,
    ...spatialQuestions4,
    ...verbalQuestions5,
    ...mathLogicQuestions5,
    ...letterSeriesHardQuestions,
    ...ccatSpatialQuestions,
    ...attentionDetailCcatQuestions,
    ...orderingLogicCcatQuestions,
    ...practiceMathCcatQuestions,
    ...ccatSpatialPatternQuestions,
    ...ccatCuratedExpansionQuestions,
  ];
  const allQuestions = dedupeByStem(rawQuestions.map(normalizeCcatQuestion).filter(isCcatStyleQuestion));
  console.log(`  Filtered out ${rawQuestions.length - allQuestions.length} duplicate or non-CCAT-style questions.`);
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
        throw new Error(`Correct option "${q.correctLabel}" not found for: "${q.stem.substring(0, 60)}..."`);
      }

      await tx.question.update({
        where: { id: question.id },
        data: { correctOptionId: correctOption.id },
      });
    });

    count++;
    if (count % 25 === 0) console.log(`  Progress: ${count}/${allQuestions.length}`);
  }

  console.log(`\n  All ${count} questions seeded!`);

  const verbal = await prisma.question.count({ where: { category: "verbal" } });
  const math = await prisma.question.count({ where: { category: "math_logic" } });
  const spatial = await prisma.question.count({ where: { category: "spatial" } });

  console.log(`\nSummary (CCAT format: 22 verbal + 17 math/logic + 11 spatial = 50):`);
  console.log(`  Verbal:     ${verbal} (need ${22 * 40} for 40 tests)`);
  console.log(`  Math&Logic: ${math} (need ${17 * 40} for 40 tests)`);
  console.log(`  Spatial:    ${spatial} (need ${11 * 40} for 40 tests)`);
  console.log(`  Total:      ${verbal + math + spatial}`);
  console.log(`  Full unique tests possible: ${Math.min(Math.floor(verbal / 22), Math.floor(math / 17), Math.floor(spatial / 11))}`);
  console.log(`  Total:      ${verbal + math + spatial}`);
}

main()
  .then(async () => { await prisma.$disconnect(); console.log("\nSeed completed!"); })
  .catch(async (e) => { console.error("Seed failed:", e); await prisma.$disconnect(); process.exit(1); });
