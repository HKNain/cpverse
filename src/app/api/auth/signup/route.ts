import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import User from "@/models/User";
import { connectDB } from "@/utils/db";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { username, email, password, superkey } = await req.json();

    if (!username || !email || !password || !superkey) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }

    if (superkey !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { message: "Invalid Admin Key" },
        { status: 401 },
      );
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with the username or email already exists" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 },
    );
  } catch {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
