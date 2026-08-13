import { NextResponse } from "next/server";

import Solution from "@/models/Solution";
import { connectDB } from "@/utils/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();

    const { slug } = await params;

    const solution = await Solution.findOne({ slug }).lean();

    if (!solution) {
      return NextResponse.json(
        { message: "Solution not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { solution },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching solution:", error);

    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}