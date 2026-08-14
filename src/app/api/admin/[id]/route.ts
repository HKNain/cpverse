import { NextResponse } from "next/server";
import slugify from "slugify";

import Solution from "@/models/Solution";
import Category from "@/models/Category";
import { connectDB } from "@/utils/db";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await req.json();

    const {
      title,
      problemUrl,
      code,
      category,
      videoUrl,
      timeComplexity,
      spaceComplexity,
    } = body;

    const existingSolution = await Solution.findById(id);

    if (!existingSolution) {
      return NextResponse.json(
        { message: "Solution not found" },
        { status: 404 },
      );
    }

    // -------------------------
    // Title + slug
    // -------------------------

    if (title !== undefined) {
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
          {
            message: "A solution with this title already exists",
          },
          { status: 409 },
        );
      }

      existingSolution.title = title;
      existingSolution.slug = newSlug;
    }

    // -------------------------
    // Problem URL
    // -------------------------

    if (problemUrl !== undefined) {
      existingSolution.problemUrl = problemUrl;
    }

    // -------------------------
    // Code
    // -------------------------

    if (code !== undefined) {
      existingSolution.code = code;
    }

    // -------------------------
    // Category
    // -------------------------

    if (category !== undefined) {
      const categoryExists = await Category.findOne({
        slug: category,
      });

      if (!categoryExists) {
        return NextResponse.json(
          { message: "Category not found" },
          { status: 404 },
        );
      }

      existingSolution.category = categoryExists._id;
    }

    // -------------------------
    // Video
    // -------------------------

    if (videoUrl !== undefined) {
      existingSolution.videoUrl = videoUrl;
    }

    // -------------------------
    // Complexity
    // -------------------------

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
  } catch (error) {
    console.error("PATCH /api/admin/:id ERROR:", error);

    return NextResponse.json(
      {
        message: "Server Error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// =====================================================
// DELETE
// =====================================================

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
      {
        message: "Solution deleted successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("DELETE /api/admin/:id ERROR:", error);

    return NextResponse.json(
      {
        message: "Server Error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
