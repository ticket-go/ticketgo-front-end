import { Event } from "@/types/event";
import {
  fetchEventsRequest,
  FetchEventsResponse,
} from "@/actions/fetch-events";
import { PaginatedList } from "./paginate-events";

interface MainEventsProps {
  events?: Event[];
  fetchData: ({
    page,
    page_size,
  }: fetchEventsRequest) => Promise<FetchEventsResponse | null>;
}

export async function MainEvents({ fetchData }: MainEventsProps) {
  try {
    const data = await fetchData({ page: 1, page_size: 10 });
    const itemsCount = data?.count || 0;
    const events: Event[] = data?.results ?? [];

    if (events.length === 0) {
      return null;
    }

    return (
      <PaginatedList
        initialItems={events}
        totalItems={itemsCount}
        initialPaginatedUrl={data?.next || ""}
      />
    );
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return <p>Failed to load events.</p>;
  }
}
