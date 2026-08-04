import { fetcher } from "@/lib/fetcher";
import { ISingleProperty } from "@/types/property";

export const getSingleProperty = async (id: string) => {
  const result = await fetcher<ISingleProperty>(`/api/properties/${id}`, {
    next: {
      revalidate: 60 * 60,
      tags: ["get-single-property"],
    },
  });
  return result;
};
