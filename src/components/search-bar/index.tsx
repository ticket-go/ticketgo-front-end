import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export function SearchBar() {
  return (
    <div className="relative w-full h-fit max-w-md hidden lg:flex">
      <Input
        data-testid="header-search-input"
        type="search"
        placeholder="Buscar eventos"
        className="pr-10 lg:h-10"
      />
      <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
    </div>
  );
}
