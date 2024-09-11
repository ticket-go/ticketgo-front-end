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
  const { query, handleSearch, handleKeyDown } = useSearchBar();

  return (
    <div className="relative w-full h-full hidden lg:flex border-[1px] border-[#A8A8A8] rounded">
      <Input
        data-testid="header-search-input"
        type={type || "search"}
        placeholder={placeholder || "Buscar eventos"}
        value={query}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        className={cn([
          "pr-10 h-10 placeholder:dark:text-white placeholder:text-black",
          className,
        ])}
      />
      <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5" />
    </div>
  );
}
