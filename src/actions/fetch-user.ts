"use server";

import { revalidateTime } from "@/const/cache";
import { User } from "@/types/user";
import { cookies } from "next/headers";

export async function fetchUser(userId: string): Promise<User | {}> {
  try {
    const cookiesStore = cookies();
    const token = cookiesStore.get("access_token")?.value;
    const fetchOptions: RequestInit = {
      next: { tags: ["user", "address"], revalidate: revalidateTime },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (!token) {
      throw new Error("Token não encontrado");
    }

    const response = await fetch(
      `${process.env.API_HOST}/users/${userId}`,
      fetchOptions
    );

    if (!response.ok) {
      throw new Error("Falha ao buscar informações do usuário");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return {};
  }
}
