"use server";

import { cookies } from "next/headers";

export async function logoutAuth(): Promise<{ success: boolean }> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("access_token")?.value;
    const refresh = cookieStore.get("refresh_token")?.value;

    if (!token || !refresh) {
      return { success: false };
    }

    const response = await fetch(`${process.env.API_HOST}/auth/logout/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ refresh }),
    });

    if (response.ok) {
      cookieStore.delete("access_token");
      cookieStore.delete("refresh_token");
      cookieStore.delete("user");
      return { success: true };
    }
  } catch (error) {
    console.error("Error during logout:", error);
  }
  return { success: false };
}
