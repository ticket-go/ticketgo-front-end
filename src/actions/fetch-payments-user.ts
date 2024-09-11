"use server";

import { Payment } from "@/types/payment";
import { cookies } from "next/headers";

export async function fetchPaymentsUser(userId: string) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("access_token")?.value;

    const fetchOptions: RequestInit = {
      next: { tags: ["payments"], revalidate: 10 },
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(
      `${process.env.API_HOST}/payments/?user=${userId}`,
      fetchOptions
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

export async function fetchPaymentsDetail(
  paymentId: string
): Promise<Payment | void> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("access_token")?.value;

    const fetchOptions: RequestInit = {
      next: { tags: ["payments"], revalidate: 240 },
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(
      `${process.env.API_HOST}/payments/${paymentId}/`,
      fetchOptions
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
