import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "cookies-next";
import { ROUTES, PRIVATE_ROUTES } from "@/const/routes";
import { revalidateToken } from "./lib/utils";

export function middleware(req: NextRequest) {
  const isAuthenticated = revalidateToken(req);

  if (isAuthenticated && req.nextUrl.pathname === ROUTES.login) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isAuthenticated && req.nextUrl.pathname === ROUTES.register) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!isAuthenticated && req.nextUrl.pathname === PRIVATE_ROUTES.myAccount) {
    return NextResponse.redirect(new URL(ROUTES.login, req.url));
  }

  if (!isAuthenticated && req.nextUrl.pathname === PRIVATE_ROUTES.admin) {
    return NextResponse.redirect(new URL(ROUTES.login, req.url));
  }

  if (
    !isAuthenticated &&
    req.nextUrl.pathname === PRIVATE_ROUTES.myAccountPath("edit")
  ) {
    return NextResponse.redirect(new URL(ROUTES.login, req.url));
  }

  if (!isAuthenticated) {
    const isChangePasswordRoute =
      req.nextUrl.pathname.startsWith("/change-password/");
    if (
      req.nextUrl.pathname ===
        PRIVATE_ROUTES.myAccountPath(`${isChangePasswordRoute}`) ||
      isChangePasswordRoute
    ) {
      return NextResponse.redirect(new URL(ROUTES.login, req.url));
    }
  }

  if (!isAuthenticated && req.nextUrl.pathname === PRIVATE_ROUTES.payment) {
    return NextResponse.redirect(new URL(ROUTES.login, req.url));
  }

  if (
    !isAuthenticated &&
    req.nextUrl.pathname === PRIVATE_ROUTES.invoice("id")
  ) {
    return NextResponse.redirect(new URL(ROUTES.login, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|favicon.ico).*)",
    "/login",
    "/register",
    "/payment",
    "/payment/:id",
    "/change-password/:id",
    "/my-account",
    "/my-account/edit",
    "/admin",
  ],
};
