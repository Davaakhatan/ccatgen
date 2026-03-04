import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: sessionId } = await params;

    const session = await prisma.testSession.findUnique({ where: { id: sessionId } });

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    if (session.status !== "active") {
      return NextResponse.json({ error: "Session is not active" }, { status: 400 });
    }

    const newStatus = new Date() > session.endsAt ? "expired" : "completed";

    await prisma.testSession.update({
      where: { id: sessionId },
      data: { status: newStatus },
    });

    return NextResponse.json({ success: true, status: newStatus });
  } catch (error) {
    console.error("Failed to finish session:", error);
    return NextResponse.json({ error: "Failed to finish session" }, { status: 500 });
  }
}
