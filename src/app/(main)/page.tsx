import { Carousel } from "@/components/carousel";
import { MainEvents } from "./_components/main-events";

export default async function Home() {
  return (
    <main className="relative flex flex-col justify-center items-center min-h-screen bg-background">
      <Carousel />
      <div className="py-8 mt-20">
        <MainEvents />
      </div>
    </main>
  );
}
