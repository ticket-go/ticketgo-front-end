"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function useSearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return {
    query,
    setQuery,
    handleSearch,
  };
}
