import { prisma } from "@/lib/prisma";
import { Category } from "@/generated/prisma/client";

const CATEGORY_DISTRIBUTIONS: { category: Category; total: number }[] = [
  { category: "verbal", total: 17 },
  { category: "math_logic", total: 17 },
  { category: "spatial", total: 16 },
];

const TEST_DURATION_MINUTES = 15;

function getDifficultyBreakdown(total: number) {
  const easy = Math.round(total * 0.3);
  const hard = Math.round(total * 0.2);
  const medium = total - easy - hard;
  return { easy, medium, hard };
}

function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function sampleRandom<T>(array: T[], count: number): T[] {
  return shuffle(array).slice(0, count);
}

export async function generateTest(userId?: string) {
  const selectedQuestionIds: string[] = [];

  for (const { category, total } of CATEGORY_DISTRIBUTIONS) {
    const { easy, medium, hard } = getDifficultyBreakdown(total);

    const [easyQs, mediumQs, hardQs] = await Promise.all([
      prisma.question.findMany({ where: { category, difficulty: 1 }, select: { id: true } }),
      prisma.question.findMany({ where: { category, difficulty: 2 }, select: { id: true } }),
      prisma.question.findMany({ where: { category, difficulty: 3 }, select: { id: true } }),
    ]);

    selectedQuestionIds.push(
      ...sampleRandom(easyQs, easy).map((q) => q.id),
      ...sampleRandom(mediumQs, medium).map((q) => q.id),
      ...sampleRandom(hardQs, hard).map((q) => q.id)
    );
  }

  const shuffledIds = shuffle(selectedQuestionIds);
  const now = new Date();
  const endsAt = new Date(now.getTime() + TEST_DURATION_MINUTES * 60 * 1000);

  const session = await prisma.testSession.create({
    data: {
      userId: userId ?? null,
      startedAt: now,
      endsAt,
      status: "active",
      questions: {
        create: shuffledIds.map((questionId, index) => ({
          questionId,
          order: index + 1,
        })),
      },
    },
    include: {
      questions: {
        orderBy: { order: "asc" },
        include: {
          question: {
            include: {
              options: { select: { id: true, label: true, text: true } },
            },
          },
        },
      },
    },
  });

  return {
    sessionId: session.id,
    endsAt: session.endsAt,
    questions: session.questions.map((qi) => ({
      instanceId: qi.id,
      order: qi.order,
      questionId: qi.questionId,
      category: qi.question.category,
      stem: qi.question.stem,
      options: qi.question.options,
    })),
  };
}
