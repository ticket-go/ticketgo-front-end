import { Typography } from "@/components/typography";
import { fetchEventDetail } from "@/actions/fetch-event-detail";
import { Suspense } from "react";

export default async function Event({ params }: { params: { id: string } }) {
  const { id } = params;
  const event = await fetchEventDetail(id);

  return (
    <div className="w-full rounded-md shadow-lg flex flex-col p-6 bg-gradient-block gap-4">
      {event && (
        <Suspense fallback={<div>Loading...</div>}>
            
            <Typography fontWeight={"bold"} color={"white"}>Descrição</Typography>
            <Typography fontWeight={"light"} color={"white"} variant={"h5"}>{event.description}</Typography>
         
        </Suspense>
      )}
    </div>
  );
}