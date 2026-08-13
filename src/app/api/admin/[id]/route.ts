import { NextResponse } from "next/server";
import slugify from "slugify";

import Solution from "@/models/Solution";
import { connectDB } from "@/utils/db";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    const {
      title,
      problemUrl,
      solution,
      category,
      videoUrl,
      timeComplexity,
      spaceComplexity,
    } = await req.json();

    const existingSolution = await Solution.findById(id);

    if (!existingSolution) {
      return NextResponse.json(
        { message: "Solution not found" },
        { status: 404 },
      );
    }

    if (title !== undefined) {
      existingSolution.title = title;

      const newSlug = slugify(title, {
        lower: true,
        strict: true,
        trim: true,
      });

      const slugExists = await Solution.findOne({
        slug: newSlug,
        _id: { $ne: id },
      });

      if (slugExists) {
        return NextResponse.json(
          { message: "A solution with this title already exists" },
          { status: 409 },
        );
      }

      existingSolution.slug = newSlug;
    }

    if (problemUrl !== undefined) {
      existingSolution.problemUrl = problemUrl;
    }

    if (solution !== undefined) {
      existingSolution.solution = solution;
    }

    if (category !== undefined) {
      existingSolution.category = category;
    }

    if (videoUrl !== undefined) {
      existingSolution.videoUrl = videoUrl;
    }

    if (timeComplexity !== undefined) {
      existingSolution.timeComplexity = timeComplexity;
    }

    if (spaceComplexity !== undefined) {
      existingSolution.spaceComplexity = spaceComplexity;
    }

    await existingSolution.save();

    return NextResponse.json(
      {
        message: "Solution updated successfully",
        solution: existingSolution,
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    const deletedSolution = await Solution.findByIdAndDelete(id);

    if (!deletedSolution) {
      return NextResponse.json(
        { message: "Solution not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Solution deleted successfully" },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 },
    );
  }
}