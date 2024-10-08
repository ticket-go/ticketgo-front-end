import Image from "next/image";
import { Typography } from "@/components/typography";
import { Event } from "@/types/event";

interface EventLocationProps {
  event: Event;
}

export function EventLocation({ event }: EventLocationProps) {
  const address = `${event.address_data.street}, ${
    event.address_data.number
  }, ${event.address_data.district || ""}, ${event.address_data.city}, ${
    event.address_data.state
  }, ${event.address_data.zip_code || ""}`;

  const encodedAddress = encodeURIComponent(address);

  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS_API_KEY}&q=${encodedAddress}`;

  return (
    <div className="w-full rounded-md shadow-lg flex flex-col p-6 bg-backgroundCard gap-4">
      <div className="flex gap-6 items-center justify-between">
        <div className="flex flex-col gap-4">
          <Typography fontWeight={"bold"} color={"white"} variant={"h4"}>
            Localização
          </Typography>
          <div className="flex items-center gap-6">
            <div className="flex justify-center item-center p-6 rounded-full">
              <Image
                src={"/assets/images/icons/pin.webp"}
                alt={`icon`}
                width={50}
                height={50}
                className="rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <Typography fontWeight={"medium"} variant={"h5"}>
                {event.address_data.city}
              </Typography>
              <Typography fontWeight={"light"} variant={"h5"}>
                {event.address_data.street}, {event.address_data.number},{" "}
                {event.address_data.district || "Não informado"},{" "}
                {event.address_data.city}, {event.address_data.state},{" "}
                {event.address_data.zip_code || "Não informado"}
              </Typography>
            </div>
          </div>
        </div>
        <iframe
          className="rounded-md"
          src={mapUrl}
          width="450"
          height="200"
          allowFullScreen={true}
          name="Localização do evento"
        />
      </div>
    </div>
  );
}
