import { EventCard } from "@/components/event-card";
import { Event } from "@/types/event";

interface MainEventsProps {
  events: Event[];
  category?: string;
}

export function MainEvents({ events, category }: MainEventsProps) {
  const filteredEvents = category
    ? events.filter((event) => event.category === category)
    : events;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 w-full">
      {filteredEvents.length > 0 ? (
        filteredEvents.map((event) => (
          <EventCard event={event} key={event.uuid} />
        ))
      ) : (
        <div className="col-span-full text-center text-gray-500">
          No events available
        </div>
      )}
    </div>
  );
}
