"use server"

import { fetcher } from "@/lib/fetcher";
import { TLoginUser } from "@/types/auth.types";
import { cookies } from "next/headers";

export type TLoginResponse = {
  accessToken: string;
  userData: {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    status: string;
    profilePhoto: string;
    createdAt: string;
    updatedAt: string;
  };
};

export const loginUser = async (data: TLoginUser) => {
  const res = await fetcher<TLoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (res.success) {
    const cookieStore = await cookies();
    cookieStore.set("accessToken", res.data.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
    });
  }
  return res;

  //TODO: role based redirect
};
