import { fetcher } from "@/lib/fetcher";
import { TPropertyData } from "@/types/property";

export interface IPropertyQuery {
  page?: string | number;
  limit?: string | number;
  sortOrder?: "asc" | "desc" | string;
  sortBy?: string;
  searchTerm?: string;
  category?: string;
  rentAmount?: string | number;
  location?: string;
  sizeSqFt?: string | number;
  facilities?: string[] | string;
}

export const getAllProperty = async (query?: IPropertyQuery) => {
  if (!query || Object.keys(query).length === 0) {
    return fetcher<TPropertyData>("/api/properties");
  }

  const searchParams = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          if (item) searchParams.append(key, item.toString());
        });
      } else {
        searchParams.append(key, value.toString());
      }
    }
  });

  const queryString = searchParams.toString();
  const endpoint = queryString
    ? `/api/properties?${queryString}`
    : "/api/properties";

  return fetcher<TPropertyData>(endpoint, {
    next: {
      revalidate: 60 * 60,
      tags: ["properties"],
    },
  });
};
