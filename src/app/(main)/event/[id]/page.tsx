import { Typography } from "@/components/typography";
import { fetchEventDetail } from "@/actions/fetch-event-detail";
import type { Event } from "@/types/event"; // Import the Event type
import { Suspense } from "react";

export default async function Event({ params }: { params: { id: string } }) {
  const { id } = params;
  const event = await fetchEventDetail(id);

  return (
    <main className="flex flex-col justify-center items-center w-full h-screen bg-background p-4">
      {event && (
        <Suspense fallback={<div>Loading...</div>}>
          <Typography fontWeight={"bold"}>{event.uuid}</Typography>
          <Typography fontWeight={"medium"}>{event.name}</Typography>
          <Typography fontWeight={"medium"}>{event.description}</Typography>
          <Typography fontWeight={"medium"}>
            {event.category_display}
          </Typography>
          <Typography fontWeight={"medium"}>{event.address.city}</Typography>
        </Suspense>
      )}
    </main>
  );
}
