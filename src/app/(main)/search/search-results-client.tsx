"use client"; // Declara que este é um Client Component

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MainEvents } from "../_components/main-events";
import { Section } from "@/components/section";

export default function SearchResultsClient({ events }: { events: any[] }) {
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
    return <div>Nenhum evento encontrado para "{query}"</div>;
  }

  return (
    <main className="flex flex-col justify-center items-center w-full min-h-screen bg-background mt-20">
      <div className="w-full">
        <Section>
          <MainEvents events={filteredEvents} />
        </Section>
      </div>
    </main>
  );
}
