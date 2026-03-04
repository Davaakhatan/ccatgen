import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: sessionId } = await params;
    const { questionId, selectedOptionId } = await request.json();

    if (!questionId || !selectedOptionId) {
      return NextResponse.json({ error: "questionId and selectedOptionId are required" }, { status: 400 });
    }

    const session = await prisma.testSession.findUnique({ where: { id: sessionId } });

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    if (session.status !== "active") {
      return NextResponse.json({ error: "Session is not active" }, { status: 400 });
    }

    if (new Date() > session.endsAt) {
      await prisma.testSession.update({ where: { id: sessionId }, data: { status: "expired" } });
      return NextResponse.json({ error: "Session has expired" }, { status: 400 });
    }

    const questionInstance = await prisma.questionInstance.findUnique({
      where: { sessionId_questionId: { sessionId, questionId } },
    });

    if (!questionInstance) {
      return NextResponse.json({ error: "Question not found in this session" }, { status: 404 });
    }

    await prisma.questionInstance.update({
      where: { id: questionInstance.id },
      data: { userAnswerId: selectedOptionId, answeredAt: new Date() },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to submit answer:", error);
    return NextResponse.json({ error: "Failed to submit answer" }, { status: 500 });
  }
}
