"use server";

import { fetcher } from "@/lib/fetcher";
import { TApiResponse } from "@/types/api";
import { cookies } from "next/headers";

// --- TYPES ---
export interface TUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "ADMIN" | "LANDLORD" | "TENANT";
  status: "ACTIVE" | "BANNED";
  profilePhoto?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TProperty {
  id: string;
  title: string;
  location: string;
  rentAmount: number;
  sizeSqFt: number;
  bedrooms: number;
  bathrooms: number;
  isAvailable: boolean;
  createdAt: string;
  category: {
    id: string;
    name: string;
  };
  landlord: {
    id: string;
    name: string;
    email: string;
    profilePhoto: string | null;
  };
}

export interface TRentalRequest {
  id: string;
  status: "PENDING" | "APPROVED" | "ACTIVE" | "REJECTED" | "COMPLETED";
  moveInDate: string;
  message: string;
  createdAt: string;
  tenant: {
    id: string;
    name: string;
    email: string;
    phone: string;
    profilePhoto: string | null;
  };
  property: {
    id: string;
    title: string;
    location: string;
    rentAmount: number;
    isAvailable: boolean;
    landlord: {
      id: string;
      name: string;
      email: string;
    };
  };
  payment: {
    id: string;
    amount: number;
    status: "PENDING" | "PAID" | "FAILED";
    transactionId: string;
    paymentMethod: string | null;
    paidAt: string | null;
  } | null;
}

// 1. Get All Users
export async function getAllUsers(): Promise<
  TApiResponse<{ users: TUser[]; totalUsers: number }>
> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in",
      data: {
        users: [],
        totalUsers: 0,
      },
    };
  }

  return fetcher<{ users: TUser[]; totalUsers: number }>("/api/admin/users", {
    headers: {
      Cookie: `accessToken=${accessToken.value}`,
    },
    next: {
      revalidate: 60,
      tags: ["all-users-admin"],
    },
  });
}

// 2. Update User Status
export async function updateUserStatus(
  userId: string,
  payload: { status: "ACTIVE" | "BANNED" },
): Promise<TApiResponse<TUser | null>> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in",
      data: null,
    };
  }
  return await fetcher<TUser>(`/api/admin/users/${userId}`, {
    headers: {
      Cookie: `accessToken=${accessToken.value}`,
      "Content-Type": "application/json",
    },
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

// 3. Get All Properties
export async function getAllProperties(): Promise<TApiResponse<TProperty[]>> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in",
      data: [],
    };
  }
  return await fetcher<TProperty[]>("/api/admin/properties", {
    headers: {
      Cookie: `accessToken=${accessToken.value}`,
    },
    next: {
      revalidate: 60 * 60,
      tags: ["properties"],
    },
  });
}

// 4. Get All Rental Requests
export async function getAllRentalRequests(): Promise<
  TApiResponse<TRentalRequest[]>
> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in",
      data: [],
    };
  }
  return await fetcher<TRentalRequest[]>("/api/admin/rentals", {
    headers: {
      Cookie: `accessToken=${accessToken.value}`,
    },
    next: {
      revalidate: 60 * 60,
      tags: ["properties"],
    },
  });
}
