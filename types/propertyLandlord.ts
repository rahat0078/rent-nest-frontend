export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface Property {
  id: string;
  categoryId: string;
  category?: Category;
  title: string;
  description: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  rentAmount: number;
  sizeSqFt: number;
  facilities: string[];
  images: string;
  isAvailable: boolean;
  createdAt?: string;
  updatedAt?: string;
}
