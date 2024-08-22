import { fetchEventDetail } from "@/actions/fetch-event-detail";
import { Suspense } from "react";
import EventDesc from "../_components/event-desc";
import EventLoc from "../_components/event-loc";
import EventAdm from "../_components/event-adm";
import AddTicket from "../_components/add-ticket";

export default async function Event({ params }: { params: { id: string } }) {
  const { id } = params;
  const event = await fetchEventDetail(id);

  return (
    <main className="flex flex-col justify-center items-center h-screen bg-background p-4 gap-8 px-[300px]">
      {event && (
        <Suspense fallback={<div>Loading...</div>}>
    
          <EventDesc params={params} />
          <EventLoc params={params} />
          <EventAdm params={params} />

          <div className="flex gap-6 w-full">
            <AddTicket/>
            <AddTicket/>
          </div>

        </Suspense>
      )}
    </main>
  );
}
