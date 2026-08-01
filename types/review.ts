export interface IReview {
  id: string;

  tenantId: string;
  propertyId: string;

  rating: number;
  review: string;

  createdAt: string;
  updatedAt: string;

  tenant: {
    id: string;
    name: string;
    email: string;
    profilePhoto?: string;
  };
}