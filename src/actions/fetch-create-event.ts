"use server";

import { cookies } from "next/headers";

const CATEGORIES = [
  { id: 1, name: "music" },
  { id: 2, name: "sports" },
  { id: 3, name: "entertainment" },
  { id: 4, name: "workshop" },
  { id: 5, name: "other" },
];

const STATUSES = [
  { id: 1, name: "scheduled" },
  { id: 2, name: "In Progress" },
  { id: 3, name: "Completed" },
];

export async function fetchCreateEvent(formData: FormData): Promise<void> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      throw new Error("Usuário não autenticado.");
    }

    const response = await fetch(`${process.env.API_HOST}/events/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
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
    throw error;
  }
}
