"use server"

import { fetcher } from "@/lib/fetcher";
import { cookies } from "next/headers";

export const updateRentalRequestStatus = async (
  id: string,
  status: "APPROVED" | "REJECTED",
) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in",
      data: null,
    };
  }

  const res = await fetcher(`/api/landlord/rentals/requests/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
    body: JSON.stringify({ status }),
  });

  return res;
};
