"use server";

import { fetcher } from "@/lib/fetcher";
import { cookies } from "next/headers";

export interface TPropertyResponseLandlordOwn {
  id: string;
  landlordId: string;
  categoryId: string;
  title: string;
  description: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  rentAmount: number;
  sizeSqFt: number;
  images: string;
  createdAt: string;
  updatedAt: string;
  isAvailable: boolean;
  facilities: string[];
  rentalRequest?: {
    id: string;
    tenantId: string;
    propertyId: string;
    moveInDate: string;
    message: string;
    status: "PENDING" | "APPROVED" | "REJECTED" | "ACTIVE" | "COMPLETED";
    createdAt: string;
    updatedAt: string;
  }[];
}

export const getMyProperties = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in",
      data: null,
    };
  }
  const res = await fetcher<TPropertyResponseLandlordOwn[]>(
    "/api/landlord/properties/me",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      cache: "no-store",
    },
  );
  return res;
};
