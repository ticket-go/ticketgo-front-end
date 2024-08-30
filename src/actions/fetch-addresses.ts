"use server";

import { Address } from "@/types/address";
import { cookies } from "next/headers";

export async function fetchAddresses(): Promise<Address[] | []> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("access_token")?.value;

    const response = await fetch(`${process.env.API_HOST}/addresses/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar endereços do usuário");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
  return [];
}
