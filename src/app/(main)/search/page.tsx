import { fetchSimpleEvents } from "@/actions/fetch-events";
import { SearchResults } from "./search-results";

export default async function SearchResultsPage() {
  const events = await fetchSimpleEvents();

  return <SearchResults events={events} />;
}
