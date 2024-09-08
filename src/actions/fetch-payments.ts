"use server";

import { Payment } from "@/types/payment";
import { cookies } from "next/headers";

export async function fetchPaymentsUser(
  paymentId: string
): Promise<Payment | void> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("access_token")?.value;
    const user = cookieStore.get("user")?.value;

    if (!user) {
      throw new Error("User data not found in cookies");
    }

    const response = await fetch(
      `${process.env.API_HOST}/payments/${paymentId}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
