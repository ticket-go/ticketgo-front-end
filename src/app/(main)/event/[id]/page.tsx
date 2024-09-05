import { AddTicket } from "@/components/add-ticket";
import { Section } from "@/components/section";
import { fetchEventDetail } from "@/actions/fetch-event-detail";
import { HeroEvent } from "@/components/hero-event";

export default async function Event({ params }: { params: { id: string } }) {
  const { id } = params;
  const event = await fetchEventDetail(id);

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <main className="flex flex-col justify-center items-center w-full min-h-screen bg-background mt-8 mb-8">
      <div className="w-full">
        <section className="w-full h-full py-8">
          <HeroEvent event={event} isEventDetail={true} />
        </section>

        <Section>
          <div className="flex gap-6 w-full">
            <AddTicket type="Inteira" event={event} parcels="10" />
          </div>
        </Section>
      </div>
    </main>
  );
}
