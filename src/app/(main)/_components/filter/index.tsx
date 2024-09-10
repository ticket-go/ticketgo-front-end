"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchBar } from "@/components/search-bar";
import { Typography } from "@/components/typography";
import { Event } from "@/types/event";
import { useEffect, useState } from "react";

interface FilterEventsProps {
  events: Event[];
  selectCategory?: Event["category_display"];
  selectLocation?: string;
  locations?: string[];
}

export function FilterEvents({
  events,
  selectCategory,
  selectLocation,
  locations,
}: FilterEventsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = events.filter((event) =>
        event.name.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  }, [searchQuery, events]);

  return (
    <div className="flex flex-col items-start w-full h-[100px] bg-background gap-4">
      <div className="flex items-center w-full gap-2">
        <Typography variant="h4" fontWeight="extrabold">
          {selectCategory ? `[${selectCategory}]` : "[Categoria]"}
        </Typography>
        <Typography variant="h4" fontWeight="extrabold">
          {selectLocation ? `no ${selectLocation}` : "Selecione a localização"}
        </Typography>
      </div>
      <div className="flex items-center justify-center w-full h-max gap-10">
        <Select>
          <SelectTrigger className="flex items-center w-[457px] h-16 border-[1px] border-[#A8A8A8] rounded">
            <SelectValue placeholder="Selecione um local" />
          </SelectTrigger>
          <SelectContent>
            {locations?.map((location) => (
              <SelectItem value={location} key={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <SearchBar
          placeholder="Digite o nome ou alguma informação sobre o evento."
          type="search"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="items-center w-full h-16"
        />
      </div>
    </div>
  );
}
