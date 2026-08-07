"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { fetcher } from "@/lib/fetcher";
import { TCreateReviewPayload, TReviewResponseData } from "@/types/review";

export const createReview = async (payload: TCreateReviewPayload) => {
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
    const result = await fetcher<TReviewResponseData>("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify(payload),
    });

    revalidatePath("/dashboard/tenant/reviews");
    return result;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to submit review.";
    return {
      success: false,
      message,
      data: null,
    };
  }
};