"use server";

import { fetcher } from "@/lib/utils";
import { Event } from "../types/event";

export async function fetchEvents(): Promise<Event[]> {
  const response = await fetcher(`${process.env.API_HOST}/events/`);
  return response;
}
