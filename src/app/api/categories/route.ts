import { NextResponse } from "next/server";
import Category from "@/models/Category";
import "@/models/Solution";
import { connectDB } from "@/utils/db";

export async function GET() {
  try {
    await connectDB();

    const categories = await Category.find()
      .select("name slug solutions")
      .populate("solutions", "title slug")
      .lean();

    return NextResponse.json(
      {
        categories,
      },
      { status: 200 },
    );
  } catch (error){
    console.error("CATEGORY ERROR:", error);
    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 },
    );
  }
}