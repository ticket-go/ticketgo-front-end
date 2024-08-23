"use server";

import { fetcher } from "@/lib/utils";
import { Event } from "../types/event";

export async function fetchCreateEvent(data: Event): Promise<Event[]> {
  try {
    const response = await fetcher(`${process.env.API_HOST}/events/`);

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return response.json(); // Ensure this returns an array of Event objects
  } catch (error) {
    console.error("Error fetching events:", error);
    return []; // Return an empty array in case of error
  }
}
