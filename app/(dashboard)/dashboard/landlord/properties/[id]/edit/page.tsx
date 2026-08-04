"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Plus, X } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICategory } from "@/types/category";
import { updatePropertySchema } from "@/schemas/property";
import { getAllCategory } from "@/app/(public)/_propertyActions/getAllCategory";
import { updateProperty } from "../../../_landlordActions.ts/updateProperty";
import { getMyProperties, TPropertyResponseLandlordOwn } from "../../../_landlordActions.ts/getMyProperties";


type TUpdatePropertyInput = z.input<typeof updatePropertySchema>;
type TUpdatePropertyOutput = z.output<typeof updatePropertySchema>;

export default function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [facilityInput, setFacilityInput] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TUpdatePropertyInput, unknown, TUpdatePropertyOutput>({
    resolver: zodResolver(updatePropertySchema),
  });

  const selectedFacilities = watch("facilities") || [];
  const isAvailableValue = watch("isAvailable");
  const selectedCategory = watch("categoryId");

  useEffect(() => {
    async function loadData() {
      try {
        setLoadingData(true);
        const [categoriesRes, propertiesRes] = await Promise.all([
          getAllCategory(),
          getMyProperties(),
        ]);

        setCategories(categoriesRes?.data || []);

        const propertyList = propertiesRes?.data || [];
        const currentProperty = propertyList.find(
          (p: TPropertyResponseLandlordOwn) => p.id === id
        );

        if (!currentProperty) {
          toast.error("Property not found");
          router.push("/dashboard/landlord/properties");
          return;
        }

        reset({
          title: currentProperty.title,
          description: currentProperty.description,
          location: currentProperty.location,
          bedrooms: currentProperty.bedrooms,
          bathrooms: currentProperty.bathrooms,
          rentAmount: currentProperty.rentAmount,
          sizeSqFt: currentProperty.sizeSqFt,
          facilities: currentProperty.facilities || [],
          images: currentProperty.images,
          isAvailable: currentProperty.isAvailable,
          categoryId: currentProperty.categoryId,
        });
      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : "Failed to load property details";
        toast.error(message);
      } finally {
        setLoadingData(false);
      }
    }

    loadData();
  }, [id, reset, router]);

  const handleAddFacility = () => {
    const trimmed = facilityInput.trim();
    if (trimmed && !selectedFacilities.includes(trimmed)) {
      setValue("facilities", [...selectedFacilities, trimmed], {
        shouldValidate: true,
      });
      setFacilityInput("");
    }
  };

  const handleRemoveFacility = (facilityToRemove: string) => {
    setValue(
      "facilities",
      selectedFacilities.filter((f) => f !== facilityToRemove),
      { shouldValidate: true }
    );
  };

  const onSubmit = async (data: TUpdatePropertyOutput) => {
    try {
      await updateProperty(id, data);
      toast.success("Property updated successfully!");
      router.push("/dashboard/landlord/properties");
      router.refresh();
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to update property";
      toast.error(message);
    }
  };

  if (loadingData) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Edit Property</h2>
        <p className="text-sm text-muted-foreground">
          Update your property information below.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-card p-6 border border-border rounded-xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Property Title</label>
            <Input
              {...register("title")}
              placeholder="e.g. Modern Sunset Apartment"
            />
            {errors.title && (
              <p className="text-xs text-destructive">{errors.title.message}</p>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select
              value={selectedCategory || ""}
              onValueChange={(val: unknown) =>
                setValue(
                  "categoryId",
                  typeof val === "string" ? val : String(val || ""),
                  { shouldValidate: true }
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.categoryId && (
              <p className="text-xs text-destructive">
                {errors.categoryId.message}
              </p>
            )}
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <Input
              {...register("location")}
              placeholder="e.g. Downtown, New York"
            />
            {errors.location && (
              <p className="text-xs text-destructive">
                {errors.location.message}
              </p>
            )}
          </div>

          {/* Rent Amount */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Rent Amount ($/mo)</label>
            <Input type="number" {...register("rentAmount")} />
            {errors.rentAmount && (
              <p className="text-xs text-destructive">
                {errors.rentAmount.message}
              </p>
            )}
          </div>

          {/* Size SqFt */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Size (Sq Ft)</label>
            <Input type="number" {...register("sizeSqFt")} />
            {errors.sizeSqFt && (
              <p className="text-xs text-destructive">
                {errors.sizeSqFt.message}
              </p>
            )}
          </div>

          {/* Bedrooms */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Bedrooms</label>
            <Input type="number" {...register("bedrooms")} />
            {errors.bedrooms && (
              <p className="text-xs text-destructive">
                {errors.bedrooms.message}
              </p>
            )}
          </div>

          {/* Bathrooms */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Bathrooms</label>
            <Input type="number" {...register("bathrooms")} />
            {errors.bathrooms && (
              <p className="text-xs text-destructive">
                {errors.bathrooms.message}
              </p>
            )}
          </div>

          {/* Image URL */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Image URL</label>
            <Input
              {...register("images")}
              placeholder="https://images.unsplash.com/photo-..."
            />
            {errors.images && (
              <p className="text-xs text-destructive">
                {errors.images.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              {...register("description")}
              rows={4}
              placeholder="Provide a detailed description of the property..."
            />
            {errors.description && (
              <p className="text-xs text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Facilities */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Facilities</label>
            <div className="flex gap-2">
              <Input
                value={facilityInput}
                onChange={(e) => setFacilityInput(e.target.value)}
                placeholder="e.g. WiFi, Parking, Pool"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddFacility();
                  }
                }}
              />
              <Button
                type="button"
                onClick={handleAddFacility}
                variant="secondary"
              >
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedFacilities.map((facility, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full"
                >
                  {facility}
                  <button
                    type="button"
                    onClick={() => handleRemoveFacility(facility)}
                    className="hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            {errors.facilities && (
              <p className="text-xs text-destructive">
                {errors.facilities.message}
              </p>
            )}
          </div>

          {/* Availability Toggle */}
          <div className="flex items-center justify-between md:col-span-2 border-t border-border pt-4">
            <div>
              <p className="text-sm font-medium">Available for Rent</p>
              <p className="text-xs text-muted-foreground">
                Turn on to list this property immediately.
              </p>
            </div>
            <Switch
              checked={isAvailableValue}
              onCheckedChange={(checked) => setValue("isAvailable", checked)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard/landlord/properties")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}