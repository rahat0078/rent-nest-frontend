export type TPaymentStatus = "PENDING" | "PAID" | "FAILED";

export interface TLandlordInfo {
  id?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  phone?: string;
  profilePhoto?: string;
}

export interface TPaymentProperty {
  id: string;
  title: string;
  location: string;
  images?: string;
  landlord?: TLandlordInfo;
}

export interface TPaymentRentalRequest {
  id: string;
  status: string;
  moveInDate?: string;
  property?: TPaymentProperty;
}

export interface TPaymentItem {
  id: string;
  rentRequestId: string;
  tenantId: string;
  amount: number;
  provider: string;
  transactionId?: string;
  status: TPaymentStatus;
  createdAt: string;
  updatedAt?: string;
  paidAt?: string;
  property?: TPaymentProperty;
  rentRequest?: TPaymentRentalRequest;
}

export interface TCreatePaymentResponse {
  checkoutUrl: string;
  metadata?: {
    rentalRequestId: string;
    tenantId: string;
  };
}
