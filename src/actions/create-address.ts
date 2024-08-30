"use server";

import { Address } from "@/types/address";
import { cookies } from "next/headers";

export async function fetchCreateAddress(data: Address) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      throw new Error("Usuário não autenticado.");
    }

    const response = await fetch(`${process.env.API_HOST}/addresses/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar endereço");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
