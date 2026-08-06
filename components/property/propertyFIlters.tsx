"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getAllCategory } from "@/app/(public)/_propertyActions/getAllCategory";
import { ICategory } from "@/types/category";



const SORT_OPTIONS = [
  { label: "Newest", sortBy: "createdAt", sortOrder: "desc" },
  { label: "Price Low to High", sortBy: "rentAmount", sortOrder: "asc" },
  { label: "Price High to Low", sortBy: "rentAmount", sortOrder: "desc" },
];

const COMMON_FACILITIES = [
  "WiFi",
  "Parking",
  "Generator",
  "CCTV",
  "Lift",
  "Security",
];

export function PropertyFilters() {
  const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategory();
        setCategories(res.data);
      } catch (error) {
        // console.log(error);
      }
    };

    fetchCategories();
  }, []);


  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [categoryId, setCategoryId] = useState(
    searchParams.get("category") || "",
  );
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [rentAmount, setRentAmount] = useState(
    searchParams.get("rentAmount") || "",
  );
  const [sizeSqFt, setSizeSqFt] = useState(searchParams.get("sizeSqFt") || "");
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>(
    searchParams.getAll("facilities"),
  );

  const currentSortBy = searchParams.get("sortBy") || "createdAt";
  const currentSortOrder = searchParams.get("sortOrder") || "desc";
  const [sortCombo, setSortCombo] = useState(
    `${currentSortBy}-${currentSortOrder}`,
  );

  const toggleFacility = (facility: string) => {
    setSelectedFacilities((prev) =>
      prev.includes(facility)
        ? prev.filter((f) => f !== facility)
        : [...prev, facility],
    );
  };

  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", "1");

    if (categoryId) {
      params.set("category", categoryId);
    } else {
      params.delete("category");
    }

    if (location) {
      params.set("location", location);
    } else {
      params.delete("location");
    }

    if (rentAmount) {
      params.set("rentAmount", rentAmount);
    } else {
      params.delete("rentAmount");
    }

    if (sizeSqFt) {
      params.set("sizeSqFt", sizeSqFt);
    } else {
      params.delete("sizeSqFt");
    }

    params.delete("facilities");

    selectedFacilities.forEach((facility) => {
      params.append("facilities", facility);
    });

    const [sortBy, sortOrder] = sortCombo.split("-");

    params.set("sortBy", sortBy);
    params.set("sortOrder", sortOrder);

    startTransition(() => {
      router.replace(`/properties?${params.toString()}`);
    });
  };

  const handleResetFilters = () => {
    // Clear local state
    setCategoryId("");
    setLocation("");
    setRentAmount("");
    setSizeSqFt("");
    setSelectedFacilities([]);
    setSortCombo("createdAt-desc");

    // Push clean URL to completely reset all property queries
    router.push(`/properties`);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-6 sticky top-24">
      {/* Category Select - Works with UUIDs now */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-3">
          Category
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Badge
              key={cat.id}
              variant={categoryId === cat.id ? "default" : "outline"}
              onClick={() => setCategoryId(categoryId === cat.id ? "" : cat.id)}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-3 py-1.5"
            >
              {cat.name}
            </Badge>
          ))}
        </div>
      </div>

      {/* Location Input */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Location
        </label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g. Dhaka, Gulshan"
          className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        />
      </div>

      {/* Max Rent */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Maximum Rent
        </label>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">৳</span>
          <input
            type="number"
            value={rentAmount}
            onChange={(e) => setRentAmount(e.target.value)}
            placeholder="25000"
            className="flex-1 px-3 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>
      </div>

      {/* Min Size */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Minimum Size (sq ft)
        </label>
        <input
          type="number"
          value={sizeSqFt}
          onChange={(e) => setSizeSqFt(e.target.value)}
          placeholder="800"
          className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        />
      </div>

      {/* Facilities */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-3">
          Facilities
        </label>
        <div className="flex flex-wrap gap-2">
          {COMMON_FACILITIES.map((facility) => (
            <Badge
              key={facility}
              variant={
                selectedFacilities.includes(facility) ? "default" : "outline"
              }
              onClick={() => toggleFacility(facility)}
              className="cursor-pointer transition-colors px-3 py-1.5"
            >
              {facility}
            </Badge>
          ))}
        </div>
      </div>

      {/* Sort By */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Sort By
        </label>
        <select
          value={sortCombo}
          onChange={(e) => setSortCombo(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        >
          {SORT_OPTIONS.map((option) => (
            <option
              key={option.label}
              value={`${option.sortBy}-${option.sortOrder}`}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-3">
        <Button
          variant="outline"
          className="flex-1"
          onClick={handleResetFilters}
        >
          Reset
        </Button>
        <Button
          className="flex-1"
          onClick={handleApplyFilters}
          disabled={isPending}
        >
          {isPending ? "Applying..." : "Apply"}
        </Button>
      </div>
    </div>
  );
}
