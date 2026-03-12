import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

// Required for Node.js — Neon serverless driver needs WebSocket
neonConfig.webSocketConstructor = ws;

const adapter = new PrismaNeon({ connectionString: process.env.DIRECT_DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

// Import question banks
import { verbalQuestions } from "./questions-verbal";
import { mathLogicQuestions } from "./questions-math";
import { spatialQuestions } from "./spatial-questions";
import { spatialQuestionsExtra } from "./questions-spatial-extra";
import { verbalQuestions2 } from "./questions-verbal-2";
import { mathLogicQuestions2 } from "./questions-math-2";
import { spatialQuestions2 } from "./questions-spatial-2";

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

  const allQuestions = [
    ...verbalQuestions,
    ...mathLogicQuestions,
    ...spatialQuestions,
    ...spatialQuestionsExtra,
    ...verbalQuestions2,
    ...mathLogicQuestions2,
    ...spatialQuestions2,
  ];
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

  console.log(`\nSummary:`);
  console.log(`  Verbal:     ${verbal} (need 360 for 20 tests)`);
  console.log(`  Math&Logic: ${math} (need 360 for 20 tests)`);
  console.log(`  Spatial:    ${spatial} (need 280 for 20 tests)`);
  console.log(`  Total:      ${verbal + math + spatial}`);
  console.log(`  Full unique tests possible: ${Math.min(Math.floor(verbal / 18), Math.floor(math / 18), Math.floor(spatial / 14))}`);
}

main()
  .then(async () => { await prisma.$disconnect(); console.log("\nSeed completed!"); })
  .catch(async (e) => { console.error("Seed failed:", e); await prisma.$disconnect(); process.exit(1); });
