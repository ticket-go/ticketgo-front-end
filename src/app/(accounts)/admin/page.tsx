"use client";

import { fetchAddresses } from "@/actions/fetch-addresses";
import { CreateEventForm } from "./_components/create-event-form";

export default async function Admin() {
  const addresses = await fetchAddresses();

  return (
    <main className="flex flex-col justify-center items-center w-full min-h-screen bg-background px-80 py-10 mt-20">
      <CreateEventForm address={addresses} />
    </main>
  );
}
