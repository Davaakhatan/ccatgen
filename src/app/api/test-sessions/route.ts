import { NextResponse } from "next/server";
import { generateTest } from "@/lib/test-generator";

export async function POST() {
  try {
    const result = await generateTest();
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Failed to generate test session:", error);
    return NextResponse.json({ error: "Failed to generate test session" }, { status: 500 });
  }
}
