import { TMeta } from "./api";
import { IReview } from "./review";

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


export interface ISingleProperty {
  id: string;
  landlordId: string;
  categoryId: string;

  title: string;
  description: string;
  location: string;

  bedrooms: number;
  bathrooms: number;

  rentAmount: number;
  sizeSqFt: number;

  images: string;

  createdAt: string;
  updatedAt: string;

  isAvailable: boolean;

  facilities: string[];


  category: {
    id: string;
    name: string;
    description: string;
  };


  landlord: {
    id: string;
    name: string;
    email: string;
    profilePhoto: string;
  };


  review: IReview[];


  _count: {
    review: number;
  };


  averageRating: number;

  reviewCount: number;
}

export type TPropertyData = {
  data: IProperty[];
  meta: TMeta;
};