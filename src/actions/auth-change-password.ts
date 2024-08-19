"use server";

import { Auth } from "@/types/auth";
import { cookies } from "next/headers";

export async function authChangePassword(
  userId: string,
  password: string,
  newPassword: string,
  confirmNewPassword: string
): Promise<Auth["user"] | void> {
  try {
    if (!userId || !password || !newPassword || !confirmNewPassword) {
      throw new Error("Todos os campos são obrigatórios.");
    }
    const cookiesStore = cookies();
    const token = cookiesStore.get("access_token")?.value;

    if (!token) {
      throw new Error("Token de autenticação não encontrado.");
    }

    const response = await fetch(
      `${process.env.API_HOST}/auth/${userId}/change-password/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          old_password: password,
          new_password: newPassword,
          confirm_new_password: confirmNewPassword,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Erro ao alterar senha: ${data.message || response.status}`
      );
    }

    if (response.ok) {
      cookiesStore.delete("access_token");
      cookiesStore.delete("refresh_token");
      cookiesStore.delete("user");
      return data;
    }
  } catch (error) {
    console.error("Erro durante a alteração de senha:", error);
    throw error;
  }
}
