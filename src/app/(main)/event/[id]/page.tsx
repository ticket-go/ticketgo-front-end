import { AddTicket } from "@/components/add-ticket";
import { Section } from "@/components/section";
import { fetchEventDetail } from "@/actions/fetch-event-detail";
import { HeroEvent } from "@/components/hero-event";
import { EventDesc } from "../_components/event-desc";
import { EventLocation } from "../_components/event-loc";
import UserAdm from "../_components/user-adm";
import { Singers } from "../_components/singers";
import { Typography } from "@/components/typography";

export default async function Event({ params }: { params: { id: string } }) {
  const { id } = params;
  const event = await fetchEventDetail(id);

  if (!event) {
    return <Typography>Event not found</Typography>;
  }

  return (
    <main className="flex flex-col justify-center items-center w-full min-h-screen bg-background mt-8 mb-8">
      <div className="w-full">
        <section className="w-full h-full py-8">
          <HeroEvent event={event} isEventDetail={true} />
        </section>

        <Section className="gap-10">
          <div className="flex gap-6 w-full">
            <AddTicket type="Inteira" event={event} parcels="10" />
            {event.half_tickets_available !== 0 && (
              <AddTicket type="Meia" event={event} parcels="10" />
            )}
          </div>
        </Section>

        <Singers />

        <Section className="gap-10">
          <EventDesc description={event.description} />

          <EventLocation event={event} />

          <UserAdm event={event} />
        </Section>
      </div>
    </main>
  );
}
