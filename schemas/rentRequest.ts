
import z from "zod";

export const createRentRequest = z.object({
  propertyId: z.string(),
  moveInDate: z.coerce.date().refine((date) => date > new Date(), {
    message: "Move-in date must future",
  }),
  message: z.string().optional(),
});


export type RentRequestFormData = z.infer<typeof createRentRequest>