import { fetchEvents } from "@/actions/fetch-events";
import { MainEvents } from "../../_components/main-events";
import { Section } from "@/components/section";

export default async function EventsCategory({
  params,
}: {
  params: { category: string };
}) {
  const events = await fetchEvents();

  return (
    <main className="flex flex-col w-full min-h-screen bg-background ">
      <section className="py-10">
        <Section>
          <MainEvents events={events} category={params.category} />
        </Section>
      </section>
    </main>
  );
}
