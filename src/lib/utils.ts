import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { ROUTES } from "@/const/routes";
import { deleteCookie, getCookie } from "cookies-next";

interface DecodedToken {
  exp: number;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetcher(url: string) {
  return fetch(url).then((res) => res.json());
}

export function checkPublicRoute(asPath: string) {
  const appPublicRoutes = Object.values(ROUTES);

  return appPublicRoutes.includes(asPath);
}

function formatDateToString(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function revalidateToken(req: NextRequest) {
  const accessToken = getCookie("access_token", { req });
  const refreshToken = getCookie("refresh_token", { req });

  if (!accessToken || !refreshToken) {
    return false;
  }

  try {
    const decodedToken = jwtDecode<DecodedToken>(accessToken as string);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedToken.exp < currentTime) {
      deleteCookie("access_token", { req });
      deleteCookie("refresh_token", { req });

      return false;
    }
    return true;
  } catch (error) {
    console.error("Token revalidation failed:", error);
    return false;
  }
}
