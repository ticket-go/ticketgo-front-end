"use server";

import { Ticket } from "@/types/ticket";
import { Event } from "@/types/event";
import { cookies } from "next/headers";

export async function createEventTicket(eventId: Event["uuid"]) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("access_token")?.value;

    const response = await fetch(
      `${process.env.API_HOST}/events/${eventId}/tickets/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create ticket");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
