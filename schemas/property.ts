import { z } from "zod";

export const createPropertySchema = z.object({
  categoryId: z.string().trim(),
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(255),
  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters"),
  location: z.string().trim().min(3, "Location is required").max(255),
  bedrooms: z.coerce.number().int().min(1, "Bedrooms must be at least 1"), // ✅ coerce যোগ করুন
  bathrooms: z.coerce.number().int().min(1, "Bathrooms must be at least 1"), // ✅
  rentAmount: z.coerce.number().int().positive("Rent amount must be greater than 0"), // ✅
  sizeSqFt: z.coerce.number().int().positive("Size must be greater than 0"), // ✅
  facilities: z.array(z.string().trim().min(1, "Facilities are required")),
  images: z.string().trim().url("Image must be a valid URL"),
  isAvailable: z.boolean().default(true).optional(),
});


export const updatePropertySchema = createPropertySchema.partial().extend({
  isAvailable: z.boolean().optional(),
});

export type TCreatePropertyInput = z.infer<typeof createPropertySchema>;
export type TUpdatePropertyInput = z.infer<typeof updatePropertySchema>;
