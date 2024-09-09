"use client"; 

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MainEvents } from "../_components/main-events";
import { Section } from "@/components/section";
import { Typography } from "@/components/typography";
import { FilterEvents } from "../_components/filter";

export function SearchResults({ events }: { events: any[] }) {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [filteredEvents, setFilteredEvents] = useState(events);

  useEffect(() => {
    if (query) {
      const filtered = events.filter(
        (event) =>
          event.name.toLowerCase().includes(query.toLowerCase()) ||
          event.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredEvents(filtered);
    }
  }, [query, events]);

  if (filteredEvents.length === 0) {
    return (
      <main className="flex flex-col justify-center items-center w-full min-h-screen bg-background">
        <Section className="flex flex-col gap-6">        
          <Typography variant={"h3"} fontWeight="bold">Nenhum evento encontrado para "{query}"</Typography>
        </Section>   
    </main>
    );
  }

  return (
    <main className="flex flex-col justify-center items-center w-full min-h-screen bg-background">
        <Section className="flex flex-col gap-6">
          <Typography variant={"h3"} fontWeight="bold">Enventos encontrados para "{query}":</Typography>
          <MainEvents events={filteredEvents} />
        </Section>   
    </main>
  );
}
