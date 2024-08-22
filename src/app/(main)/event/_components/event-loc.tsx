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

            <div className="flex gap-6 items-center justify-between">
              <div className="flex flex-col gap-4">
              <Typography fontWeight={"bold"} color={"white"} variant={"h4"}>Localização</Typography>
                <div className="flex items-center gap-6 ">
                    <div className="flex justify-center item-center p-6 bg-gradient-circle rounded-full">
                      <Image
                        src={"/assets/images/loc_icon.svg"}
                        alt={`Imagem do evento ${event.name}`}
                        width={25}
                        height={25}
                        className="rounded-md"
                      />
                    </div>
                    <div className="flex flex-col">
                      <Typography fontWeight={"medium"} variant={"h5"}>{event.address.city}</Typography>
                      <Typography fontWeight={"light"} variant={"h5"}>{event.address.street}, {event.address.number}, {event.address.district}, {event.address.city}, {event.address.state}, {event.address.zip_code}  </Typography>
                    </div>
                </div>
              </div>
              <iframe className="rounded-md"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14655.203892597377!2d-46.633308!3d-23.550520!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5c8b5a5f24d7%3A0x8e3b7b65d21f788d!2sSão%20Paulo%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1625863376737!5m2!1spt-BR!2sbr"
                width="450"
                height="200"
                loading="lazy"
              ></iframe>
            </div>
        </Suspense>
      )}
    </div>
  );
}