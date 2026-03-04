import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { category, difficulty, stem, tags, options, correctOptionIndex } = body;

    const question = await prisma.$transaction(async (tx) => {
      await tx.option.deleteMany({ where: { questionId: id } });

      const createdOptions = await Promise.all(
        options.map((opt: { label: string; text: string }) =>
          tx.option.create({ data: { questionId: id, label: opt.label, text: opt.text } })
        )
      );

      const updated = await tx.question.update({
        where: { id },
        data: {
          category,
          difficulty,
          stem,
          tags: tags || [],
          correctOptionId: createdOptions[correctOptionIndex].id,
        },
        include: { options: true },
      });

      return updated;
    });

    return NextResponse.json(question);
  } catch (error) {
    console.error("Failed to update question:", error);
    return NextResponse.json({ error: "Failed to update question" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.question.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete question:", error);
    return NextResponse.json({ error: "Failed to delete question" }, { status: 500 });
  }
}
