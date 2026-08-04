"use server";

import { fetcher } from "@/lib/fetcher";
import { TRentalRequestResponse } from "@/types/rentals";
import { cookies } from "next/headers";

export const getAllRentalRequest = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in",
      data: [] as TRentalRequestResponse[],
    };
  }

  try {
    const result = await fetcher<TRentalRequestResponse[]>("/api/rentals/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });

    return result;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to fetch rental requests.",
      data: [] as TRentalRequestResponse[], 
    };
  }
};