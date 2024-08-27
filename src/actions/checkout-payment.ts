"use server";

import { Payment } from "@/types/payment";
import { cookies } from "next/headers";

export async function createPayment(
  payment: Payment
): Promise<Payment | undefined> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("access_token")?.value;

    const response = await fetch(`${process.env.API_HOST}/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Atuhorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payment),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
