import { fetchEvents } from "@/actions/fetch-events";
import { EventCard } from "@/components/event-card";
import { Typography } from "@/components/typography";

export async function MainEvents() {
  const events = await fetchEvents();

  return (
    <div className="flex flex-col gap-3">
      <Typography color={"black"} fontWeight={"bold"} className="px-2">
        Eventos destaques
      </Typography>
      <div className="grid grid-cols-4 w-fit gap-6">
        {events &&
          events.length > 0 &&
          events.map((event) => (
            <EventCard
              key={event.uuid}
              title={event.name}
              image={event.image}
              date={event.date}
              hour={event.time}
              location={event.address.city}
            />
          ))}
      </div>
    </div>
  );
}
