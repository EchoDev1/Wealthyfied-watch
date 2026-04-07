import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req) {
  // Verify admin session before allowing logout
  const cookieStore = cookies();
  const session = cookieStore.get("admin_session");

  if (!session) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("admin_session", "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
  });

  return response;
}
