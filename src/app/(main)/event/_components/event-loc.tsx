import { Typography } from "@/components/typography";
import Image from "next/image";


interface EventAddressProps {
  city: string;
  street: string;
  number: number;
  district?: string; 
  state: string;
  zip_code: string | undefined;
}

export default function EventLoc({ city, street, number, district, state, zip_code }: EventAddressProps) {
 
  const address = `${street}, ${number}, ${district || ''}, ${city}, ${state}, ${zip_code || ''}`;

  const encodedAddress = encodeURIComponent(address);

  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS_API_KEY}&q=${encodedAddress}`;

  return (
    <div className="w-full rounded-md shadow-lg flex flex-col p-6 bg-gradient-block gap-4">
      <div className="flex gap-6 items-center justify-between">
        <div className="flex flex-col gap-4">
          <Typography fontWeight={"bold"} color={"white"} variant={"h4"}>Localização</Typography>
          <div className="flex items-center gap-6 ">
            <div className="flex justify-center item-center p-6 bg-gradient-circle rounded-full">
              <Image
                src={"/assets/images/loc_icon.svg"}
                alt={`icon`}
                width={25}
                height={25}
                className="rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <Typography fontWeight={"medium"} variant={"h5"}>{city}</Typography>
              <Typography fontWeight={"light"} variant={"h5"}>
                {street}, {number}, {district || "Não informado"}, {city}, {state}, {zip_code || "Não informado"}
              </Typography>
            </div>
          </div>
        </div>
        <iframe
          className="rounded-md"
          src={mapUrl}
          width="450"
          height="200"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
