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
export interface TCreateReviewPayload {
  propertyId: string;
  rating: number;
  review: string;
}

export interface TReviewResponseData {
  id: string;
  tenantId: string;
  propertyId: string;
  rating: number;
  review: string;
  createdAt: string;
  tenant: {
    name: string;
    profilePhoto: string | null;
  };
  property: {
    id: string;
    title: string;
  };
}