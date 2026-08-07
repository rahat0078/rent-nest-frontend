"use server";

import { cookies } from "next/headers";
import { fetcher } from "@/lib/fetcher";

export const confirmPayment = async (sessionId: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in",
    };
  }

  try {
    const result = await fetcher(`/api/payments/confirm`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({ sessionId }),
    });

    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to confirm payment",
    };
  }
};
