import { z } from "zod";

export const createReviewSchema = z.object({
  propertyId: z.string().min(1, "Property ID is required"),
  rating: z
    .number({ error: "Please select a rating" })
    .min(1, "Rating must be at least 1 star")
    .max(5, "Rating cannot exceed 5 stars"),
  review: z
    .string()
    .min(5, "Review must be at least 5 characters long")
    .max(500, "Review cannot exceed 500 characters"),
});

export type TCreateReviewInput = z.infer<typeof createReviewSchema>;