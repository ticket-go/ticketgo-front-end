"use server";

import { Event } from "@/types/event";
import { cookies } from "next/headers";

const CATEGORIES = [
  { id: 1, name: "music" },
  { id: 2, name: "sports" },
  { id: 3, name: "entretainement" },
  { id: 4, name: "worksho" },
  { id: 5, name: "other" },
];

const STATUSES = [
  { id: 1, name: "scheduled" },
  { id: 2, name: "Em andamento" },
  { id: 3, name: "Concluído" },
];

export async function fetchCreateEvent(data: Event): Promise<void> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      throw new Error("Usuário não autenticado.");
    }

    const { image, ...newData } = data;
    if (newData.category === "") {
      const category = CATEGORIES.find((category) => category.id === 5);
      newData.category = category ? category.name : "Não informado";
    }

    if (newData.status === "") {
      const status = STATUSES.find((status) => status.id === 1);
      newData.status = status ? status.name : "Não informado";
    }

    const response = await fetch(`${process.env.API_HOST}/events/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newData),
    });

    const result = await response.json();
    if (!response.ok) {
      console.error(
        "Failed to create event:",
        result.message || "Unknown error"
      );
      throw new Error(result.message || "Failed to create event");
    }
    return result;
  } catch (error) {
    console.error(error);
  }
}
