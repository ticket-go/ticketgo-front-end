"use server";

import { Auth } from "@/types/auth";
import { User } from "@/types/user";
import { cookies } from "next/headers";

export async function fetchUser(userId: string): Promise<any> {
  try {
    const cookiesStore = cookies();
    const token = cookiesStore.get("access_token")?.value;

    if (!token) {
      throw new Error("Token não encontrado");
    }

    const response = await fetch(`${process.env.API_HOST}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Falha ao buscar informações do usuário");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
