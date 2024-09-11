import { Section } from "@/components/section";
import { Typography } from "@/components/typography";
import { Suspense } from "react";
import { EventCategories } from "../_components/main-category-event";
import { MainEvents } from "../_components/main-events";
import { fetchEvents } from "@/actions/fetch-events";

export default async function Events() {
  const events = await fetchEvents();

  return (
    <main className="flex flex-col justify-center items-center w-full min-h-screen bg-background mt-20">
      <Section>
        <Suspense>
          <EventCategories />
        </Suspense>
      </Section>

      <Section>
        <Typography fontWeight="bold">Eventos do mês</Typography>
        <Suspense>
          <MainEvents events={events} />
        </Suspense>
      </Section>

      <Section>
        <Typography fontWeight="bold">Eventos mais badalados</Typography>
        <Suspense>
          <MainEvents events={events} />
        </Suspense>
      </Section>

      <Section>
        <Typography fontWeight="bold">Promoções</Typography>
        <Suspense>
          <MainEvents events={events} />
        </Suspense>
      </Section>
    </main>
  );
}
