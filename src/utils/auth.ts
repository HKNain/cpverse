import { NextRequest } from "next/server";
import { verifyToken } from "@/utils/jwt";

export function authenticate(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = verifyToken(token);

    return decoded;
  } catch {
    return null;
  }
}