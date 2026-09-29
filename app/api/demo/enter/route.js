import { NextResponse } from "next/server";

// Sept 29, 2026: retired with the old demo door. This folder can be deleted.
export async function GET() {
  return NextResponse.json({ error: "Not found." }, { status: 404 });
}

export async function POST() {
  return NextResponse.json({ error: "Not found." }, { status: 404 });
}
