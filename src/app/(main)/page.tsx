import { MainEvents } from "./_components/main-events";
import { MainHeroEvent } from "./_components/main-hero-event";
import { EventCategories } from "./_components/main-category-event";
import { Carousel } from "@/components/carousel";
import { Typography } from "@/components/typography";
import { fetchEvents } from "@/actions/fetch-events";
import { Suspense } from "react";

export default async function Home() {
  const events = await fetchEvents();
  const heroEvent = events.find((event) => event.is_hero_event);
  const topEvents = events.filter((event) => event.is_top_event);

  return (
    <main className="flex flex-col justify-center items-center w-full min-h-screen bg-background mt-8 mb-8">
      <section className="w-full h-full py-8">
        {heroEvent ? (
          <MainHeroEvent isEventHero={heroEvent} />
        ) : (
          <Typography>Nenhum evento destacado no momento</Typography>
        )}
      </section>

      <section className="w-full h-full py-8 px-10">
        <Suspense>
          <EventCategories />
        </Suspense>
      </section>

      <section className="flex flex-col w-full h-full py-8 px-20 gap-4">
        <Typography fontWeight={"bold"}>Eventos do mês</Typography>
        <Suspense>
          <MainEvents events={events} />
        </Suspense>
      </section>

      {topEvents.length > 0 ? (
        <section className="py-8 px-20">
          <Typography variant="h4" fontWeight="extrabold">
            Eventos em destaque
          </Typography>
          <Suspense>
            <Carousel events={topEvents} />
          </Suspense>
        </section>
      ) : (
        <section className="py-8 px-20">
          <Typography>Nenhum evento em destaque no momento</Typography>
        </section>
      )}

      <section className="flex flex-col w-full h-full py-8 px-20 gap-4">
        <Typography fontWeight={"bold"}>Eventos mais badalados</Typography>
        <Suspense>
          <MainEvents events={events} />
        </Suspense>
      </section>

      <section className="flex flex-col w-full h-full py-8 px-20 gap-4">
        <Typography fontWeight={"bold"}>Promoções</Typography>
        <Suspense>
          <MainEvents events={events} />
        </Suspense>
      </section>
    </main>
  );
}
