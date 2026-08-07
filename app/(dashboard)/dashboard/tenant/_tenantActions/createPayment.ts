"use server";

import { fetcher } from "@/lib/fetcher";
import { TCreatePaymentResponse } from "@/types/payments";
import { cookies } from "next/headers";

export const createPayment = async (rentRequestId: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "User not logged in", data: null };
  }

  const res = await fetcher<TCreatePaymentResponse>("/api/payments/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
    body: JSON.stringify({ rentRequestId }),
  });

  return res;
};
