"use server";

import { fetcher } from "@/lib/fetcher";
import { TCreatePropertyInput } from "@/schemas/property";
import { cookies } from "next/headers";

export const createProperty = async (payload: TCreatePropertyInput) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in",
      data: null,
    };
  }
  const res = await fetcher<TCreatePropertyInput>("/api/landlord/properties", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
  });
  return res;
};
