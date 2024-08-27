"use server";

import { Event } from "@/types/event";

export async function fetchCategoryByEvents(): Promise<Event[]> {
  try {
    const fetchOptions: RequestInit = {
      next: { tags: ["category"] },
    };

    const response = await fetch(
      `${process.env.API_HOST}/events/`,
      fetchOptions
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error("Failed to fetch events:", error);
    throw new Error("Failed to fetch events");
  }
}
