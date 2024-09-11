"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MainEvents } from "../_components/main-events";
import { Section } from "@/components/section";
import { Typography } from "@/components/typography";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchEvents } from "@/actions/fetch-events";
import { EventsBySearch } from "../_components/filter/events-by-search";

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
      <main className="flex flex-col justify-center items-center w-full h-fit bg-background">
        <Section className="h-[400px] w-full flex flex-col justify-center items-start gap-2">
          <Button
            className="flex items-center w-fit h-10 bg-background hover:bg-purple/10 border border-purple gap-2"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={18} className="text-white" />
            <Typography variant={"h5"} fontWeight="bold">
              Voltar
            </Typography>
          </Button>
          <Typography variant={"h3"} fontWeight="bold">
            Nenhum evento encontrado para "{query}"
          </Typography>
        </Section>
      </main>
    );
  }

  return (
    <main className="flex flex-col justify-center items-center w-full min-h-screen bg-background mt-20">
      <Section className="flex flex-col gap-6">
        <Typography variant={"h3"} fontWeight="bold">
          Eventos encontrados para "{query}":
        </Typography>
        <EventsBySearch events={filteredEvents} />
      </Section>
    </main>
  );
}
