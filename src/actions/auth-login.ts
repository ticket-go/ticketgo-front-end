"use server";

import { Auth } from "@/types/auth";
import { cookies } from "next/headers";

export async function authLogin(
  username: string,
  password: string
): Promise<Auth | void> {
  try {
    const cookiesStore = cookies();
    const response = await fetch(`${process.env.API_HOST}/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Erro ao fazer login: ${data.message || response.status}`
      );
    }

    if (response.ok) {
      const { access_token, refresh_token, user } = data;
      cookiesStore.set("access_token", access_token);
      cookiesStore.set("refresh_token", refresh_token);
      cookiesStore.set("user", JSON.stringify(user));

      return user;
    }
  } catch (error) {
    console.error(error);
  }
}
