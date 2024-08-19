import { HeroEvent } from "@/components/hero-event";
import type { Event } from "@/types/event"; // Ensure this matches the type of events you expect
import { fetchEvents } from "@/actions/fetch-events";

export async function MainHeroEvent() {
  const events: Event[] = await fetchEvents();

  return (
    <div className="w-full h-full">
      {/* Handle cases where events might be empty */}
      {events.length > 0 ? (
        events.map((event) => <HeroEvent key={event.uuid} event={event} />)
      ) : (
        <p>No events found.</p> // Optional: handle empty state
      )}
    </div>
  );
}
