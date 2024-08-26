import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { useSearchBar } from "./useSearchBar";

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  type?: string;
  className?: string;
}

export function SearchBar({ placeholder, type, className }: SearchBarProps) {
  const { query, handleSearch } = useSearchBar();
  return (
    <div className="relative w-full h-full hidden lg:flex border-[1px] border-[#A8A8A8] rounded">
      <Input
        data-testid="header-search-input"
        type={type || "search"}
        placeholder={placeholder || "Buscar eventos"}
        value={query}
        onChange={(e) => handleSearch(e)}
        className={cn(["pr-10 h-10", className])}
      />
      <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
    </div>
  );
}
