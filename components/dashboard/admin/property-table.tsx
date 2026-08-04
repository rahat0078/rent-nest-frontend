"use client";

import { useState } from "react";
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Calendar,
  Search,
  RotateCcw,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TProperty } from "@/app/(dashboard)/dashboard/admin/_adminActions/adminActions";

interface PropertyTableProps {
  properties: TProperty[];
}

export function PropertyTable({ properties }: PropertyTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("ALL");

  // Client-side Filtering Logic
  const filteredProperties = properties.filter((prop) => {
    const matchesSearch =
      prop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prop.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (prop.landlord?.name &&
        prop.landlord.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesAvailability =
      availabilityFilter === "ALL" ||
      (availabilityFilter === "AVAILABLE" && prop.isAvailable) ||
      (availabilityFilter === "UNAVAILABLE" && !prop.isAvailable);

    return matchesSearch && matchesAvailability;
  });

  const handleReset = () => {
    setSearchTerm("");
    setAvailabilityFilter("ALL");
  };

  return (
    <div className="space-y-4">
      {/* Instant Search & Filter Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-card p-3 rounded-lg border border-border shadow-xs">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title, location, or landlord..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-9 text-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <Select
            value={availabilityFilter}
            onValueChange={(val: string | null) =>
              setAvailabilityFilter(val ?? "ALL")
            }
          >
            <SelectTrigger className="h-9 text-xs w-[140px]">
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL" className="text-xs">
                All Status
              </SelectItem>
              <SelectItem value="AVAILABLE" className="text-xs">
                Available
              </SelectItem>
              <SelectItem value="UNAVAILABLE" className="text-xs">
                Unavailable
              </SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="h-9 text-xs gap-1"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </Button>
        </div>
      </div>

      {/* Property Table */}
      <div className="rounded-lg border border-border bg-card shadow-2xs overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-70 text-xs font-semibold">
                Property Title
              </TableHead>
              <TableHead className="text-xs font-semibold">Category</TableHead>
              <TableHead className="text-xs font-semibold">Landlord</TableHead>
              <TableHead className="text-xs font-semibold">
                Rent Amount
              </TableHead>
              <TableHead className="text-xs font-semibold">Status</TableHead>
              <TableHead className="text-xs font-semibold">
                Created Date
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProperties.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-xs text-muted-foreground"
                >
                  No properties found.
                </TableCell>
              </TableRow>
            ) : (
              filteredProperties.map((prop) => {
                const formattedDate = new Date(
                  prop.createdAt,
                ).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                });

                return (
                  <TableRow
                    key={prop.id}
                    className="hover:bg-muted/40 transition-colors"
                  >
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold text-foreground line-clamp-1">
                          {prop.title}
                        </span>
                        <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3 shrink-0 text-muted-foreground/80" />
                          {prop.location}
                        </span>
                        <div className="flex items-center gap-2.5 text-[10px] text-muted-foreground font-mono mt-0.5">
                          <span className="flex items-center gap-0.5">
                            <Bed className="h-3 w-3" /> {prop.bedrooms} Bed
                          </span>
                          <span className="flex items-center gap-0.5">
                            <Bath className="h-3 w-3" /> {prop.bathrooms} Bath
                          </span>
                          <span className="flex items-center gap-0.5">
                            <Maximize2 className="h-2.5 w-2.5" />{" "}
                            {prop.sizeSqFt} sqft
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="text-[10px] px-2 py-0.5 font-mono"
                      >
                        {prop.category?.name || "N/A"}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7 border border-border">
                          <AvatarImage
                            src={prop.landlord?.profilePhoto || undefined}
                            alt={prop.landlord?.name || "Landlord"}
                          />
                          <AvatarFallback className="text-[10px]">
                            {prop.landlord?.name
                              ? prop.landlord.name.substring(0, 2).toUpperCase()
                              : "L"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-xs font-medium leading-none">
                            {prop.landlord?.name || "Unknown"}
                          </span>
                          <span className="text-[10px] text-muted-foreground leading-none mt-0.5">
                            {prop.landlord?.email || ""}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="font-mono text-xs font-bold text-foreground">
                      $ {prop.rentAmount ? prop.rentAmount.toLocaleString() : 0}
                      /mo
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          prop.isAvailable
                            ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold"
                            : "border-destructive/40 bg-destructive/10 text-destructive text-[10px] font-semibold"
                        }
                      >
                        {prop.isAvailable ? "Available" : "Unavailable"}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-xs text-muted-foreground font-mono">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" />
                        {formattedDate}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer Details */}
      <div className="flex items-center justify-between px-2 pt-2">
        <p className="text-xs text-muted-foreground font-mono">
          Showing{" "}
          <span className="font-semibold text-foreground">
            {filteredProperties.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-foreground">
            {properties.length}
          </span>{" "}
          properties
        </p>
      </div>
    </div>
  );
}
