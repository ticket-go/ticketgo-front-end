import { MainEvents } from "./_components/main-events";
import { MainHeroEvent } from "./_components/main-hero-event";
import { EventCategories } from "./_components/main-category-event";
import { Carousel } from "@/components/carousel";
import { Typography } from "@/components/typography";
import { fetchEvents } from "@/actions/fetch-events";
import { Section } from "@/components/section";
import { Suspense } from "react";
import { Partner } from "@/components/partner";
import { SuccessNotification } from "./_components/success";


export default async function Home() {
  const events = await fetchEvents();

  const topEvents = events.filter((event) => event.is_top_event);
  const heroEvent = events.find((event) => event.is_hero_event);

  return (
    <main className="flex flex-col justify-center items-center w-full min-h-screen bg-background mt-20">

      <SuccessNotification/>

      {heroEvent && (
        <section className="w-full h-full py-8">
          <MainHeroEvent event={heroEvent} />
        </section>
      )}

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

      <Partner />

      <Section>
        <Typography fontWeight="bold">Promoções</Typography>
        <Suspense>
          <MainEvents events={events} />
        </Suspense>
      </Section>
    </main>
  );
}
