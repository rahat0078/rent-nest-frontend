"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  value: number;
  onChange: (rating: number) => void;
  disabled?: boolean;
  error?: string;
}

export function StarRating({
  value,
  onChange,
  disabled = false,
  error,
}: StarRatingProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => !disabled && onChange(star)}
            disabled={disabled}
            className={cn(
              "transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded",
              disabled
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer hover:scale-110",
            )}
            aria-label={`Rate ${star} stars`}
          >
            <Star
              className={cn(
                "w-8 h-8 transition-all",
                star <= value
                  ? "fill-primary text-primary"
                  : "text-muted-foreground",
              )}
            />
          </button>
        ))}
      </div>
      {error && <span className="text-sm text-destructive">{error}</span>}
    </div>
  );
}
