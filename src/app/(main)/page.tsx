import { MainEvents } from "./_components/main-events";
import { MainHeroEvent } from "./_components/main-hero-event";
import { EventCategories } from "./_components/main-category-event";
import { Carousel } from "@/components/carousel";
import { Typography } from "@/components/typography";
import { fetchEvents } from "@/actions/fetch-events";
import { Section } from "@/components/section";
import { Suspense } from "react";

export default async function Home() {
  const events = await fetchEvents();
  const topEvents = events.filter((event) => event.is_top_event);

  return (
    <main className="flex flex-col justify-center items-center w-full min-h-screen bg-background mt-8 mb-8">
      <div className="w-full">
        <section className="w-full h-full py-8">
          {topEvents.length > 0 && <MainHeroEvent event={topEvents[0]} />}
        </section>

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
          <Typography variant="h4" fontWeight="extrabold">
            Eventos em destaque
          </Typography>
          <Suspense>
            <Carousel events={topEvents} />
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
      </div>
    </main>
  );
}
