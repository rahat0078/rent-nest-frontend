"use server";

import { fetcher } from "@/lib/fetcher";
import { cookies } from "next/headers";

export interface TSingleRentalRequestResponse {
  id: string;
  tenantId: string;
  propertyId: string;
  moveInDate: string;
  message: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "ACTIVE" | "COMPLETED";
  createdAt: string;
  updatedAt: string;

  property: {
    id: string;
    title: string;
    description: string;
    location: string;
    rentAmount: number;
    bedrooms: number;
    bathrooms: number;
    sizeSqFt: number;
    facilities: string[];
    images: string;
    isAvailable: boolean;
    createdAt: string;

    category: {
      id: string;
      name: string;
      description: string;
    };

    landlord: {
      id: string;
      name: string;
      email: string;
      profilePhoto: string | null;
    };
  };
}

export const getSingleRentalRequest = async (id: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in",
      data: null,
    };
  }

  try {
    const result = await fetcher<TSingleRentalRequestResponse>(
      `/api/rentals/me/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      },
    );

    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to fetch rental requests.",
      data: null,
    };
  }
};
