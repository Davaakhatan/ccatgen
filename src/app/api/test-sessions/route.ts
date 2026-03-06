import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { generateTest } from "@/lib/test-generator";

export async function POST() {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const result = await generateTest(userId);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Failed to generate test session:", error);
    return NextResponse.json({ error: "Failed to generate test session" }, { status: 500 });
  }
}
