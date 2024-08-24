import { fetchEventDetail } from "@/actions/fetch-event-detail";
import { Suspense } from "react";
import EventDesc from "../_components/event-desc";
import EventLoc from "../_components/event-loc";
import AddTicket from "../_components/add-ticket";
import UserAdm from "../_components/user-adm";
import { MainHeroEvent } from "../../_components/main-hero-event";

export default async function Event({ params }: { params: { id: string } }) {
  const { id } = params;
  const event = await fetchEventDetail(id);
  console.log(event)

  return (
    <main className="flex flex-col justify-center items-center h-screen bg-background p-4 gap-8 px-[300px] mt-14">
      {event && (
        <Suspense fallback={<div>Loading...</div>}>
          
          <MainHeroEvent></MainHeroEvent>

          <div className="flex gap-6 w-full">
            <AddTicket type="Inteira" price={event.ticket_value} available={event.tickets_available} sold={event.tickets_sold} parcels="10"/>
            <AddTicket type="Meia" price={event.half_ticket_value} available={event.half_tickets_available} sold={event.half_ticket_quantity} parcels="10"/>
          </div>
          
          <EventDesc description={event.description} />

          <EventLoc
            city={event.address.city}
            street={event.address.street}
            number={event.address.number}
            district={event.address.district}
            state={event.address.state}
            zip_code={event.address.zip_code}
          />

          <UserAdm 
            city={event.uuid}
            street={event.address.street}
            number={event.address.number}
            district={event.address.district}
            state={event.address.state}
            zip_code={event.address.zip_code}
            organization={event.name}
            />
          
        </Suspense>
      )}
    </main>
  );
}
