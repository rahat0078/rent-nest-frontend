"use server";

import { fetcher } from "@/lib/fetcher";
import { ROLE_DASHBOARDS } from "@/proxy";
import { TLoginUser } from "@/types/auth.types";
import { jwtDecode } from "jwt-decode";
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

interface CustomJwtPayload {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "LANDLORD" | "TENANT";
  iat?: number;
  exp?: number;
}

export const loginUser = async (data: TLoginUser, redirectTo?: string) => {

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
  const decoded = jwtDecode<CustomJwtPayload>(res.data.accessToken);
  const role = decoded.role;

  const defaultDashboard = ROLE_DASHBOARDS[role];

  let destination = defaultDashboard;

  if (redirectTo) {
    if (redirectTo.startsWith(defaultDashboard) || redirectTo.startsWith("/dashboard/profile")) {
      destination = redirectTo;
    }
  }

  return {
    ...res,
    destination,
  };

};
