"use server";

import { revalidateTime } from "@/const/cache";
import { Event } from "../types/event";

export interface fetchEventsRequest {
  page?: number;
  page_size?: number;
  innerUrl?: string;
}
export interface FetchEventsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Event[];
}

export async function fetchEvents({
  page,
  page_size,
  innerUrl,
}: fetchEventsRequest): Promise<FetchEventsResponse | null> {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    const fetchOptions: RequestInit = {
      next: { tags: ["events"], revalidate: revalidateTime },
      method: "GET",
      headers,
    };

    let url: URL;

    if (innerUrl) {
      url = new URL(innerUrl);
    } else {
      url = new URL(`${process.env.API_HOST}/events/`);
      const params: Record<string, string> = {};

      if (page !== undefined) {
        params.page = page.toString();
      }
      if (page_size !== undefined) {
        params.page_size = page_size.toString();
      }

      url.search = new URLSearchParams(params).toString();
    }

    const response = await fetch(url.href, fetchOptions);

    if (!response.ok) {
      console.error("Failed to fetch events:", response.statusText);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching events:", error);
    return null;
  }
}

export async function fetchSimpleEvents(): Promise<Event[]> {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    const fetchOptions: RequestInit = {
      next: { tags: ["events"], revalidate: revalidateTime },
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
