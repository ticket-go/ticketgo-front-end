import { HeroEvent } from "@/components/hero-event";
import type { Event } from "@/types/event";

interface MainHeroEventProps {
  isEventHero: Event;
}

export async function MainHeroEvent({
  isEventHero: eventHero,
}: MainHeroEventProps) {
  if (!eventHero.is_hero_event) {
    return null;
  }

  return (
    <div className="w-full h-full">
      <HeroEvent event={eventHero} />
    </div>
  );
}
