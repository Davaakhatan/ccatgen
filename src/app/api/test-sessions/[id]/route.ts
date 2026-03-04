import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
              include: {
                options: { select: { id: true, label: true, text: true } },
              },
            },
          },
        },
      },
    });

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    return NextResponse.json({
      sessionId: session.id,
      status: session.status,
      startedAt: session.startedAt,
      endsAt: session.endsAt,
      questions: session.questions.map((qi) => ({
        instanceId: qi.id,
        order: qi.order,
        questionId: qi.questionId,
        category: qi.question.category,
        stem: qi.question.stem,
        options: qi.question.options,
        userAnswerId: qi.userAnswerId,
        answeredAt: qi.answeredAt,
      })),
    });
  } catch (error) {
    console.error("Failed to fetch session:", error);
    return NextResponse.json({ error: "Failed to fetch session" }, { status: 500 });
  }
}
