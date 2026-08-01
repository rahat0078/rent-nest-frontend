"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function PropertySearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize from URL
  const [search, setSearch] = useState(searchParams.get("searchTerm") ?? "");

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Preserve all existing params
      const params = new URLSearchParams(searchParams.toString());

      if (search.trim()) {
        params.set("searchTerm", search);
      } else {
        params.delete("searchTerm");
      }


      const newUrl = `/properties?${params.toString()}`;
      router.replace(newUrl, { scroll: false });
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, router, searchParams]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search properties by title or description..."
        className="w-full pl-10 pr-4 py-3 rounded-lg border bg-card text-foreground focus:ring-2 focus:ring-primary focus:outline-none transition-all"
      />
    </div>
  );
}