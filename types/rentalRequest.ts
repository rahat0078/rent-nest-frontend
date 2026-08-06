export type TRentalStatus = "PENDING" | "APPROVED" | "REJECTED" | "ACTIVE" | "COMPLETED";

export interface ITenant {
  id?: string;
  name: string;
  email: string;
  phoneNumber?: string;
  phone?: string;
  profilePhoto?: string;
}

export interface ICategory {
  id: string;
  name: string;
}

export interface IProperty {
  id: string;
  title: string;
  description?: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  rentAmount: number;
  rent?: number;
  sizeSqFt?: number;
  images: string;
  category?: ICategory | string;
  facilities?: string[];
}

export interface IRentalRequest {
  id: string;
  tenantId: string;
  propertyId: string;
  moveInDate: string;
  message?: string;
  status: TRentalStatus;
  createdAt: string;
  updatedAt?: string;
  tenant?: ITenant;
  property?: IProperty;
}

export interface IApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}