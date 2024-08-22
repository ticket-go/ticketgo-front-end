import { Typography } from "@/components/typography";
import { fetchEventDetail } from "@/actions/fetch-event-detail";
import { Suspense } from "react";
import EventDesc from "../_components/event-desc";
import EventLoc from "../_components/event-loc";

export default async function Event({ params }: { params: { id: string } }) {
  const { id } = params;
  const event = await fetchEventDetail(id);

  return (
    <main className="flex flex-col justify-center items-center h-screen bg-background p-4 gap-24">
      {event && (
        <Suspense fallback={<div>Loading...</div>}>

            <EventDesc params={params} />
            <EventLoc params={params}/>
      
        </Suspense>
      )}
    </main>
  );
}
