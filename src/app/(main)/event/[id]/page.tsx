import { fetchEventDetail } from "@/actions/fetch-event-detail";
import { Suspense } from "react";
import EventDesc from "../_components/event-desc";
import EventLoc from "../_components/event-loc";
import AddTicket from "../_components/add-ticket";

export default async function Event({ params }: { params: { id: string } }) {
  const { id } = params;
  const event = await fetchEventDetail(id);

  return (
    <main className="flex flex-col justify-center items-center h-screen bg-background p-4 gap-8 px-[300px]">
      {event && (
        <Suspense fallback={<div>Loading...</div>}>
    
          <EventDesc description={event.description} />

          <EventLoc
            city={event.address.city}
            street={event.address.street}
            number={event.address.number}
            district={event.address.district}
            state={event.address.state}
            zip_code={event.address.zip_code}
          />

          <div className="flex gap-6 w-full">
            <AddTicket/>
            <AddTicket/>
          </div>
          
        </Suspense>
      )}
    </main>
  );
}
