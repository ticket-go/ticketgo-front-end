import { Event } from "@/types/event";

export interface HeroEvent
  extends Pick<
    Event,
    "name" | "description" | "time" | "image" | "date" | "address"
  > {
  // Aqui você pode adicionar campos adicionais específicos do HeroEvent, se necessário
}
