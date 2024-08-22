import { Typography } from "@/components/typography";
import { fetchEventDetail } from "@/actions/fetch-event-detail";
import { Suspense } from "react";
import Image from "next/image";

export default async function EventLoc({ params }: { params: { id: string } }) {
  const { id } = params;
  const event = await fetchEventDetail(id);

  return (
    <div className="w-full rounded-md shadow-lg flex flex-col p-6 bg-gradient-block gap-4">
      {event && (
        <Suspense fallback={<div>Loading...</div>}>
            
            <Typography fontWeight={"bold"} color={"white"}>Localização</Typography>

            <div className="flex gap-6 items-center">
              <div className="flex justify-center item-center p-6 bg-gradient-circle rounded-full">
                <Image
                  src={"/assets/images/loc_icon.svg"}
                  alt={`Imagem do evento ${event.name}`}
                  width={30}
                  height={30}
                  className="rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <Typography fontWeight={"medium"} variant={"h5"}>{event.address.city}</Typography>
                <Typography fontWeight={"light"} variant={"h5"}>{event.address.street}, {event.address.number}, {event.address.district}, {event.address.city}, {event.address.state}, {event.address.zip_code}  </Typography>
              </div>
            </div>
        </Suspense>
      )}
    </div>
  );
}