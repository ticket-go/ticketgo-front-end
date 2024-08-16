"use server";

import { auth } from "@/lib/auth/authConfig";

export async function checkIsAuthenticated() {
  const session = await auth();
  if (session) {
    return true;
  }
  return false;
}
