"use server";

import { Payment } from "@/types/payment";
import { cookies } from "next/headers";

export async function createNewPayment(value = 0): Promise<Payment> {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    throw new Error("Token não encontrado");
  }

  const response = await fetch(`${process.env.API_HOST}/payments/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ value }),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(
      `Erro ao criar pagamento: ${errorResponse.message || response.statusText}`
    );
  }

  const data = await response.json();
  return data;
}
