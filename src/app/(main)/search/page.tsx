import { fetchEvents } from "@/actions/fetch-events";
import { SearchResults } from "./search-results";


export default async function SearchResultsPage() {  
  const events = await fetchEvents(); 

  return <SearchResults events={events}/>; 

}
