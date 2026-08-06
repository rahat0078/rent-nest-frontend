"use server"

import { fetcher } from "@/lib/fetcher";
import { IRentalRequest } from "@/types/rentalRequest";
import { cookies } from "next/headers";

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

  const res = await fetcher<IRentalRequest>(
    `/api/landlord/rentals/requests/${id}`,
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
