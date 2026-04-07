import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protect all /admin routes
  if (pathname.startsWith("/admin")) {
    const session = request.cookies.get("admin_session");
    if (!session || session.value !== "authenticated") {
      const loginUrl = new URL("/auth", request.url);
      loginUrl.searchParams.set("redirect", "admin");
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
