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

function formatDateToString(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
