"use server";

import { Event } from "@/types/event";
import { cookies } from "next/headers";

export async function fetchCreateEvent(data: Event): Promise<Event | void> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      throw new Error("Usuário não autenticado.");
    }

    const response = await fetch(`${process.env.API_HOST}/events/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.log(response);
      throw new Error("Erro ao criar evento");
    }

    const event = await response.json();
    return event;
  } catch (error) {
    console.error(error);
  }
}
