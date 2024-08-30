"use server";

import { cookies } from "next/headers";

export async function createNewPayment(): Promise<string | void> {
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
    body: JSON.stringify({}),
  });

  if (!response.ok) {
    throw new Error(`Erro ao criar pagamento: ${response.statusText}`);
  }

  const data = await response.json();
  return data.uuid;
}
