"use server";

import { Event } from "@/types/event";
import { Ticket } from "@/types/ticket";
import { cookies } from "next/headers";

export async function createEventTicket(
  eventId: Event["uuid"],
  ticketData: {
    half_ticket: boolean;
    cart_payment: string;
  }
): Promise<Ticket | void> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      throw new Error("No access token found");
    }

    const response = await fetch(
      `${process.env.API_HOST}/events/${eventId}/tickets/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(ticketData),
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        `Failed to create ticket: ${errorResponse.message || "Unknown error"}`
      );
    }

    const data: Ticket = await response.json();
    return data.uuid ? data : undefined;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
