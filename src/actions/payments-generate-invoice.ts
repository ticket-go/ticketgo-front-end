"use server";

import { cookies } from "next/headers";
import { Payment } from "@/types/payment";

export async function paymentGenerateInvoice(
  cartPaymentId: string
): Promise<Payment | void> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      throw new Error("Token não encontrado");
    }

    const response = await fetch(
      `${process.env.API_HOST}/payments/generate_invoice`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cart_payment: cartPaymentId }),
      }
    );

    if (!response.ok) {
      throw new Error(`Erro ao gerar fatura: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao gerar fatura:", error);
  }
}
