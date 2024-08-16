"use server";

import { signOut } from "@/lib/auth/authConfig";

export async function handleGoogleSinOut() {
  try {
    await signOut();
  } catch (error) {
    throw error;
  }
}
