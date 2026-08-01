import { getAllProperty } from "../_propertyActions/getAllProperty";
import { PropertiesContainer } from "./propertiesContainer";

export default async function PropertiesPage() {
  const response = await getAllProperty({
    page: 1,
    limit: 10,
  });
  const properties = response.data.data;

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

        <PropertiesContainer initialProperties={properties} />
      </div>
    </main>
  );
}
