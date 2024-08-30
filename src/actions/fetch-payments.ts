"use server";

import { Payment } from "@/types/payment";
import { cookies } from "next/headers";

export async function fetchPaymentsUser(): Promise<Payment[] | void> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("access_token")?.value;
    const user = cookieStore.get("user")?.value;

    if (!user) {
      throw new Error("User data not found in cookies");
    }

    const decodedUser = decodeURIComponent(user);
    const userData = JSON.parse(decodedUser);
    const userId = userData.user_id;

    console.log("User ID:", userId);

    if (!userId) {
      throw new Error("User ID not found in decoded user data");
    }

    const fetchOptions: RequestInit = {
      next: { tags: [`${userId}`] },
    };

    const response = await fetch(
      `${process.env.API_HOST}/payments/?user=${fetchOptions}`,
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
    return data || [];
  } catch (error) {
    console.error(error);
  }
}
