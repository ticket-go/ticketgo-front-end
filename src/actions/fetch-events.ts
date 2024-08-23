"use server";

import { fetcher } from "@/lib/utils";
import { Event } from "../types/event";

export async function fetchEvents(): Promise<Event[]> {
  try {
    const response = await fetcher(`${process.env.API_HOST}/events/`);

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}
