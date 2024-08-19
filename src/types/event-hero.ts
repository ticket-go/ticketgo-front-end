import { Event } from "@/types/event";

export interface HeroEvent
  extends Pick<
    Event,
    "uuid" | "name" | "description" | "time" | "image" | "date" | "address"
  > {}
