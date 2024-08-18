import { MainEvents } from "./_components/main-events";
import { MainHeroEvent } from "./_components/main-hero-event";
import { EventCategories } from "./_components/main-category-event";
import { Carousel } from "@/components/carousel";
import { Event } from "@/components/event";
import { Typography } from "@/components/typography";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center w-full min-h-screen bg-background mt-8 mb-8">
      <section className="w-full h-full py-8">
        <MainHeroEvent />
      </section>

      <section className="w-full h-full py-8 px-10">
        <EventCategories />
      </section>

      <section className="flex flex-col w-full h-full py-8 px-20 gap-4">
        <Typography fontWeight={"bold"}>Eventos do mês</Typography>
        <MainEvents />
      </section>

      <section className="py-8 px-20">
        <Typography variant="h4" fontWeight="extrabold">
          Eventos em destaque
        </Typography>
        <Carousel />
      </section>

      <section className="flex flex-col w-full h-full py-8 px-20 gap-4">
        <Typography fontWeight={"bold"}>Eventos mais badalados</Typography>
        <MainEvents />
      </section>

      <section className="flex flex-col w-full h-full py-8 px-20 gap-4">
        <Typography fontWeight={"bold"}>Promoções</Typography>
        <MainEvents />
      </section>
    </main>
  );
}
