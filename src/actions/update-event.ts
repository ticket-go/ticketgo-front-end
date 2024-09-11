"use server";

import { cookies } from "next/headers";

export async function updateEvent(
  eventId: string,
  formData: FormData
): Promise<void> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      throw new Error("Usuário não autenticado.");
    }

    const response = await fetch(`${process.env.API_HOST}/events/${eventId}/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Erro ao criar o evento.");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Erro ao enviar dados:", error);
    throw error;
  }
}
