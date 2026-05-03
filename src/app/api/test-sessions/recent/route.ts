import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Category } from "@/generated/prisma/client";

function getPercentileBand(rawScore: number, total: number): string {
  const pct = total > 0 ? rawScore / total : 0;
  if (pct <= 0.3) return "Below Average";
  if (pct <= 0.6) return "Average";
  if (pct <= 0.8) return "Above Average";
  return "Exceptional";
}

export async function GET() {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json([]);
    }

    const sessions = await prisma.testSession.findMany({
      where: {
        userId,
        status: { in: ["completed", "expired"] },
      },
      orderBy: { startedAt: "desc" },
      take: 20,
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
        percentileBand: getPercentileBand(rawScore, session.questions.length),
        categoryBreakdown,
      };
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error("Failed to fetch recent sessions:", error);
    return NextResponse.json({ error: "Failed to fetch results" }, { status: 500 });
  }
}
