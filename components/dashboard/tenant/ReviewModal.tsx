"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, MessageSquarePlus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { StarRating } from "./StarRating";
import { createReviewSchema, TCreateReviewInput } from "@/schemas/review";
import { createReview } from "@/app/(dashboard)/dashboard/tenant/_tenantActions/createReview";

interface ReviewModalProps {
  propertyId: string;
  propertyTitle: string;
}

export function ReviewModal({ propertyId, propertyTitle }: ReviewModalProps) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TCreateReviewInput>({
    resolver: zodResolver(createReviewSchema),
    defaultValues: {
      propertyId,
      rating: 0,
      review: "",
    },
  });

  const ratingValue = watch("rating");

  const onSubmit = async (data: TCreateReviewInput) => {
    try {
      const res = await createReview(data);

      if (res.success) {
        toast.success(res.message || "Review submitted successfully!");
        reset();
        setOpen(false);
      } else {
        toast.error(res.message || "Failed to submit review.");
      }
    } catch (error: unknown) {
      const msg =
        error instanceof Error ? error.message : "Something went wrong.";
      toast.error(msg);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="outline" size="sm" className="gap-2">
            <MessageSquarePlus className="h-4 w-4" />
            Write Review
          </Button>
        }
      />

      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Share your experience for{" "}
            <span className="font-semibold text-foreground">
              {propertyTitle}
            </span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          {/* Rating Field */}
          <div className="space-y-2">
            <Label>Rating</Label>
            <StarRating
              value={ratingValue}
              onChange={(val) =>
                setValue("rating", val, { shouldValidate: true })
              }
              disabled={isSubmitting}
            />
            {errors.rating && (
              <p className="text-xs text-destructive">
                {errors.rating.message}
              </p>
            )}
          </div>

          {/* Review Field */}
          <div className="space-y-2">
            <Label htmlFor="review">Your Review</Label>
            <Textarea
              id="review"
              placeholder="Tell us what you liked or disliked about this property..."
              disabled={isSubmitting}
              className="resize-none h-28"
              {...register("review")}
            />
            {errors.review && (
              <p className="text-xs text-destructive">
                {errors.review.message}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={() => {
                reset();
                setOpen(false);
              }}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Submit Review
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
