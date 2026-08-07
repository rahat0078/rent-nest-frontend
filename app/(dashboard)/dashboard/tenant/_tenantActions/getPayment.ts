"use server";

import { cookies } from "next/headers";
import { fetcher } from "@/lib/fetcher";
import { TPaymentItem } from "@/types/payments";

export const getPayment = async (id: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in",
      data: null,
    };
  }

  const res = await fetcher<TPaymentItem>(`/api/payments/me/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
    cache: "no-store",
  });

  return res;
};
