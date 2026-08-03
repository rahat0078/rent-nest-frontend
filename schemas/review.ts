import { z } from 'zod'

export const reviewSchema = z.object({
  propertyId: z.string().min(1, 'Property ID is required'),
  rating: z.number().min(1, 'Rating is required').max(5, 'Rating must be between 1 and 5'),
  review: z.string().min(10, 'Review must be at least 10 characters').max(500, 'Review must be less than 500 characters'),
})

export type ReviewFormData = z.infer<typeof reviewSchema>