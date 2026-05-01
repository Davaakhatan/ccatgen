import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Category } from "@/generated/prisma/client";

const VALID_CATEGORIES: Category[] = ["verbal", "math_logic", "spatial"];
const VALID_DIFFICULTIES = [1, 2, 3];

function isValidQuestionInput(body: {
  category?: Category;
  difficulty?: number;
  stem?: string;
  options?: { label: string; text: string }[];
  correctOptionIndex?: number;
}) {
  const { category, difficulty, stem, options, correctOptionIndex } = body;
  return (
    category &&
    VALID_CATEGORIES.includes(category) &&
    typeof difficulty === "number" &&
    VALID_DIFFICULTIES.includes(difficulty) &&
    typeof stem === "string" &&
    stem.trim().length > 0 &&
    Array.isArray(options) &&
    options.length >= 2 &&
    options.every((opt) => typeof opt.label === "string" && opt.label.trim() && typeof opt.text === "string" && opt.text.trim()) &&
    new Set(options.map((opt) => opt.label)).size === options.length &&
    typeof correctOptionIndex === "number" &&
    Number.isInteger(correctOptionIndex) &&
    correctOptionIndex >= 0 &&
    correctOptionIndex < options.length
  );
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { category, difficulty, stem, tags, options, correctOptionIndex } = body;

    if (!isValidQuestionInput({ category, difficulty, stem, options, correctOptionIndex })) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

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
