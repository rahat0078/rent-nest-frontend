import { fetcher } from "@/lib/fetcher";
import { cookies } from "next/headers";

export type TGetMeResponse = {
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

export const getMe = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in",
      data: null
    };
  }
  const result = await fetcher<TGetMeResponse>("/api/auth/me", {
    headers: {
      Cookie: `accessToken=${accessToken.value}`,
    },
    cache: "no-store"
  });

  

  return result
};
