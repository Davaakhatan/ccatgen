import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Category } from "@/generated/prisma/client";

function getPercentileBand(rawScore: number): string {
  if (rawScore <= 15) return "Below Average";
  if (rawScore <= 30) return "Average";
  if (rawScore <= 40) return "Above Average";
  return "Exceptional";
}

export async function GET() {
  try {
    const sessions = await prisma.testSession.findMany({
      where: { status: "finished" },
      orderBy: { startedAt: "desc" },
      take: 10,
      include: {
        questions: {
          include: {
            question: { select: { category: true, correctOptionId: true } },
          },
        },
      },
    });

    const results = sessions.map((session) => {
      const categoryBreakdown: Record<Category, { correct: number; total: number }> = {
        verbal: { correct: 0, total: 0 },
        math_logic: { correct: 0, total: 0 },
        spatial: { correct: 0, total: 0 },
      };

      let rawScore = 0;
      for (const qi of session.questions) {
        const cat = qi.question.category;
        categoryBreakdown[cat].total += 1;
        if (qi.userAnswerId && qi.userAnswerId === qi.question.correctOptionId) {
          categoryBreakdown[cat].correct += 1;
          rawScore += 1;
        }
      }

      return {
        sessionId: session.id,
        startedAt: session.startedAt,
        rawScore,
        total: session.questions.length,
        percentileBand: getPercentileBand(rawScore),
        categoryBreakdown,
      };
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error("Failed to fetch recent sessions:", error);
    return NextResponse.json({ error: "Failed to fetch results" }, { status: 500 });
  }
}
