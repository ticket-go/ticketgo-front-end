import { fetchEventDetail } from "@/actions/fetch-event-detail";
import { Suspense } from "react";
import EventDesc from "../_components/event-desc";

import AddTicket from "../_components/add-ticket";
import UserAdm from "../_components/user-adm";
import { MainHeroEvent } from "../../_components/main-hero-event";

export default async function Event({ params }: { params: { id: string } }) {
  const { id } = params;
  const event = await fetchEventDetail(id);

  return (
    <main className="flex flex-col justify-center items-center w-full min-h-screen bg-background mt-8 mb-8">
      <div className=" flex flex-col w-full py-8 px-[120px] gap-4">
        {event && (
          <Suspense fallback={<div>Loading...</div>}>
            <MainHeroEvent event={event} />
            <div className="flex gap-6 w-full">
              <AddTicket
                type="Inteira"
                price={event.ticket_value}
                available={event.tickets_available}
                sold={event.tickets_sold}
                parcels="10"
              />
              <AddTicket
                type="Meia"
                price={event.half_ticket_value}
                available={event.half_tickets_available}
                sold={event.half_ticket_quantity}
                parcels="10"
              />
            </div>
            <EventDesc description={event.description} />
            ds
            {/* <EventLoc
              
            /> */}
            <UserAdm event={event} />
          </Suspense>
        )}
      </div>
    </main>
  );
}
