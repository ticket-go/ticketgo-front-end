import { EventCard } from "@/components/event-card";
import { Event } from "@/types/event";

interface MainEventsProps {
  events: Event[];
}

export function MainEvents({ events }: MainEventsProps) {
  return (
    <div className="flex flex-col w-full h-full gap-3">
      <div className="grid grid-cols-4 w-full gap-6">
        {events && events.length > 0 ? (
          events.map((event) => <EventCard key={event.uuid} event={event} />)
        ) : (
          <div>No events available</div>
        )}
      </div>
    </div>
  );
}
