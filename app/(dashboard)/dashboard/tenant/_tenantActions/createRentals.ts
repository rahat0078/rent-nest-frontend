"use server";

import { fetcher } from "@/lib/fetcher";
import { RentRequestFormData } from "@/schemas/rentRequest";
import { cookies } from "next/headers";

export const CreateRentalRequest = async (payload: RentRequestFormData) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "User not logged in", data: null };
  }

  try {
    // API Call
    const result = await fetcher("/api/rentals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify(payload),
    });

    return result; 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to submit rental request.",
      data: null,
    };
  }
};