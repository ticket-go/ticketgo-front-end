"user server";

import { cookies } from "next/headers";

export async function authRefreshToken(): Promise<{
  success: boolean;
  newAccessToken?: string;
} | void> {
  try {
    const cookieStore = cookies();
    const refresh = cookieStore.get("access_token")?.value;

    if (!refresh) {
      return { success: false };
    }

    const response = await fetch(
      `${process.env.API_HOST}/auth/token/refresh/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      return { success: true, newAccessToken: data.access };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("Error during token refresh:", error);
    return { success: false };
  }
}
