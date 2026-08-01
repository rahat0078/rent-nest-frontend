import { TMeta } from "./api";

export interface IProperty {
  id: string;
  landlordId: string;
  categoryId: string;

  title: string;
  description: string;

  rentAmount: number;
  bedrooms: number;
  bathrooms: number;
  sizeSqFt: number;

  location: string;
  images: string;
  facilities: string[];

  isAvailable: boolean;

  createdAt: string;
  updatedAt: string;

  category: {
    name: string;
    description: string;
  };

  landlord: {
    name: string;
    email: string;
    profilePhoto: string;
  };

  review: unknown[];
}

export type TPropertyData = {
  data: IProperty[];
  meta: TMeta;
};