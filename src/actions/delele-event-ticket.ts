"use server";

import { Event } from "@/types/event";
import { Ticket } from "@/types/ticket";
import { cookies } from "next/headers";

export async function deleteEventTicket(
  eventId: Event["uuid"],
  ticketId: Ticket["uuid"]
): Promise<{ success: boolean }> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      throw new Error("No access token found");
    }

    const response = await fetch(
      `${process.env.API_HOST}/events/${eventId}/tickets/${ticketId}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          eventId,
          ticketId,
        }),
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        `Failed to create ticket: ${errorResponse.message || "Unknown error"}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
