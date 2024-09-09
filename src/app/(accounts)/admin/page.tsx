import { fetchAddresses } from "@/actions/fetch-addresses";
import { CreateEventForm } from "./_components/create-event-form";

export default async function Admin() {
  const addresses = await fetchAddresses();

  return (
    <main className="flex flex-col justify-center items-center w-full min-h-screen bg-background px-40 py-10 mt-20 mobile:px-6 mobile:py-6 mobile:mt-12 
    tab-port:px-8 tab-port:py-6 tab-port:mt-12 ">
      <CreateEventForm address={addresses} />
    </main>
  );
}
