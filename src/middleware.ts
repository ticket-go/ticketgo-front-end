import { NextRequest, NextResponse } from "next/server";

import { ROUTES, PRIVATE_ROUTES } from "@/const/routes";
import { revalidateToken } from "./lib/utils";

function isAuthenticated(req: NextRequest): boolean {
  return revalidateToken(req);
}

export function middleware(req: NextRequest) {
  const authenticated = isAuthenticated(req);

  if (
    authenticated &&
    [ROUTES.login, ROUTES.register].includes(req.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const privateRoutes = [
    PRIVATE_ROUTES.myAccount,
    PRIVATE_ROUTES.myAccountPath("edit"),
    PRIVATE_ROUTES.admin,
    PRIVATE_ROUTES.payment,
    PRIVATE_ROUTES.invoice("id"),
    `/change-password/${req.nextUrl.pathname.split("/").pop()}`,
  ];

  if (!authenticated && privateRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL(ROUTES.login, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next|static|public|assets|favicon.ico).*)",
    "/login",
    "/register",
    "/events",
    "/payment",
    "/payment/:id",
    "/change-password/:id",
    "/my-account",
    "/my-account/edit",
    "/admin",
  ],
};
