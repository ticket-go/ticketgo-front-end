import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "cookies-next";

export function middleware(req: NextRequest, res: NextResponse) {
  const accessToken = getCookie("access_token", { req });

  if (accessToken && req.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)", "/login"],
};
