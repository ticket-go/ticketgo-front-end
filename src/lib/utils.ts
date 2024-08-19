import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ROUTES } from "@/const/routes";

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
