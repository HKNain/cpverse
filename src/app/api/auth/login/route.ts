import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import User from "@/models/User";
import { connectDB } from "@/utils/db";
import { generateToken } from "@/utils/jwt";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { loginInput, password } = await req.json();

    const user = await User.findOne({
      $or: [
        { email: loginInput },
        { username: loginInput },
      ],
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid Credentials" },
        { status: 401 },
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid Credentials" },
        { status: 401 },
      );
    }

    const token = generateToken(user._id.toString());

    const response = NextResponse.json({
      message: "Login successful",
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
