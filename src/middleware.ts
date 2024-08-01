import { NextRequest, NextResponse } from "next/server";

async function isValidUser(token: string) {
  if (token) {
    const response = await fetch("http://localhost:8000/user/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return true;
    }
  }

  return false;
}

export default async function middleware(req: NextRequest, res: NextResponse) {
  const token = req.cookies.get("access");

  if (req.nextUrl.pathname === "/login" && !token) {
    return NextResponse.next();
  }

  if (req.nextUrl.pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (!isValidUser(token.value)) {
    req.cookies.delete("access");
    req.cookies.delete("refresh");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/obra/:path*"],
};
