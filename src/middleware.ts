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
    PRIVATE_ROUTES.MyAccountEdit,
    PRIVATE_ROUTES.admin,
    PRIVATE_ROUTES.audit,
    PRIVATE_ROUTES.payment,
    PRIVATE_ROUTES.changePassword,
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
    "/change-password",
    "/payment",
    "/my-account",
    "/admin",
  ],
};
