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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") as Category | null;
    const difficulty = searchParams.get("difficulty");
    const id = searchParams.get("id");

    if (id) {
      const question = await prisma.question.findUnique({
        where: { id },
        include: { options: { orderBy: { label: "asc" } } },
      });
      if (!question) {
        return NextResponse.json({ error: "Question not found" }, { status: 404 });
      }
      return NextResponse.json(question);
    }

    const where: { category?: Category; difficulty?: number } = {};
    if (category) where.category = category;
    if (difficulty) where.difficulty = parseInt(difficulty);

    const questions = await prisma.question.findMany({
      where,
      include: { options: { orderBy: { label: "asc" } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(questions);
  } catch (error) {
    console.error("Failed to fetch questions:", error);
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { category, difficulty, stem, tags, options, correctOptionIndex } = body;

    if (!isValidQuestionInput({ category, difficulty, stem, options, correctOptionIndex })) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const question = await prisma.$transaction(async (tx) => {
      const q = await tx.question.create({
        data: { category, difficulty, stem, correctOptionId: "placeholder", tags: tags || [] },
      });

      const createdOptions = await Promise.all(
        options.map((opt: { label: string; text: string }) =>
          tx.option.create({ data: { questionId: q.id, label: opt.label, text: opt.text } })
        )
      );

      const updated = await tx.question.update({
        where: { id: q.id },
        data: { correctOptionId: createdOptions[correctOptionIndex].id },
        include: { options: true },
      });

      return updated;
    });

    return NextResponse.json(question, { status: 201 });
  } catch (error) {
    console.error("Failed to create question:", error);
    return NextResponse.json({ error: "Failed to create question" }, { status: 500 });
  }
}
