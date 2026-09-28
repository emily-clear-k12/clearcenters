import { NextResponse } from "next/server";
import {
import { readStudentId } from "../../../../lib/studentSession";
  scanMakerLibrary,
  searchMakerLibrary,
} from "../../../../lib/cases/maker-studio/library";

/**
 * GET /api/maker-studio/library?q=&limit=
 * Living ClearCenters-only image catalog for Maker Studio.
 * Images come from public/maker/ (+ public/lab/) — drop files there to add.
 */
export async function GET(request) {
  const studentId = readStudentId();
  if (!studentId) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const limit = searchParams.get("limit");
  const items = searchMakerLibrary(q, limit);
  const total = scanMakerLibrary().length;

  return NextResponse.json({
    items,
    total,
    q,
  });
}
