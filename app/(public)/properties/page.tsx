import { getAllProperty } from "../_propertyActions/getAllProperty";
import { PropertiesContainer } from "./_components/propertiesContainer";

interface Props {
  searchParams: Promise<{
    searchTerm?: string;
    category?: string;
    page?: string;
    limit?: string;
    rentAmount?: string;
    location?: string;
    sizeSqFt?: string;
    facilities?: string | string[];
    sortBy?: string;
    sortOrder?: string;
  }>;
}

export default async function PropertiesPage({ searchParams }: Props) {
  const params = await searchParams;


  const facilitiesParam = params.facilities
    ? Array.isArray(params.facilities)
      ? params.facilities
      : [params.facilities]
    : undefined;

  const query = {
    page: params.page || 1,
    limit: params.limit || 10,
    searchTerm: params.searchTerm,
    category: params.category,
    rentAmount: params.rentAmount,
    location: params.location,
    sizeSqFt: params.sizeSqFt,
    sortBy: params.sortBy,
    sortOrder: params.sortOrder,
    facilities: facilitiesParam,
  };



  const response = await getAllProperty(query);

  const properties = response?.data?.data || [];
  const meta = response?.data?.meta || {
    page: 1,
    limit: 8,
    total: 0,
    totalPage: 1,
  };

  return (
    <main className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-3">
            Find Your Perfect Property
          </h1>
          <p className="text-lg text-muted-foreground">
            Browse our collection of premium rental properties
          </p>
        </div>

        {/* Removed categories prop from container */}
        <PropertiesContainer initialProperties={properties} meta={meta} />
      </div>
    </main>
  );
}
