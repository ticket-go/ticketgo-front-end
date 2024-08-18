import { Carousel } from "@/components/carousel";
import { MainEvents } from "./_components/main-events";
import { MainHeroEvent } from "./_components/main-hero-event";

export default function Home() {
  return (
    <main className=" flex flex-col justify-center items-center min-h-screen bg-background">
      <section className="py-8"></section>
      <section className="py-8">
        <MainHeroEvent />
      </section>

      <section className="py-8">
        <MainEvents />
      </section>
    </main>
  );
}
