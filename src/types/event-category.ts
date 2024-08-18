import { Event } from "@/types/event";

export interface EventCategory
  extends Pick<Event, "category" | "category_display"> {}
