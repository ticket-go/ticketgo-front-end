'use client';

import { useState, useEffect } from "react";
import { EventCard } from "@/components/event-card";
import { Event } from "@/types/event";
import { LoadingSpinner } from "@/components/loading-spinner"; 
import { Button } from "@/components/button"; 

interface MainEventsProps {
  category?: string;
  name?: string;
}

export function MainEvents({ category, name }: MainEventsProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); 
  const [loadingMore, setLoadingMore] = useState(false); 
  const eventsPerPage = 5;

  const fetchEvents = async (page: number) => {
    try {
      let url = `${process.env.NEXT_PUBLIC_API_HOST}/events/?page=${page}&page_size=${eventsPerPage}`;

      if (category) {
        url += `&category=${category}`;
      }
      if (name) {
        url += `&name=${name}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      setEvents((prevEvents) => [...prevEvents, ...data.results]); 
      setTotalPages(Math.ceil(data.count / eventsPerPage));
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents(currentPage); 
  }, [category, name]);

  const loadMoreEvents = async () => {
    if (currentPage < totalPages) {
      setLoadingMore(true); 
      await fetchEvents(currentPage + 1); 
      setCurrentPage((prevPage) => prevPage + 1);
      setLoadingMore(false); 
    }
  };

  return (
    <div>
      <div>
        <div className="grid grid-cols-1 mobile:grid-cols-1 tab-port:grid-cols-2 tab-land:grid-cols-3 lg:grid-cols-5 gap-8 w-full">
          {events.length > 0 ? (
            events.map((event) => (
              <EventCard event={event} key={event.uuid} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              Carregando eventos...
            </div>
          )}
        </div>

        {currentPage < totalPages && (
          <div className="flex justify-center mt-4">
            {!loadingMore ? ( 
              <Button
                text="VER MAIS" 
                onClick={loadMoreEvents} 
                className="px-4 py-2 w-[25%] h-[70px] bg-purple text-white hover:bg-purple-dark tab-land:w-[50%] tab-port:w-[50%] mobile:w-[60%]" 
                textColor="text-white" 
                fontWeight="bold" 
              />
            ) : (
              <LoadingSpinner isLoading={loadingMore} delay={0} /> 
            )}
          </div>
        )}
      </div>
    </div>
  );
}
