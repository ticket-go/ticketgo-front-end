'use client';

import { useState, useEffect } from "react";
import { EventCard } from "@/components/event-card";
import { Event } from "@/types/event";
import { LoadingSpinner } from "@/components/loading-spinner"; 

interface MainEventsProps {
  category?: string;
  name?: string;
}

export function MainEvents({ category, name }: MainEventsProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); 
  const [loading, setLoading] = useState(false);
  const eventsPerPage = 5; 

  const fetchEvents = async (page: number) => {
    setLoading(true);
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
      setEvents(data.results); 
      setTotalPages(Math.ceil(data.count / eventsPerPage)); 
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(currentPage);
  }, [currentPage, category, name]);

  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <LoadingSpinner isLoading={loading} />
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 mobile:grid-cols-1 tab-port:grid-cols-2 tab-land:grid-cols-3 lg:grid-cols-5 gap-8 w-full">
            {events.length > 0 ? (
              events.map((event) => (
                <EventCard event={event} key={event.uuid} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                Não existem eventos disponíveis
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-4">
              <ul className="flex space-x-2">
                <li>
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    className={`px-4 py-2 border rounded ${
                      currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-white text-purple"
                    }`}
                    disabled={currentPage === 1}
                  >
                    ANTERIOR
                  </button>
                </li>

                {[...Array(totalPages)].map((_, index) => (
                  <li key={index}>
                    <button
                      onClick={() => paginate(index + 1)}
                      className={`px-4 py-2 border rounded ${
                        currentPage === index + 1 ? "bg-purple text-white" : "bg-white text-purple"
                      }`}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}

                <li>
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    className={`px-4 py-2 border rounded ${
                      currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-white text-purple"
                    }`}
                    disabled={currentPage === totalPages}
                  >
                    PRÓXIMO
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
