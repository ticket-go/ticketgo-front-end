import { fetchEvents } from "@/actions/fetch-events";
import SearchResultsClient from "./search-results-client"; 

export default async function SearchResults() {
  const events = await fetchEvents(); 

  return <SearchResultsClient events={events}/>
}
