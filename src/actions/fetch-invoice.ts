"use server";

import { Invoice } from "@/types/ticket";
import { cookies } from "next/headers";

export async function fetchInvoice(
  invoiceId: Invoice["uuid"]
): Promise<Invoice | void> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      throw new Error("Token de autenticação não encontrado.");
    }

    const response = await fetch(
      `${process.env.API_HOST}/payments/${invoiceId}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Erro ao buscar fatura: ${response.statusText || response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar fatura:", error);
    throw error;
  }
}
