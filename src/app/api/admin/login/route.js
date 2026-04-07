import { NextResponse } from "next/server";

// Fallback credentials if not set in .env.local
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "ekehwealth@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "COlded9090!";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    // Set secure httpOnly session cookie valid for 8 hours
    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
