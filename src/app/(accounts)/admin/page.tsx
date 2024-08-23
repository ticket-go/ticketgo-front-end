import { Typography } from "@/components/typography";
import { CreateEventForm } from "./_components/create-event-form";

export default function Admin() {
  return (
    <main className="flex flex-col justify-center items-center w-full min-h-screen bg-background px-80 py-10 mt-20">
      <CreateEventForm />
    </main>
  );
}
