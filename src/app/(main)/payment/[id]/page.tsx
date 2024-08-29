import { createEventTicket } from "@/actions/create-event-ticket";
import { Typography } from "@/components/typography";

export default async function Payment({ params }: { params: { id: string } }) {
  const { id } = params;
  const eventId = id;

  const payment = await createEventTicket(eventId);

  return (
    <main className="flex justify-center items-center w-full min-h-screen bg-background">
      <div className="w-fit h-fit">
        <Typography variant={"h4"} fontWeight={"bold"}>
          Payment
        </Typography>
      </div>
    </main>
  );
}
