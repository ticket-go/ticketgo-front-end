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
    <div className="grid grid-cols-1 mobile:grid-cols-1 tab-port:grid-cols-2 tab-land:grid-cols-3 lg:grid-cols-4 gap-8 w-full"> 
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
