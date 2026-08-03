"use client";

import { Search, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface FilterOption {
  value: string;
  label: string;
}

interface SearchFilterProps {
  searchPlaceholder?: string;
  filter1Label?: string;
  filter1Options?: FilterOption[];
  filter2Label?: string;
  filter2Options?: FilterOption[];
}

export function SearchFilter({
  searchPlaceholder = "Search...",
  filter1Label = "Role",
  filter1Options = [],
  filter2Label = "Status",
  filter2Options = [],
}: SearchFilterProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-card p-3 rounded-lg border border-border shadow-2xs">
      <div className="relative flex-1 min-w-50">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={searchPlaceholder}
          className="pl-9 h-9 text-xs bg-background"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {filter1Options.length > 0 && (
          <Select defaultValue="ALL">
            <SelectTrigger className="h-9 text-xs w-32.5 bg-background">
              <SelectValue placeholder={filter1Label} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL" className="text-xs">
                All {filter1Label}s
              </SelectItem>
              {filter1Options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value} className="text-xs">
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {filter2Options.length > 0 && (
          <Select defaultValue="ALL">
            <SelectTrigger className="h-9 text-xs w-32.5 bg-background">
              <SelectValue placeholder={filter2Label} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL" className="text-xs">
                All {filter2Label}s
              </SelectItem>
              {filter2Options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value} className="text-xs">
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <Button variant="ghost" size="sm" className="h-9 text-xs gap-1 px-2.5">
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </Button>
      </div>
    </div>
  );
}