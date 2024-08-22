import { NextRequest, NextResponse } from "next/server";
import { getRouteRegex } from "next/dist/shared/lib/router/utils/route-regex";
import { getCookie } from "cookies-next";
import { ROUTES, PRIVATE_ROUTES } from "@/const/routes";

const route = getRouteRegex("/page/posts/[pid]/[comment]");

export function middleware(req: NextRequest) {
  const accessToken = getCookie("access_token", { req });
  const user = getCookie("user", { req });

  if (accessToken && req.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (accessToken && req.nextUrl.pathname === "/register") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!accessToken && req.nextUrl.pathname === PRIVATE_ROUTES.myAccount) {
    return NextResponse.redirect(new URL(ROUTES.login, req.url));
  }

  if (!accessToken) {
    const isChangePasswordRoute =
      req.nextUrl.pathname.startsWith("/change-password/");
    if (
      req.nextUrl.pathname === PRIVATE_ROUTES.myAccount ||
      isChangePasswordRoute
    ) {
      return NextResponse.redirect(new URL(ROUTES.login, req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|favicon.ico).*)",
    "/login",
    "/register",
    "/change-password/:id",
  ],
};
