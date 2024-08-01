"use server";

import { Auth } from "@/types/auth";
import { cookies } from "next/headers";

export async function createAuth(
  username: string,
  password: string
): Promise<Auth | void> {
  try {
    const cookieStore = cookies();
    const response = await fetch(`${process.env.API_HOST}/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      cookieStore.set("refresh", data.refresh, {});
      cookieStore.set("user", JSON.stringify(data.user));
      cookieStore.set("access", data.access);
    }
    return data;
  } catch (error) {
    console.error(error);
  }
}
