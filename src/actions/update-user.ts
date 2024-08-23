"use server";

import { User } from "@/types/user";
import { cookies } from "next/headers";

export async function fetchUpdateUser(userId: string, data: User) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      console.error("Token de acesso não encontrado");
      return null;
    }

    const response = await fetch(`${process.env.API_HOST}/users/${userId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao atualizar usuário");
  }
}
