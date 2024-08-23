"use server";

import { Purchase } from "@/types/purchase";
import { cookies } from "next/headers";

export async function fetchPurchases(): Promise<Purchase[] | []> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      throw new Error("No token found");
    }

    const response = await fetch(`${process.env.API_HOST}/purchases/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching purchases", error);
    return [];
  }
}
