import { fetchEvents } from "@/actions/fetch-events";
import { EventCard } from "@/components/event-card";
import { Typography } from "@/components/typography";

export async function MainEvents() {
  const events = await fetchEvents();

  return (
    <div className="flex flex-col w-full h-full gap-3">
      <div className="grid grid-cols-4 w-fit gap-6">
        {events &&
          events.length > 0 &&
          events.map((event) => (
            <EventCard
              key={event.uuid}
              title={event.name}
              date={event.date}
              hour={event.time}
              location={event.address.city}
            />
          ))}
      </div>
    </div>
  );
}
