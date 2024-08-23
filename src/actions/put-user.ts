"use server";

import { User } from "@/types/user";
import { cookies } from "next/headers";

export async function putUser(userId: string, data: User) {
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

    console.log("Resposta da API:", response);

    const result = await response.json();
    console.log("Resultado da API:", result);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao atualizar usuário");
  }
}
