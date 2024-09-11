"use server";

import { History } from "@/types/history";
import { cookies } from "next/headers";

export async function fetchAuditHistory(): Promise<History[]> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      throw new Error("Token de autenticação não encontrado.");
    }

    const response = await fetch(`${process.env.API_HOST}/users/history/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Erro ao buscar histórico de auditoria: ${
          response.statusText || response.status
        }`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
