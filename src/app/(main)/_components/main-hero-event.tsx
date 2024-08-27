import { HeroEvent } from "@/components/hero-event";
import { Event } from "@/types/event";

interface MainHeroEventProps {
  event: Event;
}

export function MainHeroEvent({ event }: MainHeroEventProps) {
  return (
    <div className="w-full h-full">
      <HeroEvent event={event} />
    </div>
  );
}
