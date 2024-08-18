import { MainEvents } from "./_components/main-events";
import { MainHeroEvent } from "./_components/main-hero-event";
import { EventCategories } from "./_components/main-category-event";

export default function Home() {
  return (
    <main className=" flex flex-col justify-center items-center w-full min-h-screen bg-background mt-8 mb-8">
      <section className="py-8">
        <MainHeroEvent />
      </section>

      <section className="py-8 w-full h-full">
        <EventCategories />
      </section>

      <section className="py-8">
        <MainEvents />
      </section>
    </main>
  );
}
