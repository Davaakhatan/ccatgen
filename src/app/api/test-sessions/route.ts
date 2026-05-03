import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { Category } from "@/generated/prisma/client";
import { generateCategoryPractice, generateHardPractice, generateTest } from "@/lib/test-generator";

const categoryValues = new Set<string>(Object.values(Category));

export async function POST(request: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const body = await request.json().catch(() => ({}));
    const category = typeof body.category === "string" ? body.category : null;
    const mode = typeof body.mode === "string" ? body.mode : null;
    const result = mode === "hard"
      ? await generateHardPractice(userId)
      : category && categoryValues.has(category)
        ? await generateCategoryPractice(category as Category, userId)
        : await generateTest(userId);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Failed to generate test session:", error);
    return NextResponse.json({ error: "Failed to generate test session" }, { status: 500 });
  }
}
