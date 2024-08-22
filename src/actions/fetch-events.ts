"use server";

import { Event } from "../types/event";

export async function fetchEvents(): Promise<Event[]> {
  const response = await fetch(`${process.env.API_HOST}/events/`);
  const data = await response.json();
  return data;
}
