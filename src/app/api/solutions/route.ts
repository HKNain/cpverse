import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Solution from "@/models/Solution";

export async function GET() {
  try {
    await connectDB();

    const solutions = await Solution.find({})
      .populate("category", "_id name slug")
      .sort({ createdAt: -1 })
      .select(
        "title slug problemUrl category code videoUrl timeComplexity spaceComplexity createdAt updatedAt"
      )
      .lean();

    return NextResponse.json(
      {
        solutions,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("ADMIN GET SOLUTIONS ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch solutions",
      },
      { status: 500 }
    );
  }
}