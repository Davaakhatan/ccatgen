import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Category } from "@/generated/prisma/client";
import { buildQuestionReview } from "@/lib/question-explanations";

function getPercentileBand(rawScore: number, total: number): string {
  const pct = total > 0 ? rawScore / total : 0;
  if (pct <= 0.3) return "Below Average";
  if (pct <= 0.6) return "Average";
  if (pct <= 0.8) return "Above Average";
  return "Exceptional";
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: sessionId } = await params;

    const session = await prisma.testSession.findUnique({
      where: { id: sessionId },
      include: {
        questions: {
          orderBy: { order: "asc" },
          include: {
            question: {
              select: {
                category: true,
                correctOptionId: true,
                stem: true,
                tags: true,
                options: { select: { id: true, label: true, text: true }, orderBy: { label: "asc" } },
              },
            },
          },
        },
      },
    });

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    if (session.status === "active") {
      return NextResponse.json({ error: "Session is still active" }, { status: 400 });
    }

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

    return NextResponse.json({
      rawScore,
      total: session.questions.length,
      categoryBreakdown,
      percentileBand: getPercentileBand(rawScore, session.questions.length),
      answerReview: session.questions.map((qi) => ({
        instanceId: qi.id,
        order: qi.order,
        category: qi.question.category,
        stem: qi.question.stem,
        ...buildQuestionReview(qi.question, qi.userAnswerId),
      })),
    });
  } catch (error) {
    console.error("Failed to calculate results:", error);
    return NextResponse.json({ error: "Failed to calculate results" }, { status: 500 });
  }
}
