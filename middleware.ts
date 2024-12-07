import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const userAuth = request.cookies.get("user-auth")?.value;

  if (
    (pathname === "/login" || pathname === "/register") &&
    userAuth === "true"
  )
    return NextResponse.redirect(new URL("/", request.url));

  if (
    (pathname === "/" || pathname === "/accounts") &&
    userAuth !== "true"
  )
    return NextResponse.redirect(new URL("/login", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/accounts", "/login", "/register"],
};
