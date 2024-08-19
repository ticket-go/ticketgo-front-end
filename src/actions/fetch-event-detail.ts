"use server";

import { Event } from "../types/event";
import { cookies } from "next/headers";

export async function fetchEventDetail(eventId: string): Promise<Event | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("access_token")?.value;

    const response = await fetch(`${process.env.API_HOST}/events/${eventId}/`, {
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
    return data;
  } catch (error) {
    console.error("Error fetching events", error);
    return null;
  }
}
