import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

import Solution from "@/models/Solution";
import Category from "@/models/Category";
import { connectDB } from "@/utils/db";
import { authenticate } from "@/utils/auth";

export async function POST(req: NextRequest) {
  const user = authenticate(req);

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectDB();

    const {
      title,
      problemUrl,
      category,
      code,
      videoUrl,
      timeComplexity,
      spaceComplexity,
    } = await req.json();

    if (
      !title ||
      !problemUrl ||
      !category ||
      !code ||
      !videoUrl ||
      !timeComplexity ||
      !spaceComplexity
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }

    const slug = slugify(title, {
      lower: true,
      strict: true,
      trim: true,
    });

    const existingSolution = await Solution.findOne({ slug });

    if (existingSolution) {
      return NextResponse.json(
        { message: "A solution with this title already exists" },
        { status: 409 },
      );
    }

    const categorySlug = slugify(category, {
      lower: true,
      strict: true,
      trim: true,
    });

    let existingCategory = await Category.findOne({
      slug: categorySlug,
    });

    if (!existingCategory) {
      existingCategory = await Category.create({
        name: category,
        slug: categorySlug,
        solutions: [],
      });
    }

    const newSolution = await Solution.create({
      title,
      slug,
      problemUrl,
      category: existingCategory._id,
      code,
      videoUrl,
      timeComplexity,
      spaceComplexity,
    });

    existingCategory.solutions.push(newSolution._id);
    await existingCategory.save();

    return NextResponse.json(
      {
        message: "Solution created successfully",
        solution: newSolution,
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
