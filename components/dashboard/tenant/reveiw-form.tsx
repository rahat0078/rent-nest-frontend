"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { StarRating } from "./StarRating";
import { createReviewSchema, TCreateReviewPayload } from "@/schemas/review";

interface ReviewFormProps {
  propertyId: string;
  onSubmitSuccess?: () => void;
  disabled?: boolean;
}

export function ReviewForm({
  propertyId,
  onSubmitSuccess,
  disabled = false,
}: ReviewFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm<TCreateReviewPayload>({
    resolver: zodResolver(createReviewSchema),
    defaultValues: {
      propertyId,
      rating: 0,
      review: "",
    },
  });

  const rating = watch("rating");

  const onSubmit = async (data: TCreateReviewPayload) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      setSubmitSuccess(true);
      reset();
      onSubmitSuccess?.();

      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "An error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg text-center">
        <p className="text-green-700 dark:text-green-300 font-semibold">
          Review submitted successfully!
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {submitError && (
        <div className="p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded text-sm text-red-700 dark:text-red-300">
          {submitError}
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground">
          Your Rating
        </label>
        <StarRating
          value={rating}
          onChange={(val: number) => setValue("rating", val, { shouldValidate: true })}
          disabled={disabled || isSubmitting}
        />
        {errors.rating && (
          <span className="text-sm text-destructive block">
            {errors.rating.message}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="review"
          className="text-sm font-semibold text-foreground"
        >
          Your Review
        </label>
        <textarea
          id="review"
          placeholder="Share your experience with this property..."
          disabled={disabled || isSubmitting}
          {...register("review")}
          className="w-full min-h-30 p-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed resize-none"
        />
        {errors.review && (
          <span className="text-sm text-destructive block">
            {errors.review.message}
          </span>
        )}
      </div>

      <Button
        type="submit"
        disabled={disabled || isSubmitting}
        className="w-full"
      >
        {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}