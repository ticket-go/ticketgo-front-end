import { MainEvents } from "./_components/main-events";
import { MainHeroEvent } from "./_components/main-hero-event";
import { EventCategories } from "./_components/main-category-event";
import { Carousel } from "@/components/carousel";
import { Typography } from "@/components/typography";
import { Section } from "@/components/section";
import { Suspense } from "react";
import { Partner } from "@/components/partner";
import { SuccessNotification } from "./_components/success";
import { fetchEvents, fetchSimpleEvents } from "@/actions/fetch-events";

export default async function Home() {
  const events = await fetchSimpleEvents();
  
  const topEvents = events.filter((event) => event.is_top_event);
  const heroEvent = events.find((event) => event.is_hero_event);
  return (
    <main className="flex flex-col justify-center items-center w-full min-h-screen bg-background mt-20">
      <SuccessNotification />

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
        <Typography fontWeight="bold">Promoções</Typography>
        <Suspense>
          <MainEvents fetchData={() => fetchEvents({})} />
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
          <MainEvents fetchData={() => fetchEvents({})} />
        </Suspense>
      </Section>

      <Partner.Root>
        <Partner.Content>
          <Partner.Text text="Seja nosso parceiro(a)" />
          <Partner.Text
            text="Tenha seu evento em nossa plataforma!"
            className="text-center text-[24px] mobile:text-[18px] font-semibold"
          />
        </Partner.Content>
        <Partner.Action title="Crie uma conta" href="/register" />
      </Partner.Root>

      <Section>
        <Suspense>
          <MainEvents fetchData={() => fetchEvents({})} />
        </Suspense>
      </Section>

      <Partner.Root>
        <Partner.Content>
          <Partner.Text
            text="Evite dor de cabeça, compre com segurança"
            className="text-center"
          />
          <Partner.Text
            text="Comprando pelo nosso site oficial você garante a legitimidade do seu ingresso."
            className="text-center text-[24px] mobile:text-[18px] font-semibold"
          />
        </Partner.Content>
      </Partner.Root>

      <Section>
        <Typography fontWeight="bold">Outros</Typography>
        <Suspense>
          <MainEvents fetchData={() => fetchEvents({})} />
        </Suspense>
      </Section>
    </main>
  );
}
