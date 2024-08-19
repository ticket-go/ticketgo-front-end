import { Typography } from "@/components/typography";
import { MainEvents } from "../_components/main-events";

export default function Events() {
  return (
    <main className="flex flex-col justify- items-start w-full h-screen bg-background ">
      <section className="flex flex-col w-full h-full py-8 px-20 gap-4">
        <Typography fontWeight={"bold"}>Todos os eventos</Typography>
        <MainEvents />
      </section>
    </main>
  );
}
