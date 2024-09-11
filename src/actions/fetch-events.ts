"use server";

import { longerRevalidateTime } from "@/const/cache";
import { Event } from "../types/event";

export async function fetchEvents(): Promise<Event[]> {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    const fetchOptions: RequestInit = {
      next: { tags: ["events"], revalidate: longerRevalidateTime },
      method: "GET",
      headers,
    };

    const response = await fetch(
      `${process.env.API_HOST}/events/`,
      fetchOptions
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}
