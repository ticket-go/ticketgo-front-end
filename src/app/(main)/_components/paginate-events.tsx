"use client";

import { useState, useEffect } from "react";
import { Event } from "@/types/event";
import { fetchEvents } from "@/actions/fetch-events";
import { EventCard } from "@/components/event-card";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/typography";

interface PaginatedListProps {
  initialItems: Event[];
  totalItems: number;
  initialPaginatedUrl: string;
}

export function PaginatedList({
  initialItems,
  totalItems,
  initialPaginatedUrl,
}: PaginatedListProps) {
  const [items, setItems] = useState<Event[]>(initialItems);
  const [isLoading, setIsLoading] = useState(false);
  const [paginatedNextUrl, setPaginatedNextUrl] =
    useState<string>(initialPaginatedUrl);

  const fetchMoreItems = async () => {
    if (isLoading || items.length >= totalItems || !paginatedNextUrl) {
      return;
    }

    setIsLoading(true);

    const data = await fetchEvents({ innerUrl: paginatedNextUrl });

    if (data) {
      const newItems = data.results || [];
      const newNextUrl = data.next || "";

      setPaginatedNextUrl(newNextUrl);
      setItems((prevItems) => [...prevItems, ...newItems]);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    setItems(initialItems);
    setPaginatedNextUrl(initialPaginatedUrl);
  }, [initialItems, initialPaginatedUrl]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 mobile:grid-cols-1 tab-port:grid-cols-2 tab-land:grid-cols-3 lg:grid-cols-5 gap-8">
        {items.map((item) => (
          <EventCard key={item.uuid} event={item} />
        ))}
      </div>

      {paginatedNextUrl && (
        <div className="flex justify-center mt-10">
          <Button
            onClick={fetchMoreItems}
            className="h-12 bg-[#E85AFF] hover:bg-purple/80 
           py-2 px-4 rounded"
            disabled={isLoading}
          >
            <Typography variant={"h6"}>
              {isLoading ? "Carregando..." : "Ver mais"}
            </Typography>
          </Button>
        </div>
      )}
    </div>
  );
}
