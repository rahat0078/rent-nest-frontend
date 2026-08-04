export interface TRentalRequestResponse {
  id: string;
  tenantId: string;
  propertyId: string;
  moveInDate: string;
  message: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "ACTIVE" | "COMPLETED";
  createdAt: string;
  updatedAt: string;
  property: {
    id: string;
    title: string;
    location: string;
    rentAmount: number;
    images: string;
    isAvailable: boolean;
    category: {
      name: string;
    };
    landlord: {
      name: string;
      profilePhoto: string | null;
    };
  };
}