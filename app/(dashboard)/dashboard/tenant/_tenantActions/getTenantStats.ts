import { fetcher } from "@/lib/fetcher";
import { cookies } from "next/headers";

export interface TRentalStatTenant {
  totalRequests: number;
  approvedRequests: number;
  activeRentals: number;
  completedRentals: number;
}

export const getTenantRentalStat = async () => {
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
    const result = await fetcher<TRentalStatTenant>("/api/rentals/me/stats", {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });

    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to fetch rental requests.",
      data: {} as TRentalStatTenant,
    };
  }
};
