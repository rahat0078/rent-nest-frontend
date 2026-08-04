"use server";

import { fetcher } from "@/lib/fetcher";
import { TUpdatePropertyInput } from "@/schemas/property";
import { cookies } from "next/headers";

export const updateProperty = async (
  id: string,
  data: TUpdatePropertyInput,
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
  const response = await fetcher<TUpdatePropertyInput>(
    `/api/landlord/properties/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    },
  );

  return response;
};
