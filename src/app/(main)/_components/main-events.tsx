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
    <div className="flex flex-col w-full h-full gap-3 p-4">
      <div className="flex flex-wrap w-full">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div
              className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
              key={event.uuid}
            >
              <EventCard event={event} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No events available
          </div>
        )}
      </div>
    </div>
  );
}
